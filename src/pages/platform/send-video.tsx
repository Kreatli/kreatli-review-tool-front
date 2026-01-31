import { Accordion, AccordionItem, Button, Card, CardBody } from '@heroui/react';
import Head from 'next/head';
import NextLink from 'next/link';
import React from 'react';

import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';
import { ShareFeaturePreview } from '../../components/home/Features/ShareFeaturePreview';
import { FooterSection } from '../../components/home/Footer/FooterSection';
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
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';

const faqs = [
  {
    question: 'How do I send a video to a client using Kreatli?',
    answer:
      'To send a video to a client in Kreatli, you upload the file once, generate a secure link, and send that link to your client. They open the video in their browser, watch it in full quality, and leave frame-accurate comments without downloading anything. Every video you send stays connected to the right project, file version, and feedback history.',
  },
  {
    question: 'Is it free to send video with Kreatli?',
    answer:
      'Yes. You can send your video for free with Kreatli and experience the full review workflow before upgrading. Sending video via secure links is included as part of the review and approval platform, which also offers higher limits, advanced permissions, and support for growing teams on paid plans.',
  },
  {
    question: 'What happens when I send a video link to someone?',
    answer:
      'When you send a video link, the recipient opens it in their browser and sees a simple player. They can watch the video, add frame-accurate comments, and approve or request changes—all without creating an account. You see all feedback and approvals in Kreatli, tied to that specific version.',
  },
  {
    question: 'Can recipients comment on a video I send without an account?',
    answer:
      'Yes. Kreatli is designed for frictionless review. When you send your video via a secure link, clients and collaborators can watch, comment, and respond directly in their browser without signing up. All comments and approvals stay organized for your team.',
  },
  {
    question: 'What video formats can I send with Kreatli?',
    answer:
      'Kreatli supports all common production formats, including MP4, MOV, and other standard containers. You upload the file once, then send a link to clients and collaborators. They get smooth playback in the browser while your original stays safely stored with version history.',
  },
  {
    question: 'Can I revoke or update access after I send a video?',
    answer:
      'Yes. Because the video lives in Kreatli rather than as an attachment, you stay in control. You can update who can view or comment, send new versions to the same people, and keep an audit trail of approvals tied to specific cuts.',
  },
];

export default function SendVideoPage() {
  useSession();
  const articles = getPlatformArticles('/platform/send-video');

  return (
    <React.Fragment>
      <Head>
        <title>Send Your Video for Free | Kreatli</title>
        <meta
          name="description"
          content="Send your video for free: get a secure link and send it to clients for review. No large attachments—they watch and comment in the browser."
        />
        <link rel="canonical" href="https://kreatli.com/platform/send-video" />
        <meta property="og:url" content="https://kreatli.com/platform/send-video" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Send Your Video for Free | Kreatli" />
        <meta
          property="og:description"
          content="Send your video to clients for free review. Secure links, frame-accurate feedback, no downloads—all in the browser with Kreatli."
        />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:secure_url" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:alt" content="Send Your Video for Free | Kreatli" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Send Your Video for Free | Kreatli" />
        <meta
          name="twitter:description"
          content="Send your video for free with Kreatli. Clients get a link, watch in the browser, and leave frame-accurate comments—no account required."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
      </Head>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Platform', url: '/platform' },
          { name: 'Send Video', url: '/platform/send-video' },
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
              Send Your Video for Free in Seconds
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground-500">
              Send your video to clients with a secure link—no large attachments. They watch and leave
              frame-accurate feedback in the browser. Every video you send stays connected to comments, versions, and
              approvals.
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

      {/* How to Send Video Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">How to Send Video to Clients with Kreatli</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              To send a video in Kreatli, you upload it once and use secure links for every review round. Clients see a
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
                  <h3 className="font-sans text-lg font-semibold">2. Get a Link to Send Video</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Turn any file into a clean, secure link. Skip WeTransfer folders and bulky email attachments when you
                  send video.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="group" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">3. Send Your Video to Stakeholders</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Send the link to clients, producers, and internal teams. They open it in their browser and can start
                  reviewing instantly.
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
                  Reviewers leave frame-accurate comments and approvals tied to the exact version you sent, giving you a
                  single source of truth for every cut.
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
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">
              Why Send Video via Link Instead of Email Attachments
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              When you send video through a link, your review process stays fast, organized, and connected to the
              work—instead of scattered across email threads and downloads.
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
                  Upload your video once and send a lightweight link instead of 10GB files. Clients review in the
                  browser—not in their downloads folder.
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
                  Keep comments, drawings, and approvals attached to the video instead of buried across tools. Everyone
                  sees the same video and the same feedback.
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
                  When you send video links for review, stakeholders respond on their schedule in a simple tool. That
                  means approvals move from days to hours.
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
                  Every video you send, plus every comment and approval, is tied to a specific cut in Kreatli. You
                  always know which version was approved and what changed since.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Controls & Security Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Control How You Send Video to Clients</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Sending your video should never mean losing control. Kreatli combines easy guest access with permissions,
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
                  Send private video links backed by encrypted storage and enterprise-grade infrastructure. Only the
                  people you invite can access the videos you send.
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
                  Decide who can simply watch a video you send and who can leave comments or approvals. Fit every send
                  link to the stage of your review cycle.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="slides" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Version-Aware Sending</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Send new versions of the same video while keeping approvals tied to specific cuts. Never guess which
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
                  Sending video is just one part of Kreatli. Combine it with frame-accurate{' '}
                  <NextLink
                    href="/platform/video-annotation"
                    className="font-medium text-primary underline underline-offset-2"
                  >
                    video annotation
                  </NextLink>{' '}
                  and{' '}
                  <NextLink
                    href="/platform/add-drawing-to-video"
                    className="font-medium text-primary underline underline-offset-2"
                  >
                    drawing tools
                  </NextLink>{' '}
                  to give reviewers a fully visual way to explain changes. You can also{' '}
                  <NextLink
                    href="/platform/share-video"
                    className="font-medium text-primary underline underline-offset-2"
                  >
                    share video
                  </NextLink>{' '}
                  with the same secure workflow.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Free Tools Section */}
      <MoreFreeToolsSection
        title="Free Tools for Video Teams"
        description="Explore our collection of free tools designed to help video professionals send work, collect feedback, and approve faster."
        useBannerResizerInsteadOfCostCalculator
      />

      {/* See How This Works Section */}
      <ResourcesArticlesPreviewSection
        articles={articles}
        title="See How Sending Video Works in Practice"
        description="Explore real-world workflows and guides that show how teams send video for review, collect feedback, and keep approvals organized in Kreatli."
      />

      <PricingSection />

      {/* FAQ Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Get detailed answers about how to send video to clients in Kreatli and how send links fit into your review
              and approval workflow.
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
              to learn how sending video and managing approvals in Kreatli can support your specific workflow.
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
        description="Explore more Kreatli features that support sending video, collecting frame-accurate feedback, and managing approvals across your team."
      />

      {/* CTA Section */}
      <CTASection
        title="Ready to Send Your Next Video for Review?"
        description="Use Kreatli to send video links to clients, collect clear feedback, and move every project to approval faster."
      />
      <FooterSection hideCta={true} />
      <SignUpModal />
    </React.Fragment>
  );
}
