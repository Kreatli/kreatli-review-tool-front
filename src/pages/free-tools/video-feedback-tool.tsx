/* eslint-disable max-len */
import Head from 'next/head';

import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';
import { FooterSection } from '../../components/home/Footer/FooterSection';
import { Header } from '../../components/layout/Header';
import { Decorations } from '../../components/layout/Storyblok/Decorations';
import { BreadcrumbStructuredData } from '../../components/shared/BreadcrumbStructuredData';
import { CTASection } from '../../components/shared/CTASection';
import { FAQStructuredData } from '../../components/shared/FAQStructuredData';
import { InteractiveReviewToolPreview } from '../../components/shared/InteractiveReviewToolPreview';
import { MoreFreeToolsSection } from '../../components/shared/MoreFreeToolsSection';
import { getFreeToolsForFreeToolPage } from '../../data/free-tools-page-tools';
import { RelatedResourcesSection } from '../../components/shared/RelatedResourcesSection';
import { VideoFeedbackToolFAQ, videoFeedbackToolFaqs } from '../../components/video-feedback-tool/VideoFeedbackToolFAQ';
import { VideoFeedbackToolGuide } from '../../components/video-feedback-tool/VideoFeedbackToolGuide';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';

export default function VideoFeedbackToolPage() {
  useSession();

  return (
    <>
      <Head>
        <title>Video Feedback Tool - Free | Kreatli</title>
        <meta
          name="description"
          content="Free video feedback tool to give frame-accurate comments, annotations, and markup on videos. Share review links with clients—no sign-up required for reviewers."
        />
        <meta
          name="keywords"
          content="video feedback tool, video review tool, video annotation, frame-accurate feedback, video collaboration, video proofing, video markup, comment on video, review video online"
        />
        <meta property="og:title" content="Video Feedback Tool - Free | Kreatli" />
        <meta
          property="og:description"
          content="Free video feedback tool to give frame-accurate comments, annotations, and markup on videos. Share review links with clients—no sign-up required for reviewers."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kreatli.com/free-tools/video-feedback-tool" />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Video Feedback Tool - Free | Kreatli" />
        <meta
          name="twitter:description"
          content="Free video feedback tool to give frame-accurate comments, annotations, and markup on videos. Share review links with clients—no sign-up required for reviewers."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
        <link rel="canonical" href="https://kreatli.com/free-tools/video-feedback-tool" />
      </Head>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Free Tools', url: '/free-tools' },
          { name: 'Video Feedback Tool', url: '/free-tools/video-feedback-tool' },
        ]}
      />
      <FAQStructuredData faqs={videoFeedbackToolFaqs} />
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
            <h1 className="mx-auto max-w-lg font-sans text-3xl font-bold sm:text-4xl">Video Feedback Tool</h1>
            <p className="mx-auto max-w-3xl text-lg text-foreground-500">
              Give frame-accurate feedback on videos with comments, annotations, and markup. Pin feedback to exact
              moments, share review links with clients, and keep all video feedback organized in one place.
            </p>
          </div>
        </section>

        {/* Interactive Tool Preview */}
        <section className="relative overflow-hidden px-6 pb-12">
          <div className="relative z-10 mx-auto max-w-6xl">
            <InteractiveReviewToolPreview variant="video" />
          </div>
        </section>

        <VideoFeedbackToolGuide />

        {/* Related tools */}
        <MoreFreeToolsSection tools={getFreeToolsForFreeToolPage('/free-tools/video-feedback-tool')} title="More Tools for Video Teams" />

        <VideoFeedbackToolFAQ />

        {/* Related resources */}
        <RelatedResourcesSection
          resources={getRelatedResources(['reviewApproval', 'videoAnnotation', 'commentOnVideo', 'secureAssetStorage'])}
          title="More Resources"
          description="Learn more about video feedback workflows, annotation tools, and team collaboration."
        />

        {/* CTA Section */}
        <CTASection
          title="Ready to streamline video feedback?"
          description="Kreatli is a Video Collaboration & Review Platform for creative teams. Upload videos, collect frame-accurate feedback, manage approvals, and move projects forward faster."
          primaryButtonText="Start for Free"
        />
      </main>

      <FooterSection hideCta />
      <SignUpModal />
    </>
  );
}
