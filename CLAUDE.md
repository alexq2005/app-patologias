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

- `src/data/pathologies.json` — 151 patologias (~2.4 MB), main data source
- `src/context/PremiumContext.tsx` — trial (15 days), subscription, code activation
- `src/utils/activation.ts` — SHA-256 code validation
- `src/utils/scaleImages.ts` — maps 14 scale categories to clinical photos
- `src/utils/conditionImages.ts` — maps 151 pathology IDs to 13 condition photos
- `src/utils/systemImages.ts` — maps 12 body systems to photos
- Contact email: alexq2005@gmail.com (in About, Terms, Privacy screens)

## Premium System

- Trial: 15 days, stored in AsyncStorage `@patologias_trial_start`
- Subscription SKU: `patologias_premium_monthly`
- Code activation: Settings > Version row > tap 5 times > enter code
- Free tier: 3 pathologies per system, 5 favorites, 5 notes
- Flavor `free`: has restrictions + trial. Flavor `premium`: all unlocked always
- `IS_PREMIUM_BUILD` = `!(IS_FREE)` — free flavor has IS_FREE=true

## Design Preferences

- Hero-style cards with photo backgrounds + gradient overlays (NOT flat icons)
- Gradient quick action buttons with matching shadow colors
- Primary color: Violeta #6D28D9
- Neumorphic card style for light mode
- Tab bar auto-hides on scroll (all 5 tab screens)

## Play Store

- AAB: `android/app/build/outputs/bundle/freeRelease/app-free-release.aab` (45 MB)
- All docs in `playstore/` folder
- Privacy policy needs to be hosted publicly (GitHub Pages recommended)
