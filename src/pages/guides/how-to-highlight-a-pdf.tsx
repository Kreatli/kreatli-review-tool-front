/* eslint-disable max-len */
import { cn } from '@heroui/react';
import NextLink from 'next/link';

import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';
import { GuideArticleToolsResourcesSection } from '../../components/guides/GuideArticleToolsResourcesSection';
import { GuidePageLayout } from '../../components/guides/GuidePageLayout';
import { GuideSectionRule } from '../../components/guides/GuideSectionRule';
import { Section } from '../../components/layout/Storyblok/Section/Section';
import wysiwygStyles from '../../components/layout/Storyblok/Wysiwyg/Wysiwyg.module.scss';
import { CTASection } from '../../components/shared/CTASection';
import { KeyTakeaways } from '../../components/shared/KeyTakeaways';
import { FAQStructuredData } from '../../components/shared/FAQStructuredData';
import { InteractiveReviewToolPreview } from '../../components/shared/InteractiveReviewToolPreview';
import { getPlatformArticles } from '../../data/platform-articles';
import { getFreeToolsForPlatform } from '../../data/platform-free-tools';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';
import { SectionStoryblok } from '../../typings/storyblok';
import { getHeadingId } from '../../utils/storyblok';

const DOCUMENT_TITLE = 'How to Highlight a PDF: Flag Key Sections for Faster Review';
const META_DESCRIPTION =
  'Learn how to highlight a PDF to flag specific text and regions for review — add context with comments and keep highlights organized across versions.';
const PUBLISH_DATE = '2026-04-10 10:00';
const READ_TIME = '9';
const CANONICAL_PATH = '/guides/how-to-highlight-a-pdf';
const GUIDE_COVER_SRC = '/images/guides/how-to-highlight-a-pdf-cover.png';
const GUIDE_OG_IMAGE_URL = GUIDE_COVER_SRC;

const HIGHLIGHT_PDF_HERO_BLOK: SectionStoryblok = {
  _uid: 'static-how-to-highlight-a-pdf-hero',
  component: 'section',
  title: 'How to Highlight a PDF',
  titleTag: 'h1',
  text: 'A practical guide to highlighting PDFs with intent, not noise. Mark exact text and regions, add context-rich notes, and keep feedback easy to resolve.',
  orientation: '',
  displaySocials: false,
  imageObjectFit: 'contain',
  image: {
    _uid: 'static-how-to-highlight-a-pdf-cover',
    id: null,
    alt: 'Kreatli Guide: How to highlight a PDF',
    name: '',
    focus: '',
    source: '',
    title: 'How to highlight a PDF',
    filename: GUIDE_COVER_SRC,
    copyright: '',
    fieldtype: 'asset',
  },
};

const TOC_SECTIONS = [
  'What highlighting a PDF really means',
  'When highlighting works better than long comments',
  'How to highlight a PDF (step-by-step)',
  'Best practices for useful highlights',
  'Try highlighting a PDF now',
  'Free tools, guides, and platform features',
  'FAQ: Highlight a PDF',
] as const;

const HIGHLIGHT_PDF_FAQS = [
  {
    question: 'What is the best way to highlight a PDF for review?',
    answer:
      'Use highlights to call out exact text or regions, then attach a short comment that explains what should change and why. Highlight-only feedback can be ambiguous, but highlight + context is actionable.',
  },
  {
    question: 'What is the difference between highlighting and annotating a PDF?',
    answer:
      'Highlighting is one annotation type focused on emphasis. Annotating is broader and can include highlights, comments, shapes, arrows, and drawing. Most review workflows use both so location and intent are clear.',
  },
  {
    question: 'How do I avoid over-highlighting a PDF?',
    answer:
      'Highlight only the exact phrase or area tied to one decision. If a section needs multiple changes, split feedback into separate comments so each item can be resolved independently.',
  },
  {
    question: 'Can external reviewers highlight a PDF without signing up?',
    answer:
      'Yes, if your review link supports guest access. That lets clients and stakeholders add feedback in one shared place without creating accounts or emailing screenshots.',
  },
  {
    question: 'How should highlights be handled across PDF versions?',
    answer:
      'Keep highlights attached to the revision where they were created, then resolve or carry them forward intentionally when uploading a new version. Version-aware review prevents old feedback from being lost or misapplied.',
  },
] as const;

export default function HowToHighlightAPdfGuidePage() {
  useSession();

  const relatedArticles = getPlatformArticles('/platform/highlight-pdf').filter(
    (article) => article.full_slug !== CANONICAL_PATH,
  );

  const tocLinks = TOC_SECTIONS.map((label) => ({
    label,
    url: `#${getHeadingId(label)}`,
  }));

  return (
    <>
      <FAQStructuredData faqs={[...HIGHLIGHT_PDF_FAQS]} />
      <GuidePageLayout
        documentTitle={DOCUMENT_TITLE}
        metaDescription={META_DESCRIPTION}
        canonicalPath={CANONICAL_PATH}
        ogImageUrl={GUIDE_OG_IMAGE_URL}
        ogImageAlt="Kreatli Guide: How to highlight a PDF"
        publishDate={PUBLISH_DATE}
        readTimeMinutes={READ_TIME}
        breadcrumbLabel={DOCUMENT_TITLE}
        tocLinks={tocLinks}
      >
        <Section blok={HIGHLIGHT_PDF_HERO_BLOK} />

        <GuideSectionRule />

        <div className={wysiwygStyles.wysiwyg}>
          <p>
            <strong>How to highlight a PDF</strong> effectively is less about color and more about clarity. A highlight
            should mark the exact text or visual area that needs attention, then pair with a note that explains what to
            change. That combination keeps review cycles fast and avoids vague “please revise this” threads.
          </p>

          <KeyTakeaways
            items={[
              'Highlight specific text or regions rather than entire pages to keep feedback focused.',
              'Pair each highlight with a comment explaining what needs to change.',
              "Use different colors or labels to separate categories like 'factual error' vs 'style suggestion.'",
              'Review highlights across versions to confirm flagged sections were addressed.',
            ]}
          />

          <h2 id={getHeadingId(TOC_SECTIONS[0])}>{TOC_SECTIONS[0]}</h2>
          <p>
            In review workflows, highlighting means selecting precise content so everyone can see the same issue
            immediately. It is most useful when teams need quick, location-specific feedback without rewriting whole
            sections in comments.
          </p>
          <ul>
            <li>
              <p>
                <strong>Exact scope:</strong> highlight the phrase, sentence, or block tied to one decision.
              </p>
            </li>
            <li>
              <p>
                <strong>Shared context:</strong> reviewers and editors reference the same visible mark.
              </p>
            </li>
            <li>
              <p>
                <strong>Faster triage:</strong> teams can resolve issues page by page instead of parsing long threads.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[1])}>{TOC_SECTIONS[1]}</h2>
          <p>
            Long comments are useful for rationale, but highlights are better for pointing. If your note starts with “in
            this line” or “this block,” a highlight removes guesswork instantly.
          </p>
          <ul>
            <li>
              <p>
                <strong>Copy review:</strong> mark language that needs clarity, tone, or legal edits.
              </p>
            </li>
            <li>
              <p>
                <strong>Design QA:</strong> flag headings, labels, and spacing-related text regions.
              </p>
            </li>
            <li>
              <p>
                <strong>Approval rounds:</strong> separate high-priority fixes from optional suggestions.
              </p>
            </li>
          </ul>
          <p>
            For the feature overview, see <NextLink href="/platform/highlight-pdf">Highlight PDF</NextLink>.
          </p>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[2])}>{TOC_SECTIONS[2]}</h2>
          <ol>
            <li>
              <p>
                <strong>Open the PDF in a review tool</strong> that supports highlights plus comments.
              </p>
            </li>
            <li>
              <p>
                <strong>Select the exact content</strong> you want to address and apply a highlight.
              </p>
            </li>
            <li>
              <p>
                <strong>Add one actionable note</strong> describing what should change and why.
              </p>
            </li>
            <li>
              <p>
                <strong>Share a single review link</strong> so everyone comments in one place.
              </p>
            </li>
            <li>
              <p>
                <strong>Resolve highlights as edits land</strong>, then upload the next version if needed.
              </p>
            </li>
          </ol>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[3])}>{TOC_SECTIONS[3]}</h2>
          <ul>
            <li>
              <p>
                <strong>One issue per highlight:</strong> split mixed feedback into separate markers.
              </p>
            </li>
            <li>
              <p>
                <strong>Keep notes outcome-focused:</strong> say what “fixed” looks like.
              </p>
            </li>
            <li>
              <p>
                <strong>Avoid full-paragraph highlights:</strong> broad marks slow reviewers down.
              </p>
            </li>
            <li>
              <p>
                <strong>Resolve deliberately:</strong> mark done only after the updated PDF reflects the change.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[4])}>{TOC_SECTIONS[4]}</h2>
          <p>
            The interactive preview below mirrors a simple PDF highlight flow with location-pinned feedback. When you
            are ready, <NextLink href="/sign-up">start a 7-day trial</NextLink> or{' '}
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
          sectionIntro="Below are free tools that pair with PDF highlighting, plus related guides and platform features to explore next."
          toolsTitle="Free tools for PDF highlighting and review"
          toolsDescription="Try tools that complement highlight workflows, comments, and approvals."
          tools={getFreeToolsForPlatform('/platform/highlight-pdf')}
          articlesTitle="More guides and examples"
          articlesDescription="Read more about PDF review, annotations, and version-aware approvals."
          articles={relatedArticles}
          articlesMax={3}
          resourcesTitle="More resources"
          resourcesDescription="Capabilities that support PDF markup, review workflows, and secure asset handling."
          resources={getRelatedResources(['annotatePdf', 'addCommentsToPdf', 'secureAssetStorage']).map(
            (resource, index) => {
              if (index === 0) return { ...resource, icon: 'filePdf' };
              if (index === 1) return { ...resource, icon: 'chat' };
              return resource;
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
              {HIGHLIGHT_PDF_FAQS.map((faq) => (
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
                PDF highlighting workflow that fits your team.
              </p>
            </div>
          </div>
        </section>

        <CTASection
          layout="split"
          splitTone="guide"
          title="Ready to make PDF feedback easier to resolve?"
          description="Highlight exact areas, keep comments attached to context, and move approvals forward without scattered threads."
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
