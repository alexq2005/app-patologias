import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@patologias_recent';
const MAX_RECENT = 10;

export function useRecentPathologies() {
  const [recent, setRecent] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then(data => {
        if (data) setRecent(JSON.parse(data));
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  useEffect(() => {
    if (loaded) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(recent)).catch(() => {});
    }
  }, [recent, loaded]);

  const addRecent = useCallback((pathologyId: string) => {
    setRecent(prev => {
      const filtered = prev.filter(id => id !== pathologyId);
      return [pathologyId, ...filtered].slice(0, MAX_RECENT);
    });
  }, []);

  const clearRecent = useCallback(() => {
    setRecent([]);
  }, []);

  return { recent, addRecent, clearRecent, loaded };
}
