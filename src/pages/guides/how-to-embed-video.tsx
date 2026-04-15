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
import { EmbedVideoFeatureCardSections } from '../../components/shared/EmbedVideoFeatureCardSections';
import { FAQStructuredData } from '../../components/shared/FAQStructuredData';
import { InteractiveReviewToolPreview } from '../../components/shared/InteractiveReviewToolPreview';
import {
  EMBED_VIDEO_GUIDE_GENERAL_FAQS,
  EMBED_VIDEO_PLATFORM_FAQS,
} from '../../data/embed-video-marketing';
import { getPlatformArticles } from '../../data/platform-articles';
import { getFreeToolsForPlatform } from '../../data/platform-free-tools';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';
import { SectionStoryblok } from '../../typings/storyblok';
import { getHeadingId } from '../../utils/storyblok';

const DOCUMENT_TITLE = 'How to Embed Video on a Website, CMS, and in Client Review Workflows';
const META_DESCRIPTION =
  'Learn how to embed video with iframes and CMS blocks, keep playback responsive, and use Kreatli’s video embedder for review-ready links, frame-accurate comments, and approvals.';
const PUBLISH_DATE = '2026-04-05 00:00';
const READ_TIME = '15';
const CANONICAL_PATH = '/guides/how-to-embed-video';
/** Horizontal cover for social / OG / hero. Use ~1800–2400px wide for a sharp hero on retina. */
const GUIDE_COVER_SRC = '/images/guides/how-to-embed-video-cover.png';
const GUIDE_OG_IMAGE_URL = GUIDE_COVER_SRC;

/** Same blok shape as Storyblok `section` (first item on CMS guide pages). */
const HOW_TO_EMBED_VIDEO_HERO_BLOK: SectionStoryblok = {
  _uid: 'static-how-to-embed-video-hero',
  component: 'section',
  title: 'How to Embed Video on a Website, in Your CMS, and for Client Review',
  titleTag: 'h1',
  text: 'A practical guide for marketers, creators, and agencies: classic iframe and CMS embeds, plus how review teams use Kreatli’s video embedder for embed-style links, frame-accurate feedback, and approvals.',
  orientation: '',
  displaySocials: false,
  imageObjectFit: 'contain',
  image: {
    _uid: 'static-how-to-embed-cover',
    id: null,
    alt: 'Kreatli Guide: How to Embed Video',
    name: '',
    focus: '',
    source: '',
    title: 'How to embed video',
    filename: GUIDE_COVER_SRC,
    copyright: '',
    fieldtype: 'asset',
  },
};

const TOC_SECTIONS = [
  'What it means to embed a video',
  'How to embed video from common hosts',
  'Responsive layout, autoplay, and privacy',
  'Embedding video for client review and approvals',
  'Try the review embed experience',
  'Where to place embedded review video',
  'Why a video embedder helps with review and approvals',
  'Free tools, guides, and platform features',
  'FAQ: How to embed video',
] as const;

const ALL_GUIDE_FAQS = [...EMBED_VIDEO_GUIDE_GENERAL_FAQS, ...EMBED_VIDEO_PLATFORM_FAQS];

export default function HowToEmbedVideoGuidePage() {
  useSession();

  const relatedArticles = getPlatformArticles('/platform/embed-video').filter(
    (article) => article.full_slug !== '/guides/how-to-embed-video',
  );

  const tocLinks = TOC_SECTIONS.map((label) => ({
    label,
    url: `#${getHeadingId(label)}`,
  }));

  return (
    <>
      <FAQStructuredData faqs={ALL_GUIDE_FAQS} />
      <GuidePageLayout
        documentTitle={DOCUMENT_TITLE}
        metaDescription={META_DESCRIPTION}
        canonicalPath={CANONICAL_PATH}
        ogImageUrl={GUIDE_OG_IMAGE_URL}
        ogImageAlt="Kreatli Guide: How to Embed Video"
        publishDate={PUBLISH_DATE}
        readTimeMinutes={READ_TIME}
        breadcrumbLabel={DOCUMENT_TITLE}
        tocLinks={tocLinks}
      >
        <Section blok={HOW_TO_EMBED_VIDEO_HERO_BLOK} />

        <GuideSectionRule />

        <div className={wysiwygStyles.wysiwyg}>
          <p>
            <strong>How to embed video</strong> usually means you place a hosted player inside another webpage so
            visitors can watch without leaving the page. Most teams do this in one of two ways: pasting an{' '}
            <strong>iframe</strong> embed code from a host like YouTube or Vimeo, or using a CMS “video” block that
            pulls the URL via <strong>oEmbed</strong>. For creative workflows, you may instead share a{' '}
            <strong>review-ready link or embed-style review experience</strong> so clients can watch and leave
            frame-accurate feedback—see{' '}
            <NextLink href="/platform/embed-video">Kreatli’s embed video workflow for review and approvals</NextLink>.
          </p>

          <KeyTakeaways
            items={[
              'Use an iframe or CMS embed block to place video on any page — the embed code comes from the hosting platform.',
              'Keep embeds responsive by using a 16:9 aspect-ratio wrapper or the hosting platform\'s responsive snippet.',
              'For client review, use a review-ready embed link that supports comments, approvals, and version tracking.',
              'Avoid auto-playing embedded video with sound — most browsers block it and it hurts user experience.',
            ]}
          />

          <h2 id={getHeadingId(TOC_SECTIONS[0])}>{TOC_SECTIONS[0]}</h2>
          <p>
            Embedding keeps playback inside your site or app while the file stays on a video host or review platform.
            The page loads a player (often an iframe) that streams the video from the provider’s servers.
          </p>
          <ul>
            <li>
              <p>
                <strong>Embed code (iframe):</strong> HTML copied from the host’s share or embed dialog.
              </p>
            </li>
            <li>
              <p>
                <strong>oEmbed / CMS blocks:</strong> You paste a URL; the CMS requests embed HTML from the provider.
              </p>
            </li>
            <li>
              <p>
                <strong>Hosted review player:</strong> A shareable page or embed-style experience for approvals—common
                for agencies and production teams reviewing cuts with clients.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[1])}>{TOC_SECTIONS[1]}</h2>
          <p>Exact buttons vary by product, but the pattern is the same across most hosts:</p>
          <ol>
            <li>
              <p>
                Upload or open the video on the host and confirm privacy settings (public, unlisted, or
                password-protected).
              </p>
            </li>
            <li>
              <p>Open the share or embed panel and copy either the video URL or the iframe embed code.</p>
            </li>
            <li>
              <p>
                In your CMS or site builder, add a video or embed block and paste the URL or code. Publish and test on
                mobile.
              </p>
            </li>
          </ol>
          <p>
            If you use WordPress, Webflow, Notion, or similar tools, prefer the native video block when available—it
            often handles responsive sizing better than raw iframe snippets.
          </p>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[2])}>{TOC_SECTIONS[2]}</h2>
          <ul>
            <li>
              <p>
                <strong>Responsive:</strong> Wrap fixed-size iframes in a responsive container or use the host’s
                responsive embed option so the player scales on phones.
              </p>
            </li>
            <li>
              <p>
                <strong>Autoplay:</strong> Many browsers block sound-on autoplay; if you enable autoplay, expect muted
                playback and test across Safari and Chrome.
              </p>
            </li>
            <li>
              <p>
                <strong>Privacy and cookies:</strong> Third-party players can set cookies or load trackers; use
                privacy-enhanced embed modes when your legal team requires it.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[3])}>{TOC_SECTIONS[3]}</h2>
          <p>
            Marketing sites embed video for reach. Creative teams also need embed-like experiences for review:
            stakeholders open one link, watch in high quality, and comment without downloading files or juggling
            versions. Use Kreatli as your <strong>free video embedder</strong> for review: share embedded, review-ready
            video with frame-accurate comments, drawings, and approvals—matching the same workflow as our{' '}
            <NextLink href="/platform/embed-video">embed video platform page</NextLink>.
          </p>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[4])}>{TOC_SECTIONS[4]}</h2>
          <p>
            The interactive preview below uses the same review UI as our platform page: upload a clip, scrub the
            timeline, and leave frame-accurate comments. When you are ready to go further,{' '}
            <NextLink href="/sign-up">start a 7-day trial</NextLink>,{' '}
            <a href="https://calendar.app.google/NXbAeTAUwaBGh5x49" target="_blank" rel="noopener noreferrer nofollow">
              book a demo
            </a>
            , or read the{' '}
            <NextLink href="/platform/embed-video">embed video product tour</NextLink>
            .
          </p>

          <div className="my-4 w-full">
            <InteractiveReviewToolPreview />
          </div>
        </div>

        <GuideSectionRule />

        <EmbedVideoFeatureCardSections
          variant="guide"
          destinationsTocLabel={TOC_SECTIONS[5]}
          destinationsHeading="Embed Video in the Tools You Already Use"
          destinationsIntro="Drop review-ready video embeds into portals, intranets, docs, and workspaces so stakeholders can watch and comment where they already work—without breaking your feedback workflow."
          whyTocLabel={TOC_SECTIONS[6]}
          whyHeading="Why Use a Video Embedder for Reviews?"
          whyIntro="Embedding videos where stakeholders already work makes feedback faster, clearer, and easier to track—without adding extra tools or login friction to the process."
        />

        <GuideSectionRule />

        <GuideArticleToolsResourcesSection
          tocHeadingId={getHeadingId(TOC_SECTIONS[7])}
          tocHeadingLabel={TOC_SECTIONS[7]}
          sectionIntro="Below are free tools that pair with embedded video review, guides that go deeper on workflow, and related platform areas you may want to explore next."
          toolsTitle="Free tools for video teams"
          toolsDescription="These free tools complement embed-style review: link sharing, frame-accurate feedback, and lightweight project organization."
          tools={getFreeToolsForPlatform('/platform/embed-video')}
          articlesTitle="See how embedded video review works in practice"
          articlesDescription="These guides and resources expand on review, approvals, and collaboration with Kreatli."
          articles={relatedArticles}
          articlesMax={3}
          resourcesTitle="More resources"
          resourcesDescription="Platform capabilities that support video review, annotation, secure storage, and embedded collaboration workflows."
          resources={getRelatedResources(['reviewApproval', 'videoAnnotation', 'secureAssetStorage']).map(
            (resource, index) => {
              if (index === 0) {
                return { ...resource, icon: 'link' };
              }
              if (index === 1) {
                return { ...resource, icon: 'paint' };
              }
              return resource;
            },
          )}
        />

        <GuideSectionRule />

        <section className="relative pb-0 pt-12 md:pb-0 md:pt-16">
          <div className="relative z-10 mx-auto max-w-3xl">
            <div className={cn(wysiwygStyles.wysiwyg, '[&>h2:first-child]:!mt-0')}>
              <h2 id={getHeadingId(TOC_SECTIONS[8])}>{TOC_SECTIONS[8]}</h2>
            </div>
            <div className="mt-6 flex flex-col gap-5 sm:gap-6">
              {ALL_GUIDE_FAQS.map((faq) => (
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
                Reach us at{' '}
                <a href="mailto:support@kreatli.com">support@kreatli.com</a> to talk through embedded video review for
                your workflow.
              </p>
            </div>
          </div>
        </section>

        <CTASection
          layout="split"
          splitTone="guide"
          title="Ready to see how it works?"
          description="Visit Kreatli to explore project templates, playback reviews, and file exchange views that streamline creative production."
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
