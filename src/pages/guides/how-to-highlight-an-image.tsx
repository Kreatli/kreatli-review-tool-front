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

const DOCUMENT_TITLE = 'How to Highlight an Image: Point to Exact Areas and Speed Up Revisions';
const META_DESCRIPTION =
  'Learn how to highlight an image with precise location-based feedback, clear intent, and review-ready workflows that reduce ambiguity and rework.';
const PUBLISH_DATE = '2026-04-10 10:10';
const READ_TIME = '8';
const CANONICAL_PATH = '/guides/how-to-highlight-an-image';
const GUIDE_COVER_SRC = '/images/guides/how-to-highlight-an-image-cover.png';
const GUIDE_OG_IMAGE_URL = GUIDE_COVER_SRC;

const HIGHLIGHT_IMAGE_HERO_BLOK: SectionStoryblok = {
  _uid: 'static-how-to-highlight-an-image-hero',
  component: 'section',
  title: 'How to Highlight an Image',
  titleTag: 'h1',
  text: 'A practical guide to highlighting images so feedback lands clearly. Mark exact regions, explain the requested change, and keep review cycles aligned.',
  orientation: '',
  displaySocials: false,
  imageObjectFit: 'contain',
  image: {
    _uid: 'static-how-to-highlight-an-image-cover',
    id: null,
    alt: 'Kreatli Guide: How to highlight an image',
    name: '',
    focus: '',
    source: '',
    title: 'How to highlight an image',
    filename: GUIDE_COVER_SRC,
    copyright: '',
    fieldtype: 'asset',
  },
};

const TOC_SECTIONS = [
  'What image highlighting means in review workflows',
  'When highlights beat vague “this area” feedback',
  'How to highlight an image (step-by-step)',
  'Best practices for image highlights',
  'Try highlighting an image now',
  'Free tools, guides, and platform features',
  'FAQ: Highlight an image',
] as const;

const HIGHLIGHT_IMAGE_FAQS = [
  {
    question: 'What is the difference between highlighting and annotating an image?',
    answer:
      'Highlighting emphasizes a specific region or element. Annotating includes highlights plus comments, arrows, boxes, or drawing. In practice, highlighting points to where and comments explain what to change.',
  },
  {
    question: 'How can I make highlighted image feedback more actionable?',
    answer:
      'Pair each highlight with one clear action and intent, such as “Increase contrast here so text remains legible on mobile.” This avoids unclear one-word notes and speeds up revisions.',
  },
  {
    question: 'Should I use one big highlight or many small ones?',
    answer:
      'Use smaller, targeted highlights. Broad highlights hide the real issue and make it harder to resolve feedback item-by-item.',
  },
  {
    question: 'Can clients highlight images without creating accounts?',
    answer:
      'Yes, if your review link supports guest access. That lets external reviewers leave pinpointed feedback without signup friction.',
  },
  {
    question: 'How do highlights stay organized across image versions?',
    answer:
      'Use version-aware review and resolve comments against each revision. That keeps old highlights from being confused with new artwork.',
  },
] as const;

export default function HowToHighlightAnImageGuidePage() {
  useSession();

  const relatedArticles = getPlatformArticles('/platform/annotate-image').filter(
    (article) => article.full_slug !== CANONICAL_PATH,
  );

  const tocLinks = TOC_SECTIONS.map((label) => ({
    label,
    url: `#${getHeadingId(label)}`,
  }));

  return (
    <>
      <FAQStructuredData faqs={[...HIGHLIGHT_IMAGE_FAQS]} />
      <GuidePageLayout
        documentTitle={DOCUMENT_TITLE}
        metaDescription={META_DESCRIPTION}
        canonicalPath={CANONICAL_PATH}
        ogImageUrl={GUIDE_OG_IMAGE_URL}
        ogImageAlt="Kreatli Guide: How to highlight an image"
        publishDate={PUBLISH_DATE}
        readTimeMinutes={READ_TIME}
        breadcrumbLabel={DOCUMENT_TITLE}
        tocLinks={tocLinks}
      >
        <Section blok={HIGHLIGHT_IMAGE_HERO_BLOK} />

        <GuideSectionRule />

        <div className={wysiwygStyles.wysiwyg}>
          <p>
            <strong>How to highlight an image</strong> is really about precision. If feedback says “move this” but does
            not show exactly where, revisions slow down. Location-based highlights let designers and reviewers align
            quickly and avoid guesswork.
          </p>

          <h2 id={getHeadingId(TOC_SECTIONS[0])}>{TOC_SECTIONS[0]}</h2>
          <p>
            In image review, highlighting marks exact areas that need attention. It works best when paired with a short
            explanation so collaborators understand both location and intent.
          </p>
          <ul>
            <li>
              <p>
                <strong>Spatial clarity:</strong> everyone sees the same area immediately.
              </p>
            </li>
            <li>
              <p>
                <strong>Faster iterations:</strong> less back-and-forth asking “which part?”
              </p>
            </li>
            <li>
              <p>
                <strong>Cleaner approvals:</strong> highlighted issues can be tracked and resolved one by one.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[1])}>{TOC_SECTIONS[1]}</h2>
          <p>
            Vague feedback creates multiple interpretations. Highlights reduce ambiguity by making the target area visible
            without extra screenshots or explanatory threads.
          </p>
          <ul>
            <li>
              <p>
                <strong>Brand review:</strong> call out logo treatment, spacing, and hierarchy issues.
              </p>
            </li>
            <li>
              <p>
                <strong>Performance creative:</strong> flag CTA placement and readability zones.
              </p>
            </li>
            <li>
              <p>
                <strong>Retouching notes:</strong> mark artifacts, skin tones, and background cleanup areas.
              </p>
            </li>
          </ul>
          <p>
            For the platform workflow, see <NextLink href="/platform/annotate-image">Annotate Image</NextLink>.
          </p>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[2])}>{TOC_SECTIONS[2]}</h2>
          <ol>
            <li>
              <p>
                <strong>Upload the image</strong> to a review tool with location-pinned markup.
              </p>
            </li>
            <li>
              <p>
                <strong>Highlight the exact area</strong> that needs adjustment.
              </p>
            </li>
            <li>
              <p>
                <strong>Add one focused comment</strong> with requested change and reason.
              </p>
            </li>
            <li>
              <p>
                <strong>Share one review link</strong> so all feedback stays centralized.
              </p>
            </li>
            <li>
              <p>
                <strong>Resolve and re-review</strong> on the next version until approved.
              </p>
            </li>
          </ol>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[3])}>{TOC_SECTIONS[3]}</h2>
          <ul>
            <li>
              <p>
                <strong>Keep highlights small:</strong> mark only the relevant visual area.
              </p>
            </li>
            <li>
              <p>
                <strong>Use one instruction per note:</strong> avoid bundling unrelated changes.
              </p>
            </li>
            <li>
              <p>
                <strong>Include intent:</strong> clarify whether the goal is readability, branding, or conversion.
              </p>
            </li>
            <li>
              <p>
                <strong>Close the loop:</strong> resolve highlights only after confirming the revision.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[4])}>{TOC_SECTIONS[4]}</h2>
          <p>
            The interactive preview below mirrors a location-pinned image feedback flow. When you are ready,{' '}
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
          sectionIntro="Below are free tools that pair with image highlighting, plus related guides and platform features to explore next."
          toolsTitle="Free tools for image highlighting and markup"
          toolsDescription="Try tools that complement image comments, markup, and approvals."
          tools={getFreeToolsForPlatform('/platform/annotate-image')}
          articlesTitle="More guides and examples"
          articlesDescription="Read more about image annotation, review loops, and approvals."
          articles={relatedArticles}
          articlesMax={3}
          resourcesTitle="More resources"
          resourcesDescription="Capabilities that support visual feedback, collaboration, and secure storage."
          resources={getRelatedResources(['annotateImage', 'drawOnImage', 'secureAssetStorage']).map(
            (resource, index) => {
              if (index === 0) return { ...resource, icon: 'panorama' };
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
              {HIGHLIGHT_IMAGE_FAQS.map((faq) => (
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
                image highlighting workflow that fits your team.
              </p>
            </div>
          </div>
        </section>

        <CTASection
          layout="split"
          splitTone="guide"
          title="Ready to make image feedback unambiguous?"
          description="Highlight exact regions, keep comments organized, and move revisions forward without scattered notes."
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
