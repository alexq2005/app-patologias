# Patologías de Enfermería

Aplicación móvil de referencia clínica para profesionales y estudiantes de enfermería. Contiene 151 patologías organizadas por 12 sistemas corporales, con información detallada de diagnósticos NANDA-NIC-NOC, cuidados de enfermería, farmacología y protocolos de emergencia.

**Versión actual**: v1.0.0 (versionCode 4) — primer lanzamiento público del ecosistema. Ver [ROADMAP.md](ROADMAP.md)

## Características

- **151 patologías** con información clínica completa
- **12 sistemas corporales** con fotos médicas reales
- **17 escalas clínicas** interactivas con calculadora (Glasgow, NEWS2, Norton, etc.)
- **Quiz educativo** con 8 tipos de preguntas + revisión de errores con explicaciones enriquecidas
- **Diagnóstico diferencial** interactivo por síntomas con ranking de coincidencia
- **Valores de laboratorio** con rangos e implicaciones de enfermería
- **Protocolos de emergencia** paso a paso
- **NANDA-NIC-NOC** browser con filtrado
- **Favoritos y notas** personales ilimitadas
- **Búsqueda tolerante** a tildes y variantes ortográficas (`hipercalemia` ≡ `hiperkalemia`)
- **Modo oscuro/claro** con toggle o automático
- **Funciona offline** — toda la data es local, ideal para hospitales
- **Mi Suite** — hub que conecta con las otras 2 apps del ecosistema (Curso de Enfermería + Guía Farmacológica) vía deep links
- **OTA content updates** (infraestructura lista, off por default) — actualizar `pathologies.json` sin republicar el AAB. Indicador de versión + botón "Buscar actualización ahora" en Settings
- **Videos educativos** por patología (campo `videoUrl` reservado, feature flag `videoLinks`)
- **Freemium**: 15 días de prueba + suscripción Google Play
- **🔥 Arquitectura Optimizada (v2.0)**: SQLite vía C++ JSI para queries síncronas, FlashList para 60 FPS, EncryptedStorage para tokens premium en Android Keystore

## Stack Tecnológico

| Tecnología | Versión | Uso |
|-----------|---------|-----|
| React Native | 0.84.1 | Framework mobile |
| TypeScript | 5.8 | Tipado estático |
| React Navigation | 7.x | Navegación (Stack + Tabs) |
| @op-engineering/op-sqlite | 15.x | Bridge C++ SQLite ultrarrápido (queries síncronas vía JSI) |
| react-native-encrypted-storage | 4.x | Tokens premium/activation/trial en Android Keystore |
| @react-native-async-storage/async-storage | 2.x | Datos no sensibles (favoritos, notas, historia) |
| @shopify/flash-list | 2.x | Listas masivas con recycling y 60 FPS |
| react-native-linear-gradient | 2.x | Gradientes UI |
| react-native-vector-icons | 10.x | MaterialCommunityIcons (tabs, badges) |
| Jest | 29.x | Testing unitario (60 tests) |

## Estructura del Proyecto

```
src/
├── assets/images/
│   ├── conditions/     # 13 fotos clínicas (ECG, rayos X, etc.)
│   ├── systems/        # 12 fotos por sistema corporal
│   └── scales/         # 9 fotos para escalas clínicas
├── components/         # 9 componentes reutilizables
├── config/             # appInfo (APP_VERSION), features (flags), sentry (scaffold)
├── context/            # 5 Context providers (Theme, Premium, Favorites, Notes, TabBar)
├── data/               # JSONs estáticos + db.ts (SQLite seed/repopulate)
│   ├── pathologies.json      # 151 patologías (~2.4 MB)
│   ├── body_systems.json     # 12 sistemas
│   ├── clinical_scales.json  # 17 escalas
│   ├── emergency_protocols.json
│   ├── lab_values.json
│   └── db.ts                 # SQLite layer + getCurrentDataVersion + repopulateFromJson
├── hooks/              # 10 custom hooks (incluye useDataInfo, useDifferentialDiagnosis)
├── navigation/
│   └── AppNavigator.tsx      # 5 tabs + 25 stack screens
├── screens/            # 27 pantallas (incluye MiSuite, DifferentialScreen)
├── services/           # contentSync (OTA), miSuite (ecosystem registry)
├── types/
└── utils/              # 12 utilidades + search (normalizer k↔c)

scripts/
├── check-orphans.js    # Audit de relatedPathologyIds — corre en CI
├── enrich_nanda.js, fix_tildes.js, add_patho_*.py
__tests__/              # 60 tests (App, useQuiz, contentSync, useDataInfo, miSuite, search)
.github/workflows/ci.yml  # 4 jobs: test, lint, typecheck, data integrity
```

## Configuración Android

- **Namespace**: `com.patologiasenfermeria`
- **Min SDK**: 24 (Android 7.0)
- **Target SDK**: 36 (Android 16)
- **Flavors**: `free` (trial + suscripción) y `premium` (todo desbloqueado)
- **Signing**: Release keystore configurado en `gradle.properties`

## Desarrollo

### Requisitos
- Node.js 22+ (`engines.node` en `package.json`)
- **JDK 21** (Android Studio JBR) — NO Java 25 (rompe CMake del Android Gradle Plugin)
- Android SDK 36 + NDK

### Setup
```bash
npm install
```

### Verificación rápida pre-PR
```bash
npm test -- --watchAll=false   # 60 tests
npx tsc --noEmit               # 0 errores
npm run lint                   # 0 errores (524 warnings inline-styles diferidas)
npm run check:orphans          # 0 refs huérfanas en relatedPathologyIds
```

Estos 4 checks corren también en CI (`.github/workflows/ci.yml`) — los 4 jobs son bloqueantes.

### Build (emulador)
```bash
export JAVA_HOME="C:/Program Files/Android/Android Studio/jbr"
export JAVA_TOOL_OPTIONS="-Dfile.encoding=UTF-8"

# Pre-bundle JS (necesario por bug de Metro en Windows)
npx react-native bundle --platform android --dev true \
  --entry-file index.js \
  --bundle-output android/app/src/main/assets/index.android.bundle \
  --assets-dest android/app/src/main/res/

cd android && ./gradlew app:assembleFreeDebug
```

### Build release
```bash
# Bundle release (--dev false)
npx react-native bundle --platform android --dev false \
  --entry-file index.js \
  --bundle-output android/app/src/main/assets/index.android.bundle \
  --assets-dest android/app/src/main/res/

# APKs
cd android && ./gradlew app:assembleFreeRelease app:assemblePremiumRelease

# AAB para Play Store
cd android && ./gradlew app:bundleFreeRelease
```

### Builds generados
| Tipo | Tamaño | Ruta |
|------|--------|------|
| Free Debug APK | ~64 MB | `android/app/build/outputs/apk/free/debug/` |
| Free Release APK | 64 MB | `android/app/build/outputs/apk/free/release/` |
| Premium Release APK | 64 MB | `android/app/build/outputs/apk/premium/release/` |
| Free Release AAB | **51 MB** | `android/app/build/outputs/bundle/freeRelease/` (v2.0.1) |

## Modelo de Monetización

| Concepto | Detalle |
|----------|---------|
| Trial | 15 días de prueba con acceso completo |
| Free después del trial | 3 patologías/sistema (33 total), 5 favoritos, 5 notas |
| Suscripción | Mensual vía Google Play (`patologias_premium_monthly`) |
| Activación por código | Easter egg: Settings > Version > tap 5 veces |

## Documentos para Play Store

Todos los documentos están en `playstore/`:
- `ficha_play_store.md` — Textos de la ficha
- `privacy_policy.html` — Política de privacidad (subir a hosting)
- `clasificacion_contenido_IARC.md` — Respuestas para clasificación
- `icon_512x512.svg` — Ícono (exportar a PNG)
- `feature_graphic_1024x500.svg` — Gráfico promocional (exportar a PNG)
- `INSTRUCCIONES_PUBLICACION.md` — Guía paso a paso
- `PLAN_ACTUALIZACIONES.md` — Roadmap de 12 meses

## Contacto

- **Email**: alexq2005@gmail.com

## Licencia

Todos los derechos reservados. Software propietario.
