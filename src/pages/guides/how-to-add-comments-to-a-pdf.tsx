import { cn } from '@heroui/react';
import NextLink from 'next/link';

import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';
import { GuideArticleToolsResourcesSection } from '../../components/guides/GuideArticleToolsResourcesSection';
import { GuidePageLayout } from '../../components/guides/GuidePageLayout';
import { GuideSectionRule } from '../../components/guides/GuideSectionRule';
import { Section } from '../../components/layout/Storyblok/Section/Section';
import wysiwygStyles from '../../components/layout/Storyblok/Wysiwyg/Wysiwyg.module.scss';
import { CTASection } from '../../components/shared/CTASection';
import { FAQStructuredData } from '../../components/shared/FAQStructuredData';
import { InteractiveReviewToolPreview } from '../../components/shared/InteractiveReviewToolPreview';
import { getPlatformArticles } from '../../data/platform-articles';
import { getFreeToolsForPlatform } from '../../data/platform-free-tools';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';
import { SectionStoryblok } from '../../typings/storyblok';
import { getHeadingId } from '../../utils/storyblok';

const DOCUMENT_TITLE = 'How to Add Comments to a PDF: Page-Pinned Feedback Without Email Threads';
const META_DESCRIPTION =
  'Learn how to add comments to a PDF with page-pinned notes, clear context, and version-aware review—so teams can approve faster without losing feedback in email.';
const PUBLISH_DATE = '2026-04-09 00:00';
const READ_TIME = '9';
const CANONICAL_PATH = '/guides/how-to-add-comments-to-a-pdf';
/** Horizontal cover for social / OG / hero. Use ~1800–2400px wide for a sharp hero on retina. */
const GUIDE_COVER_SRC = '/images/guides/how-to-add-comments-to-a-pdf-cover.png';
const GUIDE_OG_IMAGE_URL = GUIDE_COVER_SRC;

const HOW_TO_ADD_COMMENTS_TO_A_PDF_HERO_BLOK: SectionStoryblok = {
  _uid: 'static-how-to-add-comments-to-a-pdf-hero',
  component: 'section',
  title: 'How to Add Comments to a PDF',
  titleTag: 'h1',
  text: 'A practical guide for reviewing PDFs: add page-pinned comments that stay tied to the right spot, keep context clear, and move approvals forward without messy email threads.',
  orientation: '',
  displaySocials: false,
  imageObjectFit: 'contain',
  image: {
    _uid: 'static-how-to-add-comments-to-a-pdf-cover',
    id: null,
    alt: 'Kreatli Guide: How to add comments to a PDF',
    name: '',
    focus: '',
    source: '',
    title: 'How to add comments to a PDF',
    filename: GUIDE_COVER_SRC,
    copyright: '',
    fieldtype: 'asset',
  },
};

const TOC_SECTIONS = [
  'What it means to “add comments to a PDF”',
  'When PDF comments beat edits in the doc itself',
  'How to add comments to a PDF (step-by-step)',
  'Best practices for actionable PDF feedback',
  'Try adding comments to a PDF now',
  'Free tools, guides, and platform features',
  'FAQ: Add comments to a PDF',
] as const;

const ADD_COMMENTS_TO_A_PDF_FAQS = [
  {
    question: 'What’s the difference between “commenting” and “annotating” a PDF?',
    answer:
      'Commenting usually means leaving written notes (often pinned to a spot or a page). Annotating can include comments plus visual markup like highlights, shapes, arrows, or drawing. In practice, good review workflows support both: comments explain intent, annotations show exactly where.',
  },
  {
    question: 'How do I keep PDF comments tied to the right page and spot?',
    answer:
      'Use a review interface that pins each comment to a specific page and location. That way, “Fix this heading” is always anchored to the exact spot, and reviewers can jump directly to the comment instead of hunting through a long thread.',
  },
  {
    question: 'Can clients leave PDF comments without creating an account?',
    answer:
      'Yes—if you share a guest-friendly review link, external stakeholders can open the PDF and leave page-pinned comments without signing up. This keeps feedback centralized while reducing friction for clients.',
  },
  {
    question: 'What should a good PDF comment include?',
    answer:
      'A good PDF comment includes the “what” (the change), the “why” (the intent), and a success check (how to know it’s done). When possible, reference the page section and keep one idea per comment so it’s easy to resolve.',
  },
  {
    question: 'How do I handle new versions of a PDF during review?',
    answer:
      'Keep feedback organized by version. When a new revision is uploaded, reviewers should be able to see which comments were addressed, what’s still open, and which notes applied to the prior version so nothing gets lost across rounds.',
  },
] as const;

export default function HowToAddCommentsToAPdfGuidePage() {
  useSession();

  const relatedArticles = getPlatformArticles('/platform/add-comments-to-pdf').filter(
    (article) => article.full_slug !== '/guides/how-to-add-comments-to-a-pdf',
  );

  const tocLinks = TOC_SECTIONS.map((label) => ({
    label,
    url: `#${getHeadingId(label)}`,
  }));

  return (
    <>
      <FAQStructuredData faqs={[...ADD_COMMENTS_TO_A_PDF_FAQS]} />
      <GuidePageLayout
        documentTitle={DOCUMENT_TITLE}
        metaDescription={META_DESCRIPTION}
        canonicalPath={CANONICAL_PATH}
        ogImageUrl={GUIDE_OG_IMAGE_URL}
        ogImageAlt="Kreatli Guide: How to add comments to a PDF"
        publishDate={PUBLISH_DATE}
        readTimeMinutes={READ_TIME}
        breadcrumbLabel={DOCUMENT_TITLE}
        tocLinks={tocLinks}
      >
        <Section blok={HOW_TO_ADD_COMMENTS_TO_A_PDF_HERO_BLOK} />

        <GuideSectionRule />

        <div className={wysiwygStyles.wysiwyg}>
          <p>
            <strong>How to add comments to a PDF</strong> is really about leaving feedback that stays tied to the right
            page and context. Instead of “see my notes below,” you want <strong>page-pinned comments</strong> that point
            to the exact spot—so designers, writers, and stakeholders can resolve feedback quickly without guessing.
          </p>

          <h2 id={getHeadingId(TOC_SECTIONS[0])}>{TOC_SECTIONS[0]}</h2>
          <p>
            In a review workflow, “commenting on a PDF” means your note is anchored to a page (and often a specific
            location). The PDF stays the source of truth, and the comments provide the decisions, questions, and changes
            needed for the next version.
          </p>
          <ul>
            <li>
              <p>
                <strong>Page context:</strong> “Update headline on page 3” beats “Update the headline.”
              </p>
            </li>
            <li>
              <p>
                <strong>Clear intent:</strong> explain what to change and why, not just what you dislike.
              </p>
            </li>
            <li>
              <p>
                <strong>Resolution tracking:</strong> keep a record of what’s done vs what still needs attention.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[1])}>{TOC_SECTIONS[1]}</h2>
          <p>
            Editing directly in the source doc is great when you own the file. PDF comments are better when you are
            reviewing a locked export, collecting stakeholder feedback, or keeping approvals auditable.
          </p>
          <ul>
            <li>
              <p>
                <strong>Final proofing:</strong> typos, layout issues, spacing, and last-mile polish.
              </p>
            </li>
            <li>
              <p>
                <strong>Stakeholder review:</strong> approvals and sign-off without rewriting the document.
              </p>
            </li>
            <li>
              <p>
                <strong>External collaboration:</strong> clients can comment without touching the source file.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[2])}>{TOC_SECTIONS[2]}</h2>
          <ol>
            <li>
              <p>
                <strong>Open the PDF in a review tool</strong> that supports page-pinned comments (and optionally
                markup).
              </p>
            </li>
            <li>
              <p>
                <strong>Navigate to the page</strong> you want to discuss and click the exact spot to anchor the note.
              </p>
            </li>
            <li>
              <p>
                <strong>Write the comment</strong> with clear action + intent (what to change and why).
              </p>
            </li>
            <li>
              <p>
                <strong>Share a review link</strong> so everyone comments in one place instead of starting new threads.
              </p>
            </li>
            <li>
              <p>
                <strong>Resolve comments</strong> as they’re addressed, then upload the next version when ready.
              </p>
            </li>
          </ol>
          <p>
            If you want the platform overview, see <NextLink href="/platform/add-comments-to-pdf">Add Comments to PDF</NextLink>.
          </p>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[3])}>{TOC_SECTIONS[3]}</h2>
          <ul>
            <li>
              <p>
                <strong>One idea per comment:</strong> split mixed feedback into separate notes so they can be resolved
                independently.
              </p>
            </li>
            <li>
              <p>
                <strong>Write for action:</strong> “Change X to Y” is easier than “This feels off.”
              </p>
            </li>
            <li>
              <p>
                <strong>Add the why:</strong> explain the intent (brand, clarity, compliance) so edits don’t ping-pong.
              </p>
            </li>
            <li>
              <p>
                <strong>Confirm success:</strong> define what “done” looks like (“matches style guide,” “fits in safe
                area,” “uses approved copy”).
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[4])}>{TOC_SECTIONS[4]}</h2>
          <p>
            The interactive preview below is a lightweight example of the workflow: upload a PDF, think in page-pinned
            comments, and keep feedback in one place. When you’re ready, <NextLink href="/sign-up">start a 7-day trial</NextLink>{' '}
            or{' '}
            <a href="https://calendar.app.google/NXbAeTAUwaBGh5x49" target="_blank" rel="noopener noreferrer nofollow">
              book a demo
            </a>
            .
          </p>

          <div className="my-4 w-full">
            <InteractiveReviewToolPreview variant="pdf" />
          </div>
        </div>

        <GuideSectionRule />

        <GuideArticleToolsResourcesSection
          tocHeadingId={getHeadingId(TOC_SECTIONS[5])}
          tocHeadingLabel={TOC_SECTIONS[5]}
          sectionIntro="Below are free tools that pair with PDF review, plus related guides and platform features to explore next."
          toolsTitle="Free tools for PDF review"
          toolsDescription="Try tools that complement PDF commenting, markup, and review workflows."
          tools={getFreeToolsForPlatform('/platform/add-comments-to-pdf')}
          articlesTitle="More guides and examples"
          articlesDescription="Read more about proofing, approvals, and version-aware review workflows."
          articles={relatedArticles}
          articlesMax={3}
          resourcesTitle="More resources"
          resourcesDescription="Capabilities that support PDF commenting, versioning, secure storage, and approvals."
          resources={getRelatedResources(['addCommentsToPdf', 'annotatePdf', 'secureAssetStorage']).map((resource, index) => {
            if (index === 0) return { ...resource, icon: 'chat' };
            if (index === 1) return { ...resource, icon: 'filePdf' };
            return resource;
          })}
        />

        <GuideSectionRule />

        <section className="relative pb-0 pt-12 md:pb-0 md:pt-16">
          <div className="relative z-10 mx-auto max-w-3xl">
            <div className={cn(wysiwygStyles.wysiwyg, '[&>h2:first-child]:!mt-0')}>
              <h2 id={getHeadingId(TOC_SECTIONS[6])}>{TOC_SECTIONS[6]}</h2>
            </div>
            <div className="mt-6 flex flex-col gap-5 sm:gap-6">
              {ADD_COMMENTS_TO_A_PDF_FAQS.map((faq) => (
                <div key={faq.question} className="space-y-1.5">
                  <p className="mb-0 font-sans text-lg font-bold leading-snug text-foreground sm:text-xl">
                    {faq.question}
                  </p>
                  <p className="mb-0 text-lg font-normal leading-relaxed text-foreground-500">{faq.answer}</p>
                </div>
              ))}
            </div>
            <hr className="mt-12 w-full border-0 border-t border-foreground-300" aria-hidden />
            <div className={cn(wysiwygStyles.wysiwyg, 'mt-10 [&>h3:first-child]:!mt-0')}>
              <h3>Still have questions?</h3>
              <p>
                Reach us at <a href="mailto:support@kreatli.com">support@kreatli.com</a> and we will help you set up a
                PDF review flow that fits your team.
              </p>
            </div>
          </div>
        </section>

        <CTASection
          layout="split"
          splitTone="guide"
          title="Ready to keep PDF feedback organized?"
          description="Collect page-pinned comments, keep versions clear, and move approvals forward without losing context."
          primaryButtonText="Start for Free"
          primaryButtonHref="/sign-up"
          splitPromoImageSrc="/images/guides/embed-video-cta.png"
          splitPromoImageAlt="Kreatli platform: tasks, reviews, media library, and version compare"
        />
      </GuidePageLayout>
      <SignUpModal />
    </>
  );
}

