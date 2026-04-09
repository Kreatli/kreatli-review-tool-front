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

const DOCUMENT_TITLE = 'How to Comment a Video: Timestamped Feedback That Editors Can Act On';
const META_DESCRIPTION =
  'Learn how to comment a video with timestamped notes, clear context, and version-aware review so teams can iterate faster without confusing email threads.';
const PUBLISH_DATE = '2026-04-09 00:10';
const READ_TIME = '10';
const CANONICAL_PATH = '/guides/how-to-comment-a-video';
/** Horizontal cover for social / OG / hero. Use ~1800–2400px wide for a sharp hero on retina. */
const GUIDE_COVER_SRC = '/images/guides/how-to-comment-a-video-cover.png';
const GUIDE_OG_IMAGE_URL = GUIDE_COVER_SRC;

const HOW_TO_COMMENT_A_VIDEO_HERO_BLOK: SectionStoryblok = {
  _uid: 'static-how-to-comment-a-video-hero',
  component: 'section',
  title: 'How to Comment a Video',
  titleTag: 'h1',
  text: 'A practical guide for teams reviewing video: leave timestamped comments, keep context tied to the exact frame, and move approvals forward without hunting through email.',
  orientation: '',
  displaySocials: false,
  imageObjectFit: 'contain',
  image: {
    _uid: 'static-how-to-comment-a-video-cover',
    id: null,
    alt: 'Kreatli Guide: How to comment a video',
    name: '',
    focus: '',
    source: '',
    title: 'How to comment a video',
    filename: GUIDE_COVER_SRC,
    copyright: '',
    fieldtype: 'asset',
  },
};

const TOC_SECTIONS = [
  'What it means to “comment a video”',
  'Why timestamped comments beat generic notes',
  'How to comment a video (step-by-step)',
  'Best practices for clear video comments',
  'Try commenting on a video now',
  'Free tools, guides, and platform features',
  'FAQ: Comment a video',
] as const;

const COMMENT_A_VIDEO_FAQS = [
  {
    question: 'What is a timestamped video comment?',
    answer:
      'A timestamped comment is feedback pinned to a specific moment in the video (for example, 00:32). When reviewers play or scrub, the comment stays tied to the exact frame/time so editors know precisely where the change applies.',
  },
  {
    question: 'Should I leave one comment per issue or group multiple notes together?',
    answer:
      'Prefer one issue per comment. It makes feedback easier to resolve, track, and confirm. If you bundle multiple unrelated changes into one message, it’s harder to know what’s done and what’s still pending.',
  },
  {
    question: 'Can I draw on a video frame while commenting?',
    answer:
      'Yes. For visual issues (composition, UI overlap, blur/privacy, brand details), combining a timestamped comment with a quick frame drawing (arrow, box, highlight) removes ambiguity.',
  },
  {
    question: 'How do I handle new cuts or versions of a video during review?',
    answer:
      'Use version-aware review. Keep comments and approvals attached to the specific version they were made on, so you can compare cuts, see what’s been addressed, and avoid applying old feedback to the wrong file.',
  },
  {
    question: 'Can clients comment without creating an account?',
    answer:
      'Yes—when you share a guest-friendly review link, clients can watch and leave timestamped comments without signing up. This reduces friction while keeping all feedback in one place.',
  },
] as const;

export default function HowToCommentAVideoGuidePage() {
  useSession();

  const relatedArticles = getPlatformArticles('/platform/comment-on-video').filter(
    (article) => article.full_slug !== '/guides/how-to-comment-a-video',
  );

  const tocLinks = TOC_SECTIONS.map((label) => ({
    label,
    url: `#${getHeadingId(label)}`,
  }));

  return (
    <>
      <FAQStructuredData faqs={[...COMMENT_A_VIDEO_FAQS]} />
      <GuidePageLayout
        documentTitle={DOCUMENT_TITLE}
        metaDescription={META_DESCRIPTION}
        canonicalPath={CANONICAL_PATH}
        ogImageUrl={GUIDE_OG_IMAGE_URL}
        ogImageAlt="Kreatli Guide: How to comment a video"
        publishDate={PUBLISH_DATE}
        readTimeMinutes={READ_TIME}
        breadcrumbLabel={DOCUMENT_TITLE}
        tocLinks={tocLinks}
      >
        <Section blok={HOW_TO_COMMENT_A_VIDEO_HERO_BLOK} />

        <GuideSectionRule />

        <div className={wysiwygStyles.wysiwyg}>
          <p>
            <strong>How to comment a video</strong> is less about writing a long message and more about leaving feedback
            at the exact moment it matters. The best workflow is <strong>timestamped comments</strong> (and optional
            frame drawings) so editors don’t have to guess which shot or second you meant.
          </p>

          <h2 id={getHeadingId(TOC_SECTIONS[0])}>{TOC_SECTIONS[0]}</h2>
          <p>
            In review workflows, “commenting a video” means your note is anchored to a specific timecode (and often a
            specific frame). Reviewers can jump directly to each comment, and teams can track what’s resolved across
            rounds.
          </p>
          <ul>
            <li>
              <p>
                <strong>Timecode pin:</strong> the comment is tied to a moment (for example 00:18).
              </p>
            </li>
            <li>
              <p>
                <strong>Context:</strong> what to change, why it matters, and what success looks like.
              </p>
            </li>
            <li>
              <p>
                <strong>Version clarity:</strong> feedback stays tied to the cut it was made on.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[1])}>{TOC_SECTIONS[1]}</h2>
          <p>
            Generic notes like “the middle feels slow” create extra back-and-forth. Timestamped comments reduce that
            churn because the editor sees the exact moment and frame you mean.
          </p>
          <ul>
            <li>
              <p>
                <strong>Faster iteration:</strong> editors can jump to 00:32 and make the change immediately.
              </p>
            </li>
            <li>
              <p>
                <strong>Less ambiguity:</strong> “trim 8 frames here” is clearer than “tighten this part.”
              </p>
            </li>
            <li>
              <p>
                <strong>Better approvals:</strong> stakeholders can confirm the fix at the same timestamp.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[2])}>{TOC_SECTIONS[2]}</h2>
          <ol>
            <li>
              <p>
                <strong>Upload or open the video</strong> in your review workspace.
              </p>
            </li>
            <li>
              <p>
                <strong>Play to the moment</strong> you want to address, then pause on the frame that best shows the
                issue.
              </p>
            </li>
            <li>
              <p>
                <strong>Write the comment</strong> with clear action + intent (what to change and why).
              </p>
            </li>
            <li>
              <p>
                <strong>(Optional) Draw on the frame</strong> with an arrow, box, or highlight to remove any doubt about
                “this part.”
              </p>
            </li>
            <li>
              <p>
                <strong>Share a review link</strong> so everyone comments in one place, then track resolution and
                approvals.
              </p>
            </li>
          </ol>
          <p>
            For the product overview version, see <NextLink href="/platform/comment-on-video">Comment on Video</NextLink>.
          </p>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[3])}>{TOC_SECTIONS[3]}</h2>
          <ul>
            <li>
              <p>
                <strong>One idea per comment:</strong> split notes so each one can be resolved independently.
              </p>
            </li>
            <li>
              <p>
                <strong>Describe the outcome:</strong> “match pacing to the previous shot” is more useful than “feels
                weird.”
              </p>
            </li>
            <li>
              <p>
                <strong>Call out constraints:</strong> brand rules, legal copy, safe zones, or platform requirements.
              </p>
            </li>
            <li>
              <p>
                <strong>Use drawings when spatial:</strong> arrows and boxes are perfect for UI overlap, blur areas, or
                composition adjustments.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[4])}>{TOC_SECTIONS[4]}</h2>
          <p>
            The interactive preview below mirrors a simple review flow: upload a clip, scrub to a moment, and leave a
            timestamped comment (plus optional drawings). When you are ready, <NextLink href="/sign-up">start a 7-day trial</NextLink>{' '}
            or{' '}
            <a href="https://calendar.app.google/NXbAeTAUwaBGh5x49" target="_blank" rel="noopener noreferrer">
              book a demo
            </a>
            .
          </p>

          <div className="my-4 w-full">
            <InteractiveReviewToolPreview />
          </div>
        </div>

        <GuideSectionRule />

        <GuideArticleToolsResourcesSection
          tocHeadingId={getHeadingId(TOC_SECTIONS[5])}
          tocHeadingLabel={TOC_SECTIONS[5]}
          sectionIntro="Below are free tools that pair with timestamped video comments, plus related guides and platform features to explore next."
          toolsTitle="Free tools for video feedback"
          toolsDescription="Try tools that complement timestamped comments, visual markup, and approval workflows."
          tools={getFreeToolsForPlatform('/platform/comment-on-video')}
          articlesTitle="More guides and examples"
          articlesDescription="Read more about review, approvals, and frame-accurate annotation workflows."
          articles={relatedArticles}
          articlesMax={3}
          resourcesTitle="More resources"
          resourcesDescription="Capabilities that support commenting, annotation, approvals, and secure storage."
          resources={getRelatedResources(['commentOnVideo', 'reviewApproval', 'videoAnnotation']).map((resource, index) => {
            if (index === 0) return { ...resource, icon: 'reply' };
            if (index === 1) return { ...resource, icon: 'checkCircle' };
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
              {COMMENT_A_VIDEO_FAQS.map((faq) => (
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
                video review flow that fits your team.
              </p>
            </div>
          </div>
        </section>

        <CTASection
          layout="split"
          splitTone="guide"
          title="Ready for clear, timestamped feedback?"
          description="Collect frame-accurate comments, keep versions organized, and move approvals forward without losing context."
          primaryButtonText="Start for Free"
          primaryButtonHref="/sign-up"
          splitPromoImageSrc="/images/guides/embed-video-cta.png"
          splitPromoImageAlt="Kreatli platform: tasks, video review with frame pins, media library, and version compare"
        />
      </GuidePageLayout>
      <SignUpModal />
    </>
  );
}

