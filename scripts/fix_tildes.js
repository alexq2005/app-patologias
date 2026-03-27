#!/usr/bin/env node
/**
 * fix_tildes.js — Corrige acentos/tildes faltantes en pathologies.json
 * Aplica reglas de acentuación española a términos médicos
 */

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data', 'pathologies.json');

// Word-boundary replacements (case-preserving)
// Format: [wrong, correct]
const WORD_REPLACEMENTS = [
  // Medical terms - most common
  ['patologia', 'patología'], ['patologias', 'patologías'],
  ['fisiopatologia', 'fisiopatología'], ['fisiopatologico', 'fisiopatológico'],
  ['diagnostico', 'diagnóstico'], ['diagnosticos', 'diagnósticos'], ['diagnostica', 'diagnóstica'],
  ['clinico', 'clínico'], ['clinica', 'clínica'], ['clinicos', 'clínicos'], ['clinicas', 'clínicas'],
  ['cronico', 'crónico'], ['cronica', 'crónica'], ['cronicos', 'crónicos'], ['cronicas', 'crónicas'],
  ['sintoma', 'síntoma'], ['sintomas', 'síntomas'], ['sintomatico', 'sintomático'],
  ['caracteristico', 'característico'], ['caracteristica', 'característica'], ['caracteristicas', 'características'],
  ['tratamiento medico', 'tratamiento médico'],
  ['medico', 'médico'], ['medica', 'médica'],
  ['quirurgico', 'quirúrgico'], ['quirurgica', 'quirúrgica'],
  ['farmacologico', 'farmacológico'], ['farmacologica', 'farmacológica'],
  ['terapeutico', 'terapéutico'], ['terapeutica', 'terapéutica'],
  ['biologico', 'biológico'], ['biologica', 'biológica'],
  ['neurologico', 'neurológico'], ['neurologica', 'neurológica'],
  ['oncologico', 'oncológico'], ['oncologica', 'oncológica'],
  ['fisiologico', 'fisiológico'], ['fisiologica', 'fisiológica'],
  ['metabolico', 'metabólico'], ['metabolica', 'metabólica'],
  ['genetico', 'genético'], ['genetica', 'genética'],
  ['hepatico', 'hepático'], ['hepatica', 'hepática'],
  ['pancreatico', 'pancreático'], ['pancreatica', 'pancreática'],
  ['gastrico', 'gástrico'], ['gastrica', 'gástrica'],
  ['cardiaco', 'cardíaco'], ['cardiaca', 'cardíaca'],
  ['pulmonar cronico', 'pulmonar crónico'],
  ['renal cronico', 'renal crónico'], ['renal cronica', 'renal crónica'],
  ['sistemico', 'sistémico'], ['sistemica', 'sistémica'],
  ['isquemico', 'isquémico'], ['isquemica', 'isquémica'],
  ['hemorragico', 'hemorrágico'], ['hemorragica', 'hemorrágica'],
  ['osmotico', 'osmótico'], ['osmotica', 'osmótica'],
  ['idiopatico', 'idiopático'], ['idiopatica', 'idiopática'],
  ['asintomatico', 'asintomático'], ['asintomatica', 'asintomática'],
  ['anatomico', 'anatómico'], ['anatomica', 'anatómica'],
  ['patologico', 'patológico'], ['patologica', 'patológica'],
  ['epidemiologico', 'epidemiológico'],
  ['inmunologico', 'inmunológico'], ['inmunologica', 'inmunológica'],
  ['hematologico', 'hematológico'], ['hematologica', 'hematológica'],
  ['inflamatorio cronico', 'inflamatorio crónico'],
  ['historico', 'histórico'], ['historica', 'histórica'],

  // Common verbs/participles
  ['disfuncion', 'disfunción'], ['obstruccion', 'obstrucción'],
  ['inflamacion', 'inflamación'], ['infeccion', 'infección'],
  ['destruccion', 'destrucción'], ['produccion', 'producción'],
  ['absorcion', 'absorción'], ['secrecion', 'secreción'],
  ['excrecion', 'excreción'], ['reabsorcion', 'reabsorción'],
  ['filtración', 'filtración'], ['filtracion', 'filtración'],
  ['obstrucción', 'obstrucción'],
  ['perfusion', 'perfusión'], ['difusion', 'difusión'],
  ['lesion', 'lesión'], ['erosion', 'erosión'],
  ['ulceracion', 'ulceración'], ['cicatrizacion', 'cicatrización'],
  ['malformacion', 'malformación'], ['deformacion', 'deformación'],
  ['alteracion', 'alteración'], ['alteraciones', 'alteraciones'],
  ['regulacion', 'regulación'], ['desregulacion', 'desregulación'],
  ['reseccion', 'resección'], ['diseccion', 'disección'],
  ['ventilacion', 'ventilación'], ['oxigenacion', 'oxigenación'],
  ['respiracion', 'respiración'],
  ['circulacion', 'circulación'], ['coagulacion', 'coagulación'],
  ['alimentacion', 'alimentación'], ['nutricion', 'nutrición'],
  ['hidratacion', 'hidratación'], ['deshidratacion', 'deshidratación'],
  ['eliminacion', 'eliminación'], ['evacuacion', 'evacuación'],
  ['administracion', 'administración'],
  ['hospitalizacion', 'hospitalización'],
  ['rehabilitacion', 'rehabilitación'],
  ['educacion', 'educación'], ['valoracion', 'valoración'],
  ['evaluacion', 'evaluación'], ['clasificacion', 'clasificación'],
  ['manifestacion', 'manifestación'], ['manifestaciones', 'manifestaciones'],
  ['complicacion', 'complicación'], ['complicaciones', 'complicaciones'],
  ['intervencion', 'intervención'], ['intervenciones', 'intervenciones'],
  ['prevencion', 'prevención'], ['proteccion', 'protección'],
  ['deteccion', 'detección'], ['inspeccion', 'inspección'],
  ['palpacion', 'palpación'], ['auscultacion', 'auscultación'],
  ['percusion', 'percusión'],
  ['canalizacion', 'canalización'],
  ['monitorizacion', 'monitorización'],
  ['descompensacion', 'descompensación'],
  ['compensacion', 'compensación'],
  ['remision', 'remisión'], ['recidiva', 'recidiva'],
  ['exacerbacion', 'exacerbación'],
  ['degeneracion', 'degeneración'],
  ['proliferacion', 'proliferación'],
  ['diseminacion', 'diseminación'],
  ['metastasis', 'metástasis'],
  ['hemoptisis', 'hemoptisis'],
  ['dialisis', 'diálisis'],
  ['necrosis', 'necrosis'],
  ['fibrosis', 'fibrosis'],
  ['trombosis', 'trombosis'],
  ['estenosis', 'estenosis'],

  // Organs & anatomy
  ['pulmon', 'pulmón'], ['pulmones', 'pulmones'],
  ['corazon', 'corazón'],
  ['riñon', 'riñón'], ['rinon', 'riñón'],
  ['higado', 'hígado'],
  ['estomago', 'estómago'],
  ['esofago', 'esófago'],
  ['pancreas', 'páncreas'],
  ['prostata', 'próstata'],
  ['utero', 'útero'],
  ['medula', 'médula'],
  ['musculo', 'músculo'], ['musculos', 'músculos'],
  ['organo', 'órgano'], ['organos', 'órganos'],
  ['celula', 'célula'], ['celulas', 'células'],
  ['tejido conectivo', 'tejido conectivo'],
  ['arterias coronarias', 'arterias coronarias'],

  // Common adjectives
  ['rapido', 'rápido'], ['rapida', 'rápida'],
  ['ultimo', 'último'], ['ultima', 'última'],
  ['maximo', 'máximo'], ['maxima', 'máxima'],
  ['minimo', 'mínimo'], ['minima', 'mínima'],
  ['basico', 'básico'], ['basica', 'básica'],
  ['especifico', 'específico'], ['especifica', 'específica'],
  ['tipico', 'típico'], ['tipica', 'típica'],
  ['atipico', 'atípico'], ['atipica', 'atípica'],
  ['periferico', 'periférico'], ['periferica', 'periférica'],
  ['electrico', 'eléctrico'], ['electrica', 'eléctrica'],
  ['mecanico', 'mecánico'], ['mecanica', 'mecánica'],
  ['termico', 'térmico'], ['termica', 'térmica'],
  ['toxico', 'tóxico'], ['toxica', 'tóxica'],
  ['acido', 'ácido'],

  // Common nouns
  ['presion', 'presión'],
  ['tension', 'tensión'], ['hipertension', 'hipertensión'], ['hipotension', 'hipotensión'],
  ['perdida', 'pérdida'],
  ['tecnica', 'técnica'], ['tecnicas', 'técnicas'],
  ['numero', 'número'],
  ['periodo', 'período'],
  ['proposito', 'propósito'],
  ['analisis', 'análisis'],
  ['enfasis', 'énfasis'],
  ['traumatico', 'traumático'], ['traumatica', 'traumática'],

  // Verbs
  ['tambien', 'también'],
  ['mas', 'más'],         // careful - only standalone word
  ['asi', 'así'],

  // Common medical phrases
  ['dificil', 'difícil'],
  ['debil', 'débil'],
  ['fragil', 'frágil'],
  ['fertil', 'fértil'],
  ['esteril', 'estéril'],
  ['movil', 'móvil'],
  ['util', 'útil'],
  ['facil', 'fácil'],

  // Adverbs/prepositions
  ['despues', 'después'],

  // -ción endings that might be missed
  ['administracion', 'administración'],
  ['comunicacion', 'comunicación'],
  ['concentracion', 'concentración'],
  ['configuracion', 'configuración'],
  ['consideracion', 'consideración'],
  ['constipacion', 'constipación'],
  ['contraccion', 'contracción'],
  ['coordinacion', 'coordinación'],
  ['degradacion', 'degradación'],
  ['depuracion', 'depuración'],
  ['derivacion', 'derivación'],
  ['dilatacion', 'dilatación'],
  ['dislocacion', 'dislocación'],
  ['distribucion', 'distribución'],
  ['elevacion', 'elevación'],
  ['estimulacion', 'estimulación'],
  ['formacion', 'formación'],
  ['fragmentacion', 'fragmentación'],
  ['generacion', 'generación'],
  ['hiperactivacion', 'hiperactivación'],
  ['identificacion', 'identificación'],
  ['inactivacion', 'inactivación'],
  ['indicacion', 'indicación'],
  ['inhibicion', 'inhibición'],
  ['inmunizacion', 'inmunización'],
  ['inmovilizacion', 'inmovilización'],
  ['irrigacion', 'irrigación'],
  ['liberacion', 'liberación'],
  ['limitacion', 'limitación'],
  ['localizacion', 'localización'],
  ['lubricacion', 'lubricación'],
  ['mediacion', 'mediación'],
  ['medicacion', 'medicación'],
  ['migracion', 'migración'],
  ['modificacion', 'modificación'],
  ['movilizacion', 'movilización'],
  ['mutacion', 'mutación'],
  ['obliteracion', 'obliteración'],
  ['observacion', 'observación'],
  ['operacion', 'operación'],
  ['orientacion', 'orientación'],
  ['palpitacion', 'palpitación'],
  ['penetracion', 'penetración'],
  ['perforacion', 'perforación'],
  ['planificacion', 'planificación'],
  ['preparacion', 'preparación'],
  ['prolongacion', 'prolongación'],
  ['radicacion', 'radicación'],
  ['radiacion', 'radiación'],
  ['reaccion', 'reacción'],
  ['recuperacion', 'recuperación'],
  ['reduccion', 'reducción'],
  ['regeneracion', 'regeneración'],
  ['relacion', 'relación'],
  ['relajacion', 'relajación'],
  ['replicacion', 'replicación'],
  ['resolucion', 'resolución'],
  ['retencion', 'retención'],
  ['rotacion', 'rotación'],
  ['saturacion', 'saturación'],
  ['sedacion', 'sedación'],
  ['sensacion', 'sensación'],
  ['separacion', 'separación'],
  ['situacion', 'situación'],
  ['suplementacion', 'suplementación'],
  ['transfusion', 'transfusión'],
  ['vasoconstriccion', 'vasoconstricción'],
  ['vasodilatacion', 'vasodilatación'],

  // Additional -ión words
  ['acompanada', 'acompañada'], ['acompanado', 'acompañado'],
  ['danio', 'daño'], ['dano', 'daño'],
  ['anio', 'año'], ['anios', 'años'],
  ['nino', 'niño'], ['ninos', 'niños'],
  ['pequeno', 'pequeño'], ['pequena', 'pequeña'],
  ['rinones', 'riñones'],
  ['companero', 'compañero'],
  ['senales', 'señales'], ['senal', 'señal'],
  ['diseno', 'diseño'],
  ['ensenanza', 'enseñanza'],
];

// Read the file
let content = fs.readFileSync(filePath, 'utf8');
let totalReplacements = 0;

// Apply word-boundary replacements
for (const [wrong, correct] of WORD_REPLACEMENTS) {
  if (wrong === correct) continue; // Skip identity mappings

  // Build case-insensitive word-boundary regex
  // But only match the exact case pattern (lowercase)
  const escaped = wrong.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(?<![a-záéíóúñü])${escaped}(?![a-záéíóúñü])`, 'g');

  const before = content;
  content = content.replace(regex, correct);

  // Also try with first letter capitalized
  const wrongCap = wrong.charAt(0).toUpperCase() + wrong.slice(1);
  const correctCap = correct.charAt(0).toUpperCase() + correct.slice(1);
  const escapedCap = wrongCap.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regexCap = new RegExp(`(?<![a-záéíóúñüA-ZÁÉÍÓÚÑÜ])${escapedCap}(?![a-záéíóúñü])`, 'g');
  content = content.replace(regexCap, correctCap);

  if (content !== before) {
    const count = (before.length - content.length === 0)
      ? (content.match(new RegExp(correct.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length
      : Math.abs(before.length - content.length);
    totalReplacements++;
  }
}

// Also fix "mas" → "más" but only as standalone word (not inside "plasma", "masaje", etc.)
// Be very careful with this one
content = content.replace(/(?<![a-záéíóúñü])mas(?![a-záéíóúñü])/g, 'más');
content = content.replace(/(?<![a-záéíóúñüA-ZÁÉÍÓÚÑÜ])Mas(?![a-záéíóúñü])/g, 'Más');

// Fix common pattern: "cion" at end of word that should be "ción"
// Only if not already accented
content = content.replace(/([a-záéíóúñü])cion(?="|\s|,|\.|;|:|\))/g, '$1ción');

// Write the file
fs.writeFileSync(filePath, content, 'utf8');

console.log('✅ Tildes corregidas en pathologies.json');

// Verify it's still valid JSON
try {
  JSON.parse(content);
  console.log('✅ JSON válido');
} catch (e) {
  console.error('❌ JSON INVÁLIDO:', e.message);
  process.exit(1);
}
