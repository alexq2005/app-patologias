import { normalizeText } from '../src/utils/search';

describe('normalizeText', () => {
  test('lowercases', () => {
    expect(normalizeText('CARDIO')).toBe('cardio');
    expect(normalizeText('Hola Mundo')).toBe('hola mundo');
  });

  test('strips diacritics', () => {
    expect(normalizeText('cardiología')).toBe('cardiologia');
    expect(normalizeText('hipertensión')).toBe('hipertension');
    expect(normalizeText('niño')).toBe('nino');
    expect(normalizeText('óptica')).toBe('optica');
  });

  test('trims surrounding whitespace', () => {
    expect(normalizeText('  cardio  ')).toBe('cardio');
    expect(normalizeText('\tasma\n')).toBe('asma');
  });

  test('collapses k → c (Spanish medical orthography)', () => {
    // The bug that triggered this: user searched "hipercalemia", content had "hiperkalemia"
    expect(normalizeText('hiperkalemia')).toBe('hipercalemia');
    expect(normalizeText('hipercalemia')).toBe('hipercalemia');
    // So both query and content normalize to the same form → match
    expect(normalizeText('hiperkalemia')).toBe(normalizeText('hipercalemia'));
  });

  test('k → c works regardless of case', () => {
    expect(normalizeText('Kalemia')).toBe('calemia');
    expect(normalizeText('KETOACIDOSIS')).toBe('cetoacidosis');
  });

  test('combines all rules: lowercase + diacritics + k→c + trim', () => {
    expect(normalizeText('  HIPERKaLEMIA  ')).toBe('hipercalemia');
    expect(normalizeText('Cetoacidósis')).toBe('cetoacidosis');
  });

  test('empty + idempotent', () => {
    expect(normalizeText('')).toBe('');
    expect(normalizeText(normalizeText('Hiperkalemia'))).toBe('hipercalemia');
  });
});
