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

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How long does it take to upload 100GB?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Upload time for 100GB depends on your internet connection speed. On a typical 100 Mbps connection, uploading 100GB takes approximately 2 hours and 50 minutes, accounting for network overhead. On a faster 1 Gbps connection, the same file would take about 17 minutes. Most home and office connections have slower upload speeds than download speeds. If your upload speed is 50 Mbps (common for many broadband plans), uploading 100GB would take approximately 5 hours and 40 minutes.',
        },
      },
      {
        '@type': 'Question',
        name: 'What internet speed do I need for video work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "For professional video work, especially with remote collaboration, you'll want at least 100 Mbps upload speed for efficient workflows. This allows you to upload a 10GB file in about 17 minutes, which is reasonable for most production timelines. For teams working with larger files (50GB+ projects) or requiring faster turnarounds, 500 Mbps to 1 Gbps upload speeds are recommended.",
        },
      },
      {
        '@type': 'Question',
        name: 'Why is my upload slower than my download?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most internet service providers offer asymmetric connections, where download speeds are significantly faster than upload speeds. This is because typical internet usage (browsing, streaming, downloading) requires more download bandwidth than upload bandwidth. For example, a common broadband plan might offer 500 Mbps download but only 50 Mbps upload - a 10:1 ratio. This asymmetry works fine for most users but creates challenges for creative professionals who regularly upload large video files.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is this data transfer calculator free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes, this data transfer calculator is completely free to use. There's no sign-up required, no account needed, and no hidden fees. The calculator runs entirely in your browser - no data is sent to our servers, and all calculations happen locally on your device. You can use it as often as you need to calculate transfer times for any file size and internet speed combination.",
        },
      },
      {
        '@type': 'Question',
        name: 'How do I calculate file transfer time?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'To calculate file transfer time, you need to know the file size and your internet connection speed. The formula accounts for the difference between bits (used for internet speeds) and bytes (used for file sizes): 1 byte = 8 bits. So 1 MB/s = 8 Mbps. Real-world transfer speeds are slower than theoretical maximums due to network overhead (protocol headers, TCP/IP overhead, network congestion). Our calculator accounts for approximately 85% efficiency, which is a realistic estimate for most internet connections.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between Mbps and MB/s?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Internet speeds are typically measured in Mbps (megabits per second), while file sizes are measured in MB (megabytes) or GB (gigabytes). There is an important distinction: 1 byte = 8 bits, so 1 MB/s = 8 Mbps. This means a 100 Mbps connection can transfer approximately 12.5 MB per second (100 ÷ 8 = 12.5). Understanding this difference is crucial for accurately calculating file transfer times.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does it take to upload a 10GB video file?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Upload time for a 10GB video file depends on your upload speed. On a 100 Mbps connection, uploading 10GB takes approximately 17 minutes, accounting for network overhead. On a 50 Mbps connection (common for many broadband plans), it would take about 34 minutes. On a faster 1 Gbps connection, the same file would take about 1.7 minutes. This is why understanding your actual upload speed is crucial for planning file transfers in video production workflows.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I use this calculator for multiple files?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, our data transfer calculator supports multiple files. You can add multiple files of different sizes and calculate the total transfer time for all files combined. This is useful for video production teams who need to transfer entire project folders, multiple video exports, or batches of media assets. The calculator will show you the total file size and estimated transfer time for all files together.',
        },
      },
    ],
  };


  return (
    <>
      <Head>
        <title>Data Transfer Calculator – Calculate Upload & Download Time for Large Files | Kreatli</title>
        <meta
          name="description"
          content="Free data transfer calculator to estimate upload and download times for large files. Calculate transfer times for video files, media assets, and creative projects. Perfect for video editors, post-production teams, and creative professionals working with heavy media files. Supports MB, GB, TB file sizes and Mbps/Gbps speeds."
        />
        <meta
          name="keywords"
          content="data transfer calculator, upload time calculator, download time calculator, file transfer time, video file upload time, large file transfer, Mbps calculator, internet speed calculator, file size calculator, media transfer calculator, creative workflow tools"
        />
        <meta property="og:title" content="Data Transfer Calculator – Calculate Upload & Download Time for Large Files | Kreatli" />
        <meta
          property="og:description"
          content="Free data transfer calculator to estimate upload and download times for large files. Calculate transfer times for video files, media assets, and creative projects. Perfect for video editors and creative professionals."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kreatli.com/free-tools/data-transfer-calculator" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Data Transfer Calculator – Calculate Upload & Download Time for Large Files | Kreatli" />
        <meta
          name="twitter:description"
          content="Free data transfer calculator to estimate upload and download times for large files. Perfect for video editors and creative professionals."
        />
        <link rel="canonical" href="https://kreatli.com/free-tools/data-transfer-calculator" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Data Transfer Calculator',
              description:
                'Calculate how long it takes to upload or download large files. Free data transfer calculator for video, media, and creative teams.',
              url: 'https://kreatli.com/free-tools/data-transfer-calculator',
              applicationCategory: 'UtilityApplication',
              operatingSystem: 'Web Browser',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              featureList: [
                'Calculate file transfer times',
                'Support for MB, GB, and TB file sizes',
                'Support for Mbps and Gbps speeds',
                'Upload and download calculations',
                'Multiple file support',
                'Network efficiency accounting (85%)',
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
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
        <section className="relative overflow-hidden px-6 pt-16 pb-4">
          <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 text-center">
            <h1 className="mx-auto max-w-3xl font-sans text-2xl font-bold sm:text-4xl">
              Data Transfer Calculator
            </h1>
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
          title="More Tools for Creative Teams"
        />

        {/* FAQ section */}
        <FAQSection />

        {/* More Resources Section */}
        <RelatedResourcesSection
          resources={getRelatedResources(['secureAssetStorage', 'creativeWorkspace', 'blog'])}
          title="More Resources"
          description="Learn more about secure asset storage, creative workflows, and team collaboration."
        />

      {/* CTA Section */}
      <CTASection
        title="Ready to Streamline Your Media Workflows?"
        description="Kreatli helps creative teams manage large files, streamline approvals, and collaborate more efficiently. Get started today."
      />
      </main>

      <FooterSection hideCta />
      <SignUpModal />
    </>
  );
}
