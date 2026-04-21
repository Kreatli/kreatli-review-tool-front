/* eslint-disable max-len */
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
import { RelatedResourcesSection } from '../../components/shared/RelatedResourcesSection';
import { TikTokDownloaderTool } from '../../components/tiktok-downloader/TikTokDownloaderTool';
import { getFreeToolsForFreeToolPage } from '../../data/free-tools-page-tools';
import { getRelatedResources } from '../../data/related-resources';
import { FREE_TOOL_PAGE_ACCOUNT_FAQ } from '../../data/marketing-free-tool-access';
import { useSession } from '../../hooks/useSession';

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
        <meta property="og:url" content="https://kreatli.com/free-tools/tiktok-video-downloader" />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TikTok Video Downloader – Download TikTok Videos | Kreatli" />
        <meta
          name="twitter:description"
          content="Paste a TikTok link and download the video. We’ll attempt a no-watermark download when available and fall back if not. Free to use."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
        <link rel="canonical" href="https://kreatli.com/free-tools/tiktok-video-downloader" />
      </Head>

      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Free Tools', url: '/free-tools' },
          { name: 'TikTok Video Downloader', url: '/free-tools/tiktok-video-downloader' },
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
              Paste a TikTok link and download the video. We’ll attempt a no-watermark download when available, and fall
              back if it isn’t.
            </p>
          </div>
        </section>

        <section className="relative overflow-hidden px-6 pb-12">
          <div className="relative z-10 mx-auto max-w-6xl">
            <FreeToolsEntitlementSection>
              <TikTokDownloaderTool />
            </FreeToolsEntitlementSection>
          </div>
        </section>

        <section className="relative overflow-hidden px-6 pb-6">
          <div className="relative z-10 mx-auto max-w-6xl">
            <div className="rounded-xl border border-foreground-200 bg-content1/70 p-4 text-sm text-foreground-600">
              <span className="font-semibold text-foreground">Rights &amp; usage:</span> only download content you own or have permission to use. Respect TikTok’s Terms of Service and copyright laws. This tool does not require TikTok login credentials.
            </div>
          </div>
        </section>

        <DefinitionBlock term="TikTok video downloader">
          A TikTok video downloader helps you save a TikTok video file to your device from a public TikTok link. It’s useful for archiving your own posts, sharing clips in internal review, or keeping a backup for editing—only when you have the rights to use the content.
        </DefinitionBlock>

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

        <MoreFreeToolsSection
          tools={getFreeToolsForFreeToolPage('/free-tools/tiktok-video-downloader')}
          title="More Tools for Video Teams"
        />

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

