import { Accordion, AccordionItem, Button, Card, CardBody } from '@heroui/react';
import Head from 'next/head';
import NextLink from 'next/link';

import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';
import { ProjectFeaturePreview } from '../../components/home/Features/ProjectFeaturePreview';
import { StorageFeaturePreview } from '../../components/home/Features/StorageFeaturePreview';
import { FooterSection } from '../../components/home/Footer/FooterSection';
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
    question: 'What is video cloud storage in Kreatli?',
    answer:
      'Video cloud storage in Kreatli means your media library lives in a secure, production-ready workspace instead of generic folders. You upload full-quality video files to Kreatli, store them in the cloud with version history, and connect each file directly to review, approvals, and project context. Instead of juggling separate storage, review tools, and spreadsheets, your cloud storage becomes a single source of truth for files, feedback, and status.',
  },
  {
    question: 'How is Kreatli different from generic cloud storage for video?',
    answer:
      'Tools like Google Drive and Dropbox are designed for generic file backup, not production workflows. Kreatli is built specifically for video cloud storage and collaboration: every file opens in a frame-accurate review player, supports comments and drawings, and keeps versions and approvals in one place. You still get secure cloud storage, but with production features on top—version stacks, comparisons, guest review links, and project-based organization.',
  },
  {
    question: 'Is my video content secure in Kreatli cloud storage?',
    answer:
      'Yes. Kreatli uses encrypted storage and enterprise-grade infrastructure for video cloud storage. Files are encrypted at rest and in transit, and you control who can view, comment, or approve. You can revoke links, limit access to certain projects, and keep an audit trail of changes and approvals. This makes Kreatli suitable for agencies and production studios working with confidential client material.',
  },
  {
    question: 'Can I store large video files and 4K/8K content?',
    answer:
      'Kreatli is built for heavy media. You can store large video files, including 4K and 8K exports, without compressing your masters. Upload once to Kreatli video cloud storage, then reuse that asset across campaigns and review rounds. Real-time upload progress and version history make it practical to manage big files in everyday workflows.',
  },
  {
    question: 'Does Kreatli support version history for cloud-stored videos?',
    answer:
      'Yes. Every time you upload a new cut, Kreatli keeps it in a version stack tied to the same asset. You can switch versions, compare them side by side, and see which version was approved. This turns your video cloud storage into a living history of the project instead of a pile of vaguely named files.',
  },
  {
    question: 'Can clients access video cloud storage without creating an account?',
    answer:
      'Clients do not need direct access to your entire cloud storage; instead, you create secure review links to specific assets or projects. They open the video in their browser, watch in high quality, and leave frame-accurate feedback without signing up. You stay in control of what is visible while still giving clients a simple review experience.',
  },
];

export default function VideoCloudStoragePage() {
  useSession();
  const articles = getPlatformArticles('/platform/video-cloud-storage');

  return (
    <>
      <Head>
        <title>Video Cloud Storage | Kreatli</title>
        <meta
          name="description"
          content="Use Kreatli as your video cloud storage—securely store large video files with version history, access controls, and built-in frame-accurate review."
        />
        <link rel="canonical" href="https://kreatli.com/platform/video-cloud-storage" />
        <meta property="og:url" content="https://kreatli.com/platform/video-cloud-storage" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Video Cloud Storage | Kreatli" />
        <meta
          property="og:description"
          content="Store and organize your video library in Kreatli cloud storage with version history, secure sharing, and built-in review tools for production teams."
        />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:secure_url" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:alt" content="Video Cloud Storage | Kreatli" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Video Cloud Storage | Kreatli" />
        <meta
          name="twitter:description"
          content="Use Kreatli as your video cloud storage for secure, production-ready media management—organize, share, and review video in one place."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
      </Head>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Platform', url: '/platform' },
          { name: 'Video Cloud Storage', url: '/platform/video-cloud-storage' },
        ]}
      />
      <FAQStructuredData faqs={faqs} />
      <Header />
      <Decorations />

      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 text-center">
          <h1 className="mx-auto max-w-2xl font-sans text-3xl font-bold leading-tight sm:text-4xl sm:leading-tight">
            Video Cloud Storage Built for Production Teams
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-foreground-500">
            Store video in the cloud with version history, access controls, and frame-accurate review—so your entire
            library lives in one production-ready workspace instead of scattered drives and folders.
          </p>
          <div className="mt-4 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button as={NextLink} href="/sign-up" size="lg" className="bg-foreground text-content1">
              Start 7-day trial
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
      </section>

      {/* Secure Cloud Storage Preview Section */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Secure Video Cloud Storage</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Upload large video files to encrypted cloud storage designed for production work. Keep masters, work-in-progress
              cuts, and archives safe—but always accessible to the right people.
            </p>
          </div>
          <StorageFeaturePreview />
        </div>
      </section>

      {/* Project-Aware Cloud Storage Section */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">
              Cloud Storage That Knows Your Projects
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Instead of generic folders, Kreatli organizes video cloud storage around projects, status, and deliverables—so
              files, feedback, and approvals always stay in sync.
            </p>
          </div>
          <ProjectFeaturePreview />
        </div>
      </section>

      {/* Video Cloud Storage Features Grid */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Video Cloud Storage Features</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Everything you expect from cloud storage—plus production workflows for video teams.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="shield" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Encrypted Cloud Storage</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Store video in encrypted cloud storage with enterprise-grade security. Files are protected at rest and in
                  transit so you can safely host client work and internal projects.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="upload" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Large File Support</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Upload and store full-quality 4K/8K exports and heavy project files without worrying about email limits or
                  expiring transfer links. Your cloud storage is built for real production sizes.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="time" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Version History for Every File</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Keep every cut in a version stack tied to the same asset. Switch versions, compare changes, and know
                  exactly which export was approved—without digging through folders.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="eyeCrossed" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Granular Access Controls</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Decide who can view, comment, or approve each video. Separate internal-only content from client-facing
                  work while keeping everything in one cloud library.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="monitorPlay" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Built-In Review on Stored Video</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Every file you store opens in a frame-accurate review player. Collect comments, drawings, and approvals on
                  top of your cloud storage without exporting to other tools.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="link" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Secure Sharing Links</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Share stored videos with clients and partners through secure links instead of raw file access. Keep
                  control of your cloud storage while giving reviewers a fast, simple way to respond.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Free Tools Section */}
      <MoreFreeToolsSection
        title="Free Tools for Video Teams"
        description="Explore free tools that complement your video cloud storage—frame-accurate review, feedback, and data transfer planning."
        tools={getFreeToolsForPlatform('/platform/video-cloud-storage')}
      />

      {/* See How This Works Section */}
      <ResourcesArticlesPreviewSection
        articles={articles}
        title="See How Teams Use Video Cloud Storage in Practice"
        description="Explore guides and comparisons that show how creative teams move from generic cloud storage to production-ready video cloud storage in Kreatli."
      />

      {/* FAQ Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Learn how Kreatli handles video cloud storage, large files, and collaboration for production and post-production
              teams.
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
              to learn how video cloud storage in Kreatli can support your specific workflow.
            </p>
          </div>
        </div>
      </section>

      {/* More Resources Section */}
      <RelatedResourcesSection
        resources={getRelatedResources(['secureAssetStorage', 'creativeWorkspace', 'reviewApproval', 'videoAnnotation'])}
        title="More Resources"
        description="Explore other Kreatli platform features that complement video cloud storage—secure asset storage, production management, and frame-accurate review."
      />

      {/* CTA Section */}
      <CTASection
        title="Ready to Move Video to the Cloud?"
        description="Use Kreatli as your video cloud storage to keep files, feedback, and approvals in one secure, production-ready workspace."
      />
      <FooterSection hideCta={true} />
      <SignUpModal />
    </>
  );
}

