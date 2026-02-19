import { Accordion, AccordionItem, Button, Card, CardBody } from '@heroui/react';
import Head from 'next/head';
import NextLink from 'next/link';

import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';
import { ShareFeaturePreview } from '../../components/home/Features/ShareFeaturePreview';
import { FooterSection } from '../../components/home/Footer/FooterSection';
import { FREE_VIDEO_LINK_GENERATOR_STEPS, PlatformStepGuide } from '../../components/shared/PlatformStepGuide';
import { PricingSection } from '../../components/home/PricingSection/PricingSection';
import { Header } from '../../components/layout/Header';
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
    question: 'What is a free video link generator in Kreatli?',
    answer:
      'In Kreatli, the free video link generator lets you create secure, shareable links to your video files so clients and collaborators can review them in their browser—no downloads or accounts required. Instead of sending heavy attachments or juggling WeTransfer links, you generate a single review link that opens an interactive player with frame-accurate comments and approvals. The generator is built into Kreatli’s video review platform, so every link stays connected to the right project, file version, and feedback history.',
  },
  {
    question: 'Can clients open video review links without creating an account?',
    answer:
      'Yes. Kreatli is designed for frictionless client collaboration. When you generate a video review link, you can invite clients, stakeholders, or external partners to watch and comment without forcing them to create an account. They simply click the link, watch the video in their browser, and leave feedback using time-stamped comments. This no-signup experience reduces approval delays and makes it easy to involve busy clients and executives in the review process.',
  },
  {
    question: 'Are Kreatli video links secure and private?',
    answer:
      'Yes. Kreatli video links are backed by enterprise-grade security. You can generate secure, unlisted links that are only accessible to people you share them with, and your underlying video files are encrypted at rest and in transit. Depending on your workflow, you can layer on additional controls like access permissions and link revocation to keep sensitive work private. This makes Kreatli suitable for agencies, in-house teams, and studios working with confidential client material.',
  },
  {
    question: 'Can I control who can comment or approve on a video link?',
    answer:
      'Yes. Kreatli gives you granular control over who can view, comment, and approve assets shared via links. For each project or file, you decide whether a link is view-only or open for comments, and you can keep formal approvals limited to internal stakeholders while still letting clients leave feedback. This ensures that every video review link fits your existing process—whether you are running internal edit passes, client reviews, or final sign-off rounds.',
  },
  {
    question: 'Does Kreatli support versioning for videos shared via links?',
    answer:
      'Yes. Every video you share through a Kreatli link is tied to full version history. When you upload a new cut, you can share it with the same stakeholders while keeping past versions and their comments intact. Approvals are always linked to a specific version, so you can see exactly which cut a client signed off on and what changed since. This protects both your team and your clients by removing ambiguity around which version was approved.',
  },
  {
    question: 'Is the video link generator really free?',
    answer:
      'Kreatli offers a free way to start generating video review links so you can experience the workflow before upgrading. On paid plans, the free video link generator is included as part of the broader review and approval platform, with higher limits, advanced permissions, and support for larger teams and libraries. This lets small teams get started at no cost while giving growing organizations room to scale into more robust collaboration workflows.',
  },
];

export default function FreeVideoLinkGeneratorPage() {
  useSession();
  const articles = getPlatformArticles('/platform/free-video-link-generator');

  return (
    <>
      <Head>
        <title>Free Video Link Generator | Kreatli</title>
        <meta
          name="description"
          content="Use Kreatli’s free video link generator to create secure, shareable video review links in seconds. Let clients watch, comment, and approve online—no downloads or accounts required."
        />
        <link rel="canonical" href="https://kreatli.com/platform/free-video-link-generator" />
        <meta property="og:url" content="https://kreatli.com/platform/free-video-link-generator" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Free Video Link Generator | Kreatli" />
        <meta
          property="og:description"
          content="Generate secure video review links for clients and collaborators. Share videos online, collect frame-accurate feedback, and track approvals in one place."
        />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:secure_url" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:alt" content="Free Video Link Generator | Kreatli" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Video Link Generator | Kreatli" />
        <meta
          name="twitter:description"
          content="Create secure, shareable video review links in seconds. Let clients review and comment in their browser with Kreatli’s free video link generator."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
      </Head>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Platform', url: '/platform' },
          { name: 'Free Video Link Generator', url: '/platform/free-video-link-generator' },
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
              Free Video Link Generator
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground-500">
              Generate secure, shareable video review links in seconds. Let clients watch, comment, and approve
              online—no downloads, attachments, or account creation required.
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

      {/* How to Generate Video Links in Kreatli (step-by-step) */}
      <PlatformStepGuide
        stepsSectionTitle="How to Generate Video Links in Kreatli"
        stepsIntro="Follow these steps to create secure, shareable video review links—from upload to share and approval."
        steps={FREE_VIDEO_LINK_GENERATOR_STEPS}
        completeGuide={{
          href: '/guides/share-large-video-files',
          description:
            'Learn different ways to share large video files with clients, compare methods, and get a step-by-step workflow for review and approval.',
        }}
      />

      {/* Generate Links Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Generate Shareable Video Links in Seconds</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Upload your video once, then generate as many secure review links as you need. Give every client and
              collaborator a tailored, no-fuss way to review your work.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="link" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">One Link for Every Review</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Turn any video in Kreatli into a clean, shareable review link. Stop juggling WeTransfer links, giant
                  attachments, or multiple drives just to get feedback.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="group" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Client-Friendly Guest Access</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Share links with clients and external partners who can review in their browser—no account creation,
                  logins, or tool onboarding required.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="chat" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Frame-Accurate Feedback</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Every review link opens into Kreatli’s frame-accurate player, so comments are pinned to exact
                  timestamps instead of vague email threads.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="shield" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Secure By Default</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Links are backed by encrypted storage and enterprise-grade infrastructure. Keep review access easy for
                  clients and strict for everyone else.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="time" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Faster Approvals</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Remove friction from the review process so approvals move from days to hours. Stakeholders can respond
                  in context, on their schedule.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="slides" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Works Across All Video Types</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Use the free video link generator for ads, product videos, social content, training, documentaries,
                  and more—any video that needs clear review.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">
              Why Use a Free Video Link Generator for Reviews?
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Video teams that move approvals online finish projects faster. Kreatli connects your free video link
              generator directly to comments, versions, and approvals.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="upload" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">No More Heavy Attachments</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Upload once to Kreatli, then share a lightweight link instead of sending 10GB files back and forth.
                  Clients review in the browser, not in their downloads folder.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="eye" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Clearer, Centralized Feedback</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Keep comments, approvals, and versions together in one place instead of buried across email threads,
                  chat apps, and random links.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="checkCircle" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Approvals Tied to Versions</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Every approval via a video link is tied to a specific version, so you always know exactly which cut
                  was signed off and what changed since.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="folder" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Part of a Complete Review Platform</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  The free video link generator is just one piece of Kreatli’s review and approval platform, which also
                  includes frame-accurate comments, drawing tools, secure asset storage, and project orchestration.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Free Tools Section */}
      <MoreFreeToolsSection
        title="Free Tools for Video Teams"
        description="Explore our collection of free tools designed to help video professionals share work, collect feedback, and approve faster."
        tools={getFreeToolsForPlatform('/platform/free-video-link-generator')}
      />

      {/* See How It Works Section */}
      <ResourcesArticlesPreviewSection
        articles={articles}
        title="See How This Works in Practice"
        description="Explore real-world workflows and guides that demonstrate secure video links and shareable review workflows in action."
      />

      <PricingSection />

      {/* FAQ Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Learn how Kreatli’s free video link generator works and how it fits into your video review and approval
              workflows.
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
              to learn how Kreatli’s free video link generator and review platform can support your specific workflow.
            </p>
          </div>
        </div>
      </section>

      {/* More Resources Section */}
      <RelatedResourcesSection
        resources={getRelatedResources(['reviewApproval', 'videoAnnotation', 'secureAssetStorage']).map(
          (resource, index) => {
            if (index === 0) {
              return { ...resource, icon: 'link' };
            }
            if (index === 1) {
              return { ...resource, icon: 'paint' };
            }
            return resource;
          },
        )}
        title="More Resources"
        description="Explore more Kreatli features that support secure video links, frame-accurate comments, and complete review workflows."
      />

      {/* CTA Section */}
      <CTASection
        title="Ready to Share Your Next Video with a Link?"
        description="Use Kreatli’s free video link generator to send secure, review-ready links to clients and collaborators in seconds."
      />
      <FooterSection hideCta={true} />
      <SignUpModal />
    </>
  );
}
