/* eslint-disable max-len */
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
import {
  IMAGE_TO_LINK_STEPS,
  PlatformStepGuide,
} from '../../components/shared/PlatformStepGuide';
import { RelatedResourcesSection } from '../../components/shared/RelatedResourcesSection';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';

const faqs = [
  {
    question: 'What is a photo URL generator?',
    answer:
      'A photo URL generator turns your photo into a shareable link so you can send it to clients or collaborators without email attachments or file downloads. In Kreatli, you upload your photo, generate a secure review link, and share it—recipients open the photo in their browser and can comment and approve without creating an account. Every link stays tied to your project and file version.',
  },
  {
    question: 'How do I generate a photo URL in Kreatli?',
    answer:
      "Upload your photo to a Kreatli project, open the file menu (⋯) on the asset, and choose Share to create a secure review link. Copy the link or send it via the share modal (email, Slack, etc.). Recipients click the link to open the photo in their browser. You can generate different links for different people or review rounds, and revoke or update access anytime.",
  },
  {
    question: 'Do recipients need to create an account to view the photo URL?',
    answer:
      'No. Kreatli review links are no-signup—recipients click the link and open the photo in their browser. They can view the photo, add comments and annotations, and submit feedback without creating an account or installing anything. That keeps the approval process fast and friction-free.',
  },
  {
    question: 'Can I have multiple URLs for the same photo?',
    answer:
      'Yes. You can generate multiple links for the same photo—for example, one per client or one per review round. Each link opens the same file (or the version you choose), and you can revoke or update access per link. Every link stays tied to the right project and version.',
  },
  {
    question: 'What happens when I upload a new version of the photo?',
    answer:
      'When you upload a new version, you control who sees it. You can share the same or a new link so recipients see the updated photo. Version history is kept in one place so you can compare versions and track which draft was approved.',
  },
  {
    question: 'Why use a photo URL generator in Kreatli instead of WeTransfer or email?',
    answer:
      'A photo URL generator in Kreatli gives you one secure link that opens in the browser—no bulky attachments, no expiring WeTransfer links. Recipients can review and comment in one place, and you get a clear record of feedback and approvals. Everything stays in your project with your video, PDFs, and other assets.',
  },
];

export default function PhotoUrlGeneratorPage() {
  useSession();

  return (
    <>
      <Head>
        <title>Photo URL Generator | Kreatli</title>
        <meta
          name="description"
          content="Generate a shareable URL for your photo. Create secure photo review links in seconds—send one link, collect feedback, no sign-up required for recipients."
        />
        <meta
          name="keywords"
          content="photo URL generator, photo to link, shareable photo link, photo review link, share photo online, photo url maker, photo collaboration, client review"
        />
        <meta property="og:title" content="Photo URL Generator | Kreatli" />
        <meta
          property="og:description"
          content="Generate a shareable URL for your photo. Create secure photo review links in seconds—send one link, collect feedback, no sign-up required for recipients."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kreatli.com/free-tools/photo-url-generator" />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Photo URL Generator | Kreatli" />
        <meta
          name="twitter:description"
          content="Generate a shareable URL for your photo. Create secure review links. Recipients open and comment in their browser with no sign-up."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
        <link rel="canonical" href="https://kreatli.com/free-tools/photo-url-generator" />
      </Head>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Free Tools', url: '/free-tools' },
          { name: 'Photo URL Generator', url: '/free-tools/photo-url-generator' },
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
                Photo URL Generator
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground-500">
                Generate a shareable URL for your photo. Upload once, create a secure review link, and send it to
                clients—they open the photo in their browser and comment without signing up.
              </p>
            </div>
            <ShareFeaturePreview variant="image" />
          </div>
        </section>

        {/* How to turn your photo into a link guide */}
        <PlatformStepGuide
          stepsSectionTitle="How to turn your photo into a link in Kreatli"
          stepsIntro="Follow these steps to upload your photo, generate a shareable link, and collect feedback—no sign-up required for recipients."
          steps={IMAGE_TO_LINK_STEPS}
          completeGuide={{
            href: '/guides/what-is-proofing-software',
            description:
              'Learn how proofing and creative review work in one place with your video, photos, and other assets.',
          }}
        />

        {/* Related tools */}
        <MoreFreeToolsSection excludeHref="/free-tools/photo-url-generator" title="More Tools for Creative Teams" />

        {/* FAQ Section */}
        <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
          <div className="relative z-10 mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
              <p className="mx-auto max-w-2xl text-lg text-foreground-500">
                Learn how the photo URL generator works and how it fits into your review and approval workflows.
              </p>
            </div>
            <Accordion variant="splitted" aria-label="Photo URL generator FAQs" className="gap-2">
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
          resources={getRelatedResources(['annotateImage', 'drawOnImage', 'reviewApproval', 'clientApprovals'])}
          title="More Resources"
          description="Explore other Kreatli platform features for photo review, annotation, and collaboration."
        />

        {/* CTA Section */}
        <CTASection
          title="Ready to share your next photo with a URL?"
          description="Use Kreatli's photo URL generator to send secure, review-ready links to clients and collaborators in seconds."
          primaryButtonText="Start for Free"
        />
      </main>

      <FooterSection hideCta />
      <SignUpModal />
    </>
  );
}
