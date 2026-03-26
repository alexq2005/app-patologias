// ============================================================
// useOnboarding — AsyncStorage flag for first-time onboarding
// ============================================================

import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@patologias_onboarding_complete';

export function useOnboarding() {
  const [isComplete, setIsComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then(value => {
        setIsComplete(value === 'true');
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const completeOnboarding = useCallback(async () => {
    await AsyncStorage.setItem(STORAGE_KEY, 'true');
    setIsComplete(true);
  }, []);

  return { isComplete, isLoading, completeOnboarding };
}
