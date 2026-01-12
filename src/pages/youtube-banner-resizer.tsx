import Head from 'next/head';

import { SignUpModal } from '../components/auth/SignUpForm/SignUpModal';
import { FooterSection } from '../components/home/Footer/FooterSection';
import { Header } from '../components/layout/Header';
import { Decorations } from '../components/layout/Storyblok/Decorations';
import { BannerGuide } from '../components/youtube-banner-resizer/BannerGuide';
import { YouTubeBannerResizer } from '../components/youtube-banner-resizer/YouTubeBannerResizer';
import { useSession } from '../hooks/useSession';

export default function YouTubeBannerResizerPage() {
  useSession();

  return (
    <>
      <Head>
        <title>YouTube Banner Resizer (Free & Accurate Safe Areas)</title>
        <meta
          name="description"
          content="Resize your YouTube banner online for free. Preview safe areas for mobile, desktop, and TV. Export perfectly sized channel art in seconds."
        />
        <meta property="og:title" content="YouTube Banner Resizer (Free & Accurate Safe Areas)" />
        <meta
          property="og:description"
          content="Resize your YouTube banner online for free. Preview safe areas for mobile, desktop, and TV. Export perfectly sized channel art in seconds."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="YouTube Banner Resizer (Free & Accurate Safe Areas)" />
        <meta
          name="twitter:description"
          content="Resize your YouTube banner online for free. Preview safe areas for mobile, desktop, and TV. Export perfectly sized channel art in seconds."
        />
        <link rel="canonical" href="https://kreatli.com/youtube-banner-resizer" />
      </Head>
      <Header />
      <Decorations />
      <div className="p-6 pb-12">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col gap-4 pb-4 pt-8">
            <h1 className="text-center font-sans text-2xl font-bold sm:text-4xl">YouTube Banner Resizer</h1>
            <p className="mx-auto max-w-2xl text-center text-large text-foreground-500">
              Upload your image and resize it to YouTube's recommended dimensions (2560×1440px). Preview safe areas for
              different devices and export for free.
            </p>
          </div>
          <YouTubeBannerResizer />
        </div>
      </div>
      <BannerGuide />
      <FooterSection hideCta />
      <SignUpModal />
    </>
  );
}
