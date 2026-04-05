import { IconType } from '../components/various/Icon/Icon';

/** Filter tags for the /free-tools page. Tools with no tags only appear when "All" is selected. */
export type FreeToolFilterTag =
  | 'Video'
  | 'PDF & documents'
  | 'Images'
  | 'Safe zones & resize'
  | 'Calculators & utilities'
  | 'Share & links';

/** Filter options for the free-tools page (id and label for UI) */
export const FREE_TOOLS_FILTER_OPTIONS: { id: FreeToolFilterTag; label: string }[] = [
  { id: 'Video', label: 'Video' },
  { id: 'PDF & documents', label: 'PDF & documents' },
  { id: 'Images', label: 'Images' },
  { id: 'Safe zones & resize', label: 'Safe zones & resize' },
  { id: 'Calculators & utilities', label: 'Calculators & utilities' },
  { id: 'Share & links', label: 'Share & links' },
];

export interface FreeTool {
  title: string;
  description: string;
  href: string;
  icon: IconType;
  buttonText?: string;
  ariaLabel?: string;
  /** Filter tags for /free-tools page; tools with no tags only show when "All" is selected */
  tags?: FreeToolFilterTag[];
}

export const FREE_TOOLS: FreeTool[] = [
  {
    title: 'Video Feedback Tool',
    description:
      'Give frame-accurate feedback on videos with comments, annotations, and markup. Share review links with clients; recipients do not need a Kreatli account.',
    href: '/free-tools/video-feedback-tool',
    icon: 'play',
    buttonText: 'Try Now',
    ariaLabel: 'Try Video Feedback Tool',
    tags: ['Video'],
  },
  {
    title: 'Video Reviewer',
    description:
      'Review videos online with frame-accurate comments, visual annotations, and approval workflows. Share with clients; recipients do not need a Kreatli account.',
    href: '/free-tools/video-reviewer',
    icon: 'monitorPlay',
    buttonText: 'Try Now',
    ariaLabel: 'Try Video Reviewer',
    tags: ['Video'],
  },
  {
    title: 'Video Comparer',
    description:
      'Compare two video versions side by side with frame-accurate comments and annotations. Share with clients; recipients do not need a Kreatli account.',
    href: '/free-tools/video-comparer',
    icon: 'compare',
    buttonText: 'Try Now',
    ariaLabel: 'Try Video Comparer',
    tags: ['Video'],
  },
  {
    title: 'Video Link Maker',
    description:
      'Create secure, shareable video review links in seconds. Recipients watch, comment, and approve without a Kreatli account.',
    href: '/free-tools/video-link-maker',
    icon: 'link',
    buttonText: 'Try Now',
    ariaLabel: 'Try Video Link Maker',
    tags: ['Video', 'Share & links'],
  },
  {
    title: 'PDF Reviewer',
    description:
      'Review PDFs online with location-pinned comments, annotations, and approvals. Share with clients; recipients do not need a Kreatli account.',
    href: '/free-tools/pdf-reviewer',
    icon: 'filePdf',
    buttonText: 'Try Now',
    ariaLabel: 'Try PDF Reviewer',
    tags: ['PDF & documents'],
  },
  {
    title: 'PDF Annotator',
    description:
      'Add location-pinned comments, highlights, drawings, and markup to PDFs. Share with clients; recipients do not need a Kreatli account.',
    href: '/free-tools/pdf-annotator',
    icon: 'paint',
    buttonText: 'Try Now',
    ariaLabel: 'Try PDF Annotator',
    tags: ['PDF & documents'],
  },
  {
    title: 'PDF Highlighter',
    description:
      'Highlight PDF text and regions with location-pinned markup. Share with clients; recipients do not need a Kreatli account.',
    href: '/free-tools/pdf-highlighter',
    icon: 'edit',
    buttonText: 'Try Now',
    ariaLabel: 'Try PDF Highlighter',
    tags: ['PDF & documents'],
  },
  {
    title: 'PDF Comparer',
    description:
      'Compare two PDF versions side by side with comments and annotations. Share with clients; recipients do not need a Kreatli account.',
    href: '/free-tools/pdf-comparer',
    icon: 'versions',
    buttonText: 'Try Now',
    ariaLabel: 'Try PDF Comparer',
    tags: ['PDF & documents'],
  },
  {
    title: 'PDF Link Generator',
    description:
      'Turn your PDF into a shareable link. Create secure review links in seconds—recipients do not need a Kreatli account.',
    href: '/free-tools/pdf-link-generator',
    icon: 'share',
    buttonText: 'Try Now',
    ariaLabel: 'Try PDF Link Generator',
    tags: ['PDF & documents', 'Share & links'],
  },
  {
    title: 'Document Annotator',
    description:
      'Add location-pinned comments, highlights, drawings, and markup to documents (e.g. PDFs). Share with clients; recipients do not need a Kreatli account.',
    href: '/free-tools/document-annotator',
    icon: 'fileDoc',
    buttonText: 'Try Now',
    ariaLabel: 'Try Document Annotator',
    tags: ['PDF & documents'],
  },
  {
    title: 'Document Comparer',
    description:
      'Compare two document versions side by side with comments and annotations. Share with clients; recipients do not need a Kreatli account.',
    href: '/free-tools/document-comparer',
    icon: 'grid',
    buttonText: 'Try Now',
    ariaLabel: 'Try Document Comparer',
    tags: ['PDF & documents'],
  },
  {
    title: 'Image Reviewer',
    description:
      'Review images online with location-pinned comments, annotations, and approvals. Share with clients; recipients do not need a Kreatli account.',
    href: '/free-tools/image-reviewer',
    icon: 'panorama',
    buttonText: 'Try Now',
    ariaLabel: 'Try Image Reviewer',
    tags: ['Images'],
  },
  {
    title: 'Image Annotator',
    description:
      'Add location-pinned comments, highlights, drawings, and markup to images. Share with clients; recipients do not need a Kreatli account.',
    href: '/free-tools/image-annotator',
    icon: 'addImage',
    buttonText: 'Try Now',
    ariaLabel: 'Try Image Annotator',
    tags: ['Images'],
  },
  {
    title: 'Image Comparer',
    description:
      'Compare two image versions side by side with comments and annotations. Share with clients; recipients do not need a Kreatli account.',
    href: '/free-tools/image-comparer',
    icon: 'eye',
    buttonText: 'Try Now',
    ariaLabel: 'Try Image Comparer',
    tags: ['Images'],
  },
  {
    title: 'Image URL Maker',
    description:
      'Turn your image into a shareable URL. Create secure review links in seconds—recipients do not need a Kreatli account.',
    href: '/free-tools/image-url-maker',
    icon: 'send',
    buttonText: 'Try Now',
    ariaLabel: 'Try Image URL Maker',
    tags: ['Images', 'Share & links'],
  },
  {
    title: 'Photo URL Generator',
    description:
      'Generate a shareable URL for your photo. Create secure review links in seconds—recipients do not need a Kreatli account.',
    href: '/free-tools/photo-url-generator',
    icon: 'mail',
    buttonText: 'Try Now',
    ariaLabel: 'Try Photo URL Generator',
    tags: ['Images', 'Share & links'],
  },
  {
    title: 'Video Manager',
    description:
      'Organize, store, and track video assets with version control and client share links. Manage feedback and approvals in one workspace.',
    href: '/free-tools/video-manager',
    icon: 'folder',
    buttonText: 'Try Now',
    ariaLabel: 'Try Video Manager',
    tags: ['Video'],
  },
  {
    title: 'Video Proofing Tool',
    description:
      'Proof videos with frame-accurate comments, annotations, and approvals. Share proofing links; recipients do not need a Kreatli account.',
    href: '/free-tools/video-proofing-tool',
    icon: 'checkCircle',
    buttonText: 'Try Now',
    ariaLabel: 'Try Video Proofing Tool',
    tags: ['Video'],
  },
  {
    title: 'Video Annotator',
    description:
      'Add frame-accurate comments, drawings, and markup to video. Pin feedback to exact timestamps and share with clients; recipients do not need a Kreatli account.',
    href: '/free-tools/video-annotator',
    icon: 'chat',
    buttonText: 'Try Now',
    ariaLabel: 'Try Video Annotator',
    tags: ['Video'],
  },
  {
    title: 'Video Frame Extractor',
    description:
      'Scrub through a video, capture stills as PNG/JPG in your browser—no upload, no watermark. Use without signing in; if you are signed in without an active trial or plan, start a trial or choose a plan to continue.',
    href: '/free-tools/video-frame-extractor',
    icon: 'filePng',
    buttonText: 'Try Now',
    ariaLabel: 'Extract and download video frames',
    tags: ['Video'],
  },
  {
    title: 'Resize Video',
    description:
      'Resize video to custom or preset dimensions in your browser—no upload, processing runs locally. Use without signing in; if you are signed in without an active trial or plan, start a trial or choose a plan to continue.',
    href: '/free-tools/resize-video',
    icon: 'fullscreen',
    buttonText: 'Try Now',
    ariaLabel: 'Resize video',
    tags: ['Video'],
  },
  {
    title: 'Data Transfer Calculator',
    description:
      'Calculate how long it takes to upload or download large files. Perfect for video editors and post-production teams.',
    href: '/free-tools/data-transfer-calculator',
    icon: 'upload',
    buttonText: 'Try Now',
    ariaLabel: 'Calculate data transfer time',
    tags: ['Calculators & utilities'],
  },
  {
    title: 'Software Cost Calculator',
    description:
      "Calculate how much you're spending on multiple creative tools and see how much you could save by consolidating with Kreatli.",
    href: '/free-tools/cost-calculator',
    icon: 'dollar',
    buttonText: 'Try Now',
    ariaLabel: 'Calculate software cost savings',
    tags: ['Calculators & utilities'],
  },
  {
    title: 'Safe Zone Checker',
    description:
      'Preview where UI overlays appear on Instagram Reels, TikTok videos, and YouTube Shorts to ensure your content stays visible.',
    href: '/safe-zone-checker',
    icon: 'shield',
    buttonText: 'Try Now',
    ariaLabel: 'Try Safe Zone Checker',
    tags: ['Safe zones & resize'],
  },
  {
    title: 'Instagram Reels Safe Zone Checker',
    description:
      'Check your Instagram Reels safe zone before posting. Preview where profile picture, username, like button, comment button, and music display appear.',
    href: '/safe-zone-checker/instagram-safe-zone-checker',
    icon: 'instagram',
    buttonText: 'Try Now',
    ariaLabel: 'Try Instagram Reels Safe Zone Checker',
    tags: ['Safe zones & resize'],
  },
  {
    title: 'TikTok Safe Zone Checker',
    description:
      'Check your TikTok video safe zones before posting. Preview where profile picture, username, music track, and engagement buttons appear.',
    href: '/safe-zone-checker/tiktok-safe-zone-checker',
    icon: 'tiktok',
    buttonText: 'Try Now',
    ariaLabel: 'Try TikTok Safe Zone Checker',
    tags: ['Safe zones & resize'],
  },
  {
    title: 'YouTube Shorts Safe Zone Checker',
    description:
      'Test your YouTube Shorts video layout before publishing. Preview where channel name, subscribe button, like button, comments, and video controls appear.',
    href: '/safe-zone-checker/youtube-safe-zone-checker',
    icon: 'youtube',
    buttonText: 'Try Now',
    ariaLabel: 'Try YouTube Shorts Safe Zone Checker',
    tags: ['Safe zones & resize'],
  },
  {
    title: 'YouTube Banner Resizer',
    description:
      'Resize your YouTube channel art to the perfect dimensions. Preview safe areas for mobile, desktop, tablet, and TV devices.',
    href: '/free-tools/youtube-banner-resizer',
    icon: 'mobile',
    buttonText: 'Try Now',
    ariaLabel: 'Resize YouTube banner',
    tags: ['Safe zones & resize'],
  },
  {
    title: 'File to Link Converter',
    description:
      'Turn files into shareable links in seconds. Create clean URLs you can send to clients and teammates for fast, frictionless review.',
    href: '/free-tools/file-to-link-converter',
    icon: 'link',
    buttonText: 'Try Now',
    ariaLabel: 'Try File to Link Converter',
    tags: ['Share & links'],
  },
];
