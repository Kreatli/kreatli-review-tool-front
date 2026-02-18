/* eslint-disable max-len */
import { Accordion, AccordionItem } from '@heroui/react';
import NextLink from 'next/link';
import { ReactNode } from 'react';

export const RESIZE_VIDEO_FAQS: Array<{ question: string; answer: string }> = [
  {
    question: 'What is a video resizer?',
    answer:
      'A video resizer changes the resolution (width and height) of a video. You can use preset dimensions for social and web formats—like 1920×1080 for landscape or 1080×1920 for Reels—or enter custom dimensions. The tool processes the video in your browser so your file stays on your device.',
  },
  {
    question: 'Is this Resize Video tool free?',
    answer: 'Yes. This tool is free to use—no sign-up required.',
  },
  {
    question: 'Is my video uploaded to a server?',
    answer:
      'No. Resizing runs locally in your browser. Your video is not uploaded to a server. For secure cloud storage, versioning, and review workflows, you can use Kreatli\'s secure asset storage and review features.',
  },
  {
    question: 'What video formats are supported?',
    answer:
      'The tool accepts common video files including MP4, MOV, and WebM. For export you can choose MP4, MOV, or WebM (VP9/VP8). MP4 and MOV are processed with in-browser FFmpeg; WebM uses canvas recording. Playback and encoding support can vary by browser and codec.',
  },
  {
    question: 'What are presets vs custom size?',
    answer:
      'Presets are predefined dimensions for common uses: Landscape (1920×1080), Square (1080×1080), Instagram Reel, TikTok, YouTube, LinkedIn, and more. Custom Size lets you enter any width and height. You can lock aspect ratio so the video scales proportionally without letterboxing.',
  },
  {
    question: 'What is the difference between WebM and MP4/MOV?',
    answer:
      'MP4 and MOV are encoded using FFmpeg in your browser and offer broad compatibility. WebM (VP9 or VP8) uses the browser\'s canvas recording—it can be faster for large files and produces smaller outputs, and is well suited for web and social. Choose based on where you will use the resized video.',
  },
  {
    question: 'What is the maximum file size?',
    answer:
      'The maximum input file size is 500 MB. For larger files, try shortening the video or using a lower resolution source before resizing.',
  },
  {
    question: 'Does it work on mobile?',
    answer:
      'The tool can run in modern mobile browsers, but encoding and playback are more demanding on mobile. For large files or long videos, a desktop browser (Chrome or Firefox) is recommended for best performance.',
  },
];

function faqContent(index: number, answer: string): ReactNode {
  const isPrivacy = index === 2; // "Is my video uploaded to a server?"
  const isFormats = index === 3; // "What video formats are supported?"
  return (
    <div className="space-y-3 text-base text-foreground-500">
      <p>
        {isPrivacy ? (
          <>
            No. Resizing runs locally in your browser. Your video is not uploaded to a server.
            <br />
            If you need secure cloud sharing, versioning, and approvals, check out{' '}
            <NextLink href="/platform/secure-asset-storage" className="text-primary underline underline-offset-2">
              secure asset storage
            </NextLink>{' '}
            and review workflows in Kreatli.
          </>
        ) : isFormats ? (
          <>
            The tool accepts <strong>MP4</strong>, <strong>MOV</strong>, and <strong>WebM</strong> and can export to
            MP4, MOV, or WebM (VP9/VP8). Playback and encoding support can vary by browser and codec. If a video
            won’t load or encode, try another format or a modern desktop browser.
          </>
        ) : (
          answer
        )}
      </p>
    </div>
  );
}

export const ResizeVideoFAQ = () => {
  const faqItems = RESIZE_VIDEO_FAQS.map((faq, index) => ({
    key: `resize-video-faq-${index}`,
    title: faq.question,
    content: faqContent(index, faq.answer),
  }));

  return (
    <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
          <p className="mx-auto max-w-2xl text-foreground-500">
            Common questions about resizing video, export formats, presets, and privacy.
          </p>
        </div>

        <Accordion variant="splitted" aria-label="Resize video FAQs">
          {faqItems.map((item) => (
            <AccordionItem key={item.key} title={<span className="font-semibold">{item.title}</span>}>
              {item.content}
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mx-auto mt-8 flex max-w-3xl flex-col items-center gap-4 text-center">
          <h3 className="font-sans text-xl font-bold">Still Have Questions?</h3>
          <p className="text-base text-foreground-500">
            If you didn’t find what you were looking for, contact us at{' '}
            <a
              href="mailto:support@kreatli.com"
              className="text-primary underline underline-offset-2"
              aria-label="Contact support via email at support@kreatli.com"
            >
              support@kreatli.com
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
};
