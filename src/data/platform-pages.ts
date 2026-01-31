import { RELATED_RESOURCES } from './related-resources';

/**
 * Platform page section type
 */
export type PlatformSection = 'Core Platform' | 'Storage & Integrations';

/**
 * Platform page configuration interface
 * Defines metadata for platform feature pages used in navigation, sitemap, and related resources
 */
export interface PlatformPage {
  /** Display label for navigation */
  label: string;
  /** URL path (must match file path in pages directory) */
  href: string;
  /** Short description for navigation dropdowns */
  description: string;
  /** Icon key for platform feature card (must match Icon component IconType) */
  icon: string;
  /** Section grouping for navigation organization */
  section: PlatformSection;
  /** Sort order within section (lower numbers appear first) */
  order: number;
  /** Sitemap configuration */
  sitemap?: {
    /** Priority (0.0 to 1.0) */
    priority: string;
    /** Change frequency */
    changefreq: string;
  };
  /** Keys from RELATED_RESOURCES to link to related pages */
  relatedResourceKeys?: (keyof typeof RELATED_RESOURCES)[];
}

/**
 * Central registry of all platform feature pages
 * This is the single source of truth for:
 * - Header navigation (desktop dropdown + mobile menu)
 * - Footer navigation
 * - Sitemap generation
 * - Related resources linking
 *
 * When adding a new platform page:
 * 1. Add entry here with all required fields
 * 2. Create the page file at src/pages/platform/<slug>.tsx
 * 3. Navigation and sitemap will automatically include it
 */
export const PLATFORM_PAGES: PlatformPage[] = [
  // Core Platform section
  {
    label: 'The Creative Workspace',
    href: '/platform/creative-workspace',
    description: 'Unified workspace for creative production',
    icon: 'slides',
    section: 'Core Platform',
    order: 1,
    sitemap: {
      priority: '0.8',
      changefreq: 'monthly',
    },
    relatedResourceKeys: ['projectOrchestration', 'secureAssetStorage'],
  },
  {
    label: 'Review & Approval',
    href: '/platform/review-approval',
    description: 'Frame-accurate revisions and approvals',
    icon: 'compare',
    section: 'Core Platform',
    order: 2,
    sitemap: {
      priority: '0.8',
      changefreq: 'monthly',
    },
    relatedResourceKeys: ['projectOrchestration', 'creativeWorkspace', 'secureAssetStorage'],
  },
  {
    label: 'Project Orchestration',
    href: '/platform/project-orchestration',
    description: 'Centralized project management',
    icon: 'folder',
    section: 'Core Platform',
    order: 3,
    sitemap: {
      priority: '0.8',
      changefreq: 'monthly',
    },
    relatedResourceKeys: ['creativeWorkspace', 'reviewApproval', 'secureAssetStorage'],
  },
  {
    label: 'Video Annotation',
    href: '/platform/video-annotation',
    description: 'Frame-accurate video annotation and markup',
    icon: 'monitorPlay',
    section: 'Core Platform',
    order: 4,
    sitemap: {
      priority: '0.8',
      changefreq: 'monthly',
    },
    relatedResourceKeys: ['reviewApproval', 'creativeProofing'],
  },
  {
    label: 'Add Drawing To Video',
    href: '/platform/add-drawing-to-video',
    description: 'Draw directly on video frames with markup and annotations',
    icon: 'paint',
    section: 'Core Platform',
    order: 5,
    sitemap: {
      priority: '0.8',
      changefreq: 'monthly',
    },
    relatedResourceKeys: ['reviewApproval', 'creativeProofing', 'projectOrchestration'],
  },
  {
    label: 'Free Video Link Generator',
    href: '/platform/free-video-link-generator',
    description: 'Generate secure video review links for clients and collaborators',
    icon: 'link',
    section: 'Core Platform',
    order: 6,
    sitemap: {
      priority: '0.8',
      changefreq: 'monthly',
    },
    relatedResourceKeys: ['reviewApproval', 'videoAnnotation', 'secureAssetStorage'],
  },
  {
    label: 'Share Video',
    href: '/platform/share-video',
    description: 'Share video links with clients for review and approval in seconds',
    icon: 'share',
    section: 'Core Platform',
    order: 7,
    sitemap: {
      priority: '0.8',
      changefreq: 'monthly',
    },
    relatedResourceKeys: ['reviewApproval', 'videoAnnotation', 'secureAssetStorage'],
  },
  {
    label: 'Send Video',
    href: '/platform/send-video',
    description: 'Send your video to clients for free review and feedback',
    icon: 'upload',
    section: 'Core Platform',
    order: 8,
    sitemap: {
      priority: '0.8',
      changefreq: 'monthly',
    },
    relatedResourceKeys: ['reviewApproval', 'videoAnnotation', 'secureAssetStorage'],
  },
  {
    label: 'Embed Video',
    href: '/platform/embed-video',
    description: 'Embed your videos with built-in review and approvals',
    icon: 'fullscreen',
    section: 'Core Platform',
    order: 9,
    sitemap: {
      priority: '0.8',
      changefreq: 'monthly',
    },
    relatedResourceKeys: ['reviewApproval', 'videoAnnotation', 'secureAssetStorage'],
  },
  {
    label: 'Share MP4',
    href: '/platform/share-mp4',
    description: 'Share MP4 files with clients via secure links for review',
    icon: 'send',
    section: 'Core Platform',
    order: 10,
    sitemap: {
      priority: '0.8',
      changefreq: 'monthly',
    },
    relatedResourceKeys: ['reviewApproval', 'videoAnnotation', 'secureAssetStorage'],
  },
  {
    label: 'Annotate PDF',
    href: '/platform/annotate-pdf',
    description: 'Annotate and review PDFs with comments and markup',
    icon: 'filePdf',
    section: 'Core Platform',
    order: 11,
    sitemap: {
      priority: '0.8',
      changefreq: 'monthly',
    },
    relatedResourceKeys: ['reviewApproval', 'creativeProofing', 'videoAnnotation'],
  },
  {
    label: 'Compare PDF Files',
    href: '/platform/compare-pdf-files',
    description: 'Compare two PDF versions side by side with comments and annotations',
    icon: 'compare',
    section: 'Core Platform',
    order: 12,
    sitemap: {
      priority: '0.8',
      changefreq: 'monthly',
    },
    relatedResourceKeys: ['reviewApproval', 'creativeProofing', 'videoAnnotation'],
  },
  {
    label: 'Compare Videos',
    href: '/platform/compare-videos',
    description: 'Compare two video versions side by side with frame-accurate comments',
    icon: 'compare',
    section: 'Core Platform',
    order: 13,
    sitemap: {
      priority: '0.8',
      changefreq: 'monthly',
    },
    relatedResourceKeys: ['reviewApproval', 'creativeProofing', 'videoAnnotation'],
  },
  {
    label: 'Extract Frames from Video',
    href: '/platform/extract-frames-from-video',
    description: 'Extract, get, and export still frames from video',
    icon: 'panorama',
    section: 'Core Platform',
    order: 14,
    sitemap: {
      priority: '0.8',
      changefreq: 'monthly',
    },
    relatedResourceKeys: ['videoAnnotation', 'creativeProofing', 'reviewApproval'],
  },
  {
    label: 'Instagram Reels Safe Zone',
    href: '/platform/instagram-reels-safe-zone',
    description: 'Check Instagram Reels safe zone before posting',
    icon: 'instagram',
    section: 'Core Platform',
    order: 15,
    sitemap: {
      priority: '0.8',
      changefreq: 'monthly',
    },
    relatedResourceKeys: ['creativeProofing', 'reviewApproval', 'videoAnnotation'],
  },
  {
    label: 'TikTok Safe Zone',
    href: '/platform/tiktok-safe-zone',
    description: 'Check TikTok safe zone before posting',
    icon: 'tiktok',
    section: 'Core Platform',
    order: 16,
    sitemap: {
      priority: '0.8',
      changefreq: 'monthly',
    },
    relatedResourceKeys: ['creativeProofing', 'reviewApproval', 'videoAnnotation'],
  },
  {
    label: 'YouTube Shorts Safe Zone',
    href: '/platform/youtube-shorts-safe-zone',
    description: 'Check YouTube Shorts safe zone before posting',
    icon: 'youtube',
    section: 'Core Platform',
    order: 17,
    sitemap: {
      priority: '0.8',
      changefreq: 'monthly',
    },
    relatedResourceKeys: ['creativeProofing', 'reviewApproval', 'videoAnnotation'],
  },
  {
    label: 'Resize YouTube Banner',
    href: '/platform/resize-youtube-banner',
    description: 'Resize YouTube channel banner to correct dimensions',
    icon: 'grid',
    section: 'Core Platform',
    order: 18,
    sitemap: {
      priority: '0.8',
      changefreq: 'monthly',
    },
    relatedResourceKeys: ['creativeProofing', 'reviewApproval', 'videoAnnotation'],
  },
  {
    label: 'Send Large Video Files',
    href: '/platform/send-large-video-files',
    description: 'Send large video files to clients without email limits',
    icon: 'send',
    section: 'Core Platform',
    order: 19,
    sitemap: {
      priority: '0.8',
      changefreq: 'monthly',
    },
    relatedResourceKeys: ['reviewApproval', 'videoAnnotation', 'secureAssetStorage'],
  },
  // Storage & Integrations section
  {
    label: 'Secure Asset Storage',
    href: '/platform/secure-asset-storage',
    description: 'Reliable media storage and organization',
    icon: 'shield',
    section: 'Storage & Integrations',
    order: 1,
    sitemap: {
      priority: '0.8',
      changefreq: 'monthly',
    },
    relatedResourceKeys: ['creativeWorkspace', 'projectOrchestration'],
  },
  {
    label: 'Integrations',
    href: '/platform/integrations',
    description: 'Google Drive and Dropbox integrations',
    icon: 'gear',
    section: 'Storage & Integrations',
    order: 2,
    sitemap: {
      priority: '0.8',
      changefreq: 'monthly',
    },
    relatedResourceKeys: ['creativeWorkspace', 'secureAssetStorage'],
  },
];

/**
 * Get platform pages grouped by section.
 * Built dynamically from PLATFORM_PAGES so any new page or section is included
 * (e.g. footer and header nav stay in sync automatically).
 * @returns Object with section titles as keys and arrays of pages (sorted by order)
 */
export function getPlatformPagesBySection(): Record<string, PlatformPage[]> {
  const grouped: Record<string, PlatformPage[]> = {};

  PLATFORM_PAGES.forEach((page) => {
    if (!grouped[page.section]) grouped[page.section] = [];
    grouped[page.section].push(page);
  });

  // Sort each section by order
  Object.keys(grouped).forEach((section) => {
    grouped[section].sort((a, b) => a.order - b.order);
  });

  // Sort section keys by min order in section so display order is stable
  const sectionOrder = Object.fromEntries(
    Object.entries(grouped).map(([title, pages]) => [title, Math.min(...pages.map((p) => p.order))]),
  );
  const sortedKeys = Object.keys(grouped).sort((a, b) => sectionOrder[a] - sectionOrder[b]);
  const result: Record<string, PlatformPage[]> = {};
  sortedKeys.forEach((k) => {
    result[k] = grouped[k];
  });
  return result;
}

/**
 * Get a platform page by its href
 * @param href - The href to lookup
 * @returns PlatformPage if found, undefined otherwise
 */
export function getPlatformPageByHref(href: string): PlatformPage | undefined {
  return PLATFORM_PAGES.find((page) => page.href === href);
}

/**
 * Get platform pages formatted for sitemap
 * @returns Array of sitemap entries with path, priority, and changefreq
 */
export function getPlatformPagesForSitemap(): Array<{
  path: string;
  priority: string;
  changefreq: string;
}> {
  return PLATFORM_PAGES.map((page) => ({
    path: page.href,
    priority: page.sitemap?.priority || '0.8',
    changefreq: page.sitemap?.changefreq || 'monthly',
  }));
}
