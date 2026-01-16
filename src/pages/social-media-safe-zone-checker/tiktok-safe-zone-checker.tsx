import Head from 'next/head';

import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';
import { FooterSection } from '../../components/home/Footer/FooterSection';
import { Header } from '../../components/layout/Header';
import { Decorations } from '../../components/layout/Storyblok/Decorations';
import { SafeZoneScreen } from '../../components/safe-zone-checker/SafeZoneScreen/SafeZoneScreen';
import { SafeZoneScreenGuide } from '../../components/safe-zone-checker/SafeZoneScreenGuide';
import { CTASection } from '../../components/shared/CTASection';
import { RelatedResourcesSection } from '../../components/shared/RelatedResourcesSection';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';

export default function TikTokSafeZoneCheckerPage() {
  useSession();

  return (
    <>
      <Head>
        <title>TikTok Safe Zone Checker - Free Tool to Preview UI Overlays | Kreatli</title>
        <meta
          name="description"
          content="Check your TikTok video safe zones before posting. Our free TikTok safe zone checker shows exactly where profile pictures, usernames, music tracks, and engagement buttons appear on your vertical videos. Perfect for TikTok creators who want to keep captions, text overlays, and important visuals visible. Upload your 9:16 video and see where TikTok's UI elements will cover your content."
        />
        <meta property="og:title" content="TikTok Safe Zone Checker - Free Tool to Preview UI Overlays | Kreatli" />
        <meta
          property="og:description"
          content="Check your TikTok video safe zones before posting. Our free TikTok safe zone checker shows exactly where profile pictures, usernames, music tracks, and engagement buttons appear on your vertical videos. Perfect for TikTok creators who want to keep captions, text overlays, and important visuals visible."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TikTok Safe Zone Checker - Free Tool to Preview UI Overlays | Kreatli" />
        <meta
          name="twitter:description"
          content="Check your TikTok video safe zones before posting. Our free TikTok safe zone checker shows exactly where profile pictures, usernames, music tracks, and engagement buttons appear on your vertical videos. Perfect for TikTok creators who want to keep captions, text overlays, and important visuals visible."
        />
        <link rel="canonical" href="https://kreatli.com/social-media-safe-zone-checker/tiktok-safe-zone-checker" />
      </Head>
      <Header />
      <Decorations />
      <div className="p-6 pb-12">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col gap-4 pb-4 pt-8">
            <h1 className="text-center font-sans text-2xl font-bold sm:text-4xl">TikTok Safe Zone Checker</h1>
            <p className="mx-auto max-w-2xl text-center text-large text-foreground-500">
              Upload your TikTok video to preview where profile info, music tracks, and engagement buttons appear. Keep
              captions, text, and visuals in the safe zone to avoid UI overlays.
            </p>
          </div>
          <SafeZoneScreen defaultPlatform="tiktok" />
        </div>
      </div>
      <SafeZoneScreenGuide platform="tiktok" />

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
