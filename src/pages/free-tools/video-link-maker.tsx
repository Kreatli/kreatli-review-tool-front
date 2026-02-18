import { Accordion, AccordionItem } from '@heroui/react';
import Head from 'next/head';

import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';
import { ShareFeaturePreview } from '../../components/home/Features/ShareFeaturePreview';
import { FooterSection } from '../../components/home/Footer/FooterSection';
import { Header } from '../../components/layout/Header';
import { Decorations } from '../../components/layout/Storyblok/Decorations';
import { BreadcrumbStructuredData } from '../../components/shared/BreadcrumbStructuredData';
import { CTASection } from '../../components/shared/CTASection';
import { FAQStructuredData } from '../../components/shared/FAQStructuredData';
import { MoreFreeToolsSection } from '../../components/shared/MoreFreeToolsSection';
import { FREE_VIDEO_LINK_GENERATOR_STEPS, PlatformStepGuide } from '../../components/shared/PlatformStepGuide';
import { RelatedResourcesSection } from '../../components/shared/RelatedResourcesSection';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';

const faqs = [
  {
    question: 'What is a video link maker?',
    answer:
      'A video link maker lets you create secure, shareable links to your video files so clients and collaborators can review them in their browser—no downloads or accounts required. Instead of sending heavy attachments or juggling WeTransfer links, you generate a single review link that opens an interactive player with frame-accurate comments and approvals. In Kreatli, every link stays connected to the right project, file version, and feedback history.',
  },
  {
    question: 'Can clients open video review links without creating an account?',
    answer:
      'Yes. Kreatli is designed for frictionless client collaboration. When you make a video link, you can invite clients, stakeholders, or external partners to watch and comment without forcing them to create an account. They simply click the link, watch the video in their browser, and leave feedback using time-stamped comments. This no-signup experience reduces approval delays and makes it easy to involve busy clients and executives in the review process.',
  },
  {
    question: 'Are video links secure and private?',
    answer:
      'Yes. Kreatli video links are backed by enterprise-grade security. You can generate secure, unlisted links that are only accessible to people you share them with, and your underlying video files are encrypted at rest and in transit. Depending on your workflow, you can layer on additional controls like access permissions and link revocation to keep sensitive work private.',
  },
  {
    question: 'Can I control who can comment or approve on a video link?',
    answer:
      'Yes. Kreatli gives you granular control over who can view, comment, and approve assets shared via links. For each project or file, you decide whether a link is view-only or open for comments, and you can keep formal approvals limited to internal stakeholders while still letting clients leave feedback. This ensures that every video review link fits your existing process.',
  },
  {
    question: 'Does Kreatli support versioning for videos shared via links?',
    answer:
      'Yes. Every video you share through a Kreatli link is tied to full version history. When you upload a new cut, you can share it with the same stakeholders while keeping past versions and their comments intact. Approvals are always linked to a specific version, so you can see exactly which cut a client signed off on and what changed since.',
  },
  {
    question: 'Is the video link maker free?',
    answer:
      'Kreatli offers a free way to start making video review links so you can experience the workflow before upgrading. On paid plans, the video link maker is included as part of the broader review and approval platform, with higher limits, advanced permissions, and support for larger teams and libraries. This lets small teams get started at no cost while giving growing organizations room to scale.',
  },
];

export default function VideoLinkMakerPage() {
  useSession();

  return (
    <>
      <Head>
        <title>Video Link Maker | Kreatli</title>
        <meta
          name="description"
          content="Free online video link maker for creative teams. Create secure, shareable video review links in seconds. Let clients watch, comment, and approve online—no downloads or accounts required."
        />
        <meta
          name="keywords"
          content="video link maker, make video link, shareable video link, video review link, share video online, video link generator, video collaboration, client review"
        />
        <meta property="og:title" content="Video Link Maker | Kreatli" />
        <meta
          property="og:description"
          content="Free online video link maker for creative teams. Create secure, shareable video review links in seconds. Let clients watch, comment, and approve online—no downloads or accounts required."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kreatli.com/free-tools/video-link-maker" />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Video Link Maker | Kreatli" />
        <meta
          name="twitter:description"
          content="Free online video link maker. Create secure, shareable video review links. Let clients review and comment in their browser with no sign-up."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
        <link rel="canonical" href="https://kreatli.com/free-tools/video-link-maker" />
      </Head>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Free Tools', url: '/free-tools' },
          { name: 'Video Link Maker', url: '/free-tools/video-link-maker' },
        ]}
      />
      <FAQStructuredData faqs={faqs} />
      <Header />
      <Decorations />

      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        Skip to main content
      </a>

      <main id="main-content">
        {/* Hero with Share Feature Preview */}
        <section className="relative overflow-hidden px-6 py-16">
          <div className="relative z-10 mx-auto max-w-6xl">
            <div className="mb-8 text-center">
              <h1 className="mx-auto max-w-lg font-sans text-3xl font-bold leading-tight sm:text-4xl sm:leading-tight">
                Video Link Maker
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground-500">
                Create secure, shareable video review links in seconds. Let clients watch, comment, and approve
                online—no downloads, attachments, or account creation required.
              </p>
            </div>
            <ShareFeaturePreview variant="video" />
          </div>
        </section>

        {/* How to generate video links guide */}
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

        {/* Related tools */}
        <MoreFreeToolsSection excludeHref="/free-tools/video-link-maker" title="More Tools for Video Teams" />

        {/* FAQ Section */}
        <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
          <div className="relative z-10 mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
              <p className="mx-auto max-w-2xl text-lg text-foreground-500">
                Learn how the video link maker works and how it fits into your video review and approval workflows.
              </p>
            </div>
            <Accordion variant="splitted" aria-label="Video link maker FAQs" className="gap-2">
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

        {/* Related resources */}
        <RelatedResourcesSection
          resources={getRelatedResources(['reviewApproval', 'videoAnnotation', 'secureAssetStorage'])}
          title="More Resources"
          description="Explore other Kreatli platform features for secure video links, frame-accurate comments, and review workflows."
        />

        {/* CTA Section */}
        <CTASection
          title="Ready to share your next video with a link?"
          description="Use Kreatli's video link maker to send secure, review-ready links to clients and collaborators in seconds."
          primaryButtonText="Start for Free"
        />
      </main>

      <FooterSection hideCta />
      <SignUpModal />
    </>
  );
}
