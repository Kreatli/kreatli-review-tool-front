import Head from 'next/head';
import NextLink from 'next/link';

import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';
import { FooterSection } from '../../components/home/Footer/FooterSection';
import { Header } from '../../components/layout/Header';
import { Decorations } from '../../components/layout/Storyblok/Decorations';
import { SafeZoneScreen } from '../../components/safe-zone-checker/SafeZoneScreen/SafeZoneScreen';
import { SafeZoneScreenGuide } from '../../components/safe-zone-checker/SafeZoneScreenGuide';
import { CTASection } from '../../components/shared/CTASection';
import { FreeToolsEntitlementSection } from '../../components/shared/FreeToolsEntitlementSection';
import { RelatedResourcesSection } from '../../components/shared/RelatedResourcesSection';
import { getRelatedResources } from '../../data/related-resources';

export default function TikTokSafeZoneCheckerPage() {
  return (
    <>
      <Head>
        <title>TikTok Safe Zone Checker - Free Preview Tool | Kreatli</title>
        <meta
          name="description"
          content="Use this TikTok safe zone checker tool to instantly preview 1080×1920 UI overlays—not just read specs. TikTok safe zone overlay on your upload. Want depth? Read the TikTok safe zone guide. Sign in to use the tool."
        />
        <meta property="og:title" content="TikTok Safe Zone Checker - Free Preview Tool | Kreatli" />
        <meta
          property="og:description"
          content="Preview TikTok UI overlays before posting. See where profile pictures, usernames, music tracks, and engagement buttons appear. Free tool."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kreatli.com/safe-zone-checker/tiktok-safe-zone-checker" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TikTok Safe Zone Checker - Free Preview Tool | Kreatli" />
        <meta
          name="twitter:description"
          content="Preview TikTok UI overlays before posting. Free tool to ensure your content stays visible."
        />
        <link rel="canonical" href="https://kreatli.com/safe-zone-checker/tiktok-safe-zone-checker" />
      </Head>
      <Header />
      <Decorations />
      <div className="p-6 pb-12">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col gap-4 pb-4 pt-8">
            <h1 className="mx-auto max-w-lg font-sans text-3xl font-bold sm:text-4xl">TikTok Safe Zone Checker</h1>
            <p className="mx-auto max-w-2xl text-center text-large text-foreground-500">
              Upload your video to preview <strong className="font-semibold text-foreground-700">TikTok safe zone</strong>{' '}
              overlays in seconds. New to the topic? Read the{' '}
              <NextLink href="/guides/tiktok-safe-zone" className="text-primary underline underline-offset-2">
                TikTok safe zone guide
              </NextLink>{' '}
              for pixels and templates—then validate here interactively.
            </p>
          </div>
          <FreeToolsEntitlementSection
            lockedTitle="TikTok Safe Zone Checker is available inside Kreatli"
            lockedDescription="Your trial or plan isn’t active. Start a trial or choose a plan to upload and check safe zones in Kreatli."
          >
            <SafeZoneScreen defaultPlatform="tiktok" />
          </FreeToolsEntitlementSection>
          <section className="mx-auto mt-10 max-w-2xl px-2" aria-labelledby="tiktok-reels-cross-heading">
            <h2 id="tiktok-reels-cross-heading" className="mb-2 text-center font-sans text-lg font-bold sm:text-xl">
              Reels safe zone &amp; YouTube Shorts
            </h2>
            <p className="text-center text-sm text-foreground-500">
              Queries for <strong className="font-semibold text-foreground-700">reels safe zone</strong> often apply to
              vertical video on multiple apps. TikTok uses 1080×1920 with a narrower text-safe band than some Reels
              layouts — preview both:{' '}
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
        </div>
      </div>
      <SafeZoneScreenGuide platform="tiktok" />

      {/* More Resources Section */}
      <RelatedResourcesSection
        resources={getRelatedResources(['reviewApproval', 'creativeWorkspace', 'blog'])}
        title="More Resources"
        description="Learn more about video collaboration workflows, asset management, and team collaboration."
      />

      {/* CTA Section */}
      <CTASection
        title="Ready to Ensure Your Content Looks Perfect?"
        description="Use our safe zone checker tool to preview your content with accurate platform overlays. Ensure your videos, titles, logos, and CTAs stay visible across all devices and platforms."
        primaryButtonText="Start 7-day trial"
      />
      <FooterSection hideCta />
      <SignUpModal sourceType="safe-zone-checker" />
    </>
  );
}
