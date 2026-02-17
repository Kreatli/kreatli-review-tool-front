import { Button, Card, CardBody, Image } from '@heroui/react';
import NextLink from 'next/link';

import { Icon, IconType } from '../various/Icon';

const IMG = '/video-annotation-guide/step';

export const VideoManagerGuide = () => {
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
      title: 'Create a Project and Upload Your Videos',
      description:
        'Create a project in Kreatli and upload your videos. Files are stored securely with no size limits and are accessible from anywhere. Your video library is ready in one workspace.',
      icon: 'upload',
      image: `${IMG}-1.webp`,
      altText: 'Kreatli project with videos uploaded and stored',
      imageClassName: 'max-w-4xl',
    },
    {
      step: 2,
      title: 'Organize Assets with Folders and Status',
      description:
        'Structure your video library with folders and status labels. Keep raw footage, edits, and exports organized so your team can find what they need without searching through email or drives.',
      icon: 'folder',
      image: '/video-annotation-guide/step-2-manage-videos-folders.png',
      altText: 'Organized video folders and status labels in Kreatli',
      imageClassName: 'max-w-4xl',
    },
    {
      step: 3,
      title: 'Track New Versions and Compare Cuts',
      description:
        'Upload new versions to the same asset and switch between cuts. Version history is tracked so you can compare side by side and see who approved which version.',
      icon: 'time',
      image: '/video-annotation-guide/step-3-manage-videos-versions.png',
      altText: 'Upload new version and version history in Kreatli',
      imageClassName: 'max-w-4xl',
    },
    {
      step: 4,
      title: 'Share Securely with Clients and Stakeholders',
      description:
        'Generate secure share links for videos and projects. Clients can view, comment, and approve without signing up. Control access and revoke links anytime.',
      icon: 'share',
      image: `${IMG}-5.webp`,
      altText: 'Sharing videos securely with clients in Kreatli',
      imageClassName: 'max-w-4xl',
    },
  ];

  return (
    <div>
      {/* How to Use Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">How to Manage Videos Online</h2>
            <p className="mx-auto max-w-3xl text-base text-foreground-500">
              Organize, store, and track all your video assets in one secure workspace—with version control, feedback
              tracking, and client-ready share links.
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
                        {item.step === 4 && (
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
                            alt={item.altText || `${item.title} - Video manager screenshot`}
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
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Video Manager Features</h2>
            <p className="mx-auto max-w-3xl text-lg text-foreground-500">
              Everything you need to manage video assets—from secure storage and organization to version control and
              client sharing.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Icon icon="upload" size={24} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-xl font-bold">Secure Media Storage</h3>
                </div>
                <p className="text-foreground-500">
                  Upload videos of any size to secure cloud storage. No file size limits, no compression—your media is
                  stored reliably and accessible from anywhere.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-success/10 p-3">
                    <Icon icon="folder" size={24} className="text-success" />
                  </div>
                  <h3 className="font-sans text-xl font-bold">Folders & Organization</h3>
                </div>
                <p className="text-foreground-500">
                  Organize videos with folders, subfolders, and status labels. Find what you need quickly without
                  digging through email or shared drives.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-3">
                    <Icon icon="time" size={24} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-xl font-bold">Version Control</h3>
                </div>
                <p className="text-foreground-500">
                  Upload new versions to the same asset. Switch between cuts, compare side by side, and track who
                  approved which version—no more file naming chaos.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-3">
                    <Icon icon="share" size={24} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-xl font-bold">Client Share Links</h3>
                </div>
                <p className="text-foreground-500">
                  Generate secure review links for any video. Clients can watch, comment, and approve without creating
                  an account. Control access and revoke links anytime.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-3">
                    <Icon icon="paint" size={24} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-xl font-bold">Feedback in One Thread</h3>
                </div>
                <p className="text-foreground-500">
                  All feedback on a video lives with the asset. Comments are pinned to frames, tracked as resolved or
                  unresolved, and visible across versions.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-3">
                    <Icon icon="checkCircle" size={24} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-xl font-bold">Approval Tracking</h3>
                </div>
                <p className="text-foreground-500">
                  See approval status at a glance—pending, approved, or changes requested. Track who approved which
                  version and when for a clear audit trail.
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
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Who Uses Video Managers?</h2>
            <p className="mx-auto max-w-3xl text-lg text-foreground-500">
              Video managers streamline workflows for production teams, agencies, and in-house creative teams.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardBody className="p-6">
                <h3 className="mb-3 font-sans text-lg font-bold">Production & Post Teams</h3>
                <p className="text-foreground-500">
                  Organize raw footage, edits, and exports in one place. Track versions, collect frame-accurate
                  feedback, and deliver approved cuts without switching tools.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <h3 className="mb-3 font-sans text-lg font-bold">Agencies & Studios</h3>
                <p className="text-foreground-500">
                  Manage multiple client projects and deliverables. Share review links with clients, track approvals,
                  and keep every version and comment in one workspace.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <h3 className="mb-3 font-sans text-lg font-bold">In-House Creative Teams</h3>
                <p className="text-foreground-500">
                  Store and organize video assets with your team. Assign files, track deliverable status, and get
                  stakeholder approvals without email threads or lost feedback.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA to Platform */}
      <section className="relative overflow-hidden bg-foreground-50 px-6 py-12">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Explore Kreatli&apos;s Video Management</h2>
          <p className="mx-auto mb-6 max-w-2xl text-lg text-foreground-500">
            Learn more about managing videos, version control, and team collaboration in Kreatli.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button as={NextLink} href="/platform/manage-videos" size="lg" className="bg-foreground text-content1">
              Learn About Managing Videos
            </Button>
            <Button as={NextLink} href="/platform/creative-workspace" size="lg" variant="bordered">
              Explore Creative Workspace
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
