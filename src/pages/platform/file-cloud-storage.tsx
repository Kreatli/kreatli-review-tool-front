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
import { PlatformDefinitionBlock } from '../../components/shared/PlatformDefinitionBlock';

const faqs = [
  {
    question: 'What is file cloud storage in Kreatli?',
    answer:
      'File cloud storage in Kreatli means your creative files—video, images, decks, PDFs, and more—live in a secure, production-ready workspace instead of generic folders. You upload files to Kreatli, store them in the cloud with version history, and connect each asset directly to review, approvals, and project context.',
  },
  {
    question: 'How is Kreatli different from generic file cloud storage?',
    answer:
      'Generic file cloud storage tools are built for backup and simple sharing. Kreatli is built for creative production: every stored file can be reviewed with comments and markup, tied to specific projects, and tracked through approvals. You still get secure file cloud storage, but with production workflows on top—version stacks, comparisons, guest review links, and status-aware organization.',
  },
  {
    question: 'What types of files can I store in Kreatli?',
    answer:
      'Kreatli supports the core file types used in creative production: video files, images, PDFs, decks, and other common document formats. You can store large media alongside supporting docs so creative, production, and client-facing assets stay in one place.',
  },
  {
    question: 'Is my stored content secure?',
    answer:
      'Yes. Kreatli uses encrypted cloud storage and enterprise-grade infrastructure. Files are encrypted at rest and in transit, and you can control who can view, comment, approve, or download. This makes Kreatli suitable for agencies and in-house teams working with confidential client materials.',
  },
  {
    question: 'Does Kreatli support version history for files?',
    answer:
      'Yes. When you upload a new version of a file, Kreatli keeps it in a version stack tied to the same asset. You can switch versions, compare them side by side (for many file types), and see which version was approved—turning your file cloud storage into a clear record of the project.',
  },
  {
    question: 'Can clients access files without full access to my cloud storage?',
    answer:
      'Clients do not need direct access to your entire file cloud storage. Instead, you create secure review links to specific assets or projects. They open the file in their browser, review it, and leave feedback without signing up, while you stay in full control of what is visible.',
  },
];

export default function FileCloudStoragePage() {
  useSession();
  const articles = getPlatformArticles('/platform/file-cloud-storage');

  return (
    <>
      <Head>
        <title>File Cloud Storage | Kreatli</title>
        <meta
          name="description"
          content="Use Kreatli as your file cloud storage—securely store creative files with version history, access controls, and built-in review for video, images, and documents."
        />
        <link rel="canonical" href="https://kreatli.com/platform/file-cloud-storage" />
        <meta property="og:url" content="https://kreatli.com/platform/file-cloud-storage" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="File Cloud Storage | Kreatli" />
        <meta
          property="og:description"
          content="Store and organize all your creative files in Kreatli file cloud storage with version history, secure sharing, and built-in review tools."
        />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:secure_url" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:alt" content="File Cloud Storage | Kreatli" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="File Cloud Storage | Kreatli" />
        <meta
          name="twitter:description"
          content="Use Kreatli as your file cloud storage for secure, production-ready management of video, images, PDFs, and decks—organize, share, and review in one place."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
      </Head>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Platform', url: '/platform' },
          { name: 'File Cloud Storage', url: '/platform/file-cloud-storage' },
        ]}
      />
      <FAQStructuredData faqs={faqs} />
      <Header />
      <Decorations />

      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 text-center">
          <h1 className="mx-auto max-w-2xl font-sans text-3xl font-bold leading-tight sm:text-4xl sm:leading-tight">
            File Cloud Storage for Creative Teams
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-foreground-500">
            Store video, images, PDFs, and decks in one secure file cloud storage workspace—with version history, access
            controls, and built-in review tools tailored to creative production.
          </p>
          <div className="mt-4 flex flex-col items-center justify-center gap-4 sm:flex-row">
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
      </section>


      <PlatformDefinitionBlock href="/platform/file-cloud-storage" />
      {/* Secure File Cloud Storage Preview Section */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Secure File Cloud Storage</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Upload large creative files to encrypted cloud storage designed for production work. Keep masters, working
              files, and client-ready exports safe—but always accessible to the right people.
            </p>
          </div>
          <StorageFeaturePreview />
        </div>
      </section>

      {/* Project-Aware File Storage Section */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">
              File Cloud Storage That Knows Your Projects
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Instead of generic folders, Kreatli organizes file cloud storage around projects, status, and deliverables—so
              files, feedback, and approvals stay connected across media types.
            </p>
          </div>
          <ProjectFeaturePreview />
        </div>
      </section>

      {/* File Cloud Storage Features Grid */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">File Cloud Storage Features</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Everything you expect from file cloud storage—plus creative production workflows for modern teams.
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
                  Store creative files in encrypted cloud storage with enterprise-grade security. Protect client work and
                  internal assets without sacrificing speed or accessibility.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="folder" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Smart Organization Across File Types</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Organize video, images, PDFs, and decks by project, status, and tags. Filter quickly to find anything in
                  your file cloud storage without digging through disconnected drives.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="time" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Version History for Every Asset</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Keep every revision of a file in a clear version stack. Switch versions, compare changes, and know exactly
                  which export or document was approved.
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
                  Decide who can view, comment, or approve each asset. Separate internal-only files from client-facing
                  deliverables while keeping everything in one cloud workspace.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="paint" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Built-In Review on Stored Files</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Open stored assets in a review experience tailored to the file type—frame-accurate for video, page- and
                  spot-based for PDFs and images—without exporting to extra tools.
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
                  Share stored files through secure links instead of raw folder access. Give reviewers a simple way to see
                  work and respond while keeping your file cloud storage under control.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Free Tools Section */}
      <MoreFreeToolsSection
        title="Free Tools for Creative Teams"
        description="Explore free tools that complement your file cloud storage—reviewers, annotators, and data transfer planning."
        tools={getFreeToolsForPlatform('/platform/file-cloud-storage')}
      />

      {/* See How This Works Section */}
      <ResourcesArticlesPreviewSection
        articles={articles}
        title="See How Teams Use File Cloud Storage in Practice"
        description="Explore guides and comparisons that show how creative teams move from generic file cloud storage to production-ready workflows in Kreatli."
      />

      {/* FAQ Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Learn how Kreatli handles file cloud storage, large creative assets, and collaboration for production teams.
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
              to learn how file cloud storage in Kreatli can support your specific workflow.
            </p>
          </div>
        </div>
      </section>

      {/* More Resources Section */}
      <RelatedResourcesSection
        resources={getRelatedResources(['secureAssetStorage', 'creativeWorkspace', 'projectOrchestration'])}
        title="More Resources"
        description="Explore other Kreatli platform features that complement file cloud storage—secure asset storage, production management, and frame-accurate review."
      />

      {/* CTA Section */}
      <CTASection
        title="Ready to Upgrade Your File Cloud Storage?"
        description="Use Kreatli as your file cloud storage to keep assets, feedback, and approvals in one secure, production-ready workspace."
      />
      <FooterSection hideCta={true} />
      <SignUpModal />
    </>
  );
}

