# Fisioterapia Avanzada Sara Vivanco Hurtado — Web

Reconstrucción del sistema visual/interactivo de una demo de clínica de fisioterapia
de tipo VamTam, adaptada al contenido real del negocio.

## Tipografía actual: Instrument Serif + Inter

A partir de una captura que me pasó el cliente de una web de referencia
("Barre Studio · Collado Villalba" — titular serif con línea de acento en
cursiva, etiquetas y botones en mayúsculas con tracking amplio), se sustituyó
la pareja tipográfica original (Fraunces + Plus Jakarta Sans) por:

- **`Instrument Serif`** (títulos, cifras destacadas, cita de testimonios) —
  solo existe en peso 400 normal/cursiva, por eso `h1–h4` usan
  `font-weight:400` (evita la negrita sintética del navegador).
- **`Inter`** (texto de cuerpo, navegación, formularios).
- Los botones y la etiqueta "eyebrow" pasan a mayúsculas con letter-spacing
  amplio (`.btn`, `.eyebrow`), y la última línea del titular del hero usa la
  clase `.title-accent` (cursiva, peso normal) para imitar el contraste
  "texto recto + cursiva de acento" de la referencia.

Se cambia editando `--font-display` / `--font-body` en `:root` (arriba del
todo de `css/style.css`) y el `<link>` de Google Fonts en el `<head>`. Si
identificas el nombre exacto de la fuente de otra referencia (inspector del
navegador → `font-family` calculada, o el `<link>` a Google/Adobe Fonts en su
`<head>`), dímelo y la cambio directamente.

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

## Fotos reales, ya conectadas

Subiste las imágenes a la carpeta raíz de la otra rama del repo
(`claude/rebuild-flexora-vamtam-ow3aq8`) en vez de a `assets/images/` en
esta rama; las he traído desde ahí, procesado y conectado en el sitio:

| Archivo | Origen (nombre subido) | Uso |
|---|---|---|
| `assets/images/LOGO.png` | `7754f7d3-...jpeg` | Logotipo completo. Era JPEG con fondo blanco sólido — le he quitado el fondo por software (blanco → transparente) para que funcione también en el footer oscuro con el filtro de inversión. |
| `assets/images/FAVICON.png` | `IMG_5909.png` | Icono/monograma S+H, ya venía con transparencia real; solo lo he reescalado. |
| `assets/images/hero.jpg` | `8684ed32-...jpeg` | Tu retrato con la equipación de la SD Eibar — hero. |
| `assets/images/terapia-manual.jpg` | `8e4606a2...jpg` | Manos en terapia manual sobre la espalda — sección "Sobre mí". |
| `assets/images/readaptacion-esfuerzo.png` | `Man.png` | Figura 3D anatómica en carrera (transparente) — banda "SD Eibar", con `object-fit:contain`. |

Además subiste otras tres fotos de manos/fisioterapia
(`448e8db3...jpg`, `56fc2f93...jpg`, `c78d3f11...jpg`) que no estaban en la
lista original de 5. Siguiendo tu instrucción de usar las fotos "para
banners o categorías como en la web de ejemplo", las he puesto como foto de
cabecera de 3 de las 4 tarjetas de la nueva sección **Tarifas**
(`assets/images/categoria-deportiva.jpg`, `categoria-rehabilitacion.jpg`,
`categoria-presoterapia.jpg`), a modo de banner de categoría estilo
Flexora. Si prefieres otro criterio de asignación o quitarlas, dímelo.

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
| Tipografía | `Instrument Serif` (títulos/acento cursiva) + `Inter` (texto), ver nota al principio de este README. Si tienes las fuentes originales de Flexora (`.woff2`), colócalas en `assets/fonts/` y actualiza el `@font-face` en `css/style.css` — instrucciones abajo. |
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

## Placeholders de imagen que quedan

Logo, favicon, hero, "Sobre mí", banda "SD Eibar" y el mapa de Contacto ya
son imágenes/`<iframe>` reales (ver sección anterior). Solo quedan estos
bloques `[data-placeholder="NOMBRE"]` (rectángulo con rayado verde) por si
algún día tienes ese material:

| Placeholder | Ubicación | Notas |
|---|---|---|
| `TESTIMONIAL_IMAGE_01/02/03` | Slider de testimonios | Foto de perfil circular, o elimínala y deja el círculo de color — de momento son testimonios de ejemplo, no reseñas reales. |
| `LOGO_SD_EIBAR`, `LOGO_CERT_0X` | Barra de confianza | Opcional: ahora mismo son texto, no imagen, y ya se ven bien así. |

Para sustituir uno, cambia el `<div data-placeholder="...">` por un `<img>`
manteniendo la misma clase contenedora (conserva proporción, `border-radius`
y sombra) y añade `style="width:100%;height:100%;object-fit:cover"`.

## Estado del contenido

Ya están puestos con datos reales (extraídos de la "Guía de atención al
usuario" que me pasaste y de tu mensaje sobre tu trayectoria):
dirección, horario, tarifas completas (nueva sección **Tarifas**,
`#tarifas`), equipamiento técnico y del gimnasio terapéutico (nueva sección
**Equipamiento**), colegiada nº 4986, biografía completa, eslogan y aviso
de normas de cita en el bloque de Contacto.

## Datos de contacto

Teléfono real: `634 68 90 03` (`tel:+34634689003`), ya puesto en cabecera,
barra superior, menú móvil, contacto y pie de página.

Email: **`info@fisioterapiasaravivanco.com` es un ejemplo/placeholder** (me
pediste uno de muestra) — no es una cuenta real, así que sustitúyelo por tu
dirección de verdad en cuanto la tengas (busca y reemplaza en `index.html`
y `wordpress-embed.html`, aparece 3 veces cada uno más el `mailto:`).

Pendiente:

- Enlaces `href="#"` de redes sociales (Instagram, Facebook, LinkedIn), si
  el centro tiene perfiles activos.
- Los tres testimonios (texto y nombre entre corchetes) — son un ejemplo de
  maquetación, sustitúyelos por reseñas reales de pacientes cuando las
  tengas (no se han inventado citas para no publicar opiniones falsas).

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
en Elementor.

### Ancho completo y sin choques de estilo con el tema: `#fa-site`

Todo el contenido va envuelto en `<div id="fa-site">…</div>` y **todo** el
CSS de `css/style.css` está anclado a ese selector (`#fa-site .lo-que-sea`
en vez de `.lo-que-sea` a secas). Esto soluciona dos problemas típicos al
pegar una página HTML completa dentro de una página normal de WordPress
(sin plantilla en blanco):

1. **El sitio no ocupa el ancho completo** — el tema mete el contenido en un
   contenedor centrado y más estrecho (p. ej. 900–1200px). `#fa-site` se
   "rompe" fuera de ese contenedor con un margen negativo calculado
   (`calc(-50vw + 50%)`), así que siempre ocupa el ancho completo del
   navegador aunque esté anidado dentro del contenedor del tema.
2. **Textos que se parten raro (el teléfono en varias líneas, el menú
   partido en dos líneas...)** — pasaba porque el CSS del propio tema
   (tamaños de letra, `a`, `ul`, `button`, etc.) pisaba al nuestro. Al
   anclar cada regla a `#fa-site`, nuestro CSS gana casi siempre esa pugna
   de especificidad frente al del tema.

**No borres el `<div id="fa-site">` ni le cambies el `id`** al pegar el
código — es lo que hace que funcione igual de bien dentro de una página
normal de WordPress que si lo cuelgas como archivo suelto. Esto ya viene
así en `wordpress-embed.html` / `wordpress-embed-standalone.html`; no hace
falta tocar nada al pegarlo, ni usar obligatoriamente la plantilla en
blanco de Elementor (aunque si la usas, mejor: evitas también el
header/footer duplicado del tema).

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
- [x] Bloque de credenciales en "Sobre mí" (colegiada nº 4986, SD Eibar,
  ecografía/invasiva/BFR) en vez de contadores numéricos, para no inventar
  cifras de años de experiencia o pacientes que no me has dado.
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
