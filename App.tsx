import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ErrorBoundary } from './src/components/ErrorBoundary';
import { ThemeProvider } from './src/context/ThemeContext';
import { PremiumProvider } from './src/context/PremiumContext';
import { FavoritesProvider } from './src/context/FavoritesContext';
import { NotesProvider } from './src/context/NotesContext';
import { TabBarProvider } from './src/context/TabBarContext';
import { AppNavigator } from './src/navigation/AppNavigator';

export default function App() {
  console.log('[App] Rendering App root');
  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <ThemeProvider>
          <PremiumProvider>
            <FavoritesProvider>
              <NotesProvider>
                <TabBarProvider>
                  <AppNavigator />
                </TabBarProvider>
              </NotesProvider>
            </FavoritesProvider>
          </PremiumProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}
