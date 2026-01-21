import { Accordion, AccordionItem } from '@heroui/react';
import NextLink from 'next/link';
import { ReactNode } from 'react';

export const VideoFrameExtractorFAQ = () => {
  const faqItems: Array<{
    key: string;
    title: string;
    content: ReactNode;
  }> = [
    {
      key: 'what-is-frame-extractor',
      title: 'What is a video frame extractor?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            A video frame extractor lets you capture a still image (a single frame) from a video at a specific moment
            in time. It’s commonly used to create thumbnails, posters, storyboards, or to share an exact visual moment
            for feedback and review.
          </p>
        </div>
      ),
    },
    {
      key: 'is-free',
      title: 'Is this Video Frame Extractor free?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            Yes. This tool is <strong>free to use</strong>—no sign-up required.
          </p>
        </div>
      ),
    },
    {
      key: 'privacy',
      title: 'Is my video uploaded to a server?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            No. Frame capture runs locally in your browser as part of this tool’s workflow. Your file stays on your
            device.
          </p>
          <p>
            If you need secure cloud sharing, versioning, and approvals, check out{' '}
            <NextLink href="/platform/secure-asset-storage" className="text-primary underline underline-offset-2">
              secure asset storage
            </NextLink>{' '}
            and review workflows in Kreatli.
          </p>
        </div>
      ),
    },
    {
      key: 'supported-formats',
      title: 'What video formats does it support?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            The tool supports <strong>MP4</strong>, <strong>MOV</strong>, and <strong>WebM</strong> files.
          </p>
          <p>
            Note: playback support can vary by browser and codec. If a video won’t load, try exporting as H.264 MP4 from
            your editor or testing in another modern browser.
          </p>
        </div>
      ),
    },
    {
      key: 'export-formats',
      title: 'Can I export frames as PNG or JPG?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            Yes. Export as <strong>PNG</strong> for best quality (recommended) or <strong>JPG</strong> for smaller files.
          </p>
        </div>
      ),
    },
    {
      key: 'download-zip',
      title: 'Can I download multiple frames at once?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            Yes. You can download your captured frames as a <strong>ZIP</strong>, including either all frames or only
            selected frames.
          </p>
        </div>
      ),
    },
    {
      key: 'best-thumbnail',
      title: 'How do I choose the best frame for a thumbnail?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            Capture a few frames around your target moment, then pick the clearest one—look for sharp focus, minimal
            motion blur, readable text, and a strong facial expression if applicable.
          </p>
          <p>
            A practical workflow is to export a small set as a ZIP and share it for quick feedback with your team or
            client.
          </p>
        </div>
      ),
    },
    {
      key: 'mobile',
      title: 'Does it work on mobile?',
      content: (
        <div className="space-y-3 text-base text-foreground-500">
          <p>
            It can work on modern mobile browsers, but large video files may be slower to decode and scrub on mobile
            devices. For best performance, use a desktop browser when extracting many frames.
          </p>
        </div>
      ),
    },
  ];

  return (
    <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h2 className="mb-4 font-sans text-2xl font-bold sm:text-4xl">Frequently Asked Questions</h2>
          <p className="mx-auto max-w-2xl text-foreground-500">
            Common questions about extracting still frames from video, export formats, and privacy.
          </p>
        </div>

        <Accordion variant="splitted">
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

