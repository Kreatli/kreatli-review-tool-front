import { Accordion, AccordionItem, Button } from '@heroui/react';
import Head from 'next/head';
import NextLink from 'next/link';

import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';
import { FooterSection } from '../../components/home/Footer/FooterSection';
import { PricingSection } from '../../components/home/PricingSection/PricingSection';
import { Header } from '../../components/layout/Header';
import { Decorations } from '../../components/layout/Storyblok/Decorations';
import { BreadcrumbStructuredData } from '../../components/shared/BreadcrumbStructuredData';
import { CTASection } from '../../components/shared/CTASection';
import { EmbedVideoFeatureCardSections } from '../../components/shared/EmbedVideoFeatureCardSections';
import { FAQStructuredData } from '../../components/shared/FAQStructuredData';
import { InteractiveReviewToolPreview } from '../../components/shared/InteractiveReviewToolPreview';
import { MoreFreeToolsSection } from '../../components/shared/MoreFreeToolsSection';
import { RelatedResourcesSection } from '../../components/shared/RelatedResourcesSection';
import { ResourcesArticlesPreviewSection } from '../../components/shared/ResourcesArticlesPreviewSection';
import { EMBED_VIDEO_PLATFORM_FAQS } from '../../data/embed-video-marketing';
import { getPlatformArticles } from '../../data/platform-articles';
import { getFreeToolsForPlatform } from '../../data/platform-free-tools';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';
import { PlatformDefinitionBlock } from '../../components/shared/PlatformDefinitionBlock';

export default function EmbedVideoPage() {
  useSession();
  const articles = getPlatformArticles('/platform/embed-video');

  return (
    <>
      <Head>
        <title>Embed Your Video - Free Video Embedder | Kreatli</title>
        <meta
          name="description"
          content="Embed your videos with Kreatli’s free video embedder. Share responsive, review-ready video embeds with frame-accurate comments, approvals, and version history built in."
        />
        <link rel="canonical" href="https://kreatli.com/platform/embed-video" />
        <meta property="og:url" content="https://kreatli.com/platform/embed-video" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Kreatli | Embed Your Video – Free Video Embedder for Review & Approvals" />
        <meta
          property="og:description"
          content="Use Kreatli as your free video embedder. Embed videos with built-in frame-accurate comments, approvals, and versioning for clients and stakeholders."
        />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:secure_url" content="https://kreatli.com/og-image.png" />
        <meta
          property="og:image:alt"
          content="Kreatli | Embed Your Video – Free Video Embedder for Review & Approvals"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kreatli | Embed Your Video – Free Video Embedder for Review & Approvals" />
        <meta
          name="twitter:description"
          content="Embed your videos with Kreatli’s free video embedder and keep feedback, comments, and approvals connected to every embedded view."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
      </Head>

      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Platform', url: '/platform' },
          { name: 'Embed Video', url: '/platform/embed-video' },
        ]}
      />
      <FAQStructuredData faqs={EMBED_VIDEO_PLATFORM_FAQS} />
      <Header />
      <Decorations />

      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h1 className="mx-auto max-w-2xl font-sans text-3xl font-bold leading-tight sm:text-4xl sm:leading-tight">
              Embed Your Videos With Built-In Review &amp; Approvals
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground-500">
              Use Kreatli as your free video embedder. Share embedded, review-ready videos with frame-accurate comments,
              drawings, and approvals so stakeholders can respond in context without juggling files or links.
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
          <InteractiveReviewToolPreview />
        </div>
      </section>


      <PlatformDefinitionBlock href="/platform/embed-video" />
      <EmbedVideoFeatureCardSections
        variant="platform"
        destinationsTocLabel="Embed Video in the Tools You Already Use"
        destinationsHeading="Embed Video in the Tools You Already Use"
        destinationsIntro="Drop review-ready video embeds into portals, intranets, docs, and workspaces so stakeholders can watch and comment where they already work—without breaking your feedback workflow."
        whyTocLabel="Why Use a Video Embedder for Reviews?"
        whyHeading="Why Use a Video Embedder for Reviews?"
        whyIntro="Embedding videos where stakeholders already work makes feedback faster, clearer, and easier to track—without adding extra tools or login friction to the process."
      />

      {/* Free Tools Section */}
      <MoreFreeToolsSection
        title="Free Tools for Video Teams"
        description="Explore free tools like our video embedder, link generator, and frame-accurate review features to help your team ship better work faster."
        tools={getFreeToolsForPlatform('/platform/embed-video')}
      />

      {/* Resources Section */}
      <ResourcesArticlesPreviewSection
        articles={articles}
        title="See How Embedded Video Review Works in Practice"
        description="Explore real-world workflows and guides that show how teams embed videos for review, approvals, and collaboration using Kreatli."
      />

      <PricingSection />

      {/* FAQ Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Learn how to embed video for client and stakeholder review with Kreatli and how embedded experiences fit
              into your existing workflows.
            </p>
          </div>
          <Accordion variant="splitted" className="gap-2">
            {EMBED_VIDEO_PLATFORM_FAQS.map((faq) => (
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
              If you did not find the answer you were looking for, reach out to our team at{' '}
              <a href="mailto:support@kreatli.com" className="font-medium text-primary underline underline-offset-2">
                support@kreatli.com
              </a>{' '}
              to learn how embedded video review in Kreatli can support your specific workflow.
            </p>
          </div>
        </div>
      </section>

      {/* More Resources Section */}
      <RelatedResourcesSection
        resources={getRelatedResources(['reviewApproval', 'videoAnnotation', 'secureAssetStorage']).map(
          (resource, index) => {
            if (index === 0) {
              return { ...resource, icon: 'link' };
            }
            if (index === 1) {
              return { ...resource, icon: 'paint' };
            }
            return resource;
          },
        )}
        title="More Resources"
        description="Explore other Kreatli features that support video review, annotation, secure storage, and embedded collaboration workflows."
      />

      {/* CTA Section */}
      <CTASection
        title="Ready to Embed Your Next Client Review?"
        description="Use Kreatli as your free video embedder to share embedded, review-ready videos with frame-accurate comments and approvals built in."
      />

      <FooterSection hideCta={true} />
      <SignUpModal />
    </>
  );
}
