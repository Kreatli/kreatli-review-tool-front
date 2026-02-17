import { Button, Card, CardBody, Image } from '@heroui/react';
import NextLink from 'next/link';

import { Icon, IconType } from '../various/Icon';

const IMG = '/video-annotation-guide/step';

export const ImageAnnotatorGuide = () => {
  const workflowSteps: Array<{
    step: number;
    title: string;
    description: string;
    icon: string;
    image: string | null;
    altText?: string;
    imageClassName?: string;
  }> = [
    {
      step: 1,
      title: 'Upload Your Image',
      description:
        'Upload your image (JPG, PNG, GIF, WebP, etc.) to a Kreatli project. Your file is stored with version history so you can annotate and share for review.',
      icon: 'upload',
      image: `${IMG}-1.webp`,
      altText: 'Kreatli project with image upload, ready to annotate',
      imageClassName: 'max-w-4xl',
    },
    {
      step: 2,
      title: 'Open the Image in the Review Interface',
      description:
        'Open the asset to enter the review view. Click or select any area on the image where you want to add comments, highlights, or drawings.',
      icon: 'panorama',
      image: '/video-annotation-guide/step-2-doc.png',
      altText: 'Kreatli Media view with image in project, open for annotation',
      imageClassName: 'max-w-4xl',
    },
    {
      step: 3,
      title: 'Add Annotations on the Image',
      description:
        'Add comments pinned to exact spots, use highlights and shapes to mark regions, and draw or use arrows to point to elements. All feedback stays tied to the right position.',
      icon: 'paint',
      image: '/video-annotation-guide/step-3-doc.png',
      altText: 'Adding annotations on image in Kreatli',
      imageClassName: 'max-w-4xl',
    },
    {
      step: 4,
      title: 'See All Feedback and Jump to Spots',
      description:
        'View all annotations in one place, filter by reviewer, and jump to any comment or markup. Track what’s resolved and what still needs attention.',
      icon: 'time',
      image: '/video-annotation-guide/step-4-doc.png',
      altText: 'Feedback and annotations on image in Kreatli',
      imageClassName: 'max-w-4xl',
    },
    {
      step: 5,
      title: 'Share for Approval or Track Resolution',
      description:
        'Share a review link so clients can annotate without signing up. Mark comments resolved as you address them and upload new versions when needed.',
      icon: 'checkCircle',
      image: '/video-annotation-guide/step-5-doc.png',
      altText: 'Share and track image annotations in Kreatli',
      imageClassName: 'max-w-4xl',
    },
  ];

  return (
    <div>
      {/* How to Use Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">How to Annotate Images Online</h2>
            <p className="mx-auto max-w-3xl text-base text-foreground-500">
              Add location-pinned comments, highlights, drawings, and markup to your images. Follow these steps to
              upload, annotate, and share with your team or clients—all in your browser.
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
                        <div className="relative max-w-full">
                          <Image
                            src={item.image}
                            alt={item.altText || `${item.title} - Image annotator screenshot`}
                            loading="lazy"
                            removeWrapper
                            className={`mx-auto h-auto w-full ${item.imageClassName || 'max-w-xl'} rounded-lg border border-foreground-200 shadow-lg`}
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

      {/* Features Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Image Annotator Features</h2>
            <p className="mx-auto max-w-3xl text-lg text-foreground-500">
              Location-pinned comments, highlights, shapes, and drawings—everything you need to give precise feedback
              on images.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Icon icon="paint" size={24} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-xl font-bold">Comments & Markup</h3>
                </div>
                <p className="text-foreground-500">
                  Pin comments to exact spots on the image. Use highlights, shapes, arrows, and freehand drawing to
                  mark regions and point to elements so designers and stakeholders know precisely what to change.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-success/10 p-3">
                    <Icon icon="link" size={24} className="text-success" />
                  </div>
                  <h3 className="font-sans text-xl font-bold">Guest Annotator Links</h3>
                </div>
                <p className="text-foreground-500">
                  Share secure links so clients and stakeholders can open the image, add comments and markup, and
                  submit feedback without creating an account.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-3">
                    <Icon icon="time" size={24} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-xl font-bold">Resolution Tracking</h3>
                </div>
                <p className="text-foreground-500">
                  Mark annotations as resolved or unresolved. Filter to show only what still needs attention and keep a
                  clear record of what’s done and what’s pending across review rounds.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-3">
                    <Icon icon="group" size={24} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-xl font-bold">Multi-Reviewer Annotation</h3>
                </div>
                <p className="text-foreground-500">
                  Multiple people can annotate the same image. Each person’s comments and markup are visible to
                  everyone, with indicators for who added what. Filter by reviewer and consolidate feedback in one
                  place.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA to Platform */}
      <section className="relative overflow-hidden bg-foreground-50 px-6 py-12">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Explore Image Annotation in Kreatli</h2>
          <p className="mx-auto mb-6 max-w-2xl text-lg text-foreground-500">
            Learn more about annotating images, drawing on images, and review workflows.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button as={NextLink} href="/platform/annotate-image" size="lg" className="bg-foreground text-content1">
              Annotate Image
            </Button>
            <Button as={NextLink} href="/platform/draw-on-image" size="lg" variant="bordered">
              Draw on Image
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
