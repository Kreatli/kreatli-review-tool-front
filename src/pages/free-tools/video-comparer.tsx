/* eslint-disable max-len */
import { Accordion, AccordionItem } from '@heroui/react';
import Head from 'next/head';

import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';
import { CompareFeaturePreview } from '../../components/home/Features/CompareFeaturePreview';
import { FooterSection } from '../../components/home/Footer/FooterSection';
import { Header } from '../../components/layout/Header';
import { Decorations } from '../../components/layout/Storyblok/Decorations';
import { BreadcrumbStructuredData } from '../../components/shared/BreadcrumbStructuredData';
import { CTASection } from '../../components/shared/CTASection';
import { FAQStructuredData } from '../../components/shared/FAQStructuredData';
import { MoreFreeToolsSection } from '../../components/shared/MoreFreeToolsSection';
import {
  COMPARE_VIDEOS_STEPS,
  PlatformStepGuide,
} from '../../components/shared/PlatformStepGuide';
import { RelatedResourcesSection } from '../../components/shared/RelatedResourcesSection';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';

const faqs = [
  {
    question: 'What does it mean to compare videos?',
    answer:
      'Comparing videos means viewing two video versions side by side (or in a diff view) to spot changes in cuts, color, timing, or effects—for example, a rough cut vs. a revised cut or a before-and-after color grade. In Kreatli, you can upload multiple video versions to a project and review them together with frame-accurate comments, so your team can see exactly what changed and give precise feedback in one place.',
  },
  {
    question: 'How do I compare two videos in Kreatli?',
    answer:
      'Upload both video versions to a Kreatli project and open them in the review interface. You can switch between them or view them side by side so reviewers can reference both versions. Add frame-accurate comments and annotations on either video, pinning feedback to the exact frame and timestamp. All feedback stays in one thread so nothing gets lost between versions.',
  },
  {
    question: 'Can I compare videos of different lengths or formats?',
    answer:
      "Yes. Kreatli supports reviewing video files of any length and common formats (MP4, MOV, etc.). When comparing versions with different durations or resolutions, you can annotate each file by frame. Comments are tied to the specific video and timestamp, so it's clear which version and which moment each piece of feedback refers to. Use the project to keep both versions visible to the team.",
  },
  {
    question: 'Why compare videos in Kreatli instead of a standalone diff tool?',
    answer:
      'Comparing videos in Kreatli keeps review in one place with your PDFs, images, and other deliverables. You get a single project, one set of review links for clients, and one approval workflow. Reviewers can add frame-accurate comments and markup on either version, and all feedback is tracked in one thread—no juggling between a diff tool and a separate review app.',
  },
  {
    question: 'Can clients compare video versions without creating an account?',
    answer:
      'Yes. Send your client a secure Kreatli review link that includes both videos. They can open the project, switch between versions or view them side by side, add comments and markup on either file, and submit feedback without signing up. All comparisons and feedback stay in one place for your team.',
  },
  {
    question: 'How does comparing videos help video production workflows?',
    answer:
      'Comparing videos helps you catch changes between cuts, color grades, and VFX passes. When feedback is pinned to the exact frame and timestamp, editors and colorists know precisely what changed and what to fix. Keeping both versions in one Kreatli project with resolution tracking speeds up approvals and reduces revision cycles for spots, reels, and campaigns.',
  },
];

export default function VideoComparerPage() {
  useSession();

  return (
    <>
      <Head>
        <title>Video Comparer - Free Online Tool | Kreatli</title>
        <meta
          name="description"
          content="Free online video comparer for creative teams. Compare two video versions side by side with frame-accurate comments and annotations. Share with clients—no sign-up required."
        />
        <meta
          name="keywords"
          content="video comparer, compare videos online, compare two videos, video comparison tool, video diff, compare video versions, video review, video collaboration"
        />
        <meta property="og:title" content="Video Comparer - Free Online Tool | Kreatli" />
        <meta
          property="og:description"
          content="Free online video comparer for creative teams. Compare two video versions side by side with frame-accurate comments and annotations. Share with clients—no sign-up required."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kreatli.com/free-tools/video-comparer" />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Video Comparer - Free Online Tool | Kreatli" />
        <meta
          name="twitter:description"
          content="Free online video comparer for creative teams. Compare two video versions side by side with frame-accurate comments and annotations. Share with clients—no sign-up required."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
        <link rel="canonical" href="https://kreatli.com/free-tools/video-comparer" />
      </Head>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Free Tools', url: '/free-tools' },
          { name: 'Video Comparer', url: '/free-tools/video-comparer' },
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
        {/* Hero with Compare Feature Preview */}
        <section className="relative overflow-hidden px-6 py-16">
          <div className="relative z-10 mx-auto max-w-6xl">
            <div className="mb-8 text-center">
              <h1 className="mx-auto max-w-lg font-sans text-3xl font-bold leading-tight sm:text-4xl sm:leading-tight">
                Video Comparer
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground-500">
                Compare two video versions side by side with frame-accurate comments and annotations—perfect for cuts,
                revisions, and client approvals. No software installation required for reviewers.
              </p>
            </div>
            <CompareFeaturePreview />
          </div>
        </section>

        {/* How to compare videos guide */}
        <PlatformStepGuide
          stepsSectionTitle="How to compare videos in Kreatli"
          stepsIntro="Follow these steps to upload both video versions, open them in the review interface, use Compare, and share feedback—all in one place."
          steps={COMPARE_VIDEOS_STEPS}
          completeGuide={{
            href: '/guides/what-is-proofing-software',
            description:
              'Learn how proofing and creative review work in one place with your video, PDFs, and other assets.',
          }}
        />

        {/* Related tools */}
        <MoreFreeToolsSection excludeHref="/free-tools/video-comparer" title="More Tools for Video Teams" />

        {/* FAQ Section */}
        <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
          <div className="relative z-10 mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
              <p className="mx-auto max-w-2xl text-lg text-foreground-500">
                Get detailed answers about comparing videos and review workflows in Kreatli.
              </p>
            </div>
            <Accordion variant="splitted" aria-label="Video comparer FAQs" className="gap-2">
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
          resources={getRelatedResources(['reviewApproval', 'videoAnnotation', 'clientApprovals'])}
          title="More Resources"
          description="Explore other Kreatli platform features for comparing videos, review workflows, and collaboration."
        />

        {/* CTA Section */}
        <CTASection
          title="Ready to compare videos with your team?"
          description="Kreatli lets you compare video versions side by side with frame-accurate comments and approval workflows. Keep all feedback in one place with your creative assets."
          primaryButtonText="Start for Free"
        />
      </main>

      <FooterSection hideCta />
      <SignUpModal />
    </>
  );
}
