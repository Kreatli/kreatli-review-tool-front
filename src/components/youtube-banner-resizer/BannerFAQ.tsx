import { Accordion, AccordionItem } from '@heroui/react';

export const BannerFAQ = () => {
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
    <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
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
  );
};
