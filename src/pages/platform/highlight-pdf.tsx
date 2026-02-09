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
import { InteractiveReviewToolPreview } from '../../components/shared/InteractiveReviewToolPreview';
import { MoreFreeToolsSection } from '../../components/shared/MoreFreeToolsSection';
import { ANNOTATE_PDF_STEPS, PlatformStepGuide } from '../../components/shared/PlatformStepGuide';
import { RelatedResourcesSection } from '../../components/shared/RelatedResourcesSection';
import { ResourcesArticlesPreviewSection } from '../../components/shared/ResourcesArticlesPreviewSection';
import { Icon } from '../../components/various/Icon';
import { getPlatformArticles } from '../../data/platform-articles';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';

const faqs = [
  {
    question: 'What does it mean to highlight a PDF?',
    answer:
      'Highlighting a PDF means marking specific text or regions—with highlights, shapes, or colored markup—so reviewers can point to exact spots that need changes. In Kreatli, you can highlight PDFs with text highlights, shapes to mark regions, and comments pinned to those areas, all in one place alongside video and other creative assets. This keeps feedback precise and tied to the right page and spot.',
  },
  {
    question: 'How do I highlight a PDF in Kreatli?',
    answer:
      "Upload your PDF to a Kreatli project and open it in the review interface. Select the text or area you want to highlight, then add a highlight, shape, or comment. Your highlights are attached to that exact location on the page. You can highlight PDFs page by page, and all feedback is visible to the team. When you're done, share a review link so clients or collaborators can view and add their own highlights without creating an account.",
  },
  {
    question: 'Can clients highlight PDFs without creating an account?',
    answer:
      'Yes. Kreatli offers no-signup guest review links for PDFs (and video). Send your client a secure link to the PDF; they can open it, highlight text and regions, add comments, and submit feedback without signing up. This removes friction from the approval process and keeps all PDF highlights in one thread with the rest of your project.',
  },
  {
    question: 'What types of highlights can I add to a PDF?',
    answer:
      'In Kreatli you can highlight PDF text with colored highlights, use shapes to mark regions that need attention, add text comments pinned to specific spots, and use arrows or markers to point to elements. Highlights can be color-coded by reviewer or type. All feedback is tied to the exact page and position, so designers and writers know precisely what to change.',
  },
  {
    question: 'How do I track resolved highlights on a PDF?',
    answer:
      "Kreatli tracks resolution status for every comment and highlight on a PDF. You can mark items as resolved or unresolved and filter to show only what still needs attention. When you upload a new version of the PDF, you can resolve highlights that have been addressed. The system keeps a clear record of what's done and what's pending across review rounds.",
  },
  {
    question: 'Can multiple people highlight the same PDF at once?',
    answer:
      "Yes. Multiple reviewers can highlight the same PDF. Each person's highlights and comments are visible to everyone, with indicators for who added what. You can see all highlights in one view, filter by reviewer, and track resolution. This works for internal teams and for clients using guest links.",
  },
  {
    question: 'Why highlight PDFs in Kreatli instead of a standalone PDF tool?',
    answer:
      'Highlighting PDFs in Kreatli keeps review in one place with your video, images, and other deliverables. You get a single project timeline, one set of review links for clients, and one approval workflow instead of juggling PDF tools, email, and separate review apps. That reduces delays and ensures nothing gets missed when moving from draft to final.',
  },
  {
    question: 'How does highlighting PDFs help creative and marketing workflows?',
    answer:
      'Highlighting PDFs streamlines creative review by making feedback visual and location-specific. Instead of "change the headline on page 3," reviewers highlight the exact text or region and add a comment. Writers and designers see exactly what to change, resolution tracking keeps rounds organized, and clients can highlight PDFs via a link without accounts. That speeds up approvals and reduces revision cycles for layouts, decks, and documents.',
  },
];

export default function HighlightPdfPage() {
  useSession();
  const articles = getPlatformArticles('/platform/highlight-pdf');

  return (
    <>
      <Head>
        <title>Highlight PDF | Kreatli</title>
        <meta
          name="description"
          content="Highlight PDF text and regions for review. Highlight pdf with comments and markup in one place with your video and creative assets."
        />
        <link rel="canonical" href="https://kreatli.com/platform/highlight-pdf" />
        <meta property="og:url" content="https://kreatli.com/platform/highlight-pdf" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Highlight PDF | Kreatli" />
        <meta
          property="og:description"
          content="Highlight PDF text and regions for review. Highlight pdf with comments and markup in one place with your team and clients."
        />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:secure_url" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:alt" content="Highlight PDF | Kreatli" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Highlight PDF | Kreatli" />
        <meta
          name="twitter:description"
          content="Highlight PDF text and regions for review. Highlight pdf with comments and markup in one place with your team and clients."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
      </Head>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Platform', url: '/platform' },
          { name: 'Highlight PDF', url: '/platform/highlight-pdf' },
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
              Highlight PDF
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground-500">
              Highlight PDF text and regions for precise feedback. Highlight pdf with comments and markup in one place
              with your video and creative assets.
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
          <InteractiveReviewToolPreview variant="pdf" />
        </div>
      </section>

      <PlatformStepGuide
        stepsSectionTitle="How to highlight a PDF in Kreatli"
        stepsIntro="Follow these steps to upload your PDF, add highlights and annotations, and share for review—all in one place."
        steps={ANNOTATE_PDF_STEPS}
        completeGuide={{
          href: '/guides/what-is-proofing-software',
          description:
            'Learn how proofing and creative review work in one place with your video, PDFs, and other assets.',
        }}
      />

      {/* Ways to Highlight Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Ways to Highlight PDFs</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Use text highlights, shapes, and comments to give precise feedback on every page of your PDF.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="paint" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Text Highlights</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Highlight PDF text to mark passages that need changes. Every highlight is linked to the exact
                  selection so there's no guesswork about what to revise.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="paint" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Shapes to Mark Regions</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Use shapes to mark regions that need attention—images, layout areas, or blocks of content. Draw
                  attention to specific paragraphs or design elements.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="chat" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Comments on Highlighted Areas</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Add comments pinned to the exact spot you highlighted. Perfect for explaining what to change and
                  keeping feedback tied to the right location.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="paint" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Color-Coded Highlights</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Use different colors to categorize highlights by type, priority, or reviewer for easy organization and
                  tracking.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="group" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Multi-Reviewer Support</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Multiple team members and clients can highlight the same PDF. See who added what with clear indicators
                  and keep feedback in one thread.
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
                  Mark highlights and comments as resolved or unresolved. Track which feedback has been addressed and
                  which still needs attention across review rounds.
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
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Why Highlight PDFs in Kreatli</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Highlight PDFs with precise, location-based feedback so your team and clients stay aligned and revisions
              move faster.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="eye" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Clearer Feedback</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Instead of "fix the headline on page 3," highlights point to the exact text or region. No more
                  back-and-forth to clarify what to change.
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
                  When feedback is pinned to the right place, designers and writers can act on it immediately.
                  Resolution tracking ensures nothing gets missed.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="group" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">One Place for PDF and Video</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Highlight PDFs alongside video and other assets in the same project. One review link, one approval
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
                  <h3 className="font-sans text-lg font-semibold">Client-Friendly PDF Review</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Clients can highlight PDFs through no-signup guest links. They add highlights and comments without
                  creating an account, so approvals move faster.
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
        description="Explore guides and comparisons that show how teams highlight PDFs and manage review in Kreatli."
      />

      <PricingSection />

      {/* FAQ Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Get detailed answers about highlighting PDFs and review workflows in Kreatli.
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
              to learn how Kreatli can help you highlight PDFs and streamline your review workflow.
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
          'addCommentsToPdf',
          'drawOnPdfDocument',
        ])}
        title="More Resources"
        description="Explore other Kreatli platform features to streamline your review and collaboration workflow."
      />

      {/* CTA Section */}
      <CTASection
        title="Ready to Highlight PDFs with Clarity?"
        description="Highlight PDF text and regions with comments and markup in one place with your team and clients. Start using Kreatli today."
      />
      <FooterSection hideCta={true} />
      <SignUpModal />
    </>
  );
}
