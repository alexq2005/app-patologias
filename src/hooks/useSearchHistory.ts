import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { SearchHistoryEntry } from '../types';

const STORAGE_KEY = '@patologias_search_history';
const MAX_HISTORY = 15;

export function useSearchHistory() {
  const [history, setHistory] = useState<SearchHistoryEntry[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then(data => {
        if (data) setHistory(JSON.parse(data));
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  useEffect(() => {
    if (loaded) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(history)).catch(() => {});
    }
  }, [history, loaded]);

  const addSearch = useCallback((query: string) => {
    const trimmed = query.trim();
    if (trimmed.length < 2) return;
    setHistory(prev => {
      const filtered = prev.filter(h => h.query !== trimmed);
      return [{ query: trimmed, timestamp: Date.now() }, ...filtered].slice(0, MAX_HISTORY);
    });
  }, []);

  const removeSearch = useCallback((query: string) => {
    setHistory(prev => prev.filter(h => h.query !== query));
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return { history, addSearch, removeSearch, clearHistory, loaded };
}
