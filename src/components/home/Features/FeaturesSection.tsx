import { ChatFeaturePreview } from './ChatFeaturePreview';
import { CompareFeaturePreview } from './CompareFeaturePreview';
import { Feature } from './Feature';
import { HomeDashboardFeaturePreview } from './HomeDashboardFeaturePreview';
import { ProjectFeaturePreview } from './ProjectFeaturePreview';
import { ReviewToolPreview } from './ReviewToolPreview';
import { ShareFeaturePreview } from './ShareFeaturePreview';
import { StorageFeaturePreview } from './StorageFeaturePreview';

export const FeaturesSection = () => {
  return (
    <section id="product" className="relative scroll-mt-12 px-4 py-16 backdrop-blur-lg sm:px-6 lg:py-24">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 sm:gap-16 lg:gap-20">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-2 text-center sm:gap-6 sm:px-0">
          <h2 className="font-sans text-3xl font-bold sm:text-4xl">
            Built for how video production{' '}
            <span className="relative inline-block">
              <span className="relative z-10">actually</span>
              <span className="absolute -left-1 -right-4 bottom-0 -z-0 h-3 bg-[url(/highlight-line.svg)] bg-contain bg-no-repeat sm:h-4" />
            </span>{' '}
            works
          </h2>
        </div>
        <div className="flex w-full flex-col gap-12 sm:gap-16 md:gap-20 lg:gap-24 xl:gap-[max(20vh,100px)]">
          <Feature
            icon="paint"
            title="Frame-accurate Revisions"
            description='Pin comments to exact frames and timestamps. No more "which clip?" confusion. Every piece of feedback is precisely where it needs to be.'
            isReversed={false}
            linkTo="/platform/review-approval"
            linkText="Explore Review & Approval"
          >
            <ReviewToolPreview />
          </Feature>
          <Feature
            icon="folder"
            title="Secure File Storage & Upload"
            description="Upload files up to 10GB with drag & drop. Track progress in real-time. Encrypted storage keeps your assets safe and accessible when needed."
            isReversed={true}
            linkTo="/platform/secure-asset-storage"
            linkText="Learn about Secure Storage"
          >
            <StorageFeaturePreview />
          </Feature>
          <Feature
            icon="upload"
            title="Project Management Meets Reliable Media Storage"
            description="Organize projects, assign files, and track deliverables in one workspace. Manage heavy media files without leaving your creative workflow."
            isReversed={false}
            linkTo="/platform/project-orchestration"
            linkText="Discover Project Orchestration"
          >
            <ProjectFeaturePreview />
          </Feature>
          <Feature
            icon="compare"
            title="Compare Versions Side-by-Side"
            description="Compare different versions side-by-side for creative proofing. Spot changes instantly and provide precise feedback in your review workflow."
            isReversed={true}
            linkTo="/platform/review-approval"
            linkText="See Review Features"
          >
            <CompareFeaturePreview />
          </Feature>
          <Feature
            icon="chat"
            title="Conversations, Not Noise"
            description="Project-tied chats and asset-linked comments keep feedback organized. Guest review links streamline approvals with no account required."
            isReversed={false}
            linkTo="/platform/creative-workspace"
            linkText="Explore Creative Workspace"
          >
            <ChatFeaturePreview />
          </Feature>
          <Feature
            icon="share"
            title="Share Files with Anyone"
            description="Generate secure shareable links or send files via email. No account required for reviewers to streamline your approval workflow."
            isReversed={true}
            linkTo="/platform/review-approval"
            linkText="Learn about Sharing"
          >
            <ShareFeaturePreview />
          </Feature>
          <Feature
            icon="slides"
            title="Centralized Project Dashboard"
            description="Everything in one place. Project overview, media files, team chat, and activity tracking all accessible from a single dashboard."
            isReversed={false}
            linkTo="/platform/creative-workspace"
            linkText="See the Workspace"
          >
            <HomeDashboardFeaturePreview />
          </Feature>
        </div>
      </div>
    </section>
  );
};
