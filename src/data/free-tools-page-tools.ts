import { FREE_TOOLS, FreeTool } from './free-tools';

/**
 * Free-tools path -> 4 relevant free tool hrefs (excluding current page).
 * Used to show topic-relevant "More Free Tools" and vary internal links across free-tools pages.
 */
const FREE_TOOL_PAGE_HREFS: Record<string, string[]> = {
  // Video feedback / review / comparer / link
  '/free-tools/video-feedback-tool': [
    '/free-tools/video-reviewer',
    '/free-tools/video-comparer',
    '/free-tools/video-annotator',
    '/free-tools/video-frame-extractor',
  ],
  '/free-tools/video-reviewer': [
    '/free-tools/video-feedback-tool',
    '/free-tools/video-comparer',
    '/free-tools/video-annotator',
    '/free-tools/video-proofing-tool',
  ],
  '/free-tools/video-comparer': [
    '/free-tools/video-reviewer',
    '/free-tools/video-feedback-tool',
    '/free-tools/video-link-maker',
    '/free-tools/video-annotator',
  ],
  '/free-tools/video-link-maker': [
    '/free-tools/video-feedback-tool',
    '/free-tools/video-reviewer',
    '/free-tools/video-comparer',
    '/free-tools/video-manager',
  ],
  '/free-tools/video-manager': [
    '/free-tools/video-reviewer',
    '/free-tools/video-feedback-tool',
    '/free-tools/video-proofing-tool',
    '/free-tools/video-frame-extractor',
  ],
  '/free-tools/video-proofing-tool': [
    '/free-tools/video-reviewer',
    '/free-tools/video-feedback-tool',
    '/free-tools/video-annotator',
    '/free-tools/video-comparer',
  ],
  '/free-tools/video-annotator': [
    '/free-tools/video-feedback-tool',
    '/free-tools/video-reviewer',
    '/free-tools/video-frame-extractor',
    '/free-tools/video-proofing-tool',
  ],
  '/free-tools/video-frame-extractor': [
    '/free-tools/video-annotator',
    '/free-tools/video-reviewer',
    '/free-tools/video-feedback-tool',
    '/free-tools/resize-video',
  ],
  '/free-tools/resize-video': [
    '/free-tools/video-frame-extractor',
    '/free-tools/video-reviewer',
    '/free-tools/video-feedback-tool',
    '/free-tools/youtube-banner-resizer',
  ],

  // PDF / document
  '/free-tools/pdf-reviewer': [
    '/free-tools/pdf-annotator',
    '/free-tools/pdf-highlighter',
    '/free-tools/pdf-comparer',
    '/free-tools/document-annotator',
  ],
  '/free-tools/pdf-annotator': [
    '/free-tools/pdf-reviewer',
    '/free-tools/pdf-highlighter',
    '/free-tools/document-annotator',
    '/free-tools/pdf-comparer',
  ],
  '/free-tools/pdf-highlighter': [
    '/free-tools/pdf-annotator',
    '/free-tools/pdf-reviewer',
    '/free-tools/document-annotator',
    '/free-tools/pdf-link-generator',
  ],
  '/free-tools/pdf-comparer': [
    '/free-tools/pdf-reviewer',
    '/free-tools/pdf-annotator',
    '/free-tools/document-comparer',
    '/free-tools/pdf-highlighter',
  ],
  '/free-tools/pdf-link-generator': [
    '/free-tools/pdf-reviewer',
    '/free-tools/pdf-annotator',
    '/free-tools/document-annotator',
    '/free-tools/video-link-maker',
  ],
  '/free-tools/document-annotator': [
    '/free-tools/pdf-annotator',
    '/free-tools/pdf-reviewer',
    '/free-tools/document-comparer',
    '/free-tools/pdf-highlighter',
  ],
  '/free-tools/document-comparer': [
    '/free-tools/pdf-comparer',
    '/free-tools/document-annotator',
    '/free-tools/pdf-reviewer',
    '/free-tools/video-comparer',
  ],

  // Image
  '/free-tools/image-reviewer': [
    '/free-tools/image-annotator',
    '/free-tools/image-comparer',
    '/free-tools/pdf-reviewer',
    '/free-tools/video-reviewer',
  ],
  '/free-tools/image-annotator': [
    '/free-tools/image-reviewer',
    '/free-tools/image-comparer',
    '/free-tools/pdf-annotator',
    '/free-tools/video-annotator',
  ],
  '/free-tools/image-comparer': [
    '/free-tools/image-reviewer',
    '/free-tools/image-annotator',
    '/free-tools/video-comparer',
    '/free-tools/pdf-comparer',
  ],
  '/free-tools/image-url-maker': [
    '/free-tools/image-reviewer',
    '/free-tools/image-annotator',
    '/free-tools/pdf-link-generator',
    '/free-tools/video-link-maker',
  ],
  '/free-tools/photo-url-generator': [
    '/free-tools/image-url-maker',
    '/free-tools/image-reviewer',
    '/free-tools/image-annotator',
    '/free-tools/pdf-link-generator',
  ],

  // Calculators / utility
  '/free-tools/data-transfer-calculator': [
    '/free-tools/cost-calculator',
    '/free-tools/video-manager',
    '/free-tools/video-reviewer',
    '/free-tools/safe-zone-checker',
  ],
  '/free-tools/cost-calculator': [
    '/free-tools/data-transfer-calculator',
    '/free-tools/video-manager',
    '/free-tools/video-reviewer',
    '/free-tools/safe-zone-checker',
  ],

  // YouTube / safe zone (external safe zone checker pages not under /free-tools, so only youtube-banner-resizer here)
  '/free-tools/youtube-banner-resizer': [
    '/safe-zone-checker/youtube-safe-zone-checker',
    '/safe-zone-checker/instagram-safe-zone-checker',
    '/safe-zone-checker/tiktok-safe-zone-checker',
    '/free-tools/resize-video',
  ],
};

const hrefToTool = new Map<string, FreeTool>(FREE_TOOLS.map((t) => [t.href, t]));

/**
 * Returns 4 free tools relevant to the given free-tools page path for use in
 * MoreFreeToolsSection. Excludes the current page. Falls back to first 4 from
 * FREE_TOOLS (excluding path) if path unknown.
 */
export function getFreeToolsForFreeToolPage(path: string): FreeTool[] {
  const hrefs = FREE_TOOL_PAGE_HREFS[path];
  if (!hrefs || hrefs.length === 0) {
    const excluded = FREE_TOOLS.filter((t) => t.href !== path);
    return excluded.slice(0, 4);
  }
  const tools: FreeTool[] = [];
  for (const href of hrefs) {
    const tool = hrefToTool.get(href);
    if (tool && tool.href !== path && !tools.some((t) => t.href === href)) {
      tools.push(tool);
    }
  }
  if (tools.length >= 4) return tools.slice(0, 4);
  const rest = FREE_TOOLS.filter((t) => t.href !== path && !tools.some((x) => x.href === t.href));
  return [...tools, ...rest].slice(0, 4);
}
