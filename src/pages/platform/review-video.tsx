/* eslint-disable simple-import-sort/imports */
import { Accordion, AccordionItem, Button, Card, CardBody } from '@heroui/react';
import Head from 'next/head';
import NextLink from 'next/link';

import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';
import { FooterSection } from '../../components/home/Footer/FooterSection';
import { PricingSection } from '../../components/home/PricingSection/PricingSection';
import { Header } from '../../components/layout/Header';
import { Decorations } from '../../components/layout/Storyblok/Decorations';
import { BreadcrumbStructuredData } from '../../components/shared/BreadcrumbStructuredData';
import { CTASection } from '../../components/shared/CTASection';
import { FAQStructuredData } from '../../components/shared/FAQStructuredData';
import { InteractiveReviewToolPreview } from '../../components/shared/InteractiveReviewToolPreview';
import { MoreFreeToolsSection } from '../../components/shared/MoreFreeToolsSection';
import {
  REVIEW_VIDEO_STEPS,
  PlatformStepGuide,
} from '../../components/shared/PlatformStepGuide';
import { RelatedResourcesSection } from '../../components/shared/RelatedResourcesSection';
import { ResourcesArticlesPreviewSection } from '../../components/shared/ResourcesArticlesPreviewSection';
import { Icon } from '../../components/various/Icon';
import { getPlatformArticles } from '../../data/platform-articles';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';

const faqs = [
  {
    question: 'What is video review?',
    answer:
      'Video review is the process of watching video content and providing feedback, comments, and approval decisions. In Kreatli, video review is frame-accurate—comments and annotations are pinned to exact moments so editors know precisely what to change. This replaces vague email threads with actionable, visual feedback that speeds up revision cycles.',
  },
  {
    question: 'How do I review a video in Kreatli?',
    answer:
      "Upload your video to a Kreatli project and open it in the review player. Scrub or play to any moment and click to add comments or drawings. Your feedback is pinned to the exact frame. When you are done, share a link so clients or collaborators can view the video and add their own feedback without creating an account.",
  },
  {
    question: 'Can clients review videos without creating an account?',
    answer:
      'Yes. Kreatli offers no-signup guest review links for video. Send your client a secure link; they can watch the video, add frame-accurate comments and annotations, and submit feedback without signing up. This removes friction from the approval process and keeps all review in one thread.',
  },
  {
    question: 'What feedback options are available when reviewing a video?',
    answer:
      'In Kreatli you can add text comments pinned to specific frames, freehand drawings and shapes to highlight areas, arrows and markers to point to elements, and color-coded annotations for different types of feedback. Reviewers can also approve or request changes. All feedback is tied to the exact timestamp and frame number.',
  },
  {
    question: 'How do I track feedback status on a video review?',
    answer:
      "Kreatli tracks resolution status for every comment on a video. You can mark items as resolved or unresolved and filter to show only what still needs attention. When you upload a new version of the video, you can resolve comments that have been addressed. The system keeps a clear record of what is done and what is pending across review rounds.",
  },
  {
    question: 'Can multiple people review the same video at once?',
    answer:
      "Yes. Multiple reviewers can review the same video simultaneously. Each person's comments and annotations are visible to everyone, with color coding or user indicators to show who added which annotation. You can see all feedback on the timeline, filter by reviewer, and track which annotations have been addressed.",
  },
  {
    question: 'Why review videos in Kreatli instead of email or standalone tools?',
    answer:
      'Reviewing videos in Kreatli keeps feedback frame-accurate and organized. Instead of vague descriptions like "around the 2-minute mark," comments are pinned to exact frames. You get a single project timeline, one set of review links for clients, and one approval workflow instead of juggling video tools, email, and separate review apps.',
  },
  {
    question: 'How does video review help video production workflows?',
    answer:
      'Video review streamlines production workflows by making feedback visual and frame-accurate. Editors can jump directly to annotated frames, see visual markup indicating what to change, and track which annotations have been addressed. This reduces back-and-forth communication, speeds up revision cycles, and ensures nothing gets missed.',
  },
];

export default function ReviewVideoPage() {
  useSession();
  const articles = getPlatformArticles('/platform/review-video');

  return (
    <>
      <Head>
        <title>Review Video | Kreatli</title>
        <meta
          name="description"
          content="Review video with frame-accurate comments, annotations, and approvals. Collaborate on video with precise feedback in one place—no sign-up required for reviewers."
        />
        <link rel="canonical" href="https://kreatli.com/platform/review-video" />
        <meta property="og:url" content="https://kreatli.com/platform/review-video" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Review Video | Kreatli" />
        <meta
          property="og:description"
          content="Review video with frame-accurate comments, annotations, and approvals. Collaborate on video with precise feedback in one place."
        />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:secure_url" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:alt" content="Review Video | Kreatli" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Review Video | Kreatli" />
        <meta
          name="twitter:description"
          content="Review video with frame-accurate comments, annotations, and approvals. Collaborate on video with precise feedback in one place."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
      </Head>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Platform', url: '/platform' },
          { name: 'Review Video', url: '/platform/review-video' },
        ]}
      />
      <FAQStructuredData faqs={faqs} />
      <Header />
      <Decorations />

      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h1 className="mx-auto max-w-lg font-sans text-3xl font-bold leading-tight sm:text-4xl sm:leading-tight">
              Review Video
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground-500">
              Review video with frame-accurate comments, annotations, and approvals. Collaborate on video with precise
              feedback in one place—no sign-up required for reviewers.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button as={NextLink} href="/sign-up" size="lg" className="bg-foreground text-content1">
                Get Started for Free
              </Button>
              <Button
                as="a"
                href="https://calendar.app.google/NXbAeTAUwaBGh5x49"
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                variant="bordered"
              >
                Book a Demo
              </Button>
            </div>
          </div>
          <InteractiveReviewToolPreview />
        </div>
      </section>

      <PlatformStepGuide
        stepsSectionTitle="How to review a video in Kreatli"
        stepsIntro="Follow these steps to upload your video, collect frame-accurate feedback, and track approvals—all in one place."
        steps={REVIEW_VIDEO_STEPS}
        completeGuide={{
          href: '/guides/how-to-annotate-video',
          description:
            'Learn how to annotate video effectively to speed up feedback, reduce revisions, and improve collaboration.',
        }}
      />

      {/* Review Features Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">How Video Review Works</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Use frame-accurate comments, drawings, and annotations to give precise feedback on your video.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="upload" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Upload Your Video</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Add your video to a Kreatli project. The file is stored securely with version history so you can
                  track every cut and review round.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="chat" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Frame-Accurate Comments</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Pin comments to exact frames with timestamps. Every comment is linked to a specific frame number and
                  moment in the video.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="paint" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Drawings & Markup</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Draw directly on video frames with freehand, shapes, and arrows. All markup stays pinned to the exact
                  frame where you placed it.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="share" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Share for Review</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Generate a secure review link and send it to clients or collaborators. They can review and comment
                  without creating an account or downloading anything.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="group" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Multi-Reviewer Support</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Multiple team members and clients can review the same video. See who added what with color coding
                  and keep feedback in one thread.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="checkCircle" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Track Approvals</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Mark comments as resolved, track who approved which version, and keep a clear record of what is done
                  and what is pending across review rounds.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mx-auto w-fit max-w-full rounded-2xl border border-foreground-200 bg-content1/60 px-6 py-8 shadow-sm backdrop-blur-sm">
            <h2 className="text-center font-sans text-lg font-semibold text-foreground-700">
              Related video features
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-center text-sm text-foreground-500">
              Give video feedback, comment on video, or add drawings. Explore these options:
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button
                as={NextLink}
                href="/platform/video-feedback"
                size="md"
                className="bg-foreground font-medium text-content1 hover:opacity-90"
                endContent={<Icon icon="arrowRight" size={16} />}
              >
                Video Feedback
              </Button>
              <Button
                as={NextLink}
                href="/platform/comment-on-video"
                size="md"
                className="bg-foreground font-medium text-content1 hover:opacity-90"
                endContent={<Icon icon="arrowRight" size={16} />}
              >
                Comment on Video
              </Button>
              <Button
                as={NextLink}
                href="/platform/video-annotation"
                size="md"
                className="bg-foreground font-medium text-content1 hover:opacity-90"
                endContent={<Icon icon="arrowRight" size={16} />}
              >
                Video Annotation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Why Review Videos in Kreatli</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Review videos with precise, frame-accurate feedback so your team and clients stay aligned and revisions
              move faster.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="eye" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Eliminate Ambiguity</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Instead of vague descriptions, comments point to the exact frame. No more guessing or back-and-forth
                  clarification about which moment needs changes.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="arrowRight" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Faster Revisions</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Editors can jump directly to annotated frames, see visual markup, and make changes immediately.
                  Resolution tracking ensures nothing gets missed.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="group" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Better Collaboration</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Multiple reviewers can review simultaneously with visual feedback that everyone can see. Color coding
                  helps organize feedback by reviewer or type.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="smile" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Client-Friendly</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Clients can review videos through no-signup guest links. They can draw, comment, and provide feedback
                  without technical barriers or account creation.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Free Tools Section */}
      <MoreFreeToolsSection
        title="Free Tools for Video Teams"
        description="Explore our collection of free tools designed to help video professionals work more efficiently."
        useBannerResizerInsteadOfCostCalculator
      />

      {/* See How This Works Section */}
      <ResourcesArticlesPreviewSection
        articles={articles}
        title="See How This Works in Practice"
        description="Explore guides and comparisons that show how teams review videos and manage approvals in Kreatli."
      />

      <PricingSection />

      {/* FAQ Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Get detailed answers about reviewing videos and approval workflows in Kreatli.
            </p>
          </div>
          <Accordion variant="splitted" className="gap-2">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.question}
                title={<span className="text-base font-semibold sm:text-lg">{faq.question}</span>}
                className="py-2"
              >
                <div className="text-sm leading-relaxed text-foreground-500 sm:text-base">{faq.answer}</div>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="mx-auto mt-12 flex max-w-3xl flex-col items-center gap-4 text-center">
            <h3 className="font-sans text-xl font-bold">Still Have Questions?</h3>
            <p className="text-foreground-500">
              If you did not find the answer you were looking for, contact our support team at{' '}
              <a href="mailto:support@kreatli.com" className="font-medium text-primary underline underline-offset-2">
                support@kreatli.com
              </a>{' '}
              to learn how Kreatli can help you review videos and streamline your approval workflow.
            </p>
          </div>
        </div>
      </section>

      {/* More Resources Section */}
      <RelatedResourcesSection
        resources={getRelatedResources(['reviewApproval', 'creativeProofing', 'videoAnnotation', 'commentOnVideo'])}
        title="More Resources"
        description="Explore other Kreatli platform features to streamline your video review and collaboration workflow."
      />

      {/* CTA Section */}
      <CTASection
        title="Ready to Review Videos with Your Team?"
        description="Review videos with frame-accurate comments, drawings, and approvals in one place with your team and clients. Start using Kreatli today."
      />
      <FooterSection hideCta={true} />
      <SignUpModal />
    </>
  );
}
