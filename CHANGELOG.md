# Changelog

## [1.0.0] — 2026-03-26

### Added
- 151 patologias clinicas organizadas en 12 sistemas corporales
- Informacion NANDA-NIC-NOC para cada patologia
- 20 pantallas: Home, Sistemas, Detalle, Busqueda, Quiz, Escalas, Lab, Protocolos, NANDA, Settings, etc.
- Quiz interactivo con 8 tipos de preguntas y resultados persistentes
- Escalas clinicas con calculadora interactiva (Glasgow, Norton, APGAR, etc.)
- Valores de laboratorio con rangos normales e implicaciones de enfermeria
- Protocolos de emergencia paso a paso
- Sistema de favoritos y notas personales
- Busqueda full-text con scoring y historial
- Onboarding de 3 slides para primera vez
- Modo oscuro (light/dark/system)
- Fotos medicas reales de Unsplash (12 sistemas + 13 condiciones)
- Premium gating: 3 patologias gratis por sistema, resto premium
- Trial de 15 dias con bloqueo al expirar
- Suscripcion mensual via Google Play
- Activacion por codigo (easter egg en Settings > Version x5)
- Funcionalidad offline completa (sin necesidad de internet)
- Diseño neumorphic con gradientes violeta

### Technical
- React Native 0.84.1 + TypeScript 5.8
- New Architecture (Fabric + TurboModules)
- Android SDK 24-36, Gradle 9
- Pre-bundled JS en assets (workaround Metro bug Windows)
- SHA-256 puro en JS para validacion de codigos
