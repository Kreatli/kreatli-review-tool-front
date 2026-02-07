import {
  PlatformStepGuide,
  VIDEO_ANNOTATION_STEPS,
} from '../shared/PlatformStepGuide';

interface VideoAnnotationGuideProps {
  stepsSectionTitle?: string;
}

export const VideoAnnotationGuide = ({
  stepsSectionTitle = 'How to Use Video Annotation in Kreatli',
}: VideoAnnotationGuideProps = {}) => {
  return (
    <PlatformStepGuide
      stepsSectionTitle={stepsSectionTitle}
      stepsIntro="Follow these steps to add frame-accurate annotations to your videos in Kreatli—from upload to share and approval."
      steps={VIDEO_ANNOTATION_STEPS}
      completeGuide={{
        href: '/guides/how-to-annotate-video',
        description:
          'Learn how to annotate video effectively with frame-accurate comments, drawings, and markup for faster feedback and fewer revisions.',
      }}
    />
  );
};
