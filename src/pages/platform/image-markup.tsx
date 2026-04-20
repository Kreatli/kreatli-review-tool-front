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
  ANNOTATE_IMAGE_STEPS,
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
    question: 'What is image markup?',
    answer:
      'Image markup is visual feedback on a still—pinned comments, highlights, shapes, arrows, and freehand drawing tied to exact pixels. In Kreatli, image markup stays on the source asset next to video and PDFs so teams keep one approval flow and clear version context.',
  },
  {
    question: 'How do I add image markup in Kreatli?',
    answer:
      "Upload your image to a Kreatli project and open it in review. Select the area to mark up, then add a comment, highlight, or drawing. Everything attaches to that location. Share a review link so clients can add markup without creating an account.",
  },
  {
    question: 'Can clients markup images without creating an account?',
    answer:
      'Yes. Guest review links let clients open the image, add markup, and reply in the same thread—no signup required.',
  },
  {
    question: 'What types of image markup can I use?',
    answer:
      'Pinned text, highlights and shapes for regions, arrows and markers, and freehand drawing. Color-code by reviewer or feedback type. All marks stay tied to the exact position.',
  },
  {
    question: 'What image formats support markup in Kreatli?',
    answer:
      'Common formats including JPG, PNG, GIF, WebP, and other standard image files. Feedback stays pinned correctly across resolutions.',
  },
  {
    question: 'Can multiple people markup the same image?',
    answer:
      'Yes. Multiple reviewers can markup simultaneously with attribution, filtering, and resolution tracking—internally or via guest links.',
  },
  {
    question: 'Why use Kreatli for image markup instead of screenshots?',
    answer:
      'Markup lives on the source file in the project—not a flattened screenshot—so zoom, versions, and approvals stay organized with the rest of your deliverables.',
  },
  {
    question: 'How does image markup help design workflows?',
    answer:
      'Markup removes ambiguity: reviewers point to the exact edge, glyph, or crop. Designers act faster, rounds stay organized, and clients can approve what they see.',
  },
];

export default function ImageMarkupPage() {
  useSession();
  const articles = getPlatformArticles('/platform/image-markup');

  return (
    <>
      <Head>
        <title>Image Markup for Creative Teams | Kreatli Platform</title>
        <meta
          name="description"
          content="Image markup with pinned comments, highlights, and drawings on stills. Keep visual feedback tied to projects, versions, and approvals."
        />
        <link rel="canonical" href="https://kreatli.com/platform/image-markup" />
        <meta property="og:url" content="https://kreatli.com/platform/image-markup" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Image Markup for Creative Teams | Kreatli Platform" />
        <meta
          property="og:description"
          content="Image markup with pinned comments, highlights, and drawings on stills. Keep visual feedback tied to projects, versions, and approvals."
        />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:secure_url" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:alt" content="Image Markup for Creative Teams | Kreatli Platform" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Image Markup for Creative Teams | Kreatli Platform" />
        <meta
          name="twitter:description"
          content="Image markup with pinned comments, highlights, and drawings on stills. Keep visual feedback tied to projects, versions, and approvals."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
      </Head>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Platform', url: '/platform' },
          { name: 'Image Markup', url: '/platform/image-markup' },
        ]}
      />
      <FAQStructuredData faqs={faqs} />
      <Header />
      <Decorations />

      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h1 className="mx-auto max-w-lg font-sans text-3xl font-bold leading-tight sm:text-4xl sm:leading-tight">
              Image Markup
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground-500">
              Mark up images with comments, highlights, and drawing tools. Give pixel-level feedback in one workspace with
              your video and creative assets.
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
          <PlatformInteractiveReviewPreview variant="image" />
        </div>
      </section>

      <PlatformDefinitionBlock href="/platform/image-markup" />
      <PlatformStepGuide
        stepsSectionTitle="How to add image markup in Kreatli"
        stepsIntro="Follow these steps to upload your image, add markup, and share for review—all in one place."
        steps={ANNOTATE_IMAGE_STEPS}
        completeGuide={{
          href: '/guides/how-to-markup-an-image',
          description: 'Step-by-step: how to markup an image with pins, shapes, and clear review feedback.',
        }}
      />

      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Ways to Mark Up Images</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Combine pins, highlights, and shapes so feedback is impossible to misread.
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
                  Attach notes to exact coordinates on the image for unambiguous direction.
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
                  Mark regions, crops, and layout areas that need changes.
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
                  Point to logos, type, or product details that need attention.
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
                  Keep markup organized by reviewer, priority, or category.
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
                  See everyone’s marks in one view with clear attribution.
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
                  Resolve markup as revisions land so open work stays obvious.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mx-auto w-fit max-w-full rounded-2xl border border-foreground-200 bg-content1/60 px-6 py-8 shadow-sm backdrop-blur-sm">
            <h2 className="text-center font-sans text-lg font-semibold text-foreground-700">Related image features</h2>
            <p className="mx-auto mt-2 max-w-xl text-center text-sm text-foreground-500">
              Deep dives on annotation and drawing on stills:
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button
                as={NextLink}
                href="/platform/annotate-image"
                size="md"
                className="bg-foreground font-medium text-content1 hover:opacity-90"
                endContent={<Icon icon="arrowRight" size={16} />}
              >
                Annotate Image
              </Button>
              <Button
                as={NextLink}
                href="/platform/draw-on-image"
                size="md"
                className="bg-foreground font-medium text-content1 hover:opacity-90"
                endContent={<Icon icon="arrowRight" size={16} />}
              >
                Draw on Image
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Why Image Markup in Kreatli</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Keep markup precise and tied to projects so design rounds stay short.
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
                  Markup points to the exact pixels—not a vague region in chat.
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
                  Designers act immediately when every mark is anchored to the file.
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
                  Images, video, and PDFs share one review link and approval flow.
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
                  Guests markup via secure links without creating an account.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      <MoreFreeToolsSection
        title="Free Tools for Creative Teams"
        description="Explore free tools that pair with image markup and creative review."
        tools={getFreeToolsForPlatform('/platform/image-markup')}
      />

      <ResourcesArticlesPreviewSection
        articles={articles}
        title="See How This Works in Practice"
        description="Explore guides and comparisons that show how teams mark up images and manage review in Kreatli."
      />

      <PricingSection />

      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Answers about image markup and review workflows in Kreatli.
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
              for help with image markup and approvals.
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
        title="Ready for clearer image markup?"
        description="Mark up images with comments, highlights, and drawing tools in one place with your team and clients."
      />
      <FooterSection hideCta={true} />
      <SignUpModal />
    </>
  );
}
