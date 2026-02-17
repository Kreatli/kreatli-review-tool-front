/* eslint-disable max-len */
import { Accordion, AccordionItem } from '@heroui/react';
import NextLink from 'next/link';
import { ReactNode } from 'react';

export const videoAnnotatorFaqs = [
  {
    question: 'What is a video annotator?',
    answer:
      'A video annotator is an online tool that lets you add comments, drawings, and markup directly onto video frames. Annotations are pinned to exact frames and timestamps, so feedback is precise and actionable. Video annotators replace vague notes like "change this around 2 minutes" with frame-accurate comments and visual markup that editors can jump to and address.',
  },
  {
    question: 'How do I annotate a video online?',
    answer:
      "Upload your video to a video annotator tool, open it in the player, and scrub to the frame you want to comment on. Add text comments, draw on the frame with shapes or freehand tools, and use arrows or markers to point to elements. Your annotations stay pinned to that exact moment. Share a link so others can view the video and add their own annotations without creating an account.",
  },
  {
    question: 'What is frame-accurate video annotation?',
    answer:
      'Frame-accurate video annotation means every comment and drawing is attached to a specific frame and timestamp (e.g. 00:15:23, frame 36,240). When you click an annotation, the video jumps to that exact moment. This precision eliminates guesswork and ensures every piece of feedback is actionable for editors.',
  },
  {
    question: 'What types of annotations can I add to videos?',
    answer:
      'You can add text comments pinned to specific frames, freehand drawings and shapes to highlight areas, arrows and markers to point to elements, and color-coded annotations. All are frame-accurate and appear at the exact moment you place them. You can combine multiple annotation types on the same frame for clear, comprehensive feedback.',
  },
  {
    question: 'Can clients annotate videos without creating an account?',
    answer:
      'Yes. Many video annotators offer guest review links. Send your client a secure link and they can watch the video, add frame-accurate annotations, and leave feedback without signing up. This removes approval delays and makes client collaboration seamless.',
  },
  {
    question: 'How does video annotation differ from basic video comments?',
    answer:
      'Video annotation goes beyond basic comments by providing visual markup directly on video frames. Instead of only saying "change the color here," you can draw on the exact frame, highlight specific areas, and pin feedback to precise moments. Annotations are frame-accurate, visually integrated with playback, and can include drawings, shapes, and arrows—making feedback more actionable.',
  },
  {
    question: 'What video formats support annotation?',
    answer:
      'Most video annotators support common formats like MP4, MOV, and WebM. Some support professional formats like ProRes. For best compatibility, use H.264 MP4. Browser-based tools depend on codec support in your browser.',
  },
  {
    question: 'Can multiple people annotate the same video?',
    answer:
      "Yes. Multiple reviewers can annotate the same video. Each person's annotations are visible to everyone, often with color coding or user indicators. You can filter by reviewer and track which annotations have been addressed, making it easy to consolidate feedback from directors, editors, and clients.",
  },
];

export const VideoAnnotatorFAQ = () => {
  const faqItems: Array<{
    key: string;
    title: string;
    content: ReactNode;
  }> = [
    {
      key: 'what-is-video-annotator',
      title: 'What is a video annotator?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            A video annotator is an online tool that lets you add comments, drawings, and markup directly onto video
            frames. Annotations are pinned to exact frames and timestamps, so feedback is precise and actionable.
          </p>
          <p>
            Learn more about{' '}
            <NextLink href="/platform/video-annotation" className="text-primary underline underline-offset-2">
              video annotation in Kreatli
            </NextLink>
            .
          </p>
        </div>
      ),
    },
    {
      key: 'how-to-annotate',
      title: 'How do I annotate a video online?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            Upload your video, open it in the player, and scrub to the frame you want to comment on. Add text
            comments, draw on the frame with shapes or freehand tools, and use arrows or markers. Share a link so
            others can add their own annotations without creating an account.
          </p>
        </div>
      ),
    },
    {
      key: 'frame-accurate',
      title: 'What is frame-accurate video annotation?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            Frame-accurate annotation means every comment and drawing is attached to a specific frame and timestamp.
            When you click an annotation, the video jumps to that exact moment—eliminating guesswork for editors.
          </p>
        </div>
      ),
    },
    {
      key: 'annotation-types',
      title: 'What types of annotations can I add to videos?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            You can add text comments, freehand drawings, shapes, arrows, and markers—all pinned to specific frames.
            Explore{' '}
            <NextLink href="/platform/add-drawing-to-video" className="text-primary underline underline-offset-2">
              drawing on video in Kreatli
            </NextLink>
            .
          </p>
        </div>
      ),
    },
    {
      key: 'no-signup',
      title: 'Can clients annotate videos without creating an account?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            Yes. Guest review links let clients watch the video, add frame-accurate annotations, and leave feedback
            without signing up. Kreatli offers{' '}
            <NextLink href="/platform/review-approval" className="text-primary underline underline-offset-2">
              no-signup guest review links
            </NextLink>{' '}
            for video and other assets.
          </p>
        </div>
      ),
    },
    {
      key: 'vs-comments',
      title: 'How does video annotation differ from basic video comments?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            Video annotation adds visual markup directly on frames—draw on the exact spot, highlight areas, and pin
            feedback to precise moments. This makes feedback more actionable than text-only comments.
          </p>
        </div>
      ),
    },
    {
      key: 'formats',
      title: 'What video formats support annotation?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            Most tools support MP4, MOV, and WebM. For best compatibility, use H.264 MP4. Browser-based annotators
            depend on your browser’s codec support.
          </p>
        </div>
      ),
    },
    {
      key: 'multiple-annotators',
      title: 'Can multiple people annotate the same video?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            Yes. Multiple reviewers can annotate the same video. Each person’s annotations are visible to everyone,
            with indicators for who added what. You can filter by reviewer and track resolution status.
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
            Common questions about video annotators, frame-accurate markup, and collaboration.
          </p>
        </div>

        <Accordion variant="splitted" aria-label="Video annotator FAQs">
          {faqItems.map((item) => (
            <AccordionItem key={item.key} title={<span className="font-semibold">{item.title}</span>}>
              {item.content}
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mx-auto mt-8 flex max-w-3xl flex-col items-center gap-4 text-center">
          <h3 className="font-sans text-xl font-bold">Still Have Questions?</h3>
          <p className="text-base text-foreground-500">
            Contact us at{' '}
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
