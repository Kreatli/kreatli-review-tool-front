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
import { InteractiveReviewToolPreview } from '../../components/shared/InteractiveReviewToolPreview';
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
    question: 'What is a video frame extractor?',
    answer:
      'A video frame extractor lets you capture a still image (a single frame) from a video at a specific moment. You scrub to the exact timestamp you want, capture the frame, and export it as an image file (e.g. JPG or PNG). Use extracted frames for thumbnails, client proofs, storyboards, or frame-accurate feedback in your review workflow. Kreatli offers a free video frame extractor that runs in your browser—no uploads, no sign-up required.',
  },
  {
    question: 'How do I export a frame from a video?',
    answer:
      'With Kreatli’s free Video Frame Extractor, you upload or drag your video into the tool, scrub the timeline to the exact moment you want, and click to capture the frame. You can export single frames as JPG or PNG, or download multiple captured frames as a ZIP. Everything runs in your browser so your video never leaves your device unless you choose to upload it. No software to install and no account required.',
  },
  {
    question: 'Is the Video Frame Extractor free?',
    answer:
      'Yes. Kreatli’s Video Frame Extractor is free to use. You can capture and export frames from video in your browser without signing up, and there’s no watermark on exported images. Use it for thumbnails, proofs, or to grab stills for review and feedback. If you want to bring those frames into a full review workflow with comments and approvals, you can upload them to Kreatli and use the platform’s frame-accurate review and annotation tools.',
  },
  {
    question: 'Can I use extracted frames in Kreatli for review?',
    answer:
      'Yes. After you extract frames from a video using the free tool, you can upload those images to Kreatli and use them in your review workflow. Add frame-accurate comments, drawings, and markup so clients and collaborators can give precise feedback on the exact frame. This is useful when you need approval on specific moments, thumbnails, or keyframes without sharing the full video file.',
  },
  {
    question: 'What video formats work with the frame extractor?',
    answer:
      'Kreatli’s Video Frame Extractor supports common video formats that modern browsers can play, including MP4, WebM, and MOV. Upload your file or drag it into the tool, scrub to the moment you need, and capture as many frames as you like. Exported images are delivered as JPG or PNG, and you can download multiple frames in a single ZIP for easy sharing or import into your review workflow.',
  },
  {
    question: 'Why extract frames from video instead of sharing the whole file?',
    answer:
      'Extracting frames lets you share or approve specific moments without sending large video files. Use still frames for thumbnail approval, keyframe sign-off, storyboard updates, or frame-accurate feedback when a single moment matters. Clients can comment on the exact frame in Kreatli, and your team keeps one source of truth for what was approved—without juggling full-length videos in email or chat.',
  },
];

export default function ExtractFramesFromVideoPage() {
  useSession();
  const articles = getPlatformArticles('/platform/extract-frames-from-video');

  return (
    <>
      <Head>
        <title>Extract Frames from Video | Kreatli</title>
        <meta
          name="description"
          content="Extract, get, and export frames from video with Kreatli’s free tool. Capture still frames for thumbnails, proofs, and review—no sign-up. Use extracted frames in Kreatli for frame-accurate feedback."
        />
        <link rel="canonical" href="https://kreatli.com/platform/extract-frames-from-video" />
        <meta property="og:url" content="https://kreatli.com/platform/extract-frames-from-video" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Extract Frames from Video | Kreatli" />
        <meta
          property="og:description"
          content="Extract and export frames from video for free. Capture still frames for thumbnails, proofs, and review. Use Kreatli’s free Video Frame Extractor—no sign-up required."
        />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:secure_url" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:alt" content="Extract Frames from Video | Kreatli" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Extract Frames from Video | Kreatli" />
        <meta
          name="twitter:description"
          content="Extract and export frames from video for free. Capture still frames for thumbnails, proofs, and review with Kreatli’s free tool."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
      </Head>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Platform', url: '/platform' },
          { name: 'Extract Frames from Video', url: '/platform/extract-frames-from-video' },
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
              Extract Frames from Video
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground-500">
              Get and export still frames from any video for thumbnails, proofs, or review. Use Kreatli’s free Video
              Frame Extractor in your browser—no sign-up—or bring extracted frames into Kreatli for frame-accurate
              feedback.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                as={NextLink}
                href="/free-tools/video-frame-extractor"
                size="lg"
                className="bg-foreground text-content1"
              >
                Use Free Video Frame Extractor
              </Button>
              <Button as={NextLink} href="/sign-up" size="lg" variant="bordered">
                Get Started for Free
              </Button>
            </div>
          </div>
          <InteractiveReviewToolPreview />
        </div>
      </section>

      {/* Feature Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">
              Extract, Get & Export Frames - Built for Video Teams
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Scrub to the exact moment, capture the frame, and export as JPG or PNG. Use stills for thumbnails, client
              proofs, or upload to Kreatli for frame-accurate review and annotation.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="panorama" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Scrub to Any Moment</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Move the timeline to the exact second you need. Capture one frame or many—each export is a
                  high-quality still image you can use for thumbnails, proofs, or feedback.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="upload" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Export as JPG, PNG, or ZIP</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Download single frames as JPG or PNG, or export multiple captured frames in one ZIP. No watermark, no
                  sign-up—everything runs in your browser so your video stays on your device.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="monitorPlay" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Free Tool, No Account Required</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Use the Video Frame Extractor without creating an account. Upload or drag your video, capture frames,
                  and download—ideal for quick thumbnails, proofs, or keyframe approval.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="chat" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Use Frames in Kreatli for Review</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Upload extracted frames to Kreatli and get frame-accurate comments, drawings, and approvals. Clients
                  can mark up the exact frame so editors know precisely what to change.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="group" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Thumbnails & Client Proofs</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Grab the perfect frame for thumbnails, social previews, or client sign-off. Export once and share the
                  still—or bring it into Kreatli so stakeholders can approve with comments and markup in one place.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="checkCircle" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">One Workflow for Frames & Video</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Extract frames with the free tool, then move to Kreatli for review and approval. Keep thumbnails,
                  keyframes, and full videos organized in projects with version history and frame-accurate feedback.
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
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Why Extract Frames from Video?</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Still frames make it easy to get approval on specific moments, create thumbnails, and give frame-accurate
              feedback without sending full video files.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="eye" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Approve the Exact Frame</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Clients and stakeholders can sign off on the precise moment that matters—thumbnails, keyframes, or
                  storyboard frames—without watching the whole video. Fewer misunderstandings and faster approvals.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="arrowRight" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Lightweight Sharing</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Share a single frame instead of a large video file when you only need feedback on one moment. Export
                  from the free tool or upload to Kreatli and keep all feedback tied to the right asset and version.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="smile" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">No Friction for Reviewers</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Recipients see one clear image to comment on—no scrubbing or timestamps. Use Kreatli’s drawing and
                  annotation tools on the frame so feedback is visual and precise.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="slides" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Fit into Your Production Workflow</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Extract frames for storyboards, thumbnails, or client proofs, then bring everything into Kreatli for
                  review, approval, and version control. One platform for stills and video.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Free Tools Section */}
      <MoreFreeToolsSection
        title="Free Tools for Video Teams"
        description="Explore our collection of free tools designed to help video professionals work more efficiently."
        tools={getFreeToolsForPlatform('/platform/extract-frames-from-video')}
      />

      {/* See How This Works Section */}
      <ResourcesArticlesPreviewSection
        articles={articles}
        title="See How This Works in Practice"
        description="Explore guides and the free Video Frame Extractor tool to capture, export, and use still frames from video for thumbnails, proofs, and review."
      />

      <PricingSection />

      {/* FAQ Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Get detailed answers about how to extract, get, and export frames from video and how the free tool fits
              into your workflow.
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
              to learn how extracting frames from video and Kreatli’s review workflow can support your specific needs.
            </p>
          </div>
        </div>
      </section>

      {/* More Resources Section */}
      <RelatedResourcesSection
        resources={getRelatedResources(['videoAnnotation', 'creativeProofing', 'reviewApproval']).map(
          (resource, index) => {
            if (index === 0) {
              return { ...resource, icon: 'paint' };
            }
            if (index === 1) {
              return { ...resource, icon: 'slides' };
            }
            return resource;
          },
        )}
        title="More Resources"
        description="Explore more Kreatli features that support video review, annotation, and creative proofing—including drawing on video and frame-accurate feedback."
      />

      {/* CTA Section */}
      <CTASection
        title="Ready to Extract Frames from Your Videos?"
        description="Use Kreatli’s free Video Frame Extractor to capture and export still frames, or bring frames into Kreatli for frame-accurate review and approval."
      />
      <FooterSection hideCta={true} />
      <SignUpModal />
    </>
  );
}
