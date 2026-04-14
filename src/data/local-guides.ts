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
  'how-to-annotate-a-document',
  'how-to-annotate-an-image',
  'how-to-annotate-a-photo',
  'how-to-annotate-a-picture',
  'how-to-highlight-a-pdf',
  'how-to-highlight-an-image',
  'how-to-draw-on-documents',
  'how-to-turn-a-pdf-into-a-link',
  'how-to-convert-an-image-into-a-link',
  'how-to-organize-your-files',
  'how-to-proofread-a-pdf',
  'how-to-review-a-video',
  'how-to-manage-videos',
  'how-to-markup-a-pdf',
  'how-to-add-notes-to-a-pdf',
  'how-to-markup-an-image',
  'how-to-share-documents-online',
  'how-to-share-images',
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
      publishDate: '2026-02-10 00:00',
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
      publishDate: '2026-02-14 00:00',
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
      publishDate: '2026-02-18 00:00',
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
      publishDate: '2026-02-21 00:00',
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
      publishDate: '2026-02-25 00:00',
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
      publishDate: '2026-02-28 00:00',
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
      publishDate: '2026-03-04 00:00',
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
      publishDate: '2026-03-07 00:00',
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
      publishDate: '2026-03-10 00:00',
      readTime: '7',
      tags: { value: ['Image', 'Client Review'] },
    },
  },
  {
    id: 'local-guide-how-to-annotate-a-document',
    name: 'How to Annotate a Document',
    full_slug: '/guides/how-to-annotate-a-document',
    content: {
      metaFields: {
        title: 'How to Annotate a Document: Comments, Markup, and Clear Approvals Without Email Threads',
        description:
          'Learn how to annotate a document with pinned comments and visual markup so reviewers know exactly what to change, versions stay clear, and approvals move faster.',
      },
      image: {
        filename: '/images/guides/how-to-annotate-a-document-cover.png',
        alt: 'Kreatli Guide: How to annotate a document',
        title: 'How to annotate a document — Kreatli guide',
      },
      publishDate: '2026-03-14 00:00',
      readTime: '10',
      tags: { value: ['PDF', 'Client Review'] },
    },
  },
  {
    id: 'local-guide-how-to-annotate-an-image',
    name: 'How to Annotate an Image',
    full_slug: '/guides/how-to-annotate-an-image',
    content: {
      metaFields: {
        title: 'How to Annotate an Image: Pinned Comments, Markup, and Clear Revisions',
        description:
          'Learn how to annotate an image with pinned comments and visual markup so feedback is unambiguous, revisions move faster, and approvals stay organized.',
      },
      image: {
        filename: '/images/guides/how-to-annotate-an-image-cover.png',
        alt: 'Kreatli Guide: How to annotate an image',
        title: 'How to annotate an image — Kreatli guide',
      },
      publishDate: '2026-03-17 00:00',
      readTime: '8',
      tags: { value: ['Image', 'Client Review'] },
    },
  },
  {
    id: 'local-guide-how-to-annotate-a-photo',
    name: 'How to Annotate a Photo',
    full_slug: '/guides/how-to-annotate-a-photo',
    content: {
      metaFields: {
        title: 'How to Annotate a Photo: Location-Pinned Notes for Faster Retouching and Approval',
        description:
          'Learn how to annotate a photo with location-pinned comments and markup so retouching notes are unambiguous, revisions move faster, and approvals stay organized.',
      },
      image: {
        filename: '/images/guides/how-to-annotate-a-photo-cover.png',
        alt: 'Kreatli Guide: How to annotate a photo',
        title: 'How to annotate a photo — Kreatli guide',
      },
      publishDate: '2026-03-20 00:00',
      readTime: '8',
      tags: { value: ['Image', 'Client Review'] },
    },
  },
  {
    id: 'local-guide-how-to-annotate-a-picture',
    name: 'How to Annotate a Picture',
    full_slug: '/guides/how-to-annotate-a-picture',
    content: {
      metaFields: {
        title: 'How to Annotate a Picture: Mark Up What You Mean and Keep Feedback Organized',
        description:
          'Learn how to annotate a picture with location-pinned comments and markup so feedback is clear, revisions move faster, and approvals stay organized.',
      },
      image: {
        filename: '/images/guides/how-to-annotate-a-picture-cover.png',
        alt: 'Kreatli Guide: How to annotate a picture',
        title: 'How to annotate a picture — Kreatli guide',
      },
      publishDate: '2026-03-24 00:00',
      readTime: '8',
      tags: { value: ['Image', 'Client Review'] },
    },
  },
  {
    id: 'local-guide-how-to-highlight-a-pdf',
    name: 'How to Highlight a PDF',
    full_slug: '/guides/how-to-highlight-a-pdf',
    content: {
      metaFields: {
        title: 'How to Highlight a PDF: Clear, Context-Pinned Feedback for Faster Reviews',
        description:
          'Learn how to highlight a PDF with purpose: call out exact text and visual areas, add comments with context, and keep revisions organized across versions.',
      },
      image: {
        filename: '/images/guides/how-to-highlight-a-pdf-cover.png',
        alt: 'Kreatli Guide: How to highlight a PDF',
        title: 'How to highlight a PDF — Kreatli guide',
      },
      publishDate: '2026-03-27 00:00',
      readTime: '9',
      tags: { value: ['PDF', 'Client Review'] },
    },
  },
  {
    id: 'local-guide-how-to-highlight-an-image',
    name: 'How to Highlight an Image',
    full_slug: '/guides/how-to-highlight-an-image',
    content: {
      metaFields: {
        title: 'How to Highlight an Image: Point to Exact Areas and Speed Up Revisions',
        description:
          'Learn how to highlight an image with precise location-based feedback, clear intent, and review-ready workflows that reduce ambiguity and rework.',
      },
      image: {
        filename: '/images/guides/how-to-highlight-an-image-cover.png',
        alt: 'Kreatli Guide: How to highlight an image',
        title: 'How to highlight an image — Kreatli guide',
      },
      publishDate: '2026-03-28 00:00',
      readTime: '8',
      tags: { value: ['Image', 'Client Review'] },
    },
  },
  {
    id: 'local-guide-how-to-draw-on-documents',
    name: 'How to Draw on Documents',
    full_slug: '/guides/how-to-draw-on-documents',
    content: {
      metaFields: {
        title: 'How to Draw on Documents: Visual Markup That Removes Guesswork',
        description:
          'Learn how to draw on documents with arrows, shapes, and freehand notes so reviewers can communicate exact changes and move approvals faster.',
      },
      image: {
        filename: '/images/guides/how-to-draw-on-documents-cover.png',
        alt: 'Kreatli Guide: How to draw on documents',
        title: 'How to draw on documents — Kreatli guide',
      },
      publishDate: '2026-03-31 00:00',
      readTime: '10',
      tags: { value: ['PDF', 'Client Review'] },
    },
  },
  {
    id: 'local-guide-how-to-turn-a-pdf-into-a-link',
    name: 'How to Turn a PDF into a Link',
    full_slug: '/guides/how-to-turn-a-pdf-into-a-link',
    content: {
      metaFields: {
        title: 'How to Turn a PDF into a Link: Share, Review, and Approve Without Attachments',
        description:
          'Learn how to turn a PDF into a link, control access, and share one review-ready URL so feedback stays centralized and approvals move faster.',
      },
      image: {
        filename: '/images/guides/how-to-turn-a-pdf-into-a-link-cover.png',
        alt: 'Kreatli Guide: How to turn a PDF into a link',
        title: 'How to turn a PDF into a link — Kreatli guide',
      },
      publishDate: '2026-04-01 00:00',
      readTime: '9',
      tags: { value: ['PDF', 'Share PDF'] },
    },
  },
  {
    id: 'local-guide-how-to-convert-an-image-into-a-link',
    name: 'How to Convert an Image into a Link',
    full_slug: '/guides/how-to-convert-an-image-into-a-link',
    content: {
      metaFields: {
        title:
          'How to Convert an Image into a Link: Share, Review, and Approve Without Heavy Attachments',
        description:
          'Learn how to convert an image into a link, control who can open it, and share one URL so feedback stays centralized and versions stay clear.',
      },
      image: {
        filename: '/images/guides/how-to-convert-an-image-into-a-link-cover.png',
        alt: 'Kreatli Guide: How to convert an image into a link',
        title: 'How to convert an image into a link — Kreatli guide',
      },
      publishDate: '2026-04-03 00:00',
      readTime: '9',
      tags: { value: ['Image', 'Share Image'] },
    },
  },
  {
    id: 'local-guide-how-to-organize-your-files',
    name: 'How to Organize Your Files',
    full_slug: '/guides/how-to-organize-your-files',
    content: {
      metaFields: {
        title:
          'How to Organize Your Files: Projects, Versions, and One Place for Creative Assets',
        description:
          'Learn how to organize your files around projects and deliverables, name versions clearly, and keep video, images, and documents easy to find for your whole team.',
      },
      image: {
        filename: '/images/guides/how-to-organize-your-files-cover.png',
        alt: 'Kreatli Guide: How to organize your files',
        title: 'How to organize your files — Kreatli guide',
      },
      publishDate: '2026-04-04 00:00',
      readTime: '10',
      tags: { value: ['Workspace', 'Workflow'] },
    },
  },
  {
    id: 'local-guide-how-to-proofread-a-pdf',
    name: 'How to Proofread a PDF',
    full_slug: '/guides/how-to-proofread-a-pdf',
    content: {
      metaFields: {
        title: 'How to Proofread a PDF: Catch Errors, Resolve Comments, and Ship Clean Finals',
        description:
          'Learn how to proofread a PDF with a repeatable pass order, page-pinned notes, and version-aware review so finals are accurate and approvals stay auditable.',
      },
      image: {
        filename: '/images/guides/how-to-proofread-a-pdf-cover.png',
        alt: 'Kreatli Guide: How to proofread a PDF',
        title: 'How to proofread a PDF — Kreatli guide',
      },
      publishDate: '2026-04-05 00:00',
      readTime: '9',
      tags: { value: ['PDF', 'Client Review'] },
    },
  },
  {
    id: 'local-guide-how-to-review-a-video',
    name: 'How to Review a Video',
    full_slug: '/guides/how-to-review-a-video',
    content: {
      metaFields: {
        title: 'How to Review a Video: Timestamped Notes, Clear Intent, and Faster Cuts',
        description:
          'Learn how to review a video with timestamped feedback, visual markup when needed, and version-aware workflows so editors can execute changes without decoding long email threads.',
      },
      image: {
        filename: '/images/guides/how-to-review-a-video-cover.png',
        alt: 'Kreatli Guide: How to review a video',
        title: 'How to review a video — Kreatli guide',
      },
      publishDate: '2026-04-06 00:00',
      readTime: '10',
      tags: { value: ['Video', 'Client Review'] },
    },
  },
  {
    id: 'local-guide-how-to-manage-videos',
    name: 'How to Manage Videos',
    full_slug: '/guides/how-to-manage-videos',
    content: {
      metaFields: {
        title: 'How to Manage Videos: Versions, Links, and a Library Your Team Can Trust',
        description:
          'Learn how to manage videos with clear versioning, predictable share links, and organized storage so producers and clients always open the right cut.',
      },
      image: {
        filename: '/images/guides/how-to-manage-videos-cover.png',
        alt: 'Kreatli Guide: How to manage videos',
        title: 'How to manage videos — Kreatli guide',
      },
      publishDate: '2026-04-07 00:00',
      readTime: '10',
      tags: { value: ['Video', 'Workflow'] },
    },
  },
  {
    id: 'local-guide-how-to-markup-a-pdf',
    name: 'How to Markup a PDF',
    full_slug: '/guides/how-to-markup-a-pdf',
    content: {
      metaFields: {
        title: 'How to Markup a PDF: Highlights, Shapes, and Clear Review-Ready Feedback',
        description:
          'Learn how to markup a PDF with highlights, shapes, and notes so reviewers show exact changes and approvals move faster without email threads.',
      },
      image: {
        filename: '/images/guides/how-to-markup-a-pdf-cover.png',
        alt: 'Kreatli Guide: How to markup a PDF',
        title: 'How to markup a PDF — Kreatli guide',
      },
      publishDate: '2026-04-08 00:00',
      readTime: '9',
      tags: { value: ['PDF', 'Client Review'] },
    },
  },
  {
    id: 'local-guide-how-to-add-notes-to-a-pdf',
    name: 'How to Add Notes to a PDF',
    full_slug: '/guides/how-to-add-notes-to-a-pdf',
    content: {
      metaFields: {
        title: 'How to Add Notes to a PDF: Quick, Page-Anchored Context for Faster Fixes',
        description:
          'Learn how to add notes to a PDF with page-pinned context, short actionable language, and version-aware review so teams resolve feedback without losing the thread.',
      },
      image: {
        filename: '/images/guides/how-to-add-notes-to-a-pdf-cover.png',
        alt: 'Kreatli Guide: How to add notes to a PDF',
        title: 'How to add notes to a PDF — Kreatli guide',
      },
      publishDate: '2026-04-09 00:00',
      readTime: '9',
      tags: { value: ['PDF', 'Client Review'] },
    },
  },
  {
    id: 'local-guide-how-to-markup-an-image',
    name: 'How to Markup an Image',
    full_slug: '/guides/how-to-markup-an-image',
    content: {
      metaFields: {
        title: 'How to Markup an Image: Pin Feedback to Pixels and Cut Revision Rounds',
        description:
          'Learn how to markup an image with location-pinned notes and visual marks so retouchers and designers get unambiguous direction and ship faster.',
      },
      image: {
        filename: '/images/guides/how-to-markup-an-image-cover.png',
        alt: 'Kreatli Guide: How to markup an image',
        title: 'How to markup an image — Kreatli guide',
      },
      publishDate: '2026-04-10 00:00',
      readTime: '8',
      tags: { value: ['Image', 'Client Review'] },
    },
  },
  {
    id: 'local-guide-how-to-share-documents-online',
    name: 'How to Share Documents Online',
    full_slug: '/guides/how-to-share-documents-online',
    content: {
      metaFields: {
        title: 'How to Share Documents Online: Secure Links, Controlled Access, and One Review Hub',
        description:
          'Learn how to share documents online with permissioned links, guest-friendly review, and centralized feedback so stakeholders always open the right file.',
      },
      image: {
        filename: '/images/guides/how-to-share-documents-online-cover.png',
        alt: 'Kreatli Guide: How to share documents online',
        title: 'How to share documents online — Kreatli guide',
      },
      publishDate: '2026-04-11 00:00',
      readTime: '9',
      tags: { value: ['PDF', 'Share PDF'] },
    },
  },
  {
    id: 'local-guide-how-to-share-images',
    name: 'How to Share Images',
    full_slug: '/guides/how-to-share-images',
    content: {
      metaFields: {
        title: 'How to Share Images: One Link, Clear Permissions, and Review-Ready Delivery',
        description:
          'Learn how to share images online with controlled access, lightweight delivery, and optional review workflows so feedback stays tied to the asset.',
      },
      image: {
        filename: '/images/guides/how-to-share-images-cover.png',
        alt: 'Kreatli Guide: How to share images',
        title: 'How to share images — Kreatli guide',
      },
      publishDate: '2026-04-12 00:00',
      readTime: '9',
      tags: { value: ['Image', 'Share Image'] },
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
