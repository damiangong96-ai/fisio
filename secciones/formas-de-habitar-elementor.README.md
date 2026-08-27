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
