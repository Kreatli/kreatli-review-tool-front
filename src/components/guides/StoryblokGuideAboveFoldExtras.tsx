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
          Searching for banner safe area and size? Those specs belong on channel art — add them here so you don’t lose
          clicks to mismatched snippets.
        </p>
        <YouTubeBannerSpecsTable
          showHeading={false}
          toolHref="/free-tools/youtube-banner-resizer"
          toolLabel="Resize with Kreatli’s banner tool"
        />
        <p className="mt-6 text-sm text-foreground-600">
          Platform safe zone tools:{' '}
          <NextLink href="/safe-zone-checker/tiktok-safe-zone-checker" className="text-primary underline underline-offset-2">
            TikTok
          </NextLink>
          ,{' '}
          <NextLink
            href="/safe-zone-checker/instagram-safe-zone-checker"
            className="text-primary underline underline-offset-2"
          >
            Instagram Reels
          </NextLink>
          ,{' '}
          <NextLink
            href="/safe-zone-checker/youtube-safe-zone-checker"
            className="text-primary underline underline-offset-2"
          >
            YouTube Shorts
          </NextLink>
          .
        </p>
      </section>
    );
  }

  if (variant === 'instagramReelsCross') {
    return (
      <section className="mb-8 rounded-2xl border border-foreground-200 bg-content1/40 p-6 sm:p-8">
        <h2 className="mb-2 font-sans text-lg font-bold sm:text-xl">Instagram reel safe zone &amp; other platforms</h2>
        <p className="mb-4 text-sm text-foreground-600">
          If you also post on TikTok or Shorts, UI overlays differ. Use each platform’s checker and keep{' '}
          <strong className="font-semibold text-foreground-700">instagram reel safe zone</strong> wording when you
          design single verticals for multiple apps.
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
        <h2 className="mb-2 font-sans text-lg font-bold sm:text-xl">Reels safe zone vs TikTok</h2>
        <p className="mb-4 text-sm text-foreground-600">
          <strong className="font-semibold text-foreground-700">Reels safe zone</strong> traffic sometimes lands here.
          TikTok uses 1080×1920 with a typical text safe area around 1080×1420px; Instagram Reels overlays differ — see
          the Reels guide for side-by-side planning.
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
          This guide focuses on Shorts safe zones. If you need{' '}
          <strong className="font-semibold text-foreground-700">YouTube channel banner size dimensions 2026</strong>, use
          the spec table below and the resizer to validate safe areas on every device.
        </p>
        <YouTubeBannerSpecsTable toolHref="/free-tools/youtube-banner-resizer" toolLabel="Open the YouTube banner resizer" />
      </section>
    );
  }

  return null;
}
