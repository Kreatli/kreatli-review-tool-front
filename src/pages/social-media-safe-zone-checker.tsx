import Head from 'next/head';

import { SignUpModal } from '../components/auth/SignUpForm/SignUpModal';
import { FooterSection } from '../components/home/Footer/FooterSection';
import { Header } from '../components/layout/Header';
import { Decorations } from '../components/layout/Storyblok/Decorations';
import { SafeZoneScreenGuide } from '../components/safe-zone-checker/SafeZoneScreenGuide';
import { SocialMediaSafeZoneChecker } from '../components/safe-zone-checker/SocialMediaSafeZoneChecker';
import { CTASection } from '../components/shared/CTASection';
import { RelatedResourcesSection } from '../components/shared/RelatedResourcesSection';
import { getRelatedResources } from '../data/related-resources';
import { useSession } from '../hooks/useSession';

export default function ProjectsPage() {
  useSession();

  return (
    <>
      <Head>
        <title>Kreatli | Social Media Safe Zone Checker: TikTok, Reels, Shorts</title>
        <meta
          name="description"
          content="Preview your content with platform-specific safe zones and UI overlays for TikTok, Instagram Reels, and YouTube Shorts. Ensure your videos look perfect on every platform."
        />
        <meta property="og:title" content="Kreatli | Social Media Safe Zone Checker: TikTok, Reels, Shorts" />
        <meta
          property="og:description"
          content="Preview your content with platform-specific safe zones and UI overlays for TikTok, Instagram Reels, and YouTube Shorts. Ensure your videos look perfect on every platform."
        />
      </Head>
      <Header />
      <Decorations />
      <SocialMediaSafeZoneChecker />
      <SafeZoneScreenGuide />

      {/* More Resources Section */}
      <RelatedResourcesSection
        resources={getRelatedResources(['reviewApproval', 'creativeWorkspace', 'blog'])}
        title="More Resources"
        description="Learn more about creative production workflows, asset management, and team collaboration."
      />

      {/* CTA Section */}
      <CTASection
        title="Ready to Ensure Your Content Looks Perfect?"
        description="Use our safe zone checker tool to preview your content with accurate platform overlays. Ensure your videos, titles, logos, and CTAs stay visible across all devices and platforms."
        primaryButtonText="Start for Free"
      />
      <FooterSection hideCta />
      <SignUpModal />
    </>
  );
}
