/**
 * Pure premium/trial gate logic — extracted from PremiumContext so it can be
 * unit-tested in isolation (no React, no native modules, no timers).
 *
 * REVENUE-CRITICAL: un bug acá da acceso gratis permanente (revenue perdido)
 * o corta a usuarios que pagaron (refunds + reseñas malas). Mantener puro y
 * los tests de __tests__/premiumLogic.test.ts en verde.
 */

export const TRIAL_DAYS = 15;

const DAY_MS = 1000 * 60 * 60 * 24;

/**
 * Días de trial restantes (clamp a [0, trialDays]).
 * - null → trial no iniciado → trial completo.
 * - NaN/±Infinity (storage corrupto) → 0 (fail-closed). Antes `!NaN` era truthy
 *   y devolvía trial completo PARA SIEMPRE — trial perpetuo gratis.
 * - Clamp superior: retroceder el reloj del dispositivo no extiende el trial.
 * @param now epoch ms actual — inyectable para tests (NO usar Date.now() acá)
 */
export function computeTrialDaysLeft(
  trialStartDate: number | null,
  now: number,
  trialDays: number = TRIAL_DAYS,
): number {
  if (trialStartDate === null) return trialDays;
  if (!Number.isFinite(trialStartDate)) return 0;
  const elapsed = now - trialStartDate;
  const remaining = trialDays - Math.floor(elapsed / DAY_MS);
  return Math.max(0, Math.min(trialDays, remaining));
}

export interface PremiumFlags {
  isPremiumBuild: boolean;
  isCodeActivated: boolean;
  isSubscribed: boolean;
  isTrialActive: boolean;
}

/** ¿Acceso premium? Cualquier vía lo habilita. */
export function computeIsPremium(flags: PremiumFlags): boolean {
  return (
    flags.isPremiumBuild ||
    flags.isCodeActivated ||
    flags.isSubscribed ||
    flags.isTrialActive
  );
}

/**
 * Trial vencido sin suscripción ni código.
 * NOTA: replica EXACTAMENTE el original (no chequea isPremiumBuild — se usa
 * solo para UI; en premium build isPremium ya es true por otra vía).
 */
export function computeTrialExpired(flags: PremiumFlags): boolean {
  return !flags.isTrialActive && !flags.isSubscribed && !flags.isCodeActivated;
}
