/* eslint-disable simple-import-sort/imports */
import { Accordion, AccordionItem, Button, Card, CardBody } from '@heroui/react';
import Head from 'next/head';
import NextLink from 'next/link';

import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';
import { CompareFeaturePreview } from '../../components/home/Features/CompareFeaturePreview';
import { ShareFeaturePreview } from '../../components/home/Features/ShareFeaturePreview';
import { FooterSection } from '../../components/home/Footer/FooterSection';
import { Header } from '../../components/layout/Header';
import { Decorations } from '../../components/layout/Storyblok/Decorations';
import { BreadcrumbStructuredData } from '../../components/shared/BreadcrumbStructuredData';
import { PricingSection } from '../../components/home/PricingSection/PricingSection';
import { CTASection } from '../../components/shared/CTASection';
import { FAQStructuredData } from '../../components/shared/FAQStructuredData';
import { InteractiveReviewToolPreview } from '../../components/shared/InteractiveReviewToolPreview';
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
    question: 'What is frame-accurate video review?',
    answer:
      'Frame-accurate video review allows you to pin comments and feedback to exact frames and timestamps in videos. In Kreatli, when you comment on a video, your feedback is attached to the specific frame (e.g., "at 00:15:23"), eliminating confusion about which clip or moment you\'re referring to. This is essential for video production workflows where precise timing matters. Unlike email or chat feedback where you might say "the part around 15 minutes," frame-accurate review ensures everyone knows exactly which frame needs attention.',
  },
  {
    question: 'How does version comparison work in Kreatli?',
    answer:
      "Kreatli's version comparison feature lets you view different versions of the same file side-by-side. You can compare video versions, image revisions, or document iterations to spot changes instantly. This is perfect for creative proofing where you need to see what changed between versions. The side-by-side view makes it easy to identify differences, provide precise feedback, and ensure nothing is missed. All versions are stored with their full history, so you can compare any previous version with the current one.",
  },
  {
    question: 'Can clients review files without creating an account?',
    answer:
      'Yes. Kreatli offers no-signup guest review links that allow clients and external collaborators to review files, provide feedback, and approve versions without creating an account. Simply generate a secure shareable link and send it to your client. They can access the review interface, watch videos, view images, add frame-accurate comments, and approve versions—all without signing up. This eliminates approval delays caused by account creation barriers and makes client collaboration seamless.',
  },
  {
    question: 'How secure is file sharing in Kreatli?',
    answer:
      'Kreatli provides enterprise-grade security for file sharing. You can generate password-protected links, set expiration dates for shareable links, control access permissions, and track who accessed which files. All files are encrypted in transit and at rest. Unlike email attachments or generic file sharing services, Kreatli gives you granular control over who can view, comment, and approve files. You can revoke access at any time and see a complete audit trail of who reviewed what and when.',
  },
  {
    question: 'How do approval workflows work in Kreatli?',
    answer:
      "Kreatli's approval workflows track the approval status for each asset. You can see which files are pending approval, which have been approved, and which are blocked. Each approval is permanently recorded with the exact file version, timestamp, and user information. You can require multiple approvers and track which reviewers have approved and which are still pending. The system maintains complete approval history, so you always know who approved what version and when. This creates an audit trail that protects both agencies and clients.",
  },
  {
    question: 'What file types can be reviewed in Kreatli?',
    answer:
      'Kreatli supports review for videos (MP4, MOV, AVI, and more), images (JPG, PNG, GIF, etc.), PDFs, and other document formats. The platform is optimized for video review with frame-accurate commenting, but also handles images and documents for comprehensive creative proofing. You can review any creative asset in your production workflow, making Kreatli suitable for video production, animation, graphic design, and mixed-media projects.',
  },
  {
    question: 'How does Kreatli compare to Frame.io for video review?',
    answer:
      'Kreatli offers similar frame-accurate review capabilities as Frame.io but with key advantages: no-signup client links that reduce approval delays from days to hours, unlimited projects and team members at competitive pricing, and a unified platform that replaces multiple tools (not just video review). While Frame.io focuses primarily on video review, Kreatli provides comprehensive project management, asset organization, and collaboration features in one platform. Many video production teams switch from Frame.io to Kreatli to reduce costs by 40-70% while gaining better project organization and faster client approvals.',
  },
  {
    question: 'Can multiple people review the same file simultaneously?',
    answer:
      'Yes. Multiple reviewers can access and comment on the same file simultaneously in Kreatli. Each reviewer can add frame-accurate comments, and all feedback is visible to everyone in real-time. This is perfect for multi-stakeholder approval workflows where directors, producers, editors, and clients all need to provide feedback. You can see who commented on what, track which reviewers have approved, and ensure nothing gets missed. Real-time notifications keep everyone updated as new comments and approvals come in.',
  },
  {
    question: 'How do I track which version a client approved?',
    answer:
      "In Kreatli, every approval is permanently linked to the exact file version that was approved. When a client approves a version, the system records the specific version number, timestamp, and user information. You can see the complete approval history for any file, showing which version was approved by whom and when. This eliminates confusion about which version received approval and creates a clear audit trail. If a new version is uploaded, the approval status resets, ensuring clients only approve the versions they've actually reviewed.",
  },
  {
    question: 'Is Kreatli suitable for large video files?',
    answer:
      "Yes. Kreatli supports large video file uploads and sharing without file size limitations. You can upload and share full-quality videos directly with clients and collaborators through secure review links—no compression, no quality loss. Whether you're working with 4K footage, 8K masters, or 15GB+ documentary files, Kreatli handles them seamlessly. Clients can review full-quality videos in their browser without downloading anything. This eliminates the need for WeTransfer, compressed previews, or external file sharing services.",
  },
];

export default function ReviewApprovalPage() {
  useSession();
  const articles = getPlatformArticles('/platform/review-approval');

  return (
    <>
      <Head>
        <title>Kreatli | Review & Approval – Frame-Accurate Video Review Platform</title>
        <meta
          name="description"
          content="Kreatli's Review & Approval features provide frame-accurate video revisions, side-by-side version comparison, and secure file sharing for video review and approval workflows. Perfect for video teams."
        />
        <link rel="canonical" href="https://kreatli.com/platform/review-approval" />
        <meta property="og:url" content="https://kreatli.com/platform/review-approval" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Kreatli | Review & Approval – Frame-Accurate Video Review Platform" />
        <meta
          property="og:description"
          content="Streamline your video review and approval workflow with frame-accurate comments, version comparison, and secure file sharing. Built for video teams."
        />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:secure_url" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:alt" content="Kreatli | Review & Approval – Frame-Accurate Video Review Platform" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kreatli | Review & Approval – Frame-Accurate Video Review Platform" />
        <meta
          name="twitter:description"
          content="Streamline your video review and approval workflow with frame-accurate comments, version comparison, and secure file sharing. Built for video teams."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
      </Head>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Platform', url: '/platform' },
          { name: 'Review & Approval', url: '/platform/review-approval' },
        ]}
      />
      <FAQStructuredData faqs={faqs} />
      <Header />
      <Decorations />
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 text-center">
          <h1 className="mx-auto max-w-lg font-sans text-3xl font-bold sm:text-4xl">
            Review & Approval – Frame-Accurate Video Review
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-foreground-500">
            Pin comments to exact frames and timestamps. Compare versions side-by-side and share files securely.
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

      {/* Frame-Accurate Revisions Section */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Frame-Accurate Revisions</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Pin comments to exact frames and timestamps—no more "which clip?" or lost feedback.
            </p>
          </div>
          <InteractiveReviewToolPreview />
        </div>
      </section>

      {/* Compare Versions Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Compare Versions Side-by-Side</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Compare different versions side-by-side for creative proofing—spot changes instantly.
            </p>
          </div>
          <CompareFeaturePreview />
        </div>
      </section>

      {/* Share Files Section */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Share Files with Anyone</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Generate secure shareable links or send files via email—no account required for reviewers.
            </p>
          </div>
          <ShareFeaturePreview />
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Complete Review & Approval Workflow</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Everything you need for professional video review and approval workflows in one platform.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="paint" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Frame-Accurate Comments</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Pin comments to exact frames in videos or specific areas in images. Eliminate "which clip?" confusion
                  forever.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="compare" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Version Comparison</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Compare different versions side-by-side to spot changes instantly and provide precise feedback.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="link" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">No-Signup Guest Links</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Share review links with clients and collaborators instantly. They can review and comment without
                  creating accounts.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="share" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Secure File Sharing</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Generate password-protected links, set expiration dates, and control access with enterprise-grade
                  security.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="checkCircle" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Approval Workflows</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Track approval status for each asset, see who approved what, and maintain complete history.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="bell" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Real-Time Notifications</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Get instant alerts for new comments, approval requests, and feedback. Stay in sync.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Free Tools Section */}
      <MoreFreeToolsSection
        title="Free Tools & Resources"
        description="Access our free calculators and tools to optimize your creative workflow."
        tools={getFreeToolsForPlatform('/platform/review-approval')}
      />

      {/* See How It Works Section */}
      <ResourcesArticlesPreviewSection
        articles={articles}
        title="See How This Works in Practice"
        description="Explore real-world workflows and guides that demonstrate these features in action."
      />

      <PricingSection />

      {/* FAQ Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Get detailed answers about Kreatli's frame-accurate review and approval features for video teams.
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
              If you didn't find the answer you were looking for, feel free to contact our support team at{' '}
              <a href="mailto:support@kreatli.com" className="font-medium text-primary underline underline-offset-2">
                support@kreatli.com
              </a>{' '}
              to learn how Kreatli's review and approval platform can help your specific workflow.
            </p>
          </div>
        </div>
      </section>

      {/* More Resources Section */}
      <RelatedResourcesSection
        resources={getRelatedResources(['projectOrchestration', 'creativeWorkspace', 'secureAssetStorage'])}
        title="More Resources"
        description="Explore other Kreatli platform features to streamline your video collaboration workflow."
      />

      {/* CTA Section */}
      <CTASection
        title="Ready to Streamline Your Review Process?"
        description="Experience frame-accurate review and approval workflows designed for video teams."
      />
      <FooterSection hideCta={true} />
      <SignUpModal />
    </>
  );
}
