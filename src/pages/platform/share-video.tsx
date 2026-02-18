import { Accordion, AccordionItem, Button, Card, CardBody } from '@heroui/react';
import Head from 'next/head';
import NextLink from 'next/link';

import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';
import { ShareFeaturePreview } from '../../components/home/Features/ShareFeaturePreview';
import { FooterSection } from '../../components/home/Footer/FooterSection';
import { PlatformStepGuide, SHARE_VIDEO_STEPS } from '../../components/shared/PlatformStepGuide';
import { PricingSection } from '../../components/home/PricingSection/PricingSection';
import { Header } from '../../components/layout/Header';
import { Decorations } from '../../components/layout/Storyblok/Decorations';
import { BreadcrumbStructuredData } from '../../components/shared/BreadcrumbStructuredData';
import { CTASection } from '../../components/shared/CTASection';
import { FAQStructuredData } from '../../components/shared/FAQStructuredData';
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
    question: 'How do I share a video with a client using Kreatli?',
    answer:
      'To share a video with a client in Kreatli, you upload the file once, generate a secure share link, and send that link to your client. They can open the video in their browser, watch it in full quality, and leave frame-accurate comments without downloading anything. Every shared video stays connected to the right project, file version, and feedback history so your team never loses context.',
  },
  {
    question: 'Can people I share a video with comment without an account?',
    answer:
      'Yes. Kreatli is designed for frictionless client review. When you share your video via a secure link, clients and external stakeholders can watch, comment, and respond directly in their browser without creating an account. This guest review experience removes sign-up friction while still keeping all comments, approvals, and versions organized for your team.',
  },
  {
    question: 'Is it free to share videos in Kreatli?',
    answer:
      'You can start sharing videos in Kreatli for free and experience the full review workflow before upgrading. Sharing video links is included as part of the broader review and approval platform, which also offers higher limits, advanced permissions, and support for growing teams on paid plans. This lets small teams move their review process online without upfront cost.',
  },
  {
    question: 'Can I revoke or update access to a shared video?',
    answer:
      'Yes. Because your shared video lives inside Kreatli rather than in an attachment, you stay in control of access. You can update who is allowed to view or comment, share new versions to the same stakeholders, and keep an audit trail of approvals tied to specific cuts. This is much safer and clearer than sending static files or unmanaged links.',
  },
  {
    question: 'What video formats can I share with Kreatli?',
    answer:
      'Kreatli supports all common production formats, including MP4, MOV, and other standard containers used in video workflows. You upload the master once, then share it with clients and collaborators via secure links. They see a smooth playback experience in the browser, while your original file stays safely stored with version history. To share MP4 specifically, see how to share MP4 files in Kreatli.',
    answerDisplay: (
      <>
        Kreatli supports all common production formats, including MP4, MOV, and other standard containers used in video
        workflows. You upload the master once, then share it with clients and collaborators via secure links. They see a
        smooth playback experience in the browser, while your original file stays safely stored with version history. To
        share MP4 specifically, see how to{' '}
        <NextLink href="/platform/share-mp4" className="font-medium text-primary underline underline-offset-2">
          share MP4 files
        </NextLink>{' '}
        in Kreatli.
      </>
    ),
  },
];

export default function ShareVideoPage() {
  useSession();
  const articles = getPlatformArticles('/platform/share-video');

  return (
    <>
      <Head>
        <title>Share Your Video for Free | Kreatli</title>
        <meta
          name="description"
          content="Share video links with clients and stakeholders for review in seconds. Let them watch, comment, and approve online—without downloads, attachments, or complex tools."
        />
        <link rel="canonical" href="https://kreatli.com/platform/share-video" />
        <meta property="og:url" content="https://kreatli.com/platform/share-video" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Share Your Video for Review | Kreatli" />
        <meta
          property="og:description"
          content="Share video links with clients for fast, frame-accurate review. Collect comments, track versions, and manage approvals in one place with Kreatli."
        />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:secure_url" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:alt" content="Share Your Video for Review | Kreatli" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Share Your Video for Review | Kreatli" />
        <meta
          name="twitter:description"
          content="Share your video with clients and collaborators via secure links. Let them review, comment, and approve online with Kreatli."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
      </Head>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Platform', url: '/platform' },
          { name: 'Share Video', url: '/platform/share-video' },
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
              Share Your Video for Review in Seconds
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground-500">
              Share video links with clients and stakeholders for frame-accurate feedback—without downloads, heavy
              attachments, or account creation. Every shared video stays connected to comments, versions, and approvals.
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
          <ShareFeaturePreview />
        </div>
      </section>

      {/* How to Share Video in Kreatli (step-by-step) */}
      <PlatformStepGuide
        stepsSectionTitle="How to Share Your Video in Kreatli"
        stepsIntro="Follow these steps to share video with clients and stakeholders—from upload to feedback and approval."
        steps={SHARE_VIDEO_STEPS}
        completeGuide={{
          href: '/guides/how-to-send-video-via-email',
          description:
            'Learn how to send a video through email, understand file size limits, and discover better ways to share videos for review and approval.',
        }}
      />

      {/* How to Share Video Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">
              How to Share Video for Client Review with Kreatli
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              To share a video in Kreatli, you upload it once and use secure links for every review round. Clients see a
              simple player; your team gets frame-accurate comments and approvals.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="upload" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">1. Upload Your Video</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Add your video file to Kreatli once. Your original stays safely stored with version history and access
                  controls.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="link" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">2. Generate a Share Video Link</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Turn any file into a clean, secure share video link. Skip WeTransfer folders and bulky email
                  attachments.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="group" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">3. Share Your Video with Stakeholders</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Send the share link to clients, producers, and internal teams. They open it in their browser and can
                  start reviewing instantly.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="chat" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">4. Collect Feedback & Approvals</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Reviewers leave frame-accurate comments and approvals tied to the exact version you shared, giving you
                  a single source of truth for every cut.
                </p>
              </CardBody>
            </Card>
          </div>

          <Card className="mx-auto mt-10 max-w-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 shadow-sm">
            <CardBody className="flex flex-col items-center justify-center gap-4 p-6 text-center sm:gap-6 sm:py-8">
              <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/20">
                  <Icon icon="link" size={22} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-sans text-base font-semibold text-foreground sm:text-lg">
                    Want to focus on generating links?
                  </h3>
                  <p className="mt-0.5 text-sm text-foreground-500">
                    See how our free video link generator fits into your workflow.
                  </p>
                </div>
              </div>
              <Button
                as={NextLink}
                href="/platform/free-video-link-generator"
                size="lg"
                className="w-full shrink-0 bg-foreground text-content1 sm:w-auto"
                endContent={<Icon icon="arrowRight" size={18} />}
              >
                Free Video Link Generator
              </Button>
            </CardBody>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">
              Why Share Video Links Instead of Sending Files
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Sharing video through links keeps your review process fast, organized, and connected to the work
              itself—instead of scattered across email threads and downloads.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="upload" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">No Heavy Attachments</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Upload your video once and share a lightweight link instead of sending 10GB files back and forth.
                  Clients review in the browser—not in their downloads folder.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="eye" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Clear, Centralized Feedback</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Keep comments, drawings, and approvals attached to the video itself instead of buried across tools.
                  Everyone sees the same shared video and the same feedback.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="time" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Faster Approvals</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  When you share video links for review, stakeholders respond on their schedule in a tool that feels
                  simple. That means approvals move from days to hours.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="checkCircle" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Single Source of Truth</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Every shared video, comment, and approval is tied to a specific cut in Kreatli. You always know which
                  version was approved and what changed since.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Sharing Controls & Security Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Control How You Share Video With Clients</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Sharing your video should never mean losing control. Kreatli combines easy guest access with permissions,
              versioning, and secure storage.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="shield" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Secure, Private Links</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Share private video links backed by encrypted storage and enterprise-grade infrastructure. Only the
                  people you invite can access your shared videos.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="group" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Viewer & Commenter Controls</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Decide who can simply watch a shared video and who can leave comments or approvals. Fit every share
                  video link to the stage of your review cycle.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="slides" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Version-Aware Sharing</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Share new versions of the same video while keeping approvals tied to specific cuts. Never guess which
                  export a client signed off on.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="folder" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Part of a Complete Review Platform</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Sharing video is just one part of Kreatli. You can also{' '}
                  <NextLink
                    href="/platform/send-video"
                    className="font-medium text-primary underline underline-offset-2"
                  >
                    send video
                  </NextLink>
                  {' with the same secure workflow. Combine it with frame-accurate '}
                  <NextLink
                    href="/platform/video-annotation"
                    className="font-medium text-primary underline underline-offset-2"
                  >
                    video annotation
                  </NextLink>
                  {' and '}
                  <NextLink
                    href="/platform/add-drawing-to-video"
                    className="font-medium text-primary underline underline-offset-2"
                  >
                    drawing tools
                  </NextLink>
                  {' to give reviewers a fully visual way to explain changes.'}
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Free Tools Section */}
      <MoreFreeToolsSection
        title="Free Tools for Video Teams"
        description="Explore our collection of free tools designed to help video professionals share work, collect feedback, and approve faster."
        tools={getFreeToolsForPlatform('/platform/share-video')}
      />

      {/* See How This Works Section */}
      <ResourcesArticlesPreviewSection
        articles={articles}
        title="See How Sharing Video Links Works in Practice"
        description="Explore real-world workflows and guides that show how teams share video for review, collect feedback, and keep approvals organized in Kreatli."
      />

      <PricingSection />

      {/* FAQ Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Get detailed answers about how to share video with clients in Kreatli and how shared links fit into your
              review and approval workflow.
            </p>
          </div>
          <Accordion variant="splitted" className="gap-2">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.question}
                title={<span className="text-base font-semibold sm:text-lg">{faq.question}</span>}
                className="py-2"
              >
                <div className="text-sm leading-relaxed text-foreground-500 sm:text-base">
                  {'answerDisplay' in faq && faq.answerDisplay != null ? faq.answerDisplay : faq.answer}
                </div>
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
              to learn how sharing video and managing approvals in Kreatli can support your specific workflow.
            </p>
          </div>
        </div>
      </section>

      {/* More Resources Section */}
      <RelatedResourcesSection
        resources={getRelatedResources(['reviewApproval', 'videoAnnotation', 'secureAssetStorage']).map(
          (resource, index) => {
            if (index === 0) {
              return { ...resource, icon: 'link' };
            }
            if (index === 1) {
              return { ...resource, icon: 'paint' };
            }
            return resource;
          },
        )}
        title="More Resources"
        description="Explore more Kreatli features that support sharing video, collecting frame-accurate feedback, and managing approvals across your team."
      />

      {/* CTA Section */}
      <CTASection
        title="Ready to Share Your Next Video for Review?"
        description="Use Kreatli to share video links with clients, collect clear feedback, and move every project to approval faster."
      />
      <FooterSection hideCta={true} />
      <SignUpModal />
    </>
  );
}
