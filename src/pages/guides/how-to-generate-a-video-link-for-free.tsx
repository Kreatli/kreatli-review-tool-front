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

const DOCUMENT_TITLE = 'How to Generate a Video Link for Free: Share, Watch, and Review-Ready Links';
const META_DESCRIPTION =
  'Learn how to generate a video link for free: watch URLs from hosts, file-share links from cloud storage, and when to use a review-ready link for client feedback and approvals.';
const PUBLISH_DATE = '2026-04-06 00:00';
const READ_TIME = '11';
const CANONICAL_PATH = '/guides/how-to-generate-a-video-link-for-free';
const GUIDE_COVER_SRC = '/images/guides/how-to-generate-a-video-link-for-free-cover.png';
const GUIDE_OG_IMAGE_URL = GUIDE_COVER_SRC;

const VIDEO_LINK_GUIDE_HERO_BLOK: SectionStoryblok = {
  _uid: 'static-how-to-generate-video-link-hero',
  component: 'section',
  title: 'How to Generate a Video Link for Free',
  titleTag: 'h1',
  text: 'A practical guide to shareable watch links, cloud file links, and review-ready URLs—so you can pick the right option for social, delivery, or client approval.',
  orientation: '',
  displaySocials: false,
  imageObjectFit: 'contain',
  image: {
    _uid: 'static-how-to-generate-video-link-cover',
    id: null,
    alt: 'Kreatli Guide: How to generate a video link for free',
    name: '',
    focus: '',
    source: '',
    title: 'How to generate a video link for free',
    filename: GUIDE_COVER_SRC,
    copyright: '',
    fieldtype: 'asset',
  },
};

const TOC_SECTIONS = [
  'What counts as a video link?',
  'Free ways to get a shareable video link',
  'How to create or copy a link (typical flow)',
  'Privacy, expiry, and who can open the link',
  'When a review-ready link fits better than a watch URL',
  'Try generating a shareable video link',
  'Free tools, guides, and platform features',
  'FAQ: How to generate a video link for free',
] as const;

const VIDEO_LINK_GUIDE_FAQS = [
  {
    question: 'Is generating a video link the same as uploading to YouTube?',
    answer:
      'Not always. A “video link” is usually just a URL that opens playback somewhere—often after you upload to a host like YouTube or Vimeo and copy the share link. You can also get links from cloud file services that point to an MP4 or project file. The right choice depends on whether you need public discovery, private delivery, or structured review and approvals.',
  },
  {
    question: 'Can I get a video link for free without making viewers sign up?',
    answer:
      'Often yes. Many hosts and file-sharing tools let you create a link for free; viewers may only need a browser. Some products still ask recipients to create an account before playback or download. If friction matters—especially for busy clients—look for share modes labeled unlisted, link-only, or “anyone with the link,” and test the recipient experience once before you send it widely.',
  },
  {
    question: 'How is a review link different from a regular watch link?',
    answer:
      'A typical watch link opens a player so people can view the video. A review link (or review page) is built for feedback: time-coded comments, drawings on frame, approvals, and version context. If your goal is “please watch this,” a watch link is enough. If your goal is “please tell me exactly what to change and sign off on v3,” a review-ready link saves email chains and vague notes.',
  },
  {
    question: 'Are free video links private?',
    answer:
      'Only if you configure them that way. Public links can be indexed or reshared. Unlisted or “anyone with the link” modes reduce casual discovery but are not the same as encryption or enterprise access control. For confidential cuts, prefer providers that support expiring links, passwords, or workspace permissions, and avoid posting client work in public channels.',
  },
  {
    question: 'Do video share links expire?',
    answer:
      'Sometimes. File-transfer services and some cloud links include expiration dates or download limits by design. Hosts like YouTube generally keep a stable URL unless you delete the video or change visibility. Before you promise a client a permanent URL, check the product’s policy and whether the link ties to a personal account that could lose access later.',
  },
] as const;

export default function HowToGenerateAVideoLinkForFreeGuidePage() {
  useSession();

  const relatedArticles = getPlatformArticles('/platform/free-video-link-generator').filter(
    (article) => article.full_slug !== '/guides/how-to-generate-a-video-link-for-free',
  );

  const tocLinks = TOC_SECTIONS.map((label) => ({
    label,
    url: `#${getHeadingId(label)}`,
  }));

  return (
    <>
      <FAQStructuredData faqs={[...VIDEO_LINK_GUIDE_FAQS]} />
      <GuidePageLayout
        documentTitle={DOCUMENT_TITLE}
        metaDescription={META_DESCRIPTION}
        canonicalPath={CANONICAL_PATH}
        ogImageUrl={GUIDE_OG_IMAGE_URL}
        ogImageAlt="Kreatli Guide: How to generate a video link for free"
        publishDate={PUBLISH_DATE}
        readTimeMinutes={READ_TIME}
        breadcrumbLabel={DOCUMENT_TITLE}
        tocLinks={tocLinks}
      >
        <Section blok={VIDEO_LINK_GUIDE_HERO_BLOK} />

        <GuideSectionRule />

        <div className={wysiwygStyles.wysiwyg}>
          <p>
            <strong>How to generate a video link for free</strong> usually means: upload (or select) a video somewhere,
            then copy a URL you can paste into chat, email, or a CMS. The free part is often the account tier on the
            host or transfer tool; the tradeoff is usually storage limits, ads, watermarks, or weaker privacy controls.
            This guide separates <strong>watch links</strong>, <strong>file links</strong>, and{' '}
            <strong>review-ready links</strong> so you pick the right format for your workflow.
          </p>

          <h2 id={getHeadingId(TOC_SECTIONS[0])}>{TOC_SECTIONS[0]}</h2>
          <p>People use “video link” to mean a few different things:</p>
          <ul>
            <li>
              <p>
                <strong>Watch URL:</strong> Opens a streaming player on a host (for example a share link after upload).
              </p>
            </li>
            <li>
              <p>
                <strong>File link:</strong> Points to a video file in cloud storage or a transfer service—recipients may
                stream or download depending on the product.
              </p>
            </li>
            <li>
              <p>
                <strong>Review link:</strong> Opens a page built for feedback—comments tied to timecode, markup, and
                often approvals or versions.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[1])}>{TOC_SECTIONS[1]}</h2>
          <p>Common free or freemium paths include:</p>
          <ul>
            <li>
              <p>
                <strong>Video hosts:</strong> Upload, set visibility (public, unlisted, or private), then copy the share
                link. Good when you want a simple player and acceptable terms for your content.
              </p>
            </li>
            <li>
              <p>
                <strong>Cloud drive links:</strong> Upload the file, create a shareable link, and send it. Good for
                rough cuts or when the recipient needs the file—but check download bandwidth and caps.
              </p>
            </li>
            <li>
              <p>
                <strong>Review platforms:</strong> Upload to a tool aimed at creative review; share one URL for
                stakeholders. Often the best fit when comments and sign-off need to stay organized.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[2])}>{TOC_SECTIONS[2]}</h2>
          <p>Products label buttons differently, but the flow repeats everywhere:</p>
          <ol>
            <li>
              <p>
                <strong>Upload or select the asset</strong> in your host, drive, or review workspace.
              </p>
            </li>
            <li>
              <p>
                <strong>Choose visibility</strong> (public, unlisted, link-only, or restricted to named people).
              </p>
            </li>
            <li>
              <p>
                <strong>Open Share / Copy link</strong> and paste it where your audience expects it—email, Slack, or a
                project brief.
              </p>
            </li>
            <li>
              <p>
                <strong>Open the link in an incognito window</strong> to confirm what a first-time viewer sees,
                including login walls or quality limits.
              </p>
            </li>
          </ol>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[3])}>{TOC_SECTIONS[3]}</h2>
          <ul>
            <li>
              <p>
                <strong>Who can open it:</strong> “Anyone with the link” is convenient but easy to forward; restricted
                lists reduce leakage for sensitive work.
              </p>
            </li>
            <li>
              <p>
                <strong>Expiry:</strong> Transfer links may auto-expire; host URLs may persist until you delete the
                asset—verify before you commit to a delivery date.
              </p>
            </li>
            <li>
              <p>
                <strong>Downloads vs streaming:</strong> Some clients need a file; others only need to watch once. Match
                the link type to what you are approving.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[4])}>{TOC_SECTIONS[4]}</h2>
          <p>
            If you only need views, a watch or file link is enough. When you need structured feedback, version clarity,
            and approvals, a review-focused workflow keeps comments on the right cut. Kreatli’s approach is outlined on
            our <NextLink href="/platform/free-video-link-generator">free video link generator</NextLink> page: share a
            link, collect frame-accurate notes, and keep approval history with the file.
          </p>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[5])}>{TOC_SECTIONS[5]}</h2>
          <p>
            The preview below mirrors a simple “generate and share a link” flow: add recipients, copy a share URL, and
            think through who should have access. To go further,{' '}
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
          sectionIntro="Free tools that pair with sharing and review, related guides, and platform areas to explore next."
          toolsTitle="Free tools for sharing and review"
          toolsDescription="Try calculators and lightweight reviewers that complement link-based video workflows."
          tools={getFreeToolsForPlatform('/platform/free-video-link-generator')}
          articlesTitle="More guides on sharing and delivery"
          articlesDescription="Deeper reads on email limits, large files, and client-friendly delivery."
          articles={relatedArticles}
          articlesMax={3}
          resourcesTitle="More resources"
          resourcesDescription="Capabilities that support secure storage, annotation, and structured approvals."
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
              <h2 id={getHeadingId(TOC_SECTIONS[7])}>{TOC_SECTIONS[7]}</h2>
            </div>
            <div className="mt-6 flex flex-col gap-5 sm:gap-6">
              {VIDEO_LINK_GUIDE_FAQS.map((faq) => (
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
                Email <a href="mailto:support@kreatli.com">support@kreatli.com</a> and we will help you choose a sharing
                setup that fits your team.
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
