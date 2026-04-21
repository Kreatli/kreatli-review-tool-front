/* eslint-disable max-len */
import Head from 'next/head';

import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';
import { FooterSection } from '../../components/home/Footer/FooterSection';
import { Header } from '../../components/layout/Header';
import { Decorations } from '../../components/layout/Storyblok/Decorations';
import { BreadcrumbStructuredData } from '../../components/shared/BreadcrumbStructuredData';
import { CTASection } from '../../components/shared/CTASection';
import { FAQStructuredData } from '../../components/shared/FAQStructuredData';
import { FreeToolsEntitlementSection } from '../../components/shared/FreeToolsEntitlementSection';
import { HeroCtaButtons } from '../../components/shared/HeroCtaButtons';
import { InteractiveReviewToolPreview } from '../../components/shared/InteractiveReviewToolPreview';
import { MoreFreeToolsSection } from '../../components/shared/MoreFreeToolsSection';
import { getFreeToolsForFreeToolPage } from '../../data/free-tools-page-tools';
import { RelatedResourcesSection } from '../../components/shared/RelatedResourcesSection';
import { VideoProofingToolFAQ, videoProofingToolFaqs } from '../../components/video-proofing-tool/VideoProofingToolFAQ';
import { VideoProofingToolGuide } from '../../components/video-proofing-tool/VideoProofingToolGuide';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';
import { DefinitionBlock } from '../../components/shared/DefinitionBlock';

export default function VideoProofingToolPage() {
  useSession();

  return (
    <>
      <Head>
        <title>Proof Videos Online – Free Video Proofing Tool | Kreatli</title>
        <meta
          name="description"
          content="Proof videos with frame-accurate comments, annotations, and approvals. Share proofing links with clients. Try free with a 7-day trial."
        />
<meta property="og:title" content="Proof Videos Online – Free Video Proofing Tool | Kreatli" />
        <meta
          property="og:description"
          content="Proof videos with frame-accurate comments, annotations, and approvals. Share proofing links with clients. Try free with a 7-day trial."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kreatli.com/free-tools/video-proofing-tool" />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Proof Videos Online – Free Video Proofing Tool | Kreatli" />
        <meta
          name="twitter:description"
          content="Proof videos with frame-accurate comments, annotations, and approvals. Share proofing links with clients. Try free with a 7-day trial."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
        <link rel="canonical" href="https://kreatli.com/free-tools/video-proofing-tool" />
      </Head>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Free Tools', url: '/free-tools' },
          { name: 'Video Proofing Tool', url: '/free-tools/video-proofing-tool' },
        ]}
      />
      <FAQStructuredData faqs={videoProofingToolFaqs} />
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
            <h1 className="mx-auto max-w-lg font-sans text-3xl font-bold sm:text-4xl">Video Proofing Tool</h1>
            <p className="mx-auto max-w-3xl text-lg text-foreground-500">
              Proof videos with frame-accurate comments, annotations, and approvals. Collaborate on video with precise
              feedback in one place—no software installation required for reviewers.
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

        <DefinitionBlock term="Video Proofing Tool">
          Video proofing is structured review of motion creative—comments, markup, and approvals on the timeline. A proofing tool keeps rounds disciplined so editors implement feedback once and stakeholders see resolution status.
        </DefinitionBlock>

        <VideoProofingToolGuide />

        {/* Related tools */}
        <MoreFreeToolsSection tools={getFreeToolsForFreeToolPage('/free-tools/video-proofing-tool')} title="More Tools for Video Teams" />

        <VideoProofingToolFAQ />

        {/* Related resources */}
        <RelatedResourcesSection
          resources={getRelatedResources([
            'reviewApproval',
            'creativeProofing',
            'videoAnnotation',
            'commentOnVideo',
          ])}
          title="More Resources"
          description="Explore other Kreatli platform features to streamline your video proofing and collaboration workflow."
        />

        {/* CTA Section */}
        <CTASection
          title="Ready to streamline video proofing?"
          description="Kreatli is a Video Collaboration & Review Platform for creative teams. Proof videos with frame-accurate feedback, manage approvals, and deliver projects faster."
          primaryButtonText="Start 7-day trial"
        />
      </main>

      <FooterSection hideCta />
      <SignUpModal />
    </>
  );
};
