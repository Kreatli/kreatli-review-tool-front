import { Accordion, AccordionItem, Button, Card, CardBody } from '@heroui/react';
import Head from 'next/head';
import NextLink from 'next/link';

import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';
import { CompareFeaturePreview } from '../../components/home/Features/CompareFeaturePreview';
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
    question: 'What does it mean to compare PDF files?',
    answer:
      'Comparing PDF files means viewing two PDF versions side by side (or in a diff view) to spot changes in text, layout, or images—for example, a draft vs. a revised version or a before-and-after proof. In Kreatli, you can upload multiple PDFs to a project and review them together with comments and annotations, so your team can see exactly what changed and give precise feedback in one place.',
  },
  {
    question: 'How do I compare two PDFs in Kreatli?',
    answer:
      'Upload both PDFs to a Kreatli project and open them in the review interface. You can switch between them or view them in the same project so reviewers can reference both versions. Add comments and annotations on either PDF, pinning feedback to the exact page and location. All feedback stays in one thread so nothing gets lost between versions.',
  },
  {
    question: 'Can I compare PDFs with different page counts?',
    answer:
      'Yes. Kreatli supports reviewing PDFs of any length. When comparing versions with different page counts, you can annotate each file by page. Comments are tied to the specific PDF and page, so it’s clear which version and which spot each piece of feedback refers to. Use the project to keep both versions visible to the team.',
  },
  {
    question: 'Why compare PDFs in Kreatli instead of a standalone diff tool?',
    answer:
      'Comparing PDFs in Kreatli keeps review in one place with your video, images, and other deliverables. You get a single project, one set of review links for clients, and one approval workflow. Reviewers can add comments and markup on either version, and all feedback is tracked in one thread—no juggling between a diff tool and a separate review app.',
  },
  {
    question: 'Can clients compare PDF versions without creating an account?',
    answer:
      'Yes. Send your client a secure Kreatli review link that includes both PDFs. They can open the project, switch between versions, add comments and markup on either file, and submit feedback without signing up. All comparisons and feedback stay in one place for your team.',
  },
  {
    question: 'How does comparing PDFs help creative and legal workflows?',
    answer:
      'Comparing PDFs helps you catch changes between contract drafts, design revisions, or document versions. When feedback is pinned to the exact page and spot, writers and designers know precisely what changed and what to fix. Keeping both versions in one Kreatli project with resolution tracking speeds up approvals and reduces revision cycles for decks, contracts, and layouts.',
  },
];

export default function ComparePdfFilesPage() {
  useSession();
  const articles = getPlatformArticles('/platform/compare-pdf-files');

  return (
    <>
      <Head>
        <title>Compare PDF Files | Kreatli</title>
        <meta
          name="description"
          content="Compare PDF files side by side. Review two PDF versions in one place with comments and annotations. Perfect for drafts, revisions, and approvals."
        />
        <link rel="canonical" href="https://kreatli.com/platform/compare-pdf-files" />
        <meta property="og:url" content="https://kreatli.com/platform/compare-pdf-files" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Compare PDF Files | Kreatli" />
        <meta
          property="og:description"
          content="Compare PDF files side by side. Review two PDF versions in one place with comments and annotations."
        />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:secure_url" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:alt" content="Compare PDF Files | Kreatli" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Compare PDF Files | Kreatli" />
        <meta
          name="twitter:description"
          content="Compare PDF files side by side. Review two PDF versions in one place with comments and annotations."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
      </Head>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Platform', url: '/platform' },
          { name: 'Compare PDF Files', url: '/platform/compare-pdf-files' },
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
              Compare PDF Files
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground-500">
              Compare PDF files side by side. Review two PDF versions in one place with comments and annotations—perfect
              for drafts, revisions, and client approvals.
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
          <CompareFeaturePreview variant="pdf" />
        </div>
      </section>

      {/* Feature Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Compare PDFs – Built for Review Teams</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Upload two or more PDF versions to one project. Review them together, add comments on either file, and
              keep all feedback in one place.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="compare" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Two Versions in One Project</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Upload draft and revised PDFs (or any two versions) to a single Kreatli project. Switch between them
                  easily so reviewers can see both and point out exactly what changed.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="chat" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Comments on Either PDF</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Pin comments and annotations to the exact page and spot on either PDF. Every piece of feedback is tied
                  to the right version and location so there’s no confusion about what to change.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="filePdf" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Any Length, Any Number of Pages</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Compare PDFs with different page counts. Annotations are linked to the specific file and page, so
                  reviewers can reference both versions clearly.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="checkCircle" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Resolution Tracking</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Mark comments as resolved or unresolved. Track which feedback has been addressed across both PDFs and
                  keep rounds organized.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="group" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Share With Clients</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Send a single review link so clients can open both PDFs, compare versions, and add comments without
                  creating an account. All feedback stays in one thread.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="slides" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">PDFs With Video and Other Assets</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Compare PDFs in the same project as your video, images, and other deliverables. One workflow for
                  creative review, contracts, and approvals.
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
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Why Compare PDFs in Kreatli</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Keep both versions and all feedback in one place so your team and clients stay aligned and revisions move
              faster.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="eye" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">See What Changed</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Having both PDFs in one project makes it easy to reference draft vs. revised. Comments point to the
                  exact page and spot so there’s no guesswork about what to update.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="arrowRight" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Fewer Revision Rounds</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  When feedback is pinned to the right version and location, writers and designers can act on it
                  immediately. Resolution tracking ensures nothing gets missed between versions.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="group" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">One Place for PDFs and Video</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Compare PDFs alongside video and other assets in the same project. One review link, one approval
                  workflow, less tool-switching.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="smile" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Client-Friendly Comparison</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Clients can compare PDF versions and add comments via no-signup guest links. They don’t need an
                  account, so approvals move faster and feedback stays in one thread.
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
        useBannerResizerInsteadOfCostCalculator
      />

      {/* See How This Works Section */}
      <ResourcesArticlesPreviewSection
        articles={articles}
        title="See How This Works in Practice"
        description="Explore guides and workflows for comparing PDFs, annotating documents, and managing review in Kreatli."
      />

      <PricingSection />

      {/* FAQ Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Get detailed answers about comparing PDF files and review workflows in Kreatli.
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
              to learn how Kreatli can help you compare PDFs and streamline your review workflow.
            </p>
          </div>
        </div>
      </section>

      {/* More Resources Section */}
      <RelatedResourcesSection
        resources={getRelatedResources(['reviewApproval', 'creativeProofing', 'videoAnnotation'])}
        title="More Resources"
        description="Explore other Kreatli platform features to streamline your review and collaboration workflow."
      />

      {/* CTA Section */}
      <CTASection
        title="Ready to Compare PDF Files in One Place?"
        description="Upload two PDF versions, add comments and annotations on either file, and keep all feedback in one project. Start using Kreatli today."
      />
      <FooterSection hideCta={true} />
      <SignUpModal />
    </>
  );
}
