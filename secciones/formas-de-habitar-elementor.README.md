# Sección "Formas de habitar [Marca]" — plantilla de Elementor (widgets nativos)

`formas-de-habitar-elementor.json` es una **plantilla de Elementor hecha
con widgets nativos** (Heading, Texto, Imagen, Botón — nada de HTML/CSS a
mano). Cada texto e imagen se edita con un clic directo, sin abrir ningún
editor de código.

## Estructura (2 secciones, tal como en la referencia real)

1. **Franja del título** — Sección de Elementor en modo "Ancho completo",
   con el título centrado y una línea horizontal arriba y abajo que llega
   a los dos bordes de la ventana (sin bordes laterales).
2. **Marco de tarjetas** — Sección en modo "Boxed" a 1024px (la medida que
   confirmaste desde el panel de Inspeccionar de Figma), con la Columna
   exterior llevando el borde izquierdo, derecho e inferior. No lleva
   borde superior propio a propósito: esa línea la pone ya el borde
   inferior de la franja del título, justo encima — así no queda una
   línea doblada.
   - Fila de contenido (2 columnas: tarjeta 01 | tarjeta 02), con línea
     divisoria vertical en el centro y línea horizontal debajo.
   - Fila de pie (2 columnas con "Explorar este universo →"), con la
     misma línea vertical central.

## Cómo importarla

1. Si tenías alguna versión anterior insertada, bórrala del todo primero
   (Elementor no sustituye nada solo al reimportar, apila secciones
   nuevas encima).
2. Editor de Elementor → icono de plantillas → **Importar plantillas** →
   sube `formas-de-habitar-elementor.json` → insértala.

## Qué es editable con un clic

- Título, "[Marca]", "Brands"/"Experiences", párrafos, insignias 01/02 y
  los enlaces "Explorar este universo" → **widgets Heading/Texto/Botón**,
  se editan seleccionándolos y escribiendo directamente.
- Imágenes → widgets **Imagen** vacíos; súbelas desde la Biblioteca de
  medios.
- Colores, tipografía, bordes, espaciados de cada pieza → panel de
  Estilo de Elementor, widget por widget.
- Los dos enlaces de "Explorar este universo" y las insignias tienen su
  URL en la pestaña *Contenido* del widget.

## Aviso importante sobre tu tema (VamTam/Innove Couture)

En las pruebas anteriores, las insignias 01/02 y los enlaces del pie
salían **subrayados** aunque el widget tuviera "Decoración de texto:
Ninguna". Encontré la causa real revisando el código fuente de tu web
publicada: tu tema añade automáticamente una clase
(`vamtam-has-underline-anim`) a **todos** los widgets de tipo Botón del
sitio, con una animación de subrayado que no se puede desactivar desde
los controles propios del widget Botón — es un ajuste global del tema.

Por eso, en esta versión:

- El enlace "Explorar este universo" ya **no usa el widget Botón** — usa
  un widget **Heading** con enlace, que el tema no toca con ese efecto.
  Debería salir sin subrayado sin que hagas nada más.
- La insignia 01/02 **sí sigue siendo un widget Botón** (es el único
  widget de Elementor "free" con el que se puede conseguir la forma
  ovalada con borde), así que **es posible que el subrayado vuelva a
  aparecer ahí**. Si pasa, pega esto en **Apariencia → Personalizar → CSS
  adicional**:

```css
.fdh-badge, .fdh-badge *,
.fdh-badge::before, .fdh-badge::after,
.fdh-badge *::before, .fdh-badge *::after{
  text-decoration: none !important;
  border-bottom: none !important;
  background-image: none !important;
}
```

Esto apunta solo a la insignia (clase `fdh-badge` que ya lleva el widget),
sin tocar el resto de botones del sitio.

## Colores de referencia

Fondo `#EFE8DB`, líneas y texto `#2B2620`/`#35302A`, tipografía `Playfair
Display` / `Cormorant Garamond` (títulos) + `Inter` (texto). Ajústalos
desde el panel de Estilo de cada widget si hace falta.
