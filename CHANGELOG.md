# Changelog

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
