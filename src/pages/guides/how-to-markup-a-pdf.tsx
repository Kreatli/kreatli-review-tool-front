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

const DOCUMENT_TITLE = 'How to Markup a PDF: Highlights, Shapes, and Clear Review-Ready Feedback';
const META_DESCRIPTION =
  'Learn how to markup a PDF with highlights, shapes, and notes so reviewers show exact changes and approvals move ' +
  'faster without email threads.';
const PUBLISH_DATE = '2026-04-10 12:00';
const READ_TIME = '9';
const CANONICAL_PATH = '/guides/how-to-markup-a-pdf';
const GUIDE_COVER_SRC = '/images/guides/how-to-markup-a-pdf-cover.png';
const GUIDE_OG_IMAGE_URL = GUIDE_COVER_SRC;

const MARKUP_PDF_HERO_BLOK: SectionStoryblok = {
  _uid: 'static-how-to-markup-a-pdf-hero',
  component: 'section',
  title: 'How to Markup a PDF',
  titleTag: 'h1',
  text:
    'A practical guide to PDF markup: combine highlights, shapes, and short notes so every reviewer points to the same ' +
    'spot and edits are easy to execute.',
  orientation: '',
  displaySocials: false,
  imageObjectFit: 'contain',
  image: {
    _uid: 'static-how-to-markup-a-pdf-cover',
    id: null,
    alt: 'Kreatli Guide: How to markup a PDF',
    name: '',
    focus: '',
    source: '',
    title: 'How to markup a PDF',
    filename: GUIDE_COVER_SRC,
    copyright: '',
    fieldtype: 'asset',
  },
};

const TOC_SECTIONS = [
  'What PDF markup means in a review workflow',
  'When markup beats long text-only feedback',
  'How to markup a PDF (step-by-step)',
  'Best practices for readable PDF markup',
  'Try marking up a PDF now',
  'Free tools, guides, and platform features',
  'FAQ: Markup a PDF',
] as const;

const MARKUP_PDF_FAQS = [
  {
    question: 'What counts as “markup” on a PDF?',
    answer:
      'Markup is any visual layer on top of the PDF that helps reviewers point to a decision: highlights, underlines, ' +
      'boxes, arrows, stamps, or freehand drawing. It is usually paired with a short note so intent stays clear.',
  },
  {
    question: 'How is markup different from only adding comments?',
    answer:
      'Comments explain intent; markup shows exactly where. The strongest reviews combine both—markup anchors the eye, ' +
      'and the comment explains what “fixed” should look like.',
  },
  {
    question: 'How do I keep PDF markup from becoming messy?',
    answer:
      'Use one mark per issue, keep colors consistent by issue type, and avoid stacking shapes in the same region. When ' +
      'a page gets crowded, split feedback into separate comments or a new review round.',
  },
  {
    question: 'Can clients markup a PDF without installing software?',
    answer:
      'Yes, when you share a browser-based review link. Guests can open the file, add markup, and leave notes in one ' +
      'place without desktop PDF editors.',
  },
  {
    question: 'How should markup be handled across PDF versions?',
    answer:
      'Keep markup tied to the revision where it was created. Resolve completed items before uploading the next version ' +
      'so open issues stay obvious and old marks are not misread as current.',
  },
] as const;

export default function HowToMarkupAPdfGuidePage() {
  useSession();

  const relatedArticles = getPlatformArticles('/platform/annotate-pdf').filter(
    (article) => article.full_slug !== CANONICAL_PATH,
  );

  const tocLinks = TOC_SECTIONS.map((label) => ({
    label,
    url: `#${getHeadingId(label)}`,
  }));

  return (
    <>
      <FAQStructuredData faqs={[...MARKUP_PDF_FAQS]} />
      <GuidePageLayout
        documentTitle={DOCUMENT_TITLE}
        metaDescription={META_DESCRIPTION}
        canonicalPath={CANONICAL_PATH}
        ogImageUrl={GUIDE_OG_IMAGE_URL}
        ogImageAlt="Kreatli Guide: How to markup a PDF"
        publishDate={PUBLISH_DATE}
        readTimeMinutes={READ_TIME}
        breadcrumbLabel={DOCUMENT_TITLE}
        tocLinks={tocLinks}
      >
        <Section blok={MARKUP_PDF_HERO_BLOK} />

        <GuideSectionRule />

        <div className={wysiwygStyles.wysiwyg}>
          <p>
            <strong>How to markup a PDF</strong> is about making feedback impossible to misread. The goal is not
            decoration—it is a shared visual language that says “this exact phrase,” “this margin,” or “this callout
            block” needs attention, backed by a short note that explains the outcome you want.
          </p>

          <h2 id={getHeadingId(TOC_SECTIONS[0])}>{TOC_SECTIONS[0]}</h2>
          <p>
            In creative and compliance reviews, PDF markup is the fastest way to align eyes on the same pixels. Teams
            use highlights for text, shapes for regions, and drawing when direction matters—always in service of one
            decision per mark when possible.
          </p>
          <ul>
            <li>
              <p>
                <strong>Highlights:</strong> emphasize copy, labels, or legal lines that need edits.
              </p>
            </li>
            <li>
              <p>
                <strong>Shapes and arrows:</strong> show spacing, alignment, or “move this element” intent.
              </p>
            </li>
            <li>
              <p>
                <strong>Short notes:</strong> translate the mark into an actionable change request.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[1])}>{TOC_SECTIONS[1]}</h2>
          <p>
            Paragraph-long messages often hide the real target. Markup removes the “which line?” question so editors can
            triage faster—especially on multi-page decks, one-pagers with dense type, and layout-heavy PDFs.
          </p>
          <ul>
            <li>
              <p>
                <strong>Design QA:</strong> call out hierarchy, safe zones, and asset placement directly on the page.
              </p>
            </li>
            <li>
              <p>
                <strong>Copy passes:</strong> pair highlights with precise language fixes.
              </p>
            </li>
            <li>
              <p>
                <strong>Client rounds:</strong> keep external feedback anchored so nothing is interpreted twice.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[2])}>{TOC_SECTIONS[2]}</h2>
          <ol>
            <li>
              <p>
                <strong>Open the PDF</strong> in a review tool that supports markup plus comments.
              </p>
            </li>
            <li>
              <p>
                <strong>Pick the right tool</strong> for the issue—highlight for text, a box for a region, an arrow for
                direction.
              </p>
            </li>
            <li>
              <p>
                <strong>Mark one issue at a time</strong> so each item can be resolved independently.
              </p>
            </li>
            <li>
              <p>
                <strong>Add a concise note</strong> that states what should change and what “done” looks like.
              </p>
            </li>
            <li>
              <p>
                <strong>Share one review link</strong> and track open vs resolved markup through approval.
              </p>
            </li>
          </ol>
          <p>
            For the platform overview, see <NextLink href="/platform/annotate-pdf">Annotate PDF</NextLink>.
          </p>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[3])}>{TOC_SECTIONS[3]}</h2>
          <ul>
            <li>
              <p>
                <strong>Match mark to meaning:</strong> use the same color or shape type for the same class of issue.
              </p>
            </li>
            <li>
              <p>
                <strong>Stay legible:</strong> avoid overlapping annotations that hide the underlying content.
              </p>
            </li>
            <li>
              <p>
                <strong>Write for execution:</strong> prefer “increase padding 8px” over “feels tight.”
              </p>
            </li>
            <li>
              <p>
                <strong>Close the loop:</strong> resolve markup when the PDF reflects the fix.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[4])}>{TOC_SECTIONS[4]}</h2>
          <p>
            The interactive preview below mirrors a simple PDF markup flow with location-pinned feedback. When you are
            ready, <NextLink href="/sign-up">start a 7-day trial</NextLink> or{' '}
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
          sectionIntro="Below are free tools that pair with PDF markup, plus related guides and platform features to explore next."
          toolsTitle="Free tools for PDF markup and review"
          toolsDescription="Try tools that complement highlights, drawing, and structured feedback."
          tools={getFreeToolsForPlatform('/platform/annotate-pdf')}
          articlesTitle="More guides and examples"
          articlesDescription="Read more about PDF review, annotations, and version-aware approvals."
          articles={relatedArticles}
          articlesMax={3}
          resourcesTitle="More resources"
          resourcesDescription="Capabilities that support PDF markup, comments, and secure collaboration."
          resources={getRelatedResources(['annotatePdf', 'drawOnPdfDocument', 'addCommentsToPdf']).map(
            (resource, index) => {
              if (index === 0) return { ...resource, icon: 'filePdf' };
              if (index === 1) return { ...resource, icon: 'paint' };
              return { ...resource, icon: 'chat' };
            },
          )}
        />

        <GuideSectionRule />

        <section className="relative pb-0 pt-12 md:pb-0 md:pt-16">
          <div className="relative z-10 mx-auto max-w-3xl">
            <div className={cn(wysiwygStyles.wysiwyg, '[&>h2:first-child]:!mt-0')}>
              <h2 id={getHeadingId(TOC_SECTIONS[6])}>{TOC_SECTIONS[6]}</h2>
            </div>
            <div className="mt-6 flex flex-col gap-5 sm:gap-6">
              {MARKUP_PDF_FAQS.map((faq) => (
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
                PDF markup workflow for your team.
              </p>
            </div>
          </div>
        </section>

        <CTASection
          layout="split"
          splitTone="guide"
          title="Ready to make PDF feedback easier to execute?"
          description="Markup exact areas, keep comments tied to context, and move approvals forward without scattered threads."
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
