import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Dominio real del sitio (el handoff decía .com, pero la empresa opera en .io).
  site: 'https://dappsfactory.io',
  // El CSS del sitio pesa ~30 KB: inline evita un request extra en el camino
  // crítico y la página pinta completa con el primer HTML.
  build: { inlineStylesheets: 'always' },
  // sitemap.xml + sitemap-index.xml con todas las páginas (lo lee robots.txt).
  integrations: [
    sitemap({
      changefreq: 'weekly',
      lastmod: new Date(),
      serialize(item) {
        // La home primero; después servicios, y al final blog y páginas sueltas.
        if (item.url.endsWith('.io/')) item.priority = 1.0;
        else if (item.url.includes('/servicios/')) item.priority = 0.9;
        else if (item.url.includes('/contacto')) item.priority = 0.8;
        else if (item.url.includes('/blog/')) item.priority = 0.6;
        else item.priority = 0.5;
        return item;
      },
      filter: (page) => !page.includes('/404'),
    }),
  ],
  // Los redirects desde las URLs viejas (blog-postNN.html) viven en vercel.json;
  // se generan con `npm run redirects`.
});
