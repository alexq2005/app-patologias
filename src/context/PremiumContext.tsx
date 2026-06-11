import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { NativeModules, Alert, Linking } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {
  isActivated as checkActivation,
  validateActivationCode,
  saveActivation,
} from '../utils/activation';
import {
  computeTrialDaysLeft,
  computeIsPremium,
  computeTrialExpired,
  TRIAL_DAYS,
} from '../utils/premiumLogic';
import { captureError } from '../config/sentry';

// IS_FREE=true means free/restricted flavor, IS_FREE=false means premium/full flavor
const IS_PREMIUM_BUILD: boolean = !(
  NativeModules.BuildConfigModule?.IS_FREE ?? true
);

const TRIAL_START_KEY = '@patologias_trial_start';
const SUBSCRIPTION_KEY = '@patologias_subscription';

// Google Play subscription product ID — configure in Play Console
export const SUBSCRIPTION_SKU = 'patologias_premium_monthly';
// Play Store listing URL — update with actual package once published
const PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.patologiasenfermeria';

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
    ])
      .then(([trialRaw, subRaw, activated]) => {
        // Trial start — re-inicializar si falta O si el valor persistido está
        // corrupto (parseInt → NaN). Storage corrupto REINICIA el trial; no
        // regala trial perpetuo (antes NaN → 15 días para siempre).
        const parsed = trialRaw ? parseInt(trialRaw, 10) : NaN;
        if (Number.isFinite(parsed)) {
          setTrialStartDate(parsed);
        } else {
          const now = Date.now();
          setTrialStartDate(now);
          EncryptedStorage.setItem(TRIAL_START_KEY, now.toString()).catch(e =>
            captureError(e, {
              scope: 'PremiumContext',
              action: 'persistTrialStart',
            }),
          );
        }
        if (subRaw === 'true') setIsSubscribed(true);
        if (activated) setIsCodeActivated(true);
        setLoaded(true);
      })
      .catch(e => {
        // Si EncryptedStorage falla acá se pierden sub + trial silenciosamente:
        // dejar rastro en Sentry (no-op hasta configurar DSN) y no bloquear la UI.
        captureError(e, { scope: 'PremiumContext', action: 'init' });
        setLoaded(true);
      });
  }, []);

  // ── Derived state ─────────────────────────
  const trialDaysLeft = computeTrialDaysLeft(
    trialStartDate,
    Date.now(),
    TRIAL_DAYS,
  );
  const isTrialActive = trialDaysLeft > 0;
  const _flags = {
    isPremiumBuild: IS_PREMIUM_BUILD,
    isCodeActivated,
    isSubscribed,
    isTrialActive,
  };
  const trialExpired = computeTrialExpired(_flags);
  const isPremium = computeIsPremium(_flags);

  // ── Actions ───────────────────────────────
  const activateSubscription = useCallback(() => {
    setIsSubscribed(true);
    EncryptedStorage.setItem(SUBSCRIPTION_KEY, 'true').catch(e =>
      captureError(e, {
        scope: 'PremiumContext',
        action: 'persistSubscription',
      }),
    );
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

  const activateWithCode = useCallback(
    async (code: string): Promise<boolean> => {
      if (validateActivationCode(code)) {
        await saveActivation();
        setIsCodeActivated(true);
        return true;
      }
      return false;
    },
    [],
  );

  const value = useMemo(
    () => ({
      isPremium,
      isFreeBuild: !IS_PREMIUM_BUILD,
      isCodeActivated,
      isTrialActive,
      trialDaysLeft,
      trialStartDate,
      trialExpired,
      isSubscribed,
      purchasing,
      activateSubscription,
      restoreSubscription,
      purchaseSubscription,
      activateWithCode,
      loaded,
    }),
    [
      isPremium,
      isCodeActivated,
      isTrialActive,
      trialDaysLeft,
      trialStartDate,
      trialExpired,
      isSubscribed,
      purchasing,
      activateSubscription,
      restoreSubscription,
      purchaseSubscription,
      activateWithCode,
      loaded,
    ],
  );

  if (!loaded) return null;

  return (
    <PremiumContext.Provider value={value}>{children}</PremiumContext.Provider>
  );
}

export function usePremium(): PremiumContextType {
  const context = useContext(PremiumContext);
  if (!context)
    throw new Error('usePremium must be used within PremiumProvider');
  return context;
}
