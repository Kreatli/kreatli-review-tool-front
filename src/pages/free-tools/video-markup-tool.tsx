/* eslint-disable max-len */
import Head from 'next/head';
import NextLink from 'next/link';

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
import { VideoAnnotatorFAQ, videoAnnotatorFaqs } from '../../components/video-annotator/VideoAnnotatorFAQ';
import { VideoAnnotatorGuide } from '../../components/video-annotator/VideoAnnotatorGuide';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';

export default function VideoMarkupToolPage() {
  useSession();

  return (
    <>
      <Head>
        <title>Video Markup Tool Online – Frame-Accurate Markup Free | Kreatli</title>
        <meta
          name="description"
          content="Use a free video markup tool: frame-accurate comments, drawings, and markup on your timeline. Share review links with clients. Try with a 7-day trial."
        />
        <meta property="og:title" content="Video Markup Tool Online – Frame-Accurate Markup Free | Kreatli" />
        <meta
          property="og:description"
          content="Use a free video markup tool: frame-accurate comments, drawings, and markup on your timeline. Share review links with clients. Try with a 7-day trial."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kreatli.com/free-tools/video-markup-tool" />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Video Markup Tool Online – Frame-Accurate Markup Free | Kreatli" />
        <meta
          name="twitter:description"
          content="Use a free video markup tool: frame-accurate comments, drawings, and markup on your timeline. Share review links with clients. Try with a 7-day trial."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
        <link rel="canonical" href="https://kreatli.com/free-tools/video-markup-tool" />
      </Head>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Free Tools', url: '/free-tools' },
          { name: 'Video Markup Tool', url: '/free-tools/video-markup-tool' },
        ]}
      />
      <FAQStructuredData faqs={videoAnnotatorFaqs} />
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
            <h1 className="mx-auto max-w-lg font-sans text-3xl font-bold sm:text-4xl">Video Markup Tool</h1>
            <p className="mx-auto max-w-3xl text-lg text-foreground-500">
              Mark up video with frame-accurate pins, drawings, and notes on the picture. Editors see exactly which frame
              and region you mean—no install required for reviewers.
            </p>
            <HeroCtaButtons />
          </div>
        </section>

        <section className="relative overflow-hidden px-6 pb-12">
          <div className="relative z-10 mx-auto max-w-6xl">
            <FreeToolsEntitlementSection>
              <InteractiveReviewToolPreview variant="video" />
            </FreeToolsEntitlementSection>
          </div>
        </section>

        <DefinitionBlock term="Video markup tool">
          A video markup tool pins visual feedback to specific frames—drawings, shapes, arrows, and comments that appear
          at the right moment in playback. It replaces “around 1:12” with an unambiguous target for editors and clients.
        </DefinitionBlock>

        <VideoAnnotatorGuide />

        <MoreFreeToolsSection
          tools={getFreeToolsForFreeToolPage('/free-tools/video-markup-tool')}
          title="More Tools for Video Teams"
        />

        <VideoAnnotatorFAQ />

        <RelatedResourcesSection
          resources={getRelatedResources(['videoAnnotation', 'reviewApproval', 'commentOnVideo', 'creativeWorkspace'])}
          title="More Resources"
          description="Explore other Kreatli platform features for video markup, review, and collaboration."
        />

        <div className="mx-auto max-w-4xl px-6 pb-8 text-center">
          <p className="text-base text-foreground-500">
            Wondering how Kreatli compares?{' '}
            <NextLink
              href="/comparisons/best-video-review-platforms"
              className="font-medium text-primary underline-offset-2 hover:underline"
            >
              See the best video review platforms for creative teams →
            </NextLink>
          </p>
        </div>

        <CTASection
          title="Ready to mark up video with your team?"
          description="Kreatli offers frame-accurate video markup, drawing on video, and approval workflows—all in one place."
          primaryButtonText="Start 7-day trial"
        />
      </main>

      <FooterSection hideCta />
      <SignUpModal />
    </>
  );
}
