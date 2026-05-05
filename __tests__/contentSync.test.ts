import {
  compareVersions,
  validateManifest,
  validateDataset,
  syncContent,
} from '../src/services/contentSync';

describe('compareVersions', () => {
  test('equal versions return 0', () => {
    expect(compareVersions('2.0.0', '2.0.0')).toBe(0);
  });

  test('lower returns -1', () => {
    expect(compareVersions('1.9.9', '2.0.0')).toBe(-1);
    expect(compareVersions('2.0.0', '2.0.1')).toBe(-1);
    expect(compareVersions('2.0.0', '2.1.0')).toBe(-1);
  });

  test('higher returns 1', () => {
    expect(compareVersions('2.1.0', '2.0.0')).toBe(1);
    expect(compareVersions('3.0.0', '2.99.99')).toBe(1);
  });

  test('tolerates pre-release suffix', () => {
    expect(compareVersions('2.0.0-rc1', '2.0.0')).toBe(0);
    expect(compareVersions('2.0.0-dev', '2.0.1')).toBe(-1);
  });

  test('missing components default to 0', () => {
    expect(compareVersions('2', '2.0.0')).toBe(0);
    expect(compareVersions('2.0', '2.0.1')).toBe(-1);
  });
});

describe('validateManifest', () => {
  const valid = {
    version: 2,
    url: 'https://example.com/pathologies.json',
    minAppVersion: '2.0.0',
    size: 2_500_000,
    updatedAt: '2026-05-05T00:00:00Z',
  };

  test('accepts well-formed manifest', () => {
    expect(validateManifest(valid)).toBe('ok');
  });

  test('rejects null/non-object', () => {
    expect(validateManifest(null)).not.toBe('ok');
    expect(validateManifest(42)).not.toBe('ok');
    expect(validateManifest('manifest')).not.toBe('ok');
  });

  test('rejects bad version', () => {
    expect(validateManifest({ ...valid, version: 0 })).not.toBe('ok');
    expect(validateManifest({ ...valid, version: -1 })).not.toBe('ok');
    expect(validateManifest({ ...valid, version: 'two' })).not.toBe('ok');
    expect(validateManifest({ ...valid, version: NaN })).not.toBe('ok');
  });

  test('rejects non-https url', () => {
    expect(validateManifest({ ...valid, url: 'http://example.com/x.json' })).not.toBe('ok');
    expect(validateManifest({ ...valid, url: 'ftp://example.com/x.json' })).not.toBe('ok');
    expect(validateManifest({ ...valid, url: '' })).not.toBe('ok');
  });

  test('rejects bad minAppVersion', () => {
    expect(validateManifest({ ...valid, minAppVersion: 'latest' })).not.toBe('ok');
    expect(validateManifest({ ...valid, minAppVersion: '2.0' })).not.toBe('ok');
  });

  test('rejects size out of bounds', () => {
    expect(validateManifest({ ...valid, size: 1024 })).not.toBe('ok');           // too small
    expect(validateManifest({ ...valid, size: 50_000_000 })).not.toBe('ok');     // too large
  });
});

describe('validateDataset', () => {
  const validEntry = { id: 'p1', nombre: 'Test', bodySystemId: 'sys' };

  test('accepts non-empty array of valid entries', () => {
    expect(validateDataset([validEntry])).toBe('ok');
    expect(validateDataset([validEntry, validEntry, validEntry])).toBe('ok');
  });

  test('rejects non-array', () => {
    expect(validateDataset({})).not.toBe('ok');
    expect(validateDataset('json')).not.toBe('ok');
    expect(validateDataset(null)).not.toBe('ok');
  });

  test('rejects empty array', () => {
    expect(validateDataset([])).not.toBe('ok');
  });

  test('rejects entry missing required field', () => {
    expect(validateDataset([{ id: 'p1', nombre: 'Test' }])).not.toBe('ok');       // no bodySystemId
    expect(validateDataset([{ id: 'p1', bodySystemId: 'sys' }])).not.toBe('ok');  // no nombre
    expect(validateDataset([{ nombre: 'Test', bodySystemId: 'sys' }])).not.toBe('ok'); // no id
  });
});

describe('syncContent', () => {
  test('returns disabled when feature flag is off (default)', async () => {
    const result = await syncContent();
    expect(result.status).toBe('disabled');
  });
});
