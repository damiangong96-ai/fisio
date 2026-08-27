# Sección "Formas de habitar [Marca]" — plantilla de Elementor

`formas-de-habitar-elementor.json` es una **plantilla de Sección de
Elementor**: al importarla se inserta como una Sección real (se ve, se
mueve y se coloca como cualquier otra sección de la página, con su propio
panel de ajustes de Sección/Columna), pero por dentro usa un widget
**HTML** con el diseño exacto, protegido con reglas CSS reforzadas
(`!important`) para que el tema de WordPress no le imponga mayúsculas,
subrayados u otra tipografía — esto es justo lo que fallaba en las
versiones anteriores hechas con widgets nativos (Heading/Botón/Columna),
que dependían de que Elementor y el tema no chocaran.

## Por qué el cambio de enfoque

Las dos primeras versiones (widgets nativos: Heading, Botón con bordes
redondeados, Columnas con borde) tenían un problema de fondo: yo no puedo
probarlas dentro de un Elementor/tema real antes de dártelas, y el tema de
tu WordPress estaba ganando la partida a los controles del panel —
imponiendo subrayado en enlaces y mayúsculas en textos con reglas CSS más
fuertes que las que genera Elementor desde el panel.

Esta versión sí la he podido verificar yo mismo: rendericé el HTML/CSS
exacto contra una hoja de estilos "hostil" simulada (mayúsculas y
subrayado forzados por todas partes, como hace tu tema) y comprobé que el
diseño se mantiene intacto — óvalos, mayúsculas solo donde toca, sin
subrayados, marco completo por las 4 caras. Ya no hace falta que pegues
ningún CSS adicional en Personalizar.

## Cómo importarla

1. Si ya habías insertado una versión anterior de esta sección en la
   página, bórrala primero.
2. En el editor de Elementor, abre el panel de plantillas: icono de
   carpeta ("Añadir plantilla") o **Elementor → Plantillas guardadas →
   Importar plantillas** desde el escritorio de WordPress.
3. Sube `formas-de-habitar-elementor.json`.
4. Insértala en la página donde quieras la sección.

## Qué es editable y cómo

- **Sección/Columna** (posición, fondo, ancho, márgenes) → panel visual de
  Elementor, como cualquier otra sección.
- **Contenido interno** (textos, marca, párrafos, enlaces, imágenes) → haz
  doble clic sobre el widget HTML dentro de Elementor para abrir su editor
  de código, o edítalo aquí mismo antes de importar:
  - Sustituye `[Marca]` (aparece 3 veces: título y las dos tarjetas).
  - Los dos párrafos de cada tarjeta.
  - Los dos `href="#"` de "Explorar este universo" → cámbialos por la URL
    real de cada página.
  - Las imágenes: busca los dos `data-placeholder="IMAGEN_TARJETA_1/2"` y
    sustituye ese `<div>` por un `<img src="..." class="fdh-card__img"
    alt="...">` con la URL que te dé la Biblioteca de medios de WordPress
    al subir la imagen (clic derecho sobre la imagen ya subida → "Copiar
    URL del enlace").
- **Colores/tipografía** → variables al principio del `<style>`
  (`--fdh-bg`, `--fdh-ink`, `--fdh-border`, las tres `--fdh-font-*`).
  Cambia solo esas líneas, no hace falta tocar el resto del CSS.

## v5 — estructura real: franja de título a todo lo ancho + marco de tarjetas más estrecho

A partir de las capturas de la referencia real (Figma), la estructura no es
una única caja cerrada por las 4 caras como monté en v1-v4. Es en realidad
**dos bloques separados**:

1. **Franja del título** ("Formas de habitar [Marca]"): ocupa **todo el
   ancho de la ventana**, de borde a borde, con línea horizontal arriba y
   abajo — sin bordes laterales. Esta franja usa una técnica CSS de
   "ruptura de contenedor" (`width:100vw` + margen negativo) para salirse
   del ancho del widget aunque la sección de Elementor esté en modo
   "boxed" — lo verifiqué renderizando el bloque dentro de un contenedor
   más estrecho simulado y confirmando que la franja sí llega a los bordes
   reales de la ventana.
2. **Marco de tarjetas** (01/02 + pie "Explorar este universo"): un bloque
   más estrecho y centrado (~1024px, la misma medida que me diste desde el
   panel de Inspeccionar de Figma), con bordes izquierdo, derecho e
   inferior — pero **sin borde superior propio**, porque esa línea ya la
   pone el borde inferior de la franja del título justo encima, y así no
   queda una línea doblada.

La sección de Elementor pasa a modo **"Ancho completo" (`full_width`)**
para que la franja del título tenga sitio de sobra donde estirarse; el
marco de tarjetas se autolimita a los ~1024px por su propio CSS
(`max-width`), así que no se ve afectado por el cambio de modo de la
sección.

## Nota sobre Google Fonts

El diseño usa `Cormorant Garamond`, `Playfair Display` e `Inter`. Si tu
sitio ya carga Google Fonts (lo más habitual), se verán automáticamente.
Si tu WordPress bloquea Google Fonts, sustituye esas tres variables por
fuentes ya instaladas en tu tema.
