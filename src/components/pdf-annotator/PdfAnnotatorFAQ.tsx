/* eslint-disable max-len */
import { Accordion, AccordionItem } from '@heroui/react';
import NextLink from 'next/link';
import { ReactNode } from 'react';

export const pdfAnnotatorFaqs = [
  {
    question: 'What is a PDF annotator?',
    answer:
      'A PDF annotator is an online tool that lets you add comments, highlights, drawings, and markup directly onto a PDF so reviewers can point to specific text, images, or areas that need changes. Annotations are pinned to exact locations on the page, so feedback is precise and actionable. PDF annotators replace vague notes like "fix page 3" with location-pinned comments and visual markup that writers and designers can act on.',
  },
  {
    question: 'How do I annotate a PDF online?',
    answer:
      "Upload your PDF to a PDF annotator tool and open it in the review interface. Navigate page by page and click or select the area you want to comment on. Add a comment, highlight, or drawing—your annotation is attached to that exact location. Share a review link so clients or collaborators can view and add their own annotations without creating an account.",
  },
  {
    question: 'Can clients annotate PDFs without creating an account?',
    answer:
      'Yes. Many PDF annotators offer guest review links. Send your client a secure link to the PDF; they can open it, add comments and markup, and submit feedback without signing up. This removes friction from the approval process and keeps all PDF annotations in one place.',
  },
  {
    question: 'What types of annotations can I add to a PDF?',
    answer:
      'You can add text comments pinned to specific spots on a page, highlights and shapes to mark regions, arrows and markers to point to elements, and freehand drawing where needed. Annotations can be color-coded by reviewer or type. All feedback is tied to the exact page and position.',
  },
  {
    question: 'How do I track resolved comments on a PDF?',
    answer:
      "PDF annotators typically track resolution status for every comment and annotation. You can mark items as resolved or unresolved and filter to show only what still needs attention. When you upload a new version of the PDF, you can resolve annotations that have been addressed. The system keeps a clear record of what's done and what's pending across review rounds.",
  },
  {
    question: 'Can multiple people annotate the same PDF at once?',
    answer:
      "Yes. Multiple reviewers can annotate the same PDF. Each person's comments and markup are visible to everyone, with indicators for who added what. You can see all annotations in one view, filter by reviewer, and track resolution. This works for internal teams and for clients using guest links.",
  },
  {
    question: 'Why annotate PDFs in a collaboration tool instead of a standalone PDF app?',
    answer:
      'Annotating PDFs in a collaboration tool keeps review in one place with your video, images, and other deliverables. You get a single project timeline, one set of review links for clients, and one approval workflow instead of juggling PDF tools, email, and separate review apps. That reduces delays and ensures nothing gets missed.',
  },
  {
    question: 'How does PDF annotation help creative and marketing workflows?',
    answer:
      'PDF annotation streamlines creative review by making feedback visual and location-specific. Instead of "change the headline on page 3," reviewers point directly to the spot and add a comment or highlight. Writers and designers see exactly what to change, resolution tracking keeps rounds organized, and clients can annotate PDFs via a link without accounts. That speeds up approvals and reduces revision cycles for layouts, decks, and documents.',
  },
];

export const PdfAnnotatorFAQ = () => {
  const faqItems: Array<{
    key: string;
    title: string;
    content: ReactNode;
  }> = [
    {
      key: 'what-is-pdf-annotator',
      title: 'What is a PDF annotator?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            A PDF annotator is an online tool that lets you add comments, highlights, drawings, and markup directly
            onto a PDF. Annotations are pinned to exact locations on the page, so feedback is precise and actionable.
          </p>
          <p>
            Learn more about{' '}
            <NextLink href="/platform/annotate-pdf" className="text-primary underline underline-offset-2">
              PDF annotation in Kreatli
            </NextLink>
            .
          </p>
        </div>
      ),
    },
    {
      key: 'how-to-annotate-pdf',
      title: 'How do I annotate a PDF online?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            Upload your PDF and open it in the review interface. Navigate page by page and click or select the area you
            want to comment on. Add a comment, highlight, or drawing pinned to that location. Share a link so others
            can add their own annotations without creating an account.
          </p>
        </div>
      ),
    },
    {
      key: 'no-signup',
      title: 'Can clients annotate PDFs without creating an account?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            Yes. Guest review links let clients open the PDF, add comments and markup, and submit feedback without
            signing up. Kreatli offers{' '}
            <NextLink href="/platform/review-approval" className="text-primary underline underline-offset-2">
              no-signup guest review links
            </NextLink>{' '}
            for PDFs and video.
          </p>
        </div>
      ),
    },
    {
      key: 'annotation-types',
      title: 'What types of annotations can I add to a PDF?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            You can add text comments, highlights, shapes, arrows, and freehand drawing—all pinned to specific spots on a
            page. Explore{' '}
            <NextLink href="/platform/draw-on-pdf-document" className="text-primary underline underline-offset-2">
              drawing on PDF in Kreatli
            </NextLink>
            .
          </p>
        </div>
      ),
    },
    {
      key: 'track-resolution',
      title: 'How do I track resolved comments on a PDF?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            Mark annotations as resolved or unresolved and filter to show only what still needs attention. When you
            upload a new version, resolve annotations that have been addressed. The system keeps a clear record across
            review rounds.
          </p>
        </div>
      ),
    },
    {
      key: 'multiple-annotators',
      title: 'Can multiple people annotate the same PDF at once?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            Yes. Multiple reviewers can annotate the same PDF. Each person’s comments and markup are visible to
            everyone, with indicators for who added what. You can filter by reviewer and track resolution.
          </p>
        </div>
      ),
    },
    {
      key: 'why-collab-tool',
      title: 'Why annotate PDFs in a collaboration tool instead of a standalone PDF app?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            Keeping PDF annotation in a collaboration tool gives you one project timeline, one set of review links for
            clients, and one approval workflow—instead of juggling PDF tools, email, and separate review apps.
          </p>
        </div>
      ),
    },
    {
      key: 'creative-workflows',
      title: 'How does PDF annotation help creative and marketing workflows?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            PDF annotation makes feedback visual and location-specific. Reviewers point directly to the spot and add a
            comment or highlight. Writers and designers see exactly what to change, resolution tracking keeps rounds
            organized, and clients can annotate via a link without accounts—speeding up approvals and reducing
            revision cycles.
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
            Common questions about PDF annotators, location-pinned markup, and collaboration.
          </p>
        </div>

        <Accordion variant="splitted" aria-label="PDF annotator FAQs">
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
