#!/usr/bin/env node
/**
 * Audit clinical-content freshness.
 *
 * Reporta:
 *   - Patologías SIN `revisadoEn` (no tienen fecha de revisión clínica registrada)
 *   - Patologías con `revisadoEn` MÁS VIEJO que STALE_THRESHOLD_MONTHS
 *
 * Salida:
 *   exit 0 — siempre. Este check es WARNING-only (informativo).
 *           No bloquea CI: el contenido tiene shelf-life largo y no toda
 *           patología necesita revisión simultánea. Sirve para priorizar
 *           qué revisar en próximas sesiones de contenido clínico.
 *
 *   El reporte va a stdout para que el job de CI lo deje visible en logs.
 *
 * Uso:
 *   node scripts/check-stale.js
 *   npm run check:stale
 */

const path = require('path');
const fs = require('fs');

const JSON_PATH = path.join(__dirname, '..', 'src', 'data', 'pathologies.json');
const STALE_THRESHOLD_MONTHS = 24;
const NOW = new Date();

function monthsBetween(dateStr) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return Infinity;
  const ms = NOW.getTime() - d.getTime();
  return Math.floor(ms / (1000 * 60 * 60 * 24 * 30.44));
}

function main() {
  const data = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8'));

  const noDate = [];
  const stale = [];
  const fresh = [];

  for (const p of data) {
    if (!p.revisadoEn) {
      noDate.push(p);
      continue;
    }
    const months = monthsBetween(p.revisadoEn);
    if (months > STALE_THRESHOLD_MONTHS) stale.push({ id: p.id, nombre: p.nombre, revisadoEn: p.revisadoEn, months });
    else fresh.push(p);
  }

  console.log(`Patologías totales:    ${data.length}`);
  console.log(`Con revisión fresca:   ${fresh.length}  (≤ ${STALE_THRESHOLD_MONTHS} meses)`);
  console.log(`Con revisión vieja:    ${stale.length}  (> ${STALE_THRESHOLD_MONTHS} meses)`);
  console.log(`Sin fecha de revisión: ${noDate.length}`);
  console.log('');

  if (stale.length > 0) {
    console.log(`=== Patologías con revisión > ${STALE_THRESHOLD_MONTHS} meses ===`);
    for (const s of stale.sort((a, b) => b.months - a.months).slice(0, 20)) {
      console.log(`  ${s.revisadoEn} (${s.months}m)  ${s.id}  — ${s.nombre}`);
    }
    if (stale.length > 20) console.log(`  ... y ${stale.length - 20} más`);
    console.log('');
  }

  if (noDate.length > 0 && noDate.length <= 30) {
    console.log('=== Patologías sin fecha de revisión ===');
    for (const p of noDate) console.log(`  ${p.id}  — ${p.nombre}`);
    console.log('');
  } else if (noDate.length > 30) {
    console.log(`(${noDate.length} patologías sin fecha — listado omitido por largo)`);
    console.log('');
  }

  console.log('Tip: agregar `revisadoEn: "YYYY-MM-DD"` y `fuentes: [...]` al editar cada patología.');
  console.log('Este check es WARNING-only y no bloquea CI.');
  process.exit(0);
}

main();
