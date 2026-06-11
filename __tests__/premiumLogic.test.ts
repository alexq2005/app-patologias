/**
 * Tests de la lógica premium/trial — REVENUE-CRITICAL.
 * Si rompen: o entra gratis cualquiera (revenue perdido) o se corta a quien
 * pagó (refunds). Cubren trial de 15 días, gate y estado de paywall.
 */

import {
  computeTrialDaysLeft,
  computeIsPremium,
  computeTrialExpired,
  TRIAL_DAYS,
} from '../src/utils/premiumLogic';

const DAY = 1000 * 60 * 60 * 24;
const START = 1_700_000_000_000;

describe('computeTrialDaysLeft (15 días)', () => {
  it('sin trial iniciado → trial completo', () => {
    expect(computeTrialDaysLeft(null, Date.now())).toBe(TRIAL_DAYS);
    expect(TRIAL_DAYS).toBe(15);
  });
  it('día 0 → 15', () => {
    expect(computeTrialDaysLeft(START, START)).toBe(15);
  });
  it('día 7 → 8 restantes', () => {
    expect(computeTrialDaysLeft(START, START + 7 * DAY)).toBe(8);
  });
  it('día 14.9 → todavía 1', () => {
    expect(computeTrialDaysLeft(START, START + 14.9 * DAY)).toBe(1);
  });
  it('día 15 exacto → 0 (agotado)', () => {
    expect(computeTrialDaysLeft(START, START + 15 * DAY)).toBe(0);
  });
  it('mucho después → clamp a 0, nunca negativo', () => {
    expect(computeTrialDaysLeft(START, START + 100 * DAY)).toBe(0);
  });
  it('duración custom respetada', () => {
    expect(computeTrialDaysLeft(START, START + 2 * DAY, 5)).toBe(3);
  });
});

describe('computeTrialDaysLeft — storage corrupto y clock rollback (fix 2026-06-10)', () => {
  it('NaN (storage corrupto) → 0, NUNCA trial perpetuo', () => {
    // Regresión: antes `!NaN` era truthy → devolvía 15 días para siempre.
    expect(computeTrialDaysLeft(NaN, START)).toBe(0);
  });
  it('Infinity → 0 (fail-closed)', () => {
    expect(computeTrialDaysLeft(Infinity, START)).toBe(0);
  });
  it('-Infinity → 0 (fail-closed)', () => {
    expect(computeTrialDaysLeft(-Infinity, START)).toBe(0);
  });
  it('clock rollback 30 días → clamp exacto a TRIAL_DAYS (sin clamp daría 45)', () => {
    expect(computeTrialDaysLeft(START, START - 30 * DAY)).toBe(TRIAL_DAYS);
  });
  it('clock rollback 1 día → clamp a 15, no 16', () => {
    expect(computeTrialDaysLeft(START, START - 1 * DAY)).toBe(15);
  });
  it('clock rollback con duración custom → clamp al custom, no a TRIAL_DAYS', () => {
    expect(computeTrialDaysLeft(START, START - 10 * DAY, 5)).toBe(5);
  });
});

describe('computeIsPremium', () => {
  const base = {
    isPremiumBuild: false,
    isCodeActivated: false,
    isSubscribed: false,
    isTrialActive: false,
  };
  it('sin vía → paywall (false)', () => {
    expect(computeIsPremium(base)).toBe(false);
  });
  it('premium build → true', () => {
    expect(computeIsPremium({ ...base, isPremiumBuild: true })).toBe(true);
  });
  it('código → true', () => {
    expect(computeIsPremium({ ...base, isCodeActivated: true })).toBe(true);
  });
  it('suscripción → true', () => {
    expect(computeIsPremium({ ...base, isSubscribed: true })).toBe(true);
  });
  it('trial vigente → true', () => {
    expect(computeIsPremium({ ...base, isTrialActive: true })).toBe(true);
  });
});

describe('computeTrialExpired (paridad con el original — sin chequear premiumBuild)', () => {
  const base = {
    isPremiumBuild: false,
    isCodeActivated: false,
    isSubscribed: false,
    isTrialActive: false,
  };
  it('trial vencido + sin sub + sin código → expirado (true)', () => {
    expect(computeTrialExpired(base)).toBe(true);
  });
  it('trial vigente → no expirado', () => {
    expect(computeTrialExpired({ ...base, isTrialActive: true })).toBe(false);
  });
  it('suscripto → no expirado', () => {
    expect(computeTrialExpired({ ...base, isSubscribed: true })).toBe(false);
  });
  it('REGRESIÓN: NO depende de premiumBuild (igual que el original)', () => {
    // El original solo miraba trial/sub/código. Premium build no afecta este flag.
    expect(computeTrialExpired({ ...base, isPremiumBuild: true })).toBe(true);
  });
});
