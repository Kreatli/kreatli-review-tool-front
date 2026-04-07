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
import { SITE_URL } from '../../components/shared/SeoHead';
import { getPlatformArticles } from '../../data/platform-articles';
import { getFreeToolsForPlatform } from '../../data/platform-free-tools';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';
import { SectionStoryblok } from '../../typings/storyblok';
import { getHeadingId } from '../../utils/storyblok';

const DOCUMENT_TITLE = 'How to Add Drawing to Video: Draw on Frames for Clear, Frame-Accurate Feedback';
const META_DESCRIPTION =
  'Learn how to add drawing to video: use arrows, boxes, highlights, and freehand markup on exact frames so editors and clients understand changes instantly.';
const PUBLISH_DATE = '2026-04-07 00:00';
const READ_TIME = '12';
const CANONICAL_PATH = '/guides/how-to-add-drawing-to-video';
/** Horizontal cover for social / OG / hero. Use ~1800–2400px wide for a sharp hero on retina. */
const GUIDE_COVER_SRC = '/images/guides/how-to-add-drawing-to-video.png';
const GUIDE_OG_IMAGE_URL = `${SITE_URL}${GUIDE_COVER_SRC}`;

/** Same blok shape as Storyblok `section` (first item on CMS guide pages). */
const ADD_DRAWING_TO_VIDEO_HERO_BLOK: SectionStoryblok = {
  _uid: 'static-how-to-add-drawing-to-video-hero',
  component: 'section',
  title: 'How to Add Drawing to Video',
  titleTag: 'h1',
  text: 'A practical guide for teams reviewing video: draw directly on frames with arrows, boxes, highlights, and freehand markup—then keep those drawings tied to the exact timestamp for faster approvals.',
  orientation: '',
  displaySocials: false,
  imageObjectFit: 'contain',
  image: {
    _uid: 'static-how-to-add-drawing-to-video-cover',
    id: null,
    alt: 'Kreatli Guide: How to add drawing to video',
    name: '',
    focus: '',
    source: '',
    title: 'How to add drawing to video',
    filename: GUIDE_COVER_SRC,
    copyright: '',
    fieldtype: 'asset',
  },
};

const TOC_SECTIONS = [
  'What does “add drawing to video” mean?',
  'When drawing on video beats text-only comments',
  'How to add drawings to a video (step-by-step)',
  'Best practices: arrows, boxes, colors, and clarity',
  'Try drawing on a video now',
  'Free tools, guides, and platform features',
  'FAQ: Add drawing to video',
] as const;

const ADD_DRAWING_TO_VIDEO_FAQS = [
  {
    question: 'What does “add drawing to video” mean in Kreatli?',
    answer:
      'In Kreatli, “add drawing to video” means you can draw directly on video frames using arrows, boxes, highlights, and freehand markup that stay attached to the exact frame and timestamp. Instead of describing changes in plain text like “adjust this part around 0:25,” you visually point to the exact area that needs attention so editors and collaborators know what to change.',
  },
  {
    question: 'What kinds of drawing tools can I use on video frames?',
    answer:
      'You can use freehand drawing, rectangles and circles to highlight regions, arrows and pointers to call out specific elements, and color-coded markup to distinguish different kinds of feedback. Pair drawings with frame-accurate comments so every arrow, box, or highlight has clear written context.',
  },
  {
    question: 'How are drawings linked to timestamps and frames?',
    answer:
      'Drawings are pinned to an exact frame and timestamp in the video player. When you scrub or play the video, markup appears at the moment it was created and disappears when you move away from that frame range, keeping the timeline readable. Reviewers can jump from a drawing to the exact frame where feedback was given.',
  },
  {
    question: 'Can clients draw on videos without creating an account?',
    answer:
      'Yes—when you share a guest-friendly review link, external stakeholders can watch, draw on frames, and leave comments without creating an account. This reduces friction while keeping all drawings and feedback attached to the right file and version.',
  },
  {
    question: 'Do drawings stay in sync across new versions of a video?',
    answer:
      'Kreatli keeps drawings, comments, and approvals organized by version so you always know which feedback belongs to which cut. When you upload a new version, you can compare changes, see what feedback has been addressed, and decide which drawings still apply.',
  },
] as const;

export default function HowToAddDrawingToVideoGuidePage() {
  useSession();

  const relatedArticles = getPlatformArticles('/platform/add-drawing-to-video').filter(
    (article) => article.full_slug !== '/guides/how-to-add-drawing-to-video',
  );

  const tocLinks = TOC_SECTIONS.map((label) => ({
    label,
    url: `#${getHeadingId(label)}`,
  }));

  return (
    <>
      <FAQStructuredData faqs={[...ADD_DRAWING_TO_VIDEO_FAQS]} />
      <GuidePageLayout
        documentTitle={DOCUMENT_TITLE}
        metaDescription={META_DESCRIPTION}
        canonicalPath={CANONICAL_PATH}
        ogImageUrl={GUIDE_OG_IMAGE_URL}
        ogImageAlt="Kreatli Guide: How to add drawing to video"
        publishDate={PUBLISH_DATE}
        readTimeMinutes={READ_TIME}
        breadcrumbLabel={DOCUMENT_TITLE}
        tocLinks={tocLinks}
      >
        <Section blok={ADD_DRAWING_TO_VIDEO_HERO_BLOK} />

        <GuideSectionRule />

        <div className={wysiwygStyles.wysiwyg}>
          <p>
            <strong>Add drawing to video</strong> means reviewers can mark up a frame the same way they would mark up a
            screenshot: circle what matters, point with arrows, highlight text, and sketch over problem areas. The key
            is that those drawings stay <strong>frame-accurate</strong>, so “this part” is never ambiguous.
          </p>

          <h2 id={getHeadingId(TOC_SECTIONS[0])}>{TOC_SECTIONS[0]}</h2>
          <p>
            In creative review, “drawing on a video” is visual feedback anchored to the timeline. A drawing isn’t a
            separate screenshot—it’s markup that shows up on the exact frame where the note was created, alongside a
            comment that explains the intent.
          </p>
          <ul>
            <li>
              <p>
                <strong>Arrows and pointers</strong> to call out a specific object, layer, or motion path.
              </p>
            </li>
            <li>
              <p>
                <strong>Boxes and circles</strong> to isolate UI elements, faces, titles, or safe-area issues.
              </p>
            </li>
            <li>
              <p>
                <strong>Highlights</strong> to mark text, contrast problems, or brand alignment details.
              </p>
            </li>
            <li>
              <p>
                <strong>Freehand markup</strong> for quick sketches and “move it like this” ideas.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[1])}>{TOC_SECTIONS[1]}</h2>
          <p>
            Text-only comments work when feedback is simple (“trim 2 seconds at the end”). Drawing is better when the
            note is spatial, visual, or easy to misunderstand.
          </p>
          <ul>
            <li>
              <p>
                <strong>Composition changes:</strong> “move the logo left” becomes a box around the logo plus an arrow.
              </p>
            </li>
            <li>
              <p>
                <strong>Blur and privacy:</strong> circle a face or license plate to avoid confusion.
              </p>
            </li>
            <li>
              <p>
                <strong>UI and motion:</strong> point at the exact element that flickers, overlaps, or animates wrong.
              </p>
            </li>
            <li>
              <p>
                <strong>Brand details:</strong> highlight typography, spacing, and color inconsistencies quickly.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[2])}>{TOC_SECTIONS[2]}</h2>
          <ol>
            <li>
              <p>
                <strong>Upload your video</strong> to a review workspace (or open the existing cut/version).
              </p>
            </li>
            <li>
              <p>
                <strong>Play to the moment that needs changes</strong>, then pause on the frame that tells the story.
              </p>
            </li>
            <li>
              <p>
                <strong>Draw on the frame</strong> using arrows, shapes, highlights, or freehand markup.
              </p>
            </li>
            <li>
              <p>
                <strong>Add a short comment</strong> explaining the “why” (what to change and what success looks like).
              </p>
            </li>
            <li>
              <p>
                <strong>Share a review link</strong> so clients and teammates can add drawings and approve without
                chasing email threads.
              </p>
            </li>
          </ol>
          <p>
            If you want the product overview version of this workflow, see{' '}
            <NextLink href="/platform/add-drawing-to-video">Add Drawing To Video</NextLink>.
          </p>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[3])}>{TOC_SECTIONS[3]}</h2>
          <ul>
            <li>
              <p>
                <strong>Use one idea per drawing:</strong> too many marks on one frame can create confusion.
              </p>
            </li>
            <li>
              <p>
                <strong>Color-code with intent:</strong> for example, red = fix, yellow = check, green = approved.
              </p>
            </li>
            <li>
              <p>
                <strong>Pair drawings with text:</strong> the drawing shows <em>where</em>; the comment explains{' '}
                <em>what</em> and <em>why</em>.
              </p>
            </li>
            <li>
              <p>
                <strong>Be frame-accurate:</strong> pause on the frame that best represents the issue before marking it
                up.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[4])}>{TOC_SECTIONS[4]}</h2>
          <p>
            The interactive preview below mirrors a real review flow: upload a clip, scrub to a frame, draw on it, and
            leave a comment. When you are ready to use this with clients, <NextLink href="/sign-up">start a 7-day trial</NextLink>{' '}
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
          sectionIntro="Below are free tools that pair with visual video review, plus guides and platform features that help teams keep drawings, feedback, and approvals organized."
          toolsTitle="Free tools for video teams"
          toolsDescription="Try free tools that complement review-ready links, frame-accurate feedback, and lightweight delivery workflows."
          tools={getFreeToolsForPlatform('/platform/add-drawing-to-video')}
          articlesTitle="More guides and examples"
          articlesDescription="Read more about review, approvals, and video annotation workflows."
          articles={relatedArticles}
          articlesMax={3}
          resourcesTitle="More resources"
          resourcesDescription="Platform capabilities that support annotation, approvals, and secure creative collaboration."
          resources={getRelatedResources(['reviewApproval', 'videoAnnotation', 'secureAssetStorage']).map(
            (resource, index) => {
              if (index === 0) return { ...resource, icon: 'paint' };
              if (index === 1) return { ...resource, icon: 'link' };
              return resource;
            },
          )}
        />

        <GuideSectionRule />

        <section className="relative py-12 md:py-16">
          <div className="relative z-10 mx-auto max-w-3xl">
            <div className={cn(wysiwygStyles.wysiwyg, '[&>h2:first-child]:!mt-0')}>
              <h2 id={getHeadingId(TOC_SECTIONS[6])}>{TOC_SECTIONS[6]}</h2>
            </div>
            <div className="mt-6 flex flex-col gap-5 sm:gap-6">
              {ADD_DRAWING_TO_VIDEO_FAQS.map((faq) => (
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
                Reach us at <a href="mailto:support@kreatli.com">support@kreatli.com</a> and we will help you pick a
                review setup that fits your team.
              </p>
            </div>
          </div>
        </section>

        <CTASection
          layout="split"
          splitTone="guide"
          title="Ready to give clear visual feedback?"
          description="Draw directly on video frames, keep comments tied to the right timestamp, and move approvals forward without losing context."
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

