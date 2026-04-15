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

const DOCUMENT_TITLE = 'How to Annotate a Photo: Retouching Notes That Editors Can Act On';
const META_DESCRIPTION =
  'Learn how to annotate photos for retouching — pin comments to exact areas on headshots, product shots, and real estate photos so editors know exactly what to fix.';
const PUBLISH_DATE = '2026-04-11 01:20';
const READ_TIME = '8';
const CANONICAL_PATH = '/guides/how-to-annotate-a-photo';
/**
 * Horizontal cover for social / OG / hero. Use ~1800–2400px wide for a sharp hero on retina.
 */
const GUIDE_COVER_SRC = '/images/guides/how-to-annotate-a-photo-cover.png';
const GUIDE_OG_IMAGE_URL = GUIDE_COVER_SRC;

const HOW_TO_ANNOTATE_A_PHOTO_HERO_BLOK: SectionStoryblok = {
  _uid: 'static-how-to-annotate-a-photo-hero',
  component: 'section',
  title: 'How to Annotate a Photo',
  titleTag: 'h1',
  text: 'A practical guide for photo review: pin comments to exact locations, add markup for clarity, and keep revisions and approvals organized without losing notes across emails and screenshots.',
  orientation: '',
  displaySocials: false,
  imageObjectFit: 'contain',
  image: {
    _uid: 'static-how-to-annotate-a-photo-cover',
    id: null,
    alt: 'Kreatli Guide: How to annotate a photo',
    name: '',
    focus: '',
    source: '',
    title: 'How to annotate a photo',
    filename: GUIDE_COVER_SRC,
    copyright: '',
    fieldtype: 'asset',
  },
};

const TOC_SECTIONS = [
  'What “annotate a photo” means',
  'Common photo-annotation use cases',
  'How to annotate a photo (step-by-step)',
  'Best practices for clear retouching notes',
  'Try annotating a photo now',
  'Free tools, guides, and platform features',
  'FAQ: Annotate a photo',
] as const;

const ANNOTATE_A_PHOTO_FAQS = [
  {
    question: 'What is a location-pinned photo annotation?',
    answer:
      'It’s feedback anchored to a specific spot on the photo. That pin removes ambiguity and helps photographers, retouchers, and marketers address changes quickly without guessing which area you meant.',
  },
  {
    question: 'What kinds of photo feedback work best as annotations?',
    answer:
      'Anything that’s spatial: edge cleanup, distraction removal, skin retouching areas, background adjustments, product-label fixes, alignment, and cropping. Markup shows “where,” comments explain “what and why.”',
  },
  {
    question: 'How do I keep photo review from turning into long email threads?',
    answer:
      'Use a single review link where everyone annotates the same version. Pinned comments make it easy to resolve notes one-by-one and keep an auditable record of approvals.',
  },
  {
    question: 'Can clients annotate a photo without creating an account?',
    answer:
      'Yes—if you share a guest-friendly review link, clients can open the photo and leave pinned comments without signing up. This keeps feedback centralized while reducing friction.',
  },
  {
    question: 'How should I handle new versions during photo review?',
    answer:
      'Use version-aware review. Keep annotations tied to the revision they were made on, resolve them as changes are applied, and upload the next version for confirmation.',
  },
] as const;

export default function HowToAnnotateAPhotoGuidePage() {
  useSession();

  const relatedArticles = getPlatformArticles('/platform/annotate-image').filter(
    (article) => article.full_slug !== '/guides/how-to-annotate-a-photo',
  );

  const tocLinks = TOC_SECTIONS.map((label) => ({
    label,
    url: `#${getHeadingId(label)}`,
  }));

  return (
    <>
      <FAQStructuredData faqs={[...ANNOTATE_A_PHOTO_FAQS]} />
      <GuidePageLayout
        documentTitle={DOCUMENT_TITLE}
        metaDescription={META_DESCRIPTION}
        canonicalPath={CANONICAL_PATH}
        ogImageUrl={GUIDE_OG_IMAGE_URL}
        ogImageAlt="Kreatli Guide: How to annotate a photo"
        publishDate={PUBLISH_DATE}
        readTimeMinutes={READ_TIME}
        breadcrumbLabel={DOCUMENT_TITLE}
        tocLinks={tocLinks}
      >
        <Section blok={HOW_TO_ANNOTATE_A_PHOTO_HERO_BLOK} />

        <GuideSectionRule />

        <div className={wysiwygStyles.wysiwyg}>
          <p>
            <strong>How to annotate a photo</strong> is about leaving feedback that points to the exact part of the
            image you mean. The best workflow is <strong>location-pinned comments</strong> (and optional markup) so
            “this corner” is never vague and revisions don’t bounce between email threads and screenshots.
          </p>

          <KeyTakeaways
            items={[
              'Anchor retouching notes to the exact area of the photo so direction is precise.',
              'Use highlights and shapes for spatial feedback; use text notes for tonal or color changes.',
              'Keep one annotation per issue \u2014 bundled notes are harder to track and resolve.',
              'Compare the annotated version against the original to confirm changes were applied.',
            ]}
          />

          <h2 id={getHeadingId(TOC_SECTIONS[0])}>{TOC_SECTIONS[0]}</h2>
          <p>
            In a photo review workflow, annotation means your note is anchored to a specific spot. Reviewers can jump
            from a comment to the exact location, and teams can track what’s resolved across rounds.
          </p>
          <ul>
            <li>
              <p>
                <strong>Spot pin:</strong> the annotation is tied to a location on the photo.
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
          <ul>
            <li>
              <p>
                <strong>Retouching:</strong> point to the exact edge, shadow, or blemish to adjust.
              </p>
            </li>
            <li>
              <p>
                <strong>Composition:</strong> call out crops, alignments, and spacing by location.
              </p>
            </li>
            <li>
              <p>
                <strong>Brand and design:</strong> clarify typography, logo placement, or color consistency.
              </p>
            </li>
            <li>
              <p>
                <strong>Approval:</strong> keep sign-off tied to the right version so “final” actually means final.
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
                <strong>Upload or open the photo</strong> in a review tool that supports pinned comments (and optional
                markup).
              </p>
            </li>
            <li>
              <p>
                <strong>Click the exact area</strong> you want to address to anchor the annotation.
              </p>
            </li>
            <li>
              <p>
                <strong>Write the note</strong> with action + intent (what to change and why).
              </p>
            </li>
            <li>
              <p>
                <strong>Add markup when helpful</strong> (arrow/box/highlight) for “this edge” feedback.
              </p>
            </li>
            <li>
              <p>
                <strong>Share a review link</strong> so stakeholders annotate in one place.
              </p>
            </li>
            <li>
              <p>
                <strong>Resolve annotations</strong> as edits are made, then upload the next version if needed.
              </p>
            </li>
          </ol>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[3])}>{TOC_SECTIONS[3]}</h2>
          <ul>
            <li>
              <p>
                <strong>One request per comment:</strong> split feedback so each note can be resolved independently.
              </p>
            </li>
            <li>
              <p>
                <strong>Use measurable language:</strong> “brighten shadows by ~10%” is clearer than “make it brighter.”
              </p>
            </li>
            <li>
              <p>
                <strong>Call out constraints:</strong> brand colors, product accuracy, legal requirements, or crop
                sizes.
              </p>
            </li>
            <li>
              <p>
                <strong>Prefer intent over taste:</strong> explain the goal (“cleaner silhouette,” “more premium feel”).
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[4])}>{TOC_SECTIONS[4]}</h2>
          <p>
            The interactive preview below mirrors a simple photo annotation flow. When you’re ready,{' '}
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
          sectionIntro="Below are free tools that pair with photo review, plus related guides and platform features to explore next."
          toolsTitle="Free tools for photo annotation"
          toolsDescription="Try tools that complement pinned comments, markup, and approvals."
          tools={getFreeToolsForPlatform('/platform/annotate-image')}
          articlesTitle="More guides and examples"
          articlesDescription="Read more about review, approvals, and version-aware image workflows."
          articles={relatedArticles}
          articlesMax={3}
          resourcesTitle="More resources"
          resourcesDescription="Capabilities that support photo review, approvals, and secure storage."
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
              {ANNOTATE_A_PHOTO_FAQS.map((faq) => (
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
                photo annotation flow that fits your team.
              </p>
            </div>
          </div>
        </section>

        <CTASection
          layout="split"
          splitTone="guide"
          title="Ready to approve photo revisions faster?"
          description="Pin notes to exact locations, keep versions clear, and move approvals forward without losing context."
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

