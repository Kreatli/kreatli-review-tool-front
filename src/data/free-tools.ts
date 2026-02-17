import { IconType } from '../components/various/Icon/Icon';

export interface FreeTool {
  title: string;
  description: string;
  href: string;
  icon: IconType;
  buttonText?: string;
  ariaLabel?: string;
}

export const FREE_TOOLS: FreeTool[] = [
  {
    title: 'Video Feedback Tool',
    description:
      'Give frame-accurate feedback on videos with comments, annotations, and markup. Share review links with clients—no sign-up required for reviewers.',
    href: '/free-tools/video-feedback-tool',
    icon: 'play',
    buttonText: 'Try Now',
    ariaLabel: 'Try Video Feedback Tool',
  },
  {
    title: 'Video Reviewer',
    description:
      'Review videos online with frame-accurate comments, visual annotations, and approval workflows. Share with clients—no sign-up required.',
    href: '/free-tools/video-reviewer',
    icon: 'monitorPlay',
    buttonText: 'Try Now',
    ariaLabel: 'Try Video Reviewer',
  },
  {
    title: 'PDF Reviewer',
    description:
      'Review PDFs online with location-pinned comments, annotations, and approvals. Share with clients—no sign-up required.',
    href: '/free-tools/pdf-reviewer',
    icon: 'filePdf',
    buttonText: 'Try Now',
    ariaLabel: 'Try PDF Reviewer',
  },
  {
    title: 'Image Reviewer',
    description:
      'Review images online with location-pinned comments, annotations, and approvals. Share with clients—no sign-up required.',
    href: '/free-tools/image-reviewer',
    icon: 'panorama',
    buttonText: 'Try Now',
    ariaLabel: 'Try Image Reviewer',
  },
  {
    title: 'Video Frame Extractor',
    description:
      'Scrub through a video, capture the moments you like, and download still images as PNG/JPG. Everything runs in your browser - no uploads, no watermark, no sign-up needed',
    href: '/free-tools/video-frame-extractor',
    icon: 'panorama',
    buttonText: 'Try Now',
    ariaLabel: 'Extract and download video frames',
  },
  {
    title: 'Data Transfer Calculator',
    description:
      'Calculate how long it takes to upload or download large files. Perfect for video editors and post-production teams.',
    href: '/free-tools/data-transfer-calculator',
    icon: 'upload',
    buttonText: 'Try Now',
    ariaLabel: 'Calculate data transfer time',
  },
  {
    title: 'Software Cost Calculator',
    description:
      "Calculate how much you're spending on multiple creative tools and see how much you could save by consolidating with Kreatli.",
    href: '/free-tools/cost-calculator',
    icon: 'dollar',
    buttonText: 'Try Now',
    ariaLabel: 'Calculate software cost savings',
  },
  {
    title: 'Social Media Safe Zone Checker',
    description:
      'Preview where UI overlays appear on Instagram Reels, TikTok videos, and YouTube Shorts to ensure your content stays visible.',
    href: '/social-media-safe-zone-checker',
    icon: 'shield',
    buttonText: 'Try Now',
    ariaLabel: 'Try Social Media Safe Zone Checker',
  },
  {
    title: 'Instagram Reels Safe Zone Checker',
    description:
      'Check your Instagram Reels safe zone before posting. Preview where profile picture, username, like button, comment button, and music display appear.',
    href: '/social-media-safe-zone-checker/instagram-safe-zone-checker',
    icon: 'instagram',
    buttonText: 'Try Now',
    ariaLabel: 'Try Instagram Reels Safe Zone Checker',
  },
  {
    title: 'TikTok Safe Zone Checker',
    description:
      'Check your TikTok video safe zones before posting. Preview where profile picture, username, music track, and engagement buttons appear.',
    href: '/social-media-safe-zone-checker/tiktok-safe-zone-checker',
    icon: 'tiktok',
    buttonText: 'Try Now',
    ariaLabel: 'Try TikTok Safe Zone Checker',
  },
  {
    title: 'YouTube Shorts Safe Zone Checker',
    description:
      'Test your YouTube Shorts video layout before publishing. Preview where channel name, subscribe button, like button, comments, and video controls appear.',
    href: '/social-media-safe-zone-checker/youtube-safe-zone-checker',
    icon: 'youtube',
    buttonText: 'Try Now',
    ariaLabel: 'Try YouTube Shorts Safe Zone Checker',
  },
  {
    title: 'YouTube Banner Resizer',
    description:
      'Resize your YouTube channel art to the perfect dimensions. Preview safe areas for mobile, desktop, tablet, and TV devices.',
    href: '/free-tools/youtube-banner-resizer',
    icon: 'youtube',
    buttonText: 'Try Now',
    ariaLabel: 'Resize YouTube banner',
  },
];
