/*
  Genera la imagen de vista previa de cada nota del blog, la que se ve al
  compartir el link por WhatsApp, LinkedIn o X.

  Corre solo con `npm run build` (está enganchado como prebuild).

  Las portadas vienen en medidas muy dispares —de 393x205 a 2752x1536—, y
  WhatsApp y LinkedIn solo muestran la tarjeta grande a partir de 600x315.
  Acá cada portada se encaja entera, sin recortar, en un lienzo de 1200x630
  con el fondo y la barra de marca, así todas las notas se comparten igual.

  Salida: public/og/<slug>.jpg — se regenera solo si la portada cambió.
*/
import sharp from 'sharp';
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';

const NOTAS = 'src/content/blog';
const SALIDA = 'public/og';
const ANCHO = 1200;
const ALTO = 630;

mkdirSync(SALIDA, { recursive: true });

// La misma barra de colores que corona el sitio.
const barra = Buffer.from(
  `<svg width="${ANCHO}" height="6" xmlns="http://www.w3.org/2000/svg">
     <defs><linearGradient id="g" x1="0" x2="1">
       <stop offset="0" stop-color="#B4F759"/><stop offset=".28" stop-color="#01C7C5"/>
       <stop offset=".55" stop-color="#3296E3"/><stop offset=".8" stop-color="#7973F6"/>
       <stop offset="1" stop-color="#8E71F5"/>
     </linearGradient></defs>
     <rect width="${ANCHO}" height="6" fill="url(#g)"/>
   </svg>`
);

let hechas = 0;
let intactas = 0;

for (const archivo of readdirSync(NOTAS).filter((n) => n.endsWith('.md'))) {
  const slug = archivo.replace(/\.md$/, '');
  const md = readFileSync(join(NOTAS, archivo), 'utf8');
  const cover = md.match(/^cover:\s*["']?(.+?)["']?\s*$/m)?.[1];
  if (!cover) continue;

  const origen = resolve(dirname(join(NOTAS, archivo)), cover);
  const destino = join(SALIDA, `${slug}.jpg`);

  if (existsSync(destino) && statSync(destino).mtimeMs >= statSync(origen).mtimeMs) {
    intactas++;
    continue;
  }

  const portada = await sharp(origen)
    .resize(ANCHO, ALTO, { fit: 'contain', background: '#060607' })
    .toBuffer();

  await sharp(portada)
    .composite([{ input: barra, top: 0, left: 0 }])
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(destino);

  hechas++;
}

console.log(`Vistas previas del blog: ${hechas} generadas, ${intactas} ya estaban al día.`);
