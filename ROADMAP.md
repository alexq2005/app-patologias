# Roadmap — Patologías de Enfermería + Ecosistema

> **Versión actual**: 1.0.0 (lanzamiento público)
> **Ecosistema**: 3 apps independientes interconectadas vía MiSuite
> - **Patologías** (`com.patologiasenfermeria.free`) — qué tiene el paciente
> - **Curso** (`com.cursoenfermeria.free`) — cómo se hace
> - **Farmacología** (`com.guiafarmacologica.free`) — qué le doy al paciente
>
> Este roadmap aplica primariamente a Patologías; los hitos cross-ecosystem se marcan con 🌐.

---

## v1.0.0 — Lanzamiento público (AHORA — mayo 2026)

**Estado**: AAB listo para subir a Play Store. Versión interna se reseteó desde 2.0.1 a 1.0.0 para alinear con marketing público.

**Incluye** (heredado de las iteraciones internas 2.0.x):
- 151 patologías por sistema con NANDA-NIC-NOC
- 17 escalas clínicas interactivas
- Quiz educativo con revisión de errores
- Diagnóstico diferencial por síntomas
- Valores de laboratorio, protocolos de emergencia
- Hub MiSuite — conecta con Curso y Farma vía deep links
- Funcionamiento offline 100%
- SQLite via op-sqlite, FlashList, EncryptedStorage premium
- Buscador tolerante a tildes y variantes ortográficas (k↔c)
- Disclaimer clínico visible en About + footnote en cada patología
- 82 unit tests, 4 jobs CI bloqueantes + 1 informativo
- Infraestructura OTA lista (off por default — se activa en v1.1)

**Pre-launch checklist**:
- [ ] Rebundle JS (`npx react-native bundle --dev false ...`)
- [ ] Build AAB free release (`./gradlew app:bundleFreeRelease`)
- [ ] Subir a Play Store **Internal Testing track** primero
- [ ] Verificar instalación en dispositivo tester (cuenta autorizada)
- [ ] Promote a **Closed Testing** → 1-2 semanas con beta testers
- [ ] Promote a **Production** después de feedback
- [ ] 🌐 Confirmar status Play Store de Curso y Farma — si todavía no están publicadas, "Descargar" en MiSuite va a 404

---

## v1.0.x — Patches (semanas-meses post-launch)

**Cuándo**: bug fixes detectados en producción, sin nuevas features.

**Triggers típicos**:
- Crash reports de Sentry (ver v1.1 para activarlo)
- Reviews 1-3 estrellas con bugs específicos
- Patologías con info clínicamente desactualizada urgente
- Problemas de compatibilidad con devices/Android específicos

**Cadencia**: cada 2-4 semanas si hay bugs, sino esperar a v1.1.

---

## v1.1 — Activar OTA + Sentry + contenido al día (mes 1-3 post-launch)

### Tema "Observabilidad y actualizabilidad"

**Activación de infra ya construida:**
- [ ] **Sentry crash reporting** activado (crear proyecto sentry.io, pegar DSN en `src/config/sentry.ts`, correr wizard)
- [ ] **OTA content updates** activado:
  - Hostear `manifest.json` + `pathologies.json` en GitHub Pages (rama `gh-pages` lista local sin pushear) o Cloudflare Pages
  - Pegar URL en `src/services/contentSync.ts:42`
  - Flip `FEATURES.contentOTA: true`
  - Rebuild AAB → v1.1.0
- [ ] **Indicador modo offline explícito** (warning en UI si última sync OTA > 7 días — la infra `lastSyncedAt` ya existe)

### Tema "Contenido al día con guías 2024+"

Sesiones dedicadas con web search + validación clínica del usuario, ~1 patología por sesión enfocada (~30 min):

- [x] `pat_icc` — ESC 2023 4-pillar (ARNI + BB + MRA + SGLT2i) ✓ hecho
- [ ] `pat_fa` — ESC 2024 AF-CARE (CHA2DS2-VA, ablación 1ra línea, cardioversión 24h)
- [ ] `pat_iam` — AHA/ESC 2023 STEMI/NSTEMI + DAPT + SGLT2i post-IAM
- [ ] `pat_diabetes_2` — ADA 2025 (GLP-1 + SGLT2i prioritized)
- [ ] `pat_epoc` — GOLD 2025 (LABA/LAMA dual, triple si exacerbador)
- [ ] `pat_hta` — ESC 2024 HTN (target <130/80, SPC desde inicio)
- [ ] Otros ~20 de "alto cambio" en cardio/respiratorio/endocrino

### Tema "Patologías faltantes detectadas"

Agregar entries que existían como referencias huérfanas:
- [ ] **Hiperkalemia** (urgencia electrolítica común)
- [ ] **Shock genérico** (hoy solo cardiogénico e hipovolémico)
- [ ] **Insuficiencia renal aguda + crónica**
- [ ] **Insuficiencia suprarrenal**
- [ ] **Hashimoto** (tiroiditis autoinmune)
- [ ] **SII** (síndrome intestino irritable)
- [ ] **Incontinencia urinaria**
- [ ] Rinitis alérgica, fasciitis necrotizante, otros

---

## v1.2 — Ecosistema integrado (mes 3-6)

### Tema "Deep links contextuales 🌐"

Hoy MiSuite es solo un hub. Esta release lo vuelve **ecosistema real**:

- [ ] **Convención de URLs cross-app**:
  - `farmacologia://drug/{id}` — abre Farma en una droga específica
  - `patologias://pathology/{id}` — abre Patologías en una entry
  - `patologias://system/{id}` — abre lista de un sistema
  - `curso://module/{n}` — abre módulo del curso
  - `curso://topic/{key}` — abre tópico específico
- [ ] **Handlers en cada app** que parseen las URLs entrantes
- [ ] **Links contextuales en contenido**:
  - En Patologías: cada droga citada en `tratamientoMedico.farmacologico` → tap abre Farma
  - En Patologías: cada NANDA citado → tap abre catálogo NANDA en Curso (si existe)
  - En Farma: cada patología relacionada → tap abre Patologías
  - En Curso: cada técnica → tap abre patología asociada (ej: módulo "Sondaje vesical" → relacionada a infección urinaria)
- [ ] **Test E2E cross-app** con las 3 instaladas en mismo emulador

### Tema "Optimización"

- [ ] **Eliminar `react-native-vector-icons`** (la app migró a fotos clínicas — confirmar con grep antes). Reduce bundle ~2MB
- [ ] **Reorganizar `src/screens/`** en subcarpetas (`learning/`, `clinical/`, `tools/`, `account/`) — 27 pantallas en una carpeta plana ya cuesta navegar
- [ ] **Pagar deuda de inline-styles** (524 warnings) o aceptar como convención RN (decidir)
- [ ] **Performance audit**: tiempo de boot, primer render de PathologyDetail, búsqueda con 151 entries

---

## v1.3 — Engagement y educación (mes 6-9)

### Features con feature flags YA reservados (`src/config/features.ts`)

- [ ] **`videoLinks`**: enlazar YouTube videos por patología (campo `videoUrl` ya existe en Pathology). Canales recomendados: Osmosis, Ninja Nerd, Khan Academy, Enfermería Evidente. Solo enlace, no descarga
- [ ] **`quizHistory`**: persistir histórico de quiz a través de sesiones, con tracking de aciertos por sistema/categoría
- [ ] **`exportNotesPdf`**: exportar las notas personales del usuario a PDF (feature de retención clave para enfermeros que estudian)

### Contenido nuevo

- [ ] **Procedimientos de enfermería paso a paso**: 30 procedimientos (canalización EV, sondaje, intubación auxiliar, RCP básica, etc) con imágenes/diagramas. Ya hay módulo en Curso, evaluar si se replica acá o solo se linkea
- [ ] **Patologías pediátricas** (~20-30 entries): bronquiolitis, gastroenteritis, fiebre del lactante, GEPA, etc
- [ ] **Patologías geriátricas** (~15-20): delirium, sarcopenia, caídas, polifarmacia, fragilidad
- [ ] **Patologías psiquiátricas básicas**: ansiedad/depresión/intento autolítico (las que el enfermero general necesita reconocer y derivar)

---

## v2.0 — Sync y multi-device (año 1+)

### Tema "Cuenta de usuario y sync"

Requiere backend — primer cambio de arquitectura major:

- [ ] **`syncBetweenDevices`**: sync de favoritos, notas, quiz history, progreso
- [ ] **Decisión de backend**:
  - Supabase free tier (Postgres + auth + realtime) — MVP rápido
  - PocketBase self-hosted — control total, sin vendor lock-in
  - Firebase — bonita DX pero acopla a Google
- [ ] **Auth flow**: email + magic link recomendado (sin passwords). Apple/Google sign-in opcional
- [ ] **Privacy review obligatorio**: cuentas → datos personales → necesita Política de Privacidad reescrita

### Tema "Voz y accesibilidad"

- [ ] **`voiceSearch`**: `@react-native-voice/voice` para búsqueda manos-libres (útil con guantes en sala)
- [ ] **TTS para protocolos de emergencia**: leer en voz alta los pasos del protocolo (ACLS, RCP) durante una urgencia real
- [ ] **Accesibilidad WCAG**: audit completo, screen reader friendly

### Tema "iOS"

- [ ] **Build iOS**: misma codebase RN, requiere setup de cuenta Apple Developer ($99/año)
- [ ] **App Store submission**: privacy nutrition labels, review process diferente
- [ ] **Adaptaciones específicas**: SafeArea iOS-only, gestures, modal presentation

---

## Backlog (sin versión asignada — depende de demanda)

- [ ] **Modo "Examen"**: quiz cronometrado, sin pistas, simulando ENARM/EUNACOM/EIR
- [ ] **Tarjetas Anki exportables**: para spaced repetition externa
- [ ] **Buscador semántico** (embeddings locales con onnx-runtime): "patología con X síntoma" sin necesidad de match textual exacto
- [ ] **Modo "Profesor"** (cuenta institucional): docente comparte preguntas custom + lee progreso de su clase
- [ ] **Plugin VS Code/Obsidian**: para enfermeros que estudian con notas markdown
- [ ] **Web app** (mismo dataset): RN-Web + Vite, lectura libre por web
- [ ] **Internacionalización (i18n)**: portugués (Brasil), inglés. Requiere traducir 151 patologías — gran inversión

---

## Política de versionado

| Tipo | Cuándo | Ejemplo |
|------|--------|---------|
| **Patch** (1.0.X) | Bug fixes sin features. Hotfixes urgentes | Crash en pantalla X arreglado |
| **Minor** (1.X.0) | Features nuevos sin breaking. Activar features dormidos | Activar OTA, agregar Sentry, nuevas patologías |
| **Major** (X.0.0) | Breaking changes en data schema, API, o UX fundamental | Sync con backend, iOS, redesign mayor |

**Cadencia objetivo**:
- Patches: on-demand (1-2 por mes promedio)
- Minor: trimestral (cada ~3 meses)
- Major: anual (cada ~12 meses)

**OTA vs AAB**:
- **OTA** (`pathologies.json` actualizado en hosting): cambios de **contenido clínico** sin republicar Play Store. Usuarios reciben en máximo 6h
- **AAB** (Play Store): cambios de **código** (features nuevas, fix de bugs, schema changes). Review de Play tarda 1-7 días

---

## Métricas de éxito a trackear (cuando Sentry esté activo)

- **Crash-free sessions %** (objetivo: > 99.5%)
- **Sesiones por usuario activo / mes** (objetivo: > 4 = uso regular)
- **Tiempo medio en app por sesión** (objetivo: > 3 min = consulta real, no curiosidad)
- **Patologías más consultadas** (informa qué actualizar primero)
- **Búsquedas sin resultados** (informa qué patologías agregar)
- **% usuarios con OTA activo y reciben updates** (informa si la infra OTA cumple su promesa)
- **Conversión free → premium** (modelo de negocio)
- **Cross-app navigation rate** (cuántos usuarios de Patologías abren MiSuite y van a Curso/Farma)

---

## Convenciones del proyecto

- **Toda edición de `pathologies.json`** debe setear `revisadoEn: "YYYY-MM-DD"` y `fuentes: ["ESC 2024", ...]`
- **Toda nueva feature** debe tener feature flag en `src/config/features.ts` (ship dark, enable bright)
- **Tests obligatorios** para servicios y hooks (no para componentes — costo > beneficio en este proyecto)
- **CI debe pasar** los 4 jobs bloqueantes (test, lint, typecheck, data) antes de merge a `main`
- **Cada patología** debería linkear contextualmente a Farma (drogas) y Curso (técnicas) — convención v1.2

---

**Última actualización**: 2026-05-06
**Próxima revisión**: tras lanzamiento v1.0 a Play Store production
