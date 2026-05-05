import {
  APPS,
  chooseLaunchUrls,
  playStoreAppUrl,
  playStoreWebUrl,
} from '../src/services/miSuite';

describe('APPS registry', () => {
  test('contains exactly 3 apps', () => {
    expect(APPS).toHaveLength(3);
  });

  test('exactly one app is marked isCurrent', () => {
    const current = APPS.filter(a => a.isCurrent);
    expect(current).toHaveLength(1);
    expect(current[0].id).toBe('patologias');
  });

  test('every app has unique id, scheme, and pkg', () => {
    const ids = new Set(APPS.map(a => a.id));
    const schemes = new Set(APPS.map(a => a.scheme));
    const pkgs = new Set(APPS.map(a => a.pkg));
    expect(ids.size).toBe(APPS.length);
    expect(schemes.size).toBe(APPS.length);
    expect(pkgs.size).toBe(APPS.length);
  });

  test('every scheme ends with "://"', () => {
    for (const app of APPS) {
      expect(app.scheme).toMatch(/^[a-z]+:\/\/$/);
    }
  });

  test('every pkg is a reverse-DNS Android identifier', () => {
    for (const app of APPS) {
      expect(app.pkg).toMatch(/^[a-z]+(\.[a-z]+)+$/);
    }
  });

  test('every gradient is a 2-tuple of hex colors', () => {
    for (const app of APPS) {
      expect(app.gradient).toHaveLength(2);
      expect(app.gradient[0]).toMatch(/^#[0-9A-Fa-f]{6}$/);
      expect(app.gradient[1]).toMatch(/^#[0-9A-Fa-f]{6}$/);
    }
  });
});

describe('Play Store URL builders', () => {
  test('playStoreAppUrl uses market:// intent', () => {
    expect(playStoreAppUrl('com.example.app')).toBe('market://details?id=com.example.app');
  });

  test('playStoreWebUrl uses https web fallback', () => {
    expect(playStoreWebUrl('com.example.app')).toBe(
      'https://play.google.com/store/apps/details?id=com.example.app',
    );
  });
});

describe('chooseLaunchUrls', () => {
  const current = APPS.find(a => a.isCurrent)!;
  const other = APPS.find(a => !a.isCurrent)!;

  test('returns empty list for the current app (button disabled)', () => {
    expect(chooseLaunchUrls(current, 'installed')).toEqual([]);
    expect(chooseLaunchUrls(current, 'missing')).toEqual([]);
    expect(chooseLaunchUrls(current, 'checking')).toEqual([]);
  });

  test('installed app: scheme first, then market://, then https web', () => {
    const urls = chooseLaunchUrls(other, 'installed');
    expect(urls).toEqual([
      other.scheme,
      `market://details?id=${other.pkg}`,
      `https://play.google.com/store/apps/details?id=${other.pkg}`,
    ]);
  });

  test('missing app: skips scheme, goes straight to Play Store', () => {
    const urls = chooseLaunchUrls(other, 'missing');
    expect(urls).toEqual([
      `market://details?id=${other.pkg}`,
      `https://play.google.com/store/apps/details?id=${other.pkg}`,
    ]);
    expect(urls).not.toContain(other.scheme);
  });

  test('checking status behaves like missing (defensive — no scheme attempt yet)', () => {
    const urls = chooseLaunchUrls(other, 'checking');
    expect(urls).toEqual([
      `market://details?id=${other.pkg}`,
      `https://play.google.com/store/apps/details?id=${other.pkg}`,
    ]);
  });
});
