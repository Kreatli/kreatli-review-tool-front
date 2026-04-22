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
import { InstagramReelDownloaderTool } from '../../components/instagram-reel-downloader/InstagramReelDownloaderTool';
import { getFreeToolsForFreeToolPage } from '../../data/free-tools-page-tools';
import { getRelatedResources } from '../../data/related-resources';
import { FREE_TOOL_PAGE_ACCOUNT_FAQ } from '../../data/marketing-free-tool-access';
import { useSession } from '../../hooks/useSession';

const PAGE_PATH = '/free-tools/instagram-reel-downloader';
const CANONICAL_URL = 'https://kreatli.com' + PAGE_PATH;

const INSTAGRAM_DOWNLOADER_STEPS: WorkflowStep[] = [
  {
    step: 1,
    title: 'Copy the Instagram Reel link',
    description:
      'Open the Reel in Instagram, tap Share, and copy the link. This tool only works for public posts you can open without logging in.',
    icon: 'link',
    image: null,
  },
  {
    step: 2,
    title: 'Paste the link into the downloader',
    description:
      'Paste the URL into the field above. We support instagram.com/reel/…, /reels/…, and many /p/… links that point to video.',
    icon: 'upload',
    image: null,
  },
  {
    step: 3,
    title: 'Find the video',
    description:
      'Click “Find video”. We fetch the public page and try to extract the best MP4 URL. If only preview metadata is available, quality may be limited.',
    icon: 'search',
    image: null,
  },
  {
    step: 4,
    title: 'Download the MP4',
    description:
      'Click “Download” to save the video file to your device. We proxy the file through Kreatli so your browser gets a clean attachment.',
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
    question: 'Does this Instagram Reel downloader work for private accounts?',
    answer:
      'No. It only works for public Reels and posts. Private profiles, stories you are not logged in to view, and login-gated content cannot be resolved.',
  },
  {
    question: 'Why is the video quality lower than in the app?',
    answer:
      'Sometimes Instagram only exposes a preview stream in page metadata. When that happens, we still give you a downloadable file, but it may not be full resolution. Try resolving again later or use “Open direct link” if a better URL appears.',
  },
  {
    question: 'Does this support /p/ links as well as /reel/?',
    answer:
      'Yes, when the link points to a public video post. Profile links and non-video pages will not resolve to an MP4.',
  },
  {
    question: 'Why did the download fail or not start?',
    answer:
      'Common causes are browser download settings, expired CDN links, or Instagram rate limits. Click “Find video” again to refresh the URL, then try “Open direct link”. On mobile, you may need a long-press to save.',
  },
  {
    question: 'Can I download Instagram Reels on iPhone or Android?',
    answer:
      'Yes—for public links. Copy the link from the Instagram app and paste it here. If the download does not start in the browser, use “Open direct link” and save from the player (steps vary by browser).',
  },
  {
    question: 'Do I need to log in to Instagram or share my password?',
    answer: 'No. Kreatli does not ask for Instagram credentials. This tool uses public page URLs only.',
  },
  FREE_TOOL_PAGE_ACCOUNT_FAQ,
  {
    question: 'Is it legal to download Instagram Reels?',
    answer:
      'Only download content you own or have permission to use, and follow Instagram’s Terms and copyright law. This tool is meant for legitimate workflows such as saving your own exports or assets shared publicly with approval.',
  },
  {
    question: 'Do you store the video on Kreatli servers?',
    answer:
      'No long-term storage. We resolve a download URL and stream bytes to your browser for the download. We do not ask for Instagram login credentials.',
  },
];

export default function InstagramReelDownloaderPage() {
  useSession();

  return (
    <>
      <Head>
        <title>Instagram Reel Downloader – Download Reels as MP4 | Kreatli</title>
        <meta
          name="description"
          content="Paste a public Instagram Reel link and download the video as MP4. Works in the browser with a direct download and open-link fallback. Sign in to use."
        />
        <meta property="og:title" content="Instagram Reel Downloader – Download Reels as MP4 | Kreatli" />
        <meta
          property="og:description"
          content="Paste a public Instagram Reel link and download the video as MP4. Works in the browser with a direct download and open-link fallback."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={CANONICAL_URL} />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:alt" content="Instagram Reel Downloader – Download Reels as MP4 | Kreatli" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Instagram Reel Downloader – Download Reels as MP4 | Kreatli" />
        <meta
          name="twitter:description"
          content="Paste a public Instagram Reel link and download the video as MP4. Works in the browser with a direct download and open-link fallback."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
        <link rel="canonical" href={CANONICAL_URL} />
      </Head>

      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Free Tools', url: '/free-tools' },
          { name: 'Instagram Reel Downloader', url: PAGE_PATH },
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
            <h1 className="mx-auto max-w-2xl font-sans text-3xl font-bold sm:text-4xl">Instagram Reel Downloader</h1>
            <p className="mx-auto max-w-3xl text-lg text-foreground-500">
              Download public Instagram Reels as MP4 from a link. Paste a Reel or video post URL—we extract the best
              available file and help you save it to your device.
            </p>
          </div>
        </section>

        <section className="relative overflow-hidden px-6 pb-12">
          <div className="relative z-10 mx-auto max-w-6xl">
            <FreeToolsEntitlementSection
              lockedTitle="Instagram Reel Downloader is available with an active trial or plan"
              lockedDescription="Your trial or plan isn’t active. Start a trial or choose a plan to download Reels from a public Instagram link on this page."
            >
              <InstagramReelDownloaderTool />
            </FreeToolsEntitlementSection>
          </div>
        </section>

        <section className="relative overflow-hidden px-6 pb-6">
          <div className="relative z-10 mx-auto max-w-6xl">
            <div className="rounded-xl border border-foreground-200 bg-content1/70 p-4 text-sm text-foreground-600">
              <span className="font-semibold text-foreground">Rights &amp; usage:</span> only download content you own or
              have permission to use. Respect Instagram’s Terms of Service and copyright laws. This tool does not require
              Instagram login credentials.
            </div>
          </div>
        </section>

        <DefinitionBlock term="Instagram Reel downloader">
          An Instagram Reel downloader saves the video file from a public Reel or video post link. It is useful for
          archiving your own posts, internal review, or backups for editing—only when you have the rights to use the
          content.
        </DefinitionBlock>

        <PlatformStepGuide
          stepsSectionTitle="How to download an Instagram Reel"
          stepsIntro="Follow these steps to save a Reel from a public link. If the page only exposes preview metadata, try again later or use the direct link."
          steps={INSTAGRAM_DOWNLOADER_STEPS}
        />

        <section className="relative overflow-hidden px-6 py-16">
          <div className="relative z-10 mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
            <div className="rounded-2xl border border-foreground-200 bg-content1/70 p-6">
              <h2 className="mb-3 font-sans text-2xl font-bold">Common use cases</h2>
              <ul className="space-y-2 text-base text-foreground-600">
                <li>
                  <span className="font-semibold text-foreground">Archive your own Reels:</span> keep MP4 backups of
                  what you published for edits or repurposing.
                </li>
                <li>
                  <span className="font-semibold text-foreground">Internal review:</span> share a file with your team
                  for feedback outside the Instagram app (with permission).
                </li>
                <li>
                  <span className="font-semibold text-foreground">Reference for editing:</span> save a copy to study
                  pacing or captions—only when you have rights or approval.
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-foreground-200 bg-content1/70 p-6">
              <h2 className="mb-3 font-sans text-2xl font-bold">Troubleshooting</h2>
              <ul className="space-y-2 text-base text-foreground-600">
                <li>
                  <span className="font-semibold text-foreground">Low quality:</span> Instagram may not expose full HD
                  in the public page. Try resolving again or use “Open direct link”.
                </li>
                <li>
                  <span className="font-semibold text-foreground">Private or restricted content:</span> this tool cannot
                  access private accounts or login-only media.
                </li>
                <li>
                  <span className="font-semibold text-foreground">Download doesn’t start:</span> use “Open direct link”
                  and save from the new tab, or refresh the resolved link if it expired.
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
                Public links, quality limits, rights, and what to do when a download fails.
              </p>
            </div>
            <Accordion variant="splitted" aria-label="Instagram Reel downloader FAQs" className="gap-2">
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
