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

const DOCUMENT_TITLE = 'How to Share an MP4 File: Email Limits, Link Options, and Review-Ready Sharing';
const META_DESCRIPTION =
  'Learn how to share an MP4 file without failed uploads or quality loss: when to attach, when to send a link, and how to share for clear feedback and approvals.';
const PUBLISH_DATE = '2026-04-07 00:00';
const READ_TIME = '10';
const CANONICAL_PATH = '/guides/how-to-share-an-mp4-file';

const GUIDE_COVER_SRC = '/images/guides/how-to-share-an-mp4-file-cover.png';
const GUIDE_OG_IMAGE_URL = GUIDE_COVER_SRC;

const MP4_SHARE_HERO_BLOK: SectionStoryblok = {
  _uid: 'static-how-to-share-an-mp4-file-hero',
  component: 'section',
  title: 'How to Share an MP4 File',
  titleTag: 'h1',
  text: 'A practical guide to sharing MP4s through email and chat without failed uploads, quality loss, or confusing feedback—plus when a share link beats attachments.',
  orientation: '',
  displaySocials: false,
  imageObjectFit: 'contain',
  image: {
    _uid: 'static-how-to-share-an-mp4-file-cover',
    id: null,
    alt: 'Kreatli Guide: How to share an MP4 file',
    name: '',
    focus: '',
    source: '',
    title: 'How to share an MP4 file',
    filename: GUIDE_COVER_SRC,
    copyright: '',
    fieldtype: 'asset',
  },
};

const TOC_SECTIONS = [
  'What “sharing an MP4” means (attachment vs link)',
  'Why MP4 attachments fail (size limits in email and chat)',
  'Best way to share an MP4 in Slack / Teams / email (practical flow)',
  'Avoid quality loss (compression, re-encoding, and “optimized uploads”)',
  'Share securely (permissions, expiry, passwords)',
  'Try sharing an MP4 with a review-ready link',
  'Free tools, guides, and platform features',
  'FAQ: How to share an MP4 file',
];

const MP4_SHARE_GUIDE_FAQS = [
  {
    question: 'What is the best way to share an MP4 file?',
    answer:
      'If the MP4 is small and the recipient only needs a quick view, an attachment can work. For anything larger (or if you need predictable access), a share link is usually better: it avoids email/chat size limits, reduces failed sends, and makes it easier to control permissions and expiration.',
  },
  {
    question: 'Why does my MP4 fail to send in email or Slack?',
    answer:
      'Most email providers and chat apps enforce attachment size limits, and some networks block large uploads. Even when the upload succeeds, recipients can run into download friction. If you hit repeated failures, switch to a share link from a drive, transfer service, or review tool.',
  },
  {
    question: 'Will sending an MP4 in chat reduce quality?',
    answer:
      'It can. Some apps optimize media automatically by compressing or re-encoding it, especially when you paste videos directly into a message thread. If quality matters, share a link to the original file or send a deliberate “preview” file separately from the master.',
  },
  {
    question: 'How do I share an MP4 securely?',
    answer:
      'Use link permissions (invite-only or link-only), add passwords when available, and set expiration if the file is time-sensitive. For client work, test the link in an incognito window to confirm exactly what recipients can access without your login.',
  },
  {
    question: 'What should I use if I need feedback and approval on an MP4?',
    answer:
      'Use a review-ready link. It keeps comments tied to timecode and versions, so feedback is clear (“change this at 00:32”) and approvals stay attached to the right cut—without long email threads.',
  },
] as const;

export default function HowToShareAnMp4FileGuidePage() {
  useSession();

  const relatedArticles = getPlatformArticles('/platform/free-video-link-generator').filter(
    (article) => article.full_slug !== CANONICAL_PATH,
  );

  const tocLinks = TOC_SECTIONS.map((label) => ({
    label,
    url: `#${getHeadingId(label)}`,
  }));

  return (
    <>
      <FAQStructuredData faqs={[...MP4_SHARE_GUIDE_FAQS]} />
      <GuidePageLayout
        documentTitle={DOCUMENT_TITLE}
        metaDescription={META_DESCRIPTION}
        canonicalPath={CANONICAL_PATH}
        ogImageUrl={GUIDE_OG_IMAGE_URL}
        ogImageAlt="Kreatli Guide: How to share an MP4 file"
        publishDate={PUBLISH_DATE}
        readTimeMinutes={READ_TIME}
        breadcrumbLabel={DOCUMENT_TITLE}
        tocLinks={tocLinks}
      >
        <Section blok={MP4_SHARE_HERO_BLOK} />

        <GuideSectionRule />

        <div className={wysiwygStyles.wysiwyg}>
          <p>
            <strong>How to share an MP4 file</strong> usually comes down to one constraint: most email and chat tools
            were not built for large media. If you try to attach a big MP4, the upload may fail, the recipient may not be
            able to download it, or the app may compress it. This guide shows when an attachment is fine—and when you
            should switch to a share link.
          </p>

          <h2 id={getHeadingId(TOC_SECTIONS[0])}>{TOC_SECTIONS[0]}</h2>
          <p>When someone asks you to “share the MP4,” they typically mean one of these:</p>
          <ul>
            <li>
              <p>
                <strong>Send an attachment:</strong> Best for small clips or internal notes when quality and longevity
                do not matter.
              </p>
            </li>
            <li>
              <p>
                <strong>Send a link to the file:</strong> Best for reliable delivery, control (permissions/expiry), and
                large files.
              </p>
            </li>
            <li>
              <p>
                <strong>Send a review link:</strong> Best when you need feedback tied to timecode, drawings on frames,
                and explicit approvals.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[1])}>{TOC_SECTIONS[1]}</h2>
          <p>Attachments fail for a few repeatable reasons:</p>
          <ul>
            <li>
              <p>
                <strong>Hard size limits:</strong> Email and chat tools often cap attachment sizes, especially for
                external recipients.
              </p>
            </li>
            <li>
              <p>
                <strong>Upload instability:</strong> Large MP4 uploads can time out on spotty connections.
              </p>
            </li>
            <li>
              <p>
                <strong>Recipient friction:</strong> Downloads may require logins, permissions, or enough device storage.
              </p>
            </li>
          </ul>
          <p>
            If you care about “it opens first try,” treat attachments as a convenience and links as the default for
            real delivery.
          </p>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[2])}>{TOC_SECTIONS[2]}</h2>
          <p>This flow works in almost every team:</p>
          <ol>
            <li>
              <p>
                <strong>Decide what the recipient needs:</strong> watch only, download the MP4, or leave feedback.
              </p>
            </li>
            <li>
              <p>
                <strong>Pick the right share format:</strong> attachment (small), file link (delivery), or review link
                (feedback + approvals).
              </p>
            </li>
            <li>
              <p>
                <strong>Set access up front:</strong> link-only vs invite-only, download allowed or not, and any
                expiration window.
              </p>
            </li>
            <li>
              <p>
                <strong>Test like a recipient:</strong> open the link in an incognito window to confirm it works without
                your login.
              </p>
            </li>
          </ol>
          <p>
            If you are switching from attachments to links, keep the message simple: one URL, one sentence on what you
            want back (“watch + approve” or “leave notes by timecode”).
          </p>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[3])}>{TOC_SECTIONS[3]}</h2>
          <p>Quality problems usually come from accidental “helpful” processing:</p>
          <ul>
            <li>
              <p>
                <strong>Auto-compression:</strong> some chat apps optimize media to save bandwidth.
              </p>
            </li>
            <li>
              <p>
                <strong>Re-encoding:</strong> uploads can be reprocessed into a different bitrate or codec.
              </p>
            </li>
            <li>
              <p>
                <strong>Wrong file for the job:</strong> send a lightweight preview for quick review, but keep your
                master export separate and unmodified.
              </p>
            </li>
          </ul>
          <p>
            When quality matters, prefer a link to the original file (or a deliberate review export), not a pasted-in
            “inline video” upload.
          </p>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[4])}>{TOC_SECTIONS[4]}</h2>
          <ul>
            <li>
              <p>
                <strong>Permissions:</strong> invite-only reduces accidental forwarding; link-only is simpler but easier
                to reshared.
              </p>
            </li>
            <li>
              <p>
                <strong>Expiry:</strong> expiring links reduce risk, but can break later approvals—set a window that fits
                your timeline.
              </p>
            </li>
            <li>
              <p>
                <strong>Passwords and download controls:</strong> use them when the content is sensitive.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[5])}>{TOC_SECTIONS[5]}</h2>
          <p>
            If the MP4 is being shared for review, a link built for feedback is usually faster than email threads. A
            review-ready link keeps comments tied to timecode and versions—similar to our{' '}
            <NextLink href="/platform/free-video-link-generator">free video link generator</NextLink> workflow: share one
            URL, collect frame-accurate notes, and keep approvals tied to the file.
          </p>
          <p>
            The interactive preview below mirrors a simple “share by link” flow. When you are ready,{' '}
            <NextLink href="/sign-up">start a 7-day trial</NextLink> or book a{' '}
            <a href="https://calendar.app.google/NXbAeTAUwaBGh5x49" target="_blank" rel="noopener noreferrer">
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
          toolsTitle="Free tools for sharing MP4s"
          toolsDescription="Try tools that complement link-based sharing, review, and approvals."
          tools={getFreeToolsForPlatform('/platform/free-video-link-generator')}
          articlesTitle="More guides on sharing and delivery"
          articlesDescription="Related reads on sharing workflows, links, and review-ready delivery."
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
              {MP4_SHARE_GUIDE_FAQS.map((faq) => (
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
          title="Ready to share MP4s the easier way?"
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

