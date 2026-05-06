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
