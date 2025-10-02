import { ChatFeaturePreview } from './ChatFeaturePreview';
import { Feature } from './Feature';
import { ProjectFeaturePreview } from './ProjectFeaturePreview';
import { ReviewToolPreview } from './ReviewToolPreview';

export const FeaturesSection = () => {
  return (
    <section id="product" className="relative backdrop-blur-lg scroll-mt-12 px-6 lg:pb-32 py-16">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-16">
        <div className="flex flex-col gap-4 max-w-4xl mx-auto sm:text-center">
          <h2 className="text-2xl sm:text-3xl font-bold font-sans">
            Kreatli offers functionality creative teams{' '}
            <span className="relative after:absolute after:-left-1 after:bg-contain after:-right-4 after:h-4 after:-z-10 after:bottom-0 after:bg-no-repeat after:bg-[url(/highlight-line.svg)]">
              actually
            </span>{' '}
            need.{' '}
            <span className="hidden lg:inline">
              <br />
            </span>
            No unnecessary features. All in one place.
          </h2>
        </div>
        <div className="w-full flex flex-col gap-24 lg:gap-[max(20vh,100px)]">
          <Feature
            icon="paint"
            title="Frame-accurate Revisions"
            description="Pin comments to exact frames and timestamps - no more “which clip?” or lost feedback."
          >
            <ReviewToolPreview />
          </Feature>
          <Feature
            icon="chat"
            title="Conversations, Not Noise"
            description="Project-tied chats, asset-linked comments and guest review links - keep feedback with the asset, not scattered across multiple platforms."
          >
            <ChatFeaturePreview />
          </Feature>
          <Feature
            icon="upload"
            title="Project Management Meets Reliable Media Storage"
            description="Assign files, track deliverables and share heavy files securely - within the same workspace."
          >
            <ProjectFeaturePreview />
          </Feature>
        </div>
      </div>
    </section>
  );
};
