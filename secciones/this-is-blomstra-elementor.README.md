# Sección "This is Blomstra" — franja ondulada + relato

`this-is-blomstra-elementor.json` reproduce la franja decorativa con el
texto curvado "THIS IS BLOMSTRA" sobre la línea ondulada discontinua, más
el bloque numerado "1 · Relato" con imagen debajo.

## Por qué esta sí lleva un poco de código (y el resto no)

El texto "THIS IS BLOMSTRA" va **curvado siguiendo la línea ondulada**.
Ningún widget nativo de Elementor puede curvar texto sobre un trazo —
eso solo se consigue con SVG. Por eso, y solo para esa pieza concreta, la
plantilla trae:

1. **Franja ondulada** (línea + texto curvado) → un widget **HTML** con
   un SVG (curva + `<textPath>` con el texto repetido). Es la única parte
   de esta sección que no se edita con clic directo — se edita abriendo
   el código del widget.
2. **Insignia "1"**, **"Relato"** e **imagen** → **widgets nativos**
   (Botón, Heading, Imagen), igual que en el resto de la web — clic
   directo, sin código.

## Cómo importarla

Editor de Elementor → icono de plantillas → **Importar plantillas** → sube
`this-is-blomstra-elementor.json` → insértala donde quieras.

## Qué es editable y cómo

- **Texto curvado** → haz doble clic en el widget HTML para abrir su
  código; el texto está en el `<textPath>...</textPath>` cerca del final
  del SVG. Cambia "THIS IS BLOMSTRA" por tu texto (está repetido varias
  veces separado por " · " para rellenar todo el ancho).
- **Forma de la onda** → los números del atributo `d="M0,100 C200,40
  300,160 ..."` en las dos etiquetas `<path>` controlan la curva; son las
  mismas coordenadas en ambas (una es el relleno de color crema, la otra
  es la línea discontinua + el texto), cámbialas igual en las dos para
  que sigan coincidiendo.
- **Colores** → busca `#efe7de` (crema de arriba), `#b6aa99` (topo de
  abajo) y `#2b2620` (línea/texto) dentro del `<style>` y en los atributos
  `fill`/`stroke` del SVG.
- **"1"** → widget Botón, edítalo con un clic.
- **"Relato"** → widget Heading, edítalo con un clic.
- **Imagen** → widget Imagen vacío; súbela desde la Biblioteca de medios
  de WordPress con un clic, como cualquier imagen de Elementor.

## Si esto es el primero de varios "relatos" numerados

Si la idea es que haya "2", "3"... con su propia imagen, duplica la fila
completa (la Sección que contiene la insignia + "Relato" + imagen) tantas
veces como necesites y cambia el número y la imagen de cada copia.
