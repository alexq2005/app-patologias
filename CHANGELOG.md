# Changelog

## [1.0.0] — 2026-03-26

### Added
- 151 patologias clinicas organizadas en 12 sistemas corporales
- Informacion NANDA-NIC-NOC para cada patologia
- 20 pantallas completas con diseño hero (fotos + gradientes)
- Quiz interactivo con 8 tipos de preguntas y resultados persistentes
- 17 escalas clinicas con calculadora interactiva y fotos por categoria
- Valores de laboratorio con rangos normales e implicaciones de enfermeria
- Protocolos de emergencia paso a paso
- Sistema de favoritos y notas personales
- Busqueda full-text con scoring y historial
- Onboarding de 3 slides para primera vez
- Modo oscuro (light/dark/system)
- 34 fotos medicas reales de Unsplash (12 sistemas + 13 condiciones + 9 escalas)
- HomeScreen con hero cards, gradientes y search integrado
- SystemsScreen con grid de fotos por sistema corporal
- ScalesScreen con carrusel "Mas utilizadas" y cards con fotos clinicas
- ToolsScreen con grid de fotos y gradientes por herramienta
- Tab bar animado que se oculta al scrollear en todas las pantallas

### Premium System
- Trial de 15 dias con acceso completo
- Banner "Periodo de prueba" visible durante el trial
- Bloqueo de contenido premium al expirar trial
- Suscripcion mensual via Google Play (`patologias_premium_monthly`)
- Activacion por codigo (Settings > Version x5 > ingreso de codigo)
- PremiumGate con mensaje de expiracion y boton de suscripcion
- Flavor `free` (con restricciones) y `premium` (todo desbloqueado)

### Technical
- React Native 0.84.1 + TypeScript 5.8
- New Architecture (Fabric + TurboModules)
- Android SDK 24-36, Gradle 9
- Pre-bundled JS en assets (workaround Metro bug Windows)
- SHA-256 puro en JS para validacion de codigos de activacion
- JDK 21 (Android Studio JBR) requerido para builds

### Play Store
- AAB generado (45 MB)
- Ficha completa (titulo, descripcion corta/completa, tags)
- Politica de privacidad HTML
- Clasificacion de contenido IARC preparada
- Icono 512x512 y feature graphic 1024x500 (SVG)
- Instrucciones de publicacion paso a paso
- Plan de actualizaciones de 12 meses
