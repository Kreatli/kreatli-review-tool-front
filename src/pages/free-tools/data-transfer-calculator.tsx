import { Button, Card, CardBody } from '@heroui/react';
import Head from 'next/head';
import NextLink from 'next/link';

import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';
import { DataTransferCalculator } from '../../components/data-transfer-calculator/DataTransferCalculator';
import FAQSection from '../../components/data-transfer-calculator/FAQSection';
import InfoSection from '../../components/data-transfer-calculator/InfoSection';
import { FooterSection } from '../../components/home/Footer/FooterSection';
import { Header } from '../../components/layout/Header';
import { Decorations } from '../../components/layout/Storyblok/Decorations';
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
          text: 'Upload time for 100GB depends on your internet connection speed. On a typical 100 Mbps connection, uploading 100GB takes approximately 2 hours and 50 minutes, accounting for network overhead. On a faster 1 Gbps connection, the same file would take about 17 minutes.',
        },
      },
      {
        '@type': 'Question',
        name: 'What internet speed do I need for video work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "For professional video work, especially with remote collaboration, you'll want at least 100 Mbps upload speed for efficient workflows. This allows you to upload a 10GB file in about 17 minutes, which is reasonable for most production timelines.",
        },
      },
      {
        '@type': 'Question',
        name: 'Why is my upload slower than my download?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most internet service providers offer asymmetric connections, where download speeds are significantly faster than upload speeds. This is because typical internet usage (browsing, streaming, downloading) requires more download bandwidth than upload bandwidth.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is this data transfer calculator free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes, this data transfer calculator is completely free to use. There's no sign-up required, no account needed, and no hidden fees. The calculator runs entirely in your browser - no data is sent to our servers, and all calculations happen locally on your device.",
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Data Transfer Calculator (Upload & Download Time) | Kreatli</title>
        <meta
          name="description"
          content="Calculate how long it takes to upload or download large files. Free data transfer calculator for video, media, and creative teams."
        />
        <meta property="og:title" content="Data Transfer Calculator (Upload & Download Time) | Kreatli" />
        <meta
          property="og:description"
          content="Calculate how long it takes to upload or download large files. Free data transfer calculator for video, media, and creative teams."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Data Transfer Calculator (Upload & Download Time) | Kreatli" />
        <meta
          name="twitter:description"
          content="Calculate how long it takes to upload or download large files. Free data transfer calculator for video, media, and creative teams."
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
        <section className="relative overflow-hidden px-6 py-8">
          <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-4 text-center">
            <div className="mb-2 text-sm text-foreground-500">
              <NextLink href="/free-tools" className="hover:text-primary">
                Free Tools
              </NextLink>
              {' / '}
              <span className="text-foreground-700">Data Transfer Calculator</span>
            </div>
            <h1 className="mx-auto max-w-2xl font-sans text-2xl font-bold sm:text-3xl">Data Transfer Calculator</h1>
            <p className="mx-auto max-w-2xl text-base text-foreground-500 sm:text-lg">
              Calculate how long it takes to upload or download large files. Perfect for video editors, post-production
              teams, and creative professionals working with heavy media files. Part of{' '}
              <NextLink href="/free-tools" className="text-primary underline underline-offset-2">
                Kreatli's free tools for creative teams
              </NextLink>
              .
            </p>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="relative overflow-hidden px-6 pb-8">
          <div className="relative z-10 mx-auto max-w-6xl">
            <DataTransferCalculator />
          </div>
        </section>

        {/* CTA Section - Below Calculator */}
        <section className="relative overflow-hidden px-6 py-12">
          <div className="relative z-10 mx-auto max-w-4xl">
            <Card className="border-foreground-300 bg-foreground-50 dark:border">
              <CardBody className="flex flex-col gap-4 p-6 sm:p-8">
                <p className="text-center text-base text-foreground-600 sm:text-lg">
                  Large files shouldn't slow down approvals, reviews, or collaboration. Kreatli is a{' '}
                  <NextLink href="/platform/secure-asset-storage" className="text-primary underline underline-offset-2">
                    production management platform
                  </NextLink>{' '}
                  designed for creative teams working with heavy media. Learn more about{' '}
                  <NextLink href="/platform/review-approval" className="text-primary underline underline-offset-2">
                    our review and approval workflow
                  </NextLink>{' '}
                  and{' '}
                  <NextLink href="/how-it-works" className="text-primary underline underline-offset-2">
                    how Kreatli works
                  </NextLink>
                  .
                </p>
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Button as={NextLink} href="/sign-up" size="lg" className="bg-foreground text-content1">
                    Manage Media Better with Kreatli
                  </Button>
                  <Button
                    as="a"
                    href="https://calendar.app.google/NXbAeTAUwaBGh5x49"
                    target="_blank"
                    rel="noopener noreferrer"
                    size="lg"
                    variant="bordered"
                  >
                    Book a Demo
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        </section>

        {/* Information sections */}
        <InfoSection />

        {/* FAQ section */}
        <FAQSection />

        {/* Related Resources Section */}
        <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
          <div className="relative z-10 mx-auto max-w-4xl">
            <div className="mb-8 text-center">
              <h2 className="mb-4 font-sans text-2xl font-bold sm:text-4xl">Related Resources</h2>
              <p className="mx-auto max-w-2xl text-lg text-foreground-500">
                Learn more about managing large files, optimizing workflows, and improving creative production
                efficiency.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card isPressable as={NextLink} href="/blog" className="h-full transition-transform hover:scale-[1.02]">
                <CardBody className="p-6">
                  <h3 className="mb-2 font-sans text-lg font-semibold">Blog & Articles</h3>
                  <p className="text-sm text-foreground-500">
                    Read expert insights on creative production, file management, workflow optimization, and industry
                    best practices.
                  </p>
                </CardBody>
              </Card>

              <Card isPressable as={NextLink} href="/guides" className="h-full transition-transform hover:scale-[1.02]">
                <CardBody className="p-6">
                  <h3 className="mb-2 font-sans text-lg font-semibold">Guides & Tutorials</h3>
                  <p className="text-sm text-foreground-500">
                    Step-by-step guides to help creative teams improve their workflows, manage projects, and collaborate
                    more effectively.
                  </p>
                </CardBody>
              </Card>

              <Card
                isPressable
                as={NextLink}
                href="/solutions/use-case/creative-production-management"
                className="h-full transition-transform hover:scale-[1.02]"
              >
                <CardBody className="p-6">
                  <h3 className="mb-2 font-sans text-lg font-semibold">Creative Production Solutions</h3>
                  <p className="text-sm text-foreground-500">
                    Discover how Kreatli helps creative teams manage production workflows, handle large files, and
                    streamline collaboration.
                  </p>
                </CardBody>
              </Card>

              <Card
                isPressable
                as={NextLink}
                href="/platform/integrations"
                className="h-full transition-transform hover:scale-[1.02]"
              >
                <CardBody className="p-6">
                  <h3 className="mb-2 font-sans text-lg font-semibold">Platform Integrations</h3>
                  <p className="text-sm text-foreground-500">
                    See how Kreatli integrates with your existing creative tools to streamline file transfers and
                    workflows.
                  </p>
                </CardBody>
              </Card>

              <Card
                isPressable
                as={NextLink}
                href="/solutions/industry/video-production-animation-studios"
                className="h-full transition-transform hover:scale-[1.02]"
              >
                <CardBody className="p-6">
                  <h3 className="mb-2 font-sans text-lg font-semibold">For Video Production Teams</h3>
                  <p className="text-sm text-foreground-500">
                    Learn how video production and animation studios use Kreatli to manage large media files and
                    streamline post-production.
                  </p>
                </CardBody>
              </Card>

              <Card
                isPressable
                as={NextLink}
                href="/comparisons"
                className="h-full transition-transform hover:scale-[1.02]"
              >
                <CardBody className="p-6">
                  <h3 className="mb-2 font-sans text-lg font-semibold">Tool Comparisons</h3>
                  <p className="text-sm text-foreground-500">
                    Compare Kreatli with other creative production and file management tools to find the best solution
                    for your team.
                  </p>
                </CardBody>
              </Card>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="overflow-hidden bg-foreground-50 px-6 py-16 lg:py-24">
          <div className="relative z-10 mx-auto flex max-w-4xl flex-col gap-3 text-center">
            <h2 className="mx-auto max-w-xl font-sans text-2xl font-bold sm:text-4xl">
              Ready to Streamline Your Media Workflows?
            </h2>
            <p className="mx-auto max-w-xl text-lg text-foreground-500">
              Kreatli helps creative teams manage large files, streamline approvals, and collaborate more efficiently.
              Get started today.
            </p>
            <div className="mt-4 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button as={NextLink} href="/sign-up" size="lg" className="bg-foreground text-content1">
                Get Started for Free
              </Button>
              <Button
                as="a"
                href="https://calendar.app.google/NXbAeTAUwaBGh5x49"
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                variant="bordered"
              >
                Book a Demo
              </Button>
            </div>
          </div>
        </section>
      </main>

      <FooterSection hideCta />
      <SignUpModal />
    </>
  );
}
