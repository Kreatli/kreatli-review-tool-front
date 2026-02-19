/* eslint-disable max-len */
import Head from 'next/head';

import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';
import { FooterSection } from '../../components/home/Footer/FooterSection';
import { Header } from '../../components/layout/Header';
import { Decorations } from '../../components/layout/Storyblok/Decorations';
import { BreadcrumbStructuredData } from '../../components/shared/BreadcrumbStructuredData';
import { CTASection } from '../../components/shared/CTASection';
import { FAQStructuredData } from '../../components/shared/FAQStructuredData';
import { InteractiveReviewToolPreview } from '../../components/shared/InteractiveReviewToolPreview';
import { MoreFreeToolsSection } from '../../components/shared/MoreFreeToolsSection';
import { getFreeToolsForFreeToolPage } from '../../data/free-tools-page-tools';
import { RelatedResourcesSection } from '../../components/shared/RelatedResourcesSection';
import { PdfAnnotatorFAQ, pdfAnnotatorFaqs } from '../../components/pdf-annotator/PdfAnnotatorFAQ';
import { PdfAnnotatorGuide } from '../../components/pdf-annotator/PdfAnnotatorGuide';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';

export default function PdfAnnotatorPage() {
  useSession();

  return (
    <>
      <Head>
        <title>PDF Annotator - Free Online Tool | Kreatli</title>
        <meta
          name="description"
          content="Free online PDF annotator for creative teams. Add location-pinned comments, highlights, drawings, and markup to PDFs. Share with clients—no sign-up required for reviewers."
        />
        <meta
          name="keywords"
          content="PDF annotator, annotate PDF online, PDF annotation tool, comment on PDF, draw on PDF, PDF markup, PDF feedback, PDF collaboration"
        />
        <meta property="og:title" content="PDF Annotator - Free Online Tool | Kreatli" />
        <meta
          property="og:description"
          content="Free online PDF annotator for creative teams. Add location-pinned comments, highlights, drawings, and markup to PDFs. Share with clients—no sign-up required for reviewers."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kreatli.com/free-tools/pdf-annotator" />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PDF Annotator - Free Online Tool | Kreatli" />
        <meta
          name="twitter:description"
          content="Free online PDF annotator for creative teams. Add location-pinned comments, highlights, drawings, and markup to PDFs. Share with clients—no sign-up required for reviewers."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
        <link rel="canonical" href="https://kreatli.com/free-tools/pdf-annotator" />
      </Head>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Free Tools', url: '/free-tools' },
          { name: 'PDF Annotator', url: '/free-tools/pdf-annotator' },
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
            <h1 className="mx-auto max-w-lg font-sans text-3xl font-bold sm:text-4xl">PDF Annotator</h1>
            <p className="mx-auto max-w-3xl text-lg text-foreground-500">
              Add location-pinned comments, highlights, drawings, and markup directly to PDFs. Pin feedback to exact
              spots on the page and collaborate with precise annotation—no software installation required for
              reviewers.
            </p>
          </div>
        </section>

        {/* Interactive Tool Preview */}
        <section className="relative overflow-hidden px-6 pb-12">
          <div className="relative z-10 mx-auto max-w-6xl">
            <InteractiveReviewToolPreview variant="pdf" />
          </div>
        </section>

        <PdfAnnotatorGuide />

        {/* Related tools */}
        <MoreFreeToolsSection tools={getFreeToolsForFreeToolPage('/free-tools/pdf-annotator')} title="More Tools for Creative Teams" />

        <PdfAnnotatorFAQ />

        {/* Related resources */}
        <RelatedResourcesSection
          resources={getRelatedResources(['annotatePdf', 'drawOnPdfDocument', 'addCommentsToPdf', 'secureAssetStorage'])}
          title="More Resources"
          description="Explore other Kreatli platform features for PDF annotation, review, and collaboration."
        />

        {/* CTA Section */}
        <CTASection
          title="Ready to annotate PDFs with your team?"
          description="Kreatli offers location-pinned PDF annotation, drawing on PDFs, and approval workflows. Add comments and markup in one place with your video and creative assets."
          primaryButtonText="Start for Free"
        />
      </main>

      <FooterSection hideCta />
      <SignUpModal />
    </>
  );
};
