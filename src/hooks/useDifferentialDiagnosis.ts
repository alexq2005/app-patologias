// ============================================================
// useDifferentialDiagnosis — symptom-based pathology matching
// ============================================================

import { useMemo, useState, useCallback } from 'react';
import { usePathologyData } from './usePathologyData';
import { normalizeText } from '../utils/search';
import type { BodySystemId, EmergencyLevel } from '../types';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export interface SymptomEntry {
  id: string;           // normalized key
  label: string;        // original text
  isSign: boolean;      // true = signo, false = síntoma
  pathologyIds: string[];
}

export interface DifferentialResult {
  pathologyId: string;
  pathologyName: string;
  bodySystemId: BodySystemId;
  emergencyLevel: EmergencyLevel;
  matchedSymptoms: string[];
  totalSymptoms: number;
  matchPercentage: number;
}

// ─────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────

export function useDifferentialDiagnosis() {
  const { pathologies, bodySystems } = usePathologyData();
  const [selectedSymptomIds, setSelectedSymptomIds] = useState<Set<string>>(new Set());
  const [systemFilter, setSystemFilter] = useState<BodySystemId | null>(null);

  // Build symptom index once
  const symptomIndex = useMemo(() => {
    const map = new Map<string, SymptomEntry>();

    for (const p of pathologies) {
      const addEntry = (text: string, isSign: boolean) => {
        const id = normalizeText(text);
        if (!id) return;
        const existing = map.get(id);
        if (existing) {
          if (!existing.pathologyIds.includes(p.id)) {
            existing.pathologyIds.push(p.id);
          }
        } else {
          map.set(id, { id, label: text, isSign, pathologyIds: [p.id] });
        }
      };

      for (const s of p.signosYSintomas.signos) addEntry(s, true);
      for (const s of p.signosYSintomas.sintomas) addEntry(s, false);
    }

    return map;
  }, [pathologies]);

  // All symptoms as sorted array
  const allSymptoms = useMemo(() => {
    const arr = Array.from(symptomIndex.values());
    arr.sort((a, b) => a.label.localeCompare(b.label, 'es'));
    return arr;
  }, [symptomIndex]);

  // Filtered symptoms by system
  const filteredSymptoms = useMemo(() => {
    if (!systemFilter) return allSymptoms;
    const systemPathIds = new Set(
      pathologies.filter(p => p.bodySystemId === systemFilter).map(p => p.id),
    );
    return allSymptoms.filter(s =>
      s.pathologyIds.some(pid => systemPathIds.has(pid)),
    );
  }, [allSymptoms, systemFilter, pathologies]);

  // Toggle a symptom
  const toggleSymptom = useCallback((symptomId: string) => {
    setSelectedSymptomIds(prev => {
      const next = new Set(prev);
      if (next.has(symptomId)) next.delete(symptomId);
      else next.add(symptomId);
      return next;
    });
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedSymptomIds(new Set());
  }, []);

  // Compute differential results
  const results = useMemo((): DifferentialResult[] => {
    if (selectedSymptomIds.size === 0) return [];

    const selectedEntries = Array.from(selectedSymptomIds)
      .map(id => symptomIndex.get(id))
      .filter(Boolean) as SymptomEntry[];

    // Count matches per pathology
    const matchMap = new Map<string, string[]>();
    for (const entry of selectedEntries) {
      for (const pid of entry.pathologyIds) {
        const arr = matchMap.get(pid) || [];
        arr.push(entry.label);
        matchMap.set(pid, arr);
      }
    }

    // Build results
    const list: DifferentialResult[] = [];
    for (const [pid, matched] of matchMap) {
      const p = pathologies.find(x => x.id === pid);
      if (!p) continue;

      // Filter by system if active
      if (systemFilter && p.bodySystemId !== systemFilter) continue;

      const totalSymptoms =
        p.signosYSintomas.signos.length + p.signosYSintomas.sintomas.length;

      list.push({
        pathologyId: p.id,
        pathologyName: p.nombre,
        bodySystemId: p.bodySystemId,
        emergencyLevel: p.emergencyLevel as EmergencyLevel,
        matchedSymptoms: matched,
        totalSymptoms,
        matchPercentage: Math.round((matched.length / selectedSymptomIds.size) * 100),
      });
    }

    // Sort by match count desc, then by emergency level
    const emergencyOrder: Record<string, number> = {
      critico: 0, moderado: 1, leve: 2, ninguno: 3,
    };
    list.sort((a, b) => {
      if (b.matchedSymptoms.length !== a.matchedSymptoms.length) {
        return b.matchedSymptoms.length - a.matchedSymptoms.length;
      }
      return (emergencyOrder[a.emergencyLevel] ?? 3) - (emergencyOrder[b.emergencyLevel] ?? 3);
    });

    return list;
  }, [selectedSymptomIds, symptomIndex, pathologies, systemFilter]);

  return {
    allSymptoms,
    filteredSymptoms,
    selectedSymptomIds,
    toggleSymptom,
    clearSelection,
    results,
    systemFilter,
    setSystemFilter,
    bodySystems,
    selectedCount: selectedSymptomIds.size,
  };
}
