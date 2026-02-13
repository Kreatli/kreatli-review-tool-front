import { Button, Card, CardBody, Image } from '@heroui/react';
import NextLink from 'next/link';

import { Icon, IconType } from '../various/Icon';

export const VideoReviewerGuide = () => {
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
      title: 'Upload Your Video for Review',
      description:
        'Upload your video to start the review process. Supports MP4, MOV, and WebM formats. Your video is ready for review in seconds.',
      icon: 'upload',
      image: '/video-annotation-guide/step-1.webp',
      altText: 'Upload video to Kreatli for review',
      imageClassName: 'max-w-4xl',
    },
    {
      step: 2,
      title: 'Navigate to Any Frame',
      description:
        'Use the timeline scrubber to navigate to any moment in the video. Frame-accurate navigation ensures reviewers can comment on the exact moment that needs attention.',
      icon: 'time',
      image: '/video-feedback-tool-guide/step-2-scrub-timeline.png',
      altText: 'Navigate video timeline for frame-accurate review',
      imageClassName: 'max-w-4xl',
    },
    {
      step: 3,
      title: 'Add Comments and Visual Markup',
      description:
        'Leave comments pinned to specific frames. Draw on the video with shapes, arrows, and freehand tools to highlight exactly what needs to change.',
      icon: 'paint',
      image: '/video-annotation-guide/step-3-drawing.png',
      altText: 'Add comments and visual annotations during video review',
      imageClassName: 'max-w-4xl',
    },
    {
      step: 4,
      title: 'Share with Reviewers',
      description:
        'Generate a shareable review link. Clients, stakeholders, and team members can review the video and add their own feedback without creating an account.',
      icon: 'link',
      image: '/video-feedback-tool-guide/step-4-share-link.png',
      altText: 'Share video review link with reviewers',
      imageClassName: 'max-w-4xl',
    },
    {
      step: 5,
      title: 'Approve or Request Changes',
      description:
        'Reviewers can approve the video or request changes. Track approval status, see who approved which version, and maintain a complete audit trail.',
      icon: 'checkCircle',
      image: '/video-annotation-guide/step-5-share-approvals.png',
      altText: 'Approve video or request changes in review workflow',
      imageClassName: 'max-w-4xl',
    },
  ];

  return (
    <div>
      {/* How to Use Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">How to Review Videos Online</h2>
            <p className="mx-auto max-w-3xl text-base text-foreground-500">
              Streamline your video review process with frame-accurate comments, visual annotations, and approval
              workflows—all in your browser.
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
                            alt={item.altText || `${item.title} - Video reviewer screenshot`}
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
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Video Reviewer Features</h2>
            <p className="mx-auto max-w-3xl text-lg text-foreground-500">
              Everything you need to review videos efficiently—from initial feedback to final approval.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Icon icon="time" size={24} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-xl font-bold">Frame-Accurate Review</h3>
                </div>
                <p className="text-foreground-500">
                  Every comment is pinned to an exact frame and timestamp. Jump directly to the moment that needs
                  attention—no more scrubbing through videos to find the right spot.
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
                  Draw directly on video frames to highlight issues. Use shapes, arrows, and freehand tools to
                  communicate changes visually—clearer than text alone.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-3">
                    <Icon icon="link" size={24} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-xl font-bold">Guest Review Links</h3>
                </div>
                <p className="text-foreground-500">
                  Share secure review links with anyone. Clients and stakeholders can review and comment without
                  creating an account—reducing friction in the approval process.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-3">
                    <Icon icon="checkCircle" size={24} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-xl font-bold">Approval Workflows</h3>
                </div>
                <p className="text-foreground-500">
                  Built-in approval system lets reviewers approve or request changes. Track who approved what, when, and
                  maintain a complete audit trail for every version.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-3">
                    <Icon icon="slides" size={24} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-xl font-bold">Version Management</h3>
                </div>
                <p className="text-foreground-500">
                  Upload new versions and compare them side by side. See feedback from previous versions, track changes,
                  and keep a complete revision history.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-3">
                    <Icon icon="group" size={24} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-xl font-bold">Multi-Reviewer Support</h3>
                </div>
                <p className="text-foreground-500">
                  Multiple reviewers can comment simultaneously. See who wrote each comment, filter by reviewer, and
                  consolidate all stakeholder feedback in one place.
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
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Who Uses Video Reviewers?</h2>
            <p className="mx-auto max-w-3xl text-lg text-foreground-500">
              Video reviewers streamline workflows for agencies, production studios, and in-house creative teams.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardBody className="p-6">
                <h3 className="mb-3 font-sans text-lg font-bold">Agencies & Studios</h3>
                <p className="text-foreground-500">
                  Review client deliverables, collect feedback, and get approvals faster. Share review links that work
                  without requiring clients to install software or create accounts.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <h3 className="mb-3 font-sans text-lg font-bold">Post-Production Teams</h3>
                <p className="text-foreground-500">
                  Review edits, color grades, and VFX shots with frame-accurate precision. Document issues at exact
                  timecodes and track fixes across revision rounds.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <h3 className="mb-3 font-sans text-lg font-bold">Marketing Teams</h3>
                <p className="text-foreground-500">
                  Review campaign videos with stakeholders across departments. Consolidate feedback from legal, brand,
                  and creative teams in one place before final delivery.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA to Platform */}
      <section className="relative overflow-hidden bg-foreground-50 px-6 py-12">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Explore Kreatli&apos;s Video Review Features</h2>
          <p className="mx-auto mb-6 max-w-2xl text-lg text-foreground-500">
            Learn more about frame-accurate video review, approval workflows, and team collaboration in Kreatli.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button as={NextLink} href="/platform/review-video" size="lg" className="bg-foreground text-content1">
              Learn About Video Review
            </Button>
            <Button as={NextLink} href="/platform/review-approval" size="lg" variant="bordered">
              Explore Approval Workflows
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
