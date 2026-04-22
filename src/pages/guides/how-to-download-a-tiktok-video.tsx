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
import { TikTokDownloaderTool } from '../../components/tiktok-downloader/TikTokDownloaderTool';
import { getPlatformArticles } from '../../data/platform-articles';
import { getFreeToolsForPlatform } from '../../data/platform-free-tools';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';
import { SectionStoryblok } from '../../typings/storyblok';
import { getHeadingId } from '../../utils/storyblok';

const DOCUMENT_TITLE = 'How to Download a TikTok Video: Save MP4s From a Public Link (No-Watermark When Available)';
const META_DESCRIPTION =
  'Learn how to download a TikTok video from a public link: which URLs work, how to save the MP4, what to do when downloads fail, and when watermark-free files are not available.';
const PUBLISH_DATE = '2026-04-21 00:00';
const READ_TIME = '8';
const CANONICAL_PATH = '/guides/how-to-download-a-tiktok-video';
const GUIDE_COVER_SRC = '/images/guides/how-to-download-a-tiktok-video-cover.png';
const GUIDE_OG_IMAGE_URL = GUIDE_COVER_SRC;

const HOW_TO_DOWNLOAD_TIKTOK_VIDEO_HERO_BLOK: SectionStoryblok = {
  _uid: 'static-how-to-download-a-tiktok-video-hero',
  component: 'section',
  title: 'How to Download a TikTok Video',
  titleTag: 'h1',
  text: 'A practical guide to saving an MP4 from a public TikTok link—plus troubleshooting and what to do when watermark-free files are not available.',
  orientation: '',
  displaySocials: false,
  imageObjectFit: 'contain',
  image: {
    _uid: 'static-how-to-download-a-tiktok-video-cover',
    id: null,
    alt: 'Kreatli guide: How to download a TikTok video',
    name: '',
    focus: '',
    source: '',
    title: 'How to download a TikTok video',
    filename: GUIDE_COVER_SRC,
    copyright: '',
    fieldtype: 'asset',
  },
};

const TOC_SECTIONS = [
  'What you need (public link + rights)',
  'Which TikTok links work',
  'How to download a TikTok video (step-by-step)',
  'Troubleshooting: download fails, link expires, mobile browsers',
  'After download: review, approvals, and safe zones',
  'Free tools, guides, and platform features',
  'FAQ: How to download a TikTok video',
] as const;

const GUIDE_FAQS = [
  {
    question: 'Can I download TikTok videos without a watermark?',
    answer:
      'Sometimes. The downloader attempts a no-watermark version first. If TikTok blocks it or the resolver can’t find a clean file, you may only be able to download a standard (watermarked) link.',
  },
  {
    question: 'Does this work for private TikTok videos?',
    answer:
      'No. You need a public TikTok URL. Private accounts, age-restricted posts, and content behind a login wall can’t be accessed by a public-link downloader.',
  },
  {
    question: 'What TikTok URL formats are supported?',
    answer:
      'Direct TikTok video links (tiktok.com) and common short links (vm.tiktok.com / vt.tiktok.com) usually work. Profile links and non-video pages won’t resolve to a downloadable MP4.',
  },
  {
    question: 'Why didn’t my download start?',
    answer:
      'Browsers sometimes block auto-downloads, and resolved links can expire. Try resolving again, then use “Open direct link” and save the video from the new tab. On mobile, a long-press may be required depending on your browser.',
  },
  {
    question: 'Do I need to log in to TikTok?',
    answer: 'No. Kreatli does not ask for TikTok credentials. The tool is designed to work from public links only.',
  },
  {
    question: 'Is it legal to download TikTok videos?',
    answer:
      'Only download videos you own or have permission to use, and follow TikTok’s Terms of Service and copyright laws. This guide is for legitimate workflows like archiving your own posts or saving approved material for editing and review.',
  },
] as const;

export default function HowToDownloadATikTokVideoGuidePage() {
  useSession();

  const relatedArticles = getPlatformArticles('/platform/download-tiktok-video').filter(
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
        ogImageAlt="Kreatli guide: How to download a TikTok video"
        publishDate={PUBLISH_DATE}
        readTimeMinutes={READ_TIME}
        breadcrumbLabel={DOCUMENT_TITLE}
        tocLinks={tocLinks}
      >
        <Section blok={HOW_TO_DOWNLOAD_TIKTOK_VIDEO_HERO_BLOK} />

        <GuideSectionRule />

        <div className={wysiwygStyles.wysiwyg}>
          <p>
            <strong>How to download a TikTok video</strong> usually comes down to one thing: you need a{' '}
            <strong>public TikTok link</strong> that resolves to a downloadable file. The rest is troubleshooting—browser
            download behavior, link redirects, and whether TikTok exposes a <strong>watermark-free</strong> file for that
            post.
          </p>

          <KeyTakeaways
            items={[
              'Use a public TikTok video link; private or age-restricted posts won’t work.',
              'No-watermark is not guaranteed—when unavailable, a standard (watermarked) link may be the only option.',
              'If downloads fail, open the direct link and save from the new tab; on mobile, long-press may be required.',
              'After download, use a review workflow to collect frame-accurate feedback and approvals.',
            ]}
          />

          <h2 id={getHeadingId(TOC_SECTIONS[0])}>{TOC_SECTIONS[0]}</h2>
          <p>Before you download anything, confirm two things:</p>
          <ul>
            <li>
              <p>
                <strong>The video is public</strong> (not private, age-restricted, or behind a login wall).
              </p>
            </li>
            <li>
              <p>
                <strong>You have rights or permission</strong> to download and use the content.
              </p>
            </li>
          </ul>
          <p>
            If you’re saving your own posts for archiving, editing, or internal review, a public-link downloader is a
            straightforward workflow.
          </p>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[1])}>{TOC_SECTIONS[1]}</h2>
          <p>These are the most common TikTok link types you’ll see:</p>
          <ul>
            <li>
              <p>
                <strong>Direct video links:</strong> from <code>tiktok.com</code> (most reliable).
              </p>
            </li>
            <li>
              <p>
                <strong>Short links:</strong> <code>vm.tiktok.com</code> or <code>vt.tiktok.com</code> (redirects to a
                direct link).
              </p>
            </li>
          </ul>
          <p>
            If you paste a profile URL or a non-video page, you usually won’t get a downloadable MP4.
          </p>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[2])}>{TOC_SECTIONS[2]}</h2>
          <ol>
            <li>
              <p>
                Copy the TikTok video URL from the Share menu.
              </p>
            </li>
            <li>
              <p>
                Paste it into Kreatli’s{' '}
                <NextLink href="/free-tools/tiktok-video-downloader">TikTok Video Downloader</NextLink>.
              </p>
            </li>
            <li>
              <p>
                Click <strong>Find video</strong>, then click <strong>Download</strong>.
              </p>
            </li>
            <li>
              <p>
                If the download doesn’t start, use <strong>Open direct link</strong> and save from the new tab.
              </p>
            </li>
          </ol>

          <p>
            If you want the platform framing and internal workflow links, see{' '}
            <NextLink href="/platform/download-tiktok-video">Download TikTok Video</NextLink>.
          </p>

          <p className="mb-2">
            Below is the tool itself (interactive) so you can test the workflow immediately.
          </p>
          <div className="my-4 w-full">
            <TikTokDownloaderTool />
          </div>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[3])}>{TOC_SECTIONS[3]}</h2>
          <ul>
            <li>
              <p>
                <strong>Download fails or doesn’t start:</strong> try resolving again; then open the direct link and
                save from the new tab.
              </p>
            </li>
            <li>
              <p>
                <strong>Mobile browsers:</strong> some browsers require a long-press on the video in the new tab to save.
              </p>
            </li>
            <li>
              <p>
                <strong>Watermark-free isn’t available:</strong> TikTok may not expose a clean file for that post; you
                may only be able to download a standard version.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[4])}>{TOC_SECTIONS[4]}</h2>
          <p>
            Downloading is often just the first step. If you’re working with a team (or clients), the next challenge is
            getting clear feedback and sign-off on the right cut.
          </p>
          <p>
            After you download, upload the MP4 into Kreatli to collect <strong>frame-accurate comments</strong> and track{' '}
            <strong>approvals</strong> per version. If the TikTok is headed for publishing, run a{' '}
            <NextLink href="/platform/tiktok-safe-zone">TikTok safe zone</NextLink> check so CTAs and captions stay
            visible under UI overlays.
          </p>
        </div>

        <GuideSectionRule />

        <GuideArticleToolsResourcesSection
          tocHeadingId={getHeadingId(TOC_SECTIONS[5])}
          tocHeadingLabel={TOC_SECTIONS[5]}
          sectionIntro="Below are free tools that pair with TikTok downloads, plus related guides and platform features to explore next."
          toolsTitle="Free tools for short-form video workflows"
          toolsDescription="Try tools that complement downloads: resizing, compression, share links, and review workflows."
          tools={getFreeToolsForPlatform('/platform/download-tiktok-video')}
          articlesTitle="More guides and examples"
          articlesDescription="Read more about video delivery, review, and production workflows."
          articles={relatedArticles}
          articlesMax={3}
          resourcesTitle="More resources"
          resourcesDescription="Capabilities that support video collaboration, delivery, and secure storage."
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
          title="Ready to review short-form cuts with your team?"
          description="Download for reference, then keep versions, comments, and approvals organized in one workspace."
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

