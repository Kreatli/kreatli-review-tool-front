/**
 * Shared FAQ blocks for safe-zone / overlay intent (guides + blog).
 * Keep in sync with StoryblokGuideSupplementaryFaqs + FAQStructuredData on each page.
 */
export type SupplementaryFaq = {
  question: string;
  answer: string;
};

export const OVERLAY_AND_SAFE_ZONE_MARKING_FAQS: SupplementaryFaq[] = [
  {
    question: 'How do I create a transparent overlay for safe zone marking?',
    answer:
      'Export a semi-transparent PNG template (1080×1920 for vertical video) with margins or guides, then overlay it in Premiere, DaVinci Resolve, CapCut, or After Effects. Faster: upload your cut to Kreatli’s TikTok, Reels, or Shorts safe zone checkers to preview official-style UI without building a template by hand.',
  },
  {
    question: 'What is safe zone marking for social video?',
    answer:
      'It is the practice of reserving regions of the frame for titles and branding so platform UI and captions do not cover them. Each platform’s overlay differs—use the platform-specific guides linked from this hub.',
  },
];

/** Extra intent-rich FAQs for the multi-platform safe-zone blog URL (visible copy + JSON-LD). */
export const TRANSPARENT_OVERLAY_BLOG_SUPPLEMENT: SupplementaryFaq[] = [
  {
    question: 'How do I create and use transparent safe zone overlays for Instagram, TikTok, and YouTube Shorts?',
    answer:
      'Start from a 1080×1920 vertical sequence, add a semi-transparent PNG with margins where UI typically sits, then composite over your edit in your NLE. For platform-accurate chrome, skip guesswork: run Kreatli’s Instagram Reels, TikTok, or YouTube Shorts safe zone checker on your export and iterate on titles before publish.',
  },
  {
    question: 'Step-by-step: how do I build a transparent overlay layer for safe zones?',
    answer:
      '(1) In Photoshop, Figma, or Affinity, create a 1080×1920 artboard. (2) Draw margin guides or semi-transparent masks where captions, likes, and profile UI typically sit—keep opacity low (often 20–40%) so you can still see picture underneath. (3) Export as PNG with transparency. (4) Import the PNG above your video layer in Premiere, Resolve, After Effects, or CapCut and adjust blend mode / opacity. (5) Validate the real export in Kreatli’s platform checker before posting. For a faster loop, upload directly to the checker and skip hand-built templates when you only need a preview.',
  },
  {
    question: 'Create transparent overlay safe zone marking — does this page show how?',
    answer:
      'This article plus the linked guides cover dimensions and workflow; the fastest “overlay” is the interactive checker preview. Pair written steps here with the checker links in each platform section.',
  },
];
