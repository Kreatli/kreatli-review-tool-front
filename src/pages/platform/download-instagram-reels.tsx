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

const PAGE_PATH = '/platform/download-instagram-reels';
const CANONICAL_URL = 'https://kreatli.com' + PAGE_PATH;

const TOOL_PATH = '/free-tools/instagram-reel-downloader';

const DOWNLOAD_INSTAGRAM_REELS_STEPS: WorkflowStep[] = [
  {
    step: 1,
    title: 'Copy the Instagram Reel link',
    description:
      'Open the Reel you want to save, tap Share, and copy the link. This workflow only works for public Reels and posts you can open without logging in.',
    icon: 'link',
    image: null,
  },
  {
    step: 2,
    title: 'Paste the link into the downloader',
    description:
      'Paste the URL into the downloader. We support instagram.com/reel/…, /reels/…, and many /p/… links that point to video.',
    icon: 'upload',
    image: null,
  },
  {
    step: 3,
    title: 'Resolve the best available download',
    description:
      'Click “Find video”. We’ll try to extract the best MP4 URL available from the public page. If only preview metadata is exposed, quality may be limited.',
    icon: 'search',
    image: null,
  },
  {
    step: 4,
    title: 'Download the MP4',
    description:
      'Click “Download” to save the file. If the download doesn’t start, use “Open direct link” and save from the new tab.',
    icon: 'download',
    image: null,
  },
];

const faqs = [
  {
    question: 'How do I download Instagram Reels?',
    answer:
      'Copy the Instagram Reel link, paste it into the downloader, click “Find video”, then click “Download”. If the download doesn’t start, use “Open direct link” and save the video from the new tab.',
  },
  {
    question: 'Does it work for private Instagram accounts?',
    answer:
      'No. Downloading is only supported for public Reels and posts. Private accounts, restricted content, and anything behind a login wall cannot be accessed by a public-link downloader.',
  },
  {
    question: 'Why is the quality sometimes lower than the app?',
    answer:
      'Sometimes Instagram only exposes a preview stream or limited metadata on the public page. When that happens, the tool still provides a downloadable file, but it may not be full resolution. Try resolving again later to refresh the URL.',
  },
  {
    question: 'Do I need to log in or share Instagram credentials?',
    answer:
      'No. Kreatli does not ask for Instagram passwords. The tool works with public links and resolves a download URL you can save from your browser.',
  },
  {
    question: 'Is it legal to download Instagram Reels?',
    answer:
      'Only download content you own or have permission to use, and follow Instagram’s Terms of Service and copyright laws. This page is designed for legitimate workflows like archiving your own posts or saving approved content you’re allowed to reuse.',
  },
];

export default function DownloadInstagramReelsPlatformPage() {
  useSession();
  const articles = getPlatformArticles(PAGE_PATH);

  return (
    <>
      <Head>
        <title>Download Instagram Reels | Kreatli</title>
        <meta
          name="description"
          content="Download Instagram Reels from a public link. Paste a Reel URL, resolve the best available file, and save the MP4. Works with public Reels and video posts."
        />
        <link rel="canonical" href={CANONICAL_URL} />
        <meta property="og:url" content={CANONICAL_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Download Instagram Reels | Kreatli" />
        <meta
          property="og:description"
          content="Download Instagram Reels from a public link. Paste a Reel URL, resolve the best available file, and save the MP4."
        />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:secure_url" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:alt" content="Download Instagram Reels | Kreatli" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Download Instagram Reels | Kreatli" />
        <meta
          name="twitter:description"
          content="Download Instagram Reels from a public link. Paste a Reel URL, resolve the best available file, and save the MP4."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
      </Head>

      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Platform', url: '/platform' },
          { name: 'Download Instagram Reels', url: PAGE_PATH },
        ]}
      />

      <FAQStructuredData faqs={faqs} />

      <Header />
      <Decorations />

      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h1 className="mx-auto max-w-2xl font-sans text-3xl font-bold leading-tight sm:text-4xl sm:leading-tight">
              Download Instagram Reels
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground-500">
              Paste a public Instagram Reel link to download the MP4. We’ll resolve the best available file and help you
              save it to your device.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button as={NextLink} href={TOOL_PATH} size="lg" className="bg-foreground text-content1">
                Use Instagram Reel Downloader
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
        stepsSectionTitle="How to download Instagram Reels"
        stepsIntro="Follow these steps to download Instagram Reels from a public link. If your browser blocks the download, open the direct link and save from the new tab."
        steps={DOWNLOAD_INSTAGRAM_REELS_STEPS}
        completeGuide={{
          href: '/guides/how-to-download-instagram-reels',
          description:
            'A step-by-step guide with supported link types, troubleshooting, and what to do when downloads fail or quality is limited.',
        }}
      />

      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Download Reels for Real Workflows</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Use this when you need a local copy of a public Reel for archiving, editing reference, or internal
              review—only when you have rights or permission to use the content.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardBody className="p-6">
                <h3 className="font-sans text-lg font-semibold">Frictionless Save to Device</h3>
                <p className="mt-2 text-sm text-foreground-500">
                  Paste a link, resolve the best available file, and download. If your browser blocks a direct download,
                  open the direct link and save from the new tab.
                </p>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="p-6">
                <h3 className="font-sans text-lg font-semibold">Pair With Review + Approvals</h3>
                <p className="mt-2 text-sm text-foreground-500">
                  After you download a Reel, upload it into Kreatli to collect frame-accurate feedback, keep versions
                  organized, and track approvals across stakeholders.
                </p>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="p-6">
                <h3 className="font-sans text-lg font-semibold">Prep for Publishing</h3>
                <p className="mt-2 text-sm text-foreground-500">
                  For short-form content, pair downloads with safe-zone checks and resizing so captions, CTAs, and logos
                  stay visible under UI overlays.
                </p>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="p-6">
                <h3 className="font-sans text-lg font-semibold">Respect Rights + Terms</h3>
                <p className="mt-2 text-sm text-foreground-500">
                  Only download content you own or have permission to use. Kreatli does not require Instagram credentials
                  and does not attempt to access private content.
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
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">Public links, quality, rights, and what to do when a download fails.</p>
          </div>
          <Accordion variant="splitted" aria-label="Download Instagram Reels FAQs" className="gap-2">
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
        description="Learn about safe zones, approvals, and ways to share files with clients and teams."
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

