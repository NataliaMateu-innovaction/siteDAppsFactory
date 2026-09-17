import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Notas del blog: un .md por nota en src/content/blog/. La portada es opcional
// y se referencia relativa al archivo (Astro la optimiza en el build).
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().default(''),
      pubDate: z.coerce.date(),
      author: z.string().default('DAppsFactory'),
      cover: image().optional(),
      draft: z.boolean().default(false),
      // nombre del archivo en el sitio anterior (blog-postNN.html), para redirects
      legacy: z.string().optional(),
    }),
});

export const collections = { blog };
