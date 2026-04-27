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
import { PlatformStepGuide, WorkflowStep } from '../../components/shared/PlatformStepGuide';
import { RelatedResourcesSection } from '../../components/shared/RelatedResourcesSection';
import { VideoFrameRateConverterTool } from '../../components/video-frame-rate-converter/VideoFrameRateConverterTool';
import { getFreeToolsForFreeToolPage } from '../../data/free-tools-page-tools';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';

const PAGE_PATH = '/free-tools/video-frame-rate-converter';
const CANONICAL_URL = 'https://kreatli.com' + PAGE_PATH;

const FRAME_RATE_CONVERTER_STEPS: WorkflowStep[] = [
  {
    step: 1,
    title: 'Upload your source video',
    description: 'Drop an MP4, MOV, or WebM file into the converter. Processing runs locally in your browser.',
    icon: 'upload',
    image: null,
  },
  {
    step: 2,
    title: 'Choose a target frame rate',
    description:
      'Select your target FPS preset (for example 24, 25, 30, 50, or 60) based on your delivery or platform requirements.',
    icon: 'time',
    image: null,
  },
  {
    step: 3,
    title: 'Convert to constant FPS',
    description: 'Click “Convert frame rate” to create a constant-frame-rate output for predictable playback and editing.',
    icon: 'play',
    image: null,
  },
  {
    step: 4,
    title: 'Download the converted file',
    description: 'When processing completes, download starts automatically and you can save the converted MP4 or MOV.',
    icon: 'download',
    image: null,
  },
];

const faqs = [
  {
    question: 'What does a video frame rate converter do?',
    answer:
      'A video frame rate converter changes how many frames are encoded per second (FPS). It is useful when you need a delivery format like 24fps, 25fps, or 30fps, or when a platform/editor expects constant frame rate.',
  },
  {
    question: 'Will converting frame rate change motion smoothness?',
    answer:
      'It can. Lower FPS may look less smooth, and higher FPS can duplicate or interpolate frames depending on the source. Choose a target FPS that matches your publishing or post-production workflow.',
  },
  {
    question: 'Can I convert variable frame rate video to constant frame rate?',
    answer:
      'Yes. This tool outputs a constant frame rate version, which helps avoid sync and timeline issues in some editing workflows.',
  },
  {
    question: 'Do I need to upload my file to a server?',
    answer:
      'No. Conversion runs in your browser on your device. Your original source file stays local during processing.',
  },
  {
    question: 'Do I need an active trial or plan to use this tool?',
    answer:
      'Yes. Sign in to use the tool. If your trial or subscription is inactive, start a trial or choose a plan to continue converting videos on this page.',
  },
];

export default function VideoFrameRateConverterPage() {
  useSession();

  return (
    <>
      <Head>
        <title>Video Frame Rate Converter – Convert FPS Online | Kreatli</title>
        <meta
          name="description"
          content="Convert video frame rate online to 24fps, 25fps, 30fps, 50fps, or 60fps. Create constant-FPS MP4/MOV output directly in your browser."
        />
        <meta property="og:title" content="Video Frame Rate Converter – Convert FPS Online | Kreatli" />
        <meta
          property="og:description"
          content="Convert video frame rate online to 24fps, 25fps, 30fps, 50fps, or 60fps. Create constant-FPS MP4/MOV output directly in your browser."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={CANONICAL_URL} />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:alt" content="Video Frame Rate Converter – Convert FPS Online | Kreatli" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Video Frame Rate Converter – Convert FPS Online | Kreatli" />
        <meta
          name="twitter:description"
          content="Convert video frame rate online to 24fps, 25fps, 30fps, 50fps, or 60fps. Create constant-FPS MP4/MOV output directly in your browser."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
        <link rel="canonical" href={CANONICAL_URL} />
      </Head>

      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Free Tools', url: '/free-tools' },
          { name: 'Video Frame Rate Converter', url: PAGE_PATH },
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
            <h1 className="mx-auto max-w-2xl font-sans text-3xl font-bold sm:text-4xl">Video Frame Rate Converter</h1>
            <p className="mx-auto max-w-3xl text-lg text-foreground-500">
              Change video FPS online and change video frame rate output for smoother playback compatibility. Sign in to
              use this video frame rate converter; start a trial or choose a plan if your subscription isn’t active.
            </p>
          </div>
        </section>

        <section className="relative overflow-hidden px-6 pb-12">
          <div className="relative z-10 mx-auto max-w-6xl">
            <FreeToolsEntitlementSection
              lockedTitle="Video Frame Rate Converter is available inside Kreatli"
              lockedDescription="Your trial or plan isn’t active. Start a trial or choose a plan to convert video frame rates in Kreatli."
            >
              <VideoFrameRateConverterTool />
            </FreeToolsEntitlementSection>
          </div>
        </section>

        <DefinitionBlock term="Video frame rate converter">
          A video frame rate converter changes frames per second to match delivery requirements or normalize variable-FPS
          footage into constant-FPS output for more predictable editing and playback.
        </DefinitionBlock>

        <PlatformStepGuide
          stepsSectionTitle="How to convert video frame rate"
          stepsIntro="Follow these steps to convert FPS and export a constant-frame-rate video for delivery or post-production."
          steps={FRAME_RATE_CONVERTER_STEPS}
        />

        <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
          <div className="relative z-10 mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
              <p className="mx-auto max-w-2xl text-lg text-foreground-500">
                Quick answers on FPS conversion, constant frame rate output, and workflow fit.
              </p>
            </div>
            <Accordion variant="splitted" aria-label="Video frame rate converter FAQs" className="gap-2">
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
          resources={getRelatedResources(['creativeWorkspace', 'reviewApproval', 'videoAnnotation'])}
          title="More Resources"
          description="Learn more about workflows for video prep, review, approvals, and final delivery."
        />

        <CTASection
          title="Need feedback and approvals after frame rate conversion?"
          description="Upload converted cuts to Kreatli to collect frame-accurate feedback, keep versions organized, and move approvals faster."
          primaryButtonText="Start 7-day trial"
        />
      </main>

      <FooterSection hideCta />
      <SignUpModal />
    </>
  );
}
