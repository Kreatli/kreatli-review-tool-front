/* eslint-disable max-len */
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

const PAGE_PATH = '/platform/video-frame-rate-converter';
const CANONICAL_URL = 'https://kreatli.com' + PAGE_PATH;
const TOOL_PATH = '/free-tools/video-frame-rate-converter';

const STEPS: WorkflowStep[] = [
  {
    step: 1,
    title: 'Upload your source video',
    description: 'Drop your source clip (MP4, MOV, or WebM) into the tool.',
    icon: 'upload',
    image: null,
  },
  {
    step: 2,
    title: 'Pick a target FPS',
    description: 'Choose the frame rate your editor, platform, or client delivery spec requires.',
    icon: 'time',
    image: null,
  },
  {
    step: 3,
    title: 'Convert to constant frame rate',
    description: 'Generate a constant-FPS output for more consistent playback and timeline behavior.',
    icon: 'play',
    image: null,
  },
  {
    step: 4,
    title: 'Download and continue review',
    description: 'Download the converted video and move it into review, comments, and approvals in Kreatli.',
    icon: 'download',
    image: null,
  },
];

const faqs = [
  {
    question: 'Why convert video frame rate before review or delivery?',
    answer:
      'Converting frame rate helps standardize exports for platform specs and post-production workflows. Constant-FPS output can reduce playback inconsistencies and timeline sync issues in some editors.',
  },
  {
    question: 'What target frame rate should I use?',
    answer:
      'Use the FPS required by your destination: 24fps for cinematic delivery, 25fps for PAL regions, 30fps for many web workflows, and higher rates such as 50/60fps when smooth motion is required.',
  },
  {
    question: 'Does frame rate conversion affect quality?',
    answer:
      'Potentially. Any re-encode can introduce quality changes. Lower FPS can look less smooth, while higher FPS may duplicate frames depending on the source.',
  },
  {
    question: 'Can I pair this with version review workflows?',
    answer:
      'Yes. After converting frame rate, upload the output to Kreatli for frame-accurate comments, approvals, and version tracking in the same workspace.',
  },
];

export default function VideoFrameRateConverterPlatformPage() {
  useSession();
  const articles = getPlatformArticles(PAGE_PATH);

  return (
    <>
      <Head>
        <title>Change Video FPS Online | Kreatli</title>
        <meta
          name="description"
          content="Change video FPS online for consistent delivery and smoother post workflows. Use a browser-based video FPS changer, then manage review and approvals in Kreatli."
        />
        <link rel="canonical" href={CANONICAL_URL} />
        <meta property="og:url" content={CANONICAL_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Change Video FPS Online | Kreatli" />
        <meta
          property="og:description"
          content="Change video FPS online for consistent delivery and smoother post workflows. Use a browser-based video FPS changer, then manage review and approvals in Kreatli."
        />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:secure_url" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:alt" content="Change Video FPS Online | Kreatli" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Change Video FPS Online | Kreatli" />
        <meta
          name="twitter:description"
          content="Change video FPS online for consistent delivery and smoother post workflows. Use a browser-based video FPS changer, then manage review and approvals in Kreatli."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
      </Head>

      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Platform', url: '/platform' },
          { name: 'Change Video FPS', url: PAGE_PATH },
        ]}
      />

      <FAQStructuredData faqs={faqs} />

      <Header />
      <Decorations />

      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h1 className="mx-auto max-w-2xl font-sans text-3xl font-bold leading-tight sm:text-4xl sm:leading-tight">
              Change Video FPS
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground-500">
              Change video FPS for cleaner handoffs, platform-ready exports, and more predictable post-production
              workflows with a video frame rate converter and video FPS changer.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button as={NextLink} href={TOOL_PATH} size="lg" className="bg-foreground text-content1">
                Change Video FPS Now
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
        stepsSectionTitle="How to convert video frame rate"
        stepsIntro="Use this workflow to convert FPS, normalize variable-frame-rate footage, and prep files for consistent delivery."
        steps={STEPS}
        completeGuide={{
          href: '/guides/how-to-convert-video-frame-rate',
          description: 'Read the complete guide for FPS selection, conversion trade-offs, and troubleshooting.',
        }}
      />

      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Why teams change video FPS in production</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Change video frame rate before upload, collaborative review, and final approval to keep delivery specs
              aligned.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardBody className="p-6">
                <h3 className="font-sans text-lg font-semibold">Meet platform and delivery specs</h3>
                <p className="mt-2 text-sm text-foreground-500">
                  Match required frame rates for ad platforms, broadcasters, social channels, and partner handoff specs.
                </p>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="p-6">
                <h3 className="font-sans text-lg font-semibold">Reduce timeline and sync surprises</h3>
                <p className="mt-2 text-sm text-foreground-500">
                  Converting to constant FPS can make editing timelines behave more predictably in downstream tools.
                </p>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="p-6">
                <h3 className="font-sans text-lg font-semibold">Keep review cycles clean</h3>
                <p className="mt-2 text-sm text-foreground-500">
                  Convert first, then review the same export everyone will discuss so comments and approvals align.
                </p>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="p-6">
                <h3 className="font-sans text-lg font-semibold">Bridge to full collaboration workflows</h3>
                <p className="mt-2 text-sm text-foreground-500">
                  After conversion, upload to Kreatli for frame-accurate feedback, version tracking, and sign-offs.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      <MoreFreeToolsSection
        title="Free Tools for Video Teams"
        description="Explore complementary tools for delivery prep, review workflows, and publishing handoff."
        tools={getFreeToolsForPlatform(PAGE_PATH)}
      />

      <ResourcesArticlesPreviewSection
        articles={articles}
        title="Related guides and workflows"
        description="See how teams handle frame rate conversion, delivery prep, and collaborative approvals."
      />

      <PricingSection />

      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Answers on FPS targets, quality trade-offs, and integrating conversion into review workflows.
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
        </div>
      </section>

      <RelatedResourcesSection
        resources={getRelatedResources(['creativeWorkspace', 'reviewApproval', 'videoAnnotation'])}
        title="More Resources"
        description="Explore platform capabilities that support prepared video delivery, collaborative review, and approvals."
      />

      <CTASection
        title="Need approvals after converting frame rate?"
        description="Use Kreatli to convert FPS, keep versions organized, and collect frame-accurate feedback in one workspace."
      />

      <FooterSection hideCta={true} />
      <SignUpModal />
    </>
  );
}
