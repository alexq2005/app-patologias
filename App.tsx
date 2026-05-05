import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ErrorBoundary } from './src/components/ErrorBoundary';
import { ThemeProvider } from './src/context/ThemeContext';
import { PremiumProvider } from './src/context/PremiumContext';
import { FavoritesProvider } from './src/context/FavoritesContext';
import { NotesProvider } from './src/context/NotesContext';
import { TabBarProvider } from './src/context/TabBarContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import { initDatabase } from './src/data/db';
import { initSentry } from './src/config/sentry';
import { syncContent } from './src/services/contentSync';

initSentry();
initDatabase();

// Fire-and-forget OTA content sync — never blocks app render. Gated internally
// by FEATURES.contentOTA so this is a no-op until the flag flips and the
// MANIFEST_URL is configured.
syncContent().then(result => {
  if (result.status === 'updated') {
    console.log(`[ContentSync] dataset updated v${result.from} → v${result.to}`);
  } else if (result.status === 'error') {
    console.warn('[ContentSync] error:', result.reason);
  }
});

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
