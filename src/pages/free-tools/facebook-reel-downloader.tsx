// eslint-disable-next-line simple-import-sort/imports
import { Accordion, AccordionItem } from '@heroui/react';
import Head from 'next/head';
import NextLink from 'next/link';

import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';
import { FacebookReelDownloaderTool } from '../../components/facebook-reel-downloader/FacebookReelDownloaderTool';
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
import { getFreeToolsForFreeToolPage } from '../../data/free-tools-page-tools';
import { getRelatedResources } from '../../data/related-resources';
import { FREE_TOOL_PAGE_ACCOUNT_FAQ } from '../../data/marketing-free-tool-access';
import { useSession } from '../../hooks/useSession';

const PAGE_PATH = '/free-tools/facebook-reel-downloader';
const CANONICAL_URL = 'https://kreatli.com' + PAGE_PATH;

const FACEBOOK_REEL_DOWNLOADER_STEPS: WorkflowStep[] = [
  {
    step: 1,
    title: 'Copy the Facebook Reel link',
    description:
      'Open the Reel or public video on Facebook, tap Share, and copy the link. This tool only works for public URLs you can open without logging in.',
    icon: 'link',
    image: null,
  },
  {
    step: 2,
    title: 'Paste the link into the downloader',
    description:
      'Paste the URL into the field above. We support common public shapes like facebook.com/reel/..., facebook.com/watch?v=..., and fb.watch/....',
    icon: 'upload',
    image: null,
  },
  {
    step: 3,
    title: 'Find the video',
    description:
      'Click "Find video". We fetch public page metadata and try to extract the best available MP4 URL for download.',
    icon: 'search',
    image: null,
  },
  {
    step: 4,
    title: 'Download the MP4',
    description:
      'Click "Download" to save the video file to your device. If your browser blocks the download, open the direct link and save from the new tab.',
    icon: 'download',
    image: null,
  },
];

const faqs = [
  {
    question: 'Can I download private Facebook Reels?',
    answer:
      'No. This downloader only works for public Facebook Reel/video links. It cannot access private profiles, friends-only posts, or content behind login restrictions.',
  },
  {
    question: 'What Facebook links are supported?',
    answer:
      'Use public Reel/video links such as facebook.com/reel/..., facebook.com/watch?v=..., facebook.com/.../videos/... and fb.watch/... links. Non-video pages will not resolve to an MP4.',
  },
  {
    question: 'Why did the download fail or not start?',
    answer:
      'Common causes are browser download settings, expired CDN links, or temporary Facebook rate limits. Click "Find video" again to refresh the URL, then try download again.',
  },
  {
    question: 'Can I download Facebook Reels on iPhone or Android?',
    answer:
      'Yes, for public links. Paste the Reel URL and resolve it first. If your mobile browser does not start download directly, open the direct link and long-press to save if supported.',
  },
  {
    question: 'Do I need to log in to Facebook or share my password?',
    answer: 'No. Kreatli does not ask for Facebook credentials. This tool is designed for public links only.',
  },
  FREE_TOOL_PAGE_ACCOUNT_FAQ,
  {
    question: 'Is it legal to download Facebook Reels?',
    answer:
      'Only download content you own or have permission to use, and follow Facebook Terms and copyright law. This tool is for legitimate workflows like archiving your own public posts or approved assets.',
  },
  {
    question: 'Do you store Facebook videos on Kreatli servers?',
    answer:
      'No long-term storage. The tool resolves a public download URL and streams bytes to your browser for download.',
  },
];

export default function FacebookReelDownloaderPage() {
  useSession();

  return (
    <>
      <Head>
        <title>Facebook Reel Downloader - Download Facebook Reels | Kreatli</title>
        <meta
          name="description"
          content="Paste a public Facebook Reel/video link and download as MP4. Works with Reel, watch, and fb.watch links. Sign in to use the tool."
        />
        <meta property="og:title" content="Facebook Reel Downloader - Download Facebook Reels | Kreatli" />
        <meta
          property="og:description"
          content="Paste a public Facebook Reel/video link and download as MP4. Works with Reel, watch, and fb.watch links."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={CANONICAL_URL} />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:alt" content="Facebook Reel Downloader - Download Facebook Reels | Kreatli" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Facebook Reel Downloader - Download Facebook Reels | Kreatli" />
        <meta
          name="twitter:description"
          content="Paste a public Facebook Reel/video link and download as MP4. Works with Reel, watch, and fb.watch links."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
        <link rel="canonical" href={CANONICAL_URL} />
      </Head>

      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Free Tools', url: '/free-tools' },
          { name: 'Facebook Reel Downloader', url: PAGE_PATH },
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
            <h1 className="mx-auto max-w-2xl font-sans text-3xl font-bold sm:text-4xl">Facebook Reel Downloader</h1>
            <p className="mx-auto max-w-3xl text-lg text-foreground-500">
              Download Facebook Reels and public Facebook video posts as MP4 from a link. Sign in to use the tool; start
              a trial or choose a plan if your subscription isn&apos;t active.
            </p>
          </div>
        </section>

        <section className="relative overflow-hidden px-6 pb-12">
          <div className="relative z-10 mx-auto max-w-6xl">
            <FreeToolsEntitlementSection
              lockedTitle="Facebook Reel Downloader is available with an active trial or plan"
              lockedDescription="Your trial or plan isn&apos;t active. Start a trial or choose a plan to download videos from a public Facebook link on this page."
            >
              <FacebookReelDownloaderTool />
            </FreeToolsEntitlementSection>
          </div>
        </section>

        <section className="relative overflow-hidden px-6 pb-6">
          <div className="relative z-10 mx-auto max-w-6xl">
            <div className="rounded-xl border border-foreground-200 bg-content1/70 p-4 text-sm text-foreground-600">
              <span className="font-semibold text-foreground">Rights &amp; usage:</span> only download content you own or
              have permission to use. Respect Facebook&apos;s terms and copyright laws. Public links only; no private or
              login-gated content.
            </div>
          </div>
        </section>

        <DefinitionBlock term="Facebook Reel downloader">
          A Facebook Reel downloader helps you save a video file from a public Facebook Reel/video link. It is useful for
          archiving your own posts, internal review, or edit prep when you have the rights to use the content.
        </DefinitionBlock>

        <PlatformStepGuide
          stepsSectionTitle="How to download Facebook Reels"
          stepsIntro="Follow these steps to save a Facebook Reel from a public link."
          steps={FACEBOOK_REEL_DOWNLOADER_STEPS}
        />

        <section className="relative overflow-hidden px-6 pb-6">
          <div className="relative z-10 mx-auto max-w-6xl rounded-2xl border border-foreground-200 bg-content1/70 p-6 text-foreground-600">
            Need the full workflow context? See{' '}
            <NextLink href="/platform/download-facebook-reels" className="font-semibold text-primary">
              Download Facebook Reels
            </NextLink>{' '}
            for platform-level guidance, then read{' '}
            <NextLink href="/guides/how-to-download-facebook-reels" className="font-semibold text-primary">
              How to Download Facebook Reels
            </NextLink>{' '}
            for a step-by-step guide.
          </div>
        </section>

        <section className="relative overflow-hidden px-6 py-16">
          <div className="relative z-10 mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
            <div className="rounded-2xl border border-foreground-200 bg-content1/70 p-6">
              <h2 className="mb-3 font-sans text-2xl font-bold">Common use cases</h2>
              <ul className="space-y-2 text-base text-foreground-600">
                <li>
                  <span className="font-semibold text-foreground">Archive your own Reels:</span> keep MP4 backups for
                  edits, reposts, or internal references.
                </li>
                <li>
                  <span className="font-semibold text-foreground">Internal review:</span> share files with your team for
                  quicker feedback loops.
                </li>
                <li>
                  <span className="font-semibold text-foreground">Cross-platform prep:</span> save source files before
                  resizing, compression, and delivery workflows.
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-foreground-200 bg-content1/70 p-6">
              <h2 className="mb-3 font-sans text-2xl font-bold">Troubleshooting</h2>
              <ul className="space-y-2 text-base text-foreground-600">
                <li>
                  <span className="font-semibold text-foreground">Private/restricted post:</span> this tool only supports
                  public links accessible without login.
                </li>
                <li>
                  <span className="font-semibold text-foreground">Download does not start:</span> resolve the link again,
                  then retry.
                </li>
                <li>
                  <span className="font-semibold text-foreground">Quality varies:</span> quality depends on what Facebook
                  exposes in public metadata for that post.
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
                Public links, rights, and what to do when a download fails.
              </p>
            </div>
            <Accordion variant="splitted" aria-label="Facebook Reel downloader FAQs" className="gap-2">
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
