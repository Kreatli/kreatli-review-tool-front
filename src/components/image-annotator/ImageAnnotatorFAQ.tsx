/* eslint-disable max-len */
import { Accordion, AccordionItem } from '@heroui/react';
import NextLink from 'next/link';
import { ReactNode } from 'react';

export const imageAnnotatorFaqs = [
  {
    question: 'What is an image annotator?',
    answer:
      'An image annotator is an online tool that lets you add comments, highlights, drawings, and markup directly onto an image so reviewers can point to specific areas, elements, or regions that need changes. Annotations are pinned to exact locations on the image, so feedback is precise and actionable. Image annotators replace vague descriptions like "the top-right area" with location-pinned comments and visual markup that designers can act on.',
  },
  {
    question: 'How do I annotate an image online?',
    answer:
      "Upload your image (JPG, PNG, GIF, WebP, etc.) to an image annotator tool and open it in the review interface. Click or select the area you want to comment on, then add a comment, highlight, or drawing—your annotation is attached to that exact location. Share a review link so clients or collaborators can view and add their own annotations without creating an account.",
  },
  {
    question: 'Can clients annotate images without creating an account?',
    answer:
      'Yes. Many image annotators offer guest review links. Send your client a secure link to the image; they can open it, add comments and markup, and submit feedback without signing up. This removes friction from the approval process and keeps all image annotations in one place.',
  },
  {
    question: 'What types of annotations can I add to an image?',
    answer:
      'You can add text comments pinned to specific spots on the image, highlights and shapes to mark regions, arrows and markers to point to elements, and freehand drawing where needed. Annotations can be color-coded by reviewer or type. All feedback is tied to the exact position.',
  },
  {
    question: 'What image formats support annotation?',
    answer:
      'Most image annotators support common formats including JPG, PNG, GIF, WebP, and other standard image files. You can annotate any image uploaded to a project. The annotation system keeps feedback pinned to the right area regardless of resolution or format.',
  },
  {
    question: 'Can multiple people annotate the same image at once?',
    answer:
      "Yes. Multiple reviewers can annotate the same image. Each person's comments and markup are visible to everyone, with indicators for who added what. You can see all annotations in one view, filter by reviewer, and track resolution. This works for internal teams and for clients using guest links.",
  },
  {
    question: 'Why annotate images in a collaboration tool instead of a standalone app?',
    answer:
      'Annotating images in a collaboration tool keeps review in one place with your video, PDFs, and other deliverables. You get a single project timeline, one set of review links for clients, and one approval workflow instead of juggling image tools, email, and separate review apps. That reduces delays and ensures nothing gets missed.',
  },
  {
    question: 'How does image annotation help creative and design workflows?',
    answer:
      'Image annotation streamlines creative review by making feedback visual and location-specific. Instead of describing "the top-right area," reviewers point directly to the spot and add a comment or highlight. Designers see exactly what to change, resolution tracking keeps rounds organized, and clients can annotate images via a link without accounts. That speeds up approvals and reduces revision cycles for photos, graphics, and visual assets.',
  },
];

export const ImageAnnotatorFAQ = () => {
  const faqItems: Array<{
    key: string;
    title: string;
    content: ReactNode;
  }> = [
    {
      key: 'what-is-image-annotator',
      title: 'What is an image annotator?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            An image annotator is an online tool that lets you add comments, highlights, drawings, and markup directly
            onto an image. Annotations are pinned to exact locations on the image, so feedback is precise and
            actionable.
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
      key: 'how-to-annotate-image',
      title: 'How do I annotate an image online?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            Upload your image and open it in the review interface. Click or select the area you want to comment on,
            then add a comment, highlight, or drawing pinned to that location. Share a link so others can add their own
            annotations without creating an account.
          </p>
        </div>
      ),
    },
    {
      key: 'no-signup',
      title: 'Can clients annotate images without creating an account?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            Yes. Guest review links let clients open the image, add comments and markup, and submit feedback without
            signing up. Kreatli offers{' '}
            <NextLink href="/platform/review-approval" className="text-primary underline underline-offset-2">
              no-signup guest review links
            </NextLink>{' '}
            for images, PDFs, and video.
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
            You can add text comments, highlights, shapes, arrows, and freehand drawing—all pinned to specific spots on
            the image. Explore{' '}
            <NextLink href="/platform/draw-on-image" className="text-primary underline underline-offset-2">
              drawing on image in Kreatli
            </NextLink>
            .
          </p>
        </div>
      ),
    },
    {
      key: 'formats',
      title: 'What image formats support annotation?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            Most tools support JPG, PNG, GIF, WebP, and other standard image files. You can annotate any image uploaded
            to a project. Feedback stays pinned to the right area regardless of resolution or format.
          </p>
        </div>
      ),
    },
    {
      key: 'multiple-annotators',
      title: 'Can multiple people annotate the same image at once?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            Yes. Multiple reviewers can annotate the same image. Each person’s comments and markup are visible to
            everyone, with indicators for who added what. You can filter by reviewer and track resolution.
          </p>
        </div>
      ),
    },
    {
      key: 'why-collab-tool',
      title: 'Why annotate images in a collaboration tool instead of a standalone app?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            Keeping image annotation in a collaboration tool gives you one project timeline, one set of review links
            for clients, and one approval workflow—instead of juggling image tools, email, and separate review apps.
          </p>
        </div>
      ),
    },
    {
      key: 'creative-workflows',
      title: 'How does image annotation help creative and design workflows?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            Image annotation makes feedback visual and location-specific. Reviewers point directly to the spot and add a
            comment or highlight. Designers see exactly what to change, resolution tracking keeps rounds organized, and
            clients can annotate via a link without accounts—speeding up approvals and reducing revision cycles for
            photos, graphics, and visual assets.
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
            Common questions about image annotators, location-pinned markup, and collaboration.
          </p>
        </div>

        <Accordion variant="splitted" aria-label="Image annotator FAQs">
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
