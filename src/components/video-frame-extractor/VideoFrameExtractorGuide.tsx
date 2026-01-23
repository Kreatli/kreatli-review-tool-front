import { Button, Card, CardBody, Image } from '@heroui/react';
import NextLink from 'next/link';

import { Icon, IconType } from '../various/Icon';

export const VideoFrameExtractorGuide = () => {
  const workflowSteps: Array<{
    step: number;
    title: string;
    description: string;
    icon: string;
    image: string | null;
    altText?: string;
    imageVariant?: 'default' | 'contain';
    imageClassName?: string;
  }> = [
    {
      step: 1,
      title: 'Upload a Video File (MP4, MOV, or WebM)',
      description:
        'Choose a video from your device and load it in the tool. Everything happens in your browser, so your file stays on your machine while you work.',
      icon: 'upload',
      image: null, // No screenshot needed for this step
    },
    {
      step: 2,
      title: 'Scrub to the Exact Moment You Need',
      description:
        'Use the timeline scrubber or play controls to find the frame you want—great for selecting clean thumbnail moments, design references, or specific scenes for review.',
      icon: 'time',
      image: '/video-frame-extractor-guide/scrub-to-moment.webp',
      altText: 'Video frame extractor timeline scrubber to pick an exact moment',
    },
    {
      step: 3,
      title: 'Capture One or Multiple Frames',
      description:
        'When you see the right moment, click “Capture this frame”. Keep capturing to build a small gallery of options you can preview and refine.',
      icon: 'play',
      image: '/video-frame-extractor-guide/capture-frame.webp',
      altText: 'Capture frame button and captured frames gallery in the video frame extractor',
    },
    {
      step: 4,
      title: 'Export as PNG/JPG (Single or ZIP)',
      description:
        'Download a single frame, or export multiple frames at once as a ZIP. Use PNG for best quality (recommended) or JPG for smaller file sizes.',
      icon: 'download',
      image: '/video-frame-extractor-guide/export-frames.webp',
      altText: 'Export frames as PNG or JPG, single download or ZIP export',
      imageClassName: 'max-w-4xl',
    },
    {
      step: 5,
      title: 'Share Frames for Feedback on Kreatli',
      description:
        'If you’re collaborating, upload selected frames to Kreatli to collect comments, approvals, and decisions in one place—especially useful for picking the final thumbnail or key visual.',
      icon: 'paint',
      image: '/video-frame-extractor-guide/upload-kreatli.webp',
      imageVariant: 'contain',
      altText: 'Upload extracted frames to Kreatli for review and feedback',
      imageClassName: 'max-w-4xl',
    },
  ];

  return (
    <div>
      {/* How to Use Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">
              How to Use the Video Frame Extractor
            </h2>
            <p className="mx-auto max-w-3xl text-base text-foreground-500">
              Extract still images from a video in minutes—perfect for thumbnails, storyboards, creative reviews, and
              documenting exact moments.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {workflowSteps.map((item) => (
              <Card key={item.step} className="scroll-mt-36">
                <CardBody className="p-6 lg:p-8">
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                      <div className="flex items-start gap-4 lg:w-96 lg:shrink-0">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <Icon icon={item.icon as IconType} size={24} className="text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="mb-1.5 text-sm font-medium text-primary">Step {item.step}</div>
                          <h3 className="font-sans text-xl font-bold leading-tight">{item.title}</h3>
                        </div>
                      </div>
                      <div className="flex-1 border-foreground-200 lg:border-l lg:pl-8">
                        <p className="text-base leading-relaxed text-foreground-500">{item.description}</p>
                        {item.step === 5 && (
                          <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:items-start">
                            <Button as={NextLink} href="/sign-up" size="lg" className="bg-foreground text-content1">
                              Start for Free
                            </Button>
                            <Button
                              as="a"
                              href="https://calendar.app.google/NXbAeTAUwaBGh5x49"
                              target="_blank"
                              rel="noopener noreferrer"
                              size="lg"
                              variant="bordered"
                            >
                              Book a Demo
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                    {item.image && (
                      <div className="mt-6 flex justify-center lg:mt-8">
                        <div
                          className={item.imageVariant === 'contain' ? 'relative w-full max-w-4xl' : 'relative max-w-full'}
                        >
                          <Image
                            src={item.image}
                            alt={item.altText || `${item.title} - Video frame extractor tool screenshot`}
                            loading="lazy"
                            removeWrapper
                            className={[
                              `mx-auto h-auto w-full ${item.imageClassName || 'max-w-xl'} rounded-lg border border-foreground-200 shadow-lg`,
                              item.imageVariant === 'contain' ? 'object-contain' : '',
                            ].join(' ')}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Video Frame Extraction Explained */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">
              Video Frame Extraction Explained
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-foreground-500">
              A video frame extractor helps you turn a specific moment in a video into a still image you can download.
              Use it for thumbnails, keyframes, storyboards, or sharing a precise moment with teammates and clients.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Icon icon="file" size={24} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-xl font-bold">Common Use Cases</h3>
                </div>
                <ul className="ml-6 list-disc space-y-2 text-foreground-500">
                  <li>
                    <strong className="text-foreground">Thumbnails & posters:</strong> Find a crisp, readable moment.
                  </li>
                  <li>
                    <strong className="text-foreground">Storyboards:</strong> Capture key beats for a scene breakdown.
                  </li>
                  <li>
                    <strong className="text-foreground">Creative review:</strong> Share a specific frame for feedback.
                  </li>
                  <li>
                    <strong className="text-foreground">QA & bug reports:</strong> Document a glitch at an exact timecode.
                  </li>
                </ul>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-success/10 p-3">
                    <Icon icon="checkCircle" size={24} className="text-success" />
                  </div>
                  <h3 className="font-sans text-xl font-bold">PNG vs JPG</h3>
                </div>
                <div className="space-y-3 text-foreground-500">
                  <p>
                    <strong className="text-foreground">PNG</strong> is best when you want maximum quality and sharp text
                    edges (recommended for thumbnails and UI captures).
                  </p>
                  <p>
                    <strong className="text-foreground">JPG</strong> creates smaller files, which is helpful when you’re
                    exporting lots of frames or sharing quickly.
                  </p>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-3">
                    <Icon icon="time" size={24} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-xl font-bold">Tips for Picking the Best Frame</h3>
                </div>
                <ul className="ml-6 list-disc space-y-2 text-foreground-500">
                  <li>Pause on a frame with minimal motion blur (especially on fast cuts).</li>
                  <li>Look for clear faces, readable text, and strong contrast.</li>
                  <li>Capture a few nearby moments and export as a ZIP to compare options quickly.</li>
                </ul>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-3">
                    <Icon icon="shield" size={24} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-xl font-bold">Privacy & Security</h3>
                </div>
                <div className="space-y-3 text-foreground-500">
                  <p>
                    The extractor runs locally in your browser. Your video isn’t uploaded to a server as part of the
                    frame capture workflow.
                  </p>
                  <p>
                    For structured review, versioning, and secure sharing, explore{' '}
                    <NextLink href="/platform/secure-asset-storage" className="text-primary underline underline-offset-2">
                      secure asset storage
                    </NextLink>{' '}
                    in Kreatli.
                  </p>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Read Complete Guide Section */}
      <section className="relative overflow-hidden bg-foreground-50 px-6 py-12">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Read Our Complete Guide</h2>
          <p className="mx-auto mb-6 max-w-2xl text-lg text-foreground-500">
            Learn best practices for choosing thumbnail frames, exporting stills for design, and sharing decisions with
            clients and stakeholders.
          </p>
          <Button
            as="a"
            href="https://kreatli.com/guides/video-frame-extractor-guide"
            size="lg"
            className="bg-foreground text-content1"
          >
            Read Complete Guide
          </Button>
        </div>
      </section>
    </div>
  );
};

