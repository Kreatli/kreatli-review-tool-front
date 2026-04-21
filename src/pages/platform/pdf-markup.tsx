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
import { PlatformInteractiveReviewPreview } from '../../components/shared/PlatformInteractiveReviewPreview';
import { MoreFreeToolsSection } from '../../components/shared/MoreFreeToolsSection';
import {
  ANNOTATE_PDF_STEPS,
  PlatformStepGuide,
} from '../../components/shared/PlatformStepGuide';
import { RelatedResourcesSection } from '../../components/shared/RelatedResourcesSection';
import { ResourcesArticlesPreviewSection } from '../../components/shared/ResourcesArticlesPreviewSection';
import { Icon } from '../../components/various/Icon';
import { getPlatformArticles } from '../../data/platform-articles';
import { getFreeToolsForPlatform } from '../../data/platform-free-tools';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';
import { PlatformDefinitionBlock } from '../../components/shared/PlatformDefinitionBlock';

const faqs = [
  {
    question: 'What is PDF markup?',
    answer:
      'PDF markup is visual feedback on a PDF—highlights, shapes, arrows, freehand drawing, and pinned comments tied to exact spots on the page. In Kreatli, markup stays linked to the right page and position alongside your video and other assets, so teams do not lose context in email or separate tools.',
  },
  {
    question: 'How do I add PDF markup in Kreatli?',
    answer:
      "Upload your PDF to a Kreatli project and open it in the review interface. Select the area you want to mark up, then add a comment, highlight, shape, or drawing. Your markup is attached to that exact location. When you're ready, share a review link so clients can add markup without creating an account.",
  },
  {
    question: 'Can clients add PDF markup without creating an account?',
    answer:
      'Yes. Kreatli offers no-signup guest review links for PDFs (and video). Send a secure link; recipients open the file, add markup and notes, and submit feedback without signing up.',
  },
  {
    question: 'What types of PDF markup can I use?',
    answer:
      'You can add text comments pinned to specific spots, highlights and shapes to mark regions, arrows and markers to point to elements, and freehand drawing where needed. Feedback can be color-coded. Everything stays tied to the exact page and position.',
  },
  {
    question: 'How do I track resolved markup on a PDF?',
    answer:
      'Kreatli tracks resolution for every comment and mark. Mark items resolved or unresolved, filter to open work, and clear items as new PDF versions arrive so rounds stay organized.',
  },
  {
    question: 'Can multiple people markup the same PDF?',
    answer:
      'Yes. Multiple reviewers can markup the same PDF. Each person’s marks are visible with clear attribution. Filter by reviewer and track resolution across internal teams and guest links.',
  },
  {
    question: 'Why use Kreatli for PDF markup instead of a standalone editor?',
    answer:
      'Kreatli keeps PDF markup in one workspace with video, images, and deliverables—one project timeline, one set of review links, and one approval flow instead of juggling separate PDF apps and threads.',
  },
  {
    question: 'How does PDF markup help creative and marketing workflows?',
    answer:
      'Markup makes feedback visual and location-specific. Instead of “change the headline on page 3,” reviewers point to the spot. Writers and designers see exactly what to change, and clients can markup via link without accounts—speeding approvals and cutting revision cycles.',
  },
];

export default function PdfMarkupPage() {
  useSession();
  const articles = getPlatformArticles('/platform/pdf-markup');

  return (
    <>
      <Head>
        <title>PDF Markup for Creative Teams | Kreatli Platform</title>
        <meta
          name="description"
          content="PDF markup with comments, highlights, and drawings tied to exact pages and spots. Keep feedback in one workspace with video and creative assets."
        />
        <link rel="canonical" href="https://kreatli.com/platform/pdf-markup" />
        <meta property="og:url" content="https://kreatli.com/platform/pdf-markup" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="PDF Markup for Creative Teams | Kreatli Platform" />
        <meta
          property="og:description"
          content="PDF markup with comments, highlights, and drawings tied to exact pages and spots. Keep feedback in one workspace with video and creative assets."
        />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:secure_url" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:alt" content="PDF Markup for Creative Teams | Kreatli Platform" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PDF Markup for Creative Teams | Kreatli Platform" />
        <meta
          name="twitter:description"
          content="PDF markup with comments, highlights, and drawings tied to exact pages and spots. Keep feedback in one workspace with video and creative assets."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
      </Head>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Platform', url: '/platform' },
          { name: 'PDF Markup', url: '/platform/pdf-markup' },
        ]}
      />
      <FAQStructuredData faqs={faqs} />
      <Header />
      <Decorations />

      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h1 className="mx-auto max-w-lg font-sans text-3xl font-bold leading-tight sm:text-4xl sm:leading-tight">
              PDF Markup
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground-500">
              Add PDF markup with comments, highlights, and drawings. Review and collaborate with precise, page-pinned
              feedback in one place with your video and creative assets.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button as={NextLink} href="/sign-up" size="lg" className="bg-foreground text-content1">
                Start 7-day trial
              </Button>
              <Button
                as="a"
                href="https://calendar.app.google/NXbAeTAUwaBGh5x49"
                target="_blank"
                rel="noopener noreferrer nofollow"
                size="lg"
                variant="bordered"
              >
                Book a Demo
              </Button>
            </div>
          </div>
          <PlatformInteractiveReviewPreview variant="pdf" />
        </div>
      </section>

      <PlatformDefinitionBlock href="/platform/pdf-markup" />
      <PlatformStepGuide
        stepsSectionTitle="How to add PDF markup in Kreatli"
        stepsIntro="Follow these steps to upload your PDF, add markup, and share for review—all in one place."
        steps={ANNOTATE_PDF_STEPS}
        completeGuide={{
          href: '/guides/how-to-markup-a-pdf',
          description: 'Step-by-step: how to mark up a PDF with shapes, arrows, and clear review feedback.',
        }}
      />

      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Ways to Mark Up PDFs</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Use comments, highlights, and drawing tools to give precise feedback on every page.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="chat" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Pinned comments</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Pin text to exact spots on any page so there is no guesswork about what to change.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="paint" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Highlights & shapes</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Highlight text or mark regions that need attention on layouts and documents.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="arrowRight" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Arrows & markers</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Point to specific elements for design feedback and copy edits.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="paint" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Color-coded feedback</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Organize markup by reviewer, priority, or feedback type with consistent colors.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="group" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Multi-reviewer markup</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Teams and clients markup the same PDF with clear attribution in one thread.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="checkCircle" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Resolution tracking</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Mark items resolved or open and track what still needs attention across rounds.
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
              Related PDF features
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-center text-sm text-foreground-500">
              Explore annotate, highlight, comments, and drawing workflows:
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
                href="/platform/add-comments-to-pdf"
                size="md"
                className="bg-foreground font-medium text-content1 hover:opacity-90"
                endContent={<Icon icon="arrowRight" size={16} />}
              >
                Add Comments to PDF
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

      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Why PDF Markup in Kreatli</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Keep markup precise, location-based, and tied to projects so revisions move faster.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="eye" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Clearer feedback</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Markup points to the exact spot—less back-and-forth than text-only comments alone.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="arrowRight" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Fewer revision rounds</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Designers and writers act faster when every mark is anchored to the page.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="group" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">One workspace</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  PDF markup lives next to video and images with one review link and approval flow.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="smile" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Client-friendly</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Guests markup PDFs via secure links without creating an account.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      <MoreFreeToolsSection
        title="Free Tools for Creative Teams"
        description="Explore free tools that pair with PDF markup and creative review."
        tools={getFreeToolsForPlatform('/platform/pdf-markup')}
      />

      <ResourcesArticlesPreviewSection
        articles={articles}
        title="See How This Works in Practice"
        description="Explore guides and comparisons that show how teams mark up PDFs and manage review in Kreatli."
      />

      <PricingSection />

      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Answers about PDF markup and review workflows in Kreatli.
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
              Contact us at{' '}
              <a href="mailto:support@kreatli.com" className="font-medium text-primary underline underline-offset-2">
                support@kreatli.com
              </a>{' '}
              to learn how Kreatli can help with PDF markup and approvals.
            </p>
          </div>
        </div>
      </section>

      <RelatedResourcesSection
        resources={getRelatedResources(['reviewApproval', 'creativeProofing', 'videoAnnotation'])}
        title="More Resources"
        description="Explore other Kreatli platform features to streamline your review and collaboration workflow."
      />

      <CTASection
        title="Ready for clearer PDF markup?"
        description="Mark up PDFs with comments, highlights, and drawings in one place with your team and clients."
      />
      <FooterSection hideCta={true} />
      <SignUpModal />
    </>
  );
}
