import { Accordion, AccordionItem, Card, CardBody, Image } from '@heroui/react';
import NextLink from 'next/link';

import { Icon, IconType } from '../various/Icon';

export const BannerGuide = () => {
  const workflowSteps = [
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
      image: '/youtube-banner-guide/apply-template.png',
      altText:
        'YouTube banner resizer showing 2560x1440px template with safe zone overlay for mobile, desktop, tablet, and TV devices',
    },
    {
      step: 3,
      title: 'Adjust Key Elements and Preview',
      description:
        'Use the device previews to see how your banner will appear on desktop, mobile, tablet, and TV. Make sure all critical elements like logos, text, and taglines stay within the highlighted safe zone. Decorative visuals can extend beyond it. This step eliminates the trial-and-error usually required when uploading banners directly to YouTube.',
      icon: 'eye',
      image: '/youtube-banner-guide/preview-devices.png',
      altText:
        'YouTube banner preview showing how channel art appears on desktop, mobile, tablet, and TV with safe zone indicators',
    },
    {
      step: 4,
      title: 'Export and Upload to YouTube',
      description:
        "Export the final banner and upload it directly to your YouTube channel. The file will match YouTube's recommended dimensions (2560 × 1440px), preserve safe zone alignment, and display correctly across desktop, mobile, and TV. No further adjustments needed.",
      icon: 'checkCircle',
      image: '/youtube-banner-guide/export-banner.png',
      altText:
        'Export YouTube banner button showing download option for 2560x1440px optimized channel art ready for upload',
    },
  ];

  const faqItems = [
    {
      key: 'what-is-banner-size',
      title: 'What is the YouTube banner size?',
      content:
        'YouTube recommends a banner size of 2560 × 1440 pixels (16:9 aspect ratio). This is the minimum size that ensures your banner looks good on all devices, including desktop, mobile, tablet, and TV screens.',
    },
    {
      key: 'what-is-safe-area',
      title: 'What is the YouTube banner safe area?',
      content:
        'The safe area is a 1546 × 423 pixel zone in the center of your banner where important content (text, logos, CTAs) should be placed. This area is guaranteed to be visible on all devices. Content outside this zone may be cropped on mobile devices or TVs.',
    },
    {
      key: 'why-cropped-mobile',
      title: 'Why does my banner look cropped on mobile?',
      content:
        'YouTube displays banners differently on different devices. On mobile, the banner is cropped to show only the center portion. The safe area (1546 × 423px) ensures your important content stays visible. Always preview your banner on different device previews before publishing.',
    },
    {
      key: 'free-to-use',
      title: 'Can I use this tool for free?',
      content:
        'Yes! This YouTube Banner Resizer is completely free to use. No sign-up required, no watermarks, and no limits. Upload your image, resize it, preview safe areas, and export your banner ready for YouTube.',
    },
    {
      key: 'file-formats',
      title: 'What file formats are supported?',
      content:
        "You can upload PNG or JPG/JPEG images up to 10MB. The tool will resize your image to YouTube's recommended dimensions (2560 × 1440px) and export it in PNG or JPG format.",
    },
    {
      key: 'resize-modes',
      title: "What's the difference between Cover and Contain modes?",
      content:
        'Cover mode scales your image to fill the entire canvas (2560 × 1440px), maintaining aspect ratio. Parts of the image may be cropped. Contain mode scales your image to fit within the canvas, maintaining aspect ratio. There may be empty space filled with white.',
    },
    {
      key: 'positioning',
      title: 'Can I adjust the position of my image?',
      content:
        'Yes! After uploading your image, you can use the arrow buttons in the Position controls to move your image up, down, left, or right. You can also click and drag the image directly on the canvas to reposition it.',
    },
    {
      key: 'device-preview',
      title: 'What do the device previews show?',
      content:
        'The device previews (Desktop, Mobile, Tablet, TV) show you exactly how your banner will appear on different devices. Each device has different viewport dimensions, so content outside the safe area may be cropped. Use these previews to ensure your important content stays visible.',
    },
    {
      key: 'export-resolution',
      title: 'What resolution is the exported banner?',
      content:
        "The exported banner is always 2560 × 1440 pixels, which is YouTube's recommended size. This ensures your banner looks crisp on all devices, from mobile phones to large TV screens.",
    },
    {
      key: 'privacy',
      title: 'Is my image uploaded to a server?',
      content:
        "No. All image processing happens entirely in your browser. Your image is never uploaded to our servers or shared publicly. It stays on your device throughout the entire process. For secure cloud storage of your creative assets, check out Kreatli's secure asset storage features.",
    },
    {
      key: 'original-file',
      title: 'Does this tool modify my original file?',
      content:
        'No. Your original file remains untouched. The tool creates a new resized version when you export. Your original file is never modified or deleted.',
    },
    {
      key: 'multiple-exports',
      title: 'Can I export multiple versions?',
      content:
        'Yes! You can adjust the position, resize mode, and export format as many times as you want. Each export creates a new file, so you can experiment with different layouts and positions.',
    },
  ];

  return (
    <div>
      {/* YouTube Banner Size & Safe Area Explained Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mx-auto mb-4 max-w-2xl text-center font-sans text-2xl font-bold sm:text-4xl">
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
                <NextLink href="/social-media-safe-zone-checker" className="text-primary hover:underline">
                  Social Media Safe Zone Checker
                </NextLink>{' '}
                to ensure your YouTube Shorts, Instagram Reels, and TikTok videos display correctly.
              </p>
            </CardBody>
          </Card>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <h2 className="mx-auto mb-3 max-w-xl text-center font-sans text-2xl font-bold sm:text-4xl">
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
                      </div>
                    </div>
                    {item.image && (
                      <div className="mt-6 flex justify-center lg:mt-8">
                        <div className="relative max-w-full">
                          <Image
                            src={item.image}
                            alt={item.altText || `${item.title} - YouTube banner resizer tool screenshot`}
                            loading="lazy"
                            removeWrapper
                            className="h-auto w-full rounded-lg border border-foreground-200 shadow-lg"
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

      {/* FAQ Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-4xl">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-foreground-500">
              Common questions about YouTube banner dimensions, safe areas, and using our free banner resizer tool.
            </p>
          </div>

          <Accordion variant="splitted">
            {faqItems.map((item) => (
              <AccordionItem key={item.key} title={<span className="font-semibold">{item.title}</span>}>
                <span className="text-foreground-500">{item.content}</span>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
};
