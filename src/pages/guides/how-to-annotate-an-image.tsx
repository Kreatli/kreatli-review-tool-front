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

const DOCUMENT_TITLE = 'How to Annotate an Image: Pinned Comments, Markup, and Clear Revisions';
const META_DESCRIPTION =
  'Learn how to annotate an image with pinned comments and visual markup so feedback is unambiguous, revisions move faster, and approvals stay organized.';
const PUBLISH_DATE = '2026-04-11 01:10';
const READ_TIME = '8';
const CANONICAL_PATH = '/guides/how-to-annotate-an-image';
/**
 * Horizontal cover for social / OG / hero. Use ~1800–2400px wide for a sharp hero on retina.
 */
const GUIDE_COVER_SRC = '/images/guides/how-to-annotate-an-image-cover.png';
const GUIDE_OG_IMAGE_URL = GUIDE_COVER_SRC;

const HOW_TO_ANNOTATE_AN_IMAGE_HERO_BLOK: SectionStoryblok = {
  _uid: 'static-how-to-annotate-an-image-hero',
  component: 'section',
  title: 'How to Annotate an Image',
  titleTag: 'h1',
  text: 'A practical guide for image review: pin comments to exact locations, add markup for clarity, and keep revisions and approvals organized without messy email threads.',
  orientation: '',
  displaySocials: false,
  imageObjectFit: 'contain',
  image: {
    _uid: 'static-how-to-annotate-an-image-cover',
    id: null,
    alt: 'Kreatli Guide: How to annotate an image',
    name: '',
    focus: '',
    source: '',
    title: 'How to annotate an image',
    filename: GUIDE_COVER_SRC,
    copyright: '',
    fieldtype: 'asset',
  },
};

const TOC_SECTIONS = [
  'What “annotate an image” means',
  'Why annotated images beat vague feedback',
  'How to annotate an image (step-by-step)',
  'Best practices for image annotations',
  'Try annotating an image now',
  'Free tools, guides, and platform features',
  'FAQ: Annotate an image',
] as const;

const ANNOTATE_AN_IMAGE_FAQS = [
  {
    question: 'What is an image annotation?',
    answer:
      'An image annotation is feedback tied to a specific location on the image—often a pinned comment, highlight, arrow, or box. It removes ambiguity so editors and designers know exactly what area you mean.',
  },
  {
    question: 'Is drawing on an image the same as annotating it?',
    answer:
      'Drawing is one type of annotation. Annotating usually includes both visual markup (arrows, boxes, highlights) and written comments that explain intent. The best workflow uses both: markup shows where; comments explain what and why.',
  },
  {
    question: 'How do I make image feedback actionable?',
    answer:
      'Call out the exact location, the requested change, and the intent. For example: “On the headline area, increase contrast so it passes accessibility and reads on mobile.”',
  },
  {
    question: 'Can clients annotate an image without signing up?',
    answer:
      'Yes—if you share a guest-friendly review link, clients can open the image and leave pinned comments without creating an account. This reduces friction while keeping feedback centralized.',
  },
  {
    question: 'How do I handle new versions of an image during review?',
    answer:
      'Use version-aware review so annotations stay tied to the correct revision. Resolve comments as changes are made and upload the next version when ready—this prevents confusion between v1 notes and v3 output.',
  },
] as const;

export default function HowToAnnotateAnImageGuidePage() {
  useSession();

  const relatedArticles = getPlatformArticles('/platform/annotate-image').filter(
    (article) => article.full_slug !== '/guides/how-to-annotate-an-image',
  );

  const tocLinks = TOC_SECTIONS.map((label) => ({
    label,
    url: `#${getHeadingId(label)}`,
  }));

  return (
    <>
      <FAQStructuredData faqs={[...ANNOTATE_AN_IMAGE_FAQS]} />
      <GuidePageLayout
        documentTitle={DOCUMENT_TITLE}
        metaDescription={META_DESCRIPTION}
        canonicalPath={CANONICAL_PATH}
        ogImageUrl={GUIDE_OG_IMAGE_URL}
        ogImageAlt="Kreatli Guide: How to annotate an image"
        publishDate={PUBLISH_DATE}
        readTimeMinutes={READ_TIME}
        breadcrumbLabel={DOCUMENT_TITLE}
        tocLinks={tocLinks}
      >
        <Section blok={HOW_TO_ANNOTATE_AN_IMAGE_HERO_BLOK} />

        <GuideSectionRule />

        <div className={wysiwygStyles.wysiwyg}>
          <p>
            <strong>How to annotate an image</strong> is about leaving feedback that’s precise and easy to act on.
            Instead of “make this better,” you want <strong>location-pinned comments</strong> plus optional markup so
            “this area” is never vague and revisions don’t bounce between screenshots and email threads.
          </p>

          <h2 id={getHeadingId(TOC_SECTIONS[0])}>{TOC_SECTIONS[0]}</h2>
          <p>
            In an image review workflow, annotation means your note is anchored to a specific spot. Reviewers can jump
            from a comment to the exact location, and teams can track what’s resolved across rounds.
          </p>
          <ul>
            <li>
              <p>
                <strong>Spot pin:</strong> the annotation is tied to a location on the image.
              </p>
            </li>
            <li>
              <p>
                <strong>Clear intent:</strong> what to change, why it matters, and what success looks like.
              </p>
            </li>
            <li>
              <p>
                <strong>Version clarity:</strong> feedback stays tied to the correct revision.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[1])}>{TOC_SECTIONS[1]}</h2>
          <p>
            Vague notes slow teams down. Annotations reduce ambiguity—your collaborator sees the exact area you’re
            referencing and can make the change without guessing.
          </p>
          <ul>
            <li>
              <p>
                <strong>Design feedback:</strong> point to the exact spacing, alignment, or typography to change.
              </p>
            </li>
            <li>
              <p>
                <strong>Marketing review:</strong> clarify copy, logo placement, and brand consistency by location.
              </p>
            </li>
            <li>
              <p>
                <strong>Production checks:</strong> confirm crops, safe areas, and export details visually.
              </p>
            </li>
          </ul>
          <p>
            For the platform overview, see <NextLink href="/platform/annotate-image">Annotate Image</NextLink>.
          </p>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[2])}>{TOC_SECTIONS[2]}</h2>
          <ol>
            <li>
              <p>
                <strong>Open the image</strong> in a review tool that supports pinned comments (and optional markup).
              </p>
            </li>
            <li>
              <p>
                <strong>Click the exact area</strong> you want to address to anchor the comment.
              </p>
            </li>
            <li>
              <p>
                <strong>Write the annotation</strong> with action + intent (what to change and why).
              </p>
            </li>
            <li>
              <p>
                <strong>Add markup when helpful</strong> (arrow/box/highlight) to remove ambiguity.
              </p>
            </li>
            <li>
              <p>
                <strong>Share a review link</strong> so stakeholders annotate in one place.
              </p>
            </li>
            <li>
              <p>
                <strong>Resolve comments</strong> as edits are made, then upload the next version if needed.
              </p>
            </li>
          </ol>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[3])}>{TOC_SECTIONS[3]}</h2>
          <ul>
            <li>
              <p>
                <strong>One idea per comment:</strong> keep feedback separable so it’s easy to resolve.
              </p>
            </li>
            <li>
              <p>
                <strong>Be specific:</strong> name the object/area, not just “this.”
              </p>
            </li>
            <li>
              <p>
                <strong>Say what success looks like:</strong> “matches brand colors,” “reads on mobile,” or “passes
                contrast checks.”
              </p>
            </li>
            <li>
              <p>
                <strong>Use markup for spatial notes:</strong> arrows/boxes are perfect for “this edge” feedback.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[4])}>{TOC_SECTIONS[4]}</h2>
          <p>
            The interactive preview below mirrors a simple image annotation flow. When you’re ready,{' '}
            <NextLink href="/sign-up">start a 7-day trial</NextLink> or{' '}
            <a href="https://calendar.app.google/NXbAeTAUwaBGh5x49" target="_blank" rel="noopener noreferrer nofollow">
              book a demo
            </a>
            .
          </p>

          <div className="my-4 w-full">
            <InteractiveReviewToolPreview variant="image" />
          </div>
        </div>

        <GuideSectionRule />

        <GuideArticleToolsResourcesSection
          tocHeadingId={getHeadingId(TOC_SECTIONS[5])}
          tocHeadingLabel={TOC_SECTIONS[5]}
          sectionIntro="Below are free tools that pair with image annotation, plus related guides and platform features to explore next."
          toolsTitle="Free tools for image markup and review"
          toolsDescription="Try tools that complement pinned comments, markup, and approvals."
          tools={getFreeToolsForPlatform('/platform/annotate-image')}
          articlesTitle="More guides and examples"
          articlesDescription="Read more about review, approvals, and version-aware image workflows."
          articles={relatedArticles}
          articlesMax={3}
          resourcesTitle="More resources"
          resourcesDescription="Capabilities that support image review, markup, approvals, and secure storage."
          resources={getRelatedResources(['annotateImage', 'drawOnImage', 'secureAssetStorage']).map((resource, index) => {
            if (index === 0) return { ...resource, icon: 'panorama' };
            if (index === 1) return { ...resource, icon: 'paint' };
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
              {ANNOTATE_AN_IMAGE_FAQS.map((faq) => (
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
                Reach us at <a href="mailto:support@kreatli.com">support@kreatli.com</a> and we will help you set up an
                image annotation flow that fits your team.
              </p>
            </div>
          </div>
        </section>

        <CTASection
          layout="split"
          splitTone="guide"
          title="Ready to give precise image feedback?"
          description="Pin comments to exact locations, keep versions clear, and move approvals forward without losing context."
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

