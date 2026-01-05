import { Accordion, AccordionItem, Button, Card, CardBody, Image } from '@heroui/react';
import { Icon } from '../../various/Icon';
import NextLink from 'next/link';

export const SafeZoneScreenGuide = () => {
  return (
    <div>
      {/* What are Safe Zones Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mx-auto mb-4 max-w-md text-center font-sans text-2xl font-bold sm:text-4xl">
              What are Safe Zones and Why They Matter
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-foreground-500">
              Safe zones are buffer areas inside your video canvas where important visual elements are guaranteed to
              remain visible, regardless of device differences or UI overlays.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardBody className="p-6 lg:p-8">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Icon icon="shield" size={24} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-xl font-bold">Protect Your Content</h3>
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
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-success/10 p-3">
                    <Icon icon="checkCircle" size={24} className="text-success" />
                  </div>
                  <h3 className="font-sans text-xl font-bold">Professional Results</h3>
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

      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mx-auto mb-4 max-w-2xl text-center font-sans text-2xl font-bold sm:text-4xl">
              Platform-Specific Safe Zone Recommendations
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-foreground-500">
              Each platform has unique UI overlays and cropping behavior. Follow these recommendations for optimal
              visibility across all devices and viewing contexts.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-500/10 p-2">
                    <Icon icon="instagram" size={20} />
                  </div>
                  <h3 className="font-sans text-lg font-bold">Instagram Reels</h3>
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
                  <p className="border-t border-foreground-200 pt-2">
                    Ensures text/logos avoid feed/profile crop, and UI overlays won't cover CTAs.
                  </p>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-500/10 p-2">
                    <Icon icon="youtube" size={20} />
                  </div>
                  <h3 className="font-sans text-lg font-bold">YouTube Shorts</h3>
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
                  <p className="border-t border-foreground-200 pt-2">
                    Prevents overlay from captions, progress bar, and ensures clear thumbnail visibility.
                  </p>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-500/10 p-2">
                    <Icon icon="tiktok" size={20} />
                  </div>
                  <h3 className="font-sans text-lg font-bold">TikTok</h3>
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
                  <p className="border-t border-foreground-200 pt-2">
                    Avoids overlap with caption box and action icons; ensures clarity on different device sizes.
                  </p>
                </div>
              </CardBody>
            </Card>
          </div>

          <div className="mt-8 flex justify-center">
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
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <h2 className="mx-auto mb-3 max-w-xl text-center font-sans text-2xl font-bold sm:text-4xl">
              How to Use Safe-Zone Checker in Your Workflow
            </h2>
            <p className="mx-auto max-w-2xl text-base text-foreground-500">
              Follow this step-by-step process to ensure your content looks perfect on every platform.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {[
              {
                step: 1,
                title: 'Prepare Your Content (Any Format)',
                description:
                  'Use the Safe Zone Checker with any creative asset—videos, images, thumbnails, or mockups. We recommend 1080 × 1920 (9:16) for vertical platforms, but the tool works with any dimensions.',
                icon: 'folder',
                image: null,
              },
              {
                step: 2,
                title: 'Open the Safe Zone Checker',
                description:
                  'Navigate to the Social Media Safe Zone Checker to access a clean interface with upload controls and platform-specific overlays.',
                icon: 'upload',
                image: null,
              },
              {
                step: 3,
                title: 'Upload Your Asset',
                description:
                  'Drag and drop your file or browse to select it. Your content will appear with safe zone overlays, giving you immediate visual feedback on how it will be framed.',
                icon: 'upload',
                image: '/safe-zone-guide/upload-asset.png',
              },
              {
                step: 4,
                title: 'Toggle Between Platform Overlays',
                description:
                  'Switch between TikTok, Instagram Reels, and YouTube Shorts to see where UI elements appear on each platform and ensure your layout works everywhere.',
                icon: 'addVideo',
                image: '/safe-zone-guide/toggle-platforms.png',
              },
              {
                step: 5,
                title: 'Review and Share with Your Team',
                description:
                  'Check placement of text, logos, CTAs, and key visuals. Use Kreatli as a production management platform to review assets with your team, share feedback, and align on changes before publishing.',
                icon: 'paint',
                image: null,
              },
              {
                step: 6,
                title: 'Export and Download with Safe Zones',
                description:
                  'Export your content with safe zone overlays applied. Share with stakeholders for sign-off, align your team on layout constraints, and document guidelines for future iterations.',
                icon: 'checkCircle',
                image: '/safe-zone-guide/export-download.png',
              },
            ].map((item) => (
              <Card key={item.step} className="scroll-mt-36">
                <CardBody className="p-6 lg:p-8">
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                      <div className="flex items-start gap-4 lg:w-80 lg:shrink-0">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <Icon icon={item.icon as any} size={24} className="text-primary" />
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
                        <div className="relative max-w-[280px]">
                          {/* Phone Frame */}
                          <div className="relative mx-auto rounded-[2.5rem] bg-white p-2 shadow-2xl">
                            {/* Notch */}
                            <div className="absolute left-1/2 top-0 z-10 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-white"></div>
                            {/* Screen */}
                            <div className="overflow-hidden rounded-[2rem] bg-black">
                              <Image
                                src={item.image}
                                alt={`${item.title} screenshot`}
                                removeWrapper
                                className="h-auto w-full"
                              />
                            </div>
                          </div>
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

      {/* Why This Matters Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-4xl">Why This Matters More Than Ever</h2>
            <p className="mx-auto max-w-3xl text-lg text-foreground-500">
              With vertical video reaching everywhere - stories, shorts, social feeds, ads - inconsistent visibility can
              silently erode audience engagement.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-danger/10 p-2">
                    <Icon icon="cross" size={20} className="text-danger" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Hidden Impact</h3>
                </div>
                <p className="text-foreground-500">
                  Missed captions, hidden logos, or obscured CTAs don't surface as technical failures - they lower
                  effective deliverables and weaken brand clarity.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-success/10 p-2">
                    <Icon icon="checkCircle" size={20} className="text-success" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Protect Creative Intent</h3>
                </div>
                <p className="text-foreground-500">
                  By embedding safe-zone discipline early and standardizing across projects via templates and project
                  workflows, you protect creative intent.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Icon icon="shield" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Reduce Errors</h3>
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
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-4xl">
          <h2 className="mb-8 text-center font-sans text-2xl font-bold sm:text-4xl">Frequently Asked Questions</h2>

          <Accordion variant="splitted">
            <AccordionItem
              key="what-is-safe-zone"
              title={<span className="font-semibold">What is a "safe zone" in social media content?</span>}
            >
              <span className="text-foreground-500">
                A safe zone refers to the area within your creative where important elements (text, logos, CTAs, faces)
                remain visible after platform UI elements (buttons, captions, profile bars) are applied. Anything
                outside these zones risks being obscured by platform overlays.
              </span>
            </AccordionItem>

            <AccordionItem
              key="why-different-platforms"
              title={<span className="font-semibold">Why do different platforms have different safe zones?</span>}
            >
              <span className="text-foreground-500">
                Each platform (TikTok, Instagram Reels, YouTube Shorts) has a unique interface and UI layout, so the
                areas where elements might be covered differ. The safe zone overlays you see in the checker reflect
                these platform-specific UI differences.
              </span>
            </AccordionItem>

            <AccordionItem
              key="file-types-sizes"
              title={<span className="font-semibold">What file types and sizes can I upload?</span>}
            >
              <span className="text-foreground-500">
                You can upload almost any content format, including videos, still images, thumbnails, or design mockups.
                While we recommend using a 1080 × 1920 (9:16) canvas because it matches standard vertical formats,
                Kreatli does not restrict uploads to that size. The tool remains flexible to fit your workflow.
              </span>
            </AccordionItem>

            <AccordionItem
              key="sign-up-required"
              title={<span className="font-semibold">Do I need to sign up to use the Safe Zone Checker?</span>}
            >
              <span className="text-foreground-500">
                No. The Safe Zone Checker is available for anyone to use without signup. You can upload and preview your
                content immediately.
              </span>
            </AccordionItem>

            <AccordionItem
              key="multiple-platforms"
              title={<span className="font-semibold">Can I use the same creative for multiple platforms?</span>}
            >
              <span className="text-foreground-500">
                Yes. The tool lets you toggle between different platform overlays after uploading, so you can see how
                the same creative behaves across TikTok, Instagram Reels, and YouTube Shorts and adjust accordingly.
              </span>
            </AccordionItem>

            <AccordionItem
              key="exported-version"
              title={<span className="font-semibold">How should I use the exported version from the checker?</span>}
            >
              <span className="text-foreground-500">
                After you download your asset with safe zone overlays applied, use it to: Share with your team or
                stakeholders for review. Align on placement of text and branding elements. Document layout decisions in
                production workflows. It becomes a reference that ensures everyone understands where key visuals are
                safe, avoiding layout mishaps before final export.
              </span>
            </AccordionItem>

            <AccordionItem
              key="collaboration"
              title={<span className="font-semibold">Does the tool help with collaboration?</span>}
            >
              <span className="text-foreground-500">
                Yes. Because you can review and share the safe-zone annotated export, Kreatli encourages collaboration
                across editors, designers, and reviewers, making it easier to unify feedback and reduce
                miscommunication.
              </span>
            </AccordionItem>

            <AccordionItem
              key="privacy"
              title={<span className="font-semibold">Will my content be uploaded to a server or shared publicly?</span>}
            >
              <span className="text-foreground-500">
                The Safe Zone Checker processes your upload in the browser and does not publish your content publicly.
                Your file is used only to generate the preview and overlays. Visitors should always check the tool's
                terms for the most current privacy practices.
              </span>
            </AccordionItem>

            <AccordionItem
              key="file-modification"
              title={<span className="font-semibold">Does the Safe Zone Checker change or edit my original file?</span>}
            >
              <span className="text-foreground-500">
                No. The tool does not modify your original asset. When you export, the safe zone overlays are added only
                to the downloaded reference version, leaving your original file untouched.
              </span>
            </AccordionItem>

            <AccordionItem
              key="subtitles"
              title={<span className="font-semibold">Should subtitles always stay inside the safe zone?</span>}
            >
              <span className="text-foreground-500">
                Yes. Subtitles, captions, and on-screen text should always be placed well within the safe zone, as
                captions are among the most commonly obscured elements by platform UI and dynamic overlays.
              </span>
            </AccordionItem>

            <AccordionItem
              key="early-production"
              title={
                <span className="font-semibold">
                  Can I use this tool during early production, not just before publishing?
                </span>
              }
            >
              <span className="text-foreground-500">
                Absolutely. The Safe Zone Checker is intentionally useful during concepting, storyboarding, and design
                review, not only at the final export stage. Using it early helps prevent layout rework later in the
                process.
              </span>
            </AccordionItem>

            <AccordionItem
              key="individual-or-teams"
              title={<span className="font-semibold">Is this tool meant for individual creators or teams?</span>}
            >
              <span className="text-foreground-500">
                Both. Solo creators can quickly validate layouts before posting, while teams can use the exported
                safe-zone version to review, approve, and align across editors, designers, social managers, and
                stakeholders.
              </span>
            </AccordionItem>

            <AccordionItem
              key="other-tools"
              title={
                <span className="font-semibold">
                  Does Kreatli offer other tools for managing social video production?
                </span>
              }
            >
              <span className="text-foreground-500">
                Yes. Beyond the Safe Zone Checker, Kreatli is a production management platform designed to help creative
                teams plan, review, and coordinate content across the full production lifecycle, not just at the
                publishing stage.
              </span>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="overflow-hidden bg-foreground-50 px-6 py-16 lg:py-24">
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col gap-6 text-center">
          <h2 className="mx-auto max-w-lg font-sans text-2xl font-bold sm:text-4xl">
            Ready to Ensure Your Content Looks Perfect?
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-foreground-500">
            Use our safe zone checker tool to preview your content with accurate platform overlays. Ensure your videos,
            titles, logos, and CTAs stay visible across all devices and platforms.
          </p>
          <div className="mt-4 flex flex-col items-center justify-center gap-4 sm:flex-row">
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
