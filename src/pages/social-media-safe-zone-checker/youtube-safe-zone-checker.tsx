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

export default function YouTubeSafeZoneCheckerPage() {
  useSession();

  return (
    <>
      <Head>
        <title>YouTube Shorts Safe Zone Checker - Free Tool to Preview UI Overlays | Kreatli</title>
        <meta
          name="description"
          content="Test your YouTube Shorts video layout before publishing. Our free safe zone checker shows exactly where YouTube's UI overlays appear - channel name, subscribe button, like button, comments, share button, and video controls. Perfect your Shorts content and ensure text, logos, and key visuals stay visible. No more hidden content or blocked elements in your YouTube Shorts videos."
        />
        <meta
          property="og:title"
          content="YouTube Shorts Safe Zone Checker - Free Tool to Preview UI Overlays | Kreatli"
        />
        <meta
          property="og:description"
          content="Test your YouTube Shorts video layout before publishing. Our free safe zone checker shows exactly where YouTube's UI overlays appear - channel name, subscribe button, like button, comments, share button, and video controls. Perfect your Shorts content and ensure text, logos, and key visuals stay visible. No more hidden content or blocked elements in your YouTube Shorts videos."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="YouTube Shorts Safe Zone Checker - Free Tool to Preview UI Overlays | Kreatli"
        />
        <meta
          name="twitter:description"
          content="Test your YouTube Shorts video layout before publishing. Our free safe zone checker shows exactly where YouTube's UI overlays appear - channel name, subscribe button, like button, comments, share button, and video controls. Perfect your Shorts content and ensure text, logos, and key visuals stay visible. No more hidden content or blocked elements in your YouTube Shorts videos."
        />
        <link rel="canonical" href="https://kreatli.com/social-media-safe-zone-checker/youtube-safe-zone-checker" />
      </Head>
      <Header />
      <Decorations />
      <div className="p-6 pb-12">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col gap-4 pb-4 pt-8">
            <h1 className="text-center font-sans text-2xl font-bold sm:text-4xl">YouTube Shorts Safe Zone Checker</h1>
            <p className="mx-auto max-w-2xl text-center text-large text-foreground-500">
              Upload your YouTube Shorts video to preview where channel name, subscribe button, like button, comments,
              share button, and video controls appear.
            </p>
          </div>
          <SafeZoneScreen defaultPlatform="youtube" />
        </div>
      </div>
      <SafeZoneScreenGuide platform="youtube" />

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
