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

const DOCUMENT_TITLE = 'How to Comment on a Picture: Pins, Markup, and Organized Feedback';
const META_DESCRIPTION =
  'Learn when to pin, draw, or write on a picture — choose the right comment type for design reviews and keep feedback organized across revisions.';
const PUBLISH_DATE = '2026-04-09 00:30';
const READ_TIME = '7';
const CANONICAL_PATH = '/guides/how-to-comment-a-picture';
/** Horizontal cover for social / OG / hero. Use ~1800–2400px wide for a sharp hero on retina. */
const GUIDE_COVER_SRC = '/images/guides/how-to-comment-a-picture-cover.png';
const GUIDE_OG_IMAGE_URL = GUIDE_COVER_SRC;

const HOW_TO_COMMENT_A_PICTURE_HERO_BLOK: SectionStoryblok = {
  _uid: 'static-how-to-comment-a-picture-hero',
  component: 'section',
  title: 'How to Comment a Picture',
  titleTag: 'h1',
  text: 'A practical guide for picture review: pin comments to exact spots, add clear context, and keep approvals organized without losing notes across chat and email.',
  orientation: '',
  displaySocials: false,
  imageObjectFit: 'contain',
  image: {
    _uid: 'static-how-to-comment-a-picture-cover',
    id: null,
    alt: 'Kreatli Guide: How to comment a picture',
    name: '',
    focus: '',
    source: '',
    title: 'How to comment a picture',
    filename: GUIDE_COVER_SRC,
    copyright: '',
    fieldtype: 'asset',
  },
};

const TOC_SECTIONS = [
  'What it means to “comment a picture”',
  'When to use pins vs markup vs text-only notes',
  'How to comment a picture (step-by-step)',
  'Best practices for clear picture feedback',
  'Try commenting on a picture now',
  'Free tools, guides, and platform features',
  'FAQ: Comment a picture',
] as const;

const COMMENT_A_PICTURE_FAQS = [
  {
    question: 'Is “picture” different from “photo” for commenting?',
    answer:
      'Not in practice. Whether it’s a photo, screenshot, design, or any image, the best commenting workflow is the same: pin feedback to the exact location, keep comments focused, and track what’s resolved across versions.',
  },
  {
    question: 'Should I use markup (arrows/boxes) or just comments?',
    answer:
      'Use comments to explain the intent and markup to show the exact area. If the feedback is spatial (“move this here,” “blur this region,” “align this edge”), a quick arrow or box removes ambiguity.',
  },
  {
    question: 'What should I include in an image comment?',
    answer:
      'Include the location, the requested change, and the reason. For example: “Top right corner: reduce logo size by ~10% so it doesn’t compete with the headline.”',
  },
  {
    question: 'Can multiple stakeholders comment on the same picture?',
    answer:
      'Yes. A good review flow supports multiple reviewers with clear attribution so you can filter, resolve, and consolidate feedback instead of copying notes between threads.',
  },
  {
    question: 'Can clients comment without signing up?',
    answer:
      'Yes—when you share a guest-friendly review link, clients can open the picture and leave pinned comments without creating an account. This keeps feedback centralized and easy to act on.',
  },
] as const;

export default function HowToCommentAPictureGuidePage() {
  useSession();

  const relatedArticles = getPlatformArticles('/platform/annotate-image').filter(
    (article) => article.full_slug !== '/guides/how-to-comment-a-picture',
  );

  const tocLinks = TOC_SECTIONS.map((label) => ({
    label,
    url: `#${getHeadingId(label)}`,
  }));

  return (
    <>
      <FAQStructuredData faqs={[...COMMENT_A_PICTURE_FAQS]} />
      <GuidePageLayout
        documentTitle={DOCUMENT_TITLE}
        metaDescription={META_DESCRIPTION}
        canonicalPath={CANONICAL_PATH}
        ogImageUrl={GUIDE_OG_IMAGE_URL}
        ogImageAlt="Kreatli Guide: How to comment a picture"
        publishDate={PUBLISH_DATE}
        readTimeMinutes={READ_TIME}
        breadcrumbLabel={DOCUMENT_TITLE}
        tocLinks={tocLinks}
      >
        <Section blok={HOW_TO_COMMENT_A_PICTURE_HERO_BLOK} />

        <GuideSectionRule />

        <div className={wysiwygStyles.wysiwyg}>
          <p>
            <strong>How to comment a picture</strong> is about making feedback unambiguous. Instead of “this part looks
            off,” use <strong>location-pinned comments</strong> (and optional markup) so collaborators know exactly what
            you mean and can resolve changes quickly.
          </p>
          <p>
            Picture comments here assume <strong>creative-direction feedback</strong> on layouts, campaign art, and
            branded statics. For photographer–client selection rounds or deep retouch notes, follow the{' '}
            <NextLink href="/guides/how-to-comment-a-photo" className="font-medium text-primary underline-offset-2 hover:underline">
              photo commenting guide
            </NextLink>
            .
          </p>

          <KeyTakeaways
            items={[
              'Choose between a pinned comment, markup (arrows/boxes), or a text-only note based on what\u2019s clearest.',
              'Pin comments to the exact spot on the picture to remove guesswork.',
              'One comment per issue keeps threads focused and resolution trackable.',
              'Resolve comments after changes are made so the team sees remaining work at a glance.',
            ]}
          />

          <h2 id={getHeadingId(TOC_SECTIONS[0])}>{TOC_SECTIONS[0]}</h2>
          <p>
            In review workflows, “commenting on a picture” means your note is anchored to a specific spot on the image.
            That pin provides context, and the comment explains intent.
          </p>
          <ul>
            <li>
              <p>
                <strong>Pin location:</strong> tie feedback to the exact pixel region.
              </p>
            </li>
            <li>
              <p>
                <strong>Clear intent:</strong> describe what to change and what success looks like.
              </p>
            </li>
            <li>
              <p>
                <strong>Resolve and iterate:</strong> track what’s done across review rounds and versions.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[1])}>{TOC_SECTIONS[1]}</h2>
          <p>Use the lightest tool that makes your feedback clear:</p>
          <ul>
            <li>
              <p>
                <strong>Pins:</strong> best for specific changes on a specific area (“fix this,” “move this,” “blur
                this”).
              </p>
            </li>
            <li>
              <p>
                <strong>Markup:</strong> arrows/boxes/highlights when the feedback is spatial and hard to describe.
              </p>
            </li>
            <li>
              <p>
                <strong>Text-only notes:</strong> fine for global feedback (“overall tone,” “crop size,” “export
                settings”) but avoid using only text for location-specific issues.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[2])}>{TOC_SECTIONS[2]}</h2>
          <ol>
            <li>
              <p>
                <strong>Open the picture</strong> in a review tool that supports pinned comments (and optionally markup).
              </p>
            </li>
            <li>
              <p>
                <strong>Click the exact area</strong> you want to address to create a pin.
              </p>
            </li>
            <li>
              <p>
                <strong>Write the comment</strong> with clear action + intent (what to change and why).
              </p>
            </li>
            <li>
              <p>
                <strong>Share a review link</strong> so all stakeholders comment in one place.
              </p>
            </li>
            <li>
              <p>
                <strong>Resolve feedback</strong> and upload the next version when ready.
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
                <strong>Be specific:</strong> say what to change and where, not just what you don’t like.
              </p>
            </li>
            <li>
              <p>
                <strong>Describe success:</strong> “match spacing to the grid” or “align to the baseline.”
              </p>
            </li>
            <li>
              <p>
                <strong>Keep comments short:</strong> long paragraphs are harder to act on than small, resolvable notes.
              </p>
            </li>
            <li>
              <p>
                <strong>Use markup when needed:</strong> arrows/boxes communicate in seconds.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[4])}>{TOC_SECTIONS[4]}</h2>
          <p>
            The interactive preview below mirrors a simple image review flow: upload a picture, pin a comment, and add a
            note with clear intent. When you are ready, <NextLink href="/sign-up">start a 7-day trial</NextLink> or{' '}
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
          sectionIntro="Below are free tools that pair with picture review, plus related guides and platform features to explore next."
          toolsTitle="Free tools for image feedback"
          toolsDescription="Try tools that complement pinned comments, markup, and approvals for images."
          tools={getFreeToolsForPlatform('/platform/annotate-image')}
          articlesTitle="More guides and examples"
          articlesDescription="Deeper reads on image review, approvals, and workflow."
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
              {COMMENT_A_PICTURE_FAQS.map((faq) => (
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
                image review flow that fits your team.
              </p>
            </div>
          </div>
        </section>

        <CTASection
          layout="split"
          splitTone="guide"
          title="Ready to keep image feedback clear?"
          description="Pin comments to exact locations, track resolution, and move approvals forward without losing context."
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

