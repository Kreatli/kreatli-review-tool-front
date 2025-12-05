import { Accordion, AccordionItem, Button, Card, CardBody } from '@heroui/react';
import { Icon } from '../../various/Icon';
import NextLink from 'next/link';

export const SafeZoneScreenGuide = () => {
  return (
    <div>
      {/* What are Safe Zones Section */}
      <section className="relative py-16 px-6 backdrop-blur-lg overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-bold max-w-md mx-auto text-center font-sans mb-4">
              What are Safe Zones and Why They Matter
            </h2>
            <p className="text-lg text-foreground-500 max-w-3xl mx-auto">
              Safe zones are buffer areas inside your video canvas where important visual elements are guaranteed to
              remain visible, regardless of device differences or UI overlays.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardBody className="p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/10 rounded-full p-3">
                    <Icon icon="shield" size={24} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-bold font-sans">Protect Your Content</h3>
                </div>
                <p className="text-foreground-500">
                  Apps like TikTok, Instagram, and YouTube put playback controls, profile bars, comment buttons,
                  captions, and overlays on top of your video. Placing critical content too close to the edges risks
                  accidental cropping or hiding.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-success/10 rounded-full p-3">
                    <Icon icon="checkCircle" size={24} className="text-success" />
                  </div>
                  <h3 className="text-xl font-bold font-sans">Professional Results</h3>
                </div>
                <p className="text-foreground-500">
                  Treating safe zones as a built-in editing discipline means fewer layout surprises, fewer reworks, and
                  fewer delivery delays. Your content looks polished and intentional across all platforms.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      <section className="relative py-16 px-6 backdrop-blur-lg overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl max-w-2xl mx-auto text-center font-bold font-sans mb-4">
              Platform-Specific Safe Zone Recommendations
            </h2>
            <p className="text-lg text-foreground-500 max-w-3xl mx-auto">
              Each platform has unique UI overlays and cropping behavior. Follow these recommendations for optimal
              visibility across all devices and viewing contexts.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-foreground-500/10 rounded-full p-2">
                    <Icon icon="instagram" size={20} />
                  </div>
                  <h3 className="text-lg font-bold font-sans">Instagram Reels</h3>
                </div>
                <div className="space-y-2 text-sm text-foreground-500">
                  <div>
                    <strong className="text-foreground">Top margin:</strong> ~108px (avoid feed/profile crop)
                  </div>
                  <div>
                    <strong className="text-foreground">Bottom margin:</strong> ~320px (captions, comments overlay)
                  </div>
                  <div>
                    <strong className="text-foreground">Side padding:</strong> ~60px (UI elements)
                  </div>
                  <p className="pt-2 border-t border-foreground-200">
                    Ensures text/logos avoid feed/profile crop, and UI overlays won't cover CTAs.
                  </p>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-foreground-500/10 rounded-full p-2">
                    <Icon icon="youtube" size={20} />
                  </div>
                  <h3 className="text-lg font-bold font-sans">YouTube Shorts</h3>
                </div>
                <div className="space-y-2 text-sm text-foreground-500">
                  <div>
                    <strong className="text-foreground">Main visuals:</strong> Central 4:5 area (≈1080 × 1440px)
                  </div>
                  <div>
                    <strong className="text-foreground">Avoid:</strong> Bottom 10–15% for text
                  </div>
                  <div>
                    <strong className="text-foreground">Focus:</strong> Top and center areas
                  </div>
                  <p className="pt-2 border-t border-foreground-200">
                    Prevents overlay from captions, progress bar, and ensures clear thumbnail visibility.
                  </p>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-foreground-500/10 rounded-full p-2">
                    <Icon icon="tiktok" size={20} />
                  </div>
                  <h3 className="text-lg font-bold font-sans">TikTok</h3>
                </div>
                <div className="space-y-2 text-sm text-foreground-500">
                  <div>
                    <strong className="text-foreground">Top margin:</strong> ~130px
                  </div>
                  <div>
                    <strong className="text-foreground">Bottom margin:</strong> ~250px
                  </div>
                  <div>
                    <strong className="text-foreground">Side padding:</strong> ~60px
                  </div>
                  <p className="pt-2 border-t border-foreground-200">
                    Avoids overlap with caption box and action icons; ensures clarity on different device sizes.
                  </p>
                </div>
              </CardBody>
            </Card>
          </div>

          <div className="flex justify-center mt-8">
            <Button
              as="a"
              className="bg-foreground text-content1"
              href="https://kreatli.com/blog/safe-zone-guide-instagram-reels-youtube-shorts-tiktok"
              target="_blank"
            >
              Read our complete guide
            </Button>
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="relative py-16 px-6 backdrop-blur-lg overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl max-w-xl mx-auto text-center font-bold font-sans mb-4">
              How to Use Safe-Zone Checker in Your Workflow
            </h2>
            <p className="text-lg text-foreground-500 max-w-3xl mx-auto">
              Follow this step-by-step process to ensure your content looks perfect on every platform.
            </p>
          </div>

          <div className="flex flex-col gap-8">
            {[
              {
                step: 1,
                title: 'Start with a vertical canvas',
                description:
                  'Use 1080 × 1920 px (9:16 aspect ratio) as your base canvas for all vertical video content.',
                icon: 'folder',
              },
              {
                step: 2,
                title: 'Upload and preview with overlays',
                description:
                  'Use our safe-zone checker tool to upload your video and preview it with platform-specific UI overlays and safe zone indicators.',
                icon: 'upload',
              },
              {
                step: 3,
                title: 'Design inside the safe zone',
                description:
                  'Keep all vital text, logos, and CTAs well within the safe margins defined by the overlay for each platform.',
                icon: 'paint',
              },
              {
                step: 4,
                title: 'Preview on device and in-app',
                description:
                  'Wherever possible, preview in the native app UI to catch overlays or cropping differences before final export.',
                icon: 'addVideo',
              },
              {
                step: 5,
                title: 'Export and validate',
                description:
                  'Run through the validation checklist to ensure all critical elements are visible before final delivery.',
                icon: 'checkCircle',
              },
            ].map((item) => (
              <Card key={item.step} className="scroll-mt-36">
                <CardBody className="p-6 lg:p-8">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex items-start gap-4 lg:w-96 lg:shrink-0">
                      <div className="shrink-0 size-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon icon={item.icon as any} size={24} className="text-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-primary mb-1">Step {item.step}</div>
                        <h3 className="text-xl font-bold font-sans">{item.title}</h3>
                      </div>
                    </div>
                    <div className="lg:w-auto lg:pl-8 lg:border-l border-foreground-200">
                      <p className="text-foreground-500 text-base lg:text-lg">{item.description}</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why This Matters Section */}
      <section className="relative py-16 px-6 backdrop-blur-lg overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-bold font-sans mb-4">Why This Matters More Than Ever</h2>
            <p className="text-lg text-foreground-500 max-w-3xl mx-auto">
              With vertical video reaching everywhere - stories, shorts, social feeds, ads - inconsistent visibility can
              silently erode audience engagement.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-danger/10 rounded-full p-2">
                    <Icon icon="cross" size={20} className="text-danger" />
                  </div>
                  <h3 className="text-lg font-semibold font-sans">Hidden Impact</h3>
                </div>
                <p className="text-foreground-500">
                  Missed captions, hidden logos, or obscured CTAs don't surface as technical failures - they lower
                  effective deliverables and weaken brand clarity.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-success/10 rounded-full p-2">
                    <Icon icon="checkCircle" size={20} className="text-success" />
                  </div>
                  <h3 className="text-lg font-semibold font-sans">Protect Creative Intent</h3>
                </div>
                <p className="text-foreground-500">
                  By embedding safe-zone discipline early and standardizing across projects via templates and project
                  workflows, you protect creative intent.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/10 rounded-full p-2">
                    <Icon icon="shield" size={20} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold font-sans">Reduce Errors</h3>
                </div>
                <p className="text-foreground-500">
                  Reduce errors and deliver polished content no matter where it lands. Your content will look
                  professional across all platforms and devices.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-16 px-6 backdrop-blur-lg overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-2xl sm:text-4xl font-bold font-sans text-center mb-8">Frequently Asked Questions</h2>

          <Accordion variant="splitted">
            <AccordionItem
              key="what-are-safe-zones"
              title={<span className="font-semibold">What exactly are safe zones?</span>}
            >
              <span className="text-foreground-500">
                Safe zones are buffer areas inside your video canvas where important visual elements - text overlays,
                logos, CTAs - are guaranteed to remain visible, regardless of device differences or UI overlays. Each
                platform overlays its own interface elements on top of your content, and safe zones ensure your critical
                content stays visible.
              </span>
            </AccordionItem>

            <AccordionItem
              key="why-different-platforms"
              title={<span className="font-semibold">Why do different platforms have different safe zones?</span>}
            >
              <span className="text-foreground-500">
                Each platform (TikTok, Instagram Reels, YouTube Shorts) has unique UI elements, button placements, and
                overlay behaviors. For example, YouTube Shorts has a larger bottom margin for video titles, while TikTok
                has significant margins for captions and action buttons. These differences require platform-specific
                safe zone guidelines.
              </span>
            </AccordionItem>

            <AccordionItem
              key="canvas-size"
              title={<span className="font-semibold">What canvas size should I use?</span>}
            >
              <span className="text-foreground-500">
                For vertical video content, use 1080 × 1920 px (9:16 aspect ratio) as your base canvas. This is the
                standard format for TikTok, Instagram Reels, and YouTube Shorts. Design your content within the safe
                zone margins for each platform to ensure visibility.
              </span>
            </AccordionItem>

            <AccordionItem
              key="test-content"
              title={<span className="font-semibold">How can I test my content before publishing?</span>}
            >
              <span className="text-foreground-500">
                Use our safe zone checker tool to upload your video and preview it with platform-specific UI overlays.
                You can switch between different platform views to see exactly how your content will appear. This helps
                you catch any issues before final export and publishing.
              </span>
            </AccordionItem>

            <AccordionItem
              key="multiple-platforms"
              title={<span className="font-semibold">Can I use the same video for multiple platforms?</span>}
            >
              <span className="text-foreground-500">
                Yes, but you need to design for the most restrictive safe zone (YouTube Shorts has the smallest safe
                zone at 50% of the canvas). If you're creating platform-specific versions, maintain distinct safe-zone
                overlays in your project to avoid layout mistakes when switching platforms.
              </span>
            </AccordionItem>

            <AccordionItem
              key="text-placement"
              title={<span className="font-semibold">Where should I place text in my videos?</span>}
            >
              <span className="text-foreground-500">
                Place important text in the center-upper area of the safe zone for each platform. Avoid the top margins
                (where navigation bars appear), bottom margins (where captions and UI elements overlay), and side edges
                (where buttons and profile information appear). Use large, readable fonts with high contrast.
              </span>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-foreground-50 lg:py-24 py-16 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center flex flex-col gap-6 relative z-10">
          <h2 className="text-2xl sm:text-4xl font-bold font-sans max-w-lg mx-auto">
            Ready to Ensure Your Content Looks Perfect?
          </h2>
          <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
            Use our safe zone checker tool to preview your content with accurate platform overlays. Ensure your videos,
            titles, logos, and CTAs stay visible across all devices and platforms.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-4">
            <Button as={NextLink} href="/sign-up" size="lg" className="bg-foreground text-content1">
              Start for Free
            </Button>
            <Button
              as="a"
              href="https://calendar.app.google/NXbAeTAUwaBGh5x49"
              target="_blank"
              size="lg"
              variant="bordered"
            >
              Book a Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
