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

const DOCUMENT_TITLE =
  'How to Manage Videos: Versions, Links, and a Library Your Team Can Trust';
const META_DESCRIPTION =
  'Learn how to manage videos with clear versioning, predictable share links, and organized storage so producers and ' +
  'clients always open the right cut.';
const PUBLISH_DATE = '2026-04-10 11:40';
const READ_TIME = '10';
const CANONICAL_PATH = '/guides/how-to-manage-videos';
const GUIDE_COVER_SRC = '/images/guides/how-to-manage-videos-cover.png';
const GUIDE_OG_IMAGE_URL = GUIDE_COVER_SRC;

const MANAGE_VIDEOS_HERO_BLOK: SectionStoryblok = {
  _uid: 'static-how-to-manage-videos-hero',
  component: 'section',
  title: 'How to Manage Videos',
  titleTag: 'h1',
  text:
    'A practical guide to video asset management: name versions clearly, centralize masters and proxies, and share one ' +
    'link per review round without inbox sprawl.',
  orientation: '',
  displaySocials: false,
  imageObjectFit: 'contain',
  image: {
    _uid: 'static-how-to-manage-videos-cover',
    id: null,
    alt: 'Kreatli Guide: How to manage videos',
    name: '',
    focus: '',
    source: '',
    title: 'How to manage videos',
    filename: GUIDE_COVER_SRC,
    copyright: '',
    fieldtype: 'asset',
  },
};

const TOC_SECTIONS = [
  'What video management means for creative teams',
  'Why ad-hoc folders and chat uploads break down',
  'How to manage videos (step-by-step)',
  'Best practices for masters, proxies, and permissions',
  'Try managing videos with a shareable link now',
  'Free tools, guides, and platform features',
  'FAQ: Manage videos',
] as const;

const MANAGE_VIDEOS_FAQS = [
  {
    question: 'What is the simplest definition of video management?',
    answer:
      'Video management is how your team stores, names, versions, and shares video files so the latest approved cut is ' +
      'always obvious—and feedback does not scatter across tools.',
  },
  {
    question: 'Should we keep both masters and review copies?',
    answer:
      'Yes. Store the high-quality master for delivery, and use a review-friendly copy (or streaming preview) for ' +
      'stakeholders. That balances quality with fast playback and fewer failed downloads.',
  },
  {
    question: 'How do share links fit into management?',
    answer:
      'Links are the handoff layer: one URL per active round, with permissions that match the audience (internal team vs ' +
      'client). Retire or update links when a round closes.',
  },
  {
    question: 'How do I prevent “wrong version” mistakes?',
    answer:
      'Upload each cut as a new version in the same asset, require comments to attach to a version, and resolve notes ' +
      'before calling a round complete.',
  },
  {
    question: 'What metrics signal good video management?',
    answer:
      'Fewer “which file?” messages, faster approval cycles, and an audit trail that shows who saw which cut and when.',
  },
] as const;

export default function HowToManageVideosGuidePage() {
  useSession();

  const relatedArticles = getPlatformArticles('/platform/manage-videos').filter(
    (article) => article.full_slug !== CANONICAL_PATH,
  );

  const tocLinks = TOC_SECTIONS.map((label) => ({
    label,
    url: `#${getHeadingId(label)}`,
  }));

  return (
    <>
      <FAQStructuredData faqs={[...MANAGE_VIDEOS_FAQS]} />
      <GuidePageLayout
        documentTitle={DOCUMENT_TITLE}
        metaDescription={META_DESCRIPTION}
        canonicalPath={CANONICAL_PATH}
        ogImageUrl={GUIDE_OG_IMAGE_URL}
        ogImageAlt="Kreatli Guide: How to manage videos"
        publishDate={PUBLISH_DATE}
        readTimeMinutes={READ_TIME}
        breadcrumbLabel={DOCUMENT_TITLE}
        tocLinks={tocLinks}
      >
        <Section blok={MANAGE_VIDEOS_HERO_BLOK} />

        <GuideSectionRule />

        <div className={wysiwygStyles.wysiwyg}>
          <p>
            <strong>How to manage videos</strong> is about making large, iterative files easy to find, share, and
            approve. When storage, naming, and review links work together, producers spend less time on logistics and
            more time on the cut.
          </p>

          <h2 id={getHeadingId(TOC_SECTIONS[0])}>{TOC_SECTIONS[0]}</h2>
          <p>
            Video management spans ingestion, organization, collaboration, and delivery. The through-line is that every
            teammate—internal or client—can open the correct file version with appropriate access.
          </p>
          <ul>
            <li>
              <p>
                <strong>Single library:</strong> cuts live beside related assets and briefs.
              </p>
            </li>
            <li>
              <p>
                <strong>Version stack:</strong> each upload is identifiable and comparable.
              </p>
            </li>
            <li>
              <p>
                <strong>Controlled sharing:</strong> links reflect the current review round.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[1])}>{TOC_SECTIONS[1]}</h2>
          <p>
            Chat and email are fine for quick pings, but they are poor systems of record for multi-gigabyte files.
            Without a hub, teams duplicate exports, lose track of approvals, and re-open solved issues on old links.
          </p>
          <ul>
            <li>
              <p>
                <strong>Fragmented copies:</strong> the same MP4 exists in five places with different names.
              </p>
            </li>
            <li>
              <p>
                <strong>Broken context:</strong> feedback references a cut that is no longer current.
              </p>
            </li>
            <li>
              <p>
                <strong>Access risk:</strong> forwarding links bypasses the permission model you intended.
              </p>
            </li>
          </ul>
          <p>
            For the platform overview, see <NextLink href="/platform/manage-videos">Manage Videos</NextLink>.
          </p>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[2])}>{TOC_SECTIONS[2]}</h2>
          <ol>
            <li>
              <p>
                <strong>Pick a system of record</strong> (workspace or library) for active projects.
              </p>
            </li>
            <li>
              <p>
                <strong>Ingest masters</strong> with consistent naming: project, cut name, version, date.
              </p>
            </li>
            <li>
              <p>
                <strong>Create review links</strong> per round with the right view/download permissions.
              </p>
            </li>
            <li>
              <p>
                <strong>Close rounds deliberately:</strong> resolve comments, archive superseded links, upload the next
                cut.
              </p>
            </li>
            <li>
              <p>
                <strong>Document handoffs:</strong> note what changed between versions for downstream teams.
              </p>
            </li>
          </ol>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[3])}>{TOC_SECTIONS[3]}</h2>
          <ul>
            <li>
              <p>
                <strong>Separate internal vs client links:</strong> not every stakeholder needs download rights.
              </p>
            </li>
            <li>
              <p>
                <strong>Use expiring links</strong> for sensitive previews when campaigns are embargoed.
              </p>
            </li>
            <li>
              <p>
                <strong>Keep proxies labeled:</strong> make it obvious when a file is for review only.
              </p>
            </li>
            <li>
              <p>
                <strong>Automate where possible:</strong> default folder templates per project type reduce setup drag.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[4])}>{TOC_SECTIONS[4]}</h2>
          <p>
            Managing videos well means sharing the right cut with the right people. The preview below shows a simple
            copy-link flow for a video asset. When you are ready, <NextLink href="/sign-up">start a 7-day trial</NextLink>{' '}
            or{' '}
            <a href="https://calendar.app.google/NXbAeTAUwaBGh5x49" target="_blank" rel="noopener noreferrer">
              book a demo
            </a>
            .
          </p>

          <div className="my-4 w-full">
            <ShareFeaturePreview variant="video" />
          </div>
        </div>

        <GuideSectionRule />

        <GuideArticleToolsResourcesSection
          tocHeadingId={getHeadingId(TOC_SECTIONS[5])}
          tocHeadingLabel={TOC_SECTIONS[5]}
          sectionIntro={
            'Below are free tools that pair with video management, plus related guides and platform features to explore ' +
            'next.'
          }
          toolsTitle="Free tools for managing videos"
          toolsDescription="Try tools that complement hosting, review, and transfer planning."
          tools={getFreeToolsForPlatform('/platform/manage-videos')}
          articlesTitle="More guides and examples"
          articlesDescription="Read more about video workflows, storage, and approvals."
          articles={relatedArticles}
          articlesMax={3}
          resourcesTitle="More resources"
          resourcesDescription="Capabilities that support secure storage, review, and creative orchestration."
          resources={getRelatedResources(['secureAssetStorage', 'videoAnnotation', 'creativeWorkspace']).map(
            (resource, index) => {
              if (index === 0) return { ...resource, icon: 'shield' };
              if (index === 1) return { ...resource, icon: 'paint' };
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
              {MANAGE_VIDEOS_FAQS.map((faq) => (
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
                Reach us at <a href="mailto:support@kreatli.com">support@kreatli.com</a> and we will help you set up video
                management that scales with your productions.
              </p>
            </div>
          </div>
        </section>

        <CTASection
          layout="split"
          splitTone="guide"
          title="Ready to manage video cuts without the chaos?"
          description={
            'Centralize versions, share controlled links, and keep reviews and approvals tied to the right file.'
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
