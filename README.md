# tsdocode blog

Astro 6 blog with Markdown/MDX posts, a GitHub Pages deployment workflow, and the `/blog` base path configured for `tsdocode.github.io/blog`.

## Add a new post

1. Create a `.md` or `.mdx` file inside `src/content/posts/`. The filename becomes the URL slug.

   Example: `src/content/posts/my-first-note.mdx` becomes `/blog/posts/my-first-note/`.

2. Add the required frontmatter at the top of the file:

   ```mdx
   ---
   title: "My First Note"
   description: A short summary shown on the blog landing page.
   category: Systems
   date: 2026-08-30
   readTime: 6 min read
   tags: [systems, linux]
   draft: false
   ---
   ```

3. Write the post below the closing `---` using Markdown. Use `.mdx` when you need Astro components such as Mermaid diagrams.

4. Preview it locally, then commit and push it to `main`. GitHub Actions builds and publishes it automatically.

Posts with `draft: true` are excluded from the site and RSS feed.

## Local development

```bash
npm install
npm run dev
```

```bash
npm run dev
```

Open `http://localhost:4321/blog/` while the dev server is running. Run a production build before publishing:

```bash
npm run build
```

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
