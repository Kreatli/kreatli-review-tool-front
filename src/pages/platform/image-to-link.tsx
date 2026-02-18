/* eslint-disable simple-import-sort/imports */
import { Accordion, AccordionItem, Button, Card, CardBody } from '@heroui/react';
import Head from 'next/head';
import NextLink from 'next/link';

import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';
import { FooterSection } from '../../components/home/Footer/FooterSection';
import { PricingSection } from '../../components/home/PricingSection/PricingSection';
import { Header } from '../../components/layout/Header';
import { Decorations } from '../../components/layout/Storyblok/Decorations';
import { BreadcrumbStructuredData } from '../../components/shared/BreadcrumbStructuredData';
import { CTASection } from '../../components/shared/CTASection';
import { FAQStructuredData } from '../../components/shared/FAQStructuredData';
import { ShareFeaturePreview } from '../../components/home/Features/ShareFeaturePreview';
import {
  IMAGE_TO_LINK_STEPS,
  PlatformStepGuide,
} from '../../components/shared/PlatformStepGuide';
import { MoreFreeToolsSection } from '../../components/shared/MoreFreeToolsSection';
import { RelatedResourcesSection } from '../../components/shared/RelatedResourcesSection';
import { ResourcesArticlesPreviewSection } from '../../components/shared/ResourcesArticlesPreviewSection';
import { Icon } from '../../components/various/Icon';
import { getPlatformArticles } from '../../data/platform-articles';
import { getFreeToolsForPlatform } from '../../data/platform-free-tools';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';

const faqs = [
  {
    question: 'What is image to link?',
    answer:
      'Image to link means turning your image into a shareable link so you can send it to clients or collaborators without email attachments or file downloads. In Kreatli, you upload your image, generate a secure review link, and share it—recipients open the image in their browser and can comment and approve without creating an account. Every link stays tied to your project and file version.',
  },
  {
    question: 'How do I turn an image into a link in Kreatli?',
    answer:
      "Upload your image to a Kreatli project, open the file menu (⋯) on the asset, and choose Share to create a secure review link. Copy the link or send it via the share modal (email, Slack, etc.). Recipients click the link to open the image in their browser. You can generate different links for different people or review rounds, and revoke or update access anytime.",
  },
  {
    question: 'Do recipients need to create an account to view the image link?',
    answer:
      'No. Kreatli review links are no-signup—recipients click the link and open the image in their browser. They can view the image, add comments and annotations, and submit feedback without creating an account or installing anything. That keeps the approval process fast and friction-free.',
  },
  {
    question: 'Can I have multiple links for the same image?',
    answer:
      'Yes. You can generate multiple links for the same image—for example, one per client or one per review round. Each link opens the same file (or the version you choose), and you can revoke or update access per link. Every link stays tied to the right project and version.',
  },
  {
    question: 'What happens when I upload a new version of the image?',
    answer:
      'When you upload a new version, you control who sees it. You can share the same or a new link so recipients see the updated image. Version history is kept in one place so you can compare versions and track which draft was approved.',
  },
  {
    question: 'Why use image to link in Kreatli instead of WeTransfer or email?',
    answer:
      'Image to link in Kreatli gives you one secure link that opens in the browser—no bulky attachments, no expiring WeTransfer links. Recipients can review and comment in one place, and you get a clear record of feedback and approvals. Everything stays in your project with your video, PDFs, and other assets.',
  },
  {
    question: 'How does image to link help creative and marketing workflows?',
    answer:
      'Image to link streamlines how you send visuals, mockups, and assets to clients. One link replaces email attachments and file-hosting hops. Recipients open, comment, and approve in the browser; you track resolution and versions in one place. That speeds up approvals and keeps handoffs clear.',
  },
];

export default function ImageToLinkPage() {
  useSession();
  const articles = getPlatformArticles('/platform/image-to-link');

  return (
    <>
      <Head>
        <title>Image to Link | Kreatli</title>
        <meta
          name="description"
          content="Turn your image into a shareable link. Image to link for secure review—send one link, collect feedback, no sign-up required."
        />
        <link rel="canonical" href="https://kreatli.com/platform/image-to-link" />
        <meta property="og:url" content="https://kreatli.com/platform/image-to-link" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Image to Link | Kreatli" />
        <meta
          property="og:description"
          content="Turn your image into a shareable link. Image to link for secure review—send one link, collect feedback, no sign-up required."
        />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:secure_url" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:alt" content="Image to Link | Kreatli" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Image to Link | Kreatli" />
        <meta
          name="twitter:description"
          content="Turn your image into a shareable link. Image to link for secure review—send one link, collect feedback, no sign-up required."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
      </Head>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Platform', url: '/platform' },
          { name: 'Image to Link', url: '/platform/image-to-link' },
        ]}
      />
      <FAQStructuredData faqs={faqs} />
      <Header />
      <Decorations />

      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h1 className="mx-auto max-w-lg font-sans text-3xl font-bold leading-tight sm:text-4xl sm:leading-tight">
              Image to Link
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground-500">
              Turn your image into a shareable link. Upload once, generate a secure review link, and send it to
              clients—they open the image in their browser and comment without signing up.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button as={NextLink} href="/sign-up" size="lg" className="bg-foreground text-content1">
                Get Started for Free
              </Button>
              <Button
                as="a"
                href="https://calendar.app.google/NXbAeTAUwaBGh5x49"
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                variant="bordered"
              >
                Book a Demo
              </Button>
            </div>
          </div>
          <ShareFeaturePreview variant="image" />
        </div>
      </section>

      <PlatformStepGuide
        stepsSectionTitle="How to turn your image into a link in Kreatli"
        stepsIntro="Follow these steps to upload your image, generate a shareable link, and collect feedback—no sign-up required for recipients."
        steps={IMAGE_TO_LINK_STEPS}
        completeGuide={{
          href: '/guides/what-is-proofing-software',
          description:
            'Learn how proofing and creative review work in one place with your video, images, and other assets.',
        }}
      />

      {/* How image to link works Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">How Image to Link Works</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Upload your image, get a link, share it—recipients open and review in the browser with no account or
              download.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="upload" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Upload Your Image</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Add your image to a Kreatli project. The file is stored securely with version history so you can
                  generate as many review links as you need.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="link" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Generate a Secure Link</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Open the file menu and choose Share to create a review link. You can generate links for different
                  stakeholders or rounds—each opens the image in the browser with no download or account required.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="share" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Share the Link</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Send the link by email, Slack, or any channel. Recipients click once to open the image and leave
                  comments and annotations—no sign-up or app install.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="chat" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Collect Feedback</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  All comments and annotations appear in one place. Jump to any spot, track what's resolved, and keep
                  every review round in one thread.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="time" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Version History</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Upload new versions of your image and share the same or a new link. Version history keeps every draft
                  in one place so you never lose track of which file is current.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="checkCircle" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Track Approvals</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  See who's approved which version and revoke or update link access anytime. Every link stays tied to
                  the right project and file version.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Why Use Image to Link in Kreatli</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Replace email attachments and file-hosting hops with one secure link that opens in the browser and
              collects feedback in one place.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="link" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">One Link, No Attachments</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Skip bulky email attachments and expiring WeTransfer links. Send one link—recipients open the image in
                  their browser and comment without downloading or signing up.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="group" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">One Place for Images and Video</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Turn images into links alongside video and PDFs in the same project. One review workflow, one approval
                  trail, less tool-switching.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="smile" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Client-Friendly Review</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Clients click the link and review in the browser—no account or install. Faster approvals and a clear
                  record of who approved which version.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="shield" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Control Access</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Generate multiple links per image, revoke or update access anytime, and keep every link tied to the
                  right project and version.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Free Tools Section */}
      <MoreFreeToolsSection
        title="Free Tools for Creative Teams"
        description="Explore our collection of free tools designed to help creative and video professionals work more efficiently."
        tools={getFreeToolsForPlatform('/platform/image-to-link')}
      />

      {/* See How This Works Section */}
      <ResourcesArticlesPreviewSection
        articles={articles}
        title="See How This Works in Practice"
        description="Explore guides and comparisons that show how teams use image to link and manage review in Kreatli."
      />

      <PricingSection />

      {/* FAQ Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Get detailed answers about image to link and review workflows in Kreatli.
            </p>
          </div>
          <Accordion variant="splitted" className="gap-2">
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
          <div className="mx-auto mt-12 flex max-w-3xl flex-col items-center gap-4 text-center">
            <h3 className="font-sans text-xl font-bold">Still Have Questions?</h3>
            <p className="text-foreground-500">
              If you didn't find the answer you were looking for, contact our support team at{' '}
              <a href="mailto:support@kreatli.com" className="font-medium text-primary underline underline-offset-2">
                support@kreatli.com
              </a>{' '}
              to learn how Kreatli can help you turn images into links and streamline your review workflow.
            </p>
          </div>
        </div>
      </section>

      {/* More Resources Section */}
      <RelatedResourcesSection
        resources={getRelatedResources([
          'reviewApproval',
          'creativeProofing',
          'annotatePdf',
          'drawOnPdfDocument',
          'addCommentsToPdf',
        ])}
        title="More Resources"
        description="Explore other Kreatli platform features to streamline your review and collaboration workflow."
      />

      {/* CTA Section */}
      <CTASection
        title="Ready to Turn Your Image into a Link?"
        description="Image to link: upload once, get a secure review link, and collect feedback in one place. Start using Kreatli today."
      />
      <FooterSection hideCta={true} />
      <SignUpModal />
    </>
  );
}
