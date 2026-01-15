import { Button, Card, CardBody } from '@heroui/react';
import Head from 'next/head';
import NextLink from 'next/link';

import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';
import { FooterSection } from '../../components/home/Footer/FooterSection';
import { Header } from '../../components/layout/Header';
import { Decorations } from '../../components/layout/Storyblok/Decorations';
import { Icon } from '../../components/various/Icon';
import { BannerGuide } from '../../components/youtube-banner-resizer/BannerGuide';
import { YouTubeBannerResizer } from '../../components/youtube-banner-resizer/YouTubeBannerResizer';
import { useSession } from '../../hooks/useSession';

export default function YouTubeBannerResizerPage() {
  useSession();

  return (
    <>
      <Head>
        <title>Free YouTube Banner Resizer Tool | Resize Channel Art 2560×1440px | Kreatli</title>
        <meta
          name="description"
          content="Free YouTube banner resizer tool. Resize your channel art to 2560×1440px with safe area previews for mobile, desktop, tablet, and TV. Export optimized banners instantly—no sign-up required."
        />
        <meta
          name="keywords"
          content="youtube banner resizer, youtube channel art, youtube banner size, 2560x1440, youtube banner maker, free banner tool, channel art resizer, youtube safe area, youtube banner dimensions"
        />
        <meta property="og:title" content="Free YouTube Banner Resizer Tool | Kreatli" />
        <meta
          property="og:description"
          content="Resize your YouTube banner to 2560×1440px with safe area previews. Free tool for creating perfect channel art that looks great on all devices."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kreatli.com/free-tools/youtube-banner-resizer" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free YouTube Banner Resizer Tool | Kreatli" />
        <meta
          name="twitter:description"
          content="Resize your YouTube banner to 2560×1440px with safe area previews. Free tool for creating perfect channel art."
        />
        <link rel="canonical" href="https://kreatli.com/free-tools/youtube-banner-resizer" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'YouTube Banner Resizer',
              description: 'Free online tool to resize YouTube channel banners to 2560×1440px with safe area previews',
              url: 'https://kreatli.com/free-tools/youtube-banner-resizer',
              applicationCategory: 'DesignApplication',
              operatingSystem: 'Web Browser',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              featureList: [
                'Resize images to 2560×1440px',
                'Preview safe areas for all devices',
                'Export in PNG or JPG format',
                'No sign-up required',
                'Privacy-first (all processing in browser)',
              ],
            }),
          }}
        />
      </Head>
      <Header />
      <Decorations />
      <div className="p-6 pb-12">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col gap-4 pb-4 pt-8">
            <h1 className="text-center font-sans text-2xl font-bold sm:text-4xl">Free YouTube Banner Resizer</h1>
            <p className="mx-auto max-w-2xl text-center text-large text-foreground-500">
              Resize your YouTube channel art to the perfect dimensions (2560×1440px). Preview safe areas for mobile,
              desktop, tablet, and TV devices. Export your optimized banner instantly—completely free, no sign-up
              required.
            </p>
          </div>
          <YouTubeBannerResizer />
        </div>
      </div>
      <BannerGuide />

      {/* Related Tools Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-4xl">More Free Tools for Video Teams</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Explore our collection of free tools designed to help creative professionals work more efficiently.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <NextLink 
              href="/social-media-safe-zone-checker" 
              className="h-full group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg transition-all"
              aria-label="Try Social Media Safe Zone Checker"
            >
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group-hover:border-primary/20 border-2 border-transparent">
                <CardBody className="flex flex-col gap-5 p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 p-3.5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <Icon icon="shield" size={24} className="text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="mb-2 font-sans text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        Social Media Safe Zone Checker
                      </h3>
                      <p className="text-sm text-foreground-500 leading-relaxed">
                        Preview where UI overlays appear on Instagram Reels, TikTok videos, and YouTube Shorts to ensure
                        your content stays visible.
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="light"
                    size="sm"
                    className="mt-auto w-fit transition-all duration-200 group-hover:bg-primary/10"
                    endContent={<Icon icon="arrowRight" size={16} className="transition-transform duration-200 group-hover:translate-x-1" />}
                  >
                    Try Now
                  </Button>
                </CardBody>
              </Card>
            </NextLink>

            <NextLink 
              href="/free-tools/data-transfer-calculator" 
              className="h-full group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg transition-all"
              aria-label="Calculate data transfer time"
            >
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group-hover:border-primary/20 border-2 border-transparent">
                <CardBody className="flex flex-col gap-5 p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 p-3.5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <Icon icon="upload" size={24} className="text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="mb-2 font-sans text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        Data Transfer Calculator
                      </h3>
                      <p className="text-sm text-foreground-500 leading-relaxed">
                        Calculate how long it takes to upload or download large files. Perfect for video editors and
                        post-production teams.
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="light"
                    size="sm"
                    className="mt-auto w-fit transition-all duration-200 group-hover:bg-primary/10"
                    endContent={<Icon icon="arrowRight" size={16} className="transition-transform duration-200 group-hover:translate-x-1" />}
                  >
                    Try Now
                  </Button>
                </CardBody>
              </Card>
            </NextLink>

            <NextLink 
              href="/free-tools/cost-calculator" 
              className="h-full group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg transition-all"
              aria-label="Calculate software cost savings"
            >
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group-hover:border-primary/20 border-2 border-transparent">
                <CardBody className="flex flex-col gap-5 p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 p-3.5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <Icon icon="dollar" size={24} className="text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="mb-2 font-sans text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        Software Cost Calculator
                      </h3>
                      <p className="text-sm text-foreground-500 leading-relaxed">
                        Calculate how much you're spending on multiple creative tools and see how much you could save by
                        consolidating with Kreatli.
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="light"
                    size="sm"
                    className="mt-auto w-fit transition-all duration-200 group-hover:bg-primary/10"
                    endContent={<Icon icon="arrowRight" size={16} className="transition-transform duration-200 group-hover:translate-x-1" />}
                  >
                    Try Now
                  </Button>
                </CardBody>
              </Card>
            </NextLink>
          </div>

          <div className="mt-10 text-center">
            <Button 
              as={NextLink} 
              href="/free-tools" 
              variant="bordered" 
              size="lg"
              className="border-foreground-200 hover:border-primary hover:bg-primary/5 transition-all duration-200 hover:shadow-md px-8 group"
              endContent={<Icon icon="arrowRight" size={18} className="transition-transform duration-200 group-hover:translate-x-1" />}
            >
              View All Free Tools
            </Button>
          </div>
        </div>
      </section>

      {/* Related Resources Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-4xl">Related Resources</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Learn more about creative production workflows, asset management, and team collaboration.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <NextLink href="/platform/creative-workspace" className="h-full group">
              <Card className="h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-lg border-foreground-200 hover:border-primary/20">
                <CardBody className="flex flex-col gap-4 p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 p-3 group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                      <Icon icon="folder" size={24} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-2 font-sans text-lg font-semibold group-hover:text-primary transition-colors duration-200">
                        Creative Workspace
                      </h3>
                      <p className="text-sm leading-relaxed text-foreground-500">
                        Unified workspace for creative production. Organize assets, manage projects, and collaborate
                        with your team.
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="light"
                    size="sm"
                    className="mt-auto w-fit group-hover:bg-primary/10 transition-all duration-200"
                    endContent={
                      <Icon
                        icon="arrowRight"
                        size={16}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    }
                  >
                    Learn More
                  </Button>
                </CardBody>
              </Card>
            </NextLink>

            <NextLink href="/platform/review-approval" className="h-full group">
              <Card className="h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-lg border-foreground-200 hover:border-primary/20">
                <CardBody className="flex flex-col gap-4 p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 p-3 group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                      <Icon icon="paint" size={24} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-2 font-sans text-lg font-semibold group-hover:text-primary transition-colors duration-200">
                        Review & Approval
                      </h3>
                      <p className="text-sm leading-relaxed text-foreground-500">
                        Frame-accurate revisions and approvals for video content. Streamline your feedback workflow.
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="light"
                    size="sm"
                    className="mt-auto w-fit group-hover:bg-primary/10 transition-all duration-200"
                    endContent={
                      <Icon
                        icon="arrowRight"
                        size={16}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    }
                  >
                    Learn More
                  </Button>
                </CardBody>
              </Card>
            </NextLink>

            <NextLink href="/blog" className="h-full group">
              <Card className="h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-lg border-foreground-200 hover:border-primary/20">
                <CardBody className="flex flex-col gap-4 p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 p-3 group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                      <Icon icon="file" size={24} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-2 font-sans text-lg font-semibold group-hover:text-primary transition-colors duration-200">
                        Kreatli Blog
                      </h3>
                      <p className="text-sm leading-relaxed text-foreground-500">
                        Insights, tips, and best practices for creative teams. Discover strategies to streamline your
                        workflow.
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="light"
                    size="sm"
                    className="mt-auto w-fit group-hover:bg-primary/10 transition-all duration-200"
                    endContent={
                      <Icon
                        icon="arrowRight"
                        size={16}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    }
                  >
                    Read Articles
                  </Button>
                </CardBody>
              </Card>
            </NextLink>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="overflow-hidden bg-foreground-50 px-6 py-16 lg:py-24">
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col gap-6 text-center">
          <h2 className="mx-auto max-w-lg font-sans text-2xl font-bold sm:text-4xl">
            Working with YouTube videos, assets, and feedback at scale?
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-foreground-500">
            <NextLink href="/" className="text-primary hover:underline">
              Kreatli
            </NextLink>{' '}
            is a production management platform built for creative teams. Manage your YouTube content, coordinate with
            team members, and streamline your creative workflow. Learn more about{' '}
            <NextLink href="/platform/creative-workspace" className="text-primary hover:underline">
              our creative workspace
            </NextLink>{' '}
            and{' '}
            <NextLink href="/platform/review-approval" className="text-primary hover:underline">
              review & approval features
            </NextLink>
            .
          </p>
          <div className="mt-4 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button as={NextLink} href="/sign-up" size="lg" className="bg-foreground text-content1">
              Start for Free
            </Button>
            <Button
              as="a"
              href="https://calendar.app.google/NXbAeTAUwaBGh5x49"
              target="_blank"
              size="lg"
              variant="bordered"
            >
              Book a Demo
            </Button>
          </div>
        </div>
      </section>
      <FooterSection hideCta />
      <SignUpModal />
    </>
  );
}
