import { Accordion, AccordionItem, Button, Card, CardBody } from '@heroui/react';
import Head from 'next/head';
import NextLink from 'next/link';

import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';
import { FooterSection } from '../../components/home/Footer/FooterSection';
import { PricingSection } from '../../components/home/PricingSection/PricingSection';
import { Header } from '../../components/layout/Header';
import { Decorations } from '../../components/layout/Storyblok/Decorations';
import { BreadcrumbStructuredData } from '../../components/shared/BreadcrumbStructuredData';
import { CTASection } from '../../components/shared/CTASection';
import { FAQStructuredData } from '../../components/shared/FAQStructuredData';
import { MoreFreeToolsSection } from '../../components/shared/MoreFreeToolsSection';
import { PlatformDefinitionBlock } from '../../components/shared/PlatformDefinitionBlock';
import { PlatformStepGuide, WorkflowStep } from '../../components/shared/PlatformStepGuide';
import { RelatedResourcesSection } from '../../components/shared/RelatedResourcesSection';
import { ResourcesArticlesPreviewSection } from '../../components/shared/ResourcesArticlesPreviewSection';
import { getPlatformArticles } from '../../data/platform-articles';
import { getFreeToolsForPlatform } from '../../data/platform-free-tools';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';

const PAGE_PATH = '/platform/download-facebook-reels';
const CANONICAL_URL = 'https://kreatli.com' + PAGE_PATH;

const TOOL_PATH = '/free-tools/facebook-reel-downloader';

const DOWNLOAD_FACEBOOK_REELS_STEPS: WorkflowStep[] = [
  {
    step: 1,
    title: 'Copy the Facebook Reel link',
    description:
      'Open the Reel/video post you want to save, tap Share, and copy the public link. This only works for public content.',
    icon: 'link',
    image: null,
  },
  {
    step: 2,
    title: 'Paste the link into the downloader',
    description:
      'Paste the URL into the downloader. Supported public formats include facebook.com/reel/..., facebook.com/watch?v=..., and fb.watch/... links.',
    icon: 'upload',
    image: null,
  },
  {
    step: 3,
    title: 'Resolve the best available download',
    description:
      'Click "Find video". We try to extract the best available public MP4 URL from page metadata.',
    icon: 'search',
    image: null,
  },
  {
    step: 4,
    title: 'Download the MP4',
    description:
      'Click "Download" to save the video file. If download fails, resolve again to refresh an expired link.',
    icon: 'download',
    image: null,
  },
];

const faqs = [
  {
    question: 'How do I download Facebook Reels?',
    answer:
      'Copy a public Facebook Reel/video link, paste it into the downloader, click "Find video", then click "Download".',
  },
  {
    question: 'Can I download private Facebook videos?',
    answer:
      'No. Downloading works only for public Facebook links. Private profiles, friends-only posts, and login-gated content cannot be resolved.',
  },
  {
    question: 'Why did my Facebook Reel download fail?',
    answer:
      'Most failures come from expired direct links, browser restrictions, or temporary upstream limits. Resolve the URL again, then retry the download.',
  },
  {
    question: 'Do I need Facebook credentials?',
    answer:
      'No. Kreatli does not ask for Facebook login credentials. This workflow is built for public links only.',
  },
  {
    question: 'Is it legal to download Facebook Reels?',
    answer:
      'Only download content you own or have permission to use, and follow Facebook terms plus local copyright law.',
  },
];

export default function DownloadFacebookReelsPlatformPage() {
  useSession();
  const articles = getPlatformArticles(PAGE_PATH);

  return (
    <>
      <Head>
        <title>Download Facebook Reels | Kreatli</title>
        <meta
          name="description"
          content="Download Facebook Reels from a public link. Paste a Facebook Reel/video URL, resolve the best available file, and save the MP4."
        />
        <link rel="canonical" href={CANONICAL_URL} />
        <meta property="og:url" content={CANONICAL_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Download Facebook Reels | Kreatli" />
        <meta
          property="og:description"
          content="Download Facebook Reels from a public link. Paste a Facebook Reel/video URL, resolve the best available file, and save the MP4."
        />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:secure_url" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:alt" content="Download Facebook Reels | Kreatli" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Download Facebook Reels | Kreatli" />
        <meta
          name="twitter:description"
          content="Download Facebook Reels from a public link. Paste a Facebook Reel/video URL, resolve the best available file, and save the MP4."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
      </Head>

      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Platform', url: '/platform' },
          { name: 'Download Facebook Reels', url: PAGE_PATH },
        ]}
      />

      <FAQStructuredData faqs={faqs} />

      <Header />
      <Decorations />

      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h1 className="mx-auto max-w-2xl font-sans text-3xl font-bold leading-tight sm:text-4xl sm:leading-tight">
              Download Facebook Reels
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground-500">
              Paste a public Facebook Reel/video link to download the MP4. Works for Reel, watch, and fb.watch links.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button as={NextLink} href={TOOL_PATH} size="lg" className="bg-foreground text-content1">
                Use Facebook Reel Downloader
              </Button>
              <Button as={NextLink} href="/sign-up" size="lg" variant="bordered">
                Start 7-day trial
              </Button>
            </div>
          </div>
        </div>
      </section>

      <PlatformDefinitionBlock href={PAGE_PATH} />

      <PlatformStepGuide
        stepsSectionTitle="How to download Facebook Reels"
        stepsIntro="Follow these steps to download Facebook Reels from a public link."
        steps={DOWNLOAD_FACEBOOK_REELS_STEPS}
        completeGuide={{
          href: '/guides/how-to-download-facebook-reels',
          description:
            'A step-by-step guide with supported Facebook URL types, troubleshooting, and legal/rights reminders.',
        }}
      />

      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Download Reels for Real Workflows</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Use this when you need a local copy of your own or approved public Facebook content for archive, editing,
              and review.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardBody className="p-6">
                <h3 className="font-sans text-lg font-semibold">Fast Save to Device</h3>
                <p className="mt-2 text-sm text-foreground-500">
                  Paste a URL, resolve, and download. If link expiry causes issues, re-resolve for a fresh URL.
                </p>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="p-6">
                <h3 className="font-sans text-lg font-semibold">Pair With Review + Approvals</h3>
                <p className="mt-2 text-sm text-foreground-500">
                  After download, upload into Kreatli for frame-accurate comments, version tracking, and approvals.
                </p>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="p-6">
                <h3 className="font-sans text-lg font-semibold">Prep for Multi-Platform Delivery</h3>
                <p className="mt-2 text-sm text-foreground-500">
                  Use resize/compress tools before publishing to optimize file size and framing for each channel.
                </p>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="p-6">
                <h3 className="font-sans text-lg font-semibold">Respect Rights + Terms</h3>
                <p className="mt-2 text-sm text-foreground-500">
                  Download only content you own or have permission to use. Public links only; no private/login-gated
                  content.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Public links, rights, and what to do when downloads fail.
            </p>
          </div>
          <Accordion variant="splitted" aria-label="Download Facebook Reels FAQs" className="gap-2">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.question}
                title={<span className="text-base font-semibold sm:text-lg">{faq.question}</span>}
                className="py-2"
              >
                <div className="text-sm leading-relaxed text-foreground-500 sm:text-base">{faq.answer}</div>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <MoreFreeToolsSection tools={getFreeToolsForPlatform(PAGE_PATH)} title="More Free Tools" excludeHref={TOOL_PATH} />

      <ResourcesArticlesPreviewSection
        title="More guides on short-form video workflows"
        description="Learn about downloads, safe framing, approvals, and ways to share files with clients and teams."
        articles={articles}
      />

      <RelatedResourcesSection
        resources={getRelatedResources(['reviewApproval', 'videoAnnotation', 'secureAssetStorage'])}
        title="More Resources"
        description="Learn more about video collaboration workflows, asset review and approvals, and secure file delivery."
      />

      <PricingSection />

      <CTASection
        title="Need feedback and approvals on video assets?"
        description="Kreatli is a Video Collaboration & Review Platform for video teams. Upload videos, collect frame-accurate feedback, keep discussions organized, and move projects forward."
        primaryButtonText="Start 7-day trial"
      />

      <FooterSection hideCta />
      <SignUpModal />
    </>
  );
}
