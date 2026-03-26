# Instrucciones para publicar en Google Play

## Paso 1: Crear cuenta de desarrollador

1. Ir a https://play.google.com/console
2. Pagar $25 USD (una sola vez)
3. Completar datos del desarrollador

## Paso 2: Crear la app

1. **Todas las apps > Crear app**
2. Nombre: `Patologias de Enfermeria`
3. Idioma: Español (Latinoamerica)
4. App o juego: App
5. Gratuita o de pago: Gratuita (con compras en la app)

## Paso 3: Ficha de Play Store

### Textos
- Copiar titulo, descripcion corta y completa desde `ficha_play_store.md`

### Imagenes requeridas
| Asset | Tamaño | Archivo |
|-------|--------|---------|
| Icono | 512x512 PNG | Exportar `icon_512x512.svg` a PNG |
| Feature graphic | 1024x500 PNG | Exportar `feature_graphic_1024x500.svg` a PNG |
| Capturas de pantalla | Min 2, recomendado 4-8 | Tomar del emulador o dispositivo |

### Como exportar SVG a PNG
Opcion 1 — Online: https://svgtopng.com/
Opcion 2 — Inkscape (gratis): Abrir SVG > Exportar como PNG
Opcion 3 — Figma: Importar SVG > Exportar @1x PNG

### Capturas de pantalla recomendadas (tomar del dispositivo)
1. HomeScreen con el header violeta y patologia del dia
2. Lista de patologias dentro de un sistema (ej: Cardiovascular)
3. Detalle de una patologia con secciones NANDA
4. Escalas clinicas con las cards de fotos
5. Quiz en progreso
6. Herramientas con el grid de fotos
7. Modo oscuro
8. Pantalla Premium con features

## Paso 4: Clasificacion de contenido

1. Ir a **Politica de la app > Clasificacion de contenido**
2. Completar el cuestionario con las respuestas de `clasificacion_contenido_IARC.md`
3. Resultado esperado: **Todos** (PEGI 3)

## Paso 5: Politica de privacidad

1. Subir `privacy_policy.html` a GitHub Pages, Netlify, o cualquier hosting
2. Copiar la URL publica
3. Pegarla en **Politica de la app > Politica de privacidad**
4. Opcion rapida con GitHub Pages:
   - Crear repo `patologiasenfermeria.github.io`
   - Subir `privacy_policy.html` como `index.html` en carpeta `/privacy/`
   - URL: `https://patologiasenfermeria.github.io/privacy/`

## Paso 6: Configurar suscripcion

1. Ir a **Monetizacion > Productos > Suscripciones**
2. Crear suscripcion:
   - **ID del producto**: `patologias_premium_monthly`
   - **Nombre**: Premium Mensual
   - **Descripcion**: Acceso completo a todas las patologias y herramientas
3. Agregar plan base:
   - **Periodo de facturacion**: 1 mes
   - **Precio**: USD $4.99 (o el precio que elijas)
   - **Prueba gratuita**: 15 dias
   - **Periodo de gracia**: 3 dias

## Paso 7: Subir el AAB

1. Ir a **Publicacion > Produccion**
2. Crear nueva version
3. Subir el archivo: `android/app/build/outputs/bundle/freeRelease/app-free-release.aab`
4. Agregar notas de la version (copiar de `ficha_play_store.md` > Novedades)
5. Revisar y publicar

## Paso 8: Declaraciones adicionales

### Declaracion de app medica/de salud
Google puede pedir que declares que la app:
- No es un dispositivo medico
- No reemplaza consulta profesional
- Es material educativo de referencia

Usar el texto de `clasificacion_contenido_IARC.md` > Declaracion adicional

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
- [ ] Ficha completa (titulo, descripcion, capturas, icono, feature graphic)
- [ ] Clasificacion de contenido completada
- [ ] Politica de privacidad publicada y URL configurada
- [ ] Suscripcion `patologias_premium_monthly` creada con precio y trial
- [ ] AAB subido
- [ ] Notas de version agregadas
- [ ] Declaracion de app medica completada
- [ ] Data Safety form completado
- [ ] Paises de distribucion seleccionados (todos o especificos)
- [ ] Revision enviada

## Tiempo estimado de revision

Google tarda entre **1-7 dias** en revisar la primera version.
Si la rechazan, revisa el email con las razones y corrige.

## Archivos generados

```
playstore/
├── ficha_play_store.md          — Textos de la ficha
├── privacy_policy.html          — Politica de privacidad (subir a hosting)
├── clasificacion_contenido_IARC.md — Respuestas para formulario IARC
├── icon_512x512.svg             — Icono (exportar a PNG)
├── feature_graphic_1024x500.svg — Grafico promocional (exportar a PNG)
└── INSTRUCCIONES_PUBLICACION.md — Este archivo
```

```
android/app/build/outputs/bundle/freeRelease/
└── app-free-release.aab         — Bundle para subir a Play Store (45 MB)
```
