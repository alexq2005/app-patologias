# Arquitectura — Patologias de Enfermeria

## Diagrama General

```
App.tsx
└── ErrorBoundary
    └── SafeAreaProvider
        └── ThemeProvider (light/dark/system)
            └── PremiumProvider (trial + subscription + code)
                └── FavoritesProvider (AsyncStorage)
                    └── NotesProvider (AsyncStorage)
                        └── TabBarProvider (animated hide on scroll)
                            └── AppNavigator
                                ├── Onboarding (first run)
                                ├── MainTabs (5 tabs)
                                │   ├── Inicio → HomeScreen
                                │   ├── Sistemas → SystemsScreen
                                │   ├── Busqueda → SearchScreen
                                │   ├── Escalas → ScalesScreen
                                │   └── Herramientas → ToolsScreen
                                └── Stack Screens (18)
                                    ├── SystemPathologies
                                    ├── PathologyDetail
                                    ├── ScaleDetail
                                    ├── QuizScreen / QuizSession
                                    ├── LabValues
                                    ├── EmergencyProtocols / ProtocolDetail
                                    ├── NandaScreen
                                    ├── Dashboard
                                    ├── AllFavorites / AllNotes
                                    ├── PremiumScreen
                                    ├── SettingsScreen
                                    ├── AboutScreen
                                    ├── PrivacyPolicy / Terms
                                    └── ...
```

## Data Flow

```
JSON estaticos (offline)
├── pathologies.json (151 patologias, ~2.4 MB)
├── body_systems.json (12 sistemas)
├── clinical_scales.json
├── emergency_protocols.json
└── lab_values.json
        │
        ▼
   usePathologyData()  ←── hook central, carga todo en memoria
        │
        ├── usePathologySearch() ←── busqueda full-text con scoring
        ├── useRecentPathologies() ←── AsyncStorage @patologias_recent
        ├── useFavorites() ←── AsyncStorage @patologias_favorites
        ├── useNotes() ←── AsyncStorage @patologias_notes
        └── useQuiz() ←── genera preguntas aleatorias de pathologies.json
```

## Premium Gating

```
isPremium = IS_PREMIUM_BUILD || isCodeActivated || isSubscribed || isTrialActive

IS_PREMIUM_BUILD = !(BuildConfigModule.IS_FREE)
  - Flavor free:    IS_FREE=true  → IS_PREMIUM_BUILD=false → trial/subscription required
  - Flavor premium: IS_FREE=false → IS_PREMIUM_BUILD=true  → always unlocked

Gating por sistema:
- Primeras 3 patologias de cada sistema: GRATIS
- Resto: requiere Premium (PremiumGate component)

Trial: 15 dias desde primera apertura
Suscripcion: Google Play monthly (patologias_premium_monthly)
Codigo: SHA-256 hash validation (easter egg en Settings > Version x5)
```

## Persistencia (AsyncStorage)

| Key | Tipo | Descripcion |
|-----|------|-------------|
| `@patologias_trial_start` | timestamp | Inicio del periodo de prueba |
| `@patologias_subscription` | 'true'/'false' | Estado de suscripcion |
| `@patologias_activated` | 'true' | Activacion por codigo |
| `@patologias_favorites` | string[] | IDs de patologias favoritas |
| `@patologias_notes` | Record<string, string> | Notas por patologia |
| `@patologias_recent` | string[] | Ultimas patologias visitadas |
| `@patologias_search_history` | string[] | Historial de busquedas |
| `@patologias_quiz_results` | QuizResult[] | Resultados de quiz |
| `@patologias_onboarding_complete` | 'true' | Onboarding completado |
| `@patologias_theme` | 'light'/'dark'/'system' | Preferencia de tema |

## Diseno Visual

- **Color primario**: Violeta `#6D28D9` (diferencia de GuiaFarmaco que usa azul)
- **Estilo**: Neumorphism con sombras suaves
- **Imagenes**: Fotos reales de Unsplash (royalty-free)
- **Tipografia**: System fonts con responsive scaling
- **Animaciones**: Animated API (fade in, slide, spring)
- **Dark mode**: Completo con toggle o automatico por sistema

## Decisiones de Arquitectura

| Decision | Razon |
|----------|-------|
| JSON estatico vs API | Funciona offline en hospitales sin WiFi |
| AsyncStorage vs SQLite | Datos simples (favoritos, notas) no justifican SQL |
| SHA-256 puro en JS | Sin dependencias nativas para validacion de codigo |
| Pre-bundle JS en assets | Bug de Metro BundleDownloader en Windows con RN 0.84 |
| JDK 21 vs Java 25 | Java 25 rompe CMake del Android Gradle Plugin |
| Neumorphism | Diferencia visual de apps medicas genericas |
