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
import { MoreFreeToolsSection } from '../../components/shared/MoreFreeToolsSection';
import { RelatedResourcesSection } from '../../components/shared/RelatedResourcesSection';
import { ResourcesArticlesPreviewSection } from '../../components/shared/ResourcesArticlesPreviewSection';
import { Icon } from '../../components/various/Icon';
import { getPlatformArticles } from '../../data/platform-articles';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';

const faqs = [
  {
    question: 'What is the correct size for a YouTube banner?',
    answer:
      'YouTube recommends channel art dimensions of 2560 × 1440 pixels. However, the visible “safe” area varies by device: on mobile, tablet, desktop, and TV, different parts of the banner are shown. Our free YouTube Banner Resizer applies the correct dimensions and shows you the safe zone (where logos and key text should stay) so your channel art looks right on every device.',
  },
  {
    question: 'How do I resize my YouTube banner?',
    answer:
      'Use Kreatli’s free YouTube Banner Resizer. Upload or drag your image into the tool, and it applies YouTube’s recommended 2560 × 1440px canvas. You’ll see the safe zone overlay so you can keep logos and text where they’ll be visible on mobile, desktop, tablet, and TV. Adjust as needed, then export and download. Everything runs in your browser—no sign-up required.',
  },
  {
    question: 'What is the YouTube banner safe zone?',
    answer:
      'The YouTube banner safe zone is the central area (about 1546 × 423px) that remains visible across all devices. On mobile, only the center of the banner is shown; on TV, more of the sides may be visible. If you place important text or logos outside the safe zone, they can be cropped on some devices. The free Banner Resizer shows the safe zone so you can keep critical elements visible everywhere.',
  },
  {
    question: 'Is the YouTube Banner Resizer free?',
    answer:
      'Yes. Kreatli’s YouTube Banner Resizer is free to use. You can upload your image, apply the correct dimensions and safe zone, preview on device sizes, and export—no account and no watermark. Use it before every channel art update. If you want to bring banners into a full review workflow with client approval, you can use Kreatli’s platform for feedback and sign-off.',
  },
  {
    question: 'Why does my YouTube banner look cropped on mobile?',
    answer:
      'YouTube displays different portions of your banner on different devices. On mobile, only the center strip is visible, so content near the top or bottom (or far left/right) gets cropped. Resize your banner with a tool that shows the safe zone, and keep logos, channel name, and taglines within that area so they stay visible on every device.',
  },
  {
    question: 'Can I use the banner resizer for other platforms?',
    answer:
      'The YouTube Banner Resizer is built for YouTube channel art (2560 × 1440px and YouTube’s safe zones). Other platforms use different dimensions and aspect ratios. For social or web banners, you’d need platform-specific sizes. The concept of a safe zone applies everywhere: keep key content where it won’t be cropped on different devices.',
  },
];

export default function ResizeYouTubeBannerPage() {
  useSession();
  const articles = getPlatformArticles('/platform/resize-youtube-banner');

  return (
    <>
      <Head>
        <title>Resize YouTube Banner | Kreatli</title>
        <meta
          name="description"
          content="Resize your YouTube banner to 2560×1440px with safe area previews. Preview how channel art looks on mobile, desktop, tablet, and TV. Free tool."
        />
        <link rel="canonical" href="https://kreatli.com/platform/resize-youtube-banner" />
        <meta property="og:url" content="https://kreatli.com/platform/resize-youtube-banner" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Resize YouTube Banner | Kreatli" />
        <meta
          property="og:description"
          content="Resize your YouTube banner with our free tool. Apply correct dimensions and safe zone so channel art looks great on every device."
        />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:secure_url" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:alt" content="Resize YouTube Banner | Kreatli" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Resize YouTube Banner | Kreatli" />
        <meta
          name="twitter:description"
          content="Resize your YouTube banner to the correct size with safe zone previews. Free tool."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
      </Head>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Platform', url: '/platform' },
          { name: 'Resize YouTube Banner', url: '/platform/resize-youtube-banner' },
        ]}
      />
      <FAQStructuredData faqs={faqs} />
      <Header />
      <Decorations />

      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h1 className="mx-auto max-w-2xl font-sans text-3xl font-bold leading-tight sm:text-4xl sm:leading-tight">
              Resize YouTube Banner
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground-500">
              Resize your YouTube channel banner to the correct dimensions (2560×1440px) and preview the safe zone for
              mobile, desktop, tablet, and TV. Keep logos and text visible on every device. Free tool.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                as={NextLink}
                href="/free-tools/youtube-banner-resizer"
                size="lg"
                className="bg-foreground text-content1"
              >
                Use Free YouTube Banner Resizer
              </Button>
              <Button as={NextLink} href="/sign-up" size="lg" variant="bordered">
                Get Started for Free
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">
              Resize YouTube Banner - Built for Creators & Teams
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Apply YouTube’s recommended dimensions and see the safe zone so your channel art looks right on mobile,
              desktop, tablet, and TV. Upload, preview, and export.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="upload" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Correct Dimensions (2560 × 1440px)</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  The tool applies YouTube’s recommended channel art size automatically. Upload any image and get a
                  canvas that meets YouTube’s requirements—no guesswork on dimensions or aspect ratio.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="shield" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Safe Zone for All Devices</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  See where the safe zone sits so logos, channel name, and taglines stay visible on mobile, desktop,
                  tablet, and TV. YouTube crops the banner differently per device—keep key content in the safe area.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="youtube" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Device Previews</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Preview how your banner will look on desktop, mobile, tablet, and TV. Adjust placement so critical
                  elements stay inside the visible area on every device before you upload to YouTube.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="checkCircle" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Export & Download</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Download your resized banner in the correct dimensions, ready to upload to YouTube. No watermark, no
                  sign-up. Export once and use it for your channel art update.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="group" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Use With Kreatli Review Workflow</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  After you resize your banner, upload it to Kreatli for team or client review. Get feedback on
                  placement and safe zone alignment before you publish to your channel.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="addVideo" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">More Free Tools for Video Teams</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  We also offer safe zone checkers for Instagram Reels, TikTok, and YouTube Shorts, plus a video frame
                  extractor and data transfer calculator. Use the right tool for each asset—all free, all in your
                  browser.
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
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Why Resize Your YouTube Banner Properly?</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Correct dimensions and safe zone placement mean your channel art looks professional on every device—and
              viewers always see your brand and message.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="eye" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">No Cropped Logos or Text</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  When you resize with the safe zone in mind, logos and channel name stay visible on mobile, desktop,
                  tablet, and TV. Avoid the common mistake of placing key content where YouTube crops it on smaller
                  screens.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="arrowRight" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">One Export, All Devices</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  YouTube uses a single banner file and crops it per device. Resize once to 2560 × 1440px with the safe
                  zone applied, and your channel art will display correctly everywhere without multiple versions.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="smile" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Professional Channel Art</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Creators and brands who resize with a safe zone tool deliver consistent, polished channel art. Use the
                  free resizer as part of your channel setup or refresh so every update looks intentional.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="slides" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Fit Into Your Creative Workflow</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Resize in seconds, then move to Kreatli for review and approval if you work with clients or teams. Keep
                  channel art validation and feedback in one workflow.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Free Tools Section */}
      <MoreFreeToolsSection
        title="Free Tools for Video Teams"
        description="Explore our collection of free tools designed to help video and social creators work more efficiently."
        useBannerResizerInsteadOfCostCalculator
      />

      {/* See How This Works Section */}
      <ResourcesArticlesPreviewSection
        articles={articles}
        title="See How This Works in Practice"
        description="Explore guides and workflows for YouTube channel art, safe zones, and creative proofing—so your banner looks great on every device."
      />

      <PricingSection />

      {/* FAQ Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Get detailed answers about resizing your YouTube banner, safe zones, and how the free tool fits into your
              workflow.
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
              If you didn't find the answer you were looking for, reach out to our team at{' '}
              <a href="mailto:support@kreatli.com" className="font-medium text-primary underline underline-offset-2">
                support@kreatli.com
              </a>{' '}
              to learn how the YouTube Banner Resizer and Kreatli’s review workflow can support your workflow.
            </p>
          </div>
        </div>
      </section>

      {/* More Resources Section */}
      <RelatedResourcesSection
        resources={getRelatedResources(['creativeProofing', 'reviewApproval', 'videoAnnotation']).map(
          (resource, index) => {
            if (index === 0) {
              return { ...resource, icon: 'paint' };
            }
            if (index === 1) {
              return { ...resource, icon: 'shield' };
            }
            return resource;
          },
        )}
        title="More Resources"
        description="Explore more Kreatli features that support creative proofing, video review, and frame-accurate feedback—including channel art and safe zone validation."
      />

      {/* CTA Section */}
      <CTASection
        title="Ready to Resize Your YouTube Banner?"
        description="Use Kreatli’s free YouTube Banner Resizer to get the right dimensions and safe zone—and bring channel art into Kreatli for review and approval when you need client sign-off."
      />
      <FooterSection hideCta={true} />
      <SignUpModal />
    </>
  );
}
