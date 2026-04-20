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
import { PlatformInteractiveReviewPreview } from '../../components/shared/PlatformInteractiveReviewPreview';
import { MoreFreeToolsSection } from '../../components/shared/MoreFreeToolsSection';
import {
  PlatformStepGuide,
  VIDEO_ANNOTATION_STEPS,
} from '../../components/shared/PlatformStepGuide';
import { RelatedResourcesSection } from '../../components/shared/RelatedResourcesSection';
import { ResourcesArticlesPreviewSection } from '../../components/shared/ResourcesArticlesPreviewSection';
import { Icon } from '../../components/various/Icon';
import { getPlatformArticles } from '../../data/platform-articles';
import { getFreeToolsForPlatform } from '../../data/platform-free-tools';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';
import { PlatformDefinitionBlock } from '../../components/shared/PlatformDefinitionBlock';

const faqs = [
  {
    question: 'What is video markup?',
    answer:
      'Video markup is visual feedback on the picture at a specific time—drawings, shapes, arrows, highlights, and pinned comments tied to exact frames and timestamps. In Kreatli, video markup stays linked to the frame so editors and clients mean the same moment and region, not “somewhere around two minutes.”',
  },
  {
    question: 'How does frame-accurate video markup work in Kreatli?',
    answer:
      'Click the frame where you want to leave feedback and add markup or a note. Your marks stay attached to that frame and timecode so playback shows them at the right moment. Editors can jump straight to each mark and track what is resolved across versions.',
  },
  {
    question: 'What types of video markup can I add?',
    answer:
      'You can combine frame-accurate comments with freehand drawing, shapes, arrows, and color-coded feedback. Multiple reviewers can contribute with clear attribution, and you can filter or resolve items as new cuts arrive.',
  },
  {
    question: 'Can multiple team members markup the same video?',
    answer:
      'Yes. Multiple reviewers can markup the same video with real-time visibility, color coding, and timeline organization—ideal for directors, producers, editors, and clients in one review.',
  },
  {
    question: 'How do I track which markup has been addressed?',
    answer:
      'Mark feedback resolved or open, filter to unfinished work, and align markup with the version it was created on so nothing is misread after a new upload.',
  },
  {
    question: 'Can clients markup video without creating an account?',
    answer:
      'Yes. Secure guest links let clients watch, add frame-accurate markup, and reply without signing up—reducing friction in approvals.',
  },
  {
    question: 'How is video markup different from comments alone?',
    answer:
      'Comments describe intent; markup shows exactly where on the frame. Together they remove ambiguity for color, graphics, framing, and picture fixes.',
  },
  {
    question: 'What video formats support markup in Kreatli?',
    answer:
      'Common professional formats including MP4, MOV, AVI, MKV, and more, across resolutions and frame rates supported by the platform player.',
  },
  {
    question: 'How does video markup help production workflows?',
    answer:
      'Markup turns vague notes into actionable, visual direction. Editors scrub to the exact frame, see the mark, and close items as revisions land—fewer rounds and less back-and-forth.',
  },
];

export default function VideoMarkupPage() {
  useSession();
  const articles = getPlatformArticles('/platform/video-markup');

  return (
    <>
      <Head>
        <title>Video Markup for Creative Teams | Kreatli Platform</title>
        <meta
          name="description"
          content="Frame-accurate video markup: drawings, shapes, and pinned comments on exact frames. Built for video production and client review."
        />
        <link rel="canonical" href="https://kreatli.com/platform/video-markup" />
        <meta property="og:url" content="https://kreatli.com/platform/video-markup" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Video Markup for Creative Teams | Kreatli Platform" />
        <meta
          property="og:description"
          content="Frame-accurate video markup: drawings, shapes, and pinned comments on exact frames. Built for video production and client review."
        />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:secure_url" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:alt" content="Video Markup for Creative Teams | Kreatli Platform" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Video Markup for Creative Teams | Kreatli Platform" />
        <meta
          name="twitter:description"
          content="Frame-accurate video markup: drawings, shapes, and pinned comments on exact frames. Built for video production and client review."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
      </Head>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Platform', url: '/platform' },
          { name: 'Video Markup', url: '/platform/video-markup' },
        ]}
      />
      <FAQStructuredData faqs={faqs} />
      <Header />
      <Decorations />

      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h1 className="mx-auto max-w-lg font-sans text-3xl font-bold leading-tight sm:text-4xl sm:leading-tight">
              Frame-Accurate Video Markup
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground-500">
              Add video markup on exact frames—drawings, shapes, arrows, and pinned notes—so editors and clients share
              one clear picture of what to change.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button as={NextLink} href="/sign-up" size="lg" className="bg-foreground text-content1">
                Start 7-day trial
              </Button>
              <Button
                as="a"
                href="https://calendar.app.google/NXbAeTAUwaBGh5x49"
                target="_blank"
                rel="noopener noreferrer nofollow"
                size="lg"
                variant="bordered"
              >
                Book a Demo
              </Button>
            </div>
          </div>
          <PlatformInteractiveReviewPreview />
        </div>
      </section>

      <PlatformDefinitionBlock href="/platform/video-markup" />
      <PlatformStepGuide
        stepsSectionTitle="How to add video markup in Kreatli"
        stepsIntro="Follow these steps to add frame-accurate markup to your videos in Kreatli—from upload to share and approval."
        steps={VIDEO_ANNOTATION_STEPS}
        completeGuide={{
          href: '/guides/how-to-markup-a-video',
          description:
            'Step-by-step: how to markup a video with frame-accurate pins, drawing, and clear feedback for editors.',
        }}
      />

      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Markup Tools on the Timeline</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Combine drawing, pins, and notes so feedback is visual and actionable on every frame.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="paint" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Drawings & shapes</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Freehand and shapes to highlight regions, motion, or picture issues on the frame.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="chat" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Frame-pinned comments</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Notes locked to exact frames and timecodes—not vague scrub ranges.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="arrowRight" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Arrows & markers</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Point to talent, graphics, or UI elements that need attention.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="paint" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Color-coded feedback</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Organize markup by reviewer, department, or priority.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="group" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Multi-reviewer markup</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Everyone sees the same timeline of marks with clear attribution.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="checkCircle" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Resolution tracking</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Resolve markup as new versions address feedback; keep open work visible.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mx-auto w-fit max-w-full rounded-2xl border border-foreground-200 bg-content1/60 px-6 py-8 shadow-sm backdrop-blur-sm">
            <h2 className="text-center font-sans text-lg font-semibold text-foreground-700">Related video features</h2>
            <p className="mx-auto mt-2 max-w-xl text-center text-sm text-foreground-500">
              Annotation, feedback, comments, and drawing workflows:
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button
                as={NextLink}
                href="/platform/video-annotation"
                size="md"
                className="bg-foreground font-medium text-content1 hover:opacity-90"
                endContent={<Icon icon="arrowRight" size={16} />}
              >
                Video Annotation
              </Button>
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
                href="/platform/add-drawing-to-video"
                size="md"
                className="bg-foreground font-medium text-content1 hover:opacity-90"
                endContent={<Icon icon="arrowRight" size={16} />}
              >
                Add Drawing To Video
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Why Video Markup Matters</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Turn vague notes into precise, visual direction that speeds up post and client approvals.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="eye" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Less ambiguity</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Show the exact frame and region—not just a rough timecode.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="arrowRight" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Faster revisions</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Editors jump to marked frames and clear items as fixes land.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="group" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Better collaboration</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Teams and clients markup together with organized, color-aware feedback.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="smile" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Client-friendly</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Guest links keep markup simple for stakeholders without new accounts.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      <MoreFreeToolsSection
        title="Free Tools for Video Teams"
        description="Free tools for frame-accurate review, markup, and proofing."
        tools={getFreeToolsForPlatform('/platform/video-markup')}
      />

      <ResourcesArticlesPreviewSection
        articles={articles}
        title="See How This Works in Practice"
        description="Guides and workflows that show frame-accurate video markup in action."
      />

      <PricingSection />

      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Answers about video markup for production and review teams.
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
              Contact{' '}
              <a href="mailto:support@kreatli.com" className="font-medium text-primary underline underline-offset-2">
                support@kreatli.com
              </a>{' '}
              for help with video markup and approvals.
            </p>
          </div>
        </div>
      </section>

      <RelatedResourcesSection
        resources={getRelatedResources(['reviewApproval', 'creativeProofing', 'projectOrchestration'])}
        title="More Resources"
        description="Explore other Kreatli platform features to streamline your video collaboration workflow."
      />

      <div className="mx-auto max-w-4xl px-6 pb-8 text-center">
        <p className="text-base text-foreground-500">
          Wondering how Kreatli compares?{' '}
          <NextLink
            href="/comparisons/kreatli-vs-frameio"
            className="font-medium text-primary underline-offset-2 hover:underline"
          >
            See Kreatli vs Frame.io for video review →
          </NextLink>
        </p>
      </div>

      <CTASection
        title="Ready for frame-accurate video markup?"
        description="Mark up video on exact frames with your team and clients. Start using Kreatli today."
      />
      <FooterSection hideCta={true} />
      <SignUpModal />
    </>
  );
}
