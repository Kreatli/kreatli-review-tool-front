import Head from 'next/head';
import NextLink from 'next/link';

import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';
import { FooterSection } from '../../components/home/Footer/FooterSection';
import { Header } from '../../components/layout/Header';
import { Decorations } from '../../components/layout/Storyblok/Decorations';
import { PdfAnnotatorFAQ, pdfAnnotatorFaqs } from '../../components/pdf-annotator/PdfAnnotatorFAQ';
import { PdfAnnotatorGuide } from '../../components/pdf-annotator/PdfAnnotatorGuide';
import { BreadcrumbStructuredData } from '../../components/shared/BreadcrumbStructuredData';
import { CTASection } from '../../components/shared/CTASection';
import { DefinitionBlock } from '../../components/shared/DefinitionBlock';
import { FAQStructuredData } from '../../components/shared/FAQStructuredData';
import { FreeToolsEntitlementSection } from '../../components/shared/FreeToolsEntitlementSection';
import { HeroCtaButtons } from '../../components/shared/HeroCtaButtons';
import { InteractiveReviewToolPreview } from '../../components/shared/InteractiveReviewToolPreview';
import { MoreFreeToolsSection } from '../../components/shared/MoreFreeToolsSection';
import { RelatedResourcesSection } from '../../components/shared/RelatedResourcesSection';
import { KREATLI_PLATFORM_ENTRY_HREF, OPEN_IN_KREATLI_LABEL } from '../../constants/kreatliPlatformCta';
import { getFreeToolsForFreeToolPage } from '../../data/free-tools-page-tools';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';

export default function PdfMarkupToolPage() {
  useSession();

  return (
    <>
      <Head>
        <title>PDF Markup Tool Online – Mark Up PDFs Free | Kreatli</title>
        <meta
          name="description"
          content="Use a free PDF markup tool: pinned comments, highlights, drawings, and markup on every page. Share review links with clients. Try with a 7-day trial."
        />
        <meta property="og:title" content="PDF Markup Tool Online – Mark Up PDFs Free | Kreatli" />
        <meta
          property="og:description"
          content="Use a free PDF markup tool: pinned comments, highlights, drawings, and markup on every page. Share review links with clients. Try with a 7-day trial."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kreatli.com/free-tools/pdf-markup-tool" />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PDF Markup Tool Online – Mark Up PDFs Free | Kreatli" />
        <meta
          name="twitter:description"
          content="Use a free PDF markup tool: pinned comments, highlights, drawings, and markup on every page. Share review links with clients. Try with a 7-day trial."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
        <link rel="canonical" href="https://kreatli.com/free-tools/pdf-markup-tool" />
      </Head>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Free Tools', url: '/free-tools' },
          { name: 'PDF Markup Tool', url: '/free-tools/pdf-markup-tool' },
        ]}
      />
      <FAQStructuredData faqs={pdfAnnotatorFaqs} />
      <Header />
      <Decorations />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        Skip to main content
      </a>

      <main id="main-content">
        <section className="relative overflow-hidden px-6 pb-4 pt-16">
          <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 text-center">
            <h1 className="mx-auto max-w-lg font-sans text-3xl font-bold sm:text-4xl">PDF Markup Tool</h1>
            <p className="mx-auto max-w-3xl text-lg text-foreground-500">
              Mark up PDFs with location-pinned comments, highlights, drawings, and visual markup. Pin feedback to exact
              spots on the page—no software install required for reviewers.
            </p>
            <HeroCtaButtons />
          </div>
        </section>

        <section className="relative overflow-hidden px-6 pb-12">
          <div className="relative z-10 mx-auto max-w-6xl">
            <FreeToolsEntitlementSection>
              <InteractiveReviewToolPreview variant="pdf" />
            </FreeToolsEntitlementSection>
          </div>
        </section>

        <DefinitionBlock term="PDF markup tool">
          A PDF markup tool lets reviewers add visual markup and notes directly on the document—highlights, shapes,
          arrows, and freehand drawing—each tied to a specific place on the page. It replaces vague email threads with
          precise, actionable feedback.
        </DefinitionBlock>

        <section className="relative px-6 pb-10" aria-label="How this fits your workflow">
          <div className="relative z-10 mx-auto max-w-3xl space-y-4 text-base leading-relaxed text-foreground-600">
            <p>
              PDF markup is how agencies collect legal, brand, and client notes on scripts, storyboards, and one-pagers.
              This free tool is ideal when you want a quick pass in the browser. When rounds stack up, switch to{' '}
              <NextLink
                href="/platform/proof-pdf"
                className="font-medium text-primary underline-offset-2 hover:underline"
              >
                proof PDF
              </NextLink>{' '}
              on the platform and use{' '}
              <NextLink
                href="/platform/compare-pdf-files"
                className="font-medium text-primary underline-offset-2 hover:underline"
              >
                compare PDF files
              </NextLink>{' '}
              to show what changed between versions. For a guided walkthrough, see{' '}
              <NextLink
                href="/guides/how-to-markup-a-pdf"
                className="font-medium text-primary underline-offset-2 hover:underline"
              >
                how to mark up a PDF
              </NextLink>
              .
            </p>
          </div>
        </section>

        <PdfAnnotatorGuide />

        <MoreFreeToolsSection
          tools={getFreeToolsForFreeToolPage('/free-tools/pdf-markup-tool')}
          title="More Tools for Creative Teams"
        />

        <PdfAnnotatorFAQ />

        <RelatedResourcesSection
          resources={getRelatedResources([
            'annotatePdf',
            'drawOnPdfDocument',
            'platformProofPdf',
            'platformComparePdfFiles',
            'guideMarkupPdf',
            'helpCenter',
          ])}
          title="More Resources"
          description="Explore PDF proofing on the platform, comparison workflows, and step-by-step guides."
        />

        <CTASection
          title="Ready to mark up PDFs with your team?"
          description="Kreatli offers location-pinned PDF markup, drawing on PDFs, and approval workflows in one workspace with your video and creative assets."
          primaryButtonText={OPEN_IN_KREATLI_LABEL}
          primaryButtonHref={KREATLI_PLATFORM_ENTRY_HREF}
        />
      </main>

      <FooterSection hideCta />
      <SignUpModal />
    </>
  );
}
