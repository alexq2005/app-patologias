# Instrucciones para publicar en Google Play

## Paso 1: Crear cuenta de desarrollador

1. Ir a https://play.google.com/console
2. Pagar $25 USD (una sola vez)
3. Completar datos del desarrollador

## Paso 2: Crear la app

1. **Todas las apps > Crear app**
2. Nombre: `Patologías de Enfermería`
3. Idioma: Español (Latinoamérica)
4. App o juego: App
5. Gratuita o de pago: Gratuita (con compras en la app)

## Paso 3: Ficha de Play Store

### Textos
- Copiar título, descripción corta y completa desde `ficha_play_store.md`

### Imágenes requeridas
| Asset | Tamaño | Archivo |
|-------|--------|---------|
| Ícono | 512x512 PNG | Exportar `icon_512x512.svg` a PNG |
| Feature graphic | 1024x500 PNG | Exportar `feature_graphic_1024x500.svg` a PNG |
| Capturas de pantalla | Mín 2, recomendado 4-8 | Tomar del emulador o dispositivo |

### Cómo exportar SVG a PNG
Opción 1 — Online: https://svgtopng.com/
Opción 2 — Inkscape (gratis): Abrir SVG > Exportar como PNG
Opción 3 — Figma: Importar SVG > Exportar @1x PNG

### Capturas de pantalla recomendadas (tomar del dispositivo)
1. HomeScreen con el header violeta y patología del día
2. Lista de patologías dentro de un sistema (ej: Cardiovascular)
3. Detalle de una patología con secciones NANDA
4. Escalas clínicas con las cards de fotos
5. Quiz en progreso
6. Herramientas con el grid de fotos
7. Modo oscuro
8. Pantalla Premium con features

## Paso 4: Clasificación de contenido

1. Ir a **Política de la app > Clasificación de contenido**
2. Completar el cuestionario con las respuestas de `clasificacion_contenido_IARC.md`
3. Resultado esperado: **Todos** (PEGI 3)

## Paso 5: Política de privacidad

1. Subir `privacy_policy.html` a GitHub Pages, Netlify, o cualquier hosting
2. Copiar la URL pública
3. Pegarla en **Política de la app > Política de privacidad**
4. Opción rápida con GitHub Pages:
   - Crear repo `patologiasenfermeria.github.io`
   - Subir `privacy_policy.html` como `index.html` en carpeta `/privacy/`
   - URL: `https://patologiasenfermeria.github.io/privacy/`

## Paso 6: Configurar suscripción

1. Ir a **Monetización > Productos > Suscripciones**
2. Crear suscripción:
   - **ID del producto**: `patologias_premium_monthly`
   - **Nombre**: Premium Mensual
   - **Descripción**: Acceso completo a todas las patologías y herramientas
3. Agregar plan base:
   - **Período de facturación**: 1 mes
   - **Precio**: USD $4.99 (o el precio que elijas)
   - **Prueba gratuita**: 15 días
   - **Período de gracia**: 3 días

## Paso 7: Subir el AAB

1. Ir a **Publicación > Producción**
2. Crear nueva versión
3. Subir el archivo: `android/app/build/outputs/bundle/freeRelease/app-free-release.aab`
4. Agregar notas de la versión (copiar de `ficha_play_store.md` > Novedades)
5. Revisar y publicar

## Paso 8: Declaraciones adicionales

### Declaración de app médica/de salud
Google puede pedir que declares que la app:
- No es un dispositivo médico
- No reemplaza consulta profesional
- Es material educativo de referencia

Usar el texto de `clasificacion_contenido_IARC.md` > Declaración adicional

### Anuncios
Marcar: **La app NO contiene anuncios**

### Datos de seguridad (Data Safety)
Completar formulario indicando:
- No se recopilan datos de usuario
- No se comparten datos con terceros
- Los datos se almacenan localmente
- Los datos se pueden eliminar (Settings > Borrar datos)

## Paso 9: Checklist final

- [ ] Cuenta de desarrollador creada y verificada
- [ ] Ficha completa (título, descripción, capturas, ícono, feature graphic)
- [ ] Clasificación de contenido completada
- [ ] Política de privacidad publicada y URL configurada
- [ ] Suscripción `patologias_premium_monthly` creada con precio y trial
- [ ] AAB subido
- [ ] Notas de versión agregadas
- [ ] Declaración de app médica completada
- [ ] Data Safety form completado
- [ ] Países de distribución seleccionados (todos o específicos)
- [ ] Revisión enviada

## Tiempo estimado de revisión

Google tarda entre **1-7 días** en revisar la primera versión.
Si la rechazan, revisa el email con las razones y corrige.

## Archivos generados

```
playstore/
├── ficha_play_store.md          — Textos de la ficha
├── privacy_policy.html          — Política de privacidad (subir a hosting)
├── clasificacion_contenido_IARC.md — Respuestas para formulario IARC
├── icon_512x512.svg             — Ícono (exportar a PNG)
├── feature_graphic_1024x500.svg — Gráfico promocional (exportar a PNG)
└── INSTRUCCIONES_PUBLICACION.md — Este archivo
```

```
android/app/build/outputs/bundle/freeRelease/
└── app-free-release.aab         — Bundle para subir a Play Store (45 MB)
```
