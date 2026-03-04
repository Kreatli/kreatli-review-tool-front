import { Accordion, AccordionItem, Button, Card, CardBody } from '@heroui/react';
import Head from 'next/head';
import NextLink from 'next/link';

import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';
import { ShareFeaturePreview } from '../../components/home/Features/ShareFeaturePreview';
import { FooterSection } from '../../components/home/Footer/FooterSection';
import { PlatformStepGuide, HOST_VIDEO_STEPS } from '../../components/shared/PlatformStepGuide';
import { PricingSection } from '../../components/home/PricingSection/PricingSection';
import { Header } from '../../components/layout/Header/Header';
import { Decorations } from '../../components/layout/Storyblok/Decorations';
import { BreadcrumbStructuredData } from '../../components/shared/BreadcrumbStructuredData';
import { CTASection } from '../../components/shared/CTASection';
import { FAQStructuredData } from '../../components/shared/FAQStructuredData';
import { MoreFreeToolsSection } from '../../components/shared/MoreFreeToolsSection';
import { RelatedResourcesSection } from '../../components/shared/RelatedResourcesSection';
import { ResourcesArticlesPreviewSection } from '../../components/shared/ResourcesArticlesPreviewSection';
import { Icon } from '../../components/various/Icon';
import { getPlatformArticles } from '../../data/platform-articles';
import { getFreeToolsForPlatform } from '../../data/platform-free-tools';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';

const faqs = [
  {
    question: 'What does it mean to host video in Kreatli?',
    answer:
      'Hosting video in Kreatli means your files live in a secure, version-aware workspace instead of scattered drives or unmanaged links. You upload videos once, organize them into projects and folders, and use secure review links for every round of feedback and approval. All comments, annotations, and approvals stay tied to the hosted asset so you always know which cut is current.',
  },
  {
    question: 'How is hosting video in Kreatli different from Google Drive or Dropbox?',
    answer:
      'Traditional storage tools are great for generic file backup, but they are not built for creative review. In Kreatli, hosted videos live inside a frame-accurate review player with comments, drawings, approvals, and version history. Instead of sending new folders and links for every cut, you keep one hosted asset that can be shared, reviewed, and approved without losing context.',
  },
  {
    question: 'Is my hosted video content secure?',
    answer:
      'Yes. Kreatli uses encrypted storage and enterprise-grade infrastructure to protect your hosted videos. You control who can view, comment, or approve; you can revoke links, update access, and keep a clear audit trail of who interacted with which version. This is significantly safer than unmanaged file shares or attachments.',
  },
  {
    question: 'Can clients view hosted videos without creating an account?',
    answer:
      'Yes. You can host videos in Kreatli and share secure guest review links with clients and external stakeholders. They open the video in their browser, watch in high quality, and leave frame-accurate comments and annotations without creating an account. All feedback flows back into the same hosted asset for your team.',
  },
  {
    question: 'What file sizes and formats can I host in Kreatli?',
    answer:
      'Kreatli is built for professional video workflows and supports common production formats like MP4 and MOV. You can host large files without worrying about email limits or expiring transfer links. Once uploaded, each hosted file can be shared, reviewed, and versioned as many times as you need.',
  },
  {
    question: 'Can I keep finished projects hosted for long-term access?',
    answer:
      'Yes. Many teams use Kreatli as a long-term hub for finished campaigns and evergreen content. You can keep hosted videos organized by client, campaign, or channel, then reshare or repurpose them later without re-uploading. Version history and approvals stay attached so you always know what was delivered.',
  },
];

export default function HostVideoPage() {
  useSession();
  const articles = getPlatformArticles('/platform/host-video');

  return (
    <>
      <Head>
        <title>Host Video | Kreatli</title>
        <meta
          name="description"
          content="Host video securely in Kreatli with version history, permissions, and frame-accurate review. Keep your video library in one place and share hosted videos via secure links."
        />
        <link rel="canonical" href="https://kreatli.com/platform/host-video" />
        <meta property="og:url" content="https://kreatli.com/platform/host-video" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Host Video | Kreatli" />
        <meta
          property="og:description"
          content="Host video securely with Kreatli. Organize your video library, control access, and share hosted videos for frame-accurate review and approval."
        />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:secure_url" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:alt" content="Host Video | Kreatli" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Host Video | Kreatli" />
        <meta
          name="twitter:description"
          content="Host video securely in Kreatli with version history, permissions, and frame-accurate review so your team and clients always see the right cut."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
      </Head>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Platform', url: '/platform' },
          { name: 'Host Video', url: '/platform/host-video' },
        ]}
      />
      <FAQStructuredData faqs={faqs} />
      <Header />
      <Decorations />

      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h1 className="mx-auto max-w-2xl font-sans text-3xl font-bold leading-tight sm:text-4xl sm:leading-tight">
              Host Video in One Secure Workspace
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground-500">
              Host video files in Kreatli instead of scattered drives and expiring links. Organize your library, control
              access, and share hosted videos for frame-accurate review and approval.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
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
          <ShareFeaturePreview />
        </div>
      </section>

      {/* How to Host Video in Kreatli (step-by-step) */}
      <PlatformStepGuide
        stepsSectionTitle="How to Host Video in Kreatli"
        stepsIntro="Follow these steps to host your video library in Kreatli—from upload and organization to secure sharing and long-term access."
        steps={HOST_VIDEO_STEPS}
        completeGuide={{
          href: '/guides/how-to-annotate-video',
          description:
            'See how teams use Kreatli to host, review, and approve video with frame-accurate feedback across production workflows.',
        }}
      />

      {/* Hosting Workflow Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Turn Kreatli Into Your Hosted Video Hub</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Host active projects and archives in Kreatli so every video, version, and approval lives in one secure place
              instead of scattered across tools.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="folder" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Organize by Client or Campaign</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Group hosted videos by client, show, or campaign. Keep rough cuts, revisions, and final exports in one
                  structured workspace instead of buried in folders and drives.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="shield" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Control Who Sees What</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Host video assets with clear permissions. Decide who can view, comment, or approve each file so
                  stakeholders only see what is relevant to them.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="monitorPlay" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Streamlined Review on Hosted Video</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Every hosted video opens in a frame-accurate review player. Reviewers can leave comments, drawings, and
                  approvals directly on the hosted asset without downloading files.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="time" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Keep a Long-Term Record</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Hosted videos keep their version history and approval trail. Months later, you can still see which cut
                  was approved and reuse assets without starting over.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Hosting vs Sending Files Section */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">
              Host Video Instead of Chasing Download Links
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Replace expiring transfers and inbox searches with a hosted video workspace where files, feedback, and
              approvals stay connected.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="upload" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Upload Once, Reuse Often</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Host a video once and reuse it across campaigns, channels, and stakeholders. Generate new review links
                  from the same hosted asset instead of re-uploading the same file to multiple tools.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="checkCircle" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Know Which Version Was Approved</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Because reviews happen on hosted assets, you can always see which version received sign-off. Version
                  history and approvals stay attached to the file—not hidden in separate links or email threads.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Free Tools Section */}
      <MoreFreeToolsSection
        title="Free Tools for Video Teams"
        description="Explore free tools that support video hosting workflows—frame-accurate review, feedback, and data transfer planning."
        tools={getFreeToolsForPlatform('/platform/host-video')}
      />

      {/* See How This Works Section */}
      <ResourcesArticlesPreviewSection
        articles={articles}
        title="See How Teams Host Video in Practice"
        description="Explore guides and comparisons that show how creative teams host, review, and approve video in Kreatli."
      />

      <PricingSection />

      {/* FAQ Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Get detailed answers about hosting video in Kreatli and how it fits into your review and approval workflows.
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
          <div className="mx-auto mt-12 flex max-w-3xl flex-col items-center gap-4 text-center">
            <h3 className="font-sans text-xl font-bold">Still Have Questions?</h3>
            <p className="text-foreground-500">
              If you did not find the answer you were looking for, reach out to our team at{' '}
              <a href="mailto:support@kreatli.com" className="font-medium text-primary underline underline-offset-2">
                support@kreatli.com
              </a>{' '}
              to learn how hosting video in Kreatli can support your specific production workflow.
            </p>
          </div>
        </div>
      </section>

      {/* More Resources Section */}
      <RelatedResourcesSection
        resources={getRelatedResources(['secureAssetStorage', 'creativeWorkspace', 'reviewApproval', 'videoAnnotation'])}
        title="More Resources"
        description="Explore other Kreatli platform features that help you manage hosted videos, collect precise feedback, and keep approvals organized."
      />

      {/* CTA Section */}
      <CTASection
        title="Ready to Host Video in One Place?"
        description="Use Kreatli to host your video library, control access, and collect frame-accurate feedback and approvals—all in one secure workspace."
      />
      <FooterSection hideCta={true} />
      <SignUpModal />
    </>
  );
}

