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

const DOCUMENT_TITLE =
  'How to Proofread a PDF: Catch Errors, Resolve Comments, and Ship Clean Finals';
const META_DESCRIPTION =
  'Learn how to proofread a PDF with a repeatable pass order, page-pinned notes, and version-aware review so finals are ' +
  'accurate and approvals stay auditable.';
const PUBLISH_DATE = '2026-04-10 11:20';
const READ_TIME = '9';
const CANONICAL_PATH = '/guides/how-to-proofread-a-pdf';
const GUIDE_COVER_SRC = '/images/guides/how-to-proofread-a-pdf-cover.png';
const GUIDE_OG_IMAGE_URL = GUIDE_COVER_SRC;

const PROOFREAD_PDF_HERO_BLOK: SectionStoryblok = {
  _uid: 'static-how-to-proofread-a-pdf-hero',
  component: 'section',
  title: 'How to Proofread a PDF',
  titleTag: 'h1',
  text:
    'A practical guide to PDF proofing: work page by page, separate copy from layout issues, and close the loop with ' +
    'clear resolutions before you call it final.',
  orientation: '',
  displaySocials: false,
  imageObjectFit: 'contain',
  image: {
    _uid: 'static-how-to-proofread-a-pdf-cover',
    id: null,
    alt: 'Kreatli Guide: How to proofread a PDF',
    name: '',
    focus: '',
    source: '',
    title: 'How to proofread a PDF',
    filename: GUIDE_COVER_SRC,
    copyright: '',
    fieldtype: 'asset',
  },
};

const TOC_SECTIONS = [
  'What PDF proofreading means in a review workflow',
  'When to proofread vs when to redesign',
  'How to proofread a PDF (step-by-step)',
  'Best practices for clean proofing rounds',
  'Try proofreading a PDF now',
  'Free tools, guides, and platform features',
  'FAQ: Proofread a PDF',
] as const;

const PROOFREAD_PDF_FAQS = [
  {
    question: 'What is the difference between proofreading and editing a PDF?',
    answer:
      'Proofreading focuses on correctness—typos, grammar, punctuation, facts, and consistency—usually on a layout-locked ' +
      'export. Editing can restructure content or change messaging before the PDF is frozen for proof.',
  },
  {
    question: 'What order should I proof a multi-page PDF?',
    answer:
      'Run a fast structural pass (page order, blanks, missing pages), then copy proof, then visual QA (fonts, spacing, ' +
      'images, links). Finish with a fresh pass in a different zoom or print preview if stakes are high.',
  },
  {
    question: 'How do I leave proofing notes without breaking the layout?',
    answer:
      'Use page-pinned comments or highlights tied to exact text blocks instead of rewriting in the PDF when the source ' +
      'lives elsewhere. That keeps the proof file authoritative while edits happen in the right tool.',
  },
  {
    question: 'How should we handle client proofing?',
    answer:
      'Share one review link, ask for one consolidated round when possible, and require each note to be actionable. ' +
      'Resolve items as they are fixed so the team sees only open issues.',
  },
  {
    question: 'What if we find errors after “final” approval?',
    answer:
      'Upload a new version, reference what changed in a short changelog, and re-open only the affected comments. ' +
      'Version-aware review keeps the audit trail honest.',
  },
] as const;

export default function HowToProofreadAPdfGuidePage() {
  useSession();

  const relatedArticles = getPlatformArticles('/platform/proof-pdf').filter(
    (article) => article.full_slug !== CANONICAL_PATH,
  );

  const tocLinks = TOC_SECTIONS.map((label) => ({
    label,
    url: `#${getHeadingId(label)}`,
  }));

  return (
    <>
      <FAQStructuredData faqs={[...PROOFREAD_PDF_FAQS]} />
      <GuidePageLayout
        documentTitle={DOCUMENT_TITLE}
        metaDescription={META_DESCRIPTION}
        canonicalPath={CANONICAL_PATH}
        ogImageUrl={GUIDE_OG_IMAGE_URL}
        ogImageAlt="Kreatli Guide: How to proofread a PDF"
        publishDate={PUBLISH_DATE}
        readTimeMinutes={READ_TIME}
        breadcrumbLabel={DOCUMENT_TITLE}
        tocLinks={tocLinks}
      >
        <Section blok={PROOFREAD_PDF_HERO_BLOK} />

        <GuideSectionRule />

        <div className={wysiwygStyles.wysiwyg}>
          <p>
            <strong>How to proofread a PDF</strong> is about disciplined passes on a fixed layout. You are validating
            language, facts, and presentation details while keeping feedback traceable—so the next export is genuinely
            final, not “final-ish.”
          </p>

          <h2 id={getHeadingId(TOC_SECTIONS[0])}>{TOC_SECTIONS[0]}</h2>
          <p>
            In creative workflows, proofreading happens on an exported PDF that represents what will ship. Comments
            should anchor to pages and phrases so authors know exactly what to fix without guesswork.
          </p>
          <ul>
            <li>
              <p>
                <strong>Copy accuracy:</strong> spelling, grammar, legal copy, and numbers.
              </p>
            </li>
            <li>
              <p>
                <strong>Visual fidelity:</strong> fonts, orphans, image resolution, and color intent.
              </p>
            </li>
            <li>
              <p>
                <strong>Sign-off clarity:</strong> who approved which version and when.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[1])}>{TOC_SECTIONS[1]}</h2>
          <p>
            Proofreading assumes the structure is mostly set. If the brief changed or whole sections need rewrites, loop
            back to the source document first—then return to PDF proof for the locked layout.
          </p>
          <ul>
            <li>
              <p>
                <strong>Proof:</strong> fix errors inside the agreed design.
              </p>
            </li>
            <li>
              <p>
                <strong>Redesign:</strong> change layout, hierarchy, or imagery substantively.
              </p>
            </li>
            <li>
              <p>
                <strong>Hybrid:</strong> mark “content change” vs “layout bug” so owners know where to edit.
              </p>
            </li>
          </ul>
          <p>
            For the platform overview, see <NextLink href="/platform/proof-pdf">Proof PDF</NextLink>.
          </p>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[2])}>{TOC_SECTIONS[2]}</h2>
          <ol>
            <li>
              <p>
                <strong>Open the PDF in a review tool</strong> that supports page-pinned comments.
              </p>
            </li>
            <li>
              <p>
                <strong>Run a structure check</strong> for page order, blanks, and obvious layout breaks.
              </p>
            </li>
            <li>
              <p>
                <strong>Proof copy line by line</strong> on each page, one issue per comment when possible.
              </p>
            </li>
            <li>
              <p>
                <strong>Log visual defects</strong> (cropping, color, low-res assets) with clear reproduction notes.
              </p>
            </li>
            <li>
              <p>
                <strong>Resolve comments</strong> as fixes land, then export the next proof version if needed.
              </p>
            </li>
          </ol>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[3])}>{TOC_SECTIONS[3]}</h2>
          <ul>
            <li>
              <p>
                <strong>Use a checklist:</strong> brand terms, legal disclaimers, dates, and pricing tables.
              </p>
            </li>
            <li>
              <p>
                <strong>Separate voices:</strong> assign copy vs design owners before the round starts.
              </p>
            </li>
            <li>
              <p>
                <strong>Avoid vague notes:</strong> “fix tone” needs an example or reference line.
              </p>
            </li>
            <li>
              <p>
                <strong>Time-box rounds:</strong> close proofing after agreed cycles to prevent endless tweaks.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[4])}>{TOC_SECTIONS[4]}</h2>
          <p>
            The interactive preview below mirrors leaving pinned feedback on a PDF during proofing. When you are ready,{' '}
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
          sectionIntro={
            'Below are free tools that pair with PDF proofing, plus related guides and platform features to explore next.'
          }
          toolsTitle="Free tools for PDF proofing"
          toolsDescription="Try tools that complement PDF review, annotation, and markup."
          tools={getFreeToolsForPlatform('/platform/proof-pdf')}
          articlesTitle="More guides and examples"
          articlesDescription="Read more about proofing, annotations, and version-aware approvals."
          articles={relatedArticles}
          articlesMax={3}
          resourcesTitle="More resources"
          resourcesDescription="Capabilities that support PDF review, comments, and secure storage."
          resources={getRelatedResources(['addCommentsToPdf', 'annotatePdf', 'drawOnPdfDocument']).map(
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
              {PROOFREAD_PDF_FAQS.map((faq) => (
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
                PDF proofing workflow that fits your team.
              </p>
            </div>
          </div>
        </section>

        <CTASection
          layout="split"
          splitTone="guide"
          title="Ready to proof PDFs without losing corrections?"
          description={
            'Keep page-pinned notes, resolve what is fixed, and ship finals with a clear approval trail.'
          }
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
