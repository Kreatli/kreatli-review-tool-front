/* eslint-disable max-len */
import { Accordion, AccordionItem } from '@heroui/react';
import Head from 'next/head';

import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';
import { ShareFeaturePreview } from '../../components/home/Features/ShareFeaturePreview';
import { FooterSection } from '../../components/home/Footer/FooterSection';
import { Header } from '../../components/layout/Header';
import { Decorations } from '../../components/layout/Storyblok/Decorations';
import { BreadcrumbStructuredData } from '../../components/shared/BreadcrumbStructuredData';
import { CTASection } from '../../components/shared/CTASection';
import { FAQStructuredData } from '../../components/shared/FAQStructuredData';
import { FreeToolsEntitlementSection } from '../../components/shared/FreeToolsEntitlementSection';
import { HeroCtaButtons } from '../../components/shared/HeroCtaButtons';
import { MoreFreeToolsSection } from '../../components/shared/MoreFreeToolsSection';
import { FILE_TO_LINK_STEPS, PlatformStepGuide } from '../../components/shared/PlatformStepGuide';
import { RelatedResourcesSection } from '../../components/shared/RelatedResourcesSection';
import { SkipToMainContent } from '../../components/shared/SkipToMainContent';
import { getFreeToolsForFreeToolPage } from '../../data/free-tools-page-tools';
import { FREE_TOOL_PAGE_ACCOUNT_FAQ } from '../../data/marketing-free-tool-access';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';
import { DefinitionBlock } from '../../components/shared/DefinitionBlock';

const PAGE_PATH = '/free-tools/file-to-link-converter';
const CANONICAL_URL = 'https://kreatli.com' + PAGE_PATH;

const faqs = [
  {
    question: 'What is a file to link converter?',
    answer:
      'A file to link converter turns your file (PDF, image, video, or other supported type) into a shareable link so you can send it to clients or collaborators without email attachments or file downloads. In Kreatli, you upload your file, generate a secure review link, and share it—recipients open the file in their browser and can comment and approve without creating an account. Every link stays tied to your project and file version.',
  },
  FREE_TOOL_PAGE_ACCOUNT_FAQ,
  {
    question: 'How do I convert a file to a link in Kreatli?',
    answer:
      'Upload your file to a Kreatli project, open the file menu (⋯) on the asset, and choose Share to create a secure review link. Copy the link or send it via the share modal (email, Slack, etc.). Recipients click the link to open the file in their browser. You can generate different links for different people or review rounds, and revoke or update access anytime.',
  },
  {
    question: 'Do recipients need to create an account to view the file link?',
    answer:
      'No. Kreatli review links are no-signup—recipients click the link and open the file in their browser. They can view the file, add comments and annotations, and submit feedback without creating an account or installing anything. That keeps the approval process fast and friction-free.',
  },
  {
    question: 'Can I have multiple links for the same file?',
    answer:
      'Yes. You can generate multiple links for the same file—for example, one per client or one per review round. Each link opens the same file (or the version you choose), and you can revoke or update access per link. Every link stays tied to the right project and version.',
  },
  {
    question: 'What happens when I upload a new version of the file?',
    answer:
      'When you upload a new version, you control who sees it. You can share the same or a new link so recipients see the updated file. Version history is kept in one place so you can compare versions and track which draft was approved.',
  },
  {
    question: 'Why use a file to link converter in Kreatli instead of WeTransfer or email?',
    answer:
      'A file to link converter in Kreatli gives you one secure link that opens in the browser—no bulky attachments, no expiring WeTransfer links. Recipients can review and comment in one place, and you get a clear record of feedback and approvals. Everything stays in your project with your video, images, PDFs, and other assets.',
  },
];

export default function FileToLinkConverterPage() {
  useSession();

  return (
    <>
      <Head>
        <title>Turn Files into Shareable Links – Free File to Link Tool | Kreatli</title>
        <meta
          name="description"
          content="Convert any file into a secure shareable link. Send one URL, collect feedback and approvals. Try free with a 7-day trial."
        />
<meta property="og:title" content="Turn Files into Shareable Links – Free File to Link Tool | Kreatli" />
        <meta
          property="og:description"
          content="Convert any file into a secure shareable link. Send one URL, collect feedback and approvals. Try free with a 7-day trial."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={CANONICAL_URL} />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:alt" content="Turn Files into Shareable Links – Free File to Link Tool | Kreatli" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Turn Files into Shareable Links – Free File to Link Tool | Kreatli" />
        <meta
          name="twitter:description"
          content="Convert any file into a secure shareable link. Send one URL, collect feedback and approvals. Try free with a 7-day trial."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
        <link rel="canonical" href={CANONICAL_URL} />
      </Head>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Free Tools', url: '/free-tools' },
          { name: 'File to Link Converter', url: PAGE_PATH },
        ]}
      />
      <FAQStructuredData faqs={faqs} />
      <Header />
      <Decorations />

      <SkipToMainContent />

      <main id="main-content">
        {/* Hero with Share Feature Preview */}
        <section className="relative overflow-hidden px-6 py-16">
          <div className="relative z-10 mx-auto max-w-6xl">
            <div className="mb-8 text-center">
              <h1 className="mx-auto max-w-lg font-sans text-3xl font-bold leading-tight sm:text-4xl sm:leading-tight">
                File to Link Converter
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground-500">
                Turn any file into a shareable link. Upload once, generate a secure review link, and send it to
                clients—they open the file in their browser and comment without signing up.
              </p>
              <HeroCtaButtons />
            </div>
            <FreeToolsEntitlementSection
              lockedTitle="File to Link Converter is available inside Kreatli"
              lockedDescription="Your trial or plan isn’t active. Start a trial or choose a plan to convert files into secure review links in Kreatli."
            >
              <ShareFeaturePreview variant="file" />
            </FreeToolsEntitlementSection>
          </div>
        </section>


        <DefinitionBlock term="File to Link Converter">
          A file-to-link converter uploads a file and returns a URL you can share for review or delivery. Creative teams use it to move large media out of email and into a controlled, comment-ready workspace.
        </DefinitionBlock>
        {/* How to turn your file into a link guide */}
        <PlatformStepGuide
          stepsSectionTitle="How to turn your file into a link in Kreatli"
          stepsIntro="Follow these steps to upload your file, generate a shareable link, and collect feedback—recipients do not need a Kreatli account. Try without signing in; signed-in users need an active trial or plan."
          steps={FILE_TO_LINK_STEPS}
          completeGuide={{
            href: '/guides/what-is-proofing-software',
            description:
              'Learn how proofing and creative review work in one place with your video, PDFs, and other assets.',
          }}
        />

        {/* Related tools */}
        <MoreFreeToolsSection tools={getFreeToolsForFreeToolPage(PAGE_PATH)} title="More Tools for Creative Teams" />

        {/* FAQ Section */}
        <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
          <div className="relative z-10 mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
              <p className="mx-auto max-w-2xl text-lg text-foreground-500">
                Learn how the file to link converter works and how it fits into your review and approval workflows.
              </p>
            </div>
            <Accordion variant="splitted" aria-label="File to link converter FAQs" className="gap-2">
              {faqs.map((faq) => (
                <AccordionItem
                  key={faq.question}
                  title={<span className="text-base font-semibold sm:text-lg">{faq.question}</span>}
                  className="py-2"
                >
                  <div className="text-sm leading-relaxed text-foreground-500 sm:text-base">{faq.answer}</div>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Related resources */}
        <RelatedResourcesSection
          resources={getRelatedResources(['annotatePdf', 'addCommentsToPdf', 'reviewApproval', 'clientApprovals'])}
          title="More Resources"
          description="Explore other Kreatli platform features for file review, annotation, and collaboration."
        />

        {/* CTA Section */}
        <CTASection
          title="Ready to share your next file with a link?"
          description="Use Kreatli's file to link converter to send secure, review-ready links to clients and collaborators in seconds."
          primaryButtonText="Start 7-day trial"
        />
      </main>

      <FooterSection hideCta />
      <SignUpModal />
    </>
  );
}
