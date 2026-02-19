import { Button, Card, CardBody, Image } from '@heroui/react';
import NextLink from 'next/link';

import { Icon, IconType } from '../various/Icon';

export const ResizeVideoGuide = () => {
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
      title: 'Upload a Video File',
      description:
        'Drop a video from your device or click to browse. The tool accepts MP4, MOV, WebM and other common formats. Everything runs in your browser—your file stays on your machine.',
      icon: 'upload',
      image: null,
    },
    {
      step: 2,
      title: 'Choose a Preset or Custom Size',
      description:
        'Pick a preset like Landscape (1920×1080), Square, Instagram Reel, TikTok, or YouTube, or choose Custom Size and enter width and height. You can lock aspect ratio to scale proportionally.',
      icon: 'fullscreen',
      image: '/resize-video-guide/choose-preset.webp',
      altText: 'Resize video tool presets and custom size options',
      imageClassName: 'max-w-4xl',
    },
    {
      step: 3,
      title: 'Adjust Dimensions and Export Format',
      description:
        'Set your target width and height, then choose export format: MP4 or MOV for best compatibility (via FFmpeg in-browser), or WebM (VP9/VP8) for faster processing and smaller files.',
      icon: 'file',
      image: '/resize-video-guide/adjust-export.webp',
      altText: 'Dimensions and export format options in the resize video tool',
      imageClassName: 'max-w-4xl',
    },
    {
      step: 4,
      title: 'Resize and Download',
      description:
        'Click to resize. The tool resizes the video in your browser and then downloads the resized file. No uploads to a server—resizing is local and private.',
      icon: 'download',
      image: '/resize-video-guide/download.webp',
      altText: 'Download resized video from the resize video tool',
      imageClassName: 'max-w-4xl',
    },
    {
      step: 5,
      title: 'Share for Review on Kreatli',
      description:
        'For team workflows, upload your resized video to Kreatli to collect frame-accurate feedback, approvals, and keep all versions and comments in one place.',
      icon: 'paint',
      image: '/resize-video-guide/upload-kreatli.webp',
      imageVariant: 'contain',
      altText: 'Upload resized video to Kreatli for review and feedback',
      imageClassName: 'max-w-4xl',
    },
  ];

  return (
    <div>
      {/* How to Use Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">How to Use the Resize Video Tool</h2>
            <p className="mx-auto max-w-3xl text-base text-foreground-500">
              Resize video to preset or custom dimensions in minutes—ideal for social formats, web use, and re-exporting
              at a different resolution.
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
                          className={
                            item.imageVariant === 'contain' ? 'relative w-full max-w-4xl' : 'relative max-w-full'
                          }
                        >
                          <Image
                            src={item.image}
                            alt={item.altText || `${item.title} - Resize video tool screenshot`}
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

      {/* Resize Video Explained */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Resize Video Explained</h2>
            <p className="mx-auto max-w-3xl text-lg text-foreground-500">
              A video resizer changes the resolution (width and height) of a video. Use presets for social and web
              formats, or enter custom dimensions. Processing runs locally in your browser.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Icon icon="fullscreen" size={24} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-xl font-bold">Presets & Custom</h3>
                </div>
                <p className="text-foreground-500">
                  Presets cover common sizes: Landscape (1920×1080), Square (1080×1080), Instagram Reel, TikTok,
                  YouTube, and more. Use Custom Size for any width and height; keep aspect ratio locked to avoid
                  letterboxing.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-success/10 p-3">
                    <Icon icon="file" size={24} className="text-success" />
                  </div>
                  <h3 className="font-sans text-xl font-bold">Export Formats</h3>
                </div>
                <p className="text-foreground-500">
                  <strong className="text-foreground">MP4/MOV</strong> use in-browser FFmpeg for best compatibility.{' '}
                  <strong className="text-foreground">WebM (VP9/VP8)</strong> uses canvas recording—faster for large
                  files and good for web and social. Max input size is 500 MB.
                </p>
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
                <p className="text-foreground-500">
                  Resizing runs locally in your browser. Your video is not uploaded to a server. For secure cloud
                  storage, versioning, and review workflows, use{' '}
                  <NextLink href="/platform/secure-asset-storage" className="text-primary underline underline-offset-2">
                    Kreatli secure asset storage
                  </NextLink>
                  .
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-3">
                    <Icon icon="checkCircle" size={24} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-xl font-bold">Use Cases</h3>
                </div>
                <ul className="ml-6 list-disc space-y-2 text-foreground-500">
                  <li>Adapt landscape footage for vertical Reels, TikTok, or Stories.</li>
                  <li>Export at 1080p or 720p for web or email.</li>
                  <li>Create square or custom aspect ratio for social and ads.</li>
                </ul>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};
