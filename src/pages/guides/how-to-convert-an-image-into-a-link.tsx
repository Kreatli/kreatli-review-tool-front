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
import { KeyTakeaways } from '../../components/shared/KeyTakeaways';
import { FAQStructuredData } from '../../components/shared/FAQStructuredData';
import { getPlatformArticles } from '../../data/platform-articles';
import { getFreeToolsForPlatform } from '../../data/platform-free-tools';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';
import { SectionStoryblok } from '../../typings/storyblok';
import { getHeadingId } from '../../utils/storyblok';

const DOCUMENT_TITLE =
  'How to Convert an Image into a Link: Share, Review, and Approve Without Heavy Attachments';
const META_DESCRIPTION =
  'Learn how to convert an image into a link, control who can open it, and share one URL so feedback stays centralized ' +
  'and versions stay clear.';
const PUBLISH_DATE = '2026-04-10 11:00';
const READ_TIME = '9';
const CANONICAL_PATH = '/guides/how-to-convert-an-image-into-a-link';
const GUIDE_COVER_SRC = '/images/guides/how-to-convert-an-image-into-a-link-cover.png';
const GUIDE_OG_IMAGE_URL = GUIDE_COVER_SRC;

const IMAGE_TO_LINK_HERO_BLOK: SectionStoryblok = {
  _uid: 'static-how-to-convert-an-image-into-a-link-hero',
  component: 'section',
  title: 'How to Convert an Image into a Link',
  titleTag: 'h1',
  text:
    'A practical guide to turning image files into shareable URLs. Replace bulky attachments with one controlled link ' +
    'and keep review rounds easy to follow.',
  orientation: '',
  displaySocials: false,
  imageObjectFit: 'contain',
  image: {
    _uid: 'static-how-to-convert-an-image-into-a-link-cover',
    id: null,
    alt: 'Kreatli Guide: How to convert an image into a link',
    name: '',
    focus: '',
    source: '',
    title: 'How to convert an image into a link',
    filename: GUIDE_COVER_SRC,
    copyright: '',
    fieldtype: 'asset',
  },
};

const TOC_SECTIONS = [
  'What “convert an image into a link” means',
  'Why image links beat email attachments',
  'How to convert an image into a link (step-by-step)',
  'Best practices for sharing image links',
  'Try converting an image into a link now',
  'Free tools, guides, and platform features',
  'FAQ: Convert an image into a link',
] as const;

const IMAGE_TO_LINK_FAQS = [
  {
    question: 'How do I turn an image file into a link?',
    answer:
      'Upload the image to a host or review tool that generates a shareable URL, set permissions, then copy and send ' +
      'that link. Recipients open the image in browser instead of downloading an attachment.',
  },
  {
    question: 'Is an image link the same as hotlinking?',
    answer:
      'Not necessarily. Hotlinking usually means embedding someone else’s image on your site from their server. A share ' +
      'link is permissioned access to your file—often view-only or review-enabled—so you control who sees it.',
  },
  {
    question: 'Can reviewers leave feedback from an image link?',
    answer:
      'Yes, when you use a review-ready link. Stakeholders can open the image and leave location-pinned comments in one ' +
      'place instead of scattering notes across email.',
  },
  {
    question: 'How do I share an image link securely?',
    answer:
      'Use invite-only access when possible, add expiration for time-bound reviews, and test the link in an incognito ' +
      'window to confirm what recipients see without your login.',
  },
  {
    question: 'What happens when I upload a revised image?',
    answer:
      'With version-aware review, comments stay tied to the revision they were created on. Upload a new version when ' +
      'ready and resolve or carry feedback forward intentionally.',
  },
] as const;

export default function HowToConvertAnImageIntoALinkGuidePage() {
  useSession();

  const relatedArticles = getPlatformArticles('/platform/image-to-link').filter(
    (article) => article.full_slug !== CANONICAL_PATH,
  );

  const tocLinks = TOC_SECTIONS.map((label) => ({
    label,
    url: `#${getHeadingId(label)}`,
  }));

  return (
    <>
      <FAQStructuredData faqs={[...IMAGE_TO_LINK_FAQS]} />
      <GuidePageLayout
        documentTitle={DOCUMENT_TITLE}
        metaDescription={META_DESCRIPTION}
        canonicalPath={CANONICAL_PATH}
        ogImageUrl={GUIDE_OG_IMAGE_URL}
        ogImageAlt="Kreatli Guide: How to convert an image into a link"
        publishDate={PUBLISH_DATE}
        readTimeMinutes={READ_TIME}
        breadcrumbLabel={DOCUMENT_TITLE}
        tocLinks={tocLinks}
      >
        <Section blok={IMAGE_TO_LINK_HERO_BLOK} />

        <GuideSectionRule />

        <div className={wysiwygStyles.wysiwyg}>
          <p>
            <strong>How to convert an image into a link</strong> is a sharing workflow: you host the file once, then
            distribute a single URL. That reduces attachment failures, keeps everyone on the same asset, and makes it
            easier to collect structured feedback when review matters.
          </p>

          <KeyTakeaways
            items={[
              'Upload to a hosting or review platform to generate a shareable URL for any image.',
              'Control access with passwords and expiration dates for confidential visuals.',
              'Use a review-ready link when you need location-pinned feedback, not just viewing.',
              'Share one link per image version so all feedback stays centralized.',
            ]}
          />

          <h2 id={getHeadingId(TOC_SECTIONS[0])}>{TOC_SECTIONS[0]}</h2>
          <p>
            Converting an image to a link means the file lives in cloud storage or a review workspace, and you share a
            URL that opens it. The link can be view-only, downloadable, or review-enabled depending on your tool and
            permissions.
          </p>
          <ul>
            <li>
              <p>
                <strong>One source of truth:</strong> fewer duplicate copies in inboxes and chat threads.
              </p>
            </li>
            <li>
              <p>
                <strong>Controlled access:</strong> update permissions without re-sending the binary file.
              </p>
            </li>
            <li>
              <p>
                <strong>Review-ready option:</strong> comments can stay pinned to the image instead of lost in email.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[1])}>{TOC_SECTIONS[1]}</h2>
          <p>
            Attachments break when inboxes enforce size limits, when recipients use mobile data, or when teams lose
            track of which PNG was “final-final.” A link keeps delivery predictable and versioning easier to explain.
          </p>
          <ul>
            <li>
              <p>
                <strong>Reliable delivery:</strong> one URL instead of multiple failed sends.
              </p>
            </li>
            <li>
              <p>
                <strong>Clear versioning:</strong> replace the underlying file or upload a new version in one place.
              </p>
            </li>
            <li>
              <p>
                <strong>Centralized feedback:</strong> review links keep notes attached to the asset.
              </p>
            </li>
          </ul>
          <p>
            For the platform overview, see <NextLink href="/platform/image-to-link">Image to Link</NextLink>.
          </p>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[2])}>{TOC_SECTIONS[2]}</h2>
          <ol>
            <li>
              <p>
                <strong>Upload the image</strong> to a host or creative workspace that supports share links.
              </p>
            </li>
            <li>
              <p>
                <strong>Set permissions</strong> for view, download, and (if needed) comment access.
              </p>
            </li>
            <li>
              <p>
                <strong>Copy the share URL</strong> and paste it into your message with one clear call to action.
              </p>
            </li>
            <li>
              <p>
                <strong>Test as a recipient</strong> in an incognito window to confirm access without your session.
              </p>
            </li>
            <li>
              <p>
                <strong>Iterate on versions</strong> in the same workspace so feedback stays traceable.
              </p>
            </li>
          </ol>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[3])}>{TOC_SECTIONS[3]}</h2>
          <ul>
            <li>
              <p>
                <strong>State the intent:</strong> “review for approval” vs “quick glance” changes what people look for.
              </p>
            </li>
            <li>
              <p>
                <strong>Time-box sensitive links:</strong> use expiration when the asset is confidential or
                campaign-bound.
              </p>
            </li>
            <li>
              <p>
                <strong>Avoid link sprawl:</strong> retire old URLs when a new round starts so feedback does not split.
              </p>
            </li>
            <li>
              <p>
                <strong>Pair with context:</strong> add brand, crop, or export notes so reviewers judge the right
                deliverable.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[4])}>{TOC_SECTIONS[4]}</h2>
          <p>
            The interactive preview below shows a simple “copy shareable link” flow for an image asset. When you are
            ready, <NextLink href="/sign-up">start a 7-day trial</NextLink> or{' '}
            <a href="https://calendar.app.google/NXbAeTAUwaBGh5x49" target="_blank" rel="noopener noreferrer nofollow">
              book a demo
            </a>
            .
          </p>

          <div className="my-4 w-full">
            <ShareFeaturePreview variant="image" />
          </div>
        </div>

        <GuideSectionRule />

        <GuideArticleToolsResourcesSection
          tocHeadingId={getHeadingId(TOC_SECTIONS[5])}
          tocHeadingLabel={TOC_SECTIONS[5]}
          sectionIntro={
            'Below are free tools that pair with image link sharing, plus related guides and platform features to ' +
            'explore next.'
          }
          toolsTitle="Free tools for image links and review"
          toolsDescription="Try tools that complement link sharing, markup, and approvals."
          tools={getFreeToolsForPlatform('/platform/image-to-link')}
          articlesTitle="More guides and examples"
          articlesDescription="Read more about image review, sharing, and version-aware workflows."
          articles={relatedArticles}
          articlesMax={3}
          resourcesTitle="More resources"
          resourcesDescription="Capabilities that support secure storage, image review, and structured approvals."
          resources={getRelatedResources(['annotateImage', 'secureAssetStorage', 'reviewApproval']).map(
            (resource, index) => {
              if (index === 0) return { ...resource, icon: 'panorama' };
              if (index === 1) return { ...resource, icon: 'shield' };
              return resource;
            },
          )}
        />

        <GuideSectionRule />

        <section className="relative pb-0 pt-12 md:pb-0 md:pt-16">
          <div className="relative z-10 mx-auto max-w-3xl">
            <div className={cn(wysiwygStyles.wysiwyg, '[&>h2:first-child]:!mt-0')}>
              <h2 id={getHeadingId(TOC_SECTIONS[6])}>{TOC_SECTIONS[6]}</h2>
            </div>
            <div className="mt-6 flex flex-col gap-5 sm:gap-6">
              {IMAGE_TO_LINK_FAQS.map((faq) => (
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
                Reach us at <a href="mailto:support@kreatli.com">support@kreatli.com</a> and we will help you set up
                image link sharing for your team.
              </p>
            </div>
          </div>
        </section>

        <CTASection
          layout="split"
          splitTone="guide"
          title="Ready to share images without attachment friction?"
          description={
            'Create review-ready links, keep versions organized, and collect feedback where the image actually lives.'
          }
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
