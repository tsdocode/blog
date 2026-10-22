import { getCollection, type CollectionEntry } from 'astro:content';

export type GuideEntry = CollectionEntry<'inf2'>;

// Sidebar sections, in reading order. An entry's section is the first path segment of its id.
export const SECTIONS = [
  { id: 'hardware', title: 'Device Hardware' },
  { id: 'programming', title: 'Programming Model (NKI)' },
  { id: 'patterns', title: 'Kernel Patterns' },
  { id: 'kernels', title: 'Qwen3-TTS Kernels' },
  { id: 'engine', title: 'Serving Engine' },
  { id: 'performance', title: 'Performance' }
] as const;

export const sectionOf = (entry: GuideEntry) => entry.id.split('/')[0];

/** Entries grouped by section (in SECTIONS order), each group sorted by `order` then title. */
export async function getGuideTree() {
  const entries = await getCollection('inf2', ({ data }) => !data.draft);
  const tree = SECTIONS.map((section) => ({
    ...section,
    entries: entries
      .filter((entry) => sectionOf(entry) === section.id)
      .sort((a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title))
  })).filter((section) => section.entries.length > 0);
  return { tree, flat: tree.flatMap((section) => section.entries) };
}

export const guideBase = () => {
  const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;
  return `${base}inf2/`;
};

export const entryHref = (id: string) => `${guideBase()}${id}/`;
