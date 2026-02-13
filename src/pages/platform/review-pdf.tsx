/* eslint-disable simple-import-sort/imports */
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
import {
  REVIEW_PDF_STEPS,
  PlatformStepGuide,
} from '../../components/shared/PlatformStepGuide';
import { RelatedResourcesSection } from '../../components/shared/RelatedResourcesSection';
import { ResourcesArticlesPreviewSection } from '../../components/shared/ResourcesArticlesPreviewSection';
import { Icon } from '../../components/various/Icon';
import { getPlatformArticles } from '../../data/platform-articles';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';

const faqs = [
  {
    question: 'What is PDF review?',
    answer:
      'PDF review is the process of reviewing PDF documents with feedback, comments, and annotations to get approval or request changes. In Kreatli, you can review PDFs with comments pinned to exact locations, highlights, shapes, and drawings—all in one place alongside video and other creative assets. This keeps feedback organized and tied to the right page and spot, so nothing gets lost in email or separate tools.',
  },
  {
    question: 'How do I review a PDF in Kreatli?',
    answer:
      "Upload your PDF to a Kreatli project and open it in the review interface. Navigate page by page and click or select the area you want to comment on. Add comments, highlights, or drawings pinned to that exact location. When you're done reviewing, share a link so clients or collaborators can view and add their own feedback without creating an account.",
  },
  {
    question: 'Can clients review PDFs without creating an account?',
    answer:
      'Yes. Kreatli offers no-signup guest review links for PDFs (and video). Send your client a secure link to the PDF; they can open it, add comments and markup, and submit feedback without signing up. This removes friction from the approval process and keeps all PDF review in one thread with the rest of your project.',
  },
  {
    question: 'What feedback options are available when reviewing a PDF?',
    answer:
      'In Kreatli you can add text comments pinned to specific spots on a page, highlights and shapes to mark regions, arrows and markers to point to elements, and freehand drawing where needed. Reviewers can also approve or request changes. All feedback is tied to the exact page and position, so designers and writers know precisely what to change.',
  },
  {
    question: 'How do I track feedback status on a PDF review?',
    answer:
      "Kreatli tracks resolution status for every comment on a PDF. You can mark items as resolved or unresolved and filter to show only what still needs attention. When you upload a new version of the PDF, you can resolve comments that have been addressed. The system keeps a clear record of what's done and what's pending across review rounds.",
  },
  {
    question: 'Can multiple people review the same PDF at once?',
    answer:
      "Yes. Multiple reviewers can review the same PDF. Each person's comments and markup are visible to everyone, with indicators for who added what. You can see all feedback in one view, filter by reviewer, and track resolution. This works for internal teams and for clients using guest links.",
  },
  {
    question: 'Why review PDFs in Kreatli instead of email or standalone PDF tools?',
    answer:
      'Reviewing PDFs in Kreatli keeps review in one place with your video, images, and other deliverables. You get a single project timeline, one set of review links for clients, and one approval workflow instead of juggling PDF tools, email, and separate review apps. That reduces delays and ensures nothing gets missed when moving from draft to final.',
  },
  {
    question: 'How does PDF review help creative and marketing workflows?',
    answer:
      'PDF review streamlines creative workflows by making feedback visual and location-specific. Instead of "change the headline on page 3," reviewers point directly to the spot and add a comment. Writers and designers see exactly what to change, resolution tracking keeps rounds organized, and clients can review PDFs via a link without accounts. That speeds up approvals and reduces revision cycles for layouts, decks, and documents.',
  },
];

export default function ReviewPdfPage() {
  useSession();
  const articles = getPlatformArticles('/platform/review-pdf');

  return (
    <>
      <Head>
        <title>Review PDF | Kreatli</title>
        <meta
          name="description"
          content="Review PDF files with comments, annotations, and approvals. Collaborate on PDFs with precise feedback in one place—no sign-up required for reviewers."
        />
        <link rel="canonical" href="https://kreatli.com/platform/review-pdf" />
        <meta property="og:url" content="https://kreatli.com/platform/review-pdf" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Review PDF | Kreatli" />
        <meta
          property="og:description"
          content="Review PDF files with comments, annotations, and approvals. Collaborate on PDFs with precise feedback in one place."
        />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:secure_url" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:alt" content="Review PDF | Kreatli" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Review PDF | Kreatli" />
        <meta
          name="twitter:description"
          content="Review PDF files with comments, annotations, and approvals. Collaborate on PDFs with precise feedback in one place."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
      </Head>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Platform', url: '/platform' },
          { name: 'Review PDF', url: '/platform/review-pdf' },
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
              Review PDF
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground-500">
              Review PDF files with comments, annotations, and approvals. Collaborate on PDFs with precise feedback in
              one place with your video and creative assets—no sign-up required for reviewers.
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
        stepsSectionTitle="How to review a PDF in Kreatli"
        stepsIntro="Follow these steps to upload your PDF, collect feedback, and track approvals—all in one place."
        steps={REVIEW_PDF_STEPS}
        completeGuide={{
          href: '/guides/what-is-proofing-software',
          description:
            'Learn how proofing and creative review work in one place with your video, PDFs, and other assets.',
        }}
      />

      {/* Review Features Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">How PDF Review Works</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Use comments, highlights, and markup to give precise feedback on every page of your PDF.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="upload" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Upload Your PDF</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Add your PDF to a Kreatli project. The file is stored securely with version history so you can track
                  every draft and review round.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="chat" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Add Comments</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Pin text comments to exact spots on any page. Every comment is linked to a specific location so
                  there's no guesswork about what to change.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="paint" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Highlights & Markup</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Highlight text, use shapes to mark regions, or draw freehand to point out areas that need attention.
                  All markup stays pinned to the right spot.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="share" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Share for Review</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Generate a secure review link and send it to clients or collaborators. They can review and comment
                  without creating an account or downloading anything.
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
                  Multiple team members and clients can review the same PDF. See who added what with clear indicators
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
                  <h3 className="font-sans text-lg font-semibold">Track Approvals</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Mark comments as resolved, track who approved which version, and keep a clear record of what's done
                  and what's pending across review rounds.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mx-auto w-fit max-w-full rounded-2xl border border-foreground-200 bg-content1/60 px-6 py-8 shadow-sm backdrop-blur-sm">
            <h2 className="text-center font-sans text-lg font-semibold text-foreground-700">
              Related PDF & document features
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-center text-sm text-foreground-500">
              Need to annotate, highlight, or draw on PDFs? Explore these options:
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
                href="/platform/highlight-pdf"
                size="md"
                className="bg-foreground font-medium text-content1 hover:opacity-90"
                endContent={<Icon icon="arrowRight" size={16} />}
              >
                Highlight PDF
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

      {/* Benefits Section */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Why Review PDFs in Kreatli</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Review PDFs with precise, location-based feedback so your team and clients stay aligned and revisions
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
                  Instead of "fix the headline on page 3," comments point to the exact spot. No more back-and-forth
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
                  <h3 className="font-sans text-lg font-semibold">One Place for PDF and Video</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Review PDFs alongside video and other assets in the same project. One review link, one approval
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
                  Clients can review PDFs through no-signup guest links. They add comments and markup without creating
                  an account, so approvals move faster.
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
        description="Explore guides and comparisons that show how teams review PDFs and manage approvals in Kreatli."
      />

      <PricingSection />

      {/* FAQ Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Get detailed answers about reviewing PDFs and approval workflows in Kreatli.
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
              to learn how Kreatli can help you review PDFs and streamline your approval workflow.
            </p>
          </div>
        </div>
      </section>

      {/* More Resources Section */}
      <RelatedResourcesSection
        resources={getRelatedResources(['reviewApproval', 'creativeProofing', 'annotatePdf', 'addCommentsToPdf'])}
        title="More Resources"
        description="Explore other Kreatli platform features to streamline your review and collaboration workflow."
      />

      {/* CTA Section */}
      <CTASection
        title="Ready to Review PDFs with Your Team?"
        description="Review PDFs with comments, highlights, and approvals in one place with your team and clients. Start using Kreatli today."
      />
      <FooterSection hideCta={true} />
      <SignUpModal />
    </>
  );
}
