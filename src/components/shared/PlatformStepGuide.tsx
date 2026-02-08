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
  /** When set, shows a "Read Our Complete Guide" section linking to the relevant guide. */
  completeGuide?: {
    href: string;
    description: string;
  };
}

const IMG = '/video-annotation-guide/step';

export const PlatformStepGuide = ({
  stepsSectionTitle,
  stepsIntro = 'Follow these steps in Kreatli—from upload to share and approval.',
  steps,
  completeGuide,
}: PlatformStepGuideProps) => {
  return (
    <>
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
                                  ? 'h-auto max-h-[65vh] w-full object-contain'
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

      {completeGuide && (
        <section className="relative overflow-hidden bg-foreground-50 px-6 py-12">
          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Read Our Complete Guide</h2>
            <p className="mx-auto mb-6 max-w-2xl text-lg text-foreground-500">{completeGuide.description}</p>
            <Button as={NextLink} href={completeGuide.href} size="lg" className="bg-foreground text-content1">
              Read Complete Guide
            </Button>
          </div>
        </section>
      )}
    </>
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

/** Steps for the Free Video Link Generator platform page. */
export const FREE_VIDEO_LINK_GENERATOR_STEPS: WorkflowStep[] = [
  {
    step: 1,
    title: 'Upload your video in Kreatli',
    description:
      'Sign in to Kreatli, open your project, and upload your video. Your file is stored securely with version history so you can generate as many review links as you need.',
    icon: 'upload',
    image: `${IMG}-1.webp`,
    altText: 'Kreatli project with video upload, ready to generate a link',
  },
  {
    step: 2,
    title: 'Generate a shareable video link',
    description:
      'Open the asset and create a secure review link. You can generate links for different stakeholders or review rounds—each link opens the video in the browser with no download or account required.',
    icon: 'link',
    image: '/video-annotation-guide/step-2-share-link.png',
    altText: 'Generate shareable video review link in Kreatli',
  },
  {
    step: 3,
    title: 'Share the link with clients or collaborators',
    description:
      'Send the link by email, Slack, or any channel. Recipients click once to watch the video and leave frame-accurate comments—no sign-up or app install.',
    icon: 'group',
    image: '/video-annotation-guide/step-3-share-modal.png',
    altText: 'Share File modal: copy link or send via email in Kreatli',
  },
  {
    step: 4,
    title: 'See feedback on the timeline',
    description:
      'All comments and feedback appear on the timeline. Jump to any moment, track what’s resolved, and keep every review round in one place.',
    icon: 'time',
    image: `${IMG}-4.webp`,
    altText: 'Timeline with feedback in Kreatli',
  },
  {
    step: 5,
    title: 'Track approvals and versions',
    description:
      'See who’s approved which version and revoke or update link access anytime. Every link stays tied to the right project and file version.',
    icon: 'checkCircle',
    image: '/video-annotation-guide/step-5-share-approvals.png',
    altText: 'Track approvals and upload new version in Kreatli',
  },
];

/** Steps for the Share Your Video platform page. */
export const SHARE_VIDEO_STEPS: WorkflowStep[] = [
  {
    step: 1,
    title: 'Upload your video in Kreatli',
    description:
      'Sign in to Kreatli, open your project, and upload your video once. Your original stays safely stored with version history and access controls.',
    icon: 'upload',
    image: `${IMG}-1.webp`,
    altText: 'Kreatli project with video upload, ready to share',
  },
  {
    step: 2,
    title: 'Generate a share video link',
    description:
      'Turn any file into a clean, secure share link. Skip WeTransfer folders and bulky email attachments—one link gives clients a simple player in their browser.',
    icon: 'link',
    image: '/video-annotation-guide/step-2-share-link.png',
    altText: 'Generate share video link in Kreatli',
  },
  {
    step: 3,
    title: 'Share your video with stakeholders',
    description:
      'Send the link to clients, producers, or internal teams. They open it in their browser and can watch, comment, and approve without creating an account.',
    icon: 'group',
    image: '/video-annotation-guide/step-3-share-modal.png',
    altText: 'Share File modal: copy link or send via email in Kreatli',
  },
  {
    step: 4,
    title: 'Collect frame-accurate feedback',
    description:
      'Reviewers leave comments pinned to exact frames. See all feedback on the timeline and jump to any moment that needs attention.',
    icon: 'time',
    image: `${IMG}-4.webp`,
    altText: 'Timeline with feedback in Kreatli',
  },
  {
    step: 5,
    title: 'Track approvals and versions',
    description:
      'Mark comments resolved, see which version was approved, and share new cuts to the same people. You stay in control of who can view or comment.',
    icon: 'checkCircle',
    image: '/video-annotation-guide/step-5-share-approvals.png',
    altText: 'Track approvals and upload new version in Kreatli',
  },
];

/** Steps for the Send Your Video platform page. */
export const SEND_VIDEO_STEPS: WorkflowStep[] = [
  {
    step: 1,
    title: 'Upload your video in Kreatli',
    description:
      'Sign in to Kreatli, open your project, and upload your video once. Your file is stored securely so you can send a link instead of heavy attachments.',
    icon: 'upload',
    image: `${IMG}-1.webp`,
    altText: 'Kreatli project with video upload, ready to send',
  },
  {
    step: 2,
    title: 'Get a link to send your video',
    description:
      'Generate a secure link for the video. No WeTransfer or large email attachments—send the link and recipients open it in their browser.',
    icon: 'link',
    image: '/video-annotation-guide/step-2-share-link.png',
    altText: 'Get send-video link in Kreatli',
  },
  {
    step: 3,
    title: 'Send the link to your client or team',
    description:
      'Email, Slack, or share the link any way you like. Recipients click to watch and leave frame-accurate comments—no account or download required.',
    icon: 'group',
    image: '/video-annotation-guide/step-3-share-modal.png',
    altText: 'Share File modal: copy link or send via email in Kreatli',
  },
  {
    step: 4,
    title: 'See feedback on the timeline',
    description:
      'All comments appear on the timeline. Jump to the exact frame, track what’s resolved, and keep the conversation in one place.',
    icon: 'time',
    image: `${IMG}-4.webp`,
    altText: 'Timeline with feedback in Kreatli',
  },
  {
    step: 5,
    title: 'Track approvals or update access',
    description:
      'See who’s approved, mark feedback resolved, and send new versions to the same people. Revoke or update access anytime.',
    icon: 'checkCircle',
    image: '/video-annotation-guide/step-5-share-approvals.png',
    altText: 'Track approvals and upload new version in Kreatli',
  },
];

/** Steps for the Share MP4 Files platform page. */
export const SHARE_MP4_STEPS: WorkflowStep[] = [
  {
    step: 1,
    title: 'Upload your MP4 in Kreatli',
    description:
      'Sign in to Kreatli, open your project, and upload your MP4 once. Your file stays safely stored with version history and access controls.',
    icon: 'upload',
    image: `${IMG}-1.webp`,
    altText: 'Kreatli project with MP4 upload, ready to share',
  },
  {
    step: 2,
    title: 'Generate a share link for your MP4',
    description:
      'Turn any MP4 into a clean, secure share link. Skip WeTransfer and large attachments—one link lets clients watch in their browser.',
    icon: 'link',
    image: '/video-annotation-guide/step-2-share-link.png',
    altText: 'Generate MP4 share link in Kreatli',
  },
  {
    step: 3,
    title: 'Share your MP4 with stakeholders',
    description:
      'Send the link to clients, producers, or internal teams. They open it and can watch, comment, and approve without downloading or creating an account.',
    icon: 'group',
    image: '/video-annotation-guide/step-3-share-modal.png',
    altText: 'Share File modal: copy link or send via email in Kreatli',
  },
  {
    step: 4,
    title: 'Collect frame-accurate feedback',
    description:
      'Reviewers leave comments pinned to exact frames. See all feedback on the timeline and jump to any moment that needs attention.',
    icon: 'time',
    image: `${IMG}-4.webp`,
    altText: 'Timeline with feedback in Kreatli',
  },
  {
    step: 5,
    title: 'Track approvals and versions',
    description:
      'Mark comments resolved, see which version was approved, and share new MP4 cuts to the same people. You control who can view or comment.',
    icon: 'checkCircle',
    image: '/video-annotation-guide/step-5-share-approvals.png',
    altText: 'Track approvals and upload new version for shared MP4 in Kreatli',
  },
];

/** Steps for the Annotate PDF platform page. */
export const ANNOTATE_PDF_STEPS: WorkflowStep[] = [
  {
    step: 1,
    title: 'Upload your PDF in Kreatli',
    description:
      'Sign in to Kreatli, open your project, and upload your PDF. Your file is stored with version history so you can annotate and share for review in one place.',
    icon: 'upload',
    image: `${IMG}-1.webp`,
    altText: 'Kreatli project with PDF upload, ready to annotate',
  },
  {
    step: 2,
    title: 'Open the PDF in the review interface',
    description:
      'Open the asset to enter the review view. Navigate page by page and click or select any area where you want to add comments, highlights, or drawings.',
    icon: 'addVideo',
    image: '/video-annotation-guide/step-2-doc.png',
    altText: 'Kreatli Media view with PDF in project, open in review',
  },
  {
    step: 3,
    title: 'Add annotations on the PDF',
    description:
      'Add comments pinned to exact spots, use highlights and shapes to mark regions, and draw or use arrows to point to elements. All feedback stays tied to the right page and position.',
    icon: 'paint',
    image: '/video-annotation-guide/step-3-doc.png',
    altText: 'Adding annotations on PDF in Kreatli',
  },
  {
    step: 4,
    title: 'See all feedback and jump to spots',
    description:
      'View all annotations in one place, filter by reviewer, and jump to any comment or markup. Track what’s resolved and what still needs attention.',
    icon: 'time',
    image: '/video-annotation-guide/step-4-doc.png',
    altText: 'Feedback and annotations on PDF in Kreatli',
  },
  {
    step: 5,
    title: 'Share for approval or track resolution',
    description:
      'Share a review link so clients can annotate without signing up. Mark comments resolved as you address them and upload new versions when needed.',
    icon: 'checkCircle',
    image: '/video-annotation-guide/step-5-doc.png',
    altText: 'Share and track PDF annotations in Kreatli',
  },
];

/** Steps for the Add Comments to PDF platform page. */
export const ADD_COMMENTS_TO_PDF_STEPS: WorkflowStep[] = [
  {
    step: 1,
    title: 'Upload your PDF in Kreatli',
    description:
      'Sign in to Kreatli, open your project, and upload your PDF. Your file is stored with version history so you can add comments and share for review.',
    icon: 'upload',
    image: `${IMG}-1.webp`,
    altText: 'Kreatli project with PDF upload, ready for comments',
  },
  {
    step: 2,
    title: 'Open the PDF in the review interface',
    description:
      'Open the asset to enter the review view. Navigate to the page and click the spot where you want to leave feedback.',
    icon: 'addVideo',
    image: '/video-annotation-guide/step-2-doc.png',
    altText: 'Kreatli Media view with PDF in project, open in review',
  },
  {
    step: 3,
    title: 'Add a comment at the spot',
    description:
      'Click or select the location, then type your comment. It’s pinned to that exact position. Add replies and @mentions to keep the conversation in one place.',
    icon: 'chat',
    image: '/video-annotation-guide/step-3-doc.png',
    altText: 'Adding comments on PDF in Kreatli',
  },
  {
    step: 4,
    title: 'See all comments and jump to spots',
    description:
      'View all comments in one place, filter by reviewer, and jump to any comment. Track what’s resolved and what still needs attention.',
    icon: 'time',
    image: '/video-annotation-guide/step-4-doc.png',
    altText: 'Comments on PDF in Kreatli',
  },
  {
    step: 5,
    title: 'Share for approval or track resolution',
    description:
      'Share a review link so clients can add comments without signing up. Mark comments resolved as you address them and upload new versions when needed.',
    icon: 'checkCircle',
    image: '/video-annotation-guide/step-5-doc.png',
    altText: 'Share and track PDF comments in Kreatli',
  },
];

/** Steps for the Annotate Image platform page. */
export const ANNOTATE_IMAGE_STEPS: WorkflowStep[] = [
  {
    step: 1,
    title: 'Upload your image in Kreatli',
    description:
      'Sign in to Kreatli, open your project, and upload your image (JPG, PNG, GIF, WebP, etc.). Your file is stored with version history so you can annotate and share for review.',
    icon: 'upload',
    image: `${IMG}-1.webp`,
    altText: 'Kreatli project with image upload, ready to annotate',
  },
  {
    step: 2,
    title: 'Open the image in the review interface',
    description:
      'Open the asset to enter the review view. Click or select any area on the image where you want to add comments, highlights, or drawings.',
    icon: 'addVideo',
    image: '/video-annotation-guide/step-2-doc.png',
    altText: 'Kreatli Media view with image in project, open in review',
  },
  {
    step: 3,
    title: 'Add annotations on the image',
    description:
      'Add comments pinned to exact spots, use highlights and shapes to mark regions, and draw or use arrows to point to elements. All feedback stays tied to the right position.',
    icon: 'paint',
    image: '/video-annotation-guide/step-3-doc.png',
    altText: 'Adding annotations on image in Kreatli',
  },
  {
    step: 4,
    title: 'See all feedback and jump to spots',
    description:
      'View all annotations in one place, filter by reviewer, and jump to any comment or markup. Track what’s resolved and what still needs attention.',
    icon: 'time',
    image: '/video-annotation-guide/step-4-doc.png',
    altText: 'Feedback and annotations on image in Kreatli',
  },
  {
    step: 5,
    title: 'Share for approval or track resolution',
    description:
      'Share a review link so clients can annotate without signing up. Mark comments resolved as you address them and upload new versions when needed.',
    icon: 'checkCircle',
    image: '/video-annotation-guide/step-5-doc.png',
    altText: 'Share and track image annotations in Kreatli',
  },
];

/** Steps for the Draw on Image platform page. */
export const DRAW_ON_IMAGE_STEPS: WorkflowStep[] = [
  {
    step: 1,
    title: 'Upload your image in Kreatli',
    description:
      'Sign in to Kreatli, open your project, and upload your image. Your file is stored with version history so you can draw on it and share for review.',
    icon: 'upload',
    image: `${IMG}-1.webp`,
    altText: 'Kreatli project with image upload, ready to draw on',
  },
  {
    step: 2,
    title: 'Open the image in the review interface',
    description:
      'Open the asset to enter the review view. You’ll draw directly on the image so your markup is pinned to the right spot.',
    icon: 'addVideo',
    image: '/video-annotation-guide/step-2-doc.png',
    altText: 'Kreatli Media view with image in project, open in review',
  },
  {
    step: 3,
    title: 'Draw on the image',
    description:
      'Use freehand, shapes, or arrows to circle, highlight, or point to areas that need attention. Every stroke is pinned to the image so designers see precisely what to change.',
    icon: 'paint',
    image: '/video-annotation-guide/step-3-doc.png',
    altText: 'Drawing on image in Kreatli',
  },
  {
    step: 4,
    title: 'See all feedback and jump to spots',
    description:
      'View all drawings and comments in one place, filter by reviewer, and jump to any markup. Track what’s resolved and what still needs attention.',
    icon: 'time',
    image: '/video-annotation-guide/step-4-doc.png',
    altText: 'Drawings on image in Kreatli',
  },
  {
    step: 5,
    title: 'Share for approval or track resolution',
    description:
      'Share a review link so clients can draw on the image without signing up. Mark feedback resolved as you address it and upload new versions when needed.',
    icon: 'checkCircle',
    image: '/video-annotation-guide/step-5-doc.png',
    altText: 'Share and track image drawings in Kreatli',
  },
];

/** Steps for the Draw on Documents platform page. */
export const DRAW_ON_DOCUMENTS_STEPS: WorkflowStep[] = [
  {
    step: 1,
    title: 'Upload your document in Kreatli',
    description:
      'Sign in to Kreatli, open your project, and upload your document (e.g. PDF). Your file is stored with version history so you can draw on it and share for review.',
    icon: 'upload',
    image: `${IMG}-1.webp`,
    altText: 'Kreatli project with document upload, ready to draw on',
  },
  {
    step: 2,
    title: 'Open the document in the review interface',
    description:
      'Open the asset to enter the review view. Navigate page by page and draw on the exact spot that needs attention.',
    icon: 'addVideo',
    image: '/video-annotation-guide/step-2-doc.png',
    altText: 'Kreatli Media view with document in project, open in review',
  },
  {
    step: 3,
    title: 'Draw on the document',
    description:
      'Use freehand, shapes, or arrows to circle, highlight, or point to areas on the page. Every stroke is pinned to that location so designers and writers see precisely what to change.',
    icon: 'paint',
    image: '/video-annotation-guide/step-3-doc.png',
    altText: 'Drawing on document in Kreatli',
  },
  {
    step: 4,
    title: 'See all feedback and jump to spots',
    description:
      'View all drawings and comments in one place, filter by reviewer, and jump to any markup. Track what’s resolved and what still needs attention.',
    icon: 'time',
    image: '/video-annotation-guide/step-4-doc.png',
    altText: 'Drawings on document in Kreatli',
  },
  {
    step: 5,
    title: 'Share for approval or track resolution',
    description:
      'Share a review link so clients can draw on the document without signing up. Mark feedback resolved as you address it and upload new versions when needed.',
    icon: 'checkCircle',
    image: '/video-annotation-guide/step-5-doc.png',
    altText: 'Share and track document drawings in Kreatli',
  },
];

/** Steps for the Draw on PDF Document platform page. */
export const DRAW_ON_PDF_DOCUMENT_STEPS: WorkflowStep[] = [
  {
    step: 1,
    title: 'Upload your PDF in Kreatli',
    description:
      'Sign in to Kreatli, open your project, and upload your PDF. Your file is stored with version history so you can draw on it and share for review.',
    icon: 'upload',
    image: `${IMG}-1.webp`,
    altText: 'Kreatli project with PDF upload, ready to draw on',
  },
  {
    step: 2,
    title: 'Open the PDF in the review interface',
    description:
      'Open the asset to enter the review view. Navigate page by page and draw on the exact spot that needs attention.',
    icon: 'addVideo',
    image: '/video-annotation-guide/step-2-doc.png',
    altText: 'Kreatli Media view with PDF in project, open in review',
  },
  {
    step: 3,
    title: 'Draw on the PDF',
    description:
      'Use freehand, shapes, or arrows to circle, highlight, or point to areas on the page. Every stroke is pinned to that location so designers and writers see precisely what to change.',
    icon: 'paint',
    image: '/video-annotation-guide/step-3-doc.png',
    altText: 'Drawing on PDF in Kreatli',
  },
  {
    step: 4,
    title: 'See all feedback and jump to spots',
    description:
      'View all drawings and comments in one place, filter by reviewer, and jump to any markup. Track what’s resolved and what still needs attention.',
    icon: 'time',
    image: '/video-annotation-guide/step-4-doc.png',
    altText: 'Drawings on PDF in Kreatli',
  },
  {
    step: 5,
    title: 'Share for approval or track resolution',
    description:
      'Share a review link so clients can draw on the PDF without signing up. Mark feedback resolved as you address it and upload new versions when needed.',
    icon: 'checkCircle',
    image: '/video-annotation-guide/step-5-doc.png',
    altText: 'Share and track PDF drawings in Kreatli',
  },
];

/** Steps for the Annotate Document platform page. */
export const ANNOTATE_DOCUMENT_STEPS: WorkflowStep[] = [
  {
    step: 1,
    title: 'Upload your document in Kreatli',
    description:
      'Sign in to Kreatli, open your project, and upload your document (e.g. a PDF). Your file is stored with version history so you can annotate and share for review.',
    icon: 'upload',
    image: `${IMG}-1.webp`,
    altText: 'Kreatli project with document upload, ready to annotate',
  },
  {
    step: 2,
    title: 'Open the document in the review interface',
    description:
      'Open the asset to enter the review view. Navigate page by page and click or select any area where you want to add comments, highlights, or drawings.',
    icon: 'addVideo',
    image: '/video-annotation-guide/step-2-doc.png',
    altText: 'Kreatli Media view with document in project, open in review',
  },
  {
    step: 3,
    title: 'Add annotations on the document',
    description:
      'Add comments pinned to exact spots, use highlights and shapes to mark regions, and draw or use arrows to point to elements. All feedback stays tied to the right page and position.',
    icon: 'paint',
    image: '/video-annotation-guide/step-3-doc.png',
    altText: 'Adding annotations on document in Kreatli',
  },
  {
    step: 4,
    title: 'See all feedback and jump to spots',
    description:
      'View all annotations in one place, filter by reviewer, and jump to any comment or markup. Track what’s resolved and what still needs attention.',
    icon: 'time',
    image: '/video-annotation-guide/step-4-doc.png',
    altText: 'Feedback and annotations on document in Kreatli',
  },
  {
    step: 5,
    title: 'Share for approval or track resolution',
    description:
      'Share a review link so clients can annotate without signing up. Mark comments resolved as you address them and upload new versions when needed.',
    icon: 'checkCircle',
    image: '/video-annotation-guide/step-5-doc.png',
    altText: 'Share and track document annotations in Kreatli',
  },
];

const PDF_VER_IMG = '/pdf-version-control-guide';

/** Steps for the PDF Version Control platform page (upload new version, versions dropdown, compare). */
export const PDF_VERSION_CONTROL_STEPS: WorkflowStep[] = [
  {
    step: 1,
    title: 'Upload your PDF to a Kreatli project',
    description:
      'Sign in to Kreatli, open your project, and upload your first PDF. The file appears in the Media view and becomes version 1 (v1). You can add new versions anytime from the same asset.',
    icon: 'upload',
    image: `${IMG}-1.webp`,
    altText: 'Kreatli project with PDF uploaded',
  },
  {
    step: 2,
    title: 'Open the 3-dot menu and upload a new version',
    description:
      'In the Media view, open the 3-dot menu (⋯) on the PDF and choose Upload new version. The new file is added to the same asset as the next version (v2, v3, etc.) so all drafts stay in one place with full history. You can also choose Manage versions from the same menu.',
    icon: 'checkCircle',
    image: `${PDF_VER_IMG}/step-2-pdf-versioning-versions.png`,
    altText: 'Open file menu and choose Upload new version in Kreatli Media view',
  },
  {
    step: 3,
    title: 'Switch versions from the Versions dropdown',
    description:
      'Open the PDF in the review view and use the Versions dropdown in the header to see all versions with filenames and sizes. Click a version to switch, or use Manage to reorder, set the Active version, and manage the full version stack.',
    icon: 'addVideo',
    image: `${PDF_VER_IMG}/step-3-pdf-versioning-upload.png`,
    altText: 'Versions dropdown with version list and Manage in Kreatli',
  },
  {
    step: 4,
    title: 'Compare two PDF versions side by side',
    description:
      'Select two PDF versions in the Media view and click Compare to open them side by side. Each version shows its filename, size, status, and a preview so you can spot changes and track feedback per version.',
    icon: 'compare',
    image: `${PDF_VER_IMG}/step-4-pdf-versioning-compare.png`,
    altText: 'Compare two PDF versions side by side in Kreatli',
  },
];

/** Steps for the Compare PDF Files platform page. */
export const COMPARE_PDF_FILES_STEPS: WorkflowStep[] = [
  {
    step: 1,
    title: 'Upload both PDF versions in Kreatli',
    description:
      'Sign in to Kreatli, open your project, and upload both PDF versions (draft and revised, or any two you need to compare). Both files live in the same project so you can review them together.',
    icon: 'upload',
    image: `${IMG}-1.webp`,
    altText: 'Kreatli project with PDFs uploaded for comparison',
  },
  {
    step: 2,
    title: 'Select both PDFs and click Compare',
    description:
      'In the Media view, select the two PDF versions you want to compare (use the checkboxes on each file). With both selected, click the Compare button to open them side by side in the review interface.',
    icon: 'addVideo',
    image: '/video-annotation-guide/step-2-compare.png',
    altText: 'Select two PDFs in Media view and click Compare in Kreatli',
  },
  {
    step: 3,
    title: 'Compare all feedback side by side',
    description:
      'View both PDFs side by side with the comments panel. See feedback on either version, add comments and annotations pinned to the exact page and spot, and track what’s resolved across both files.',
    icon: 'compare',
    image: '/video-annotation-guide/step-3-compare.png',
    altText: 'Compare PDFs side by side with feedback in Kreatli',
  },
  {
    step: 4,
    title: 'Upload new versions to keep the review going',
    description:
      'When you’re ready to share an updated PDF, open the file menu (⋯) and choose Upload new version. The new file appears in the same project so you can compare it with the previous version and track resolution.',
    icon: 'checkCircle',
    image: '/video-annotation-guide/step-4-compare.png',
    altText: 'Upload new version from the file menu in Kreatli',
  },
];

/** Steps for the Compare Videos platform page. */
export const COMPARE_VIDEOS_STEPS: WorkflowStep[] = [
  {
    step: 1,
    title: 'Upload both video versions in Kreatli',
    description:
      'Sign in to Kreatli, open your project, and upload both video versions (rough and revised cut, or any two you need to compare). Both files live in the same project so you can review them together.',
    icon: 'upload',
    image: `${IMG}-1.webp`,
    altText: 'Kreatli project with videos uploaded for comparison',
  },
  {
    step: 2,
    title: 'Select both videos and click Compare',
    description:
      'In the Media view, select the two video versions you want to compare (use the checkboxes on each file). With both selected, click the Compare button to open them side by side in the review interface.',
    icon: 'addVideo',
    image: '/video-annotation-guide/step-2-compare-videos.png',
    altText: 'Select two videos in Media view and click Compare in Kreatli',
  },
  {
    step: 3,
    title: 'Compare all feedback side by side',
    description:
      'View both videos side by side with synced timelines—playback stays in sync so you can spot frame-level differences. Use the comments panel to see feedback on either version, add frame-accurate comments and annotations, and track what’s resolved across both files.',
    icon: 'compare',
    image: '/video-annotation-guide/step-3-compare-videos.png',
    altText: 'Compare videos side by side with synced timelines and feedback in Kreatli',
  },
  {
    step: 4,
    title: 'Upload new versions to keep the review going',
    description:
      'When you’re ready to share an updated video, open the file menu (⋯) and choose Upload new version. The new file appears in the same project so you can compare it with the previous version and track resolution.',
    icon: 'checkCircle',
    image: '/video-annotation-guide/step-4-compare-videos.png',
    altText: 'Upload new version from the file menu in Kreatli',
  },
];

const VIDEO_VER_IMG = '/video-annotation-guide';

/** Steps for the Video Versioning platform page (versions panel, upload new version, compare). */
export const VIDEO_VERSIONING_STEPS: WorkflowStep[] = [
  {
    step: 1,
    title: 'Upload your video to a Kreatli project',
    description:
      'Sign in to Kreatli, open your project, and upload your first video. The file appears in the Media view and becomes version 1 (v1). You can add new versions anytime from the same asset.',
    icon: 'upload',
    image: `${IMG}-1.webp`,
    altText: 'Kreatli project with video uploaded',
  },
  {
    step: 2,
    title: 'Open the 3-dot menu and upload a new version',
    description:
      'In the Media view, open the 3-dot menu (⋯) on the video and choose Upload new version. The new file is added to the same asset as the next version (v2, v3, etc.) so all cuts stay in one place with full history.',
    icon: 'checkCircle',
    image: `${VIDEO_VER_IMG}/step-2-video-versioning-versions.png`,
    altText: 'Open file menu and choose Upload new version in Kreatli Media view',
  },
  {
    step: 3,
    title: 'Manage the version stack',
    description:
      'Open the version stack from the header (click the version label, e.g. v1) or via Manage versions in the file menu. See all versions with thumbnails and file sizes, reorder by dragging, set which version is Active, and switch between versions from one place.',
    icon: 'addVideo',
    image: `${VIDEO_VER_IMG}/step-3-video-versioning-upload.png`,
    altText: 'Versions panel with version list and Manage in Kreatli',
  },
  {
    step: 4,
    title: 'Compare two versions side by side',
    description:
      'Select two video versions in the Media view and click Compare to open them side by side. Each version shows its filename, size, status, and a preview with playback controls so you can spot frame-level differences and track feedback per version.',
    icon: 'compare',
    image: `${VIDEO_VER_IMG}/step-4-video-versioning-compare.png`,
    altText: 'Compare two video versions side by side in Kreatli',
  },
];

/** Steps for the Compare Documents Online platform page. */
export const COMPARE_DOCUMENTS_ONLINE_STEPS: WorkflowStep[] = [
  {
    step: 1,
    title: 'Upload both document versions in Kreatli',
    description:
      'Sign in to Kreatli, open your project, and upload both document versions (e.g. draft and revised PDFs). Both files live in the same project so you can review them together.',
    icon: 'upload',
    image: `${IMG}-1.webp`,
    altText: 'Kreatli project with documents uploaded for comparison',
  },
  {
    step: 2,
    title: 'Select both documents and click Compare',
    description:
      'In the Media view, select the two document versions you want to compare (use the checkboxes on each file). With both selected, click the Compare button to open them side by side in the review interface.',
    icon: 'addVideo',
    image: '/video-annotation-guide/step-2-compare.png',
    altText: 'Select two documents in Media view and click Compare in Kreatli',
  },
  {
    step: 3,
    title: 'Compare all feedback side by side',
    description:
      'View both documents side by side with the comments panel. See feedback on either version, add comments and annotations pinned to the exact page and spot, and track what’s resolved across both files.',
    icon: 'compare',
    image: '/video-annotation-guide/step-3-compare.png',
    altText: 'Compare documents side by side with feedback in Kreatli',
  },
  {
    step: 4,
    title: 'Upload new versions to keep the review going',
    description:
      'When you’re ready to share an updated document, open the file menu (⋯) and choose Upload new version. The new file appears in the same project so you can compare it with the previous version and track resolution.',
    icon: 'checkCircle',
    image: '/video-annotation-guide/step-4-compare.png',
    altText: 'Upload new version from the file menu in Kreatli',
  },
];
