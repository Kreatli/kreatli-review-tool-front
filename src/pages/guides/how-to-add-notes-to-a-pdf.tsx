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

const DOCUMENT_TITLE = 'How to Add Notes to a PDF: Quick, Contextual Feedback for Teams';
const META_DESCRIPTION =
  'Learn how to add notes to a PDF with page-pinned context and concise language so teams resolve feedback efficiently across versions.';
const PUBLISH_DATE = '2026-04-10 12:10';
const READ_TIME = '9';
const CANONICAL_PATH = '/guides/how-to-add-notes-to-a-pdf';
const GUIDE_COVER_SRC = '/images/guides/how-to-add-notes-to-a-pdf-cover.png';
const GUIDE_OG_IMAGE_URL = GUIDE_COVER_SRC;

const NOTES_PDF_HERO_BLOK: SectionStoryblok = {
  _uid: 'static-how-to-add-notes-to-a-pdf-hero',
  component: 'section',
  title: 'How to Add Notes to a PDF',
  titleTag: 'h1',
  text:
    'A practical guide to PDF notes: keep each thought anchored to the right page and spot, write for fast execution, ' +
    'and keep rounds easy to close.',
  orientation: '',
  displaySocials: false,
  imageObjectFit: 'contain',
  image: {
    _uid: 'static-how-to-add-notes-to-a-pdf-cover',
    id: null,
    alt: 'Kreatli Guide: How to add notes to a PDF',
    name: '',
    focus: '',
    source: '',
    title: 'How to add notes to a PDF',
    filename: GUIDE_COVER_SRC,
    copyright: '',
    fieldtype: 'asset',
  },
};

const TOC_SECTIONS = [
  'What “notes on a PDF” means for teams',
  'When quick notes beat long comment threads',
  'How to add notes to a PDF (step-by-step)',
  'Best practices for useful PDF notes',
  'Try adding notes to a PDF now',
  'Free tools, guides, and platform features',
  'FAQ: Add notes to a PDF',
] as const;

const NOTES_PDF_FAQS = [
  {
    question: 'Are PDF notes the same as comments?',
    answer:
      'They overlap. “Notes” usually implies short, anchored context—like a sticky thought on a specific spot or ' +
      'page—while “comments” can include longer discussion threads. Good tools support both without losing location.',
  },
  {
    question: 'How short should a PDF note be?',
    answer:
      'Aim for one decision per note. If you need bullet points, keep them tied to the same change. When a note mixes ' +
      'unrelated fixes, split it so each item can be resolved on its own.',
  },
  {
    question: 'How do I anchor a note to the right place?',
    answer:
      'Click the exact region or text you mean, then write the note. If the tool supports pins, place the pin on the ' +
      'element under discussion so nobody scrolls the wrong page hunting for context.',
  },
  {
    question: 'Can reviewers add notes without an account?',
    answer:
      'Yes on guest-friendly review links. Clients can drop notes in the same workspace as your internal team, which ' +
      'keeps feedback centralized instead of scattered across email.',
  },
  {
    question: 'What happens to notes when a new PDF version uploads?',
    answer:
      'Version-aware review keeps notes attached to the revision they were written on. Resolve addressed notes, then ' +
      'upload the next file so open work stays obvious.',
  },
] as const;

export default function HowToAddNotesToAPdfGuidePage() {
  useSession();

  const relatedArticles = getPlatformArticles('/platform/review-pdf').filter(
    (article) => article.full_slug !== CANONICAL_PATH,
  );

  const tocLinks = TOC_SECTIONS.map((label) => ({
    label,
    url: `#${getHeadingId(label)}`,
  }));

  return (
    <>
      <FAQStructuredData faqs={[...NOTES_PDF_FAQS]} />
      <GuidePageLayout
        documentTitle={DOCUMENT_TITLE}
        metaDescription={META_DESCRIPTION}
        canonicalPath={CANONICAL_PATH}
        ogImageUrl={GUIDE_OG_IMAGE_URL}
        ogImageAlt="Kreatli Guide: How to add notes to a PDF"
        publishDate={PUBLISH_DATE}
        readTimeMinutes={READ_TIME}
        breadcrumbLabel={DOCUMENT_TITLE}
        tocLinks={tocLinks}
      >
        <Section blok={NOTES_PDF_HERO_BLOK} />

        <GuideSectionRule />

        <div className={wysiwygStyles.wysiwyg}>
          <p>
            <strong>How to add notes to a PDF</strong> is about speed and precision. A good note behaves like a
            high-signal sticky: it sits exactly where the issue lives, says what should change in plain language, and
            can be checked off when the PDF is updated—without a separate email novel.
          </p>

          <h2 id={getHeadingId(TOC_SECTIONS[0])}>{TOC_SECTIONS[0]}</h2>
          <p>
            Notes are the lightweight layer teams use during proofing rounds: questions, change requests, and approvals
            that belong on the document itself. The best workflows pin each note to a page and often to a specific
            location so context never drifts.
          </p>
          <ul>
            <li>
              <p>
                <strong>Page truth:</strong> the PDF export is what everyone reviews together.
              </p>
            </li>
            <li>
              <p>
                <strong>Anchored context:</strong> notes reference the same pixels for every stakeholder.
              </p>
            </li>
            <li>
              <p>
                <strong>Resolvable units:</strong> one note, one outcome when possible.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[1])}>{TOC_SECTIONS[1]}</h2>
          <p>
            Long threads are useful for debate, but they slow triage when the real question is “fix this line.” Short
            notes keep editors moving—especially on deadline-driven decks, packaging proofs, and contract redlines.
          </p>
          <ul>
            <li>
              <p>
                <strong>Fast passes:</strong> typos, swaps, and single-line corrections.
              </p>
            </li>
            <li>
              <p>
                <strong>Async review:</strong> stakeholders drop notes on their own time in one file.
              </p>
            </li>
            <li>
              <p>
                <strong>Handoff clarity:</strong> production knows what is blocking approval.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[2])}>{TOC_SECTIONS[2]}</h2>
          <ol>
            <li>
              <p>
                <strong>Open the PDF</strong> in a browser review workspace that supports pinned notes.
              </p>
            </li>
            <li>
              <p>
                <strong>Go to the page</strong> and click where the note belongs.
              </p>
            </li>
            <li>
              <p>
                <strong>Write the note</strong> as a single action: what to change and why it matters.
              </p>
            </li>
            <li>
              <p>
                <strong>@mention or assign</strong> when your tool supports ownership so nothing sits unowned.
              </p>
            </li>
            <li>
              <p>
                <strong>Share one link</strong> so internal and external reviewers use the same note stack.
              </p>
            </li>
          </ol>
          <p>
            For how online review fits together, see <NextLink href="/platform/review-pdf">Review PDF</NextLink>.
          </p>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[3])}>{TOC_SECTIONS[3]}</h2>
          <ul>
            <li>
              <p>
                <strong>Lead with the fix:</strong> “Replace headline with approved copy v3.”
              </p>
            </li>
            <li>
              <p>
                <strong>Add a success check:</strong> how reviewers know the note is satisfied.
              </p>
            </li>
            <li>
              <p>
                <strong>Avoid vague tone:</strong> swap “feels off” for measurable guidance.
              </p>
            </li>
            <li>
              <p>
                <strong>Resolve on evidence:</strong> close notes only after the PDF shows the change.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[4])}>{TOC_SECTIONS[4]}</h2>
          <p>
            The interactive preview below shows page-pinned feedback on a sample PDF. When you are ready,{' '}
            <NextLink href="/sign-up">start a 7-day trial</NextLink> or{' '}
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
          sectionIntro="Below are free tools that pair with PDF notes and review, plus related guides and platform features to explore next."
          toolsTitle="Free tools for PDF notes and review"
          toolsDescription="Try tools that complement pinned notes, markup, and approvals."
          tools={getFreeToolsForPlatform('/platform/review-pdf')}
          articlesTitle="More guides and examples"
          articlesDescription="Read more about proofing, comments, and version-aware PDF workflows."
          articles={relatedArticles}
          articlesMax={3}
          resourcesTitle="More resources"
          resourcesDescription="Capabilities that support PDF review, threaded feedback, and secure storage."
          resources={getRelatedResources(['addCommentsToPdf', 'annotatePdf', 'secureAssetStorage']).map(
            (resource, index) => {
              if (index === 0) return { ...resource, icon: 'chat' };
              if (index === 1) return { ...resource, icon: 'filePdf' };
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
              {NOTES_PDF_FAQS.map((faq) => (
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
                PDF note workflow for your team.
              </p>
            </div>
          </div>
        </section>

        <CTASection
          layout="split"
          splitTone="guide"
          title="Ready to keep PDF notes where they belong?"
          description="Pin short, actionable notes to the page, resolve them as edits land, and keep every round auditable."
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
