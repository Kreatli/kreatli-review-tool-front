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
import { RelatedResourcesSection } from '../../components/shared/RelatedResourcesSection';
import { ResourcesArticlesPreviewSection } from '../../components/shared/ResourcesArticlesPreviewSection';
import { VideoAnnotationGuide } from '../../components/video-annotation-guide/VideoAnnotationGuide';
import { Icon } from '../../components/various/Icon';
import { getPlatformArticles } from '../../data/platform-articles';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';

const faqs = [
  {
    question: 'What is video annotation?',
    answer:
      'Video annotation is the process of adding comments, markup, drawings, and feedback directly onto video frames. In Kreatli, video annotation allows you to pin precise feedback to exact frames and timestamps, making it clear which part of the video needs attention. Unlike generic comments that reference "around the 2-minute mark," video annotation attaches your feedback to the specific frame, eliminating confusion and speeding up the revision process. This is essential for video production workflows where precise timing and visual feedback matter.',
  },
  {
    question: 'How does frame-accurate video annotation work in Kreatli?',
    answer:
      'Kreatli\'s frame-accurate video annotation allows you to click on any specific frame in a video to add comments, drawings, shapes, and markup that are permanently linked to that exact moment. When you annotate a video, your feedback is attached to the specific frame number and timestamp (e.g., "at 00:15:23, frame 36,240"). Reviewers can see your annotations appear exactly when that frame plays, and editors can jump directly to the annotated frame to make changes. This eliminates the guesswork of "which part?" and ensures every piece of feedback is actionable.',
  },
  {
    question: 'What types of annotations can I add to videos?',
    answer:
      'In Kreatli, you can add multiple types of annotations to videos: text comments pinned to specific frames, freehand drawings and shapes to highlight areas, arrows and markers to point to specific elements, color-coded annotations for different types of feedback, and timestamped notes that appear during playback. All annotations are frame-accurate, meaning they appear at the exact moment you place them. You can also combine multiple annotation types on the same frame to provide comprehensive feedback.',
  },
  {
    question: 'Can multiple team members annotate the same video simultaneously?',
    answer:
      "Yes. Multiple reviewers can annotate the same video simultaneously in Kreatli. Each person's annotations are visible to everyone in real-time, with color coding or user indicators to show who added which annotation. This is perfect for collaborative review sessions where directors, producers, editors, and clients all need to provide feedback. You can see all annotations on the timeline, filter by reviewer, and track which annotations have been addressed. Real-time notifications keep everyone updated as new annotations are added.",
  },
  {
    question: 'How do I track which annotations have been addressed?',
    answer:
      'Kreatli tracks annotation resolution status for every comment and markup. Annotations can be marked as resolved or unresolved, and you can filter to see only unresolved annotations that need attention. When you upload a new version addressing feedback, you can mark annotations as resolved. The system shows which feedback has been addressed and which is still pending, making it easy to track progress across review rounds. This ensures nothing falls through the cracks and all annotations get proper attention.',
  },
  {
    question: 'Can clients annotate videos without creating an account?',
    answer:
      'Yes. Kreatli offers no-signup guest review links that allow clients and external collaborators to annotate videos, add comments, and provide feedback without creating an account. Simply generate a secure shareable link and send it to your client. They can access the annotation interface, watch videos, add frame-accurate annotations, and provide feedback—all without signing up. This eliminates approval delays caused by account creation barriers and makes client collaboration seamless.',
  },
  {
    question: 'How does video annotation differ from basic video comments?',
    answer:
      'Video annotation in Kreatli goes beyond basic comments by providing visual markup directly on video frames. While basic comments might say "change the color here," video annotation lets you draw on the exact frame, highlight specific areas, and pin feedback to precise moments. Annotations are frame-accurate (not just timestamp-based), visually integrated into the video playback, and can include drawings, shapes, and arrows. This makes feedback more actionable and eliminates ambiguity about what needs to be changed.',
  },
  {
    question: 'What video formats support annotation in Kreatli?',
    answer:
      "Kreatli supports annotation for all common video formats including MP4, MOV, AVI, MKV, and more. The platform handles videos of any resolution (from 720p to 8K) and frame rate. Whether you're working with short clips, long-form content, or high-resolution footage, you can annotate any video file. The annotation system works with the video player to ensure annotations appear at the correct frames regardless of video format or encoding.",
  },
  {
    question: 'Can I export annotations or generate reports from video annotations?',
    answer:
      'Yes. Kreatli allows you to view all annotations in a timeline view, filter annotations by reviewer or status, and see a complete annotation history for any video. While direct export of annotation overlays may vary, all annotation data (comments, timestamps, frame numbers, and resolution status) is accessible and can be referenced when making edits. The annotation timeline provides a clear overview of all feedback, making it easy to work through annotations systematically.',
  },
  {
    question: 'How does video annotation help with video production workflows?',
    answer:
      'Video annotation streamlines video production workflows by making feedback precise, visual, and trackable. Instead of vague comments like "make it faster," annotations show exactly which frames need changes. Editors can jump directly to annotated frames, see visual markup indicating what to change, and track which annotations have been addressed. This reduces back-and-forth communication, speeds up revision cycles, and ensures nothing gets missed. For video teams managing multiple projects, annotation helps maintain quality and consistency across all deliverables.',
  },
];

export default function VideoAnnotationPage() {
  useSession();
  const articles = getPlatformArticles('/platform/video-annotation');

  return (
    <>
      <Head>
        <title>Frame-Accurate Video Annotation | Kreatli</title>
        <meta
          name="description"
          content="Add frame-accurate annotations, drawings, and markup directly to video frames. Pin comments to exact timestamps and collaborate with precise visual feedback. Perfect for video teams."
        />
        <link rel="canonical" href="https://kreatli.com/platform/video-annotation" />
        <meta property="og:url" content="https://kreatli.com/platform/video-annotation" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Kreatli | Video Annotation – Frame-Accurate Video Markup & Feedback" />
        <meta
          property="og:description"
          content="Add frame-accurate annotations, drawings, and markup directly to video frames. Collaborate with precise visual feedback designed for video teams."
        />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:secure_url" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:alt" content="Kreatli | Video Annotation – Frame-Accurate Video Markup & Feedback" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kreatli | Video Annotation – Frame-Accurate Video Markup & Feedback" />
        <meta
          name="twitter:description"
          content="Add frame-accurate annotations, drawings, and markup directly to video frames. Collaborate with precise visual feedback designed for video teams."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
      </Head>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Platform', url: '/platform' },
          { name: 'Video Annotation', url: '/platform/video-annotation' },
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
              Frame-Accurate Video Annotation
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground-500">
              Add frame-accurate annotations, drawings, and markup directly to video frames. Pin comments to exact
              timestamps and collaborate with precise visual feedback.
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

      {/* How to Use Video Annotation in Kreatli (step-by-step) */}
      <VideoAnnotationGuide stepsSectionTitle="How to Use Video Annotation in Kreatli" />

      {/* Annotation Types Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Multiple Annotation Types</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Use different annotation tools to provide comprehensive, visual feedback on your videos.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="paint" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Drawings & Shapes</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Draw freehand or use shapes to highlight specific areas, point to elements, or mark regions that need
                  attention.
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
                  Pin text comments to exact frames with timestamps. Every comment is linked to a specific frame number
                  and moment.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="arrowRight" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Arrows & Markers</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Use arrows and markers to point to specific elements, indicate movement, or highlight important
                  details.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="paint" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Color-Coded Feedback</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Use different colors to categorize annotations by type, priority, or reviewer for easy organization
                  and tracking.
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
                  Multiple team members can annotate simultaneously. See who added what with color coding and user
                  indicators.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="checkCircle" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Resolution Tracking</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Mark annotations as resolved or unresolved. Track which feedback has been addressed and which still
                  needs attention.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Why Video Annotation Matters</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Video annotation transforms vague feedback into precise, actionable instructions that speed up your
              production workflow.
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
                  Instead of "change the color around 2 minutes," annotations show exactly which frame and what to
                  change. No more guessing or back-and-forth clarification.
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
                  Annotation tracking ensures nothing gets missed.
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
                  Multiple reviewers can annotate simultaneously with visual feedback that everyone can see. Color
                  coding helps organize feedback by reviewer or type.
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
                  Clients can annotate videos through no-signup guest links. They can draw, comment, and provide
                  feedback without technical barriers or account creation.
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
        description="Explore real-world workflows and guides that demonstrate frame-accurate video annotation in action."
      />

      <PricingSection />

      {/* FAQ Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Get detailed answers about Kreatli's video annotation features for video teams.
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
              If you didn't find the answer you were looking for, feel free to contact our support team at{' '}
              <a href="mailto:support@kreatli.com" className="font-medium text-primary underline underline-offset-2">
                support@kreatli.com
              </a>{' '}
              to learn how Kreatli's video annotation can help your specific workflow.
            </p>
          </div>
        </div>
      </section>

      {/* More Resources Section */}
      <RelatedResourcesSection
        resources={getRelatedResources(['reviewApproval', 'creativeProofing', 'projectOrchestration'])}
        title="More Resources"
        description="Explore other Kreatli platform features to streamline your video collaboration workflow."
      />

      {/* CTA Section */}
      <CTASection
        title="Ready to Annotate Videos with Precision?"
        description="Experience frame-accurate video annotation designed for video teams. Start using Kreatli today."
      />
      <FooterSection hideCta={true} />
      <SignUpModal />
    </>
  );
}
