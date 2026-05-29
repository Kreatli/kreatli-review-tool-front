// eslint-disable-next-line simple-import-sort/imports
import { Accordion, AccordionItem } from '@heroui/react';
import Head from 'next/head';
import NextLink from 'next/link';

import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';
import { FooterSection } from '../../components/home/Footer/FooterSection';
import { Header } from '../../components/layout/Header';
import { Decorations } from '../../components/layout/Storyblok/Decorations';
import { BreadcrumbStructuredData } from '../../components/shared/BreadcrumbStructuredData';
import { CTASection } from '../../components/shared/CTASection';
import { DefinitionBlock } from '../../components/shared/DefinitionBlock';
import { FAQStructuredData } from '../../components/shared/FAQStructuredData';
import { FreeToolsEntitlementSection } from '../../components/shared/FreeToolsEntitlementSection';
import { MoreFreeToolsSection } from '../../components/shared/MoreFreeToolsSection';
import { PlatformStepGuide, WorkflowStep } from '../../components/shared/PlatformStepGuide';
import { RelatedResourcesSection } from '../../components/shared/RelatedResourcesSection';
import { YouTubeShortsDownloaderTool } from '../../components/youtube-shorts-downloader/YouTubeShortsDownloaderTool';
import { getFreeToolsForFreeToolPage } from '../../data/free-tools-page-tools';
import { getRelatedResources } from '../../data/related-resources';
import { FREE_TOOL_PAGE_ACCOUNT_FAQ } from '../../data/marketing-free-tool-access';
import { useSession } from '../../hooks/useSession';
import { KREATLI_PLATFORM_ENTRY_HREF, OPEN_IN_KREATLI_LABEL } from '../../constants/kreatliPlatformCta';

const PAGE_PATH = '/free-tools/youtube-shorts-downloader';
const CANONICAL_URL = 'https://kreatli.com' + PAGE_PATH;

const YOUTUBE_SHORTS_DOWNLOADER_STEPS: WorkflowStep[] = [
  {
    step: 1,
    title: 'Copy the YouTube Shorts or video link',
    description: 'Open YouTube (or Shorts), use Share, and copy the public link.',
    icon: 'link',
    image: null,
  },
  {
    step: 2,
    title: 'Paste the link into this page',
    description: 'Paste a youtube.com/shorts/… or youtube.com/watch?v=… URL (youtu.be links work too).',
    icon: 'upload',
    image: null,
  },
  {
    step: 3,
    title: 'Resolve the MP4',
    description:
      'Click “Find video”. We fetch public player metadata and prefer a progressive MP4 stream when YouTube exposes one.',
    icon: 'search',
    image: null,
  },
  {
    step: 4,
    title: 'Download',
    description:
      'Click “Download” after sign-in (trial or paid plan active). If it fails, click “Find video” again for a fresh URL and check browser download permissions.',
    icon: 'download',
    image: null,
  },
  {
    step: 5,
    title: 'If playback uses adaptive-only streams',
    description:
      'Some videos cannot be simplified to one public MP4 URL. In that case, try another upload or workflow that suits your permissions.',
    icon: 'share',
    image: null,
  },
];

const faqs = [
  {
    question: 'Is this YouTube Shorts downloader free?',
    answer:
      'The page and resolver are offered as free tools during your trial or with an active Kreatli plan. Sign in to download; plans include a trial so you can test the workflow.',
  },
  {
    question: 'Which YouTube URLs are supported?',
    answer:
      'Public Shorts links (youtube.com/shorts/…), standard watch links (youtube.com/watch?v=…), and short youtu.be links. Private, members-only, and some restricted uploads may fail to resolve.',
  },
  {
    question: 'Why did “Find video” say no progressive MP4 is available?',
    answer:
      'YouTube often serves adaptive (DASH) streams rather than one simple MP4. Our resolver uses progressive URLs when present; if absent, download may not be possible from a link paste alone.',
  },
  {
    question: 'Can I save YouTube Shorts on mobile?',
    answer:
      'Yes when the resolver succeeds. Copy the Shorts URL from the YouTube app, paste it here, resolve, then tap Download. If your mobile browser blocks the save, retry after resolving again or adjust your browser’s download/pop-up settings.',
  },
  FREE_TOOL_PAGE_ACCOUNT_FAQ,
  {
    question: 'Is downloading YouTube videos allowed?',
    answer:
      'Only download clips you created or content you’re permitted to reuse, and follow YouTube’s Terms of Service plus copyright laws. This workflow is aimed at archiving your uploads or reviewing approved clips.',
  },
  {
    question: 'Does Kreatli upload my video or store passwords?',
    answer:
      'No YouTube passwords are collected. Downloads are streamed through your browser; Kreatli is not storing the video permanently on your behalf for this standalone tool.',
  },
];

export default function YouTubeShortsDownloaderFreeToolPage() {
  useSession();

  return (
    <>
      <Head>
        <title>YouTube Shorts Downloader – Download Shorts MP4 Online | Kreatli</title>
        <meta
          name="description"
          content="Paste a public YouTube Shorts or watch link and download MP4 when a progressive stream is available. Sign in during trial or with an active plan."
        />
        <meta property="og:title" content="YouTube Shorts Downloader – Download Shorts MP4 Online | Kreatli" />
        <meta
          property="og:description"
          content="Paste a public YouTube Shorts or watch link and download MP4 when a progressive stream is available."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={CANONICAL_URL} />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:alt" content="YouTube Shorts Downloader | Kreatli" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="YouTube Shorts Downloader – Download Shorts MP4 Online | Kreatli" />
        <meta
          name="twitter:description"
          content="Paste a public YouTube Shorts or watch link and download MP4 when a progressive stream is available."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
        <link rel="canonical" href={CANONICAL_URL} />
      </Head>

      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Free Tools', url: '/free-tools' },
          { name: 'YouTube Shorts Downloader', url: PAGE_PATH },
        ]}
      />
      <FAQStructuredData faqs={faqs} />

      <Header />
      <Decorations />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        Skip to main content
      </a>

      <main id="main-content">
        <section className="relative overflow-hidden px-6 pb-4 pt-16">
          <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 text-center">
            <h1 className="mx-auto max-w-2xl font-sans text-3xl font-bold sm:text-4xl">YouTube Shorts Downloader</h1>
            <p className="mx-auto max-w-3xl text-lg text-foreground-500">
              Paste a public YouTube Shorts or standard watch URL to grab an MP4 when a progressive download link is
              available. Pair with approvals and safe-zone checks when you publish. Sign in to use the tool; start a
              trial or choose a plan if your subscription isn’t active.
            </p>
          </div>
        </section>

        <section className="relative overflow-hidden px-6 pb-12">
          <div className="relative z-10 mx-auto max-w-6xl">
            <FreeToolsEntitlementSection
              lockedTitle="YouTube Shorts downloader is available with an active trial or plan"
              lockedDescription="Your trial or plan isn’t active. Start a trial or choose a plan to resolve and download Shorts from a public YouTube URL on this page."
            >
              <YouTubeShortsDownloaderTool />
            </FreeToolsEntitlementSection>
          </div>
        </section>

        <section className="relative overflow-hidden px-6 pb-6">
          <div className="relative z-10 mx-auto max-w-6xl">
            <div className="rounded-xl border border-foreground-200 bg-content1/70 p-4 text-sm text-foreground-600">
              <span className="font-semibold text-foreground">Rights &amp; usage:</span> only download content you own
              or have permission to use. Follow YouTube’s Terms of Service and copyright laws.
            </div>
          </div>
          <div className="relative z-10 mx-auto mt-4 max-w-6xl">
            <p className="text-center text-sm text-foreground-500">
              Prefer a guided walk-through?{' '}
              <NextLink
                href="/guides/how-to-download-youtube-shorts"
                className="font-semibold text-primary underline underline-offset-2"
              >
                Read how to download YouTube Shorts
              </NextLink>{' '}
              or browse the{' '}
              <NextLink
                href="/platform/download-youtube-shorts"
                className="font-semibold text-primary underline underline-offset-2"
              >
                download YouTube Shorts platform overview
              </NextLink>
              .
            </p>
          </div>
        </section>

        <DefinitionBlock term="YouTube Shorts downloader">
          A YouTube Shorts downloader helps you save Shorts—or standard YouTube videos—to your device using a shared
          public URL. It relies on playback metadata and works only when progressive MP4 URLs are exposed; restricted
          content may fail to resolve without browser sign-in to YouTube, which our tool deliberately does not use.
        </DefinitionBlock>

        <PlatformStepGuide
          stepsSectionTitle="How to use the Shorts downloader"
          stepsIntro="Follow these steps to save a Shorts-length clip once a direct stream is detected."
          steps={YOUTUBE_SHORTS_DOWNLOADER_STEPS}
        />

        <section className="relative overflow-hidden px-6 py-16">
          <div className="relative z-10 mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
            <div className="rounded-2xl border border-foreground-200 bg-content1/70 p-6">
              <h2 className="mb-3 font-sans text-2xl font-bold">Common workflows</h2>
              <ul className="space-y-2 text-base text-foreground-600">
                <li>
                  <span className="font-semibold text-foreground">Personal archive:</span> keep snapshots of uploads you
                  own before re-editing elsewhere.
                </li>
                <li>
                  <span className="font-semibold text-foreground">Client collaboration:</span> save an approved preview
                  to collect feedback in Kreatli.
                </li>
                <li>
                  <span className="font-semibold text-foreground">Reference cuts:</span> bookmark pacing cues from clips
                  you have rights to revisit.
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-foreground-200 bg-content1/70 p-6">
              <h2 className="mb-3 font-sans text-2xl font-bold">Limitations worth knowing</h2>
              <ul className="space-y-2 text-base text-foreground-600">
                <li>
                  <span className="font-semibold text-foreground">Adaptive streams:</span> Shorts relying solely on
                  segmented streams might not expose a downloadable MP4.
                </li>
                <li>
                  <span className="font-semibold text-foreground">Live &amp; members:</span> broadcasts or members-only
                  uploads may not expose public URLs.
                </li>
                <li>
                  <span className="font-semibold text-foreground">Link expiry:</span> regenerate the download URL by
                  clicking “Find video” again if uploads age out overnight.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
          <div className="relative z-10 mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">YouTube downloader FAQs</h2>
              <p className="mx-auto max-w-2xl text-lg text-foreground-500">
                Trials, entitlement, resolver coverage, plus legal reminders.
              </p>
            </div>
            <Accordion variant="splitted" aria-label="YouTube Shorts downloader FAQs" className="gap-2">
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

        <MoreFreeToolsSection tools={getFreeToolsForFreeToolPage(PAGE_PATH)} title="More Tools for Video Teams" />

        <RelatedResourcesSection
          resources={getRelatedResources(['reviewApproval', 'videoAnnotation', 'secureAssetStorage'])}
          title="More Resources"
          description="Learn how video collaboration, proofing, and secure storage reinforce what happens after downloads."
        />

        <CTASection
          title="Need approvals after you download Shorts?"
          description="Bring files into one workspace—collect comments, proofs, approvals, and version history tied to teammates."
          primaryButtonText={OPEN_IN_KREATLI_LABEL}
          primaryButtonHref={KREATLI_PLATFORM_ENTRY_HREF}
        />
      </main>

      <FooterSection hideCta />
      <SignUpModal />
    </>
  );
}
