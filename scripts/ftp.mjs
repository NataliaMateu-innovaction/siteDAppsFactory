/*
  Prepara el sitio para subir por FTP.

    npm run deploy:ftp     # build + este script
    npm run ftp            # solo este script, sobre un dist/ ya construido

  Deja en dist/ los dos archivos de configuración, así sirve en cualquier hosting:

  · web.config   → IIS / Azure App Service (es el que usa dappsfactory.io).
                   Registra los tipos MIME de .webp, .avif, .mp4… que IIS no
                   conoce y por los que devuelve 404; más los redirects 301,
                   compresión y caché.
  · .htaccess    → Apache (cPanel, Plesk). Lo mismo en su sintaxis.

  El servidor usa el que le corresponde e ignora el otro.
  Además empaqueta todo en dist-ftp.zip.
*/
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';

const DIST = 'dist';
if (!existsSync(DIST)) {
  console.error('No existe dist/. Corré primero:  npm run build');
  process.exit(1);
}

const { redirects = [] } = JSON.parse(readFileSync('vercel.json', 'utf8'));
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* ---- 1. web.config (IIS / Azure) ----------------------------------------- */
const reglas = redirects
  .map((r, i) => {
    const desde = r.source.replace(/^\//, '');
    return `        <rule name="legacy-${i}" stopProcessing="true">
          <match url="^${esc(desde)}$" />
          <action type="Redirect" url="${esc(r.destination)}" redirectType="Permanent" />
        </rule>`;
  })
  .join('\n');

const webConfig = `<?xml version="1.0" encoding="utf-8"?>
<!-- Generado por scripts/ftp.mjs — no editar a mano, se pisa en cada build. -->
<configuration>
  <system.webServer>

    <!-- IIS devuelve 404 para extensiones que no conoce: sin esto no se ven
         las imágenes (.webp, .avif) ni el video del hero (.mp4). -->
    <staticContent>
      <remove fileExtension=".webp" />
      <mimeMap fileExtension=".webp" mimeType="image/webp" />
      <remove fileExtension=".avif" />
      <mimeMap fileExtension=".avif" mimeType="image/avif" />
      <remove fileExtension=".svg" />
      <mimeMap fileExtension=".svg" mimeType="image/svg+xml" />
      <remove fileExtension=".mp4" />
      <mimeMap fileExtension=".mp4" mimeType="video/mp4" />
      <remove fileExtension=".webm" />
      <mimeMap fileExtension=".webm" mimeType="video/webm" />
      <remove fileExtension=".woff2" />
      <mimeMap fileExtension=".woff2" mimeType="font/woff2" />
      <remove fileExtension=".json" />
      <mimeMap fileExtension=".json" mimeType="application/json" />
      <remove fileExtension=".xml" />
      <mimeMap fileExtension=".xml" mimeType="application/xml" />
      <remove fileExtension=".webmanifest" />
      <mimeMap fileExtension=".webmanifest" mimeType="application/manifest+json" />
      <!-- Los assets de /_astro/ llevan hash en el nombre: se cachean un año.
           El HTML se revalida siempre (ver la regla de headers más abajo). -->
      <clientCache cacheControlMode="UseMaxAge" cacheControlMaxAge="365.00:00:00" />
    </staticContent>

    <defaultDocument>
      <files>
        <clear />
        <add value="index.html" />
      </files>
    </defaultDocument>

    <httpErrors errorMode="Custom" existingResponse="Replace">
      <remove statusCode="404" subStatusCode="-1" />
      <error statusCode="404" path="/404.html" responseMode="ExecuteURL" />
    </httpErrors>

    <urlCompression doStaticCompression="true" doDynamicCompression="true" />

    <rewrite>
      <rules>
        <!-- https -->
        <rule name="https" stopProcessing="true">
          <match url="(.*)" />
          <conditions>
            <add input="{HTTPS}" pattern="off" ignoreCase="true" />
            <add input="{HTTP_HOST}" pattern="localhost" negate="true" />
          </conditions>
          <action type="Redirect" url="https://{HTTP_HOST}/{R:1}" redirectType="Permanent" />
        </rule>

        <!-- sin www -->
        <rule name="sin-www" stopProcessing="true">
          <match url="(.*)" />
          <conditions>
            <add input="{HTTP_HOST}" pattern="^www\\.(.+)$" />
          </conditions>
          <action type="Redirect" url="https://{C:1}/{R:1}" redirectType="Permanent" />
        </rule>

        <!-- Redirects desde las URLs del sitio anterior -->
${reglas}
      </rules>
      <outboundRules>
        <rule name="cache-html" preCondition="es-html">
          <match serverVariable="RESPONSE_Cache-Control" pattern=".*" />
          <action type="Rewrite" value="public, max-age=0, must-revalidate" />
        </rule>
        <preConditions>
          <preCondition name="es-html">
            <add input="{RESPONSE_CONTENT_TYPE}" pattern="^text/html" />
          </preCondition>
        </preConditions>
      </outboundRules>
    </rewrite>

  </system.webServer>
</configuration>
`;
writeFileSync(join(DIST, 'web.config'), webConfig);

/* ---- 2. .htaccess (Apache) ----------------------------------------------- */
const htaccess = `# Generado por scripts/ftp.mjs — no editar a mano, se pisa en cada build.
# Solo lo usa Apache; en IIS/Azure manda web.config.

Options -Indexes
DirectoryIndex index.html

<IfModule mod_mime.c>
  AddType image/webp .webp
  AddType image/avif .avif
  AddType video/mp4 .mp4
  AddType video/webm .webm
  AddType font/woff2 .woff2
</IfModule>

<IfModule mod_rewrite.c>
  RewriteEngine On

  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]
  RewriteCond %{HTTP_HOST} ^www\\.(.+)$ [NC]
  RewriteRule ^(.*)$ https://%1/$1 [R=301,L]

  RewriteCond %{REQUEST_FILENAME} -d
  RewriteCond %{REQUEST_URI} !(.*)/$
  RewriteRule ^(.*)$ /$1/ [R=301,L]
</IfModule>

# ---- Redirects desde las URLs del sitio anterior -------------------------
${redirects.map((r) => `Redirect 301 ${r.source} ${r.destination}`).join('\n')}

ErrorDocument 404 /404.html

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript application/json image/svg+xml
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
console.log(`web.config y .htaccess escritos · ${redirects.length} redirects 301`);

/* ---- 3. zip --------------------------------------------------------------- */
const ZIP = 'dist-ftp.zip';
try {
  execFileSync(
    'powershell',
    ['-NoProfile', '-Command', `Compress-Archive -Path '${DIST}\\*' -DestinationPath '${ZIP}' -Force`],
    { stdio: 'pipe' }
  );
  console.log(`${ZIP} listo · ${(statSync(ZIP).size / 1024 / 1024).toFixed(1)} MB`);
} catch {
  console.log('No se pudo comprimir; subí el contenido de dist/ tal cual.');
}

const contar = (d) =>
  readdirSync(d, { withFileTypes: true }).reduce((n, e) => n + (e.isDirectory() ? contar(join(d, e.name)) : 1), 0);
console.log(`\ndist/ tiene ${contar(DIST)} archivos.`);
console.log('Subir TODO el contenido de dist/ (no la carpeta) a la raíz del sitio.');
console.log('En Azure App Service la raíz es /site/wwwroot');
