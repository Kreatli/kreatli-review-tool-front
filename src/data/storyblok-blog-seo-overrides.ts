import { OVERLAY_AND_SAFE_ZONE_MARKING_FAQS, type SupplementaryFaq } from './safe-zone-supplementary-faqs';

export type StoryblokBlogSeoOverride = {
  seoArticleTitle: string;
  metaDescription: string;
  supplementaryFaqs?: SupplementaryFaq[];
};

/** In-repo SEO + FAQ boosts for high-traffic Storyblok blog URLs (slug = full path e.g. `/blog/safe-zone-guide`). */
export const STORYBLOK_BLOG_SEO_OVERRIDES: Record<string, StoryblokBlogSeoOverride> = {
  '/blog/safe-zone-guide': {
    seoArticleTitle: 'Safe Zone Guide 2026 — Instagram, TikTok, YouTube Dimensions, Overlays & Templates',
    metaDescription:
      'Social video safe zones and transparent overlay marking: dimensions for TikTok, Instagram Reels, YouTube Shorts, plus YouTube banner 2560×1440px / 1546×423px safe area and links to free checkers.',
    supplementaryFaqs: OVERLAY_AND_SAFE_ZONE_MARKING_FAQS,
  },
  '/blog/safe-zone-guide-instagram-reels-youtube-shorts-tiktok': {
    seoArticleTitle:
      'Safe Zones for Instagram Reels, YouTube Shorts & TikTok — Dimensions, Overlays & Marking (2026)',
    metaDescription:
      'How to plan reels, shorts, and TikTok safe zones in 2026: pixel targets, overlay marking, transparent safe-zone templates, and links to Kreatli checkers—for text and logos that stay visible.',
    supplementaryFaqs: OVERLAY_AND_SAFE_ZONE_MARKING_FAQS,
  },
};

export function getStoryblokBlogSeoOverride(canonicalPath: string): StoryblokBlogSeoOverride | undefined {
  return STORYBLOK_BLOG_SEO_OVERRIDES[canonicalPath];
}
