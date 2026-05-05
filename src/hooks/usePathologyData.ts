import { useMemo, useCallback } from 'react';
import type { Pathology, BodySystem, BodySystemId, ClinicalScale, LabValue, EmergencyProtocol } from '../types';
import { db, rowToPathology } from '../data/db';

let _bodySystems: BodySystem[] | null = null;
let _scales: ClinicalScale[] | null = null;
let _labValues: LabValue[] | null = null;
let _protocols: EmergencyProtocol[] | null = null;

function getBodySystems(): BodySystem[] {
  if (!_bodySystems) _bodySystems = require('../data/body_systems.json');
  return _bodySystems!;
}

function getScales(): ClinicalScale[] {
  if (!_scales) _scales = require('../data/clinical_scales.json');
  return _scales!;
}

function getLabValues(): LabValue[] {
  if (!_labValues) _labValues = require('../data/lab_values.json');
  return _labValues!;
}

function getProtocols(): EmergencyProtocol[] {
  if (!_protocols) _protocols = require('../data/emergency_protocols.json');
  return _protocols!;
}

const FREE_PER_SYSTEM = 3;

export function usePathologyData() {
  const bodySystems = useMemo(() => getBodySystems(), []);
  const scales = useMemo(() => getScales(), []);
  const labValues = useMemo(() => getLabValues(), []);
  const protocols = useMemo(() => getProtocols(), []);

  // We provide a sluggish complete fetch ONLY for backwards compatibility with components that rely on the pathologies array directly.
  // For scalable components, they should use the specific getter methods below.
  const pathologies = useMemo(() => {
    const result = db.executeSync('SELECT * FROM pathologies');
    return result.rows?.map(rowToPathology) || [];
  }, []);

  const getPathologyById = useCallback((id: string): Pathology | undefined => {
    const result = db.executeSync('SELECT * FROM pathologies WHERE id = ? LIMIT 1', [id]);
    const row = result.rows?.[0];
    return row ? rowToPathology(row) : undefined;
  }, []);

  const getPathologiesBySystem = useCallback((systemId: string): Pathology[] => {
    const result = db.executeSync('SELECT * FROM pathologies WHERE bodySystemId = ?', [systemId]);
    return result.rows?.map(rowToPathology) || [];
  }, []);

  const getBodySystemById = useCallback((id: BodySystemId): BodySystem | undefined => {
    return bodySystems.find(s => s.id === id);
  }, [bodySystems]);

  const getFreePathologies = useCallback((systemId: BodySystemId): Pathology[] => {
    const result = db.executeSync('SELECT * FROM pathologies WHERE bodySystemId = ? AND isPremium = 0 LIMIT ?', [systemId, FREE_PER_SYSTEM]);
    return result.rows?.map(rowToPathology) || [];
  }, []);

  const isPremiumPathology = useCallback((pathologyId: string): boolean => {
    const result = db.executeSync('SELECT isPremium FROM pathologies WHERE id = ? LIMIT 1', [pathologyId]);
    const row = result.rows?.[0];
    return row ? row.isPremium === 1 : true;
  }, []);

  const getSystemPathologyCount = useCallback((systemId: BodySystemId): number => {
    const result = db.executeSync('SELECT COUNT(*) as count FROM pathologies WHERE bodySystemId = ?', [systemId]);
    return (result.rows?.[0].count as number) || 0;
  }, []);

  const getRandomPathology = useCallback((): Pathology => {
    const result = db.executeSync('SELECT * FROM pathologies WHERE isPremium = 0 ORDER BY RANDOM() LIMIT 1');
    return rowToPathology(result.rows![0]);
  }, []);

  const getScaleById = useCallback((id: string): ClinicalScale | undefined => {
    return scales.find(s => s.id === id);
  }, [scales]);

  const getProtocolById = useCallback((id: string): EmergencyProtocol | undefined => {
    return protocols.find(p => p.id === id);
  }, [protocols]);

  return {
    pathologies,
    bodySystems,
    scales,
    labValues,
    protocols,
    getPathologyById,
    getPathologiesBySystem,
    getBodySystemById,
    getFreePathologies,
    isPremiumPathology,
    getSystemPathologyCount,
    getRandomPathology,
    getScaleById,
    getProtocolById,
    pathologyCount: pathologies.length,
  };
}
