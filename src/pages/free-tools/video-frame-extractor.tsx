 
import { Button } from '@heroui/react';
import Head from 'next/head';
import NextLink from 'next/link';

import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';
import { FooterSection } from '../../components/home/Footer/FooterSection';
import { Header } from '../../components/layout/Header';
import { Decorations } from '../../components/layout/Storyblok/Decorations';
import { BreadcrumbStructuredData } from '../../components/shared/BreadcrumbStructuredData';
import { CTASection } from '../../components/shared/CTASection';
import { DefinitionBlock } from '../../components/shared/DefinitionBlock';
import { FAQStructuredData } from '../../components/shared/FAQStructuredData';
import { FreeToolsEntitlementSection } from '../../components/shared/FreeToolsEntitlementSection';
import { MoreFreeToolsSection } from '../../components/shared/MoreFreeToolsSection';
import { RelatedResourcesSection } from '../../components/shared/RelatedResourcesSection';
import { WebApplicationStructuredData } from '../../components/shared/WebApplicationStructuredData';
import { VideoFrameExtractor } from '../../components/video-frame-extractor/VideoFrameExtractor';
import { VideoFrameExtractorFAQ } from '../../components/video-frame-extractor/VideoFrameExtractorFAQ';
import { VideoFrameExtractorGuide } from '../../components/video-frame-extractor/VideoFrameExtractorGuide';
import { KREATLI_PLATFORM_ENTRY_HREF, OPEN_IN_KREATLI_LABEL } from '../../constants/kreatliPlatformCta';
import { getFreeToolsForFreeToolPage } from '../../data/free-tools-page-tools';
import { getRelatedResources } from '../../data/related-resources';
import { getVideoFrameExtractorStructuredFaqs } from '../../data/video-frame-extractor-faq-content';
import { useSession } from '../../hooks/useSession';
import { pushSignupCtaClick } from '../../lib/gtmDataLayer';

export default function VideoFrameExtractorPage() {
  useSession();

  return (
    <>
      <Head>
        <title>Free Video Frame Extractor — Extract Frames from Video | Kreatli</title>
        <meta
          name="description"
          content="Video frame extractor: extract frames from video in the browser—video-to-frame PNG/JPG or ZIP, no extra app required. Sign in to use the tool; start a trial if needed."
        />
        <meta property="og:title" content="Free Video Frame Extractor — Extract Frames from Video | Kreatli" />
        <meta
          property="og:description"
          content="Extract still frames from video instantly—PNG/JPG or ZIP. Built for accurate grabs, not generic video review snippets."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kreatli.com/free-tools/video-frame-extractor" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Video Frame Extractor — Extract Frames from Video | Kreatli" />
        <meta
          name="twitter:description"
          content="Extract still frames from video in the browser—PNG/JPG or ZIP export."
        />
        <link rel="canonical" href="https://kreatli.com/free-tools/video-frame-extractor" />
      </Head>
      <WebApplicationStructuredData
        name="Kreatli Video Frame Extractor"
        description="Extract still frames from video and download PNG or JPG in the browser."
        url="https://kreatli.com/free-tools/video-frame-extractor"
      />
      <FAQStructuredData faqs={getVideoFrameExtractorStructuredFaqs()} />
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Free Tools', url: '/free-tools' },
          { name: 'Video Frame Extractor', url: '/free-tools/video-frame-extractor' },
        ]}
      />
      <Header />
      <Decorations />

      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        Skip to main content
      </a>

      <main id="main-content">
        {/* Hero */}
        <section className="relative overflow-hidden px-6 pb-4 pt-16">
          <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 text-center">
            <h1 className="mx-auto max-w-2xl font-sans text-3xl font-bold sm:text-4xl">
              Video frame extractor — extract frames from video
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-foreground-500">
              Your <strong className="font-semibold text-foreground-700">video-to-frame</strong> workflow in the
              browser: decoded stills from MP4, MOV, or WebM—not screen grabs—so thumbnails and QC grabs stay
              pixel-consistent. Pull <strong className="font-semibold text-foreground-700">PNG</strong>,{' '}
              <strong className="font-semibold text-foreground-700">JPG</strong>, or a{' '}
              <strong className="font-semibold text-foreground-700">ZIP</strong> when you need multiple grabs. No
              separate desktop app required (you download exports as usual). Sign in to extract; start a{' '}
              <strong className="font-semibold text-foreground-700">7-day trial</strong> if your plan isn’t active yet.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Button
                as={NextLink}
                href="/sign-up"
                size="lg"
                className="bg-foreground text-content1"
                onClick={() => pushSignupCtaClick({ location: 'video_frame_extractor_hero_primary' })}
              >
                Start 7-day trial to use the tool
              </Button>
              <Button as={NextLink} href="/sign-in" size="lg" variant="bordered">
                Sign in
              </Button>
            </div>
          </div>
        </section>
        {/* Tool */}
        <section className="relative overflow-hidden px-6 pb-12">
          <div className="relative z-10 mx-auto max-w-6xl">
            <FreeToolsEntitlementSection
              lockedTitle="Video Frame Extractor is available inside Kreatli"
              lockedDescription="Your trial or plan isn’t active. Start a trial or choose a plan to extract frames in Kreatli."
            >
              <VideoFrameExtractor />
            </FreeToolsEntitlementSection>
          </div>
        </section>

        <DefinitionBlock term="Video Frame Extractor">
          A video frame extractor saves a still image from a specific moment in a clip—useful for thumbnails, reference
          grabs, or legal frames. Editors use it to pull exact frames without exporting a full sequence.
        </DefinitionBlock>

        <VideoFrameExtractorGuide />

        {/* Related tools */}
        <MoreFreeToolsSection
          tools={getFreeToolsForFreeToolPage('/free-tools/video-frame-extractor')}
          title="More Tools for Video Teams"
        />

        <VideoFrameExtractorFAQ />

        {/* Related resources */}
        <RelatedResourcesSection
          resources={getRelatedResources(['reviewApproval', 'creativeWorkspace', 'projectOrchestration'])}
          title="More Resources"
          description="Learn more about video collaboration workflows, asset review and approvals, and team collaboration."
        />

        {/* CTA Section */}
        <CTASection
          title="Need feedback and approvals on video assets?"
          description="Kreatli is a Video Collaboration & Review Platform for video teams. Upload videos, collect frame-accurate feedback, keep discussions organized, and move projects forward."
          primaryButtonText={OPEN_IN_KREATLI_LABEL}
          primaryButtonHref={KREATLI_PLATFORM_ENTRY_HREF}
        />
      </main>

      <FooterSection hideCta />
      <SignUpModal />
    </>
  );
}
