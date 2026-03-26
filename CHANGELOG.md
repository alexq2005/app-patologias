# Changelog

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
