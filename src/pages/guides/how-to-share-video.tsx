import { cn } from '@heroui/react';
import NextLink from 'next/link';

import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';
import { GuideArticleToolsResourcesSection } from '../../components/guides/GuideArticleToolsResourcesSection';
import { GuidePageLayout } from '../../components/guides/GuidePageLayout';
import { GuideSectionRule } from '../../components/guides/GuideSectionRule';
import { ShareFeaturePreview } from '../../components/home/Features/ShareFeaturePreview';
import { Section } from '../../components/layout/Storyblok/Section/Section';
import wysiwygStyles from '../../components/layout/Storyblok/Wysiwyg/Wysiwyg.module.scss';
import { CTASection } from '../../components/shared/CTASection';
import { FAQStructuredData } from '../../components/shared/FAQStructuredData';
import { getPlatformArticles } from '../../data/platform-articles';
import { getFreeToolsForPlatform } from '../../data/platform-free-tools';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';
import { SectionStoryblok } from '../../typings/storyblok';
import { getHeadingId } from '../../utils/storyblok';

const DOCUMENT_TITLE = 'How to Share Video: Links, Privacy Settings, and Review-Ready Sharing';
const META_DESCRIPTION =
  'Learn how to share video the right way: choose between watch links and file links, set privacy and expiration, and use a review-ready link when feedback and approvals matter.';
const PUBLISH_DATE = '2026-04-07 00:00';
const READ_TIME = '12';
const CANONICAL_PATH = '/guides/how-to-share-video';
const GUIDE_COVER_SRC = '/images/guides/how-to-share-video-cover.png';
const GUIDE_OG_IMAGE_URL = GUIDE_COVER_SRC;

const HOW_TO_SHARE_VIDEO_HERO_BLOK: SectionStoryblok = {
  _uid: 'static-how-to-share-video-hero',
  component: 'section',
  title: 'How to Share Video',
  titleTag: 'h1',
  text: 'A practical guide to sharing video by link or file, choosing the right privacy settings, and sending review-ready links when you need clear feedback and approvals.',
  orientation: '',
  displaySocials: false,
  imageObjectFit: 'contain',
  image: {
    _uid: 'static-how-to-share-video-cover',
    id: null,
    alt: 'Kreatli Guide: How to share video',
    name: '',
    focus: '',
    source: '',
    title: 'How to share video',
    filename: GUIDE_COVER_SRC,
    copyright: '',
    fieldtype: 'asset',
  },
};

const TOC_SECTIONS = [
  'What “share video” means (link vs file vs review link)',
  'Choose the best way to share video (by audience)',
  'How to share video as a link (typical flow)',
  'Privacy, permissions, and expiration',
  'Share video for feedback and approvals (review-ready)',
  'Try sharing video with a review-ready link',
  'Free tools, guides, and platform features',
  'FAQ: How to share video',
] as const;

const SHARE_VIDEO_GUIDE_FAQS = [
  {
    question: 'What is the best way to share video?',
    answer:
      'The best way to share video depends on your goal. For quick viewing, a watch link from a host is simplest. For delivery of the actual file, a cloud drive or transfer link is better. For client feedback and approvals, a review-ready link keeps comments tied to timecode and avoids confusing email threads.',
  },
  {
    question: 'How do I share video without it being public?',
    answer:
      'Use privacy modes like unlisted, link-only, or restricted access (invited emails). If the video is sensitive, add a password, limit downloads, and prefer expiring links. Always test the recipient experience in an incognito window to confirm what people can see without your login.',
  },
  {
    question: 'Why can’t someone open my video link?',
    answer:
      'Common causes are permission settings, expired links, or login walls. Cloud drive links can be restricted to your organization, and transfer links often expire by design. If you are sharing with clients, choose “anyone with the link” only when appropriate, and verify the link opens on a fresh browser session.',
  },
  {
    question: 'Is it better to share a file link or a watch link?',
    answer:
      'Watch links are best when the recipient only needs to view. File links are best when they need to download the asset, but they can add friction (large downloads, caps, or permission prompts). If you need feedback, a review link is usually best because it supports time-coded comments and approvals.',
  },
  {
    question: 'How do I share video for approvals and clear feedback?',
    answer:
      'Use a review-ready link that supports comments tied to timecode and keeps versions organized. That way, reviewers can say “change this at 00:32” with a pin, instead of vague notes like “around the middle.”',
  },
] as const;

export default function HowToShareVideoGuidePage() {
  useSession();

  const relatedArticles = getPlatformArticles('/platform/free-video-link-generator').filter(
    (article) => article.full_slug !== '/guides/how-to-share-video',
  );

  const tocLinks = TOC_SECTIONS.map((label) => ({
    label,
    url: `#${getHeadingId(label)}`,
  }));

  return (
    <>
      <FAQStructuredData faqs={[...SHARE_VIDEO_GUIDE_FAQS]} />
      <GuidePageLayout
        documentTitle={DOCUMENT_TITLE}
        metaDescription={META_DESCRIPTION}
        canonicalPath={CANONICAL_PATH}
        ogImageUrl={GUIDE_OG_IMAGE_URL}
        ogImageAlt="Kreatli Guide: How to share video"
        publishDate={PUBLISH_DATE}
        readTimeMinutes={READ_TIME}
        breadcrumbLabel={DOCUMENT_TITLE}
        tocLinks={tocLinks}
      >
        <Section blok={HOW_TO_SHARE_VIDEO_HERO_BLOK} />

        <GuideSectionRule />

        <div className={wysiwygStyles.wysiwyg}>
          <p>
            <strong>How to share video</strong> comes down to one decision: are you sending a{' '}
            <strong>watch link</strong>, a <strong>file link</strong>, or a <strong>review-ready link</strong>? Each
            option changes what the recipient can do (watch vs download), how private it is, and whether feedback stays
            organized.
          </p>

          <h2 id={getHeadingId(TOC_SECTIONS[0])}>{TOC_SECTIONS[0]}</h2>
          <p>People say “share video” but mean different things:</p>
          <ul>
            <li>
              <p>
                <strong>Watch link:</strong> Opens a streaming player on a host. Best when the recipient only needs to
                view.
              </p>
            </li>
            <li>
              <p>
                <strong>File link:</strong> Shares an MP4 (or project file) from cloud storage or a transfer service.
                Best for delivery, but check size limits and expiry.
              </p>
            </li>
            <li>
              <p>
                <strong>Review link:</strong> Opens a review page built for feedback—time-coded comments, drawings on
                frames, and approvals.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[1])}>{TOC_SECTIONS[1]}</h2>
          <p>Use this quick filter to pick the right sharing method:</p>
          <ul>
            <li>
              <p>
                <strong>Sharing to a broad audience:</strong> Use a watch link with the right visibility (public or
                unlisted) and make sure playback works on mobile.
              </p>
            </li>
            <li>
              <p>
                <strong>Delivering a file to a client:</strong> Use a file link with an expiry window and confirm the
                recipient can download without extra permissions.
              </p>
            </li>
            <li>
              <p>
                <strong>Collecting feedback and approvals:</strong> Use a review-ready link so comments stay tied to the
                exact moment and version.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[2])}>{TOC_SECTIONS[2]}</h2>
          <p>Most products follow the same steps:</p>
          <ol>
            <li>
              <p>
                <strong>Upload or select the video</strong> in your host, drive, or review tool.
              </p>
            </li>
            <li>
              <p>
                <strong>Set visibility</strong> (public, unlisted, link-only, password, or restricted to named people).
              </p>
            </li>
            <li>
              <p>
                <strong>Copy the share link</strong> and paste it into email, Slack, or your project brief.
              </p>
            </li>
            <li>
              <p>
                <strong>Test the link</strong> in an incognito window so you know exactly what recipients see.
              </p>
            </li>
          </ol>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[3])}>{TOC_SECTIONS[3]}</h2>
          <ul>
            <li>
              <p>
                <strong>Permissions:</strong> “Anyone with the link” is convenient, but easy to forward. If the cut is
                sensitive, prefer invited emails or workspace access.
              </p>
            </li>
            <li>
              <p>
                <strong>Expiration:</strong> Transfer links may expire quickly; cloud links can change when you move
                files. If the link needs to last, confirm the product’s policy.
              </p>
            </li>
            <li>
              <p>
                <strong>Playback vs download:</strong> Decide whether recipients should be able to download the file or
                only stream it.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[4])}>{TOC_SECTIONS[4]}</h2>
          <p>
            If your goal is “please watch this,” a watch link is enough. If your goal is “please tell me what to change
            and approve v3,” a review-ready link saves time. Kreatli’s approach is similar to our{' '}
            <NextLink href="/platform/free-video-link-generator">free video link generator</NextLink> workflow: share
            one URL, collect frame-accurate notes, and keep approvals tied to the file.
          </p>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[5])}>{TOC_SECTIONS[5]}</h2>
          <p>
            The interactive preview below mirrors a simple “share video by link” flow: add recipients, copy a share URL,
            and think through who should have access. When you are ready,{' '}
            <NextLink href="/sign-up">start a 7-day trial</NextLink> or book a{' '}
            <a href="https://calendar.app.google/NXbAeTAUwaBGh5x49" target="_blank" rel="noopener noreferrer nofollow">
              demo
            </a>
            .
          </p>

          <div className="my-4 w-full">
            <ShareFeaturePreview variant="video" />
          </div>
        </div>

        <GuideSectionRule />

        <GuideArticleToolsResourcesSection
          tocHeadingId={getHeadingId(TOC_SECTIONS[6])}
          tocHeadingLabel={TOC_SECTIONS[6]}
          sectionIntro="Free tools that pair with sharing and review, plus related guides and platform features to explore next."
          toolsTitle="Free tools for sharing video"
          toolsDescription="Try tools that complement link-based video sharing, review, and approvals."
          tools={getFreeToolsForPlatform('/platform/free-video-link-generator')}
          articlesTitle="More guides on sharing and delivery"
          articlesDescription="Deeper reads on delivery workflows, large files, and client-friendly sharing."
          articles={relatedArticles}
          articlesMax={3}
          resourcesTitle="More resources"
          resourcesDescription="Capabilities that support secure sharing, annotation, and structured approvals."
          resources={getRelatedResources(['reviewApproval', 'videoAnnotation', 'secureAssetStorage']).map(
            (resource, index) => {
              if (index === 0) return { ...resource, icon: 'link' };
              if (index === 1) return { ...resource, icon: 'paint' };
              return resource;
            },
          )}
        />

        <GuideSectionRule />

        <section className="relative pb-0 pt-12 md:pb-0 md:pt-16">
          <div className="relative z-10 mx-auto max-w-3xl">
            <div className={cn(wysiwygStyles.wysiwyg, '[&>h2:first-child]:!mt-0')}>
              <h2 id={getHeadingId(TOC_SECTIONS[7])}>{TOC_SECTIONS[7]}</h2>
            </div>
            <div className="mt-6 flex flex-col gap-5 sm:gap-6">
              {SHARE_VIDEO_GUIDE_FAQS.map((faq) => (
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
                Email <a href="mailto:support@kreatli.com">support@kreatli.com</a> and we will help you pick a sharing
                setup that fits your workflow.
              </p>
            </div>
          </div>
        </section>

        <CTASection
          layout="split"
          splitTone="guide"
          title="Ready to share video the easier way?"
          description="Generate review links, keep versions organized, and collect approvals without losing context."
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
