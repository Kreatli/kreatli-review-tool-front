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
import { HeroCtaButtons } from '../../components/shared/HeroCtaButtons';
import { FAQStructuredData } from '../../components/shared/FAQStructuredData';
import { MoreFreeToolsSection } from '../../components/shared/MoreFreeToolsSection';
import { PlatformDefinitionBlock } from '../../components/shared/PlatformDefinitionBlock';
import { PlatformStepGuide, WorkflowStep } from '../../components/shared/PlatformStepGuide';
import { RelatedResourcesSection } from '../../components/shared/RelatedResourcesSection';
import { ResourcesArticlesPreviewSection } from '../../components/shared/ResourcesArticlesPreviewSection';
import { KREATLI_PLATFORM_ENTRY_HREF, OPEN_IN_KREATLI_LABEL } from '../../constants/kreatliPlatformCta';
import { getPlatformArticles } from '../../data/platform-articles';
import { getFreeToolsForPlatform } from '../../data/platform-free-tools';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';

const PAGE_PATH = '/platform/download-youtube-shorts';
const CANONICAL_URL = 'https://kreatli.com' + PAGE_PATH;

const TOOL_PATH = '/free-tools/youtube-shorts-downloader';

const DOWNLOAD_YOUTUBE_SHORTS_STEPS: WorkflowStep[] = [
  {
    step: 1,
    title: 'Copy the YouTube Shorts or video link',
    description:
      'Open the Shorts or video you want to save, tap Share, and copy the link. This works best for public videos with a standard watch or /shorts/ URL.',
    icon: 'link',
    image: null,
  },
  {
    step: 2,
    title: 'Paste the link into the downloader',
    description:
      'Paste the URL into the tool. We support youtube.com/shorts/… and youtube.com/watch?v=… links (plus youtu.be short links).',
    icon: 'upload',
    image: null,
  },
  {
    step: 3,
    title: 'Resolve the best available MP4',
    description: 'Click “Find video”. We look for a progressive MP4 stream when YouTube exposes one for that playback.',
    icon: 'search',
    image: null,
  },
  {
    step: 4,
    title: 'Download the file',
    description:
      'Click “Download” to save through your browser. If the download doesn’t start, click “Find video” again for a fresh URL and retry, and check browser download settings.',
    icon: 'download',
    image: null,
  },
];

const faqs = [
  {
    question: 'How do I download YouTube Shorts?',
    answer:
      'Copy a public Shorts or watch link, paste it into the YouTube Shorts downloader, click “Find video”, then click “Download”. If the browser blocks the download, refresh the resolved URL with “Find video” and retry.',
  },
  {
    question: 'Why does “Find video” fail for some YouTube links?',
    answer:
      'YouTube does not always expose a simple progressive MP4 URL for every video. Age-restricted, private, members-only, or heavily restricted playbacks may not resolve with a public link paste.',
  },
  {
    question: 'Can I download private or unlisted YouTube videos?',
    answer:
      'No. This tool is built for public links only. It does not use your YouTube account and cannot access private libraries.',
  },
  {
    question: 'Do I need to log in to YouTube?',
    answer:
      'No. Kreatli does not ask for YouTube credentials. The workflow is designed around public URLs you can share from the YouTube app or site.',
  },
  {
    question: 'Is it legal to download YouTube Shorts?',
    answer:
      'Only download content you own or have permission to use, and follow YouTube’s Terms of Service and copyright laws. This page is for legitimate workflows like archiving your own uploads or saving material you are allowed to reuse.',
  },
];

export default function DownloadYouTubeShortsPlatformPage() {
  useSession();
  const articles = getPlatformArticles(PAGE_PATH);

  return (
    <>
      <Head>
        <title>Download YouTube Shorts | Kreatli</title>
        <meta
          name="description"
          content="Download YouTube Shorts from a public link. Paste a Shorts or watch URL, resolve a progressive MP4 when available, and save the file."
        />
        <link rel="canonical" href={CANONICAL_URL} />
        <meta property="og:url" content={CANONICAL_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Download YouTube Shorts | Kreatli" />
        <meta
          property="og:description"
          content="Download YouTube Shorts from a public link. Paste a Shorts or watch URL, resolve a progressive MP4 when available, and save the file."
        />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:secure_url" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:alt" content="Download YouTube Shorts | Kreatli" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Download YouTube Shorts | Kreatli" />
        <meta
          name="twitter:description"
          content="Download YouTube Shorts from a public link. Paste a Shorts or watch URL, resolve a progressive MP4 when available, and save the file."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
      </Head>

      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Platform', url: '/platform' },
          { name: 'Download YouTube Shorts', url: PAGE_PATH },
        ]}
      />

      <FAQStructuredData faqs={faqs} />

      <Header />
      <Decorations />

      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h1 className="mx-auto max-w-2xl font-sans text-3xl font-bold leading-tight sm:text-4xl sm:leading-tight">
              Download YouTube Shorts
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground-500">
              Paste a public YouTube Shorts or watch link to save an MP4 when a progressive download URL is available.
            </p>
            <HeroCtaButtons
              className="mt-8"
              leading={
              
                <Button as={NextLink} href={TOOL_PATH} size="lg" className="bg-foreground text-content1">
                Use YouTube Shorts Downloader
                </Button>
              }
            />
          </div>
        </div>
      </section>

      <PlatformDefinitionBlock href={PAGE_PATH} />

      <PlatformStepGuide
        stepsSectionTitle="How to download YouTube Shorts"
        stepsIntro="Follow these steps to download a public Shorts or YouTube video when a direct MP4 stream is available."
        steps={DOWNLOAD_YOUTUBE_SHORTS_STEPS}
        completeGuide={{
          href: '/guides/how-to-download-youtube-shorts',
          description:
            'A step-by-step guide with supported URL types, troubleshooting, and what to do when YouTube does not expose a simple download URL.',
        }}
      />

      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Download Shorts for Real Workflows</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Use this when you need a local copy of your own or approved public Shorts for archive, editing reference,
              or internal review.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardBody className="p-6">
                <h3 className="font-sans text-lg font-semibold">Save from a public link</h3>
                <p className="mt-2 text-sm text-foreground-500">
                  Paste a URL, resolve, and download. If a resolved download URL expires, click “Find video” again for a
                  fresh URL.
                </p>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="p-6">
                <h3 className="font-sans text-lg font-semibold">Pair with review and approvals</h3>
                <p className="mt-2 text-sm text-foreground-500">
                  After download, upload into Kreatli for frame-accurate comments, version tracking, and approvals.
                </p>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="p-6">
                <h3 className="font-sans text-lg font-semibold">Check the Shorts safe zone</h3>
                <p className="mt-2 text-sm text-foreground-500">
                  Before publishing, preview where YouTube UI overlays sit so titles and CTAs stay visible.
                </p>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="p-6">
                <h3 className="font-sans text-lg font-semibold">Respect rights and terms</h3>
                <p className="mt-2 text-sm text-foreground-500">
                  Download only content you own or have permission to use. Public links only—we never ask for your
                  password.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      <MoreFreeToolsSection
        tools={getFreeToolsForPlatform(PAGE_PATH)}
        title="More Free Tools"
        excludeHref={TOOL_PATH}
      />

      <ResourcesArticlesPreviewSection
        title="More guides on short-form video workflows"
        description="Learn about downloads, Shorts framing, approvals, and ways to share files with clients and teams."
        articles={articles}
      />

      <PricingSection />

      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Supported links, resolver limits, rights, and download troubleshooting.
            </p>
          </div>

          <Accordion variant="splitted" aria-label="Download YouTube Shorts FAQs" className="gap-2">
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
              and we’ll help you connect Shorts workflows to review and approvals in Kreatli.
            </p>
          </div>
        </div>
      </section>

      <RelatedResourcesSection
        resources={getRelatedResources(['reviewApproval', 'videoAnnotation', 'secureAssetStorage'])}
        title="More Resources"
        description="Explore platform capabilities that support short-form workflows: review, versioning, and secure storage."
      />

      <CTASection
        title="Need feedback and approvals on short-form video?"
        description="Bring Shorts and cuts into one workspace—frame-accurate feedback, clear versions, and approvals without messy threads."
        primaryButtonText={OPEN_IN_KREATLI_LABEL}
        primaryButtonHref={KREATLI_PLATFORM_ENTRY_HREF}
      />

      <FooterSection hideCta />
      <SignUpModal />
    </>
  );
}
