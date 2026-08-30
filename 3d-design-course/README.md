# 3D Design Course — Landing Page

Reconstrucción en HTML/CSS de la landing de Figma **"3D Design Course
Website (Community)"**, hecha leyendo directamente el archivo con el
conector MCP de Figma (texto, colores, tipografías y layout reales de las
7 secciones), no a partir de una captura.

## Archivos

- `index.html` — versión de desarrollo/preview.
- `wordpress-embed.html` — mismo contenido, pensado para pegar tal cual en
  WordPress (ver más abajo). Ahora mismo son idénticos porque todo el
  CSS ya está incrustado en un único `<style>` — no hay archivos `.css`/`.js`
  externos que enlazar.

## Subir a WordPress

1. Abre `wordpress-embed.html` y copia **todo el contenido del archivo**.
2. En WordPress, crea una página nueva:
   - Con Elementor: añade un widget **HTML** que ocupe toda la página (o
     usa la plantilla "Elementor Canvas / En blanco" para que el tema no
     añada su propio header/footer) → pega el contenido completo.
   - Sin Elementor: usa el bloque nativo **"HTML personalizado"** del
     editor de bloques y pega el mismo contenido.
3. Publica la página.

## Pendiente / aproximado

- **Fotos**: todas las imágenes son placeholders a cuadros (`.img-placeholder`).
  Justo encima de cada uno hay un `<img>` comentado con la ruta esperada
  (`assets/...`) — sustituye el `div` por ese `<img>` apuntando a la imagen
  real (subida a la Biblioteca de medios de WordPress o al repo).
- **Verde lima** (`--lime: #d6ff5a`): aproximado visualmente de las capturas
  de Figma; el archivo no tiene una variable de color definida para ese
  relleno. Si tienes el hex exacto, se cambia en una línea (`:root` al
  principio del `<style>`).
- **Tipografía de titulares**: el diseño usa "Nulshock Bold" (fuente de
  pago, no disponible en Google Fonts). Se sustituye por **Anton** (misma
  familia visual: sans condensada muy bold, mayúsculas). Con el archivo de
  la fuente real se puede autohospedar vía `@font-face` para un calce
  exacto — cambia `--font-display` en `:root`.
- **Formas orgánicas** (el corte diagonal de los fondos negros, las
  muescas de las tarjetas "FULL TIME" / precios): simplificadas a
  rectángulos redondeados con tarjetas superpuestas en vez del path
  vectorial exacto de Figma. Visualmente muy cercano, no pixel-perfect.
- Los iconos (carrito, casa, persona, cámara, etc.) son SVG genéricos
  equivalentes, no los assets exactos de Figma (esos son SVGs propios del
  archivo que no se pudieron descargar por la política de red de este
  entorno de desarrollo — en un entorno con salida a internet normal sí
  se podrían traer literalmente).
