import Head from 'next/head';

import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';
import { FooterSection } from '../../components/home/Footer/FooterSection';
import { Header } from '../../components/layout/Header';
import { Decorations } from '../../components/layout/Storyblok/Decorations';
import { MoreFreeToolsSection } from '../../components/shared/MoreFreeToolsSection';
import { RelatedResourcesSection } from '../../components/shared/RelatedResourcesSection';
import { VideoFrameExtractor } from '../../components/video-frame-extractor/VideoFrameExtractor';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';

export default function VideoFrameExtractorPage() {
  useSession();

  return (
    <>
      <Head>
        <title>Video Frame Extractor - Capture & Download Stills | Free Tool | Kreatli</title>
        <meta
          name="description"
          content="Extract frames from any video in your browser. Scrub visually, capture multiple moments, compare frames side-by-side, and download PNG/JPG stills instantly—100% client-side, no sign-up required."
        />
        <meta
          name="keywords"
          content="video frame extractor, extract frames from video, capture video frame, screenshot video, export video stills, download frames png jpg, compare video frames, browser frame extractor, free video tool"
        />
        <meta property="og:title" content="Video Frame Extractor - Free Browser Tool | Kreatli" />
        <meta
          property="og:description"
          content="Scrub a video, capture multiple frames, compare two side-by-side, and download PNG/JPG stills—fully in your browser. No uploads. No watermark."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kreatli.com/free-tools/video-frame-extractor" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Video Frame Extractor - Free Browser Tool | Kreatli" />
        <meta
          name="twitter:description"
          content="Capture and download still frames from video in your browser. Scrub, capture multiple, compare, and export PNG/JPG."
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
            <h1 className="mx-auto max-w-4xl font-sans text-2xl font-bold sm:text-4xl">Video Frame Extractor</h1>
            <p className="mx-auto max-w-3xl text-lg text-foreground-500 sm:text-xl">
              Scrub through a video, capture the moments you like, compare frames side-by-side, and download still
              images. Everything runs in your browser—no uploads, no watermark, no sign-up required.
            </p>
          </div>
        </section>

        {/* Tool */}
        <section className="relative overflow-hidden px-6 pb-12">
          <div className="relative z-10 mx-auto max-w-6xl">
            <VideoFrameExtractor />
          </div>
        </section>

        {/* Related tools */}
        <MoreFreeToolsSection excludeHref="/free-tools/video-frame-extractor" title="More Tools for Video Teams" />

        {/* Related resources */}
        <RelatedResourcesSection
          resources={getRelatedResources(['reviewApproval', 'creativeWorkspace', 'blog'])}
          title="More Resources"
          description="Learn more about video collaboration workflows, asset review and approvals, and team collaboration."
        />
      </main>

      <FooterSection hideCta />
      <SignUpModal />
    </>
  );
}

