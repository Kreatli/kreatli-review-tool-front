/* eslint-disable max-len */
import Head from 'next/head';

import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';
import { FooterSection } from '../../components/home/Footer/FooterSection';
import { Header } from '../../components/layout/Header';
import { Decorations } from '../../components/layout/Storyblok/Decorations';
import { CTASection } from '../../components/shared/CTASection';
import { MoreFreeToolsSection } from '../../components/shared/MoreFreeToolsSection';
import { getFreeToolsForFreeToolPage } from '../../data/free-tools-page-tools';
import { RelatedResourcesSection } from '../../components/shared/RelatedResourcesSection';
import { VideoFrameExtractor } from '../../components/video-frame-extractor/VideoFrameExtractor';
import { VideoFrameExtractorFAQ } from '../../components/video-frame-extractor/VideoFrameExtractorFAQ';
import { VideoFrameExtractorGuide } from '../../components/video-frame-extractor/VideoFrameExtractorGuide';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';

export default function VideoFrameExtractorPage() {
  useSession();

  return (
    <>
      <Head>
        <title>Video Frame Extractor - Free Tool | Kreatli</title>
        <meta
          name="description"
          content="Free video frame extractor to capture still frames from any video. Scrub to any moment and download JPG/PNG images (or a ZIP) in your browser—no uploads, no sign-up."
        />
        <meta
          name="keywords"
          content="video frame extractor, extract frames from video, capture video frame, screenshot video, export video stills, download frames png jpg, download frames zip, browser frame extractor, free video tool"
        />
        <meta property="og:title" content="Video Frame Extractor - Free Tool | Kreatli" />
        <meta
          property="og:description"
          content="Free video frame extractor to capture still frames from any video. Scrub to any moment and download JPG/PNG images (or a ZIP) in your browser—no uploads, no sign-up."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kreatli.com/free-tools/video-frame-extractor" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Video Frame Extractor - Free Tool | Kreatli" />
        <meta
          name="twitter:description"
          content="Free video frame extractor to capture still frames from any video. Scrub to any moment and download JPG/PNG images (or a ZIP) in your browser—no uploads, no sign-up."
        />
        <link rel="canonical" href="https://kreatli.com/free-tools/video-frame-extractor" />
      </Head>
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
            <h1 className="mx-auto max-w-lg font-sans text-3xl font-bold sm:text-4xl">Video Frame Extractor</h1>
            <p className="mx-auto max-w-3xl text-lg text-foreground-500">
              Scrub through a video, capture the moments you like, and download still images as PNG/JPG. Everything runs in your browser - no uploads, no watermark, no sign-up needed.
            </p>
          </div>
        </section>

        {/* Tool */}
        <section className="relative overflow-hidden px-6 pb-12">
          <div className="relative z-10 mx-auto max-w-6xl">
            <VideoFrameExtractor />
          </div>
        </section>

        <VideoFrameExtractorGuide />

        {/* Related tools */}
        <MoreFreeToolsSection tools={getFreeToolsForFreeToolPage('/free-tools/video-frame-extractor')} title="More Tools for Video Teams" />

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
          primaryButtonText="Start for Free"
        />
      </main>

      <FooterSection hideCta />
      <SignUpModal />
    </>
  );
}

