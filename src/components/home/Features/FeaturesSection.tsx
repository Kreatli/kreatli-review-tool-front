import { ChatFeaturePreview } from './ChatFeaturePreview';
import { CompareFeaturePreview } from './CompareFeaturePreview';
import { Feature } from './Feature';
import { HomeDashboardFeaturePreview } from './HomeDashboardFeaturePreview';
import { ProjectFeaturePreview } from './ProjectFeaturePreview';
import { ReviewToolPreview } from './ReviewToolPreview';
import { ShareFeaturePreview } from './ShareFeaturePreview';

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
            No unnecessary features.
          </h2>
        </div>
        <div className="w-full flex flex-col gap-24 lg:gap-[max(20vh,100px)]">
          <Feature
            icon="paint"
            title="Frame-accurate Revisions"
            description="Pin comments to exact frames and timestamps in your review and approval workflow - no more “which clip?” or lost feedback."
            isReversed={false}
          >
            <ReviewToolPreview />
          </Feature>
          <Feature
            icon="chat"
            title="Conversations, Not Noise"
            description="Project-tied chats, asset-linked comments and guest review links streamline your approval workflow - keep feedback with the asset, not scattered across multiple platforms."
            isReversed={true}
          >
            <ChatFeaturePreview />
          </Feature>
          <Feature
            icon="upload"
            title="Project Management Meets Reliable Media Storage"
            description="Assign files, track deliverables and share heavy media securely - creative production management within the same workspace."
            isReversed={false}
          >
            <ProjectFeaturePreview />
          </Feature>
          <Feature
            icon="compare"
            title="Compare Versions Side-by-Side"
            description="Compare different versions of files side-by-side for creative proofing - spot changes instantly and provide precise feedback in your review workflow."
            isReversed={true}
          >
            <CompareFeaturePreview />
          </Feature>
          <Feature
            icon="share"
            title="Share Files with Anyone"
            description="Generate secure shareable links or send files directly via email for media review and approval - no account required for reviewers."
            isReversed={false}
          >
            <ShareFeaturePreview />
          </Feature>
          <Feature
            icon="slides"
            title="Centralized Project Dashboard"
            description="Everything you need in one place - project overview, media files, team chat, and activity tracking for streamlined creative production management, all accessible from a single dashboard."
            isReversed={true}
          >
            <HomeDashboardFeaturePreview />
          </Feature>
        </div>
      </div>
    </section>
  );
};
