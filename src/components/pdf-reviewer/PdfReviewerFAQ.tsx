/* eslint-disable max-len */
import { Accordion, AccordionItem } from '@heroui/react';
import NextLink from 'next/link';
import { ReactNode } from 'react';

// Export FAQ data for use with FAQStructuredData component
export const pdfReviewerFaqs = [
  {
    question: 'What is PDF review?',
    answer:
      'PDF review is the process of reviewing PDF documents with feedback, comments, and annotations to get approval or request changes. In Kreatli, you can review PDFs with comments pinned to exact locations, highlights, shapes, and drawings—all in one place alongside video and other creative assets. This keeps feedback organized and tied to the right page and spot, so nothing gets lost in email or separate tools.',
  },
  {
    question: 'How do I review a PDF in Kreatli?',
    answer:
      "Upload your PDF to a Kreatli project and open it in the review interface. Navigate page by page and click or select the area you want to comment on. Add comments, highlights, or drawings pinned to that exact location. When you're done reviewing, share a link so clients or collaborators can view and add their own feedback without creating an account.",
  },
  {
    question: 'Can clients review PDFs without creating an account?',
    answer:
      'Yes. Kreatli offers no-signup guest review links for PDFs (and video). Send your client a secure link to the PDF; they can open it, add comments and markup, and submit feedback without signing up. This removes friction from the approval process and keeps all PDF review in one thread with the rest of your project.',
  },
  {
    question: 'What feedback options are available when reviewing a PDF?',
    answer:
      'In Kreatli you can add text comments pinned to specific spots on a page, highlights and shapes to mark regions, arrows and markers to point to elements, and freehand drawing where needed. Reviewers can also approve or request changes. All feedback is tied to the exact page and position, so designers and writers know precisely what to change.',
  },
  {
    question: 'How do I track feedback status on a PDF review?',
    answer:
      "Kreatli tracks resolution status for every comment on a PDF. You can mark items as resolved or unresolved and filter to show only what still needs attention. When you upload a new version of the PDF, you can resolve comments that have been addressed. The system keeps a clear record of what's done and what's pending across review rounds.",
  },
  {
    question: 'Can multiple people review the same PDF at once?',
    answer:
      "Yes. Multiple reviewers can review the same PDF. Each person's comments and markup are visible to everyone, with indicators for who added what. You can see all feedback in one view, filter by reviewer, and track resolution. This works for internal teams and for clients using guest links.",
  },
  {
    question: 'Why review PDFs in Kreatli instead of email or standalone PDF tools?',
    answer:
      'Reviewing PDFs in Kreatli keeps review in one place with your video, images, and other deliverables. You get a single project timeline, one set of review links for clients, and one approval workflow instead of juggling PDF tools, email, and separate review apps. That reduces delays and ensures nothing gets missed when moving from draft to final.',
  },
  {
    question: 'How does PDF review help creative and marketing workflows?',
    answer:
      'PDF review streamlines creative workflows by making feedback visual and location-specific. Instead of "change the headline on page 3," reviewers point directly to the spot and add a comment. Writers and designers see exactly what to change, resolution tracking keeps rounds organized, and clients can review PDFs via a link without accounts. That speeds up approvals and reduces revision cycles for layouts, decks, and documents.',
  },
];

export const PdfReviewerFAQ = () => {
  const faqItems: Array<{
    key: string;
    title: string;
    content: ReactNode;
  }> = [
    {
      key: 'what-is-pdf-review',
      title: 'What is PDF review?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            PDF review is the process of reviewing PDF documents with feedback, comments, and annotations to get
            approval or request changes. In Kreatli, you can review PDFs with comments pinned to exact locations,
            highlights, shapes, and drawings—all in one place alongside video and other creative assets.
          </p>
          <p>
            Learn more about{' '}
            <NextLink href="/platform/review-pdf" className="text-primary underline underline-offset-2">
              PDF review in Kreatli
            </NextLink>
            .
          </p>
        </div>
      ),
    },
    {
      key: 'how-to-review-pdf',
      title: 'How do I review a PDF in Kreatli?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            Upload your PDF to a Kreatli project and open it in the review interface. Navigate page by page and click
            or select the area you want to comment on. Add comments, highlights, or drawings pinned to that exact
            location.
          </p>
          <p>
            When you&apos;re done reviewing, share a link so clients or collaborators can view and add their own
            feedback without creating an account.
          </p>
        </div>
      ),
    },
    {
      key: 'no-signup-pdf',
      title: 'Can clients review PDFs without creating an account?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            Yes. Kreatli offers <strong>no-signup guest review links</strong> for PDFs (and video). Send your client a
            secure link to the PDF; they can open it, add comments and markup, and submit feedback without signing up.
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
      key: 'feedback-options',
      title: 'What feedback options are available when reviewing a PDF?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            You can add <strong>text comments</strong> pinned to specific spots on a page, <strong>highlights</strong> and{' '}
            <strong>shapes</strong> to mark regions, <strong>arrows</strong> and <strong>markers</strong> to point to
            elements, and <strong>freehand drawing</strong> where needed. Reviewers can also approve or request changes.
          </p>
          <p>
            Explore{' '}
            <NextLink href="/platform/annotate-pdf" className="text-primary underline underline-offset-2">
              annotate PDF
            </NextLink>{' '}
            and{' '}
            <NextLink href="/platform/draw-on-pdf-document" className="text-primary underline underline-offset-2">
              draw on PDF
            </NextLink>{' '}
            in Kreatli.
          </p>
        </div>
      ),
    },
    {
      key: 'track-feedback',
      title: 'How do I track feedback status on a PDF review?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            Kreatli tracks <strong>resolution status</strong> for every comment on a PDF. You can mark items as
            resolved or unresolved and filter to show only what still needs attention.
          </p>
          <p>
            When you upload a new version of the PDF, you can resolve comments that have been addressed. The system
            keeps a clear record of what&apos;s done and what&apos;s pending across review rounds.
          </p>
        </div>
      ),
    },
    {
      key: 'multiple-reviewers-pdf',
      title: 'Can multiple people review the same PDF at once?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            Yes. Multiple reviewers can review the same PDF. Each person&apos;s comments and markup are visible to
            everyone, with indicators for who added what.
          </p>
          <p>You can see all feedback in one view, filter by reviewer, and track resolution.</p>
        </div>
      ),
    },
    {
      key: 'why-kreatli-pdf',
      title: 'Why review PDFs in Kreatli instead of email or standalone PDF tools?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            Reviewing PDFs in Kreatli keeps review in one place with your video, images, and other deliverables. You get
            a single project timeline, one set of review links for clients, and one approval workflow instead of
            juggling PDF tools, email, and separate review apps.
          </p>
          <p>That reduces delays and ensures nothing gets missed when moving from draft to final.</p>
        </div>
      ),
    },
    {
      key: 'pdf-workflows',
      title: 'How does PDF review help creative and marketing workflows?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            PDF review streamlines creative workflows by making feedback <strong>visual and location-specific</strong>.
            Instead of &quot;change the headline on page 3,&quot; reviewers point directly to the spot and add a
            comment.
          </p>
          <p>
            Writers and designers see exactly what to change, resolution tracking keeps rounds organized, and clients
            can review PDFs via a link without accounts. That speeds up approvals and reduces revision cycles for
            layouts, decks, and documents.
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
            Common questions about PDF reviewers, online PDF review, annotations, and collaboration.
          </p>
        </div>

        <Accordion variant="splitted" aria-label="PDF reviewer FAQs">
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
