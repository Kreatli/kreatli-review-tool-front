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
        <title>Free Safe Zone Checker - TikTok, Reels, Shorts | Kreatli</title>
        <meta
          name="description"
          content="Preview safe zones and UI overlays for TikTok, Instagram Reels, and YouTube Shorts. Free tool to ensure your videos look perfect on every platform. No sign-up required."
        />
        <meta property="og:title" content="Social Media Safe Zone Checker - TikTok, Reels, Shorts | Kreatli" />
        <meta
          property="og:description"
          content="Preview safe zones and UI overlays for TikTok, Instagram Reels, and YouTube Shorts. Free tool to ensure your videos look perfect on every platform."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kreatli.com/social-media-safe-zone-checker" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Social Media Safe Zone Checker - TikTok, Reels, Shorts | Kreatli" />
        <meta
          name="twitter:description"
          content="Preview safe zones and UI overlays for TikTok, Instagram Reels, and YouTube Shorts. Free tool for perfect videos."
        />
        <link rel="canonical" href="https://kreatli.com/social-media-safe-zone-checker" />
      </Head>
      <Header />
      <Decorations />
      <SocialMediaSafeZoneChecker />
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
        primaryButtonText="Start for Free"
      />
      <FooterSection hideCta />
      <SignUpModal />
    </>
  );
}
