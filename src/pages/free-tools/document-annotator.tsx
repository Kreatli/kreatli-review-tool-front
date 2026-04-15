/* eslint-disable max-len */
import Head from 'next/head';

import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';
import { FooterSection } from '../../components/home/Footer/FooterSection';
import { Header } from '../../components/layout/Header';
import { Decorations } from '../../components/layout/Storyblok/Decorations';
import { BreadcrumbStructuredData } from '../../components/shared/BreadcrumbStructuredData';
import { CTASection } from '../../components/shared/CTASection';
import { DefinitionBlock } from '../../components/shared/DefinitionBlock';
import { FAQStructuredData } from '../../components/shared/FAQStructuredData';
import { FreeToolsEntitlementSection } from '../../components/shared/FreeToolsEntitlementSection';
import { HeroCtaButtons } from '../../components/shared/HeroCtaButtons';
import { InteractiveReviewToolPreview } from '../../components/shared/InteractiveReviewToolPreview';
import { MoreFreeToolsSection } from '../../components/shared/MoreFreeToolsSection';
import { RelatedResourcesSection } from '../../components/shared/RelatedResourcesSection';
import { PdfAnnotatorFAQ, pdfAnnotatorFaqs } from '../../components/pdf-annotator/PdfAnnotatorFAQ';
import { PdfAnnotatorGuide } from '../../components/pdf-annotator/PdfAnnotatorGuide';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';

export default function DocumentAnnotatorPage() {
  useSession();

  return (
    <>
      <Head>
        <title>Annotate Documents Online – Free Document Annotator | Kreatli</title>
        <meta
          name="description"
          content="Add pinned comments, highlights, drawings, and markup to documents. Share with clients for review. Try free with a 7-day trial."
        />
<meta property="og:title" content="Annotate Documents Online – Free Document Annotator | Kreatli" />
        <meta
          property="og:description"
          content="Add pinned comments, highlights, drawings, and markup to documents. Share with clients for review. Try free with a 7-day trial."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kreatli.com/free-tools/document-annotator" />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Annotate Documents Online – Free Document Annotator | Kreatli" />
        <meta
          name="twitter:description"
          content="Add pinned comments, highlights, drawings, and markup to documents. Share with clients for review. Try free with a 7-day trial."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
        <link rel="canonical" href="https://kreatli.com/free-tools/document-annotator" />
      </Head>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Free Tools', url: '/free-tools' },
          { name: 'Document Annotator', url: '/free-tools/document-annotator' },
        ]}
      />
      <FAQStructuredData faqs={pdfAnnotatorFaqs} />
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
        {/* Hero */}
        <section className="relative overflow-hidden px-6 pb-4 pt-16">
          <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 text-center">
            <h1 className="mx-auto max-w-lg font-sans text-3xl font-bold sm:text-4xl">Document Annotator</h1>
            <p className="mx-auto max-w-3xl text-lg text-foreground-500">
              Add location-pinned comments, highlights, drawings, and markup directly to documents (e.g. PDFs). Pin
              feedback to exact spots on the page and collaborate with precise annotation—no software installation
              required for reviewers.
            </p>
            <HeroCtaButtons />
          </div>
        </section>

        {/* Interactive Tool Preview */}
        <section className="relative overflow-hidden px-6 pb-12">
          <div className="relative z-10 mx-auto max-w-6xl">
            <FreeToolsEntitlementSection>
              <InteractiveReviewToolPreview variant="pdf" />
            </FreeToolsEntitlementSection>
          </div>
        </section>

        <DefinitionBlock term="Document Annotator">
          A document annotator is an online tool for adding pinned comments, highlights, drawings, and markup to documents such as PDFs. Feedback stays attached to specific locations in the document so reviewers can communicate exact changes. Document annotators replace scattered email feedback with a single, organized review workspace.
        </DefinitionBlock>

        <PdfAnnotatorGuide />

        {/* Related tools */}
        <MoreFreeToolsSection excludeHref="/free-tools/document-annotator" title="More Tools for Creative Teams" />

        <PdfAnnotatorFAQ />

        {/* Related resources */}
        <RelatedResourcesSection
          resources={getRelatedResources(['annotatePdf', 'drawOnPdfDocument', 'addCommentsToPdf', 'clientApprovals'])}
          title="More Resources"
          description="Explore other Kreatli platform features for document annotation, review, and collaboration."
        />

        {/* CTA Section */}
        <CTASection
          title="Ready to annotate documents with your team?"
          description="Kreatli offers location-pinned document annotation, drawing on PDFs, and approval workflows. Add comments and markup in one place with your video and creative assets."
          primaryButtonText="Start 7-day trial"
        />
      </main>

      <FooterSection hideCta />
      <SignUpModal />
    </>
  );
}
