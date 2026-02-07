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
import { InteractiveReviewToolPreview } from '../../components/shared/InteractiveReviewToolPreview';
import { COMMENT_ON_VIDEO_STEPS, PlatformStepGuide } from '../../components/shared/PlatformStepGuide';
import { MoreFreeToolsSection } from '../../components/shared/MoreFreeToolsSection';
import { RelatedResourcesSection } from '../../components/shared/RelatedResourcesSection';
import { ResourcesArticlesPreviewSection } from '../../components/shared/ResourcesArticlesPreviewSection';
import { Icon } from '../../components/various/Icon';
import { getPlatformArticles } from '../../data/platform-articles';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';

const faqs = [
  {
    question: 'What does “comment on video” mean in Kreatli?',
    answer:
      'In Kreatli, “comment on video” means you can attach text comments directly to specific frames and timestamps in a video. Each comment is pinned to an exact moment—so reviewers and editors always know which part of the video needs attention. You can add as many comments as you need, reply to comments to create threads, and mark them as resolved when done. Comments stay tied to the right frame and timestamp, so nothing gets lost in email or separate tools.',
  },
  {
    question: 'How do I comment on a video in Kreatli?',
    answer:
      "Upload your video to a Kreatli project and open it in the review interface. Click on the frame where you want to leave feedback, or scrub to the right moment, then type your comment. Your comment is attached to that exact frame and timestamp. You can comment at any point in the video, reply to existing comments, and @mention collaborators. When you're done, share a review link so clients or teammates can watch the video and add their own comments without creating an account.",
  },
  {
    question: 'Can clients comment on videos without creating an account?',
    answer:
      'Yes. Kreatli offers no-signup guest review links for video. Send your client a secure link to the video; they can watch it, add comments at specific timestamps, and submit feedback without signing up. This removes friction from the approval process and keeps all video comments in one place with the rest of your project.',
  },
  {
    question: 'Are comments pinned to a specific frame or timestamp?',
    answer:
      'Yes. Every comment you add in Kreatli is pinned to an exact frame and timestamp in the video. When you play or scrub the video, comments appear at the moment they were created. Editors can jump directly from a comment to the exact frame where feedback was given, eliminating guesswork and speeding up revisions across cuts and versions.',
  },
  {
    question: 'How do I track which comments have been resolved?',
    answer:
      'Kreatli tracks resolution status for every comment on a video. You can mark comments as resolved or unresolved and filter to show only what still needs attention. When you upload a new version of the video, you can resolve comments that have been addressed. The system keeps a clear record of what’s done and what’s pending across review rounds.',
  },
  {
    question: 'Can multiple people comment on the same video at once?',
    answer:
      'Yes. Multiple reviewers can comment on the same video. Each person’s comments are visible to everyone, with indicators for who wrote what. You can see all comments in one view, filter by reviewer, and track resolution. This works for internal teams and for clients using guest links.',
  },
  {
    question: 'Why comment on video in Kreatli instead of email or a standalone tool?',
    answer:
      'Commenting on video in Kreatli keeps review in one place with your PDFs, images, and other deliverables. You get a single project timeline, one set of review links for clients, and one approval workflow instead of juggling video tools, email, and separate review apps. That reduces delays and ensures nothing gets missed when moving from draft to final.',
  },
  {
    question: 'How does commenting on video help video production workflows?',
    answer:
      'Commenting on video streamlines production by making feedback frame-accurate and trackable. Instead of “change something around 2 minutes,” reviewers point directly to the frame and add a comment. Editors see exactly what to change, resolution tracking keeps rounds organized, and clients can comment on video via a link without accounts. That speeds up approvals and reduces revision cycles for edits, spots, and long-form content.',
  },
];

export default function CommentOnVideoPage() {
  useSession();
  const articles = getPlatformArticles('/platform/comment-on-video');

  return (
    <>
      <Head>
        <title>Comment on Video | Kreatli</title>
        <meta
          name="description"
          content="Comment on video with frame-accurate, timestamp-pinned feedback. Review and collaborate on video with threaded comments in one place with your team and creative assets."
        />
        <link rel="canonical" href="https://kreatli.com/platform/comment-on-video" />
        <meta property="og:url" content="https://kreatli.com/platform/comment-on-video" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Comment on Video | Kreatli" />
        <meta
          property="og:description"
          content="Comment on video with frame-accurate, timestamp-pinned feedback. Review and collaborate with threaded comments in one place."
        />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:secure_url" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:alt" content="Comment on Video | Kreatli" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Comment on Video | Kreatli" />
        <meta
          name="twitter:description"
          content="Comment on video with frame-accurate, timestamp-pinned feedback. Give precise feedback your team and clients can act on."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
      </Head>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Platform', url: '/platform' },
          { name: 'Comment on Video', url: '/platform/comment-on-video' },
        ]}
      />
      <FAQStructuredData faqs={faqs} />
      <Header />
      <Decorations />

      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h1 className="mx-auto max-w-lg font-sans text-3xl font-bold leading-tight sm:text-4xl sm:leading-tight">
              Comment on Video
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground-500">
              Comment on video with frame-accurate, timestamp-pinned feedback. Review and collaborate on video with
              threaded comments in one place with your team and creative assets.
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

      {/* How to Comment on Video in Kreatli (step-by-step) */}
      <PlatformStepGuide
        stepsSectionTitle="How to Comment on Video in Kreatli"
        stepsIntro="Follow these steps to add frame-accurate comments to your videos in Kreatli—from upload to share and approval."
        steps={COMMENT_ON_VIDEO_STEPS}
        completeGuide={{
          href: '/guides/how-to-annotate-video',
          description:
            'Learn how to annotate video with frame-accurate comments and threaded feedback for faster review cycles and client approvals.',
        }}
      />

      {/* Ways to Comment on Video Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Ways to Comment on Video</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Use frame-accurate comments, replies, and mentions to give precise feedback at any moment in your video.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="chat" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Frame-Accurate Comments</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Pin text comments to exact frames and timestamps. Every comment is linked to a specific moment so
                  there’s no guesswork about what to change.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="reply" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Threaded Replies</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Reply to comments to create discussion threads. Keep feedback organized and context clear for editors
                  and stakeholders.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="userPlus" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">@Mentions</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  @mention collaborators so the right people are notified and can respond. Keep the conversation focused
                  and actionable.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="group" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Multi-Reviewer Support</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Multiple team members and clients can comment on the same video. See who wrote what with clear
                  indicators and keep feedback in one thread.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="checkCircle" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Resolution Tracking</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Mark comments as resolved or unresolved. Track which feedback has been addressed and which still needs
                  attention across review rounds.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="play" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Jump to Frame</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Click any comment to jump to the exact frame in the video. See all feedback in context and work
                  through revisions efficiently.
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
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Why Comment on Video in Kreatli</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Comment on video with precise, frame-accurate feedback so your team and clients stay aligned and revisions
              move faster.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="eye" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Clearer Feedback</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Instead of “fix something around 0:25,” comments point to the exact frame. No more back-and-forth to
                  clarify what to change.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="arrowRight" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Fewer Revision Rounds</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  When feedback is pinned to the right frame, editors can act on it immediately. Resolution tracking
                  ensures nothing gets missed.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="group" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">One Place for Video and More</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Comment on video alongside PDFs and other assets in the same project. One review link, one approval
                  workflow, less tool-switching.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="smile" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Client-Friendly Video Review</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Clients can comment on video through no-signup guest links. They leave feedback without creating an
                  account, so approvals move faster.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Free Tools Section */}
      <MoreFreeToolsSection
        title="Free Tools for Video Teams"
        description="Explore our collection of free tools designed to help video professionals work more efficiently."
        useBannerResizerInsteadOfCostCalculator
      />

      {/* See How This Works Section */}
      <ResourcesArticlesPreviewSection
        articles={articles}
        title="See How This Works in Practice"
        description="Explore guides and comparisons that show how teams comment on video and manage review in Kreatli."
      />

      <PricingSection />

      {/* FAQ Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Get detailed answers about commenting on video and review workflows in Kreatli.
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
              If you didn't find the answer you were looking for, contact our support team at{' '}
              <a href="mailto:support@kreatli.com" className="font-medium text-primary underline underline-offset-2">
                support@kreatli.com
              </a>{' '}
              to learn how Kreatli can help you comment on video and streamline your review workflow.
            </p>
          </div>
        </div>
      </section>

      {/* More Resources Section */}
      <RelatedResourcesSection
        resources={getRelatedResources(['reviewApproval', 'creativeProofing', 'videoAnnotation'])}
        title="More Resources"
        description="Explore other Kreatli platform features to streamline your review and collaboration workflow."
      />

      {/* CTA Section */}
      <CTASection
        title="Ready to Comment on Video with Clarity?"
        description="Comment on video with frame-accurate, threaded feedback in one place with your team and clients. Start using Kreatli today."
      />
      <FooterSection hideCta={true} />
      <SignUpModal />
    </>
  );
}
