/*
  Prepara el sitio para subir por FTP a un hosting Apache (cPanel, Plesk…).

    npm run ftp

  Hace tres cosas sobre dist/ (hay que correr `npm run build` antes, o usar
  `npm run deploy:ftp`, que encadena los dos):

  1. Escribe dist/.htaccess con los redirects 301 de las URLs viejas (los mismos
     que vercel.json), compresión gzip, caché de assets y la página 404.
  2. Copia dist/404.html si Astro no generó una.
  3. Empaqueta todo en dist-ftp.zip, listo para subir y descomprimir.

  En un hosting con nginx el .htaccess se ignora: avisar para pasar los
  redirects a la configuración del servidor.
*/
import { readFileSync, writeFileSync, existsSync, createWriteStream, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { execFileSync } from 'node:child_process';

const DIST = 'dist';
if (!existsSync(DIST)) {
  console.error('No existe dist/. Corré primero:  npm run build');
  process.exit(1);
}

/* ---- 1. .htaccess -------------------------------------------------------- */
const { redirects = [] } = JSON.parse(readFileSync('vercel.json', 'utf8'));
const lines = redirects.map((r) => `Redirect 301 ${r.source} ${r.destination}`);

const htaccess = `# Generado por scripts/ftp.mjs — no editar a mano, se pisa en cada build.
# Sitio estático de Astro. Requiere Apache con mod_rewrite, mod_deflate y mod_expires.

Options -Indexes
DirectoryIndex index.html

<IfModule mod_rewrite.c>
  RewriteEngine On

  # Forzar https y sin www (comentar si el hosting ya lo hace)
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]
  RewriteCond %{HTTP_HOST} ^www\\.(.+)$ [NC]
  RewriteRule ^(.*)$ https://%1/$1 [R=301,L]

  # /blog  ->  /blog/  (para que resuelva el index.html de la carpeta)
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteCond %{REQUEST_URI} !(.*)/$
  RewriteRule ^(.*)$ /$1/ [R=301,L]
</IfModule>

# ---- Redirects desde las URLs del sitio anterior -------------------------
${lines.join('\n')}

ErrorDocument 404 /404.html

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript application/json image/svg+xml
</IfModule>

<IfModule mod_expires.c>
  ExpiresActive On
  # Los assets de Astro llevan hash en el nombre: se pueden cachear para siempre.
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/avif "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType video/mp4 "access plus 1 year"
  # El HTML no: tiene que reflejar cada actualización.
  ExpiresByType text/html "access plus 0 seconds"
</IfModule>

<IfModule mod_headers.c>
  <FilesMatch "\\.(css|js|avif|webp|png|jpe?g|svg|mp4|woff2)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
  <FilesMatch "\\.html$">
    Header set Cache-Control "public, max-age=0, must-revalidate"
  </FilesMatch>
</IfModule>
`;
writeFileSync(join(DIST, '.htaccess'), htaccess);
console.log(`.htaccess escrito · ${lines.length} redirects 301`);

/* ---- 2. 404 -------------------------------------------------------------- */
if (!existsSync(join(DIST, '404.html'))) {
  console.log('⚠ No hay 404.html en dist/ (opcional: crear src/pages/404.astro)');
}

/* ---- 3. zip -------------------------------------------------------------- */
const ZIP = 'dist-ftp.zip';
try {
  execFileSync(
    'powershell',
    ['-NoProfile', '-Command', `Compress-Archive -Path '${DIST}\\*' -DestinationPath '${ZIP}' -Force`],
    { stdio: 'pipe' }
  );
  const mb = (statSync(ZIP).size / 1024 / 1024).toFixed(1);
  console.log(`${ZIP} listo · ${mb} MB`);
} catch (e) {
  console.log('No se pudo comprimir automáticamente; subí el contenido de dist/ tal cual.');
}

/* ---- resumen ------------------------------------------------------------- */
const count = (dir) => readdirSync(dir, { withFileTypes: true }).reduce(
  (n, e) => n + (e.isDirectory() ? count(join(dir, e.name)) : 1), 0
);
console.log(`\ndist/ tiene ${count(DIST)} archivos.`);
console.log('Subir por FTP: TODO el contenido de dist/ (no la carpeta) dentro de public_html/');
