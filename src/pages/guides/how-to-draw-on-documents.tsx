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

const DOCUMENT_TITLE = 'How to Draw on Documents: Visual Markup That Removes Guesswork';
const META_DESCRIPTION =
  'Learn how to draw on documents with arrows, shapes, and freehand notes so reviewers can communicate exact changes and move approvals faster.';
const PUBLISH_DATE = '2026-04-10 10:20';
const READ_TIME = '10';
const CANONICAL_PATH = '/guides/how-to-draw-on-documents';
const GUIDE_COVER_SRC = '/images/guides/how-to-draw-on-documents-cover.png';
const GUIDE_OG_IMAGE_URL = GUIDE_COVER_SRC;

const DRAW_ON_DOCUMENTS_HERO_BLOK: SectionStoryblok = {
  _uid: 'static-how-to-draw-on-documents-hero',
  component: 'section',
  title: 'How to Draw on Documents',
  titleTag: 'h1',
  text: 'A practical guide to document markup with freehand drawing, arrows, and shapes. Show exactly what needs to change and keep feedback easy to execute.',
  orientation: '',
  displaySocials: false,
  imageObjectFit: 'contain',
  image: {
    _uid: 'static-how-to-draw-on-documents-cover',
    id: null,
    alt: 'Kreatli Guide: How to draw on documents',
    name: '',
    focus: '',
    source: '',
    title: 'How to draw on documents',
    filename: GUIDE_COVER_SRC,
    copyright: '',
    fieldtype: 'asset',
  },
};

const TOC_SECTIONS = [
  'What “drawing on documents” means',
  'When visual markup is better than text-only feedback',
  'How to draw on documents (step-by-step)',
  'Best practices for document markup',
  'Try drawing on documents now',
  'Free tools, guides, and platform features',
  'FAQ: Draw on documents',
] as const;

const DRAW_ON_DOCUMENTS_FAQS = [
  {
    question: 'What does it mean to draw on a document?',
    answer:
      'Drawing on a document means adding visual markup directly on the page, such as arrows, circles, boxes, or freehand notes. It helps reviewers show exactly where a change is needed.',
  },
  {
    question: 'When should I draw instead of only commenting?',
    answer:
      'Use drawing when location or direction matters, for example alignment issues, spacing fixes, and layout adjustments. Pair it with a short comment so the editor understands both where and why.',
  },
  {
    question: 'Can I combine drawing and text comments?',
    answer:
      'Yes, and that is usually best. Markup points to the area, while text clarifies the requested outcome or rule to follow.',
  },
  {
    question: 'How do I keep drawn feedback readable for teams?',
    answer:
      'Use consistent colors and simple shapes, keep one issue per annotation, and avoid cluttering a page with overlapping marks. Clear markup is easier to resolve and audit.',
  },
  {
    question: 'How should markup be managed across document versions?',
    answer:
      'Keep annotations tied to the version they were created on. Resolve completed items before uploading the next revision so open issues remain obvious.',
  },
] as const;

export default function HowToDrawOnDocumentsGuidePage() {
  useSession();

  const relatedArticles = getPlatformArticles('/platform/draw-on-documents').filter(
    (article) => article.full_slug !== CANONICAL_PATH,
  );

  const tocLinks = TOC_SECTIONS.map((label) => ({
    label,
    url: `#${getHeadingId(label)}`,
  }));

  return (
    <>
      <FAQStructuredData faqs={[...DRAW_ON_DOCUMENTS_FAQS]} />
      <GuidePageLayout
        documentTitle={DOCUMENT_TITLE}
        metaDescription={META_DESCRIPTION}
        canonicalPath={CANONICAL_PATH}
        ogImageUrl={GUIDE_OG_IMAGE_URL}
        ogImageAlt="Kreatli Guide: How to draw on documents"
        publishDate={PUBLISH_DATE}
        readTimeMinutes={READ_TIME}
        breadcrumbLabel={DOCUMENT_TITLE}
        tocLinks={tocLinks}
      >
        <Section blok={DRAW_ON_DOCUMENTS_HERO_BLOK} />

        <GuideSectionRule />

        <div className={wysiwygStyles.wysiwyg}>
          <p>
            <strong>How to draw on documents</strong> is a core review skill when words alone are not enough. Drawing
            tools let you show exact boundaries, motion, or hierarchy changes directly on the page so collaborators can
            implement feedback without interpretation gaps.
          </p>

          <h2 id={getHeadingId(TOC_SECTIONS[0])}>{TOC_SECTIONS[0]}</h2>
          <p>
            Drawing on documents includes arrows, boxes, highlights, and freehand marks layered on the file during
            review. It is especially useful for layout and visual edits where precise placement matters.
          </p>
          <ul>
            <li>
              <p>
                <strong>Arrows:</strong> indicate movement or directional changes.
              </p>
            </li>
            <li>
              <p>
                <strong>Shapes:</strong> isolate areas to update, remove, or align.
              </p>
            </li>
            <li>
              <p>
                <strong>Freehand notes:</strong> quickly mark nuanced visual issues.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[1])}>{TOC_SECTIONS[1]}</h2>
          <p>
            Text-only comments often fail when reviewers mean “this exact corner” or “align this edge with that one.”
            Visual markup removes ambiguity and shortens revision cycles.
          </p>
          <ul>
            <li>
              <p>
                <strong>Layout QA:</strong> mark spacing, alignment, and hierarchy issues directly.
              </p>
            </li>
            <li>
              <p>
                <strong>Editorial review:</strong> pair highlights with directional notes on structure.
              </p>
            </li>
            <li>
              <p>
                <strong>Client approvals:</strong> ensure external stakeholders point to exact change locations.
              </p>
            </li>
          </ul>
          <p>
            For a feature overview, see <NextLink href="/platform/draw-on-documents">Draw on Documents</NextLink>.
          </p>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[2])}>{TOC_SECTIONS[2]}</h2>
          <ol>
            <li>
              <p>
                <strong>Upload the document</strong> into a review tool with markup controls.
              </p>
            </li>
            <li>
              <p>
                <strong>Select the right drawing tool</strong> (arrow, box, highlight, or freehand) for the issue.
              </p>
            </li>
            <li>
              <p>
                <strong>Mark one issue at a time</strong> so comments can be resolved clearly.
              </p>
            </li>
            <li>
              <p>
                <strong>Add a short supporting comment</strong> that defines the expected outcome.
              </p>
            </li>
            <li>
              <p>
                <strong>Share one review link</strong> and track open vs resolved markup.
              </p>
            </li>
          </ol>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[3])}>{TOC_SECTIONS[3]}</h2>
          <ul>
            <li>
              <p>
                <strong>Keep marks legible:</strong> avoid stacking annotations in the same area.
              </p>
            </li>
            <li>
              <p>
                <strong>Use consistent visual language:</strong> same shape/color for the same type of issue.
              </p>
            </li>
            <li>
              <p>
                <strong>Pair every drawing with intent:</strong> “move,” “remove,” or “match style guide.”
              </p>
            </li>
            <li>
              <p>
                <strong>Close resolved markup promptly:</strong> keep only active issues visible.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[4])}>{TOC_SECTIONS[4]}</h2>
          <p>
            The interactive preview below mirrors a document markup workflow. When you are ready,{' '}
            <NextLink href="/sign-up">start a 7-day trial</NextLink> or{' '}
            <a href="https://calendar.app.google/NXbAeTAUwaBGh5x49" target="_blank" rel="noopener noreferrer">
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
          sectionIntro="Below are free tools that pair with document markup, plus related guides and platform features to explore next."
          toolsTitle="Free tools for drawing and marking up documents"
          toolsDescription="Try tools that complement visual markup, comments, and review workflows."
          tools={getFreeToolsForPlatform('/platform/draw-on-documents')}
          articlesTitle="More guides and examples"
          articlesDescription="Read more about document annotation, visual feedback, and approvals."
          articles={relatedArticles}
          articlesMax={3}
          resourcesTitle="More resources"
          resourcesDescription="Capabilities that support document markup, review clarity, and secure collaboration."
          resources={getRelatedResources(['drawOnPdfDocument', 'annotatePdf', 'secureAssetStorage']).map(
            (resource, index) => {
              if (index === 0) return { ...resource, icon: 'paint' };
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
              {DRAW_ON_DOCUMENTS_FAQS.map((faq) => (
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
                document markup flow for your team.
              </p>
            </div>
          </div>
        </section>

        <CTASection
          layout="split"
          splitTone="guide"
          title="Ready to show feedback visually?"
          description="Draw directly on documents, attach context-rich comments, and keep every revision step easy to track."
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
