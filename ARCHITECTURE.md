# Arquitectura — Patologías de Enfermería

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
                                │   ├── Búsqueda → SearchScreen
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
JSON estáticos (offline)
├── pathologies.json (151 patologías, ~2.4 MB)
├── body_systems.json (12 sistemas)
├── clinical_scales.json
├── emergency_protocols.json
└── lab_values.json
        │
        ▼
   usePathologyData()  ←── hook central, carga todo en memoria
        │
        ├── usePathologySearch() ←── búsqueda full-text con scoring
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
- Primeras 3 patologías de cada sistema: GRATIS
- Resto: requiere Premium (PremiumGate component)

Trial: 15 días desde primera apertura
Suscripción: Google Play monthly (patologias_premium_monthly)
Código: SHA-256 hash validation (easter egg en Settings > Version x5)
```

## Persistencia (AsyncStorage)

| Key | Tipo | Descripción |
|-----|------|-------------|
| `@patologias_trial_start` | timestamp | Inicio del período de prueba |
| `@patologias_subscription` | 'true'/'false' | Estado de suscripción |
| `@patologias_activated` | 'true' | Activación por código |
| `@patologias_favorites` | string[] | IDs de patologías favoritas |
| `@patologias_notes` | Record<string, string> | Notas por patología |
| `@patologias_recent` | string[] | Últimas patologías visitadas |
| `@patologias_search_history` | string[] | Historial de búsquedas |
| `@patologias_quiz_results` | QuizResult[] | Resultados de quiz |
| `@patologias_onboarding_complete` | 'true' | Onboarding completado |
| `@patologias_theme` | 'light'/'dark'/'system' | Preferencia de tema |

## Diseño Visual

- **Color primario**: Violeta `#6D28D9` (diferencia de GuiaFarmaco que usa azul)
- **Estilo**: Neumorphism con sombras suaves
- **Imágenes**: Fotos reales de Unsplash (royalty-free)
- **Tipografía**: System fonts con responsive scaling
- **Animaciones**: Animated API (fade in, slide, spring)
- **Dark mode**: Completo con toggle o automático por sistema

## Decisiones de Arquitectura

| Decisión | Razón |
|----------|-------|
| JSON estático vs API | Funciona offline en hospitales sin WiFi |
| AsyncStorage vs SQLite | Datos simples (favoritos, notas) no justifican SQL |
| SHA-256 puro en JS | Sin dependencias nativas para validación de código |
| Pre-bundle JS en assets | Bug de Metro BundleDownloader en Windows con RN 0.84 |
| JDK 21 vs Java 25 | Java 25 rompe CMake del Android Gradle Plugin |
| Neumorphism | Diferencia visual de apps médicas genéricas |
