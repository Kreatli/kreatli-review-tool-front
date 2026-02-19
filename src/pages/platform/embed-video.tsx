/* eslint-disable simple-import-sort/imports */
import { Accordion, AccordionItem, Button, Card, CardBody } from '@heroui/react';
import Head from 'next/head';
import NextLink from 'next/link';

import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';
import { InteractiveReviewToolPreview } from '../../components/shared/InteractiveReviewToolPreview';
import { FooterSection } from '../../components/home/Footer/FooterSection';
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
    question: 'What does a video embedder do in Kreatli?',
    answer:
      'In Kreatli, a video embedder lets you turn any review-ready video into an embeddable experience you can drop into portals, intranets, LMS platforms, and shared pages. Instead of uploading the same file to multiple tools, you generate an embed-style link that opens Kreatli’s player with frame-accurate comments, approvals, and version history built in. Viewers see a clean, embedded video experience, while your team keeps all feedback and assets centralized in Kreatli.',
  },
  {
    question: 'Can I embed videos on my website or client portal with Kreatli?',
    answer:
      'Yes. You can use Kreatli to embed video review experiences anywhere you share content with stakeholders—client portals, internal dashboards, documentation hubs, and more. You share an embed-style link or dedicated review page, and stakeholders can watch the video, leave feedback, and approve cuts without leaving the environment they already use. This makes embedded video review feel like a native part of your existing workflows instead of another tool to log into.',
  },
  {
    question: 'Do embedded videos still support frame-accurate comments and approvals?',
    answer:
      'Yes. Every embedded video experience powered by Kreatli keeps full support for frame-accurate comments, drawings, and approvals. When a viewer watches your embedded video, they can pause on any frame to leave precise feedback that is pinned to that exact timestamp. All of that feedback is stored in Kreatli alongside versions and approvals, so your editors never lose context—even when reviews happen through embeds.',
  },
  {
    question: 'Is there a free way to embed video with Kreatli?',
    answer:
      'Kreatli offers a free way to get started with embedding videos for client and stakeholder review. You can upload videos, generate review-ready links, and share embedded experiences so people can watch and comment without downloading files. As you grow, paid plans unlock higher limits, advanced permissions, and additional collaboration features while keeping your core embed workflows the same.',
  },
  {
    question: 'Are embedded videos secure and private?',
    answer:
      'Yes. All videos you embed through Kreatli are protected by secure infrastructure and access controls. Underlying files are encrypted at rest and in transit, and you can decide who is allowed to view, comment on, or approve each embedded video experience. This gives you the convenience of shareable embeds with the security and control required for agency, in‑house, and studio work.',
  },
  {
    question: 'Can non-technical clients use embedded videos to review content?',
    answer:
      'Absolutely. Embedded video review experiences in Kreatli are designed to be frictionless for non-technical stakeholders. Clients simply open the embedded video, press play, and leave comments or approvals using intuitive controls—no software to install and no editing terminology required. This makes it easy to bring busy executives, subject-matter experts, and brand teams into the review process without slowing projects down.',
  },
];

export default function EmbedVideoPage() {
  useSession();
  const articles = getPlatformArticles('/platform/embed-video');

  return (
    <>
      <Head>
        <title>Embed Your Video - Free Video Embedder | Kreatli</title>
        <meta
          name="description"
          content="Embed your videos with Kreatli’s free video embedder. Share responsive, review-ready video embeds with frame-accurate comments, approvals, and version history built in."
        />
        <link rel="canonical" href="https://kreatli.com/platform/embed-video" />
        <meta property="og:url" content="https://kreatli.com/platform/embed-video" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Kreatli | Embed Your Video – Free Video Embedder for Review & Approvals" />
        <meta
          property="og:description"
          content="Use Kreatli as your free video embedder. Embed videos with built-in frame-accurate comments, approvals, and versioning for clients and stakeholders."
        />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:secure_url" content="https://kreatli.com/og-image.png" />
        <meta
          property="og:image:alt"
          content="Kreatli | Embed Your Video – Free Video Embedder for Review & Approvals"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kreatli | Embed Your Video – Free Video Embedder for Review & Approvals" />
        <meta
          name="twitter:description"
          content="Embed your videos with Kreatli’s free video embedder and keep feedback, comments, and approvals connected to every embedded view."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
      </Head>

      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Platform', url: '/platform' },
          { name: 'Embed Video', url: '/platform/embed-video' },
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
              Embed Your Videos With Built-In Review &amp; Approvals
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground-500">
              Use Kreatli as your free video embedder. Share embedded, review-ready videos with frame-accurate comments,
              drawings, and approvals so stakeholders can respond in context without juggling files or links.
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
          <InteractiveReviewToolPreview />
        </div>
      </section>

      {/* Embed Destinations Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Embed Video in the Tools You Already Use</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Drop review-ready video embeds into portals, intranets, docs, and workspaces so stakeholders can watch and
              comment where they already work—without breaking your feedback workflow.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="link" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Simple Embed Links</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Turn any Kreatli video into an embed-style link you can drop into websites, client portals, LMS
                  platforms, project hubs, or documentation. Embed video once and keep feedback centralized.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="monitorPlay" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Responsive, Device-Friendly Embeds</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Give viewers an embedded video experience that looks great on desktop, tablet, and mobile. Kreatli
                  handles playback so your team does not have to manage multiple video players or file formats.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="time" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Embed Once, Keep Versions in Sync</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Upload each new cut into Kreatli and keep using the same embedded experience. Behind the scenes,
                  version history tracks which edit clients approved while stakeholders always see the latest review
                  version.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="group" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Guest Access &amp; Permissions</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Control who can view, comment on, or approve each embedded video. Give clients frictionless guest
                  access while keeping internal review rules, approvals, and permissions in your hands.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="folder" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Embed Video Across Projects</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Use embedded videos across campaigns, training programs, and product launches while keeping every file
                  organized in Kreatli projects. Your teams embed once and reuse content wherever it is needed.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="shield" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Secure Embedded Experiences</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Keep embeds private to the audiences you choose while your source files stay protected in Kreatli.
                  Share the convenience of embedded review without sacrificing security or control.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Use a Video Embedder Section */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Why Use a Video Embedder for Reviews?</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Embedding videos where stakeholders already work makes feedback faster, clearer, and easier to
              track—without adding extra tools or login friction to the process.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="eye" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Centralized Feedback on Embedded Videos</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Even when people review your work through an embedded video, every comment, drawing, and approval is
                  stored in Kreatli. Editors always know which cut was approved and what still needs work, no matter
                  where the review happened.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="slides" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Faster Approvals Where Stakeholders Already Work</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Let stakeholders review embedded videos inside tools they already use—portals, knowledge bases, or
                  project spaces—so they can approve in minutes instead of waiting for attachments or new accounts.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="upload" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">No More Juggling Files or Links</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Stop uploading the same video to drives, file-transfer tools, and different portals just to get
                  feedback. Embed once from Kreatli and keep one source of truth for every file, comment, and approval.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="checkCircle" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Clarity on Who Watched and Responded</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Keep a clear record of who left feedback or approved each embedded video. While viewers enjoy a
                  simple, embedded experience, your team sees the full context of participation inside Kreatli.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Free Tools Section */}
      <MoreFreeToolsSection
        title="Free Tools for Video Teams"
        description="Explore free tools like our video embedder, link generator, and frame-accurate review features to help your team ship better work faster."
        tools={getFreeToolsForPlatform('/platform/embed-video')}
      />

      {/* Resources Section */}
      <ResourcesArticlesPreviewSection
        articles={articles}
        title="See How Embedded Video Review Works in Practice"
        description="Explore real-world workflows and guides that show how teams embed videos for review, approvals, and collaboration using Kreatli."
      />

      <PricingSection />

      {/* FAQ Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Learn how to embed video for client and stakeholder review with Kreatli and how embedded experiences fit
              into your existing workflows.
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
              to learn how embedded video review in Kreatli can support your specific workflow.
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
        description="Explore other Kreatli features that support video review, annotation, secure storage, and embedded collaboration workflows."
      />

      {/* CTA Section */}
      <CTASection
        title="Ready to Embed Your Next Client Review?"
        description="Use Kreatli as your free video embedder to share embedded, review-ready videos with frame-accurate comments and approvals built in."
      />

      <FooterSection hideCta={true} />
      <SignUpModal />
    </>
  );
}
