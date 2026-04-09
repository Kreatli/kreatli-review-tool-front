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

const DOCUMENT_TITLE = 'How to Annotate a Picture: Mark Up What You Mean and Keep Feedback Organized';
const META_DESCRIPTION =
  'Learn how to annotate a picture with location-pinned comments and markup so feedback is clear, revisions move faster, and approvals stay organized.';
const PUBLISH_DATE = '2026-04-08 01:30';
const READ_TIME = '8';
const CANONICAL_PATH = '/guides/how-to-annotate-a-picture';
/**
 * Horizontal cover for social / OG / hero. Use ~1800–2400px wide for a sharp hero on retina.
 */
const GUIDE_COVER_SRC = '/images/guides/how-to-annotate-a-picture-cover.png';
const GUIDE_OG_IMAGE_URL = GUIDE_COVER_SRC;

const HOW_TO_ANNOTATE_A_PICTURE_HERO_BLOK: SectionStoryblok = {
  _uid: 'static-how-to-annotate-a-picture-hero',
  component: 'section',
  title: 'How to Annotate a Picture',
  titleTag: 'h1',
  text: 'A practical guide for picture feedback: pin comments to exact locations, add markup for clarity, and keep revisions and approvals organized without messy email threads.',
  orientation: '',
  displaySocials: false,
  imageObjectFit: 'contain',
  image: {
    _uid: 'static-how-to-annotate-a-picture-cover',
    id: null,
    alt: 'Kreatli Guide: How to annotate a picture',
    name: '',
    focus: '',
    source: '',
    title: 'How to annotate a picture',
    filename: GUIDE_COVER_SRC,
    copyright: '',
    fieldtype: 'asset',
  },
};

const TOC_SECTIONS = [
  'What “annotate a picture” means',
  'When picture annotation is the fastest way to align',
  'How to annotate a picture (step-by-step)',
  'Best practices for clear picture markup',
  'Try annotating a picture now',
  'Free tools, guides, and platform features',
  'FAQ: Annotate a picture',
] as const;

const ANNOTATE_A_PICTURE_FAQS = [
  {
    question: 'What does “annotate a picture” mean?',
    answer:
      'It means adding feedback directly on the picture—usually pinned comments plus markup like arrows, boxes, and highlights—so collaborators understand exactly what area you’re referencing.',
  },
  {
    question: 'Is it better to annotate the picture or write a message?',
    answer:
      'If the feedback is visual or spatial, annotation is usually better. A message can be too vague (“move it left”), while a pin or box shows the exact area and reduces back-and-forth.',
  },
  {
    question: 'What’s the best way to share picture feedback with a client?',
    answer:
      'Share a single review link where the client can leave pinned comments. That keeps feedback centralized, prevents conflicting notes across email threads, and supports clear approvals.',
  },
  {
    question: 'Can multiple people annotate the same picture?',
    answer:
      'Yes. A good review workflow supports multiple reviewers on one version, with comment resolution so the editor can track what’s done vs what’s still open.',
  },
  {
    question: 'How do I avoid duplicate or conflicting annotations?',
    answer:
      'Ask reviewers to keep one request per comment, and use resolution status to confirm changes. If approvals matter, keep version history so decisions stay traceable.',
  },
] as const;

export default function HowToAnnotateAPictureGuidePage() {
  useSession();

  const relatedArticles = getPlatformArticles('/platform/annotate-image').filter(
    (article) => article.full_slug !== '/guides/how-to-annotate-a-picture',
  );

  const tocLinks = TOC_SECTIONS.map((label) => ({
    label,
    url: `#${getHeadingId(label)}`,
  }));

  return (
    <>
      <FAQStructuredData faqs={[...ANNOTATE_A_PICTURE_FAQS]} />
      <GuidePageLayout
        documentTitle={DOCUMENT_TITLE}
        metaDescription={META_DESCRIPTION}
        canonicalPath={CANONICAL_PATH}
        ogImageUrl={GUIDE_OG_IMAGE_URL}
        ogImageAlt="Kreatli Guide: How to annotate a picture"
        publishDate={PUBLISH_DATE}
        readTimeMinutes={READ_TIME}
        breadcrumbLabel={DOCUMENT_TITLE}
        tocLinks={tocLinks}
      >
        <Section blok={HOW_TO_ANNOTATE_A_PICTURE_HERO_BLOK} />

        <GuideSectionRule />

        <div className={wysiwygStyles.wysiwyg}>
          <p>
            <strong>How to annotate a picture</strong> is about removing guesswork. The best feedback is anchored to the
            exact location you mean, and paired with clear intent—so revisions don’t bounce between screenshots and long
            message threads.
          </p>

          <h2 id={getHeadingId(TOC_SECTIONS[0])}>{TOC_SECTIONS[0]}</h2>
          <p>
            In a picture review workflow, annotation means your feedback is attached to a specific spot on the image.
            That makes it easy for the editor to understand what you meant and for the team to track what’s resolved.
          </p>
          <ul>
            <li>
              <p>
                <strong>Pinned comment:</strong> the note is anchored to a location.
              </p>
            </li>
            <li>
              <p>
                <strong>Markup:</strong> arrows/boxes/highlights show “where” instantly.
              </p>
            </li>
            <li>
              <p>
                <strong>Resolution:</strong> open vs resolved keeps review moving.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[1])}>{TOC_SECTIONS[1]}</h2>
          <ul>
            <li>
              <p>
                <strong>Design review:</strong> alignment, spacing, typography, and layout tweaks.
              </p>
            </li>
            <li>
              <p>
                <strong>Brand checks:</strong> logo placement, color usage, and consistency.
              </p>
            </li>
            <li>
              <p>
                <strong>Approval rounds:</strong> keep sign-off and feedback tied to the right version.
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
                <strong>Open the picture</strong> in a review tool that supports pinned comments (and optional markup).
              </p>
            </li>
            <li>
              <p>
                <strong>Click the exact area</strong> you want to reference.
              </p>
            </li>
            <li>
              <p>
                <strong>Write the annotation</strong> with action + intent.
              </p>
            </li>
            <li>
              <p>
                <strong>Add markup when helpful</strong> (arrow/box/highlight) so the area is obvious at a glance.
              </p>
            </li>
            <li>
              <p>
                <strong>Share a review link</strong> so all feedback stays in one place.
              </p>
            </li>
            <li>
              <p>
                <strong>Resolve comments</strong> as edits are made and confirm approval on the latest version.
              </p>
            </li>
          </ol>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[3])}>{TOC_SECTIONS[3]}</h2>
          <ul>
            <li>
              <p>
                <strong>One request per comment:</strong> split feedback into separate notes so it’s easy to resolve.
              </p>
            </li>
            <li>
              <p>
                <strong>Be unambiguous:</strong> describe the object/area and the change.
              </p>
            </li>
            <li>
              <p>
                <strong>Add a success check:</strong> “aligns to grid,” “reads at mobile size,” “matches brand colors.”
              </p>
            </li>
            <li>
              <p>
                <strong>Prefer a quick arrow/box</strong> for anything spatial.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[4])}>{TOC_SECTIONS[4]}</h2>
          <p>
            The interactive preview below mirrors a simple picture annotation flow. When you’re ready,{' '}
            <NextLink href="/sign-up">start a 7-day trial</NextLink> or{' '}
            <a href="https://calendar.app.google/NXbAeTAUwaBGh5x49" target="_blank" rel="noopener noreferrer">
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
          sectionIntro="Below are free tools that pair with picture review, plus related guides and platform features to explore next."
          toolsTitle="Free tools for picture annotation"
          toolsDescription="Try tools that complement pinned comments, markup, and approvals."
          tools={getFreeToolsForPlatform('/platform/annotate-image')}
          articlesTitle="More guides and examples"
          articlesDescription="Read more about review, approvals, and version-aware image workflows."
          articles={relatedArticles}
          articlesMax={3}
          resourcesTitle="More resources"
          resourcesDescription="Capabilities that support image review, approvals, and secure storage."
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
              {ANNOTATE_A_PICTURE_FAQS.map((faq) => (
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
                picture annotation flow that fits your team.
              </p>
            </div>
          </div>
        </section>

        <CTASection
          layout="split"
          splitTone="guide"
          title="Ready to get clear picture feedback?"
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

