# Fisioterapia Avanzada Sara Vivanco Hurtado — Web

Reconstrucción del sistema visual/interactivo de una demo de clínica de fisioterapia
de tipo VamTam, adaptada al contenido real del negocio.

## Archivo único para WordPress: `wordpress-embed.html`

Además de la versión modular (`index.html` + `css/style.css` + `js/main.js`),
el repositorio incluye **`wordpress-embed.html`**: el mismo sitio con el CSS y
el JS ya incrustados dentro del propio archivo (solo quedan como recursos
externos Google Fonts y GSAP/ScrollTrigger por CDN, que WordPress sí puede
cargar sin problema — a diferencia de este entorno de desarrollo, que tiene
bloqueada la salida a internet). Es la forma más rápida de subirlo:

1. Abre `wordpress-embed.html` y copia **todo el contenido del archivo**.
2. En WordPress, crea una página nueva → edítala con Elementor → añade un
   widget **HTML** que ocupe toda la página (o usa la plantilla "Elementor
   Canvas / En blanco" para que el tema no añada su propio header/footer) →
   pega el contenido completo.
   - Alternativa sin Elementor: usa el bloque nativo **"HTML personalizado"**
     del editor de bloques de WordPress y pega el mismo contenido.
3. Publica la página.

Si prefieres mantener CSS/JS en archivos separados (mejor para cachear y
para reutilizar los estilos en más páginas), usa la Opción A/B con
`index.html` que se explica más abajo, en vez de `wordpress-embed.html`.

## Sobre las fotos que me has pasado en el chat

Me has mostrado dos imágenes (la figura anatómica 3D en carrera, y la foto
de manos aplicando terapia manual sobre una espalda) y el logo/foto de la
primera petición. **Puedo verlas en la conversación, pero esta sesión de
Claude Code no tiene ningún buzón de subida de archivos conectado** — no
hay forma técnica de que yo guarde esos píxeles como un archivo real en el
proyecto. Por eso los huecos de imagen siguen siendo placeholders, aunque
ya están **anotados en el código** (justo encima de cada placeholder en
`wordpress-embed.html` e `index.html`) con el `<img>` exacto a pegar y a
qué imagen tuya corresponde cada uno:

| Placeholder | Corresponde a | Nota |
|---|---|---|
| `ABOUT_IMAGE` (sección "Sobre mí") | Foto de manos haciendo terapia manual sobre la espalda | Encaja perfecto: transmite trato cercano y técnica manual real. |
| `SPORT_IMAGE` (banda "SD Eibar") | Figura 3D anatómica en carrera | Al tener fondo transparente, considera cambiar `object-fit:cover` por `object-fit:contain` (ya indicado en el comentario del código) para que no se recorte la silueta. |
| `HERO_IMAGE` | — (pendiente) | Aún no tengo una foto de retrato profesional tuya/de Sara; sigue como placeholder hasta que la subas. |

**Para que yo mismo pueda dejarlas ya colocadas en el HTML**, la vía más
directa es que subas los dos archivos de imagen (los `.png`/`.jpg`
originales, no una captura del chat) a la carpeta `assets/images/` de este
mismo repositorio de GitHub — puedes hacerlo desde la web de GitHub con
"Add file → Upload files" — y me dices los nombres que les has puesto; en
el siguiente turno los conecto a los placeholders correspondientes.

Si prefieres no tocar GitHub, la otra vía (más simple si ya vas a currar en
WordPress de todas formas) es subirlas directamente a la **Biblioteca de
medios de WordPress** y sustituir tú mismo cada `<div data-placeholder="...">`
por el `<img>` que aparece comentado justo encima en el código.

## ⚠️ Nota importante sobre fidelidad con la referencia

El entorno en el que se generó este proyecto **no tiene acceso de red saliente a
`themes.vamtam.com`** (bloqueado por el proxy de egress del sandbox). Esto significa
que **no ha sido posible inspeccionar pixel a pixel la demo real de Flexora**
(colores hexadecimales exactos, familia tipográfica exacta, curvas de easing exactas,
tiempos exactos de cada animación).

En su lugar, el sitio se ha construido reproduciendo el **sistema de diseño típico
de este tipo de temas premium de clínica/fisioterapia de una sola página**:
header sticky que se encoge y se oculta/reaparece con el scroll, hero editorial a
dos columnas con imagen + forma orgánica decorativa + tarjeta flotante, entradas
animadas por línea de texto, tarjetas con hover 3D-lift, banda oscura de contraste,
contadores animados, slider de testimonios, menú móvil off-canvas, CTA banner con
blob decorativo, etc. — que es el lenguaje visual y de interacción habitual de esa
categoría de tema.

**Diferencias explícitas frente a un clon pixel-perfect:**

| Aspecto | Lo que se ha hecho |
|---|---|
| Colores | Extraídos del logo real proporcionado (verde azulado `#1f7d6f`), no de la demo. |
| Tipografía | `Fraunces` (display serif editorial) + `Plus Jakarta Sans` (texto), como sustituto tipográfico más cercano al estilo "clínica premium". Si tienes las fuentes originales de Flexora (`.woff2`), colócalas en `assets/fonts/` y actualiza el `@font-face` en `css/style.css` — instrucciones abajo. |
| Copys y estructura exacta de secciones | Reconstruidos con contenido real del negocio, no copiados de Flexora. |
| Timings de animación | Valores razonables de la industria (power2/power3 easing, 0.5–1.1s) en vez de los exactos de la demo, que no se pudieron medir. |

Si me facilitas capturas de pantalla o el HTML/CSS exportado de la demo real,
puedo afinar cualquiera de estos puntos para acercarlos aún más.

## Estructura de archivos

```
/index.html          → Toda la maquetación de la página (una sola página)
/css/style.css        → Design tokens, layout, responsive, estados de animación
/js/main.js           → GSAP/ScrollTrigger, menú móvil, slider, formulario, header
/assets/images/       → Coloca aquí tus imágenes reales (ver tabla de abajo)
/assets/fonts/        → Si sustituyes Google Fonts por fuentes propias (.woff2)
/assets/icons/        → Espacio reservado para iconos propios si los necesitas
```

## Imágenes a sustituir

Cada bloque `[data-placeholder="NOMBRE"]` en el HTML es un rectángulo con
rayado verde y una etiqueta de texto. Sustitúyelo por una `<img>` real
manteniendo la clase contenedora (así conservas proporción, `border-radius`,
sombra y animación de scroll):

| Placeholder | Ubicación | Proporción recomendada |
|---|---|---|
| `LOGO.png` / `LOGO_LIGHT.png` | Header y footer | Logo actual (ya en tu material); coloca el PNG del logo (fondo transparente) en `assets/images/`. `LOGO_LIGHT.png` es la versión para el footer oscuro — el CSS ya aplica `filter: invert` si usas el logo normal en PNG con transparencia. |
| `FAVICON.png` | `<head>` | 512×512px, fondo transparente |
| `HERO_IMAGE` | Hero, columna derecha | 1000×1200px (retrato 4:5) |
| `ABOUT_IMAGE` | Sección "Sobre mí" | 800×1000px (4:5) |
| `SPORT_IMAGE` | Banda "SD Eibar" | 4:3, foto de contexto deportivo/clínico |
| `TESTIMONIAL_IMAGE_01/02/03` | Slider de testimonios | Foto de perfil circular, o elimínala y deja el círculo de color |
| `MAP_EMBED` | Sección Contacto | Sustituir el `div` por un `<iframe>` de Google Maps |
| `LOGO_SD_EIBAR`, `LOGO_CERT_0X` | Barra de confianza | Logos reales en PNG/SVG con fondo transparente |

Para reemplazar un placeholder, por ejemplo el hero:

```html
<!-- Antes -->
<div class="hero__image-placeholder" data-placeholder="HERO_IMAGE">...</div>

<!-- Después -->
<img src="assets/images/hero.jpg" alt="Sara Vivanco Hurtado, fisioterapeuta" class="hero__image-placeholder" loading="eager">
```

`object-fit: cover` no está en el placeholder porque es un `div`; al pasar a
`<img>` añade `style="width:100%;height:100%;object-fit:cover"` o esa regla
en el CSS (`.hero__image-placeholder{object-fit:cover}`).

## Datos de contacto pendientes

Busca y sustituye en `index.html` (aparecen varias veces cada uno):

- `[MI TELÉFONO]` y `tel:+34000000000`
- `[MI EMAIL]` y `mailto:info@tudominio.com`
- `[MI DIRECCIÓN]`
- `[MI HORARIO]`
- `[ESLOGAN — completa aquí tu frase de marca]`
- Enlaces `href="#"` de redes sociales (Instagram, Facebook, LinkedIn)
- Los tres contadores de la sección "Sobre mí" (`data-count="0"`): cambia el
  `0` por tu cifra real (p. ej. `data-count="8"`) y el texto entre corchetes
  del `<span class="stat__label">`. Con `0` el contador no se anima (queda
  en placeholder a propósito, para no inventar cifras).
- Los tres testimonios (texto y nombre entre corchetes).

## Tipografías: sustituir por archivos propios

Si obtienes los `.woff2` originales de Flexora (o prefieres tus propias
fuentes de marca), colócalos en `assets/fonts/` y sustituye el `<link>` de
Google Fonts en `index.html` por, en `css/style.css`:

```css
@font-face{
  font-family:'MiFuenteDisplay';
  src:url('../assets/fonts/mi-fuente-display.woff2') format('woff2');
  font-weight:400 700; font-display:swap;
}
```

y actualiza `--font-display` / `--font-body` en `:root` (arriba del todo de
`style.css`).

---

## Integración en WordPress + Elementor Pro

Esta web es HTML/CSS/JS puro, sin build step, pensada para poder trocearse
en Elementor:

### Opción A — Página HTML completa (más simple)

1. Sube la carpeta `assets/`, `css/` y `js/` a tu tema hijo (o a
   `/wp-content/uploads/fisioterapia-avanzada/` vía FTP/gestor de archivos).
2. Crea una página nueva en WordPress, pon el **Elementor → Editar con
   Elementor**, añade un widget **HTML** y pega el contenido de `<body>…</body>`
   de `index.html` (todo lo que hay entre esas etiquetas).
3. En **Elementor Pro → Configuración del sitio → Código personalizado**
   (o el widget **HTML** de nuevo, o `Insert Headers and Footers`), añade:
   - En `<head>`: el `<link>` de Google Fonts y el `<link rel="stylesheet" href=".../css/style.css">`.
   - Antes de `</body>`: los `<script>` de GSAP/ScrollTrigger (CDN, tal cual
     están en `index.html`) y `<script src=".../js/main.js"></script>`.
4. Desactiva en Elementor cualquier "contenedor" con padding/margen por
   defecto en esa página para que no interfiera con el CSS propio (usa la
   plantilla "En blanco / Elementor Canvas").

### Opción B — Trasladar sección a sección a widgets de Elementor

Si prefieres widgets nativos de Elementor (para poder editar visualmente
textos e imágenes sin tocar código):

- **Header/menú** → Elementor Pro **Theme Builder → Header**, usando el
  widget **Nav Menu** + **Site Logo**; copia las clases CSS
  (`main-nav__link`, etc.) en el campo "Clases CSS adicionales" de cada
  widget para heredar el estilo de `style.css`, o pega los estilos
  correspondientes en el **CSS personalizado** del widget/sección.
- **Hero, Sobre mí, Servicios, Enfoque, Testimonios, CTA, Contacto** →
  una **Sección/Contenedor** de Elementor por cada `<section>` del HTML,
  respetando el mismo `id` (Elementor permite asignar un "ID CSS" a la
  sección — usa `inicio`, `sobre-mi`, `servicios`, `enfoque`, `testimonios`,
  `contacto` para que el menú siga funcionando).
- **CSS**: pega el contenido completo de `css/style.css` en
  **Elementor Pro → Configuración del sitio → Código personalizado → CSS
  personalizado** (o en el **Personalizador de WordPress → CSS adicional**).
- **JS**: pega `js/main.js` en un plugin de fragmentos de código como
  **WPCode** o **Code Snippets**, como snippet de tipo "JS" en el `footer`,
  o en **Elementor Pro → Código personalizado** eligiendo "Antes de
  `</body>`". Asegúrate de cargar también GSAP y ScrollTrigger por CDN
  antes de `main.js` (los `<script src="https://cdnjs.cloudflare.com/...">`
  de `index.html`).
- **Formulario de contacto**: el HTML incluido es solo validación de
  cliente sin backend. Sustitúyelo por el widget **Elementor Pro Form**
  (con la acción "Enviar por email" o el integrador que uses — Mailchimp,
  CRM, etc.) y aplícale las clases `contact-form`, `contact-form__field`,
  etc. para que mantenga el estilo, o simplemente déjalo con el diseño por
  defecto de Elementor Pro Forms.

### Si algo requiere `functions.php`

Nada en este proyecto lo requiere de forma estricta: es HTML/CSS/JS
autocontenido. La única situación en la que tocarías `functions.php` (o,
mejor, un plugin de fragmentos de código en vez de editar el tema
directamente) sería si quieres **encolar `style.css` y `main.js` de forma
"correcta" según los estándares de WordPress** en lugar de pegarlos en los
campos de código personalizado de Elementor:

```php
// En functions.php de un tema hijo, o en un plugin de snippets
function fisioterapia_avanzada_assets() {
    wp_enqueue_style('fa-style', get_stylesheet_directory_uri() . '/fisioterapia/css/style.css', [], '1.0');
    wp_enqueue_script('gsap', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js', [], '3.12.5', true);
    wp_enqueue_script('gsap-st', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js', ['gsap'], '3.12.5', true);
    wp_enqueue_script('fa-main', get_stylesheet_directory_uri() . '/fisioterapia/js/main.js', ['gsap-st'], '1.0', true);
}
add_action('wp_enqueue_scripts', 'fisioterapia_avanzada_assets');
```

Esto es opcional — la Opción A/B de arriba funciona sin tocar `functions.php`.

---

## Checklist funcional

- [x] Header sticky: se encoge y añade sombra al pasar 40px de scroll; se
  oculta al bajar y reaparece al subir (a partir de 220px).
- [x] Menú de escritorio con subrayado animado en hover/activo.
- [x] Menú móvil (`< 768px`): hamburguesa → panel off-canvas desde la
  derecha, con backdrop, bloqueo de scroll del body y enlaces con
  entrada escalonada.
- [x] Hero: timeline de entrada (eyebrow → líneas del título → slogan →
  texto → botones → imagen → tarjeta flotante), blob decorativo con
  animación continua, scroll cue con "latido".
- [x] Scroll reveals con GSAP ScrollTrigger en todas las secciones
  (`.js-reveal` individual, `.js-reveal-stagger` en grupo para
  tarjetas de servicios/proceso).
- [x] Parallax sutil en imagen de hero/about/split-feature vía
  `ScrollTrigger` con `scrub`.
- [x] Contadores animados (placeholder en `0`, listos para activarse al
  introducir cifras reales).
- [x] Slider de testimonios: flechas, puntos, autoplay con pausa en hover,
  swipe táctil.
- [x] Hover en tarjetas de servicio (elevación + icono invertido), en
  botones (elevación + sombra), en enlaces de navegación.
- [x] Formulario de contacto con validación de cliente (campos
  obligatorios + formato de email) y mensaje de confirmación.
- [x] Botón "volver arriba" que aparece tras 600px de scroll.
- [x] Responsive completo en desktop / tablet (`≤1024px`) / móvil
  (`≤768px`): cambia a una columna, reordena la imagen de la banda
  "SD Eibar", oculta el menú de escritorio y el teléfono de cabecera,
  apila botones y formulario.
- [x] `prefers-reduced-motion: reduce` respetado (desactiva
  animaciones/parallax/scroll suave).
- [x] Sin errores de JavaScript: todo el código está envuelto en un
  único IIFE con comprobaciones de existencia de `gsap`/`ScrollTrigger`
  antes de usarlos (degrada con gracia si el CDN no carga).
- [x] Todas las imágenes son bloques `[data-placeholder]` fácilmente
  sustituibles sin romper el diseño (proporción/`border-radius`/sombra
  ya definidos en CSS sobre el contenedor, no sobre la imagen).
- [x] Tipografía centralizada en dos variables CSS (`--font-display`,
  `--font-body`) fácilmente sustituibles.

## Rendimiento

- Sin frameworks ni librerías más allá de GSAP + ScrollTrigger (CDN, ~70KB
  gzip combinadas), cargadas al final del `<body>`.
- `requestAnimationFrame` en el listener de scroll del header para evitar
  jank.
- `backdrop-filter` con fallback (si el navegador no lo soporta, el header
  simplemente pierde el desenfoque, no rompe el layout).
- Placeholders de imagen sin peso (CSS puro); al añadir imágenes reales,
  usa `loading="lazy"` en todo `<img>` que no esté en el primer viewport
  (el hero puede ir con `loading="eager"`).
