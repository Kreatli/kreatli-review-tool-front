// eslint-disable-next-line simple-import-sort/imports
import { Accordion, AccordionItem } from '@heroui/react';
import Head from 'next/head';

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
import { TikTokDownloaderTool } from '../../components/tiktok-downloader/TikTokDownloaderTool';
import { getFreeToolsForFreeToolPage } from '../../data/free-tools-page-tools';
import { getRelatedResources } from '../../data/related-resources';
import { FREE_TOOL_PAGE_ACCOUNT_FAQ } from '../../data/marketing-free-tool-access';
import { useSession } from '../../hooks/useSession';

const PAGE_PATH = '/free-tools/tiktok-video-downloader';
const CANONICAL_URL = 'https://kreatli.com' + PAGE_PATH;

const TIKTOK_DOWNLOADER_STEPS: WorkflowStep[] = [
  {
    step: 1,
    title: 'Copy the TikTok link',
    description:
      'Open the TikTok video you want to save, tap Share, and copy the link. This tool only works for public TikTok URLs.',
    icon: 'link',
    image: null,
  },
  {
    step: 2,
    title: 'Paste the link into the downloader',
    description:
      'Paste the URL into the field above. We support standard TikTok links (tiktok.com) and common short links (vm.tiktok.com, vt.tiktok.com).',
    icon: 'upload',
    image: null,
  },
  {
    step: 3,
    title: 'Find the video',
    description:
      'Click “Find video”. We’ll try to resolve an HD download and attempt a no-watermark version when available.',
    icon: 'search',
    image: null,
  },
  {
    step: 4,
    title: 'Download the MP4',
    description:
      'Click “Download” to save the video file to your device. If no-watermark isn’t available for this post, the tool will fall back to a standard (watermarked) link.',
    icon: 'download',
    image: null,
  },
  {
    step: 5,
    title: 'If it doesn’t download, open the direct link',
    description:
      'If your browser blocks the download, use “Open direct link” and then use “Save video as” (or long-press on mobile) to save the file.',
    icon: 'share',
    image: null,
  },
];

const faqs = [
  {
    question: 'Can I download TikTok videos without a watermark?',
    answer:
      'Sometimes. This tool attempts a no-watermark download first. If TikTok blocks it or the resolver cannot find a clean file, we fall back to the standard (watermarked) video link.',
  },
  {
    question: 'Does this TikTok downloader work for private videos?',
    answer:
      'No. This tool only works for public TikTok videos. It cannot access private accounts, age-restricted content, or videos behind a login wall.',
  },
  {
    question: 'Does this TikTok downloader support short links (vm.tiktok.com / vt.tiktok.com)?',
    answer:
      'Yes. Paste a standard TikTok link (tiktok.com) or a short link (vm.tiktok.com, vt.tiktok.com). If a link redirects multiple times, it may take a moment to resolve.',
  },
  {
    question: 'Will I get HD quality?',
    answer:
      'When available, we’ll prefer an HD video URL. If HD isn’t exposed for that post, we download the best available standard link.',
  },
  {
    question: 'Why did the download fail or not start?',
    answer:
      'Most failures are caused by browser download settings, TikTok rate limits, or the resolved link expiring. Try resolving the link again, then use “Open direct link” and save the file from the new tab. If you’re on mobile, a long-press may be required.',
  },
  {
    question: 'Can I download TikTok videos on iPhone or Android?',
    answer:
      'Yes—if the TikTok video is public. Copy the link from the TikTok app and paste it here. If your mobile browser won’t start the download, use “Open direct link” and then long-press the video to save it (options vary by browser).',
  },
  {
    question: 'What TikTok links work with this downloader?',
    answer:
      'Use a direct link to a public TikTok video (tiktok.com) or a TikTok short link (vm.tiktok.com / vt.tiktok.com). Profile links and non-video pages won’t resolve to a downloadable MP4.',
  },
  {
    question: 'Do I need to log in to TikTok or share my password?',
    answer: 'No. Kreatli does not ask for TikTok credentials. This tool works with public links only.',
  },
  FREE_TOOL_PAGE_ACCOUNT_FAQ,
  {
    question: 'Is it legal to download TikTok videos?',
    answer:
      'You should only download videos that you own or have permission to use, and you should follow TikTok’s Terms of Service and copyright laws. This tool is designed for legitimate workflows like saving your own posts or drafts shared publicly.',
  },
  {
    question: 'Do you store the video on Kreatli servers?',
    answer:
      'No. This tool resolves a download URL and your browser downloads the file directly. Kreatli does not ask for TikTok login credentials.',
  },
];

export default function TikTokVideoDownloaderPage() {
  useSession();

  return (
    <>
      <Head>
        <title>TikTok Video Downloader – Download TikTok Videos | Kreatli</title>
        <meta
          name="description"
          content="Paste a TikTok link and download the video. We’ll attempt a no-watermark download when available and fall back if not. Free to use."
        />
        <meta property="og:title" content="TikTok Video Downloader – Download TikTok Videos | Kreatli" />
        <meta
          property="og:description"
          content="Paste a TikTok link and download the video. We’ll attempt a no-watermark download when available and fall back if not. Free to use."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={CANONICAL_URL} />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:alt" content="TikTok Video Downloader – Download TikTok Videos | Kreatli" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TikTok Video Downloader – Download TikTok Videos | Kreatli" />
        <meta
          name="twitter:description"
          content="Paste a TikTok link and download the video. We’ll attempt a no-watermark download when available and fall back if not. Free to use."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
        <link rel="canonical" href={CANONICAL_URL} />
      </Head>

      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Free Tools', url: '/free-tools' },
          { name: 'TikTok Video Downloader', url: PAGE_PATH },
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
            <h1 className="mx-auto max-w-2xl font-sans text-3xl font-bold sm:text-4xl">TikTok Video Downloader</h1>
            <p className="mx-auto max-w-3xl text-lg text-foreground-500">
              Download TikTok videos as MP4 from a public TikTok link. Paste a TikTok URL to download in HD when
              available—no watermark, high quality. Sign in to use the tool; start a trial or choose a plan if your
              subscription isn’t active.
            </p>
          </div>
        </section>

        <section className="relative overflow-hidden px-6 pb-12">
          <div className="relative z-10 mx-auto max-w-6xl">
            <FreeToolsEntitlementSection
              lockedTitle="TikTok Video Downloader is available with an active trial or plan"
              lockedDescription="Your trial or plan isn’t active. Start a trial or choose a plan to download videos from a public TikTok link on this page."
            >
              <TikTokDownloaderTool />
            </FreeToolsEntitlementSection>
          </div>
        </section>

        <section className="relative overflow-hidden px-6 pb-6">
          <div className="relative z-10 mx-auto max-w-6xl">
            <div className="rounded-xl border border-foreground-200 bg-content1/70 p-4 text-sm text-foreground-600">
              <span className="font-semibold text-foreground">Rights &amp; usage:</span> only download content you own
              or have permission to use. Respect TikTok’s Terms of Service and copyright laws. This tool does not
              require TikTok login credentials.
            </div>
          </div>
        </section>

        <DefinitionBlock term="TikTok video downloader">
          A TikTok video downloader helps you save a TikTok video file to your device from a public TikTok link. It’s
          useful for archiving your own posts, sharing clips in internal review, or keeping a backup for editing—only
          when you have the rights to use the content.
        </DefinitionBlock>

        <PlatformStepGuide
          stepsSectionTitle="How to download a TikTok video"
          stepsIntro="Follow these steps to save a TikTok video from a public link. We’ll attempt a no-watermark download when available and fall back if it isn’t."
          steps={TIKTOK_DOWNLOADER_STEPS}
        />

        <section className="relative overflow-hidden px-6 py-16">
          <div className="relative z-10 mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
            <div className="rounded-2xl border border-foreground-200 bg-content1/70 p-6">
              <h2 className="mb-3 font-sans text-2xl font-bold">Common use cases</h2>
              <ul className="space-y-2 text-base text-foreground-600">
                <li>
                  <span className="font-semibold text-foreground">Archive your own posts:</span> keep backups of
                  published videos for future edits or reposts.
                </li>
                <li>
                  <span className="font-semibold text-foreground">Internal review:</span> share clips with your team for
                  quick feedback before a longer edit.
                </li>
                <li>
                  <span className="font-semibold text-foreground">Reference in editing:</span> save a copy so you can
                  study pacing, captions, or transitions (only with rights/permission).
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-foreground-200 bg-content1/70 p-6">
              <h2 className="mb-3 font-sans text-2xl font-bold">Troubleshooting</h2>
              <ul className="space-y-2 text-base text-foreground-600">
                <li>
                  <span className="font-semibold text-foreground">No-watermark isn’t available:</span> TikTok may block
                  clean files for some posts. In that case, we fall back to the standard link.
                </li>
                <li>
                  <span className="font-semibold text-foreground">Private or restricted content:</span> this tool can’t
                  access private accounts, age-restricted videos, or content behind a login wall.
                </li>
                <li>
                  <span className="font-semibold text-foreground">Download doesn’t start:</span> use “Open direct link”
                  and save from the new tab, or resolve the link again if it expired.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
          <div className="relative z-10 mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
              <p className="mx-auto max-w-2xl text-lg text-foreground-500">
                Notes on watermark availability, private videos, and rights &amp; usage.
              </p>
            </div>
            <Accordion variant="splitted" aria-label="TikTok downloader FAQs" className="gap-2">
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
          description="Learn more about video collaboration workflows, asset review and approvals, and secure file delivery."
        />

        <CTASection
          title="Need feedback and approvals on video assets?"
          description="Kreatli is a Video Collaboration & Review Platform for video teams. Upload videos, collect frame-accurate feedback, keep discussions organized, and move projects forward."
          primaryButtonText="Start 7-day trial"
        />
      </main>

      <FooterSection hideCta />
      <SignUpModal />
    </>
  );
}
