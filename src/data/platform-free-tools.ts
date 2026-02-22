import { FREE_TOOLS, FreeTool } from './free-tools';

/**
 * Platform path -> 4 relevant free tool hrefs. Used to show topic-relevant tools
 * and vary internal links across platform pages.
 */
const PLATFORM_FREE_TOOL_HREFS: Record<string, string[]> = {
  // Safe zone pages: emphasize safe zone checkers + YouTube Banner Resizer
  '/platform/youtube-shorts-safe-zone': [
    '/safe-zone-checker/youtube-safe-zone-checker',
    '/free-tools/youtube-banner-resizer',
    '/safe-zone-checker',
    '/free-tools/video-reviewer',
  ],
  '/platform/tiktok-safe-zone': [
    '/safe-zone-checker/tiktok-safe-zone-checker',
    '/safe-zone-checker/instagram-safe-zone-checker',
    '/safe-zone-checker/youtube-safe-zone-checker',
    '/free-tools/youtube-banner-resizer',
  ],
  '/platform/instagram-reels-safe-zone': [
    '/safe-zone-checker/instagram-safe-zone-checker',
    '/safe-zone-checker/tiktok-safe-zone-checker',
    '/safe-zone-checker/youtube-safe-zone-checker',
    '/free-tools/youtube-banner-resizer',
  ],

  // Video annotation / drawing / feedback cluster – vary which 4
  '/platform/add-drawing-to-video': [
    '/free-tools/video-annotator',
    '/free-tools/video-feedback-tool',
    '/free-tools/video-frame-extractor',
    '/free-tools/video-reviewer',
  ],
  '/platform/comment-on-video': [
    '/free-tools/video-feedback-tool',
    '/free-tools/video-reviewer',
    '/free-tools/video-annotator',
    '/free-tools/video-proofing-tool',
  ],
  '/platform/video-versioning': [
    '/free-tools/video-manager',
    '/free-tools/video-reviewer',
    '/free-tools/video-feedback-tool',
    '/free-tools/video-frame-extractor',
  ],
  '/platform/video-feedback': [
    '/free-tools/video-feedback-tool',
    '/free-tools/video-reviewer',
    '/free-tools/video-annotator',
    '/free-tools/video-proofing-tool',
  ],
  '/platform/draw-on-a-video': [
    '/free-tools/video-annotator',
    '/free-tools/video-feedback-tool',
    '/free-tools/video-frame-extractor',
    '/free-tools/video-reviewer',
  ],

  // Video review / proofing / manage
  '/platform/review-video': [
    '/free-tools/video-reviewer',
    '/free-tools/video-feedback-tool',
    '/free-tools/video-annotator',
    '/free-tools/video-proofing-tool',
  ],
  '/platform/video-proofing': [
    '/free-tools/video-proofing-tool',
    '/free-tools/video-reviewer',
    '/free-tools/video-feedback-tool',
    '/free-tools/video-annotator',
  ],
  '/platform/video-annotation': [
    '/free-tools/video-annotator',
    '/free-tools/video-feedback-tool',
    '/free-tools/video-reviewer',
    '/free-tools/video-frame-extractor',
  ],
  '/platform/manage-videos': [
    '/free-tools/video-manager',
    '/free-tools/video-reviewer',
    '/free-tools/video-feedback-tool',
    '/free-tools/video-proofing-tool',
  ],
  '/platform/extract-frames-from-video': [
    '/free-tools/video-frame-extractor',
    '/free-tools/resize-video',
    '/free-tools/video-annotator',
    '/free-tools/video-reviewer',
  ],

  // Share / send / embed video
  '/platform/share-video': [
    '/free-tools/video-feedback-tool',
    '/free-tools/video-reviewer',
    '/free-tools/data-transfer-calculator',
    '/free-tools/video-manager',
  ],
  '/platform/share-mp4': [
    '/free-tools/video-reviewer',
    '/free-tools/video-feedback-tool',
    '/free-tools/data-transfer-calculator',
    '/free-tools/video-manager',
  ],
  '/platform/send-video': [
    '/free-tools/video-feedback-tool',
    '/free-tools/video-reviewer',
    '/free-tools/data-transfer-calculator',
    '/free-tools/video-manager',
  ],
  '/platform/send-large-video-files': [
    '/free-tools/data-transfer-calculator',
    '/free-tools/video-feedback-tool',
    '/free-tools/video-reviewer',
    '/free-tools/video-manager',
  ],
  '/platform/free-video-link-generator': [
    '/free-tools/video-feedback-tool',
    '/free-tools/video-reviewer',
    '/free-tools/video-manager',
    '/free-tools/data-transfer-calculator',
  ],
  '/platform/embed-video': [
    '/free-tools/video-reviewer',
    '/free-tools/video-feedback-tool',
    '/free-tools/video-manager',
    '/safe-zone-checker',
  ],

  // YouTube banner
  '/platform/resize-youtube-banner': [
    '/free-tools/youtube-banner-resizer',
    '/free-tools/resize-video',
    '/safe-zone-checker/youtube-safe-zone-checker',
    '/safe-zone-checker/instagram-safe-zone-checker',
  ],

  // PDF cluster – vary which 4 across pages
  '/platform/review-pdf': [
    '/free-tools/pdf-reviewer',
    '/free-tools/pdf-annotator',
    '/free-tools/image-reviewer',
    '/free-tools/video-reviewer',
  ],
  '/platform/proof-pdf': [
    '/free-tools/pdf-annotator',
    '/free-tools/pdf-reviewer',
    '/free-tools/video-proofing-tool',
    '/free-tools/image-reviewer',
  ],
  '/platform/annotate-pdf': [
    '/free-tools/pdf-annotator',
    '/free-tools/pdf-reviewer',
    '/free-tools/image-annotator',
    '/free-tools/video-annotator',
  ],
  '/platform/highlight-pdf': [
    '/free-tools/pdf-annotator',
    '/free-tools/pdf-reviewer',
    '/free-tools/image-reviewer',
    '/free-tools/image-annotator',
  ],
  '/platform/draw-on-pdf-document': [
    '/free-tools/pdf-annotator',
    '/free-tools/pdf-reviewer',
    '/free-tools/image-annotator',
    '/free-tools/video-annotator',
  ],
  '/platform/add-comments-to-pdf': [
    '/free-tools/pdf-reviewer',
    '/free-tools/pdf-annotator',
    '/free-tools/video-feedback-tool',
    '/free-tools/image-reviewer',
  ],
  '/platform/pdf-version-control': [
    '/free-tools/pdf-reviewer',
    '/free-tools/video-manager',
    '/free-tools/pdf-annotator',
    '/free-tools/video-reviewer',
  ],
  '/platform/document-version-control': [
    '/free-tools/pdf-reviewer',
    '/free-tools/video-manager',
    '/free-tools/pdf-annotator',
    '/free-tools/video-reviewer',
  ],
  '/platform/pdf-to-link': [
    '/free-tools/pdf-reviewer',
    '/free-tools/pdf-annotator',
    '/free-tools/video-feedback-tool',
    '/free-tools/image-reviewer',
  ],
  '/platform/compare-pdf-files': [
    '/free-tools/pdf-reviewer',
    '/free-tools/pdf-annotator',
    '/free-tools/video-reviewer',
    '/free-tools/video-proofing-tool',
  ],
  '/platform/compare-documents-online': [
    '/free-tools/pdf-reviewer',
    '/free-tools/pdf-annotator',
    '/free-tools/image-reviewer',
    '/free-tools/image-annotator',
  ],

  // Image / picture cluster
  '/platform/annotate-image': [
    '/free-tools/image-annotator',
    '/free-tools/image-reviewer',
    '/free-tools/pdf-annotator',
    '/free-tools/video-annotator',
  ],
  '/platform/draw-on-image': [
    '/free-tools/image-annotator',
    '/free-tools/image-reviewer',
    '/free-tools/pdf-annotator',
    '/free-tools/video-annotator',
  ],
  '/platform/draw-on-documents': [
    '/free-tools/pdf-annotator',
    '/free-tools/image-annotator',
    '/free-tools/pdf-reviewer',
    '/free-tools/image-reviewer',
  ],
  '/platform/image-to-link': [
    '/free-tools/image-reviewer',
    '/free-tools/image-annotator',
    '/free-tools/pdf-reviewer',
    '/free-tools/video-feedback-tool',
  ],
  '/platform/picture-into-url': [
    '/free-tools/image-reviewer',
    '/free-tools/image-annotator',
    '/free-tools/pdf-reviewer',
    '/free-tools/video-feedback-tool',
  ],
  '/platform/annotate-document': [
    '/free-tools/pdf-annotator',
    '/free-tools/image-annotator',
    '/free-tools/pdf-reviewer',
    '/free-tools/image-reviewer',
  ],

  // Production / workspace
  '/platform/creative-workspace': [
    '/free-tools/video-manager',
    '/free-tools/video-reviewer',
    '/free-tools/data-transfer-calculator',
    '/free-tools/cost-calculator',
  ],
  '/platform/project-orchestration': [
    '/free-tools/video-manager',
    '/free-tools/video-reviewer',
    '/free-tools/cost-calculator',
    '/free-tools/data-transfer-calculator',
  ],
  '/platform/secure-asset-storage': [
    '/free-tools/video-manager',
    '/free-tools/data-transfer-calculator',
    '/free-tools/pdf-reviewer',
    '/free-tools/video-reviewer',
  ],
  '/platform/integrations': [
    '/free-tools/video-manager',
    '/free-tools/video-reviewer',
    '/free-tools/data-transfer-calculator',
    '/free-tools/pdf-reviewer',
  ],
  '/platform/review-approval': [
    '/free-tools/video-reviewer',
    '/free-tools/video-feedback-tool',
    '/free-tools/video-proofing-tool',
    '/free-tools/pdf-reviewer',
  ],
};

const hrefToTool = new Map<string, FreeTool>(FREE_TOOLS.map((t) => [t.href, t]));

/**
 * Returns 4 free tools relevant to the given platform path for use in
 * MoreFreeToolsSection. Falls back to first 4 from FREE_TOOLS if path unknown.
 */
export function getFreeToolsForPlatform(path: string): FreeTool[] {
  const hrefs = PLATFORM_FREE_TOOL_HREFS[path];
  if (!hrefs || hrefs.length === 0) {
    return FREE_TOOLS.slice(0, 4);
  }
  const tools: FreeTool[] = [];
  for (const href of hrefs) {
    const tool = hrefToTool.get(href);
    if (tool && !tools.some((t) => t.href === href)) {
      tools.push(tool);
    }
  }
  return tools.length >= 4 ? tools.slice(0, 4) : [...tools, ...FREE_TOOLS.filter((t) => !tools.some((x) => x.href === t.href))].slice(0, 4);
}
