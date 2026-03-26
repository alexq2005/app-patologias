# Plan de Actualizaciones — Patologias de Enfermeria

## Estrategia General

**Objetivo**: Mantener usuarios activos, justificar suscripcion mensual y crecer en reviews.
**Cadencia**: 1 actualizacion mayor por mes + fixes semanales si es necesario.
**Regla de oro**: Cada update debe dar al usuario una razon para abrir la app de nuevo.

---

## Fase 1 — Primeros 3 meses (Lanzamiento + Traccion)

### Mes 1: Lanzamiento (Abril 2026)
**Foco**: Publicar, primeros usuarios, feedback

| Tarea | Detalle |
|-------|---------|
| Publicar en Play Store | AAB + ficha + capturas |
| Crear Instagram/TikTok | @patologiasenfermeria |
| Publicar 10 posts/reels | Tips de enfermeria + "descarga la app" |
| Compartir en 20+ grupos | WhatsApp/Facebook de estudiantes de enfermeria |
| Pedir reviews | A colegas, compañeros, conocidos (meta: 30 reviews) |
| Monitorear crashes | Google Play Console > Android Vitals |
| Fix bugs reportados | Responder reviews negativas con fixes |

### Mes 2: Busqueda por Voz + Visual Upgrade (Mayo 2026)
**Update v1.1 — Busqueda por Voz y Fotos Reales**

| Feature | Detalle |
|---------|---------|
| **Busqueda por voz** | Boton microfono en SearchBar → Google Speech → texto → busqueda. Libreria: `@react-native-voice/voice`. Permiso RECORD_AUDIO. Diferenciador vs competencia |
| **Eliminar TODOS los iconos restantes** | Reemplazar por fotos reales de Unsplash en: Quick Actions (Home), OnboardingScreen (3 slides), PremiumScreen (hero), DashboardScreen, SettingsScreen rows. ~25 fotos nuevas |
| **Descargar 10 condition images faltantes** | inhaler, neuron, liver, stomach, joints, blood_test, microscope, pills, stethoscope, cancer_cells — actualmente remapeadas a fotos genéricas |
| **Rediseño PathologyDetailScreen** | Hero banner con foto + gradiente (estilo HomeScreen), secciones con cards modernas |
| Marketing | Reel: "Busca patologias con tu voz" + demo en video |

### Mes 3: Contenido nuevo + Engagement (Junio 2026)
**Update v1.2 — Procedimientos + Casos Clinicos**

| Feature | Detalle |
|---------|---------|
| **30 procedimientos de enfermeria** | Sonda vesical, via periferica, aspiracion, curacion, etc. Paso a paso con materiales, tecnica, precauciones |
| **Calculadora de dosis** | Goteo (ml/h, gotas/min), diluciones, peso/dosis |
| **20 casos clinicos** | Paciente simulado con datos → diagnostico + plan de cuidados |
| **Caso del dia push** | Notificacion push diaria con caso clinico nuevo |
| **Compartir resultados quiz** | Boton para compartir score en redes/WhatsApp |
| **Rediseño QuizScreen** | Cards con fotos por categoria de pregunta |
| **Rediseño OnboardingScreen** | Fotos reales de enfermeria en vez de iconos |
| Marketing | "Caso clinico del dia" en Instagram Stories + "nueva calculadora de dosis" |

---

## Fase 2 — Meses 4-6 (Crecimiento)

### Mes 4: Comunidad + Gamificacion (Julio 2026)
**Update v1.3 — Modo Estudio + Flashcards**

| Feature | Detalle |
|---------|---------|
| **Flashcards** | Tarjetas de repaso con fotos clinicas, pregunta/respuesta rapida |
| **Modo estudio** | Marcar patologias como "estudiada" / "por repasar" |
| **Recordatorios de estudio** | Notificacion configurable para repasar |
| **Racha de estudio** | "Llevas 7 dias consecutivos estudiando" (gamificacion) |
| **Widget Android** | Patologia del dia en la pantalla de inicio |
| **Rediseño PremiumScreen** | Hero con foto de enfermeros + gradiente, sin icono estrella |
| **Rediseño DashboardScreen** | Cards con fotos, graficos de progreso mejorados |

### Mes 5: Expansion de contenido (Agosto 2026)
**Update v1.4 — Mas patologias y herramientas**

| Feature | Detalle |
|---------|---------|
| **+50 patologias** | Llegar a 200+ (pediatricas, geriatricas, psiquiatricas) |
| **Patologias psiquiatricas** | Nuevo sistema: 12-15 patologias de salud mental con fotos |
| **Patologias pediatricas** | Nuevo sistema: 12-15 patologias infantiles con fotos |
| **Mas escalas** | Escala de Downton, APACHE II, TISS-28, Child-Pugh (con fotos) |
| **Mas protocolos** | Transfusion sanguinea, quimioterapia, aislamiento |
| **0 iconos genericos** | Meta: absolutamente toda la app usa fotos reales, 0 Material Icons como elemento visual principal |

### Mes 6: Monetizacion (Septiembre 2026)
**Update v1.5 — Plan Anual + Referidos**

| Feature | Detalle |
|---------|---------|
| **Plan anual** | $19.99/año (ahorro del 65% vs mensual) |
| **Codigo de referido** | "Invita a un colega y ambos obtienen 1 mes gratis" |
| **Descuento estudiante** | Verificacion con email .edu → 50% descuento |
| **Badges/logros** | "Completaste 50 patologias", "10 quizzes perfectos" con fotos |

---

## Fase 3 — Meses 7-12 (Consolidacion)

### Mes 7-8: Multiplataforma
**Update v2.0 — iOS**

| Feature | Detalle |
|---------|---------|
| **Publicar en App Store** | Mismo codigo (React Native), adaptar para iOS |
| **Sincronizacion** | Backup de favoritos/notas en la nube (opcional) |
| **App Store Optimization** | Capturas, keywords, descripcion optimizada |

### Mes 9-10: Interactividad
**Update v2.1 — Simulador de Paciente**

| Feature | Detalle |
|---------|---------|
| **Paciente virtual** | Escenario con signos vitales → tomar decisiones |
| **Arbol de decisiones** | Cada eleccion cambia el resultado del paciente |
| **Score de desempeño** | Evaluacion de las decisiones tomadas |
| **Casos por dificultad** | Basico, intermedio, avanzado |

### Mes 11-12: Contenido Premium+
**Update v2.2 — Contenido exclusivo**

| Feature | Detalle |
|---------|---------|
| **Videos cortos** | 2-3 min explicando procedimientos clave |
| **Resumenes descargables** | PDF por sistema para imprimir/estudiar offline |
| **Preparacion de examen** | Quiz especifico para examenes de certificacion |
| **Guia de entrevista laboral** | Preguntas frecuentes en entrevistas de enfermeria |

---

## Objetivo: 0 Iconos Genericos — Tracking

Meta: eliminar absolutamente todos los Material Community Icons usados como elemento visual principal
y reemplazarlos por fotos reales. Los iconos se mantienen SOLO como indicadores pequeños (tabs, badges, chevrons).

### Estado actual (v1.0)

| Pantalla | Iconos como visual principal | Fotos reales | Estado |
|----------|------------------------------|-------------|--------|
| HomeScreen | Quick Actions (6 iconos) | Hero card, sistemas grid | ⚠️ Parcial |
| SystemsScreen | — | 12 fotos de sistemas | ✅ Completo |
| ScalesScreen | — | 9 fotos + carrusel hero | ✅ Completo |
| ToolsScreen | — | 10 fotos con gradiente | ✅ Completo |
| SearchScreen | Icono busqueda empty state | — | ⚠️ Parcial |
| PathologyDetailScreen | — | Hero con condition image | ⚠️ 10 remapeadas |
| PathologyCard | — | Thumbnail condition image | ⚠️ 10 remapeadas |
| OnboardingScreen | 3 iconos grandes | — | ❌ Pendiente |
| PremiumScreen | Icono estrella header | — | ❌ Pendiente |
| DashboardScreen | Iconos de stats | — | ❌ Pendiente |
| QuizScreen | Iconos categorias | — | ❌ Pendiente |
| QuizSessionScreen | — | — | ❌ Pendiente |
| SettingsScreen | Iconos en cada row | — | ❌ Pendiente |
| AllFavoritesScreen | Icono empty state | — | ⚠️ Parcial |
| AllNotesScreen | Icono empty state | — | ⚠️ Parcial |

### Plan de eliminacion

| Update | Pantallas a migrar | Fotos necesarias |
|--------|-------------------|-----------------|
| v1.1 (Mes 2) | Quick Actions, PathologyDetail, conditionImages faltantes | ~16 fotos |
| v1.2 (Mes 3) | OnboardingScreen, QuizScreen | ~6 fotos |
| v1.3 (Mes 4) | PremiumScreen, DashboardScreen | ~4 fotos |
| v1.4 (Mes 5) | Empty states, SettingsScreen | ~8 fotos |
| v1.5 (Mes 6) | Revision final — 0 iconos como visual principal | Verificacion |

### Busqueda por Voz — Especificacion tecnica

| Aspecto | Detalle |
|---------|---------|
| **Libreria** | `@react-native-voice/voice` (MIT, gratis) |
| **Motor** | Google Speech Recognition (nativo Android) |
| **Permiso** | `RECORD_AUDIO` en AndroidManifest.xml |
| **Idioma** | `es-AR` (español Argentina) con fallback a `es` |
| **UI** | Boton microfono en SearchBar → animacion de onda → texto |
| **Flujo** | 1. Tap mic → 2. Escucha (max 10s) → 3. Texto → 4. Busqueda normal |
| **Pantallas** | SearchScreen (principal), HomeScreen (search bar del header) |
| **Offline** | No funciona offline (requiere Google Speech) — mostrar mensaje |
| **Fallback** | Si el permiso es denegado, ocultar boton de microfono |

---

## Contenido para Redes Sociales

### Instagram / TikTok — Ideas de contenido

| Tipo | Ejemplo | Frecuencia |
|------|---------|------------|
| **Tip clinico** | "3 signos de ICC que no podes ignorar" | 3/semana |
| **Escala rapida** | "Glasgow en 30 segundos" con la app | 2/semana |
| **Caso clinico** | "Paciente llega con disnea, que haces?" | 1/semana |
| **Farmaco del dia** | "Furosemida: 5 cuidados de enfermeria" | 2/semana |
| **Meme de enfermeria** | Humor relatable para engagement | 1/semana |
| **Dato curioso** | "Sabias que el corazon bombea 7500L/dia?" | 1/semana |
| **Testimonio** | Screenshot de review positiva | 1/semana |
| **Tutorial app** | Como usar el quiz, las escalas, etc. | 1/semana |

### Hashtags recomendados
```
#enfermeria #enfermero #enfermera #estudiatedeenfermeria
#patologias #cuidadosdeenfermeria #NANDA #saludmental
#hospitallife #medicinageneral #enfermeriaprofesional
#escalasclinicas #glasgow #apuntes #estudiar
#appmedica #enfermerialatina #saludpublica
```

### Grupos de Facebook para compartir
- Enfermeria Argentina
- Estudiantes de Enfermeria (pais por pais)
- NANDA NIC NOC en español
- Enfermeria Clinica
- Enfermeros y Enfermeras Unidos
- Profesionales de la Salud

---

## Metricas Clave (KPIs)

| Metrica | Meta Mes 1 | Meta Mes 3 | Meta Mes 6 | Meta Mes 12 |
|---------|-----------|-----------|-----------|------------|
| Descargas totales | 500 | 3,000 | 10,000 | 30,000 |
| Reviews en Play Store | 30 | 100 | 300 | 1,000 |
| Rating promedio | 4.5+ | 4.5+ | 4.3+ | 4.3+ |
| Suscriptores activos | 20 | 150 | 500 | 2,000 |
| Ingreso mensual (USD) | $100 | $750 | $2,500 | $10,000 |
| Retencion dia 7 | 40% | 50% | 55% | 60% |
| DAU (usuarios activos/dia) | 50 | 300 | 1,000 | 3,000 |

---

## Proyeccion de Ingresos

### Escenario conservador (precio $2.99/mes)
| Mes | Descargas acum. | Conversion 3% | Suscriptores | Ingreso/mes |
|-----|----------------|---------------|-------------|------------|
| 1 | 500 | 15 | 15 | $45 |
| 3 | 3,000 | 90 | 70 | $209 |
| 6 | 10,000 | 300 | 200 | $598 |
| 12 | 30,000 | 900 | 500 | $1,495 |

### Escenario optimista (precio $4.99/mes + marketing activo)
| Mes | Descargas acum. | Conversion 5% | Suscriptores | Ingreso/mes |
|-----|----------------|---------------|-------------|------------|
| 1 | 1,000 | 50 | 50 | $250 |
| 3 | 5,000 | 250 | 200 | $998 |
| 6 | 20,000 | 1,000 | 600 | $2,994 |
| 12 | 50,000 | 2,500 | 1,500 | $7,485 |

> **Nota**: Google Play se queda con 15% (primer millon anual) de comision.
> Ingresos netos = Ingreso bruto × 0.85

---

## Prioridades si hay poco tiempo

Si solo podes dedicar pocas horas por semana, enfocate en:

1. **Redes sociales** (30 min/dia) — es lo que mas mueve descargas
2. **Responder reviews** (10 min/dia) — mejora rating y retencion
3. **1 update por mes** — contenido nuevo justifica suscripcion
4. **Fix bugs rapido** — 1 estrella por crash es dificil de recuperar

Lo que NO hacer:
- No gastar plata en ads hasta tener 100+ reviews organicas
- No agregar features complejas antes de tener traccion
- No ignorar feedback negativo — cada review negativa es una oportunidad
