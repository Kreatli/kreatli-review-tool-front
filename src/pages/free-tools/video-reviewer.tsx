/* eslint-disable max-len */
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
import { HeroCtaButtons } from '../../components/shared/HeroCtaButtons';
import { InteractiveReviewToolPreview } from '../../components/shared/InteractiveReviewToolPreview';
import { MoreFreeToolsSection } from '../../components/shared/MoreFreeToolsSection';
import { getFreeToolsForFreeToolPage } from '../../data/free-tools-page-tools';
import { RelatedResourcesSection } from '../../components/shared/RelatedResourcesSection';
import { WebApplicationStructuredData } from '../../components/shared/WebApplicationStructuredData';
import { VideoReviewerFAQ, videoReviewerFaqs } from '../../components/video-reviewer/VideoReviewerFAQ';
import { VideoReviewerGuide } from '../../components/video-reviewer/VideoReviewerGuide';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';

export default function VideoReviewerPage() {
  useSession();

  return (
    <>
      <Head>
        <title>Video Reviewer — Video Review, Feedback &amp; Approval | Kreatli</title>
        <meta
          name="description"
          content="Free video reviewer for video review and approval: frame-accurate comments, markup, and shareable review links. Online video review tool — try Kreatli."
        />
<meta property="og:title" content="Video Reviewer — Video Review, Feedback &amp; Approval | Kreatli" />
        <meta
          property="og:description"
          content="Review videos online with a video review tool built for approvals: timestamped notes, annotations, and client links."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kreatli.com/free-tools/video-reviewer" />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Video Reviewer — Video Review, Feedback &amp; Approval | Kreatli" />
        <meta
          name="twitter:description"
          content="Review videos online with a video review tool built for approvals: timestamped notes, annotations, and client links."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
        <link rel="canonical" href="https://kreatli.com/free-tools/video-reviewer" />
      </Head>
      <WebApplicationStructuredData
        name="Kreatli Video Reviewer"
        description="Online video review with frame-accurate comments, markup, and approval-friendly workflows."
        url="https://kreatli.com/free-tools/video-reviewer"
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Free Tools', url: '/free-tools' },
          { name: 'Video Reviewer', url: '/free-tools/video-reviewer' },
        ]}
      />
      <FAQStructuredData faqs={videoReviewerFaqs} />
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
            <h1 className="mx-auto max-w-lg font-sans text-3xl font-bold sm:text-4xl">Video Reviewer</h1>
            <p className="mx-auto max-w-3xl text-lg text-foreground-500">
              Review videos online with frame-accurate comments, visual annotations, and approval workflows. Collect
              feedback from your team and clients in one place—no software installation required.
            </p>
            <h2 className="mx-auto max-w-3xl font-sans text-lg font-semibold text-foreground-700 sm:text-xl">
              Video review tool for video review and approval
            </h2>
            <p className="mx-auto max-w-3xl text-base text-foreground-500">
              Pair reviewer-mode clarity with structured{' '}
              <strong className="font-semibold text-foreground-700">video review and approval</strong>: see exactly what
              changed, who asked for it, and which version is cleared to ship.
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

        <DefinitionBlock term="Video Reviewer">
          A video reviewer is an online tool that lets you watch a video and leave feedback pinned to exact frames and timestamps. Instead of writing &lsquo;fix the shot around the middle,&rsquo; reviewers click the precise frame and leave a note that stays linked to that moment. Video reviewers are used by production teams, agencies, and editors to collect clear, actionable feedback and speed up approval cycles.
        </DefinitionBlock>

        <VideoReviewerGuide />

        {/* Related tools */}
        <MoreFreeToolsSection tools={getFreeToolsForFreeToolPage('/free-tools/video-reviewer')} title="More Tools for Video Teams" />

        <VideoReviewerFAQ />

        {/* Related resources */}
        <RelatedResourcesSection
          resources={getRelatedResources(['reviewApproval', 'videoAnnotation', 'clientApprovals', 'secureAssetStorage'])}
          title="More Resources"
          description="Learn more about video review workflows, approval processes, and team collaboration."
        />

        <div className="mx-auto max-w-4xl px-6 pb-8 text-center">
          <p className="text-base text-foreground-500">
            Wondering how Kreatli compares?{' '}
            <NextLink
              href="/comparisons/best-video-review-platforms"
              className="font-medium text-primary underline-offset-2 hover:underline"
            >
              See the best video review platforms for creative teams →
            </NextLink>
          </p>
        </div>

        {/* CTA Section */}
        <CTASection
          title="Ready to streamline video reviews?"
          description="Kreatli is a Video Collaboration & Review Platform for creative teams. Review videos, collect frame-accurate feedback, manage approvals, and deliver projects faster."
          primaryButtonText="Start 7-day trial"
        />
      </main>

      <FooterSection hideCta />
      <SignUpModal />
    </>
  );
}
