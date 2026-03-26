import { useMemo, useCallback } from 'react';
import type { Pathology, BodySystem, BodySystemId, ClinicalScale, LabValue, EmergencyProtocol } from '../types';

// Lazy-loaded data
let _pathologies: Pathology[] | null = null;
let _bodySystems: BodySystem[] | null = null;
let _scales: ClinicalScale[] | null = null;
let _labValues: LabValue[] | null = null;
let _protocols: EmergencyProtocol[] | null = null;

function getPathologies(): Pathology[] {
  if (!_pathologies) _pathologies = require('../data/pathologies.json');
  return _pathologies!;
}

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
  const pathologies = useMemo(() => getPathologies(), []);
  const bodySystems = useMemo(() => getBodySystems(), []);
  const scales = useMemo(() => getScales(), []);
  const labValues = useMemo(() => getLabValues(), []);
  const protocols = useMemo(() => getProtocols(), []);

  const pathologyMap = useMemo(() => {
    const map = new Map<string, Pathology>();
    for (const p of pathologies) map.set(p.id, p);
    return map;
  }, [pathologies]);

  const getPathologyById = useCallback((id: string): Pathology | undefined => {
    return pathologyMap.get(id);
  }, [pathologyMap]);

  const getPathologiesBySystem = useCallback((systemId: BodySystemId): Pathology[] => {
    return pathologies.filter(p => p.bodySystemId === systemId);
  }, [pathologies]);

  const getBodySystemById = useCallback((id: BodySystemId): BodySystem | undefined => {
    return bodySystems.find(s => s.id === id);
  }, [bodySystems]);

  const getFreePathologies = useCallback((systemId: BodySystemId): Pathology[] => {
    return getPathologiesBySystem(systemId)
      .filter(p => !p.isPremium)
      .slice(0, FREE_PER_SYSTEM);
  }, [getPathologiesBySystem]);

  const isPremiumPathology = useCallback((pathologyId: string): boolean => {
    const p = pathologyMap.get(pathologyId);
    return p?.isPremium ?? true;
  }, [pathologyMap]);

  const getSystemPathologyCount = useCallback((systemId: BodySystemId): number => {
    return pathologies.filter(p => p.bodySystemId === systemId).length;
  }, [pathologies]);

  const getRandomPathology = useCallback((): Pathology => {
    const freeOnes = pathologies.filter(p => !p.isPremium);
    return freeOnes[Math.floor(Math.random() * freeOnes.length)];
  }, [pathologies]);

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
