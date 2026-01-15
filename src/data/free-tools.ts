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
    title: 'YouTube Banner Resizer',
    description:
      'Resize your YouTube channel art to the perfect dimensions. Preview safe areas for mobile, desktop, tablet, and TV devices.',
    href: '/free-tools/youtube-banner-resizer',
    icon: 'file',
    buttonText: 'Try Now',
    ariaLabel: 'Resize YouTube banner',
  },
];
