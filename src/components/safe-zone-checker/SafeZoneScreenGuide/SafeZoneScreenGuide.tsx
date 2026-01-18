import { Accordion, AccordionItem, Button, Card, CardBody, Image } from '@heroui/react';
import NextLink from 'next/link';

import { MoreFreeToolsSection } from '../../shared/MoreFreeToolsSection';
import { Icon, IconType } from '../../various/Icon';

interface SafeZoneScreenGuideProps {
  platform?: 'youtube' | 'instagram' | 'tiktok';
}

type Platform = 'youtube' | 'instagram' | 'tiktok';

interface WorkflowStep {
  step: number;
  title: string;
  description: string;
  icon: string;
  image: string | null;
  imageVariant?: 'phone' | 'desktop';
  altText?: string;
}

const WORKFLOW_STEPS: Record<Platform | 'default', WorkflowStep[]> = {
  youtube: [
    {
      step: 1,
      title: 'Upload Your Shorts Video',
      description:
        'Drag and drop your file to see safe zone overlays showing where channel name, subscribe button, like button, comments, share button, and video controls appear.',
      icon: 'upload',
      image: '/safe-zone-guide/upload-asset.webp',
      altText:
        'YouTube Shorts safe zone checker tool showing drag and drop file upload interface for 1080x1920 vertical video content with safe zone overlay preview',
    },
    {
      step: 2,
      title: 'Click Safe Zone',
      description:
        "Activate the safe zone overlay to visualize where YouTube's UI elements will appear on your content. This helps you identify areas where important visuals might be obscured by interface elements like buttons, captions, and controls.",
      icon: 'shield',
      image: '/safe-zone-guide/click-safe-zone.webp',
      altText:
        'YouTube Shorts safe zone checker showing safe zone overlay activation button and visual guide for identifying UI element placement',
    },
    {
      step: 3,
      title: 'Preview YouTube Shorts UI Overlays',
      description:
        "See where YouTube's interface elements appear: channel name at top, engagement buttons on right, video controls at bottom. Toggle to compare with other platforms.",
      icon: 'addVideo',
      image: '/safe-zone-guide/toggle-platforms.webp',
      altText:
        'YouTube Shorts safe zone checker preview interface showing platform UI overlays including channel name, subscribe button, like button, comments section, and video playback controls',
    },
    {
      step: 4,
      title: 'Export and Download Your Shorts',
      description:
        'Download with safe zone overlays as reference. Share with team and ensure all important elements stay visible when uploading to YouTube.',
      icon: 'checkCircle',
      image: '/safe-zone-guide/export-download.webp',
      altText:
        'YouTube Shorts safe zone checker tool export and download button interface for saving video preview with safe zone overlay reference guide for team collaboration',
    },
    {
      step: 5,
      title: 'Upload to Kreatli for Team Review',
      description:
        'Upload your exported file to Kreatli to share with your team for collaborative review. Get feedback on safe zone placement, ensure alignment across stakeholders, and document layout decisions. This step is essential for maintaining consistency and catching potential issues before publishing.',
      icon: 'paint',
      image: '/safe-zone-guide/upload-kreatli.webp',
      imageVariant: 'desktop',
      altText:
        'Kreatli platform interface showing file upload and team collaboration features for reviewing YouTube Shorts content with safe zone overlays',
    },
  ],
  instagram: [
    {
      step: 1,
      title: 'Upload Your Reels Video',
      description:
        'Drag and drop your file. See where profile picture, username, like button, comment button, share button, and music display will appear.',
      icon: 'upload',
      image: '/safe-zone-guide/upload-asset.webp',
      altText:
        'Instagram Reels safe zone checker tool showing drag and drop file upload interface for 1080x1920 vertical video content with safe zone overlay preview',
    },
    {
      step: 2,
      title: 'Click Safe Zone',
      description:
        "Activate the safe zone overlay to visualize where Instagram's UI elements will appear on your content. This helps you identify areas where important visuals might be obscured by interface elements like profile bars, engagement buttons, and captions.",
      icon: 'shield',
      image: '/safe-zone-guide/click-safe-zone.webp',
      altText:
        'Instagram Reels safe zone checker showing safe zone overlay activation button and visual guide for identifying UI element placement',
    },
    {
      step: 3,
      title: 'Preview Instagram Reels UI Overlays',
      description:
        "See where Instagram's interface elements appear - profile picture and username at top, engagement buttons on right, music track display.",
      icon: 'addVideo',
      image: '/safe-zone-guide/toggle-platforms.webp',
      altText:
        'Instagram Reels safe zone checker preview interface showing platform UI overlays including profile picture, username, like button, comment button, share button, and music track display',
    },
    {
      step: 4,
      title: 'Export and Download Your Reels',
      description:
        'Download with safe zone overlays as reference. Share with team, document layout decisions, and publish with confidence.',
      icon: 'checkCircle',
      image: '/safe-zone-guide/export-download.webp',
      altText:
        'Instagram Reels safe zone checker tool export and download button interface for saving video preview with safe zone overlay reference guide for team collaboration',
    },
    {
      step: 5,
      title: 'Upload to Kreatli for Team Review',
      description:
        'Upload your exported file to Kreatli to share with your team for collaborative review. Get feedback on safe zone placement, ensure alignment across stakeholders, and document layout decisions. This step is essential for maintaining consistency and catching potential issues before publishing.',
      icon: 'paint',
      image: '/safe-zone-guide/upload-kreatli.webp',
      imageVariant: 'desktop',
      altText:
        'Kreatli platform interface showing file upload and team collaboration features for reviewing Instagram Reels content with safe zone overlays',
    },
  ],
  tiktok: [
    {
      step: 1,
      title: 'Upload Your TikTok Video',
      description:
        'Drag and drop your file to see safe zone overlays showing where profile picture, username, music track, like button, comment button, share button, and follow button appear.',
      icon: 'upload',
      image: '/safe-zone-guide/upload-asset.webp',
      altText:
        'TikTok safe zone checker tool showing drag and drop file upload interface for 1080x1920 vertical video content with safe zone overlay preview',
    },
    {
      step: 2,
      title: 'Click Safe Zone',
      description:
        "Activate the safe zone overlay to visualize where TikTok's UI elements will appear on your content. This helps you identify areas where important visuals might be obscured by interface elements like profile information, engagement buttons, and captions.",
      icon: 'shield',
      image: '/safe-zone-guide/click-safe-zone.webp',
      altText:
        'TikTok safe zone checker showing safe zone overlay activation button and visual guide for identifying UI element placement',
    },
    {
      step: 3,
      title: 'Preview TikTok UI Overlays',
      description:
        "See where TikTok's interface elements appear: profile picture and username at top, music track display, engagement buttons on right. Toggle to compare with other platforms.",
      icon: 'addVideo',
      image: '/safe-zone-guide/toggle-platforms.webp',
      altText:
        'TikTok safe zone checker preview interface showing platform UI overlays including profile picture, username, music track display, like button, comment button, share button, and follow button',
    },
    {
      step: 4,
      title: 'Export and Download Your TikTok Video',
      description:
        'Download with safe zone overlays as reference. Share with team and ensure all important elements stay visible when posting to TikTok.',
      icon: 'checkCircle',
      image: '/safe-zone-guide/export-download.webp',
      altText:
        'TikTok safe zone checker tool export and download button interface for saving video preview with safe zone overlay reference guide for team collaboration',
    },
    {
      step: 5,
      title: 'Upload to Kreatli for Team Review',
      description:
        'Upload your exported file to Kreatli to share with your team for collaborative review. Get feedback on safe zone placement, ensure alignment across stakeholders, and document layout decisions. This step is essential for maintaining consistency and catching potential issues before publishing.',
      icon: 'paint',
      image: '/safe-zone-guide/upload-kreatli.webp',
      imageVariant: 'desktop',
      altText:
        'Kreatli platform interface showing file upload and team collaboration features for reviewing TikTok content with safe zone overlays',
    },
  ],
  default: [
    {
      step: 1,
      title: 'Upload Your Asset',
      description:
        'Drag and drop your file to see safe zone overlays showing where UI elements appear on your content.',
      icon: 'upload',
      image: '/safe-zone-guide/upload-asset.webp',
      altText:
        'Social media safe zone checker tool showing drag and drop file upload interface for TikTok, Instagram Reels, and YouTube Shorts vertical video content with safe zone overlay preview',
    },
    {
      step: 2,
      title: 'Click Safe Zone',
      description:
        'Activate the safe zone overlay to visualize where platform UI elements will appear on your content. This helps you identify areas where important visuals might be obscured by interface elements like buttons, captions, and profile information.',
      icon: 'shield',
      image: '/safe-zone-guide/click-safe-zone.webp',
      altText:
        'Social media safe zone checker showing safe zone overlay activation button and visual guide for identifying UI element placement across platforms',
    },
    {
      step: 3,
      title: 'Toggle Between Platform Overlays',
      description:
        'Switch between TikTok, Instagram Reels, and YouTube Shorts to see where UI elements appear on each platform.',
      icon: 'addVideo',
      image: '/safe-zone-guide/toggle-platforms.webp',
      altText:
        'Social media safe zone checker tool platform toggle interface showing UI overlays comparison for TikTok, Instagram Reels, and YouTube Shorts with safe zone indicators',
    },
    {
      step: 4,
      title: 'Export and Download with Safe Zones',
      description:
        'Download with safe zone overlays as reference. Share with stakeholders and document layout decisions.',
      icon: 'checkCircle',
      image: '/safe-zone-guide/export-download.webp',
      altText:
        'Social media safe zone checker tool export and download button interface for saving video preview with safe zone overlay reference guide for TikTok, Instagram Reels, and YouTube Shorts team collaboration',
    },
    {
      step: 5,
      title: 'Upload to Kreatli for Team Review',
      description:
        'Upload your exported file to Kreatli to share with your team for collaborative review. Get feedback on safe zone placement, ensure alignment across stakeholders, and document layout decisions. This step is essential for maintaining consistency and catching potential issues before publishing.',
      icon: 'paint',
      image: '/safe-zone-guide/upload-kreatli.webp',
      imageVariant: 'desktop',
      altText:
        'Kreatli platform interface showing file upload and team collaboration features for reviewing social media content with safe zone overlays',
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

export const SafeZoneScreenGuide = ({ platform }: SafeZoneScreenGuideProps = {}) => {
  const platformKey = platform || 'default';
  const workflowSteps = getWorkflowSteps(platform);
  const contentLabels = CONTENT_LABELS[platformKey];
  const faqItems = getFAQItems(platform);

  return (
    <div>
      {/* How to Use Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <h2 className="mx-auto mb-3 max-w-xl text-center font-sans text-2xl font-bold sm:text-4xl">
              How to Use Safe-Zone Checker in Your Workflow
            </h2>
            <p className="mx-auto max-w-2xl text-base text-foreground-500">
              Follow this step-by-step process to ensure your {contentLabels.content} looks perfect on{' '}
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
                        {item.imageVariant === 'desktop' ? (
                          <div className="w-full max-w-4xl">
                            <div className="overflow-hidden rounded-2xl border border-foreground-200 bg-content1 shadow-lg">
                              <Image
                                src={item.image}
                                alt={item.altText || `${item.title} - Social media safe zone checker screenshot`}
                                loading="lazy"
                                removeWrapper
                                className="h-auto w-full object-contain"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="relative max-w-[280px]">
                            {/* Phone Frame */}
                            <div className="relative mx-auto rounded-[2.5rem] bg-white p-2 shadow-2xl">
                              {/* Notch */}
                              <div className="absolute left-1/2 top-0 z-10 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-white"></div>
                              {/* Screen */}
                              <div className="overflow-hidden rounded-[2rem] bg-black">
                                <Image
                                  src={item.image}
                                  alt={item.altText || `${item.title} - Social media safe zone checker screenshot`}
                                  loading="lazy"
                                  width={280}
                                  height={500}
                                  removeWrapper
                                  className="h-auto w-full"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mx-auto mb-4 max-w-2xl text-center font-sans text-2xl font-bold sm:text-4xl">
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
            <h2 className="mx-auto mb-4 max-w-md text-center font-sans text-2xl font-bold sm:text-4xl">
              What are Safe Zones and Why They Matter
            </h2>
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
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-4xl">Why This Matters More Than Ever</h2>
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
        excludeHref="/social-media-safe-zone-checker"
        title="More Tools for Creative Teams"
        description="Explore our collection of free tools designed to help creative professionals work more efficiently."
      />

      {/* FAQ Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-4xl">
          <h2 className="mb-8 text-center font-sans text-2xl font-bold sm:text-4xl">Frequently Asked Questions</h2>

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
