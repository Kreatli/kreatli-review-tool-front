/* eslint-disable max-len */
import { Accordion, AccordionItem } from '@heroui/react';
import NextLink from 'next/link';
import { ReactNode } from 'react';

// Export FAQ data for use with FAQStructuredData component
export const videoProofingToolFaqs = [
  {
    question: 'What is video proofing?',
    answer:
      'Video proofing is the process of reviewing video content for accuracy, quality, and alignment with project requirements before final approval. In Kreatli, video proofing is frame-accurate—feedback and annotations are pinned to exact moments so editors know precisely what to change. This replaces vague email notes with actionable, visual feedback that speeds up approval cycles.',
  },
  {
    question: 'How do I proof a video in Kreatli?',
    answer:
      "Upload your video to a Kreatli project and open it in the proofing player. Scrub or play to any moment and click to add comments, drawings, or annotations. Your feedback is pinned to the exact frame. When you are done, share a link so clients or stakeholders can view the video and add their own feedback without creating an account.",
  },
  {
    question: 'Can clients proof videos without creating an account?',
    answer:
      'Yes. Kreatli offers no-signup guest proofing links for video. Send your client a secure link; they can watch the video, add frame-accurate comments and annotations, and approve or request changes without signing up. This removes friction from the approval process and keeps all proofing in one thread.',
  },
  {
    question: 'What proofing tools are available for video in Kreatli?',
    answer:
      'In Kreatli you can add text comments pinned to specific frames, freehand drawings and shapes to highlight areas, arrows and markers to point to elements, and color-coded annotations for different types of feedback. Reviewers can also approve or request changes. All feedback is tied to the exact timestamp and frame number.',
  },
  {
    question: 'How do I track proofing status on a video?',
    answer:
      "Kreatli tracks resolution status for every comment on a video. You can mark items as resolved or unresolved and filter to show only what still needs attention. When you upload a new version of the video, you can resolve comments that have been addressed. The system keeps a clear record of what is done and what is pending across proofing rounds.",
  },
  {
    question: 'Can multiple people proof the same video at once?',
    answer:
      "Yes. Multiple reviewers can proof the same video simultaneously. Each person's comments and annotations are visible to everyone, with color coding or user indicators to show who added which annotation. You can see all feedback on the timeline, filter by reviewer, and track which annotations have been addressed.",
  },
  {
    question: 'Why use Kreatli for video proofing instead of email or standalone tools?',
    answer:
      'Video proofing in Kreatli keeps feedback frame-accurate and organized in one place. Instead of vague descriptions like "fix that part around 2 minutes," comments are pinned to exact frames. You get a single project timeline, one set of proofing links for clients, and one approval workflow instead of juggling video tools, email, and separate proofing apps.',
  },
  {
    question: 'How does video proofing help video production workflows?',
    answer:
      'Video proofing streamlines production workflows by making feedback visual and frame-accurate. Editors can jump directly to annotated frames, see visual markup indicating what to change, and track which annotations have been addressed. This reduces back-and-forth communication, speeds up revision cycles, and ensures nothing gets missed before final delivery.',
  },
];

export const VideoProofingToolFAQ = () => {
  const faqItems: Array<{
    key: string;
    title: string;
    content: ReactNode;
  }> = [
    {
      key: 'what-is-video-proofing',
      title: 'What is video proofing?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            Video proofing is the process of reviewing video content for accuracy, quality, and alignment with
            project requirements before final approval. In Kreatli, video proofing is frame-accurate—feedback and
            annotations are pinned to exact moments so editors know precisely what to change.
          </p>
          <p>
            Learn more about{' '}
            <NextLink href="/platform/video-proofing" className="text-primary underline underline-offset-2">
              video proofing in Kreatli
            </NextLink>
            .
          </p>
        </div>
      ),
    },
    {
      key: 'how-to-proof',
      title: 'How do I proof a video in Kreatli?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            Upload your video to a Kreatli project and open it in the proofing player. Scrub or play to any moment and
            click to add comments, drawings, or annotations. Your feedback is pinned to the exact frame.
          </p>
          <p>
            When you&apos;re done, share a link so clients or stakeholders can view the video and add their own
            feedback without creating an account.
          </p>
        </div>
      ),
    },
    {
      key: 'no-signup-proofing',
      title: 'Can clients proof videos without creating an account?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            Yes. Kreatli offers <strong>no-signup guest proofing links</strong> for video. Send your client a secure
            link; they can watch the video, add frame-accurate comments and annotations, and approve or request changes
            without signing up.
          </p>
          <p>
            Learn about{' '}
            <NextLink href="/platform/review-approval" className="text-primary underline underline-offset-2">
              review and approval in Kreatli
            </NextLink>
            .
          </p>
        </div>
      ),
    },
    {
      key: 'proofing-tools',
      title: 'What proofing tools are available for video in Kreatli?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            You can add <strong>text comments</strong> pinned to specific frames, <strong>freehand drawings</strong> and{' '}
            <strong>shapes</strong> to highlight areas, <strong>arrows</strong> and <strong>markers</strong> to point to
            elements, and color-coded annotations. Reviewers can also approve or request changes.
          </p>
          <p>
            Explore{' '}
            <NextLink href="/platform/video-annotation" className="text-primary underline underline-offset-2">
              video annotation in Kreatli
            </NextLink>
            .
          </p>
        </div>
      ),
    },
    {
      key: 'track-proofing-status',
      title: 'How do I track proofing status on a video?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            Kreatli tracks <strong>resolution status</strong> for every comment. You can mark items as resolved or
            unresolved and filter to show only what still needs attention.
          </p>
          <p>
            When you upload a new version, you can resolve comments that have been addressed. The system keeps a clear
            record across proofing rounds.
          </p>
        </div>
      ),
    },
    {
      key: 'multiple-proofing',
      title: 'Can multiple people proof the same video at once?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            Yes. Multiple reviewers can proof the same video simultaneously. Each person&apos;s comments and annotations
            are visible to everyone, with color coding or user indicators to show who added which annotation.
          </p>
          <p>You can see all feedback on the timeline, filter by reviewer, and track which annotations have been addressed.</p>
        </div>
      ),
    },
    {
      key: 'why-kreatli-proofing',
      title: 'Why use Kreatli for video proofing instead of email or standalone tools?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            Video proofing in Kreatli keeps feedback frame-accurate and organized in one place. Instead of vague
            descriptions like &quot;fix that part around 2 minutes,&quot; comments are pinned to exact frames.
          </p>
          <p>
            You get a single project timeline, one set of proofing links for clients, and one approval workflow instead
            of juggling video tools, email, and separate proofing apps.
          </p>
        </div>
      ),
    },
    {
      key: 'proofing-workflows',
      title: 'How does video proofing help video production workflows?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            Video proofing streamlines production by making feedback <strong>visual and frame-accurate</strong>. Editors
            can jump directly to annotated frames, see visual markup indicating what to change, and track which
            annotations have been addressed.
          </p>
          <p>
            This reduces back-and-forth communication, speeds up revision cycles, and ensures nothing gets missed
            before final delivery.
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
            Common questions about video proofing tools, frame-accurate feedback, and approval workflows.
          </p>
        </div>

        <Accordion variant="splitted" aria-label="Video proofing tool FAQs">
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
