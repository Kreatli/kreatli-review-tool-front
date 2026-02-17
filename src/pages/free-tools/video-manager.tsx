/* eslint-disable max-len */
import Head from 'next/head';

import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';
import { ProjectFeaturePreview } from '../../components/home/Features/ProjectFeaturePreview';
import { FooterSection } from '../../components/home/Footer/FooterSection';
import { Header } from '../../components/layout/Header';
import { Decorations } from '../../components/layout/Storyblok/Decorations';
import { BreadcrumbStructuredData } from '../../components/shared/BreadcrumbStructuredData';
import { CTASection } from '../../components/shared/CTASection';
import { FAQStructuredData } from '../../components/shared/FAQStructuredData';
import { MoreFreeToolsSection } from '../../components/shared/MoreFreeToolsSection';
import { RelatedResourcesSection } from '../../components/shared/RelatedResourcesSection';
import { VideoManagerFAQ, videoManagerFaqs } from '../../components/video-manager/VideoManagerFAQ';
import { VideoManagerGuide } from '../../components/video-manager/VideoManagerGuide';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';

export default function VideoManagerPage() {
  useSession();

  return (
    <>
      <Head>
        <title>Video Manager - Free Online Tool | Kreatli</title>
        <meta
          name="description"
          content="Free online video manager for creative teams. Organize, store, and track video assets with version control and client share links. No sign-up required for reviewers."
        />
        <meta
          name="keywords"
          content="video manager, manage videos, video organization, video version control, video project management, video storage, video collaboration"
        />
        <meta property="og:title" content="Video Manager - Free Online Tool | Kreatli" />
        <meta
          property="og:description"
          content="Free online video manager for creative teams. Organize, store, and track video assets with version control and client share links. No sign-up required for reviewers."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kreatli.com/free-tools/video-manager" />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Video Manager - Free Online Tool | Kreatli" />
        <meta
          name="twitter:description"
          content="Free online video manager for creative teams. Organize, store, and track video assets with version control and client share links. No sign-up required for reviewers."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
        <link rel="canonical" href="https://kreatli.com/free-tools/video-manager" />
      </Head>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Free Tools', url: '/free-tools' },
          { name: 'Video Manager', url: '/free-tools/video-manager' },
        ]}
      />
      <FAQStructuredData faqs={videoManagerFaqs} />
      <Header />
      <Decorations />

      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        Skip to main content
      </a>

      <main id="main-content">
        {/* Hero */}
        <section className="relative overflow-hidden px-6 pb-4 pt-16">
          <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 text-center">
            <h1 className="mx-auto max-w-lg font-sans text-3xl font-bold sm:text-4xl">Video Manager</h1>
            <p className="mx-auto max-w-3xl text-lg text-foreground-500">
              Organize, store, and track all your video assets in one secure workspace. Manage versions, collect
              feedback, and share with clients—no software installation required for reviewers.
            </p>
          </div>
        </section>

        {/* Project / media storage feature preview */}
        <section className="relative overflow-hidden px-6 pb-16">
          <div className="relative z-10 mx-auto max-w-6xl">
            <ProjectFeaturePreview />
          </div>
        </section>

        <VideoManagerGuide />

        {/* Related tools */}
        <MoreFreeToolsSection excludeHref="/free-tools/video-manager" title="More Tools for Video Teams" />

        <VideoManagerFAQ />

        {/* Related resources */}
        <RelatedResourcesSection
          resources={getRelatedResources([
            'reviewApproval',
            'creativeProofing',
            'videoAnnotation',
            'secureAssetStorage',
          ])}
          title="More Resources"
          description="Explore other Kreatli platform features to streamline your video management and collaboration workflow."
        />

        {/* CTA Section */}
        <CTASection
          title="Ready to manage videos with your team?"
          description="Kreatli combines reliable media storage with project management. Organize, track, and deliver video projects in one secure workspace."
          primaryButtonText="Start for Free"
        />
      </main>

      <FooterSection hideCta />
      <SignUpModal />
    </>
  );
};
