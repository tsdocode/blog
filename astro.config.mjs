import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import remarkGfm from 'remark-gfm';

export default defineConfig({
  site: 'https://tsdocode.github.io',
  base: '/blog',
  integrations: [mdx({ remarkPlugins: [remarkGfm] })],
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light-default',
        dark: 'github-dark-default'
      },
      defaultColor: false
    }
  }
});
