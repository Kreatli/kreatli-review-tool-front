/* eslint-disable max-len */
import { Accordion, AccordionItem } from '@heroui/react';
import NextLink from 'next/link';
import { ReactNode } from 'react';

// Export FAQ data for use with FAQStructuredData component
export const videoFeedbackToolFaqs = [
  {
    question: 'What is a video feedback tool?',
    answer:
      'A video feedback tool lets you add comments, annotations, and markup directly to video content at specific moments. Instead of describing feedback in emails or documents, you pin comments to exact frames and timestamps so editors know precisely what to change. Video feedback tools streamline creative reviews, client approvals, and team collaboration on video projects.',
  },
  {
    question: 'How do I give feedback on a video?',
    answer:
      'Upload your video to a video feedback tool, scrub to the moment you want to comment on, and click to add a comment or annotation. Your feedback is pinned to that exact frame and timestamp. You can add text comments, draw on the video with shapes and arrows, and reply to existing feedback. When you share a review link, others can see your feedback and add their own.',
  },
  {
    question: 'Can clients give video feedback without creating an account?',
    answer:
      'Yes. Many video feedback tools offer no-signup review links. Send your client a secure link to the video; they can watch it, add comments at specific timestamps, and submit feedback without signing up. This removes friction from approval workflows and keeps all feedback in one place.',
  },
  {
    question: 'Is video feedback frame-accurate?',
    answer:
      'Yes. In a proper video feedback tool, every comment and annotation is pinned to an exact frame and timestamp. When you play or scrub the video, feedback appears at the moment it was created. Editors can jump directly from a comment to the exact frame, eliminating guesswork and speeding up revisions.',
  },
  {
    question: 'What annotation tools are available for video feedback?',
    answer:
      'Video feedback tools typically offer text comments, freehand drawing, shapes (rectangles, circles, lines), arrows, and markers. You can highlight specific areas on a video frame, point to elements that need attention, and add visual context to your feedback. Some tools also support color-coded annotations for different types of feedback.',
  },
  {
    question: 'How do I track which video feedback has been resolved?',
    answer:
      'Video feedback tools track resolution status for every comment. You can mark items as resolved or unresolved and filter to show only pending feedback. When you upload a new version, you can resolve comments that have been addressed. The system maintains a clear record of what is done and what is pending across review rounds.',
  },
  {
    question: 'Why use a video feedback tool instead of email?',
    answer:
      'Email scatters feedback across threads, lacks visual context, and makes it hard to know which version someone is commenting on. A video feedback tool keeps all feedback frame-accurate, visual, and organized in one place. You can see exactly what reviewers mean, track resolution, compare versions, and maintain a complete audit trail.',
  },
  {
    question: 'What video formats are supported?',
    answer:
      'Most video feedback tools support common formats like MP4, MOV, and WebM. Support may vary by browser and codec. For best compatibility, export videos as H.264 MP4. Some tools also support ProRes and other professional formats for post-production workflows.',
  },
];

export const VideoFeedbackToolFAQ = () => {
  const faqItems: Array<{
    key: string;
    title: string;
    content: ReactNode;
  }> = [
    {
      key: 'what-is-video-feedback-tool',
      title: 'What is a video feedback tool?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            A video feedback tool lets you add comments, annotations, and markup directly to video content at specific
            moments. Instead of describing feedback in emails or documents, you pin comments to exact frames and
            timestamps so editors know precisely what to change.
          </p>
          <p>
            Video feedback tools streamline creative reviews, client approvals, and team collaboration on video
            projects. Learn more about{' '}
            <NextLink href="/platform/video-feedback" className="text-primary underline underline-offset-2">
              video feedback in Kreatli
            </NextLink>
            .
          </p>
        </div>
      ),
    },
    {
      key: 'how-to-give-feedback',
      title: 'How do I give feedback on a video?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            Upload your video to a video feedback tool, scrub to the moment you want to comment on, and click to add a
            comment or annotation. Your feedback is pinned to that exact frame and timestamp.
          </p>
          <p>
            You can add text comments, draw on the video with shapes and arrows, and reply to existing feedback. When
            you share a review link, others can see your feedback and add their own.
          </p>
        </div>
      ),
    },
    {
      key: 'no-signup-review',
      title: 'Can clients give video feedback without creating an account?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            Yes. Many video feedback tools offer <strong>no-signup review links</strong>. Send your client a secure link
            to the video; they can watch it, add comments at specific timestamps, and submit feedback without signing
            up.
          </p>
          <p>
            This removes friction from approval workflows and keeps all feedback in one place. Kreatli offers{' '}
            <NextLink href="/platform/review-approval" className="text-primary underline underline-offset-2">
              no-signup guest review links
            </NextLink>{' '}
            for video and other assets.
          </p>
        </div>
      ),
    },
    {
      key: 'frame-accurate',
      title: 'Is video feedback frame-accurate?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            Yes. In a proper video feedback tool, every comment and annotation is pinned to an{' '}
            <strong>exact frame and timestamp</strong>. When you play or scrub the video, feedback appears at the moment
            it was created.
          </p>
          <p>
            Editors can jump directly from a comment to the exact frame, eliminating guesswork and speeding up
            revisions.
          </p>
        </div>
      ),
    },
    {
      key: 'annotation-tools',
      title: 'What annotation tools are available for video feedback?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            Video feedback tools typically offer <strong>text comments</strong>, <strong>freehand drawing</strong>,{' '}
            <strong>shapes</strong> (rectangles, circles, lines), <strong>arrows</strong>, and <strong>markers</strong>.
          </p>
          <p>
            You can highlight specific areas on a video frame, point to elements that need attention, and add visual
            context to your feedback. Explore{' '}
            <NextLink href="/platform/video-annotation" className="text-primary underline underline-offset-2">
              video annotation in Kreatli
            </NextLink>
            .
          </p>
        </div>
      ),
    },
    {
      key: 'resolution-tracking',
      title: 'How do I track which video feedback has been resolved?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            Video feedback tools track <strong>resolution status</strong> for every comment. You can mark items as
            resolved or unresolved and filter to show only pending feedback.
          </p>
          <p>
            When you upload a new version, you can resolve comments that have been addressed. The system maintains a
            clear record of what is done and what is pending across review rounds.
          </p>
        </div>
      ),
    },
    {
      key: 'why-not-email',
      title: 'Why use a video feedback tool instead of email?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            Email scatters feedback across threads, lacks visual context, and makes it hard to know which version
            someone is commenting on.
          </p>
          <p>
            A video feedback tool keeps all feedback <strong>frame-accurate, visual, and organized</strong> in one
            place. You can see exactly what reviewers mean, track resolution, compare versions, and maintain a complete
            audit trail.
          </p>
        </div>
      ),
    },
    {
      key: 'supported-formats',
      title: 'What video formats are supported?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            Most video feedback tools support common formats like <strong>MP4</strong>, <strong>MOV</strong>, and{' '}
            <strong>WebM</strong>. Support may vary by browser and codec.
          </p>
          <p>
            For best compatibility, export videos as H.264 MP4. Some tools also support ProRes and other professional
            formats for post-production workflows.
          </p>
        </div>
      ),
    },
  ];

  return (
    <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
          <p className="mx-auto max-w-2xl text-foreground-500">
            Common questions about video feedback tools, frame-accurate comments, annotations, and collaboration.
          </p>
        </div>

        <Accordion variant="splitted" aria-label="Video feedback tool FAQs">
          {faqItems.map((item) => (
            <AccordionItem key={item.key} title={<span className="font-semibold">{item.title}</span>}>
              {item.content}
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mx-auto mt-8 flex max-w-3xl flex-col items-center gap-4 text-center">
          <h3 className="font-sans text-xl font-bold">Still Have Questions?</h3>
          <p className="text-base text-foreground-500">
            If you didn&apos;t find what you were looking for, contact us at{' '}
            <a
              href="mailto:support@kreatli.com"
              className="text-primary underline underline-offset-2"
              aria-label="Contact support via email at support@kreatli.com"
            >
              support@kreatli.com
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
};
