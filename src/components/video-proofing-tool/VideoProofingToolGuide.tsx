import { Button, Card, CardBody, Image } from '@heroui/react';
import NextLink from 'next/link';

import { Icon, IconType } from '../various/Icon';

const IMG = '/video-annotation-guide/step';

export const VideoProofingToolGuide = () => {
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
      title: 'Upload Your Video for Proofing',
      description:
        'Upload your video to a Kreatli project. Your file is stored securely with version history so you can track every cut and proofing round.',
      icon: 'upload',
      image: `${IMG}-1.webp`,
      altText: 'Kreatli project with video upload, ready for proofing',
      imageClassName: 'max-w-4xl',
    },
    {
      step: 2,
      title: 'Open the Video in the Proofing Player',
      description:
        'Open the asset to enter the frame-accurate proofing view. Scrub to any frame and add comments at precise moments.',
      icon: 'addVideo',
      image: `${IMG}-2.webp`,
      altText: 'Kreatli proofing player with video open',
      imageClassName: 'max-w-4xl',
    },
    {
      step: 3,
      title: 'Add Frame-Accurate Comments and Annotations',
      description:
        'Add comments, drawings, and shapes pinned to specific frames. Use text for feedback, draw on the frame to highlight areas, and use arrows or markers to point to elements.',
      icon: 'paint',
      image: `${IMG}-3.webp`,
      altText: 'Adding frame-accurate comments and drawings on video in Kreatli',
      imageClassName: 'max-w-4xl',
    },
    {
      step: 4,
      title: 'Use the Timeline to Jump to Frames',
      description:
        'See all comments on the timeline and jump to any frame to address feedback. Editors navigate directly to annotated moments without guessing timestamps.',
      icon: 'time',
      image: `${IMG}-4.webp`,
      altText: 'Timeline view with proofing comments in Kreatli',
      imageClassName: 'max-w-4xl',
    },
    {
      step: 5,
      title: 'Share for Approval or Track Resolution',
      description:
        'Share a proofing link so reviewers can comment without signing up. Mark comments as resolved as you address them and keep everyone aligned on what’s done and what’s pending.',
      icon: 'checkCircle',
      image: `${IMG}-5.webp`,
      altText: 'Sharing and resolution tracking for video proofing in Kreatli',
      imageClassName: 'max-w-4xl',
    },
  ];

  return (
    <div>
      {/* How to Use Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">How to Proof Videos Online</h2>
            <p className="mx-auto max-w-3xl text-base text-foreground-500">
              Frame-accurate proofing with comments, annotations, and approvals—all in your browser. Follow these
              steps to upload your video, collect feedback, and track approvals in one place.
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
                            alt={item.altText || `${item.title} - Video proofing screenshot`}
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
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Video Proofing Tool Features</h2>
            <p className="mx-auto max-w-3xl text-lg text-foreground-500">
              Everything you need to proof videos efficiently—from frame-accurate feedback to final approval.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Icon icon="time" size={24} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-xl font-bold">Frame-Accurate Proofing</h3>
                </div>
                <p className="text-foreground-500">
                  Every comment is pinned to an exact frame and timestamp. Jump directly to the moment that needs
                  attention—no more vague notes like “fix that part around 2 minutes.”
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-success/10 p-3">
                    <Icon icon="paint" size={24} className="text-success" />
                  </div>
                  <h3 className="font-sans text-xl font-bold">Comments and Annotations</h3>
                </div>
                <p className="text-foreground-500">
                  Add text comments, freehand drawings, shapes, arrows, and markers. All feedback is tied to the exact
                  frame so editors know precisely what to change.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-3">
                    <Icon icon="link" size={24} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-xl font-bold">Guest Proofing Links</h3>
                </div>
                <p className="text-foreground-500">
                  Share secure proofing links with clients and stakeholders. They can watch, comment, and approve without
                  creating an account—keeping the approval process fast and friction-free.
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
                  Mark comments as resolved or unresolved. Filter to show only what still needs attention and keep a
                  clear record across proofing rounds until final delivery.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-3">
                    <Icon icon="slides" size={24} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-xl font-bold">Version History</h3>
                </div>
                <p className="text-foreground-500">
                  Upload new versions and track feedback per version. See what’s been addressed and what’s pending
                  across revision rounds.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-3">
                    <Icon icon="group" size={24} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-xl font-bold">Multi-Reviewer Proofing</h3>
                </div>
                <p className="text-foreground-500">
                  Multiple reviewers can proof the same video. See who added which annotation, filter by reviewer, and
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
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Who Uses Video Proofing Tools?</h2>
            <p className="mx-auto max-w-3xl text-lg text-foreground-500">
              Video proofing tools streamline workflows for agencies, post-production teams, and in-house creative
              teams.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardBody className="p-6">
                <h3 className="mb-3 font-sans text-lg font-bold">Agencies & Studios</h3>
                <p className="text-foreground-500">
                  Proof client deliverables with frame-accurate feedback. Share proofing links so clients can approve
                  or request changes without installing software or creating accounts.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <h3 className="mb-3 font-sans text-lg font-bold">Post-Production Teams</h3>
                <p className="text-foreground-500">
                  Proof edits, color grades, and VFX shots with frame-accurate precision. Document issues at exact
                  timecodes and track fixes across revision rounds.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <h3 className="mb-3 font-sans text-lg font-bold">Marketing Teams</h3>
                <p className="text-foreground-500">
                  Proof campaign videos with stakeholders across departments. Consolidate feedback from legal, brand,
                  and creative in one place before final delivery.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA to Platform */}
      <section className="relative overflow-hidden bg-foreground-50 px-6 py-12">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Explore Kreatli&apos;s Video Proofing</h2>
          <p className="mx-auto mb-6 max-w-2xl text-lg text-foreground-500">
            Learn more about frame-accurate video proofing, approval workflows, and team collaboration in Kreatli.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button as={NextLink} href="/platform/video-proofing" size="lg" className="bg-foreground text-content1">
              Learn About Video Proofing
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
