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
import { DRAW_ON_VIDEO_STEPS, PlatformStepGuide } from '../../components/shared/PlatformStepGuide';
import { MoreFreeToolsSection } from '../../components/shared/MoreFreeToolsSection';
import { RelatedResourcesSection } from '../../components/shared/RelatedResourcesSection';
import { ResourcesArticlesPreviewSection } from '../../components/shared/ResourcesArticlesPreviewSection';
import { Icon } from '../../components/various/Icon';
import { getPlatformArticles } from '../../data/platform-articles';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';

const faqs = [
  {
    question: 'What does “draw on a video” mean in Kreatli?',
    answer:
      'In Kreatli, “draw on a video” means you can draw directly on video frames using freehand strokes, shapes, highlights, and arrows that stay attached to the exact frame and timestamp. Instead of describing changes in plain text like "adjust this part around 0:25," you visually circle, point, or highlight the exact area that needs attention. Those drawings live on top of the video as precise visual instructions, so editors and collaborators always know exactly what to change.',
  },
  {
    question: 'What kinds of drawing tools can I use to draw on a video?',
    answer:
      'Kreatli lets you use multiple drawing tools on video: freehand drawing to sketch ideas or circle problem areas, rectangles and highlights to mark regions, arrows and markers to point to specific elements, and color-coded markup to distinguish different types of feedback. You can combine drawings with frame-accurate comments so every arrow, box, or highlight has clear written context. These tools are designed for fast, visual feedback that fits video production and creative review workflows.',
  },
  {
    question: 'How are drawings linked to the video frame and timestamp?',
    answer:
      'Every drawing you add in Kreatli when you draw on a video is pinned to an exact frame and timestamp in the video player. When you scrub or play the video, drawings appear at the moment they were created. Editors can jump directly from a drawing to the exact frame where feedback was given, eliminating guesswork and speeding up revisions across cuts and versions.',
  },
  {
    question: 'Can clients draw on a video without creating an account?',
    answer:
      'Yes. With Kreatli’s secure guest review links, clients and external stakeholders can draw on a video and leave visual feedback without creating an account. You share a protected link, and they can watch the video, add drawings, and leave comments in a simple interface. This removes friction from the approval process while keeping all drawings, comments, and approvals tied to the right file and project.',
  },
  {
    question: 'How does drawing on a video improve feedback compared to plain comments?',
    answer:
      'Drawing directly on video frames turns vague feedback into precise visual direction. Instead of long email threads or generic comments like "make this part brighter," reviewers can circle the exact object, point to a specific movement, or mark the part of the frame that needs changing. This reduces miscommunication, cuts down revision rounds, and helps editors deliver what stakeholders actually envisioned on the first pass.',
  },
  {
    question: 'Can I edit or remove drawings after they are created?',
    answer:
      'Yes. Drawings in Kreatli are fully editable within the review workflow. You can adjust, move, or delete drawings if feedback changes, and you can mark drawing-linked comments as resolved when edits are complete. This keeps your video review space clean over time while still preserving a clear history of what was requested and what has already been addressed.',
  },
  {
    question: 'Can multiple people draw on the same video at once?',
    answer:
      'Yes. Multiple reviewers can draw on the same video. Each person’s drawings and comments are visible to everyone, with indicators for who added what. You can see all markup in one view, filter by reviewer, and track resolution. This works for internal teams and for clients using guest links.',
  },
  {
    question: 'Why draw on a video in Kreatli instead of a standalone tool?',
    answer:
      'Drawing on a video in Kreatli keeps review in one place with your PDFs, images, and other deliverables. You get a single project timeline, one set of review links for clients, and one approval workflow instead of juggling separate video tools, email, and review apps. That reduces delays and ensures nothing gets missed when moving from draft to final.',
  },
];

export default function DrawOnAVideoPage() {
  useSession();
  const articles = getPlatformArticles('/platform/draw-on-a-video');

  return (
    <>
      <Head>
        <title>Draw on a Video | Kreatli</title>
        <meta
          name="description"
          content="Draw on a video with freehand, shapes, and markup. Review and collaborate on video with precise drawings and frame-accurate feedback in one place with Kreatli."
        />
        <link rel="canonical" href="https://kreatli.com/platform/draw-on-a-video" />
        <meta property="og:url" content="https://kreatli.com/platform/draw-on-a-video" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Draw on a Video | Kreatli" />
        <meta
          property="og:description"
          content="Draw on a video with freehand, shapes, and markup. Review and collaborate with precise, frame-accurate drawings in one place."
        />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:secure_url" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:alt" content="Draw on a Video | Kreatli" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Draw on a Video | Kreatli" />
        <meta
          name="twitter:description"
          content="Draw on a video with freehand, shapes, and markup. Give frame-accurate, visual feedback your team and clients can act on."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
      </Head>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Platform', url: '/platform' },
          { name: 'Draw on a Video', url: '/platform/draw-on-a-video' },
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
              Draw on a Video
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground-500">
              Draw directly on video with freehand, shapes, and markup. Review and collaborate on video with precise
              drawings and frame-accurate feedback in one place with your team and creative assets.
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

      {/* How to Draw on a Video in Kreatli (step-by-step) */}
      <PlatformStepGuide
        stepsSectionTitle="How to Draw on a Video in Kreatli"
        stepsIntro="Follow these steps to draw on your videos in Kreatli—from upload to share and approval."
        steps={DRAW_ON_VIDEO_STEPS}
      />

      {/* Ways to Draw on a Video Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Ways to Draw on a Video</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Use freehand drawing, shapes, highlights, and arrows to give precise visual feedback at any moment in your
              video.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="paint" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Freehand Drawing</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Sketch ideas, circle problem areas, or trace motion paths by drawing directly on the video frame. Make
                  your intent obvious without long written explanations.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="paint" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Highlights & Shapes</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Highlight regions or use shapes to mark areas that need attention. Draw attention to specific objects,
                  text, or parts of the frame.
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
                  Use arrows and markers to point to specific elements on a frame. Perfect for video feedback and edit
                  notes.
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
                  Use different colors to categorize drawings by type, priority, or reviewer for easy organization and
                  tracking.
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
                  Multiple team members and clients can draw on the same video. See who added what with clear indicators
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
                  <h3 className="font-sans text-lg font-semibold">Resolution Tracking</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Mark drawings and comments as resolved or unresolved. Track which feedback has been addressed and
                  which still needs attention across review rounds.
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
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Why Draw on a Video in Kreatli</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Draw on a video with precise, frame-accurate feedback so your team and clients stay aligned and revisions
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
                  <h3 className="font-sans text-lg font-semibold">Clearer Feedback</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Instead of “fix this around 0:25,” drawings point to the exact frame and area. No more back-and-forth
                  to clarify what to change.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="arrowRight" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Fewer Revision Rounds</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  When feedback is pinned to the right frame, editors can act on it immediately. Resolution tracking
                  ensures nothing gets missed.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="group" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">One Place for Video and More</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Draw on a video alongside PDFs and other assets in the same project. One review link, one approval
                  workflow, less tool-switching.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="smile" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Client-Friendly Video Review</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Clients can draw on a video through no-signup guest links. They add drawings and markup without
                  creating an account, so approvals move faster.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Free Tools Section */}
      <MoreFreeToolsSection
        title="Free Tools for Creative Teams"
        description="Explore our collection of free tools designed to help creative and video professionals work more efficiently."
        useBannerResizerInsteadOfCostCalculator
      />

      {/* See How This Works Section */}
      <ResourcesArticlesPreviewSection
        articles={articles}
        title="See How This Works in Practice"
        description="Explore guides and comparisons that show how teams draw on a video and manage review in Kreatli."
      />

      <PricingSection />

      {/* FAQ Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Get detailed answers about drawing on a video and review workflows in Kreatli.
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
              If you didn't find the answer you were looking for, contact our support team at{' '}
              <a href="mailto:support@kreatli.com" className="font-medium text-primary underline underline-offset-2">
                support@kreatli.com
              </a>{' '}
              to learn how Kreatli can help you draw on a video and streamline your review workflow.
            </p>
          </div>
        </div>
      </section>

      {/* More Resources Section */}
      <RelatedResourcesSection
        resources={getRelatedResources(['reviewApproval', 'creativeProofing', 'videoAnnotation'])}
        title="More Resources"
        description="Explore other Kreatli platform features to streamline your review and collaboration workflow."
      />

      {/* CTA Section */}
      <CTASection
        title="Ready to Draw on a Video with Clarity?"
        description="Draw on a video with freehand, shapes, and markup in one place with your team and clients. Start using Kreatli today."
      />
      <FooterSection hideCta={true} />
      <SignUpModal />
    </>
  );
}
