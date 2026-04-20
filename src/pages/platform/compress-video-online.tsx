import { Button, Card, CardBody } from '@heroui/react';
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
import { PlatformDefinitionBlock } from '../../components/shared/PlatformDefinitionBlock';
import { RelatedResourcesSection } from '../../components/shared/RelatedResourcesSection';
import { ResourcesArticlesPreviewSection } from '../../components/shared/ResourcesArticlesPreviewSection';
import { Icon } from '../../components/various/Icon';
import { VideoCompressorFAQ } from '../../components/video-compressor/VideoCompressorFAQ';
import { VideoCompressorGuide } from '../../components/video-compressor/VideoCompressorGuide';
import { VideoCompressorTool } from '../../components/video-compressor/VideoCompressorTool';
import { getPlatformArticles } from '../../data/platform-articles';
import { getFreeToolsForPlatform } from '../../data/platform-free-tools';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';

const faqs = [
  {
    question: 'What does it mean to compress video online in Kreatli?',
    answer:
      'Compressing video online in Kreatli means reducing file size so uploads, shares, and handoffs are faster—often before you send a cut for review. You can use the browser-based compressor on this page, then upload into Kreatli to manage versions, collect frame-accurate feedback, and get approvals in one workspace.',
  },
  {
    question: 'Will compressed video look worse than the original?',
    answer:
      'Smaller files usually mean lower bitrate or more aggressive encoding, which can reduce detail in complex scenes. For review rounds, teams often compress a preview while keeping a high-quality master elsewhere. Adjust your target size until the balance fits your delivery and review needs.',
  },
  {
    question: 'Is compressing video online in Kreatli secure?',
    answer:
      'The compressor on this page runs locally in your browser for many workflows. When you upload into Kreatli, files are stored with encrypted, enterprise-grade storage. You can keep assets in secure storage with access controls, version history, and audit trails.',
  },
  {
    question: 'Can clients review compressed videos without downloading?',
    answer:
      'Yes. After you compress and upload to Kreatli, you can share review links so clients watch in the browser and leave frame-accurate feedback. They do not need to download the file or install special tools.',
  },
  {
    question: 'How does compression fit into delivery and approvals?',
    answer:
      'Teams often compress video for email limits, slow uploads, or client preview links. With Kreatli, that step connects directly to storage, review, and approvals so you do not lose track of which file was approved for which channel.',
  },
  {
    question: 'Can I use compression with other Kreatli video tools?',
    answer:
      'Yes. Pair compression with resize video online, frame extraction, and review workflows so every cut—from social exports to full reviews—stays organized in one place.',
  },
];

export default function CompressVideoOnlinePage() {
  useSession();
  const articles = getPlatformArticles('/platform/compress-video-online');

  return (
    <>
      <Head>
        <title>Video Compression for Teams | Kreatli Platform</title>
        <meta
          name="description"
          content="Compress video for faster sharing and uploads, then manage versions, review, and approvals in Kreatli’s production workspace."
        />
        <link rel="canonical" href="https://kreatli.com/platform/compress-video-online" />
        <meta property="og:url" content="https://kreatli.com/platform/compress-video-online" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Video Compression for Teams | Kreatli Platform" />
        <meta
          property="og:description"
          content="Compress video for faster sharing and uploads, then manage versions, review, and approvals in Kreatli’s production workspace."
        />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:secure_url" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:alt" content="Video Compression for Teams | Kreatli Platform" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Video Compression for Teams | Kreatli Platform" />
        <meta
          name="twitter:description"
          content="Compress video for faster sharing and uploads, then manage versions, review, and approvals in Kreatli’s production workspace."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
      </Head>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Platform', url: '/platform' },
          { name: 'Compress Video Online', url: '/platform/compress-video-online' },
        ]}
      />
      <FAQStructuredData faqs={faqs} />
      <Header />
      <Decorations />

      <section className="relative overflow-hidden px-6 pb-4 pt-16">
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 text-center">
          <h1 className="mx-auto max-w-2xl font-sans text-3xl font-bold leading-tight sm:text-4xl sm:leading-tight">
            Compress Video Online for Faster Sharing
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-foreground-500">
            Reduce file size for uploads, email limits, and client handoffs—then keep versions, comments, and approvals
            organized in a single creative production workspace.
          </p>
          <div className="mt-4 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button as={NextLink} href="/sign-up" size="lg" className="bg-foreground text-content1">
              Start 7-day trial
            </Button>
            <Button
              as="a"
              href="https://calendar.app.google/NXbAeTAUwaBGh5x49"
              target="_blank"
              rel="noopener noreferrer nofollow"
              size="lg"
              variant="bordered"
            >
              Book a Demo
            </Button>
          </div>
        </div>
      </section>

      <PlatformDefinitionBlock href="/platform/compress-video-online" />

      <section className="relative overflow-hidden px-6 pb-12">
        <div className="relative z-10 mx-auto max-w-6xl">
          <VideoCompressorTool />
        </div>
      </section>

      <VideoCompressorGuide />

      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Why Compress Video Online With Kreatli</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Pair a fast browser compressor with version-aware storage, frame-accurate review, and approvals so every
              export fits your delivery and your workflow.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="download" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Hit Smaller Size Targets</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Set a target output size (MB) to align with upload caps, transfer time, and client preview needs—then
                  download the compressed file locally.
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
                  Upload compressed exports into Kreatli so previews, masters, and channel-specific cuts stay in one
                  asset stack with clear history.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="paint" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Review With Frame-Accurate Context</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Share review links for any cut so clients watch in the browser and leave feedback tied to timestamps
                  and versions.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      <VideoCompressorFAQ />

      <MoreFreeToolsSection
        title="Free Tools for Video Teams"
        description="Explore free tools that complement compressing video online—resize, frame extraction, transfer estimates, and more."
        tools={getFreeToolsForPlatform('/platform/compress-video-online')}
      />

      <ResourcesArticlesPreviewSection
        articles={articles}
        title="See How Teams Handle Video Size and Delivery"
        description="Explore guides and articles that connect compression, sharing, and organized review in Kreatli."
      />

      <RelatedResourcesSection
        resources={getRelatedResources(['creativeWorkspace', 'reviewApproval', 'secureAssetStorage'])}
        title="More Resources"
        description="Explore more Kreatli features for video workflows, from secure storage to frame-accurate review."
      />

      <CTASection
        title="Ready to Compress Video Online and Keep Every Cut Organized?"
        description="Use Kreatli to compress video for delivery, manage versions, and collect frame-accurate feedback in one place."
      />
      <FooterSection hideCta={true} />
      <SignUpModal />
    </>
  );
}
