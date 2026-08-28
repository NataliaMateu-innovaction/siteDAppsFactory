import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    titulo: z.string(),
    bajada: z.string(),
    fecha: z.coerce.date(),
    autor: z.string(),
    tema: z.enum(['Tokenización', 'Wallets', 'Desarrollo', 'Regulación']),
    borrador: z.boolean().default(false)
  })
});

export const collections = { blog };
