import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { PathologyNote } from '../types';

const STORAGE_KEY = '@patologias_notes';
const FREE_NOTES_LIMIT = 5;

export function useNotes(isPremium: boolean = true) {
  const [notes, setNotes] = useState<PathologyNote[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then(raw => {
      if (raw) {
        try { setNotes(JSON.parse(raw)); } catch (e) { console.warn('Failed to parse saved notes:', e); }
      }
      setLoaded(true);
    }).catch(e => console.warn('Failed to load notes:', e));
  }, []);

  const persist = useCallback((updated: PathologyNote[]) => {
    setNotes(updated);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }, []);

  const getNote = useCallback((pathologyId: string): PathologyNote | undefined => {
    return notes.find(n => n.pathologyId === pathologyId);
  }, [notes]);

  const saveNote = useCallback((pathologyId: string, text: string) => {
    const existing = notes.findIndex(n => n.pathologyId === pathologyId);
    const entry: PathologyNote = { pathologyId, text, updatedAt: Date.now() };
    if (existing >= 0) {
      const updated = [...notes];
      updated[existing] = entry;
      persist(updated);
    } else {
      if (!isPremium && notes.length >= FREE_NOTES_LIMIT) {
        Alert.alert(
          'Limite alcanzado',
          `En la version gratuita puedes tener hasta ${FREE_NOTES_LIMIT} notas. Actualiza a Premium para notas ilimitadas.`,
          [{ text: 'Entendido' }],
        );
        return;
      }
      persist([...notes, entry]);
    }
  }, [notes, persist, isPremium]);

  const deleteNote = useCallback((pathologyId: string) => {
    persist(notes.filter(n => n.pathologyId !== pathologyId));
  }, [notes, persist]);

  const recentNotes = useCallback((limit: number = 5): PathologyNote[] => {
    return [...notes]
      .sort((a, b) => b.updatedAt - a.updatedAt)
      .slice(0, limit);
  }, [notes]);

  return { notes, loaded, getNote, saveNote, deleteNote, recentNotes, noteCount: notes.length };
}
