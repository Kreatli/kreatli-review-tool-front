import Head from 'next/head';

import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';
import { FooterSection } from '../../components/home/Footer/FooterSection';
import { Header } from '../../components/layout/Header';
import { Decorations } from '../../components/layout/Storyblok/Decorations';
import { CTASection } from '../../components/shared/CTASection';
import { MoreFreeToolsSection } from '../../components/shared/MoreFreeToolsSection';
import { getFreeToolsForFreeToolPage } from '../../data/free-tools-page-tools';
import { RelatedResourcesSection } from '../../components/shared/RelatedResourcesSection';
import { BannerFAQ } from '../../components/youtube-banner-resizer/BannerFAQ';
import { BannerGuide } from '../../components/youtube-banner-resizer/BannerGuide';
import { YouTubeBannerResizer } from '../../components/youtube-banner-resizer/YouTubeBannerResizer';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';

export default function YouTubeBannerResizerPage() {
  useSession();

  return (
    <>
      <Head>
        <title>YouTube Banner Resizer - Free Tool | Kreatli</title>
        <meta
          name="description"
          content="Resize YouTube banners to 2560×1440px with safe area previews. Free tool with mobile, desktop, tablet, and TV previews. Export instantly."
        />
        <meta
          name="keywords"
          content="youtube banner resizer, youtube channel art, youtube banner size, 2560x1440, youtube banner maker, free banner tool, channel art resizer, youtube safe area, youtube banner dimensions"
        />
        <meta property="og:title" content="YouTube Banner Resizer - Free Channel Art Tool | Kreatli" />
        <meta
          property="og:description"
          content="Resize YouTube banners to 2560×1440px with safe area previews. Free tool with device previews. Export instantly."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kreatli.com/free-tools/youtube-banner-resizer" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="YouTube Banner Resizer - Free Channel Art Tool | Kreatli" />
        <meta
          name="twitter:description"
          content="Resize YouTube banners to 2560×1440px with safe area previews. Free tool with device previews."
        />
        <link rel="canonical" href="https://kreatli.com/free-tools/youtube-banner-resizer" />
      </Head>
      <Header />
      <Decorations />
      <div className="p-6 pb-12">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col gap-4 pb-6 pt-8">
            <h1 className="mx-auto max-w-lg font-sans text-3xl font-bold sm:text-4xl">YouTube Banner Resizer</h1>
            <p className="mx-auto max-w-2xl text-center text-large text-foreground-500">
              Resize your YouTube channel banner in the perfect dimensions (2560x1440px). Preview safe areas for mobile,
              desktop, tablet, and TV devices. Export your optimized banner instantly—completely free.
            </p>
          </div>
          <YouTubeBannerResizer />
        </div>
      </div>
      <BannerGuide />

      {/* Related Tools Section */}
      <MoreFreeToolsSection tools={getFreeToolsForFreeToolPage('/free-tools/youtube-banner-resizer')} />

      {/* FAQ Section */}
      <BannerFAQ />

      {/* Related Resources Section */}
      <RelatedResourcesSection
        resources={getRelatedResources(['creativeWorkspace', 'reviewApproval', 'projectOrchestration'])}
        description="Learn more about video collaboration workflows, asset management, and team collaboration."
      />

      {/* CTA Section */}
      <CTASection
        title="Working with YouTube videos, assets, and feedback at scale?"
        description="Kreatli is a Video Collaboration & Review Platform for video teams. Manage YouTube content, coordinate with team members, and streamline your workflow."
        primaryButtonText="Start for Free"
      />
      <FooterSection hideCta />
      <SignUpModal />
    </>
  );
}
