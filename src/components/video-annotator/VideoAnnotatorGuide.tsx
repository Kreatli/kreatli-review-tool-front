import { Button, Card, CardBody, Image } from '@heroui/react';
import NextLink from 'next/link';

import { Icon, IconType } from '../various/Icon';

const IMG = '/video-annotation-guide/step';

export const VideoAnnotatorGuide = () => {
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
      title: 'Upload Your Video',
      description:
        'Upload your video to a Kreatli project. Your file is ready for frame-accurate annotation in the same workflow.',
      icon: 'upload',
      image: `${IMG}-1.webp`,
      altText: 'Kreatli project with video upload, ready for annotation',
      imageClassName: 'max-w-4xl',
    },
    {
      step: 2,
      title: 'Open the Video in the Review Player',
      description:
        'Open the asset to enter the frame-accurate annotation view. Scrub to any frame and add comments, drawings, or markup at precise moments.',
      icon: 'addVideo',
      image: `${IMG}-2.webp`,
      altText: 'Kreatli review player with video open for annotation',
      imageClassName: 'max-w-4xl',
    },
    {
      step: 3,
      title: 'Add Frame-Accurate Annotations',
      description:
        'Add comments, drawings, and shapes pinned to specific frames. Use text for feedback, draw on the frame to highlight areas, and use arrows or markers to point to elements.',
      icon: 'paint',
      image: `${IMG}-3.webp`,
      altText: 'Adding frame-accurate comments and drawings on video in Kreatli',
      imageClassName: 'max-w-4xl',
    },
    {
      step: 4,
      title: 'Use the Timeline to Review and Jump to Frames',
      description:
        'See all annotations on the timeline and jump to any frame to address feedback. Navigate directly to annotated moments without guessing timestamps.',
      icon: 'time',
      image: `${IMG}-4.webp`,
      altText: 'Timeline view with annotations in Kreatli',
      imageClassName: 'max-w-4xl',
    },
    {
      step: 5,
      title: 'Share for Approval or Track Resolution',
      description:
        'Share a link so reviewers can annotate without signing up. Mark annotations as resolved as you address them and keep everyone aligned on what’s done and what’s pending.',
      icon: 'checkCircle',
      image: `${IMG}-5.webp`,
      altText: 'Sharing and resolution tracking for video annotations in Kreatli',
      imageClassName: 'max-w-4xl',
    },
  ];

  return (
    <div>
      {/* How to Use Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">How to Annotate Videos Online</h2>
            <p className="mx-auto max-w-3xl text-base text-foreground-500">
              Add frame-accurate annotations, drawings, and markup to your videos. Follow these steps to upload,
              annotate, and share with your team or clients—all in your browser.
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
                            alt={item.altText || `${item.title} - Video annotator screenshot`}
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
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Video Annotator Features</h2>
            <p className="mx-auto max-w-3xl text-lg text-foreground-500">
              Frame-accurate markup, multiple annotation types, and collaboration—everything you need to give precise
              feedback on video.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Icon icon="time" size={24} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-xl font-bold">Frame-Accurate Annotation</h3>
                </div>
                <p className="text-foreground-500">
                  Every comment and drawing is pinned to an exact frame and timestamp. Jump directly to the moment that
                  needs attention—no more scrubbing to find the right spot.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-success/10 p-3">
                    <Icon icon="paint" size={24} className="text-success" />
                  </div>
                  <h3 className="font-sans text-xl font-bold">Drawings & Shapes</h3>
                </div>
                <p className="text-foreground-500">
                  Draw directly on video frames with freehand tools, shapes, arrows, and markers. Highlight issues and
                  point to specific elements so editors see exactly what to change.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-3">
                    <Icon icon="link" size={24} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-xl font-bold">Guest Annotator Links</h3>
                </div>
                <p className="text-foreground-500">
                  Share secure links so clients and stakeholders can annotate videos without creating an account.
                  Reduces friction and speeds up the feedback loop.
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
                  Multiple people can annotate the same video. See who added each comment or drawing, filter by
                  reviewer, and consolidate all feedback in one place.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA to Platform */}
      <section className="relative overflow-hidden bg-foreground-50 px-6 py-12">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Explore Video Annotation in Kreatli</h2>
          <p className="mx-auto mb-6 max-w-2xl text-lg text-foreground-500">
            Learn more about frame-accurate video annotation, drawing on video, and approval workflows.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button as={NextLink} href="/platform/video-annotation" size="lg" className="bg-foreground text-content1">
              Video Annotation
            </Button>
            <Button as={NextLink} href="/platform/add-drawing-to-video" size="lg" variant="bordered">
              Draw on Video
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
