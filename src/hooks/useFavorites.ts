import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@patologias_favorites';
const FREE_FAVORITES_LIMIT = 5;

export function useFavorites(isPremium: boolean = true) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(FAVORITES_KEY)
      .then(data => {
        if (data) setFavorites(JSON.parse(data));
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  useEffect(() => {
    if (loaded) {
      AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites)).catch(() => {});
    }
  }, [favorites, loaded]);

  const toggleFavorite = useCallback((pathologyId: string) => {
    setFavorites(prev => {
      if (prev.includes(pathologyId)) {
        return prev.filter(id => id !== pathologyId);
      }
      if (!isPremium && prev.length >= FREE_FAVORITES_LIMIT) {
        Alert.alert(
          'Limite alcanzado',
          `En la version gratuita puedes tener hasta ${FREE_FAVORITES_LIMIT} favoritos. Actualiza a Premium para favoritos ilimitados.`,
          [{ text: 'Entendido' }],
        );
        return prev;
      }
      return [...prev, pathologyId];
    });
  }, [isPremium]);

  const isFavorite = useCallback((pathologyId: string): boolean => {
    return favorites.includes(pathologyId);
  }, [favorites]);

  const clearFavorites = useCallback(() => {
    setFavorites([]);
  }, []);

  return { favorites, favoriteCount: favorites.length, toggleFavorite, isFavorite, clearFavorites, loaded };
}
