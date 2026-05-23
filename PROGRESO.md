# Registro de Progreso — Patologias de Enfermeria

> **Politica**: Este documento se actualiza en CADA sesion donde se realice cualquier modificacion o actualizacion. Registra que se hizo, cuando, y el estado resultante.

---

## 2026-05-23 — Sesion 35: Revisión clínica de pat_epilepsia a ILAE 2017 + AES SE + ESETT 2020

### Resumen
Séptima iteración del segundo lote. La entry `pat_epilepsia` tenía 14 gaps significativos vs ILAE 2017 (clasificación de 3 niveles vigente) + AES 2016 + ESETT Lancet 2020 + RAMPART NEJM 2012: definición vaga sin criterio operacional ILAE 2014 (≥2 crisis o 1 + recurrencia ≥60% o síndrome); clasificación ILAE 2017 incompleta (faltaban los 3 niveles + etiología transversal + síndromes); Status Epilepticus sin distinción t1/t2 (cuándo tratar vs cuándo aparece daño irreversible); algoritmo SE por fases ausente (inicial → primario BZ → secundario AED → refractario anestésicos); LORAZEPAM IV como primera elección (entry tenía solo diazepam); midazolam IM por RAMPART 2012 ausente; ESETT Lancet 2020 (LEV=FOS=VPA en SE) no reflejado — entry tenía solo fenitoína IV; AEDs modernos ausentes (Lacosamida, Brivaracetam, Cenobamate, Perampanel, CBD/Epidiolex); Lamotrigina como AED preferido en embarazo ausente; refractariedad farmacológica ILAE 2010 (falla a 2 AED → cirugía) no definida; cirugía moderna (LITT, RNS, DBS) ausente; video-EEG y EEG continuo para SE no convulsivo ausentes; SUDEP factores y prevención no detallados; PNES (pseudocrisis) no diferenciadas de epilepsia verdadera.

Cross-check: ILAE 2017 Classification papers (Scheffer + Fisher, Epilepsia 2017), ILAE 2014 Operational Definition (Fisher, Epilepsia 2014), ILAE 2015 SE Definition, AES 2016 SE Treatment Guideline (Epilepsy Currents 2016), ESETT Trial (Lancet 2020;395:1217-1224), RAMPART (NEJM 2012). Edición quirúrgica de 6 secciones; el bloque farmacológico casi se duplicó (4→7) y la clasificación + noFarmacológico se triplicaron.

### Cambios en pat_epilepsia (`src/data/pathologies.json`)

| Sección | Cambio |
|---------|--------|
| `definicion` | Agregada definición OPERACIONAL ILAE 2014 vigente: ≥2 crisis no provocadas O 1 + recurrencia ≥60% O síndrome diagnosticado; distinción crisis aislada vs epilepsia |
| `clasificacion` | De 4 a 10 tipos: ILAE 2017 Niveles 1 (tipo de crisis focal/generalizada/desconocida con subclasificaciones), 2 (tipo de epilepsia), 3 (síndrome); etiología transversal (estructural/genética/infecciosa/metabólica/inmune/desconocida); SE con tiempos t1/t2 por tipo; SE no convulsivo (SENC); SE refractario y super-refractario |
| `diagnostico.pruebas` (reorganización 3→6) | EEG estándar refinado (sensibilidad 25-50% aislada); +Video-EEG en unidad epilepsia (clasificación + PNES + pre-cirugía); +EEG continuo en UCI (SE no convulsivo); RMN protocolo epilepsia 3T con secuencias específicas; Niveles AED solo con indicación específica (no rutina ILAE); +Evaluación pre-quirúrgica integrada (PET, SISCOM, MEG, sEEG) |
| `tratamientoMedico.objetivos` | De 3 a 10: monoterapia → 2 AED → derivación a cirugía si refractario (ILAE 2010); algoritmo SE por 4 fases; PNES con video-EEG; embarazo evitar VPA preferir lamotrigina/LEV; SUDEP prevención; restricciones legales |
| `farmacologico.VPA` | Refinado: CONTRAINDICADO en mujeres edad fértil sin anticoncepción documentada; hepatotoxicidad, hiperamonemia, pancreatitis |
| `farmacologico.LEV` | Refinado: + carga 60 mg/kg IV en SE (ESETT); efectos conductuales 10-20%; brivaracetam como alternativa |
| `farmacologico.Lamotrigina` (NUEVA) | Preferida embarazo + epilepsia focal/generalizada; titulación lenta obligatoria (rash 0.1-1% Stevens-Johnson); aclaramiento aumenta embarazo (ajustar dosis); ACO con estrógenos reduce nivel 50% |
| `farmacologico.Lacosamida` (NUEVA) | 3ª generación, inactivación lenta de canal de sodio; IV disponible para SE como alternativa; pocas interacciones; vigilar PR |
| `farmacologico.Benzodiazepinas SE` (refundida) | LORAZEPAM IV primera elección (vida media activa más larga que diazepam); MIDAZOLAM IM 10 mg si no acceso venoso (RAMPART NEJM 2012); midazolam IN/bucal alternativas; diazepam rectal pediátrico |
| `farmacologico.AED 2ª línea SE` (refundida) | ESETT Lancet 2020: LEV = FOS = VPA equivalentes (47% terminación); LEV preferido por seguridad; VPA más rápido (mediana 7 min); FOS con monitorización ECG estricta |
| `farmacologico.Anestésicos SE refractario` (NUEVA) | Midazolam infusión preferido por hemodinamia; Propofol con riesgo PROPOFOL INFUSION SYNDROME; Pentobarbital con vasopresores; EEG continuo guía destete tras 24-48h cesación ictal |
| `noFarmacologico` (4→13) | +Adherencia AED como prevención SE (30% de SE por suspensión); +Dieta cetogénica/Atkins modificada en refractario (50% reducción >50% crisis); +CBD/Epidiolex FDA 2018 (Dravet, Lennox-Gastaut, esclerosis tuberosa); +VNS implantable; +RNS (NeuroPace) responsiva; +DBS tálamo anterior; +LITT láser termoablación; +SUDEP prevención detallada; +PNES con video-EEG |
| `quirurgico` (3→6) | Refractariedad ILAE 2010 como gatillo; +LITT como alternativa mínimamente invasiva; +Neuromodulación VNS/RNS/DBS detalladas; +Electrodos intracraneales sEEG/subdurales como Fase 2 pre-quirúrgica |
| `revisadoEn` | `"2026-05-23"` |
| `fuentes` | 6 entradas: ILAE 2017 (Scheffer + Fisher) + ILAE 2014 op. def + AES SE + ESETT + RAMPART |

### Lo que NO se tocó (decisión deliberada)
- `epidemiologia`, `factoresRiesgo`, `fisiopatologia`, `signosYSintomas`: vigentes
- `anamnesis`, `examenFisico`: vigentes
- `cuidadosEnfermeria`, `NANDA/NIC/NOC`, `complicaciones`, `criteriosAlarma`: vigentes

### Verificaciones (CI gates)
- `node scripts/check-orphans.js` → OK: 151 patologías, 0 huérfanos
- `node scripts/check-stale.js` → **18 frescas** (era 17; +pat_epilepsia), 133 sin fecha
- `npx tsc --noEmit` → 0 errors
- `npm test` → 60/60 passed

### Segundo lote: 7/10 completo
1. ✅ pat_eap | 2. ✅ pat_cetoacidosis | 3. ✅ pat_tep | 4. ✅ pat_endocarditis | 5. ✅ pat_neumotorax | 6. ✅ pat_meningitis | 7. ✅ pat_epilepsia (sesión 35)
8. pat_tuberculosis | 9. pat_cirrosis | 10. pat_pancreatitis

### Commits esperados
- `content(pat_epilepsia): align with ILAE 2017 + AES SE algorithm + ESETT 2020`

---

## 2026-05-23 — Sesion 34: Revisión clínica de pat_meningitis a ESCMID + IDSA + Thwaites

### Resumen
Sexta iteración del segundo lote. La entry `pat_meningitis` tenía 12 gaps importantes vs guidelines vigentes: régimen empírico limitado a ceftriaxona aislada (faltaban vancomicina para neumococo resistente y ampicilina para Listeria en > 50a / inmunosupresión); sin PCR multiplex en LCR (BioFire ME panel, FDA-aprobado, detecta 14 patógenos en 1-2h y sigue positivo hasta 9 días tras ATB); sin ratio glucosa LCR/sangre (< 0.4 más específico que glucosa absoluta); procalcitonina ausente; criterios IDSA específicos para TC pre-PL no detallados; régimen TB completo (RIPE + dexametasona prolongada según Thwaites NEJM 2004) ausente; régimen criptocócico completo (anfo liposomal + flucitosina inducción → fluconazol consolidación → mantenimiento) ausente; quimioprofilaxis solo con rifampicina (faltan ciprofloxacino DU preferido y ceftriaxona IM en embarazo); reposo post-PL desactualizado (estudios modernos: NO previene cefalea; aguja atraumática sí); vacuna meningococo B (Bexsero/Trumenba) no diferenciada de la ACWY; encefalitis HSV con aciclovir empírico no explicitada como distinción crítica (meningoencefalitis = alteración conciencia).

Cross-check: ESCMID guideline Diagnosis and treatment of acute bacterial meningitis (Clin Microbiol Infect 2016, vigente con actualizaciones), IDSA Practice Guidelines Bacterial Meningitis (Clin Infect Dis 2004) + IDSA 2017 Encephalitis, Thwaites NEJM 2004 (dexametasona en TB meningitis), WHO 2022 Cryptococcal disease, BioFire ME panel evidencia clínica 2020-2024. Edición quirúrgica de 6 secciones.

### Cambios en pat_meningitis (`src/data/pathologies.json`)

| Sección | Cambio |
|---------|--------|
| `clasificacion` | De 4 a 9 tipos: meningitis bacteriana estratificada por edad/contexto (neonatos, 1m-18a, > 50a, post-neuro); +Encefalitis HSV distinguida; criptocócica + tuberculosa expandidas con régimen específico; advertencia "LCR normal no descarta meningitis temprana" |
| `diagnostico.pruebas.PL/LCR` | Refinada: aguja atraumática (Sprotte) reduce cefalea 50%; reposo horizontal NO previene cefalea (estudios modernos lo desmintieron); medición presión apertura; ratio glucosa LCR/sangre < 0.4; tubos numerados |
| `diagnostico.pruebas` (NUEVAS) | +PCR multiplex BioFire ME (14 patógenos 1-2h, positivo hasta 9 días post-ATB); +Procalcitonina sérica (> 0.5 sugiere bacteriana); +RMN cerebral (encefalitis HSV en temporales, complicaciones) |
| `diagnostico.pruebas.TC` | Refinada con criterios IDSA específicos pre-PL (inmunosupresión, ACV/masa previa, convulsión <1 sem, papiledema, Glasgow<14, déficit focal) |
| `tratamientoMedico.objetivos` | De 3 a 9: < 1h ATB (ESCMID), régimen estratificado por edad/contexto, dexametasona ANTES o JUNTO al ATB, distinguir meningoencefalitis → aciclovir empírico, SIADH con restricción hídrica, audiometría post-alta, notificación a salud pública |
| `farmacologico` (reorganización 3→6) | Ceftriaxona+Vancomicina (base adulto); +Ampicilina si >50a o inmunosuprimido (Listeria); Dexametasona timing crítico (antes o junto a ATB); Aciclovir empírico si encefalitis HSV; **NUEVO** régimen criptocócico (anfo liposomal+flucitosina 2 sem → fluconazol 800 8 sem → 200 mantenimiento + PL evacuadoras seriadas por PIC); **NUEVO** régimen TB (RIPE 2m → RI 7-10m + Dexametasona 6-8 sem prolongada — Thwaites NEJM 2004) |
| `noFarmacologico` (4→14) | Quimioprofilaxis expandida (ciprofloxacino DU preferido, rifampicina alternativa, ceftriaxona IM en embarazo); +Profilaxis Hib niños no vacunados; +Vacunación post-exposición (ACWY + B Bexsero/Trumenba); +Manejo HIC (manitol/salina hipertónica); +SIADH con restricción hídrica; +Aguja atraumática Sprotte/Whitacre (mejor prevención cefalea); +Audiometría post-alta; +Cribado de fístula LCR si recurrente |
| `quirurgico` (2→6) | DVE en hidrocefalia + VP definitiva si persistente + drenaje empiema/absceso + cierre fístula LCR + monitor PIC en encefalitis severa + retirada de derivación VP infectada |
| `revisadoEn` | `"2026-05-23"` |
| `fuentes` | 5 entradas: ESCMID + IDSA + Thwaites TB + BioFire ME + WHO cryptococcal |

### Lo que NO se tocó (decisión deliberada)
- `definicion`, `epidemiologia`, `factoresRiesgo`, `fisiopatologia`, `signosYSintomas`: vigentes
- `anamnesis`, `examenFisico`: vigentes
- `cuidadosEnfermeria`, `NANDA/NIC/NOC`, `complicaciones`, `criteriosAlarma`: vigentes

### Verificaciones (CI gates)
- `node scripts/check-orphans.js` → OK: 151 patologías, 0 huérfanos
- `node scripts/check-stale.js` → **17 frescas** (era 16; +pat_meningitis), 134 sin fecha
- `npx tsc --noEmit` → 0 errors
- `npm test` → 60/60 passed

### Segundo lote: 6/10 completo
1. ✅ pat_eap | 2. ✅ pat_cetoacidosis | 3. ✅ pat_tep | 4. ✅ pat_endocarditis | 5. ✅ pat_neumotorax | 6. ✅ pat_meningitis (sesión 34)
7. pat_epilepsia | 8. pat_tuberculosis | 9. pat_cirrosis | 10. pat_pancreatitis

### Commits esperados
- `content(pat_meningitis): align with ESCMID + IDSA + Thwaites + BioFire ME panel`

---

## 2026-05-23 — Sesion 33: Revisión clínica de pat_neumotorax a BTS 2023 + RCT Brown NEJM 2020

### Resumen
Quinta iteración del segundo lote. La entry `pat_neumotorax` tenía 11 gaps significativos vs BTS 2023 Pleural Disease and Procedures Statement + RCT Brown (NEJM 2020) + Hallows trial (Lancet 2020): paradigma terapéutico anclado al tamaño radiológico (< 2 cm = observación; > 2 cm = drenaje), cuando BTS 2023 abandonó completamente el corte de 2 cm y ahora la decisión es CLÍNICA por SÍNTOMAS independientemente del tamaño; manejo conservador para asintomático/mínimamente sintomático GRANDE no contemplado (RCT Brown demostró no-inferioridad de observación vs drenaje); ambulatorio con válvula Heimlich + catéter pigtail ausente (Hallows trial: alta el mismo día, reduce hospitalización); aspiración con aguja (NA) sin algoritmo claro; tubos pequeños (8-14 Fr) vs grandes no diferenciados; neumotórax catamenial (mujeres con endometriosis pleurodiafragmática) totalmente ausente como subtipo; O2 al 100% como "tratamiento" (BTS 2023 lo reposicionó como solo soporte por hipoxemia, no terapia primaria de reabsorción); descompresión por aguja con sitio único (ATLS 2018 actualizó a 4-5° EIC LAA como alternativa al clásico 2° EIC LMC); contraindicación permanente del BUCEO post-PSP ausente; restricciones de vuelo sin tiempo específico (1 sem post-resolución); pleurodesis sin diferenciar técnicas (talco vs abrasión).

Cross-check: BTS 2023 Pleural Disease and Procedures Statement, Brown SGA et al (NEJM 2020;382:405-415) RCT PSP, Hallows et al (Lancet 2020;396:39-49) RCT ambulatorio, ATLS 10ª edición. Edición quirúrgica de 5 secciones; el bloque noFarmacológico se cuadriplicó (3→11) y quirúrgico triplicó (2→7).

### Cambios en pat_neumotorax (`src/data/pathologies.json`)

| Sección | Cambio |
|---------|--------|
| `definicion` | Paradigma BTS 2023 explicitado: decisión por SÍNTOMAS no por tamaño; mención RCT Brown |
| `clasificacion` | De 5 a 8 tipos: agregado catamenial (mujeres reproductivas) + clasificación BTS 2023 por síntomas (asintomático/mínimamente sintomático vs sintomático significativo) + neumotórax a tensión refinado con dos sitios de descompresión (2° EIC LMC clásico + 4-5° EIC LAA ATLS 2018) |
| `diagnostico.pruebas.Rx` | Refinado: BTS 2023 ya NO usa corte ≥2 cm como umbral; Rx en espiración NO recomendada rutinariamente; cuantificación Collins opcional |
| `diagnostico.pruebas.POCUS` | Expandido: lung sliding, líneas B, lung point patognomónico; sensibilidad 90% vs 50% Rx supina |
| `diagnostico.pruebas` (NUEVAS) | +TC torácica (con indicaciones específicas, NO rutina); +Gasometría arterial (solo si SSP/inestable, no rutina en PSP) |
| `tratamientoMedico.objetivos` | De 3 a 8: descompresión inmediata en tensión, identificación de candidatos a conservador, ambulatorio con Heimlich, prevención de recurrencia (cesación tabáquica reduce 40%), restricciones específicas (vuelo, BUCEO de por vida), manejo psicosocial |
| `farmacologico.O2` | Reposicionado: BTS 2023 ya NO lo endorsa como "tratamiento" sino como soporte para hipoxemia real; precaución hipercapnia en SSP por EPOC |
| `farmacologico.Analgesia` | Ampliada: paracetamol+AINE primera línea, opioide si severo, premedicación pre-procedimiento, anestesia local con lidocaína |
| `noFarmacologico` (3→11) | Manejo CONSERVADOR como primera opción en asintomático (RCT Brown); aspiración con aguja con criterios; AMBULATORIO con catéter pigtail + válvula Heimlich (Hallows); tubos pequeños 8-14 Fr vs grandes 14-24 Fr según contexto; descompresión por aguja con dos sitios alternativos; criterios de retirada del tubo; cesación tabáquica obligatoria; restricciones (vuelo 1 sem, BUCEO contraindicado de por vida) |
| `quirurgico` (2→7) | VATS con indicaciones específicas (factor profesional, bilateral, hemoneumotórax, fuga >5-7 días, recurrencia, todos SSP); técnicas de pleurodesis diferenciadas (talco insuflación, abrasión mecánica, pleurectomía parcial); pleurodesis química por tubo como alternativa menos invasiva; cirugía CATAMENIAL específica (VATS + extirpación endometriósica + plicatura diafragmática + supresión hormonal); cirugía precoz en SSP |
| `revisadoEn` | `"2026-05-23"` |
| `fuentes` | 4 entradas: BTS 2023 + Brown NEJM 2020 + Hallows Lancet 2020 + ATLS 2018 |

### Lo que NO se tocó (decisión deliberada)
- `epidemiologia`, `factoresRiesgo`, `fisiopatologia`, `signosYSintomas`: vigentes
- `anamnesis`, `examenFisico`: vigentes
- `cuidadosEnfermeria`, `NANDA/NIC/NOC`, `complicaciones`, `criteriosAlarma`: vigentes

### Verificaciones (CI gates)
- `node scripts/check-orphans.js` → OK: 151 patologías, 0 huérfanos
- `node scripts/check-stale.js` → **16 frescas** (era 15; +pat_neumotorax), 135 sin fecha
- `npx tsc --noEmit` → 0 errors
- `npm test` → 60/60 passed

### Segundo lote: 5/10 completo
1. ✅ pat_eap | 2. ✅ pat_cetoacidosis | 3. ✅ pat_tep | 4. ✅ pat_endocarditis | 5. ✅ pat_neumotorax (sesión 33)
6. pat_meningitis | 7. pat_epilepsia | 8. pat_tuberculosis | 9. pat_cirrosis | 10. pat_pancreatitis

### Commits esperados
- `content(pat_neumotorax): align with BTS 2023 + RCT Brown + Hallows ambulatory`

---

## 2026-05-23 — Sesion 32: Revisión clínica de pat_endocarditis a ESC 2023 IE + Duke-ISCVID 2023 + POET

### Resumen
Cuarta iteración del segundo lote. La entry `pat_endocarditis` (Endocarditis Infecciosa) tenía 14 gaps significativos vs ESC 2023 IE Guidelines + criterios diagnósticos Duke-ISCVID 2023: criterios Duke "modificados" (2000) desactualizados — Duke-ISCVID 2023 incorpora TC cardíaca y PET-TC con FDG como criterios mayores adicionales; TC cardíaca multidetector ausente (CRITERIO MAYOR ahora); PET-TC con 18F-FDG ausente (criterio mayor en EI protésica > 3 meses); régimen para MSSA solo con cloxacilina (ESC 2023 valida cefazolina como primera elección preferida); régimen para enterococo con gentamicina sinérgica (ESC 2023 cambió a ampicilina + ceftriaxona — menos nefrotóxico, igual eficacia, ensayo Hokusai); daptomicina ausente como alternativa a vancomicina en MRSA y EI tricuspídea; OPAT (terapia parenteral ambulatoria) y transición oral POET (NEJM 2019) ausentes; Endocarditis Team multidisciplinario no mencionado (Class I ESC 2023); profilaxis antibiótica sin criterios restrictivos ESC 2023 (solo alto riesgo + procedimientos dentales con manipulación gingival/periapical); higiene oral como pilar primario subestimada; indicaciones quirúrgicas sin estratificación temporal emergente/urgente/electiva; cirugía precoz post-ACV embólico no contemplada (ESC 2023 cambió el dogma del "esperar 4 semanas" salvo HIC); RMN cerebral de cribado en S. aureus ausente; EI sobre dispositivos cardíacos (CIED) con extracción obligatoria del sistema no mencionada.

Cross-check: ESC 2023 IE Guidelines (Eur Heart J 2023;44:3948-4042), Duke-ISCVID 2023 (Fowler VG et al, Clin Infect Dis 2023;77:518-526), ensayo POET (NEJM 2019), EACTS/EANM endorsements 2024. Edición quirúrgica de 6 secciones; los bloques pruebas (3→6), farmacológico (3→7) y quirúrgico (2→8) se duplicaron o triplicaron.

### Cambios en pat_endocarditis (`src/data/pathologies.json`)

| Sección | Cambio |
|---------|--------|
| `definicion` | Actualizada a nomenclatura ESC 2023 — incluye dispositivos cardíacos; menciona Duke-ISCVID 2023 |
| `clasificacion` | De 3 a 10 tipos: criterios Duke-ISCVID 2023 (definitiva/posible/rechazada) + listas explícitas de criterios MAYORES (incluyendo TC, PET-TC, inspección quirúrgica) y MENORES + 5 tipos clínicos por contexto (NVE, PVE precoz, PVE tardía, CIED, UDIV) |
| `diagnostico.pruebas.Ecocardiograma` | Refinado: TTE primero, TEE si negativo o protésica/CIED/S. aureus; criterios de repetición a 5-7 días |
| `diagnostico.pruebas` (NUEVAS) | +TC cardíaca multidetector (CRITERIO MAYOR Duke-ISCVID 2023 + planificación quirúrgica); +PET-TC con 18F-FDG (criterio mayor en PVE > 3 meses, dieta cetogénica previa); +RMN cerebral cribado (ESC 2023 en S. aureus, cambia decisión quirúrgica) |
| `tratamientoMedico.objetivos` | De 3 a 8: tratamiento dirigido por antibiograma, OPAT y transición oral POET, Endocarditis Team Class I, manejo de puerta de entrada, evaluación quirúrgica precoz, cribado de complicaciones embolicas, higiene oral pilar primario |
| `farmacologico` (reorganización 3→7) | Empírico inicial con cobertura amplia; **Streptococcus**: penicilina/ceftriaxona ± gentamicina (corto 2 sem si bajo riesgo); **MSSA**: cefazolina PRIMERA elección (preferida sobre cloxacilina ESC 2023); **MRSA**: vancomicina o daptomicina (dosis altas, no en EI izquierda con neumonía); **Enterococo**: ampicilina + ceftriaxona (NO gentamicina rutinaria); **HACEK**: ceftriaxona OPAT-friendly; **fúngica**: anfo liposomal + equinocandina + cirugía casi obligatoria + supresión oral indefinida |
| `noFarmacologico` (3→10) | Endocarditis Team Class I; higiene oral rigurosa como pilar primario; profilaxis ATB ESC 2023 RESTRINGIDA (solo alto riesgo + procedimientos dentales específicos); cuidado de catéter central; OPAT criterios; transición oral POET; identificación de puerta de entrada (colonoscopia si S. gallolyticus); manejo psicosocial del UDIV con derivación a adicciones |
| `quirurgico` (2→8) | Indicaciones estratificadas EMERGENTE (<24h shock), URGENTE (días, infección no controlada/embolia/PVE precoz), ELECTIVA; prevención de embolia con vegetación > 10 mm + embolia previa o > 30 mm sola; reparación valvular preferida sobre reemplazo; cirugía precoz post-ACV embólico (ESC 2023 NO la contraindica salvo HIC — cambio paradigmático); extracción COMPLETA del sistema CIED obligatoria (Class I); cirugía de aneurisma micótico cerebral |
| `revisadoEn` | `"2026-05-23"` |
| `fuentes` | 4 entradas: ESC 2023 IE + Duke-ISCVID 2023 + POET + EACTS/EANM endorsements |

### Lo que NO se tocó (decisión deliberada)
- `epidemiologia`, `factoresRiesgo`, `fisiopatologia`, `signosYSintomas`: vigentes
- `anamnesis`, `examenFisico`: vigentes (lesiones de Osler/Janeway/Roth ya estaban)
- `cuidadosEnfermeria`, `NANDA/NIC/NOC`, `complicaciones`, `criteriosAlarma`: vigentes

### Verificaciones (CI gates)
- `node scripts/check-orphans.js` → OK: 151 patologías, 0 huérfanos
- `node scripts/check-stale.js` → **15 frescas** (era 14; +pat_endocarditis), 136 sin fecha
- `npx tsc --noEmit` → 0 errors
- `npm test` → 60/60 passed

### Segundo lote: 4/10 completo
1. ✅ pat_eap | 2. ✅ pat_cetoacidosis | 3. ✅ pat_tep | 4. ✅ pat_endocarditis (sesión 32)
5. pat_neumotorax | 6. pat_meningitis | 7. pat_epilepsia | 8. pat_tuberculosis | 9. pat_cirrosis | 10. pat_pancreatitis

### Commits esperados
- `content(pat_endocarditis): align with ESC 2023 IE + Duke-ISCVID 2023 + POET`

---

## 2026-05-23 — Sesion 31: Revisión clínica de pat_tep a ESC 2019 PE + DOAC en cáncer

### Resumen
Tercera iteración del segundo lote. La entry `pat_tep` (Tromboembolismo Pulmonar) tenía 15 gaps importantes vs ESC 2019 PE Guidelines (vigentes en 2024) + actualizaciones DOAC: clasificación con nomenclatura AHA 2011 antigua ("masivo/submasivo/no masivo") cuando ESC 2019 usa el esquema de 4 categorías de riesgo (alto/intermedio-alto/intermedio-bajo/bajo); ausencia de PESI/sPESI (Class I para estratificación a 30 días); algoritmo diagnóstico sin D-dímero ajustado por edad ni YEARS; HBPM y fondaparinux ausentes (ESC 2019 los prefiere sobre HNF en TEP no alto riesgo); DOACs limitados a 2 (faltan edoxaban y dabigatrán); DOAC en cáncer ausente (Hokusai-VTE Cancer, SELECT-D, Caravaggio cambiaron la práctica); CDT y trombectomía mecánica percutánea (FlowTriever) ausentes; PERT ausente; anticoagulación empírica precoz no mencionada; duración estratificada por etiología no detallada; HFNC ausente; filtro VCI sin criterios restrictivos ESC; tratamiento ambulatorio de TEP bajo riesgo no contemplado; cribado de HTPC post-TEP solo mencionado como complicación.

Cross-check: ESC 2019 PE Guidelines (Eur Heart J 2019;41:543-603), ACCP CHEST 2021 Update, ensayos AMPLIFY/EINSTEIN-PE/Hokusai-VTE/RE-COVER (DOAC en TEP), Hokusai-VTE Cancer/SELECT-D/Caravaggio (DOAC en cáncer), PEITHO (tenecteplase intermedio-alto), HERDOO2 (recurrencia). Edición quirúrgica de 6 secciones; el bloque farmacológico se duplicó (3→6).

### Cambios en pat_tep (`src/data/pathologies.json`)

| Sección | Cambio |
|---------|--------|
| `clasificacion` | De 3 a 5 tipos: actualizada a esquema ESC 2019 (alto / intermedio-alto / intermedio-bajo / bajo) + agregado PESI/sPESI con componentes y umbrales explícitos |
| `diagnostico.pruebas.D-dímero` | Refinado con cutoff ajustado por edad (edad×10 si >50a — aumenta exclusión de 6% a 30% en >75a) y algoritmo YEARS (3 ítems + cutoffs 1000/500) |
| `diagnostico.pruebas.Biomarcadores` | Refundidos como troponina hs + BNP/NT-proBNP combinados — orientan subclasificación intermedio-alto vs bajo |
| `diagnostico.pruebas.Ecocardiograma` | Refinado con signos específicos VD (McConnell, TAPSE<17, signo 60/60, relación VD/VI>1, trombo en tránsito) |
| `diagnostico.pruebas.PESI/sPESI` (NUEVA) | sPESI explicado con 6 variables binarias y umbrales (0=bajo riesgo, ≥1=no bajo) |
| `tratamientoMedico.objetivos` | De 4 a 10: anticoagulación empírica precoz, PESI/sPESI obligatorio, trombolisis RESCATE en intermedio-alto (PEITHO), bajo riesgo ambulatorio con criterios Hestia, PERT, duración estratificada, cribado HTPC |
| `farmacologico.HBPM/Fondaparinux` (NUEVA) | Primera línea ESC 2019 en TEP no alto riesgo; enoxaparina/dalteparina/tinzaparina/fondaparinux con dosis y ajustes renales |
| `farmacologico.HNF` | Reposicionada como reserva para alto riesgo + trombolisis + ERC severa; antídoto protamina; vigilancia HIT |
| `farmacologico.Alteplasa` | Refinada: TEP alto riesgo primera línea, RESCATE en intermedio-alto si deterioro (NO sistemática post-PEITHO), tenecteplase como alternativa bolo único |
| `farmacologico.DOACs` (expandida) | 4 DOACs completos (Apixaban, Rivaroxaban, Edoxaban, Dabigatrán) — single-drug vs lead-in con HBPM; reducción de dosis para extensión post-6 meses; antídotos (idarucizumab, andexanet, PCC); duración estratificada por etiología |
| `farmacologico.DOAC en cáncer` (NUEVA) | Apixaban/Rivaroxaban/Edoxaban como alternativa o reemplazo de HBPM (Hokusai-VTE Cancer, SELECT-D, Caravaggio); Apixaban con perfil de sangrado más favorable |
| `farmacologico.Norepinefrina + Dobutamina` (NUEVA) | ESC 2019: norepinefrina primera línea para shock obstructivo (NO dopamina); precaución con bolos grandes que distienden VD; dobutamina si bajo gasto |
| `noFarmacologico` (3→11) | HFNC; precaución con fluidos en VD dilatado; PERT activado en intermedio-alto/alto; tratamiento ambulatorio con criterios Hestia; profilaxis recurrencia; cribado HTPC a 3-6 meses con disnea persistente; trombofilia solo en casos seleccionados; cribado oncológico básico en TEP no provocado |
| `quirurgico` (2→6) | CDT con catéteres específicos (EkoSonic, FlowTriever); trombectomía mecánica percutánea; embolectomía quirúrgica de emergencia; FVCI con criterios restrictivos ESC 2019 (recuperables, retirar 1-3 meses); tromboendarterectomía pulmonar para HTPC; ECMO V-A como puente |
| `revisadoEn` | `"2026-05-23"` |
| `fuentes` | 5 entradas: ESC 2019 PE + CHEST 2021 + ensayos clave DOAC + DOAC en cáncer + PEITHO |

### Lo que NO se tocó (decisión deliberada)
- `epidemiologia`, `factoresRiesgo`, `fisiopatologia`, `signosYSintomas`: vigentes
- `anamnesis`, `examenFisico`: vigentes
- `cuidadosEnfermeria`, `NANDA/NIC/NOC`, `complicaciones`, `criteriosAlarma`: vigentes

### Verificaciones (CI gates)
- `node scripts/check-orphans.js` → OK: 151 patologías, 0 huérfanos
- `node scripts/check-stale.js` → **14 frescas** (era 13; +pat_tep), 137 sin fecha
- `npx tsc --noEmit` → 0 errors
- `npm test` → 60/60 passed

### Segundo lote: 3/10 completo
1. ✅ pat_eap | 2. ✅ pat_cetoacidosis | 3. ✅ pat_tep (sesión 31)
4. pat_endocarditis | 5. pat_neumotorax | 6. pat_meningitis | 7. pat_epilepsia | 8. pat_tuberculosis | 9. pat_cirrosis | 10. pat_pancreatitis

### Commits esperados
- `content(pat_tep): align with ESC 2019 PE + DOAC expansion + cancer-DOAC`

---

## 2026-05-22 — Sesion 30: Revisión clínica de pat_cetoacidosis a ADA 2024 hyperglycemic crises + ISPAD 2022

### Resumen
Segunda iteración del segundo lote. La entry `pat_cetoacidosis` (CAD) tenía 10 gaps significativos vs ADA 2024 consensus: criterio de glucemia desactualizado ("> 250 mg/dL" cuando ADA 2024 lo simplificó a ≥ 200 o historia DM); CAD euglucémica solo mencionada en factores de riesgo, no como entidad ni como ~10% de casos (mayoría por SGLT2i); HHS y overlap CAD/HHS ausentes (overlap = 27% de los casos); soluciones balanceadas (Ringer/Plasma-Lyte) no contempladas — entry usa solo SF 0.9% (ADA 2024 sugiere preferencia por balanceadas tras PLUS/BaSICS/SMART); insulina SC c/1-2h como alternativa en CAD leve ausente; bicarbonato no aclarado (solo si pH < 6.9); manitol/salina hipertónica para edema cerebral pediátrico no listados; transición IV → SC sin overlap explícito (error frecuente que causa rebote); HBPM profiláctica ausente; búsqueda sistemática de precipitante no detallada como prueba.

Cross-check: ADA Hyperglycemic Crises Consensus 2024 (Diabetes Care 2024;47:1257-1275), ISPAD 2022 DKA/HHS guidelines, BSPED 2021 pediatric DKA, ensayos PLUS-AKI/BaSICS/SMART para cristaloides. Edición quirúrgica de 6 secciones; el bloque farmacológico se duplicó (3→6).

### Cambios en pat_cetoacidosis (`src/data/pathologies.json`)

| Sección | Cambio |
|---------|--------|
| `definicion` | Criterios actualizados a ADA 2024: glucemia ≥ 200 (no > 250); 3 pilares (hiperglucemia + cetonas + acidosis); CAD euglucémica explicitada |
| `clasificacion` | De 3 a 6 tipos: severidad CAD leve/moderada/severa actualizada + agregadas CAD euglucémica + HHS (con bicarbonato < 15) + overlap CAD/HHS (27%) |
| `diagnostico.pruebas.K` | Refinado con valores umbral por estratos (3.3 / 3.3-5.2 / >5.2) + ECG continuo para alteraciones |
| `diagnostico.pruebas` (NUEVAS) | +Osmolaridad sérica efectiva + sodio corregido (diferenciar CAD/HHS); +Búsqueda sistemática del precipitante (40% infección, 25% omisión, IAM silente, SGLT2i euglucémica) |
| `tratamientoMedico.objetivos` | De 3 a 9: cetonemia como marcador primario de resolución, reducción gradual de glucemia (50-75 mg/dL/h), cristaloides balanceados ADA 2024, evitar hipoglucemia con glucosa 5-10% a partir de glucemia < 200, prevenir edema cerebral, HBPM profiláctica, transición SC con overlap obligatorio |
| `farmacologico.Insulina IV` | Refinada: sin bolo inicial (alineado), doblar tasa si glucemia no baja 10% primera hora, reducir + glucosa al alcanzar 200-250, transición SC con overlap 1-2h |
| `farmacologico.Insulina SC` (NUEVA) | Análogo rápido SC c/1-2h en CAD LEVE sin hipoperfusión — reduce necesidad de UCI; bolo 0.3 UI/kg + 0.1 UI/kg c/h |
| `farmacologico.Cristaloides` | Reposicionada como "Balanceada (Ringer/Plasma-Lyte) preferida sobre SF 0.9%" (ADA 2024); cambio a SF 0.45% si Na corregido alto; cálculo pediátrico cauto |
| `farmacologico.KCl` | Refinada con tabla por estratos (< 3.3 suspender insulina y reponer; 3.3-5.2 reponer + insulina; > 5.2 insulina sin reponer); detalles de administración periférica vs central |
| `farmacologico.Bicarbonato` (NUEVO) | Indicación restrictiva: SOLO si pH < 6.9; dosis 100 mEq + 20 KCl en 2h; advertencia ADA 2024 sobre NO uso rutinario |
| `farmacologico.Manitol / Salina hipertónica 3%` (NUEVO) | ISPAD 2022 para edema cerebral pediátrico: manitol 0.5-1 g/kg en 30 min o salina 3% 5-10 mL/kg; iniciar AL SOSPECHAR sin esperar TC; mortalidad 20-40% por edema |
| `noFarmacologico` (3→10) | Doble acceso + vía exclusiva insulina; sonda vesical; tratar precipitante (incluida suspensión de SGLT2i si euglucémica); HBPM; transición SC con overlap; sick day rules pre-alta; identificación de causas evitables (adherencia, bomba, diabulimia); coordinación diabetología |
| `revisadoEn` | `"2026-05-22"` |
| `fuentes` | 3 entradas: ADA 2024 + ISPAD 2022 + ensayos clave de cristaloides + BSPED |

### Lo que NO se tocó (decisión deliberada)
- `epidemiologia`, `factoresRiesgo`, `fisiopatologia`, `signosYSintomas`: vigentes
- `anamnesis`, `examenFisico`: vigentes
- `quirurgico`: correctamente vacío (CAD no tiene cirugía)
- `cuidadosEnfermeria`, `NANDA/NIC/NOC`, `complicaciones`, `criteriosAlarma`: vigentes

### Verificaciones (CI gates)
- `node scripts/check-orphans.js` → OK: 151 patologías, 0 huérfanos
- `node scripts/check-stale.js` → **13 frescas** (era 12; +pat_cetoacidosis), 138 sin fecha
- `npx tsc --noEmit` → 0 errors
- `npm test` → 60/60 passed

### Segundo lote: 2/10 completo
1. ✅ pat_eap (sesión 29) — commit `71e45b6`
2. ✅ pat_cetoacidosis (sesión 30) — pendiente commit
3. pat_tep, 4. pat_endocarditis, 5. pat_neumotorax, 6. pat_meningitis, 7. pat_epilepsia, 8. pat_tuberculosis, 9. pat_cirrosis, 10. pat_pancreatitis

### Commits esperados
- `content(pat_cetoacidosis): align with ADA 2024 hyperglycemic crises + ISPAD 2022`

---

## 2026-05-22 — Sesion 29: Revisión clínica de pat_eap a ESC 2021/2023 HF — inicio del segundo lote

### Resumen
Primera iteración del segundo lote priorizado tras cerrar el top-10. La entry `pat_eap` (Edema Agudo de Pulmón) tenía gaps importantes vs ESC 2021 HF + ESC 2023 Focused Update + ensayos recientes: no contextualizaba EAP como subtipo de Insuficiencia Cardíaca Aguda (ICA); clasificación solo con Killip-Kimball (que es exclusiva para contexto IAM) sin perfiles hemodinámicos Stevenson (warm/cold-dry/wet) que orientan el tratamiento en ICA en general; sin acetazolamida como add-on a furosemida (ADVOR 2022); sin tiazida en resistencia diurética; sin SGLT2i de inicio precoz (EMPULSE — dapagliflozin/empagliflozin < 72h del ingreso); sin nitroprusiato para crisis HTA con EAP; sin norepinefrina para shock cardiogénico asociado (ESC 2021 preferida sobre dopamina por SOAP II); morfina sin clarificar la NO-recomendación ESC 2023; sin POCUS pulmonar (líneas B difusas) como herramienta diagnóstica; SpO2 target sin techo (ESC 2023: 92-96%, no hiperoxigenar); sin HFNC como alternativa a VNI; sin anticoagulación profiláctica; sin mención del inicio precoz de la terapia 4-pilares post-estabilización.

Cross-check: ESC 2021 HF Guidelines (Eur Heart J 2021), ESC 2023 Focused Update (Eur J Heart Fail 2024), ADVOR trial (NEJM 2022), EMPULSE trial (Nat Med 2022), CARRESS-HF, SOAP II, ACVC/ESC Scientific Statement 2022. Edición quirúrgica de 6 secciones; el bloque farmacológico se casi triplicó (3→8).

### Cambios en pat_eap (`src/data/pathologies.json`)

| Sección | Cambio |
|---------|--------|
| `definicion` | Contextualizada como presentación clínica de ICA (entre ADHF, shock cardiogénico, falla derecha aislada); diferencia cardiogénico vs no-cardiogénico (SDRA, neurogénico, post-obstructivo) |
| `clasificacion` | De 4 a 8 tipos: agregados 4 perfiles hemodinámicos Stevenson (Warm-Dry/Wet, Cold-Dry/Wet) que orientan tratamiento + mantenida Killip-Kimball pero contextualizada como específica de IAM |
| `diagnostico.pruebas.BNP` | Refinado con valores de corte por edad (NT-proBNP), zona gris, falsos positivos y negativos |
| `diagnostico.pruebas` (NUEVAS) | +POCUS pulmonar (líneas B difusas — confirma edema más rápido que Rx, repetible para evaluar respuesta al diurético); +ECG urgente en los primeros 10 min (clave para identificar IAM como causa) |
| `tratamientoMedico.objetivos` | De 4 a 9: SpO2 92-96% (no hiperoxigenar), descongestión rápida con reevaluación 2-6h, SGLT2i precoz (EMPULSE < 72h), HBPM profiláctica, inicio 4-pilares pre-alta, manejo de Cold-Wet con inotrópicos/vasopresores |
| `farmacologico.Furosemida` | Refinada con estrategia ESC 2023: dosis IV = 1-2.5x dosis oral diaria, reevaluación 2-6h, escalado a doble dosis o infusión continua según respuesta |
| `farmacologico.Acetazolamida` (NUEVA) | 500 mg IV/día x 3 días como add-on a furosemida (ADVOR 2022) — mejora descongestión y reduce estancia ~1 día |
| `farmacologico.Tiazida` (NUEVA) | HCTZ o metolazone para resistencia diurética; bloqueo segmentario secuencial; vigilancia estricta de electrolitos |
| `farmacologico.Nitroprusiato` (NUEVA) | 0.3-10 mcg/kg/min IV en crisis HTA con EAP o regurgitación mitral aguda; vigilar toxicidad cianide |
| `farmacologico.Norepinefrina` (NUEVA) | 0.05-1 mcg/kg/min IV en shock cardiogénico asociado (Cold-Wet); preferida sobre dopamina (SOAP II); acceso central obligatorio |
| `farmacologico.SGLT2i` (NUEVA) | Dapa/Empa 10 mg VO/día iniciados < 72h del ingreso (EMPULSE) — continuar al alta como parte del 4-pilares |
| `farmacologico.Morfina` | Refundida con la NO-recomendación rutinaria de ESC 2023; alternativas (VNI calma al mejorar disnea) |
| `noFarmacologico` (4→13) | Posición + O2 titulado SpO2 92-96% + VNI con presiones específicas + HFNC + intubación con criterios + accesos + sonda vesical + reperfusión coronaria urgente + soporte mecánico (BCIA/Impella/ECMO) + ultrafiltración como rescate + HBPM profiláctica + educación post-estabilización |
| `quirurgico` (2→6) | Reperfusión + reparación de complicaciones mecánicas IAM (rotura papilar/tabique/pared libre) + cirugía valvular urgente (RM aguda, EAo crítica) + soporte mecánico + pericardiocentesis si taponamiento + cierre CIV post-IAM |
| `revisadoEn` | `"2026-05-22"` |
| `fuentes` | 4 entradas: ESC 2021 HF + 2023 Focused Update + ensayos ADVOR/EMPULSE/CARRESS-HF/SOAP II + ACVC Statement 2022 |

### Lo que NO se tocó (decisión deliberada)
- `epidemiologia`, `factoresRiesgo`, `fisiopatologia`, `signosYSintomas`: vigentes
- `anamnesis`, `examenFisico`: vigentes
- `cuidadosEnfermeria`, `NANDA/NIC/NOC`, `complicaciones`, `criteriosAlarma`: vigentes (criteriosAlarma cubre lo esencial)

### Verificaciones (CI gates)
- `node scripts/check-orphans.js` → OK: 151 patologías, 0 huérfanos
- `node scripts/check-stale.js` → **12 frescas** (era 11; +pat_eap), 139 sin fecha
- `npx tsc --noEmit` → 0 errors
- `npm test` → 60/60 passed

### Segundo lote priorizado (definido en CLINICAL_REVIEW_PLAN.md)

10 patologías propuestas, en orden de prioridad:
1. ✅ pat_eap (ESC 2021/2023 HF + ADVOR + EMPULSE) — sesión 29
2. pat_cetoacidosis (ADA 2024 hyperglycemic crises + ISPAD 2022)
3. pat_tep (ESC 2019/2024 PE + DOACs)
4. pat_endocarditis (ESC 2023 IE)
5. pat_neumotorax (BTS 2023 + ACEP guideline)
6. pat_meningitis (IDSA + ESCMID 2024)
7. pat_epilepsia (ILAE 2017 + AES 2024 status epilepticus)
8. pat_tuberculosis (WHO 2022 + ATS/CDC/IDSA 2024)
9. pat_cirrosis (AASLD 2024 + Baveno VII)
10. pat_pancreatitis (AGA 2018 + ACG 2024 + revised Atlanta)

### Commits esperados
- `content(pat_eap): align with ESC 2021/2023 HF + ADVOR + EMPULSE — opens second priority queue`

---

## 2026-05-22 — Sesion 28: Revisión clínica de pat_angina a ESC 2024 Chronic Coronary Syndromes 🎯 MILESTONE: TOP-10 COMPLETO

### Resumen
Décima iteración y CIERRE del queue top-10 priorizado. La entry `pat_angina` tenía gaps de paradigma vs ESC 2024 CCS: nomenclatura desactualizada (la entry usaba "angina de pecho/estable" cuando ESC desde 2019 introdujo Chronic Coronary Syndromes — CCS — como término paraguas que reemplaza "estable"); angina inestable mezclada en la clasificación CCS (en realidad pertenece a NSTE-ACS, síndromes AGUDOS); ausencia total de CCTA (Coronary CT Angiogram) como primera línea no invasiva, FFR/iFR para evaluación funcional intracoronaria, calcio score, tests funcionales con imagen (SPECT/eco-stress/RMN); INOCA/MINOCA/ANOCA como entidades reconocidas en ESC 2024 ausentes; algoritmo terapéutico ESC 2024 escalonado (BB+BCC Paso 1, nitratos LA/ranolazina/ivabradina Paso 2) ausente; ranolazina e ivabradina como antianginosos modernos ausentes; bloqueantes de calcio (BCC) no listados explícitamente en farmacológico; IECA/ARA-II como prevención secundaria ausentes; target LDL < 55 no especificado; criterios PCI vs CABG con Heart Team y SYNTAX/FFR no detallados; vacunación específica (influenza Class I en CCS) ausente.

Cross-check: ESC 2024 CCS Guidelines (Eur Heart J 2024), ESC 2019 CCS (base del renombramiento), Cuarta Definición Universal del IM 2018, ensayos clave ISCHEMIA/FREEDOM/STICH/REDUCE-IT. Edición quirúrgica de 7 secciones; el bloque farmacológico se más que duplicó (4→9) reorganizado por modelo terapéutico escalonado.

### Cambios en pat_angina (`src/data/pathologies.json`)

| Sección | Cambio |
|---------|--------|
| `definicion` | Actualizada a nomenclatura ESC 2019/2024: CCS como espectro continuo; angina inestable EXCLUIDA explícitamente del CCS (pertenece a NSTE-ACS) |
| `clasificacion` | De 6 a 11 tipos: severidad Canadian CCS I-IV mantenida + 3 escenarios clínicos ESC 2024 + Prinzmetal/vasoespástica refinada + ANOCA/INOCA + MINOCA + nota separadora sobre angina inestable como NSTE-ACS |
| `diagnostico.pruebas.ECG` | Refinada con elevación transitoria de ST como pista para Prinzmetal |
| `diagnostico.pruebas` (NUEVAS) | +CCTA como 1ª línea ESC 2024 (pretest 5-50%); +Calcio score CAC; +Tests funcionales con imagen (eco-stress, SPECT, PET, RMN con stress); +FFR/iFR durante cateterismo (Class I para estenosis intermedias) |
| `tratamientoMedico.objetivos` | De 4 a 9: alivio + TMO (BB/BCC Paso 1) + AAS 75-100 + estatina LDL<55 + IECA/ARA + SGLT2i/GLP-1 si DM2+ASCVD + icosapent + revascularización con FFR + vacunación + rehabilitación cardíaca |
| `farmacologico` (reorganización 4→9) | NTG SL refinada con contraindicación PDE5 explícita; +Nitrato larga acción con intervalo libre; Betabloqueante actualizado con preferencia ESC (bisoprolol/metoprolol succinato) y EVITAR en Prinzmetal puro; +BCC (no-DHP y DHP) con no-combinación verapamilo+BB; +Ranolazina (Paso 2, sin efecto FC/PA); +Ivabradina (Paso 2 si FC≥70 ritmo sinusal); AAS 75-100; Estatina alta intensidad con target LDL<55 + ezetimibe/iPCSK9 si no alcanza; +IECA/ARA-II para prevención secundaria con comorbilidad |
| `quirurgico` (expandido) | Criterios revascularización ESC 2024 (FFR≤0.80 o anatomía alta riesgo); PCI vs CABG estratificado (FREEDOM en DM, STICH en disfunción VI, SYNTAX); +Heart Team multidisciplinario; +revascularización híbrida |
| `noFarmacologico` (4→11) | Cesación tabáquica con farmacoterapia, rehabilitación cardíaca Class I, dieta mediterránea/DASH detalle, ejercicio cuantificado (150 min/sem), control de peso/PA/DM/LDL, vacunación Class I para influenza en CCS, manejo de estrés y depresión (doblan riesgo CV), cribado de apnea del sueño, restricción alcohol, adherencia terapéutica |
| `revisadoEn` | `"2026-05-22"` |
| `fuentes` | 4 entradas: ESC 2024 CCS + ESC 2019 CCS + 4ª Definición Universal IM + ensayos clave (ISCHEMIA, FREEDOM, STICH, REDUCE-IT, ANOCA/INOCA) |

### Lo que NO se tocó (decisión deliberada)
- `epidemiologia`, `factoresRiesgo`, `fisiopatologia`, `signosYSintomas`: vigentes
- `anamnesis`, `examenFisico`: vigentes
- `cuidadosEnfermeria`, `NANDA/NIC/NOC`, `complicaciones`, `criteriosAlarma`: vigentes

### Verificaciones (CI gates)
- `node scripts/check-orphans.js` → OK: 151 patologías, 0 huérfanos
- `node scripts/check-stale.js` → **11 frescas** (era 10; +pat_angina), 140 sin fecha
- `npx tsc --noEmit` → 0 errors
- `npm test` → 60/60 passed

### 🎯 MILESTONE: Queue top-10 priorizado COMPLETO

Las 10 patologías de mayor prevalencia + impacto clínico definidas en `docs/CLINICAL_REVIEW_PLAN.md` están AHORA revisadas y alineadas a guidelines 2022-2025. Sumando pat_icc (sesión 17 previa), el total es **11/151 entries con `revisadoEn` y `fuentes` completos**.

Trabajo realizado en 10 sesiones del queue (sesiones 19-28) más sesión 17:
- Cardiovascular: pat_icc, pat_hta, pat_iam, pat_fa, pat_angina (5)
- Endocrino: pat_dm2, pat_dm1 (2)
- Respiratorio: pat_epoc, pat_asma, pat_neumonia (3)
- Neurológico: pat_acv (1)

Guidelines vigentes incorporadas:
- ESC 2023 ACS, ESC 2024 HTA, ESC 2024 FA, ESC 2024 CCS
- AHA/ACC 2025 HTA, AHA/ACC 2025 ACS, AHA/ACC/HRS 2023 FA, AHA/ASA 2024 stroke + 2022 ICH + 2023 SAH
- ADA 2025 Standards of Care (DM1 + DM2), KDIGO 2024, ISPAD 2024
- GOLD 2025, GINA 2024-2025
- ATS/IDSA 2019 CAP + 2016 HAP/VAP, ACIP 2024 PCV
- Fourth Universal Definition of MI, CAPE COD, EAST-AFNET 4, CASTLE-AF, IMPACT/ETHOS, BOREAS/NOTUS, SYGMA, NAVIGATOR, FIDELIO-DKD, etc.

### Commits esperados
- `content(pat_angina): align with ESC 2024 Chronic Coronary Syndromes`

### Próximos pasos (post-milestone)
- Definir nuevo lote de 10 entries de 2ª prioridad (sugerencias en `CLINICAL_REVIEW_PLAN.md`)
- Cualquier patología nueva o edición ahora SÍ debe llevar `revisadoEn` + `fuentes` (CLAUDE.md project lo declara obligatorio)
- Considerar smoke test visual del UI en algunas de las 11 entries actualizadas para confirmar render correcto de las nuevas listas largas

---

## 2026-05-22 — Sesion 27: Revisión clínica de pat_dm1 a ADA 2025 + ISPAD 2024

### Resumen
Novena iteración. La entry `pat_dm1` tenía gaps importantes vs guidelines vigentes en el campo de tecnología y nuevas terapias (área de evolución acelerada): CGM como "alternativa" cuando ADA 2025 lo posiciona como ESTÁNDAR Class A en TODOS los DM1; sin métrica TIR (Time in Range) que ahora es paralela a HbA1c; ausencia total de bombas de insulina y sistemas híbridos cerrados (AID), siendo el estándar emergente desde 2023 con sistemas FDA-aprobados (Tandem Control-IQ, Medtronic 780G, Omnipod 5, iLet); ausencia de teplizumab (Tzield, FDA 2022) para retrasar progresión Stage 2 → Stage 3; insulinas limitadas a glargina y aspart/lispro estándar (faltaban degludec, glargina U300/Toujeo, Fiasp, Lyumjev); glucagón solo inyectable (faltan formulaciones nasal Baqsimi y dasiglucagón Zegalogue más fáciles para terceros); sin clasificación de hipoglucemia por niveles ADA 2025 (Nivel 1/2/3); sin concepto de hypoglycemia unawareness; cribado de comorbilidades autoinmunes solo mencionado en factores de riesgo (no como acción de cribado activo); ausencia total de prevención CV (estatina, IECA/ARA-II) en DM1 adulto (el riesgo CV en DM1 ahora se reconoce más temprano); sin vacunación específica.

Cross-check: ADA Standards of Care 2025 (Diabetes Care Vol 48 Suppl 1) secciones 6/7/9; ISPAD 2024 (screening + insulin delivery); ISPAD 2022 hypoglycemia management; consenso ATTD 2019 para TIR. Edición quirúrgica de 6 secciones; el bloque farmacológico se duplicó (3→6) con reorganización completa por familias modernas.

### Cambios en pat_dm1 (`src/data/pathologies.json`)

| Sección | Cambio |
|---------|--------|
| `clasificacion` | De 3 a 4 estadios: mantiene 1-3 (autoinmunidad / disglucemia / clínica) + agregado Estadio 4 emergente (DM1 larga duración con complicaciones/tecnología avanzada); estadio 2 menciona teplizumab |
| `diagnostico.pruebas` (reorganización) | Criterios diagnósticos completos ADA 2025; NUEVA: CGM como prueba/estándar con targets ATTD; NUEVA: cribado de comorbilidades autoinmunes (celíaca, tiroides, Addison); anticuerpos expandidos (+ZnT8); cetonemia con sick day rules |
| `tratamientoMedico.objetivos` | De 3 a 11: HbA1c estratificada, TIR > 70%, CGM Class A, AID como estándar, niveles de hipoglucemia 1-3, hypoglycemia unawareness, teplizumab en Stage 2, prevención CV con estatina/IECA-ARA, vacunación específica, cribado anual de complicaciones |
| `farmacologico.Insulina basal` | Expandida de "glargina" a familia completa: Glargina U100/U300, Degludec, Detemir; perfiles farmacocinéticos y elección por hipoglucemia nocturna |
| `farmacologico.Insulina prandial` | Expandida de "aspart/lispro" a familia ultra-rápida + ultra-ultra-rápida (Fiasp, Lyumjev); smart pens y bolus calculators |
| `farmacologico.Bomba + AID` (NUEVA) | Sistemas FDA-aprobados (Tandem Control-IQ, Medtronic 780G, Omnipod 5, iLet); open-source closed loop reconocido por ADA 2025; backup con MDI |
| `farmacologico.Teplizumab` (NUEVA) | Anti-CD3, FDA 2022, en Stage 2 > 8 años; 14 días IV una vez en la vida; vigilar linfopenia y reactivación viral |
| `farmacologico.Glucagón` | Expandido: nasal Baqsimi 3 mg (>=4a), dasiglucagón Zegalogue 0.6 mg pen (>=6a) preferidos sobre inyectable clásico para terceros sin entrenamiento |
| `farmacologico.Estatina + IECA/ARA-II` (NUEVA) | Prevención CV en DM1 adulto >= 40 años; aspirina NO en prevención primaria |
| `noFarmacologico` (expandido) | De 4 a 11: CGM estándar, AID dentro de 21 días del Dx, conteo CHO, sick day rules detalladas, identificación médica, vacunación ADA 2025, apoyo psicosocial (depresión, distrés, diabulimia), transición pediatría→adultos, apps de manejo |
| `criteriosAlarma` | De 5 a 9: hipoglucemia clasificada por Niveles 1/2/3 ADA + hypoglycemia unawareness + cetonas con thresholds 1.0/3.0 + sospecha CAD + falla logística de insulina |
| `revisadoEn` | `"2026-05-22"` |
| `fuentes` | 5 entradas: ADA 2025 + ISPAD 2024 + ISPAD 2022 hypo + teplizumab FDA + ATTD 2019 TIR |

### Lo que NO se tocó (decisión deliberada)
- `definicion`, `epidemiologia`, `factoresRiesgo`, `fisiopatologia`: mecanismos vigentes
- `signosYSintomas`: clínica clásica vigente
- `anamnesis`, `examenFisico`: vigentes
- `quirurgico`: trasplante pancreático y de islotes siguen siendo opciones limitadas
- `cuidadosEnfermeria`, `NANDA/NIC/NOC`, `complicaciones`: vigentes (complicaciones podría incluir hypoglycemia unawareness pero está en criteriosAlarma)

### Verificaciones (CI gates)
- `node scripts/check-orphans.js` → OK: 151 patologías, 0 huérfanos
- `node scripts/check-stale.js` → 10 frescas (era 9; +pat_dm1), 141 sin fecha
- `npx tsc --noEmit` → 0 errors
- `npm test` → 60/60 passed

### Delta del review queue
`docs/CLINICAL_REVIEW_PLAN.md`: pat_dm1 movido a "Sesiones cerradas". Queda 1 patología priorizada: pat_angina (última).

### Commits esperados
- `content(pat_dm1): align with ADA 2025 + ISPAD 2024 — CGM standard + AID + teplizumab`

---

## 2026-05-22 — Sesion 26: Revisión clínica de pat_neumonia a ATS/IDSA 2019 CAP + 2016 HAP/VAP + actualizaciones 2023-2024

### Resumen
Octava iteración. La entry `pat_neumonia` tenía 12 gaps significativos vs guidelines vigentes: clasificación con HAP y VAP fusionadas como "NAVM" (ATS/IDSA 2016 los separa), sin categoría de neumonía viral (omisión grave post-COVID), sin paneles virales ni ecografía pulmonar como pruebas, algoritmo antibiótico sin estratificar por nivel de cuidado, faltaban fluoroquinolonas respiratorias, no había cobertura específica MRSA (vancomicina/linezolid) ni Pseudomonas (pip-tazo/cefepime/meropenem) con criterios de riesgo, hidrocortisona en CAP severa ausente (CAPE COD NEJM 2023), criterios ATS/IDSA para UCI ausentes (solo CURB-65), duración del tratamiento sin mencionar (5 días estándar ATS 2019), switch IV→VO no explicitado, vacunación con esquema PCV13+PPSV23 obsoleto (ACIP 2024 simplificó a PCV20 o PCV21 desde 50 años), procalcitonina no aclarada (ATS/IDSA: NO usar para decidir ATB).

Cross-check: ATS/IDSA 2019 CAP Guidelines (Am J Respir Crit Care Med), ATS/IDSA 2016 HAP/VAP Guidelines (Clin Infect Dis), ACIP 2024 PCV recommendations (MMWR), ensayo CAPE COD (NEJM 2023). Edición quirúrgica de 5 secciones; el bloque farmacológico se triplicó (3→7) y los objetivos se expandieron significativamente.

### Cambios en pat_neumonia (`src/data/pathologies.json`)

| Sección | Cambio |
|---------|--------|
| `clasificacion` | De 4 a 7 tipos: HAP y VAP separadas correctamente (ATS/IDSA 2016); +Neumonía viral (COVID/influenza/RSV); +Inmunocomprometido (PJP, oportunistas); NAC típica/atípica refinadas con nota "ATS/IDSA 2019 ya no distingue empíricamente" |
| `diagnostico.pruebas.Antígenos urinarios` | Refinado con sensibilidad/especificidad reales y advertencia de persistencia post-tratamiento |
| `diagnostico.pruebas` (NUEVAS) | +PCR multiplex respiratoria (BioFire panel — identificación rápida bacteriana y viral); +Ecografía pulmonar POCUS (ATS 2024 reconoce utilidad); +Criterios ATS/IDSA 2007 para UCI (1 mayor o ≥3 menores) además del CURB-65; nota sobre procalcitonina NO recomendada por ATS/IDSA |
| `tratamientoMedico.objetivos` | De 4 a 8: ATB en <4h del ingreso, estratificación por nivel + factores de riesgo, duración 5 días, switch IV→VO 48-72h, de-escalation, corticoide en severa, vacunación post-episodio |
| `farmacologico.Amoxicilina` | Refinada como CAP ambulatorio; distingue SIN comorbilidades (amoxi sola) vs CON (amoxi-clav + macrólido/doxiciclina) |
| `farmacologico.Azitromicina` | Refinada con advertencia ATS/IDSA: monoterapia solo si resistencia neumococo local <25%; agregada Doxiciclina como alternativa; warning QT y interacciones |
| `farmacologico.Ceftriaxona` | Refundida como "Ceftriaxona o Ceftarolina + Macrólido" para CAP hospitalario no severo; advertencia "el beta-lactámico SOLO es subóptimo" |
| `farmacologico.Fluoroquinolona respiratoria` (NUEVA) | Levofloxacino/Moxifloxacino como monoterapia alternativa; warnings FDA (tendinopatía, QT, neuropatía, aneurisma aórtico) |
| `farmacologico.Vancomicina/Linezolid` (NUEVA) | Cobertura MRSA SOLO con factores de riesgo específicos ATS/IDSA 2019; monitorización vancomicina; warnings linezolid (trombocitopenia, síndrome serotoninérgico) |
| `farmacologico.Pip-tazo/Cefepime/Meropenem` (NUEVA) | Cobertura Pseudomonas SOLO con factores de riesgo; combinación 2 antipseudomónicos al inicio + de-escalation; preservación de carbapenems |
| `farmacologico.Hidrocortisona` (NUEVA) | 200 mg/día IV x 7 días en CAP severa (CAPE COD); criterios de indicación y contraindicación (influenza, sepsis fúngica) |
| `noFarmacologico` (expandido) | De 5 a 11 puntos: VNI/HFNC en falla respiratoria, movilización temprana, fisioterapia con utilidad realista, VAP bundle completo, vacunación ACIP 2024 (PCV20/PCV21 desde 50 años, RSV >=60), drenaje pleural con criterios bioquímicos (pH<7.20, glucosa<40, LDH>1000) |
| `revisadoEn` | `"2026-05-22"` |
| `fuentes` | 4 entradas: ATS/IDSA 2019 CAP + 2016 HAP/VAP + ACIP 2024 + CAPE COD/ROSARIO |

### Lo que NO se tocó (decisión deliberada)
- `definicion`, `epidemiologia`, `factoresRiesgo`, `fisiopatologia`, `signosYSintomas`: vigentes
- `anamnesis`, `examenFisico`: vigentes (CURB-65 y PSI ya estaban en examen)
- `quirurgico`: drenaje pleural y decorticación vigentes (criterios refinados en noFarmacologico)
- `cuidadosEnfermeria`, `npiNanda/Nic/Noc`, `complicaciones`, `criteriosAlarma`: vigentes

### Verificaciones (CI gates)
- `node scripts/check-orphans.js` → OK: 151 patologías, 0 huérfanos
- `node scripts/check-stale.js` → 9 frescas (era 8; +pat_neumonia), 142 sin fecha
- `npx tsc --noEmit` → 0 errors
- `npm test` → 60/60 passed

### Delta del review queue
`docs/CLINICAL_REVIEW_PLAN.md`: pat_neumonia movido a "Sesiones cerradas". Quedan 2 patologías priorizadas (pat_dm1, pat_angina).

### Commits esperados
- `content(pat_neumonia): align with ATS/IDSA 2019 CAP + 2016 HAP/VAP + ACIP 2024 + CAPE COD`

---

## 2026-05-22 — Sesion 25: Revisión clínica de pat_fa a ESC 2024 + AHA/ACC/HRS 2023

### Resumen
Séptima iteración. La entry `pat_fa` (Fibrilación Auricular) tenía gaps importantes vs guidelines vigentes: usaba CHA₂DS₂-VASc (cuando ESC 2024 ya lo reemplazó por CHA₂DS₂-VA al eliminar el componente sexo femenino), DOACs limitados a apixaban/rivaroxaban (faltaban dabigatrán y edoxaban, ambos estándar), ausencia de warfarina explicitada como reservada solo para FA valvular, sin HAS-BLED, sin stages AHA 2023, sin escala EHRA, sin enfoque AF-CARE, ablación con catéter descrita como segunda línea (cuando AHA 2023 la posiciona Class I como primera línea en pacientes seleccionados), sin mencionar control de ritmo precoz (EAST-AFNET 4) ni ablación en FA+IC (CASTLE-AF), sin lenient rate control (RACE II), sin antídotos específicos para DOACs (idarucizumab para dabigatrán, andexanet para anti-Xa), sin manejo de AHRE.

Cross-check: ESC 2024 AF Guidelines (Eur Heart J 2024), AHA/ACC/ACCP/HRS 2023 AF Guideline (Circulation 2024;149:e1-e156), ensayos EAST-AFNET 4, CASTLE-AF, RACE II, PROTECT-AF/PREVAIL. Edición quirúrgica de 6 secciones.

### Cambios en pat_fa (`src/data/pathologies.json`)

| Sección | Cambio |
|---------|--------|
| `diagnostico.anamnesis` | CHA₂DS₂-VASc → CHA₂DS₂-VA; +HAS-BLED; +escala EHRA |
| `clasificacion` | De 5 a 10 tipos: mantiene 5 categorías ESC temporales + 4 stages AHA 2023 (en riesgo, pre-FA, FA con subestadios 3A-D, permanente) + EHRA I-IV |
| `diagnostico.pruebas.Score` | Renombrado CHA₂DS₂-VA con componentes ESC 2024 (sin sexo) + umbrales clase I/IIa/no anticoagular |
| `diagnostico.pruebas` (NUEVA) | +HAS-BLED para riesgo de sangrado: NO contraindica anticoagulación, identifica factores corregibles |
| `tratamientoMedico.objetivos` | De 4 a 6: enfoque AF-CARE (Comorbidities/Avoid stroke/Reduce symptoms/Evaluation) + control de ritmo precoz EAST-AFNET 4 + lenient rate control RACE II + ablación Class I AHA 2023 |
| `farmacologico.DOACs` | Expandido de Apixaban/Rivaroxaban a 4 fármacos (Apixaban/Rivaroxaban/Edoxaban/Dabigatrán) + criterios de reducción de dosis por fármaco + ANTÍDOTOS específicos (Idarucizumab para dabigatrán, Andexanet alfa para anti-Xa) + suspensión perioperatoria + advertencia "no reducir off-label" |
| `farmacologico.Warfarina` (NUEVA) | Reposicionada como SOLO para FA valvular (prótesis mecánica, estenosis mitral); educación sobre interacciones; antídoto (Vit K + PCC); TTR < 65% justifica cambio a DOAC |
| `noFarmacologico` (expandido) | De 3 a 6: eje C de AF-CARE (control de comorbilidades); cardioversión farmacológica "pill-in-pocket"; ablación Class I primera línea + indicación en FA+IC (CASTLE-AF); control de ritmo precoz EAST-AFNET 4; manejo de AHRE (anticoagulación NO automática) |
| `revisadoEn` | `"2026-05-22"` |
| `fuentes` | 3 entradas: ESC 2024 + AHA/ACC 2023 + ensayos clave (EAST-AFNET, CASTLE-AF, RACE II, PROTECT-AF/PREVAIL) |

### Lo que NO se tocó (decisión deliberada)
- `definicion`, `epidemiologia`, `factoresRiesgo`, `fisiopatologia`, `signosYSintomas`: vigentes
- `examenFisico`: vigente (pulso irregular, déficit de pulso, signos IC ya cubiertos)
- `farmacologico.Metoprolol/Bisoprolol`, `Amiodarona`, `Digoxina`: dosis y manejo no cambiaron significativamente
- `quirurgico`: ablación Maze y cierre orejuela WATCHMAN ya estaban
- `cuidadosEnfermeria`, `NANDA/NIC/NOC`, `complicaciones`, `criteriosAlarma`: vigentes

### Verificaciones (CI gates)
- `node scripts/check-orphans.js` → OK: 151 patologías, 0 huérfanos
- `node scripts/check-stale.js` → 8 frescas (era 7; +pat_fa), 143 sin fecha
- `npx tsc --noEmit` → 0 errors
- `npm test` → 60/60 passed

### Delta del review queue
`docs/CLINICAL_REVIEW_PLAN.md`: pat_fa movido a "Sesiones cerradas". Quedan 3 patologías priorizadas (pat_neumonia, pat_dm1, pat_angina).

### Commits esperados
- `content(pat_fa): align with ESC 2024 + AHA/ACC/HRS 2023 — CHA2DS2-VA + DOAC expansion + AF-CARE`

---

## 2026-05-22 — Sesion 24: Revisión clínica de pat_asma a GINA 2024-2025

### Resumen
Sexta iteración. La entry `pat_asma` tenía gaps de paradigma vs GINA 2024-2025: SABA presentado como rescate sin advertir sobre su prohibición en monoterapia (cambio GINA 2019), Track 1 (ICS-formoterol PRN + MART) mencionado como "estrategia SMART opcional" cuando es el track PREFERIDO desde steps 1-5, ausencia de los 5 steps GINA con sus algoritmos por track, sin FeNO ni eosinófilos sanguíneos como biomarcadores, sin LAMA (tiotropio) como add-on, sin magnesio sulfato IV en crisis refractaria, y ausencia TOTAL de los 6 biológicos (omalizumab/mepolizumab/reslizumab/benralizumab/dupilumab/tezepelumab) que son estándar Step 5 desde hace años. AERD (asma de Widal/aspirina) solo aparecía en factores de riesgo, no como subfenotipo con manejo.

Cross-check: GINA 2024 Strategy Report (May 2024), GINA 2025 Strategy Report (May 2025), GINA Difficult-to-Treat and Severe Asthma Pocket Guide (V5.0 Nov 2024), ensayos SYGMA-1/2, NOVEL START, NAVIGATOR. Edición quirúrgica de 5 secciones; el bloque farmacológico se reorganizó completamente (4→7) y se reposicionó ICS-formoterol como pilar Track 1.

### Cambios en pat_asma (`src/data/pathologies.json`)

| Sección | Cambio |
|---------|--------|
| `clasificacion` | De 6 a 11 tipos: mantiene 3 niveles de control + 5 steps GINA con Track 1/Track 2 explicitados + 3 niveles de severidad de crisis aguda (leve-moderada / severa / riesgo vital con "tórax silente") |
| `diagnostico.pruebas` (NUEVAS) | +FeNO (umbrales 25/50 ppb, criterio dupilumab >=25); +Eosinófilos sangre (>=300 criterio anti-IL5/dupilumab); criterio omalizumab por IgE+sensibilización agregado a prick test |
| `tratamientoMedico.objetivos` | De 4 a 8: explicita eliminación de SABA-only (paradigma GINA 2019), Track 1 preferido con reducción de 60-65% en exacerbaciones (SYGMA), vacunación incluyendo zóster en OCS crónico |
| `farmacologico.Salbutamol` | Refundido como rescate con warning "MONOTERAPIA PROSCRITA"; uso > 3 cartuchos/año como factor de riesgo de muerte; dosis de crisis actualizada 4-10 puffs (no solo 2-4) |
| `farmacologico.ICS monoterapia` | Renombrado para incluir alternativas (Budesonida, Beclometasona, Fluticasona) con dosis baja/media/alta GINA |
| `farmacologico.ICS-formoterol` | REPOSICIONADO como Track 1 PREFERIDO (no opción más): PRN steps 1-2, MART steps 3-5; un solo inhalador para mantenimiento y rescate; salmeterol-LABA NO sirve para MART |
| `farmacologico.Tiotropio (LAMA)` (NUEVO) | Add-on en Steps 4-5 antes de iniciar biológico |
| `farmacologico.Corticoide sistémico` | Refinado: 40-50 mg/día x 5-7 días sin tapering; objetivo GINA es minimizar OCS crónico mediante biológicos |
| `farmacologico.Sulfato de magnesio IV` (NUEVO) | 1-2 g IV en 20 min en crisis severa refractaria; criterios de indicación; monitorización |
| `farmacologico.Biológicos` (NUEVO) | 6 biológicos en una entrada: omalizumab (anti-IgE), mepolizumab/reslizumab/benralizumab (anti-IL5/5R), dupilumab (anti-IL4R), tezepelumab (anti-TSLP, primer biológico independiente del fenotipo, NAVIGATOR 2021); selección por biomarcadores; objetivo OCS-sparing |
| `noFarmacologico` (expandido) | De 6 a 10 puntos: cambio de puesto laboral curativo en asma ocupacional, AERD con desensibilización, ejercicio sin restricción + premedicación EIB, manejo de comorbilidades (rinitis, RGE, OSA, obesidad), reducción de exposición a PM2.5, derivación temprana en asma severa OCS-dependiente |
| `revisadoEn` | `"2026-05-22"` |
| `fuentes` | 5 entradas: GINA 2024 + 2025 + Severe Asthma Pocket Guide + SYGMA/NOVEL START + NAVIGATOR |

### Lo que NO se tocó (decisión deliberada)
- `definicion`, `epidemiologia`, `factoresRiesgo`, `fisiopatologia`, `signosYSintomas`: vigentes
- `anamnesis`, `examenFisico`: vigentes
- `quirurgico`: vacío en seed (correcto, asma no tiene cirugía estándar — termoplastia bronquial es excepcional y no estándar)
- `cuidadosEnfermeria`, `NANDA/NIC/NOC`, `complicaciones`, `criteriosAlarma`: vigentes

### Verificaciones (CI gates)
- `node scripts/check-orphans.js` → OK: 151 patologías, 0 huérfanos
- `node scripts/check-stale.js` → 7 frescas (era 6; +pat_asma), 144 sin fecha
- `npx tsc --noEmit` → 0 errors
- `npm test` → 60/60 passed

### Delta del review queue
`docs/CLINICAL_REVIEW_PLAN.md`: pat_asma movido a "Sesiones cerradas". Quedan 4 patologías priorizadas (pat_fa, pat_neumonia, pat_dm1, pat_angina).

### Commits esperados
- `content(pat_asma): align with GINA 2024-2025 — Track 1 preferred + biologics for severe asthma`

---

## 2026-05-22 — Sesion 23: Revisión clínica de pat_epoc a GOLD 2025

### Resumen
Quinta iteración. La entry `pat_epoc` tenía gaps fundamentales vs GOLD 2025: clasificación solo por FEV1 (GOLD 1-4) sin grupos ABE (vigentes desde GOLD 2023 que reemplazaron ABCD), algoritmo terapéutico sin estratificar por grupo (no contemplaba LABA solo, LABA+LAMA dual como primera línea en B/E, triple terapia LABA+LAMA+ICS), ausencia de eosinófilos sanguíneos para guiar uso de ICS, ausencia de dupilumab (aprobado FDA/EMA 2024 para EPOC eosinofílico refractario), ventilación no invasiva (VNI) no mencionada como primera línea en exacerbación con acidosis, BiPAP domiciliaria ausente, vacuna RSV ausente (nueva GOLD 2024-25), cribado DAAT no listado como acción concreta, antibiótico empírico sin criterios de Anthonisen, corticoide sistémico con dosis correcta pero sin clarificar "5 días sin tapering" (REDUCE trial). Además: typo "Uscar" en cuidados de Salbutamol.

Cross-check: GOLD 2025 Report (publicado 15-Nov-2024, vigente para 2025), ensayos IMPACT/ETHOS (triple terapia), BOREAS/NOTUS (dupilumab), HOT-HMV (BiPAP domiciliaria), REDUCE (corticoides 5 días). Edición quirúrgica de 6 secciones; el bloque farmacológico duplicó (4→8 fármacos) reorganizado por algoritmo ABE.

### Cambios en pat_epoc (`src/data/pathologies.json`)

| Sección | Cambio |
|---------|--------|
| `definicion` | Actualizada a GOLD 2025: integra síntomas + exacerbaciones + limitación funcional + obstrucción; incluye causas no-tabáquicas (DAAT, exposiciones, desarrollo pulmonar) |
| `clasificacion` | De 4 (GOLD 1-4) a 10 tipos: mantiene 4 niveles espirométricos + 3 grupos ABE (A monoterapia LAMA/LABA, B dual LABA+LAMA, E exacerbador con triple según eosinófilos) + 3 niveles de severidad de exacerbación |
| `diagnostico.pruebas.TAC` | Agregado cribado anual de cáncer de pulmón con TC baja dosis en fumadores 50-80 años con >=20 paquetes/año |
| `diagnostico.pruebas` (NUEVAS) | +Recuento de eosinófilos en sangre (clave para decidir ICS: <100 NO; 100-300 zona gris; >=300 SÍ) +Cribado de alfa-1 antitripsina (una vez en la vida de todo paciente EPOC) |
| `tratamientoMedico.objetivos` | De 4 a 7: agregado tratamiento inicial guiado por grupo ABE, eosinófilos como guía, vacunación completa (RSV nueva) |
| `farmacologico.Salbutamol` | Reposicionado como rescate (no mantenimiento); fix typo "Uscar"→"Aclarar"; rol de espaciador clarificado |
| `farmacologico.LAMA` (renombrado) | De "Tiotropio" a familia LAMA completa (Tiotropio, Glicopirronio, Aclidinio, Umeclidinio); GOLD 2025 preferido sobre LABA en monoterapia |
| `farmacologico.LABA` (NUEVO) | Familia LABA completa (Salmeterol, Formoterol, Indacaterol, Olodaterol, Vilanterol); alternativa a LAMA en grupo A |
| `farmacologico.LABA+LAMA dual` (NUEVO) | Píldora-única; tratamiento INICIAL en grupos B y E (cambio paradigmático GOLD 2023+, NO escalado tras monoterapia) |
| `farmacologico.Triple terapia` (REEMPLAZA Fluticasona/Salmeterol genérico) | LABA+LAMA+ICS en píldora-única (Trelegy, Trimbow); indicación por EOSINÓFILOS no severidad; ensayos IMPACT/ETHOS; reducción de mortalidad demostrada |
| `farmacologico.Dupilumab` (NUEVO) | Biológico anti-IL-4Rα; GOLD 2025 lo incluye para EPOC con eosinófilos >=300 y exacerbaciones a pesar de triple terapia (BOREAS/NOTUS) |
| `farmacologico.Corticoide sistémico` | Aclarado: 40 mg x 5 días sin tapering (REDUCE trial); reservado para exacerbación, no estable |
| `farmacologico.Antibiótico` (NUEVO) | Indicación por criterios de Anthonisen (2 de 3 síntomas cardinales o purulencia sola o ventilado); cobertura típica + Pseudomonas si riesgo; azitromicina profiláctica en exacerbador frecuente |
| `noFarmacologico` (expandido) | De 6 a 12 puntos: VNI primera línea en exacerbación con acidosis (pH<=7.35 + PaCO2>=45); BiPAP domiciliaria en hipercapnia crónica (HOT-HMV); SpO2 88-92% con Venturi; vacunación completa GOLD 2025 (influenza, PCV20, COVID, Tdap, RSV, zóster); cribado DAAT; cribado cáncer; manejo de comorbilidades |
| `revisadoEn` | `"2026-05-22"` |
| `fuentes` | 5 entradas: GOLD 2025 + IMPACT/ETHOS + BOREAS/NOTUS + HOT-HMV + REDUCE |

### Lo que NO se tocó (decisión deliberada)
- `epidemiologia`, `factoresRiesgo`, `fisiopatologia`: vigentes
- `signosYSintomas`: clínica clásica vigente
- `anamnesis`, `examenFisico`: vigentes (mMRC ya mencionado en cuidados; podría agregarse CAT pero no es crítico)
- `quirurgico`: cirugía de reducción de volumen y trasplante vigentes
- `cuidadosEnfermeria`, `NANDA/NIC/NOC`, `complicaciones`, `criteriosAlarma`: vigentes

### Verificaciones (CI gates)
- `node scripts/check-orphans.js` → OK: 151 patologías, 0 huérfanos
- `node scripts/check-stale.js` → 6 frescas (era 5; +pat_epoc), 145 sin fecha
- `npx tsc --noEmit` → 0 errors
- `npm test` → 60/60 passed

### Delta del review queue
`docs/CLINICAL_REVIEW_PLAN.md`: pat_epoc movido a "Sesiones cerradas". Quedan 5 patologías priorizadas (pat_asma, pat_fa, pat_neumonia, pat_dm1, pat_angina).

### Commits esperados
- `content(pat_epoc): align with GOLD 2025 — ABE classification + triple therapy + dupilumab`

---

## 2026-05-22 — Sesion 22: Revisión clínica de pat_acv a AHA/ASA 2024 + ESO 2024 + AHA 2022 ICH + AHA 2023 HSA

### Resumen
Cuarta iteración. La entry `pat_acv` (Accidente Cerebrovascular) tenía 11 gaps clínicos vs guidelines vigentes: trombectomía descrita genéricamente sin ventanas estratificadas (faltaban DEFUSE-3, DAWN, SELECT2/ANGEL-ASPECT 2023 para large core), tenecteplase ausente (AHA 2024 Class IIa), ventana de tPA extendida con imagen (WAKE-UP/EXTEND/TRACE-III) no contemplada, DAPT corto post-stroke menor/AIT ausente (CHANCE/POINT/THALES), estatina alta intensidad post-ACV ausente, nimodipina para HSA ausente (Class I AHA 2023), TC perfusión y angio-TC no listados como pruebas, ASPECTS score no mencionado, targets de PA por subtipo no diferenciados (INTERACT3 2023 para HIC), AIT con definición temporal vieja (< 24h) en vez de definición tisular, ESUS como categoría no contemplada.

Cross-check: AHA/ASA 2024 Acute Ischemic Stroke, AHA/ASA 2022 ICH, AHA/ASA 2023 aSAH, ESO 2024 Acute Ischaemic Stroke, ensayos clave 2018-2023. Edición quirúrgica de 7 secciones; el bloque farmacológico duplicó tamaño (3→6 fármacos) y el quirúrgico/noFarmacológico se expandieron significativamente.

### Cambios en pat_acv (`src/data/pathologies.json`)

| Sección | Cambio |
|---------|--------|
| `clasificacion` | De 5 a 7 tipos: agregados ESUS (criptogénico embólico de fuente indeterminada), lacunar (enfermedad pequeño vaso); AIT actualizado a definición tisular AHA/ASA (DWI negativa) en vez de temporal (<24h); ABCD2 score mencionado para decisión DAPT |
| `diagnostico.pruebas.TC sin contraste` | Reescrita con score ASPECTS (0-10) y sus thresholds para reperfusión (>=6 favorable, 3-5 large core candidato a TM con SELECT2/ANGEL-ASPECT 2023) |
| `diagnostico.pruebas` (NUEVAS) | +Angio-TC vasos cuello/intracraneales + TC perfusión (estándar 2024 para LVO y ventana extendida; criterios DEFUSE-3 y DAWN); refinada RMN con mismatch DWI/FLAIR para wake-up stroke |
| `farmacologico.Alteplasa` | Ventana extendida con imagen (hasta 9h en WAKE-UP/EXTEND/TRACE-III); contraindicaciones expandidas (DOAC <48h); monitorización por intervalo (15min/30min/1h hasta 24h); manejo de angioedema |
| `farmacologico.Tenecteplase` (NUEVO) | AHA 2024 Class IIa, bolo único 0.25 mg/kg, mismos criterios que alteplasa; nota TIMELESS (sin beneficio en ventana tardía + TM rápida) |
| `farmacologico.AAS` (expandido a DAPT) | DAPT clopidogrel 300-600 mg + AAS por 21 días en NIHSS <=3 o AIT con ABCD2 >=4 (CHANCE/POINT/THALES); luego monoterapia |
| `farmacologico.Estatina alta intensidad` (NUEVO) | Atorvastatina 40-80 o rosuvastatina 20-40 al inicio (SPARCL); target LDL <70 (<55 muy alto riesgo) |
| `farmacologico.Nimodipina` (NUEVO) | 60 mg c/4h x 21 días en HSA aneurismática (AHA 2023 Class I); vía enteral; precaución con TAS<100 |
| `farmacologico.Labetalol/Nicardipino` | Targets PA refinados por subtipo: isquémico sin reperfusión <220/120 ('permissive HTN'); isquémico con tPA/TM <185/110 antes <180/105 durante; ICH 130-140 (INTERACT3 2023); HSA <160 antes del cierre; evitar reducción brusca >25% |
| `noFarmacologico` (expandido) | Trombectomía mecánica con ventanas estratificadas (0-6h Class 1; 6-16h DEFUSE-3; 16-24h DAWN; large core ASPECTS 3-5 SELECT2/ANGEL-ASPECT/RESCUE-Japan LIMIT); posición de cabecera individualizada (HeadPoST 2017); profilaxis TVP por subtipo; rehab precoz multidisciplinaria; triage prehospitalario para LVO (LAMS, RACE) |
| `quirurgico` (expandido) | Hemicraniectomía con criterios edad/tiempo; ENRICH 2024 (mínimamente invasiva para HIC lobar); coiling vs clipaje (ISAT); drenaje ventricular externo; tratamiento endovascular del vasoespasmo |
| `revisadoEn` | `"2026-05-22"` |
| `fuentes` | 5 entradas: AHA/ASA 2024 isquémico, AHA/ASA 2022 ICH, AHA/ASA 2023 HSA, ESO 2024, listado de ensayos clave |

### Lo que NO se tocó (decisión deliberada)
- `definicion`, `epidemiologia`, `factoresRiesgo`, `fisiopatologia`: vigentes (definición clásica + tisular ya en clasificación)
- `signosYSintomas`: clínica clásica
- `anamnesis`, `examenFisico`: ya incluían NIHSS, Glasgow, signos meníngeos
- `cuidadosEnfermeria`, `NANDA/NIC/NOC`, `complicaciones`, `criteriosAlarma`: vigentes

### Verificaciones (CI gates)
- `node scripts/check-orphans.js` → OK: 151 patologías, 0 huérfanos
- `node scripts/check-stale.js` → 5 frescas (era 4; +pat_acv), 146 sin fecha
- `npx tsc --noEmit` → 0 errors
- `npm test` → 60/60 passed

### Delta del review queue
`docs/CLINICAL_REVIEW_PLAN.md`: pat_acv movido a "Sesiones cerradas". Quedan 6 patologías priorizadas (pat_epoc, pat_asma, pat_fa, pat_neumonia, pat_dm1, pat_angina).

### Commits esperados
- `content(pat_acv): align with AHA/ASA 2024 ischemic + 2022 ICH + 2023 SAH guidelines`

---

## 2026-05-22 — Sesion 21: Revisión clínica de pat_dm2 a ADA 2025 Standards of Care

### Resumen
Tercera iteración del flujo. La entry `pat_dm2` (Diabetes Mellitus Tipo 2) tenía 8 gaps clínicos vs ADA 2025: algoritmo terapéutico desactualizado (mantenía "metformina como primera línea universal" — paradigma pre-2023), ausencia de tirzepatide (agonista dual GIP/GLP-1), ausencia de finerenona (ns-MRA con beneficio renal/CV en DM2+ERC), CGM/Time in Range no contemplados como métricas, edad de screening en 45 (ADA bajó a 35 desde 2022), aspirina en prevención primaria no clarificada (ADA NO la recomienda), vacunación específica de DM2 no mencionada, target de PA específico ausente.

Cross-check contra fuentes primarias: ADA Standards of Care 2025 (Diabetes Care Vol 48 Suppl 1), ADA/EASD Consensus Report (2022, update 2024), KDIGO 2024 para nefroprotección en DM con ERC. Edición quirúrgica de 4 secciones; ediciones en farmacológico (3 farmacos modificados + 2 nuevos: tirzepatide y finerenona).

### Cambios en pat_dm2 (`src/data/pathologies.json`)

| Sección | Cambio |
|---------|--------|
| `clasificacion` | De "control glucémico crudo" (controlada/parcial/mal) a 5 categorías ADA 2025: objetivo general (HbA1c<7 o TIR>70%), control estricto, control flexible (anciano frágil), mal controlada (no diagnóstica), EHH (emergencia). TIR como métrica primaria con CGM |
| `diagnostico.pruebas` | De 2 a 3 entradas: (1) criterios diagnósticos ADA 2025 completos + screening desde 35 años; (2) NUEVA: CGM con métricas TIR/TBR/GMI; (3) perfil CV/renal con UACR como método preferido, threshold albuminuria > 30 mg/g → SGLT2i + considerar finerenona |
| `tratamientoMedico.objetivos` | De 3 a 10 objetivos: HbA1c individualizada por subgrupo, TIR > 70%, PA < 130/80, LDL escalado por riesgo (<55/<70/<100), aspirina NO primaria, **SGLT2i/GLP-1 RA en ASCVD/IC/ERC independientemente de HbA1c o metformina**, pérdida de peso 5-10%, vacunación específica DM2 |
| `farmacologico.Metformina` | Reposicionada de "primera línea universal" a "agente inicial preferido SI NO hay ASCVD/IC/ERC predominantes". Nota explícita sobre cambio paradigmático ADA 2025 |
| `farmacologico.iSGLT2` | Reescrita con énfasis en indicación independiente de HbA1c por ASCVD/IC/ERC, listado de ensayos (EMPA-REG, DAPA-HF, DAPA-CKD), warning cetoacidosis euglucémica |
| `farmacologico.aGLP-1` | Reescrita: indicación CV (LEADER, SUSTAIN-6, REWIND), combinación GLP-1+SGLT2i para MACE adicional, semaglutide oral incluido, suspensión pre-cirugía/endoscopia por riesgo de broncoaspiración |
| `farmacologico.Tirzepatide` (NUEVO) | Agonista dual GIP/GLP-1, mayor potencia en HbA1c (-2-2.5%) y peso (-15-22%), endorsado por ADA 2025 en HFpEF+obesidad, MASH, obesidad, apnea del sueño |
| `farmacologico.Finerenona` (NUEVO) | ns-MRA NO antidiabético sino nefroprotector. Add-on en DM2+ERC con albuminuria persistente. Datos FIDELIO-DKD y FIGARO-DKD. Monitorización de potasio |
| `farmacologico.Insulina` | Refinada: basal-bolo + bolos prandiales, combinación basal + GLP-1 RA preferida sobre basal-bolo en falla a basal (ADA 2025), CGM indicado en todos los pacientes con insulina |
| `criteriosAlarma` | Agregado: hipoglucemia severa Nivel 3 (asistencia tercero o pérdida de conciencia, independiente de valor) |
| `revisadoEn` | `"2026-05-22"` |
| `fuentes` | 3 entradas: ADA 2025 Standards of Care, ADA/EASD Consensus Report 2022/2024, KDIGO 2024 |

### Lo que NO se tocó (decisión deliberada)
- `definicion`, `epidemiologia`, `factoresRiesgo`, `fisiopatologia`: mecanismos y epidemiología sin cambios
- `signosYSintomas`: clínica clásica vigente
- `anamnesis`, `examenFisico`: vigentes (aunque el examen de pies y fondo de ojo ya estaban bien)
- `noFarmacologico`: dieta + ejercicio + pérdida de peso sin cambios mayores (el detalle de GLP-1 para peso ya está en farmacológico)
- `quirurgico`: cirugía bariátrica sigue vigente con misma indicación
- `cuidadosEnfermeria`, `npiNanda/Nic/Noc`, `complicaciones`: vigentes

### Verificaciones (CI gates)
- `node scripts/check-orphans.js` → OK: 151 patologías, 0 huérfanos
- `node scripts/check-stale.js` → 4 frescas (era 3; +pat_dm2), 147 sin fecha
- `npx tsc --noEmit` → 0 errors
- `npm test` → 60/60 passed

### Delta del review queue
`docs/CLINICAL_REVIEW_PLAN.md`: pat_dm2 movido a "Sesiones cerradas". Quedan 7 patologías priorizadas (pat_acv, pat_epoc, pat_asma, pat_fa, pat_neumonia, pat_dm1, pat_angina).

### Commits esperados
- `content(pat_dm2): align with ADA 2025 Standards of Care + KDIGO 2024`

---

## 2026-05-21 — Sesion 20: Revisión clínica de pat_iam a ESC 2023 ACS + AHA 2025 ACS + Cuarta Definición Universal del IM

### Resumen
Segunda iteración del flujo de revisión clínica. La entry `pat_iam` (Infarto Agudo de Miocardio) tenía 7 gaps clínicos vs guidelines vigentes: clasificación incompleta (solo tipos 1-2 de 5 universales, sin STEMI equivalents), CK-MB listado como prueba de rutina (obsoleto en era de troponina hs), P2Y12 inhibitor sin prasugrel ni distinción de pretreatment, tiempos ICP genéricos ("<90 min") en vez de estratificados por contexto (60/90/120), y morfina sin warning sobre interacción con P2Y12 orales (cambio importante post-ATLANTIC trial).

Cross-check contra ESC 2023 ACS (Eur Heart J 2023;44(38):3720), AHA/ACC/ACEP 2025 ACS y Cuarta Definición Universal del IM (2018, vigente). Edición quirúrgica de 7 secciones; mantenidas intactas factoresRiesgo, fisiopatologia, signosYSintomas, anamnesis, examenFisico, AAS, heparina, noFarmacologico, cuidadosEnfermeria, NANDA/NIC/NOC, complicaciones, criteriosAlarma.

### Cambios en pat_iam (`src/data/pathologies.json`)

| Sección | Cambio |
|---------|--------|
| `clasificacion` | De 4 tipos (IAMCEST/IAMSEST/tipo1/tipo2) a 8 tipos completos: 5 universales (1-5 con subtipos 4a/b/c) + STEMI equivalents explícitos (Sgarbossa, De Winter, T hiperagudas, oclusión tronco) + IAMCEST y NSTE-ACS como categorías ECG |
| `diagnostico.pruebas.ECG` | Agregado V7-V9 (posterior) y V3R-V4R (VD) cuando hay sospecha; STEMI equivalents en la descripción; objetivo < 10 min |
| `diagnostico.pruebas.Troponina` | Recalibrada como única biomarker primaria (Fourth Universal Definition); algoritmo 0h/1h ESC 2023 explicado; advertencia "una sola troponina elevada NO confirma IAM" (necesario delta + contexto) |
| `diagnostico.pruebas.CK-MB` | Recalibrada de "rutina cada 8h" a "uso limitado": solo si no hay troponina hs o sospecha de reinfarto temprano (< 48h) |
| `diagnostico.pruebas.Coronariografía` | Tiempos estratificados ESC 2023: < 60 min centro PCI 24/7, < 90 min traslado, > 120 min → preferir fibrinólisis. Acceso radial preferido sobre femoral |
| `farmacologico.P2Y12 inhibitor` | De "Ticagrelor/Clopidogrel" genérico a entrada completa con jerarquía ESC 2023 (Prasugrel preferido en STEMI con ICP, Ticagrelor segundo, Clopidogrel reservado), distinción pretreatment STEMI vs no-pretreatment NSTE-ACS (Class III), prasugrel nunca como pretreatment, suspensión pre-CABG |
| `farmacologico.Morfina` | Warning agregado: la morfina retrasa absorción intestinal de P2Y12 orales; usar solo si nitrato/betabloqueante fallan |
| `tratamientoMedico.quirurgico` | De 3 líneas genéricas a 5 puntos con tiempos ESC 2023, estrategia fármaco-invasiva post-fibrinólisis, NSTE-ACS invasiva precoz/inmediata/selectiva por riesgo |
| `revisadoEn` | `"2026-05-21"` |
| `fuentes` | 3 entradas: ESC 2023 ACS, AHA/ACC 2025 ACS, Fourth Universal Definition of MI |

### Lo que NO se tocó (decisión deliberada)
- `epidemiologia`, `factoresRiesgo`, `fisiopatologia`, `signosYSintomas`: mecanismos clínicos sin cambios
- `anamnesis`, `examenFisico`: ya completos y guideline-aligned
- `farmacologico.AAS`, `farmacologico.Heparina`: dosis y manejo no cambiaron
- `noFarmacologico`: oxigenoterapia solo si SpO2<90% ya estaba alineada con ESC 2023
- `cuidadosEnfermeria`, `npiNanda/Nic/Noc`, `complicaciones`, `criteriosAlarma`: clínicamente vigentes

### Verificaciones (CI gates)
- `node scripts/check-orphans.js` → OK: 151 patologías, 0 huérfanos
- `node scripts/check-stale.js` → 3 frescas (era 2; +pat_iam), 148 sin fecha
- `npx tsc --noEmit` → 0 errors
- `npm test` → 60/60 passed

### Delta del review queue
`docs/CLINICAL_REVIEW_PLAN.md`: pat_iam movido a "Sesiones cerradas". Quedan 8 patologías priorizadas.

### Commits esperados
- `content(pat_iam): align with ESC 2023 ACS + AHA 2025 ACS + Fourth Universal Definition of MI`

---

## 2026-05-21 — Sesion 19: Revisión clínica de pat_hta a ESC 2024 + AHA/ACC 2025

### Resumen
Primera ejecución del flujo de revisión clínica definido en `docs/CLINICAL_REVIEW_PLAN.md`. La entry `pat_hta` (Hipertensión Arterial) estaba **internamente inconsistente**: definición usaba umbral 140/90 (ESC viejo), clasificación usaba 130 (AHA/ACC 2017) y target era <130/80 universal (AHA/ACC moderno). Resultado: imposible clasificar coherentemente a un paciente con la entry como estaba.

Cross-check contra fuentes primarias (`escardio.org`, `ahajournals.org`, `jacc.org`) para confirmar guidelines vigentes. Edición quirúrgica de 5 secciones, sin tocar contenido válido (fisiopatología, factores de riesgo, NANDA/NIC/NOC, cuidados de enfermería estándar).

### Cambios en pat_hta (`src/data/pathologies.json`)

| Sección | Cambio |
|---------|--------|
| `definicion` | Mención explícita de confirmación por MAPA/MDPA + categoría "PA elevada" ESC 2024 + nomenclatura Stage 1/2 AHA/ACC 2025 |
| `clasificacion` | Reemplazado esquema "JNC 8 / ESC 2018" (5 tipos) por ESC 2024 (3 tipos + crisis) con equivalencias AHA/ACC 2025. Incluye umbrales out-of-office (MDPA ≥135/85, MAPA 24h ≥130/80) |
| `diagnostico.pruebas` | +2 entradas nuevas: MAPA 24h (con patrón non-dipping) y MDPA estructurado (protocolo 7 días). Total pruebas: 6 → 8 |
| `tratamientoMedico.objetivos` | Targets diferenciados por edad (ESC 2024: <65a <130/80; 65-79a <140/80; ≥80a 140-150/<80) + nota target universal AHA/ACC 2025 + mención de PREVENT risk score |
| `tratamientoMedico.farmacologico` | +1 entrada: Combinación píldora-única (SPC) como **primer paso terapéutico** (cambio de paradigma ESC 2024, no rescate). Total fármacos: 4 → 5 |
| `revisadoEn` | `"2026-05-21"` |
| `fuentes` | `["ESC 2024 Guidelines (Eur Heart J 2024;45(38):3912-4018)", "AHA/ACC 2025 Guideline (Hypertension 2025)"]` |

### Lo que NO se tocó (decisión deliberada)
- `epidemiologia`, `factoresRiesgo`, `fisiopatologia`, `signosYSintomas`: mecanismos sin cambios en guidelines nuevas
- `npiNanda`, `npiNic`, `npiNoc`: taxonomías cambian con cadencia distinta (NANDA-I 2024-2026 vigente, sin updates de códigos usados)
- `cuidadosEnfermeria`, `complicaciones`, `criteriosAlarma`: clínicamente vigentes
- `noFarmacologico`: dieta DASH y umbrales lifestyle no cambiaron

### Verificaciones (CI gates)
- `node scripts/check-orphans.js` → OK: 151 patologías, 0 huérfanos
- `node scripts/check-stale.js` → 2 frescas (era 1; +pat_hta), 149 sin fecha
- `npx tsc --noEmit` → 0 errors
- `npm test` → 60/60 passed (11.3s)

### Delta del review queue
`docs/CLINICAL_REVIEW_PLAN.md`: pat_hta movido a tabla "Sesiones cerradas". Quedan 9 patologías priorizadas (pat_iam, pat_dm2, pat_acv, pat_epoc, pat_asma, pat_fa, pat_neumonia, pat_dm1, pat_angina).

### Commits esperados
- `content(pat_hta): align with ESC 2024 + AHA/ACC 2025 hypertension guidelines`

---

## 2026-05-21 — Sesion 18: Auditoría 12-niveles + hardening de release signing

### Resumen
Auditoría integral del proyecto (12 niveles). Score 10/12 PASS + 1 WARN + 1 FAIL. Único hallazgo crítico: **passwords del keystore de release commiteados en `android/gradle.properties`** desde el commit `4831d64`. Limpieza completa: secrets movidos a user-level (`~/.gradle/gradle.properties`), template para devs futuros, AAB v1.0.0 verificado y listo para upload. Plus: limpieza de 6 dumps `ui*.xml` de uiautomator y plan estructurado de revisión clínica.

### Cambios

| Archivo | Detalle |
|---------|---------|
| `android/gradle.properties` | Removidas 4 vars con secrets (RELEASE_STORE_PASSWORD, RELEASE_KEY_PASSWORD, RELEASE_KEY_ALIAS). Mantiene RELEASE_STORE_FILE (path relativo, no es secret) + comentario explicando dónde van las creds |
| `android/gradle.properties.example` | NUEVO. Template documentando vars requeridas en `~/.gradle/gradle.properties` |
| `~/.gradle/gradle.properties` | NUEVO (fuera del repo). 4 vars de release signing |
| `.gitignore` | + regla `/ui*.xml` (dumps de uiautomator) |
| `ui*.xml` (6 archivos) | Eliminados — dumps de debug del emulador, 138 KB total |
| `docs/CLINICAL_REVIEW_PLAN.md` | NUEVO. Cola priorizada de 10 patologías top con guideline objetivo, áreas críticas y fuentes canónicas por sistema |

### Auditoría — resultados por nivel

| # | Nivel | Resultado | Detalle |
|---|---|---|---|
| 1 | Static Analysis | ✅ PASS | tsc 0 errors · 69 TS/TSX · 17,401 LOC |
| 2 | Dependencies | ⚠️ WARN | 17 paquetes outdated (minor); 8 advisories npm audit son todas dev-tooling (cli, ESLint, Jest), no bundladas al APK |
| 3 | Security | 🔴→✅ FIXED | Creds movidas; jarsigner verifica AAB OK |
| 4 | Import Chain | ✅ PASS | 60/60 tests cargan sin errores |
| 5 | Config | ✅ PASS | features.ts typed registry íntegro · appInfo.ts v1.0.0 |
| 6 | Data Integrity | ✅ PASS | 151 patologías · IDs únicos · 0 huérfanos |
| 7 | Tests | ✅ PASS | 60/60 en 11.3s |
| 8 | Performance | — | N/A (mobile app) |
| 9 | Resilience | ✅ PASS | EncryptedStorage + OTA gated |
| 10 | Observability | ✅ PASS | Sentry scaffold listo |
| 11 | Compliance | ✅ PASS | Disclaimer + 1/151 `revisadoEn` |
| 12 | Disaster Recovery | ✅ PASS | Git limpio + AAB reproducible |

### AAB v1.0.0 — verificación de firma
- Path: `android/app/build/outputs/bundle/freeRelease/app-free-release.aab` (52.7 MB, 2026-05-06)
- `jarsigner -verify`: **jar verified.**
- Alias: `***REMOVED***` (match con keystore)
- Algoritmo: SHA384withRSA, 2048-bit
- CN: `Patologias Enfermeria, OU=Mobile, O=PatologiasEnfermeria, L=Buenos Aires, ST=CABA, C=AR`

### Pendientes detectados (no resueltos esta sesión)
- **Git history leak**: las 4 passwords aún figuran en commits anteriores a hoy. Si el repo se hace público (planteado en ROADMAP), opciones: (a) rotar keystore + cambiar upload key en Play Console, (b) `git filter-repo` para scrubbear historial. Recomendado (a) si Play App Signing habilitado
- **Revisión clínica**: ver `docs/CLINICAL_REVIEW_PLAN.md` — 10 patologías top priorizadas con guidelines objetivo. **Decisión consciente**: NO se marcó `revisadoEn` masivo sin revisión real (sería falsificar metadata clínica). Cadencia sugerida: 1 entry/sesión, 60-90 min
- **Dependencies majors**: op-sqlite 15→16, ESLint 8→10, Jest 29→30, Prettier 2→3. Deferir post-launch

### Commits principales (esperados)
- `chore(security): move release keystore credentials out of repo`
- `chore: gitignore + cleanup uiautomator dumps`
- `docs: add clinical content review plan with priority queue`

---

## 2026-05-06 — Sesion 14: Audit de orphan refs + normalizer k↔c

### Resumen
Tu busqueda de "hipercalemia" destapo dos bugs: la patologia no existe (id huérfano `pat_hiperkalemia` referenciado en `relatedPathologyIds` de rabdomiolisis) Y el normalizer no tolera variantes ortograficas `k↔c`. Audit sistematico encontro **38 ids huerfanos / 45 refs rotas** total. Limpieza completa + fix del normalizer + tests.

### Cambios

| Archivo | Detalle |
|---------|---------|
| `src/data/pathologies.json` | 10 renames (typos de ids reales) + 35 removes (sin match) + 1 dedupe (`pat_icc` duplicado). Total: 45 refs limpiadas |
| `src/utils/search.ts` | Regla `k → c` agregada al normalizer + JSDoc explicando estrategia bidireccional |
| `src/screens/SystemPathologiesScreen.tsx` | Removida copia local de `normalizeText` (que ademas no tenia `.trim()`). Importa del util. Single source of truth |
| `__tests__/search.test.ts` | Nuevo: 7 tests cubriendo lowercase, diacritics, trim, k↔c, case-insensitive, combinacion, idempotencia |

### Renames aplicados (10)

| Orphan | Replacement |
|--------|-------------|
| pat_asma_bronquial | pat_asma |
| pat_coagulación_intravascular_diseminada | pat_cid |
| pat_esclerosis_lateral_amiotrofica | pat_esclerosis_lateral |
| pat_fracturas | pat_fracturas_extremidades |
| pat_insuficiencia_respiratoria | pat_ira |
| pat_litiasis_renal | pat_litiasis |
| pat_litiasis_urinaria | pat_litiasis |
| pat_sindrome_guillain_barre | pat_guillain_barre |
| pat_tceg | pat_tce |

### Patologias FALTANTES (detectadas durante el audit, a agregar en sesion dedicada)

Comunes en enfermeria, valen sesion de contenido propia:
- Hiperkalemia (la del bug original)
- Shock (genérico — hoy solo hay shock_cardiogenico y shock_hipovolemico)
- Insuficiencia renal aguda + crónica
- Insuficiencia suprarrenal
- Hashimoto
- SII (sindrome intestino irritable)
- Incontinencia urinaria
- Otros: rinitis alergica, fasciitis necrotizante, hashimoto, etc

### Verificacion

| Check | Antes | Despues |
|-------|-------|---------|
| Orphan refs | 45 | 0 |
| Tests | 53 | 60 (+7 normalizer) |
| `tsc --noEmit` | 0 errores | 0 errores |
| Lint | 0 errores | 0 errores |

### Pendiente

- Subir AAB v2.0.1 a Play Store (manual)
- Sesion de contenido para agregar las ~7 patologias faltantes detectadas + bumpear a v2.0.2

### Adicionado en la misma sesion (post-AD)

**`scripts/check-orphans.js` + CI job `data`**: previene recurrencia de la deuda limpiada hoy. Job separado en CI workflow (no requiere `npm ci` — script Node puro), `npm run check:orphans` para correr local. Cualquier PR futuro que introduzca un id huerfano frena el merge.

---

## 2026-05-06 — Sesion 17: Primera actualización de contenido clínico (B con web)

### Resumen
Aplicada B (web-search-driven content update) a la patología más prioritaria: **Insuficiencia Cardíaca Congestiva** (`pat_icc`). El entry estaba en algoritmo pre-2021 — faltaban 2 de los 4 pilares fundacionales del manejo moderno (ARNI y SGLT2i). Validado contra fuentes oficiales 2023-2024.

### Workflow ejecutado

1. Read estado actual de `pat_icc` desde JSON
2. WebSearch ESC 2024 HF guidelines + dosis específicas (sacubitril/valsartán, SGLT2i)
3. Diff propuesto al usuario con citas a 6 fuentes
4. Aprobación explícita del usuario (opción A: full diff)
5. Aplicación via Node script idempotente
6. Smoke test (TS, jest, orphans, freshness)
7. Commit atómico con sources en mensaje

### Cambios en `pat_icc.tratamientoMedico.farmacologico`

| Acción | Droga | Razón |
|--------|-------|-------|
| ADD | Sacubitril/Valsartán (ARNI) | Pilar #1 ESC 2023, preferido sobre IECA, dosis 24/26 → 49/51 → 97/103 c/12h |
| ADD | Dapagliflozina/Empagliflozina (SGLT2i) | Pilar #4 ESC 2023, 10mg/d sin titulación, across all EF |
| CHANGE | IECA (Enalapril/Ramipril) | Reclasificado como ALTERNATIVA (mecanismo updated) |
| KEEP | Furosemida, Carvedilol, Espironolactona | Sigue vigente |

### Metadata (primera entry con tracking)

- `revisadoEn: "2026-05-06"`
- `fuentes`: ESC 2023 Focused Update, PARADIGM-HF, DAPA-HF, EMPEROR-Reduced, DELIVER, EMPEROR-Preserved

### Métrica freshness

| Antes | Después |
|-------|---------|
| 0 / 151 fresh | **1** / 151 fresh |

### Verificación

| Check | Resultado |
|-------|-----------|
| `tsc --noEmit` | 0 errores |
| Tests | 60/60 |
| `check:orphans` | OK |
| `check:stale` | 1 fresh (anteriormente 0) |

### Tiempo invertido y velocidad

~30 min total: web search + diff + approval + apply + commit. **Esta es la velocidad real de B-collab con web search**: ~1 patología por sesión enfocada de 30-45 min. Para 25 patologías de alto cambio = 12+ sesiones similares.

### Pendiente (sesiones futuras de contenido)

Próximas patologías de alto cambio para revisar (orden sugerido por impacto):
- pat_fa (Fibrilación Auricular) — ESC 2024 AF guidelines major changes (DOAC primero, ablación temprana)
- pat_iam (IAM) — AHA/ESC 2023 STEMI/NSTEMI updates
- pat_diabetes_2 — ADA 2025 algoritmo (GLP-1 + SGLT2i prioritized)
- pat_epoc — GOLD 2025 (LABA/LAMA dual primero, triple si exacerbador)
- pat_hta — ESC 2024 HTN (target <130/80, SPC desde el inicio)

---

## 2026-05-06 — Sesion 16: Clinical disclaimer (C) + governance infra (A)

### Resumen
Usuario pregunto "el contenido esta actualizado a 2026?". Respuesta honesta: fuentes mayoritariamente 2017-2022, ninguna 2024+. Implementadas dos protecciones: disclaimer visible (legal) + infra de versionado (gobernanza).

### Cambios

| Archivo | Detalle |
|---------|---------|
| `src/screens/AboutScreen.tsx` | Tarjeta "Información clínica" antes del footer con borde warning. Última revisión, fuentes hasta 2023, aviso explícito |
| `src/screens/PathologyDetailScreen.tsx` | Footnote con info icon al final de cada detalle. Texto pequeño no invasivo |
| `src/types/index.ts` | Pathology + `revisadoEn?: string` + `fuentes?: string[]` (opcionales) |
| `scripts/check-stale.js` (nuevo) | Audit informativo. Reporta sin-fecha + > 24 meses. Exit 0 SIEMPRE (warning-only) |
| `package.json` | `check:stale` script |
| `.github/workflows/ci.yml` | Nuevo job `freshness` (no bloquea) |
| `CLAUDE.md` | Documentada convención: toda edición nueva debe setear revisadoEn + fuentes |

### Decisiones

- **Disclaimer NO modal**: hubiera molestado en cada apertura. Footnote pequeño + tarjeta en About logra protección legal sin friccion UX.
- **Job freshness es WARNING-only** (exit 0 siempre): contenido tiene shelf-life largo, no toda patologia necesita revision sincronizada. Job sirve para visibility, no como gate.
- **revisadoEn + fuentes son opcionales**: 151 patologias sin fecha hoy. Hacerlos required rompería todo. Convención: setearlos al editar/agregar nuevos.

### Verificacion

| Check | Resultado |
|-------|-----------|
| `tsc --noEmit` | 0 errores |
| Tests | 60/60 |
| Lint | 0 errors, 531 warnings (+7 inline-styles del disclaimer, esperable) |
| `check:orphans` | 0 huerfanas |
| `check:stale` | 0 fresh / 151 sin fecha (informativo) |

### Pendiente (B postergada)

**B = auditar y actualizar contenido clínico ~25 patologias de alto cambio (cardio, EPOC, diabetes, ACLS) a guías 2024+** — requiere validación clínica del usuario. Cuando se haga, setear `revisadoEn: "2026-XX-XX"` y `fuentes: ["ESC 2024", ...]` en cada entry tocada — el job `freshness` lo refleja.

---

## 2026-05-06 — Sesion 13: Release v2.0.1 — bundle + AAB con fixes de hooks

### Resumen
Bump a `2.0.1` (versionCode 3) y rebuild del AAB para llevar a produccion los 4 fixes de hook bugs de Sesion 12. El bundle anterior commiteado en `c2c7add` no incluia esos fixes — los usuarios actuales tienen los crashes latentes hasta que se republique en Play Store.

### Cambios

| Archivo | Detalle |
|---------|---------|
| `package.json` | `version: 2.0.0` → `2.0.1` |
| `android/app/build.gradle` | `versionCode: 2 → 3`, `versionName: "2.0.0" → "2.0.1"` |
| `src/config/appInfo.ts` | `APP_VERSION = '2.0.1'` |
| `android/app/src/main/assets/index.android.bundle` | Rebundleado con todos los fixes |

### Patch notes (semver patch — no nuevas features)

- Fix: `PathologyDetailScreen` ya no crashea cuando se abre con id invalido tras id valido (hooks reordenados antes del early-return)
- Fix: `ProtocolDetailScreen` mismo patron arreglado
- Fix: `LabValuesScreen` dep `rs` removida del useMemo de `ListHeaderComponent`
- Fix: `QuizSessionScreen` regenera el quiz si los params (category/questionCount) cambian

### Verificacion

| Check | Resultado |
|-------|-----------|
| `npx react-native bundle` | OK, 0 warnings |
| `./gradlew app:bundleFreeRelease` | BUILD SUCCESSFUL en 9m 38s, 433 tasks |
| AAB output | `android/app/build/outputs/bundle/freeRelease/app-free-release.aab` — **51 MB** |

### Pendiente

1. **Subir AAB a Play Store** — Internal testing track primero, despues promote a production. Ver `playstore/INSTRUCCIONES_PUBLICACION.md`
2. **Setup Sentry** para verificar que la tasa de crashes baja tras este release
3. **Activar OTA end-to-end** (push gh-pages, configurar MANIFEST_URL, flip flag)

---

## 2026-05-05 — Sesion 12: Pago de deuda de lint + 4 bugs latentes destapados

### Resumen
La deuda de lint (78 errors / 564 warnings inicial, 89/586 tras MiSuite) bajo a **0 errors / 524 warnings**. CI lint job promovido a bloqueante. En el camino se destaparon 4 bugs reales de React Hooks que estaban siendo enmascarados por el `continue-on-error: true`.

### Cambios

| Archivo | Detalle |
|---------|---------|
| `.eslintrc.js` | Overrides: jest globals en tests/setup, `no-bitwise` off en activation.ts |
| `.github/workflows/ci.yml` | Lint job: `continue-on-error: true` → removido. Ahora bloquea PRs |
| `src/screens/PathologyDetailScreen.tsx` | **BUG**: `useCallback`+`useRef`+`useMemo` llamados tras early-return → movidos arriba |
| `src/screens/ProtocolDetailScreen.tsx` | **BUG**: `useMemo` tras early-return → movido arriba |
| `src/screens/LabValuesScreen.tsx` | **BUG**: dep `rs` innecesaria en useMemo → removida |
| `src/screens/QuizSessionScreen.tsx` | **BUG**: useEffect con deps vacias ignoraba category/questionCount/generateQuiz → agregadas |
| 20+ archivos | Cleanup: imports muertos, destructured no usados, `_` prefix en args intencionalmente unused |

### Bugs destapados (todos cosméticos hasta que React detectara la inconsistencia)

#### PathologyDetailScreen / ProtocolDetailScreen — rules-of-hooks
React enforce runtime que el hook count sea idéntico entre renders. Ambas pantallas tenían:
```tsx
if (!entity) return <NotFound />;  // 7 hooks ya corrieron
const memo = useMemo(...);         // 8vo hook
```
Primer render con id inválido → 7 hooks. Segundo render con id válido → 8 hooks → `Rendered more hooks than during the previous render` → crash. Era cuestión de tiempo hasta que un deep-link viejo lo disparara.

#### LabValuesScreen — exhaustive-deps cosmético
`rs` estaba en deps pero ya estaba referenciado vía `styles` (que SI tiene rs). Re-create del memo cuando el rs ref cambiaba pero styles no. Sin impacto funcional, solo waste de cómputo.

#### QuizSessionScreen — exhaustive-deps con intent error
```tsx
useEffect(() => { generateQuiz({ category, questionCount }); }, []);  // run once
```
Si la pantalla se reusara (navigate replace con otros params), el quiz no se regeneraba. En la práctica navigation push → unmount/remount, así que el bug no se manifestaba — pero la intent era frágil.

### Verificacion

| Check | Antes | Despues |
|-------|-------|---------|
| ESLint errors | 89 | **0** |
| ESLint warnings | 586 | 524 (524 inline-styles deferidas — convencion RN) |
| `tsc --noEmit` | 0 | 0 |
| Tests | 53/53 | 53/53 |
| CI lint job | non-blocking | **blocking** |

### Decisiones

- **Inline-styles warnings (524) NO atacadas**: convencion RN de la base de codigo es estilos inline. Extraerlos a StyleSheet objetos seria ~3 sesiones de refactor sin ganancia clara. La regla queda como warning para visibilidad.
- **`no-bitwise` off en activation.ts** en vez de inline `// eslint-disable-line` por linea: el archivo entero implementa SHA-256 con bitwise — disable per-file es honest.
- **`useTheme()`/`useResponsiveScale()` removidos en BodySystemCard** cuando colors/rs no se usaban: si la prop no se consume, el subscribe a context es waste. No es feature, es deuda real.

### Pendiente

- Setup manual hosting OTA + Sentry (sin cambio)
- 524 warnings de inline-styles si alguna sesion futura quiere ir 100% StyleSheet (low priority)

---

## 2026-05-05 — Sesion 11: Integracion de MiSuite (hub del ecosistema)

### Resumen
Pantalla "Mi suite" integrada al repo con tests, docs y bundle rebuild. Es un hub que detecta cuales de las 3 apps del ecosistema (Patologias, Curso, Farmacologia) estan instaladas en el dispositivo via deep-link schemes, y ofrece abrir o descargar de Play Store. Pequeño refactor: extraida la logica pura (APPS registry + URL fallback chain) a `src/services/miSuite.ts` para que sea testeable sin component setup.

### Archivos

| Archivo | Tipo | Detalle |
|---------|------|---------|
| `src/services/miSuite.ts` | nuevo | APPS registry, AppEntry/InstallStatus types, playStoreAppUrl/playStoreWebUrl builders, chooseLaunchUrls(app, status) con fallback ordenado |
| `src/screens/MiSuiteScreen.tsx` | nuevo | Hero gradient + 3 cards. useFocusEffect → checkInstalls(). handlePress simplificado a loop sobre chooseLaunchUrls con try/catch |
| `__tests__/miSuite.test.ts` | nuevo | 12 tests: APPS shape (3 entries, 1 isCurrent, ids/schemes/pkgs unicos, formato hex/reverse-DNS), Play Store URL builders, chooseLaunchUrls 3 paths |
| `android/app/src/main/AndroidManifest.xml` | modificado | `<queries>` para curso:// y farmacologia:// (Android 11+ package visibility). `<intent-filter>` para patologias:// (deep link de retorno desde otras apps del ecosistema) |
| `src/types/index.ts` | modificado | RootStackParamList += `MiSuite: undefined` |
| `src/navigation/AppNavigator.tsx` | modificado | Stack.Screen registration con title "Mi suite" |
| `src/screens/ToolsScreen.tsx` | modificado | Tarjeta "Mi suite" agregada al grid |
| `android/.../index.android.bundle` | rebuild | Pre-bundle obligatorio en Windows |

### Decision: refactor minimo antes de testear

La logica original tenia `Linking.openURL().catch().catch()` anidado dentro del componente — el punto mas error-prone (4 strings de URL hardcoded en 2 ramas). Sin extraer, los tests requeririan setup pesado de component-rendering (ThemeProvider + mocks de Linking + useFocusEffect que dispare). Extraer 1 helper de 8 lineas convierte ese caso en 5 tests sobre funciones puras. El global rule "Refactor → Feature" aplica: la feature aqui son los tests, y el refactor las hace faciles. handlePress paso de 17 lineas anidadas a 8 lineas con un loop trivial.

### Defensas implementadas

| Caso | Comportamiento |
|------|----------------|
| App actual ('Patologias') | Card no clickeable, marcada "ESTAS AQUI" |
| App instalada | Tap → intenta scheme; si falla → market://; si falla → https://play.google.com |
| App no instalada | Tap → market://; si falla → https://play.google.com |
| Status 'checking' (carrera) | Defensivo: trata como 'missing' (Play Store directo) — evita intentar scheme antes de saber si esta instalada |
| Linking.canOpenURL throws | Catch → 'missing' |

### Verificacion

| Check | Resultado |
|-------|-----------|
| `tsc --noEmit` | 0 errores |
| Tests | 53/53 (era 41, +12 en miSuite) |
| Bundle rebuild | OK (Metro v0.83.5, sin warnings) |

### Pendiente

- Setup manual hosting OTA + Sentry (sin cambio)
- Deuda lint (sin cambio)
- Cuando las otras 2 apps del ecosistema esten en Play Store, verificar que los `pkg` names en APPS coincidan con los reales (`com.cursoenfermeria.free`, `com.guiafarmacologica.free`) — el test catchea typos pero no verifica que coincidan con el listing real

---

## 2026-05-05 — Sesion 10: Boton "Buscar actualizacion ahora" en Settings

### Resumen
La row "Datos clinicos" pasa de display-only a tap-able cuando el flag `contentOTA` esta on. Tap → spinner → Alert con resultado. Bypass del throttle 6h via `syncContent({ force: true })`. Cuando el flag esta off (default hoy), la row sigue display-only — cero deuda.

### Cambios

| Archivo | Detalle |
|---------|---------|
| `src/hooks/useDataInfo.ts` | Refactor: `DataInfo` extiende nueva `DataInfoSnapshot` + expone `refresh()` para re-leer manualmente. `useFocusEffect` no re-fire cuando la pantalla ya esta enfocada → necesario despues de un sync iniciado desde la misma pantalla |
| `src/screens/SettingsScreen.tsx` | Imports: `isFeatureEnabled`, `syncContent`, `ActivityIndicator`. Estado `syncing` con mutex (`if (syncing) return`). Handler `handleSyncNow` async con feedback Alert. Row condicionalmente tap-able segun `otaEnabled` |

### UX

| Estado | Que ve el usuario |
|--------|-------------------|
| OTA off (default hoy) | Row no tap-able (igual que hoy) |
| OTA on, idle | "v1 · verificado hace 2h" + chevron |
| OTA on, sincronizando | "Buscando actualizaciones…" + spinner |
| OTA on, success update | Alert "Version nueva: v3", subtitle se refresca |
| OTA on, no update | Alert "Tu app ya tiene la ultima version disponible" |
| OTA on, error | Alert "No se pudo actualizar: [reason]" |

### Decisiones de diseño

- **Solo tap-able cuando flag on**: si fuera siempre tap-able, el usuario taparia hoy y veria "OTA disabled" — feedback negativo gratis. Mejor no exponer interactividad cuando no hay funcionalidad detras.
- **Mutex contra doble-tap (`if (syncing) return`)**: dos taps rapidos = dos fetches paralelos = dos repopulates compitiendo por la transaccion SQLite. El flag bloquea el segundo.
- **Refresh() manual en hook**: useFocusEffect no refire mientras la pantalla sigue enfocada. Sin refresh manual, el subtitle no actualizaria tras un sync exitoso hasta que el usuario navegara fuera y volviera.
- **`disabled` y `throttled` marcados como unreachable**: el handler comenta explicitamente que esos status son inalcanzables — gated por `otaEnabled` (no llega si flag off) + always `force: true` (bypasea throttle). Sin el comment, futuro lector pensaria que falta un caso.

### Verificacion

| Check | Resultado |
|-------|-----------|
| `tsc --noEmit` | 0 errores |
| Tests | 41/41 sin cambio (no se agregaron tests de Settings — componente grande, costo > beneficio) |

### Pendiente

- Setup manual hosting OTA + Sentry (sin cambio)
- Deuda lint (sin cambio)
- Considerar test de componente para SettingsScreen si se vuelve mas complejo

---

## 2026-05-05 — Sesion 9: Throttling de OTA sync

### Resumen
Gate de 6 horas entre manifest fetches para no pegar al server en cada cold boot. Si lastSyncedAt < 6h, syncContent devuelve `{ status: 'throttled', nextEligibleAt }`. Bypass via parametro `{ force: true }` — pensado para futuro boton "Buscar actualizacion ahora" en Settings.

### Cambios

| Archivo | Detalle |
|---------|---------|
| `src/services/contentSync.ts` | `MIN_SYNC_INTERVAL_MS = 6h`. Nuevo SyncResult variant `throttled` con `nextEligibleAt` absoluto. SyncOptions `{ force?: boolean }`. Reorden critico: throttle ANTES de MANIFEST_URL check |
| `App.tsx` | Comment actualizado para reflejar throttling |
| `__tests__/contentSync.test.ts` | +5 tests: throttled, no-throttle con force, no-throttle con sync vieja, no-throttle en primer boot, error MANIFEST_URL |

### Decision de diseño: por que reordenar throttle antes de MANIFEST_URL check

Caso: usuario flippea `FEATURES.contentOTA = true` pero olvida configurar MANIFEST_URL. Con orden anterior (URL check primero), cada cold boot loggea "MANIFEST_URL not configured" — ruido. Con orden nuevo (throttle primero), tras la primera vez el throttle suprime los errores hasta que pasen 6h.

**Pero**: esto requiere que `setLastSyncedAt` se llame incluso cuando MANIFEST_URL está vacío. Hoy NO se llama. Trade-off: prefiero el orden correcto (throttle es defense-in-depth, va arriba). El error de MANIFEST_URL vacio se loggeara cada boot mientras lastSyncedAt sea null — que es OK porque indica que el OTA está activado pero no configurado, situación que el dev debe arreglar pronto. Un upgrade futuro: marcar lastSyncedAt incluso en errores de config para silenciar.

### Verificacion

| Check | Resultado |
|-------|-----------|
| `tsc --noEmit` | 0 errores |
| Tests | 41/41 (era 36, +5 throttling) |
| Bug atrapado por mi test | Orden inicial de gates devolvia error en vez de throttled — fix antes de commit |

### Pendiente

- Boton "Buscar actualizacion ahora" en Settings — usaria `syncContent({ force: true })` + estado de carga. Probable proxima sesion
- Setup manual hosting OTA + Sentry (pendiente desde antes)
- Deuda lint (pendiente desde antes)

---

## 2026-05-05 — Sesion 8: Indicador UI de ultima actualizacion

### Resumen
Layer visible para el OTA: en Settings ahora se ve la version del dataset y cuando fue verificado por ultima vez. Tambien se aprovecho para extraer `APP_VERSION` a constante unica (antes duplicado en sentry.ts y contentSync.ts) y arreglar la "Version" row que estaba hardcoded a 1.0.0.

### Archivos

| Archivo | Tipo | Detalle |
|---------|------|---------|
| `src/config/appInfo.ts` | nuevo | `APP_VERSION = '2.0.0'` — single source |
| `src/data/db.ts` | extension | `getLastSyncedAt()`, `setLastSyncedAt(ts)` reusan tabla `meta` con upsert |
| `src/services/contentSync.ts` | modificado | Importa APP_VERSION desde appInfo. Llama setLastSyncedAt tras manifest fetch (incluso si no-update) y tras repopulate |
| `src/hooks/useDataInfo.ts` | nuevo | Hook reactivo (useFocusEffect) + `formatRelativeTime` con plurales castellanos |
| `src/screens/SettingsScreen.tsx` | modificado | Nueva row "Datos clinicos" con icono database. Version row usa APP_VERSION |
| `src/config/sentry.ts` | modificado | Importa APP_VERSION desde appInfo |
| `__tests__/useDataInfo.test.ts` | nuevo | 7 tests cubriendo segundos→años, plurales, clamp futuro |

### UX del indicador

| Estado | Subtitle |
|--------|----------|
| Bundled, nunca synced (default hoy) | `v1 · versión inicial` |
| OTA on, sin update | `v1 · verificado hace 5 minutos` |
| OTA on, update aplicado | `v3 · actualizado hace 2 horas` |

Distincion clave: "verificado" significa "pegamos al server, no hay nada nuevo". "Actualizado" significa "se aplico data nueva". El timestamp NO se actualiza cuando la red falla — eso seria mentirle al usuario.

### Verificacion

| Check | Resultado |
|-------|-----------|
| `tsc --noEmit` | 0 errores |
| Tests | 36/36 (era 29, +7 nuevos en useDataInfo) |

### Detalle de proceso

Hubo un commit que mezclo refactor + feature por error (`38e3087` en historia local). Detectado antes de push: `git reset --soft HEAD~1` y splitteo en commits atomicos. Sin riesgo (los cambios estaban preservados en el index).

### Pendiente

- Setup manual de hosting OTA + Sentry (no cambia)
- Throttling de sync (lastCheckedAt ya existe en meta — facil agregar gate)
- Deuda de lint sigue intacta

---

## 2026-05-05 — Sesion 7: Fase 3 — OTA content sync

### Resumen
Infraestructura para actualizar el dataset de patologias sin republicar el AAB. La app ahora puede pullear un manifest remoto al boot, comparar versiones, descargar el nuevo `pathologies.json`, validar shape/size/version, y repopular SQLite en una transaccion atomica. **Flag off por default** — la infra esta lista pero inerte hasta que el usuario hostee el manifest.

### Archivos

| Archivo | Tipo | Detalle |
|---------|------|---------|
| `src/services/contentSync.ts` | nuevo | `syncContent()`, `validateManifest()`, `validateDataset()`, `compareVersions()`. SyncResult discriminated union |
| `src/data/db.ts` | refactor + extension | Extraidas `ensureSchema()`, `insertPathologies()`, `setDataVersion()`. Tabla `meta`. Exports nuevos: `getCurrentDataVersion()`, `repopulateFromJson(data, version)` |
| `App.tsx` | modificado | `syncContent()` fire-and-forget despues de `initDatabase()` |
| `__tests__/contentSync.test.ts` | nuevo | 28 unit tests (compareVersions, validateManifest reject paths, validateDataset shape, syncContent disabled) |

### Defensas implementadas (v1)

| Threat | Defense |
|--------|---------|
| Network failure | try/catch -> log + silent fallback. App sigue con dataset actual |
| MITM | HTTPS only en validateManifest (regex `^https://`) |
| Size attack | 100KB ≤ size ≤ 10MB en manifest validation |
| Schema mismatch | `manifest.minAppVersion` ≤ APP_VERSION o reject |
| Downgrade attack | `manifest.version > getCurrentDataVersion()` o no-op |
| Corrupt JSON | `validateDataset()` chequea array no-vacio + 3 entries con id/nombre/bodySystemId |
| Partial write | `BEGIN; DELETE; INSERT; UPDATE meta; COMMIT;` con `ROLLBACK` en error |

### Defensas NO implementadas (deferidas)

- **SHA-256 / signature validation**: agregar `react-native-quick-crypto` cuando el host sea menos confiable. Por ahora HTTPS+host control son razonables. JSDoc documenta el upgrade path
- **Throttling de sync**: por ahora pega al server en cada boot. Si el bandwidth se vuelve issue, agregar `lastCheckedAt` en meta + skip si < N horas

### Verificacion

| Check | Resultado |
|-------|-----------|
| `tsc --noEmit` | 0 errores |
| Tests | 29/29 passing (era 13, +16 nuevos en contentSync) |
| Bug atrapado por mi propio test | `compareVersions('2', '2.0.0')` devolvia 1 sin destructure default — fix antes de commit |

### Pendiente para activar OTA en produccion

1. Hostear `pathologies.json` y `manifest.json` en GitHub Pages / Cloudflare / S3 (bucket publico, HTTPS)
2. Pegar URL en `MANIFEST_URL` en `src/services/contentSync.ts:42`
3. Subir `FEATURES.contentOTA` a `true` en `src/config/features.ts:18`
4. Rebuild bundle + AAB

### Manifest format

```json
{
  "version": 2,
  "url": "https://example.com/pathologies-v2.json",
  "minAppVersion": "2.0.0",
  "size": 2453678,
  "updatedAt": "2026-05-05T00:00:00Z"
}
```

### Pendiente para proxima sesion

- Setup manual de hosting OTA (decision del usuario sobre donde hostear)
- Setup manual de Sentry (sigue pendiente desde Sesion 6)
- Deuda de lint: 78 errors / 564 warnings — eventual cleanup
- Considerar throttling de sync (lastCheckedAt) si el bandwidth resulta issue

---

## 2026-05-05 — Sesion 6: Fase 2 — Infraestructura para releases

### Resumen
Tres pilares de infraestructura para preparar la app para futuras updates: feature flags tipados, scaffold de crash reporting (Sentry), y CI en GitHub Actions con tests + typecheck bloqueantes. En el camino: pago de deuda tecnica (mocks de Jest desactualizados desde la migracion a EncryptedStorage/SQLite + 2 errores de TypeScript de FlashList v2 API).

### Cambios

| Archivo | Detalle |
|---------|---------|
| `src/config/features.ts` (nuevo) | Registry tipado de 6 feature flags compile-time + helper `isFeatureEnabled` |
| `src/config/sentry.ts` (nuevo) | `initSentry()` con `require()` defensivo dentro de try/catch — no-op si dep no esta instalada o DSN vacio. PII strip en `beforeSend` |
| `App.tsx` | `initSentry()` llamado antes de `initDatabase()` |
| `jest.setup.js` | Mocks agregados: `react-native-encrypted-storage`, `@op-engineering/op-sqlite` (count: 1 para skip de populate), `@shopify/flash-list` (alias FlatList) |
| `src/screens/SearchScreen.tsx` | Removidas props heredadas FlatList (`estimatedItemSize`, `initialNumToRender`, `windowSize`) — FlashList v2 hace recycling automatico |
| `src/screens/SystemPathologiesScreen.tsx` | Misma limpieza FlashList v2 |
| `.github/workflows/ci.yml` (nuevo) | Tres jobs: `test` (Jest, blocking), `typecheck` (tsc, blocking), `lint` (ESLint, non-blocking hasta pagar deuda). Concurrency cancela runs viejos |

### Verificacion

| Check | Antes | Despues |
|-------|-------|---------|
| Jest tests | 0/13 (App.test crash por mock encrypted-storage) | 13/13 passing |
| `tsc --noEmit` | 2 errores (FlashList API) | 0 errores |
| ESLint | 78 errors / 564 warnings | sin cambio (deferred) |

### Decisiones de alcance

**Items de Fase 2 del plan original que se SALTARON intencionalmente:**
- **Channels Android (internal/beta/production)**: redundante. Los flavors `free`/`premium` + Play Store tracks (internal/closed/open testing) ya cubren el caso. Build types separados duplicarian configuracion sin ganancia.
- **Reorganizar `src/screens/` en subcarpetas**: 23 mov + ~100 import refactors. Bajo-impacto-alto-riesgo. Diferido hasta sesion dedicada (cuando haga falta agregar 5+ pantallas).

**Sentry vs Crashlytics**: elegido Sentry — independiente de Firebase (no acoplarse al ecosistema si no se usan otros servicios), free tier 5K errores/mes alcanza, mejor DX para indie devs (source maps automaticos).

### Pendiente para proxima sesion

- **Setup manual de Sentry** (require interaccion del usuario):
  1. crear proyecto en https://sentry.io
  2. pegar DSN en `src/config/sentry.ts:21`
  3. correr `npx @sentry/wizard@latest -i reactNative -p android`
  4. rebuild AAB
- **Deuda de lint**: 78 errors / 564 warnings — ataque por archivo en sesiones futuras
- **Fase 3** (cuando el usuario decida arrancar): OTA de contenido como prioridad #1

---

## 2026-05-05 — Sesion 5: Higiene del repo + separacion de proyectos

### Resumen
Limpieza preparatoria para futuras releases: working tree depurado, screenshots de iteración eliminadas, `.gitignore` reforzado para evitar contaminación futura, version bump a `2.0.0` (alineando `package.json`, `versionName` Android y CHANGELOG). Trabajo del modulo "Curso de Enfermería" extraido del repo y movido a proyecto independiente en `F:\programas\curso-enfermeria\` (es otro producto, ciclo de release distinto).

### Cambios

| Area | Detalle |
|------|---------|
| `.gitignore` | Ignora `screen_*.png`, `test*.png`, `*.jpg`/`*.html` en raiz, build outputs, `.env`, IDE/OS junk |
| Cleanup | 119 screenshots de iteracion eliminadas; 4 JPG sueltos y 2 HTML de tooling movidos al proyecto Curso |
| `package.json` | `version: 2.0.0` (estaba en `0.0.1`) |
| `android/app/build.gradle` | `versionCode: 2`, `versionName: "2.0.0"` (estaba en `1.0`) |
| Curso de Enfermería | Movido a `F:\programas\curso-enfermeria\` (screens, data, types, utils, HTML tools, JPGs); refs revertidas en `App.tsx`, `AppNavigator.tsx`, `ToolsScreen.tsx`, `types/index.ts` |
| `db.ts` | Devuelto a `src/data/` (es infra de Patologias, no del Curso); `initDatabase()` restaurado en `App.tsx` |

### Verificacion

| Check | Resultado |
|-------|-----------|
| TypeScript imports rotos | 0 (db.ts resuelve correctamente) |
| Refs huerfanas a Curso en `src/` | 0 |

### Pendiente para proxima sesion

- Fase 2 del plan de actualizaciones: feature flags locales, GitHub Actions, crash reporting, reorganizar `src/screens/` en subcarpetas
- Evaluar Fase 3: OTA de contenido (actualizar `pathologies.json` sin republicar APK)

---

## 2026-03-29 — Sesion 4: Hyper-Optimización y Escalabilidad

### Cambios detallados
- **SQLite Migración:** Se cambió la lectura JSON sincrona a memoria (que llenaba el Heap/RAM del Engine) por una motor nativo `C++ SQLite JSI` (`@op-engineering/op-sqlite`). Se escribieron inyectores para leer las 151 patologías instantáneamente de un fichero real de Base de Datos.
- **Rendimiento UI:** Pantallas con scroll gigante sustituidas por `@shopify/flash-list`.
- **Seguridad:** Los keys premium expuestos en AsyncStorage pasaron a `react-native-encrypted-storage`.

---

## 2026-03-27 — Sesion 3: Quiz educativo + compilacion release

### Commits realizados (3)

| # | Hash | Tipo | Descripcion |
|---|------|------|-------------|
| 1 | `d61dae2` | feat | Transformar quiz en herramienta educativa con feedback enriquecido |
| 2 | `f21736f` | chore | Rebuild del bundle Android |
| 3 | `92a1cab` | docs | Actualizar PROGRESO.md y CHANGELOG con quiz learning feature |

### Cambios detallados

**Quiz educativo — feedback enriquecido por pregunta**
- **"¿Sabías que...?"** (clinicalPearl): muestra la definición clínica de la patología tras cada respuesta
- **"Dato clave"** (keyFact): epidemiología, nivel de emergencia, valores de referencia, o cuidados farmacológicos según el tipo de pregunta
- **"Ver patología completa"**: botón que navega al detalle de la patología para profundizar
- **Explicaciones mejoradas**: incluyen signos/síntomas relacionados, intervenciones de enfermería, dosis farmacológicas, valores de referencia de pruebas diagnósticas, definiciones NANDA con características definitorias

**Resumen de quiz — revisión de errores**
- **"Revisar errores — ¡Aprende!"**: sección expandible que muestra cada pregunta fallada con:
  - Tu respuesta vs respuesta correcta (visual con colores)
  - Explicación completa del por qué
  - Clinical pearl de la patología
  - Botón "Estudiar [patología]" para ir al detalle
- **"Consejo de estudio"**: mensaje motivacional adaptado al porcentaje (>=80%, 60-79%, <60%)

**Tipos actualizados**
- `QuizQuestion` ahora incluye: `pathologyId`, `clinicalPearl?`, `keyFact?`
- `buildClinicalPearl()` y `buildKeyFact()` nuevas funciones en useQuiz.ts

### Compilacion release verificada

| Build | Tamaño | Ruta |
|-------|--------|------|
| Free Release APK | 65 MB | `android/app/build/outputs/apk/free/release/app-free-release.apk` |
| Premium Release APK | 65 MB | `android/app/build/outputs/apk/premium/release/app-premium-release.apk` |
| Free Release AAB | 45 MB | `android/app/build/outputs/bundle/freeRelease/app-free-release.aab` |

### Verificacion en emulador
- Quiz educativo probado end-to-end: respuesta correcta, incorrecta, resumen con revision de errores
- Feedback con 3 capas (explicacion, clinical pearl, dato clave) — OK
- Boton "Ver patologia completa" navega correctamente — OK
- "Revisar errores — ¡Aprende!" expande lista de errores con explicaciones — OK
- "Consejo de estudio" adaptado al score — OK

### Estado del proyecto post-sesion

| Aspecto | Estado |
|---------|--------|
| TypeScript | 0 errores |
| Tests | 13/13 pasan |
| Bundle JS | OK (52 assets) |
| Build release | BUILD SUCCESSFUL (APK free, APK premium, AAB) |

---

## 2026-03-27 — Sesion 2: Visual upgrade + Diagnostico diferencial + Testing

### Commits realizados (7)

| # | Hash | Tipo | Descripcion |
|---|------|------|-------------|
| 1 | `589c6d2` | feat | Enriquecer pathologies.json con campo videoUrl + actualizar body_systems.json y lab_values.json |
| 2 | `48a1b3b` | feat | Actualizar 4 fotos de sistemas corporales (inmunologico, reproductivo, tegumentario, traumatologico) |
| 3 | `1ecc48f` | feat | Visual upgrade masivo: reemplazar iconos vectoriales por fotos clinicas en Home, Onboarding, Quiz, Tabs, Scales, Tools y mas |
| 4 | `ba4564e` | feat | Agregar pantalla de diagnostico diferencial interactivo (DifferentialScreen + useDifferentialDiagnosis hook) |
| 5 | `26e377f` | test | Agregar mocks de Jest para modulos nativos + 12 tests unitarios de quiz |
| 6 | `8db6c9c` | chore | Agregar scripts de utilidad (enrich_nanda.js, fix_tildes.js) |
| 7 | `057a2bc` | chore | Rebuild del bundle Android con todos los cambios |

### Cambios detallados

**Nueva feature — Diagnostico Diferencial**
- `src/screens/DifferentialScreen.tsx` (602 lineas) — pantalla interactiva donde el usuario selecciona sintomas y ve patologias rankeadas por % de coincidencia
- `src/hooks/useDifferentialDiagnosis.ts` (164 lineas) — hook que construye indice de sintomas de las 151 patologias y calcula matching en tiempo real
- Ruta agregada en `AppNavigator.tsx` y tipo en `types/index.ts`

**Visual upgrade — Iconos a fotos clinicas**
- HomeScreen: quick actions ahora usan fotos clinicas de fondo en vez de iconos, toggle dark mode con emoji, fondo decorativo con gradientes y circulos difuminados
- OnboardingScreen: rediseno completo con ImageBackground full-screen, gradientes por slide, estadisticas destacadas (151 patologias, 455 NANDA, 17 escalas)
- QuizScreen: chips de sistemas ahora muestran thumbnail circular de la foto del sistema
- AppNavigator: iconos de tabs actualizados, animacion pill con spring mejorada
- ScalesScreen, ToolsScreen, AllFavoritesScreen, AllNotesScreen, SearchScreen, PremiumScreen, PathologyDetailScreen, QuizSessionScreen: ajustes de UI consistentes

**Datos**
- `pathologies.json`: enriquecido (~18k lineas de diff), campo `videoUrl` opcional agregado al tipo
- `body_systems.json`: estructura actualizada
- `lab_values.json`: valores de referencia adicionales
- 4 imagenes de sistemas reemplazadas con fotos clinicas de mayor calidad

**Testing**
- `jest.setup.js` creado con mocks para: AsyncStorage, MaterialCommunityIcons, LinearGradient, SafeAreaContext, react-navigation (native, native-stack, bottom-tabs)
- `jest.config.js` actualizado con setupFiles
- `__tests__/useQuiz.test.ts`: 12 tests unitarios para logica de quiz
- Resultado: 13/13 tests pasan

**Documentacion actualizada**
- `README.md`: agregado diagnostico diferencial, videos educativos, Jest, conteo actualizado de screens/hooks
- `ARCHITECTURE.md`: DifferentialScreen en diagrama, useDifferentialDiagnosis en data flow, diseno visual actualizado
- `CHANGELOG.md`: nueva seccion v1.1.0-dev con todos los cambios
- `playstore/PLAN_ACTUALIZACIONES.md`: tracking de iconos actualizado, estrategia de videos educativos en Mes 11-12
- `PROGRESO.md`: creado (este archivo)

### Estado del proyecto post-sesion

| Aspecto | Estado |
|---------|--------|
| TypeScript | 0 errores |
| Tests | 13/13 pasan |
| Bundle JS | OK (52 assets) |
| Gradle build | BUILD SUCCESSFUL |
| Pantallas | 21 |
| Hooks | 9 |
| Patologias | 151 |
| Fotos clinicas | 38 (12 sistemas + 13 condiciones + 9 escalas + 4 actualizadas) |
| Iconos como visual principal eliminados | HomeScreen, OnboardingScreen, QuizScreen, DifferentialScreen |
| Iconos pendientes de eliminar | PremiumScreen, DashboardScreen, SettingsScreen, empty states |

### Decisiones tomadas
- **Videos educativos**: se implementaran en futuras versiones enlazando a YouTube (no descargando). Campo `videoUrl` ya existe en el tipo Pathology. Canales objetivo: Osmosis, Ninja Nerd, Khan Academy Medicine, Enfermeria Evidente
- **Politica de progreso**: este documento se actualiza en cada sesion de trabajo

---

## 2026-03-26 — Sesion 1: Lanzamiento v1.0.0

### Resumen
- App completa con 151 patologias, 12 sistemas, 17 escalas, quiz, protocolos, NANDA-NIC-NOC
- 20 pantallas con diseno hero (fotos + gradientes)
- Sistema premium con trial 15 dias + suscripcion Google Play
- 34 fotos medicas reales de Unsplash
- Documentacion Play Store completa (ficha, privacy policy, IARC, instrucciones)
- AAB generado (45 MB)
- Correcciones de tildes/acentos en toda la app y documentacion
- Quiz dark mode readability fix + mostrar respuesta correcta al fallar

### Commits principales
- `591e0c3` feat: improve splash screen and app icon design
- `9f5e08d` fix: correct missing ñ in legal screens
- `6b22118` fix: add missing accents/tildes across all visible UI text
- `c0bc00b` fix: complete accent/tilde corrections across entire app and docs
- `c4a490c` fix: quiz dark mode readability + show correct answer on wrong
