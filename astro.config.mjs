import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://dappsfactory.com',
  // El CSS va inline en el HTML: son ~6 KB y así se evita un request extra
  // en el camino crítico, que es justo lo que estaba matando el LCP.
  build: { inlineStylesheets: 'always' }
});
