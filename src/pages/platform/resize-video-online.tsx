import { Accordion, AccordionItem, Button, Card, CardBody } from '@heroui/react';
import Head from 'next/head';
import NextLink from 'next/link';

import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';
import { FooterSection } from '../../components/home/Footer/FooterSection';
import { Header } from '../../components/layout/Header/Header';
import { Decorations } from '../../components/layout/Storyblok/Decorations';
import { BreadcrumbStructuredData } from '../../components/shared/BreadcrumbStructuredData';
import { CTASection } from '../../components/shared/CTASection';
import { FAQStructuredData } from '../../components/shared/FAQStructuredData';
import { MoreFreeToolsSection } from '../../components/shared/MoreFreeToolsSection';
import { RelatedResourcesSection } from '../../components/shared/RelatedResourcesSection';
import { ResourcesArticlesPreviewSection } from '../../components/shared/ResourcesArticlesPreviewSection';
import { Icon } from '../../components/various/Icon';
import { ResizeVideoFAQ, RESIZE_VIDEO_FAQS } from '../../components/resize-video/ResizeVideoFAQ';
import { ResizeVideoGuide } from '../../components/resize-video/ResizeVideoGuide';
import { ResizeVideoTool } from '../../components/resize-video/ResizeVideoTool';
import { getPlatformArticles } from '../../data/platform-articles';
import { getFreeToolsForPlatform } from '../../data/platform-free-tools';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';

const faqs = [
  {
    question: 'What does it mean to resize video online in Kreatli?',
    answer:
      'Resizing video online in Kreatli means using a browser-based workflow to change resolution and aspect ratio without installing desktop software. You can resize footage for social formats or web use, then upload to Kreatli to manage versions, collect feedback, and approve cuts—all in one place.',
  },
  {
    question: 'Can I resize video online for social formats like Reels or TikTok?',
    answer:
      'Yes. You can use our free Resize Video tool to change resolution for formats like Instagram Reels, TikTok, and YouTube. After resizing, upload the video into Kreatli to keep versions, comments, and approvals connected to the asset.',
  },
  {
    question: 'Is resizing video online in Kreatli secure?',
    answer:
      'The Resize Video tool runs locally in the browser for many workflows, and when you upload into Kreatli, files are stored with encrypted, enterprise-grade storage. You can keep resized masters in secure asset storage with access controls, version history, and audit trails.',
  },
  {
    question: 'Can I manage different resized versions of the same video?',
    answer:
      'Yes. In Kreatli you can upload resized versions into a single asset as new versions. The Video Versioning features let you keep 16:9, 9:16, and square exports in one place, switch between them, and compare feedback across cuts.',
  },
  {
    question: 'Can clients review resized videos without downloading?',
    answer:
      'Yes. Once you resize video online and upload to Kreatli, you can share review links so clients watch in the browser and leave frame-accurate feedback. They do not need to download the file or install special tools.',
  },
  {
    question: 'How does resizing video online fit into my production workflow?',
    answer:
      'Teams often resize video online as a last mile step for channel-specific formats. With Kreatli, that step connects directly to storage, review, and approvals so you do not lose track of which resized version was approved for which channel.',
  },
];

export default function ResizeVideoOnlinePage() {
  useSession();
  const articles = getPlatformArticles('/platform/resize-video-online');

  return (
    <>
      <Head>
        <title>Resize Video Online | Kreatli</title>
        <meta
          name="description"
          content="Resize video online for social and web formats, then manage versions, review, and approvals in Kreatli’s creative production workspace."
        />
        <link rel="canonical" href="https://kreatli.com/platform/resize-video-online" />
        <meta property="og:url" content="https://kreatli.com/platform/resize-video-online" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Resize Video Online | Kreatli" />
        <meta
          property="og:description"
          content="Resize video online for Reels, TikTok, YouTube, and more—then keep resized versions, feedback, and approvals organized in Kreatli."
        />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:secure_url" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:alt" content="Resize Video Online | Kreatli" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Resize Video Online | Kreatli" />
        <meta
          name="twitter:description"
          content="Use Kreatli to resize video online and connect resized exports to secure storage, review, and approvals for creative teams."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
      </Head>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Platform', url: '/platform' },
          { name: 'Resize Video Online', url: '/platform/resize-video-online' },
        ]}
      />
      <FAQStructuredData faqs={faqs} />
      <Header />
      <Decorations />

      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 pt-16 pb-4">
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 text-center">
          <h1 className="mx-auto max-w-2xl font-sans text-3xl font-bold leading-tight sm:text-4xl sm:leading-tight">
            Resize Video Online for Every Channel
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-foreground-500">
            Resize video online for Reels, TikTok, YouTube, and web in a few clicks—then keep resized versions, comments,
            and approvals organized in a single creative production workspace.
          </p>
          <div className="mt-4 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button as={NextLink} href="/sign-up" size="lg" className="bg-foreground text-content1">
              Get Started for Free
            </Button>
            <Button
              as="a"
              href="https://calendar.app.google/NXbAeTAUwaBGh5x49"
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              variant="bordered"
            >
              Book a Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Inline Resize Video Tool Section */}
      <section className="relative overflow-hidden px-6 pb-12">
        <div className="relative z-10 mx-auto max-w-6xl">
          <ResizeVideoTool />
        </div>
      </section>

      {/* How to Resize Video Online Section */}
      <ResizeVideoGuide />

      {/* Benefits Section */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Why Resize Video Online With Kreatli</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Combine a fast online resizer with version-aware storage, frame-accurate review, and approvals so every export
              fits your channels and your workflow.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="fullscreen" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Resize for Every Format</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Use presets or custom sizes to resize video online for vertical, square, and landscape formats—covering
                  Reels, TikTok, YouTube, and more from one workflow.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="time" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Keep Versions Together</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Upload resized exports into version stacks so 16:9, 9:16, and square cuts stay in one place with clear
                  history and approvals.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="paint" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Review Resized Video With Context</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Share review links for resized exports so clients see the right aspect ratio and leave frame-accurate
                  feedback tied to that specific cut.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section (reuse detailed resizer FAQs) */}
      <ResizeVideoFAQ />

      {/* Free Tools Section */}
      <MoreFreeToolsSection
        title="Free Tools for Video Teams"
        description="Explore free tools that complement resizing video online—frame extraction, safe zones, and more."
        tools={getFreeToolsForPlatform('/platform/resize-video-online')}
      />

      {/* See How This Works Section */}
      <ResourcesArticlesPreviewSection
        articles={articles}
        title="See How Teams Resize Video Online in Practice"
        description="Explore guides and comparisons that show how creative teams resize video online and keep versions and approvals organized in Kreatli."
      />

      {/* More Resources Section */}
      <RelatedResourcesSection
        resources={getRelatedResources(['creativeWorkspace', 'reviewApproval', 'secureAssetStorage'])}
        title="More Resources"
        description="Explore more Kreatli features that support multi-channel video workflows, from secure storage to frame-accurate review."
      />

      {/* CTA Section */}
      <CTASection
        title="Ready to Resize Video Online and Keep Every Cut Organized?"
        description="Use Kreatli to resize video online, manage versions, and collect frame-accurate feedback across every channel."
      />
      <FooterSection hideCta={true} />
      <SignUpModal />
    </>
  );
}

