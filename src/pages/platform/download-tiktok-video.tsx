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
import { PlatformStepGuide, WorkflowStep } from '../../components/shared/PlatformStepGuide';
import { PlatformDefinitionBlock } from '../../components/shared/PlatformDefinitionBlock';
import { RelatedResourcesSection } from '../../components/shared/RelatedResourcesSection';
import { ResourcesArticlesPreviewSection } from '../../components/shared/ResourcesArticlesPreviewSection';
import { getPlatformArticles } from '../../data/platform-articles';
import { getFreeToolsForPlatform } from '../../data/platform-free-tools';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';

const PAGE_PATH = '/platform/download-tiktok-video';
const CANONICAL_URL = 'https://kreatli.com' + PAGE_PATH;

const TOOL_PATH = '/free-tools/tiktok-video-downloader';

const DOWNLOAD_TIKTOK_VIDEO_STEPS: WorkflowStep[] = [
  {
    step: 1,
    title: 'Copy the TikTok video link',
    description:
      'Open the TikTok video you want to save, tap Share, and copy the URL. This workflow only works for public TikTok videos.',
    icon: 'link',
    image: null,
  },
  {
    step: 2,
    title: 'Paste the link into the downloader',
    description:
      'Paste the URL into the downloader. We support direct TikTok links and common short links (vm.tiktok.com / vt.tiktok.com).',
    icon: 'upload',
    image: null,
  },
  {
    step: 3,
    title: 'Resolve the best available download',
    description:
      'Click “Find video”. We’ll attempt an HD link when available and try a no-watermark file first (then fall back if not available).',
    icon: 'search',
    image: null,
  },
  {
    step: 4,
    title: 'Download the MP4',
    description:
      'Click “Download” to save the file to your device. If the browser blocks the download, use “Open direct link” and save from the new tab.',
    icon: 'download',
    image: null,
  },
];

const faqs = [
  {
    question: 'How do I download a TikTok video?',
    answer:
      'Copy the TikTok link, paste it into the downloader, click “Find video”, then click “Download”. If the download doesn’t start, use “Open direct link” and save the video from the new tab.',
  },
  {
    question: 'Can I download TikTok videos without a watermark?',
    answer:
      'Sometimes. The downloader attempts a no-watermark version first. If TikTok blocks it or the resolver cannot find a clean file, the tool falls back to the standard (watermarked) video link.',
  },
  {
    question: 'Does it work for private or restricted TikTok videos?',
    answer:
      'No. Downloading is only supported for public TikTok videos. Private accounts, age-restricted content, or videos behind a login wall cannot be accessed.',
  },
  {
    question: 'Do I need to log in or share TikTok credentials?',
    answer:
      'No. Kreatli does not ask for TikTok passwords. The tool works with public links and resolves a download URL you can save from your browser.',
  },
  {
    question: 'Is it legal to download TikTok videos?',
    answer:
      'Only download content you own or have permission to use, and follow TikTok’s Terms of Service and copyright laws. This page is designed for legitimate workflows like archiving your own posts or saving approved content you’re allowed to reuse.',
  },
];

export default function DownloadTikTokVideoPlatformPage() {
  useSession();
  const articles = getPlatformArticles(PAGE_PATH);

  return (
    <>
      <Head>
        <title>Download TikTok Video | Kreatli</title>
        <meta
          name="description"
          content="Download TikTok video from a public link. Paste a TikTok URL, resolve the best available file, and save the MP4. No-watermark when available."
        />
        <link rel="canonical" href={CANONICAL_URL} />
        <meta property="og:url" content={CANONICAL_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Download TikTok Video | Kreatli" />
        <meta
          property="og:description"
          content="Download TikTok video from a public link. Paste a TikTok URL, resolve the best available file, and save the MP4. No-watermark when available."
        />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:secure_url" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:alt" content="Download TikTok Video | Kreatli" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Download TikTok Video | Kreatli" />
        <meta
          name="twitter:description"
          content="Download TikTok video from a public link. Paste a TikTok URL, resolve the best available file, and save the MP4."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
      </Head>

      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Platform', url: '/platform' },
          { name: 'Download TikTok Video', url: PAGE_PATH },
        ]}
      />

      <FAQStructuredData faqs={faqs} />

      <Header />
      <Decorations />

      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h1 className="mx-auto max-w-2xl font-sans text-3xl font-bold leading-tight sm:text-4xl sm:leading-tight">
              Download TikTok Video
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground-500">
              Paste a public TikTok link to download the MP4. We’ll attempt a no-watermark version when available and
              fall back if it isn’t.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button as={NextLink} href={TOOL_PATH} size="lg" className="bg-foreground text-content1">
                Use TikTok Video Downloader
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
        stepsSectionTitle="How to download a TikTok video"
        stepsIntro="Follow these steps to download a TikTok video from a public link. We’ll attempt no-watermark when available and fall back when it isn’t."
        steps={DOWNLOAD_TIKTOK_VIDEO_STEPS}
        completeGuide={{
          href: '/guides/how-to-download-a-tiktok-video',
          description:
            'A step-by-step guide with common link types, troubleshooting, and what to do when watermark-free files aren’t available.',
        }}
      />

      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Download TikTok Videos for Real Workflows</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Use this when you need a local copy of a public TikTok for archiving, editing reference, or internal
              review—only when you have rights or permission to use the content.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardBody className="p-6">
                <h3 className="font-sans text-lg font-semibold">Frictionless Save to Device</h3>
                <p className="mt-2 text-sm text-foreground-500">
                  Paste a link, resolve the best available file, and download. If your browser blocks a direct
                  download, open the direct link and save from the new tab.
                </p>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="p-6">
                <h3 className="font-sans text-lg font-semibold">Pair With Review + Approvals</h3>
                <p className="mt-2 text-sm text-foreground-500">
                  After you download a TikTok, upload it into Kreatli to collect frame-accurate feedback, keep versions
                  organized, and track approvals across stakeholders.
                </p>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="p-6">
                <h3 className="font-sans text-lg font-semibold">Prep for Publishing</h3>
                <p className="mt-2 text-sm text-foreground-500">
                  For short-form content, pair downloads with safe-zone checks and resizing so captions, CTAs, and logos
                  stay visible after TikTok UI overlays appear.
                </p>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="p-6">
                <h3 className="font-sans text-lg font-semibold">Respect Rights + Terms</h3>
                <p className="mt-2 text-sm text-foreground-500">
                  Only download content you own or have permission to use. Kreatli does not require TikTok credentials
                  and does not attempt to access private videos.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      <MoreFreeToolsSection
        title="Free Tools for Video Teams"
        description="Try more free tools that pair with TikTok downloads: resizing, compression, share links, and review workflows."
        tools={getFreeToolsForPlatform(PAGE_PATH)}
      />

      <ResourcesArticlesPreviewSection
        articles={articles}
        title="More Guides and Workflows"
        description="Explore guides and workflows for short-form video delivery, collaboration, and approvals."
      />

      <PricingSection />

      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Quick answers about link types, watermark availability, and what this page can and can’t do.
            </p>
          </div>

          <Accordion variant="splitted" className="gap-2">
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

          <div className="mx-auto mt-12 flex max-w-3xl flex-col items-center gap-4 text-center">
            <h3 className="font-sans text-xl font-bold">Still Have Questions?</h3>
            <p className="text-foreground-500">
              Email{' '}
              <a href="mailto:support@kreatli.com" className="font-medium text-primary underline underline-offset-2">
                support@kreatli.com
              </a>{' '}
              and we’ll help you connect TikTok workflows to a review and approval process that fits your team.
            </p>
          </div>
        </div>
      </section>

      <RelatedResourcesSection
        resources={getRelatedResources(['reviewApproval', 'videoAnnotation', 'secureAssetStorage'])}
        title="More Resources"
        description="Explore platform capabilities that support short-form video workflows: review, versioning, and secure storage."
      />

      <CTASection
        title="Need feedback and approvals on short-form video?"
        description="Upload TikToks to Kreatli, collect frame-accurate feedback, keep versions organized, and get approvals without messy threads."
      />

      <FooterSection hideCta={true} />
      <SignUpModal />
    </>
  );
}

