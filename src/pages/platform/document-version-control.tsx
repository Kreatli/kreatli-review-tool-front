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
import {
  DOCUMENT_VERSION_CONTROL_STEPS,
  PlatformStepGuide,
} from '../../components/shared/PlatformStepGuide';
import { MoreFreeToolsSection } from '../../components/shared/MoreFreeToolsSection';
import { VersioningFeaturePreview } from '../../components/shared/VersioningFeaturePreview';
import { RelatedResourcesSection } from '../../components/shared/RelatedResourcesSection';
import { ResourcesArticlesPreviewSection } from '../../components/shared/ResourcesArticlesPreviewSection';
import { Icon } from '../../components/various/Icon';
import { getPlatformArticles } from '../../data/platform-articles';
import { getFreeToolsForPlatform } from '../../data/platform-free-tools';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';

const faqs = [
  {
    question: 'What is document version control?',
    answer:
      'Document version control is keeping a history of your document drafts and revisions—PDFs, decks, contracts, and more—so you can track changes, compare versions side by side, and always know which version is current. In Kreatli, document version control is built in: every upload can be stored as a new version of the same file, and you can compare any two versions side by side. Comments and feedback stay tied to the right version, so nothing gets lost as you move from draft to final.',
  },
  {
    question: 'How do I manage document version control in Kreatli?',
    answer:
      "Upload your first document to a Kreatli project. When you have a revised draft, open the file menu (⋯) on that asset and choose Upload new version. The new file appears in the same project with full version history. You can compare two document versions side by side by selecting both in the Media view and clicking Compare. Document version control in Kreatli keeps every draft in one place so you and your clients always see the latest or compare past versions.",
  },
  {
    question: 'Can I compare two document versions side by side?',
    answer:
      "Yes. In Kreatli you select two document versions in the Media view and click Compare to open them side by side. The comments panel shows feedback on either version, and you can add comments and annotations pinned to the exact page and spot. Document version control with side-by-side comparison makes it easy to see what changed between drafts and track what's resolved.",
  },
  {
    question: 'Does document version control work with client review links?',
    answer:
      'Yes. When you share a review link, clients see the version you shared. When you upload a new version, you can share the same or a new link so they see the updated document. Document version control keeps approval and feedback tied to the right version, and you stay in control of who can view or comment on each draft.',
  },
  {
    question: 'How long is document version history kept?',
    answer:
      'Kreatli keeps version history for your documents so you can compare and revert as needed. All versions stay in the same project and are available for side-by-side comparison and review. Check your plan for storage limits; versioning is designed so you never lose track of which draft is which.',
  },
  {
    question: 'Can multiple people review different document versions?',
    answer:
      'Yes. You can share review links for specific versions, and reviewers can add comments and feedback on the version they see. When you upload a new version, you control who gets access. Document version control in Kreatli lets you track who approved which draft and keep feedback organized across revision rounds.',
  },
  {
    question: 'Why use document version control in Kreatli instead of folder renames or email?',
    answer:
      'Document version control in Kreatli keeps every draft in one place with the same asset, so you don\'t rely on "proposal_v2_final_FINAL.pdf" or email chains to track what changed. You compare versions side by side, feedback is tied to the right version, and uploading a new version is one click. That reduces confusion and speeds up review and approval.',
  },
  {
    question: 'How does document version control help creative and legal workflows?',
    answer:
      "Document version control streamlines workflows by giving you a clear history of drafts, side-by-side comparison, and feedback tied to each version. Writers, designers, and clients always know which draft they're looking at, and you can track approvals and resolution across rounds. That speeds up revisions for contracts, decks, and layouts and ensures nothing gets missed when moving from draft to final.",
  },
];

export default function DocumentVersionControlPage() {
  useSession();
  const articles = getPlatformArticles('/platform/document-version-control');

  return (
    <>
      <Head>
        <title>Document Version Control | Kreatli</title>
        <meta
          name="description"
          content="Document version control with version history and side-by-side comparison. Track and compare document versions in one place with your team."
        />
        <link rel="canonical" href="https://kreatli.com/platform/document-version-control" />
        <meta property="og:url" content="https://kreatli.com/platform/document-version-control" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Document Version Control | Kreatli" />
        <meta
          property="og:description"
          content="Document version control with version history and side-by-side comparison. Track and compare document versions in one place."
        />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:secure_url" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:alt" content="Document Version Control | Kreatli" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Document Version Control | Kreatli" />
        <meta
          name="twitter:description"
          content="Document version control with version history and side-by-side comparison. Track and compare document versions in one place."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
      </Head>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Platform', url: '/platform' },
          { name: 'Document Version Control', url: '/platform/document-version-control' },
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
              Document Version Control
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground-500">
              Document version control with version history and side-by-side comparison. Track and compare PDFs, decks,
              and other documents in one place with your team and creative assets.
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
            <VersioningFeaturePreview variant="pdf" />
          </div>
        </div>
      </section>

      <PlatformStepGuide
        stepsSectionTitle="How to use document version control in Kreatli"
        stepsIntro="Follow these steps to upload your first document, add new versions from the file menu, switch versions in the viewer, and compare two document versions side by side."
        steps={DOCUMENT_VERSION_CONTROL_STEPS}
        completeGuide={{
          href: '/guides/what-is-proofing-software',
          description:
            'Learn how proofing and creative review work in one place with your video, documents, and other assets.',
        }}
      />

      {/* How document version control works Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">How Document Version Control Works</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Version history, side-by-side comparison, and one-click uploads keep your document version control simple
              and traceable.
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
                  Every document you upload as a new version stays in the same project. Document version control keeps
                  a clear history so you always know which draft is current and can compare or revert as needed.
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
                  Select two document versions and compare them side by side. Spot changes and see feedback on either
                  version in one view.
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
                  One click from the file menu to upload a new version. The new draft appears in the same project so you
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
                  Comments and annotations stay linked to the version they were added on. Document version control in
                  Kreatli keeps feedback organized so you know what was addressed in which draft.
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
                  who gets access so everyone stays on the same draft.
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
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Why Use Document Version Control in Kreatli</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Document version control with version history and comparison keeps your drafts organized and your team
              aligned.
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
                  Stop relying on "proposal_v3_final_FINAL.pdf." Document version control keeps every draft under one
                  asset with clear history, so you always know which version is which.
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
                  Compare two document versions side by side. Spot text and layout differences and keep feedback tied to
                  the right version so revisions move faster.
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
                  Document version control in Kreatli keeps every draft in the same project with your video and other
                  assets. One review link workflow, one approval trail, less tool-switching.
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
                  Share the version you want clients to review. When you upload a new draft, you decide who sees it.
                  Document version control keeps approvals clear and feedback organized for every round.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Free Tools Section */}
      <MoreFreeToolsSection
        title="Free Tools for Creative Teams"
        description="Explore our collection of free tools designed to help creative and video professionals work more efficiently."
        tools={getFreeToolsForPlatform('/platform/document-version-control')}
      />

      {/* See How This Works Section */}
      <ResourcesArticlesPreviewSection
        articles={articles}
        title="See How This Works in Practice"
        description="Explore guides and comparisons that show how teams use document version control and manage review in Kreatli."
      />

      <PricingSection />

      {/* FAQ Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Get detailed answers about document version control and review workflows in Kreatli.
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
              to learn how Kreatli can help you with document version control and streamline your review workflow.
            </p>
          </div>
        </div>
      </section>

      {/* More Resources Section */}
      <RelatedResourcesSection
        resources={getRelatedResources([
          'reviewApproval',
          'creativeProofing',
          'annotatePdf',
          'secureAssetStorage',
        ])}
        title="More Resources"
        description="Explore other Kreatli platform features to streamline your review and collaboration workflow."
      />

      {/* CTA Section */}
      <CTASection
        title="Ready for Simple Document Version Control?"
        description="Document version control with version history and side-by-side comparison in one place with your team and clients. Start using Kreatli today."
      />
      <FooterSection hideCta={true} />
      <SignUpModal />
    </>
  );
}
