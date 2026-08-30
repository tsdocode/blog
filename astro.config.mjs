import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://tsdocode.github.io',
  base: '/blog',
  integrations: [mdx()],
  markdown: {
    shikiConfig: { theme: 'github-dark' }
  }
});
