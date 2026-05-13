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
import { KREATLI_PLATFORM_ENTRY_HREF, OPEN_IN_KREATLI_LABEL } from '../../constants/kreatliPlatformCta';

export default function YouTubeBannerResizerPage() {
  useSession();

  return (
    <>
      <Head>
        <title>YouTube Banner Resizer (2560×1440) — Crop Channel Art Online | Kreatli</title>
        <meta
          name="description"
          content="Crop YouTube channel art online to the exact 2560×1440 size. Upload an image, move the preview frame to choose what exports, then download PNG/JPG. Upload JPG/PNG/WebP up to 40MB."
        />
        <meta property="og:title" content="YouTube Banner Resizer (2560×1440) — Crop Channel Art Online | Kreatli" />
        <meta
          property="og:description"
          content="Crop YouTube channel art online to the exact 2560×1440 size. Upload an image, move the preview frame to choose what exports, then download PNG/JPG. Upload JPG/PNG/WebP up to 40MB."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kreatli.com/free-tools/youtube-banner-resizer" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="YouTube Banner Resizer (2560×1440) — Crop Channel Art Online | Kreatli" />
        <meta
          name="twitter:description"
          content="Crop YouTube channel art online to the exact 2560×1440 size. Upload an image, move the preview frame to choose what exports, then download PNG/JPG. Upload JPG/PNG/WebP up to 40MB."
        />
        <link rel="canonical" href="https://kreatli.com/free-tools/youtube-banner-resizer" />
      </Head>
      <WebApplicationStructuredData
        name="Kreatli YouTube Banner Resizer"
        description="Crop YouTube channel art online to the exact 2560×1440 size. Upload an image, move the preview frame to choose what exports, then download."
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
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 pb-6 pt-8">
            <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-3 text-center">
              <h1 className="font-sans text-3xl font-bold tracking-tight sm:text-4xl">YouTube Banner Resizer</h1>
              <p className="text-large text-foreground-500">
                Crop to <strong className="font-semibold text-foreground-700">2560×1440</strong>. Move the frame to choose
                what exports, then download PNG/JPG.
              </p>
              <div className="mt-1 flex flex-wrap items-center justify-center gap-2 text-xs text-foreground-500">
                <span className="rounded-full bg-foreground-100 px-3 py-1">Locked 2560×1440</span>
                <span className="rounded-full bg-foreground-100 px-3 py-1">Drag preview frame</span>
                <span className="rounded-full bg-foreground-100 px-3 py-1">Static image</span>
                <span className="rounded-full bg-foreground-100 px-3 py-1">JPG/PNG/WebP (≤40MB)</span>
              </div>
              <p className="text-sm text-foreground-500">
                Posting Shorts too?{' '}
                <NextLink href="/safe-zone-checker/youtube-safe-zone-checker" className="text-primary underline">
                  Check Shorts safe zones
                </NextLink>
                .
              </p>
            </div>
          </div>
          <FreeToolsEntitlementSection
            lockedTitle="YouTube Banner Resizer is available inside Kreatli"
            lockedDescription="Your trial or plan isn’t active. Start a trial or choose a plan to resize and export banners in Kreatli."
          >
            <h2 className="mb-4 text-center font-sans text-xl font-bold text-foreground-800 sm:text-2xl">
              Crop, position, and download your banner
            </h2>
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
        primaryButtonText={OPEN_IN_KREATLI_LABEL}
        primaryButtonHref={KREATLI_PLATFORM_ENTRY_HREF}
      />
      <FooterSection hideCta />
      <SignUpModal />
    </>
  );
}
