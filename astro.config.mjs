import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://dappsfactory.com',
  // El CSS del sitio pesa ~30 KB: inline evita un request extra en el camino
  // crítico y la página pinta completa con el primer HTML.
  build: { inlineStylesheets: 'always' },
  // Los redirects desde las URLs viejas (blog-postNN.html) viven en vercel.json;
  // se generan con `npm run redirects`.
});
