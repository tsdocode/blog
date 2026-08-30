# tsdocode blog

Astro 6 blog with Markdown/MDX posts, a GitHub Pages deployment workflow, and the `/blog` base path configured for `tsdocode.github.io/blog`.

## Local development

```bash
npm install
npm run dev
```

Add posts to `src/content/posts/` with the frontmatter defined in `src/content.config.ts`. Each post is available at `/blog/posts/<filename>`.

## Mermaid diagrams

Import the component in an MDX post and pass a Mermaid chart string:

```mdx
import Mermaid from '../../components/Mermaid.astro';

<Mermaid chart={`flowchart LR
  A[Start] --> B[Finish]
`} />
```

## GitHub Pages

Push the repository's `main` branch to GitHub, then set **Settings → Pages → Source** to **GitHub Actions**. The workflow deploys to `https://tsdocode.github.io/blog/`.
