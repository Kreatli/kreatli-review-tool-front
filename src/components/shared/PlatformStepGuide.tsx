import { Button, Card, CardBody, Image } from '@heroui/react';
import NextLink from 'next/link';

import { Icon, IconType } from '../various/Icon';

export interface WorkflowStep {
  step: number;
  title: string;
  description: string;
  icon: string;
  image: string | null;
  altText?: string;
  imageContainerClass?: string;
}

interface PlatformStepGuideProps {
  stepsSectionTitle: string;
  stepsIntro?: string;
  steps: WorkflowStep[];
}

const IMG = '/video-annotation-guide/step';

export const PlatformStepGuide = ({
  stepsSectionTitle,
  stepsIntro = 'Follow these steps in Kreatli—from upload to share and approval.',
  steps,
}: PlatformStepGuideProps) => {
  return (
    <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">{stepsSectionTitle}</h2>
          <p className="mx-auto max-w-2xl text-base text-foreground-500">{stepsIntro}</p>
        </div>

        <div className="flex flex-col gap-6">
          {steps.map((item) => (
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
                      {item.step === steps.length && (
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
                      <div className={`w-full ${item.imageContainerClass ?? 'max-w-4xl'}`}>
                        <div
                          className={`overflow-hidden rounded-2xl border border-foreground-200 bg-content1 shadow-lg ${item.imageContainerClass ? 'max-h-[65vh]' : ''}`}
                        >
                          <Image
                            src={item.image}
                            alt={item.altText ?? item.title}
                            loading="lazy"
                            removeWrapper
                            className={
                              item.imageContainerClass
                                ? 'h-auto w-full max-h-[65vh] object-contain'
                                : 'h-auto w-full object-contain'
                            }
                          />
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
  );
};

/** Steps for the Video Annotation platform page. */
export const VIDEO_ANNOTATION_STEPS: WorkflowStep[] = [
  {
    step: 1,
    title: 'Upload your video in Kreatli',
    description:
      'Sign in to Kreatli, open your project, and upload your video or add an existing asset. Your video is ready for frame-accurate annotation inside the same workflow.',
    icon: 'upload',
    image: `${IMG}-1.webp`,
    altText: 'Kreatli project with video upload, ready for video annotation',
  },
  {
    step: 2,
    title: 'Open the video in the review player',
    description:
      'Open the asset to enter the frame-accurate review and annotation view. The player lets you scrub to any frame and add annotations at precise moments.',
    icon: 'addVideo',
    image: `${IMG}-2.webp`,
    altText: 'Kreatli review player with video open for annotation',
  },
  {
    step: 3,
    title: 'Add frame-accurate annotations',
    description:
      'Add comments, drawings, and shapes pinned to specific frames. Use text comments for feedback, draw on the frame to highlight areas, and use arrows or markers to point to elements.',
    icon: 'paint',
    image: `${IMG}-3.webp`,
    altText: 'Adding frame-accurate comments and drawings on video in Kreatli',
  },
  {
    step: 4,
    title: 'Use the timeline to review and jump to frames',
    description:
      'See all annotations on the timeline and jump to any frame to address feedback. Editors can navigate directly to annotated moments without guessing timestamps.',
    icon: 'time',
    image: `${IMG}-4.webp`,
    altText: 'Timeline view with annotations in Kreatli',
  },
  {
    step: 5,
    title: 'Share for approval or track resolution',
    description:
      'Share a link with reviewers so they can annotate without signing up. Mark annotations as resolved as you address them, and keep everyone aligned on what’s done and what’s pending.',
    icon: 'checkCircle',
    image: `${IMG}-5.webp`,
    altText: 'Sharing and resolution tracking for video annotations in Kreatli',
  },
];

/** Steps for the Add Drawing to Video platform page. */
export const ADD_DRAWING_TO_VIDEO_STEPS: WorkflowStep[] = [
  {
    step: 1,
    title: 'Upload your video in Kreatli',
    description:
      'Sign in to Kreatli, open your project, and upload your video or add an existing asset. Your video is ready for drawing and markup inside the same workflow.',
    icon: 'upload',
    image: `${IMG}-1.webp`,
    altText: 'Kreatli project with video upload, ready to add drawings',
  },
  {
    step: 2,
    title: 'Open the video in the review player',
    description:
      'Open the asset to enter the review player. Scrub to any frame where you want to add arrows, boxes, or freehand drawing.',
    icon: 'addVideo',
    image: `${IMG}-2.webp`,
    altText: 'Kreatli review player with video open for drawing',
  },
  {
    step: 3,
    title: 'Add your drawing to the frame',
    description:
      'Use the drawing tools to add arrows, boxes, highlights, or freehand markup on the frame. Your drawings stay pinned to that exact moment so editors see precisely what to change.',
    icon: 'paint',
    image: '/video-annotation-guide/step-3-drawing.png',
    altText: 'Adding drawings and markup on video in Kreatli',
  },
  {
    step: 4,
    title: 'Use the timeline to review and jump to frames',
    description:
      'See all drawings on the timeline and jump to any frame to address feedback. Editors can navigate directly to annotated moments without guessing timestamps.',
    icon: 'time',
    image: `${IMG}-4.webp`,
    altText: 'Timeline view with drawings in Kreatli',
  },
  {
    step: 5,
    title: 'Share for approval or track resolution',
    description:
      'Share a link with reviewers so they can add their own drawings without signing up. Mark feedback as resolved as you address it, and keep everyone aligned.',
    icon: 'checkCircle',
    image: `${IMG}-5.webp`,
    altText: 'Sharing and resolution tracking for video drawings in Kreatli',
  },
];

/** Steps for the Draw on a Video platform page. */
export const DRAW_ON_VIDEO_STEPS: WorkflowStep[] = [
  {
    step: 1,
    title: 'Upload your video in Kreatli',
    description:
      'Sign in to Kreatli, open your project, and upload your video or add an existing asset. Your video is ready to draw on inside the same workflow.',
    icon: 'upload',
    image: `${IMG}-1.webp`,
    altText: 'Kreatli project with video upload, ready to draw on video',
  },
  {
    step: 2,
    title: 'Open the video in the review player',
    description:
      'Open the asset to enter the review player. Scrub to the frame where you want to draw so your markup is pinned to the right moment.',
    icon: 'addVideo',
    image: `${IMG}-2.webp`,
    altText: 'Kreatli review player with video open',
  },
  {
    step: 3,
    title: 'Draw on the frame',
    description:
      'Draw directly on the video with freehand, shapes, or arrows. Every stroke is pinned to the current frame so editors get precise visual feedback at the exact moment that needs attention.',
    icon: 'paint',
    image: '/video-annotation-guide/step-3-drawing.png',
    altText: 'Drawing on video frame in Kreatli',
  },
  {
    step: 4,
    title: 'Use the timeline to review and jump to frames',
    description:
      'See all drawings on the timeline and jump to any frame to address feedback. Editors can navigate directly to the frames you marked.',
    icon: 'time',
    image: `${IMG}-4.webp`,
    altText: 'Timeline view with drawings in Kreatli',
  },
  {
    step: 5,
    title: 'Share for approval or track resolution',
    description:
      'Share a link with reviewers so they can draw on the video without signing up. Mark feedback as resolved as you address it, and keep everyone aligned.',
    icon: 'checkCircle',
    image: `${IMG}-5.webp`,
    altText: 'Sharing and resolution tracking in Kreatli',
  },
];

/** Steps for the Comment on Video platform page. */
export const COMMENT_ON_VIDEO_STEPS: WorkflowStep[] = [
  {
    step: 1,
    title: 'Upload your video in Kreatli',
    description:
      'Sign in to Kreatli, open your project, and upload your video or add an existing asset. Your video is ready for frame-accurate comments inside the same workflow.',
    icon: 'upload',
    image: `${IMG}-1.webp`,
    altText: 'Kreatli project with video upload, ready for comments',
  },
  {
    step: 2,
    title: 'Open the video in the review player',
    description:
      'Open the asset to enter the review player. Scrub or play to the moment where you want to leave feedback.',
    icon: 'addVideo',
    image: `${IMG}-2.webp`,
    altText: 'Kreatli review player with video open for commenting',
  },
  {
    step: 3,
    title: 'Add a comment at the frame',
    description:
      'Click on the frame or scrub to the right moment, then add your comment. It’s pinned to that exact timestamp so editors know exactly what to change. Add replies and @mentions to keep the conversation in one place.',
    icon: 'chat',
    image: `${IMG}-3.webp`,
    altText: 'Adding frame-accurate comments on video in Kreatli',
  },
  {
    step: 4,
    title: 'Use the timeline to review and jump to frames',
    description:
      'See all comments on the timeline and jump to any frame to address feedback. Editors can navigate directly to the exact moment each comment refers to.',
    icon: 'time',
    image: `${IMG}-4.webp`,
    altText: 'Timeline view with comments in Kreatli',
  },
  {
    step: 5,
    title: 'Share for approval or track resolution',
    description:
      'Share a link with reviewers so they can comment on the video without signing up. Mark comments as resolved as you address them, and keep everyone aligned on what’s done and what’s pending.',
    icon: 'checkCircle',
    image: `${IMG}-5.webp`,
    altText: 'Sharing and resolution tracking for video comments in Kreatli',
  },
];
