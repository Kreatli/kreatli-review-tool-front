/* eslint-disable max-len */
import { Accordion, AccordionItem } from '@heroui/react';
import NextLink from 'next/link';
import { ReactNode } from 'react';

// Export FAQ data for use with FAQStructuredData component
export const videoManagerFaqs = [
  {
    question: 'What does it mean to manage videos in Kreatli?',
    answer:
      'Managing videos in Kreatli means organizing, storing, versioning, and tracking all your video assets in one place. You can upload videos, organize them into projects, track versions, collect feedback, and manage approvals—all without switching between multiple tools. This gives your team a single source of truth for every video in production.',
  },
  {
    question: 'How do I organize videos in Kreatli?',
    answer:
      'Upload videos to Kreatli projects and organize them with folders, tags, or project structure. Each video shows version history, feedback status, and approval state. You can search, filter, and browse videos across projects to find what you need quickly.',
  },
  {
    question: 'Can I manage multiple video versions in Kreatli?',
    answer:
      'Yes. Kreatli has built-in version control for videos. Upload new versions to the same asset and switch between them from a dropdown. Compare versions side by side, track feedback per version, and see who approved which cut. No more file naming conventions or lost versions.',
  },
  {
    question: 'How does Kreatli help manage video feedback?',
    answer:
      'All feedback on a video is stored in one thread with the asset. Comments are pinned to exact frames, tracked as resolved or unresolved, and visible across versions. You can filter by reviewer, jump to any comment, and see what still needs attention—no digging through email or chat.',
  },
  {
    question: 'Can clients access videos without signing up?',
    answer:
      'Yes. Generate secure review links for any video and share them with clients. They can watch, comment, and approve without creating an account. You control access and can revoke links anytime.',
  },
  {
    question: 'How do I track video approvals in Kreatli?',
    answer:
      'Each video shows its approval status—pending, approved, or changes requested. See who approved which version and when. Resolution tracking keeps feedback organized so you know what is done and what is pending before final delivery.',
  },
  {
    question: 'Why manage videos in Kreatli instead of file storage or email?',
    answer:
      'File storage tools like Dropbox or Google Drive do not track versions, feedback, or approvals. Email threads get lost and lack context. Kreatli gives you version control, frame-accurate feedback, approval tracking, and client-friendly review links in one place—designed for video production workflows.',
  },
  {
    question: 'How does managing videos in Kreatli help video teams?',
    answer:
      'Managing videos in Kreatli reduces tool-switching, keeps feedback organized, and speeds up approvals. Teams spend less time searching for files, clarifying feedback, or tracking versions manually. Everything lives in one project with a clear timeline from first upload to final approval.',
  },
];

export const VideoManagerFAQ = () => {
  const faqItems: Array<{
    key: string;
    title: string;
    content: ReactNode;
  }> = [
    {
      key: 'what-is-manage-videos',
      title: 'What does it mean to manage videos in Kreatli?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            Managing videos in Kreatli means organizing, storing, versioning, and tracking all your video assets in
            one place. You can upload videos, organize them into projects, track versions, collect feedback, and manage
            approvals—all without switching between multiple tools.
          </p>
          <p>
            Learn more about{' '}
            <NextLink href="/platform/manage-videos" className="text-primary underline underline-offset-2">
              managing videos in Kreatli
            </NextLink>
            .
          </p>
        </div>
      ),
    },
    {
      key: 'organize-videos',
      title: 'How do I organize videos in Kreatli?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            Upload videos to Kreatli projects and organize them with folders, tags, or project structure. Each video
            shows version history, feedback status, and approval state.
          </p>
          <p>You can search, filter, and browse videos across projects to find what you need quickly.</p>
        </div>
      ),
    },
    {
      key: 'multiple-versions',
      title: 'Can I manage multiple video versions in Kreatli?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            Yes. Kreatli has built-in <strong>version control</strong> for videos. Upload new versions to the same asset
            and switch between them from a dropdown. Compare versions side by side, track feedback per version, and see
            who approved which cut.
          </p>
          <p>
            Explore{' '}
            <NextLink href="/platform/video-versioning" className="text-primary underline underline-offset-2">
              video versioning in Kreatli
            </NextLink>
            .
          </p>
        </div>
      ),
    },
    {
      key: 'manage-feedback',
      title: 'How does Kreatli help manage video feedback?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            All feedback on a video is stored in one thread with the asset. Comments are pinned to exact frames,
            tracked as resolved or unresolved, and visible across versions.
          </p>
          <p>
            You can filter by reviewer, jump to any comment, and see what still needs attention—no digging through
            email or chat.
          </p>
        </div>
      ),
    },
    {
      key: 'clients-no-signup',
      title: 'Can clients access videos without signing up?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            Yes. Generate <strong>secure review links</strong> for any video and share them with clients. They can
            watch, comment, and approve without creating an account. You control access and can revoke links anytime.
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
      key: 'track-approvals',
      title: 'How do I track video approvals in Kreatli?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            Each video shows its approval status—<strong>pending</strong>, <strong>approved</strong>, or{' '}
            <strong>changes requested</strong>. See who approved which version and when.
          </p>
          <p>
            Resolution tracking keeps feedback organized so you know what is done and what is pending before final
            delivery.
          </p>
        </div>
      ),
    },
    {
      key: 'why-kreatli-vs-storage',
      title: 'Why manage videos in Kreatli instead of file storage or email?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            File storage tools like Dropbox or Google Drive do not track versions, feedback, or approvals. Email
            threads get lost and lack context.
          </p>
          <p>
            Kreatli gives you version control, frame-accurate feedback, approval tracking, and client-friendly review
            links in one place—designed for video production workflows.
          </p>
        </div>
      ),
    },
    {
      key: 'help-video-teams',
      title: 'How does managing videos in Kreatli help video teams?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            Managing videos in Kreatli reduces tool-switching, keeps feedback organized, and speeds up approvals.
            Teams spend less time searching for files, clarifying feedback, or tracking versions manually.
          </p>
          <p>
            Everything lives in one project with a clear timeline from first upload to final approval. Explore{' '}
            <NextLink href="/platform/creative-workspace" className="text-primary underline underline-offset-2">
              creative workspace
            </NextLink>{' '}
            for more.
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
            Common questions about video managers, organizing videos, version control, and team collaboration.
          </p>
        </div>

        <Accordion variant="splitted" aria-label="Video manager FAQs">
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
