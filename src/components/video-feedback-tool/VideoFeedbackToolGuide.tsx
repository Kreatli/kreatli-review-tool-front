import { Button, Card, CardBody, Image } from '@heroui/react';
import NextLink from 'next/link';

import { Icon, IconType } from '../various/Icon';

export const VideoFeedbackToolGuide = () => {
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
        'Drag and drop a video file or click to browse. Supports MP4, MOV, and WebM formats. Your video loads instantly for review.',
      icon: 'upload',
      image: '/video-annotation-guide/step-1.webp',
      altText: 'Upload video to Kreatli for feedback and review',
      imageClassName: 'max-w-4xl',
    },
    {
      step: 2,
      title: 'Scrub to the Exact Frame',
      description:
        'Use the timeline to navigate to any moment in the video. Every comment and annotation you add will be pinned to that exact frame and timestamp.',
      icon: 'time',
      image: '/video-feedback-tool-guide/step-2-scrub-timeline.png',
      altText: 'Scrub video timeline to find the exact frame for feedback',
      imageClassName: 'max-w-4xl',
    },
    {
      step: 3,
      title: 'Add Comments and Annotations',
      description:
        'Click anywhere on the video to add a comment. Use drawing tools to highlight specific areas with freehand, shapes, or arrows. Your feedback is tied to the exact moment.',
      icon: 'paint',
      image: '/video-annotation-guide/step-3-drawing.png',
      altText: 'Add frame-accurate comments and annotations on video',
      imageClassName: 'max-w-4xl',
    },
    {
      step: 4,
      title: 'Share with Your Team or Clients',
      description:
        'Generate a shareable review link. Clients and collaborators can view the video and add their own feedback without creating an account.',
      icon: 'link',
      image: '/video-feedback-tool-guide/step-4-share-link.png',
      altText: 'Share video review link with team or clients',
      imageClassName: 'max-w-4xl',
    },
    {
      step: 5,
      title: 'Track Versions and Resolve Feedback',
      description:
        'See all feedback in one place. Mark comments as resolved as you address them. Track versions and compare feedback across revisions.',
      icon: 'checkCircle',
      image: '/video-annotation-guide/step-5-share-approvals.png',
      altText: 'Track versions and resolve video feedback',
      imageClassName: 'max-w-4xl',
    },
  ];

  return (
    <div>
      {/* How to Use Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">How to Give Video Feedback</h2>
            <p className="mx-auto max-w-3xl text-base text-foreground-500">
              Frame-accurate feedback in minutes—perfect for creative reviews, client approvals, and team collaboration
              on video projects.
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
                            alt={item.altText || `${item.title} - Video feedback tool screenshot`}
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
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Video Feedback Tool Features</h2>
            <p className="mx-auto max-w-3xl text-lg text-foreground-500">
              Everything you need to collect, organize, and act on video feedback—from first draft to final approval.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Icon icon="time" size={24} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-xl font-bold">Frame-Accurate Comments</h3>
                </div>
                <p className="text-foreground-500">
                  Every comment is pinned to an exact frame and timestamp. Editors can jump directly to the moment that
                  needs attention—no more vague descriptions like "around the 2-minute mark."
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-success/10 p-3">
                    <Icon icon="paint" size={24} className="text-success" />
                  </div>
                  <h3 className="font-sans text-xl font-bold">Visual Annotations</h3>
                </div>
                <p className="text-foreground-500">
                  Draw directly on video frames with freehand, shapes, arrows, and markers. Highlight exactly what needs
                  to change with visual markup that leaves no room for misinterpretation.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-3">
                    <Icon icon="link" size={24} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-xl font-bold">No-Signup Review Links</h3>
                </div>
                <p className="text-foreground-500">
                  Share a secure link with clients or collaborators. They can watch the video, add comments and
                  annotations, and submit feedback without creating an account—reducing friction in approval workflows.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-3">
                    <Icon icon="checkCircle" size={24} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-xl font-bold">Resolution Tracking</h3>
                </div>
                <p className="text-foreground-500">
                  Mark feedback as resolved or unresolved. Filter to show only pending items. Track which comments have
                  been addressed across multiple review rounds and versions.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-3">
                    <Icon icon="slides" size={24} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-xl font-bold">Version Comparison</h3>
                </div>
                <p className="text-foreground-500">
                  Upload new versions of your video and compare them side by side. See feedback from previous versions,
                  track what changed, and maintain a complete revision history.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-3">
                    <Icon icon="group" size={24} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-xl font-bold">Team Collaboration</h3>
                </div>
                <p className="text-foreground-500">
                  Multiple reviewers can add feedback simultaneously. See who wrote each comment, filter by reviewer,
                  and keep all stakeholder input organized in one threaded conversation.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Common Use Cases</h2>
            <p className="mx-auto max-w-3xl text-lg text-foreground-500">
              Video feedback tools streamline collaboration for creative teams, agencies, and production studios.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardBody className="p-6">
                <h3 className="mb-3 font-sans text-lg font-bold">Client Approvals</h3>
                <p className="text-foreground-500">
                  Share videos with clients for review and approval. Collect frame-accurate feedback, request changes,
                  or get sign-off—all in one place with a clear audit trail.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <h3 className="mb-3 font-sans text-lg font-bold">Creative Reviews</h3>
                <p className="text-foreground-500">
                  Review rough cuts, edits, and work-in-progress with your team. Add visual annotations to communicate
                  changes clearly and speed up revision cycles.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <h3 className="mb-3 font-sans text-lg font-bold">Post-Production QA</h3>
                <p className="text-foreground-500">
                  Document issues at exact timecodes for color correction, audio sync, visual effects, and final
                  delivery. Track fixes across multiple review rounds.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA to Platform */}
      <section className="relative overflow-hidden bg-foreground-50 px-6 py-12">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">
            Explore Kreatli&apos;s Video Feedback Features
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-lg text-foreground-500">
            Learn more about frame-accurate video feedback, annotation tools, and approval workflows in Kreatli.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button as={NextLink} href="/platform/video-feedback" size="lg" className="bg-foreground text-content1">
              Learn About Video Feedback
            </Button>
            <Button as={NextLink} href="/platform/video-annotation" size="lg" variant="bordered">
              Explore Video Annotation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
