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

const DOCUMENT_TITLE = 'How to Turn a PDF into a Link: Share, Review, and Approve Without Attachments';
const META_DESCRIPTION =
  'Learn how to turn a PDF into a link, control access, and share one review-ready URL so feedback stays centralized and approvals move faster.';
const PUBLISH_DATE = '2026-04-10 10:30';
const READ_TIME = '9';
const CANONICAL_PATH = '/guides/how-to-turn-a-pdf-into-a-link';
const GUIDE_COVER_SRC = '/images/guides/how-to-turn-a-pdf-into-a-link-cover.png';
const GUIDE_OG_IMAGE_URL = GUIDE_COVER_SRC;

const PDF_TO_LINK_HERO_BLOK: SectionStoryblok = {
  _uid: 'static-how-to-turn-a-pdf-into-a-link-hero',
  component: 'section',
  title: 'How to Turn a PDF into a Link',
  titleTag: 'h1',
  text: 'A practical guide to replacing heavy attachments with shareable PDF links. Control access, keep feedback centralized, and simplify approvals.',
  orientation: '',
  displaySocials: false,
  imageObjectFit: 'contain',
  image: {
    _uid: 'static-how-to-turn-a-pdf-into-a-link-cover',
    id: null,
    alt: 'Kreatli Guide: How to turn a PDF into a link',
    name: '',
    focus: '',
    source: '',
    title: 'How to turn a PDF into a link',
    filename: GUIDE_COVER_SRC,
    copyright: '',
    fieldtype: 'asset',
  },
};

const TOC_SECTIONS = [
  'What “turning a PDF into a link” means',
  'Why PDF links beat attachments for review',
  'How to turn a PDF into a link (step-by-step)',
  'Best practices for secure PDF sharing',
  'Try turning a PDF into a link now',
  'Free tools, guides, and platform features',
  'FAQ: Turn a PDF into a link',
] as const;

const PDF_TO_LINK_FAQS = [
  {
    question: 'How do I turn a PDF into a shareable link?',
    answer:
      'Upload the PDF to a tool that supports link sharing, set the right permissions, then copy and share one URL. Recipients open the file directly instead of downloading an email attachment.',
  },
  {
    question: 'What is the main benefit of sharing a PDF link instead of an attachment?',
    answer:
      'A link avoids attachment size limits and keeps everyone on the same file version. It also lets you control access, expiration, and whether recipients can download the original.',
  },
  {
    question: 'Can I collect comments from one PDF link?',
    answer:
      'Yes, if you use a review-ready link. Stakeholders can leave location-pinned feedback in one place instead of splitting comments across separate email chains.',
  },
  {
    question: 'How can I share a PDF link securely?',
    answer:
      'Use invite-only permissions when possible, add expiration for time-bound access, and test the link in an incognito window to verify the recipient experience.',
  },
  {
    question: 'What happens when I upload a new PDF version?',
    answer:
      'Version-aware tools let you keep review history while updating the underlying file. That makes it easier to confirm which feedback is resolved and which items remain open.',
  },
] as const;

export default function HowToTurnAPdfIntoALinkGuidePage() {
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
      <FAQStructuredData faqs={[...PDF_TO_LINK_FAQS]} />
      <GuidePageLayout
        documentTitle={DOCUMENT_TITLE}
        metaDescription={META_DESCRIPTION}
        canonicalPath={CANONICAL_PATH}
        ogImageUrl={GUIDE_OG_IMAGE_URL}
        ogImageAlt="Kreatli Guide: How to turn a PDF into a link"
        publishDate={PUBLISH_DATE}
        readTimeMinutes={READ_TIME}
        breadcrumbLabel={DOCUMENT_TITLE}
        tocLinks={tocLinks}
      >
        <Section blok={PDF_TO_LINK_HERO_BLOK} />

        <GuideSectionRule />

        <div className={wysiwygStyles.wysiwyg}>
          <p>
            <strong>How to turn a PDF into a link</strong> is mostly a sharing workflow decision. Instead of sending
            heavy attachments that get lost in inboxes, you publish one controlled URL that opens the right file version
            and can collect feedback in context.
          </p>

          <h2 id={getHeadingId(TOC_SECTIONS[0])}>{TOC_SECTIONS[0]}</h2>
          <p>
            A PDF link points to a hosted file that recipients can open in browser. Depending on your sharing settings, it
            can be view-only, downloadable, or review-enabled with comments.
          </p>
          <ul>
            <li>
              <p>
                <strong>Single source:</strong> everyone views the same file version.
              </p>
            </li>
            <li>
              <p>
                <strong>Access controls:</strong> adjust permissions, expiry, and audience.
              </p>
            </li>
            <li>
              <p>
                <strong>Cleaner communication:</strong> one URL replaces multiple attachment copies.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[1])}>{TOC_SECTIONS[1]}</h2>
          <p>
            Attachments can fail due to file size, blocked inbox policies, or version confusion. Link-based sharing avoids
            these problems and makes review cycles easier to manage.
          </p>
          <ul>
            <li>
              <p>
                <strong>No resend loops:</strong> update access in one place instead of reattaching files.
              </p>
            </li>
            <li>
              <p>
                <strong>Version clarity:</strong> recipients do not accidentally review stale copies.
              </p>
            </li>
            <li>
              <p>
                <strong>Review-ready flow:</strong> comments and approvals stay linked to the document.
              </p>
            </li>
          </ul>
          <p>
            For the platform workflow, see <NextLink href="/platform/pdf-to-link">PDF to Link</NextLink>.
          </p>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[2])}>{TOC_SECTIONS[2]}</h2>
          <ol>
            <li>
              <p>
                <strong>Upload the PDF</strong> to a sharing or review tool.
              </p>
            </li>
            <li>
              <p>
                <strong>Set permissions</strong> for who can view, comment, or download.
              </p>
            </li>
            <li>
              <p>
                <strong>Generate the share link</strong> and copy the URL.
              </p>
            </li>
            <li>
              <p>
                <strong>Send one clear message</strong> with the link and desired action (review, approve, or both).
              </p>
            </li>
            <li>
              <p>
                <strong>Track feedback in place</strong> and update versions as needed.
              </p>
            </li>
          </ol>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[3])}>{TOC_SECTIONS[3]}</h2>
          <ul>
            <li>
              <p>
                <strong>Principle of least access:</strong> grant only the permissions needed for the review round.
              </p>
            </li>
            <li>
              <p>
                <strong>Time-box sensitive links:</strong> use expiration for temporary access.
              </p>
            </li>
            <li>
              <p>
                <strong>Test before sharing:</strong> open in incognito to validate recipient visibility.
              </p>
            </li>
            <li>
              <p>
                <strong>Keep one active link path:</strong> avoid distributing multiple competing URLs.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[4])}>{TOC_SECTIONS[4]}</h2>
          <p>
            The interactive preview below mirrors a PDF sharing flow where one link is copied and sent to reviewers. When
            you are ready, <NextLink href="/sign-up">start a 7-day trial</NextLink> or{' '}
            <a href="https://calendar.app.google/NXbAeTAUwaBGh5x49" target="_blank" rel="noopener noreferrer nofollow">
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
          sectionIntro="Below are free tools that pair with PDF link sharing, plus related guides and platform features to explore next."
          toolsTitle="Free tools for PDF links and review"
          toolsDescription="Try tools that complement link sharing, comments, and approvals."
          tools={getFreeToolsForPlatform('/platform/pdf-to-link')}
          articlesTitle="More guides and examples"
          articlesDescription="Read more about document sharing, review loops, and version-aware approvals."
          articles={relatedArticles}
          articlesMax={3}
          resourcesTitle="More resources"
          resourcesDescription="Capabilities that support secure sharing, PDF review, and structured approvals."
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
              {PDF_TO_LINK_FAQS.map((faq) => (
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
                secure PDF link sharing for your team.
              </p>
            </div>
          </div>
        </section>

        <CTASection
          layout="split"
          splitTone="guide"
          title="Ready to share PDFs without attachment chaos?"
          description="Create one review-ready link, control access, and keep comments and approvals tied to the right version."
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
