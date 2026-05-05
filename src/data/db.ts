import { open, DB } from '@op-engineering/op-sqlite';
import pathologiesData from './pathologies.json';
import type { Pathology } from '../types';

export const db: DB = open({
  name: 'patologias.sqlite',
});

/** Bundled JSON is treated as data version 1. OTA updates use higher versions. */
const BUNDLED_DATA_VERSION = 1;

function ensureSchema() {
  db.executeSync(`
    CREATE TABLE IF NOT EXISTS pathologies (
      id TEXT PRIMARY KEY,
      nombre TEXT,
      bodySystemId TEXT,
      definicion TEXT,
      epidemiologia TEXT,
      factoresRiesgo TEXT,
      fisiopatologia TEXT,
      signosYSintomas TEXT,
      clasificacion TEXT,
      diagnostico TEXT,
      tratamientoMedico TEXT,
      cuidadosEnfermeria TEXT,
      npiNanda TEXT,
      npiNic TEXT,
      npiNoc TEXT,
      complicaciones TEXT,
      criteriosAlarma TEXT,
      emergencyLevel TEXT,
      relatedPathologyIds TEXT,
      isPremium INTEGER
    );
  `);
  db.executeSync(`
    CREATE TABLE IF NOT EXISTS meta (
      key TEXT PRIMARY KEY,
      value TEXT
    );
  `);
}

function insertPathologies(data: Pathology[]) {
  for (const p of data) {
    db.executeSync(`
      INSERT INTO pathologies (
        id, nombre, bodySystemId, definicion, epidemiologia,
        factoresRiesgo, fisiopatologia, signosYSintomas, clasificacion,
        diagnostico, tratamientoMedico, cuidadosEnfermeria, npiNanda,
        npiNic, npiNoc, complicaciones, criteriosAlarma, emergencyLevel,
        relatedPathologyIds, isPremium
      ) VALUES (
        ?, ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?, ?, ?,
        ?, ?
      )
    `, [
      p.id, p.nombre, p.bodySystemId, p.definicion || '', p.epidemiologia || '',
      JSON.stringify(p.factoresRiesgo || []), p.fisiopatologia || '', JSON.stringify(p.signosYSintomas || {}), JSON.stringify(p.clasificacion || null),
      JSON.stringify(p.diagnostico || {}), JSON.stringify(p.tratamientoMedico || {}), JSON.stringify(p.cuidadosEnfermeria || {}), JSON.stringify(p.npiNanda || []),
      JSON.stringify(p.npiNic || []), JSON.stringify(p.npiNoc || []), JSON.stringify(p.complicaciones || []), JSON.stringify(p.criteriosAlarma || []), p.emergencyLevel || '',
      JSON.stringify(p.relatedPathologyIds || []), p.isPremium ? 1 : 0
    ]);
  }
}

function setDataVersion(version: number) {
  db.executeSync(
    'INSERT INTO meta (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value=excluded.value',
    ['data_version', String(version)]
  );
}

/** Returns the version of the dataset currently loaded in SQLite. */
export function getCurrentDataVersion(): number {
  const result = db.executeSync('SELECT value FROM meta WHERE key = ?', ['data_version']);
  const row = result.rows?.[0];
  if (!row) return BUNDLED_DATA_VERSION;
  const parsed = parseInt(row.value as string, 10);
  return Number.isFinite(parsed) ? parsed : BUNDLED_DATA_VERSION;
}

/** Returns the unix timestamp (ms) of the last successful manifest check, or null if never. */
export function getLastSyncedAt(): number | null {
  const result = db.executeSync('SELECT value FROM meta WHERE key = ?', ['last_synced_at']);
  const row = result.rows?.[0];
  if (!row) return null;
  const parsed = parseInt(row.value as string, 10);
  return Number.isFinite(parsed) ? parsed : null;
}

/** Records the unix timestamp (ms) of the last successful manifest check. */
export function setLastSyncedAt(timestampMs: number): void {
  db.executeSync(
    'INSERT INTO meta (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value=excluded.value',
    ['last_synced_at', String(timestampMs)]
  );
}

export function initDatabase() {
  ensureSchema();

  const result = db.executeSync('SELECT COUNT(*) as count FROM pathologies');
  const count = result.rows?.[0].count as number;

  if (count === 0) {
    console.log('[SQLite] Populating initial dataset...');
    db.executeSync('BEGIN TRANSACTION');
    try {
      insertPathologies(pathologiesData as Pathology[]);
      setDataVersion(BUNDLED_DATA_VERSION);
      db.executeSync('COMMIT');
      console.log('[SQLite] Dataset populated!');
    } catch (error) {
      db.executeSync('ROLLBACK');
      console.error('[SQLite] Failed to populate dataset', error);
    }
  }
}

/**
 * Replace the entire pathologies dataset with new data (OTA update path).
 * Atomic: either the new data is fully loaded with the new version, or the
 * old data stays untouched. Throws on failure so the caller can decide what
 * to do (typically: log + ignore + try again next boot).
 */
export function repopulateFromJson(data: Pathology[], version: number): void {
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error('repopulateFromJson: data must be a non-empty array');
  }
  if (!Number.isFinite(version) || version < 1) {
    throw new Error(`repopulateFromJson: invalid version ${version}`);
  }

  ensureSchema();

  db.executeSync('BEGIN TRANSACTION');
  try {
    db.executeSync('DELETE FROM pathologies');
    insertPathologies(data);
    setDataVersion(version);
    db.executeSync('COMMIT');
    console.log(`[SQLite] Repopulated from JSON, version=${version}, rows=${data.length}`);
  } catch (error) {
    db.executeSync('ROLLBACK');
    throw error;
  }
}

export function rowToPathology(row: any): Pathology {
  return {
    ...row,
    isPremium: row.isPremium === 1,
    factoresRiesgo: JSON.parse(row.factoresRiesgo || '[]'),
    signosYSintomas: JSON.parse(row.signosYSintomas || '{}'),
    clasificacion: row.clasificacion && row.clasificacion !== 'null' ? JSON.parse(row.clasificacion) : undefined,
    diagnostico: JSON.parse(row.diagnostico || '{}'),
    tratamientoMedico: JSON.parse(row.tratamientoMedico || '{}'),
    cuidadosEnfermeria: JSON.parse(row.cuidadosEnfermeria || '{}'),
    npiNanda: JSON.parse(row.npiNanda || '[]'),
    npiNic: JSON.parse(row.npiNic || '[]'),
    npiNoc: JSON.parse(row.npiNoc || '[]'),
    complicaciones: JSON.parse(row.complicaciones || '[]'),
    criteriosAlarma: JSON.parse(row.criteriosAlarma || '[]'),
    relatedPathologyIds: JSON.parse(row.relatedPathologyIds || '[]'),
  };
}
