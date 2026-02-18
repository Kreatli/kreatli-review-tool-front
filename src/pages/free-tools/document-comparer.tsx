/* eslint-disable max-len */
import { Accordion, AccordionItem } from '@heroui/react';
import Head from 'next/head';

import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';
import { CompareFeaturePreview } from '../../components/home/Features/CompareFeaturePreview';
import { FooterSection } from '../../components/home/Footer/FooterSection';
import { Header } from '../../components/layout/Header';
import { Decorations } from '../../components/layout/Storyblok/Decorations';
import { BreadcrumbStructuredData } from '../../components/shared/BreadcrumbStructuredData';
import { CTASection } from '../../components/shared/CTASection';
import { FAQStructuredData } from '../../components/shared/FAQStructuredData';
import { MoreFreeToolsSection } from '../../components/shared/MoreFreeToolsSection';
import {
  COMPARE_DOCUMENTS_ONLINE_STEPS,
  PlatformStepGuide,
} from '../../components/shared/PlatformStepGuide';
import { RelatedResourcesSection } from '../../components/shared/RelatedResourcesSection';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';

const faqs = [
  {
    question: 'What does it mean to compare documents?',
    answer:
      'Comparing documents means viewing two document versions side by side in your browser to spot changes in text, layout, or images—for example, a contract draft vs. a revised version, or a deck before and after edits. In Kreatli, you can upload PDFs and other documents to a project and review them together with comments and annotations, so your team can see exactly what changed and give precise feedback in one place.',
  },
  {
    question: 'How do I compare two documents in Kreatli?',
    answer:
      'Upload both document versions (e.g. PDFs) to a Kreatli project and open them in the review interface. You can switch between them or view them in the same project so reviewers can reference both versions. Add comments and annotations on either file, pinning feedback to the exact page and location. All feedback stays in one thread so nothing gets lost between versions.',
  },
  {
    question: 'Can I compare documents with different page counts?',
    answer:
      "Yes. Kreatli supports reviewing documents (including PDFs) of any length. When comparing versions with different page counts, you can annotate each file by page. Comments are tied to the specific document and page, so it's clear which version and which spot each piece of feedback refers to. Use the project to keep both versions visible to the team.",
  },
  {
    question: 'Why compare documents in Kreatli instead of a standalone diff tool?',
    answer:
      'Comparing documents in Kreatli keeps review in one place with your video, images, and other deliverables. You get a single project, one set of review links for clients, and one approval workflow. Reviewers can add comments and markup on either version, and all feedback is tracked in one thread—no juggling between a diff tool and a separate review app.',
  },
  {
    question: 'Can clients compare document versions without creating an account?',
    answer:
      'Yes. Send your client a secure Kreatli review link that includes both documents. They can open the project, switch between versions, add comments and markup on either file, and submit feedback without signing up. All comparisons and feedback stay in one place for your team.',
  },
  {
    question: 'How does comparing documents help creative and legal workflows?',
    answer:
      'Comparing documents helps you catch changes between contract drafts, design revisions, decks, and layouts. When feedback is pinned to the exact page and spot, writers and designers know precisely what changed and what to fix. Keeping both versions in one Kreatli project with resolution tracking speeds up approvals and reduces revision cycles.',
  },
];

export default function DocumentComparerPage() {
  useSession();

  return (
    <>
      <Head>
        <title>Document Comparer - Free Online Tool | Kreatli</title>
        <meta
          name="description"
          content="Free online document comparer for creative teams. Compare two document versions (e.g. PDFs) side by side with comments and annotations. Share with clients—no sign-up required."
        />
        <meta
          name="keywords"
          content="document comparer, compare documents online, compare two documents, document comparison tool, document diff, compare PDF versions, document review, document collaboration"
        />
        <meta property="og:title" content="Document Comparer - Free Online Tool | Kreatli" />
        <meta
          property="og:description"
          content="Free online document comparer for creative teams. Compare two document versions (e.g. PDFs) side by side with comments and annotations. Share with clients—no sign-up required."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kreatli.com/free-tools/document-comparer" />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Document Comparer - Free Online Tool | Kreatli" />
        <meta
          name="twitter:description"
          content="Free online document comparer for creative teams. Compare two document versions (e.g. PDFs) side by side with comments and annotations. Share with clients—no sign-up required."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
        <link rel="canonical" href="https://kreatli.com/free-tools/document-comparer" />
      </Head>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Free Tools', url: '/free-tools' },
          { name: 'Document Comparer', url: '/free-tools/document-comparer' },
        ]}
      />
      <FAQStructuredData faqs={faqs} />
      <Header />
      <Decorations />

      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        Skip to main content
      </a>

      <main id="main-content">
        {/* Hero with Compare Feature Preview */}
        <section className="relative overflow-hidden px-6 py-16">
          <div className="relative z-10 mx-auto max-w-6xl">
            <div className="mb-8 text-center">
              <h1 className="mx-auto max-w-lg font-sans text-3xl font-bold leading-tight sm:text-4xl sm:leading-tight">
                Document Comparer
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground-500">
                Compare two document versions (e.g. PDFs, decks, contracts) side by side with comments and
                annotations—perfect for drafts, revisions, and client approvals. No software installation required for
                reviewers.
              </p>
            </div>
            <CompareFeaturePreview variant="pdf" />
          </div>
        </section>

        {/* How to compare documents guide */}
        <PlatformStepGuide
          stepsSectionTitle="How to compare documents online in Kreatli"
          stepsIntro="Follow these steps to upload both document versions, open them in the review interface, use Compare, and share feedback—all in one place."
          steps={COMPARE_DOCUMENTS_ONLINE_STEPS}
          completeGuide={{
            href: '/guides/what-is-proofing-software',
            description:
              'Learn how proofing and creative review work in one place with your video, documents, and other assets.',
          }}
        />

        {/* Related tools */}
        <MoreFreeToolsSection excludeHref="/free-tools/document-comparer" title="More Tools for Creative Teams" />

        {/* FAQ Section */}
        <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
          <div className="relative z-10 mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
              <p className="mx-auto max-w-2xl text-lg text-foreground-500">
                Get detailed answers about comparing documents and review workflows in Kreatli.
              </p>
            </div>
            <Accordion variant="splitted" aria-label="Document comparer FAQs" className="gap-2">
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
          </div>
        </section>

        {/* Related resources */}
        <RelatedResourcesSection
          resources={getRelatedResources(['annotatePdf', 'drawOnPdfDocument', 'addCommentsToPdf', 'clientApprovals'])}
          title="More Resources"
          description="Explore other Kreatli platform features for comparing documents, annotation, and collaboration."
        />

        {/* CTA Section */}
        <CTASection
          title="Ready to compare documents with your team?"
          description="Kreatli lets you compare document versions side by side with comments and approval workflows. Keep all feedback in one place with your creative assets."
          primaryButtonText="Start for Free"
        />
      </main>

      <FooterSection hideCta />
      <SignUpModal />
    </>
  );
}
