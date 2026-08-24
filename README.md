# Fisioterapia Avanzada · Sara Vivanco Hurtado — Web

Web de una sola página para el centro de fisioterapia, con el sistema visual
inspirado en la plantilla Webflow **["Healen"](https://healen.webflow.io/home-01)**
(categoría bienestar/salud): paleta cálida y calmada, formas orgánicas,
botones "píldora", mucho aire entre secciones y revelados de scroll suaves.
El color de marca es el verde azulado real del logotipo (`#1f7d6f`), y todo
el contenido (servicios, tarifas, horario, dirección, equipamiento) está
tomado del documento oficial *Guía de atención al usuario* del centro.

## ⚠️ Sobre la inspiración en Healen

El entorno en el que se generó este proyecto **bloquea por política de red
saliente tanto `healen.webflow.io` como `webflow.com`** (error 403 al abrir
el túnel, no un fallo puntual), así que no ha sido posible descargar o
inspeccionar pixel a pixel el HTML/CSS reales de esa demo. En su lugar, la
web se ha construido reproduciendo el **lenguaje visual característico de
esa categoría de plantilla** (bienestar/salud, "calming, patient-friendly"):
fondo crema en vez de blanco puro, imágenes con esquinas muy redondeadas,
botones totalmente redondeados, blobs decorativos de fondo, tarjetas
flotantes sobre las fotos, tarjetas con sombra suave y una única banda de
contraste oscura para el bloque "SD Eibar" — en vez de copiar colores o
tipografías exactas que no se han podido medir.

Si en algún momento accedes tú mismo a `healen.webflow.io/home-01` desde tu
navegador y me pasas capturas de pantalla o el HTML exportado (clic derecho
→ "Ver código fuente"), puedo afinar cualquier detalle para acercarlo más
al original.

## Estructura de archivos

```
/index.html            → Toda la maquetación (una sola página)
/css/style.css          → Design tokens, layout, responsive, animaciones
/js/main.js             → Header sticky, menú móvil, revelados de scroll,
                          scroll suave, botón "volver arriba", validación
                          de formulario (sin dependencias externas)
/assets/images/         → Fotos e imágenes reales del centro
/wordpress-embed.html   → index.html con css/style.css y js/main.js ya
                          incrustados dentro del propio archivo — pensado
                          para pegar directamente en WordPress
```

## Imágenes ya integradas

Todas las fotos que me pasaste están ya colocadas en `assets/images/` y
enlazadas en el HTML — no quedan placeholders pendientes:

| Archivo | Contenido | Dónde se usa |
|---|---|---|
| `logo-icon.png` | Monograma S+H (spine), PNG con transparencia real | Cabecera, menú móvil, pie de página, favicon |
| `logo-full.jpg` | Logotipo completo con el texto "Fisioterapia Avanzada · Sara Vivanco Hurtado" | Disponible para usarlo donde prefieras (p. ej. en el editor de WordPress, portada de documentos) |
| `sara-retrato.jpg` | Retrato con la equipación de la SD Eibar | Imagen principal del hero |
| `terapia-manual.jpg` | Manos aplicando terapia manual sobre la espalda | Sección "Sobre mí" |
| `valoracion-rodilla.jpg` | Valoración/movilización de rodilla | Sección "Técnicas invasivas" |
| `movilizacion-tobillo.jpg` | Estiramiento asistido de tobillo/pie | Disponible para usarla en otra sección si quieres añadir más fotos |
| `readaptacion-3d.png` | Figura 3D anatómica en carrera | Banda oscura "SD Eibar" |

## Datos pendientes de completar

Busca `[TU TELÉFONO]` y `[TU EMAIL]` en `index.html` (y en `wordpress-embed.html`,
que se regenera automáticamente a partir de `index.html`) y sustitúyelos por
tus datos reales — aparecen en la cabecera, el CTA final, la sección de
contacto y el pie de página. El resto del contenido (dirección, horario,
servicios, tarifas, equipamiento, nº de colegiada) ya son los datos reales
de la *Guía de atención al usuario*.

**Nota de privacidad:** el DNI de la guía interna no se ha publicado en la
web — solo es necesario en el documento legal interno del centro, no en una
página pública.

Los dos botones de redes sociales del pie/contacto (`href="#"`) están sin
enlazar; sustitúyelos por tus perfiles reales de Instagram/Facebook cuando
los tengas.

## Cómo subirlo a WordPress

**Opción rápida — un solo archivo:**

1. Sube la carpeta `assets/` completa a tu servidor (por FTP, gestor de
   archivos de tu hosting, o directamente a la Biblioteca de medios de
   WordPress si prefieres actualizar luego las rutas `src`).
2. Abre `wordpress-embed.html` y copia **todo el contenido del archivo**.
3. En WordPress, crea una página nueva:
   - Con **Elementor**: añade un widget **HTML**, usa la plantilla "Elementor
     Canvas / En blanco" (para que el tema no añada su propio header/footer)
     y pega el contenido.
   - Sin Elementor: usa el bloque nativo **"HTML personalizado"** del editor
     de bloques y pega el mismo contenido.
4. Publica la página.

**Opción modular** (mejor si vas a reutilizar los estilos en más páginas):
sube `assets/`, `css/` y `js/` a tu servidor y en WordPress añade en
`<head>` el `<link>` de Google Fonts + `css/style.css`, y antes de
`</body>` el `<script src=".../js/main.js">`, tal como está estructurado en
`index.html`.

El formulario de contacto solo tiene validación de cliente (sin backend).
En WordPress, sustitúyelo por el widget **Elementor Pro Form** (o el gestor
de formularios que uses) aplicando las mismas clases CSS (`contact-form`,
`contact-form__field`, etc.) para conservar el estilo.

## Contenido de la web (todo real, tomado de la Guía de atención al usuario)

- **Servicios**: Fisioterapia avanzada, Fisioterapia deportiva,
  Rehabilitación y readaptación funcional, Presoterapia.
- **Tarifas**: las 4 tablas de precios exactas del documento.
- **Horario**: Lun/mar/vie 8:30–14:30 · Mié/jue 8:30–14:30 y 16:00–20:30 ·
  tardes de lun/mar/vie cerrado por la actividad en la SD Eibar.
- **Dirección**: Calle Eladio Bustamante, 8 – Bajo 2, 09580 Villasana de
  Mena (Burgos) — con mapa de Google Maps embebido (sin necesidad de API key).
- **Equipamiento**: medios técnicos (ecografía funcional, neuromodulación,
  flossing/cupping, vendaje, presoterapia) y gimnasio terapéutico (rack,
  mancuernas, césped artificial, bandas elásticas, cajón pliométrico,
  bicicleta estática).
- **Nº de colegiada**: 4986 (Castilla y León).
- No se han inventado testimonios ni cifras: donde no había un dato real
  (por ejemplo, "años de experiencia"), se ha omitido en vez de rellenarlo
  con contenido ficticio.

## Funcionalidades

- Header sticky que se encoge y añade sombra al hacer scroll.
- Menú móvil off-canvas con backdrop y bloqueo de scroll del body.
- Revelados de scroll con `IntersectionObserver` (sin librerías externas),
  respetando `prefers-reduced-motion`.
- Enlace activo en el menú según la sección visible.
- Botón "volver arriba" tras 600px de scroll.
- Formulario de contacto con validación de cliente y mensaje de confirmación.
- Responsive completo (desktop / tablet / móvil), probado con capturas de
  pantalla automatizadas en ambos tamaños.
