import { ISbStoryData } from '@storyblok/react';

import { ArticleCard } from '../types/articles';
import { PageStoryblok } from '../typings/storyblok';

/** Slug segments for guides implemented as static Next.js pages (not Storyblok). */
export const LOCAL_GUIDE_SLUGS = ['how-to-embed-video'] as const;

const LOCAL_SLUG_SET = new Set<string>(LOCAL_GUIDE_SLUGS);

function normalizeFullSlug(slug: string) {
  return slug.replace(/^\//, '');
}

export function isLocalGuideSlug(slug: string) {
  return LOCAL_SLUG_SET.has(slug);
}

export function storyblokGuideToArticleCard(story: ISbStoryData<PageStoryblok>): ArticleCard {
  return {
    id: story.id,
    name: story.name,
    full_slug: story.full_slug?.startsWith('/') ? story.full_slug : `/${story.full_slug}`,
    content: {
      metaFields: story.content.metaFields,
      image: story.content.image,
      publishDate: story.content.publishDate,
      readTime: story.content.readTime,
      tags: story.content.tags,
    },
  };
}

/** Cards for programmatic guides; listed on /guides with Storyblok stories. */
export const LOCAL_GUIDE_ARTICLE_CARDS: ArticleCard[] = [
  {
    id: 'local-guide-how-to-embed-video',
    name: 'How to Embed Video',
    full_slug: '/guides/how-to-embed-video',
    content: {
      metaFields: {
        title: 'How to Embed Video on a Website, CMS, and in Client Review Workflows',
        description:
          'Learn how to embed video with iframes and CMS blocks, keep playback responsive, and use Kreatli’s video embedder for review-ready links, comments, and approvals.',
      },
      image: {
        filename: '/images/guides/how-to-embed-video-cover.png',
        alt: 'Kreatli Guide: How to Embed Video',
        title: 'How to embed video — Kreatli guide',
      },
      publishDate: '2026-04-05 00:00',
      readTime: '15',
      tags: { value: ['Video', 'Client Review'] },
    },
  },
];

/**
 * Merge Storyblok guides with local static guides; local entries win on slug collision.
 * Sorted by publishDate descending (same intent as guides index Storyblok sort).
 */
export function mergeGuidesForIndex(stories: ISbStoryData<PageStoryblok>[]): ArticleCard[] {
  const fromCms = stories
    .map(storyblokGuideToArticleCard)
    .filter((card) => !LOCAL_SLUG_SET.has(normalizeFullSlug(card.full_slug).replace(/^guides\//, '')));

  const merged = [...LOCAL_GUIDE_ARTICLE_CARDS, ...fromCms];
  return merged.sort((a, b) => {
    const ta = new Date(a.content.publishDate ?? 0).getTime();
    const tb = new Date(b.content.publishDate ?? 0).getTime();
    return tb - ta;
  });
}

export function getLocalGuideSitemapEntries(): { path: string; lastmod: string }[] {
  return LOCAL_GUIDE_ARTICLE_CARDS.map((card) => ({
    path: normalizeFullSlug(card.full_slug),
    lastmod: formatDateForSitemap(card.content.publishDate),
  }));
}

function formatDateForSitemap(publishDate: string | undefined): string {
  if (!publishDate) return new Date().toISOString().split('T')[0];
  try {
    const d = new Date(publishDate);
    if (Number.isNaN(d.getTime())) return new Date().toISOString().split('T')[0];
    return d.toISOString().split('T')[0];
  } catch {
    return new Date().toISOString().split('T')[0];
  }
}
