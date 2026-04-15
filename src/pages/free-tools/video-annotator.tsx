/* eslint-disable max-len */
import Head from 'next/head';

import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';
import { FooterSection } from '../../components/home/Footer/FooterSection';
import { Header } from '../../components/layout/Header';
import { Decorations } from '../../components/layout/Storyblok/Decorations';
import { BreadcrumbStructuredData } from '../../components/shared/BreadcrumbStructuredData';
import { CTASection } from '../../components/shared/CTASection';
import { DefinitionBlock } from '../../components/shared/DefinitionBlock';
import { FAQStructuredData } from '../../components/shared/FAQStructuredData';
import { FreeToolsEntitlementSection } from '../../components/shared/FreeToolsEntitlementSection';
import { HeroCtaButtons } from '../../components/shared/HeroCtaButtons';
import { InteractiveReviewToolPreview } from '../../components/shared/InteractiveReviewToolPreview';
import { MoreFreeToolsSection } from '../../components/shared/MoreFreeToolsSection';
import { getFreeToolsForFreeToolPage } from '../../data/free-tools-page-tools';
import { RelatedResourcesSection } from '../../components/shared/RelatedResourcesSection';
import { VideoAnnotatorFAQ, videoAnnotatorFaqs } from '../../components/video-annotator/VideoAnnotatorFAQ';
import { VideoAnnotatorGuide } from '../../components/video-annotator/VideoAnnotatorGuide';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';

export default function VideoAnnotatorPage() {
  useSession();

  return (
    <>
      <Head>
        <title>Annotate Videos Online – Free Video Annotator | Kreatli</title>
        <meta
          name="description"
          content="Add frame-accurate comments, drawings, and markup to video. Pin feedback to exact timestamps. Try free with a 7-day trial."
        />
        <meta
          name="keywords"
          content="video annotator, annotate video online, video annotation tool, frame-accurate annotation, draw on video, video markup, video feedback, video collaboration"
        />
        <meta property="og:title" content="Annotate Videos Online – Free Video Annotator | Kreatli" />
        <meta
          property="og:description"
          content="Add frame-accurate comments, drawings, and markup to video. Pin feedback to exact timestamps. Try free with a 7-day trial."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kreatli.com/free-tools/video-annotator" />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Annotate Videos Online – Free Video Annotator | Kreatli" />
        <meta
          name="twitter:description"
          content="Add frame-accurate comments, drawings, and markup to video. Pin feedback to exact timestamps. Try free with a 7-day trial."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
        <link rel="canonical" href="https://kreatli.com/free-tools/video-annotator" />
      </Head>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Free Tools', url: '/free-tools' },
          { name: 'Video Annotator', url: '/free-tools/video-annotator' },
        ]}
      />
      <FAQStructuredData faqs={videoAnnotatorFaqs} />
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
            <h1 className="mx-auto max-w-lg font-sans text-3xl font-bold sm:text-4xl">Video Annotator</h1>
            <p className="mx-auto max-w-3xl text-lg text-foreground-500">
              Add frame-accurate comments, drawings, and markup directly to video frames. Pin feedback to exact
              timestamps and collaborate with precise visual annotation—no software installation required for
              reviewers.
            </p>
            <HeroCtaButtons />
          </div>
        </section>

        {/* Interactive Tool Preview */}
        <section className="relative overflow-hidden px-6 pb-12">
          <div className="relative z-10 mx-auto max-w-6xl">
            <FreeToolsEntitlementSection>
              <InteractiveReviewToolPreview variant="video" />
            </FreeToolsEntitlementSection>
          </div>
        </section>

        <DefinitionBlock term="Video Annotator">
          A video annotator is a tool for adding comments, drawings, and markup to specific frames in a video. Annotations are pinned to exact timestamps, letting editors and reviewers communicate visually rather than describing changes in text. Video annotators are essential for production teams that need frame-accurate feedback.
        </DefinitionBlock>

        <VideoAnnotatorGuide />

        {/* Related tools */}
        <MoreFreeToolsSection tools={getFreeToolsForFreeToolPage('/free-tools/video-annotator')} title="More Tools for Video Teams" />

        <VideoAnnotatorFAQ />

        {/* Related resources */}
        <RelatedResourcesSection
          resources={getRelatedResources(['videoAnnotation', 'reviewApproval', 'commentOnVideo', 'creativeWorkspace'])}
          title="More Resources"
          description="Explore other Kreatli platform features for video annotation, review, and collaboration."
        />

        {/* CTA Section */}
        <CTASection
          title="Ready to annotate videos with your team?"
          description="Kreatli offers frame-accurate video annotation, drawing on video, and approval workflows. Add comments and markup pinned to exact frames—all in one place."
          primaryButtonText="Start 7-day trial"
        />
      </main>

      <FooterSection hideCta />
      <SignUpModal />
    </>
  );
};
