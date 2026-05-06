# Arquitectura — Patologías de Enfermería

**Versión actual**: v2.0.1 (versionCode 3, mayo 2026)

## Boot sequence (App.tsx)

```
initSentry()       — scaffold con require defensivo (no-op si dep o DSN faltan)
initDatabase()     — crea tablas pathologies + meta, popula bundled si vacía
syncContent()      — fire-and-forget OTA sync gated por FEATURES.contentOTA
                     (también throttled a 6h entre fetches)
```

## Diagrama General

```
App.tsx
└── ErrorBoundary
    └── SafeAreaProvider
        └── ThemeProvider (light/dark/system, value memoizado)
            └── PremiumProvider (trial + subscription + code, EncryptedStorage)
                └── FavoritesProvider (AsyncStorage)
                    └── NotesProvider (AsyncStorage)
                        └── TabBarProvider (animated hide on scroll, value memoizado)
                            └── AppNavigator
                                ├── Onboarding (first run)
                                ├── MainTabs (5 tabs)
                                │   ├── Inicio → HomeScreen
                                │   ├── Sistemas → SystemsScreen
                                │   ├── Búsqueda → SearchScreen
                                │   ├── Escalas → ScalesScreen
                                │   └── Herramientas → ToolsScreen
                                └── Stack Screens (~25)
                                    ├── SystemPathologies
                                    ├── PathologyDetail
                                    ├── ScaleDetail
                                    ├── QuizScreen / QuizSession
                                    ├── DifferentialScreen
                                    ├── LabValues
                                    ├── EmergencyProtocols / ProtocolDetail
                                    ├── NandaScreen
                                    ├── Dashboard
                                    ├── AllFavorites / AllNotes
                                    ├── PremiumScreen
                                    ├── SettingsScreen (incluye Datos clínicos + sync now)
                                    ├── MiSuiteScreen (hub ecosystem 3 apps)
                                    ├── AboutScreen
                                    └── PrivacyPolicy / Terms
```

## Data Flow

```
JSON bundled (en assets, offline-ready)
├── pathologies.json (151 patologías, ~2.4 MB)
├── body_systems.json (12 sistemas)
├── clinical_scales.json
├── emergency_protocols.json
└── lab_values.json
        │
    db.ts (op-sqlite via JSI/C++)
    │   ├── ensureSchema()        — crea pathologies + meta tables
    │   ├── insertPathologies()    — bulk INSERT en transacción
    │   ├── getCurrentDataVersion / setDataVersion       — meta key=data_version
    │   ├── getLastSyncedAt / setLastSyncedAt            — meta key=last_synced_at
    │   └── repopulateFromJson()   — DELETE+INSERT atómico (path OTA)
        │
        ▼
   usePathologyData()  ←── hook central, executeSync queries
        │
        ├── usePathologySearch()  ←── full-text scoring sobre SQL fetch
        ├── useRecentPathologies / useFavorites / useNotes  ←── AsyncStorage
        ├── useQuiz                ←── genera preguntas
        ├── useDifferentialDiagnosis  ←── matching síntomas → ranking
        └── useDataInfo            ←── version + lastSyncedAt (para Settings UI)

services/
├── contentSync.ts                ←── OTA pipeline (fetch manifest → validate
│                                     → version compare → fetch JSON → repopulate
│                                     atómico). Throttle 6h. force flag para bypass
└── miSuite.ts                    ←── APPS registry + chooseLaunchUrls (deep-link
                                       fallback chain: scheme → market:// → web)

config/
├── appInfo.ts                    ←── APP_VERSION single source
├── features.ts                   ←── 6 flags compile-time (videoLinks, voiceSearch,
│                                     exportNotesPdf, contentOTA, syncBetweenDevices,
│                                     quizHistory) — todos en false por default
└── sentry.ts                     ←── initSentry() defensivo, DSN vacío hoy
```

## Premium Gating

```
isPremium = IS_PREMIUM_BUILD || isCodeActivated || isSubscribed || isTrialActive

IS_PREMIUM_BUILD = !(BuildConfigModule.IS_FREE)
  - Flavor free:    IS_FREE=true  → IS_PREMIUM_BUILD=false → trial/subscription required
  - Flavor premium: IS_FREE=false → IS_PREMIUM_BUILD=true  → always unlocked

Gating por sistema:
- Primeras 3 patologías de cada sistema: GRATIS
- Resto: requiere Premium (PremiumGate component)

Trial: 15 días desde primera apertura
Suscripción: Google Play monthly (patologias_premium_monthly)
Código: SHA-256 hash validation (easter egg en Settings > Version x5)
```

## Persistencia

### EncryptedStorage (Android Keystore — datos sensibles)
| Key | Descripción |
|-----|-------------|
| `@patologias_trial_start` | Inicio del período de prueba (timestamp) |
| `@patologias_subscription` | Estado de suscripción Google Play |
| `@patologias_activated` | Activación por código (SHA-256 hash) |

### AsyncStorage (datos no sensibles)
| Key | Descripción |
|-----|-------------|
| `@patologias_favorites` | IDs de patologías favoritas (string[]) |
| `@patologias_notes` | Notas por patología (Record<string, string>) |
| `@patologias_recent` | Últimas patologías visitadas (string[]) |
| `@patologias_search_history` | Historial de búsquedas (string[]) |
| `@patologias_quiz_results` | Resultados de quiz (QuizResult[]) |
| `@patologias_onboarding_complete` | Onboarding completado ('true') |
| `@patologias_theme` | Preferencia de tema ('light'/'dark'/'system') |

### SQLite (op-sqlite, file `patologias.sqlite`)
| Tabla | Filas | Descripción |
|-------|-------|-------------|
| `pathologies` | 151 | Dataset clínico (id, nombre, bodySystemId, definicion, fisiopatologia, NANDA-NIC-NOC, ...) |
| `meta` | 2 | `data_version` (entero) + `last_synced_at` (unix ms) — usado por OTA sync |

## Diseño Visual

- **Color primario**: Violeta `#6D28D9` (diferencia de GuiaFarmaco que usa azul)
- **Estilo**: Neumorphism con sombras suaves + hero cards con fotos clínicas
- **Imágenes**: Fotos reales de Unsplash (royalty-free) — usadas como fondo de cards, quick actions, onboarding, quiz chips
- **Íconos**: MaterialCommunityIcons solo como indicadores pequeños (tabs, badges, chevrons), NO como elementos visuales principales
- **Tipografía**: System fonts con responsive scaling
- **Animaciones**: Animated API (fade in, slide, spring) + pill indicators en tabs
- **Dark mode**: Completo con toggle o automático por sistema
- **Videos educativos**: Campo `videoUrl` en Pathology para enlazar videos de YouTube (futuro)

## Decisiones de Arquitectura

| Decisión | Razón |
|----------|-------|
| JSON bundled como seed + SQLite local | Funciona offline en hospitales sin WiFi, queries síncronas O(1) por id |
| OTA opcional sobre la base SQLite (flag `contentOTA`) | Updates de contenido sin republicar AAB. Throttle 6h para no saturar el host |
| Repopulate atómico (BEGIN/DELETE/INSERT/COMMIT) | Crash a mitad del update no deja DB inconsistente |
| FlashList para listas masivas | Recycling automático, 60 FPS sobre 151 entries |
| EncryptedStorage solo para premium/activation/trial | Defense-in-depth: tokens monetizables fuera del sandbox AsyncStorage. Datos no-sensibles siguen en AsyncStorage por simplicidad |
| Feature flags compile-time (`src/config/features.ts`) | Offline-first → no hay remote config. Flip + rebuild = nuevo release |
| Sentry con `require()` defensivo en try/catch | App boota aunque la dep no esté instalada (DSN vacío = no-op silencioso) |
| `normalizeText` con regla `k → c` | Tolera variantes ortográficas españolas (`hipercalemia`/`hiperkalemia`) bidireccionalmente |
| SHA-256 puro en JS para activation codes | Sin dep nativa, código premium activable offline |
| Pre-bundle JS en assets | Metro BundleDownloader es flaky en Windows con RN 0.84 |
| JDK 21 vs Java 25 | Java 25 rompe CMake del Android Gradle Plugin |
| Neumorphism + hero cards con fotos | Diferencia visual de apps médicas genéricas |
| `check-orphans.js` en CI | Previene que vuelva la deuda de orphan refs limpiada en Sesión 14 |
| Lint job blocking en CI (desde Sesión 12) | 0 errors hard requirement; warnings de inline-styles son convención RN deferida |
