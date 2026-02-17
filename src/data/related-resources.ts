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
  videoAnnotation: {
    title: 'Video Annotation',
    description:
      'Add frame-accurate annotations, drawings, and markup directly to video frames. Pin comments to exact timestamps and collaborate with precise visual feedback.',
    href: '/platform/video-annotation',
    icon: 'paint' as IconType,
    buttonText: 'Learn More',
  },
  annotatePdf: {
    title: 'Annotate PDF',
    description:
      'Annotate and review PDFs with comments and markup. Add feedback directly on PDFs for precise, location-pinned review.',
    href: '/platform/annotate-pdf',
    icon: 'filePdf' as IconType,
    buttonText: 'Learn More',
  },
  drawOnPdfDocument: {
    title: 'Draw on PDF Document',
    description: 'Draw and markup directly on PDFs for precise feedback. Freehand, shapes, and annotations on PDFs.',
    href: '/platform/draw-on-pdf-document',
    icon: 'filePdf' as IconType,
    buttonText: 'Learn More',
  },
  addCommentsToPdf: {
    title: 'Add Comments to PDF',
    description:
      'Add comments to PDF with location-pinned, threaded feedback. Collaborate on PDFs without drawing tools.',
    href: '/platform/add-comments-to-pdf',
    icon: 'chat' as IconType,
    buttonText: 'Learn More',
  },
  annotateImage: {
    title: 'Annotate Image',
    description:
      'Annotate and review images with comments and markup. Add feedback directly on images for precise, location-pinned review.',
    href: '/platform/annotate-image',
    icon: 'panorama' as IconType,
    buttonText: 'Learn More',
  },
  drawOnImage: {
    title: 'Draw on Image',
    description: 'Draw and markup directly on images for precise feedback. Freehand, shapes, and annotations on images.',
    href: '/platform/draw-on-image',
    icon: 'panorama' as IconType,
    buttonText: 'Learn More',
  },
  commentOnVideo: {
    title: 'Comment on Video',
    description:
      'Comment on video with frame-accurate, timestamp-pinned feedback. Threaded discussions tied to exact frames.',
    href: '/platform/comment-on-video',
    icon: 'reply' as IconType,
    buttonText: 'Learn More',
  },
  // Solution pages
  advertisingMarketingAgencies: {
    title: 'Advertising & Marketing Agencies',
    description:
      'Streamline campaign production with frame-accurate video review, asset-linked feedback, and no-signup client links.',
    href: '/solutions/industry/advertising-marketing-agencies',
    icon: 'group' as IconType,
    buttonText: 'Learn More',
  },
  inHouseCreativeContentTeams: {
    title: 'In-House Creative & Content Teams',
    description:
      'Streamline brand asset management, campaign production, and stakeholder approvals. Collaborate with external agencies while maintaining brand consistency.',
    href: '/solutions/industry/in-house-creative-content-teams',
    icon: 'suitcase' as IconType,
    buttonText: 'Learn More',
  },
  videoProductionAnimationStudios: {
    title: 'Video Production & Animation Studios',
    description:
      'Frame-accurate feedback, version control, and collaboration for video production teams. Ship more content with less chaos.',
    href: '/solutions/industry/video-production-animation-studios',
    icon: 'monitorPlay' as IconType,
    buttonText: 'Learn More',
  },
  clientApprovals: {
    title: 'Client Approvals',
    description:
      'Client approvals tied to exact file versions, not links or emails. See status at a glance and maintain a complete audit trail that protects both parties.',
    href: '/solutions/use-case/client-approvals',
    icon: 'checkCircle' as IconType,
    buttonText: 'Learn More',
  },
  creativeProductionManagement: {
    title: 'Creative Production Management',
    description:
      'Manage creative work around the files themselves. Every file, version, comment, and approval connects directly to production status.',
    href: '/solutions/use-case/creative-production-management',
    icon: 'folder' as IconType,
    buttonText: 'Learn More',
  },
  creativeProofing: {
    title: 'Creative Proofing',
    description:
      'Review creative work and turn feedback into trackable work. Every upload creates a new version for easy comparison.',
    href: '/solutions/use-case/creative-proofing',
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
  // Free Tools
  safeZoneChecker: {
    title: 'Social Media Safe Zone Checker',
    description:
      'Preview where UI overlays appear on Instagram Reels, TikTok videos, and YouTube Shorts to ensure your content stays visible.',
    href: '/social-media-safe-zone-checker',
    icon: 'shield' as IconType,
    buttonText: 'Try Now',
  },
  dataTransferCalculator: {
    title: 'Data Transfer Calculator',
    description:
      'Calculate how long it takes to upload or download large files. Perfect for video editors and post-production teams.',
    href: '/free-tools/data-transfer-calculator',
    icon: 'upload' as IconType,
    buttonText: 'Try Now',
  },
  videoFeedbackTool: {
    title: 'Video Feedback Tool',
    description:
      'Give frame-accurate feedback on videos with comments, annotations, and markup. No sign-up required for reviewers.',
    href: '/free-tools/video-feedback-tool',
    icon: 'play' as IconType,
    buttonText: 'Try Now',
  },
  videoReviewer: {
    title: 'Video Reviewer',
    description:
      'Review videos online with frame-accurate comments, visual annotations, and approval workflows. No sign-up required.',
    href: '/free-tools/video-reviewer',
    icon: 'monitorPlay' as IconType,
    buttonText: 'Try Now',
  },
} as const;

// Helper function to get resources by keys
export function getRelatedResources(keys: (keyof typeof RELATED_RESOURCES)[]): RelatedResource[] {
  return keys.map((key) => RELATED_RESOURCES[key]);
}
