# Blomstra — Home

Reconstrucción en HTML/CSS de la página de inicio de Figma
**WEBSIDE_BLOMSTRA** (nodo `204:3`, "desktop_home_page"), leída
directamente con el conector MCP de Figma: texto, colores exactos y
estructura reales de las 14 secciones.

## Archivos

- `index.html` — versión de desarrollo/preview de la home completa.
- `wordpress-embed.html` — mismo contenido, para pegar en WordPress (ver
  más abajo). Por ahora son idénticos: todo el CSS está en un único
  `<style>`, sin archivos externos.
- `como-trabajamos.html` — primera versión (solo esa sección), hecha antes
  de tener acceso al archivo de Figma. La sección ya está integrada dentro
  de `index.html` con los datos reales; este archivo queda como referencia
  del primer intento.

## Subir a WordPress

1. Copia todo el contenido de `wordpress-embed.html`.
2. Página nueva en WordPress → widget **HTML** de Elementor a pantalla
   completa (o plantilla "Elementor Canvas / En blanco"), o bloque nativo
   **"HTML personalizado"** → pega el contenido.
3. Publica.

## Pendiente / aproximado

- **Fotos**: todas son placeholders a cuadros. Cada uno tiene, justo
  encima, un `<img>` comentado con la ruta esperada (`assets/images/...`)
  — sustitúyelo por el `<img>` real (foto subida a la Biblioteca de
  medios de WordPress o al repo).
- **Tipografía "Aspire Pasque"** (Serif + Script): es una fuente de pago,
  no está en Google Fonts. Se sustituye por **Cormorant Garamond**
  (títulos) y **Petit Formal Script** (los fragmentos manuscritos/cursivos
  como "Romantiza tu vida" o "Meet the founder"). Con el archivo de la
  fuente real se autohospeda vía `@font-face` — cambia `--font-serif` /
  `--font-script` en `:root`.
- **Logotipo "Blomstra"**: en Figma es un SVG vectorial con un rizo
  decorativo en la "B" que no se pudo descargar (política de red de este
  entorno de desarrollo). Aquí es texto real con la tipografía de
  sustitución — visualmente cercano, no el trazo exacto.
- **Collages de fotos** (sección "Todo empieza aquí", "Nuestro universo de
  bodas"): en Figma están rotadas y superpuestas tipo moodboard; aquí se
  simplifican a grids limpios con las mismas fotos y etiquetas.
- Colores exactos tomados del archivo (variables `hex` reales, no
  aproximados): `--cream #f0ead7`, `--offwhite-1 #efe9e1`,
  `--offwhite-2 #fcf9f5`, `--taupe #d2c9bd`, `--brown #827560`,
  `--ink #32281b`.
