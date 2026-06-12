import {
  normalizeActivationCode,
  validateActivationCode,
} from '../src/utils/activation';

/**
 * NOTA DE SEGURIDAD: el código de activación real NO se escribe en este archivo
 * (el repo es público — exponerlo regalaría premium). Testeamos la PROPIEDAD de
 * normalización con valores neutros, no el código en sí. La validación case-
 * insensitive queda garantizada porque validateActivationCode hashea el resultado
 * de normalizeActivationCode.
 */
describe('normalizeActivationCode', () => {
  it('pasa el código a minúsculas (activación case-insensitive)', () => {
    expect(normalizeActivationCode('ABC$XyZ')).toBe('abc$xyz');
  });

  it('recorta espacios al inicio y al fin', () => {
    expect(normalizeActivationCode('   hola Mundo   ')).toBe('hola mundo');
  });

  it('combina trim + lowercase en un solo paso', () => {
    expect(normalizeActivationCode('  9$ProMo$2026  ')).toBe('9$promo$2026');
  });

  it('deja sin cambios un código ya normalizado', () => {
    expect(normalizeActivationCode('abc-123')).toBe('abc-123');
  });
});

describe('validateActivationCode', () => {
  it('rechaza un código incorrecto', () => {
    expect(validateActivationCode('no-es-el-codigo')).toBe(false);
  });

  it('rechaza una cadena vacía', () => {
    expect(validateActivationCode('')).toBe(false);
  });

  it('rechaza solo espacios', () => {
    expect(validateActivationCode('     ')).toBe(false);
  });

  it('da el mismo veredicto sin importar la capitalización', () => {
    // Invariante de case-insensitivity: cualquier código (válido o no) debe
    // producir el mismo resultado en mayúsculas, minúsculas o con espacios.
    const samples = ['aBc$Def$123', 'XyZ$Test$999', 'Promo$Code$1'];
    for (const s of samples) {
      const verdict = validateActivationCode(s);
      expect(validateActivationCode(s.toUpperCase())).toBe(verdict);
      expect(validateActivationCode(s.toLowerCase())).toBe(verdict);
      expect(validateActivationCode(`  ${s}  `)).toBe(verdict);
    }
  });
});
