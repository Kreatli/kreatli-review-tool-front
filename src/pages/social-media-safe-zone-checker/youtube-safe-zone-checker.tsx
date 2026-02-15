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

export default function YouTubeSafeZoneCheckerPage() {
  return (
    <>
      <Head>
        <title>YouTube Shorts Safe Zone Checker - Free Tool | Kreatli</title>
        <meta
          name="description"
          content="Preview YouTube Shorts UI overlays before publishing. See where channel name, subscribe button, like button, comments, and video controls appear. Free tool."
        />
        <meta property="og:title" content="YouTube Shorts Safe Zone Checker - Free Preview Tool | Kreatli" />
        <meta
          property="og:description"
          content="Preview YouTube Shorts UI overlays before publishing. See where channel name, subscribe button, like button, comments, and video controls appear. Free tool."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://kreatli.com/social-media-safe-zone-checker/youtube-safe-zone-checker"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="YouTube Shorts Safe Zone Checker - Free Preview Tool | Kreatli" />
        <meta
          name="twitter:description"
          content="Preview YouTube Shorts UI overlays before publishing. Free tool to ensure your content stays visible."
        />
        <link rel="canonical" href="https://kreatli.com/social-media-safe-zone-checker/youtube-safe-zone-checker" />
      </Head>
      <Header />
      <Decorations />
      <div className="p-6 pb-12">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col gap-4 pb-4 pt-8">
            <h1 className="mx-auto max-w-lg text-center font-sans text-3xl font-bold sm:text-4xl">
              YouTube Shorts Safe Zone Checker
            </h1>
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
        description="Learn more about video collaboration workflows, asset management, and team collaboration."
      />

      {/* CTA Section */}
      <CTASection
        title="Ready to Ensure Your Content Looks Perfect?"
        description="Use our safe zone checker tool to preview your content with accurate platform overlays. Ensure your videos, titles, logos, and CTAs stay visible across all devices and platforms."
        primaryButtonText="Start for Free"
      />
      <FooterSection hideCta />
      <SignUpModal sourceType="safe-zone-checker" />
    </>
  );
}
