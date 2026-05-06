# Patologias de Enfermeria — Project Instructions

## Build Commands

```bash
# OBLIGATORIO: usar JDK 21, NO Java 25
export JAVA_HOME="C:/Program Files/Android/Android Studio/jbr"
export JAVA_TOOL_OPTIONS="-Dfile.encoding=UTF-8"

# Pre-bundle JS (obligatorio antes de build por bug Metro Windows)
npx react-native bundle --platform android --dev false --entry-file index.js \
  --bundle-output android/app/src/main/assets/index.android.bundle \
  --assets-dest android/app/src/main/res/

# Build debug
cd android && ./gradlew app:assembleFreeDebug

# Build release (APK)
cd android && ./gradlew app:assembleFreeRelease app:assemblePremiumRelease

# Build release (AAB para Play Store)
cd android && ./gradlew app:bundleFreeRelease

# Instalar en emulador
adb install -g android/app/build/outputs/apk/free/release/app-free-release.apk
```

## Critical Rules

- **NEVER use Java 25** for Gradle builds — CMake crashes with `restricted method` error
- **ALWAYS pre-bundle JS** before build — Metro BundleDownloader fails on Windows emulator
- **NEVER run `./gradlew clean`** — invalidates CMake cache, Java 25 can't rebuild
- Emulator API 36 has ~600MB free — `pm uninstall` + `pm trim-caches` before install
- Emulator takes ~25-40 seconds to initialize Hermes

## Project Structure

- `src/data/pathologies.json` — 151 patologias (~2.4 MB), seed for SQLite
- `src/data/db.ts` — op-sqlite layer: `initDatabase`, `repopulateFromJson`, `getCurrentDataVersion`, `getLastSyncedAt`
- `src/services/contentSync.ts` — OTA pipeline (gated by `FEATURES.contentOTA`, throttled 6h)
- `src/services/miSuite.ts` — APPS registry + `chooseLaunchUrls` (deep-link fallback chain)
- `src/config/appInfo.ts` — `APP_VERSION` single source of truth
- `src/config/features.ts` — typed feature flags (compile-time)
- `src/config/sentry.ts` — Sentry scaffold (DSN vacío hoy)
- `src/context/PremiumContext.tsx` — trial (15 days), subscription, code activation; usa EncryptedStorage
- `src/utils/activation.ts` — SHA-256 code validation (eslint `no-bitwise: off`)
- `src/utils/search.ts` — `normalizeText` con regla `k → c` para variantes ortográficas
- `src/hooks/useDataInfo.ts` — hook reactivo de version + lastSyncedAt para Settings UI
- `src/utils/scaleImages.ts` — maps 14 scale categories to clinical photos
- `src/utils/conditionImages.ts` — maps 151 pathology IDs to 13 condition photos
- `src/utils/systemImages.ts` — maps 12 body systems to photos
- `scripts/check-orphans.js` — audit `relatedPathologyIds` (corre en CI job `data`)
- Contact email: alexq2005@gmail.com (in About, Terms, Privacy screens)

## Premium System

- Trial: 15 days, stored in **EncryptedStorage** `@patologias_trial_start`
- Subscription state: **EncryptedStorage** `@patologias_subscription`
- Subscription SKU: `patologias_premium_monthly`
- Code activation: Settings > Version row > tap 5 times > enter code (SHA-256 hash check)
- Free tier: 3 pathologies per system, 5 favorites, 5 notes
- Flavor `free`: has restrictions + trial. Flavor `premium`: all unlocked always
- `IS_PREMIUM_BUILD` = `!(IS_FREE)` — free flavor has IS_FREE=true

## OTA Content Updates

- Off por default (`FEATURES.contentOTA: false` en `src/config/features.ts`)
- Para activar: hostear `manifest.json` + `pathologies.json` (HTTPS), pegar URL en `src/services/contentSync.ts:42`, flip flag, rebuild
- Indicador en Settings: row "Datos clínicos" muestra `vN · verificado/actualizado hace X` y permite force-sync
- Throttle 6h entre fetches; bypass con `syncContent({ force: true })`
- Ver `gh-pages` branch local (sin pushear todavía) para template inicial de hosting

## Design Preferences

- Hero-style cards with photo backgrounds + gradient overlays (NOT flat icons)
- Gradient quick action buttons with matching shadow colors
- Primary color: Violeta #6D28D9
- Neumorphic card style for light mode
- Tab bar auto-hides on scroll (all 5 tab screens)

## Play Store

- Versión actual: **v2.0.1** (versionCode 3) — listo para subir, AAB pendiente de upload manual
- AAB: `android/app/build/outputs/bundle/freeRelease/app-free-release.aab` (51 MB en v2.0.1)
- All docs in `playstore/` folder
- Privacy policy needs to be hosted publicly (GitHub Pages recommended)

## CI / Quality Gates

`.github/workflows/ci.yml` corre 4 jobs bloqueantes en cada PR/push a main:
1. **test** — `npm test --watchAll=false --ci` (60 tests)
2. **lint** — `npm run lint` (0 errors; 524 inline-styles warnings deferidas)
3. **typecheck** — `npx tsc --noEmit` (0 errors)
4. **data** — `node scripts/check-orphans.js` (0 refs huérfanas en `relatedPathologyIds`)

Antes de pushear, correr local:
```bash
npm test -- --watchAll=false && npx tsc --noEmit && npm run lint && npm run check:orphans
```
