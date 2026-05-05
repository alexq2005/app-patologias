import { useState, useEffect, useMemo, useCallback } from 'react';
import type { Pathology, SearchResult } from '../types';
import { normalizeText } from '../utils/search';
import { db, rowToPathology } from '../data/db';

const MAX_RESULTS = 50;
const DEBOUNCE_MS = 150;

function scorePathology(pathology: Pathology, terms: string[]): SearchResult | null {
  let totalScore = 0;
  const matchedFields: string[] = [];
  const name = normalizeText(pathology.nombre);
  const system = normalizeText(pathology.bodySystemId);
  const definition = normalizeText(pathology.definicion);
  const pathophysiology = normalizeText(pathology.fisiopatologia);
  const signs = pathology.signosYSintomas.signos.map(s => normalizeText(s)).join(' ');
  const symptoms = pathology.signosYSintomas.sintomas.map(s => normalizeText(s)).join(' ');
  const nursing = pathology.cuidadosEnfermeria.intervenciones.map(i => normalizeText(i)).join(' ');

  for (const term of terms) {
    if (term.length < 2) continue;

    if (name === term) {
      totalScore += 10;
      matchedFields.push('nombre');
    } else if (name.startsWith(term)) {
      totalScore += 5;
      matchedFields.push('nombre');
    } else if (name.includes(term)) {
      totalScore += 3;
      matchedFields.push('nombre');
    }

    if (system.includes(term)) {
      totalScore += 2;
      if (!matchedFields.includes('sistema')) matchedFields.push('sistema');
    }

    if (signs.includes(term) || symptoms.includes(term)) {
      totalScore += 1.5;
      if (!matchedFields.includes('signos/sintomas')) matchedFields.push('signos/sintomas');
    }

    if (nursing.includes(term)) {
      totalScore += 1;
      if (!matchedFields.includes('cuidados')) matchedFields.push('cuidados');
    }

    if (definition.includes(term) || pathophysiology.includes(term)) {
      totalScore += 0.5;
      if (!matchedFields.includes('definicion')) matchedFields.push('definicion');
    }
  }

  return totalScore > 0 ? { pathology, score: totalScore, matchedFields } : null;
}

export function usePathologySearch() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [query]);

  const results: SearchResult[] = useMemo(() => {
    if (!debouncedQuery.trim()) return [];
    const terms = normalizeText(debouncedQuery).split(/\s+/).filter(t => t.length >= 2);
    if (terms.length === 0) return [];

    const result = db.executeSync('SELECT * FROM pathologies');
    const rawData = result.rows?.map(rowToPathology) || [];

    const scored: SearchResult[] = [];
    for (const p of rawData) {
      const rowResult = scorePathology(p, terms);
      if (rowResult) scored.push(rowResult);
    }

    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, MAX_RESULTS);
  }, [debouncedQuery]);

  const clearSearch = useCallback(() => {
    setQuery('');
    setDebouncedQuery('');
  }, []);

  return { query, setQuery, results, clearSearch, isSearching: query !== debouncedQuery };
}
