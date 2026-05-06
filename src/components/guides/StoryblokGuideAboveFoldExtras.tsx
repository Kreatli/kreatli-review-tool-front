import NextLink from 'next/link';

import { YouTubeBannerSpecsTable } from '../youtube-banner-resizer/YouTubeBannerSpecsTable';
import { getStoryblokGuideSeoOverride } from '../../data/storyblok-guide-seo-overrides';

type Props = {
  slug: string;
};

export function StoryblokGuideAboveFoldExtras({ slug }: Props) {
  const override = getStoryblokGuideSeoOverride(slug);
  const variant = override?.aboveFoldVariant;

  if (variant === 'youtubeBanner') {
    return (
      <section className="mb-8 rounded-2xl border border-primary/20 bg-content1/40 p-6 sm:p-8" aria-labelledby="guide-banner-specs">
        <YouTubeBannerSpecsTable
          className=""
          toolHref="/free-tools/youtube-banner-resizer"
          toolLabel="Use the free YouTube banner resizer"
        />
      </section>
    );
  }

  if (variant === 'safeZoneHub') {
    return (
      <section className="mb-8 rounded-2xl border border-primary/20 bg-content1/40 p-6 sm:p-8" aria-labelledby="guide-safe-zone-banner">
        <h2 id="guide-safe-zone-banner" className="mb-3 font-sans text-xl font-bold sm:text-2xl">
          YouTube channel banner dimensions (2026)
        </h2>
        <p className="mb-4 text-sm text-foreground-600">
          Searching for banner safe area and size? Those specs belong on channel art—this table matches high-intent queries
          like channel banner size dimensions 2026 and safe area without losing clicks to thin snippets.
        </p>
        <p className="mb-4 text-sm text-foreground-600">
          Looking for a <strong className="font-semibold text-foreground-700">transparent overlay for safe zone marking</strong>{' '}
          on vertical video? Use the platform checkers below, or build a 1080×1920 PNG guide in your editor—this hub
          ties dimensions, guides, and preview tools together.
        </p>
        <YouTubeBannerSpecsTable
          showHeading={false}
          toolHref="/free-tools/youtube-banner-resizer"
          toolLabel="Resize with Kreatli’s banner tool"
        />
        <p className="mt-6 text-sm text-foreground-600">
          Platform guides:{' '}
          <NextLink href="/guides/tiktok-safe-zone" className="text-primary underline underline-offset-2">
            TikTok safe zone
          </NextLink>
          ,{' '}
          <NextLink href="/guides/instagram-reels-safe-zone" className="text-primary underline underline-offset-2">
            Instagram Reels
          </NextLink>
          ,{' '}
          <NextLink href="/guides/youtube-shorts-safe-zone" className="text-primary underline underline-offset-2">
            YouTube Shorts
          </NextLink>
          .
        </p>
        <p className="mt-4 text-sm text-foreground-600">
          Interactive checkers (transparent overlay / UI preview):{' '}
          <NextLink href="/safe-zone-checker/tiktok-safe-zone-checker" className="text-primary underline underline-offset-2">
            TikTok checker
          </NextLink>
          ,{' '}
          <NextLink
            href="/safe-zone-checker/instagram-safe-zone-checker"
            className="text-primary underline underline-offset-2"
          >
            Instagram Reels checker
          </NextLink>
          ,{' '}
          <NextLink
            href="/safe-zone-checker/youtube-safe-zone-checker"
            className="text-primary underline underline-offset-2"
          >
            YouTube Shorts checker
          </NextLink>
          .
        </p>
      </section>
    );
  }

  if (variant === 'instagramReelsCross') {
    return (
      <section className="mb-8 rounded-2xl border border-foreground-200 bg-content1/40 p-6 sm:p-8">
        <h2 className="mb-2 font-sans text-lg font-bold sm:text-xl">
          Instagram reel / reels safe zone (2026) &amp; other platforms
        </h2>
        <p className="mb-4 text-sm text-foreground-600">
          Whether visitors search <strong className="font-semibold text-foreground-700">instagram reel safe zone</strong>,{' '}
          <strong className="font-semibold text-foreground-700">instagram reels safe zone</strong>, or{' '}
          <strong className="font-semibold text-foreground-700">ig reels safe zone</strong>, the goal is the same: keep
          titles and logos out of UI-heavy edges on 1080×1920. If you also post on TikTok or Shorts, overlays differ.
        </p>
        <ul className="list-inside list-disc space-y-1 text-sm text-foreground-600">
          <li>
            <NextLink href="/guides/tiktok-safe-zone" className="text-primary underline underline-offset-2">
              TikTok safe zone guide
            </NextLink>
          </li>
          <li>
            <NextLink href="/guides/youtube-shorts-safe-zone" className="text-primary underline underline-offset-2">
              YouTube Shorts safe zone guide
            </NextLink>
          </li>
          <li>
            <NextLink href="/free-tools/youtube-banner-resizer" className="text-primary underline underline-offset-2">
              YouTube channel banner resizer (2560×1440)
            </NextLink>
          </li>
        </ul>
      </section>
    );
  }

  if (variant === 'tiktokCross') {
    return (
      <section className="mb-8 rounded-2xl border border-foreground-200 bg-content1/40 p-6 sm:p-8">
        <p className="mb-4 rounded-lg border border-primary/25 bg-primary/5 px-4 py-2 text-center text-sm font-semibold text-foreground-700">
          Updated for TikTok 2026 specs — validate in the checker before you publish.
        </p>
        <h2 className="mb-2 font-sans text-lg font-bold sm:text-xl">TikTok safe zone vs Reels safe zone</h2>
        <p className="mb-4 text-sm text-foreground-600">
          <strong className="font-semibold text-foreground-700">TikTok safe zone</strong> and{' '}
          <strong className="font-semibold text-foreground-700">tiktok safe zones</strong> searches land here: 1080×1920
          with a typical <strong className="font-semibold text-foreground-700">text safe area around 1080×1420px</strong>.
          Instagram Reels overlays differ — use the Reels guide for side-by-side planning.
        </p>
        <p className="mb-4 text-sm text-foreground-600">
          Need an instant overlay preview?{' '}
          <NextLink
            href="/safe-zone-checker/tiktok-safe-zone-checker"
            className="font-medium text-primary underline underline-offset-2"
          >
            Open the TikTok safe zone checker
          </NextLink>
          . Deep CapCut and editor steps stay in the guide body below.
        </p>
        <p className="text-sm">
          <NextLink href="/guides/instagram-reels-safe-zone" className="font-medium text-primary underline underline-offset-2">
            Instagram Reels safe zone guide
          </NextLink>
        </p>
      </section>
    );
  }

  if (variant === 'youtubeShortsCross') {
    return (
      <section className="mb-8 rounded-2xl border border-foreground-200 bg-content1/40 p-6 sm:p-8">
        <h2 className="mb-2 font-sans text-lg font-bold sm:text-xl">YouTube Shorts vs channel banner art</h2>
        <p className="mb-4 text-sm text-foreground-600">
          This guide focuses on Shorts safe zones (vertical 9:16). Broad{' '}
          <strong className="font-semibold text-foreground-700">youtube safe zone</strong> searches can mean Shorts or
          channel banner—if you need{' '}
          <strong className="font-semibold text-foreground-700">YouTube channel banner size dimensions 2026</strong>, use
          the spec table below and the resizer to validate safe areas on every device.
        </p>
        <YouTubeBannerSpecsTable toolHref="/free-tools/youtube-banner-resizer" toolLabel="Open the YouTube banner resizer" />
        <p className="mt-6 text-sm text-foreground-600">
          Validate vertical Shorts framing (not banner) in the{' '}
          <NextLink href="/safe-zone-checker/youtube-safe-zone-checker" className="text-primary underline underline-offset-2">
            YouTube Shorts safe zone checker
          </NextLink>
          .
        </p>
      </section>
    );
  }

  return null;
}
