import Head from 'next/head';

import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';
import { FooterSection } from '../../components/home/Footer/FooterSection';
import { Header } from '../../components/layout/Header';
import { Decorations } from '../../components/layout/Storyblok/Decorations';
import { BreadcrumbStructuredData } from '../../components/shared/BreadcrumbStructuredData';
import { DefinitionBlock } from '../../components/shared/DefinitionBlock';
import { CTASection } from '../../components/shared/CTASection';
import { FreeToolsEntitlementSection } from '../../components/shared/FreeToolsEntitlementSection';
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
        <title>Resize YouTube Banner – Free Channel Art Resizer | Kreatli</title>
        <meta
          name="description"
          content="Resize YouTube banners to 2560×1440 with safe area previews for mobile, desktop, tablet, and TV. Free tool."
        />
        <meta property="og:title" content="Resize YouTube Banner – Free Channel Art Resizer | Kreatli" />
        <meta
          property="og:description"
          content="Resize YouTube banners to 2560×1440 with safe area previews for mobile, desktop, tablet, and TV. Free tool."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kreatli.com/free-tools/youtube-banner-resizer" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Resize YouTube Banner – Free Channel Art Resizer | Kreatli" />
        <meta
          name="twitter:description"
          content="Resize YouTube banners to 2560×1440 with safe area previews for mobile, desktop, tablet, and TV. Free tool."
        />
        <link rel="canonical" href="https://kreatli.com/free-tools/youtube-banner-resizer" />
      </Head>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Free Tools', url: '/free-tools' },
          { name: 'YouTube Banner Resizer', url: '/free-tools/youtube-banner-resizer' },
        ]}
      />
      <Header />
      <Decorations />
      <div className="p-6 pb-12">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col gap-4 pb-6 pt-8">
            <h1 className="mx-auto max-w-lg font-sans text-3xl font-bold sm:text-4xl">YouTube Banner Resizer</h1>
            <p className="mx-auto max-w-2xl text-center text-large text-foreground-500">
              Resize your YouTube channel banner in the perfect dimensions (2560x1440px). Preview safe areas for mobile,
              desktop, tablet, and TV devices. Sign in to use the resizer; start a trial or choose a plan if your
              subscription isn’t active.
            </p>
          </div>
          <FreeToolsEntitlementSection
            lockedTitle="YouTube Banner Resizer is available inside Kreatli"
            lockedDescription="Your trial or plan isn’t active. Start a trial or choose a plan to resize and export banners in Kreatli."
          >
            <YouTubeBannerResizer />
          </FreeToolsEntitlementSection>
        </div>
      </div>
      <DefinitionBlock term="YouTube Banner Resizer">
        A YouTube banner resizer crops or scales channel art to the correct dimensions and safe areas for desktop,
        mobile, tablet, and TV. Brand and social teams use it to validate layouts before publish so critical logo and
        copy are not clipped on smaller screens.
      </DefinitionBlock>
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
        primaryButtonText="Start 7-day trial"
      />
      <FooterSection hideCta />
      <SignUpModal />
    </>
  );
}
