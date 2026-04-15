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

const DOCUMENT_TITLE = 'How to Share Images: One Link, Clear Permissions, and Review-Ready Delivery';
const META_DESCRIPTION =
  'Learn how to share images online with controlled access, lightweight delivery, and optional review workflows so ' +
  'feedback stays tied to the asset.';
const PUBLISH_DATE = '2026-04-10 12:40';
const READ_TIME = '9';
const CANONICAL_PATH = '/guides/how-to-share-images';
const GUIDE_COVER_SRC = '/images/guides/how-to-share-images-cover.png';
const GUIDE_OG_IMAGE_URL = GUIDE_COVER_SRC;

const SHARE_IMAGES_HERO_BLOK: SectionStoryblok = {
  _uid: 'static-how-to-share-images-hero',
  component: 'section',
  title: 'How to Share Images',
  titleTag: 'h1',
  text:
    'A practical guide to sharing images through the web: fast delivery, explicit permissions, and one place for review ' +
    'when feedback matters.',
  orientation: '',
  displaySocials: false,
  imageObjectFit: 'contain',
  image: {
    _uid: 'static-how-to-share-images-cover',
    id: null,
    alt: 'Kreatli Guide: How to share images',
    name: '',
    focus: '',
    source: '',
    title: 'How to share images',
    filename: GUIDE_COVER_SRC,
    copyright: '',
    fieldtype: 'asset',
  },
};

const TOC_SECTIONS = [
  'What good image sharing looks like',
  'Why teams share images through links',
  'How to share images (step-by-step)',
  'Best practices for sharing images securely',
  'Try sharing an image now',
  'Free tools, guides, and platform features',
  'FAQ: Share images',
] as const;

const SHARE_IMAGES_FAQS = [
  {
    question: 'What is the easiest way to share an image online?',
    answer:
      'Upload the image to a host or creative workspace, set permissions, then send a single URL. Recipients open the ' +
      'file in browser without you re-uploading to every channel.',
  },
  {
    question: 'How do I share high-resolution images without breaking email?',
    answer:
      'Use a link to the stored asset instead of attaching the binary. Links avoid mailbox limits and keep everyone on ' +
      'the same master file.',
  },
  {
    question: 'Can reviewers comment on a shared image?',
    answer:
      'Yes when you use a review-enabled link. Stakeholders can leave location-pinned notes on the image instead of ' +
      'describing areas in text alone.',
  },
  {
    question: 'How do I keep shared images private?',
    answer:
      'Prefer invite-only access, disable public indexing, and add expiration for sensitive campaign art. Verify the ' +
      'link in an incognito session to see the guest experience.',
  },
  {
    question: 'What happens when I replace an image?',
    answer:
      'In a versioned workspace, upload a new revision so feedback stays tied to the correct file. Retire old links ' +
      'when a review round ends to prevent stray downloads.',
  },
] as const;

export default function HowToShareImagesGuidePage() {
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
      <FAQStructuredData faqs={[...SHARE_IMAGES_FAQS]} />
      <GuidePageLayout
        documentTitle={DOCUMENT_TITLE}
        metaDescription={META_DESCRIPTION}
        canonicalPath={CANONICAL_PATH}
        ogImageUrl={GUIDE_OG_IMAGE_URL}
        ogImageAlt="Kreatli Guide: How to share images"
        publishDate={PUBLISH_DATE}
        readTimeMinutes={READ_TIME}
        breadcrumbLabel={DOCUMENT_TITLE}
        tocLinks={tocLinks}
      >
        <Section blok={SHARE_IMAGES_HERO_BLOK} />

        <GuideSectionRule />

        <div className={wysiwygStyles.wysiwyg}>
          <p>
            <strong>How to share images</strong> should feel boring—in the best way. One URL, predictable permissions,
            and optional review tools mean designers, marketers, and clients stop chasing attachments and start judging
            the actual pixels together.
          </p>

          <KeyTakeaways
            items={[
              'Generate a shareable link instead of attaching images to emails or chat messages.',
              'Set access controls (password, expiration) for confidential or pre-release visuals.',
              'Use a review-ready link when recipients need to leave pinned feedback on the image.',
              'Share one link per image asset so feedback, versions, and approvals stay in one place.',
            ]}
          />

          <h2 id={getHeadingId(TOC_SECTIONS[0])}>{TOC_SECTIONS[0]}</h2>
          <p>
            Strong image sharing keeps resolution intact, shows the latest revision, and makes it obvious whether
            someone may only view, download, or annotate. The outcome is less back-and-forth about which file is
            authoritative.
          </p>
          <ul>
            <li>
              <p>
                <strong>Clarity:</strong> everyone references the same asset.
              </p>
            </li>
            <li>
              <p>
                <strong>Speed:</strong> links load faster than re-sending large files.
              </p>
            </li>
            <li>
              <p>
                <strong>Optional review:</strong> feedback stays on-image when you need it.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[1])}>{TOC_SECTIONS[1]}</h2>
          <p>
            Creative teams link-share hero shots, social crops, UI captures, and packaging mockups because it scales:
            internal reviewers, agencies, and clients can open the same URL from any device without clogging inboxes.
          </p>
          <ul>
            <li>
              <p>
                <strong>Campaign reviews:</strong> share one banner set with regional stakeholders.
              </p>
            </li>
            <li>
              <p>
                <strong>E-commerce:</strong> route SKU photography through a single approval surface.
              </p>
            </li>
            <li>
              <p>
                <strong>Brand QA:</strong> compare color and typography against guidelines with pinned notes.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[2])}>{TOC_SECTIONS[2]}</h2>
          <ol>
            <li>
              <p>
                <strong>Upload the image</strong> to storage or a review workspace with share links.
              </p>
            </li>
            <li>
              <p>
                <strong>Choose access rules</strong>—view-only, download, or comment as the stage requires.
              </p>
            </li>
            <li>
              <p>
                <strong>Copy the URL</strong> and send it with context: round name, deadline, and decision needed.
              </p>
            </li>
            <li>
              <p>
                <strong>Spot-check as a guest</strong> so permissions match expectations.
              </p>
            </li>
            <li>
              <p>
                <strong>Version deliberately</strong>—upload new files for new rounds and close out old links.
              </p>
            </li>
          </ol>
          <p>
            For image-specific link workflows, see <NextLink href="/platform/image-to-link">Image to Link</NextLink>.
          </p>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[3])}>{TOC_SECTIONS[3]}</h2>
          <ul>
            <li>
              <p>
                <strong>Name files clearly:</strong> project, channel, and version beat “final2.png.”
              </p>
            </li>
            <li>
              <p>
                <strong>Protect pre-launch creative:</strong> shorten link life for unreleased work.
              </p>
            </li>
            <li>
              <p>
                <strong>Pair with intent:</strong> tell reviewers if you need approval, copy check, or crop validation.
              </p>
            </li>
            <li>
              <p>
                <strong>Keep an audit trail:</strong> note who approved what when compliance matters.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[4])}>{TOC_SECTIONS[4]}</h2>
          <p>
            The interactive preview below shows copying a shareable link for an image asset. When you are ready,{' '}
            <NextLink href="/sign-up">start a 7-day trial</NextLink> or{' '}
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
          sectionIntro="Below are free tools that pair with image sharing, plus related guides and platform features to explore next."
          toolsTitle="Free tools for image links and review"
          toolsDescription="Try tools that complement sharing, annotation, and approvals."
          tools={getFreeToolsForPlatform('/platform/image-to-link')}
          articlesTitle="More guides and examples"
          articlesDescription="Read more about image review, markup, and version-aware workflows."
          articles={relatedArticles}
          articlesMax={3}
          resourcesTitle="More resources"
          resourcesDescription="Capabilities that support secure storage, image feedback, and structured approvals."
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
              {SHARE_IMAGES_FAQS.map((faq) => (
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
                image sharing for your team.
              </p>
            </div>
          </div>
        </section>

        <CTASection
          layout="split"
          splitTone="guide"
          title="Ready to share images without inbox overload?"
          description="Send one permissioned link, add review when you need it, and keep every round easy to track."
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
