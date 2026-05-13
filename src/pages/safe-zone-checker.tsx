import Head from 'next/head';

import { SignUpModal } from '../components/auth/SignUpForm/SignUpModal';
import { FooterSection } from '../components/home/Footer/FooterSection';
import { Header } from '../components/layout/Header';
import { Decorations } from '../components/layout/Storyblok/Decorations';
import { SafeZoneChecker } from '../components/safe-zone-checker/SafeZoneChecker';
import { SafeZoneCheckerHubLinks } from '../components/safe-zone-checker/SafeZoneCheckerHubLinks';
import { SafeZoneScreenGuide } from '../components/safe-zone-checker/SafeZoneScreenGuide';
import { CTASection } from '../components/shared/CTASection';
import { FreeToolsEntitlementSection } from '../components/shared/FreeToolsEntitlementSection';
import { RelatedResourcesSection } from '../components/shared/RelatedResourcesSection';
import { KREATLI_PLATFORM_ENTRY_HREF, OPEN_IN_KREATLI_LABEL } from '../constants/kreatliPlatformCta';
import { getRelatedResources } from '../data/related-resources';

export default function ProjectsPage() {
  return (
    <>
      <Head>
        <title>Free Safe Zone Checker - TikTok, Reels, Shorts | Kreatli</title>
        <meta
          name="description"
          content="Social media safe zone checker: transparent overlay / UI preview for TikTok, Instagram Reels, and YouTube Shorts—see where captions and buttons cover your video. Plus channel banner 2560×1440 / 1546×423 context. Sign in to upload."
        />
        <meta property="og:title" content="Safe Zone Checker - TikTok, Reels, Shorts | Kreatli" />
        <meta
          property="og:description"
          content="Preview safe zones for TikTok, Reels, and Shorts. Sign in to use the checker; start a trial or choose a plan if your subscription isn’t active."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kreatli.com/safe-zone-checker" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Safe Zone Checker - TikTok, Reels, Shorts | Kreatli" />
        <meta
          name="twitter:description"
          content="Preview safe zones and UI overlays for TikTok, Instagram Reels, and YouTube Shorts. Free tool for perfect videos."
        />
        <link rel="canonical" href="https://kreatli.com/safe-zone-checker" />
      </Head>
      <Header />
      <Decorations />
      <div className="px-6 pb-12">
        <div className="mx-auto max-w-6xl">
          <FreeToolsEntitlementSection
            lockedTitle="Safe Zone Checker is available inside Kreatli"
            lockedDescription="Your trial or plan isn’t active. Start a trial or choose a plan to upload and check safe zones in Kreatli."
          >
            <SafeZoneChecker />
          </FreeToolsEntitlementSection>
        </div>
      </div>
      <SafeZoneCheckerHubLinks />
      <SafeZoneScreenGuide />

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
        primaryButtonText={OPEN_IN_KREATLI_LABEL}
        primaryButtonHref={KREATLI_PLATFORM_ENTRY_HREF}
      />
      <FooterSection hideCta />
      <SignUpModal sourceType="safe-zone-checker" />
    </>
  );
}
