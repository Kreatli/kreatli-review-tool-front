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

const DOCUMENT_TITLE = 'How to Annotate a Document: Comments, Markup, and Clear Approvals Without Email Threads';
const META_DESCRIPTION =
  'Learn how to annotate a document with pinned comments and visual markup so reviewers know exactly what to change, versions stay clear, and approvals move faster.';
const PUBLISH_DATE = '2026-04-11 01:00';
const READ_TIME = '10';
const CANONICAL_PATH = '/guides/how-to-annotate-a-document';
/**
 * Horizontal cover for social / OG / hero. Use ~1800–2400px wide for a sharp hero on retina.
 */
const GUIDE_COVER_SRC = '/images/guides/how-to-annotate-a-document-cover.png';
const GUIDE_OG_IMAGE_URL = GUIDE_COVER_SRC;

const HOW_TO_ANNOTATE_A_DOCUMENT_HERO_BLOK: SectionStoryblok = {
  _uid: 'static-how-to-annotate-a-document-hero',
  component: 'section',
  title: 'How to Annotate a Document',
  titleTag: 'h1',
  text: 'A practical guide for document review: pin comments to the right spot, add markup for clarity, and keep versions and approvals organized without messy email threads.',
  orientation: '',
  displaySocials: false,
  imageObjectFit: 'contain',
  image: {
    _uid: 'static-how-to-annotate-a-document-cover',
    id: null,
    alt: 'Kreatli Guide: How to annotate a document',
    name: '',
    focus: '',
    source: '',
    title: 'How to annotate a document',
    filename: GUIDE_COVER_SRC,
    copyright: '',
    fieldtype: 'asset',
  },
};

const TOC_SECTIONS = [
  'What “annotate a document” means',
  'Comments vs markup: what to use when',
  'How to annotate a document (step-by-step)',
  'Best practices for actionable document annotation',
  'Try annotating a document now',
  'Free tools, guides, and platform features',
  'FAQ: Annotate a document',
] as const;

const ANNOTATE_A_DOCUMENT_FAQS = [
  {
    question: 'What’s the difference between annotating a document and editing it?',
    answer:
      'Editing changes the source document. Annotating adds feedback on top—comments, highlights, and shapes—so you can review and approve changes without rewriting the file directly. This is especially helpful for stakeholder review and proofing rounds.',
  },
  {
    question: 'What should a good document annotation include?',
    answer:
      'Include the exact location, the requested change, and the intent. For example: “In this paragraph, replace ‘fast’ with ‘frame-accurate’ to match product language.” One idea per comment makes review easier to resolve.',
  },
  {
    question: 'Should I use comments, highlights, or drawing?',
    answer:
      'Use comments to explain intent and decisions, highlights to point at text, and drawing (arrows/boxes) when the issue is spatial (layout, alignment, margin, or a specific UI element in a PDF export). The best workflows support all three.',
  },
  {
    question: 'Can external reviewers annotate a document without an account?',
    answer:
      'Yes—if you share a guest-friendly review link, stakeholders can open the document and leave pinned comments without signing up. That keeps feedback centralized while reducing friction.',
  },
  {
    question: 'How do I avoid losing feedback across versions?',
    answer:
      'Use version-aware review. Keep annotations tied to the revision they were made on, and resolve them as changes are applied. That prevents “old feedback” from being mistaken for open work on the newest version.',
  },
] as const;

export default function HowToAnnotateADocumentGuidePage() {
  useSession();

  const relatedArticles = getPlatformArticles('/platform/annotate-document').filter(
    (article) => article.full_slug !== '/guides/how-to-annotate-a-document',
  );

  const tocLinks = TOC_SECTIONS.map((label) => ({
    label,
    url: `#${getHeadingId(label)}`,
  }));

  return (
    <>
      <FAQStructuredData faqs={[...ANNOTATE_A_DOCUMENT_FAQS]} />
      <GuidePageLayout
        documentTitle={DOCUMENT_TITLE}
        metaDescription={META_DESCRIPTION}
        canonicalPath={CANONICAL_PATH}
        ogImageUrl={GUIDE_OG_IMAGE_URL}
        ogImageAlt="Kreatli Guide: How to annotate a document"
        publishDate={PUBLISH_DATE}
        readTimeMinutes={READ_TIME}
        breadcrumbLabel={DOCUMENT_TITLE}
        tocLinks={tocLinks}
      >
        <Section blok={HOW_TO_ANNOTATE_A_DOCUMENT_HERO_BLOK} />

        <GuideSectionRule />

        <div className={wysiwygStyles.wysiwyg}>
          <p>
            <strong>How to annotate a document</strong> is about leaving feedback that stays attached to the right
            place.
            Instead of “see my notes below,” you want <strong>pinned comments</strong> and <strong>markup</strong>{' '}
            (highlights, arrows, boxes) so reviewers and editors can act quickly without guessing.
          </p>

          <h2 id={getHeadingId(TOC_SECTIONS[0])}>{TOC_SECTIONS[0]}</h2>
          <p>
            In a review workflow, document annotation means your feedback is anchored to a specific spot (text, page, or
            element). That anchor removes ambiguity and helps teams track what’s resolved vs what’s still open across
            rounds.
          </p>
          <ul>
            <li>
              <p>
                <strong>Location:</strong> the note is tied to the exact area it refers to.
              </p>
            </li>
            <li>
              <p>
                <strong>Intent:</strong> what to change and why it matters.
              </p>
            </li>
            <li>
              <p>
                <strong>Resolution:</strong> a simple “open vs resolved” status prevents repeat work.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[1])}>{TOC_SECTIONS[1]}</h2>
          <p>
            Use comments to explain, and markup to point. When both are available, you get fast comprehension and fewer
            back-and-forth messages.
          </p>
          <ul>
            <li>
              <p>
                <strong>Comments:</strong> decisions, questions, and copy changes (“change this sentence to…”).
              </p>
            </li>
            <li>
              <p>
                <strong>Highlights:</strong> call out specific text that needs attention.
              </p>
            </li>
            <li>
              <p>
                <strong>Shapes/drawing:</strong> layout issues, spacing, and “this element” feedback in PDF exports.
              </p>
            </li>
          </ul>
          <p>
            For the platform overview, see <NextLink href="/platform/annotate-document">Annotate Document</NextLink>.
          </p>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[2])}>{TOC_SECTIONS[2]}</h2>
          <ol>
            <li>
              <p>
                <strong>Open the document</strong> in a review tool that supports pinned comments and markup.
              </p>
            </li>
            <li>
              <p>
                <strong>Navigate to the exact page/section</strong> you want to review.
              </p>
            </li>
            <li>
              <p>
                <strong>Pin a comment</strong> directly on the relevant spot.
              </p>
            </li>
            <li>
              <p>
                <strong>Add markup when helpful</strong> (highlight, arrow, box) to remove ambiguity.
              </p>
            </li>
            <li>
              <p>
                <strong>Share a review link</strong> so feedback stays in one place.
              </p>
            </li>
            <li>
              <p>
                <strong>Resolve annotations</strong> as changes are completed, then upload the next revision.
              </p>
            </li>
          </ol>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[3])}>{TOC_SECTIONS[3]}</h2>
          <ul>
            <li>
              <p>
                <strong>One request per comment:</strong> split multi-part feedback into separate notes for clean
                resolution.
              </p>
            </li>
            <li>
              <p>
                <strong>Write for action:</strong> “Change X to Y” beats “This feels off.”
              </p>
            </li>
            <li>
              <p>
                <strong>Add the why:</strong> brand, compliance, clarity, or user impact.
              </p>
            </li>
            <li>
              <p>
                <strong>Confirm success:</strong> what “done” looks like (style guide, approved copy, layout rules).
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[4])}>{TOC_SECTIONS[4]}</h2>
          <p>
            The interactive preview below mirrors a basic document annotation flow. When you’re ready,{' '}
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
          sectionIntro="Below are free tools that pair with document review, plus related guides and platform features to explore next."
          toolsTitle="Free tools for document annotation"
          toolsDescription="Try tools that complement pinned comments, markup, and approvals."
          tools={getFreeToolsForPlatform('/platform/annotate-document')}
          articlesTitle="More guides and examples"
          articlesDescription="Read more about proofing, approvals, and version-aware review workflows."
          articles={relatedArticles}
          articlesMax={3}
          resourcesTitle="More resources"
          resourcesDescription="Capabilities that support document review, versioning, secure storage, and approvals."
          resources={getRelatedResources(['annotatePdf', 'drawOnPdfDocument', 'secureAssetStorage']).map(
            (resource, index) => {
              if (index === 0) return { ...resource, icon: 'filePdf' };
              if (index === 1) return { ...resource, icon: 'paint' };
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
              {ANNOTATE_A_DOCUMENT_FAQS.map((faq) => (
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
                document annotation flow that fits your team.
              </p>
            </div>
          </div>
        </section>

        <CTASection
          layout="split"
          splitTone="guide"
          title="Ready to keep document feedback organized?"
          description="Pin comments to exact spots, keep versions clear, and move approvals forward without losing context."
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

