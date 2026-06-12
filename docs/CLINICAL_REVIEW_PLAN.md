# Plan de Revisión Clínica de Contenido

> **Origen**: auditoría 2026-05-21 detectó 150/151 patologías sin campo `revisadoEn`. Solo `pat_icc` está actualizada (ESC 2023). Este documento prioriza la cola de revisión.

## Principio rector

**No setear `revisadoEn` sin haber leído el contenido y comparado contra la guideline actual.** Marcar metadata sin revisión real es falsificación clínica y rompe el audit-first protocol. Cada entry actualizada debe:

1. Leer el contenido actual (`definicion`, `fisiopatologia`, `diagnostico`, `tratamientoMedico`, `cuidadosEnfermeria`)
2. Comparar contra la guideline vigente (ver tabla abajo)
3. Actualizar lo desactualizado (algoritmos, drug-of-choice, criterios diagnósticos)
4. Setear `revisadoEn: "YYYY-MM-DD"` + `fuentes: [...]` solo al final
5. Commit semántico: `content(pat_xxx): update <area> to <guideline>`

## Cola priorizada (top-10 alto impacto)

Orden por prevalencia + criticidad clínica + cambio reciente en guidelines.

| Prioridad | ID | Patología | Guideline objetivo | Áreas críticas a revisar |
|---|---|---|---|---|
| 1 | `pat_hta` | Hipertensión Arterial | ESC/ESH 2024, ACC/AHA 2024 | Umbrales diagnósticos (130/80 vs 140/90), 1ª línea farmacológica, target en >75a |
| 2 | `pat_iam` | Infarto Agudo de Miocardio | ESC 2023 STEMI/NSTE-ACS, AHA 2025 | Tiempos puerta-balón, antiagregación dual, anticoagulación periprocedimiento |
| 3 | `pat_dm2` | Diabetes Mellitus Tipo 2 | ADA 2025 Standards of Care | GLP-1/SGLT2 como 1ª línea con ASCVD, metas HbA1c por subgrupo |
| 4 | `pat_acv` | ACV isquémico | AHA/ASA 2024 | Ventana tPA (4.5h vs 9h con perfusión), trombectomía mecánica criterios |
| 5 | `pat_epoc` | EPOC | GOLD 2025 | Clasificación ABE (sustituyó a ABCD), triple terapia (LABA+LAMA+ICS) criterios |
| 6 | `pat_asma` | Asma | GINA 2024 | Track 1 (ICS-formoterol PRN), eliminación de SABA-only en step 1 |
| 7 | `pat_fa` | Fibrilación Auricular | ESC 2024 / AHA 2023 | CHA₂DS₂-VA (sustituyó VASc), DOACs preferidos vs warfarina |
| 8 | `pat_neumonia` | Neumonía | ATS/IDSA 2019 + actualizaciones 2024 | CURB-65 vs PSI, cobertura empírica CAP vs HAP |
| 9 | `pat_dm1` | Diabetes Mellitus Tipo 1 | ADA 2025 + ISPAD 2024 | CGM y bombas como estándar, target time-in-range |
| 10 | `pat_angina` | Angina (estable + inestable) | ESC 2024 Chronic Coronary Syndromes | Renombramiento CCS, escalado terapéutico, indicaciones revascularización |

## Cadencia sugerida

- **1 patología por sesión clínica** (lectura + cross-check + edit + commit + PROGRESO.md)
- Tiempo estimado: 60-90 min por entry (descarta el time-saving falso de "metadata por encima")
- Después de cada commit, correr `node scripts/check-stale.js` para confirmar el delta
- Re-evaluar prioridades cada 3 entries terminadas (puede haber nuevas guidelines)

## Fuentes canónicas por sistema

Usar exactamente estos strings en el campo `fuentes` para mantener consistencia con `pat_icc`:

| Sistema | Fuente preferida (string) |
|---|---|
| Cardiovascular | `"ESC 2024"`, `"AHA/ACC 2024"` |
| Respiratorio | `"GOLD 2025"`, `"GINA 2024"`, `"ATS/IDSA 2019"` |
| Metabólico/Endocrino | `"ADA 2025"`, `"AACE 2024"` |
| Neurológico | `"AHA/ASA 2024"`, `"AAN 2023"` |
| Renal | `"KDIGO 2024"`, `"KDIGO 2022"` |
| Digestivo | `"ACG 2024"`, `"AGA 2023"` |
| Infeccioso | `"IDSA 2024"`, `"WHO 2024"` |

## Sesiones cerradas

| Fecha | ID | Cambio principal | Commit |
|---|---|---|---|
| 2026-05-06 | `pat_icc` | Tratamiento HF a algoritmo 4-pilares ESC 2023 | `bab68e1` |
| 2026-05-21 | `pat_hta` | Definición + clasificación + targets + SPC alineados a ESC 2024 y AHA/ACC 2025; agregado MAPA y MDPA como diagnóstico de 1ª línea | `78e0542` |
| 2026-05-21 | `pat_iam` | Clasificación a 5 tipos Universal Definition + STEMI equivalents; troponina hs como única biomarker primaria; tiempos ICP estratificados (60/90/120 min); prasugrel preferido ESC 2023; warning morfina+P2Y12 | `9fca7b2` |
| 2026-05-22 | `pat_dm2` | Algoritmo ADA 2025: SGLT2i/GLP-1 RA de inicio en ASCVD/IC/ERC independiente de HbA1c o metformina previa; +tirzepatide; +finerenona para nefroprotección; CGM/TIR como métrica; screening desde 35 años; aspirina NO en prevención primaria | `c7992ac` |
| 2026-05-22 | `pat_acv` | AHA/ASA 2024: trombectomía 0-6h estándar + 6-24h ventanas extendidas (DEFUSE-3/DAWN) + large core ASPECTS 3-5 (SELECT2/ANGEL-ASPECT 2023); tenecteplase como alternativa a alteplasa; DAPT corto post-stroke menor/AIT (CHANCE/POINT/THALES); ventana tPA extendida con imagen (WAKE-UP/EXTEND); +estatina alta intensidad; +nimodipina HSA; ICH bundle INTERACT3; ASPECTS + TC perfusión/angioTC; AIT definición tisular; ESUS | `2542c7e` |
| 2026-05-22 | `pat_epoc` | GOLD 2025: clasificación ABE reemplaza ABCD; algoritmo terapéutico inicial por grupo (A: mono LAMA/LABA; B: LABA+LAMA dual; E: dual ± ICS según eosinófilos); triple terapia LABA+LAMA+ICS si eosinófilos ≥300 (IMPACT/ETHOS); +Dupilumab para eosinofílico refractario (BOREAS/NOTUS 2023-24); +VNI en exacerbación con acidosis; +BiPAP domiciliaria (HOT-HMV); +cribado DAAT; +vacuna RSV; +ATB indicaciones Anthonisen; corticoide sistémico 40mg x 5d sin tapering (REDUCE); fix typo "Uscar" | `8b8a8b7` |
| 2026-05-22 | `pat_asma` | GINA 2024-2025 Track 1 PREFERIDO: ICS-formoterol PRN steps 1-2 + MART steps 3-5; eliminación SABA-only desde 2019 (warning explícito); steps 1-5 + dos tracks; +FeNO + eosinófilos sangre como biomarcadores; +LAMA (tiotropio) add-on step 4-5; +Magnesio sulfato IV en crisis severa; +6 biológicos para step 5 (omalizumab/mepolizumab/reslizumab/benralizumab/dupilumab/tezepelumab) con selección por fenotipo; AERD reconocida como fenotipo | `5fd955c` |
| 2026-05-22 | `pat_fa` | ESC 2024: CHA₂DS₂-VA reemplaza VASc (sin sexo femenino); enfoque AF-CARE; DOACs preferidos sobre warfarina excepto valvular; expandido a 4 DOACs (apixaban/rivaroxaban/edoxaban/dabigatrán) + antídotos específicos (idarucizumab/andexanet); +HAS-BLED; +stages AHA 2023; +EHRA; ablación primera línea (CASTLE-AF); control de ritmo precoz (EAST-AFNET 4); lenient rate control (RACE II); AHRE manejo no-automático | `1dfcb86` |
| 2026-05-22 | `pat_neumonia` | ATS/IDSA 2019 CAP + 2016 HAP/VAP: HAP separada de VAP; +neumonía viral (COVID/influenza/RSV); algoritmo terapéutico por nivel (ambulatorio/hospitalario/UCI); cobertura empírica MRSA y Pseudomonas SOLO con factores de riesgo (no automática); +fluoroquinolona respiratoria; +hidrocortisona CAP severa (CAPE COD 2023); duración 5 días + switch IV→VO 48-72h; +PCR multiplex + ecografía pulmonar; +criterios ATS/IDSA UCI (1 mayor/≥3 menores); PCV20/21 ACIP 2024 desde 50 años; +RSV ≥60 | `4c654b2` |
| 2026-05-22 | `pat_dm1` | ADA 2025 + ISPAD 2024: CGM como ESTÁNDAR Class A en todos los DM1; TIR > 70% como métrica primaria; +bombas y sistemas híbridos cerrados (AID — Tandem Control-IQ, Medtronic 780G, Omnipod 5, iLet); +teplizumab para retraso Stage 2→3; insulinas modernas (Degludec/Glargina U300/Fiasp/Lyumjev); +glucagón nasal (Baqsimi) y dasiglucagón (Zegalogue); hipoglucemia clasificada por Niveles 1-3 (ADA); +cribado autoinmune (celiaca, tiroides, Addison); +prevención CV con estatina/IECA-ARA; estadio 4 emergente | `82e7f39` |
| 2026-05-22 | `pat_angina` | ESC 2024 Chronic Coronary Syndromes (CCS): renombramiento desde "angina estable"; angina inestable separada (NSTE-ACS); +INOCA/MINOCA/ANOCA; modelo pretest probability ponderado; CCTA primera línea no invasiva (5-50% pretest); +CT-FFR + FFR/iFR invasivos para estenosis intermedias; +calcio score; +tests funcionales con imagen (eco-stress/SPECT/PET/RMN); algoritmo terapéutico ESC 2024 (BB+BCC paso 1, nitrato LA/ranolazina/ivabradina paso 2); +IECA/ARA para prevención; LDL target <55; revascularización Heart Team con criterios PCI vs CABG (FREEDOM/STICH/SYNTAX) | `a3939a7` |

---

## 🎯 Milestone: Top-10 priorizado COMPLETO (11/151 entries revisadas)

Las 10 patologías de mayor prevalencia + impacto clínico están revisadas y alineadas a guidelines 2022-2025. Más pat_icc (sesión 17 previa) = **11 entries con `revisadoEn` y `fuentes` completos** sobre 151 totales.

## Segundo lote priorizado (en progreso)

Iniciado 2026-05-22 tras completar top-10. Orden por impacto clínico + prevalencia + criticidad.

| Prioridad | ID | Patología | Guideline objetivo | Estado |
|---|---|---|---|---|
| 1 | `pat_eap` | Edema Agudo de Pulmón | ESC 2021/2023 HF + ADVOR + EMPULSE | ✅ `52df188` |
| 2 | `pat_cetoacidosis` | Cetoacidosis Diabética | ADA 2024 hyperglycemic crises + ISPAD 2022 | ✅ `7def7bc` |
| 3 | `pat_tep` | Tromboembolismo Pulmonar | ESC 2019 PE + DOACs + DOAC en cáncer | ✅ `57f1beb` |
| 4 | `pat_endocarditis` | Endocarditis Infecciosa | ESC 2023 IE + Duke-ISCVID 2023 + POET | ✅ `d9225e7` |
| 5 | `pat_neumotorax` | Neumotórax | BTS 2023 + RCT Brown NEJM 2020 + Hallows Lancet 2020 | ✅ `62c37f9` |
| 6 | `pat_meningitis` | Meningitis | ESCMID + IDSA + Thwaites NEJM 2004 + BioFire ME | ✅ `dd67827` |
| 7 | `pat_epilepsia` | Epilepsia | ILAE 2017 + AES 2016 SE + ESETT Lancet 2020 + RAMPART | ✅ `684ed05` |
| 8 | `pat_tuberculosis` | Tuberculosis | WHO 2022 BPaLM + ATS/CDC/IDSA 2022 4-mo HPMZ + 3HP/4R ITBL + Xpert Ultra | ✅ `89d680b` |
| 9 | `pat_cirrosis` | Cirrosis Hepática | Baveno VII 2022 + AASLD 2021/2024 + MASH 2023 + MELD 3.0 + Terlipresina/Resmetirom | ✅ `ce36a11` |
| 10 | `pat_pancreatitis` | Pancreatitis Aguda | Atlanta 2012 + ACG 2024 + WATERFALL + PANTER/TENSION step-up | ✅ `b24d0e8` |

---

## 🎯 Milestone: SEGUNDO LOTE COMPLETO (21/151 entries revisadas)

Cardiovascular (6): pat_icc, pat_hta, pat_iam, pat_fa, pat_angina, pat_eap, pat_endocarditis
Endocrino (3): pat_dm2, pat_dm1, pat_cetoacidosis
Respiratorio (5): pat_epoc, pat_asma, pat_neumonia, pat_neumotorax, pat_tep, pat_tuberculosis
Neurológico (3): pat_acv, pat_meningitis, pat_epilepsia
Digestivo (2): pat_cirrosis, pat_pancreatitis

---

## Tercer lote priorizado (en progreso desde 2026-05-24)

10 entries más de prioridad media — patologías frecuentes en pacientes hospitalizados con manejo evolutivo en últimos años.

| Prioridad | ID | Patología | Guideline objetivo | Estado |
|---|---|---|---|---|
| 1 | `pat_ira` | Insuficiencia Respiratoria Aguda | Global Definition ARDS 2023 + ESICM 2023 + FLORALI/PROSEVA/EOLIA + ICU-LIBERATION | ✅ `8be1b85` |
| 2 | `pat_parkinson` | Enfermedad de Parkinson | MDS 2015 + AAN 2021 + αSyn-SAA 2023 + farmacología 2019-2024 | ✅ `6594784` |
| 3 | `pat_alzheimer` | Enfermedad de Alzheimer | NIA-AA 2024 + lecanemab/donanemab + p-tau217 + Lancet Commission 2024 | ✅ `cca36af` |
| 4 | `pat_apendicitis` | Apendicitis Aguda | WSES 2020 + CODA NEJM 2020 + APPAC NEJM 2018 + SIS-IDSA 2017 + STOP-IT | ✅ `454f969` |
| 5 | `pat_obstrucción_intestinal` | Obstrucción Intestinal | WSES Bologna 2018/2024 + Gastrografin Branco 2010 + neostigmina Ogilvie + SMART | ✅ `d0183d7` |
| 6 | `pat_hemorragia_digestiva` | Hemorragia Digestiva | Baveno VII + AGA 2021 + ESGE 2021/2024 + BSG 2019 + Villanueva NEJM 2013 + preemptive TIPS | ✅ `8de5532` |
| 7 | `pat_eii` | Enfermedad Inflamatoria Intestinal | ECCO 2022/2024 + ACG 2024 + STRIDE-II + Montreal + biológicos 2020-2024 (anti-IL-23, JAK, S1P) | ✅ `f9e7e10` |
| 8 | `pat_ulcera_peptica` | Úlcera Péptica | ACG 2024 + Maastricht VI/Florence 2022 + vonoprazán FDA 2022 + WSES perforación 2020 | ✅ `9124402` |
| 9 | `pat_hipotiroidismo` | Hipotiroidismo | ATA 2014 + 2017 embarazo + TRUST NEJM 2017 + checkpoint immunotherapy + síndrome poliglandular | ✅ `90fc108` |
| 10 | `pat_hipertiroidismo` | Hipertiroidismo / Graves | ATA 2016 + 2017 embarazo + teprotumumab OPTIC NEJM 2020 + EUGOGO 2021 + Burch-Wartofsky tormenta | ✅ `pendiente commit` |

---

## 🎯 Milestone: TERCER LOTE COMPLETO (31/151 entries revisadas, 20.5%)

Tercer lote completado en sesiones 39-48 (24 mayo 2026):
- **Respiratorio crítico** (1): pat_ira (Global Definition ARDS 2023)
- **Neurológico crónico** (2): pat_parkinson (MDS 2015 + αSyn-SAA), pat_alzheimer (NIA-AA 2024 + lecanemab/donanemab)
- **Quirúrgico abdominal** (2): pat_apendicitis (WSES 2020 + CODA), pat_obstrucción_intestinal (WSES Bologna 2024 + Gastrografin)
- **Digestivo médico** (3): pat_hemorragia_digestiva (Baveno VII + Villanueva + preemptive TIPS), pat_eii (ECCO 2024 + biológicos 2020-2024), pat_ulcera_peptica (Maastricht VI + vonoprazán)
- **Endocrino** (2): pat_hipotiroidismo (ATA 2014/2017 + TRUST), pat_hipertiroidismo (ATA 2016 + teprotumumab + tormenta tiroidea)

Total acumulado de 3 lotes: 31/151 (20.5%) — cobertura de las patologías de mayor prevalencia hospitalaria en adulto medico-quirúrgico, con guidelines 2022-2025.

**Total: 21/151 entries (~14% de la base)** con `revisadoEn` y `fuentes` completos. Cobertura amplia de las patologías más prevalentes en enfermería médico-quirúrgica de adultos.

(actualizar esta tabla en cada sesión clínica nueva)

---

## Cuarto lote priorizado — bloque renal+ (2026-06-11)

5 entries del sistema renal/urinario, núcleo de los cuidados nefrológicos de enfermería.

| Prioridad | ID | Patología | Guideline objetivo | Estado |
|---|---|---|---|---|
| 1 | `pat_irc` | Insuficiencia Renal Crónica | KDIGO CKD 2024 + SGLT2i (DAPA-CKD/EMPA-KIDNEY) + finerenona (FIDELIO/FIGARO) | ✅ `df122a8` |
| 2 | `pat_ira_renal` | Insuficiencia Renal Aguda | KDIGO AKI 2012 staging + bundle hiperpotasemia + STARRT-AKI timing TRR | ✅ `f1eb031` |
| 3 | `pat_pielonefritis` | Pielonefritis Aguda | EAU Urological Infections 2024 + IDSA (stewardship FQ, ESBL/carbapenem, control de foco) | ✅ `e00604d` |
| 4 | `pat_litiasis` | Litiasis Renal | EAU Urolithiasis 2024 / AUA (MET 5-10 mm, descompresión urgente, análisis de cálculo) | ✅ `b25c45e` |
| 5 | `pat_glomerulonefritis` | Glomerulonefritis | KDIGO GN 2021 + update IgA 2024 + ANCA (ciclofosfamida/rituximab, plasmaféresis) | ✅ `pendiente commit` |

> Nota: `pat_litiasis_renal` del plan original no existe; el id real es `pat_litiasis`.

---

## 🎯 Milestone: CUARTO LOTE COMPLETO (36/151 entries revisadas, 23.8%)

Bloque renal/urinario alineado a KDIGO y EAU 2021-2024:
- **Renal médico** (3): pat_irc (KDIGO CKD 2024 + 4 pilares de nefroprotección), pat_ira_renal (KDIGO AKI + STARRT-AKI), pat_glomerulonefritis (KDIGO GN 2021 + ANCA/rituximab)
- **Urológico** (2): pat_pielonefritis (EAU 2024 + restricción FQ + control de foco), pat_litiasis (EAU urolithiasis 2024 + MET + descompresión urgente)

Cambios paradigmáticos incorporados: SGLT2i y finerenona como pilares de nefroprotección en IRC; mapa de calor CGA (TFG + albuminuria); bundle completo de hiperpotasemia y timing no-acelerado de TRR (STARRT-AKI); stewardship antibiótico y cobertura ESBL en pielonefritis; terapia expulsiva médica 5-10 mm y descompresión del riñón obstruido infectado como emergencia; inducción ANCA con ciclofosfamida o rituximab y soporte KDIGO con bloqueo del SRAA +/- SGLT2i.
