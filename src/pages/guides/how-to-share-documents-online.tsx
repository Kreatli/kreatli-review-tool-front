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

const DOCUMENT_TITLE = 'How to Share Documents Online: Secure Links, Controlled Access, and One Review Hub';
const META_DESCRIPTION =
  'Learn how to share documents online with permissioned links, guest-friendly review, and centralized feedback so ' +
  'stakeholders always open the right file.';
const PUBLISH_DATE = '2026-04-10 12:30';
const READ_TIME = '9';
const CANONICAL_PATH = '/guides/how-to-share-documents-online';
const GUIDE_COVER_SRC = '/images/guides/how-to-share-documents-online-cover.png';
const GUIDE_OG_IMAGE_URL = GUIDE_COVER_SRC;

const SHARE_DOCS_HERO_BLOK: SectionStoryblok = {
  _uid: 'static-how-to-share-documents-online-hero',
  component: 'section',
  title: 'How to Share Documents Online',
  titleTag: 'h1',
  text:
    'A practical guide to sharing documents through the browser: one link, clear permissions, and a single place for ' +
    'feedback instead of attachment sprawl.',
  orientation: '',
  displaySocials: false,
  imageObjectFit: 'contain',
  image: {
    _uid: 'static-how-to-share-documents-online-cover',
    id: null,
    alt: 'Kreatli Guide: How to share documents online',
    name: '',
    focus: '',
    source: '',
    title: 'How to share documents online',
    filename: GUIDE_COVER_SRC,
    copyright: '',
    fieldtype: 'asset',
  },
};

const TOC_SECTIONS = [
  'What it means to share documents online',
  'Why links beat email attachments for document review',
  'How to share documents online (step-by-step)',
  'Best practices for secure document sharing',
  'Try sharing a document online now',
  'Free tools, guides, and platform features',
  'FAQ: Share documents online',
] as const;

const SHARE_DOCS_FAQS = [
  {
    question: 'Is sharing a document online the same as emailing a PDF?',
    answer:
      'Not quite. Email sends a copy; a hosted link keeps one source file with permissions you can update. Review links ' +
      'also let teams collect feedback in context instead of across separate threads.',
  },
  {
    question: 'How do I control who can open a shared document?',
    answer:
      'Use invite-only access, password or tokenized links where supported, and expiration for time-bound reviews. ' +
      'Test the link in an incognito window to confirm what a recipient sees without your login.',
  },
  {
    question: 'Can external reviewers comment without creating an account?',
    answer:
      'Many creative workflows support guest review links. Stakeholders open the document in the browser and leave ' +
      'pinned notes or approvals without installing desktop software.',
  },
  {
    question: 'What file types work best for online document sharing?',
    answer:
      'PDFs are the most common handoff for decks, one-pagers, and proofs because layout stays locked. Some teams also ' +
      'share native exports through workspace storage—pick the format that matches your approval stage.',
  },
  {
    question: 'How do I handle a revised document after feedback?',
    answer:
      'Upload a new version in the same workspace so history stays traceable. Keep comments tied to the revision they ' +
      'belong to, then resolve items as the document updates.',
  },
] as const;

export default function HowToShareDocumentsOnlineGuidePage() {
  useSession();

  const relatedArticles = getPlatformArticles('/platform/pdf-to-link').filter(
    (article) => article.full_slug !== CANONICAL_PATH,
  );

  const tocLinks = TOC_SECTIONS.map((label) => ({
    label,
    url: `#${getHeadingId(label)}`,
  }));

  return (
    <>
      <FAQStructuredData faqs={[...SHARE_DOCS_FAQS]} />
      <GuidePageLayout
        documentTitle={DOCUMENT_TITLE}
        metaDescription={META_DESCRIPTION}
        canonicalPath={CANONICAL_PATH}
        ogImageUrl={GUIDE_OG_IMAGE_URL}
        ogImageAlt="Kreatli Guide: How to share documents online"
        publishDate={PUBLISH_DATE}
        readTimeMinutes={READ_TIME}
        breadcrumbLabel={DOCUMENT_TITLE}
        tocLinks={tocLinks}
      >
        <Section blok={SHARE_DOCS_HERO_BLOK} />

        <GuideSectionRule />

        <div className={wysiwygStyles.wysiwyg}>
          <p>
            <strong>How to share documents online</strong> comes down to trust and clarity. You want recipients to open
            the correct revision, understand what they are allowed to do (view, comment, download), and leave feedback
            where the document lives—not in a parallel email chain with six conflicting attachments.
          </p>

          <h2 id={getHeadingId(TOC_SECTIONS[0])}>{TOC_SECTIONS[0]}</h2>
          <p>
            Online sharing means the file is stored in a workspace or cloud layer, and you distribute a URL.
            Permissions, activity, and comments stay attached to that asset so teams can audit who saw what and when.
          </p>
          <ul>
            <li>
              <p>
                <strong>Single source of truth:</strong> fewer “final v7” copies floating in inboxes.
              </p>
            </li>
            <li>
              <p>
                <strong>Revocable access:</strong> update or expire a link without resending binaries.
              </p>
            </li>
            <li>
              <p>
                <strong>Review-ready option:</strong> comments and approvals stay pinned to the page.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[1])}>{TOC_SECTIONS[1]}</h2>
          <p>
            Attachments break on size limits, split feedback across threads, and make version history ambiguous. A link
            keeps delivery predictable and makes it obvious which file is current—especially for client approvals and
            cross-team proofing.
          </p>
          <ul>
            <li>
              <p>
                <strong>Reliable delivery:</strong> no bounced sends on large decks.
              </p>
            </li>
            <li>
              <p>
                <strong>Centralized discussion:</strong> one thread tied to the document.
              </p>
            </li>
            <li>
              <p>
                <strong>Cleaner security story:</strong> access is explicit instead of “anyone forwarded this file.”
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[2])}>{TOC_SECTIONS[2]}</h2>
          <ol>
            <li>
              <p>
                <strong>Upload the document</strong> to a workspace that supports share links and review.
              </p>
            </li>
            <li>
              <p>
                <strong>Set permissions</strong> for view, download, and comment as needed.
              </p>
            </li>
            <li>
              <p>
                <strong>Copy the share URL</strong> and include one clear instruction in your message.
              </p>
            </li>
            <li>
              <p>
                <strong>Validate as a guest</strong> in a private window to confirm the experience.
              </p>
            </li>
            <li>
              <p>
                <strong>Iterate in place</strong>—upload new versions and retire outdated links when rounds change.
              </p>
            </li>
          </ol>
          <p>
            For PDF-specific link sharing, see <NextLink href="/platform/pdf-to-link">PDF to Link</NextLink>.
          </p>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[3])}>{TOC_SECTIONS[3]}</h2>
          <ul>
            <li>
              <p>
                <strong>Label the round:</strong> “Legal review — do not distribute” beats a naked URL.
              </p>
            </li>
            <li>
              <p>
                <strong>Time-box sensitive decks:</strong> use expiration on campaign or financial materials.
              </p>
            </li>
            <li>
              <p>
                <strong>Separate internal vs client links</strong> when permission levels should differ.
              </p>
            </li>
            <li>
              <p>
                <strong>Archive decisions:</strong> export or snapshot approvals when contracts require a record.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[4])}>{TOC_SECTIONS[4]}</h2>
          <p>
            The interactive preview below mirrors copying a secure share link for a document. When you are ready,{' '}
            <NextLink href="/sign-up">start a 7-day trial</NextLink> or{' '}
            <a href="https://calendar.app.google/NXbAeTAUwaBGh5x49" target="_blank" rel="noopener noreferrer">
              book a demo
            </a>
            .
          </p>

          <div className="my-4 w-full">
            <ShareFeaturePreview variant="pdf" />
          </div>
        </div>

        <GuideSectionRule />

        <GuideArticleToolsResourcesSection
          tocHeadingId={getHeadingId(TOC_SECTIONS[5])}
          tocHeadingLabel={TOC_SECTIONS[5]}
          sectionIntro="Below are free tools that pair with online document sharing, plus related guides and platform features to explore next."
          toolsTitle="Free tools for document links and review"
          toolsDescription="Try tools that complement sharing, PDF review, and markup."
          tools={getFreeToolsForPlatform('/platform/pdf-to-link')}
          articlesTitle="More guides and examples"
          articlesDescription="Read more about document review, approvals, and version-aware workflows."
          articles={relatedArticles}
          articlesMax={3}
          resourcesTitle="More resources"
          resourcesDescription="Capabilities that support secure sharing, PDF feedback, and structured approvals."
          resources={getRelatedResources(['addCommentsToPdf', 'annotatePdf', 'secureAssetStorage']).map(
            (resource, index) => {
              if (index === 0) return { ...resource, icon: 'chat' };
              if (index === 1) return { ...resource, icon: 'filePdf' };
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
              {SHARE_DOCS_FAQS.map((faq) => (
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
                online document sharing for your team.
              </p>
            </div>
          </div>
        </section>

        <CTASection
          layout="split"
          splitTone="guide"
          title="Ready to share documents without attachment chaos?"
          description="Use one permissioned link, keep feedback on the file, and move approvals with a clear version history."
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
