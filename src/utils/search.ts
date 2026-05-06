/**
 * Normalize text for accent + spelling-variant insensitive search.
 *
 * Steps (en orden):
 *   1. lowercase
 *   2. strip diacritics (NFD + remove combining marks) \u2192 "\u00f3" se vuelve "o"
 *   3. k \u2192 c \u2014 colapsa pares de ortograf\u00eda m\u00e9dica en espa\u00f1ol:
 *        "hiperkalemia" / "hipercalemia"  \u2192 ambos a "hipercalemia"
 *        "kalemia" / "calemia"            \u2192 ambos a "calemia"
 *      Ambos lados (query y contenido) pasan por este normalizer asi que la
 *      colision es bilateral. Falsos positivos teoricos en proper nouns con
 *      "k" pero ninguna patologia tiene ese caso.
 *   4. trim
 */
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/k/g, 'c')
    .trim();
}
