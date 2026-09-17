// Genera vercel.json con los redirects 301 desde las URLs del sitio anterior
// (dappsfactory.io): cada nota declara en su frontmatter el archivo viejo
// (`legacy: blog-postNN.html`). Correr con `npm run redirects` cuando cambie
// el slug de una nota o se agregue una migrada.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';

const redirects = [
  { source: '/blog.html', destination: '/blog/', permanent: true },
  ...[2, 3, 4, 5].map((n) => ({ source: `/blog0${n}.html`, destination: '/blog/', permanent: true })),
  { source: '/blogs.html', destination: '/blog/', permanent: true },
  { source: '/index.html', destination: '/', permanent: true },
];
for (const f of readdirSync('./src/content/blog').filter((f) => f.endsWith('.md')).sort()) {
  const m = readFileSync(`./src/content/blog/${f}`, 'utf8').match(/^legacy:\s*"?([^"\n]+)"?/m);
  if (m) redirects.push({ source: '/' + m[1].trim(), destination: `/blog/${f.replace(/\.md$/, '')}/`, permanent: true });
}
writeFileSync(
  './vercel.json',
  JSON.stringify({ framework: 'astro', buildCommand: 'astro build', outputDirectory: 'dist', redirects }, null, 2) + '\n'
);
console.log(redirects.length, 'redirects → vercel.json');
