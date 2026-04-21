/* eslint-disable max-len */
import Head from 'next/head';

import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';
import { FooterSection } from '../../components/home/Footer/FooterSection';
import { Header } from '../../components/layout/Header';
import { Decorations } from '../../components/layout/Storyblok/Decorations';
import { VideoCompressorFAQ, VIDEO_COMPRESSOR_FAQS } from '../../components/video-compressor/VideoCompressorFAQ';
import { VideoCompressorGuide } from '../../components/video-compressor/VideoCompressorGuide';
import { VideoCompressorTool } from '../../components/video-compressor/VideoCompressorTool';
import { BreadcrumbStructuredData } from '../../components/shared/BreadcrumbStructuredData';
import { CTASection } from '../../components/shared/CTASection';
import { DefinitionBlock } from '../../components/shared/DefinitionBlock';
import { FAQStructuredData } from '../../components/shared/FAQStructuredData';
import { FreeToolsEntitlementSection } from '../../components/shared/FreeToolsEntitlementSection';
import { MoreFreeToolsSection } from '../../components/shared/MoreFreeToolsSection';
import { RelatedResourcesSection } from '../../components/shared/RelatedResourcesSection';
import { getFreeToolsForFreeToolPage } from '../../data/free-tools-page-tools';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';

export default function VideoCompressorPage() {
  useSession();

  return (
    <>
      <Head>
        <title>Video Compressor Online – Free Video Compression Tool | Kreatli</title>
        <meta
          name="description"
          content="Compress video to a target file size in your browser. No upload required—processing runs locally. Free to use."
        />
        <meta property="og:title" content="Video Compressor Online – Free Video Compression Tool | Kreatli" />
        <meta
          property="og:description"
          content="Compress video to a target file size in your browser. No upload required—processing runs locally. Free to use."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kreatli.com/free-tools/video-compressor" />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Video Compressor Online – Free Video Compression Tool | Kreatli" />
        <meta
          name="twitter:description"
          content="Compress video to a target file size in your browser. No upload required—processing runs locally. Free to use."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
        <link rel="canonical" href="https://kreatli.com/free-tools/video-compressor" />
      </Head>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Free Tools', url: '/free-tools' },
          { name: 'Video Compressor', url: '/free-tools/video-compressor' },
        ]}
      />
      <FAQStructuredData faqs={VIDEO_COMPRESSOR_FAQS} />
      <Header />
      <Decorations />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        Skip to main content
      </a>

      <main id="main-content">
        <section className="relative overflow-hidden px-6 pb-4 pt-16">
          <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 text-center">
            <h1 className="mx-auto max-w-lg font-sans text-3xl font-bold sm:text-4xl">Video Compressor</h1>
            <p className="mx-auto max-w-3xl text-lg text-foreground-500">
              Compress video to a target file size in your browser—no upload, processing runs locally. Try without
              signing in, or with an active Kreatli trial or plan if you are signed in.
            </p>
          </div>
        </section>

        <section className="relative overflow-hidden px-6 pb-12">
          <div className="relative z-10 mx-auto max-w-6xl">
            <FreeToolsEntitlementSection
              lockedTitle="Video Compressor is available inside Kreatli"
              lockedDescription="Your trial or plan isn’t active. Start a trial or choose a plan to compress videos in Kreatli."
            >
              <VideoCompressorTool />
            </FreeToolsEntitlementSection>
          </div>
        </section>

        <DefinitionBlock term="Video compressor">
          A video compressor reduces file size so you can share, upload, or deliver a video faster. It works by
          lowering bitrate (and sometimes resolution) while aiming to keep quality acceptable for review and approvals.
        </DefinitionBlock>

        <VideoCompressorGuide />

        <MoreFreeToolsSection tools={getFreeToolsForFreeToolPage('/free-tools/video-compressor')} title="More Tools for Video Teams" />

        <VideoCompressorFAQ />

        <RelatedResourcesSection
          resources={getRelatedResources(['reviewApproval', 'creativeWorkspace', 'secureAssetStorage'])}
          title="More Resources"
          description="Learn more about video collaboration workflows, asset review and approvals, and secure file delivery."
        />

        <CTASection
          title="Need feedback and approvals on video assets?"
          description="Kreatli is a Video Collaboration & Review Platform for video teams. Upload videos, collect frame-accurate feedback, keep discussions organized, and move projects forward."
          primaryButtonText="Start 7-day trial"
        />
      </main>

      <FooterSection hideCta />
      <SignUpModal />
    </>
  );
}

