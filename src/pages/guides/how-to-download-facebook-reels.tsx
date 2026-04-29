import { cn } from '@heroui/react';
import NextLink from 'next/link';

import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';
import { FacebookReelDownloaderTool } from '../../components/facebook-reel-downloader/FacebookReelDownloaderTool';
import { GuideArticleToolsResourcesSection } from '../../components/guides/GuideArticleToolsResourcesSection';
import { GuidePageLayout } from '../../components/guides/GuidePageLayout';
import { GuideSectionRule } from '../../components/guides/GuideSectionRule';
import { Section } from '../../components/layout/Storyblok/Section/Section';
import wysiwygStyles from '../../components/layout/Storyblok/Wysiwyg/Wysiwyg.module.scss';
import { CTASection } from '../../components/shared/CTASection';
import { FAQStructuredData } from '../../components/shared/FAQStructuredData';
import { KeyTakeaways } from '../../components/shared/KeyTakeaways';
import { getPlatformArticles } from '../../data/platform-articles';
import { getFreeToolsForPlatform } from '../../data/platform-free-tools';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';
import { SectionStoryblok } from '../../typings/storyblok';
import { getHeadingId } from '../../utils/storyblok';

const DOCUMENT_TITLE = 'How to Download Facebook Reels: Save MP4s From a Public Link';
const META_DESCRIPTION =
  'Learn how to download Facebook Reels from a public link: which URLs work, how to save the MP4, what to do when downloads fail, and rights best practices.';
const PUBLISH_DATE = '2026-04-27 00:00';
const READ_TIME = '8';
const CANONICAL_PATH = '/guides/how-to-download-facebook-reels';
const GUIDE_COVER_SRC = '/images/guides/how-to-download-facebook-reels.png';
const GUIDE_OG_IMAGE_URL = GUIDE_COVER_SRC;

const HERO_BLOK: SectionStoryblok = {
  _uid: 'static-how-to-download-facebook-reels-hero',
  component: 'section',
  title: 'How to Download Facebook Reels',
  titleTag: 'h1',
  text: 'A practical guide to saving MP4s from public Facebook Reel/video links, with troubleshooting and rights reminders.',
  orientation: '',
  displaySocials: false,
  imageObjectFit: 'contain',
  image: {
    _uid: 'static-how-to-download-facebook-reels-cover',
    id: null,
    alt: 'Kreatli guide: How to download Facebook Reels',
    name: '',
    focus: '',
    source: '',
    title: 'How to download Facebook Reels',
    filename: GUIDE_COVER_SRC,
    copyright: '',
    fieldtype: 'asset',
  },
};

const TOC_SECTIONS = [
  'What you need (public link + rights)',
  'Which Facebook links work',
  'How to download Facebook Reels (step-by-step)',
  'Troubleshooting: download fails, link expires, and browser limits',
  'After download: review, approvals, and handoff',
  'Free tools, guides, and platform features',
  'FAQ: How to download Facebook Reels',
] as const;

const GUIDE_FAQS = [
  {
    question: 'Does this work for private Facebook Reels?',
    answer:
      'No. You need a public Facebook Reel/video URL. Private accounts, friends-only posts, and login-gated content cannot be resolved by a public-link downloader.',
  },
  {
    question: 'What Facebook URL formats are supported?',
    answer:
      'Use public links such as facebook.com/reel/..., facebook.com/watch?v=..., facebook.com/.../videos/... and fb.watch/... URLs. Non-video pages will not resolve to a downloadable MP4.',
  },
  {
    question: 'Why did my download fail?',
    answer:
      'The resolved direct URL may have expired, your browser may have blocked download behavior, or Facebook may be rate-limiting temporarily. Resolve again and retry.',
  },
  {
    question: 'Do I need to log in to Facebook or share credentials?',
    answer: 'No. Kreatli does not ask for Facebook credentials. This guide is for public links only.',
  },
  {
    question: 'Is it legal to download Facebook Reels?',
    answer:
      'Only download content you own or have permission to use, and follow Facebook terms and copyright law. This workflow is intended for legitimate archiving, internal review, and approved production use.',
  },
] as const;

export default function HowToDownloadFacebookReelsGuidePage() {
  useSession();

  const relatedArticles = getPlatformArticles('/platform/download-facebook-reels').filter(
    (article) => article.full_slug !== CANONICAL_PATH,
  );

  const tocLinks = TOC_SECTIONS.map((label) => ({
    label,
    url: `#${getHeadingId(label)}`,
  }));

  return (
    <>
      <FAQStructuredData faqs={[...GUIDE_FAQS]} />
      <GuidePageLayout
        documentTitle={DOCUMENT_TITLE}
        metaDescription={META_DESCRIPTION}
        canonicalPath={CANONICAL_PATH}
        ogImageUrl={GUIDE_OG_IMAGE_URL}
        ogImageAlt="Kreatli guide: How to download Facebook Reels"
        publishDate={PUBLISH_DATE}
        readTimeMinutes={READ_TIME}
        breadcrumbLabel={DOCUMENT_TITLE}
        tocLinks={tocLinks}
      >
        <Section blok={HERO_BLOK} />

        <GuideSectionRule />

        <div className={wysiwygStyles.wysiwyg}>
          <p>
            <strong>How to download Facebook Reels</strong> starts with one requirement: a <strong>public link</strong>{' '}
            that resolves to a video file. Most issues happen later due to expiring direct URLs or browser download
            behavior.
          </p>

          <KeyTakeaways
            items={[
              'Use public Facebook Reel/video URLs only.',
              'Resolve first, then download quickly because direct URLs can expire.',
              'If download fails, resolve again and retry.',
              'Only download content you own or are authorized to use.',
            ]}
          />

          <h2 id={getHeadingId(TOC_SECTIONS[0])}>{TOC_SECTIONS[0]}</h2>
          <p>Before downloading, verify:</p>
          <ul>
            <li>
              <p>
                <strong>The content is public</strong> and can be opened without login.
              </p>
            </li>
            <li>
              <p>
                <strong>You have rights or permission</strong> to save and reuse the video.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[1])}>{TOC_SECTIONS[1]}</h2>
          <p>Common supported Facebook link formats include:</p>
          <ul>
            <li>
              <p>
                <code>facebook.com/reel/...</code>
              </p>
            </li>
            <li>
              <p>
                <code>facebook.com/watch?v=...</code>
              </p>
            </li>
            <li>
              <p>
                <code>facebook.com/.../videos/...</code> and <code>fb.watch/...</code>
              </p>
            </li>
          </ul>
          <p>Profile URLs and non-video pages usually cannot be resolved to a downloadable MP4.</p>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[2])}>{TOC_SECTIONS[2]}</h2>
          <ol>
            <li>
              <p>Copy the Facebook Reel/video URL from Share.</p>
            </li>
            <li>
              <p>
                Paste it into Kreatli&apos;s{' '}
                <NextLink href="/free-tools/facebook-reel-downloader">Facebook Reel Downloader</NextLink>.
              </p>
            </li>
            <li>
              <p>
                Click <strong>Find video</strong>, then <strong>Download</strong>.
              </p>
            </li>
            <li>
              <p>If download fails, resolve again for a fresh direct URL.</p>
            </li>
          </ol>

          <p>
            For more context and related workflows, see{' '}
            <NextLink href="/platform/download-facebook-reels">Download Facebook Reels</NextLink>.
          </p>

          <p className="mb-2">Use the interactive tool below to run the same workflow from this guide.</p>
          <div className="my-4 w-full">
            <FacebookReelDownloaderTool />
          </div>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[3])}>{TOC_SECTIONS[3]}</h2>
          <ul>
            <li>
              <p>
                <strong>Direct link expired:</strong> click <strong>Find video</strong> again.
              </p>
            </li>
            <li>
              <p>
                <strong>Browser blocked download:</strong> check browser settings and retry with a fresh resolved URL.
              </p>
            </li>
            <li>
              <p>
                <strong>Restricted content:</strong> private/login-gated links cannot be downloaded.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[4])}>{TOC_SECTIONS[4]}</h2>
          <p>
            Downloading is often just prep. Teams still need clear review, version tracking, and final approvals before
            publishing.
          </p>
          <p>
            After download, upload to Kreatli for <strong>frame-accurate feedback</strong> and organized approvals, then
            distribute final files with controlled links.
          </p>
        </div>

        <GuideSectionRule />

        <GuideArticleToolsResourcesSection
          tocHeadingId={getHeadingId(TOC_SECTIONS[5])}
          tocHeadingLabel={TOC_SECTIONS[5]}
          sectionIntro="Here are related tools, guides, and platform capabilities that pair well with Facebook Reel download workflows."
          toolsTitle="Free tools for short-form workflows"
          toolsDescription="Use these tools for resizing, compression, sharing, and review after download."
          tools={getFreeToolsForPlatform('/platform/download-facebook-reels')}
          articlesTitle="More guides and examples"
          articlesDescription="Read more workflows for creative delivery and approvals."
          articles={relatedArticles}
          articlesMax={3}
          resourcesTitle="More resources"
          resourcesDescription="Capabilities for review, collaboration, and secure storage."
          resources={getRelatedResources(['reviewApproval', 'videoAnnotation', 'secureAssetStorage'])}
        />

        <GuideSectionRule />

        <section className="relative pb-0 pt-12 md:pb-0 md:pt-16">
          <div className="relative z-10 mx-auto max-w-3xl">
            <div className={cn(wysiwygStyles.wysiwyg, '[&>h2:first-child]:!mt-0')}>
              <h2 id={getHeadingId(TOC_SECTIONS[6])}>{TOC_SECTIONS[6]}</h2>
            </div>
            <div className="mt-6 flex flex-col gap-5 sm:gap-6">
              {GUIDE_FAQS.map((faq) => (
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
                workflow that fits your team.
              </p>
            </div>
          </div>
        </section>

        <CTASection
          layout="split"
          splitTone="guide"
          title="Ready to organize short-form reviews?"
          description="Download for reference, then keep versions, comments, and approvals in one workflow."
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
