import { Accordion, AccordionItem, Button, Card, CardBody } from '@heroui/react';
import Head from 'next/head';
import NextLink from 'next/link';

import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';
import { SafeZoneScreenGuide } from '../../components/safe-zone-checker/SafeZoneScreenGuide';
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
import { getFreeToolsForPlatform } from '../../data/platform-free-tools';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';

const faqs = [
  {
    question: 'What is the TikTok safe zone?',
    answer:
      'The TikTok safe zone is the area of your video where important content (text, logos, faces, CTAs) won’t be covered by TikTok’s UI. When viewers watch TikToks, the app shows overlays such as the profile picture, username, like button, comment button, share button, and caption text. TikTok’s right-side UI is especially aggressive. If your key visuals sit where those elements appear, they can be hidden or hard to read. Checking the safe zone before you post helps you keep captions, subtitles, and branding visible.',
  },
  {
    question: 'How do I check my TikTok safe zone?',
    answer:
      'Use Kreatli’s free TikTok Safe Zone Checker. Upload or drag your TikTok video into the tool, then turn on the safe zone overlay to see exactly where TikTok’s UI elements (profile, username, like, comment, share, captions) will appear. Adjust your design so text and important visuals stay in the safe area, then export or download the preview if needed. Everything runs in your browser.',
  },
  {
    question: 'Where do TikTok UI overlays appear?',
    answer:
      'On TikTok, overlays are heaviest on the right side (engagement stack: like, comment, share, save; profile avatar and follow button) and at the bottom (caption text, hashtags). The top area may show creator name and sponsored labels. Our safe zone checker uses representative positions so you can preview where to avoid placing critical text or logos. Keep your main message and branding centered or on the left so they stay visible.',
  },
  {
    question: 'Is the TikTok Safe Zone Checker free?',
    answer:
      'Yes. Kreatli’s TikTok Safe Zone Checker is free to use. You can upload your TikTok video, preview the safe zone overlay, and see where UI elements will appear. Use it before every post to keep your content visible. If you want to bring TikToks into a full review workflow with comments and approvals, you can use Kreatli’s platform for frame-accurate feedback and client sign-off.',
  },
  {
    question: 'Why does the safe zone matter for TikTok?',
    answer:
      'TikTok’s UI is one of the most aggressive among short-form platforms, especially on the right side. If you put a headline, CTA, or logo where the like button or profile picture appears, viewers may not see it. Checking the safe zone before publishing helps you avoid covered text and keeps your message clear. It’s especially important for ads, product demos, and any TikTok where a specific call-to-action or brand moment needs to be visible.',
  },
  {
    question: 'Can I use the safe zone checker for other platforms?',
    answer:
      'Kreatli offers safe zone checkers for TikTok, Instagram Reels, and YouTube Shorts. Each tool shows where that platform’s UI overlays appear so you can adapt your content. If you create for multiple platforms, use each checker before posting to ensure your visuals stay in the safe zone on every channel. All tools are free and run in your browser.',
  },
];

export default function TikTokSafeZonePage() {
  useSession();
  const articles = getPlatformArticles('/platform/tiktok-safe-zone');

  return (
    <>
      <Head>
        <title>TikTok Safe Zone | Kreatli</title>
        <meta
          name="description"
          content="Check your TikTok safe zone before posting. Preview where profile picture, username, like button, comment button, and captions appear. Free tool."
        />
        <link rel="canonical" href="https://kreatli.com/platform/tiktok-safe-zone" />
        <meta property="og:url" content="https://kreatli.com/platform/tiktok-safe-zone" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="TikTok Safe Zone | Kreatli" />
        <meta
          property="og:description"
          content="Check your TikTok safe zone with our free tool. Preview UI overlays so your text, logos, and visuals stay visible."
        />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:secure_url" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:alt" content="TikTok Safe Zone | Kreatli" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TikTok Safe Zone | Kreatli" />
        <meta
          name="twitter:description"
          content="Check your TikTok safe zone before posting. Free tool to preview UI overlays."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
      </Head>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Platform', url: '/platform' },
          { name: 'TikTok Safe Zone', url: '/platform/tiktok-safe-zone' },
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
              TikTok Safe Zone
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground-500">
              Check your TikTok safe zone before you post. Preview where profile picture, username, like button,
              comment button, and captions appear—and keep your text, logos, and visuals visible. Free tool.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                as={NextLink}
                href="/safe-zone-checker/tiktok-safe-zone-checker"
                size="lg"
                className="bg-foreground text-content1"
              >
                Use Free TikTok Safe Zone Checker
              </Button>
              <Button as={NextLink} href="/sign-up" size="lg" variant="bordered">
                Get Started for Free
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How to Use Safe-Zone Checker (step-by-step) */}
      <SafeZoneScreenGuide
        platform="tiktok"
        stepsOnly
        stepsSectionTitle="How to Use the Safe-Zone Checker for TikTok"
      />

      {/* Feature Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">
              TikTok Safe Zone - Built for Video Teams
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              See where TikTok’s UI overlays sit on your video so you can keep headlines, CTAs, and branding in the
              safe zone. Upload, preview, and export.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="shield" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Preview Safe Zone Overlays</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Turn on the safe zone overlay to see where profile picture, username, like button, comment button,
                  share button, and caption area appear on your TikTok. Keep important text and visuals outside those
                  areas so they stay visible.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="upload" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Upload & Check Before You Post</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Drag and drop your TikTok video into the free tool. No watermark. Preview the safe zone, adjust your
                  design if needed, and export a reference so your team keeps content in the right place.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="tiktok" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">TikTok-Specific Overlays</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Our checker uses TikTok UI positions so you see where overlays sit in the app. Keep subtitles,
                  captions, and CTAs in the safe area so viewers never miss your message.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="checkCircle" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Export & Share With Your Team</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Download your preview with the safe zone overlay as a reference. Share with editors and clients so
                  everyone keeps key elements in the safe zone before TikToks go live.
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
                  After you check the safe zone, upload your TikToks to Kreatli for frame-accurate review and client
                  approval. Get feedback on placement, captions, and branding before you publish.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="addVideo" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Instagram Reels & YouTube Shorts Too</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  We also offer safe zone checkers for Instagram Reels and YouTube Shorts. Use each tool before posting
                  so your content stays visible on every platform. All free, all in your browser.
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
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Why Check the TikTok Safe Zone?</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Keeping your message in the safe zone means more viewers see your headline, CTA, and brand—and fewer
              surprises after you post.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="eye" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Keep Key Content Visible</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  TikTok’s right-side UI can cover a large part of your frame. When you check the safe zone first, you
                  avoid placing headlines, CTAs, or logos where the engagement stack or profile picture will sit.
                  Viewers see what you want them to see.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="arrowRight" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Fewer Redos After Publishing</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Catch safe zone issues before you post. Adjust text placement or graphics in the editor, run the
                  checker again, and publish with confidence. No more discovering covered text once the TikTok is live.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="smile" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Professional Look on Every TikTok</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Brands and creators who check the safe zone deliver cleaner, more readable TikToks. Use the free tool
                  as part of your pre-publish checklist so every post looks intentional and on-brand.
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
                  Check the safe zone in seconds, then move to Kreatli for review and approval if you work with clients
                  or teams. Keep safe zone validation and frame-accurate feedback in one workflow.
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
        tools={getFreeToolsForPlatform('/platform/tiktok-safe-zone')}
      />

      {/* See How This Works Section */}
      <ResourcesArticlesPreviewSection
        articles={articles}
        title="See How This Works in Practice"
        description="Explore guides and workflows for TikTok, video review, and creative proofing—so your content stays visible and on-brand."
      />

      <PricingSection />

      {/* FAQ Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Get detailed answers about the TikTok safe zone, how to check it, and how the free tool fits into your
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
              to learn how the TikTok safe zone checker and Kreatli’s review workflow can support your workflow.
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
        description="Explore more Kreatli features that support creative proofing, video review, and frame-accurate feedback—including safe zone validation."
      />

      {/* CTA Section */}
      <CTASection
        title="Ready to Check Your TikTok Safe Zone?"
        description="Use Kreatli’s free TikTok Safe Zone Checker before you post—and bring TikToks into Kreatli for review and approval when you need client sign-off."
      />
      <FooterSection hideCta={true} />
      <SignUpModal />
    </>
  );
}
