/*
  Convierte el <text> del logo oficial a curvas.

  Por qué: el SVG trae "DAppsFactory" como texto vivo en Roboto Condensed, una
  fuente que el sitio no carga a propósito (el handoff dice "La fuente del logo
  no se usa en el sitio"). Servido así, cae a una fuente de reemplazo y se rompe:
  los <tspan> tienen posiciones X fijas, así que las letras se encimarían.

  Convertido a <path>, el logo queda autocontenido: sin dependencia de fuentes,
  idéntico en todos los navegadores, y sin sumar un request de fuente al camino
  crítico que acabamos de optimizar.
*/
import opentype from 'opentype.js';
import fs from 'node:fs';

const FONTS = process.env.LOCALAPPDATA + '/Microsoft/Windows/Fonts/';
const bold = opentype.parse(fs.readFileSync(FONTS + 'RobotoCondensed-Bold.ttf').buffer);
const regular = opentype.parse(fs.readFileSync(FONTS + 'RobotoCondensed-Regular.ttf').buffer);

const SIZE = 101.36;
const TX = 19.56, TY = 231.1; // transform="translate(...)" del <text>

// tspans tal cual están en el SVG: [texto, x, letter-spacing em, bold?]
const RUNS = [
  ['D', 0, 0.01, true],
  ['A', 58.75, 0, true],
  ['pps', 119.44, 0.03, true],
  ['F', 273.43, 0, false],
  ['ac', 322.98, 0.03, false],
  ['t', 423.42, 0.02, false],
  ['o', 454.91, 0.03, false],
  ['r', 508.32, 0.03, false],
  ['y', 542.57, 0.02, false]
];

let d = '';
for (const [text, x0, tracking, isBold] of RUNS) {
  const font = isBold ? bold : regular;
  const scale = SIZE / font.unitsPerEm;
  let x = TX + x0;
  for (const ch of text) {
    const glyph = font.charToGlyph(ch);
    const p = glyph.getPath(x, TY, SIZE);
    const seg = p.toPathData(3);
    if (seg && seg !== 'Z') d += seg + ' ';
    // avanza el ancho del glifo más el tracking del tspan
    x += glyph.advanceWidth * scale + tracking * SIZE;
  }
}
d = d.trim();

const SRC = 'E:/NATALIA/DAppsFactory/WEB-DAPPS-2026/DAppsFactory_claude/logo_dark.svg';
let svg = fs.readFileSync(SRC, 'utf8');

// reemplaza el <text> por el path outlineado
const before = svg.length;
svg = svg.replace(/<text[\s\S]*?<\/text>/, '<path class="cls-10" d="' + d + '"/>');
if (svg.length === before) throw new Error('no se encontró el <text> a reemplazar');

// El CSS NO se toca. cls-10 aporta el fill que el nuevo <path> necesita, y
// font-size / font-family simplemente no aplican a un path. Intentar limpiar
// las clases de fuente con un regex borró también cls-10/11/12 (".cls-1"
// matchea ".cls-10") y dejó todo el logo en negro.

fs.writeFileSync(process.argv[2], svg, 'utf8');
console.log('path generado: ' + d.length + ' chars');
console.log('svg: ' + before + ' -> ' + svg.length + ' bytes');
console.log('quedan <text>: ' + (svg.match(/<text/g) || []).length);
console.log('paths totales: ' + (svg.match(/<path/g) || []).length);
