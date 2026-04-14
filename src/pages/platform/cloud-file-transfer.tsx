import { Accordion, AccordionItem, Button, Card, CardBody } from '@heroui/react';
import Head from 'next/head';
import NextLink from 'next/link';

import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';
import { ShareFeaturePreview } from '../../components/home/Features/ShareFeaturePreview';
import { FooterSection } from '../../components/home/Footer/FooterSection';
import { PlatformStepGuide, SEND_VIDEO_STEPS } from '../../components/shared/PlatformStepGuide';
import { PricingSection } from '../../components/home/PricingSection/PricingSection';
import { Header } from '../../components/layout/Header/Header';
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
    question: 'What is cloud file transfer in Kreatli?',
    answer:
      'Cloud file transfer in Kreatli means sending work through secure, cloud-hosted links instead of heavy attachments or one-off transfer tools. You upload files once to Kreatli, generate cloud transfer links, and recipients open them in the browser to review or download—without juggling ZIPs or expiring folders.',
  },
  {
    question: 'How is Kreatli cloud file transfer different from WeTransfer or generic drives?',
    answer:
      'Traditional transfer tools send files but lose context—feedback lives in email threads, versions are scattered, and links expire. Kreatli cloud file transfer keeps files, comments, drawings, and approvals tied together. Each transfer link opens a production-ready review experience and connects to project status and version history.',
  },
  {
    question: 'Can I use cloud file transfer for clients without making them sign up?',
    answer:
      'Yes. Cloud file transfer in Kreatli is designed for frictionless client review. You send a secure link; clients open it in their browser, view the work, and leave feedback without creating an account. You stay in control of whether they can comment, download, or only view.',
  },
  {
    question: 'Does Kreatli support large cloud file transfers for video?',
    answer:
      'Yes. Kreatli is built for heavy media. You can upload large video files and send cloud transfer links that stream in the browser. Recipients do not need to download full exports, and you do not need to compress or split files just to share them.',
  },
  {
    question: 'Can I reuse the same link when I upload a new version?',
    answer:
      'Yes. Because cloud file transfer in Kreatli is tied to hosted assets and version stacks, you can upload a new version and keep using the same transfer link. Reviewers always see the right version, while you can still inspect older cuts in the version history.',
  },
  {
    question: 'Can I track how long my cloud file transfer will take?',
    answer:
      'You can use Kreatli’s workflows alongside tools like the Data Transfer Calculator to estimate upload and download times for large files. Once uploaded, cloud file transfers become fast, lightweight links instead of repeated uploads.',
  },
];

export default function CloudFileTransferPage() {
  useSession();
  const articles = getPlatformArticles('/platform/cloud-file-transfer');

  return (
    <>
      <Head>
        <title>Cloud File Transfer | Kreatli</title>
        <meta
          name="description"
          content="Use Kreatli for cloud file transfer—send secure links for large creative files and keep feedback, versions, and approvals tied to every transfer."
        />
        <link rel="canonical" href="https://kreatli.com/platform/cloud-file-transfer" />
        <meta property="og:url" content="https://kreatli.com/platform/cloud-file-transfer" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Cloud File Transfer | Kreatli" />
        <meta
          property="og:description"
          content="Replace one-off transfer tools and attachments with cloud file transfer links from Kreatli—secure, trackable, and built for creative review."
        />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:secure_url" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:alt" content="Cloud File Transfer | Kreatli" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Cloud File Transfer | Kreatli" />
        <meta
          name="twitter:description"
          content="Use Kreatli cloud file transfer to send secure links for large creative files—organize, share, and review in one production-ready workspace."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
      </Head>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Platform', url: '/platform' },
          { name: 'Cloud File Transfer', url: '/platform/cloud-file-transfer' },
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
              Cloud File Transfer for Creative Teams
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground-500">
              Send cloud file transfer links instead of attachments or ad-hoc drives. Let clients and teammates review
              work in the browser while you keep control over versions and approvals.
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
          <ShareFeaturePreview />
        </div>
      </section>

      {/* How Cloud File Transfer Works in Kreatli (step-by-step) */}
      <PlatformStepGuide
        stepsSectionTitle="How Cloud File Transfer Works in Kreatli"
        stepsIntro="Follow these steps to upload your file once, generate a cloud transfer link, and collect feedback and approvals in one place."
        steps={SEND_VIDEO_STEPS}
        completeGuide={{
          href: '/guides/how-to-send-video-via-email',
          description:
            'Learn how to move from email attachments and transfer tools to cloud file transfer links that are built for creative review.',
        }}
      />

      {/* Cloud File Transfer Benefits Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">
              Why Use Cloud File Transfer Instead of Sending Files Directly
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Cloud file transfer links keep your work easier to access, faster to review, and safer to manage than sending
              raw files via email or unmanaged shares.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="upload" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Upload Once, Transfer Often</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Upload large creative files once and generate as many cloud transfer links as you need—without re-uploading
                  the same export for every client or review round.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="chat" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Feedback Attached to Every Transfer</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Each cloud file transfer link opens a review view where comments, drawings, and approvals stay attached to
                  the exact version you sent—so nothing gets lost in email threads.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="shield" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Safer, Trackable Transfers</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Manage who can view, download, or comment on each transfer. Revoke or update access as projects evolve
                  instead of losing control over shared files.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Free Tools Section */}
      <MoreFreeToolsSection
        title="Free Tools for Cloud File Transfer"
        description="Explore free tools that complement cloud file transfer—video feedback, review, management, and transfer time estimates."
        tools={getFreeToolsForPlatform('/platform/cloud-file-transfer')}
      />

      {/* See How This Works Section */}
      <ResourcesArticlesPreviewSection
        articles={articles}
        title="See How Teams Use Cloud File Transfer in Practice"
        description="Explore guides and comparisons that show how creative teams move from attachments and transfer tools to cloud file transfer links powered by Kreatli."
      />

      <PricingSection />

      {/* FAQ Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Get detailed answers about cloud file transfer in Kreatli and how it fits into your production and
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
              to learn how cloud file transfer in Kreatli can support your specific workflow.
            </p>
          </div>
        </div>
      </section>

      {/* More Resources Section */}
      <RelatedResourcesSection
        resources={getRelatedResources(['secureAssetStorage', 'creativeWorkspace', 'reviewApproval'])}
        title="More Resources"
        description="Explore other Kreatli platform features that complement cloud file transfer—secure storage, production management, and frame-accurate review."
      />

      {/* CTA Section */}
      <CTASection
        title="Ready to Switch to Cloud File Transfer?"
        description="Use Kreatli to replace one-off transfer tools and attachments with secure, trackable cloud file transfer links built for creative teams."
      />
      <FooterSection hideCta={true} />
      <SignUpModal />
    </>
  );
}

