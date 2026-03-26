# Patologias de Enfermeria

Aplicacion movil de referencia clinica para profesionales y estudiantes de enfermeria. Contiene 151 patologias organizadas por 12 sistemas corporales, con informacion detallada de diagnosticos NANDA-NIC-NOC, cuidados de enfermeria, farmacologia y protocolos de emergencia.

## Caracteristicas

- **151 patologias** con informacion clinica completa
- **12 sistemas corporales** con fotos medicas reales
- **17 escalas clinicas** interactivas con calculadora (Glasgow, NEWS2, Norton, etc.)
- **Quiz interactivo** con 8 tipos de preguntas
- **Valores de laboratorio** con rangos e implicaciones de enfermeria
- **Protocolos de emergencia** paso a paso
- **NANDA-NIC-NOC** browser con filtrado
- **Favoritos y notas** personales ilimitadas
- **Modo oscuro/claro** con toggle o automatico
- **Funciona offline** — toda la data es local, ideal para hospitales
- **Freemium**: 15 dias de prueba + suscripcion Google Play

## Stack Tecnologico

| Tecnologia | Version | Uso |
|-----------|---------|-----|
| React Native | 0.84.1 | Framework mobile |
| TypeScript | 5.8 | Tipado estatico |
| React Navigation | 7.x | Navegacion (Stack + Tabs) |
| AsyncStorage | 2.x | Persistencia local |
| LinearGradient | - | Gradientes UI |
| Vector Icons | - | Material Community Icons |
| Safe Area Context | - | Safe areas iOS/Android |

## Estructura del Proyecto

```
src/
├── assets/images/
│   ├── conditions/     # 13 fotos clinicas (ECG, rayos X, etc.)
│   ├── systems/        # 12 fotos por sistema corporal
│   └── scales/         # 9 fotos para escalas clinicas
├── components/         # 9 componentes reutilizables
├── context/            # 5 Context providers (Theme, Premium, Favorites, Notes, TabBar)
├── data/               # JSONs estaticos (~2.5 MB total)
│   ├── pathologies.json      # 151 patologias
│   ├── body_systems.json     # 12 sistemas
│   ├── clinical_scales.json  # 17 escalas
│   ├── emergency_protocols.json
│   └── lab_values.json
├── hooks/              # 8 custom hooks
├── navigation/
│   └── AppNavigator.tsx      # 5 tabs + 18 stack screens
├── screens/            # 20 pantallas
├── types/
└── utils/              # 12 utilidades
```

## Configuracion Android

- **Namespace**: `com.patologiasenfermeria`
- **Min SDK**: 24 (Android 7.0)
- **Target SDK**: 36 (Android 16)
- **Flavors**: `free` (trial + suscripcion) y `premium` (todo desbloqueado)
- **Signing**: Release keystore configurado en `gradle.properties`

## Desarrollo

### Requisitos
- Node.js 18+
- **JDK 21** (Android Studio JBR) — NO Java 25
- Android SDK 36 + NDK

### Setup
```bash
npm install
```

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
| Free Release AAB | 45 MB | `android/app/build/outputs/bundle/freeRelease/` |

## Modelo de Monetizacion

| Concepto | Detalle |
|----------|---------|
| Trial | 15 dias de prueba con acceso completo |
| Free despues del trial | 3 patologias/sistema (33 total), 5 favoritos, 5 notas |
| Suscripcion | Mensual via Google Play (`patologias_premium_monthly`) |
| Activacion por codigo | Easter egg: Settings > Version > tap 5 veces |

## Documentos para Play Store

Todos los documentos estan en `playstore/`:
- `ficha_play_store.md` — Textos de la ficha
- `privacy_policy.html` — Politica de privacidad (subir a hosting)
- `clasificacion_contenido_IARC.md` — Respuestas para clasificacion
- `icon_512x512.svg` — Icono (exportar a PNG)
- `feature_graphic_1024x500.svg` — Grafico promocional (exportar a PNG)
- `INSTRUCCIONES_PUBLICACION.md` — Guia paso a paso
- `PLAN_ACTUALIZACIONES.md` — Roadmap de 12 meses

## Contacto

- **Email**: alexq2005@gmail.com

## Licencia

Todos los derechos reservados. Software propietario.
