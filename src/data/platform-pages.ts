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
    section: 'Core Platform',
    order: 4,
    sitemap: {
      priority: '0.8',
      changefreq: 'monthly',
    },
    relatedResourceKeys: ['reviewApproval', 'creativeProofing'],
  },
  // Storage & Integrations section
  {
    label: 'Secure Asset Storage',
    href: '/platform/secure-asset-storage',
    description: 'Reliable media storage and organization',
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
 * Get platform pages grouped by section
 * @returns Object with section titles as keys and arrays of pages as values
 */
export function getPlatformPagesBySection(): Record<PlatformSection, PlatformPage[]> {
  const grouped: Record<PlatformSection, PlatformPage[]> = {
    'Core Platform': [],
    'Storage & Integrations': [],
  };

  PLATFORM_PAGES.forEach((page) => {
    grouped[page.section].push(page);
  });

  // Sort each section by order
  Object.keys(grouped).forEach((section) => {
    grouped[section as PlatformSection].sort((a, b) => a.order - b.order);
  });

  return grouped;
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
