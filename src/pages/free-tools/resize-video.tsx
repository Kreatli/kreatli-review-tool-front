import Head from 'next/head';

import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';
import { FooterSection } from '../../components/home/Footer/FooterSection';
import { Header } from '../../components/layout/Header';
import { Decorations } from '../../components/layout/Storyblok/Decorations';
import { CTASection } from '../../components/shared/CTASection';
import { MoreFreeToolsSection } from '../../components/shared/MoreFreeToolsSection';
import { getFreeToolsForFreeToolPage } from '../../data/free-tools-page-tools';
import { RelatedResourcesSection } from '../../components/shared/RelatedResourcesSection';
import { ResizeVideoTool } from '../../components/resize-video/ResizeVideoTool';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';

export default function ResizeVideoPage() {
  useSession();

  return (
    <>
      <Head>
        <title>Resize Video - Free Tool | Kreatli</title>
        <meta
          name="description"
          content="Resize video to custom or preset dimensions in your browser. No uploads, no sign-up—everything runs locally. Output WebM for quick social or web use."
        />
        <meta
          name="keywords"
          content="resize video, video resizer, change video resolution, resize video online, free video resizer, 1080p 720p video, browser video tool"
        />
        <meta property="og:title" content="Resize Video - Free Tool | Kreatli" />
        <meta
          property="og:description"
          content="Resize video to custom or preset dimensions in your browser. No uploads, no sign-up—everything runs locally."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kreatli.com/free-tools/resize-video" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Resize Video - Free Tool | Kreatli" />
        <meta
          name="twitter:description"
          content="Resize video to custom or preset dimensions in your browser. No uploads, no sign-up."
        />
        <link rel="canonical" href="https://kreatli.com/free-tools/resize-video" />
      </Head>
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
            <h1 className="mx-auto max-w-lg font-sans text-3xl font-bold sm:text-4xl">Resize Video</h1>
            <p className="mx-auto max-w-3xl text-lg text-foreground-500">
              Resize video to custom or preset dimensions in your browser. No uploads, no sign-up—everything runs
              locally.
            </p>
          </div>
        </section>

        <section className="relative overflow-hidden px-6 pb-12">
          <div className="relative z-10 mx-auto max-w-6xl">
            <ResizeVideoTool />
          </div>
        </section>

        <MoreFreeToolsSection tools={getFreeToolsForFreeToolPage('/free-tools/resize-video')} title="More Tools for Video Teams" />

        <RelatedResourcesSection
          resources={getRelatedResources(['reviewApproval', 'creativeWorkspace', 'secureAssetStorage'])}
          title="More Resources"
          description="Learn more about video collaboration workflows, asset review and approvals, and team collaboration."
        />

        <CTASection
          title="Need feedback and approvals on video assets?"
          description="Kreatli is a Video Collaboration & Review Platform for video teams. Upload videos, collect frame-accurate feedback, keep discussions organized, and move projects forward."
          primaryButtonText="Start for Free"
        />
      </main>

      <FooterSection hideCta />
      <SignUpModal />
    </>
  );
}
