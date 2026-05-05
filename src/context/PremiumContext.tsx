import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { NativeModules, Alert, Linking } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { isActivated as checkActivation, validateActivationCode, saveActivation } from '../utils/activation';

// IS_FREE=true means free/restricted flavor, IS_FREE=false means premium/full flavor
const IS_PREMIUM_BUILD: boolean = !(NativeModules.BuildConfigModule?.IS_FREE ?? true);

const TRIAL_START_KEY = '@patologias_trial_start';
const SUBSCRIPTION_KEY = '@patologias_subscription';
const TRIAL_DAYS = 15;

// Google Play subscription product ID — configure in Play Console
export const SUBSCRIPTION_SKU = 'patologias_premium_monthly';
// Play Store listing URL — update with actual package once published
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.patologiasenfermeria';

interface PremiumContextType {
  isPremium: boolean;
  isFreeBuild: boolean;
  isCodeActivated: boolean;
  isTrialActive: boolean;
  trialDaysLeft: number;
  trialStartDate: number | null;
  trialExpired: boolean;
  isSubscribed: boolean;
  purchasing: boolean;
  activateSubscription: () => void;
  restoreSubscription: () => Promise<boolean>;
  purchaseSubscription: () => Promise<void>;
  activateWithCode: (code: string) => Promise<boolean>;
  loaded: boolean;
}

const PremiumContext = createContext<PremiumContextType | null>(null);

export function PremiumProvider({ children }: { children: React.ReactNode }) {
  const [trialStartDate, setTrialStartDate] = useState<number | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isCodeActivated, setIsCodeActivated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [purchasing, setPurchasing] = useState(false);

  // ── Initialize on mount ───────────────────
  useEffect(() => {
    Promise.all([
      EncryptedStorage.getItem(TRIAL_START_KEY),
      EncryptedStorage.getItem(SUBSCRIPTION_KEY),
      checkActivation(),
    ]).then(([trialRaw, subRaw, activated]) => {
      // Trial start
      if (trialRaw) {
        setTrialStartDate(parseInt(trialRaw, 10));
      } else {
        const now = Date.now();
        setTrialStartDate(now);
        EncryptedStorage.setItem(TRIAL_START_KEY, now.toString()).catch(() => {});
      }
      if (subRaw === 'true') setIsSubscribed(true);
      if (activated) setIsCodeActivated(true);
      setLoaded(true);
    }).catch(() => setLoaded(true));
  }, []);

  // ── Derived state ─────────────────────────
  const trialDaysLeft = (() => {
    if (!trialStartDate) return TRIAL_DAYS;
    const elapsed = Date.now() - trialStartDate;
    const remaining = TRIAL_DAYS - Math.floor(elapsed / (1000 * 60 * 60 * 24));
    return Math.max(0, remaining);
  })();

  const isTrialActive = trialDaysLeft > 0;
  const trialExpired = !isTrialActive && !isSubscribed && !isCodeActivated;
  const isPremium = IS_PREMIUM_BUILD || isCodeActivated || isSubscribed || isTrialActive;

  // ── Actions ───────────────────────────────
  const activateSubscription = useCallback(() => {
    setIsSubscribed(true);
    EncryptedStorage.setItem(SUBSCRIPTION_KEY, 'true').catch(() => {});
  }, []);

  const restoreSubscription = useCallback(async (): Promise<boolean> => {
    // TODO: Validate with Google Play Billing API when published
    const val = await EncryptedStorage.getItem(SUBSCRIPTION_KEY);
    if (val === 'true') {
      setIsSubscribed(true);
      return true;
    }
    return false;
  }, []);

  const purchaseSubscription = useCallback(async () => {
    setPurchasing(true);
    try {
      // Open Play Store listing for subscription
      // When Google Play Billing is integrated, this will use the billing flow
      await Linking.openURL(PLAY_STORE_URL);
    } catch {
      Alert.alert(
        'Google Play',
        'No se pudo abrir Google Play. Verifica tu conexion a internet.',
      );
    } finally {
      setPurchasing(false);
    }
  }, []);

  const activateWithCode = useCallback(async (code: string): Promise<boolean> => {
    if (validateActivationCode(code)) {
      await saveActivation();
      setIsCodeActivated(true);
      return true;
    }
    return false;
  }, []);

  const value = useMemo(() => ({
    isPremium, isFreeBuild: !IS_PREMIUM_BUILD, isCodeActivated,
    isTrialActive, trialDaysLeft, trialStartDate, trialExpired,
    isSubscribed, purchasing,
    activateSubscription, restoreSubscription, purchaseSubscription,
    activateWithCode, loaded,
  }), [
    isPremium, isCodeActivated, isTrialActive, trialDaysLeft, trialStartDate, trialExpired,
    isSubscribed, purchasing, activateSubscription, restoreSubscription, purchaseSubscription,
    activateWithCode, loaded
  ]);

  if (!loaded) return null;

  return (
    <PremiumContext.Provider value={value}>
      {children}
    </PremiumContext.Provider>
  );
}

export function usePremium(): PremiumContextType {
  const context = useContext(PremiumContext);
  if (!context) throw new Error('usePremium must be used within PremiumProvider');
  return context;
}
