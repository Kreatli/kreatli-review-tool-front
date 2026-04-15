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

const DOCUMENT_TITLE =
  'How to Review a Video: Timestamped Notes, Clear Intent, and Faster Cuts';
const META_DESCRIPTION =
  'Learn how to review a video with timestamped feedback, visual markup when needed, and version-aware workflows so ' +
  'editors can execute changes without decoding long email threads.';
const PUBLISH_DATE = '2026-04-10 11:30';
const READ_TIME = '10';
const CANONICAL_PATH = '/guides/how-to-review-a-video';
const GUIDE_COVER_SRC = '/images/guides/how-to-review-a-video-cover.png';
const GUIDE_OG_IMAGE_URL = GUIDE_COVER_SRC;

const REVIEW_VIDEO_HERO_BLOK: SectionStoryblok = {
  _uid: 'static-how-to-review-a-video-hero',
  component: 'section',
  title: 'How to Review a Video',
  titleTag: 'h1',
  text:
    'A practical guide for stakeholders reviewing cuts: speak in timecode, separate blocking issues from polish, and keep ' +
    'every note tied to the frame it belongs to.',
  orientation: '',
  displaySocials: false,
  imageObjectFit: 'contain',
  image: {
    _uid: 'static-how-to-review-a-video-cover',
    id: null,
    alt: 'Kreatli Guide: How to review a video',
    name: '',
    focus: '',
    source: '',
    title: 'How to review a video',
    filename: GUIDE_COVER_SRC,
    copyright: '',
    fieldtype: 'asset',
  },
};

const TOC_SECTIONS = [
  'What a good video review looks like',
  'Why timestamped feedback beats “see below” notes',
  'How to review a video (step-by-step)',
  'Best practices for actionable video notes',
  'Try reviewing a video now',
  'Free tools, guides, and platform features',
  'FAQ: Review a video',
] as const;

const REVIEW_VIDEO_FAQS = [
  {
    question: 'What does it mean to review a video properly?',
    answer:
      'A proper review ties each note to a specific moment in the timeline, states the requested change, and explains ' +
      'intent (story, brand, legal, audio clarity, etc.). The editor should not have to guess which frame you mean.',
  },
  {
    question: 'Should I write one long comment or many short ones?',
    answer:
      'Prefer many short, timestamped comments—one issue per note—so items can be resolved independently. Long essays are ' +
      'harder to track across versions.',
  },
  {
    question: 'When should I draw on a frame while reviewing?',
    answer:
      'Use drawing when spatial detail matters: graphics placement, safe areas, faces to blur, or UI overlap. Pair the ' +
      'drawing with text so the goal is explicit.',
  },
  {
    question: 'How do I review new versions without repeating old notes?',
    answer:
      'Use version-aware review so comments stay attached to the cut they were made on. Resolve completed items, then ' +
      'review the new upload as a fresh pass focused on what changed.',
  },
  {
    question: 'Can clients review without accounts?',
    answer:
      'Yes, when you share a guest-friendly review link. External stakeholders can watch and comment in one workspace ' +
      'without signing up.',
  },
] as const;

export default function HowToReviewAVideoGuidePage() {
  useSession();

  const relatedArticles = getPlatformArticles('/platform/review-video').filter(
    (article) => article.full_slug !== CANONICAL_PATH,
  );

  const tocLinks = TOC_SECTIONS.map((label) => ({
    label,
    url: `#${getHeadingId(label)}`,
  }));

  return (
    <>
      <FAQStructuredData faqs={[...REVIEW_VIDEO_FAQS]} />
      <GuidePageLayout
        documentTitle={DOCUMENT_TITLE}
        metaDescription={META_DESCRIPTION}
        canonicalPath={CANONICAL_PATH}
        ogImageUrl={GUIDE_OG_IMAGE_URL}
        ogImageAlt="Kreatli Guide: How to review a video"
        publishDate={PUBLISH_DATE}
        readTimeMinutes={READ_TIME}
        breadcrumbLabel={DOCUMENT_TITLE}
        tocLinks={tocLinks}
      >
        <Section blok={REVIEW_VIDEO_HERO_BLOK} />

        <GuideSectionRule />

        <div className={wysiwygStyles.wysiwyg}>
          <p>
            <strong>How to review a video</strong> is a collaboration skill: your job is to make the next cut obvious.
            Timestamped notes, clear priorities, and honest separation between “must-fix” and “nice-to-have” keep
            editors moving instead of reconciling vague feedback.
          </p>

          <KeyTakeaways
            items={[
              'Pin feedback to exact frames so editors can jump straight to the timecode without scrubbing.',
              'State what needs to change and why — "trim 2 seconds before the logo reveal for pacing" beats "too long."',
              'Review at the intended output resolution and on the target device when possible.',
              'Use version comparison to verify that requested changes were applied correctly before approving.',
            ]}
          />

          <p className="text-sm text-foreground-600">
            Choosing a review stack for your team?{' '}
            <NextLink href="/comparisons" className="font-medium text-primary underline-offset-2 hover:underline">
              Browse Kreatli comparisons with other platforms
            </NextLink>{' '}
            before you trial.
          </p>

          <h2 id={getHeadingId(TOC_SECTIONS[0])}>{TOC_SECTIONS[0]}</h2>
          <p>
            Strong video review balances creative direction with execution detail. Everyone should agree on pacing,
            story beats, and brand guardrails—then translate those into concrete changes tied to timecode.
          </p>
          <ul>
            <li>
              <p>
                <strong>Time-anchored:</strong> every note maps to a moment in the timeline.
              </p>
            </li>
            <li>
              <p>
                <strong>Prioritized:</strong> blocking issues surface before polish passes.
              </p>
            </li>
            <li>
              <p>
                <strong>Resolvable:</strong> each comment can be checked off when addressed.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[1])}>{TOC_SECTIONS[1]}</h2>
          <p>
            “See 0:45” in an email thread still leaves room for error. Timestamped comments inside the player remove
            ambiguity and let editors jump straight to the issue.
          </p>
          <ul>
            <li>
              <p>
                <strong>Less back-and-forth:</strong> fewer clarification messages in chat.
              </p>
            </li>
            <li>
              <p>
                <strong>Faster revisions:</strong> editors batch fixes by time ranges.
              </p>
            </li>
            <li>
              <p>
                <strong>Cleaner approvals:</strong> stakeholders see what is still open at a glance.
              </p>
            </li>
          </ul>
          <p>
            For the platform overview, see <NextLink href="/platform/review-video">Review Video</NextLink>.
          </p>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[2])}>{TOC_SECTIONS[2]}</h2>
          <ol>
            <li>
              <p>
                <strong>Watch once without pausing</strong> for gut-check story and pacing.
              </p>
            </li>
            <li>
              <p>
                <strong>Take a second pass</strong> with timestamped notes for required changes.
              </p>
            </li>
            <li>
              <p>
                <strong>Tag severity</strong> (blocking vs polish) if your tool supports it—or state it in the comment.
              </p>
            </li>
            <li>
              <p>
                <strong>Add visual markup</strong> when words alone would be ambiguous.
              </p>
            </li>
            <li>
              <p>
                <strong>Share one review link</strong> so notes stay consolidated.
              </p>
            </li>
          </ol>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[3])}>{TOC_SECTIONS[3]}</h2>
          <ul>
            <li>
              <p>
                <strong>Quote what you see:</strong> reference dialogue, on-screen text, or shot type.
              </p>
            </li>
            <li>
              <p>
                <strong>Propose outcomes:</strong> “tighten by 0.5s” beats “feels slow.”
              </p>
            </li>
            <li>
              <p>
                <strong>Respect audio:</strong> call out levels, music edits, and legal sfx separately from picture
                notes.
              </p>
            </li>
            <li>
              <p>
                <strong>Close the loop:</strong> resolve or reply when a fix is verified on the next upload.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[4])}>{TOC_SECTIONS[4]}</h2>
          <p>
            The interactive preview below mirrors uploading a cut and leaving time-anchored feedback. When you are ready,{' '}
            <NextLink href="/sign-up">start a 7-day trial</NextLink> or{' '}
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
          sectionIntro={
            'Below are free tools that pair with video review, plus related guides and platform features to explore next.'
          }
          toolsTitle="Free tools for video review"
          toolsDescription="Try tools that complement frame-accurate feedback, proofing, and collaboration."
          tools={getFreeToolsForPlatform('/platform/review-video')}
          articlesTitle="More guides and examples"
          articlesDescription="Read more about video feedback, annotation, and approvals."
          articles={relatedArticles}
          articlesMax={3}
          resourcesTitle="More resources"
          resourcesDescription="Capabilities that support video annotation, review, and secure storage."
          resources={getRelatedResources(['videoAnnotation', 'commentOnVideo', 'reviewApproval']).map(
            (resource, index) => {
              if (index === 0) return { ...resource, icon: 'paint' };
              if (index === 1) return { ...resource, icon: 'reply' };
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
              {REVIEW_VIDEO_FAQS.map((faq) => (
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
                video review workflow that fits your team.
              </p>
            </div>
          </div>
        </section>

        <CTASection
          layout="split"
          splitTone="guide"
          title="Ready to review video the clear way?"
          description={
            'Pin feedback to timecode, add markup when it helps, and keep every version easy to compare and approve.'
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
