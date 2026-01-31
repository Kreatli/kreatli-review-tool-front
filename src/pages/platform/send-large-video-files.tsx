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
import { RelatedResourcesSection } from '../../components/shared/RelatedResourcesSection';
import { ResourcesArticlesPreviewSection } from '../../components/shared/ResourcesArticlesPreviewSection';
import { Icon } from '../../components/various/Icon';
import { getPlatformArticles } from '../../data/platform-articles';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';

const faqs = [
  {
    question: 'How do I send large video files to clients?',
    answer:
      'Email has strict size limits, so large video files need other methods. You can use cloud storage links (Google Drive, Dropbox), file-transfer tools (WeTransfer, etc.), or a review platform like Kreatli that lets you upload once and send a link—recipients watch in the browser without downloading. Kreatli is built for video: you send a secure link, clients watch and leave frame-accurate comments, and you avoid attachment limits and download friction.',
  },
  {
    question: 'What is the best way to send a large video file?',
    answer:
      'For review and approval, sending a link is usually better than sending the file itself. Upload your video to Kreatli, generate a secure link, and share it with clients. They open the link, watch in full quality, and comment—no download, no account required. For one-off delivery of the raw file, cloud or peer-to-peer transfer tools work; for ongoing review workflows, a dedicated video review platform keeps everything in one place.',
  },
  {
    question: 'Why can’t I email a large video file?',
    answer:
      'Most email providers limit attachments to 25 MB or less. Video files often exceed that, so emails bounce or fail. Even when they go through, large attachments slow down inboxes and may be stripped or blocked. Sending a link instead (e.g. from Kreatli, Google Drive, or a file-transfer service) avoids these limits and lets recipients stream or download on their own.',
  },
  {
    question: 'Is it free to send large video files with Kreatli?',
    answer:
      'Yes. You can send video for free with Kreatli: upload once, get a secure link, and share it with clients for review. Recipients watch and comment in the browser without signing up. Paid plans offer higher limits, more projects, and advanced permissions if you need to scale.',
  },
  {
    question: 'Do recipients need to download the video to watch it?',
    answer:
      'Not when you use Kreatli. You send a link; they open it in their browser and watch the video there. No download required unless they choose to. That keeps the experience simple and avoids asking clients to handle large files. Feedback and approvals stay tied to the same link and version.',
  },
  {
    question: 'What’s the difference between sending a file and sending a link?',
    answer:
      'Sending the file means you transfer the actual video (e.g. via WeTransfer or cloud storage)—the recipient gets a copy. Sending a link means they access the video where it’s hosted (e.g. in Kreatli); they watch and comment without taking a copy. For review and approval, links are usually better: one source of truth, frame-accurate comments, and no duplicate files floating around.',
  },
];

export default function SendLargeVideoFilesPage() {
  useSession();
  const articles = getPlatformArticles('/platform/send-large-video-files');

  return (
    <>
      <Head>
        <title>Send Large Video Files | Kreatli</title>
        <meta
          name="description"
          content="Send large video files to clients without email limits. Use secure links so they watch and comment in the browser—no download required. Free to get started."
        />
        <link rel="canonical" href="https://kreatli.com/platform/send-large-video-files" />
        <meta property="og:url" content="https://kreatli.com/platform/send-large-video-files" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Send Large Video Files | Kreatli" />
        <meta
          property="og:description"
          content="Send large video files to clients with secure links. They watch and comment in the browser—no download, no email limits."
        />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:secure_url" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:alt" content="Send Large Video Files | Kreatli" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Send Large Video Files | Kreatli" />
        <meta
          name="twitter:description"
          content="Send large video files to clients with secure links. Watch and comment in the browser—no download required."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
      </Head>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Platform', url: '/platform' },
          { name: 'Send Large Video Files', url: '/platform/send-large-video-files' },
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
              Send Large Video Files
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground-500">
              Send large video files to clients without email limits. Upload once, share a secure link—they watch and
              comment in the browser. No download required. Free to get started.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button as={NextLink} href="/sign-up" size="lg" className="bg-foreground text-content1">
                Get Started for Free
              </Button>
              <Button
                as={NextLink}
                href="/platform/free-video-link-generator"
                size="lg"
                variant="bordered"
              >
                Use Free Video Link Generator
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">
              Send Large Video Files - Built for Creative Teams
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Avoid email attachment limits and download friction. Send a link instead—recipients watch in the browser
              and leave frame-accurate feedback.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="upload" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Upload Once, Send a Link</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Upload your large video to Kreatli and generate a secure link. Send the link to clients—they open it
                  and watch in the browser. No file size limits, no attachment failures, no asking them to download.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="monitorPlay" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Watch in the Browser, No Download</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Recipients don’t need to download the video or create an account. They click the link, watch in full
                  quality, and leave frame-accurate comments. Feedback stays tied to the right version in your project.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="shield" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Secure Links, You Stay in Control</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  You control who can view and comment. Update or revoke access anytime. No raw files floating in email
                  or chat—one source of truth, with version history and approvals in one place.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="chat" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Frame-Accurate Comments & Approvals</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  When you send large video files via Kreatli, feedback isn’t scattered in email. Comments are pinned to
                  exact timestamps, and approvals are tracked per version. Editors see everything in one workflow.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="group" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Built for Client Review</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Sending large videos for approval is the core use case. Clients get a simple link, watch, and respond.
                  You get a clear record of who approved what and when—without juggling attachments or separate tools.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="checkCircle" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">No Email Limits, No Workarounds</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Stop compressing videos to fit email or splitting files. Upload the full-quality version, send the
                  link, and let clients watch as intended. Large video files are handled by the platform—not your
                  inbox.
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
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Why Send Large Video Files via Link?</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Links avoid attachment limits, reduce friction for recipients, and keep feedback and approvals in one
              place.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="eye" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">No Size Limits</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Email and many messaging apps cap attachment size. When you send a link, the video lives on the
                  platform—recipients stream it. You can send full-resolution cuts without compressing or splitting.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="arrowRight" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Faster for Recipients</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  One click opens the video. No download wait, no “file too large” errors. Busy clients can watch and
                  comment in minutes instead of dealing with attachments or transfer links that expire.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="smile" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">One Place for All Feedback</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  When you send large video files through Kreatli, every comment and approval lives with that file and
                  version. No digging through email or chat to find who said what. Editors see the full picture in one
                  workflow.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="slides" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Fit Into Your Production Workflow</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Send large videos for review, track approvals, and upload new versions—all in the same project.
                  Kreatli keeps delivery and feedback part of production, not a one-off transfer.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Free Tools Section */}
      <MoreFreeToolsSection
        title="Free Tools for Video Teams"
        description="Explore our collection of free tools designed to help video and creative teams work more efficiently."
        useBannerResizerInsteadOfCostCalculator
      />

      {/* See How This Works Section */}
      <ResourcesArticlesPreviewSection
        articles={articles}
        title="See How This Works in Practice"
        description="Explore guides on sending large video files, sharing with clients, and choosing the right tools for review and approval."
      />

      <PricingSection />

      {/* FAQ Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Get detailed answers about sending large video files, email limits, and how Kreatli fits into your
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
              to learn how sending large video files with Kreatli can support your workflow.
            </p>
          </div>
        </div>
      </section>

      {/* More Resources Section */}
      <RelatedResourcesSection
        resources={getRelatedResources(['reviewApproval', 'videoAnnotation', 'secureAssetStorage']).map(
          (resource, index) => {
            if (index === 0) {
              return { ...resource, icon: 'paint' };
            }
            if (index === 1) {
              return { ...resource, icon: 'link' };
            }
            return resource;
          },
        )}
        title="More Resources"
        description="Explore more Kreatli features for video review, approval, and secure asset storage—so sending large videos fits into your full workflow."
      />

      {/* CTA Section */}
      <CTASection
        title="Ready to Send Large Video Files Without the Friction?"
        description="Use Kreatli to upload once, send a secure link, and let clients watch and comment in the browser—no download, no email limits."
      />
      <FooterSection hideCta={true} />
      <SignUpModal />
    </>
  );
}
