import Head from 'next/head';

import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';
import { DataTransferCalculator } from '../../components/data-transfer-calculator/DataTransferCalculator';
import FAQSection from '../../components/data-transfer-calculator/FAQSection';
import InfoSection from '../../components/data-transfer-calculator/InfoSection';
import { FooterSection } from '../../components/home/Footer/FooterSection';
import { Header } from '../../components/layout/Header';
import { Decorations } from '../../components/layout/Storyblok/Decorations';
import { CTASection } from '../../components/shared/CTASection';
import { MoreFreeToolsSection } from '../../components/shared/MoreFreeToolsSection';
import { RelatedResourcesSection } from '../../components/shared/RelatedResourcesSection';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';

export default function DataTransferCalculatorPage() {
  useSession();

  return (
    <>
      <Head>
        <title>Data Transfer Calculator | Kreatli</title>
        <meta
          name="description"
          content="Free data transfer calculator to estimate upload and download times for large files. Calculate transfer times for video files, media assets, and creative projects. Perfect for video editors, post-production teams, and creative professionals working with heavy media files. Supports MB, GB, TB file sizes and Mbps/Gbps speeds."
        />
        <meta
          name="keywords"
          content="data transfer calculator, upload time calculator, download time calculator, file transfer time, video file upload time, large file transfer, Mbps calculator, internet speed calculator, file size calculator, media transfer calculator, creative workflow tools"
        />
        <meta
          property="og:title"
          content="Data Transfer Calculator – Calculate Upload & Download Time for Large Files | Kreatli"
        />
        <meta
          property="og:description"
          content="Free data transfer calculator to estimate upload and download times for large files. Calculate transfer times for video files, media assets, and creative projects. Perfect for video editors and creative professionals."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kreatli.com/free-tools/data-transfer-calculator" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Data Transfer Calculator – Calculate Upload & Download Time for Large Files | Kreatli"
        />
        <meta
          name="twitter:description"
          content="Free data transfer calculator to estimate upload and download times for large files. Perfect for video editors and creative professionals."
        />
        <link rel="canonical" href="https://kreatli.com/free-tools/data-transfer-calculator" />
      </Head>
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
        {/* Hero Section */}
        <section className="relative overflow-hidden px-6 pb-4 pt-16">
          <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 text-center">
            <h1 className="mx-auto max-w-3xl font-sans text-2xl font-bold sm:text-4xl">Data Transfer Calculator</h1>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500 sm:text-xl">
              Calculate how long it takes to upload or download large files. Perfect for video editors, post-production
              teams, and creative professionals working with heavy media files.
            </p>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="relative overflow-hidden px-6 pb-8">
          <div className="relative z-10 mx-auto max-w-6xl">
            <DataTransferCalculator />
          </div>
        </section>

        {/* Information sections */}
        <InfoSection />

        {/* More Tools for Creative Teams Section */}
        <MoreFreeToolsSection
          excludeHref="/free-tools/data-transfer-calculator"
          title="More Tools for Video Teams"
        />

        {/* FAQ section */}
        <FAQSection />

        {/* More Resources Section */}
        <RelatedResourcesSection
          resources={getRelatedResources(['secureAssetStorage', 'creativeWorkspace', 'blog'])}
          title="More Resources"
          description="Learn more about secure asset storage, video collaboration workflows, and team collaboration."
        />

        {/* CTA Section */}
        <CTASection
          title="Ready to Streamline Your Media Workflows?"
          description="Kreatli helps video teams manage large files, streamline approvals, and collaborate more efficiently. Get started today."
        />
      </main>

      <FooterSection hideCta />
      <SignUpModal />
    </>
  );
}
