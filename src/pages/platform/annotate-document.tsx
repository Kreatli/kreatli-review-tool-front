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
import { RelatedResourcesSection } from '../../components/shared/RelatedResourcesSection';
import { ResourcesArticlesPreviewSection } from '../../components/shared/ResourcesArticlesPreviewSection';
import { Icon } from '../../components/various/Icon';
import { getPlatformArticles } from '../../data/platform-articles';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';

const faqs = [
  {
    question: 'What does it mean to annotate a document in Kreatli?',
    answer:
      'To annotate a document in Kreatli means adding comments, highlights, drawings, and markup directly onto a document (such as a PDF) so reviewers can point to specific text, images, or areas that need changes. Annotations are pinned to exact locations and pages, so feedback stays tied to the right spot. You can annotate documents in one place alongside video and other creative assets, keeping review and approval in a single workflow.',
  },
  {
    question: 'How do I annotate a document in Kreatli?',
    answer:
      'Upload your document (e.g. a PDF) to a Kreatli project and open it in the review interface. Click or select the area you want to comment on, then add a comment, highlight, or drawing. Your annotations are attached to that exact location on the page. You can annotate document pages one by one, and all feedback is visible to the team. Share a review link so clients or collaborators can view and add their own annotations without creating an account.',
  },
  {
    question: 'Can clients annotate documents without creating an account?',
    answer:
      'Yes. Kreatli offers no-signup guest review links for documents (and video, images). Send your client a secure link to the document; they can open it, add comments and markup, and submit feedback without signing up. This removes friction from the approval process and keeps all document annotations in one thread with the rest of your project.',
  },
  {
    question: 'What types of annotations can I add to a document?',
    answer:
      'In Kreatli you can add text comments pinned to specific spots on a page, highlights and shapes to mark regions, arrows and markers to point to elements, and freehand drawing where needed. Annotations can be color-coded by reviewer or type. All feedback is tied to the exact page and position, so designers and writers know precisely what to change.',
  },
  {
    question: 'How do I track resolved comments on a document?',
    answer:
      'Kreatli tracks resolution status for every comment and annotation on a document. You can mark items as resolved or unresolved and filter to show only what still needs attention. When you upload a new version of the document, you can resolve annotations that have been addressed. The system keeps a clear record of what’s done and what’s pending across review rounds.',
  },
  {
    question: 'Can multiple people annotate the same document at once?',
    answer:
      'Yes. Multiple reviewers can annotate the same document. Each person’s comments and markup are visible to everyone, with indicators for who added what. You can see all annotations in one view, filter by reviewer, and track resolution. This works for internal teams and for clients using guest links.',
  },
  {
    question: 'Why annotate documents in Kreatli instead of a standalone tool?',
    answer:
      'Annotating documents in Kreatli keeps review in one place with your video, images, and other deliverables. You get a single project timeline, one set of review links for clients, and one approval workflow instead of juggling document tools, email, and separate review apps. That reduces delays and ensures nothing gets missed when moving from draft to final.',
  },
  {
    question: 'How does document annotation help creative and marketing workflows?',
    answer:
      'Document annotation streamlines creative review by making feedback visual and location-specific. Instead of “change the headline on page 3,” reviewers point directly to the spot and add a comment or highlight. Writers and designers see exactly what to change, resolution tracking keeps rounds organized, and clients can annotate documents via a link without accounts. That speeds up approvals and reduces revision cycles for layouts, decks, briefs, and other documents.',
  },
];

export default function AnnotateDocumentPage() {
  useSession();
  const articles = getPlatformArticles('/platform/annotate-document');

  return (
    <>
      <Head>
        <title>Annotate Document | Kreatli</title>
        <meta
          name="description"
          content="Annotate documents with comments, drawings, and markup. Review and collaborate on documents with precise feedback in one place with your video and creative assets."
        />
        <link rel="canonical" href="https://kreatli.com/platform/annotate-document" />
        <meta property="og:url" content="https://kreatli.com/platform/annotate-document" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Annotate Document | Kreatli" />
        <meta
          property="og:description"
          content="Annotate documents with comments, drawings, and markup. Review and collaborate on documents with precise feedback in one place."
        />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:secure_url" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:alt" content="Annotate Document | Kreatli" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Annotate Document | Kreatli" />
        <meta
          name="twitter:description"
          content="Annotate documents with comments, drawings, and markup. Review and collaborate on documents with precise feedback in one place."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
      </Head>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Platform', url: '/platform' },
          { name: 'Annotate Document', url: '/platform/annotate-document' },
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
              Annotate Document
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground-500">
              Annotate documents with comments, drawings, and markup. Review and collaborate on documents with precise
              feedback in one place with your video and creative assets.
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

          {/* Related PDF & document features */}
          <div className="mx-auto mt-16 w-fit max-w-full rounded-2xl border border-foreground-200 bg-content1/60 px-6 py-8 shadow-sm backdrop-blur-sm">
            <h2 className="text-center font-sans text-lg font-semibold text-foreground-700">
              Related PDF & document features
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-center text-sm text-foreground-500">
              For PDFs only or want to draw on PDFs? Explore these options:
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button
                as={NextLink}
                href="/platform/annotate-pdf"
                size="md"
                className="bg-foreground font-medium text-content1 hover:opacity-90"
                endContent={<Icon icon="arrowRight" size={16} />}
              >
                Annotate PDF
              </Button>
              <Button
                as={NextLink}
                href="/platform/draw-on-pdf-document"
                size="md"
                className="bg-foreground font-medium text-content1 hover:opacity-90"
                endContent={<Icon icon="arrowRight" size={16} />}
              >
                Draw on PDF Document
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Annotation Types Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Ways to Annotate Documents</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Use comments, highlights, and markup to give precise feedback on every page of your document.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="chat" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Comments on Pages</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Pin text comments to exact spots on any page. Every comment is linked to a specific location so
                  there’s no guesswork about what to change.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="paint" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Highlights & Shapes</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Highlight text or use shapes to mark regions that need attention. Draw attention to specific
                  paragraphs, images, or layout areas.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="arrowRight" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Arrows & Markers</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Use arrows and markers to point to specific elements on a page. Perfect for design feedback and copy
                  edits.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="paint" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Color-Coded Feedback</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Use different colors to categorize annotations by type, priority, or reviewer for easy organization
                  and tracking.
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
                  Multiple team members and clients can annotate the same document. See who added what with clear
                  indicators and keep feedback in one thread.
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
                  Mark annotations as resolved or unresolved. Track which feedback has been addressed and which still
                  needs attention across review rounds.
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
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Why Annotate Documents in Kreatli</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Annotate documents with precise, location-based feedback so your team and clients stay aligned and
              revisions move faster.
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
                  Instead of “fix the headline on page 3,” annotations point to the exact spot. No more back-and-forth
                  to clarify what to change.
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
                  <h3 className="font-sans text-lg font-semibold">One Place for Documents and Video</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Annotate documents alongside video and other assets in the same project. One review link, one approval
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
                  <h3 className="font-sans text-lg font-semibold">Client-Friendly Document Review</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Clients can annotate documents through no-signup guest links. They add comments and markup without
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
        description="Explore guides and comparisons that show how teams annotate documents and manage review in Kreatli."
      />

      <PricingSection />

      {/* FAQ Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Get detailed answers about annotating documents and review workflows in Kreatli.
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
              to learn how Kreatli can help you annotate documents and streamline your review workflow.
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
        title="Ready to Annotate Documents with Clarity?"
        description="Annotate documents with comments, highlights, and markup in one place with your team and clients. Start using Kreatli today."
      />
      <FooterSection hideCta={true} />
      <SignUpModal />
    </>
  );
}
