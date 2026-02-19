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
import { MoreFreeToolsSection } from '../../components/shared/MoreFreeToolsSection';
import { PlatformStepGuide, VIDEO_VERSIONING_STEPS } from '../../components/shared/PlatformStepGuide';
import { RelatedResourcesSection } from '../../components/shared/RelatedResourcesSection';
import { ResourcesArticlesPreviewSection } from '../../components/shared/ResourcesArticlesPreviewSection';
import { VersioningFeaturePreview } from '../../components/shared/VersioningFeaturePreview';
import { Icon } from '../../components/various/Icon';
import { getPlatformArticles } from '../../data/platform-articles';
import { getFreeToolsForPlatform } from '../../data/platform-free-tools';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';

const faqs = [
  {
    question: 'What is video versioning?',
    answer:
      'Video versioning is keeping a history of your video cuts and revisions so you can track changes, compare versions side by side, and always know which cut is current. In Kreatli, video versioning is built in: every upload can be stored as a new version of the same file, and you can compare any two versions side by side with synced timelines. Comments and feedback stay tied to the right version, so nothing gets lost as you move from rough cut to final.',
  },
  {
    question: 'How do I manage video versioning in Kreatli?',
    answer:
      'Upload your first video to a Kreatli project. When you have a new cut, open the file menu (⋯) on that asset and choose Upload new version. The new file appears in the same project with full version history. You can compare two versions side by side by selecting both in the Media view and clicking Compare. Video versioning in Kreatli keeps every cut in one place so you and your clients always see the latest or compare past versions.',
  },
  {
    question: 'Can I compare two video versions side by side?',
    answer:
      "Yes. In Kreatli you select two video versions in the Media view and click Compare to open them side by side. Playback stays in sync so you can spot frame-level differences. The comments panel shows feedback on either version, and you can add frame-accurate comments and annotations. Video versioning with side-by-side comparison makes it easy to see what changed between cuts and track what's resolved.",
  },
  {
    question: 'Does video versioning work with client review links?',
    answer:
      'Yes. When you share a review link, clients see the version you shared. When you upload a new version, you can share the same or a new link so they see the updated cut. Video versioning keeps approval and feedback tied to the right version, and you stay in control of who can view or comment on each cut.',
  },
  {
    question: 'How long is video version history kept?',
    answer:
      'Kreatli keeps version history for your video files so you can compare and revert as needed. All versions stay in the same project and are available for side-by-side comparison and review. Check your plan for storage limits; versioning is designed so you never lose track of which cut is which.',
  },
  {
    question: 'Can multiple people review different video versions?',
    answer:
      'Yes. You can share review links for specific versions, and reviewers can add comments and feedback on the version they see. When you upload a new version, you control who gets access. Video versioning in Kreatli lets you track who approved which cut and keep feedback organized across revision rounds.',
  },
  {
    question: 'Why use video versioning in Kreatli instead of folder renames or spreadsheets?',
    answer:
      'Video versioning in Kreatli keeps every cut in one place with the same asset, so you don\'t rely on "final_v2_revised_FINAL.mp4" or spreadsheets to track what changed. You compare versions side by side with synced playback, feedback is tied to the right version, and uploading a new version is one click. That reduces confusion and speeds up review and approval.',
  },
  {
    question: 'How does video versioning help video production workflows?',
    answer:
      "Video versioning streamlines production by giving you a clear history of cuts, side-by-side comparison, and feedback tied to each version. Editors and clients always know which cut they're looking at, and you can track approvals and resolution across rounds. That speeds up revisions and ensures nothing gets missed when moving from draft to final.",
  },
];

export default function VideoVersioningPage() {
  useSession();
  const articles = getPlatformArticles('/platform/video-versioning');

  return (
    <>
      <Head>
        <title>Video Versioning | Kreatli</title>
        <meta
          name="description"
          content="Video versioning with version history and side-by-side comparison. Track and compare video versions in one place with your team."
        />
        <link rel="canonical" href="https://kreatli.com/platform/video-versioning" />
        <meta property="og:url" content="https://kreatli.com/platform/video-versioning" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Video Versioning | Kreatli" />
        <meta
          property="og:description"
          content="Video versioning with version history and side-by-side comparison. Track and compare video versions in one place."
        />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:secure_url" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:alt" content="Video Versioning | Kreatli" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Video Versioning | Kreatli" />
        <meta
          name="twitter:description"
          content="Video versioning with version history and side-by-side comparison. Track and compare video versions in one place."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
      </Head>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Platform', url: '/platform' },
          { name: 'Video Versioning', url: '/platform/video-versioning' },
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
              Video Versioning
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground-500">
              Video versioning with version history and side-by-side comparison. Track and compare video versions in one
              place with your team and creative assets.
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
          <div className="mx-auto w-full max-w-4xl">
            <VersioningFeaturePreview />
          </div>
        </div>
      </section>

      <PlatformStepGuide
        stepsSectionTitle="How to use video versioning in Kreatli"
        stepsIntro="Follow these steps to upload video versions, compare them side by side, and upload new versions as your cut evolves."
        steps={VIDEO_VERSIONING_STEPS}
        completeGuide={{
          href: '/guides/how-to-annotate-video',
          description:
            'Learn how to annotate video and manage feedback across versions for faster review cycles and client approvals.',
        }}
      />

      {/* Video versioning features Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">How Video Versioning Works</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Version history, side-by-side comparison, and one-click uploads keep your video versioning simple and
              traceable.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="time" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Version History</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Every video you upload as a new version stays in the same project. Video versioning keeps a clear
                  history so you always know which cut is current and can compare or revert as needed.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="compare" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Side-by-Side Compare</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Select two video versions and compare them side by side with synced timelines. Spot frame-level
                  differences and see feedback on either version in one view.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="upload" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Upload New Version</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  One click from the file menu to upload a new version. The new cut appears in the same project so you
                  can compare with the previous version and keep review going without losing context.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="chat" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Feedback Tied to Versions</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Comments and annotations stay linked to the version they were added on. Video versioning in Kreatli
                  keeps feedback organized so you know what was addressed in which cut.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="checkCircle" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Resolution Across Versions</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Mark feedback resolved as you address it in new versions. Track what's done and what's pending across
                  revision rounds so nothing gets missed.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="share" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Share the Right Version</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Share review links for the version you want clients to see. When you upload a new version, you control
                  who gets access so everyone stays on the same cut.
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
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Why Use Video Versioning in Kreatli</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Video versioning with version history and comparison keeps your cuts organized and your team aligned.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="eye" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">No More Naming Chaos</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Stop relying on "final_v3_revised_FINAL.mp4." Video versioning keeps every cut under one asset with
                  clear history, so you always know which version is which.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="compare" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">See What Changed</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Compare two video versions side by side with synced playback. Spot frame-level differences and keep
                  feedback tied to the right version so revisions move faster.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="group" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">One Place for All Versions</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Video versioning in Kreatli keeps every cut in the same project with your PDFs and other assets. One
                  review link workflow, one approval trail, less tool-switching.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="smile" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Client-Friendly Version Review</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Share the version you want clients to review. When you upload a new cut, you decide who sees it. Video
                  versioning keeps approvals clear and feedback organized for every round.
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
        tools={getFreeToolsForPlatform('/platform/video-versioning')}
      />

      {/* See How This Works Section */}
      <ResourcesArticlesPreviewSection
        articles={articles}
        title="See How This Works in Practice"
        description="Explore guides and comparisons that show how teams use video versioning and manage review in Kreatli."
      />

      <PricingSection />

      {/* FAQ Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Get detailed answers about video versioning and review workflows in Kreatli.
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
              to learn how Kreatli can help you with video versioning and streamline your review workflow.
            </p>
          </div>
        </div>
      </section>

      {/* More Resources Section */}
      <RelatedResourcesSection
        resources={getRelatedResources(['reviewApproval', 'creativeProofing', 'videoAnnotation', 'secureAssetStorage'])}
        title="More Resources"
        description="Explore other Kreatli platform features to streamline your review and collaboration workflow."
      />

      {/* CTA Section */}
      <CTASection
        title="Ready for Simple Video Versioning?"
        description="Video versioning with version history and side-by-side comparison in one place with your team and clients. Start using Kreatli today."
      />
      <FooterSection hideCta={true} />
      <SignUpModal />
    </>
  );
}
