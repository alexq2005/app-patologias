import React, { createContext, useContext } from 'react';
import { useFavorites } from '../hooks/useFavorites';
import { usePremium } from './PremiumContext';

type FavoritesContextType = ReturnType<typeof useFavorites>;

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const { isPremium } = usePremium();
  const favoritesState = useFavorites(isPremium);
  return (
    <FavoritesContext.Provider value={favoritesState}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavoritesContext(): FavoritesContextType {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavoritesContext must be used within FavoritesProvider');
  return context;
}
