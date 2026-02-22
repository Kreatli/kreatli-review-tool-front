import { Button, Card, CardBody, Image } from '@heroui/react';
import NextLink from 'next/link';

import { Icon, IconType } from '../various/Icon';

export const BannerGuide = () => {
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
      title: 'Upload Your Banner Image',
      description:
        "Upload your existing YouTube banner or any image you want to use as channel art. You can start with a fully designed banner, a draft image, or a resized export from Figma, Photoshop, or Canva. The tool accepts common image formats and prepares them for YouTube's banner canvas.",
      icon: 'upload',
      image: null, // No screenshot needed for this step
    },
    {
      step: 2,
      title: 'Apply the YouTube Banner Template',
      description:
        "Once uploaded, the tool automatically applies YouTube's recommended banner dimensions (2560 × 1440px) and displays the exact center safe zone (1546 × 423px) that's visible on all devices. Anything outside the safe zone is clearly marked, so you can adjust with confidence.",
      icon: 'file',
      image: '/youtube-banner-guide/apply-template.webp',
      imageClassName: 'max-w-4xl',
      altText:
        'YouTube banner resizer showing 2560x1440px template with safe zone overlay for mobile, desktop, tablet, and TV devices',
    },
    {
      step: 3,
      title: 'Adjust Key Elements and Preview',
      description:
        'Use the device previews to see how your banner will appear on desktop, mobile, tablet, and TV. Make sure all critical elements like logos, text, and taglines stay within the highlighted safe zone. Decorative visuals can extend beyond it. This step eliminates the trial-and-error usually required when uploading banners directly to YouTube.',
      icon: 'eye',
      image: '/youtube-banner-guide/preview-devices.webp',
      imageClassName: 'max-w-4xl',
      altText:
        'YouTube banner preview showing how channel art appears on desktop, mobile, tablet, and TV with safe zone indicators',
    },
    {
      step: 4,
      title: 'Export and Download Your Banner',
      description:
        "Download the final banner in YouTube's recommended dimensions (2560 × 1440px). Your export preserves safe area alignment so key elements stay visible across desktop, mobile, tablet, and TV.",
      icon: 'checkCircle',
      image: '/youtube-banner-guide/export-banner.webp',
      imageClassName: 'max-w-4xl',
      altText:
        'Export YouTube banner button showing download option for 2560x1440px optimized channel art ready for upload',
    },
    {
      step: 5,
      title: 'Upload to Kreatli for Team Review',
      description:
        'Upload your exported banner to Kreatli to share with your team for collaborative review. Collect feedback, align on safe area placement, and document final approvals—so your channel art stays consistent across updates and stakeholders.',
      icon: 'paint',
      image: '/youtube-banner-guide/upload-kreatli.webp.webp',
      imageVariant: 'contain',
      imageClassName: 'max-w-4xl',
      altText:
        'Kreatli platform interface showing banner upload and team collaboration features for reviewing YouTube channel art',
    },
  ];

  return (
    <div>
      {/* How to Use Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">
              How to Use the YouTube Banner Resizer
            </h2>
            <p className="mx-auto max-w-2xl text-base text-foreground-500">
              Follow this step-by-step process to resize your YouTube banner correctly and avoid cropping issues across
              all devices.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {workflowSteps.map((item) => (
              <Card key={item.step} className="scroll-mt-36">
                <CardBody className="p-6 lg:p-8">
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                      <div className="flex items-start gap-4 lg:w-80 lg:shrink-0">
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
                            alt={item.altText || `${item.title} - YouTube banner resizer tool screenshot`}
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

      {/* YouTube Banner Size & Safe Area Explained Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">
              YouTube Banner Size & Safe Area Explained
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-foreground-500">
              Understanding YouTube banner dimensions and safe areas ensures your channel art looks perfect on all
              devices. This guide covers everything you need to know about creating effective YouTube banners that work
              across desktop, mobile, tablet, and TV screens.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Icon icon="file" size={24} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-xl font-bold">Banner Dimensions</h3>
                </div>
                <ul className="space-y-2 text-foreground-500">
                  <li>
                    <strong className="text-foreground">Recommended size:</strong> 2560 × 1440 pixels
                  </li>
                  <li>
                    <strong className="text-foreground">Aspect ratio:</strong> 16:9
                  </li>
                  <li>
                    <strong className="text-foreground">Minimum size:</strong> 2048 × 1152 pixels
                  </li>
                  <li>
                    <strong className="text-foreground">File size limit:</strong> 6MB (YouTube limit)
                  </li>
                </ul>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-success/10 p-3">
                    <Icon icon="shield" size={24} className="text-success" />
                  </div>
                  <h3 className="font-sans text-xl font-bold">Safe Area</h3>
                </div>
                <ul className="space-y-2 text-foreground-500">
                  <li>
                    <strong className="text-foreground">Safe area size:</strong> 1546 × 423 pixels
                  </li>
                  <li>
                    <strong className="text-foreground">Position:</strong> Centered horizontally and vertically
                  </li>
                  <li>
                    <strong className="text-foreground">Purpose:</strong> Guaranteed visibility on all devices
                  </li>
                  <li>
                    <strong className="text-foreground">Best practice:</strong> Place logos, text, and CTAs within this
                    zone
                  </li>
                </ul>
              </CardBody>
            </Card>
          </div>

          <Card className="mt-6">
            <CardBody className="p-6">
              <h3 className="mb-3 font-sans text-lg font-bold">Why Banners Get Cropped</h3>
              <p className="mb-4 text-foreground-500">
                YouTube displays channel banners differently across devices to optimize the viewing experience:
              </p>
              <ul className="space-y-2 text-foreground-500">
                <li>
                  <strong className="text-foreground">Desktop:</strong> Full banner visible (2560 × 1440px)
                </li>
                <li>
                  <strong className="text-foreground">Mobile:</strong> Center portion cropped (~1280 × 720px visible)
                </li>
                <li>
                  <strong className="text-foreground">Tablet:</strong> Medium crop (~2048 × 1152px visible)
                </li>
                <li>
                  <strong className="text-foreground">TV:</strong> May crop top/bottom depending on screen size
                </li>
              </ul>
              <p className="mt-4 text-foreground-500">
                This is why the safe area is crucial—it ensures your important content (channel name, tagline, logo)
                stays visible regardless of the device your viewers use. For similar considerations when creating video
                content, check out our{' '}
                <NextLink href="/safe-zone-checker" className="text-primary hover:underline">
                  Safe Zone Checker
                </NextLink>{' '}
                to ensure your YouTube Shorts, Instagram Reels, and TikTok videos display correctly.
              </p>
            </CardBody>
          </Card>
        </div>
      </section>

      {/* Read Complete Guide Section */}
      <section className="relative overflow-hidden bg-foreground-50 px-6 py-12">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Read Our Complete Guide</h2>
          <p className="mx-auto mb-6 max-w-2xl text-lg text-foreground-500">
            Learn everything about YouTube banner dimensions, safe zones, best practices, and how to create perfect
            channel art that works across all devices.
          </p>
          <Button
            as={NextLink}
            href="https://kreatli.com/guides/youtube-banner-resizer"
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
