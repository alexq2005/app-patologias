# Patologias de Enfermeria — Project Instructions

## Build Commands

```bash
# OBLIGATORIO: usar JDK 21, NO Java 25
export JAVA_HOME="C:/Program Files/Android/Android Studio/jbr"
export JAVA_TOOL_OPTIONS="-Dfile.encoding=UTF-8"

# Pre-bundle JS (obligatorio antes de build por bug Metro Windows)
npx react-native bundle --platform android --dev true --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/

# Build debug
cd android && ./gradlew app:assembleFreeDebug

# Instalar en emulador
adb install -g android/app/build/outputs/apk/free/debug/app-free-debug.apk
```

## Critical Rules

- **NEVER use Java 25** for Gradle builds — CMake crashes with `restricted method` error
- **ALWAYS pre-bundle JS** before `assembleFreeDebug` — Metro BundleDownloader fails on Windows emulator
- **NEVER run `./gradlew clean`** — it invalidates CMake cache and Java 25 can't rebuild it
- Emulator API 36 has only ~600MB free — always `pm uninstall` + `pm trim-caches` before install
- Emulator takes ~25-40 seconds to initialize Hermes and render first screen

## Project Structure

- `src/data/pathologies.json` — 151 patologias (~2.4 MB), main data source
- `src/context/PremiumContext.tsx` — trial (15 days), subscription, code activation
- `src/utils/activation.ts` — SHA-256 code validation
- `src/screens/HomeScreen.tsx` — hero cards with ImageBackground + gradient overlays
- Contact email: alexq2005@gmail.com (in About, Terms, Privacy screens)

## Premium System

- Trial: 15 days, stored in AsyncStorage `@patologias_trial_start`
- Subscription SKU: `patologias_premium_monthly`
- Code activation: Settings > Version row > tap 5 times > enter code
- Free tier: 3 pathologies per system, 5 favorites, 5 notes

## Design Preferences

- Hero-style cards with photo backgrounds + gradient overlays (NOT flat icons)
- Gradient quick action buttons with matching shadow colors
- Primary color: Violeta #6D28D9
- Neumorphic card style
