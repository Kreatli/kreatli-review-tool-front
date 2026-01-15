import { IconType } from '../components/various/Icon/Icon';

export interface RelatedResource {
  title: string;
  description: string;
  href: string;
  icon: IconType;
  buttonText?: string;
}

export const RELATED_RESOURCES = {
  // Platform pages
  projectOrchestration: {
    title: 'Project Orchestration',
    description:
      'Centralized project management for creative teams. Assign files, track deliverables, and coordinate your entire workflow.',
    href: '/platform/project-orchestration',
    icon: 'slides' as IconType,
    buttonText: 'Learn More',
  },
  secureAssetStorage: {
    title: 'Secure Asset Storage',
    description:
      'Enterprise-grade storage for creative assets. Organize files, track versions, and protect your media with reliable infrastructure.',
    href: '/platform/secure-asset-storage',
    icon: 'shield' as IconType,
    buttonText: 'Learn More',
  },
  creativeWorkspace: {
    title: 'Creative Workspace',
    description:
      'Unified workspace for creative production. Organize assets, manage projects, and collaborate with your team.',
    href: '/platform/creative-workspace',
    icon: 'folder' as IconType,
    buttonText: 'Learn More',
  },
  reviewApproval: {
    title: 'Review & Approval',
    description: 'Frame-accurate revisions and approvals for video content. Streamline your feedback workflow.',
    href: '/platform/review-approval',
    icon: 'paint' as IconType,
    buttonText: 'Learn More',
  },
  // Blog
  blog: {
    title: 'Kreatli Blog',
    description:
      'Insights, tips, and best practices for creative teams. Discover strategies to streamline your workflow.',
    href: '/blog',
    icon: 'file' as IconType,
    buttonText: 'Read Articles',
  },
} as const;

// Helper function to get resources by keys
export function getRelatedResources(keys: (keyof typeof RELATED_RESOURCES)[]): RelatedResource[] {
  return keys.map((key) => RELATED_RESOURCES[key]);
}
