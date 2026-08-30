import { getCollection } from 'astro:content';

export async function GET({ site }: { site: URL }) {
  const posts = (await getCollection('posts', ({ data }) => !data.draft)).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  const baseUrl = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;
  const origin = new URL(baseUrl, site ?? new URL('https://tsdocode.github.io/'));
  const items = posts.map((post) => `<item><title><![CDATA[${post.data.title}]]></title><link>${new URL(`posts/${post.id}/`, origin)}</link><guid>${new URL(`posts/${post.id}/`, origin)}</guid><description><![CDATA[${post.data.description}]]></description><pubDate>${post.data.date.toUTCString()}</pubDate></item>`).join('');
  const xml = `<?xml version="1.0" encoding="UTF-8" ?><rss version="2.0"><channel><title>tsdocode / blog</title><link>${origin}</link><description>Notes on systems that do the work.</description>${items}</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
