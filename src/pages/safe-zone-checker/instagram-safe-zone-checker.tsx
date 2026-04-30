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

export default function InstagramSafeZoneCheckerPage() {
  return (
    <>
      <Head>
        <title>Instagram Reels Safe Zone Checker - Free Tool | Kreatli</title>
        <meta
          name="description"
          content="Instagram Reels safe zone checker: 1080×1920 vertical video — preview profile, caption, and audio UI. Reels safe zone vs TikTok: compare with our TikTok checker. Free tool."
        />
        <meta property="og:title" content="Instagram Reels Safe Zone Checker - Free Tool | Kreatli" />
        <meta
          property="og:description"
          content="Preview Instagram Reels UI overlays before posting. See where profile picture, username, buttons, and music display appear. Free tool."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kreatli.com/safe-zone-checker/instagram-safe-zone-checker" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Instagram Reels Safe Zone Checker - Free Tool | Kreatli" />
        <meta
          name="twitter:description"
          content="Preview Instagram Reels UI overlays before posting. Free tool to ensure your content stays visible."
        />
        <link rel="canonical" href="https://kreatli.com/safe-zone-checker/instagram-safe-zone-checker" />
      </Head>
      <Header />
      <Decorations />
      <div className="p-6 pb-12">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col gap-4 pb-4 pt-8">
            <h1 className="mx-auto max-w-lg font-sans text-3xl font-bold sm:text-4xl">Instagram Safe Zone Checker</h1>
            <p className="mx-auto max-w-2xl text-center text-large text-foreground-500">
              Upload your Instagram Reels video to preview where UI overlays appear. Keep your text, logos, and visuals
              in the safe zone so they won't be covered by Instagram's UI.
            </p>
          </div>
          <FreeToolsEntitlementSection
            lockedTitle="Instagram Safe Zone Checker is available inside Kreatli"
            lockedDescription="Your trial or plan isn’t active. Start a trial or choose a plan to upload and check safe zones in Kreatli."
          >
            <SafeZoneScreen defaultPlatform="instagram" />
          </FreeToolsEntitlementSection>
          <section
            className="mx-auto mt-10 max-w-2xl px-2"
            aria-labelledby="instagram-reels-safe-heading"
          >
            <h2 id="instagram-reels-safe-heading" className="mb-2 text-center font-sans text-lg font-bold sm:text-xl">
              Reels safe zone
            </h2>
            <p className="text-center text-sm text-foreground-500">
              Designing for <strong className="font-semibold text-foreground-700">instagram reel safe zone</strong>?
              Reels use a 1080×1920 canvas — keep critical text centered and away from bottom UI. Also posting on{' '}
              <NextLink
                href="/safe-zone-checker/tiktok-safe-zone-checker"
                className="text-primary underline underline-offset-2"
              >
                TikTok
              </NextLink>{' '}
              or{' '}
              <NextLink
                href="/safe-zone-checker/youtube-safe-zone-checker"
                className="text-primary underline underline-offset-2"
              >
                YouTube Shorts
              </NextLink>
              ? Use each checker — overlays differ. For{' '}
              <NextLink href="/free-tools/youtube-banner-resizer" className="text-primary underline underline-offset-2">
                YouTube channel banner dimensions 2026
              </NextLink>
              , use the resizer (2560×1440, 1546×423 safe zone).
            </p>
          </section>
        </div>
      </div>
      <SafeZoneScreenGuide platform="instagram" />

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
