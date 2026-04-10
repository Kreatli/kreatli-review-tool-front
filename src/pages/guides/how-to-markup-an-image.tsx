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

const DOCUMENT_TITLE = 'How to Markup an Image: Pin Feedback to Pixels and Cut Revision Rounds';
const META_DESCRIPTION =
  'Learn how to markup an image with location-pinned notes and visual marks so retouchers and designers get ' +
  'unambiguous direction and ship faster.';
const PUBLISH_DATE = '2026-04-10 12:20';
const READ_TIME = '8';
const CANONICAL_PATH = '/guides/how-to-markup-an-image';
const GUIDE_COVER_SRC = '/images/guides/how-to-markup-an-image-cover.png';
const GUIDE_OG_IMAGE_URL = GUIDE_COVER_SRC;

const MARKUP_IMAGE_HERO_BLOK: SectionStoryblok = {
  _uid: 'static-how-to-markup-an-image-hero',
  component: 'section',
  title: 'How to Markup an Image',
  titleTag: 'h1',
  text:
    'A practical guide to image markup: point to exact pixels with highlights, shapes, or pins, then explain the ' +
    'change so retouching and design rounds stay efficient.',
  orientation: '',
  displaySocials: false,
  imageObjectFit: 'contain',
  image: {
    _uid: 'static-how-to-markup-an-image-cover',
    id: null,
    alt: 'Kreatli Guide: How to markup an image',
    name: '',
    focus: '',
    source: '',
    title: 'How to markup an image',
    filename: GUIDE_COVER_SRC,
    copyright: '',
    fieldtype: 'asset',
  },
};

const TOC_SECTIONS = [
  'What image markup means in creative review',
  'When markup saves time vs long written feedback',
  'How to markup an image (step-by-step)',
  'Best practices for clear image markup',
  'Try marking up an image now',
  'Free tools, guides, and platform features',
  'FAQ: Markup an image',
] as const;

const MARKUP_IMAGE_FAQS = [
  {
    question: 'What tools are used to markup an image?',
    answer:
      'Common markup includes highlights, rectangles, arrows, freehand drawing, and pinned comments. The right tool ' +
      'depends on whether you are flagging a region, showing direction, or describing a color or crop adjustment.',
  },
  {
    question: 'How is markup different from sending a marked-up screenshot?',
    answer:
      'Screenshots create a new file and often lose resolution. Markup inside a review tool keeps feedback on the ' +
      'source asset, preserves zoom clarity, and stays organized across versions.',
  },
  {
    question: 'How do I keep image markup readable?',
    answer:
      'Use one mark per issue, avoid stacking shapes, and keep colors consistent by feedback type. If a region needs ' +
      'multiple fixes, split them into separate pins so each can be resolved independently.',
  },
  {
    question: 'Can clients markup images without installing apps?',
    answer:
      'Yes with a browser review link. Guests can open the image, add markup, and leave notes in the same workspace as ' +
      'your team.',
  },
  {
    question: 'How should markup carry across image versions?',
    answer:
      'Keep notes tied to the version they were created on. Resolve completed markup, then upload the next revision so ' +
      'open work reflects the current file.',
  },
] as const;

export default function HowToMarkupAnImageGuidePage() {
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
      <FAQStructuredData faqs={[...MARKUP_IMAGE_FAQS]} />
      <GuidePageLayout
        documentTitle={DOCUMENT_TITLE}
        metaDescription={META_DESCRIPTION}
        canonicalPath={CANONICAL_PATH}
        ogImageUrl={GUIDE_OG_IMAGE_URL}
        ogImageAlt="Kreatli Guide: How to markup an image"
        publishDate={PUBLISH_DATE}
        readTimeMinutes={READ_TIME}
        breadcrumbLabel={DOCUMENT_TITLE}
        tocLinks={tocLinks}
      >
        <Section blok={MARKUP_IMAGE_HERO_BLOK} />

        <GuideSectionRule />

        <div className={wysiwygStyles.wysiwyg}>
          <p>
            <strong>How to markup an image</strong> is how creative teams remove ambiguity. Words like “warm it up” or
            “tighten the crop” become actionable when they sit on the exact gradient, edge, or type block they refer
            to—so retouchers spend time editing, not guessing.
          </p>

          <h2 id={getHeadingId(TOC_SECTIONS[0])}>{TOC_SECTIONS[0]}</h2>
          <p>
            Image markup is any visual signal layered on the picture during review: a box around a logo lockup, an arrow
            for repositioning, a highlight on copy, or a pin with a short note. It exists to synchronize what everyone
            is looking at before pixels move.
          </p>
          <ul>
            <li>
              <p>
                <strong>Spatial clarity:</strong> reviewers mean the same corner, shadow, or glyph.
              </p>
            </li>
            <li>
              <p>
                <strong>Faster handoffs:</strong> production sees the map before opening Photoshop or Figma exports.
              </p>
            </li>
            <li>
              <p>
                <strong>Better archives:</strong> feedback stays with the file instead of in chat screenshots.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[1])}>{TOC_SECTIONS[1]}</h2>
          <p>
            Written lists help for brand rules, but they struggle with “this glow” or “this edge.” Markup collapses
            back-and-forth on social assets, e-commerce shots, OOH mockups, and UI captures where placement is
            everything.
          </p>
          <ul>
            <li>
              <p>
                <strong>Retouching:</strong> skin, product dust, reflections, and cleanup targets.
              </p>
            </li>
            <li>
              <p>
                <strong>Layout QA:</strong> spacing, alignment, and hierarchy on flattened comps.
              </p>
            </li>
            <li>
              <p>
                <strong>Approvals:</strong> stakeholders sign off on what they actually see.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[2])}>{TOC_SECTIONS[2]}</h2>
          <ol>
            <li>
              <p>
                <strong>Open the image</strong> in a review workspace that supports pins or drawing tools.
              </p>
            </li>
            <li>
              <p>
                <strong>Choose markup that matches the issue</strong>—box for area, arrow for motion, highlight for
                copy.
              </p>
            </li>
            <li>
              <p>
                <strong>Mark one change at a time</strong> so each note can be resolved cleanly.
              </p>
            </li>
            <li>
              <p>
                <strong>Add a short note</strong> with the requested outcome and any brand constraints.
              </p>
            </li>
            <li>
              <p>
                <strong>Share one review link</strong> and track open markup through final approval.
              </p>
            </li>
          </ol>
          <p>
            For the platform overview, see <NextLink href="/platform/annotate-image">Annotate Image</NextLink>.
          </p>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[3])}>{TOC_SECTIONS[3]}</h2>
          <ul>
            <li>
              <p>
                <strong>Name the layer or region</strong> when files are complex: “left hero headline,” “SKU badge.”
              </p>
            </li>
            <li>
              <p>
                <strong>Pair marks with metrics when possible:</strong> hex codes, crop ratios, or safe-zone references.
              </p>
            </li>
            <li>
              <p>
                <strong>Keep tone constructive:</strong> describe the target state, not only the problem.
              </p>
            </li>
            <li>
              <p>
                <strong>Resolve and version:</strong> close pins when the new export reflects the fix.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[4])}>{TOC_SECTIONS[4]}</h2>
          <p>
            The interactive preview below mirrors a simple image review flow with location-pinned feedback. When you are
            ready, <NextLink href="/sign-up">start a 7-day trial</NextLink> or{' '}
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
          sectionIntro="Below are free tools that pair with image markup, plus related guides and platform features to explore next."
          toolsTitle="Free tools for image markup and review"
          toolsDescription="Try tools that complement pins, drawing, and approvals."
          tools={getFreeToolsForPlatform('/platform/annotate-image')}
          articlesTitle="More guides and examples"
          articlesDescription="Read more about image review, retouching handoffs, and version-aware workflows."
          articles={relatedArticles}
          articlesMax={3}
          resourcesTitle="More resources"
          resourcesDescription="Capabilities that support image review, drawing tools, and secure storage."
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
              {MARKUP_IMAGE_FAQS.map((faq) => (
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
                image markup flow for your team.
              </p>
            </div>
          </div>
        </section>

        <CTASection
          layout="split"
          splitTone="guide"
          title="Ready to give pixel-precise image feedback?"
          description="Markup exact areas, keep notes attached to the asset, and move approvals without screenshot chaos."
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
