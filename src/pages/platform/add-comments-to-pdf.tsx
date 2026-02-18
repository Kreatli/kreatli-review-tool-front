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
  ADD_COMMENTS_TO_PDF_STEPS,
  PlatformStepGuide,
} from '../../components/shared/PlatformStepGuide';
import { RelatedResourcesSection } from '../../components/shared/RelatedResourcesSection';
import { ResourcesArticlesPreviewSection } from '../../components/shared/ResourcesArticlesPreviewSection';
import { Icon } from '../../components/various/Icon';
import { getPlatformArticles } from '../../data/platform-articles';
import { getFreeToolsForPlatform } from '../../data/platform-free-tools';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';

const faqs = [
  {
    question: 'What does “add comments to PDF” mean in Kreatli?',
    answer:
      'In Kreatli, “add comments to PDF” means you can attach text comments directly to specific spots on any page of a PDF. Each comment is pinned to an exact location—a paragraph, image, or layout area—so reviewers and designers always know what needs to change. You can add as many comments as you need, reply to comments to create threads, and mark them as resolved when done. Comments stay tied to the right page and position, so nothing gets lost in email or separate tools.',
  },
  {
    question: 'How do I add comments to a PDF in Kreatli?',
    answer:
      "Upload your PDF to a Kreatli project and open it in the review interface. Click or select the spot on the page where you want to leave feedback, then type your comment. Your comment is attached to that exact location. You can add comments page by page, reply to existing comments, and @mention collaborators. When you're done, share a review link so clients or teammates can view the PDF and add their own comments without creating an account.",
  },
  {
    question: 'Can clients add comments to PDFs without creating an account?',
    answer:
      'Yes. Kreatli offers no-signup guest review links for PDFs. Send your client a secure link to the PDF; they can open it, add comments, and submit feedback without signing up. This removes friction from the approval process and keeps all PDF comments in one place with the rest of your project.',
  },
  {
    question: 'Are comments pinned to a specific location on the PDF?',
    answer:
      'Yes. Every comment you add in Kreatli is pinned to an exact page and position on the PDF. When you open the document, comments appear where they were created so reviewers and designers see feedback in context. You can jump directly from a comment to the exact spot on the page, eliminating guesswork and speeding up revisions across layouts, decks, and documents.',
  },
  {
    question: 'How do I track which comments have been resolved?',
    answer:
      'Kreatli tracks resolution status for every comment on a PDF. You can mark comments as resolved or unresolved and filter to show only what still needs attention. When you upload a new version of the PDF, you can resolve comments that have been addressed. The system keeps a clear record of what’s done and what’s pending across review rounds.',
  },
  {
    question: 'Can multiple people add comments to the same PDF at once?',
    answer:
      'Yes. Multiple reviewers can add comments to the same PDF. Each person’s comments are visible to everyone, with indicators for who wrote what. You can see all comments in one view, filter by reviewer, and track resolution. This works for internal teams and for clients using guest links.',
  },
  {
    question: 'Why add comments to PDFs in Kreatli instead of email or a standalone PDF tool?',
    answer:
      'Adding comments to PDFs in Kreatli keeps review in one place with your video, images, and other deliverables. You get a single project timeline, one set of review links for clients, and one approval workflow instead of juggling PDF tools, email, and separate review apps. That reduces delays and ensures nothing gets missed when moving from draft to final.',
  },
  {
    question: 'How does adding comments to PDFs help creative and marketing workflows?',
    answer:
      'Adding comments to PDFs streamlines creative review by making feedback specific and location-based. Instead of “change the headline on page 3,” reviewers point directly to the spot and add a comment. Writers and designers see exactly what to change, resolution tracking keeps rounds organized, and clients can add comments via a link without accounts. That speeds up approvals and reduces revision cycles for layouts, decks, and documents.',
  },
];

export default function AddCommentsToPdfPage() {
  useSession();
  const articles = getPlatformArticles('/platform/add-comments-to-pdf');

  return (
    <>
      <Head>
        <title>Add Comments to PDF | Kreatli</title>
        <meta
          name="description"
          content="Add comments to PDF with location-pinned feedback. Review and collaborate on PDFs with threaded comments in one place with your video and creative assets."
        />
        <link rel="canonical" href="https://kreatli.com/platform/add-comments-to-pdf" />
        <meta property="og:url" content="https://kreatli.com/platform/add-comments-to-pdf" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Add Comments to PDF | Kreatli" />
        <meta
          property="og:description"
          content="Add comments to PDF with location-pinned feedback. Review and collaborate on PDFs with threaded comments in one place."
        />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:secure_url" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:alt" content="Add Comments to PDF | Kreatli" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Add Comments to PDF | Kreatli" />
        <meta
          name="twitter:description"
          content="Add comments to PDF with location-pinned feedback. Give precise, threaded feedback your team and clients can act on."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
      </Head>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Platform', url: '/platform' },
          { name: 'Add Comments to PDF', url: '/platform/add-comments-to-pdf' },
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
              Add Comments to PDF
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground-500">
              Add comments to PDF with location-pinned, threaded feedback. Review and collaborate on PDFs with precise
              comments in one place with your video and creative assets.
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
        stepsSectionTitle="How to add comments to a PDF in Kreatli"
        stepsIntro="Follow these steps to upload your PDF, add location-pinned comments, and share for review—all in one place."
        steps={ADD_COMMENTS_TO_PDF_STEPS}
        completeGuide={{
          href: '/guides/what-is-proofing-software',
          description:
            'Learn how proofing and creative review work in one place with your video, PDFs, and other assets.',
        }}
      />

      {/* Ways to Add Comments Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Ways to Add Comments to PDFs</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Use location-pinned comments, replies, and mentions to give precise feedback on every page of your PDF.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="chat" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Location-Pinned Comments</h3>
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
                    <Icon icon="reply" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Threaded Replies</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Reply to comments to create discussion threads. Keep feedback organized and context clear for
                  designers and writers.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="userPlus" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">@Mentions</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  @mention collaborators so the right people are notified and can respond. Keep the conversation focused
                  and actionable.
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
                  Multiple team members and clients can add comments to the same PDF. See who wrote what with clear
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
                  Mark comments as resolved or unresolved. Track which feedback has been addressed and which still needs
                  attention across review rounds.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="filePdf" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Page-by-Page Context</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Add comments on any page. Jump to the right page from the comment list and see all feedback in
                  context.
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
              Need to highlight pdf, full annotation, or draw on PDFs? Explore these options:
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
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

      {/* Benefits Section */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Why Add Comments to PDFs in Kreatli</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Add comments to PDFs with precise, location-based feedback so your team and clients stay aligned and
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
                  Instead of “fix the headline on page 3,” comments point to the exact spot. No more back-and-forth to
                  clarify what to change.
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
                  Add comments to PDFs alongside video and other assets in the same project. One review link, one
                  approval workflow, less tool-switching.
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
                  Clients can add comments to PDFs through no-signup guest links. They leave feedback without creating
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
        tools={getFreeToolsForPlatform('/platform/add-comments-to-pdf')}
      />

      {/* See How This Works Section */}
      <ResourcesArticlesPreviewSection
        articles={articles}
        title="See How This Works in Practice"
        description="Explore guides and comparisons that show how teams add comments to PDFs and manage review in Kreatli."
      />

      <PricingSection />

      {/* FAQ Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Get detailed answers about adding comments to PDFs and review workflows in Kreatli.
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
              to learn how Kreatli can help you add comments to PDFs and streamline your review workflow.
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
        title="Ready to Add Comments to PDFs with Clarity?"
        description="Add comments to PDFs with location-pinned, threaded feedback in one place with your team and clients. Start using Kreatli today."
      />
      <FooterSection hideCta={true} />
      <SignUpModal />
    </>
  );
}
