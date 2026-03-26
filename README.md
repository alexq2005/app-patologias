# Patologias de Enfermeria

Aplicacion movil de referencia clinica para profesionales y estudiantes de enfermeria. Contiene 151 patologias organizadas por 12 sistemas corporales, con informacion detallada de diagnosticos NANDA-NIC-NOC, cuidados de enfermeria, farmacologia y protocolos de emergencia.

## Capturas

| Home | Sistemas | Detalle |
|------|----------|---------|
| Gradiente violeta con accesos rapidos | Grid con fotos reales por sistema | 15 secciones clinicas + NANDA |

## Caracteristicas

- **151 patologias** con informacion clinica completa
- **12 sistemas corporales** con imagenes medicas
- **Quiz interactivo** con 8 tipos de preguntas
- **Escalas clinicas** con calculadora interactiva
- **Valores de laboratorio** con rangos e implicaciones
- **Protocolos de emergencia** paso a paso
- **NANDA-NIC-NOC** browser con filtrado
- **Favoritos y notas** personales
- **Modo oscuro** con toggle
- **Funciona offline** — toda la data es local
- **Premium** con trial de 15 dias + suscripcion Google Play

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
│   └── systems/        # 12 fotos por sistema corporal
├── components/         # 9 componentes reutilizables
│   ├── BodySystemCard.tsx
│   ├── CollapsibleSection.tsx
│   ├── ContentContainer.tsx
│   ├── EmergencyBadge.tsx
│   ├── ErrorBoundary.tsx
│   ├── PathologyCard.tsx
│   ├── PremiumGate.tsx
│   ├── SearchBar.tsx
│   └── Skeleton.tsx
├── context/            # 5 Context providers
│   ├── FavoritesContext.tsx
│   ├── NotesContext.tsx
│   ├── PremiumContext.tsx
│   ├── TabBarContext.tsx
│   └── ThemeContext.tsx
├── data/               # JSONs estaticos (~2.5 MB total)
│   ├── pathologies.json      # 151 patologias
│   ├── body_systems.json     # 12 sistemas
│   ├── clinical_scales.json  # Escalas clinicas
│   ├── emergency_protocols.json
│   └── lab_values.json
├── hooks/              # 8 custom hooks
│   ├── useFavorites.ts
│   ├── useNotes.ts
│   ├── useOnboarding.ts
│   ├── usePathologyData.ts
│   ├── usePathologySearch.ts
│   ├── useQuiz.ts
│   ├── useRecentPathologies.ts
│   └── useSearchHistory.ts
├── navigation/
│   └── AppNavigator.tsx      # 5 tabs + 18 stack screens
├── screens/            # 20 pantallas
│   ├── HomeScreen.tsx
│   ├── SystemsScreen.tsx
│   ├── SystemPathologiesScreen.tsx
│   ├── PathologyDetailScreen.tsx
│   ├── SearchScreen.tsx
│   ├── QuizScreen.tsx
│   ├── QuizSessionScreen.tsx
│   ├── ScalesScreen.tsx
│   ├── ScaleDetailScreen.tsx
│   ├── LabValuesScreen.tsx
│   ├── EmergencyProtocolsScreen.tsx
│   ├── ProtocolDetailScreen.tsx
│   ├── NandaScreen.tsx
│   ├── ToolsScreen.tsx
│   ├── DashboardScreen.tsx
│   ├── AllFavoritesScreen.tsx
│   ├── AllNotesScreen.tsx
│   ├── PremiumScreen.tsx
│   ├── SettingsScreen.tsx
│   ├── OnboardingScreen.tsx
│   ├── AboutScreen.tsx
│   ├── PrivacyPolicyScreen.tsx
│   └── TermsScreen.tsx
├── types/
│   └── index.ts
└── utils/              # 11 utilidades
    ├── activation.ts         # Codigo de activacion (SHA-256)
    ├── animations.ts
    ├── colors.ts
    ├── conditionImages.ts
    ├── icons.ts
    ├── neumorphism.ts
    ├── responsive.ts
    ├── search.ts
    ├── spacing.ts
    ├── systemImages.ts
    └── typography.ts
```

## Configuracion Android

- **Namespace**: `com.patologiasenfermeria`
- **Min SDK**: 24 (Android 7.0)
- **Target SDK**: 36 (Android 16)
- **Flavors**: `free` (con applicationIdSuffix `.free`) y `premium`
- **Signing**: Release keystore configurado en `gradle.properties`

## Desarrollo

### Requisitos
- Node.js 18+
- JDK 21 (usar Android Studio JBR — **NO Java 25**)
- Android SDK 36
- Android NDK (via SDK Manager)

### Setup
```bash
npm install
```

### Build (emulador)
```bash
# IMPORTANTE: usar JDK 21, no Java 25
export JAVA_HOME="C:/Program Files/Android/Android Studio/jbr"
export JAVA_TOOL_OPTIONS="-Dfile.encoding=UTF-8"

# Pre-bundle JS (necesario por bug de Metro en Windows)
npx react-native bundle --platform android --dev true \
  --entry-file index.js \
  --bundle-output android/app/src/main/assets/index.android.bundle \
  --assets-dest android/app/src/main/res/

# Build APK
cd android && ./gradlew app:assembleFreeDebug
```

### Instalar en emulador
```bash
adb install -g android/app/build/outputs/apk/free/debug/app-free-debug.apk
adb shell am start -n com.patologiasenfermeria.free/com.patologiasenfermeria.MainActivity
```

### Build release
```bash
cd android && ./gradlew app:assembleFreeRelease
# APK en: android/app/build/outputs/apk/free/release/
```

## Modelo de Monetizacion

### Trial
- 15 dias de prueba gratuita con acceso completo
- Despues del trial, contenido premium bloqueado (3 patologias/sistema gratis)

### Suscripcion
- Mensual via Google Play (`patologias_premium_monthly`)
- Configurar en Google Play Console > Monetizacion > Suscripciones

### Activacion por codigo
- Easter egg: Settings > Version > tap 5 veces > ingresar codigo
- Desbloqueo permanente sin suscripcion

## Contacto

- **Email**: alexq2005@gmail.com

## Licencia

Todos los derechos reservados. Software propietario.
