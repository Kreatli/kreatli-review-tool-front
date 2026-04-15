import { Accordion, AccordionItem, Button, Card, CardBody } from '@heroui/react';
import Head from 'next/head';
import NextLink from 'next/link';

import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';
import { ShareFeaturePreview } from '../../components/home/Features/ShareFeaturePreview';
import { FooterSection } from '../../components/home/Footer/FooterSection';
import { PlatformStepGuide, SHARE_VIDEO_STEPS } from '../../components/shared/PlatformStepGuide';
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
import { PlatformDefinitionBlock } from '../../components/shared/PlatformDefinitionBlock';

const faqs = [
  {
    question: 'What is cloud sharing in Kreatli?',
    answer:
      'Cloud sharing in Kreatli means sharing work through secure, cloud-hosted links instead of attachments or unmanaged folders. You upload files once to Kreatli, generate share links, and reviewers open them in the browser to watch, view, or comment—without downloading or creating accounts.',
  },
  {
    question: 'How is Kreatli cloud sharing different from sending files via email or generic cloud drives?',
    answer:
      'With email and generic cloud drives, files and feedback are split across threads, folders, and tools. Kreatli cloud sharing keeps files, comments, drawings, and approvals together. Each cloud share link opens a production-ready review experience—frame-accurate for video, and page- / spot-based for documents and images—so you always know which version people saw and what they said.',
  },
  {
    question: 'Can I use cloud sharing in Kreatli for clients without making them sign up?',
    answer:
      'Yes. Cloud sharing in Kreatli is designed for frictionless client review. You send a secure link; clients open it in their browser, review in full quality, and leave feedback without creating an account. You stay in control of what they can see and whether they can comment or approve.',
  },
  {
    question: 'Is cloud sharing in Kreatli secure?',
    answer:
      'Yes. Kreatli uses encrypted storage and secure, access-controlled share links. You can restrict who has access, revoke or update links, and keep an audit trail of views and approvals—giving you more security than unmanaged file sharing or one-off transfers.',
  },
  {
    question: 'Can I update a file without changing the cloud share link?',
    answer:
      'Yes. Because cloud sharing in Kreatli is tied to hosted assets and version history, you can upload a new version of a file and keep using the same review link. Reviewers see the latest approved version, while you can still reference earlier cuts in the version stack.',
  },
  {
    question: 'Does cloud sharing in Kreatli support large video files?',
    answer:
      'Yes. Kreatli is built for heavy media. You can upload large video files, generate a cloud share link, and let reviewers stream the content in their browser. They do not need to download the full file, and you do not need to compress or split exports just to share them.',
  },
];

export default function CloudSharingPage() {
  useSession();
  const articles = getPlatformArticles('/platform/cloud-sharing');

  return (
    <>
      <Head>
        <title>Cloud Sharing | Kreatli</title>
        <meta
          name="description"
          content="Use Kreatli for cloud sharing—send secure review links instead of attachments, and keep feedback, versions, and approvals tied to your files."
        />
        <link rel="canonical" href="https://kreatli.com/platform/cloud-sharing" />
        <meta property="og:url" content="https://kreatli.com/platform/cloud-sharing" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Cloud Sharing | Kreatli" />
        <meta
          property="og:description"
          content="Replace email attachments and one-off transfers with cloud sharing links from Kreatli—secure, trackable, and built for creative review."
        />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:secure_url" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:alt" content="Cloud Sharing | Kreatli" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Cloud Sharing | Kreatli" />
        <meta
          name="twitter:description"
          content="Use Kreatli cloud sharing to send secure review links, collect feedback, and track approvals—without sending heavy attachments."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
      </Head>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Platform', url: '/platform' },
          { name: 'Cloud Sharing', url: '/platform/cloud-sharing' },
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
              Cloud Sharing for Creative Work in Seconds
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground-500">
              Use cloud sharing links instead of attachments or unmanaged folders. Let clients and teammates review work in
              the browser while you keep control over files, feedback, and approvals.
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


      <PlatformDefinitionBlock href="/platform/cloud-sharing" />
      {/* How Cloud Sharing Works in Kreatli (step-by-step) */}
      <PlatformStepGuide
        stepsSectionTitle="How Cloud Sharing Works in Kreatli"
        stepsIntro="Follow these steps to upload files, create cloud sharing links, and collect feedback and approvals in one place."
        steps={SHARE_VIDEO_STEPS}
        completeGuide={{
          href: '/guides/how-to-send-video-via-email',
          description:
            'Learn how to move from email attachments and transfer tools to cloud sharing links that are built for creative review.',
        }}
      />

      {/* Cloud Sharing Benefits Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Why Use Cloud Sharing Instead of Attachments</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Cloud sharing links keep your work easier to access, faster to review, and safer to manage than sending files
              around by email or ad-hoc drives.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="upload" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">No Heavy Attachments</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Upload files once and send lightweight cloud sharing links instead of 10GB attachments. Reviewers open work
                  instantly without downloading full exports.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="chat" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Feedback Tied to Files</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Every cloud sharing link opens a review view where comments, drawings, and approvals stay attached to the
                  exact version of the file—no more lost threads.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="shield" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Safer Than Ad-Hoc Links</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Manage access and revoke or update links from one place. Cloud sharing in Kreatli lets you control who can
                  view or comment without exposing entire folders.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Free Tools Section */}
      <MoreFreeToolsSection
        title="Free Tools for Sharing Work"
        description="Explore free tools that complement cloud sharing—video feedback, review, and transfer planning."
        tools={getFreeToolsForPlatform('/platform/cloud-sharing')}
      />

      {/* See How This Works Section */}
      <ResourcesArticlesPreviewSection
        articles={articles}
        title="See How Teams Use Cloud Sharing in Practice"
        description="Explore guides and comparisons that show how creative teams move from attachments and drives to cloud sharing links powered by Kreatli."
      />

      <PricingSection />

      {/* FAQ Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Get detailed answers about cloud sharing in Kreatli and how it fits into your review and approval workflows.
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
              to learn how cloud sharing in Kreatli can support your specific workflow.
            </p>
          </div>
        </div>
      </section>

      {/* More Resources Section */}
      <RelatedResourcesSection
        resources={getRelatedResources(['secureAssetStorage', 'creativeWorkspace', 'reviewApproval'])}
        title="More Resources"
        description="Explore other Kreatli platform features that complement cloud sharing—secure storage, production management, and frame-accurate review."
      />

      {/* CTA Section */}
      <CTASection
        title="Ready to Switch to Cloud Sharing?"
        description="Use Kreatli to replace attachments and unmanaged file transfers with secure cloud sharing links built for creative review."
      />
      <FooterSection hideCta={true} />
      <SignUpModal />
    </>
  );
}

