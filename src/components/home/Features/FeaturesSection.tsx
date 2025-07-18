import { ChatFeaturePreview } from './ChatFeaturePreview';
import { Feature } from './Feature';
import { ProjectFeaturePreview } from './ProjectFeaturePreview';
import { ReviewToolPreview } from './ReviewToolPreview';

export const FeaturesSection = () => {
  return (
    <section id="features-section" className="relative backdrop-blur-lg scroll-mt-12 px-6 lg:pb-32 py-16">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-16">
        <div className="flex flex-col gap-4 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl font-bold font-sans">Simplify your workflow with Kreatli</h2>
          <p className="text-lg text-foreground-500">
            Kreatli brings everything you need to manage creative projects into one platform. From intuitive file
            organization to real-time file reviews and powerful storage, Kreatli ensures seamless collaboration between
            creators and freelancers. Stay on top of every project update, chat message, and file exchange - all in one
            shared workspace.
          </p>
        </div>
        <div className="w-full flex flex-col gap-24 lg:gap-[max(20vh,100px)]">
          <Feature
            icon="search"
            title="Never Lose a File Again"
            description="Say goodbye to clutter. Easily organize and categorize all your files by project, type, or relevance with Kreatli's intuitive file system. Find exactly what you need in seconds—no more searching through endless folders or inboxes."
          >
            <ProjectFeaturePreview />
          </Feature>
          <Feature
            icon="paint"
            title="Real-Time File Review Tool"
            description="Review files, give feedback, and make updates in real-time. Kreatli's file review tool allows you to comment on and revise documents, videos, and images without needing to download or email back and forth, ensuring seamless collaboration."
          >
            <ReviewToolPreview />
          </Feature>
          <Feature
            icon="chat"
            title="Crystal Clear Communication"
            description="Never miss an important update or message again. With Kreatli, all project milestones, chat conversations, and file changes are stored in one shared workspace, ensuring everyone stays on the same page from start to finish."
          >
            <ChatFeaturePreview />
          </Feature>
        </div>
      </div>
    </section>
  );
};
