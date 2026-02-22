import { Accordion, AccordionItem, Button, Card, CardBody, Image } from '@heroui/react';
import NextLink from 'next/link';

import { MoreFreeToolsSection } from '../../shared/MoreFreeToolsSection';
import { Icon, IconType } from '../../various/Icon';

interface SafeZoneScreenGuideProps {
  platform?: 'youtube' | 'instagram' | 'tiktok';
  /** When true, only render the "How to Use Safe-Zone Checker" step-by-step section (e.g. on platform landing pages). */
  stepsOnly?: boolean;
  /** Optional section title override (e.g. "How to Use the Safe-Zone Checker for YouTube Shorts" on platform pages). */
  stepsSectionTitle?: string;
}

type Platform = 'youtube' | 'instagram' | 'tiktok';

interface WorkflowStep {
  step: number;
  title: string;
  description: string;
  icon: string;
  image: string | null;
  altText?: string;
  /** Optional max-width class so the image container fits proportionately (e.g. steps 3 & 4). */
  imageContainerClass?: string;
}

const WORKFLOW_STEPS: Record<Platform | 'default', WorkflowStep[]> = {
  youtube: [
    {
      step: 1,
      title: 'Upload Your Video in Kreatli',
      description:
        'Sign in to Kreatli, open your project, and upload your Shorts video or asset. The safe zone checker lives inside the platform—no need to leave your review workflow or use a separate tool.',
      icon: 'upload',
      image: '/safe-zone-guide/upload-asset.webp',
      altText:
        'Kreatli platform showing project with video upload, ready to use the in-platform safe zone checker for YouTube Shorts',
    },
    {
      step: 2,
      title: 'Open It and Turn On the Safe Zone Overlay',
      description:
        "Open the video in the player, then activate the safe zone overlay. You'll see exactly where YouTube's UI will sit—channel name, subscribe button, like, comment, share, and video controls—so you can keep headlines, CTAs, and logos in the visible area.",
      icon: 'shield',
      image: '/safe-zone-guide/click-safe-zone.webp',
      altText:
        'Kreatli in-platform safe zone checker with overlay turned on, showing YouTube Shorts UI element placement',
    },
    {
      step: 3,
      title: 'Preview YouTube Shorts (or Toggle Platforms)',
      description:
        'View the YouTube Shorts overlay by default: channel name at top, engagement buttons on the right, controls at the bottom. Switch to TikTok or Instagram Reels overlays in the same view to compare and ensure your content stays visible on every platform.',
      icon: 'addVideo',
      image: '/safe-zone-guide/toggle-platforms.webp',
      altText: 'Kreatli safe zone checker with platform selector and YouTube Shorts overlay preview',
      imageContainerClass: 'max-w-sm max-h-[65vh]',
    },
    {
      step: 4,
      title: 'Turn the Platform Overlay On or Off as Needed',
      description:
        "Turn the platform overlay on to see where YouTube's UI elements will sit on your content, or off to view your video without the guide. Toggle on and off at key frames to verify that headlines, logos, and CTAs stay in the safe zone before you move to review and share.",
      icon: 'shield',
      image: '/safe-zone-guide/export-download.webp',
      altText: 'Kreatli safe zone checker with platform overlay toggled on or off for YouTube Shorts',
      imageContainerClass: 'max-w-sm max-h-[65vh]',
    },
    {
      step: 5,
      title: 'Review, Get Feedback, Share for Approval, or Download',
      description:
        'Review key frames, get team feedback, share for approval, or download a reference with the safe zone overlay. Everything stays in your Kreatli project before you publish to YouTube.',
      icon: 'checkCircle',
      image: '/safe-zone-guide/upload-kreatli.webp',
      altText:
        'Kreatli platform showing share, export, and download options for YouTube Shorts content with safe zone validation complete',
    },
  ],
  instagram: [
    {
      step: 1,
      title: 'Upload Your Video in Kreatli',
      description:
        'Sign in to Kreatli, open your project, and upload your Reels video or asset. The safe zone checker is built into the platform—use it right where you review and approve content.',
      icon: 'upload',
      image: '/safe-zone-guide/upload-asset.webp',
      altText:
        'Kreatli platform showing project with video upload, ready to use the in-platform safe zone checker for Instagram Reels',
    },
    {
      step: 2,
      title: 'Open It and Turn On the Safe Zone Overlay',
      description:
        "Open the video in the player, then turn on the safe zone overlay to see where Instagram's UI will appear: profile picture, username, like, comment, share, and music display. Keep important text and visuals outside those areas so they stay visible in the app.",
      icon: 'shield',
      image: '/safe-zone-guide/click-safe-zone.webp',
      altText:
        'Kreatli in-platform safe zone checker with overlay turned on, showing Instagram Reels UI element placement',
    },
    {
      step: 3,
      title: 'Preview Instagram Reels (or Toggle Platforms)',
      description:
        'View the Instagram Reels overlay: profile and username at top, engagement buttons on the right, music display. Toggle to YouTube Shorts or TikTok in the same view to compare and make sure your content is safe on every platform you post to.',
      icon: 'addVideo',
      image: '/safe-zone-guide/toggle-platforms.webp',
      altText: 'Kreatli safe zone checker with platform selector and Instagram Reels overlay preview',
      imageContainerClass: 'max-w-sm max-h-[65vh]',
    },
    {
      step: 4,
      title: 'Turn the Platform Overlay On or Off as Needed',
      description:
        "Turn the platform overlay on to see where Instagram's UI elements will sit on your content, or off to view your video without the guide. Toggle on and off at key frames to verify that text and visuals stay in the safe zone before you move to review and share.",
      icon: 'shield',
      image: '/safe-zone-guide/export-download.webp',
      altText: 'Kreatli safe zone checker with platform overlay toggled on or off for Instagram Reels',
      imageContainerClass: 'max-w-sm max-h-[65vh]',
    },
    {
      step: 5,
      title: 'Review, Get Feedback, Share for Approval, or Download',
      description:
        'Review key frames, get team feedback, share for approval, or download a reference with the safe zone overlay. Everything stays in your Kreatli project before you publish to Instagram.',
      icon: 'checkCircle',
      image: '/safe-zone-guide/upload-kreatli.webp',
      altText:
        'Kreatli platform showing share, export, and download options for Instagram Reels content with safe zone validation complete',
    },
  ],
  tiktok: [
    {
      step: 1,
      title: 'Upload Your Video in Kreatli',
      description:
        'Sign in to Kreatli, open your project, and upload your TikTok video or asset. The safe zone checker is built into the platform—check safe zones right where you review and get approvals.',
      icon: 'upload',
      image: '/safe-zone-guide/upload-asset.webp',
      altText:
        'Kreatli platform showing project with video upload, ready to use the in-platform safe zone checker for TikTok',
    },
    {
      step: 2,
      title: 'Open It and Turn On the Safe Zone Overlay',
      description:
        "Open the video in the player, then activate the safe zone overlay to see where TikTok's UI will sit: profile picture, username, music track, like, comment, share, and follow button. Identify where important visuals might be covered so you can adjust before posting.",
      icon: 'shield',
      image: '/safe-zone-guide/click-safe-zone.webp',
      altText: 'Kreatli in-platform safe zone checker with overlay turned on, showing TikTok UI element placement',
    },
    {
      step: 3,
      title: 'Preview TikTok (or Toggle Platforms)',
      description:
        'View the TikTok overlay: profile and username at top, music and engagement buttons on the right. Switch to Instagram Reels or YouTube Shorts in the same view to compare and ensure your content stays visible on every platform.',
      icon: 'addVideo',
      image: '/safe-zone-guide/toggle-platforms.webp',
      altText: 'Kreatli safe zone checker with platform selector and TikTok overlay preview',
      imageContainerClass: 'max-w-sm max-h-[65vh]',
    },
    {
      step: 4,
      title: 'Turn the Platform Overlay On or Off as Needed',
      description:
        "Turn the platform overlay on to see where TikTok's UI elements will sit on your content, or off to view your video without the guide. Toggle on and off at key frames to verify that text and visuals stay in the safe zone before you move to review and share.",
      icon: 'shield',
      image: '/safe-zone-guide/export-download.webp',
      altText: 'Kreatli safe zone checker with platform overlay toggled on or off for TikTok',
      imageContainerClass: 'max-w-sm max-h-[65vh]',
    },
    {
      step: 5,
      title: 'Review, Get Feedback, Share for Approval, or Download',
      description:
        'Review key frames, get team feedback, share for approval, or download a reference with the safe zone overlay. Everything stays in your Kreatli project before you publish to TikTok.',
      icon: 'checkCircle',
      image: '/safe-zone-guide/upload-kreatli.webp',
      altText:
        'Kreatli platform showing share, export, and download options for TikTok content with safe zone validation complete',
    },
  ],
  default: [
    {
      step: 1,
      title: 'Upload Your Video in Kreatli',
      description:
        'Sign in to Kreatli, open your project, and upload your video or asset. The safe zone checker is built into the platform—use it right in your review workflow without a separate tool.',
      icon: 'upload',
      image: '/safe-zone-guide/upload-asset.webp',
      altText: 'Kreatli platform showing project with video upload, ready to use the in-platform safe zone checker',
    },
    {
      step: 2,
      title: 'Open It and Turn On the Safe Zone Overlay',
      description:
        "Open the video in the player, then activate the safe zone overlay to see where each platform's UI elements (buttons, captions, profile bars) will appear on your content. This helps you keep important text, logos, and CTAs in the visible area.",
      icon: 'shield',
      image: '/safe-zone-guide/click-safe-zone.webp',
      altText: 'Kreatli in-platform safe zone checker with overlay turned on, showing platform UI element placement',
    },
    {
      step: 3,
      title: 'Choose Your Platform and Toggle Overlays',
      description:
        'Select YouTube Shorts, TikTok, or Instagram Reels to view that platform’s overlay. Toggle between them in the same view to compare and ensure your content stays visible on every channel you post to.',
      icon: 'addVideo',
      image: '/safe-zone-guide/toggle-platforms.webp',
      altText:
        'Kreatli safe zone checker with platform selector and overlay comparison for TikTok, Instagram Reels, and YouTube Shorts',
      imageContainerClass: 'max-w-sm max-h-[65vh]',
    },
    {
      step: 4,
      title: 'Turn the Platform Overlay On or Off as Needed',
      description:
        "Turn the platform overlay on to see where each platform's UI elements will sit on your content, or off to view your video without the guide. Toggle on and off at key frames to verify that text, logos, and CTAs stay in the safe zone before you move to review and share.",
      icon: 'shield',
      image: '/safe-zone-guide/export-download.webp',
      altText: 'Kreatli safe zone checker with platform overlay toggled on or off',
      imageContainerClass: 'max-w-sm max-h-[65vh]',
    },
    {
      step: 5,
      title: 'Review, Get Feedback, Share for Approval, or Download',
      description:
        'Review key frames, get team feedback, share for approval, or download a reference with the safe zone overlay. Everything stays in your Kreatli project before you publish.',
      icon: 'checkCircle',
      image: '/safe-zone-guide/upload-kreatli.webp',
      altText:
        'Kreatli platform showing share, export, and download options for content with safe zone validation complete',
    },
  ],
};

const getWorkflowSteps = (platform?: Platform): WorkflowStep[] => {
  return WORKFLOW_STEPS[platform || 'default'];
};

const PLATFORM_LABELS: Record<Platform | 'default', { name: string; nameLower: string }> = {
  youtube: { name: 'YouTube Shorts', nameLower: 'YouTube Shorts' },
  instagram: { name: 'Instagram Reels', nameLower: 'Instagram Reels' },
  tiktok: { name: 'TikTok', nameLower: 'TikTok' },
  default: { name: 'social media platforms', nameLower: 'platforms' },
};

const FAQ_CONTENT: Record<
  Platform | 'default',
  {
    whyDifferentPlatforms: { title: string; content: string };
    multiplePlatforms: string;
    uiElements: { title: string; content: string };
    subtitles: string;
  }
> = {
  tiktok: {
    whyDifferentPlatforms: {
      title: 'Why does TikTok have specific safe zones?',
      content:
        `TikTok's interface has unique UI elements (profile picture, username, music track, engagement buttons) ` +
        `positioned in specific areas. Safe zones ensure your content isn't hidden by these overlays.`,
    },
    multiplePlatforms:
      'Yes. Toggle between platform overlays to see how your TikTok video behaves on Instagram Reels and YouTube Shorts, then adjust accordingly.',
    uiElements: {
      title: 'What TikTok UI elements should I avoid?',
      content:
        'Keep content away from top ~130px (profile picture, username) and bottom ~250px (captions, like button, comment button, share button, follow button). Music track display appears on the right side.',
    },
    subtitles:
      'Yes. TikTok captions appear at the bottom, so place subtitles and on-screen text well within safe zones to avoid overlap with captions and action buttons.',
  },
  youtube: {
    whyDifferentPlatforms: {
      title: 'Why do YouTube Shorts have specific safe zones?',
      content:
        `YouTube Shorts has unique UI elements (channel name, subscribe button, like button, ` +
        `comments, share button, video controls) positioned in specific areas. ` +
        `Safe zones ensure your content isn't hidden by these overlays.`,
    },
    multiplePlatforms:
      'Yes. Toggle between platform overlays to see how your YouTube Shorts video behaves on TikTok and Instagram Reels, then adjust accordingly.',
    uiElements: {
      title: 'What YouTube Shorts UI elements should I avoid?',
      content:
        'Keep content in the central 4:5 area and avoid bottom 10-15% where captions, progress bar, and video controls appear. Channel name appears at top, engagement buttons (subscribe, like, share) on right side.',
    },
    subtitles:
      'Yes. YouTube Shorts captions and video controls appear at the bottom, so place subtitles and on-screen text well within safe zones. Keep text in central 4:5 area to avoid overlap with controls and captions.',
  },
  instagram: {
    whyDifferentPlatforms: {
      title: 'Why does Instagram Reels have specific safe zones?',
      content:
        `Instagram Reels has unique UI elements (profile picture, username, like button, ` +
        `comment button, share button, music display) positioned in specific areas. ` +
        `Safe zones ensure your content isn't hidden by these overlays.`,
    },
    multiplePlatforms:
      'Yes. Toggle between platform overlays to see how your Instagram Reels video behaves on TikTok and YouTube Shorts, then adjust accordingly.',
    uiElements: {
      title: 'What Instagram Reels UI elements should I avoid?',
      content:
        'Keep content away from top 108px (profile picture, username, feed/profile crop) and bottom 320px (captions, comments overlay, like button, comment button, share button). Music display appears on the right side.',
    },
    subtitles:
      'Yes. Instagram Reels captions and comments overlay appear at the bottom, so place subtitles and on-screen text well within safe zones to avoid overlap with captions and engagement buttons.',
  },
  default: {
    whyDifferentPlatforms: {
      title: 'Why do different platforms have different safe zones?',
      content:
        `Each platform (TikTok, Instagram Reels, YouTube Shorts) has unique UI layouts, ` +
        `so safe zone overlays differ to match platform-specific interface elements.`,
    },
    multiplePlatforms:
      'Yes. Toggle between platform overlays to see how your creative behaves across TikTok, Instagram Reels, and YouTube Shorts.',
    uiElements: {
      title: 'What platform UI elements should I avoid?',
      content:
        'Each platform has different UI elements. Use the safe zone overlays to see exactly where buttons, captions, and profile information appear.',
    },
    subtitles:
      "Yes. Subtitles, captions, and on-screen text should be placed well within safe zones, as they're commonly obscured by platform UI.",
  },
};

const getFAQItems = (platform?: Platform) => {
  const platformKey = platform || 'default';
  const labels = PLATFORM_LABELS[platformKey];
  const faqContent = FAQ_CONTENT[platformKey];

  return [
    {
      key: 'what-is-safe-zone',
      title: `What is a "safe zone" for ${labels.nameLower}?`,
      content:
        `The area where important elements (text, logos, CTAs, faces) stay visible after ` +
        `${labels.name}'s UI elements (buttons, captions, profile bars) are applied. ` +
        `Content outside risks being obscured.`,
    },
    {
      key: 'why-different-platforms',
      title: faqContent.whyDifferentPlatforms.title,
      content: faqContent.whyDifferentPlatforms.content,
    },
    {
      key: 'file-types-sizes',
      title: 'What file types and sizes can I upload?',
      content:
        'Videos, images, thumbnails, or design mockups. Recommended: 1080 × 1920 (9:16) for vertical formats, but any size works.',
    },
    {
      key: 'sign-up-required',
      title: 'Do I need to sign up to use the Safe Zone Checker?',
      content: 'No. Free to use without signup. Upload and preview immediately.',
    },
    {
      key: 'multiple-platforms',
      title: 'Can I use the same creative for multiple platforms?',
      content: faqContent.multiplePlatforms,
    },
    {
      key: 'tiktok-specific-elements',
      title: faqContent.uiElements.title,
      content: faqContent.uiElements.content,
    },
    {
      key: 'exported-version',
      title: 'How should I use the exported version from the checker?',
      content:
        'Share with team for review, align on text and branding placement, and document layout decisions. Use as reference to ensure key visuals stay safe.',
    },
    {
      key: 'privacy',
      title: 'Will my content be uploaded to a server or shared publicly?',
      content:
        'No. Processing happens in your browser. Your file is used only to generate preview and overlays, not published publicly.',
    },
    {
      key: 'file-modification',
      title: 'Does the Safe Zone Checker change or edit my original file?',
      content:
        'No. Original file remains untouched. Safe zone overlays are added only to the downloaded reference version.',
    },
    {
      key: 'subtitles',
      title: 'Should subtitles always stay inside the safe zone?',
      content: faqContent.subtitles,
    },
    {
      key: 'early-production',
      title: 'Can I use this tool during early production, not just before publishing?',
      content:
        'Yes. Useful during concepting, storyboarding, and design review. Using it early prevents layout rework later.',
    },
    {
      key: 'individual-or-teams',
      title: 'Is this tool meant for individual creators or teams?',
      content:
        'Both. Solo creators validate layouts before posting. Teams use exported safe-zone versions to review, approve, and align across stakeholders.',
    },
    {
      key: 'other-tools',
      title: 'Does Kreatli offer other tools for managing social video production?',
      content:
        'Yes. Kreatli is a production management platform that helps teams plan, review, and coordinate content across the full production lifecycle.',
    },
  ];
};

const CONTENT_LABELS: Record<Platform | 'default', { content: string; platformName: string }> = {
  youtube: { content: 'YouTube Shorts', platformName: 'YouTube Shorts' },
  instagram: { content: 'Instagram Reels', platformName: 'Instagram Reels' },
  tiktok: { content: 'TikTok video', platformName: 'TikTok' },
  default: { content: 'content', platformName: 'every platform' },
};

export const SafeZoneScreenGuide = ({
  platform,
  stepsOnly = false,
  stepsSectionTitle,
}: SafeZoneScreenGuideProps = {}) => {
  const platformKey = platform || 'default';
  const workflowSteps = getWorkflowSteps(platform);
  const contentLabels = CONTENT_LABELS[platformKey];
  const faqItems = getFAQItems(platform);

  const stepsSection = (
    <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">
              {stepsSectionTitle ?? 'How to Use Safe-Zone Checker in Your Workflow'}
            </h2>
            <p className="mx-auto max-w-2xl text-base text-foreground-500">
              Use the safe zone checker inside Kreatli so you can preview platform overlays, get feedback, and get
              approvals in one place. Follow these steps to ensure your {contentLabels.content} looks perfect on{' '}
              {contentLabels.platformName}.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {workflowSteps.map((item) => (
              <Card key={item.step} className="scroll-mt-36">
                <CardBody className="p-6 lg:p-8">
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                      <div className="flex items-start gap-4 lg:w-80 lg:shrink-0">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <Icon icon={item.icon as IconType} size={24} className="text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="mb-1.5 text-sm font-medium text-primary">Step {item.step}</div>
                          <h3 className="font-sans text-xl font-bold leading-tight">{item.title}</h3>
                        </div>
                      </div>
                      <div className="flex-1 border-foreground-200 lg:border-l lg:pl-8">
                        <p className="text-base leading-relaxed text-foreground-500">{item.description}</p>
                        {item.step === 5 && (
                          <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:items-start">
                            <Button as={NextLink} href="/sign-up" size="lg" className="bg-foreground text-content1">
                              Start for Free
                            </Button>
                            <Button
                              as="a"
                              href="https://calendar.app.google/NXbAeTAUwaBGh5x49"
                              target="_blank"
                              size="lg"
                              variant="bordered"
                            >
                              Book a Demo
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                    {item.image && (
                      <div className="mt-6 flex justify-center lg:mt-8">
                        <div className={`w-full ${item.imageContainerClass ?? 'max-w-4xl'}`}>
                          <div
                            className={`overflow-hidden rounded-2xl border border-foreground-200 bg-content1 shadow-lg ${item.imageContainerClass ? 'max-h-[65vh]' : ''}`}
                          >
                            <Image
                              src={item.image}
                              alt={item.altText || `${item.title} - Social media safe zone checker screenshot`}
                              loading="lazy"
                              removeWrapper
                              className={item.imageContainerClass ? 'h-auto w-full max-h-[65vh] object-contain' : 'h-auto w-full object-contain'}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>
  );

  if (stepsOnly) {
    return <div>{stepsSection}</div>;
  }

  return (
    <div>
      {stepsSection}

      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">
              Platform-Specific Safe Zone Recommendations
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-foreground-500">
              Each platform has unique UI overlays and cropping behavior. Follow these recommendations for optimal
              visibility across all devices and viewing contexts.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-500/10 p-2">
                    <Icon icon="instagram" size={20} />
                  </div>
                  <h3 className="font-sans text-lg font-bold">Instagram Reels</h3>
                </div>
                <div className="space-y-2 text-sm text-foreground-500">
                  <div>
                    <strong className="text-foreground">Top margin:</strong> ~108px (avoid feed/profile crop)
                  </div>
                  <div>
                    <strong className="text-foreground">Bottom margin:</strong> ~320px (captions, comments overlay)
                  </div>
                  <div>
                    <strong className="text-foreground">Side padding:</strong> ~60px (UI elements)
                  </div>
                  <p className="border-t border-foreground-200 pt-2">
                    Ensures text/logos avoid feed/profile crop, and UI overlays won't cover CTAs.
                  </p>
                </div>
                <div className="mt-4">
                  <Button
                    as="a"
                    href="https://kreatli.com/guides/instagram-reels-safe-zone"
                    target="_blank"
                    variant="bordered"
                    className="w-full"
                  >
                    Read Instagram Guide
                  </Button>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-500/10 p-2">
                    <Icon icon="youtube" size={20} />
                  </div>
                  <h3 className="font-sans text-lg font-bold">YouTube Shorts</h3>
                </div>
                <div className="space-y-2 text-sm text-foreground-500">
                  <div>
                    <strong className="text-foreground">Main visuals:</strong> Central 4:5 area (≈1080 × 1440px)
                  </div>
                  <div>
                    <strong className="text-foreground">Avoid:</strong> Bottom 10–15% for text
                  </div>
                  <div>
                    <strong className="text-foreground">Focus:</strong> Top and center areas
                  </div>
                  <p className="border-t border-foreground-200 pt-2">
                    Prevents overlay from captions, progress bar, and ensures clear thumbnail visibility.
                  </p>
                </div>
                <div className="mt-4">
                  <Button
                    as="a"
                    href="https://kreatli.com/guides/youtube-shorts-safe-zone"
                    target="_blank"
                    variant="bordered"
                    className="w-full"
                  >
                    Read YouTube Guide
                  </Button>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-500/10 p-2">
                    <Icon icon="tiktok" size={20} />
                  </div>
                  <h3 className="font-sans text-lg font-bold">TikTok</h3>
                </div>
                <div className="space-y-2 text-sm text-foreground-500">
                  <div>
                    <strong className="text-foreground">Top margin:</strong> ~130px
                  </div>
                  <div>
                    <strong className="text-foreground">Bottom margin:</strong> ~250px
                  </div>
                  <div>
                    <strong className="text-foreground">Side padding:</strong> ~60px
                  </div>
                  <p className="border-t border-foreground-200 pt-2">
                    Avoids overlap with caption box and action icons; ensures clarity on different device sizes.
                  </p>
                </div>
                <div className="mt-4">
                  <Button
                    as="a"
                    href="https://kreatli.com/guides/tiktok-safe-zone"
                    target="_blank"
                    variant="bordered"
                    className="w-full"
                  >
                    Read TikTok Guide
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>

          <div className="mt-8 flex justify-center">
            <Button
              as="a"
              className="bg-foreground text-content1"
              href="https://kreatli.com/blog/safe-zone-guide-instagram-reels-youtube-shorts-tiktok"
              target="_blank"
            >
              Read our complete guide
            </Button>
          </div>
        </div>
      </section>

      {/* What are Safe Zones Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">What are Safe Zones and Why They Matter</h2>
            <p className="mx-auto max-w-3xl text-lg text-foreground-500">
              Safe zones are buffer areas inside your video canvas where important visual elements are guaranteed to
              remain visible, regardless of device differences or UI overlays.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardBody className="p-6 lg:p-8">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Icon icon="shield" size={24} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-xl font-bold">Protect Your Content</h3>
                </div>
                <p className="text-foreground-500">
                  Apps like TikTok, Instagram, and YouTube put playback controls, profile bars, comment buttons,
                  captions, and overlays on top of your video. Placing critical content too close to the edges risks
                  accidental cropping or hiding.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6 lg:p-8">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-success/10 p-3">
                    <Icon icon="checkCircle" size={24} className="text-success" />
                  </div>
                  <h3 className="font-sans text-xl font-bold">Professional Results</h3>
                </div>
                <p className="text-foreground-500">
                  Treating safe zones as a built-in editing discipline means fewer layout surprises, fewer reworks, and
                  fewer delivery delays. Your content looks polished and intentional across all platforms.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Why This Matters Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Why This Matters More Than Ever</h2>
            <p className="mx-auto max-w-3xl text-lg text-foreground-500">
              With vertical video reaching everywhere - stories, shorts, social feeds, ads - inconsistent visibility can
              silently erode audience engagement.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-danger/10 p-2">
                    <Icon icon="cross" size={20} className="text-danger" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Hidden Impact</h3>
                </div>
                <p className="text-foreground-500">
                  Missed captions, hidden logos, or obscured CTAs don't surface as technical failures - they lower
                  effective deliverables and weaken brand clarity.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-success/10 p-2">
                    <Icon icon="checkCircle" size={20} className="text-success" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Protect Creative Intent</h3>
                </div>
                <p className="text-foreground-500">
                  By embedding safe-zone discipline early and standardizing across projects via templates and project
                  workflows, you protect creative intent.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Icon icon="shield" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Reduce Errors</h3>
                </div>
                <p className="text-foreground-500">
                  Reduce errors and deliver polished content no matter where it lands. Your content will look
                  professional across all platforms and devices.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* More Tools for Creative Teams Section */}
      <MoreFreeToolsSection
        excludeHref="/safe-zone-checker"
        title="More Tools for Creative Teams"
        description="Explore our collection of free tools designed to help creative professionals work more efficiently."
      />

      {/* FAQ Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-4xl">
          <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>

          <Accordion variant="splitted">
            {faqItems.map((item) => (
              <AccordionItem key={item.key} title={<span className="font-semibold">{item.title}</span>}>
                <span className="text-foreground-500">{item.content}</span>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
};
