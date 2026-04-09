import { ISbStoryData } from '@storyblok/react';

import { ArticleCard } from '../types/articles';
import { PageStoryblok } from '../typings/storyblok';

/** Slug segments for guides implemented as static Next.js pages (not Storyblok). */
export const LOCAL_GUIDE_SLUGS = [
  'how-to-embed-video',
  'how-to-generate-a-video-link-for-free',
  'how-to-add-drawing-to-video',
  'how-to-share-video',
  'how-to-share-an-mp4-file',
  'how-to-add-comments-to-a-pdf',
  'how-to-comment-a-video',
  'how-to-comment-a-photo',
  'how-to-comment-a-picture',
] as const;

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
  {
    id: 'local-guide-how-to-generate-a-video-link-for-free',
    name: 'How to Generate a Video Link for Free',
    full_slug: '/guides/how-to-generate-a-video-link-for-free',
    content: {
      metaFields: {
        title: 'How to Generate a Video Link for Free: Share, Watch, and Review-Ready Links',
        description:
          'Learn how to generate a video link for free with common hosts and cloud storage, what “video link” really means, and when a review-ready link fits client workflows.',
      },
      image: {
        filename: '/images/guides/how-to-generate-a-video-link-for-free-cover.png',
        alt: 'Kreatli Guide: How to generate a video link for free',
        title: 'How to generate a video link for free — Kreatli guide',
      },
      publishDate: '2026-04-06 00:00',
      readTime: '11',
      tags: { value: ['Video', 'Share Video'] },
    },
  },
  {
    id: 'local-guide-how-to-add-drawing-to-video',
    name: 'How to Add Drawing to Video',
    full_slug: '/guides/how-to-add-drawing-to-video',
    content: {
      metaFields: {
        title: 'How to Add Drawing to Video: Draw on Frames for Clear, Frame-Accurate Feedback',
        description:
          'Learn how to add drawing to video with arrows, boxes, highlights, and freehand markup on exact frames so editors and clients understand changes instantly.',
      },
      image: {
        filename: '/images/guides/how-to-add-drawing-to-video.png',
        alt: 'Kreatli Guide: How to add drawing to video',
        title: 'How to add drawing to video — Kreatli guide',
      },
      publishDate: '2026-04-07 00:00',
      readTime: '12',
      tags: { value: ['Video', 'Video Annotation'] },
    },
  },
  {
    id: 'local-guide-how-to-share-video',
    name: 'How to Share Video',
    full_slug: '/guides/how-to-share-video',
    content: {
      metaFields: {
        title: 'How to Share Video: Links, Privacy Settings, and Review-Ready Sharing',
        description:
          'Learn how to share video the right way: choose between watch links and file links, set privacy and expiration, and use a review-ready link when feedback and approvals matter.',
      },
      image: {
        filename: '/images/guides/how-to-share-video-cover.png',
        alt: 'Kreatli Guide: How to share video',
        title: 'How to share video — Kreatli guide',
      },
      publishDate: '2026-04-07 00:00',
      readTime: '12',
      tags: { value: ['Video', 'Share Video'] },
    },
  },
  {
    id: 'local-guide-how-to-share-an-mp4-file',
    name: 'How to Share an MP4 File',
    full_slug: '/guides/how-to-share-an-mp4-file',
    content: {
      metaFields: {
        title: 'How to Share an MP4 File: Email Limits, Link Options, and Review-Ready Sharing',
        description:
          'Learn how to share an MP4 file without failed uploads or quality loss: when to attach, when to send a link, and how to share for clear feedback and approvals.',
      },
      image: {
        filename: '/images/guides/how-to-share-an-mp4-file-cover.png',
        alt: 'Kreatli Guide: How to share an MP4 file',
        title: 'How to share an MP4 file — Kreatli guide',
      },
      publishDate: '2026-04-07 00:00',
      readTime: '10',
      tags: { value: ['Video', 'Share Video'] },
    },
  },
  {
    id: 'local-guide-how-to-add-comments-to-a-pdf',
    name: 'How to Add Comments to a PDF',
    full_slug: '/guides/how-to-add-comments-to-a-pdf',
    content: {
      metaFields: {
        title: 'How to Add Comments to a PDF: Page-Pinned Feedback Without Email Threads',
        description:
          'Learn how to add comments to a PDF with page-pinned notes, clear context, and version-aware review—so teams can approve faster without losing feedback in email.',
      },
      image: {
        filename: '/images/guides/how-to-add-comments-to-a-pdf-cover.png',
        alt: 'Kreatli Guide: How to add comments to a PDF',
        title: 'How to add comments to a PDF — Kreatli guide',
      },
      publishDate: '2026-04-09 00:00',
      readTime: '9',
      tags: { value: ['PDF', 'Client Review'] },
    },
  },
  {
    id: 'local-guide-how-to-comment-a-video',
    name: 'How to Comment a Video',
    full_slug: '/guides/how-to-comment-a-video',
    content: {
      metaFields: {
        title: 'How to Comment a Video: Timestamped Feedback That Editors Can Act On',
        description:
          'Learn how to comment a video with timestamped notes, clear context, and version-aware review so teams can iterate faster without confusing email threads.',
      },
      image: {
        filename: '/images/guides/how-to-comment-a-video-cover.png',
        alt: 'Kreatli Guide: How to comment a video',
        title: 'How to comment a video — Kreatli guide',
      },
      publishDate: '2026-04-09 00:10',
      readTime: '10',
      tags: { value: ['Video', 'Client Review'] },
    },
  },
  {
    id: 'local-guide-how-to-comment-a-photo',
    name: 'How to Comment a Photo',
    full_slug: '/guides/how-to-comment-a-photo',
    content: {
      metaFields: {
        title: 'How to Comment a Photo: Location-Pinned Feedback for Faster Revisions',
        description:
          'Learn how to comment a photo with location-pinned notes, clear context, and version-aware review—so teams can iterate without messy email threads.',
      },
      image: {
        filename: '/images/guides/how-to-comment-a-photo-cover.png',
        alt: 'Kreatli Guide: How to comment a photo',
        title: 'How to comment a photo — Kreatli guide',
      },
      publishDate: '2026-04-09 00:20',
      readTime: '7',
      tags: { value: ['Image', 'Client Review'] },
    },
  },
  {
    id: 'local-guide-how-to-comment-a-picture',
    name: 'How to Comment a Picture',
    full_slug: '/guides/how-to-comment-a-picture',
    content: {
      metaFields: {
        title: 'How to Comment a Picture: Clear Feedback Without Guesswork',
        description:
          'Learn how to comment a picture with location-pinned notes, clear intent, and version-aware review—so feedback stays organized and revisions move faster.',
      },
      image: {
        filename: '/images/guides/how-to-comment-a-picture-cover.png',
        alt: 'Kreatli Guide: How to comment a picture',
        title: 'How to comment a picture — Kreatli guide',
      },
      publishDate: '2026-04-09 00:30',
      readTime: '7',
      tags: { value: ['Image', 'Client Review'] },
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
