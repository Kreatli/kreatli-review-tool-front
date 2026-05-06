/* eslint-disable simple-import-sort/imports */
import Head from 'next/head';
import NextLink from 'next/link';

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
import { WebApplicationStructuredData } from '../../components/shared/WebApplicationStructuredData';
import { BannerFAQ } from '../../components/youtube-banner-resizer/BannerFAQ';
import { BannerGuide } from '../../components/youtube-banner-resizer/BannerGuide';
import { YouTubeBannerResizer } from '../../components/youtube-banner-resizer/YouTubeBannerResizer';
import { YouTubeBannerSpecsTable } from '../../components/youtube-banner-resizer/YouTubeBannerSpecsTable';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';

export default function YouTubeBannerResizerPage() {
  useSession();

  return (
    <>
      <Head>
        <title>YT &amp; YouTube Banner Resizer (2026) — 2560×1440, 1546×423 Safe Zone | Kreatli</title>
        <meta
          name="description"
          content="Resize channel art to exact 2560×1440px with 1546×423px safe-zone preview in browser—YT / YouTube banner resizer. Sign in to export; start a trial if needed."
        />
        <meta property="og:title" content="YouTube Banner Resizer (2026) — Free, Instant Safe-Zone Preview | Kreatli" />
        <meta
          property="og:description"
          content="Resize YouTube channel art to 2560×1440px with safe-zone previews. Free tool — 1546×423px safe area, max 6MB."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kreatli.com/free-tools/youtube-banner-resizer" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="YouTube Banner Resizer (2026) — Free, Instant Safe-Zone Preview | Kreatli"
        />
        <meta
          name="twitter:description"
          content="Resize YouTube channel art to 2560×1440px with safe-zone previews. Free tool — 1546×423px safe area, max 6MB."
        />
        <link rel="canonical" href="https://kreatli.com/free-tools/youtube-banner-resizer" />
      </Head>
      <WebApplicationStructuredData
        name="Kreatli YouTube Banner Resizer"
        description="Resize YouTube channel banners to 2560×1440 with device safe-zone previews in the browser."
        url="https://kreatli.com/free-tools/youtube-banner-resizer"
      />
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
            <h1 className="mx-auto max-w-2xl font-sans text-3xl font-bold sm:text-4xl">
              YouTube banner resizer — 2560×1440px &amp; 1546×423px safe zone
            </h1>
            <p className="mx-auto max-w-2xl text-center text-large text-foreground-500">
              YT / YouTube channel art at the recommended{' '}
              <strong className="font-semibold text-foreground-700">2560×1440px</strong> with a visible{' '}
              <strong className="font-semibold text-foreground-700">1546×423px</strong> safe area before upload. Preview
              desktop, mobile, tablet, and TV. Sign in to use the resizer; start a trial or choose a plan if your
              subscription isn’t active. After export,{' '}
              <NextLink
                href="/safe-zone-checker/youtube-safe-zone-checker"
                className="text-primary underline underline-offset-2"
              >
                check Shorts vertical safe zones
              </NextLink>{' '}
              when you also post 9:16.
            </p>
          </div>
          <FreeToolsEntitlementSection
            lockedTitle="YouTube Banner Resizer is available inside Kreatli"
            lockedDescription="Your trial or plan isn’t active. Start a trial or choose a plan to resize and export banners in Kreatli."
          >
            <YouTubeBannerResizer />
          </FreeToolsEntitlementSection>
          <div className="mx-auto max-w-3xl pt-10">
            <YouTubeBannerSpecsTable showHeading />
          </div>
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
