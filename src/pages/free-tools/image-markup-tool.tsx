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
import { getFreeToolsForFreeToolPage } from '../../data/free-tools-page-tools';
import { RelatedResourcesSection } from '../../components/shared/RelatedResourcesSection';
import { ImageAnnotatorFAQ, imageAnnotatorFaqs } from '../../components/image-annotator/ImageAnnotatorFAQ';
import { ImageAnnotatorGuide } from '../../components/image-annotator/ImageAnnotatorGuide';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';

export default function ImageMarkupToolPage() {
  useSession();

  return (
    <>
      <Head>
        <title>Image Markup Tool Online – Mark Up Images Free | Kreatli</title>
        <meta
          name="description"
          content="Use a free image markup tool: pinned comments, highlights, drawings, and markup on stills. Share review links with clients. Try with a 7-day trial."
        />
        <meta property="og:title" content="Image Markup Tool Online – Mark Up Images Free | Kreatli" />
        <meta
          property="og:description"
          content="Use a free image markup tool: pinned comments, highlights, drawings, and markup on stills. Share review links with clients. Try with a 7-day trial."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kreatli.com/free-tools/image-markup-tool" />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Image Markup Tool Online – Mark Up Images Free | Kreatli" />
        <meta
          name="twitter:description"
          content="Use a free image markup tool: pinned comments, highlights, drawings, and markup on stills. Share review links with clients. Try with a 7-day trial."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
        <link rel="canonical" href="https://kreatli.com/free-tools/image-markup-tool" />
      </Head>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Free Tools', url: '/free-tools' },
          { name: 'Image Markup Tool', url: '/free-tools/image-markup-tool' },
        ]}
      />
      <FAQStructuredData faqs={imageAnnotatorFaqs} />
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
            <h1 className="mx-auto max-w-lg font-sans text-3xl font-bold sm:text-4xl">Image Markup Tool</h1>
            <p className="mx-auto max-w-3xl text-lg text-foreground-500">
              Mark up images with location-pinned comments, highlights, drawings, and visual markup. Give designers and
              retouchers pixel-level direction—no install required for reviewers.
            </p>
            <HeroCtaButtons />
          </div>
        </section>

        <section className="relative overflow-hidden px-6 pb-12">
          <div className="relative z-10 mx-auto max-w-6xl">
            <FreeToolsEntitlementSection>
              <InteractiveReviewToolPreview variant="image" />
            </FreeToolsEntitlementSection>
          </div>
        </section>

        <DefinitionBlock term="Image markup tool">
          An image markup tool adds visual marks and notes directly on a still—boxes, arrows, highlights, and
          freehand—each anchored to the right pixels. It turns vague feedback into a map editors can follow.
        </DefinitionBlock>

        <ImageAnnotatorGuide />

        <MoreFreeToolsSection
          tools={getFreeToolsForFreeToolPage('/free-tools/image-markup-tool')}
          title="More Tools for Creative Teams"
        />

        <ImageAnnotatorFAQ />

        <RelatedResourcesSection
          resources={getRelatedResources(['annotateImage', 'drawOnImage', 'reviewApproval', 'secureAssetStorage'])}
          title="More Resources"
          description="Explore other Kreatli platform features for image markup, review, and collaboration."
        />

        <CTASection
          title="Ready to mark up images with your team?"
          description="Kreatli offers location-pinned image markup, drawing on images, and approval workflows in one workspace with your video and creative assets."
          primaryButtonText="Start 7-day trial"
        />
      </main>

      <FooterSection hideCta />
      <SignUpModal />
    </>
  );
}
