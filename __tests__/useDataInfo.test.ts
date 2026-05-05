import { formatRelativeTime } from '../src/hooks/useDataInfo';

describe('formatRelativeTime', () => {
  const now = new Date('2026-05-05T12:00:00Z').getTime();

  test('seconds', () => {
    expect(formatRelativeTime(now - 5_000, now)).toBe('hace unos segundos');
    expect(formatRelativeTime(now - 30_000, now)).toBe('hace unos segundos');
    expect(formatRelativeTime(now, now)).toBe('hace unos segundos');
  });

  test('minutes', () => {
    expect(formatRelativeTime(now - 60_000, now)).toBe('hace 1 minuto');
    expect(formatRelativeTime(now - 5 * 60_000, now)).toBe('hace 5 minutos');
    expect(formatRelativeTime(now - 59 * 60_000, now)).toBe('hace 59 minutos');
  });

  test('hours', () => {
    expect(formatRelativeTime(now - 60 * 60_000, now)).toBe('hace 1 hora');
    expect(formatRelativeTime(now - 5 * 60 * 60_000, now)).toBe('hace 5 horas');
    expect(formatRelativeTime(now - 23 * 60 * 60_000, now)).toBe('hace 23 horas');
  });

  test('days', () => {
    expect(formatRelativeTime(now - 24 * 60 * 60_000, now)).toBe('hace 1 día');
    expect(formatRelativeTime(now - 7 * 24 * 60 * 60_000, now)).toBe('hace 7 días');
    expect(formatRelativeTime(now - 29 * 24 * 60 * 60_000, now)).toBe('hace 29 días');
  });

  test('months', () => {
    expect(formatRelativeTime(now - 30 * 24 * 60 * 60_000, now)).toBe('hace 1 mes');
    expect(formatRelativeTime(now - 90 * 24 * 60 * 60_000, now)).toBe('hace 3 meses');
  });

  test('years', () => {
    expect(formatRelativeTime(now - 365 * 24 * 60 * 60_000, now)).toBe('hace 1 año');
    expect(formatRelativeTime(now - 2 * 365 * 24 * 60 * 60_000, now)).toBe('hace 2 años');
  });

  test('clamps future timestamps to "hace unos segundos"', () => {
    expect(formatRelativeTime(now + 60_000, now)).toBe('hace unos segundos');
  });
});
