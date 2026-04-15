// eslint-disable-next-line simple-import-sort/imports
import Head from 'next/head';

import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';
import { ProjectFeaturePreview } from '../../components/home/Features/ProjectFeaturePreview';
import { FooterSection } from '../../components/home/Footer/FooterSection';
import { Header } from '../../components/layout/Header';
import { Decorations } from '../../components/layout/Storyblok/Decorations';
import { BreadcrumbStructuredData } from '../../components/shared/BreadcrumbStructuredData';
import { CTASection } from '../../components/shared/CTASection';
import { FAQStructuredData } from '../../components/shared/FAQStructuredData';
import { FreeToolsEntitlementSection } from '../../components/shared/FreeToolsEntitlementSection';
import { HeroCtaButtons } from '../../components/shared/HeroCtaButtons';
import { MoreFreeToolsSection } from '../../components/shared/MoreFreeToolsSection';
import { getFreeToolsForFreeToolPage } from '../../data/free-tools-page-tools';
import { RelatedResourcesSection } from '../../components/shared/RelatedResourcesSection';
import { VideoManagerFAQ, videoManagerFaqs } from '../../components/video-manager/VideoManagerFAQ';
import { VideoManagerGuide } from '../../components/video-manager/VideoManagerGuide';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';
import { DefinitionBlock } from '../../components/shared/DefinitionBlock';

export default function VideoManagerPage() {
  useSession();

  return (
    <>
      <Head>
        <title>Manage Video Assets Online – Free Video Manager | Kreatli</title>
        <meta
          name="description"
          content="Organize, store, and track video assets with version control and share links. Manage feedback and approvals in one place. Try free."
        />
<meta property="og:title" content="Manage Video Assets Online – Free Video Manager | Kreatli" />
        <meta
          property="og:description"
          content="Organize, store, and track video assets with version control and share links. Manage feedback and approvals in one place. Try free."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kreatli.com/free-tools/video-manager" />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Manage Video Assets Online – Free Video Manager | Kreatli" />
        <meta
          name="twitter:description"
          content="Organize, store, and track video assets with version control and share links. Manage feedback and approvals in one place. Try free."
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
            <HeroCtaButtons />
          </div>
        </section>


        <DefinitionBlock term="Video Manager">
          A video manager organizes clips, versions, and review status in one workspace instead of scattered folders. It helps producers track what is current, what is approved, and what still needs client input.
        </DefinitionBlock>
        {/* Project / media storage feature preview */}
        <section className="relative px-6 pb-16 pt-6">
          <div className="relative z-10 mx-auto max-w-6xl">
            <FreeToolsEntitlementSection
              lockedTitle="Video Manager is available inside Kreatli"
              lockedDescription="Your trial or plan isn’t active. Start a trial or choose a plan to manage video assets in Kreatli."
            >
              <ProjectFeaturePreview />
            </FreeToolsEntitlementSection>
          </div>
        </section>

        <VideoManagerGuide />

        {/* Related tools */}
        <MoreFreeToolsSection
          tools={getFreeToolsForFreeToolPage('/free-tools/video-manager')}
          title="More Tools for Video Teams"
        />

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
          primaryButtonText="Start 7-day trial"
        />
      </main>

      <FooterSection hideCta />
      <SignUpModal />
    </>
  );
}
