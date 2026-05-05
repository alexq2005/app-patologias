import { open, DB } from '@op-engineering/op-sqlite';
import pathologiesData from './pathologies.json';
import type { Pathology } from '../types';

export const db: DB = open({
  name: 'patologias.sqlite',
});

export function initDatabase() {
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

  const result = db.executeSync('SELECT COUNT(*) as count FROM pathologies');
  const count = result.rows?.[0].count as number;

  if (count === 0) {
    console.log('[SQLite] Populating initial dataset...');
    db.executeSync('BEGIN TRANSACTION');
    try {
      for (const p of pathologiesData as Pathology[]) {
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
      db.executeSync('COMMIT');
    } catch (error) {
      db.executeSync('ROLLBACK');
      console.error('[SQLite] Failed to populate dataset', error);
    }
    console.log('[SQLite] Dataset populated!');
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
