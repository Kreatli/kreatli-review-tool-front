/* eslint-disable max-len */
import { Accordion, AccordionItem } from '@heroui/react';
import NextLink from 'next/link';
import { ReactNode } from 'react';

// Export FAQ data for use with FAQStructuredData component
export const imageReviewerFaqs = [
  {
    question: 'What is image review?',
    answer:
      'Image review is the process of reviewing images with feedback, comments, and annotations to get approval or request changes. In Kreatli, you can review images with comments pinned to exact locations, highlights, shapes, and drawings—all in one place alongside video and PDFs. This keeps feedback precise and tied to the right spot on the image, so nothing gets lost in email or separate tools.',
  },
  {
    question: 'How do I review an image in Kreatli?',
    answer:
      "Upload your image (JPG, PNG, GIF, WebP, etc.) to a Kreatli project and open it in the review interface. Click or select the area you want to comment on, then add a comment, highlight, or drawing. Your annotations are attached to that exact location. When you're done, share a review link so clients or collaborators can view and add their own feedback without creating an account.",
  },
  {
    question: 'Can clients review images without creating an account?',
    answer:
      'Yes. Kreatli offers no-signup guest review links for images (and video, PDFs). Send your client a secure link to the image; they can open it, add comments and markup, and submit feedback without signing up. This removes friction from the approval process and keeps all image review in one thread with the rest of your project.',
  },
  {
    question: 'What types of annotations can I add to an image?',
    answer:
      'In Kreatli you can add text comments pinned to specific spots on the image, highlights and shapes to mark regions, arrows and markers to point to elements, and freehand drawing where needed. All feedback is tied to the exact position, so designers and stakeholders know precisely what to change.',
  },
  {
    question: 'What image formats can I review in Kreatli?',
    answer:
      'Kreatli supports review for common image formats including JPG, PNG, GIF, WebP, and other standard image files. You can review any image uploaded to a project. The review system keeps feedback pinned to the right area regardless of resolution or format.',
  },
  {
    question: 'Can multiple people review the same image at once?',
    answer:
      "Yes. Multiple reviewers can review the same image. Each person's comments and markup are visible to everyone, with indicators for who added what. You can see all feedback in one view, filter by reviewer, and track resolution. This works for internal teams and for clients using guest links.",
  },
  {
    question: 'Why review images in Kreatli instead of email or standalone tools?',
    answer:
      'Reviewing images in Kreatli keeps review in one place with your video, PDFs, and other deliverables. You get a single project timeline, one set of review links for clients, and one approval workflow instead of juggling image tools, email, and separate review apps. That reduces delays and ensures nothing gets missed when moving from draft to final.',
  },
  {
    question: 'How does image review help creative and design workflows?',
    answer:
      'Image review streamlines creative workflows by making feedback visual and location-specific. Instead of describing "the top-right area," reviewers point directly to the spot and add a comment or highlight. Designers see exactly what to change, resolution tracking keeps rounds organized, and clients can review images via a link without accounts. That speeds up approvals and reduces revision cycles for photos, graphics, and visual assets.',
  },
];

export const ImageReviewerFAQ = () => {
  const faqItems: Array<{
    key: string;
    title: string;
    content: ReactNode;
  }> = [
    {
      key: 'what-is-image-review',
      title: 'What is image review?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            Image review is the process of reviewing images with feedback, comments, and annotations to get approval or
            request changes. In Kreatli, you can review images with comments pinned to exact locations, highlights,
            shapes, and drawings—all in one place alongside video and PDFs.
          </p>
          <p>
            Learn more about{' '}
            <NextLink href="/platform/annotate-image" className="text-primary underline underline-offset-2">
              image annotation in Kreatli
            </NextLink>
            .
          </p>
        </div>
      ),
    },
    {
      key: 'how-to-review-image',
      title: 'How do I review an image in Kreatli?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            Upload your image to a Kreatli project and open it in the review interface. Click or select the area you
            want to comment on, then add a comment, highlight, or drawing. Your annotations are attached to that exact
            location.
          </p>
          <p>
            When you&apos;re done, share a review link so clients or collaborators can view and add their own feedback
            without creating an account.
          </p>
        </div>
      ),
    },
    {
      key: 'no-signup-image',
      title: 'Can clients review images without creating an account?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            Yes. Kreatli offers <strong>no-signup guest review links</strong> for images (and video, PDFs). Send your
            client a secure link to the image; they can open it, add comments and markup, and submit feedback without
            signing up.
          </p>
          <p>
            This removes friction from the approval process. Learn about{' '}
            <NextLink href="/platform/review-approval" className="text-primary underline underline-offset-2">
              review and approval in Kreatli
            </NextLink>
            .
          </p>
        </div>
      ),
    },
    {
      key: 'annotation-types',
      title: 'What types of annotations can I add to an image?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            You can add <strong>text comments</strong> pinned to specific spots, <strong>highlights</strong> and{' '}
            <strong>shapes</strong> to mark regions, <strong>arrows</strong> and <strong>markers</strong> to point to
            elements, and <strong>freehand drawing</strong> where needed.
          </p>
          <p>
            Explore{' '}
            <NextLink href="/platform/annotate-image" className="text-primary underline underline-offset-2">
              annotate image
            </NextLink>{' '}
            and{' '}
            <NextLink href="/platform/draw-on-image" className="text-primary underline underline-offset-2">
              draw on image
            </NextLink>{' '}
            in Kreatli.
          </p>
        </div>
      ),
    },
    {
      key: 'image-formats',
      title: 'What image formats can I review in Kreatli?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            Kreatli supports review for common image formats including <strong>JPG</strong>, <strong>PNG</strong>,{' '}
            <strong>GIF</strong>, <strong>WebP</strong>, and other standard image files.
          </p>
          <p>The review system keeps feedback pinned to the right area regardless of resolution or format.</p>
        </div>
      ),
    },
    {
      key: 'multiple-reviewers-image',
      title: 'Can multiple people review the same image at once?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            Yes. Multiple reviewers can review the same image. Each person&apos;s comments and markup are visible to
            everyone, with indicators for who added what.
          </p>
          <p>You can see all feedback in one view, filter by reviewer, and track resolution.</p>
        </div>
      ),
    },
    {
      key: 'why-kreatli-image',
      title: 'Why review images in Kreatli instead of email or standalone tools?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            Reviewing images in Kreatli keeps review in one place with your video, PDFs, and other deliverables. You get
            a single project timeline, one set of review links for clients, and one approval workflow instead of
            juggling image tools, email, and separate review apps.
          </p>
          <p>That reduces delays and ensures nothing gets missed when moving from draft to final.</p>
        </div>
      ),
    },
    {
      key: 'image-workflows',
      title: 'How does image review help creative and design workflows?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            Image review streamlines creative workflows by making feedback <strong>visual and location-specific</strong>
            . Instead of describing &quot;the top-right area,&quot; reviewers point directly to the spot and add a
            comment or highlight.
          </p>
          <p>
            Designers see exactly what to change, resolution tracking keeps rounds organized, and clients can review
            images via a link without accounts. That speeds up approvals and reduces revision cycles for photos,
            graphics, and visual assets.
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
            Common questions about image reviewers, online image review, annotations, and collaboration.
          </p>
        </div>

        <Accordion variant="splitted" aria-label="Image reviewer FAQs">
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
