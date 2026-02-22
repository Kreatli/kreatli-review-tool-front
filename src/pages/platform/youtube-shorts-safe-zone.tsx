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
    question: 'What is the YouTube Shorts safe zone?',
    answer:
      'The YouTube Shorts safe zone is the area of your video where important content (text, logos, faces, CTAs) won’t be covered by YouTube’s UI. When viewers watch Shorts, the app shows overlays such as the channel name, subscribe prompt, like button, comment button, share button, and title snippets. YouTube’s UI is lighter than TikTok’s but still predictable. If your key visuals sit where those elements appear, they can be hidden or hard to read. Checking the safe zone before you post helps you keep text, logos, and branding visible.',
  },
  {
    question: 'How do I check my YouTube Shorts safe zone?',
    answer:
      'Use Kreatli’s free YouTube Shorts Safe Zone Checker. Upload or drag your Shorts video into the tool, then turn on the safe zone overlay to see exactly where YouTube’s UI elements (channel name, like, comment, share, title) will appear. Adjust your design so text and important visuals stay in the safe area, then export or download the preview if needed. Everything runs in your browser.',
  },
  {
    question: 'Where do YouTube Shorts UI overlays appear?',
    answer:
      'On YouTube Shorts, overlays typically appear at the bottom (video title snippets, channel name, engagement prompts) and on the right (like, dislike, comment, share icons). The top area may show system indicators. YouTube rarely blocks the center of the frame, which makes Shorts more forgiving—but only if content is composed intentionally. Our safe zone checker uses representative positions so you can preview where to keep critical text and logos.',
  },
  {
    question: 'Is the YouTube Shorts Safe Zone Checker free?',
    answer:
      'Yes. Kreatli’s YouTube Shorts Safe Zone Checker is free to use. You can upload your Shorts video, preview the safe zone overlay, and see where UI elements will appear. Use it before every post to keep your content visible. If you want to bring Shorts into a full review workflow with comments and approvals, you can use Kreatli’s platform for frame-accurate feedback and client sign-off.',
  },
  {
    question: 'Why does the safe zone matter for YouTube Shorts?',
    answer:
      'Shorts often autoplay in feeds and resurface via search, so legibility and long-term visibility matter. If you put a headline, CTA, or logo where the channel name or engagement buttons appear, viewers may not see it. Checking the safe zone before publishing helps you avoid covered text and keeps your message clear. It’s especially important for brands and creators who want Shorts to perform well over time.',
  },
  {
    question: 'Can I use the safe zone checker for other platforms?',
    answer:
      'Kreatli offers safe zone checkers for YouTube Shorts, TikTok, and Instagram Reels. Each tool shows where that platform’s UI overlays appear so you can adapt your content. If you create for multiple platforms, use each checker before posting to ensure your visuals stay in the safe zone on every channel. All tools are free and run in your browser.',
  },
];

export default function YouTubeShortsSafeZonePage() {
  useSession();
  const articles = getPlatformArticles('/platform/youtube-shorts-safe-zone');

  return (
    <>
      <Head>
        <title>YouTube Shorts Safe Zone | Kreatli</title>
        <meta
          name="description"
          content="Check your YouTube Shorts safe zone before posting. Preview where channel name, like button, comment button, and title appear. Free tool."
        />
        <link rel="canonical" href="https://kreatli.com/platform/youtube-shorts-safe-zone" />
        <meta property="og:url" content="https://kreatli.com/platform/youtube-shorts-safe-zone" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="YouTube Shorts Safe Zone | Kreatli" />
        <meta
          property="og:description"
          content="Check your YouTube Shorts safe zone with our free tool. Preview UI overlays so your text, logos, and visuals stay visible."
        />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:secure_url" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:alt" content="YouTube Shorts Safe Zone | Kreatli" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="YouTube Shorts Safe Zone | Kreatli" />
        <meta
          name="twitter:description"
          content="Check your YouTube Shorts safe zone before posting. Free tool to preview UI overlays."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
      </Head>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Platform', url: '/platform' },
          { name: 'YouTube Shorts Safe Zone', url: '/platform/youtube-shorts-safe-zone' },
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
              YouTube Shorts Safe Zone
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground-500">
              Check your YouTube Shorts safe zone before you post. Preview where channel name, like button, comment
              button, and title appear—and keep your text, logos, and visuals visible. Free tool.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                as={NextLink}
                href="/safe-zone-checker/youtube-safe-zone-checker"
                size="lg"
                className="bg-foreground text-content1"
              >
                Use Free YouTube Shorts Safe Zone Checker
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
        platform="youtube"
        stepsOnly
        stepsSectionTitle="How to Use the Safe-Zone Checker for YouTube Shorts"
      />

      {/* Feature Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">
              YouTube Shorts Safe Zone - Built for Video Teams
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              See where YouTube’s UI overlays sit on your Shorts so you can keep headlines, CTAs, and branding in the
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
                  Turn on the safe zone overlay to see where channel name, like button, comment button, share button,
                  and title area appear on your Shorts. Keep important text and visuals outside those areas so they stay
                  visible.
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
                  Drag and drop your Shorts video into the free tool. No watermark. Preview the safe zone, adjust your
                  design if needed, and export a reference so your team keeps content in the right place.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="youtube" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">YouTube Shorts–Specific Overlays</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Our checker uses YouTube Shorts UI positions so you see where overlays sit in the app. Keep titles,
                  subtitles, and CTAs in the safe area so viewers never miss your message.
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
                  everyone keeps key elements in the safe zone before Shorts go live.
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
                  After you check the safe zone, upload your Shorts to Kreatli for frame-accurate review and client
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
                  <h3 className="font-sans text-lg font-semibold">TikTok & Instagram Reels Too</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  We also offer safe zone checkers for TikTok and Instagram Reels. Use each tool before posting so your
                  content stays visible on every platform. All free, all in your browser.
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
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Why Check the YouTube Shorts Safe Zone?</h2>
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
                  YouTube’s UI can cover the bottom and right edges of your Shorts. When you check the safe zone first,
                  you avoid placing headlines, CTAs, or logos where the channel name or engagement buttons will sit.
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
                  checker again, and publish with confidence. No more discovering covered text once the Short is live.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="smile" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Professional Look on Every Short</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Brands and creators who check the safe zone deliver cleaner, more readable Shorts. Use the free tool
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
        tools={getFreeToolsForPlatform('/platform/youtube-shorts-safe-zone')}
      />

      {/* See How This Works Section */}
      <ResourcesArticlesPreviewSection
        articles={articles}
        title="See How This Works in Practice"
        description="Explore guides and workflows for Shorts, video review, and creative proofing—so your content stays visible and on-brand."
      />

      <PricingSection />

      {/* FAQ Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Get detailed answers about the YouTube Shorts safe zone, how to check it, and how the free tool fits into
              your workflow.
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
              to learn how the YouTube Shorts safe zone checker and Kreatli’s review workflow can support your workflow.
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
        title="Ready to Check Your YouTube Shorts Safe Zone?"
        description="Use Kreatli’s free YouTube Shorts Safe Zone Checker before you post—and bring Shorts into Kreatli for review and approval when you need client sign-off."
      />
      <FooterSection hideCta={true} />
      <SignUpModal />
    </>
  );
}
