import { cn } from '@heroui/react';
import NextLink from 'next/link';

import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';
import { GuideArticleToolsResourcesSection } from '../../components/guides/GuideArticleToolsResourcesSection';
import { GuidePageLayout } from '../../components/guides/GuidePageLayout';
import { GuideSectionRule } from '../../components/guides/GuideSectionRule';
import { HomeDashboardFeaturePreview } from '../../components/home/Features/HomeDashboardFeaturePreview';
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
  'How to Organize Your Files: Projects, Versions, and One Place for Creative Assets';
const META_DESCRIPTION =
  'Learn how to organize your files around projects and deliverables, name versions clearly, and keep video, images, ' +
  'and documents easy to find for your whole team.';
const PUBLISH_DATE = '2026-04-10 11:10';
const READ_TIME = '10';
const CANONICAL_PATH = '/guides/how-to-organize-your-files';
const GUIDE_COVER_SRC = '/images/guides/how-to-organize-your-files-cover.png';
const GUIDE_OG_IMAGE_URL = GUIDE_COVER_SRC;

const ORGANIZE_FILES_HERO_BLOK: SectionStoryblok = {
  _uid: 'static-how-to-organize-your-files-hero',
  component: 'section',
  title: 'How to Organize Your Files',
  titleTag: 'h1',
  text:
    'A practical guide to file organization for creative teams: structure work by project, keep versions auditable, ' +
    'and share one link instead of scattering copies.',
  orientation: '',
  displaySocials: false,
  imageObjectFit: 'contain',
  image: {
    _uid: 'static-how-to-organize-your-files-cover',
    id: null,
    alt: 'Kreatli Guide: How to organize your files',
    name: '',
    focus: '',
    source: '',
    title: 'How to organize your files',
    filename: GUIDE_COVER_SRC,
    copyright: '',
    fieldtype: 'asset',
  },
};

const TOC_SECTIONS = [
  'What good file organization looks like',
  'Why “folder chaos” slows creative teams down',
  'How to organize your files (step-by-step)',
  'Best practices for naming, versions, and access',
  'Try the centralized project dashboard (interactive preview)',
  'Free tools, guides, and platform features',
  'FAQ: Organize your files',
] as const;

const ORGANIZE_FILES_FAQS = [
  {
    question: 'How do you organize your files as a creative team?',
    answer:
      'Anchor files to the work they support—project, campaign, or deliverable—then use consistent naming, clear ' +
      'version rules, and a single workspace everyone can access. The goal is that any teammate can find the latest ' +
      'approved asset without asking in chat.',
  },
  {
    question: 'Should I organize by file type or by project?',
    answer:
      'Prefer project-first structure. Type-based folders (all PDFs together) break down fast across clients. ' +
      'Project-first keeps briefs, exports, and review rounds collocated.',
  },
  {
    question: 'How do I keep versions from turning into “final_v7_really_final”?',
    answer:
      'Use a simple version rule (v1, v2, round A/B) and store each upload as a new version in your workspace. Pair ' +
      'that with resolved comments and approvals so “latest” is obvious.',
  },
  {
    question: 'How do permissions fit into organization?',
    answer:
      'Organize access the same way you organize folders: client-facing links for review, internal-only spaces for ' +
      'work in progress, and tight controls for sensitive deliverables.',
  },
  {
    question: 'What is the fastest win if my files are messy today?',
    answer:
      'Pick one active project, migrate its current “source of truth” files into a dedicated space, agree on a naming ' +
      'prefix, and retire duplicate links in email. Repeat project by project instead of boiling the ocean.',
  },
] as const;

export default function HowToOrganizeYourFilesGuidePage() {
  useSession();

  const relatedArticles = getPlatformArticles('/platform/file-cloud-storage').filter(
    (article) => article.full_slug !== CANONICAL_PATH,
  );

  const tocLinks = TOC_SECTIONS.map((label) => ({
    label,
    url: `#${getHeadingId(label)}`,
  }));

  return (
    <>
      <FAQStructuredData faqs={[...ORGANIZE_FILES_FAQS]} />
      <GuidePageLayout
        documentTitle={DOCUMENT_TITLE}
        metaDescription={META_DESCRIPTION}
        canonicalPath={CANONICAL_PATH}
        ogImageUrl={GUIDE_OG_IMAGE_URL}
        ogImageAlt="Kreatli Guide: How to organize your files"
        publishDate={PUBLISH_DATE}
        readTimeMinutes={READ_TIME}
        breadcrumbLabel={DOCUMENT_TITLE}
        tocLinks={tocLinks}
      >
        <Section blok={ORGANIZE_FILES_HERO_BLOK} />

        <GuideSectionRule />

        <div className={wysiwygStyles.wysiwyg}>
          <p>
            <strong>How do you organize your files</strong> when every campaign mixes video, images, PDFs, and
            work-in-progress exports? The answer is not more nested folders—it is a system where assets, feedback, and
            approvals connect to the same project story.
          </p>

          <KeyTakeaways
            items={[
              'Organize files by project first, then by deliverable or asset type within each project.',
              'Use clear, consistent naming conventions \u2014 include version numbers and dates.',
              "Keep one source of truth per file to avoid 'which version is final?' confusion.",
              'Archive completed projects rather than deleting them so history remains accessible.',
            ]}
          />

          <h2 id={getHeadingId(TOC_SECTIONS[0])}>{TOC_SECTIONS[0]}</h2>
          <p>
            Good organization means anyone can answer three questions quickly: which file is current, where feedback
            lives, and who approved it. That requires structure, naming discipline, and a workspace that supports
            versions.
          </p>
          <ul>
            <li>
              <p>
                <strong>Project context:</strong> files sit next to the brief and delivery milestones.
              </p>
            </li>
            <li>
              <p>
                <strong>Version clarity:</strong> each round is identifiable and comparable.
              </p>
            </li>
            <li>
              <p>
                <strong>Single share path:</strong> one link replaces dozens of forwarded attachments.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[1])}>{TOC_SECTIONS[1]}</h2>
          <p>
            Chaos shows up as duplicated filenames, missing finals, and feedback trapped in email. Teams burn time
            reconciling versions instead of shipping work.
          </p>
          <ul>
            <li>
              <p>
                <strong>Search cost:</strong> creatives and producers ask “which link is real?”
              </p>
            </li>
            <li>
              <p>
                <strong>Review risk:</strong> stakeholders comment on outdated exports by accident.
              </p>
            </li>
            <li>
              <p>
                <strong>Handoff drag:</strong> new teammates cannot onboard without a tour of mystery folders.
              </p>
            </li>
          </ul>
          <p>
            For platform context, see{' '}
            <NextLink href="/platform/file-cloud-storage">File Cloud Storage</NextLink>.
          </p>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[2])}>{TOC_SECTIONS[2]}</h2>
          <ol>
            <li>
              <p>
                <strong>Define the unit of work</strong> (project, campaign, or deliverable) and create a home for it.
              </p>
            </li>
            <li>
              <p>
                <strong>Move active files</strong> into that space and remove obvious duplicates from circulation.
              </p>
            </li>
            <li>
              <p>
                <strong>Agree on naming</strong> for versions, dates, and client-facing vs internal labels.
              </p>
            </li>
            <li>
              <p>
                <strong>Route feedback</strong> through review links tied to the file, not scattered threads.
              </p>
            </li>
            <li>
              <p>
                <strong>Archive completed rounds</strong> so search surfaces what is live today.
              </p>
            </li>
          </ol>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[3])}>{TOC_SECTIONS[3]}</h2>
          <ul>
            <li>
              <p>
                <strong>Human-readable names:</strong> include project code + asset type + version.
              </p>
            </li>
            <li>
              <p>
                <strong>One “approved” moment:</strong> record who signed off and on which version.
              </p>
            </li>
            <li>
              <p>
                <strong>Least privilege:</strong> clients see review links; internals see work in progress.
              </p>
            </li>
            <li>
              <p>
                <strong>Regular housekeeping:</strong> monthly pass to retire dead links and empty temp folders.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[4])}>{TOC_SECTIONS[4]}</h2>
          <p>
            Strong file organization pairs with a single place to see the project: overview, media, and activity
            together—so nothing lives in a silo. The interactive preview below is the same{' '}
            <strong>Centralized Project Dashboard</strong> pattern from the product home: tabs for project context,
            thumbnails with status, and quick actions without jumping tools. See how it fits your workflow on{' '}
            <NextLink href="/platform/creative-workspace">Creative Workspace</NextLink>.
          </p>
          <p>
            When you are ready, <NextLink href="/sign-up">start a 7-day trial</NextLink> or{' '}
            <a href="https://calendar.app.google/NXbAeTAUwaBGh5x49" target="_blank" rel="noopener noreferrer nofollow">
              book a demo
            </a>
            .
          </p>

          <div className="my-4 w-full">
            <HomeDashboardFeaturePreview />
          </div>
        </div>

        <GuideSectionRule />

        <GuideArticleToolsResourcesSection
          tocHeadingId={getHeadingId(TOC_SECTIONS[5])}
          tocHeadingLabel={TOC_SECTIONS[5]}
          sectionIntro={
            'Below are free tools that pair with file organization and cloud storage, plus related guides and platform ' +
            'features to explore next.'
          }
          toolsTitle="Free tools for file organization"
          toolsDescription="Try tools that complement storage, transfer estimates, and review workflows."
          tools={getFreeToolsForPlatform('/platform/file-cloud-storage')}
          articlesTitle="More guides and examples"
          articlesDescription="Read more about storage, workspaces, and keeping assets under control."
          articles={relatedArticles}
          articlesMax={3}
          resourcesTitle="More resources"
          resourcesDescription="Capabilities that support secure storage, projects, and structured approvals."
          resources={getRelatedResources(['secureAssetStorage', 'creativeWorkspace', 'projectOrchestration']).map(
            (resource, index) => {
              if (index === 0) return { ...resource, icon: 'shield' };
              if (index === 1) return { ...resource, icon: 'folder' };
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
              {ORGANIZE_FILES_FAQS.map((faq) => (
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
                Reach us at <a href="mailto:support@kreatli.com">support@kreatli.com</a> and we will help you design a
                file structure that fits your team.
              </p>
            </div>
          </div>
        </section>

        <CTASection
          layout="split"
          splitTone="guide"
          title="Ready to keep creative files under control?"
          description={
            'Centralize assets, clarify versions, and share one link so your team spends less time hunting and more ' +
            'time shipping.'
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
