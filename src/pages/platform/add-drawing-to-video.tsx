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
import { ADD_DRAWING_TO_VIDEO_STEPS, PlatformStepGuide } from '../../components/shared/PlatformStepGuide';
import { MoreFreeToolsSection } from '../../components/shared/MoreFreeToolsSection';
import { RelatedResourcesSection } from '../../components/shared/RelatedResourcesSection';
import { ResourcesArticlesPreviewSection } from '../../components/shared/ResourcesArticlesPreviewSection';
import { Icon } from '../../components/various/Icon';
import { getPlatformArticles } from '../../data/platform-articles';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';

const faqs = [
  {
    question: 'What does “add drawing to video” mean in Kreatli?',
    answer:
      'In Kreatli, “add drawing to video” means you can draw directly on video frames using arrows, boxes, highlights, and freehand markup that stay attached to the exact frame and timestamp. Instead of describing changes in plain text like "adjust this part around 0:25," you visually circle, point, or highlight the exact area that needs attention. Those drawings live on top of the video as precise visual instructions, so editors and collaborators always know exactly what to change.',
  },
  {
    question: 'What kinds of drawing tools can I use on video frames?',
    answer:
      'Kreatli lets you use multiple drawing tools on video frames: freehand drawing to sketch ideas, rectangles and circles to highlight regions, arrows and pointers to call out specific elements, and color-coded markup to distinguish different types of feedback. You can combine drawings with frame-accurate comments so every arrow, box, or highlight has clear written context. These tools are designed for fast, visual feedback that feels natural for video production workflows.',
  },
  {
    question: 'How are drawings linked to timestamps and frames?',
    answer:
      'Every drawing you add in Kreatli is pinned to an exact frame and timestamp in the video player. When you scrub or play the video, drawings appear at the moment they were created and disappear when you move away from that frame range, so the timeline never feels cluttered. Editors can jump directly from a drawing to the exact frame where feedback was given, eliminating guesswork and speeding up revisions across cuts and versions.',
  },
  {
    question: 'Can clients draw on videos without creating an account?',
    answer:
      'Yes. With Kreatli’s secure guest review links, clients and external stakeholders can draw on videos and leave visual feedback without creating an account. You share a protected link, and they can watch the video, add drawings, and leave comments in a simple interface. This removes friction from the approval process while still keeping all drawings, comments, and approvals tied to the right file and version in your projects.',
  },
  {
    question: 'How does drawing on video improve feedback compared to plain comments?',
    answer:
      'Drawing directly on video frames turns vague feedback into precise visual direction. Instead of long email threads or generic comments like “make this part brighter,” reviewers can circle the exact object, point to a specific movement, or mark the part of the frame that needs changing. This drastically reduces miscommunication, cuts down revision rounds, and helps editors deliver what stakeholders actually envisioned on the first pass.',
  },
  {
    question: 'Can I edit or remove drawings after they are created?',
    answer:
      'Yes. Drawings in Kreatli are fully editable within the review workflow. You can adjust, move, or delete drawings if feedback changes, and you can mark drawing-linked comments as resolved when edits are complete. This keeps your video review space clean over time while still preserving a clear history of what was requested and what has already been addressed.',
  },
  {
    question: 'Do drawings stay in sync across new versions of a video?',
    answer:
      'Kreatli keeps drawings, comments, and approvals organized by version so you always know which feedback belongs to which cut. When you upload a new version of a video, you can compare changes, see what feedback has been addressed, and decide which drawings still apply. This version-aware drawing workflow helps teams move through iterations quickly without losing context from earlier review rounds.',
  },
];

export default function AddDrawingToVideoPage() {
  useSession();
  const articles = getPlatformArticles('/platform/add-drawing-to-video');

  return (
    <>
      <Head>
        <title>Add Drawing To Video | Kreatli</title>
        <meta
          name="description"
          content="Add drawings, arrows, and markup directly to video frames for frame-accurate feedback. Draw on video, highlight details, and collaborate visually with your team and clients."
        />
        <link rel="canonical" href="https://kreatli.com/platform/add-drawing-to-video" />
        <meta property="og:url" content="https://kreatli.com/platform/add-drawing-to-video" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Add Drawing To Video | Kreatli" />
        <meta
          property="og:description"
          content="Use Kreatli as your video drawing tool. Add arrows, boxes, and freehand markup directly on video frames so editors and clients see exactly what needs to change."
        />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:secure_url" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:alt" content="Add Drawing To Video | Kreatli" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Add Drawing To Video | Kreatli" />
        <meta
          name="twitter:description"
          content="Draw on video frames with arrows, boxes, and freehand markup. Give frame-accurate, visual feedback your editors and clients can act on instantly."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
      </Head>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Platform', url: '/platform' },
          { name: 'Add Drawing To Video', url: '/platform/add-drawing-to-video' },
        ]}
      />
      <FAQStructuredData faqs={faqs} />
      <Header />
      <Decorations />

      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h1 className="mx-auto max-w-2xl font-sans text-3xl font-bold leading-tight sm:text-4xl sm:leading-tight">
              Add Drawing To Video
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground-500">
              Use Kreatli as your video drawing tool. Draw directly on video frames, highlight details with arrows and
              boxes, and turn vague comments into clear, frame-accurate visual feedback.
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

      {/* How to Add Drawing to Video in Kreatli (step-by-step) */}
      <PlatformStepGuide
        stepsSectionTitle="How to Add Drawing to Video in Kreatli"
        stepsIntro="Follow these steps to add drawings, arrows, and markup to your videos in Kreatli—from upload to share and approval."
        steps={ADD_DRAWING_TO_VIDEO_STEPS}
      />

      {/* Drawing Tools Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">
              Video Drawing Tools Built for Creative Teams
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Combine freehand drawings, arrows, shapes, and color-coding to give editors and stakeholders precise,
              visual instructions directly on video frames.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="paint" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Freehand Drawing on Video</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Sketch ideas, trace motion paths, or circle problem areas by drawing directly on the video frame. Make
                  your intent obvious without long written explanations.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="arrowRight" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Arrows, Boxes & Highlights</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Use arrows, rectangles, and highlight blocks to point at specific objects, text, or areas of the frame
                  that need attention or adjustment.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="star" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Color-Coded Drawing Layers</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Assign colors to different types of feedback or reviewers—creative notes, client comments, technical
                  fixes—so teams can scan drawings and know what matters most.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="chat" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Drawings + Frame-Accurate Comments</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Pair every drawing with a frame-accurate comment so feedback is both visual and fully described.
                  Editors can jump to the exact frame and see context instantly.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="group" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Multi-Reviewer Drawing Collaboration</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Directors, producers, editors, and clients can all draw on the same video. See who added which drawing
                  and keep multi-stakeholder feedback in one place.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="checkCircle" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Resolution & Version Tracking</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Track which drawing-linked comments are resolved, and keep feedback organized by version so you always
                  know what still needs work in the current cut.
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
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Why Adding Drawings To Video Matters</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Drawing directly on video frames turns abstract feedback into clear direction. Video teams move faster,
              clients feel heard, and every revision round is more productive.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="eye" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Remove Ambiguity from Feedback</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Stop guessing which shot or object a comment refers to. Drawings pinpoint the exact frame and area to
                  adjust, so editors can act immediately without follow-up questions.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="arrowRight" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Speed Up Revision Cycles</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  With clear, visual instructions, editors spend less time interpreting feedback and more time editing.
                  Fewer misunderstandings mean fewer rounds of back-and-forth revisions.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="smile" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Make Client Feedback Visual</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Clients don’t have to learn editing jargon. They can simply draw on the video to show what they want,
                  making the review process more intuitive and less intimidating.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="slides" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Fit into Real Video Workflows</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Use drawings across storyboards, rough cuts, motion graphics, explainers, ads, and product videos.
                  Kreatli keeps drawings tied to the right assets and projects, not scattered across tools.
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
        description="Explore real-world workflows and guides that demonstrate drawing and annotation on video frames in action."
      />

      <PricingSection />

      {/* FAQ Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Get detailed answers about how to add drawings to video in Kreatli and how it fits into your review
              workflow.
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
              If you didn't find the answer you were looking for, reach out to our team at{' '}
              <a href="mailto:support@kreatli.com" className="font-medium text-primary underline underline-offset-2">
                support@kreatli.com
              </a>{' '}
              to learn how drawing directly on video frames in Kreatli can support your specific workflow.
            </p>
          </div>
        </div>
      </section>

      {/* More Resources Section */}
      <RelatedResourcesSection
        resources={getRelatedResources(['reviewApproval', 'creativeProofing', 'videoAnnotation']).map(
          (resource, index) => {
            if (index === 0) {
              return { ...resource, icon: 'slides' };
            }
            if (index === 1) {
              return { ...resource, icon: 'folder' };
            }
            return resource;
          },
        )}
        title="More Resources"
        description="Explore more Kreatli features that support video review, drawing, and creative proofing workflows."
      />

      {/* CTA Section */}
      <CTASection
        title="Ready to Draw Directly On Your Videos?"
        description="Use Kreatli to add drawings, arrows, and markup directly on video frames so every revision round is fast, clear, and collaborative."
      />
      <FooterSection hideCta={true} />
      <SignUpModal />
    </>
  );
}
