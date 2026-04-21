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

const DOCUMENT_TITLE = 'How to Markup a Video: Frame-Accurate Notes, Drawings, and Faster Cuts';
const META_DESCRIPTION =
  'Learn how to markup a video with frame-accurate pins, drawings, and short notes so editors know exactly what to change and revision rounds stay short.';
const PUBLISH_DATE = '2026-04-20 12:00';
const READ_TIME = '9';
const CANONICAL_PATH = '/guides/how-to-markup-a-video';
const GUIDE_COVER_SRC = '/images/guides/how-to-markup-a-video-cover.png';
const GUIDE_OG_IMAGE_URL = GUIDE_COVER_SRC;

const MARKUP_VIDEO_HERO_BLOK: SectionStoryblok = {
  _uid: 'static-how-to-markup-a-video-hero',
  component: 'section',
  title: 'How to Markup a Video',
  titleTag: 'h1',
  text:
    'A practical guide to video markup: pin feedback to exact frames and timestamps, use drawing when words are not ' +
    'enough, and keep notes actionable for editors.',
  orientation: '',
  displaySocials: false,
  imageObjectFit: 'contain',
  image: {
    _uid: 'static-how-to-markup-a-video-cover',
    id: null,
    alt: 'Kreatli Guide: How to markup a video',
    name: '',
    focus: '',
    source: '',
    title: 'How to markup a video',
    filename: GUIDE_COVER_SRC,
    copyright: '',
    fieldtype: 'asset',
  },
};

const TOC_SECTIONS = [
  'What video markup means in review',
  'When markup beats vague timestamp comments',
  'How to markup a video (step-by-step)',
  'Best practices for readable video markup',
  'Try marking up a video now',
  'Free tools, guides, and platform features',
  'FAQ: Markup a video',
] as const;

const MARKUP_VIDEO_FAQS = [
  {
    question: 'What counts as video markup?',
    answer:
      'Video markup is visual feedback on the picture at a specific moment: drawings, shapes, arrows, highlights, or pins ' +
      'paired with a short note. It is anchored to a frame or timecode so everyone sees the same shot.',
  },
  {
    question: 'How is markup different from a comment with only a timestamp?',
    answer:
      'A timestamp says when; markup shows where and what on the frame. The best reviews combine both—a pin or drawing ' +
      'plus a concise note about the intended fix.',
  },
  {
    question: 'How do I keep video markup from cluttering the frame?',
    answer:
      'Use one mark per issue, avoid stacking shapes, and keep colors consistent by feedback type. If a moment needs ' +
      'several fixes, split them into separate pins so each can be resolved.',
  },
  {
    question: 'Can clients markup video without installing software?',
    answer:
      'Yes with a browser review link. Guests can watch, add frame-accurate markup, and reply in the same thread as your team.',
  },
  {
    question: 'How should markup carry across video versions?',
    answer:
      'Keep feedback tied to the cut it was created on. Resolve completed items, then upload the next version so open ' +
      'work reflects the current file.',
  },
] as const;

export default function HowToMarkupAVideoGuidePage() {
  useSession();

  const relatedArticles = getPlatformArticles('/platform/video-annotation').filter(
    (article) => article.full_slug !== CANONICAL_PATH,
  );

  const tocLinks = TOC_SECTIONS.map((label) => ({
    label,
    url: `#${getHeadingId(label)}`,
  }));

  return (
    <>
      <FAQStructuredData faqs={[...MARKUP_VIDEO_FAQS]} />
      <GuidePageLayout
        documentTitle={DOCUMENT_TITLE}
        metaDescription={META_DESCRIPTION}
        canonicalPath={CANONICAL_PATH}
        ogImageUrl={GUIDE_OG_IMAGE_URL}
        ogImageAlt="Kreatli Guide: How to markup a video"
        publishDate={PUBLISH_DATE}
        readTimeMinutes={READ_TIME}
        breadcrumbLabel={DOCUMENT_TITLE}
        tocLinks={tocLinks}
      >
        <Section blok={MARKUP_VIDEO_HERO_BLOK} />

        <GuideSectionRule />

        <div className={wysiwygStyles.wysiwyg}>
          <p>
            <strong>How to markup a video</strong> is how teams stop debating “which frame?” Markup ties direction to
            the exact pixels at a timecode—so editors scrub once, see the shape or arrow, and execute instead of decoding
            long paragraphs.
          </p>

          <KeyTakeaways
            items={[
              'Drop markup on the exact frame that shows the issue.',
              'Pair every mark with a short note that states the outcome you want.',
              'One mark per issue so the timeline stays scannable.',
              'Resolve markup when the new cut addresses it; keep versions clean.',
            ]}
          />

          <h2 id={getHeadingId(TOC_SECTIONS[0])}>{TOC_SECTIONS[0]}</h2>
          <p>
            Video markup is any visual layer on playback: a box around a lower-third, an arrow for eye-line, a circle on
            a product hero, or freehand over a problem area. It exists so reviewers and editors share one picture of the
            change before the timeline moves.
          </p>
          <ul>
            <li>
              <p>
                <strong>Spatial clarity:</strong> everyone means the same region of the frame.
              </p>
            </li>
            <li>
              <p>
                <strong>Frame accuracy:</strong> feedback stays tied to the moment it was meant for.
              </p>
            </li>
            <li>
              <p>
                <strong>Audit trail:</strong> marks and notes stay with the asset instead of in chat screenshots.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[1])}>{TOC_SECTIONS[1]}</h2>
          <p>
            Text like “fix the grade around 1:12” still leaves room for interpretation. Markup collapses that ambiguity
            for color passes, graphics QA, legal supers, and client rounds where small regions matter.
          </p>
          <ul>
            <li>
              <p>
                <strong>Picture fixes:</strong> composition, graphics, VFX notes, and framing.
              </p>
            </li>
            <li>
              <p>
                <strong>Audio-adjacent cues:</strong> when you need to point at lip sync or hit points on picture.
              </p>
            </li>
            <li>
              <p>
                <strong>Approvals:</strong> stakeholders sign off on what they actually see on the frame.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[2])}>{TOC_SECTIONS[2]}</h2>
          <ol>
            <li>
              <p>
                <strong>Open the cut</strong> in a review workspace that supports frame-accurate markup.
              </p>
            </li>
            <li>
              <p>
                <strong>Pause on the exact frame</strong> that shows the issue, then choose the lightest tool that still
                communicates it—pin, box, arrow, or draw.
              </p>
            </li>
            <li>
              <p>
                <strong>Mark one change at a time</strong> so each item can be resolved independently.
              </p>
            </li>
            <li>
              <p>
                <strong>Add a concise note</strong> with the intended outcome (what “fixed” looks like).
              </p>
            </li>
            <li>
              <p>
                <strong>Share one review link</strong> and track open markup through approval.
              </p>
            </li>
          </ol>
          <p>
            For the platform overview, see <NextLink href="/platform/video-annotation">Video Annotation</NextLink>.
          </p>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[3])}>{TOC_SECTIONS[3]}</h2>
          <ul>
            <li>
              <p>
                <strong>Name the element</strong> when helpful: “lower third,” “end card logo,” “hero product.”
              </p>
            </li>
            <li>
              <p>
                <strong>Prefer execution language:</strong> “lift faces 5%” beats “feels dark.”
              </p>
            </li>
            <li>
              <p>
                <strong>Keep colors meaningful:</strong> use consistent colors by type of feedback or reviewer.
              </p>
            </li>
            <li>
              <p>
                <strong>Close the loop:</strong> resolve markup when the new export reflects the fix.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[4])}>{TOC_SECTIONS[4]}</h2>
          <p>
            The interactive preview below mirrors a simple video review flow with location-pinned feedback. When you are
            ready, <NextLink href="/sign-up">start a 7-day trial</NextLink> or{' '}
            <a href="https://calendar.app.google/NXbAeTAUwaBGh5x49" target="_blank" rel="noopener noreferrer nofollow">
              book a demo
            </a>
            .
          </p>

          <div className="my-4 w-full">
            <InteractiveReviewToolPreview variant="video" />
          </div>
        </div>

        <GuideSectionRule />

        <GuideArticleToolsResourcesSection
          tocHeadingId={getHeadingId(TOC_SECTIONS[5])}
          tocHeadingLabel={TOC_SECTIONS[5]}
          sectionIntro="Below are free tools that pair with video markup, plus related guides and platform features to explore next."
          toolsTitle="Free tools for video markup and review"
          toolsDescription="Try tools that complement frame-accurate notes, drawing, and approvals."
          tools={getFreeToolsForPlatform('/platform/video-annotation')}
          articlesTitle="More guides and examples"
          articlesDescription="Read more about video review, annotation, and version-aware workflows."
          articles={relatedArticles}
          articlesMax={3}
          resourcesTitle="More resources"
          resourcesDescription="Capabilities that support video review, drawing tools, and secure storage."
          resources={getRelatedResources(['videoAnnotation', 'reviewApproval', 'commentOnVideo']).map((resource, index) => {
            if (index === 0) return { ...resource, icon: 'monitorPlay' };
            if (index === 1) return { ...resource, icon: 'checkCircle' };
            return { ...resource, icon: 'reply' };
          })}
        />

        <GuideSectionRule />

        <section className="relative pb-0 pt-12 md:pb-0 md:pt-16">
          <div className="relative z-10 mx-auto max-w-3xl">
            <div className={cn(wysiwygStyles.wysiwyg, '[&>h2:first-child]:!mt-0')}>
              <h2 id={getHeadingId(TOC_SECTIONS[6])}>{TOC_SECTIONS[6]}</h2>
            </div>
            <div className="mt-6 flex flex-col gap-5 sm:gap-6">
              {MARKUP_VIDEO_FAQS.map((faq) => (
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
                video markup workflow for your team.
              </p>
            </div>
          </div>
        </section>

        <CTASection
          layout="split"
          splitTone="guide"
          title="Ready for frame-accurate video feedback?"
          description="Markup exact frames, keep notes tied to the cut, and move approvals without losing context in email."
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
