import { ChatFeaturePreview } from './ChatFeaturePreview';
import { Feature } from './Feature';
import { ProjectFeaturePreview } from './ProjectFeaturePreview';
import { ReviewToolPreview } from './ReviewToolPreview';

export const FeaturesSection = () => {
  return (
    <section id="features-section" className="relative backdrop-blur-lg scroll-mt-12 px-6 lg:pb-32 py-16">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-16">
        <div className="flex flex-col gap-4 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl font-bold font-sans">Simplify your workflows with Kreatli</h2>
          <p className="text-lg text-foreground-500">
            Everything you need to manage on one platform. From intuitive file organization to real-time file reviews
            and powerful storage. Stay on top of every project update, chat message, and file exchange.
          </p>
        </div>
        <div className="w-full flex flex-col gap-24 lg:gap-[max(20vh,100px)]">
          <Feature
            icon="search"
            title="Never Lose a File Again"
            description="Say goodbye to clutter, endless folders or inboxes. Easily organize and categorize all your files by project, status, or size with Kreatli's intuitive file system."
          >
            <ProjectFeaturePreview />
          </Feature>
          <Feature
            icon="paint"
            title="Real-Time File Review Tool"
            description="Review and edit files in real-time. Comment on and revise documents, videos, and images. No downloading or emailing back and forth - everything stays in one place."
          >
            <ReviewToolPreview />
          </Feature>
          <Feature
            icon="chat"
            title="Crystal Clear Communication"
            description="Never miss an important update or message again. All project milestones, conversations, and file revisions are stored in one shared workspace, ensuring everyone stays on the same page."
          >
            <ChatFeaturePreview />
          </Feature>
        </div>
      </div>
    </section>
  );
};
