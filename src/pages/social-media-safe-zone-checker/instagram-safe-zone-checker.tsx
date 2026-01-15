import Head from 'next/head';

import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';
import { FooterSection } from '../../components/home/Footer/FooterSection';
import { Header } from '../../components/layout/Header';
import { Decorations } from '../../components/layout/Storyblok/Decorations';
import { SafeZoneScreen } from '../../components/safe-zone-checker/SafeZoneScreen/SafeZoneScreen';
import { SafeZoneScreenGuide } from '../../components/safe-zone-checker/SafeZoneScreenGuide';
import { RelatedResourcesSection } from '../../components/shared/RelatedResourcesSection';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';

export default function InstagramSafeZoneCheckerPage() {
  useSession();

  return (
    <>
      <Head>
        <title>Instagram Safe Zone Checker - Preview Reels UI Overlays Free | Kreatli</title>
        <meta
          name="description"
          content="Check your Instagram Reels safe zone before posting. Free tool to preview where Instagram's UI overlays appear - profile picture, username, like button, comment button, share button, and music display. Ensure your text, logos, and key visuals stay visible and never get covered by Instagram's interface elements."
        />
        <meta property="og:title" content="Instagram Safe Zone Checker - Preview Reels UI Overlays Free | Kreatli" />
        <meta
          property="og:description"
          content="Check your Instagram Reels safe zone before posting. Free tool to preview where Instagram's UI overlays appear - profile picture, username, like button, comment button, share button, and music display. Ensure your text, logos, and key visuals stay visible and never get covered by Instagram's interface elements."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Instagram Safe Zone Checker - Preview Reels UI Overlays Free | Kreatli" />
        <meta
          name="twitter:description"
          content="Check your Instagram Reels safe zone before posting. Free tool to preview where Instagram's UI overlays appear - profile picture, username, like button, comment button, share button, and music display. Ensure your text, logos, and key visuals stay visible and never get covered by Instagram's interface elements."
        />
        <link rel="canonical" href="https://kreatli.com/social-media-safe-zone-checker/instagram-safe-zone-checker" />
      </Head>
      <Header />
      <Decorations />
      <div className="p-6 pb-12">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col gap-4 pb-4 pt-8">
            <h1 className="text-center font-sans text-2xl font-bold sm:text-4xl">Instagram Safe Zone Checker</h1>
            <p className="mx-auto max-w-2xl text-center text-large text-foreground-500">
              Upload your Instagram Reels video to preview where UI overlays appear. Keep your text, logos, and visuals
              in the safe zone so they won't be covered by Instagram's UI.
            </p>
          </div>
          <SafeZoneScreen defaultPlatform="instagram" />
        </div>
      </div>
      <SafeZoneScreenGuide platform="instagram" />

      {/* Related Resources Section */}
      <RelatedResourcesSection
        resources={getRelatedResources(['reviewApproval', 'creativeWorkspace', 'blog'])}
        description="Learn more about creative production workflows, asset management, and team collaboration."
      />
      <FooterSection hideCta />
      <SignUpModal />
    </>
  );
}
