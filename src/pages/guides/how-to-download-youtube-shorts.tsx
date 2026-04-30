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
import { KeyTakeaways } from '../../components/shared/KeyTakeaways';
import { YouTubeShortsDownloaderTool } from '../../components/youtube-shorts-downloader/YouTubeShortsDownloaderTool';
import { getPlatformArticles } from '../../data/platform-articles';
import { getFreeToolsForPlatform } from '../../data/platform-free-tools';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';
import { SectionStoryblok } from '../../typings/storyblok';
import { getHeadingId } from '../../utils/storyblok';

const DOCUMENT_TITLE = 'How to Download YouTube Shorts: Save MP4 Files From a Public Link';
const META_DESCRIPTION =
  'Learn how to download YouTube Shorts with a public URL: which links work, why some videos cannot resolve, how to troubleshoot downloads, and what to do legally.';
const PUBLISH_DATE = '2026-04-30 00:00';
const READ_TIME = '8';
const CANONICAL_PATH = '/guides/how-to-download-youtube-shorts';
const GUIDE_COVER_SRC = '/images/guides/how-to-download-youtube-shorts-cover.png';
const GUIDE_OG_IMAGE_URL = GUIDE_COVER_SRC;

const HOW_TO_DOWNLOAD_YOUTUBE_SHORTS_HERO_BLOK: SectionStoryblok = {
  _uid: 'static-how-to-download-youtube-shorts-hero',
  component: 'section',
  title: 'How to Download YouTube Shorts',
  titleTag: 'h1',
  text: 'Download YouTube Shorts with a public Shorts or watch link when a progressive MP4 is available—plus troubleshooting, rights, and what to do next in Kreatli.',
  orientation: '',
  displaySocials: false,
  imageObjectFit: 'contain',
  image: {
    _uid: 'static-how-to-download-youtube-shorts-cover',
    id: null,
    alt: 'Kreatli guide: How to download YouTube Shorts',
    name: '',
    focus: '',
    source: '',
    title: 'How to download YouTube Shorts',
    filename: GUIDE_COVER_SRC,
    copyright: '',
    fieldtype: 'asset',
  },
};

const TOC_SECTIONS = [
  'What you need (public links + rights)',
  'Which Shorts and YouTube links work',
  'How to download YouTube Shorts (step-by-step)',
  'Troubleshooting: resolve fails, browser blocks, adaptive-only videos',
  'After download: review, safe zones, and approvals',
  'Free tools, guides, and platform features',
  'FAQ: How to download YouTube Shorts',
] as const;

const GUIDE_FAQS = [
  {
    question: 'Can every YouTube Short download as an MP4?',
    answer:
      'No. Progressive MP4 URLs only appear for some public playbacks. Adaptive-only or restricted videos often cannot be resolved without YouTube sign-in, which this tool does not use.',
  },
  {
    question: 'Does this work for regular YouTube uploads (not Shorts)?',
    answer:
      'Yes if the video provides a progressive stream. Many long-form uploads still work with the same watch?v= link, but adaptive-only encodes may fail.',
  },
  {
    question: 'What if the download never starts?',
    answer:
      'Click Find video again for a fresh URL and retry Download. Check that pop-ups and downloads are allowed, and pause aggressive download-manager extensions temporarily if they interfere.',
  },
  {
    question: 'Do you need my Google account?',
    answer:
      'No passwords are requested. Paste a public Shorts or watch link; if YouTube requires sign-in to watch, the page will not load for our resolver either.',
  },
  {
    question: 'Is downloading YouTube Shorts legal?',
    answer:
      'Only download content you own or are licensed to use and follow YouTube’s Terms of Service. This guide assumes you are saving your own uploads or partner-approved assets.',
  },
] as const;

export default function HowToDownloadYouTubeShortsGuidePage() {
  useSession();

  const relatedArticles = getPlatformArticles('/platform/download-youtube-shorts').filter(
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
        ogImageAlt="Kreatli guide: How to download YouTube Shorts"
        publishDate={PUBLISH_DATE}
        readTimeMinutes={READ_TIME}
        breadcrumbLabel={DOCUMENT_TITLE}
        tocLinks={tocLinks}
      >
        <Section blok={HOW_TO_DOWNLOAD_YOUTUBE_SHORTS_HERO_BLOK} />

        <GuideSectionRule />

        <div className={wysiwygStyles.wysiwyg}>
          <p>
            Learning <strong>how to download YouTube Shorts</strong> comes down to pairing a <strong>public link</strong>{' '}
            with a downloader that can expose a <strong>progressive MP4</strong>. YouTube often serves adaptive streams too,
            which means not every clip will offer a single-file download from a paste-the-link flow.
          </p>

          <KeyTakeaways
            items={[
              'Use public Shorts (/shorts/…) or watch links; private and members-only videos will not resolve.',
              'Not every upload exposes a progressive MP4—adaptive-only encodes might block one-click saves.',
              'If downloads fail after resolve, refresh with Find video and retry Download—check browser download permissions and pause extensions that block blobs.',
              'Bring the saved file into Kreatli for approvals, comments, and contextual safe-zone checks.',
            ]}
          />

          <h2 id={getHeadingId(TOC_SECTIONS[0])}>{TOC_SECTIONS[0]}</h2>
          <p>Before you download Shorts, double-check:</p>
          <ul>
            <li>
              <p>
                <strong>The Short is public</strong> (watchable without special entitlements).
              </p>
            </li>
            <li>
              <p>
                <strong>You’re allowed to reuse the clip</strong> for your planned workflow.
              </p>
            </li>
          </ul>
          <p>
            Creators saving their own uploads, agencies handling client-owned deliverables, or editors reviewing legally
            licensed media are the ideal users.
          </p>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[1])}>{TOC_SECTIONS[1]}</h2>
          <p>Formats that usually work with the Kreatli downloader include:</p>
          <ul>
            <li>
              <p>
                <strong>Shorts permalinks:</strong> <code>https://www.youtube.com/shorts/VIDEO_ID</code>
              </p>
            </li>
            <li>
              <p>
                <strong>Standard watch URLs:</strong> <code>youtube.com/watch?v=VIDEO_ID</code> (works for vertical Shorts too)
              </p>
            </li>
            <li>
              <p>
                <strong>Short share links:</strong> <code>youtu.be/VIDEO_ID</code>
              </p>
            </li>
          </ul>
          <p>Playlist pages, live events, or unfinished premieres may not provide a stable MP4 endpoint.</p>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[2])}>{TOC_SECTIONS[2]}</h2>
          <ol>
            <li>
              <p>Open the Short in the YouTube mobile or desktop app/site and copy its share link.</p>
            </li>
            <li>
              <p>
                Paste the URL into{' '}
                <NextLink href="/free-tools/youtube-shorts-downloader">Kreatli&apos;s YouTube Shorts downloader</NextLink>{' '}
                and confirm you are signed in so downloads can start.
              </p>
            </li>
            <li>
              <p>
                Tap <strong>Find video</strong> to resolve the best available progressive stream, then{' '}
                <strong>Download</strong>.
              </p>
            </li>
            <li>
              <p>
                If the download stalls, click <strong>Find video</strong> again, then retry <strong>Download</strong>, and
                review your browser&apos;s download and pop-up permissions.
              </p>
            </li>
          </ol>

          <p>
            Prefer the marketing overview? Jump to{' '}
            <NextLink href="/platform/download-youtube-shorts">Download YouTube Shorts on the Kreatli platform hub</NextLink>
            .
          </p>

          <p className="mb-2">Test it live with the interactive tool below:</p>
          <div className="my-4 w-full">
            <YouTubeShortsDownloaderTool />
          </div>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[3])}>{TOC_SECTIONS[3]}</h2>
          <ul>
            <li>
              <p>
                <strong>No progressive MP4 found:</strong> the upload may rely entirely on segmented streams — try exporting
                from YouTube Studio if you’re the creator, or coordinate with whoever owns the file.
              </p>
            </li>
            <li>
              <p>
                <strong>Downloads blocked:</strong> corporate browsers or Safari privacy settings occasionally block
                proxied blobs—retry after a fresh resolve or adjust download/pop-up policies for kreatli.com.
              </p>
            </li>
            <li>
              <p>
                <strong>Stale URLs:</strong> CDN tokens expire quickly. Click <strong>Find video</strong> again whenever the
                error mentions upstream failures.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[4])}>{TOC_SECTIONS[4]}</h2>
          <p>
            After you archive a Short, drag it into Kreatli Review to annotate frame-accurate notes, organize versions, and
            route approvals faster than spreadsheets or chat threads alone.
          </p>
          <p>
            If you intend to publish on additional channels, run{' '}
            <NextLink href="/safe-zone-checker/youtube-safe-zone-checker">YouTube Shorts Safe Zone Checker</NextLink>{' '}
            before upload so overlays don’t bury your call-to-actions.
          </p>
        </div>

        <GuideSectionRule />

        <GuideArticleToolsResourcesSection
          tocHeadingId={getHeadingId(TOC_SECTIONS[5])}
          tocHeadingLabel={TOC_SECTIONS[5]}
          sectionIntro="These tools reinforce what happens after downloads so your team stays aligned across prep, QA, and release."
          toolsTitle="Free tools for creators and reviewers"
          toolsDescription="Stretch beyond downloads with compression, link sharing, resizing, or safe-zone overlays."
          tools={getFreeToolsForPlatform('/platform/download-youtube-shorts')}
          articlesTitle="More guides and workflows"
          articlesDescription="Dig into additional tutorials spanning video QA, proofs, file sharing, and delivery."
          articles={relatedArticles}
          articlesMax={3}
          resourcesTitle="Explore platform pillars"
          resourcesDescription="Understand how approvals, versioning, annotations, and storage connect after you save clips."
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
                Email <a href="mailto:support@kreatli.com">support@kreatli.com</a> — we&apos;ll route you toward the safest
                review workflow once your clips are offline.
              </p>
            </div>
          </div>
        </section>

        <CTASection
          layout="split"
          splitTone="guide"
          title="Bring Shorts into a review workspace"
          description="Combine downloads with comments, versioning, proofs, and client approvals—all without messy email forwards."
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
