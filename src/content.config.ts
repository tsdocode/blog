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
    draft: z.boolean().default(false),
    ogImage: z.string().optional()          // file in public/, used as the social card
  })
});

// Inferentia2 field guide: short, cross-linked entries grouped into sections (src/lib/guide.ts),
// rendered at /blog/inf2/<section>/<entry>/. The file path under src/content/inf2/ is the URL.
const inf2 = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/inf2' }),
  schema: z.object({
    title: z.string(),
    short: z.string().optional(),          // abbreviation shown under the title in the sidebar, e.g. "SBUF"
    summary: z.string(),                   // one line, used for previews and meta description
    order: z.number().default(100),        // position inside its section
    related: z.array(z.string()).default([]), // entry ids, e.g. "hardware/psum"
    draft: z.boolean().default(false)
  })
});

export const collections = { posts, inf2 };
