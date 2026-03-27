# Plan de Actualizaciones — Patologías de Enfermería

## Estrategia General

**Objetivo**: Mantener usuarios activos, justificar suscripción mensual y crecer en reviews.
**Cadencia**: 1 actualización mayor por mes + fixes semanales si es necesario.
**Regla de oro**: Cada update debe dar al usuario una razón para abrir la app de nuevo.

---

## Fase 1 — Primeros 3 meses (Lanzamiento + Tracción)

### Mes 1: Lanzamiento (Abril 2026)
**Foco**: Publicar, primeros usuarios, feedback

| Tarea | Detalle |
|-------|---------|
| Publicar en Play Store | AAB + ficha + capturas |
| Crear Instagram/TikTok | @patologiasenfermeria |
| Publicar 10 posts/reels | Tips de enfermería + "descarga la app" |
| Compartir en 20+ grupos | WhatsApp/Facebook de estudiantes de enfermería |
| Pedir reviews | A colegas, compañeros, conocidos (meta: 30 reviews) |
| Monitorear crashes | Google Play Console > Android Vitals |
| Fix bugs reportados | Responder reviews negativas con fixes |

### Mes 2: Búsqueda por Voz + Visual Upgrade (Mayo 2026)
**Update v1.1 — Búsqueda por Voz y Fotos Reales**

| Feature | Detalle |
|---------|---------|
| **Búsqueda por voz** | Botón micrófono en SearchBar → Google Speech → texto → búsqueda. Librería: `@react-native-voice/voice`. Permiso RECORD_AUDIO. Diferenciador vs competencia |
| **Eliminar TODOS los íconos restantes** | Reemplazar por fotos reales de Unsplash en: Quick Actions (Home), OnboardingScreen (3 slides), PremiumScreen (hero), DashboardScreen, SettingsScreen rows. ~25 fotos nuevas |
| **Descargar 10 condition images faltantes** | inhaler, neuron, liver, stomach, joints, blood_test, microscope, pills, stethoscope, cancer_cells — actualmente remapeadas a fotos genéricas |
| **Rediseño PathologyDetailScreen** | Hero banner con foto + gradiente (estilo HomeScreen), secciones con cards modernas |
| Marketing | Reel: "Busca patologías con tu voz" + demo en video |

### Mes 3: Contenido nuevo + Engagement (Junio 2026)
**Update v1.2 — Procedimientos + Casos Clínicos**

| Feature | Detalle |
|---------|---------|
| **30 procedimientos de enfermería** | Sonda vesical, vía periférica, aspiración, curación, etc. Paso a paso con materiales, técnica, precauciones |
| **Calculadora de dosis** | Goteo (ml/h, gotas/min), diluciones, peso/dosis |
| **20 casos clínicos** | Paciente simulado con datos → diagnóstico + plan de cuidados |
| **Caso del día push** | Notificación push diaria con caso clínico nuevo |
| **Compartir resultados quiz** | Botón para compartir score en redes/WhatsApp |
| **Rediseño QuizScreen** | Cards con fotos por categoría de pregunta |
| **Rediseño OnboardingScreen** | Fotos reales de enfermería en vez de íconos |
| Marketing | "Caso clínico del día" en Instagram Stories + "nueva calculadora de dosis" |

---

## Fase 2 — Meses 4-6 (Crecimiento)

### Mes 4: Comunidad + Gamificación (Julio 2026)
**Update v1.3 — Modo Estudio + Flashcards**

| Feature | Detalle |
|---------|---------|
| **Flashcards** | Tarjetas de repaso con fotos clínicas, pregunta/respuesta rápida |
| **Modo estudio** | Marcar patologías como "estudiada" / "por repasar" |
| **Recordatorios de estudio** | Notificación configurable para repasar |
| **Racha de estudio** | "Llevas 7 días consecutivos estudiando" (gamificación) |
| **Widget Android** | Patología del día en la pantalla de inicio |
| **Rediseño PremiumScreen** | Hero con foto de enfermeros + gradiente, sin ícono estrella |
| **Rediseño DashboardScreen** | Cards con fotos, gráficos de progreso mejorados |

### Mes 5: Expansión de contenido (Agosto 2026)
**Update v1.4 — Más patologías y herramientas**

| Feature | Detalle |
|---------|---------|
| **+50 patologías** | Llegar a 200+ (pediátricas, geriátricas, psiquiátricas) |
| **Patologías psiquiátricas** | Nuevo sistema: 12-15 patologías de salud mental con fotos |
| **Patologías pediátricas** | Nuevo sistema: 12-15 patologías infantiles con fotos |
| **Más escalas** | Escala de Downton, APACHE II, TISS-28, Child-Pugh (con fotos) |
| **Más protocolos** | Transfusión sanguínea, quimioterapia, aislamiento |
| **0 íconos genéricos** | Meta: absolutamente toda la app usa fotos reales, 0 Material Icons como elemento visual principal |

### Mes 6: Monetización (Septiembre 2026)
**Update v1.5 — Plan Anual + Referidos**

| Feature | Detalle |
|---------|---------|
| **Plan anual** | $19.99/año (ahorro del 65% vs mensual) |
| **Código de referido** | "Invita a un colega y ambos obtienen 1 mes gratis" |
| **Descuento estudiante** | Verificación con email .edu → 50% descuento |
| **Badges/logros** | "Completaste 50 patologías", "10 quizzes perfectos" con fotos |

---

## Fase 3 — Meses 7-12 (Consolidación)

### Mes 7-8: Multiplataforma
**Update v2.0 — iOS**

| Feature | Detalle |
|---------|---------|
| **Publicar en App Store** | Mismo código (React Native), adaptar para iOS |
| **Sincronización** | Backup de favoritos/notas en la nube (opcional) |
| **App Store Optimization** | Capturas, keywords, descripción optimizada |

### Mes 9-10: Interactividad
**Update v2.1 — Simulador de Paciente**

| Feature | Detalle |
|---------|---------|
| **Paciente virtual** | Escenario con signos vitales → tomar decisiones |
| **Árbol de decisiones** | Cada elección cambia el resultado del paciente |
| **Score de desempeño** | Evaluación de las decisiones tomadas |
| **Casos por dificultad** | Básico, intermedio, avanzado |

### Mes 11-12: Contenido Premium+
**Update v2.2 — Videos educativos + Contenido exclusivo**

| Feature | Detalle |
|---------|---------|
| **Videos educativos por patología** | Enlace a videos curados de YouTube (Osmosis, Ninja Nerd, Enfermería Evidente, etc.) para reconocer signos y síntomas. Campo `videoUrl` ya existe en el tipo Pathology. Reproducción in-app con `react-native-youtube-iframe`. Empezar con ~30 videos (cardiovascular, respiratorio, neurológico) e ir expandiendo. **Solo enlazar, no descargar** — legal vía YouTube embed API |
| **Resúmenes descargables** | PDF por sistema para imprimir/estudiar offline |
| **Preparación de examen** | Quiz específico para exámenes de certificación |
| **Guía de entrevista laboral** | Preguntas frecuentes en entrevistas de enfermería |

---

## Objetivo: 0 Íconos Genéricos — Tracking

Meta: eliminar absolutamente todos los Material Community Icons usados como elemento visual principal
y reemplazarlos por fotos reales. Los íconos se mantienen SOLO como indicadores pequeños (tabs, badges, chevrons).

### Estado actual (v1.1-dev, actualizado 2026-03-27)

| Pantalla | Íconos como visual principal | Fotos reales | Estado |
|----------|------------------------------|-------------|--------|
| HomeScreen | — | Quick Actions con fotos, hero card, sistemas grid | ✅ Completo |
| SystemsScreen | — | 12 fotos de sistemas | ✅ Completo |
| ScalesScreen | — | 9 fotos + carrusel hero | ✅ Completo |
| ToolsScreen | — | 10 fotos con gradiente | ✅ Completo |
| SearchScreen | Ícono búsqueda empty state | — | ⚠️ Parcial |
| PathologyDetailScreen | — | Hero con condition image | ⚠️ 10 remapeadas |
| PathologyCard | — | Thumbnail condition image | ⚠️ 10 remapeadas |
| OnboardingScreen | — | 3 slides full-screen con fotos clínicas | ✅ Completo |
| PremiumScreen | Ícono estrella header | — | ❌ Pendiente |
| DashboardScreen | Íconos de stats | — | ❌ Pendiente |
| QuizScreen | — | Chips con thumbnails de sistemas | ✅ Completo |
| QuizSessionScreen | — | — | ⚠️ Parcial |
| DifferentialScreen | — | Usa colores de sistema + badges | ✅ Completo (nuevo) |
| SettingsScreen | Íconos en cada row | — | ❌ Pendiente |
| AllFavoritesScreen | Ícono empty state | — | ⚠️ Parcial |
| AllNotesScreen | Ícono empty state | — | ⚠️ Parcial |

### Plan de eliminación

| Update | Pantallas a migrar | Fotos necesarias |
|--------|-------------------|-----------------|
| v1.1 (Mes 2) | Quick Actions, PathologyDetail, conditionImages faltantes | ~16 fotos |
| v1.2 (Mes 3) | OnboardingScreen, QuizScreen | ~6 fotos |
| v1.3 (Mes 4) | PremiumScreen, DashboardScreen | ~4 fotos |
| v1.4 (Mes 5) | Empty states, SettingsScreen | ~8 fotos |
| v1.5 (Mes 6) | Revisión final — 0 íconos como visual principal | Verificación |

### Búsqueda por Voz — Especificación técnica

| Aspecto | Detalle |
|---------|---------|
| **Librería** | `@react-native-voice/voice` (MIT, gratis) |
| **Motor** | Google Speech Recognition (nativo Android) |
| **Permiso** | `RECORD_AUDIO` en AndroidManifest.xml |
| **Idioma** | `es-AR` (español Argentina) con fallback a `es` |
| **UI** | Botón micrófono en SearchBar → animación de onda → texto |
| **Flujo** | 1. Tap mic → 2. Escucha (max 10s) → 3. Texto → 4. Búsqueda normal |
| **Pantallas** | SearchScreen (principal), HomeScreen (search bar del header) |
| **Offline** | No funciona offline (requiere Google Speech) — mostrar mensaje |
| **Fallback** | Si el permiso es denegado, ocultar botón de micrófono |

---

## Contenido para Redes Sociales

### Instagram / TikTok — Ideas de contenido

| Tipo | Ejemplo | Frecuencia |
|------|---------|------------|
| **Tip clínico** | "3 signos de ICC que no podés ignorar" | 3/semana |
| **Escala rápida** | "Glasgow en 30 segundos" con la app | 2/semana |
| **Caso clínico** | "Paciente llega con disnea, ¿qué hacés?" | 1/semana |
| **Fármaco del día** | "Furosemida: 5 cuidados de enfermería" | 2/semana |
| **Meme de enfermería** | Humor relatable para engagement | 1/semana |
| **Dato curioso** | "¿Sabías que el corazón bombea 7500L/día?" | 1/semana |
| **Testimonio** | Screenshot de review positiva | 1/semana |
| **Tutorial app** | Cómo usar el quiz, las escalas, etc. | 1/semana |

### Hashtags recomendados
```
#enfermería #enfermero #enfermera #estudiantedeenfermería
#patologías #cuidadosdeenfermería #NANDA #saludmental
#hospitallife #medicinageneral #enfermeriaprofesional
#escalasclínicas #glasgow #apuntes #estudiar
#appmédica #enfermeríalatina #saludpública
```

### Grupos de Facebook para compartir
- Enfermería Argentina
- Estudiantes de Enfermería (país por país)
- NANDA NIC NOC en español
- Enfermería Clínica
- Enfermeros y Enfermeras Unidos
- Profesionales de la Salud

---

## Métricas Clave (KPIs)

| Métrica | Meta Mes 1 | Meta Mes 3 | Meta Mes 6 | Meta Mes 12 |
|---------|-----------|-----------|-----------|------------|
| Descargas totales | 500 | 3,000 | 10,000 | 30,000 |
| Reviews en Play Store | 30 | 100 | 300 | 1,000 |
| Rating promedio | 4.5+ | 4.5+ | 4.3+ | 4.3+ |
| Suscriptores activos | 20 | 150 | 500 | 2,000 |
| Ingreso mensual (USD) | $100 | $750 | $2,500 | $10,000 |
| Retención día 7 | 40% | 50% | 55% | 60% |
| DAU (usuarios activos/día) | 50 | 300 | 1,000 | 3,000 |

---

## Proyección de Ingresos

### Escenario conservador (precio $2.99/mes)
| Mes | Descargas acum. | Conversión 3% | Suscriptores | Ingreso/mes |
|-----|----------------|---------------|-------------|------------|
| 1 | 500 | 15 | 15 | $45 |
| 3 | 3,000 | 90 | 70 | $209 |
| 6 | 10,000 | 300 | 200 | $598 |
| 12 | 30,000 | 900 | 500 | $1,495 |

### Escenario optimista (precio $4.99/mes + marketing activo)
| Mes | Descargas acum. | Conversión 5% | Suscriptores | Ingreso/mes |
|-----|----------------|---------------|-------------|------------|
| 1 | 1,000 | 50 | 50 | $250 |
| 3 | 5,000 | 250 | 200 | $998 |
| 6 | 20,000 | 1,000 | 600 | $2,994 |
| 12 | 50,000 | 2,500 | 1,500 | $7,485 |

> **Nota**: Google Play se queda con 15% (primer millón anual) de comisión.
> Ingresos netos = Ingreso bruto × 0.85

---

## Prioridades si hay poco tiempo

Si solo podés dedicar pocas horas por semana, enfocate en:

1. **Redes sociales** (30 min/día) — es lo que más mueve descargas
2. **Responder reviews** (10 min/día) — mejora rating y retención
3. **1 update por mes** — contenido nuevo justifica suscripción
4. **Fix bugs rápido** — 1 estrella por crash es difícil de recuperar

Lo que NO hacer:
- No gastar plata en ads hasta tener 100+ reviews orgánicas
- No agregar features complejas antes de tener tracción
- No ignorar feedback negativo — cada review negativa es una oportunidad
