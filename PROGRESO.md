# Registro de Progreso — Patologias de Enfermeria

> **Politica**: Este documento se actualiza en CADA sesion donde se realice cualquier modificacion o actualizacion. Registra que se hizo, cuando, y el estado resultante.

---

## 2026-05-06 — Sesion 14: Audit de orphan refs + normalizer k↔c

### Resumen
Tu busqueda de "hipercalemia" destapo dos bugs: la patologia no existe (id huérfano `pat_hiperkalemia` referenciado en `relatedPathologyIds` de rabdomiolisis) Y el normalizer no tolera variantes ortograficas `k↔c`. Audit sistematico encontro **38 ids huerfanos / 45 refs rotas** total. Limpieza completa + fix del normalizer + tests.

### Cambios

| Archivo | Detalle |
|---------|---------|
| `src/data/pathologies.json` | 10 renames (typos de ids reales) + 35 removes (sin match) + 1 dedupe (`pat_icc` duplicado). Total: 45 refs limpiadas |
| `src/utils/search.ts` | Regla `k → c` agregada al normalizer + JSDoc explicando estrategia bidireccional |
| `src/screens/SystemPathologiesScreen.tsx` | Removida copia local de `normalizeText` (que ademas no tenia `.trim()`). Importa del util. Single source of truth |
| `__tests__/search.test.ts` | Nuevo: 7 tests cubriendo lowercase, diacritics, trim, k↔c, case-insensitive, combinacion, idempotencia |

### Renames aplicados (10)

| Orphan | Replacement |
|--------|-------------|
| pat_asma_bronquial | pat_asma |
| pat_coagulación_intravascular_diseminada | pat_cid |
| pat_esclerosis_lateral_amiotrofica | pat_esclerosis_lateral |
| pat_fracturas | pat_fracturas_extremidades |
| pat_insuficiencia_respiratoria | pat_ira |
| pat_litiasis_renal | pat_litiasis |
| pat_litiasis_urinaria | pat_litiasis |
| pat_sindrome_guillain_barre | pat_guillain_barre |
| pat_tceg | pat_tce |

### Patologias FALTANTES (detectadas durante el audit, a agregar en sesion dedicada)

Comunes en enfermeria, valen sesion de contenido propia:
- Hiperkalemia (la del bug original)
- Shock (genérico — hoy solo hay shock_cardiogenico y shock_hipovolemico)
- Insuficiencia renal aguda + crónica
- Insuficiencia suprarrenal
- Hashimoto
- SII (sindrome intestino irritable)
- Incontinencia urinaria
- Otros: rinitis alergica, fasciitis necrotizante, hashimoto, etc

### Verificacion

| Check | Antes | Despues |
|-------|-------|---------|
| Orphan refs | 45 | 0 |
| Tests | 53 | 60 (+7 normalizer) |
| `tsc --noEmit` | 0 errores | 0 errores |
| Lint | 0 errores | 0 errores |

### Pendiente

- Subir AAB v2.0.1 a Play Store (manual)
- Sesion de contenido para agregar las ~7 patologias faltantes detectadas + bumpear a v2.0.2

### Adicionado en la misma sesion (post-AD)

**`scripts/check-orphans.js` + CI job `data`**: previene recurrencia de la deuda limpiada hoy. Job separado en CI workflow (no requiere `npm ci` — script Node puro), `npm run check:orphans` para correr local. Cualquier PR futuro que introduzca un id huerfano frena el merge.

---

## 2026-05-06 — Sesion 13: Release v2.0.1 — bundle + AAB con fixes de hooks

### Resumen
Bump a `2.0.1` (versionCode 3) y rebuild del AAB para llevar a produccion los 4 fixes de hook bugs de Sesion 12. El bundle anterior commiteado en `c2c7add` no incluia esos fixes — los usuarios actuales tienen los crashes latentes hasta que se republique en Play Store.

### Cambios

| Archivo | Detalle |
|---------|---------|
| `package.json` | `version: 2.0.0` → `2.0.1` |
| `android/app/build.gradle` | `versionCode: 2 → 3`, `versionName: "2.0.0" → "2.0.1"` |
| `src/config/appInfo.ts` | `APP_VERSION = '2.0.1'` |
| `android/app/src/main/assets/index.android.bundle` | Rebundleado con todos los fixes |

### Patch notes (semver patch — no nuevas features)

- Fix: `PathologyDetailScreen` ya no crashea cuando se abre con id invalido tras id valido (hooks reordenados antes del early-return)
- Fix: `ProtocolDetailScreen` mismo patron arreglado
- Fix: `LabValuesScreen` dep `rs` removida del useMemo de `ListHeaderComponent`
- Fix: `QuizSessionScreen` regenera el quiz si los params (category/questionCount) cambian

### Verificacion

| Check | Resultado |
|-------|-----------|
| `npx react-native bundle` | OK, 0 warnings |
| `./gradlew app:bundleFreeRelease` | BUILD SUCCESSFUL en 9m 38s, 433 tasks |
| AAB output | `android/app/build/outputs/bundle/freeRelease/app-free-release.aab` — **51 MB** |

### Pendiente

1. **Subir AAB a Play Store** — Internal testing track primero, despues promote a production. Ver `playstore/INSTRUCCIONES_PUBLICACION.md`
2. **Setup Sentry** para verificar que la tasa de crashes baja tras este release
3. **Activar OTA end-to-end** (push gh-pages, configurar MANIFEST_URL, flip flag)

---

## 2026-05-05 — Sesion 12: Pago de deuda de lint + 4 bugs latentes destapados

### Resumen
La deuda de lint (78 errors / 564 warnings inicial, 89/586 tras MiSuite) bajo a **0 errors / 524 warnings**. CI lint job promovido a bloqueante. En el camino se destaparon 4 bugs reales de React Hooks que estaban siendo enmascarados por el `continue-on-error: true`.

### Cambios

| Archivo | Detalle |
|---------|---------|
| `.eslintrc.js` | Overrides: jest globals en tests/setup, `no-bitwise` off en activation.ts |
| `.github/workflows/ci.yml` | Lint job: `continue-on-error: true` → removido. Ahora bloquea PRs |
| `src/screens/PathologyDetailScreen.tsx` | **BUG**: `useCallback`+`useRef`+`useMemo` llamados tras early-return → movidos arriba |
| `src/screens/ProtocolDetailScreen.tsx` | **BUG**: `useMemo` tras early-return → movido arriba |
| `src/screens/LabValuesScreen.tsx` | **BUG**: dep `rs` innecesaria en useMemo → removida |
| `src/screens/QuizSessionScreen.tsx` | **BUG**: useEffect con deps vacias ignoraba category/questionCount/generateQuiz → agregadas |
| 20+ archivos | Cleanup: imports muertos, destructured no usados, `_` prefix en args intencionalmente unused |

### Bugs destapados (todos cosméticos hasta que React detectara la inconsistencia)

#### PathologyDetailScreen / ProtocolDetailScreen — rules-of-hooks
React enforce runtime que el hook count sea idéntico entre renders. Ambas pantallas tenían:
```tsx
if (!entity) return <NotFound />;  // 7 hooks ya corrieron
const memo = useMemo(...);         // 8vo hook
```
Primer render con id inválido → 7 hooks. Segundo render con id válido → 8 hooks → `Rendered more hooks than during the previous render` → crash. Era cuestión de tiempo hasta que un deep-link viejo lo disparara.

#### LabValuesScreen — exhaustive-deps cosmético
`rs` estaba en deps pero ya estaba referenciado vía `styles` (que SI tiene rs). Re-create del memo cuando el rs ref cambiaba pero styles no. Sin impacto funcional, solo waste de cómputo.

#### QuizSessionScreen — exhaustive-deps con intent error
```tsx
useEffect(() => { generateQuiz({ category, questionCount }); }, []);  // run once
```
Si la pantalla se reusara (navigate replace con otros params), el quiz no se regeneraba. En la práctica navigation push → unmount/remount, así que el bug no se manifestaba — pero la intent era frágil.

### Verificacion

| Check | Antes | Despues |
|-------|-------|---------|
| ESLint errors | 89 | **0** |
| ESLint warnings | 586 | 524 (524 inline-styles deferidas — convencion RN) |
| `tsc --noEmit` | 0 | 0 |
| Tests | 53/53 | 53/53 |
| CI lint job | non-blocking | **blocking** |

### Decisiones

- **Inline-styles warnings (524) NO atacadas**: convencion RN de la base de codigo es estilos inline. Extraerlos a StyleSheet objetos seria ~3 sesiones de refactor sin ganancia clara. La regla queda como warning para visibilidad.
- **`no-bitwise` off en activation.ts** en vez de inline `// eslint-disable-line` por linea: el archivo entero implementa SHA-256 con bitwise — disable per-file es honest.
- **`useTheme()`/`useResponsiveScale()` removidos en BodySystemCard** cuando colors/rs no se usaban: si la prop no se consume, el subscribe a context es waste. No es feature, es deuda real.

### Pendiente

- Setup manual hosting OTA + Sentry (sin cambio)
- 524 warnings de inline-styles si alguna sesion futura quiere ir 100% StyleSheet (low priority)

---

## 2026-05-05 — Sesion 11: Integracion de MiSuite (hub del ecosistema)

### Resumen
Pantalla "Mi suite" integrada al repo con tests, docs y bundle rebuild. Es un hub que detecta cuales de las 3 apps del ecosistema (Patologias, Curso, Farmacologia) estan instaladas en el dispositivo via deep-link schemes, y ofrece abrir o descargar de Play Store. Pequeño refactor: extraida la logica pura (APPS registry + URL fallback chain) a `src/services/miSuite.ts` para que sea testeable sin component setup.

### Archivos

| Archivo | Tipo | Detalle |
|---------|------|---------|
| `src/services/miSuite.ts` | nuevo | APPS registry, AppEntry/InstallStatus types, playStoreAppUrl/playStoreWebUrl builders, chooseLaunchUrls(app, status) con fallback ordenado |
| `src/screens/MiSuiteScreen.tsx` | nuevo | Hero gradient + 3 cards. useFocusEffect → checkInstalls(). handlePress simplificado a loop sobre chooseLaunchUrls con try/catch |
| `__tests__/miSuite.test.ts` | nuevo | 12 tests: APPS shape (3 entries, 1 isCurrent, ids/schemes/pkgs unicos, formato hex/reverse-DNS), Play Store URL builders, chooseLaunchUrls 3 paths |
| `android/app/src/main/AndroidManifest.xml` | modificado | `<queries>` para curso:// y farmacologia:// (Android 11+ package visibility). `<intent-filter>` para patologias:// (deep link de retorno desde otras apps del ecosistema) |
| `src/types/index.ts` | modificado | RootStackParamList += `MiSuite: undefined` |
| `src/navigation/AppNavigator.tsx` | modificado | Stack.Screen registration con title "Mi suite" |
| `src/screens/ToolsScreen.tsx` | modificado | Tarjeta "Mi suite" agregada al grid |
| `android/.../index.android.bundle` | rebuild | Pre-bundle obligatorio en Windows |

### Decision: refactor minimo antes de testear

La logica original tenia `Linking.openURL().catch().catch()` anidado dentro del componente — el punto mas error-prone (4 strings de URL hardcoded en 2 ramas). Sin extraer, los tests requeririan setup pesado de component-rendering (ThemeProvider + mocks de Linking + useFocusEffect que dispare). Extraer 1 helper de 8 lineas convierte ese caso en 5 tests sobre funciones puras. El global rule "Refactor → Feature" aplica: la feature aqui son los tests, y el refactor las hace faciles. handlePress paso de 17 lineas anidadas a 8 lineas con un loop trivial.

### Defensas implementadas

| Caso | Comportamiento |
|------|----------------|
| App actual ('Patologias') | Card no clickeable, marcada "ESTAS AQUI" |
| App instalada | Tap → intenta scheme; si falla → market://; si falla → https://play.google.com |
| App no instalada | Tap → market://; si falla → https://play.google.com |
| Status 'checking' (carrera) | Defensivo: trata como 'missing' (Play Store directo) — evita intentar scheme antes de saber si esta instalada |
| Linking.canOpenURL throws | Catch → 'missing' |

### Verificacion

| Check | Resultado |
|-------|-----------|
| `tsc --noEmit` | 0 errores |
| Tests | 53/53 (era 41, +12 en miSuite) |
| Bundle rebuild | OK (Metro v0.83.5, sin warnings) |

### Pendiente

- Setup manual hosting OTA + Sentry (sin cambio)
- Deuda lint (sin cambio)
- Cuando las otras 2 apps del ecosistema esten en Play Store, verificar que los `pkg` names en APPS coincidan con los reales (`com.cursoenfermeria.free`, `com.guiafarmacologica.free`) — el test catchea typos pero no verifica que coincidan con el listing real

---

## 2026-05-05 — Sesion 10: Boton "Buscar actualizacion ahora" en Settings

### Resumen
La row "Datos clinicos" pasa de display-only a tap-able cuando el flag `contentOTA` esta on. Tap → spinner → Alert con resultado. Bypass del throttle 6h via `syncContent({ force: true })`. Cuando el flag esta off (default hoy), la row sigue display-only — cero deuda.

### Cambios

| Archivo | Detalle |
|---------|---------|
| `src/hooks/useDataInfo.ts` | Refactor: `DataInfo` extiende nueva `DataInfoSnapshot` + expone `refresh()` para re-leer manualmente. `useFocusEffect` no re-fire cuando la pantalla ya esta enfocada → necesario despues de un sync iniciado desde la misma pantalla |
| `src/screens/SettingsScreen.tsx` | Imports: `isFeatureEnabled`, `syncContent`, `ActivityIndicator`. Estado `syncing` con mutex (`if (syncing) return`). Handler `handleSyncNow` async con feedback Alert. Row condicionalmente tap-able segun `otaEnabled` |

### UX

| Estado | Que ve el usuario |
|--------|-------------------|
| OTA off (default hoy) | Row no tap-able (igual que hoy) |
| OTA on, idle | "v1 · verificado hace 2h" + chevron |
| OTA on, sincronizando | "Buscando actualizaciones…" + spinner |
| OTA on, success update | Alert "Version nueva: v3", subtitle se refresca |
| OTA on, no update | Alert "Tu app ya tiene la ultima version disponible" |
| OTA on, error | Alert "No se pudo actualizar: [reason]" |

### Decisiones de diseño

- **Solo tap-able cuando flag on**: si fuera siempre tap-able, el usuario taparia hoy y veria "OTA disabled" — feedback negativo gratis. Mejor no exponer interactividad cuando no hay funcionalidad detras.
- **Mutex contra doble-tap (`if (syncing) return`)**: dos taps rapidos = dos fetches paralelos = dos repopulates compitiendo por la transaccion SQLite. El flag bloquea el segundo.
- **Refresh() manual en hook**: useFocusEffect no refire mientras la pantalla sigue enfocada. Sin refresh manual, el subtitle no actualizaria tras un sync exitoso hasta que el usuario navegara fuera y volviera.
- **`disabled` y `throttled` marcados como unreachable**: el handler comenta explicitamente que esos status son inalcanzables — gated por `otaEnabled` (no llega si flag off) + always `force: true` (bypasea throttle). Sin el comment, futuro lector pensaria que falta un caso.

### Verificacion

| Check | Resultado |
|-------|-----------|
| `tsc --noEmit` | 0 errores |
| Tests | 41/41 sin cambio (no se agregaron tests de Settings — componente grande, costo > beneficio) |

### Pendiente

- Setup manual hosting OTA + Sentry (sin cambio)
- Deuda lint (sin cambio)
- Considerar test de componente para SettingsScreen si se vuelve mas complejo

---

## 2026-05-05 — Sesion 9: Throttling de OTA sync

### Resumen
Gate de 6 horas entre manifest fetches para no pegar al server en cada cold boot. Si lastSyncedAt < 6h, syncContent devuelve `{ status: 'throttled', nextEligibleAt }`. Bypass via parametro `{ force: true }` — pensado para futuro boton "Buscar actualizacion ahora" en Settings.

### Cambios

| Archivo | Detalle |
|---------|---------|
| `src/services/contentSync.ts` | `MIN_SYNC_INTERVAL_MS = 6h`. Nuevo SyncResult variant `throttled` con `nextEligibleAt` absoluto. SyncOptions `{ force?: boolean }`. Reorden critico: throttle ANTES de MANIFEST_URL check |
| `App.tsx` | Comment actualizado para reflejar throttling |
| `__tests__/contentSync.test.ts` | +5 tests: throttled, no-throttle con force, no-throttle con sync vieja, no-throttle en primer boot, error MANIFEST_URL |

### Decision de diseño: por que reordenar throttle antes de MANIFEST_URL check

Caso: usuario flippea `FEATURES.contentOTA = true` pero olvida configurar MANIFEST_URL. Con orden anterior (URL check primero), cada cold boot loggea "MANIFEST_URL not configured" — ruido. Con orden nuevo (throttle primero), tras la primera vez el throttle suprime los errores hasta que pasen 6h.

**Pero**: esto requiere que `setLastSyncedAt` se llame incluso cuando MANIFEST_URL está vacío. Hoy NO se llama. Trade-off: prefiero el orden correcto (throttle es defense-in-depth, va arriba). El error de MANIFEST_URL vacio se loggeara cada boot mientras lastSyncedAt sea null — que es OK porque indica que el OTA está activado pero no configurado, situación que el dev debe arreglar pronto. Un upgrade futuro: marcar lastSyncedAt incluso en errores de config para silenciar.

### Verificacion

| Check | Resultado |
|-------|-----------|
| `tsc --noEmit` | 0 errores |
| Tests | 41/41 (era 36, +5 throttling) |
| Bug atrapado por mi test | Orden inicial de gates devolvia error en vez de throttled — fix antes de commit |

### Pendiente

- Boton "Buscar actualizacion ahora" en Settings — usaria `syncContent({ force: true })` + estado de carga. Probable proxima sesion
- Setup manual hosting OTA + Sentry (pendiente desde antes)
- Deuda lint (pendiente desde antes)

---

## 2026-05-05 — Sesion 8: Indicador UI de ultima actualizacion

### Resumen
Layer visible para el OTA: en Settings ahora se ve la version del dataset y cuando fue verificado por ultima vez. Tambien se aprovecho para extraer `APP_VERSION` a constante unica (antes duplicado en sentry.ts y contentSync.ts) y arreglar la "Version" row que estaba hardcoded a 1.0.0.

### Archivos

| Archivo | Tipo | Detalle |
|---------|------|---------|
| `src/config/appInfo.ts` | nuevo | `APP_VERSION = '2.0.0'` — single source |
| `src/data/db.ts` | extension | `getLastSyncedAt()`, `setLastSyncedAt(ts)` reusan tabla `meta` con upsert |
| `src/services/contentSync.ts` | modificado | Importa APP_VERSION desde appInfo. Llama setLastSyncedAt tras manifest fetch (incluso si no-update) y tras repopulate |
| `src/hooks/useDataInfo.ts` | nuevo | Hook reactivo (useFocusEffect) + `formatRelativeTime` con plurales castellanos |
| `src/screens/SettingsScreen.tsx` | modificado | Nueva row "Datos clinicos" con icono database. Version row usa APP_VERSION |
| `src/config/sentry.ts` | modificado | Importa APP_VERSION desde appInfo |
| `__tests__/useDataInfo.test.ts` | nuevo | 7 tests cubriendo segundos→años, plurales, clamp futuro |

### UX del indicador

| Estado | Subtitle |
|--------|----------|
| Bundled, nunca synced (default hoy) | `v1 · versión inicial` |
| OTA on, sin update | `v1 · verificado hace 5 minutos` |
| OTA on, update aplicado | `v3 · actualizado hace 2 horas` |

Distincion clave: "verificado" significa "pegamos al server, no hay nada nuevo". "Actualizado" significa "se aplico data nueva". El timestamp NO se actualiza cuando la red falla — eso seria mentirle al usuario.

### Verificacion

| Check | Resultado |
|-------|-----------|
| `tsc --noEmit` | 0 errores |
| Tests | 36/36 (era 29, +7 nuevos en useDataInfo) |

### Detalle de proceso

Hubo un commit que mezclo refactor + feature por error (`38e3087` en historia local). Detectado antes de push: `git reset --soft HEAD~1` y splitteo en commits atomicos. Sin riesgo (los cambios estaban preservados en el index).

### Pendiente

- Setup manual de hosting OTA + Sentry (no cambia)
- Throttling de sync (lastCheckedAt ya existe en meta — facil agregar gate)
- Deuda de lint sigue intacta

---

## 2026-05-05 — Sesion 7: Fase 3 — OTA content sync

### Resumen
Infraestructura para actualizar el dataset de patologias sin republicar el AAB. La app ahora puede pullear un manifest remoto al boot, comparar versiones, descargar el nuevo `pathologies.json`, validar shape/size/version, y repopular SQLite en una transaccion atomica. **Flag off por default** — la infra esta lista pero inerte hasta que el usuario hostee el manifest.

### Archivos

| Archivo | Tipo | Detalle |
|---------|------|---------|
| `src/services/contentSync.ts` | nuevo | `syncContent()`, `validateManifest()`, `validateDataset()`, `compareVersions()`. SyncResult discriminated union |
| `src/data/db.ts` | refactor + extension | Extraidas `ensureSchema()`, `insertPathologies()`, `setDataVersion()`. Tabla `meta`. Exports nuevos: `getCurrentDataVersion()`, `repopulateFromJson(data, version)` |
| `App.tsx` | modificado | `syncContent()` fire-and-forget despues de `initDatabase()` |
| `__tests__/contentSync.test.ts` | nuevo | 28 unit tests (compareVersions, validateManifest reject paths, validateDataset shape, syncContent disabled) |

### Defensas implementadas (v1)

| Threat | Defense |
|--------|---------|
| Network failure | try/catch -> log + silent fallback. App sigue con dataset actual |
| MITM | HTTPS only en validateManifest (regex `^https://`) |
| Size attack | 100KB ≤ size ≤ 10MB en manifest validation |
| Schema mismatch | `manifest.minAppVersion` ≤ APP_VERSION o reject |
| Downgrade attack | `manifest.version > getCurrentDataVersion()` o no-op |
| Corrupt JSON | `validateDataset()` chequea array no-vacio + 3 entries con id/nombre/bodySystemId |
| Partial write | `BEGIN; DELETE; INSERT; UPDATE meta; COMMIT;` con `ROLLBACK` en error |

### Defensas NO implementadas (deferidas)

- **SHA-256 / signature validation**: agregar `react-native-quick-crypto` cuando el host sea menos confiable. Por ahora HTTPS+host control son razonables. JSDoc documenta el upgrade path
- **Throttling de sync**: por ahora pega al server en cada boot. Si el bandwidth se vuelve issue, agregar `lastCheckedAt` en meta + skip si < N horas

### Verificacion

| Check | Resultado |
|-------|-----------|
| `tsc --noEmit` | 0 errores |
| Tests | 29/29 passing (era 13, +16 nuevos en contentSync) |
| Bug atrapado por mi propio test | `compareVersions('2', '2.0.0')` devolvia 1 sin destructure default — fix antes de commit |

### Pendiente para activar OTA en produccion

1. Hostear `pathologies.json` y `manifest.json` en GitHub Pages / Cloudflare / S3 (bucket publico, HTTPS)
2. Pegar URL en `MANIFEST_URL` en `src/services/contentSync.ts:42`
3. Subir `FEATURES.contentOTA` a `true` en `src/config/features.ts:18`
4. Rebuild bundle + AAB

### Manifest format

```json
{
  "version": 2,
  "url": "https://example.com/pathologies-v2.json",
  "minAppVersion": "2.0.0",
  "size": 2453678,
  "updatedAt": "2026-05-05T00:00:00Z"
}
```

### Pendiente para proxima sesion

- Setup manual de hosting OTA (decision del usuario sobre donde hostear)
- Setup manual de Sentry (sigue pendiente desde Sesion 6)
- Deuda de lint: 78 errors / 564 warnings — eventual cleanup
- Considerar throttling de sync (lastCheckedAt) si el bandwidth resulta issue

---

## 2026-05-05 — Sesion 6: Fase 2 — Infraestructura para releases

### Resumen
Tres pilares de infraestructura para preparar la app para futuras updates: feature flags tipados, scaffold de crash reporting (Sentry), y CI en GitHub Actions con tests + typecheck bloqueantes. En el camino: pago de deuda tecnica (mocks de Jest desactualizados desde la migracion a EncryptedStorage/SQLite + 2 errores de TypeScript de FlashList v2 API).

### Cambios

| Archivo | Detalle |
|---------|---------|
| `src/config/features.ts` (nuevo) | Registry tipado de 6 feature flags compile-time + helper `isFeatureEnabled` |
| `src/config/sentry.ts` (nuevo) | `initSentry()` con `require()` defensivo dentro de try/catch — no-op si dep no esta instalada o DSN vacio. PII strip en `beforeSend` |
| `App.tsx` | `initSentry()` llamado antes de `initDatabase()` |
| `jest.setup.js` | Mocks agregados: `react-native-encrypted-storage`, `@op-engineering/op-sqlite` (count: 1 para skip de populate), `@shopify/flash-list` (alias FlatList) |
| `src/screens/SearchScreen.tsx` | Removidas props heredadas FlatList (`estimatedItemSize`, `initialNumToRender`, `windowSize`) — FlashList v2 hace recycling automatico |
| `src/screens/SystemPathologiesScreen.tsx` | Misma limpieza FlashList v2 |
| `.github/workflows/ci.yml` (nuevo) | Tres jobs: `test` (Jest, blocking), `typecheck` (tsc, blocking), `lint` (ESLint, non-blocking hasta pagar deuda). Concurrency cancela runs viejos |

### Verificacion

| Check | Antes | Despues |
|-------|-------|---------|
| Jest tests | 0/13 (App.test crash por mock encrypted-storage) | 13/13 passing |
| `tsc --noEmit` | 2 errores (FlashList API) | 0 errores |
| ESLint | 78 errors / 564 warnings | sin cambio (deferred) |

### Decisiones de alcance

**Items de Fase 2 del plan original que se SALTARON intencionalmente:**
- **Channels Android (internal/beta/production)**: redundante. Los flavors `free`/`premium` + Play Store tracks (internal/closed/open testing) ya cubren el caso. Build types separados duplicarian configuracion sin ganancia.
- **Reorganizar `src/screens/` en subcarpetas**: 23 mov + ~100 import refactors. Bajo-impacto-alto-riesgo. Diferido hasta sesion dedicada (cuando haga falta agregar 5+ pantallas).

**Sentry vs Crashlytics**: elegido Sentry — independiente de Firebase (no acoplarse al ecosistema si no se usan otros servicios), free tier 5K errores/mes alcanza, mejor DX para indie devs (source maps automaticos).

### Pendiente para proxima sesion

- **Setup manual de Sentry** (require interaccion del usuario):
  1. crear proyecto en https://sentry.io
  2. pegar DSN en `src/config/sentry.ts:21`
  3. correr `npx @sentry/wizard@latest -i reactNative -p android`
  4. rebuild AAB
- **Deuda de lint**: 78 errors / 564 warnings — ataque por archivo en sesiones futuras
- **Fase 3** (cuando el usuario decida arrancar): OTA de contenido como prioridad #1

---

## 2026-05-05 — Sesion 5: Higiene del repo + separacion de proyectos

### Resumen
Limpieza preparatoria para futuras releases: working tree depurado, screenshots de iteración eliminadas, `.gitignore` reforzado para evitar contaminación futura, version bump a `2.0.0` (alineando `package.json`, `versionName` Android y CHANGELOG). Trabajo del modulo "Curso de Enfermería" extraido del repo y movido a proyecto independiente en `F:\programas\curso-enfermeria\` (es otro producto, ciclo de release distinto).

### Cambios

| Area | Detalle |
|------|---------|
| `.gitignore` | Ignora `screen_*.png`, `test*.png`, `*.jpg`/`*.html` en raiz, build outputs, `.env`, IDE/OS junk |
| Cleanup | 119 screenshots de iteracion eliminadas; 4 JPG sueltos y 2 HTML de tooling movidos al proyecto Curso |
| `package.json` | `version: 2.0.0` (estaba en `0.0.1`) |
| `android/app/build.gradle` | `versionCode: 2`, `versionName: "2.0.0"` (estaba en `1.0`) |
| Curso de Enfermería | Movido a `F:\programas\curso-enfermeria\` (screens, data, types, utils, HTML tools, JPGs); refs revertidas en `App.tsx`, `AppNavigator.tsx`, `ToolsScreen.tsx`, `types/index.ts` |
| `db.ts` | Devuelto a `src/data/` (es infra de Patologias, no del Curso); `initDatabase()` restaurado en `App.tsx` |

### Verificacion

| Check | Resultado |
|-------|-----------|
| TypeScript imports rotos | 0 (db.ts resuelve correctamente) |
| Refs huerfanas a Curso en `src/` | 0 |

### Pendiente para proxima sesion

- Fase 2 del plan de actualizaciones: feature flags locales, GitHub Actions, crash reporting, reorganizar `src/screens/` en subcarpetas
- Evaluar Fase 3: OTA de contenido (actualizar `pathologies.json` sin republicar APK)

---

## 2026-03-29 — Sesion 4: Hyper-Optimización y Escalabilidad

### Cambios detallados
- **SQLite Migración:** Se cambió la lectura JSON sincrona a memoria (que llenaba el Heap/RAM del Engine) por una motor nativo `C++ SQLite JSI` (`@op-engineering/op-sqlite`). Se escribieron inyectores para leer las 151 patologías instantáneamente de un fichero real de Base de Datos.
- **Rendimiento UI:** Pantallas con scroll gigante sustituidas por `@shopify/flash-list`.
- **Seguridad:** Los keys premium expuestos en AsyncStorage pasaron a `react-native-encrypted-storage`.

---

## 2026-03-27 — Sesion 3: Quiz educativo + compilacion release

### Commits realizados (3)

| # | Hash | Tipo | Descripcion |
|---|------|------|-------------|
| 1 | `d61dae2` | feat | Transformar quiz en herramienta educativa con feedback enriquecido |
| 2 | `f21736f` | chore | Rebuild del bundle Android |
| 3 | `92a1cab` | docs | Actualizar PROGRESO.md y CHANGELOG con quiz learning feature |

### Cambios detallados

**Quiz educativo — feedback enriquecido por pregunta**
- **"¿Sabías que...?"** (clinicalPearl): muestra la definición clínica de la patología tras cada respuesta
- **"Dato clave"** (keyFact): epidemiología, nivel de emergencia, valores de referencia, o cuidados farmacológicos según el tipo de pregunta
- **"Ver patología completa"**: botón que navega al detalle de la patología para profundizar
- **Explicaciones mejoradas**: incluyen signos/síntomas relacionados, intervenciones de enfermería, dosis farmacológicas, valores de referencia de pruebas diagnósticas, definiciones NANDA con características definitorias

**Resumen de quiz — revisión de errores**
- **"Revisar errores — ¡Aprende!"**: sección expandible que muestra cada pregunta fallada con:
  - Tu respuesta vs respuesta correcta (visual con colores)
  - Explicación completa del por qué
  - Clinical pearl de la patología
  - Botón "Estudiar [patología]" para ir al detalle
- **"Consejo de estudio"**: mensaje motivacional adaptado al porcentaje (>=80%, 60-79%, <60%)

**Tipos actualizados**
- `QuizQuestion` ahora incluye: `pathologyId`, `clinicalPearl?`, `keyFact?`
- `buildClinicalPearl()` y `buildKeyFact()` nuevas funciones en useQuiz.ts

### Compilacion release verificada

| Build | Tamaño | Ruta |
|-------|--------|------|
| Free Release APK | 65 MB | `android/app/build/outputs/apk/free/release/app-free-release.apk` |
| Premium Release APK | 65 MB | `android/app/build/outputs/apk/premium/release/app-premium-release.apk` |
| Free Release AAB | 45 MB | `android/app/build/outputs/bundle/freeRelease/app-free-release.aab` |

### Verificacion en emulador
- Quiz educativo probado end-to-end: respuesta correcta, incorrecta, resumen con revision de errores
- Feedback con 3 capas (explicacion, clinical pearl, dato clave) — OK
- Boton "Ver patologia completa" navega correctamente — OK
- "Revisar errores — ¡Aprende!" expande lista de errores con explicaciones — OK
- "Consejo de estudio" adaptado al score — OK

### Estado del proyecto post-sesion

| Aspecto | Estado |
|---------|--------|
| TypeScript | 0 errores |
| Tests | 13/13 pasan |
| Bundle JS | OK (52 assets) |
| Build release | BUILD SUCCESSFUL (APK free, APK premium, AAB) |

---

## 2026-03-27 — Sesion 2: Visual upgrade + Diagnostico diferencial + Testing

### Commits realizados (7)

| # | Hash | Tipo | Descripcion |
|---|------|------|-------------|
| 1 | `589c6d2` | feat | Enriquecer pathologies.json con campo videoUrl + actualizar body_systems.json y lab_values.json |
| 2 | `48a1b3b` | feat | Actualizar 4 fotos de sistemas corporales (inmunologico, reproductivo, tegumentario, traumatologico) |
| 3 | `1ecc48f` | feat | Visual upgrade masivo: reemplazar iconos vectoriales por fotos clinicas en Home, Onboarding, Quiz, Tabs, Scales, Tools y mas |
| 4 | `ba4564e` | feat | Agregar pantalla de diagnostico diferencial interactivo (DifferentialScreen + useDifferentialDiagnosis hook) |
| 5 | `26e377f` | test | Agregar mocks de Jest para modulos nativos + 12 tests unitarios de quiz |
| 6 | `8db6c9c` | chore | Agregar scripts de utilidad (enrich_nanda.js, fix_tildes.js) |
| 7 | `057a2bc` | chore | Rebuild del bundle Android con todos los cambios |

### Cambios detallados

**Nueva feature — Diagnostico Diferencial**
- `src/screens/DifferentialScreen.tsx` (602 lineas) — pantalla interactiva donde el usuario selecciona sintomas y ve patologias rankeadas por % de coincidencia
- `src/hooks/useDifferentialDiagnosis.ts` (164 lineas) — hook que construye indice de sintomas de las 151 patologias y calcula matching en tiempo real
- Ruta agregada en `AppNavigator.tsx` y tipo en `types/index.ts`

**Visual upgrade — Iconos a fotos clinicas**
- HomeScreen: quick actions ahora usan fotos clinicas de fondo en vez de iconos, toggle dark mode con emoji, fondo decorativo con gradientes y circulos difuminados
- OnboardingScreen: rediseno completo con ImageBackground full-screen, gradientes por slide, estadisticas destacadas (151 patologias, 455 NANDA, 17 escalas)
- QuizScreen: chips de sistemas ahora muestran thumbnail circular de la foto del sistema
- AppNavigator: iconos de tabs actualizados, animacion pill con spring mejorada
- ScalesScreen, ToolsScreen, AllFavoritesScreen, AllNotesScreen, SearchScreen, PremiumScreen, PathologyDetailScreen, QuizSessionScreen: ajustes de UI consistentes

**Datos**
- `pathologies.json`: enriquecido (~18k lineas de diff), campo `videoUrl` opcional agregado al tipo
- `body_systems.json`: estructura actualizada
- `lab_values.json`: valores de referencia adicionales
- 4 imagenes de sistemas reemplazadas con fotos clinicas de mayor calidad

**Testing**
- `jest.setup.js` creado con mocks para: AsyncStorage, MaterialCommunityIcons, LinearGradient, SafeAreaContext, react-navigation (native, native-stack, bottom-tabs)
- `jest.config.js` actualizado con setupFiles
- `__tests__/useQuiz.test.ts`: 12 tests unitarios para logica de quiz
- Resultado: 13/13 tests pasan

**Documentacion actualizada**
- `README.md`: agregado diagnostico diferencial, videos educativos, Jest, conteo actualizado de screens/hooks
- `ARCHITECTURE.md`: DifferentialScreen en diagrama, useDifferentialDiagnosis en data flow, diseno visual actualizado
- `CHANGELOG.md`: nueva seccion v1.1.0-dev con todos los cambios
- `playstore/PLAN_ACTUALIZACIONES.md`: tracking de iconos actualizado, estrategia de videos educativos en Mes 11-12
- `PROGRESO.md`: creado (este archivo)

### Estado del proyecto post-sesion

| Aspecto | Estado |
|---------|--------|
| TypeScript | 0 errores |
| Tests | 13/13 pasan |
| Bundle JS | OK (52 assets) |
| Gradle build | BUILD SUCCESSFUL |
| Pantallas | 21 |
| Hooks | 9 |
| Patologias | 151 |
| Fotos clinicas | 38 (12 sistemas + 13 condiciones + 9 escalas + 4 actualizadas) |
| Iconos como visual principal eliminados | HomeScreen, OnboardingScreen, QuizScreen, DifferentialScreen |
| Iconos pendientes de eliminar | PremiumScreen, DashboardScreen, SettingsScreen, empty states |

### Decisiones tomadas
- **Videos educativos**: se implementaran en futuras versiones enlazando a YouTube (no descargando). Campo `videoUrl` ya existe en el tipo Pathology. Canales objetivo: Osmosis, Ninja Nerd, Khan Academy Medicine, Enfermeria Evidente
- **Politica de progreso**: este documento se actualiza en cada sesion de trabajo

---

## 2026-03-26 — Sesion 1: Lanzamiento v1.0.0

### Resumen
- App completa con 151 patologias, 12 sistemas, 17 escalas, quiz, protocolos, NANDA-NIC-NOC
- 20 pantallas con diseno hero (fotos + gradientes)
- Sistema premium con trial 15 dias + suscripcion Google Play
- 34 fotos medicas reales de Unsplash
- Documentacion Play Store completa (ficha, privacy policy, IARC, instrucciones)
- AAB generado (45 MB)
- Correcciones de tildes/acentos en toda la app y documentacion
- Quiz dark mode readability fix + mostrar respuesta correcta al fallar

### Commits principales
- `591e0c3` feat: improve splash screen and app icon design
- `9f5e08d` fix: correct missing ñ in legal screens
- `6b22118` fix: add missing accents/tildes across all visible UI text
- `c0bc00b` fix: complete accent/tilde corrections across entire app and docs
- `c4a490c` fix: quiz dark mode readability + show correct answer on wrong
