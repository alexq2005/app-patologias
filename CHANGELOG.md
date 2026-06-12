# Changelog

> **Nota de versionado**: las entradas `[2.0.0]`, `[2.0.1]`, `[Unreleased]` listadas debajo corresponden al **versionado interno de desarrollo** (jamás publicado a Play Store). Para alinear con el lanzamiento público del ecosistema, todo el trabajo acumulado se compila como **v1.0.0 — Public ecosystem launch**. Las entradas internas se conservan como referencia histórica del proceso de construcción.

## [Unreleased] — 2026-06-10 (Hardening premium/trial + limpieza de repo)

Fixes revenue-critical en la lógica premium/trial detectados por auditoría, observabilidad en código de dinero y limpieza del root. Sin nuevo AAB.

### Fixed
- **Activación premium case-insensitive** (2026-06-12): el código distinguía mayúsculas/minúsculas, pero el input fuerza `autoCapitalize="characters"` → tipearlo daba mayúsculas y fallaba. Ahora `validateActivationCode` normaliza con `trim().toLowerCase()` (nueva `normalizeActivationCode`) y el `ACTIVATION_HASH` se computa en minúsculas → funciona en cualquier capitalización. 8 tests nuevos (`__tests__/activation.test.ts`). Mismo código que la app Curso (comparten `ACTIVATION_HASH`)
- **Trial perpetuo por storage corrupto**: `computeTrialDaysLeft` con `trialStartDate = NaN` devolvía 15 días PARA SIEMPRE (`!NaN` es truthy → entraba al branch "trial no iniciado"). Ahora NaN/±Infinity → 0 días (fail-closed) y `PremiumContext` re-inicializa el trial con `Date.now()` + re-persiste si el valor guardado no es finito — el trial se reinicia, no se regala perpetuo
- **Clock rollback extendía el trial**: retroceder el reloj del dispositivo daba más de 15 días restantes. Clamp superior `Math.min(trialDays, remaining)` — nunca más de `TRIAL_DAYS`
- **Catches silenciosos en código de dinero**: el init de `PremiumContext` (`.catch(() => setLoaded(true))` — si EncryptedStorage fallaba se perdían sub+trial sin rastro) y la persistencia de trial/sub (`.catch(() => {})`) ahora reportan vía `captureError(e, {scope, action})` de Sentry (no-op hasta configurar DSN, pero el rastro queda cableado)

### Removed
- **`activateSubscription()` eliminado de `PremiumContext`** (bomba latente): seteaba `isSubscribed=true` persistente sin validar ningún pago. Verificado con grep: 0 callers en `src/`. `purchaseSubscription` (TODO Play Billing) y `restoreSubscription` quedan intactos

### Changed
- `TRIAL_DAYS = 15` duplicado en `PremiumContext` eliminado — única fuente de verdad: `src/utils/premiumLogic.ts`

### Tests
- Suite nueva `__tests__/premiumLogic.test.ts` (lógica pura extraída a `src/utils/premiumLogic.ts` para testearla sin React/nativo) + 6 casos nuevos de hoy: NaN/Infinity/clock-rollback con clamp exacto. **Total: 82 tests** (era 60 en v1.0.0)

### Chore
- **68 PNGs huérfanos eliminados del root** (~41.5 MB): ninguno trackeado (gitignored por `/*.png`) ni referenciado por docs. Los 32 PNGs trackeados de `android/.../res/` quedan intactos
- `.claude/` agregado a `.gitignore`

---

## [Unreleased] — 2026-05-24 (Clinical content milestone + repo público)

Trabajo entre el 21 y el 24 de mayo de 2026 — sin nuevo AAB todavía, pero entrega significativa de contenido clínico que justifica próxima versión (probablemente v1.0.1 o v1.1.0).

### 🎯 Milestone — Revisión clínica de 21/151 entries (sesiones 17, 19-38)

Veintiuna patologías de mayor prevalencia en enfermería médico-quirúrgica adulta alineadas a guidelines 2022-2025, con metadata `revisadoEn` + `fuentes` completos. Cribado `node scripts/check-stale.js` reporta 21 frescas (era 1 al inicio de mayo).

**Cobertura por sistema**:
- **Cardiovascular (7)**: pat_icc, pat_hta, pat_iam, pat_fa, pat_angina, pat_eap, pat_endocarditis
- **Endocrino (3)**: pat_dm2, pat_dm1, pat_cetoacidosis
- **Respiratorio (6)**: pat_epoc, pat_asma, pat_neumonia, pat_neumotorax, pat_tep, pat_tuberculosis
- **Neurológico (3)**: pat_acv, pat_meningitis, pat_epilepsia
- **Digestivo (2)**: pat_cirrosis, pat_pancreatitis

**Cambios paradigmáticos incorporados** (no penetrados aún en muchos materiales hispanohablantes):
- **HTA**: ESC 2024 categoría "PA elevada" 120-139; SPC como primer paso terapéutico (no rescate)
- **IAM**: P2Y12 pretreatment degradado a Class III en NSTE-ACS (ESC 2023, post-ATLANTIC trial)
- **DM2**: SGLT2i/GLP-1 RA inicial en ASCVD/IC/ERC, independiente de HbA1c o metformina previa (ADA 2025)
- **ACV**: trombectomía 6-24h Class 1 + ASPECTS 3-5 "large core" elegible (SELECT2/ANGEL-ASPECT 2023)
- **EPOC**: clasificación ABE reemplaza ABCD; LABA+LAMA dual como primer paso en B/E (GOLD 2025)
- **Asma**: SABA-only proscrito desde GINA 2019; Track 1 (ICS-formoterol PRN/MART) preferido
- **FA**: CHA₂DS₂-VA reemplaza VASc (sin sexo femenino, ESC 2024)
- **Neumonía**: MRSA y Pseudomonas SOLO con factores de riesgo; PCV20/21 ACIP 2024 desde 50 años
- **DM1**: CGM Class A en todos; AID (sistemas híbridos cerrados) como estándar emergente; teplizumab Stage 2
- **Angina**: CCS reemplaza "angina estable"; CCTA primera línea no invasiva
- **Pancreatitis**: hidratación MODERADA (WATERFALL NEJM 2022, no agresiva); step-up approach (PANTER/TENSION); alimentación enteral precoz
- **Cirrosis**: Baveno VII cACLD/CSPH; carvedilol > propranolol; MELD 3.0 con sexo femenino; terlipresina HRS-AKI; resmetirom MASH
- **Tuberculosis**: BPaLM 6 meses todo-oral para MDR (WHO 2022); 4-month HPMZ para sensible; 3HP semanal para ITBL

**Fuentes (>30 documentos)**: ESC 2023-2024, AHA/ACC 2024-2025, AHA/ASA 2024, ADA 2025, ISPAD 2024, GOLD 2025, GINA 2024-2025, ATS/IDSA 2019-2022, KDIGO 2024, BTS 2023, ESCMID, ILAE 2017, WHO 2022, Baveno VII, AASLD 2021/2024, Atlanta 2012, ACG 2024, ESGE 2020, Duke-ISCVID 2023, Fourth Universal Definition of MI + ~30 ensayos clave (ESETT, RAMPART, PEITHO, IMPACT, ETHOS, BOREAS, ADVOR, EMPULSE, WATERFALL, PANTER, TENSION, APEC, CASTLE-AF, EAST-AFNET 4, Brown NEJM 2020, Hallows Lancet 2020, etc.)

### 🌐 Repo público en GitHub

- Repo publicado en **https://github.com/alexq2005/app-patologias** el 2026-05-24
- Antes del push: `git filter-repo --replace-text` para scrubbear `PatologiasEnf2026` y `patologias-upload` del historial completo (passwords del keystore que estaban en commits anteriores a la auditoría de sesión 18)
- Todos los SHAs de commits cambiaron post-scrub; backup pre-scrub conservado en `F:/programas/Patologias-backup-pre-scrub-2026-05-24` por seguridad
- Referencias a SHAs en `PROGRESO.md`, `docs/CLINICAL_REVIEW_PLAN.md` y archivos de memoria actualizadas a hashes post-scrub mediante mapeo automatizado (47 reemplazos, 0 refs huérfanas)
- CI (GitHub Actions) corre verde en cada push (workflow `.github/workflows/ci.yml`)

### 🔐 Hardening de seguridad (sesión 18 — auditoría 12 niveles)

- **Hallazgo crítico**: passwords del keystore release commiteadas en `android/gradle.properties` desde primeros commits del proyecto
- **Mitigación**: passwords movidas a `~/.gradle/gradle.properties` (user-level, fuera del repo); template `android/gradle.properties.example` para nuevos devs
- **Limpieza de basura**: 6 dumps `ui*.xml` de uiautomator eliminados + regla `.gitignore`
- **AAB v1.0.0 (versionCode 4)** verificado con `jarsigner`: firmado correctamente con alias `***scrubbed***`, RSA-2048/SHA-384

### Pendientes para próxima versión publicable (v1.0.1 / v1.1.0)

- Rebuild AAB con el contenido clínico actualizado (versionCode incrementar a 5)
- Smoke test visual UI de las 21 entries revisadas — las listas largas (clasificación, farmacológico) pueden requerir ajustes de scroll/formato
- Decisión sobre tercer lote de revisión clínica (10 entries más sugeridas: pat_ira, pat_parkinson, pat_alzheimer, pat_apendicitis, etc.)
- LICENSE para el repo público (actualmente sin definir)

---

## [1.0.0] — 2026-05-06 (Lanzamiento público — Ecosistema v1)

Primera versión pública en Play Store. Compila todo el trabajo de desarrollo interno (anteriores 2.0.0 + 2.0.1 + post-2.0.1 work — ver historial debajo) en un release coherente.

### Highlights para el usuario final
- **151 patologías** por sistema con NANDA-NIC-NOC, escalas, lab values, protocolos
- **Quiz educativo** con revisión de errores
- **Diagnóstico diferencial** por síntomas con ranking
- **Búsqueda tolerante** a tildes y variantes ortográficas (`hipercalemia` ≡ `hiperkalemia`)
- **Funciona offline** 100% (SQLite local)
- **Mi Suite** — hub para conectar con Curso de Enfermería y Guía Farmacológica
- **Dark mode + responsive**
- **15 días trial → freemium** con suscripción Google Play o código de activación

### Highlights técnicos (heredados del trabajo interno 2.0.x)
- Stack moderno: React Native 0.84, op-sqlite via JSI, FlashList, EncryptedStorage para tokens premium
- 60 unit tests + 4 jobs CI bloqueantes (test, lint, typecheck, data integrity)
- Infra OTA lista para v1.1 (manifest validation, throttle, force sync, indicador UI)
- Sentry scaffold defensivo listo para v1.1
- Disclaimer clínico visible (About card + footnote PathologyDetail)
- Versionado clínico: `revisadoEn` + `fuentes` por patología, audit job `freshness`

### Bug fix de seguridad incluido
- 4 bugs latentes de React Hooks corregidos (PathologyDetail/ProtocolDetail/LabValues/QuizSession) — destapados al pagar deuda de lint, prevenían crashes en re-renders específicos

### Notas
- versionCode interno saltó a 4 (incrementado siempre, vc es contador inmutable). versionName 1.0.0 es lo que el usuario ve.
- Bug de contenido conocido NO bloqueante: faltan ~7 patologías (hiperkalemia, shock genérico, IRA, hashimoto, etc) — diferidas a v1.1 sesiones de contenido

---

## Historial de desarrollo interno (pre-1.0)

> Estas entradas documentan iteraciones que jamás llegaron a Play Store. Mantenidas como histórico del proceso.

## [Unreleased Internal] — 2026-05-06 (Data quality + search + legal disclaimer)

### Content updates (validated vs 2024+ sources)
- **`pat_icc` Insuficiencia Cardíaca → ESC 2023 4-pillar algorithm**: agregados Sacubitril/Valsartán (ARNI 1ra línea preferida sobre IECA) y SGLT2i (Dapagliflozina/Empagliflozina 10mg/d, across all EF spectrum). IECA reclasificado como alternativa. Primera patología con `revisadoEn` + `fuentes` (6 fuentes: ESC 2023 Focused Update, PARADIGM-HF, DAPA-HF, EMPEROR-Reduced/Preserved, DELIVER). Métrica `check:stale`: 0/151 → 1/151 fresh

### Added
- **Clinical reference disclaimer** en About y al pie de cada PathologyDetail. About: tarjeta destacada con "Última revisión general: Mayo 2026 · Fuentes principales hasta 2023" + aviso explícito de que NO sustituye criterio profesional ni guías institucionales actualizadas. PathologyDetail: footnote pequeño con info icon al final del scroll
- **Clinical content versioning infrastructure**: `Pathology` type extiende con campos opcionales `revisadoEn` (ISO date) y `fuentes` (`"ESC 2024"`, etc). `scripts/check-stale.js` + CI job `freshness` (warning-only) reporta patologías sin fecha de revisión o con > 24 meses. Convención documentada en CLAUDE.md para futuras ediciones
- **Data integrity check** (`scripts/check-orphans.js` + CI job `data`): valida que toda entrada en `relatedPathologyIds` apunte a una patología real. Bloquea PRs futuros que introduzcan refs huérfanas. `npm run check:orphans` para correr local

### Fixed
- **45 referencias rotas** en `relatedPathologyIds` (38 ids únicos huérfanos): tap "ver patología relacionada" llevaba a pantalla "no encontrada". 10 fueron typos de ids reales (renombrados: `pat_asma_bronquial → pat_asma`, `pat_tceg → pat_tce`, etc), 35 sin match válido (eliminados). Bonus: 1 dedupe de `pat_icc` duplicado
- **Search no tolera variantes ortográficas k↔c**: `normalizeText` ahora colapsa `k → c` (`hiperkalemia / hipercalemia`, `ketoacidosis / cetoacidosis`). Bug destapado por búsqueda de "hipercalemia" del usuario

### Changed
- `src/screens/SystemPathologiesScreen.tsx` ahora importa `normalizeText` desde `src/utils/search.ts` en vez de tener copia local (que además carecía del `.trim()`). Single source of truth

### Notes
- Patologías FALTANTES detectadas durante el audit (a agregar en sesión dedicada de contenido): hiperkalemia, shock genérico, insuficiencia renal/suprarrenal, hashimoto, SII, incontinencia urinaria

## [2.0.1] — 2026-05-06 (Hook bug fixes — patch release)

### Fixed
- **Crash en `PathologyDetailScreen`** al abrir patología con id inválido tras una válida — 3 hooks (`useCallback`/`useRef`/`useMemo`) reordenados arriba del early-return guard
- **Crash en `ProtocolDetailScreen`** mismo patrón — `useMemo` de `sortedSteps` reordenado
- **`LabValuesScreen`** dep `rs` redundante removida (la cubría `styles`)
- **`QuizSessionScreen`** `useEffect` ahora regenera el quiz cuando `category`/`questionCount` cambian (antes deps vacías ignoraban cambios)

### Changed
- `versionCode 2 → 3`, `versionName "2.0.0" → "2.0.1"` (semver patch)
- `package.json`, `android/build.gradle` y `src/config/appInfo.ts` alineados a `2.0.1`

### Notes
- v2.0.1 lleva los fixes de Sesión 12 a producción. Bundle `c2c7add` (commiteado en Sesión 11) se quedó sin esos fixes.
- **Bug de contenido conocido NO incluido en este release**: la patología "Hipercalemia/Hiperkalemia/Hiperpotasemia" no existe como entry en `pathologies.json` aunque está referenciada en `relatedPathologyIds` (id huérfano). Diferido a v2.0.2 con sesión dedicada de contenido.

## [Unreleased] — 2026-05-05 (Release Infrastructure)

### Fixed
- **4 bugs latentes de React Hooks** detectados al pagar deuda de lint:
  - `PathologyDetailScreen`: 3 hooks (`useCallback`, `useRef`, `useMemo`) llamados después del early-return cuando `pathology` era `undefined` — crash garantizado al re-renderizar con id válido tras inválido
  - `ProtocolDetailScreen`: `useMemo` de `sortedSteps` tras early-return — mismo patrón
  - `LabValuesScreen`: dep `rs` innecesaria en `useMemo` (ya estaba en `styles`)
  - `QuizSessionScreen`: `useEffect` con deps vacías + comment "run once" que ignoraba cambios en `category`/`questionCount`/`generateQuiz`
- **60 errores de lint** eliminados: imports muertos, destructured no usados (~20 archivos)

### Changed
- **CI lint job promovido a bloqueante** (`continue-on-error: false`). Cualquier PR futuro que introduzca un error ESLint frena el merge
- **`.eslintrc.js`** con `overrides`: jest globals en tests, `no-bitwise` desactivado en `activation.ts` (SHA-256-style hash)

### Added
- **MiSuite hub** (`src/screens/MiSuiteScreen.tsx` + `src/services/miSuite.ts`): pantalla de ecosistema 3-en-1 (Patologías + Curso + Guía Farmacológica). Detecta cuáles apps están instaladas via deep-link schemes, ofrece abrir o descargar de Play Store. Card actual marcada "ESTÁS AQUÍ", otras con status visual (instalada/no instalada). Service expone `APPS` registry + `chooseLaunchUrls(app, status)` con fallback chain (scheme → market:// → https://play.google.com). 12 unit tests sobre invariantes del registry y los 3 paths del fallback. Android: `<queries>` para curso/farmacologia + `<intent-filter>` patologias:// (deep-link de retorno desde otras apps). Tile "Mi suite" en Tools tab
- **OTA content sync** (`src/services/contentSync.ts` + `db.ts` ext.): infraestructura para actualizar `pathologies.json` sin republicar el AAB. Pipeline: fetch manifest → validate → version compare → fetch JSON → validate shape → repopulate atómico en SQLite. Gated por `FEATURES.contentOTA` (off por default). Defensas: HTTPS-only, size sanity (100KB-10MB), `minAppVersion` gating, downgrade refusal, transacción atómica con rollback. **Throttling 6h** entre fetches (con bypass `{ force: true }` para futuro botón "Buscar actualización ahora"). 33 unit tests
- **Indicador "Datos clínicos" en Settings**: nueva row con versión del dataset + tiempo relativo desde el último sync ("v1 · verificado hace 5 minutos"). `useDataInfo` hook reactivo con `useFocusEffect` y `refresh()` manual. `formatRelativeTime` con plurales castellanos correctos (7 unit tests). Single source of truth `src/config/appInfo.ts` para `APP_VERSION` (antes duplicado). **Botón "Buscar actualización ahora"**: la misma row se vuelve tap-able cuando `FEATURES.contentOTA` está on — llama `syncContent({ force: true })` bypasseando el throttle, muestra spinner durante el fetch y Alert con el resultado
- **Feature flag registry** (`src/config/features.ts`): tipado, compile-time, con helper `isFeatureEnabled(flag)`. Flags iniciales para `videoLinks`, `voiceSearch`, `exportNotesPdf`, `contentOTA`, `syncBetweenDevices`, `quizHistory` (todos en `false`)
- **Sentry crash reporting scaffold** (`src/config/sentry.ts`): `initSentry()` con `require()` defensivo en try/catch. No-op si dep no instalada o DSN vacío. PII strip por default. Setup manual documentado en el archivo
- **GitHub Actions CI** (`.github/workflows/ci.yml`): jobs `test` y `typecheck` bloqueantes; `lint` non-blocking hasta pagar deuda. Concurrency cancela runs viejos

### Changed
- **`db.ts` refactorizado**: extraídas `ensureSchema()`, `insertPathologies()`, `setDataVersion()`. Tabla `meta` agregada para tracking de versión. Comportamiento existente (initial populate desde bundled JSON) preservado

### Fixed
- Mocks de Jest desactualizados desde la migración v2.0.0: agregados `react-native-encrypted-storage`, `@op-engineering/op-sqlite`, `@shopify/flash-list`. Tests vuelven a 13/13 passing
- Props heredadas de FlatList en `SearchScreen` y `SystemPathologiesScreen` (`estimatedItemSize`, `initialNumToRender`, `windowSize`) que FlashList v2 ya no soporta — eliminadas. TypeScript ahora compila con 0 errores

## [2.0.0] — 2026-03-29 (Hyper-Optimization Update)

### Added
- **Base de Datos SQLite**: Todo el sistema de carga JSON fue rediseñado. Los JSONs ahora fungen como semilla; `db.ts` inyecta todo en una tabla local.
- **Rendimiento a 60 FPS garantizado**: Pantallas pesadas migradas de `FlatList` a `@shopify/flash-list`.
- **Seguridad Premium**: Persistencia Premium reemplazada por `react-native-encrypted-storage` (Keystore nativo de Android).
- **Hooks rediseñados**: `usePathologyData` y `usePathologySearch` extraen mediante JSI directo en C++.
- **Memoización Profunda**: Optimizadas todas las cabeceras `useMemo` en Contextos como `ThemeContext` previendo render cycles.

## [1.1.0-dev] — 2026-03-27

### Added
- **Quiz educativo**: tras cada respuesta el usuario ve explicaciones enriquecidas con "¿Sabías que...?" (definición clínica), "Dato clave" (epidemiología, fármacos, valores de referencia), y botón para ver la patología completa. En el resumen final, sección "Revisar errores" muestra cada pregunta fallada con explicación detallada y links para estudiar
- **Diagnóstico diferencial interactivo**: nueva pantalla DifferentialScreen donde el usuario selecciona síntomas y ve patologías rankeadas por porcentaje de coincidencia. Incluye filtro por sistema corporal y badges de nivel de emergencia
- **Hook useDifferentialDiagnosis**: construye índice de síntomas a partir de las 151 patologías y calcula matching en tiempo real
- **Campo videoUrl en Pathology**: soporte para enlazar videos educativos de YouTube por patología (implementación visual futura)
- **13 tests unitarios**: 12 tests para lógica de quiz + 1 smoke test de App. Mocks completos para react-navigation, linear-gradient, safe-area-context, vector-icons
- **Scripts de utilidad**: enrich_nanda.js y fix_tildes.js para enriquecimiento de datos

### Changed
- **Visual upgrade masivo**: migración de íconos vectoriales a fotos clínicas reales como elementos visuales principales en HomeScreen (quick actions con fotos), OnboardingScreen (slides full-screen con fotos clínicas), QuizScreen (chips con thumbnails de sistemas), ScalesScreen, ToolsScreen, tabs
- **OnboardingScreen rediseñada**: slides con ImageBackground + gradientes de color por slide, estadísticas destacadas, diseño inmersivo full-screen
- **HomeScreen mejorada**: fondo decorativo con gradientes y círculos difuminados, quick actions con fotos clínicas de fondo, toggle dark mode con emoji
- **Tab bar mejorado**: animaciones pill con spring, indicadores de foco más sutiles
- **4 imágenes de sistemas actualizadas**: inmunológico, reproductivo, tegumentario, traumatológico — fotos clínicas de mayor calidad
- **Datos enriquecidos**: body_systems.json y lab_values.json con valores adicionales

## [1.0.0] — 2026-03-26

### Added
- 151 patologías clínicas organizadas en 12 sistemas corporales
- Información NANDA-NIC-NOC para cada patología
- 20 pantallas completas con diseño hero (fotos + gradientes)
- Quiz interactivo con 8 tipos de preguntas y resultados persistentes
- 17 escalas clínicas con calculadora interactiva y fotos por categoría
- Valores de laboratorio con rangos normales e implicaciones de enfermería
- Protocolos de emergencia paso a paso
- Sistema de favoritos y notas personales
- Búsqueda full-text con scoring y historial
- Onboarding de 3 slides para primera vez
- Modo oscuro (light/dark/system)
- 34 fotos médicas reales de Unsplash (12 sistemas + 13 condiciones + 9 escalas)
- HomeScreen con hero cards, gradientes y search integrado
- SystemsScreen con grid de fotos por sistema corporal
- ScalesScreen con carrusel "Más utilizadas" y cards con fotos clínicas
- ToolsScreen con grid de fotos y gradientes por herramienta
- Tab bar animado que se oculta al scrollear en todas las pantallas

### Premium System
- Trial de 15 días con acceso completo
- Banner "Período de prueba" visible durante el trial
- Bloqueo de contenido premium al expirar trial
- Suscripción mensual vía Google Play (`patologias_premium_monthly`)
- Activación por código (Settings > Version x5 > ingreso de código)
- PremiumGate con mensaje de expiración y botón de suscripción
- Flavor `free` (con restricciones) y `premium` (todo desbloqueado)

### Technical
- React Native 0.84.1 + TypeScript 5.8
- New Architecture (Fabric + TurboModules)
- Android SDK 24-36, Gradle 9
- Pre-bundled JS en assets (workaround Metro bug Windows)
- SHA-256 puro en JS para validación de códigos de activación
- JDK 21 (Android Studio JBR) requerido para builds

### Play Store
- AAB generado (45 MB)
- Ficha completa (título, descripción corta/completa, tags)
- Política de privacidad HTML
- Clasificación de contenido IARC preparada
- Ícono 512x512 y feature graphic 1024x500 (SVG)
- Instrucciones de publicación paso a paso
- Plan de actualizaciones de 12 meses
