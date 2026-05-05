/**
 * OTA content sync — pulls a newer pathologies dataset without republishing the AAB.
 *
 * Flow on app startup (gated by FEATURES.contentOTA):
 *   1. Fetch the manifest at MANIFEST_URL
 *   2. Validate manifest shape and fields
 *   3. Compare manifest.version with the version currently loaded in SQLite
 *   4. If newer: fetch the JSON, validate shape/size, repopulate the DB atomically
 *   5. Any error → log and silently fall through (app keeps using current data)
 *
 * Threat model & defenses (v1):
 *   - HTTPS in transit (the host MUST serve over https)
 *   - Shape validation (must be a non-empty array of pathologies w/ required fields)
 *   - Size sanity check (100 KB ≤ size ≤ 10 MB)
 *   - minAppVersion gating (refuse data that needs schema we don't have yet)
 *   - Version downgrade refusal (refuse data older than what's in SQLite)
 *   - Atomic repopulate (BEGIN/COMMIT in db.ts → either fully applied or fully rolled back)
 *
 * NOT in v1 (deferred until attack surface concerns appear):
 *   - SHA-256 / signature validation (would need a crypto dep). For now, host
 *     compromise is mitigated by you controlling the host. If that ever changes,
 *     add `react-native-quick-crypto` and verify a manifest.sha256 field.
 */

import type { Pathology } from '../types';
import { getCurrentDataVersion, repopulateFromJson, setLastSyncedAt } from '../data/db';
import { isFeatureEnabled } from '../config/features';
import { APP_VERSION } from '../config/appInfo';

/**
 * Manifest URL — must serve a JSON document conforming to ManifestV1.
 *
 * Deployment example:
 *   1. Push pathologies.json to a public bucket / GitHub Pages
 *   2. Push manifest.json next to it with a higher `version`
 *   3. Bump `version` and `updatedAt` whenever the JSON content changes
 *   4. The next time users open the app it pulls the new dataset
 *
 * Empty string disables the sync entirely (default — set this once you have
 * a host).
 */
const MANIFEST_URL = '';

const MIN_PAYLOAD_BYTES = 100 * 1024;        // 100 KB
const MAX_PAYLOAD_BYTES = 10 * 1024 * 1024;  // 10 MB
const FETCH_TIMEOUT_MS = 30_000;

interface ManifestV1 {
  /** Monotonically increasing integer. Higher = newer. */
  version: number;
  /** Public URL of the JSON dataset. Must be HTTPS in production. */
  url: string;
  /** App versions ≥ this can apply this dataset. Use semver-like "X.Y.Z". */
  minAppVersion: string;
  /** Approximate payload size in bytes. Used as a sanity guard. */
  size: number;
  /** ISO-8601 timestamp. Cosmetic — informs logs/UI. */
  updatedAt?: string;
}

export type SyncResult =
  | { status: 'disabled' }
  | { status: 'no-update'; current: number }
  | { status: 'updated'; from: number; to: number }
  | { status: 'error'; reason: string };

export async function syncContent(): Promise<SyncResult> {
  if (!isFeatureEnabled('contentOTA')) {
    return { status: 'disabled' };
  }
  if (!MANIFEST_URL) {
    return { status: 'error', reason: 'MANIFEST_URL not configured' };
  }

  try {
    const raw = await fetchManifest(MANIFEST_URL);
    const validation = validateManifest(raw);
    if (validation !== 'ok') {
      return { status: 'error', reason: `manifest invalid: ${validation}` };
    }
    const manifest = raw as ManifestV1;

    if (compareVersions(APP_VERSION, manifest.minAppVersion) < 0) {
      return { status: 'error', reason: `app ${APP_VERSION} < minAppVersion ${manifest.minAppVersion}` };
    }

    const current = getCurrentDataVersion();
    // Mark "we successfully reached the server" — even when no update is available,
    // this lets the UI show "verificado hace X" instead of "nunca verificado".
    setLastSyncedAt(Date.now());

    if (manifest.version <= current) {
      return { status: 'no-update', current };
    }

    const data = await fetchDataset(manifest.url, manifest.size);
    const dataValidation = validateDataset(data);
    if (dataValidation !== 'ok') {
      return { status: 'error', reason: `dataset invalid: ${dataValidation}` };
    }

    repopulateFromJson(data, manifest.version);
    setLastSyncedAt(Date.now());
    return { status: 'updated', from: current, to: manifest.version };
  } catch (err) {
    return { status: 'error', reason: err instanceof Error ? err.message : String(err) };
  }
}

async function fetchManifest(url: string): Promise<unknown> {
  const res = await fetchWithTimeout(url, FETCH_TIMEOUT_MS);
  if (!res.ok) throw new Error(`manifest fetch failed: HTTP ${res.status}`);
  return res.json();
}

async function fetchDataset(url: string, expectedSize: number): Promise<Pathology[]> {
  const res = await fetchWithTimeout(url, FETCH_TIMEOUT_MS);
  if (!res.ok) throw new Error(`dataset fetch failed: HTTP ${res.status}`);

  const text = await res.text();
  // Allow ±20% deviation from manifest.size (gzip/header variance, server padding)
  const tolerance = Math.max(expectedSize * 0.2, 1024);
  if (Math.abs(text.length - expectedSize) > tolerance) {
    throw new Error(`dataset size ${text.length} deviates from expected ${expectedSize}`);
  }

  return JSON.parse(text);
}

function fetchWithTimeout(url: string, ms: number): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  return fetch(url, { signal: controller.signal }).finally(() => clearTimeout(timer));
}

export function validateManifest(m: unknown): 'ok' | string {
  if (!m || typeof m !== 'object') return 'not an object';
  const r = m as Partial<ManifestV1>;
  if (typeof r.version !== 'number' || !Number.isFinite(r.version) || r.version < 1) return 'bad version';
  if (typeof r.url !== 'string' || !/^https:\/\//.test(r.url)) return 'url must be https';
  if (typeof r.minAppVersion !== 'string' || !/^\d+\.\d+\.\d+/.test(r.minAppVersion)) return 'bad minAppVersion';
  if (typeof r.size !== 'number' || r.size < MIN_PAYLOAD_BYTES || r.size > MAX_PAYLOAD_BYTES) return 'bad size';
  return 'ok';
}

export function validateDataset(data: unknown): 'ok' | string {
  if (!Array.isArray(data)) return 'not an array';
  if (data.length === 0) return 'empty array';
  // Sample first 3 entries for required fields — full validation would be expensive
  for (let i = 0; i < Math.min(3, data.length); i++) {
    const p = data[i];
    if (!p || typeof p !== 'object') return `entry ${i} not an object`;
    if (typeof p.id !== 'string') return `entry ${i} missing id`;
    if (typeof p.nombre !== 'string') return `entry ${i} missing nombre`;
    if (typeof p.bodySystemId !== 'string') return `entry ${i} missing bodySystemId`;
  }
  return 'ok';
}

/** Compare two semver-like strings. Returns -1/0/1. Tolerates pre-release suffixes by ignoring them. */
export function compareVersions(a: string, b: string): -1 | 0 | 1 {
  const parse = (v: string) => v.split(/[.-]/).slice(0, 3).map(n => parseInt(n, 10) || 0);
  const [a1 = 0, a2 = 0, a3 = 0] = parse(a);
  const [b1 = 0, b2 = 0, b3 = 0] = parse(b);
  if (a1 !== b1) return a1 < b1 ? -1 : 1;
  if (a2 !== b2) return a2 < b2 ? -1 : 1;
  if (a3 !== b3) return a3 < b3 ? -1 : 1;
  return 0;
}
