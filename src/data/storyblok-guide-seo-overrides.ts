/**
 * SEO overrides for Storyblok-backed guides (slug = full path e.g. `/guides/youtube-banner-resizer`).
 * Keeps intent in-repo when CMS meta is generic; remove or sync to Storyblok when CMS is updated.
 */
export type StoryblokGuideSeoOverride = {
  /** Shown in <title> as: Kreatli | {seoArticleTitle} */
  seoArticleTitle: string;
  metaDescription: string;
  /** Key for above-the-fold extras in StoryblokGuideAboveFoldExtras */
  aboveFoldVariant?: 'youtubeBanner' | 'safeZoneHub' | 'instagramReelsCross' | 'tiktokCross' | 'youtubeShortsCross';
};

export const STORYBLOK_GUIDE_SEO_OVERRIDES: Record<string, StoryblokGuideSeoOverride> = {
  '/guides/youtube-banner-resizer': {
    seoArticleTitle: 'YouTube Banner Size Guide 2026 — Dimensions, Safe Zone & Templates',
    metaDescription:
      'YouTube channel banner size 2026: 2560×1440px recommended, 1546×423px safe zone, min 2048×1152px, 6MB max. Formats JPG, PNG, GIF, BMP — plus templates and a free resizer.',
    aboveFoldVariant: 'youtubeBanner',
  },
  '/guides/safe-zone-guide': {
    seoArticleTitle: 'Safe Zone Guide 2026 — Instagram, TikTok, YouTube Dimensions & Templates',
    metaDescription:
      'Social safe zones in pixels for TikTok, Instagram Reels, and YouTube Shorts — plus YouTube channel banner sizes 2026 (2560×1440px, 1546×423px safe area) and links to free checkers.',
    aboveFoldVariant: 'safeZoneHub',
  },
  '/guides/video-frame-extractor-guide': {
    seoArticleTitle: 'How to Extract Frames from a Video — Free Step-by-Step Guide',
    metaDescription:
      'Learn how to extract frames from video as still images (PNG/JPG): step-by-step workflow, quality tips, and free tools — without mixing in generic “video review software” results.',
  },
  '/guides/instagram-reels-safe-zone': {
    seoArticleTitle: 'Instagram Reels Safe Zone Guide — Dimensions & Safe Area (2026)',
    metaDescription:
      'Instagram Reels and instagram reel safe zone dimensions in pixels; compare TikTok vs Reels vs YouTube Shorts overlays and keep text and logos visible before you post.',
    aboveFoldVariant: 'instagramReelsCross',
  },
  '/guides/tiktok-safe-zone': {
    seoArticleTitle: 'TikTok Safe Zone — Video Dimensions & Text Safe Area (2026)',
    metaDescription:
      'TikTok safe zone: 1080×1920 video with a 1080×1420px text safe area (typical). Preview overlays before posting; compare with Instagram Reels safe zone.',
    aboveFoldVariant: 'tiktokCross',
  },
  '/guides/youtube-shorts-safe-zone': {
    seoArticleTitle: 'YouTube Shorts Safe Zone Guide — Dimensions & Banner Specs (2026)',
    metaDescription:
      'YouTube Shorts safe zone checker plus channel banner dimensions 2026: 2560×1440px banner, 1546×423px safe zone — links to the free Shorts checker and banner resizer.',
    aboveFoldVariant: 'youtubeShortsCross',
  },
};

export function getStoryblokGuideSeoOverride(canonicalPath: string): StoryblokGuideSeoOverride | undefined {
  return STORYBLOK_GUIDE_SEO_OVERRIDES[canonicalPath];
}
