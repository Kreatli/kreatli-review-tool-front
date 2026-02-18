/* eslint-disable simple-import-sort/imports */
import { Accordion, AccordionItem, Button, Card, CardBody } from '@heroui/react';
import Head from 'next/head';
import NextLink from 'next/link';

import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';
import { ChatFeaturePreview } from '../../components/home/Features/ChatFeaturePreview';
import { HomeDashboardFeaturePreview } from '../../components/home/Features/HomeDashboardFeaturePreview';
import { StorageFeaturePreview } from '../../components/home/Features/StorageFeaturePreview';
import { FooterSection } from '../../components/home/Footer/FooterSection';
import { Header } from '../../components/layout/Header';
import { Decorations } from '../../components/layout/Storyblok/Decorations';
import { BreadcrumbStructuredData } from '../../components/shared/BreadcrumbStructuredData';
import { PricingSection } from '../../components/home/PricingSection/PricingSection';
import { CTASection } from '../../components/shared/CTASection';
import { FAQStructuredData } from '../../components/shared/FAQStructuredData';
import { MoreFreeToolsSection } from '../../components/shared/MoreFreeToolsSection';
import { RelatedResourcesSection } from '../../components/shared/RelatedResourcesSection';
import { ResourcesArticlesPreviewSection } from '../../components/shared/ResourcesArticlesPreviewSection';
import { Icon } from '../../components/various/Icon';
import { getPlatformArticles } from '../../data/platform-articles';
import { getFreeToolsForPlatform } from '../../data/platform-free-tools';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';

const faqs = [
  {
    question: 'What is a video collaboration workspace?',
    answer:
      "A video collaboration workspace is a unified system that consolidates all video collaboration tools into one place. Kreatli's video collaboration workspace combines project organization, file storage, team communication, asset-linked feedback, and approval workflows in a single platform. Instead of switching between Google Drive, Slack, email, and project management tools, everything happens in one centralized workspace designed specifically for video teams.",
  },
  {
    question: 'How do project-tied conversations work in Kreatli?',
    answer:
      'Project-tied conversations in Kreatli keep all team discussions organized within specific projects. When you create a conversation in a project, it stays linked to that project context, making it easy to find relevant discussions later. Unlike generic chat tools where conversations get lost in channels, project-tied chats ensure context is preserved. Team members can see all project-related conversations in one place, eliminating the need to search through multiple platforms or email threads.',
  },
  {
    question: 'What are asset-linked comments and why are they important?',
    answer:
      'Asset-linked comments are feedback and conversations that are permanently attached to specific files or video assets. In Kreatli, when you comment on a video, image, or document, that comment stays with the file forever—even across versions. This eliminates lost feedback in email threads or chat apps. You can see all comments, approvals, and discussions directly on the asset, making it clear what needs attention and what has been approved. This is crucial for video collaboration workflows where feedback must stay connected to the exact file being reviewed.',
  },
  {
    question: 'How does a unified video collaboration workspace differ from using multiple tools?',
    answer:
      'A unified video collaboration workspace like Kreatli replaces the need for multiple separate tools (Google Drive for storage, Slack for communication, email for approvals, project management tools for tracking). Instead of switching between 4-5 different platforms, everything happens in one place. This eliminates context loss, reduces tool-switching overhead, saves 6-8+ hours weekly, and cuts costs by 40-70% compared to multiple subscriptions. All your projects, files, conversations, and approvals are visible in one centralized dashboard, making it easier to track progress and maintain organization.',
  },
  {
    question: 'Can I organize files by project in the video collaboration workspace?',
    answer:
      "Yes. Kreatli's video collaboration workspace is built around project organization. You can create projects for different clients, campaigns, or productions, and organize all related files, conversations, and team members within each project. Files can be further organized by folders, status (in production, pending review, approved), file type, and custom tags. The centralized dashboard shows project overviews, making it easy to see what's in production, what needs review, and what's been approved across all your projects.",
  },
  {
    question: 'How does the centralized dashboard help video teams?',
    answer:
      'The centralized dashboard in Kreatli provides a single view of all your video work. You can see project status, recent activity, pending approvals, team conversations, and file updates in one place. This eliminates the need to check multiple platforms to understand project status. The dashboard shows what needs attention, tracks progress across projects, and provides visibility into team activity. For video teams managing multiple projects simultaneously, this centralized view is essential for staying organized and meeting deadlines.',
  },
  {
    question: 'Is the video collaboration workspace suitable for remote video teams?',
    answer:
      "Absolutely. Kreatli's video collaboration workspace is designed for distributed video teams. Project-tied conversations and asset-linked comments ensure remote team members stay in context without being in the same room. Real-time notifications keep everyone updated on comments, approvals, and project changes. The unified platform eliminates the confusion of managing work across multiple tools, which is especially important for remote teams who can't rely on in-person communication. All team members, clients, and external collaborators can access the same workspace from anywhere.",
  },
  {
    question: 'How does the video collaboration workspace handle file storage and organization?',
    answer:
      "Kreatli's video collaboration workspace includes secure file storage with drag-and-drop upload, progress tracking, and encrypted storage. Files are organized within projects and can be filtered by status, type, date, and custom tags. Unlike generic cloud storage, files in Kreatli are connected to conversations, approvals, and project context. You can see file versions, approval status, and all related feedback directly on each file. This organization system is built for video collaboration workflows, not adapted from generic file storage solutions.",
  },
  {
    question: 'Can clients access the video collaboration workspace?',
    answer:
      "Yes. Clients and external collaborators can access Kreatli's video collaboration workspace through secure, no-signup guest review links. They can review files, provide feedback through asset-linked comments, approve versions, and participate in project conversations without creating an account. This makes client collaboration seamless while maintaining security and organization. All client feedback stays linked to the specific files and projects, creating a clear audit trail of approvals and comments.",
  },
  {
    question: "What makes Kreatli's video collaboration workspace different from project management tools?",
    answer:
      "Kreatli's video collaboration workspace is built specifically for video collaboration workflows, not adapted from generic project management tools. It tracks status and ownership directly on video files, not just tasks. Asset-linked conversations ensure feedback stays with files. The platform understands video collaboration workflows like version control, frame-accurate video review, and multi-stakeholder approvals. Unlike project management tools that treat video files as attachments, Kreatli treats files as the primary focus, with conversations, approvals, and organization built around them.",
  },
];

export default function CreativeWorkspacePage() {
  useSession();
  const articles = getPlatformArticles('/platform/creative-workspace');

  return (
    <>
      <Head>
        <title>Kreatli | Video Collaboration Workspace</title>
        <meta
          name="description"
          content="Video Collaboration Workspace for video teams. Unified platform with project-tied conversations, asset-linked comments, and centralized dashboards. Streamline video collaboration workflows in one place."
        />
        <link rel="canonical" href="https://kreatli.com/platform/creative-workspace" />
        <meta property="og:url" content="https://kreatli.com/platform/creative-workspace" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Kreatli | Video Collaboration Workspace" />
        <meta
          property="og:description"
          content="Experience a unified video collaboration workspace with project-tied chats, asset-linked conversations, and centralized project dashboards. Everything you need for video collaboration in one place."
        />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:secure_url" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:alt" content="Kreatli | Video Collaboration Workspace" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kreatli | Video Collaboration Workspace" />
        <meta
          name="twitter:description"
          content="Experience a unified video collaboration workspace with project-tied chats, asset-linked conversations, and centralized project dashboards. Everything you need for video collaboration in one place."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
      </Head>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Platform', url: '/platform' },
          { name: 'The Creative Workspace', url: '/platform/creative-workspace' },
        ]}
      />
      <FAQStructuredData faqs={faqs} />
      <Header />
      <Decorations />
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 text-center">
          <h1 className="mx-auto max-w-lg font-sans text-3xl font-bold sm:text-4xl">Video Collaboration Workspace</h1>
          <p className="mx-auto max-w-2xl text-lg text-foreground-500">
            A unified workspace for video teams. Project-tied conversations and asset-linked comments keep your video
            collaboration workflow organized.
          </p>
          <div className="mt-4 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button as={NextLink} href="/sign-up" size="lg" className="bg-foreground text-content1">
              Get Started for Free
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
        </div>
      </section>

      {/* Centralized Dashboard Section */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Centralized Project Dashboard</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Everything you need in one place—project overview, media files, team chat, and activity tracking.
            </p>
          </div>
          <HomeDashboardFeaturePreview />
        </div>
      </section>

      {/* Project-Tied Conversations Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Project-Tied Conversations</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Project-tied chats and asset-linked comments streamline your approval workflow—keep feedback with the
              asset.
            </p>
          </div>
          <ChatFeaturePreview />
        </div>
      </section>

      {/* Storage Upload Section */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Secure File Storage & Upload</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Upload and manage creative assets with drag & drop support, progress tracking, and encrypted storage.
            </p>
          </div>
          <StorageFeaturePreview />
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Key Workspace Features</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Built specifically for video collaboration workflows, not adapted from generic project management tools.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="chat" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Asset-Linked Feedback</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Comments and conversations stay with your files. No more searching through email threads.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="slides" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Project Organization</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Organize files by project, status, type, and more. Find what you need instantly with powerful
                  filtering.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="folder" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Unified Workspace</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  All your projects, files, conversations, and activity in one centralized dashboard. No more
                  tool-switching.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="link" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Context-Rich Communication</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Project-tied chats ensure all conversations stay with the relevant work, eliminating context loss.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="bell" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Real-Time Updates</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Stay in sync with real-time notifications for comments, approvals, and project updates.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="group" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Team Collaboration</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Collaborate seamlessly with team members, clients, and external collaborators in one unified
                  workspace.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Free Tools Section */}
      <MoreFreeToolsSection
        title="Free Tools & Resources"
        description="Access our free calculators and tools to optimize your creative workflow."
        tools={getFreeToolsForPlatform('/platform/creative-workspace')}
      />

      {/* See How It Works Section */}
      <ResourcesArticlesPreviewSection
        articles={articles}
        title="See How This Works in Practice"
        description="Explore real-world workflows and guides that demonstrate these features in action."
      />

      <PricingSection />

      {/* FAQ Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Get detailed answers about Kreatli's unified video collaboration workspace and how it streamlines video
              collaboration workflows.
            </p>
          </div>
          <Accordion variant="splitted" className="gap-2">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.question}
                title={<span className="text-base font-semibold sm:text-lg">{faq.question}</span>}
                className="py-2"
              >
                <div className="text-sm leading-relaxed text-foreground-500 sm:text-base">{faq.answer}</div>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="mx-auto mt-12 flex max-w-3xl flex-col items-center gap-4 text-center">
            <h3 className="font-sans text-xl font-bold">Still Have Questions?</h3>
            <p className="text-foreground-500">
              If you didn't find the answer you were looking for, feel free to contact our support team at{' '}
              <a href="mailto:support@kreatli.com" className="font-medium text-primary underline underline-offset-2">
                support@kreatli.com
              </a>{' '}
              to learn how Kreatli's video collaboration workspace can help your specific workflow.
            </p>
          </div>
        </div>
      </section>

      {/* More Resources Section */}
      <RelatedResourcesSection
        resources={getRelatedResources(['projectOrchestration', 'secureAssetStorage', 'reviewApproval'])}
        title="More Resources"
        description="Explore other Kreatli platform features to streamline your video collaboration workflow."
      />

      {/* CTA Section */}
      <CTASection
        title="Ready to Unify Your Video Collaboration Workspace?"
        description="Experience a platform built specifically for video teams. Streamline your entire video collaboration workflow."
      />
      <FooterSection hideCta={true} />
      <SignUpModal />
    </>
  );
}
