// ============================================================
// Review metadata — revisadoEn / fuentes per pathology
//
// La tabla SQLite (src/data/db.ts) no persiste `revisadoEn` ni
// `fuentes`, por lo que `getPathologyById` no los devuelve.
// Este helper lee la metadata directamente del JSON bundleado
// (ya cargado en memoria por db.ts — require() reusa el cache
// de Metro, costo extra: cero) y la expone por id.
//
// Caveat conocido: si en el futuro se activa OTA (contentOTA),
// esta metadata refleja el bundle, no el dataset OTA. Aceptable
// mientras OTA siga apagado; revisar al activarlo.
// ============================================================

import type { Pathology } from '../types';

export interface ReviewInfo {
  revisadoEn?: string;
  fuentes?: string[];
}

let _map: Map<string, ReviewInfo> | null = null;

function getMap(): Map<string, ReviewInfo> {
  if (!_map) {
    const data = require('../data/pathologies.json') as Pathology[];
    _map = new Map(
      data.map(p => [p.id, { revisadoEn: p.revisadoEn, fuentes: p.fuentes }]),
    );
  }
  return _map;
}

/** Devuelve metadata de revisión clínica para una patología, o undefined. */
export function getReviewInfo(pathologyId: string): ReviewInfo | undefined {
  return getMap().get(pathologyId);
}

const MONTHS_ES = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre',
];

/**
 * Formatea una fecha ISO (YYYY-MM-DD) como "mayo 2026".
 * Parseo manual a propósito: `new Date('2026-05-22')` es medianoche UTC
 * y en ART (UTC-3) retrocedería un día con toLocaleDateString.
 */
export function formatReviewDate(iso: string): string | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return null;
  const month = MONTHS_ES[parseInt(m[2], 10) - 1];
  if (!month) return null;
  return `${month} ${m[1]}`;
}
