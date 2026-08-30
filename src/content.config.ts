import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string().default('Systems'),
    date: z.coerce.date(),
    readTime: z.string().default('8 min read'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false)
  })
});

export const collections = { posts };
