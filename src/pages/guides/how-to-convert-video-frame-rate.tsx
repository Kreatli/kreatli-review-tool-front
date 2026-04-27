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
import { VideoFrameRateConverterTool } from '../../components/video-frame-rate-converter/VideoFrameRateConverterTool';
import { getPlatformArticles } from '../../data/platform-articles';
import { getFreeToolsForPlatform } from '../../data/platform-free-tools';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';
import { SectionStoryblok } from '../../typings/storyblok';
import { getHeadingId } from '../../utils/storyblok';

const DOCUMENT_TITLE = 'How to Convert Video Frame Rate: Choose the Right FPS and Export Constant Frame Rate';
const META_DESCRIPTION =
  'Learn how to convert video frame rate for delivery specs and post workflows, when to choose 24/25/30/60 FPS, and how to export constant-frame-rate video.';
const PUBLISH_DATE = '2026-04-27 00:00';
const READ_TIME = '9';
const CANONICAL_PATH = '/guides/how-to-convert-video-frame-rate';
const GUIDE_COVER_SRC = '/images/guides/how-to-convert-video-frame-rate-cover.png';
const GUIDE_OG_IMAGE_URL = GUIDE_COVER_SRC;

const HERO_BLOK: SectionStoryblok = {
  _uid: 'static-how-to-convert-video-frame-rate-hero',
  component: 'section',
  title: 'How to Convert Video Frame Rate',
  titleTag: 'h1',
  text: 'A practical guide to choosing target FPS, converting variable frame rate footage to constant frame rate, and preparing clean delivery files.',
  orientation: '',
  displaySocials: false,
  imageObjectFit: 'contain',
  image: {
    _uid: 'static-how-to-convert-video-frame-rate-cover',
    id: null,
    alt: 'Kreatli guide: how to convert video frame rate',
    name: '',
    focus: '',
    source: '',
    title: 'How to convert video frame rate',
    filename: GUIDE_COVER_SRC,
    copyright: '',
    fieldtype: 'asset',
  },
};

const TOC_SECTIONS = [
  'When frame rate conversion is worth doing',
  'How to choose between 24, 25, 30, 50, and 60 FPS',
  'How to convert to constant frame rate in the browser',
  'What can go wrong (and how to troubleshoot)',
  'After conversion: review and approvals',
  'Free tools, guides, and platform features',
  'FAQ: How to convert video frame rate',
] as const;

const GUIDE_FAQS = [
  {
    question: 'What is the difference between frame rate and frame size?',
    answer:
      'Frame rate is how many frames play per second (FPS). Frame size is pixel dimensions such as 1920×1080. They affect different parts of quality and file characteristics.',
  },
  {
    question: 'Should I always convert to 60fps for better quality?',
    answer:
      'Not always. Higher FPS can feel smoother but may increase file size and is unnecessary for many deliveries. Match the destination spec rather than always choosing the highest rate.',
  },
  {
    question: 'Why convert variable frame rate footage to constant frame rate?',
    answer:
      'Some editing and review workflows are more stable with constant frame rate footage. Converting can reduce sync drift or timeline behavior issues in downstream tools.',
  },
  {
    question: 'Does FPS conversion reduce visual quality?',
    answer:
      'Any re-encode can affect quality. Use practical settings, preview the result, and keep a source master when final fidelity matters.',
  },
  {
    question: 'Can I keep audio when converting frame rate?',
    answer:
      'Yes. The conversion workflow keeps audio and exports a playable file format suitable for handoff and review.',
  },
] as const;

export default function HowToConvertVideoFrameRateGuidePage() {
  useSession();

  const relatedArticles = getPlatformArticles('/platform/video-frame-rate-converter').filter(
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
        ogImageAlt="Kreatli guide: how to convert video frame rate"
        publishDate={PUBLISH_DATE}
        readTimeMinutes={READ_TIME}
        breadcrumbLabel={DOCUMENT_TITLE}
        tocLinks={tocLinks}
      >
        <Section blok={HERO_BLOK} />

        <GuideSectionRule />

        <div className={wysiwygStyles.wysiwyg}>
          <p>
            <strong>Video frame rate conversion</strong> helps you match delivery specs and keep edits predictable when
            source clips come from mixed devices. The goal is not “highest FPS” in every case - it is the right FPS for
            your channel and workflow.
          </p>

          <KeyTakeaways
            items={[
              'Choose FPS based on destination requirements, not habit.',
              'Constant frame rate exports can improve timeline consistency in some post workflows.',
              'Re-encoding can impact quality, so keep a source master.',
              'Convert first, then review the same file your team will approve.',
            ]}
          />

          <h2 id={getHeadingId(TOC_SECTIONS[0])}>{TOC_SECTIONS[0]}</h2>
          <p>Convert frame rate when one of these applies:</p>
          <ul>
            <li>
              <p>Your destination requires a specific FPS.</p>
            </li>
            <li>
              <p>You need to normalize mixed-source footage.</p>
            </li>
            <li>
              <p>You want constant frame rate output before editing or approval rounds.</p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[1])}>{TOC_SECTIONS[1]}</h2>
          <ul>
            <li>
              <p>
                <strong>24 fps:</strong> common for cinematic style.
              </p>
            </li>
            <li>
              <p>
                <strong>25 fps:</strong> common in PAL workflows.
              </p>
            </li>
            <li>
              <p>
                <strong>30 fps:</strong> standard for many web and social deliveries.
              </p>
            </li>
            <li>
              <p>
                <strong>50/60 fps:</strong> useful when motion smoothness is a priority.
              </p>
            </li>
          </ul>
          <p>Always check your final destination spec before locking the target rate.</p>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[2])}>{TOC_SECTIONS[2]}</h2>
          <ol>
            <li>
              <p>Upload the source video to the converter.</p>
            </li>
            <li>
              <p>Select your target FPS and output format.</p>
            </li>
            <li>
              <p>Run conversion and download the constant-FPS export.</p>
            </li>
          </ol>
          <p>
            Try the live workflow in the{' '}
            <NextLink href="/free-tools/video-frame-rate-converter">Video Frame Rate Converter</NextLink>.
          </p>

          <p className="mb-2">Interactive preview:</p>
          <div className="my-4 w-full">
            <VideoFrameRateConverterTool />
          </div>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[3])}>{TOC_SECTIONS[3]}</h2>
          <ul>
            <li>
              <p>
                <strong>Output not smooth enough:</strong> validate that target FPS matches the intended channel.
              </p>
            </li>
            <li>
              <p>
                <strong>Processing is slow:</strong> try shorter clips or lower-resolution source files.
              </p>
            </li>
            <li>
              <p>
                <strong>Large output size:</strong> pair FPS conversion with compression before handoff.
              </p>
            </li>
          </ul>

          <hr />
          <h2 id={getHeadingId(TOC_SECTIONS[4])}>{TOC_SECTIONS[4]}</h2>
          <p>
            After conversion, move directly into review so the same file is discussed and approved by everyone. For
            workflow context, see the <NextLink href="/platform/video-frame-rate-converter">platform page</NextLink>.
          </p>
        </div>

        <GuideSectionRule />

        <GuideArticleToolsResourcesSection
          tocHeadingId={getHeadingId(TOC_SECTIONS[5])}
          tocHeadingLabel={TOC_SECTIONS[5]}
          sectionIntro="Explore related tools and articles that help with conversion prep, review workflows, and delivery."
          toolsTitle="Free tools for video prep"
          toolsDescription="Use adjacent tools for compression, resizing, and handoff prep."
          tools={getFreeToolsForPlatform('/platform/video-frame-rate-converter')}
          articlesTitle="More guides and examples"
          articlesDescription="Learn practical production workflows around frame rate, delivery, and approvals."
          articles={relatedArticles}
          articlesMax={3}
          resourcesTitle="More resources"
          resourcesDescription="Capabilities that support organized review and approval after conversion."
          resources={getRelatedResources(['creativeWorkspace', 'reviewApproval', 'videoAnnotation'])}
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
                Reach us at <a href="mailto:support@kreatli.com">support@kreatli.com</a> and we will help with your
                frame-rate conversion and review workflow setup.
              </p>
            </div>
          </div>
        </section>

        <CTASection
          layout="split"
          splitTone="guide"
          title="Ready to convert and review in one flow?"
          description="Convert frame rate for delivery, then keep versions, comments, and approvals organized in Kreatli."
          primaryButtonText="Start for Free"
          primaryButtonHref="/sign-up"
          splitPromoImageSrc="/images/guides/embed-video-cta.png"
          splitPromoImageAlt="Kreatli platform: tasks, review timeline, media library, and version compare"
        />
      </GuidePageLayout>
      <SignUpModal />
    </>
  );
}
