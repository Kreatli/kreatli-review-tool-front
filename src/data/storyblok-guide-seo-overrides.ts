import { OVERLAY_AND_SAFE_ZONE_MARKING_FAQS, type SupplementaryFaq } from './safe-zone-supplementary-faqs';

/**
 * SEO overrides for Storyblok-backed guides (slug = full path e.g. `/guides/youtube-banner-resizer`).
 * Keeps intent in-repo when CMS meta is generic; remove or sync to Storyblok when CMS is updated.
 */
export type StoryblokGuideSupplementaryFaq = SupplementaryFaq;

export type StoryblokGuideSeoOverride = {
  /** Shown in <title> as: Kreatli | {seoArticleTitle} */
  seoArticleTitle: string;
  metaDescription: string;
  /** Key for above-the-fold extras in StoryblokGuideAboveFoldExtras */
  aboveFoldVariant?: 'youtubeBanner' | 'safeZoneHub' | 'instagramReelsCross' | 'tiktokCross' | 'youtubeShortsCross';
  /**
   * Rendered in-page and mirrored in FAQPage JSON-LD (must match visible answers).
   * Targets high-impression Search Console queries for the guide URL.
   */
  supplementaryFaqs?: StoryblokGuideSupplementaryFaq[];
};

const YOUTUBE_BANNER_SUPPLEMENTARY_FAQS: StoryblokGuideSupplementaryFaq[] = [
  {
    question: 'What are the YouTube channel banner size dimensions in 2026?',
    answer:
      'YouTube recommends 2560×1440px channel art. The minimum upload is 2048×1152px. Always keep critical text and logos inside the 1546×423px safe zone so they stay visible on TV, desktop, tablet, and mobile.',
  },
  {
    question: 'What is the YouTube channel banner recommended size and safe area?',
    answer:
      'Use 2560×1440px as your canvas, and treat 1546×423px as the safe area for logos and copy. Kreatli’s free banner resizer previews how cropping looks across devices.',
  },
  {
    question: 'What are YouTube channel banner safe area dimensions?',
    answer:
      'The typical safe area for text and logos is 1546×423px centered on the 2560×1440px banner. Everything outside can be cropped differently per device.',
  },
  {
    question: 'What are the YouTube channel banner size requirements?',
    answer:
      'Accepted formats include JPG, PNG, GIF, and BMP; max file size 6MB. For best results use PNG for logos and simple art, or JPG for photos.',
  },
  {
    question: 'What are the best YouTube channel banner size and safe practices in 2026?',
    answer:
      'Design for 2560×1440px, keep key content in the 1546×423px safe zone, avoid tiny text, and preview on mobile and TV. Use the resizer tool before upload.',
  },
  {
    question: 'After I resize my YouTube banner, how do I double-check the safe zone?',
    answer:
      'Re-open your exported JPG or PNG in Kreatli’s free YouTube banner resizer to confirm how the 1546×423px safe zone reads across device previews. Vertical Shorts safe zones are different—use the YouTube Shorts safe zone checker when you are validating 9:16 titles, not the wide channel banner art.',
  },
];

const INSTAGRAM_REELS_SUPPLEMENTARY_FAQS: StoryblokGuideSupplementaryFaq[] = [
  {
    question: 'What is the Instagram reel safe zone?',
    answer:
      'It is the area of your 9:16 Reels frame where UI (captions, side icons, profile) is least likely to cover your text and logos. The full frame is typically 1080×1920px; keep critical branding away from edges and lower UI.',
  },
  {
    question: 'What is the Instagram reels safe zone in 2026?',
    answer:
      'Specs evolve with the app, so use the on-page dimensions table and Kreatli’s Reels checker to preview overlays before you post. Updated 2026 guidance is summarized at the top of this guide.',
  },
  {
    question: 'What is the Instagram reels safe zone vs IG reel safe zone?',
    answer:
      'People search both phrases—they mean the same thing: readable safe margins for Reels. Plan text and logos for the same 1080×1920 canvas whether you say “reel” or “reels.”',
  },
  {
    question: 'What is the IG reels safe zone?',
    answer:
      '“IG” is shorthand for Instagram. Use this guide’s pixel recommendations and the Instagram Reels safe zone checker to validate your layout.',
  },
];

const TIKTOK_SUPPLEMENTARY_FAQS: StoryblokGuideSupplementaryFaq[] = [
  {
    question: 'What is the TikTok text safe area in pixels?',
    answer:
      'TikTok vertical video is typically 1080×1920px. A common planning rule is to keep titles and logos inside about 1080×1420px (text safe area) so side UI and lower controls are less likely to cover them—always preview in Kreatli’s TikTok safe zone checker before posting.',
  },
  {
    question: 'What is a TikTok safe zone overlay?',
    answer:
      'An overlay is a semi-transparent guide (or the app’s own UI preview) showing where captions and buttons sit. Kreatli’s TikTok safe zone checker renders preview-style overlays on your upload so you can see coverage without guessing.',
  },
  {
    question: 'Do you have a TikTok safe zone template?',
    answer:
      'Use the free TikTok safe zone checker to validate any cut interactively. For a static PNG guide layer, export a 1080×1920 template from your design tool—or follow the step-by-step overlay section in this guide (CapCut and editor workflows are covered in the article below).',
  },
  {
    question: 'How do TikTok safe zones differ from TikTok safezone (one word) searches?',
    answer:
      'They mean the same topic: avoiding covered text on vertical TikTok video. Whether you type “TikTok safe zone” or “TikTok safezone,” start from 1080×1920 framing and validate with the checker.',
  },
];

const YOUTUBE_SHORTS_SUPPLEMENTARY_FAQS: StoryblokGuideSupplementaryFaq[] = [
  {
    question: 'What are YouTube Shorts aspect ratio requirements in 2026?',
    answer:
      'Shorts are vertical 9:16—commonly 1080×1920px. Use that canvas when planning title-safe areas and UI clearance; then preview in Kreatli’s YouTube Shorts safe zone checker before you publish.',
  },
  {
    question: 'What are YouTube Shorts text overlay best practices for 2026?',
    answer:
      'Keep core copy inside a conservative center band, avoid edge-to-edge subtitles, and preview with real Shorts UI (likes, comments, subscribe) using the checker. Update cuts when YouTube shifts UI density.',
  },
  {
    question: 'Where can I get a YouTube Shorts safe zone template?',
    answer:
      'Use the interactive Shorts checker first for accuracy. For a static PSD/PNG template, pair this guide’s pixel targets with your brand template—or export guides from your motion tool and validate in the checker.',
  },
  {
    question: 'What is YouTube channel art safe area 2026 vs Shorts safe zone?',
    answer:
      'Channel art uses wide 2560×1440px banners with a 1546×423px safe zone. Shorts uses vertical video. If you need banner specs, use the YouTube banner resizer and the channel banner guide—not the Shorts overlay rules.',
  },
  {
    question: 'Do “youtube safe zone” and “youtube safe zones” mean Shorts?',
    answer:
      'Often yes for vertical video, but some searches mean channel banner safe areas. This guide focuses on Shorts; use the banner table below and the hub for disambiguation.',
  },
  {
    question: 'What is the YouTube safe zone for Shorts?',
    answer:
      'YouTube Shorts uses vertical 9:16 video; keep important text and logos in a center-weighted safe margin so likes, comments, and titles do not cover them. Use the Shorts checker linked from this guide for a visual preview.',
  },
  {
    question: 'Is YouTube Shorts safe zone the same as YouTube channel banner safe area?',
    answer:
      'No. Shorts safe zones apply to vertical 1080×1920 video. Channel banner art uses wide 2560×1440px art with a 1546×423px safe zone—see the banner guide and resizer for that spec.',
  },
];

export const STORYBLOK_GUIDE_SEO_OVERRIDES: Record<string, StoryblokGuideSeoOverride> = {
  '/guides/youtube-banner-resizer': {
    seoArticleTitle: 'YouTube Channel Banner Size 2026 — Dimensions, Safe Area, Requirements & Best Practices',
    metaDescription:
      'YouTube channel banner size dimensions 2026: recommended 2560×1440px, safe area 1546×423px, minimum 2048×1152px, 6MB max, JPG/PNG/GIF/BMP. Requirements, best practices, and a free banner resizer with device preview.',
    aboveFoldVariant: 'youtubeBanner',
    supplementaryFaqs: YOUTUBE_BANNER_SUPPLEMENTARY_FAQS,
  },
  '/guides/safe-zone-guide': {
    seoArticleTitle: 'Safe Zone Hub 2026 — Instagram Reels, TikTok, YouTube Shorts Dimensions, Overlays & Checkers',
    metaDescription:
      'Definitive hub for Instagram Reels, TikTok, and YouTube Shorts safe zones: pixels, transparent overlay marking, templates, checker links, plus channel banner 2560×1440px / 1546×423px and internal links to each platform guide.',
    aboveFoldVariant: 'safeZoneHub',
    supplementaryFaqs: OVERLAY_AND_SAFE_ZONE_MARKING_FAQS,
  },
  '/guides/video-frame-extractor-guide': {
    seoArticleTitle: 'How to Extract Frames from a Video — Free Step-by-Step Guide',
    metaDescription:
      'Learn how to extract frames from video as still images (PNG/JPG): step-by-step workflow, quality tips, and free tools — without mixing in generic “video review software” results.',
  },
  '/guides/instagram-reels-safe-zone': {
    seoArticleTitle: 'Instagram Reels Safe Zone Guide — IG Reel Dimensions & Safe Area (2026)',
    metaDescription:
      'Instagram reels safe zone 2026: reel and reels dimensions in pixels (1080×1920), IG safe zone tips, and comparisons with TikTok and YouTube Shorts overlays—keep text and logos visible before you post.',
    aboveFoldVariant: 'instagramReelsCross',
    supplementaryFaqs: INSTAGRAM_REELS_SUPPLEMENTARY_FAQS,
  },
  '/guides/tiktok-safe-zone': {
    seoArticleTitle: 'TikTok Safe Zone (2026) — Dimensions, Text Safe Area, Overlay & Template',
    metaDescription:
      'TikTok safe zone 2026: 1080×1920 video, typical ~1080×1420px text safe area, safe zone overlay preview, and template workflow. Compare with Reels; open the free TikTok safe zone checker.',
    aboveFoldVariant: 'tiktokCross',
    supplementaryFaqs: TIKTOK_SUPPLEMENTARY_FAQS,
  },
  '/guides/youtube-shorts-safe-zone': {
    seoArticleTitle:
      'YouTube Shorts Safe Zone 2026 — Aspect Ratio, Text Overlay Best Practices & Channel Art vs Shorts',
    metaDescription:
      'YouTube Shorts aspect ratio requirements 2026 (9:16 / 1080×1920), text overlay best practices, Shorts safe zone template workflow, and disambiguation for youtube safe zone vs channel art 1546×423. Free Shorts checker + banner resizer links.',
    aboveFoldVariant: 'youtubeShortsCross',
    supplementaryFaqs: YOUTUBE_SHORTS_SUPPLEMENTARY_FAQS,
  },
};

export function getStoryblokGuideSeoOverride(canonicalPath: string): StoryblokGuideSeoOverride | undefined {
  return STORYBLOK_GUIDE_SEO_OVERRIDES[canonicalPath];
}
