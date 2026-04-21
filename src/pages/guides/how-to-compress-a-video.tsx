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
import { getPlatformArticles } from '../../data/platform-articles';
import { getFreeToolsForPlatform } from '../../data/platform-free-tools';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';
import { SectionStoryblok } from '../../typings/storyblok';
import { getHeadingId } from '../../utils/storyblok';

const DOCUMENT_TITLE = 'How to Compress a Video: Smaller Files for Upload, Share, and Delivery';
const META_DESCRIPTION =
  'Learn how to compress a video for upload limits, faster sharing, and client handoff—what changes when you reduce file size, and how to pair compression with review-ready workflows.';
const PUBLISH_DATE = '2026-04-20 00:00';
const READ_TIME = '9';
const CANONICAL_PATH = '/guides/how-to-compress-a-video';
const GUIDE_COVER_SRC = '/images/guides/how-to-compress-a-video-cover.png';
const GUIDE_OG_IMAGE_URL = GUIDE_COVER_SRC;

const HOW_TO_COMPRESS_VIDEO_HERO_BLOK: SectionStoryblok = {
  _uid: 'static-how-to-compress-a-video-hero',
  component: 'section',
  title: 'How to Compress a Video',
  titleTag: 'h1',
  text: 'A practical guide to reducing video file size for email limits, slow uploads, and client previews—without losing sight of quality trade-offs or review workflows.',
  orientation: '',
  displaySocials: false,
  imageObjectFit: 'contain',
  image: {
    _uid: 'static-how-to-compress-a-video-cover',
    id: null,
    alt: 'Kreatli Guide: How to compress a video',
    name: '',
    focus: '',
    source: '',
    title: 'How to compress a video',
    filename: GUIDE_COVER_SRC,
    copyright: '',
    fieldtype: 'asset',
  },
};

const TOC_SECTIONS = [
  'What compressing a video actually changes',
  'Target file size vs quality (practical trade-offs)',
  'Compress a video in your browser (free tool)',
  'After compression: review and approvals in Kreatli',
  'Free tools, guides, and platform features',
  'FAQ: How to compress a video',
] as const;

const COMPRESS_VIDEO_GUIDE_FAQS = [
  {
    question: 'What is the main way to make a video file smaller?',
    answer:
      'Most compression reduces bitrate (and sometimes resolution or frame rate), which lowers the amount of data per second of video. That usually shrinks the file, but very small targets can show more compression artifacts in detailed or fast-moving scenes.',
  },
  {
    question: 'Will my compressed file be exactly the size I target?',
    answer:
      'Not always. Encoders aim for a bitrate that matches a size budget over the duration, but exact byte size varies with content and container overhead. If you must stay under a hard limit, try a slightly smaller target and verify the output.',
  },
  {
    question: 'Should I compress before or after client review?',
    answer:
      'Many teams compress a preview for sharing or upload, while keeping a higher-quality master for final delivery. For client review, use a review-friendly link so feedback stays tied to timecode and versions instead of scattered email attachments.',
  },
  {
    question: 'Is browser-based compression private?',
    answer:
      'With tools that run locally in the browser, your file often does not leave your device during processing. Always confirm what the specific tool does before uploading sensitive material anywhere.',
  },
  {
    question: 'How does Kreatli help after I compress a video?',
    answer:
      'Upload the cut to Kreatli to manage versions, collect frame-accurate comments, and track approvals—so everyone knows which file was approved for which channel or delivery.',
  },
] as const;

export default function HowToCompressAVideoGuidePage() {
  useSession();

  const relatedArticles = getPlatformArticles('/platform/compress-video-online').filter(
    (article) => article.full_slug !== CANONICAL_PATH,
  );

  const tocLinks = TOC_SECTIONS.map((label) => ({
    label,
    url: `#${getHeadingId(label)}`,
  }));

  return (
    <>
      <FAQStructuredData faqs={[...COMPRESS_VIDEO_GUIDE_FAQS]} />
      <GuidePageLayout
        documentTitle={DOCUMENT_TITLE}
        metaDescription={META_DESCRIPTION}
        canonicalPath={CANONICAL_PATH}
        ogImageUrl={GUIDE_OG_IMAGE_URL}
        ogImageAlt="Kreatli Guide: How to compress a video"
        publishDate={PUBLISH_DATE}
        readTimeMinutes={READ_TIME}
        breadcrumbLabel={DOCUMENT_TITLE}
        tocLinks={tocLinks}
      >
        <Section blok={HOW_TO_COMPRESS_VIDEO_HERO_BLOK} />

        <GuideSectionRule />

        <div className={wysiwygStyles.wysiwyg}>
          <p>
            <strong>How to compress a video</strong> is really about one goal: <strong>fewer bytes</strong> so uploads,
            sharing, and storage are easier. The trade-off is almost always <strong>quality vs size</strong>—the smaller
            the file, the more you ask the encoder to throw away detail.
          </p>

          <KeyTakeaways
            items={[
              'Compression usually lowers bitrate (and sometimes resolution); expect quality trade-offs at very small targets.',
              'Match file size to the use case: quick preview vs final master.',
              'Use a review platform when feedback and approvals matter, not just “smaller file.”',
              'If you need a strict cap, target slightly under the limit and verify the output size.',
            ]}
          />

          <h2 id={getHeadingId(TOC_SECTIONS[0])}>{TOC_SECTIONS[0]}</h2>
          <p>
            “Compressing” typically means reducing the amount of data used to represent your video. Common levers include:
          </p>
          <ul>
            <li>
              <p>
                <strong>Bitrate:</strong> fewer bits per second usually means a smaller file and more visible compression
                in some scenes.
              </p>
            </li>
            <li>
              <p>
                <strong>Resolution:</strong> fewer pixels can shrink file size dramatically, especially for social
                formats.
              </p>
            </li>
            <li>
              <p>
                <strong>Codec:</strong> modern codecs (e.g. H.264 for broad compatibility) balance size and playback
                support.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[1])}>{TOC_SECTIONS[1]}</h2>
          <p>
            A <strong>target size in MB</strong> is a budget spread across your video length. Longer videos need more
            bits to look good at the same resolution; extremely small targets can look fine for simple graphics and
            harder for grain, noise, or fast motion.
          </p>
          <p>
            For <strong>client previews</strong>, prioritize clarity of the important subject. For{' '}
            <strong>final delivery</strong>, keep a master that meets your technical and contractual requirements.
          </p>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[2])}>{TOC_SECTIONS[2]}</h2>
          <p>
            Kreatli offers a free <NextLink href="/free-tools/video-compressor">Video Compressor</NextLink> that runs in
            your browser: set a target output size, choose MP4 or MOV, and download the result. You can also explore the
            same workflow on the{' '}
            <NextLink href="/platform/compress-video-online">Compress Video Online</NextLink> platform page.
          </p>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[3])}>{TOC_SECTIONS[3]}</h2>
          <p>
            After you compress a file, upload it to Kreatli to keep <strong>versions</strong>,{' '}
            <strong>frame-accurate feedback</strong>, and <strong>approvals</strong> in one place. That reduces confusion
            about which file was approved for which channel—especially when you ship multiple sizes (16:9, 9:16, square
            cuts).
          </p>
          <p>
            Learn more about platform capabilities on{' '}
            <NextLink href="/platform/review-video">Review Video</NextLink> and{' '}
            <NextLink href="/platform/creative-workspace">Creative Workspace</NextLink>.
          </p>
        </div>

        <GuideSectionRule />

        <GuideArticleToolsResourcesSection
          tocHeadingId={getHeadingId(TOC_SECTIONS[4])}
          tocHeadingLabel={TOC_SECTIONS[4]}
          sectionIntro="Below are free tools that pair with compressing video, plus related guides and platform features to explore next."
          toolsTitle="Free tools for video compression and delivery"
          toolsDescription="Try tools that complement smaller files, resizing, and transfer planning."
          tools={getFreeToolsForPlatform('/platform/compress-video-online')}
          articlesTitle="More guides and examples"
          articlesDescription="Read more about video delivery, review, and production workflows."
          articles={relatedArticles}
          articlesMax={3}
          resourcesTitle="More resources"
          resourcesDescription="Capabilities that support video collaboration, delivery, and secure storage."
          resources={getRelatedResources(['reviewApproval', 'creativeWorkspace', 'secureAssetStorage']).map(
            (resource, index) => {
              if (index === 0) return { ...resource, icon: 'monitorPlay' };
              if (index === 1) return { ...resource, icon: 'folder' };
              return resource;
            },
          )}
        />

        <GuideSectionRule />

        <section className="relative pb-0 pt-12 md:pb-0 md:pt-16">
          <div className="relative z-10 mx-auto max-w-3xl">
            <div className={cn(wysiwygStyles.wysiwyg, '[&>h2:first-child]:!mt-0')}>
              <h2 id={getHeadingId(TOC_SECTIONS[5])}>{TOC_SECTIONS[5]}</h2>
            </div>
            <div className="mt-6 flex flex-col gap-5 sm:gap-6">
              {COMPRESS_VIDEO_GUIDE_FAQS.map((faq) => (
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
          title="Ready to review compressed cuts with your team?"
          description="Compress for delivery, then keep versions, comments, and approvals organized in one workspace."
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
