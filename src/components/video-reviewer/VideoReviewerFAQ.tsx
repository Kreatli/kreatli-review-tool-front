/* eslint-disable max-len */
import { Accordion, AccordionItem } from '@heroui/react';
import NextLink from 'next/link';
import { ReactNode } from 'react';

import { FREE_TOOL_PAGE_ACCOUNT_FAQ } from '../../data/marketing-free-tool-access';

// Export FAQ data for use with FAQStructuredData component
export const videoReviewerFaqs = [
  {
    question: 'What is a video reviewer?',
    answer:
      'A video reviewer is an online tool that lets you watch, comment on, and approve video content. It allows teams to leave frame-accurate feedback, add visual annotations, and manage approval workflows—all in one place. Video reviewers replace scattered email threads and disconnected tools with a centralized review process.',
  },
  FREE_TOOL_PAGE_ACCOUNT_FAQ,
  {
    question: 'How do I review a video online?',
    answer:
      'Upload your video to a video reviewer tool, navigate to the frame you want to comment on, and add your feedback. Your comments are pinned to exact timestamps. You can also draw on the video to highlight specific areas. When you are done, share a review link so others can add their feedback or approve the video.',
  },
  {
    question: 'Can clients review videos without creating an account?',
    answer:
      'Yes. Most video reviewers offer guest review links. Send your client a secure link and they can watch the video, leave comments, and submit approvals without signing up. This removes friction and speeds up the approval process.',
  },
  {
    question: 'What is frame-accurate video review?',
    answer:
      'Frame-accurate video review means every comment and annotation is pinned to a specific frame and timestamp in the video. When you click on a comment, the video jumps to that exact moment. This precision eliminates confusion about which part of the video needs changes.',
  },
  {
    question: 'Can I draw on the video during review?',
    answer:
      'Yes. Video reviewers typically offer annotation tools like freehand drawing, shapes, arrows, and markers. You can draw directly on a video frame to highlight issues, circle elements, or point to specific areas that need attention.',
  },
  {
    question: 'How do approvals work in a video reviewer?',
    answer:
      'Reviewers can approve a video or request changes. The system tracks who approved which version and when. You can see approval status at a glance, and the audit trail shows the complete history of approvals and change requests across all versions.',
  },
  {
    question: 'Can multiple people review the same video?',
    answer:
      "Yes. Multiple reviewers can comment on the same video simultaneously. Each person's feedback is visible to everyone, with indicators showing who wrote each comment. You can filter by reviewer to see specific feedback.",
  },
  {
    question: 'What is video review and approval in a video review tool?',
    answer:
      'Video review and approval is the process of collecting feedback on a cut (comments, drawings, decisions) and recording formal sign-off on a specific version. A video review tool centralizes that work with timestamps, threaded notes, and audit history instead of email.',
  },
  {
    question: 'What is a video feedback tool with timestamped comments?',
    answer:
      'A video feedback tool is software where reviewers leave timestamped (frame-accurate) notes and drawings on a cut. Kreatli’s video reviewer and related review flows pin each comment to an exact moment so editors know what to change without vague email threads.',
  },
  {
    question: 'Is Kreatli a “video review tool free” option to try?',
    answer:
      'You can start with Kreatli’s trial to experience full video review and approval flows before committing to a paid plan. The interactive marketing preview on this page shows the kinds of tools your team gets after signing in.',
  },
  {
    question: 'How does online video approval work in Kreatli?',
    answer:
      'Stakeholders open a secure review link, watch the cut, leave comments and drawings, and can record approvals on a specific version. Your team sees status, history, and who signed off—replacing scattered “approved” emails.',
  },
  {
    question: 'Do agencies and production teams use Kreatli as video review software?',
    answer:
      'Yes. Agencies, post houses, and in-house creative teams use Kreatli to route client reviews, internal QC, and final sign-off in one workspace with version history and audit-friendly approvals.',
  },
  {
    question: 'What video formats do video reviewers support?',
    answer:
      'Most video reviewers support common formats like MP4, MOV, and WebM. Some also support professional formats like ProRes. For best compatibility, export videos as H.264 MP4. Browser-based reviewers depend on codec support in your browser.',
  },
];

export const VideoReviewerFAQ = () => {
  const faqItems: Array<{
    key: string;
    title: string;
    content: ReactNode;
  }> = [
    {
      key: 'what-is-video-reviewer',
      title: 'What is a video reviewer?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            A video reviewer is an online tool that lets you watch, comment on, and approve video content. It allows
            teams to leave frame-accurate feedback, add visual annotations, and manage approval workflows—all in one
            place.
          </p>
          <p>
            Video reviewers replace scattered email threads and disconnected tools with a centralized review process.
            Learn more about{' '}
            <NextLink href="/platform/review-video" className="text-primary underline underline-offset-2">
              video review in Kreatli
            </NextLink>
            .
          </p>
        </div>
      ),
    },
    {
      key: 'account-access-this-page',
      title: FREE_TOOL_PAGE_ACCOUNT_FAQ.question,
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>{FREE_TOOL_PAGE_ACCOUNT_FAQ.answer}</p>
        </div>
      ),
    },
    {
      key: 'how-to-review',
      title: 'How do I review a video online?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            Upload your video to a video reviewer tool, navigate to the frame you want to comment on, and add your
            feedback. Your comments are pinned to exact timestamps.
          </p>
          <p>
            You can also draw on the video to highlight specific areas. When you&apos;re done, share a review link so
            others can add their feedback or approve the video.
          </p>
        </div>
      ),
    },
    {
      key: 'no-signup-review',
      title: 'Can clients review videos without creating an account?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            Yes. Most video reviewers offer <strong>guest review links</strong>. Send your client a secure link and they
            can watch the video, leave comments, and submit approvals without signing up.
          </p>
          <p>
            This removes friction and speeds up the approval process. Kreatli offers{' '}
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
      title: 'What is frame-accurate video review?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            Frame-accurate video review means every comment and annotation is pinned to a{' '}
            <strong>specific frame and timestamp</strong> in the video. When you click on a comment, the video jumps to
            that exact moment.
          </p>
          <p>This precision eliminates confusion about which part of the video needs changes.</p>
        </div>
      ),
    },
    {
      key: 'annotations',
      title: 'Can I draw on the video during review?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            Yes. Video reviewers typically offer annotation tools like <strong>freehand drawing</strong>,{' '}
            <strong>shapes</strong>, <strong>arrows</strong>, and <strong>markers</strong>.
          </p>
          <p>
            You can draw directly on a video frame to highlight issues, circle elements, or point to specific areas that
            need attention. Explore{' '}
            <NextLink href="/platform/video-annotation" className="text-primary underline underline-offset-2">
              video annotation in Kreatli
            </NextLink>
            .
          </p>
        </div>
      ),
    },
    {
      key: 'approvals',
      title: 'How do approvals work in a video reviewer?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            Reviewers can <strong>approve</strong> a video or <strong>request changes</strong>. The system tracks who
            approved which version and when.
          </p>
          <p>
            You can see approval status at a glance, and the audit trail shows the complete history of approvals and
            change requests across all versions.
          </p>
        </div>
      ),
    },
    {
      key: 'multiple-reviewers',
      title: 'Can multiple people review the same video?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            Yes. Multiple reviewers can comment on the same video simultaneously. Each person&apos;s feedback is visible
            to everyone, with indicators showing who wrote each comment.
          </p>
          <p>You can filter by reviewer to see specific feedback or view all comments together.</p>
        </div>
      ),
    },
    {
      key: 'review-approval-definition',
      title: 'What is video review and approval in a video review tool?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            <strong>Video review and approval</strong> is how teams collect feedback on a cut (comments, drawings,
            decisions) and record formal sign-off on a specific version.
          </p>
          <p>
            A dedicated <strong>video review tool</strong> keeps that work centralized with timestamps and history
            instead of email. For threaded feedback-oriented workflows, see the{' '}
            <NextLink href="/free-tools/video-feedback-tool" className="text-primary underline underline-offset-2">
              video feedback tool
            </NextLink>
            .
          </p>
        </div>
      ),
    },
    {
      key: 'video-feedback-tool',
      title: 'What is a video feedback tool with timestamped comments?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            A <strong>video feedback tool</strong> is where reviewers leave timestamped, frame-accurate notes and markup
            on a cut. Kreatli pins each comment to an exact moment so editors know what to change—no vague “around 0:30”
            email chains.
          </p>
        </div>
      ),
    },
    {
      key: 'free-try',
      title: 'Is Kreatli a “video review tool free” option to try?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            Start with a <strong>Kreatli trial</strong> to run full video review and approval workflows before paid
            billing. This page’s preview illustrates the review experience you unlock after sign-in.
          </p>
        </div>
      ),
    },
    {
      key: 'online-approval',
      title: 'How does online video approval work in Kreatli?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            Reviewers open a secure link, watch the cut, add timestamped comments, and record approval on a specific
            version. Your team sees status and history in one project—cleaner than “approved” replies in email.
          </p>
        </div>
      ),
    },
    {
      key: 'agencies',
      title: 'Do agencies use Kreatli as video review software?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            Yes—agencies and production companies use Kreatli for <strong>client reviews</strong>, QC rounds, and final
            sign-off with audit-friendly version history.
          </p>
        </div>
      ),
    },
    {
      key: 'supported-formats',
      title: 'What video formats do video reviewers support?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            Most video reviewers support common formats like <strong>MP4</strong>, <strong>MOV</strong>, and{' '}
            <strong>WebM</strong>. Some also support professional formats like ProRes.
          </p>
          <p>
            For best compatibility, export videos as H.264 MP4. Browser-based reviewers depend on codec support in your
            browser.
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
            Common questions about video reviewers, online video review, approvals, and collaboration.
          </p>
        </div>

        <Accordion variant="splitted" aria-label="Video reviewer FAQs">
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
