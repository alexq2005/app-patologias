#!/usr/bin/env node
/**
 * Audit orphan refs in pathologies.json.
 *
 * Verifica que TODA entrada en `relatedPathologyIds` apunte a una patología
 * real (id existente). Falla con exit 1 si hay refs huérfanas — pensado
 * para correr en CI y prevenir que vuelva la deuda limpiada en sesión 14.
 *
 * Uso:
 *   node scripts/check-orphans.js
 *   npm run check:orphans
 *
 * Salida:
 *   exit 0 → OK, ninguna ref huérfana
 *   exit 1 → reporta cada huérfano con el listado de patologías que la referencian
 */

const path = require('path');
const fs = require('fs');

const JSON_PATH = path.join(__dirname, '..', 'src', 'data', 'pathologies.json');

function main() {
  const raw = fs.readFileSync(JSON_PATH, 'utf8');
  const data = JSON.parse(raw);

  if (!Array.isArray(data)) {
    console.error('ERROR: pathologies.json no es un array');
    process.exit(2);
  }

  const validIds = new Set(data.map(p => p.id));
  /** @type {Map<string, string[]>} orphan id → [referrer ids] */
  const orphans = new Map();

  for (const p of data) {
    const refs = p.relatedPathologyIds || [];
    for (const ref of refs) {
      if (!validIds.has(ref)) {
        if (!orphans.has(ref)) orphans.set(ref, []);
        orphans.get(ref).push(p.id);
      }
    }
  }

  if (orphans.size === 0) {
    console.log(`OK: ${data.length} patologías, 0 referencias huérfanas`);
    process.exit(0);
  }

  console.error(`FAIL: ${orphans.size} ids huérfanos referenciados en relatedPathologyIds:`);
  console.error('');
  for (const [orphan, referrers] of [...orphans.entries()].sort()) {
    console.error(`  ${orphan}`);
    for (const r of referrers) console.error(`    ← ${r}`);
  }
  console.error('');
  const totalRefs = [...orphans.values()].reduce((s, r) => s + r.length, 0);
  console.error(`Total: ${totalRefs} refs rotas. Para arreglar: rename a un id existente o remover de la entry.`);
  process.exit(1);
}

main();
