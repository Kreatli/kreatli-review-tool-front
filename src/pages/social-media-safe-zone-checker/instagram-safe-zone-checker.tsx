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

export default function InstagramSafeZoneCheckerPage() {
  useSession();

  return (
    <>
      <Head>
        <title>Instagram Reels Safe Zone Checker - Free Tool | Kreatli</title>
        <meta
          name="description"
          content="Preview Instagram Reels UI overlays before posting. See where profile picture, username, buttons, and music display appear. Free tool—no sign-up required."
        />
        <meta property="og:title" content="Instagram Reels Safe Zone Checker - Free Tool | Kreatli" />
        <meta
          property="og:description"
          content="Preview Instagram Reels UI overlays before posting. See where profile picture, username, buttons, and music display appear. Free tool."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kreatli.com/social-media-safe-zone-checker/instagram-safe-zone-checker" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Instagram Reels Safe Zone Checker - Free Tool | Kreatli" />
        <meta
          name="twitter:description"
          content="Preview Instagram Reels UI overlays before posting. Free tool to ensure your content stays visible."
        />
        <link rel="canonical" href="https://kreatli.com/social-media-safe-zone-checker/instagram-safe-zone-checker" />
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
          <SafeZoneScreen defaultPlatform="instagram" />
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
        primaryButtonText="Start for Free"
      />
      <FooterSection hideCta />
      <SignUpModal />
    </>
  );
}
