import { Accordion, AccordionItem, Button, Card, CardBody } from '@heroui/react';
import Head from 'next/head';
import NextLink from 'next/link';

import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';
import { FooterSection } from '../../components/home/Footer/FooterSection';
import { PricingSection } from '../../components/home/PricingSection/PricingSection';
import { Header } from '../../components/layout/Header/Header';
import { Decorations } from '../../components/layout/Storyblok/Decorations';
import { BreadcrumbStructuredData } from '../../components/shared/BreadcrumbStructuredData';
import { CTASection } from '../../components/shared/CTASection';
import { FAQStructuredData } from '../../components/shared/FAQStructuredData';
import { InteractiveReviewToolPreview } from '../../components/shared/InteractiveReviewToolPreview';
import { COMMENT_ON_VIDEO_STEPS, PlatformStepGuide } from '../../components/shared/PlatformStepGuide';
import { MoreFreeToolsSection } from '../../components/shared/MoreFreeToolsSection';
import { RelatedResourcesSection } from '../../components/shared/RelatedResourcesSection';
import { ResourcesArticlesPreviewSection } from '../../components/shared/ResourcesArticlesPreviewSection';
import { Icon } from '../../components/various/Icon';
import { getPlatformArticles } from '../../data/platform-articles';
import { getFreeToolsForPlatform } from '../../data/platform-free-tools';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';

const faqs = [
  {
    question: 'What does “add timestamp to video” mean in Kreatli?',
    answer:
      'In Kreatli, “add timestamp to video” means attaching comments directly to specific frames and timestamps in a video. Each note is pinned to an exact moment on the timeline so editors and stakeholders always know precisely where feedback applies.',
  },
  {
    question: 'How do I add a timestamped comment to a video in Kreatli?',
    answer:
      'Upload your video to a Kreatli project and open it in the review player. Scrub or play to the moment you want to comment on, click on the frame, and add your note. The comment is pinned to that exact timestamp, and anyone can jump back to it with a single click.',
  },
  {
    question: 'Can clients add timestamps to video without creating an account?',
    answer:
      'Yes. Kreatli offers no-signup guest review links. When you share a video via a secure link, clients can watch it in their browser and add timestamped comments without creating an account. All feedback stays in one thread on the timeline.',
  },
  {
    question: 'Are timestamped comments visible across versions?',
    answer:
      'When you upload new versions of a video into the same asset, timestamped comments stay connected to the review workflow. You can see which feedback has been addressed, resolve comments, and keep a clear history of notes across cuts.',
  },
  {
    question: 'How does adding timestamps to video help video production workflows?',
    answer:
      'Timestamped comments remove guesswork from review. Instead of “around the 2-minute mark,” reviewers point to an exact frame. Editors can jump straight to every note, work through revisions efficiently, and keep clients aligned on what changed in each cut.',
  },
  {
    question: 'Can multiple people add timestamped comments to the same video?',
    answer:
      'Yes. Multiple reviewers can add timestamped comments to the same video. You can see who wrote which comment, reply in threads, and track resolution so nothing slips through as versions evolve.',
  },
];

export default function AddTimestampToVideoPage() {
  useSession();
  const articles = getPlatformArticles('/platform/add-timestamp-to-video');

  return (
    <>
      <Head>
        <title>Add Timestamp to Video | Kreatli</title>
        <meta
          name="description"
          content="Add timestamped comments to video with frame-accurate feedback in Kreatli. Pin notes to exact moments so editors and clients always know what to change."
        />
        <link rel="canonical" href="https://kreatli.com/platform/add-timestamp-to-video" />
        <meta property="og:url" content="https://kreatli.com/platform/add-timestamp-to-video" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Add Timestamp to Video | Kreatli" />
        <meta
          property="og:description"
          content="Add timestamp to video comments with frame-accurate pins in Kreatli. Keep all feedback tied to exact moments on the timeline."
        />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:secure_url" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:alt" content="Add Timestamp to Video | Kreatli" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Add Timestamp to Video | Kreatli" />
        <meta
          name="twitter:description"
          content="Use Kreatli to add timestamped comments to video with frame-accurate pins and threaded feedback in one place."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
      </Head>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Platform', url: '/platform' },
          { name: 'Add Timestamp to Video', url: '/platform/add-timestamp-to-video' },
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
              Add Timestamp to Video for Precise Feedback
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground-500">
              Add timestamped comments to video with frame-accurate pins in Kreatli. Reviewers point to exact moments,
              and editors jump straight to what needs attention.
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
          <InteractiveReviewToolPreview />
        </div>
      </section>

      {/* How to Add Timestamp to Video in Kreatli (step-by-step) */}
      <PlatformStepGuide
        stepsSectionTitle="How to Add Timestamp to Video in Kreatli"
        stepsIntro="Follow these steps to upload your video, add timestamped comments, and share a review link with your team or clients."
        steps={COMMENT_ON_VIDEO_STEPS}
        completeGuide={{
          href: '/guides/how-to-annotate-video',
          description:
            'Learn how to annotate video with frame-accurate comments, drawings, and markup for faster review cycles and approvals.',
        }}
      />

      {/* Use Cases Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Ways to Use Timestamped Video Comments</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Use timestamped comments to capture precise feedback on edits, cuts, and scenes—without guesswork or long email
              threads.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="time" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Frame-Accurate Timestamps</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Pin comments to exact frames and timestamps so editors know precisely which moment needs a trim, fix, or
                  substitution.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="reply" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Threaded Discussions at Each Timecode</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Keep all back-and-forth about a moment in one place, directly on the timeline, instead of scattered across
                  chats and emails.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="group" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Multi-Reviewer Feedback</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Let producers, clients, and internal teams all add timestamped comments to the same video and see who said
                  what at each timecode.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Free Tools Section */}
      <MoreFreeToolsSection
        title="Free Tools for Video Teams"
        description="Explore free tools that complement timestamped video feedback—video reviewers, link generators, and more."
        tools={getFreeToolsForPlatform('/platform/add-timestamp-to-video')}
      />

      {/* See How This Works Section */}
      <ResourcesArticlesPreviewSection
        articles={articles}
        title="See How Teams Add Timestamps to Video in Practice"
        description="Explore guides and comparisons that show how creative teams use frame-accurate, timestamped comments to speed up review and approvals."
      />

      <PricingSection />

      {/* FAQ Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Get detailed answers about adding timestamps to video in Kreatli and how it fits into your production and
              post-production workflows.
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
              If you did not find the answer you were looking for, reach out to our team at{' '}
              <a href="mailto:support@kreatli.com" className="font-medium text-primary underline underline-offset-2">
                support@kreatli.com
              </a>{' '}
              to learn how timestamped comments in Kreatli can support your specific workflow.
            </p>
          </div>
        </div>
      </section>

      {/* More Resources Section */}
      <RelatedResourcesSection
        resources={getRelatedResources(['reviewApproval', 'creativeWorkspace', 'videoAnnotation'])}
        title="More Resources"
        description="Explore other Kreatli platform features that support precise, frame-accurate video review."
      />

      {/* CTA Section */}
      <CTASection
        title="Ready to Add Timestamped Feedback to Your Videos?"
        description="Use Kreatli to add frame-accurate, timestamped comments to video and keep every note, version, and approval in one place."
      />
      <FooterSection hideCta={true} />
      <SignUpModal />
    </>
  );
}

