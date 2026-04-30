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
      'Board-driven tasks on customizable project stages. Link work to media, assign owners and contributors, and track progress by column.',
    href: '/platform/project-orchestration',
    icon: 'board' as IconType,
    buttonText: 'Learn More',
  },
  deliverables: {
    title: 'Deliverables',
    description: 'Track what needs to ship with due dates, ownership, and approval visibility—so delivery stays predictable.',
    href: '/platform/deliverables',
    icon: 'calendar' as IconType,
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
    title: 'Safe Zone Checker',
    description:
      'Preview where UI overlays appear on Instagram Reels, TikTok videos, and YouTube Shorts to ensure your content stays visible.',
    href: '/safe-zone-checker',
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
      'Video review and approval in one video review tool: frame-accurate comments, markup, and shareable review links for creative teams.',
    href: '/free-tools/video-feedback-tool',
    icon: 'play' as IconType,
    buttonText: 'Try Now',
  },
  videoReviewer: {
    title: 'Video Reviewer',
    description:
      'Review videos online with frame-accurate comments, visual annotations, and approval workflows. Recipients do not need a Kreatli account on shared review links.',
    href: '/free-tools/video-reviewer',
    icon: 'monitorPlay' as IconType,
    buttonText: 'Try Now',
  },
  platformProofPdf: {
    title: 'Proof PDF',
    description:
      'Run client-ready PDF review with markup and approvals tied to each page—alongside your video and creative assets.',
    href: '/platform/proof-pdf',
    icon: 'filePdf' as IconType,
    buttonText: 'Learn More',
  },
  platformComparePdfFiles: {
    title: 'Compare PDF files',
    description:
      'Put two document versions side by side so reviewers can spot changes and approve with confidence.',
    href: '/platform/compare-pdf-files',
    icon: 'filePdf' as IconType,
    buttonText: 'Learn More',
  },
  platformSendLargeVideoFiles: {
    title: 'Send large video files',
    description:
      'Move heavy cuts and masters through review without breaking your production handoff workflow.',
    href: '/platform/send-large-video-files',
    icon: 'upload' as IconType,
    buttonText: 'Learn More',
  },
  platformManageVideos: {
    title: 'Manage videos',
    description:
      'Organize projects, versions, and review status so every cut stays traceable from upload to approval.',
    href: '/platform/manage-videos',
    icon: 'monitorPlay' as IconType,
    buttonText: 'Learn More',
  },
  platformDocumentVersionControl: {
    title: 'Document version control',
    description:
      'Keep PDFs and documents on a clear version line with comments and sign-offs on the current file.',
    href: '/platform/document-version-control',
    icon: 'folder' as IconType,
    buttonText: 'Learn More',
  },
  guideShareLargeVideoFiles: {
    title: 'Share large video files',
    description:
      'Practical guidance on delivering big video files to clients and reviewers while keeping quality and context.',
    href: '/guides/share-large-video-files',
    icon: 'upload' as IconType,
    buttonText: 'Read guide',
  },
  guideMarkupPdf: {
    title: 'How to mark up a PDF',
    description: 'Step-by-step markup workflows for creative and client PDF review.',
    href: '/guides/how-to-markup-a-pdf',
    icon: 'filePdf' as IconType,
    buttonText: 'Read guide',
  },
  helpCenter: {
    title: 'Help center',
    description: 'FAQs, workflows, and pointers to guides and platform features.',
    href: '/help',
    icon: 'helpCircle' as IconType,
    buttonText: 'Visit help',
  },
  freeToolImageAnnotator: {
    title: 'Free image annotator',
    description: 'Try pinned comments and markup on images in your browser.',
    href: '/free-tools/image-annotator',
    icon: 'panorama' as IconType,
    buttonText: 'Try tool',
  },
  freeToolPdfMarkup: {
    title: 'Free PDF markup tool',
    description: 'Add markup and comments on PDF pages, then share a review link.',
    href: '/free-tools/pdf-markup-tool',
    icon: 'filePdf' as IconType,
    buttonText: 'Try tool',
  },
} as const;

// Helper function to get resources by keys
export function getRelatedResources(keys: (keyof typeof RELATED_RESOURCES)[]): RelatedResource[] {
  return keys.map((key) => RELATED_RESOURCES[key]);
}
