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
| 2026-05-06 | `pat_icc` | Tratamiento HF a algoritmo 4-pilares ESC 2023 | `a3e6e3f` |

(actualizar esta tabla en cada sesión clínica nueva)
