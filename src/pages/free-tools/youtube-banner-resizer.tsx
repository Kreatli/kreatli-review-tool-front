import Head from 'next/head';
import NextLink from 'next/link';

import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';
import { FooterSection } from '../../components/home/Footer/FooterSection';
import { Header } from '../../components/layout/Header';
import { Decorations } from '../../components/layout/Storyblok/Decorations';
import { CTASection } from '../../components/shared/CTASection';
import { MoreFreeToolsSection } from '../../components/shared/MoreFreeToolsSection';
import { RelatedResourcesSection } from '../../components/shared/RelatedResourcesSection';
import { BannerGuide } from '../../components/youtube-banner-resizer/BannerGuide';
import { YouTubeBannerResizer } from '../../components/youtube-banner-resizer/YouTubeBannerResizer';
import { getRelatedResources } from '../../data/related-resources';
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
      <MoreFreeToolsSection excludeHref="/free-tools/youtube-banner-resizer" />

      {/* Related Resources Section */}
      <RelatedResourcesSection
        resources={getRelatedResources(['creativeWorkspace', 'reviewApproval', 'blog'])}
        description="Learn more about creative production workflows, asset management, and team collaboration."
      />

      {/* CTA Section */}
      <CTASection
        title="Working with YouTube videos, assets, and feedback at scale?"
        description={
          <>
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
          </>
        }
        primaryButtonText="Start for Free"
      />
      <FooterSection hideCta />
      <SignUpModal />
    </>
  );
}
