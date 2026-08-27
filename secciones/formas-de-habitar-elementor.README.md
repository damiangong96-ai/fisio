# Sección "Formas de habitar [Marca]" — plantilla de Elementor

`formas-de-habitar-elementor.json` es una **plantilla de sección de
Elementor** (no HTML suelto): al importarla obtienes una Sección con
Columnas y widgets nativos (Heading, Texto, Imagen, Botón) que se editan
100% visual, desde el panel de Elementor, sin tocar código.

## Cómo importarla

1. En el editor de Elementor, abre el panel de plantillas: icono de carpeta
   ("Añadir plantilla") o **Elementor → Plantillas guardadas → Importar
   plantillas** desde el escritorio de WordPress.
2. Sube el archivo `formas-de-habitar-elementor.json`.
3. Insértala en la página donde quieras la sección (arrástrala o pulsa
   "Insertar").

**Si ya habías insertado una versión anterior de esta sección**: bórrala de
la página (Elementor no actualiza en sitio una sección ya insertada al
volver a importar la plantilla) y vuelve a insertar la nueva importación,
para que se apliquen las correcciones de la v2 descritas abajo.

## v2 — correcciones tras la primera prueba

La primera versión, al importarla, perdía el marco (faltaban los bordes
izquierdo/derecho/inferior) y el tema de WordPress sobrescribía la
tipografía de los botones y algunos títulos (los ponía en mayúsculas y con
subrayado por defecto). Esta versión corrige:

- **Marco completo**: el borde de las 4 caras ahora está en la Columna
  exterior (100% ancho) en vez de en la Sección — la Sección, con
  `layout: boxed`, puede pintar su fondo a todo el ancho del navegador y
  dejar el borde "perdido" fuera de la vista; la Columna, en cambio,
  siempre queda encajada dentro del ancho de caja (1100px), así que su
  borde envuelve exactamente el marco visible en la referencia.
- **Sin mayúsculas/subrayado impuestos por el tema**: cada Heading, Texto y
  Botón fija ahora explícitamente `text-transform: none` y
  `text-decoration: none` (excepto el título principal, que sí lleva
  mayúsculas a propósito), para que no hereden el estilo por defecto de
  encabezados/botones de tu tema.
- **Insignias ovaladas 01/02**: menos relleno vertical y color de fondo/borde
  explícitos también en estado "hover", para que se vean como un óvalo fino
  y no como un botón con subrayado.
- Más aire lateral en el texto de cada tarjeta (padding horizontal mayor)
  para que el párrafo no ocupe todo el ancho de la columna.

Si al importar esta v2 algo sigue sin coincidir (por ejemplo, si tu tema
tiene reglas CSS con `!important` que ganan a los controles de Elementor),
dime exactamente qué elemento y lo afino.

## v3 — subrayado persistente en la insignia 01/02 y en "Explorar este universo"

Tras probarlo en tu WordPress real, la insignia y el enlace del pie seguían
saliendo subrayados aunque el widget *Botón* ya tenía "Decoración de texto:
Ninguna". Causa casi segura: muchos temas de WordPress fijan
`a { text-decoration: underline !important; }` de forma global (por
accesibilidad), y ese `!important` gana siempre a la CSS que genera
Elementor a partir de los controles del panel — no importa qué pongas ahí,
el navegador aplica la regla del tema por encima.

Esta versión añade una clase CSS a cada uno de los dos elementos afectados
(`_css_classes`: `fdh-badge` en la insignia, `fdh-explore` en el enlace del
pie) para poder apuntarles directamente con más especificidad. **Si tras
importar esta v3 el subrayado sigue apareciendo**, pega esto en
**Apariencia → Personalizar → CSS adicional** (o en Elementor Pro →
Configuración del sitio → CSS personalizado):

```css
.fdh-badge a,
.fdh-explore a{
  text-decoration: none !important;
}
```

Esto anula la regla del tema solo para estos dos elementos, sin tocar el
resto de enlaces/botones del sitio.

También se ha afinado la insignia 01/02 para que quede más aplanada (menos
relleno vertical, texto más pequeño) y se acerque más al óvalo fino de la
referencia.

## Qué contiene y cómo editarlo

Estructura (todo dentro de una Sección exterior con el marco de líneas):

- **Fila de título** → widget *Heading*: "FORMAS DE HABITAR [MARCA]".
- **Fila de contenido** → 2 columnas, cada una con:
  - *Botón* usado como insignia ovalada ("01" / "02") — solo texto, sin
    enlace real.
  - *Heading* con el nombre de marca ("[Marca]").
  - *Heading* con el subtítulo en cursiva ("Brands" / "Experiences").
  - *Imagen* — placeholder vacío: haz clic y sube la imagen desde la
    Biblioteca de medios de WordPress.
  - *Texto* — párrafo de cada tarjeta.
- **Fila de pie** → 2 columnas con *Botón* estilo enlace: "Explorar este
  universo →".

Cada elemento se selecciona y edita directamente en el lienzo de
Elementor (contenido, tipografía, color, bordes, espaciados) desde el
panel de la izquierda — no hay HTML ni CSS que tocar.

## Antes de publicar

- Sustituye `[Marca]` por el nombre real (aparece en el título y en cada
  tarjeta).
- Sube las dos imágenes reales en los widgets *Imagen*.
- Ajusta los dos enlaces "Explorar este universo" (widget *Botón* → pestaña
  *Contenido* → *Enlace*) a las páginas de destino reales.
- Los colores/tipografía están ya fijados a los de la referencia (fondo
  crudo `#EFE8DB`, líneas `#35302A`, `Playfair Display` / `Cormorant
  Garamond` + `Inter`); si tu cuenta usa Google Fonts vía Elemento
  necesitarás que esas familias estén disponibles (Elementor las carga
  automáticamente si el sitio tiene salida a Google Fonts activada en
  Ajustes del sitio → Fuentes, opción por defecto).

## Nota sobre compatibilidad

Esta plantilla se ha construido siguiendo el esquema estándar de
exportación/importación de Elementor (`elType`/`widgetType` + controles del
Elementor "free" — Heading, Texto, Imagen, Botón, Sección, Columna — sin
depender de Elementor Pro). No se ha podido probar la importación dentro
de una instalación real de Elementor desde este entorno, así que si algún
control no aparece exactamente como en la referencia al importarla,
dímelo (o ajusta ese valor concreto desde el panel — el resto de la
sección no se ve afectado) y lo corrijo.
