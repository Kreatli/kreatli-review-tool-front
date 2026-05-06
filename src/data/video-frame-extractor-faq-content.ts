import type { FAQItem } from '../components/shared/FAQStructuredData';
import { FREE_TOOL_PAGE_ACCOUNT_FAQ } from './marketing-free-tool-access';

export type VideoFrameExtractorFaqDef = {
  key: string;
  title: string;
  /** Visible + JSON-LD (plain text) */
  answer: string;
};

export const VIDEO_FRAME_EXTRACTOR_FAQ_DEFS: VideoFrameExtractorFaqDef[] = [
  {
    key: 'what-is-frame-extractor',
    title: 'What is a video frame extractor?',
    answer:
      'A video frame extractor lets you capture a still image (a single frame) from a video at a specific moment in time. It’s commonly used to create thumbnails, posters, storyboards, or to share an exact visual moment for feedback and review.',
  },
  {
    key: 'account-access',
    title: FREE_TOOL_PAGE_ACCOUNT_FAQ.question,
    answer: FREE_TOOL_PAGE_ACCOUNT_FAQ.answer,
  },
  {
    key: 'extract-frames-from-video',
    title: 'How do I extract frames from a video?',
    answer:
      'Upload your video, scrub to the moment you need, and export that frame as a PNG or JPG (or capture multiple frames and download a ZIP). In Kreatli you sign in to use the tool; start a trial if your subscription isn’t active.',
  },
  {
    key: 'frame-extractor-vs-screenshot',
    title: 'Is a frame extractor better than a screenshot for video stills?',
    answer:
      'Yes—an extractor grabs the decoded frame from the video file, avoiding OS scaling and player chrome. That gives you consistent pixels for thumbnails, QC, and reference stills.',
  },
  {
    key: 'download-frame-from-video',
    title: 'Can I download a frame from a video (PNG or JPG)?',
    answer:
      'Yes. Export frames as high-quality PNG (recommended) or smaller JPG files. You can also batch-export selected frames in a ZIP.',
  },
  {
    key: 'is-free',
    title: 'Is this Video Frame Extractor free to try?',
    answer:
      'You can start with Kreatli’s trial flow: sign in, then start a trial or activate a plan if prompted. The page is positioned as a free frame extractor experience within that signup path.',
  },
  {
    key: 'privacy',
    title: 'Is my video uploaded to a server?',
    answer:
      'No. Frame capture runs locally in your browser as part of this tool’s workflow. Your file stays on your device. For secure cloud sharing, versioning, and approvals, explore Kreatli’s secure asset storage and review tools after signup.',
  },
  {
    key: 'supported-formats',
    title: 'What video formats does it support?',
    answer:
      'The tool supports MP4, MOV, and WebM files. Playback support can vary by browser and codec—if a video won’t load, try exporting as H.264 MP4 from your editor or testing in another modern browser.',
  },
  {
    key: 'export-formats',
    title: 'Can I export frames as PNG or JPG?',
    answer:
      'Yes. Export as PNG for best quality (recommended) or JPG for smaller files.',
  },
  {
    key: 'download-zip',
    title: 'Can I download multiple frames at once?',
    answer:
      'Yes. You can download your captured frames as a ZIP, including either all frames or only selected frames.',
  },
  {
    key: 'best-thumbnail',
    title: 'How do I choose the best frame for a thumbnail?',
    answer:
      'Capture a few frames around your target moment, then pick the clearest one—sharp focus, minimal motion blur, readable text, and a strong facial expression if applicable. Export a small set as a ZIP to share for quick feedback.',
  },
  {
    key: 'mobile',
    title: 'Does it work on mobile?',
    answer:
      'It can work on modern mobile browsers, but large video files may be slower to decode and scrub on mobile devices. For best performance, use a desktop browser when extracting many frames.',
  },
];

export function getVideoFrameExtractorStructuredFaqs(): FAQItem[] {
  return VIDEO_FRAME_EXTRACTOR_FAQ_DEFS.map(({ title, answer }) => ({ question: title, answer }));
}
