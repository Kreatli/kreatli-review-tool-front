import { Button, Card, CardBody, Image } from '@heroui/react';
import NextLink from 'next/link';

import { Icon, IconType } from '../various/Icon';

const IMG = '/video-annotation-guide/step';

export const ImageReviewerGuide = () => {
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
      title: 'Upload Your Image for Review',
      description:
        'Upload your image to start the review process. Supports JPG, PNG, GIF, and WebP. Your image is ready for review in seconds.',
      icon: 'upload',
      image: `${IMG}-1.webp`,
      altText: 'Kreatli project with image upload, ready to review',
      imageClassName: 'max-w-4xl',
    },
    {
      step: 2,
      title: 'Open the Image in the Review Interface',
      description:
        'Open the asset to enter the review view. Click or select any area on the image where you want to add comments, highlights, or drawings.',
      icon: 'panorama',
      image: '/video-annotation-guide/step-2-doc.png',
      altText: 'Kreatli Media view with image in project, open for review',
      imageClassName: 'max-w-4xl',
    },
    {
      step: 3,
      title: 'Add Comments and Visual Markup',
      description:
        'Leave comments pinned to specific spots. Use highlights, shapes, arrows, and freehand drawing to mark exactly what needs to change.',
      icon: 'paint',
      image: '/video-annotation-guide/step-3-doc.png',
      altText: 'Adding annotations on image in Kreatli',
      imageClassName: 'max-w-4xl',
    },
    {
      step: 4,
      title: 'Share with Reviewers',
      description:
        'Generate a shareable review link. Clients, stakeholders, and team members can open the image and add their own feedback without creating an account.',
      icon: 'link',
      image: '/video-annotation-guide/step-4-doc.png',
      altText: 'Feedback and annotations on image in Kreatli',
      imageClassName: 'max-w-4xl',
    },
    {
      step: 5,
      title: 'Approve or Request Changes',
      description:
        'Reviewers can approve the image or request changes. Track approval status, see who approved which version, and maintain a complete audit trail.',
      icon: 'checkCircle',
      image: '/video-annotation-guide/step-5-doc.png',
      altText: 'Share and track image review in Kreatli',
      imageClassName: 'max-w-4xl',
    },
  ];

  return (
    <div>
      {/* How to Use Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">How to Review Images Online</h2>
            <p className="mx-auto max-w-3xl text-base text-foreground-500">
              Streamline your image review process with location-pinned comments, visual annotations, and approval
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
                            alt={item.altText || `${item.title} - Image reviewer screenshot`}
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
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Image Reviewer Features</h2>
            <p className="mx-auto max-w-3xl text-lg text-foreground-500">
              Everything you need to review images efficiently—from location-pinned feedback to final approval.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Icon icon="panorama" size={24} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-xl font-bold">Location-Pinned Comments</h3>
                </div>
                <p className="text-foreground-500">
                  Every comment is tied to the exact spot on the image. Designers and stakeholders see precisely what
                  to change—no more guessing which area you mean.
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
                  Highlight regions, draw shapes, add arrows, and use freehand markup directly on the image. Communicate
                  changes visually for clearer feedback than text alone.
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
                  Reviewers can approve or request changes. Track who approved what, when, and maintain a complete audit
                  trail for every version.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-3">
                    <Icon icon="slides" size={24} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-xl font-bold">Resolution Tracking</h3>
                </div>
                <p className="text-foreground-500">
                  Mark comments as resolved or unresolved. Filter to show only what still needs attention and keep a
                  clear record across review rounds.
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
                  Multiple reviewers can comment on the same image. See who wrote each comment, filter by reviewer, and
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
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Who Uses Image Reviewers?</h2>
            <p className="mx-auto max-w-3xl text-lg text-foreground-500">
              Image reviewers streamline workflows for creative teams, agencies, and design studios.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardBody className="p-6">
                <h3 className="mb-3 font-sans text-lg font-bold">Agencies & Studios</h3>
                <p className="text-foreground-500">
                  Review photos, graphics, and creative assets with clients. Share review links so clients can add
                  feedback without installing software or creating accounts.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <h3 className="mb-3 font-sans text-lg font-bold">Marketing & Brand Teams</h3>
                <p className="text-foreground-500">
                  Review campaign visuals, social assets, and brand imagery with stakeholders. Consolidate feedback from
                  legal, brand, and creative in one place before final approval.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <h3 className="mb-3 font-sans text-lg font-bold">Design & Photo</h3>
                <p className="text-foreground-500">
                  Review images with location-pinned comments and visual markup. Designers and photographers see
                  exactly what to change, reducing revision cycles and missed feedback.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA to Platform */}
      <section className="relative overflow-hidden bg-foreground-50 px-6 py-12">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Explore Kreatli&apos;s Image Review Features</h2>
          <p className="mx-auto mb-6 max-w-2xl text-lg text-foreground-500">
            Learn more about image annotation, review, and approval workflows in Kreatli.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button as={NextLink} href="/platform/annotate-image" size="lg" className="bg-foreground text-content1">
              Learn About Image Annotation
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
