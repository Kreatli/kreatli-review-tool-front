/* eslint-disable max-len */
import { Accordion, AccordionItem, Button, Card, CardBody } from '@heroui/react';
import Head from 'next/head';
import NextLink from 'next/link';

import { SignUpModal } from '../components/auth/SignUpForm/SignUpModal';
import { FooterSection } from '../components/home/Footer/FooterSection';
import { Header } from '../components/layout/Header';
import { Decorations } from '../components/layout/Storyblok/Decorations';
import { BreadcrumbStructuredData } from '../components/shared/BreadcrumbStructuredData';
import { FAQStructuredData } from '../components/shared/FAQStructuredData';
import { Icon, IconType } from '../components/various/Icon';
import { PLATFORM_PAGES } from '../data/platform-pages';
import { useSession } from '../hooks/useSession';

const additionalFeatures = [
  {
    icon: 'folder',
    title: 'Smart File Organization',
    description:
      'Organize files by project, status, type, and more. Powerful filtering and search help you find what you need instantly.',
  },
  {
    icon: 'link',
    title: 'Secure Guest Links',
    description:
      'Share review links with clients and collaborators without requiring signups. Password protection and access controls included.',
  },
  {
    icon: 'share',
    title: 'Version History',
    description:
      'Track all changes with comprehensive version history. Never lose your work and easily revert to previous versions.',
  },
  {
    icon: 'shield',
    title: 'Enterprise Security',
    description:
      'Enterprise-level encryption, secure file sharing, and compliance-ready security features for sensitive creative work.',
  },
  {
    icon: 'upload',
    title: 'Cloud Storage Integration',
    description: 'Connect Google Drive and Dropbox. Upload directly or sync existing files from your cloud storage.',
  },
  {
    icon: 'bell',
    title: 'Real-time Notifications',
    description:
      'Get instant alerts for comments, approvals, and project updates. Stay in sync without constant checking.',
  },
];

const faqs = [
  {
    question: 'How does frame-accurate video review and approval work in Kreatli?',
    answer:
      "Kreatli's frame-accurate review feature allows you to pin comments, annotations, and feedback to exact frames and timestamps in video files. When reviewing a video, you can click on any specific frame to add a comment that's permanently linked to that moment in the timeline. This eliminates confusion about which clip or scene you're referring to. The system supports frame-accurate revisions for video files, meaning reviewers can provide precise feedback like 'change the color at 00:02:15' or 'add transition between frames 1,234-1,236.' This level of precision is essential for video production teams who need to communicate exact edit points without ambiguity. All frame-accurate comments are integrated into your video review and approval workflow, allowing editors to see exactly where changes are needed and mark revisions as complete once addressed. This streamlines the video collaboration process by reducing back-and-forth communication.",
  },
  {
    question: 'What is a video review and approval workflow, and how does Kreatli handle it?',
    answer:
      "A video review and approval workflow is the process video teams use to review, provide feedback, and get final approval on video assets and related media. Kreatli streamlines this entire process in one platform. In Kreatli, the review workflow works like this: First, you upload your media files to a project. Then, you can invite team members, clients, or stakeholders to review the files. Reviewers can add comments, annotations, and feedback directly on the media. The system tracks all feedback and allows project managers to see the approval status of each asset. The platform supports both internal team reviews and client approval processes. You can set up guest review links that don't require signups, making it easy for clients to participate in the approval workflow. All comments and approvals are tracked, so you always know the status of each deliverable in your video collaboration pipeline.",
  },
  {
    question: 'How does creative proofing work in Kreatli compared to other tools?',
    answer:
      "Creative proofing in Kreatli combines visual annotation tools with version comparison capabilities. When proofing designs, images, or videos, you can add precise annotations, comments, and markup directly on the media. The platform's side-by-side comparison feature lets you compare different versions of files to spot changes instantly. Unlike generic proofing tools, Kreatli's video proofing is integrated with your entire video collaboration workflow. All proofing feedback is linked to specific assets and projects, making it easy to track what needs to be changed and ensuring nothing gets lost in translation. The system supports both frame-accurate proofing for videos (where you can mark specific frames) and pixel-accurate proofing for images and designs. This level of precision is crucial for video teams who need to communicate exact changes to editors, designers, or other team members.",
  },
  {
    question: 'How does Kreatli organize and manage creative files and assets?',
    answer:
      "Kreatli provides smart file organization that's specifically designed for video collaboration workflows. Files can be organized by project, status, file type, size, and custom tags. The platform supports filtering and search functionality to help you quickly find any asset, even in large projects with hundreds of files. The system maintains comprehensive version history for all files, so you can track changes over time and revert to previous versions if needed. Files are automatically organized within project folders, and you can create custom folder structures that match your team's workflow. Unlike basic file storage solutions, Kreatli's file organization is integrated with video review workflows, project management, and collaboration features. This means files are always connected to their associated projects, conversations, and approval status, making it easy to see the full context of any asset in your video collaboration system.",
  },
  {
    question: "How does team collaboration work in Kreatli's video production platform?",
    answer:
      'Kreatli enables collaboration through multiple integrated features. Project-tied chats keep all conversations organized by project, so team discussions stay with the relevant work. Asset-linked comments ensure feedback is always connected to the specific file being discussed, eliminating confusion about which asset a comment refers to. The platform supports real-time collaboration where multiple team members can review and comment on the same file simultaneously. Guest review links allow clients and external collaborators to participate in the video review and approval process without requiring accounts, making it easy to include stakeholders in your video collaboration workflow. All collaboration happens within the context of your video collaboration system, so conversations, feedback, and approvals are all tracked and visible to the team. This reduces tool-switching and keeps everything in one place, from initial planning through final delivery.',
  },
  {
    question: 'Can clients and external reviewers use Kreatli without creating an account?',
    answer:
      "Yes, Kreatli supports no-signup guest reviews through secure shareable links. You can generate a review link for any file or project and share it with clients, stakeholders, or external collaborators. They can access the review interface, add comments, and participate in the approval workflow without needing to create an account. Guest review links can be password-protected for additional security, and you can set expiration dates and access controls. This makes it easy to include clients in your video review and approval process while maintaining control over who can access your video assets. External reviewers see a clean, branded interface focused on reviewing and providing feedback. They can add comments, annotations, and approvals just like team members, but without the complexity of project management features they don't need. This streamlined experience improves client participation in your video collaboration workflow.",
  },
  {
    question: 'How does the side-by-side version comparison feature work?',
    answer:
      "Kreatli's version comparison feature allows you to view different versions of the same file side-by-side in a split-screen interface. This is particularly useful for creative proofing, as you can instantly spot changes between versions and provide precise feedback on what's different. The comparison tool works for videos, images, and design files. For videos, you can compare different cuts or edits frame-by-frame. For images and designs, you can see pixel-level differences between versions. This helps reviewers quickly identify what changed and provide accurate feedback in your review workflow. When comparing versions, you can add comments that reference specific differences, making it clear to creators what needs to be adjusted. This feature is integrated with the approval workflow, so you can approve or request changes directly from the comparison view, streamlining your video collaboration process.",
  },
  {
    question: 'What security features does Kreatli offer for video files?',
    answer:
      'Kreatli provides enterprise-level security features designed for sensitive video work. All files are encrypted both in transit and at rest, ensuring your video assets are protected. The platform supports secure file sharing with password-protected links and access controls. You can set granular permissions for team members, controlling who can view, comment, approve, or download files. Guest review links can be configured with expiration dates and access restrictions, giving you control over external collaboration while maintaining security. The platform is compliance-ready and designed to meet security standards required for handling confidential video work, client materials, and proprietary content. This makes it suitable for agencies and production companies that need to protect sensitive video assets throughout the video review and approval process.',
  },
  {
    question: 'What cloud storage and integration options does Kreatli support?',
    answer:
      "Kreatli integrates with popular cloud storage services including Google Drive and Dropbox. You can connect your existing cloud storage accounts and either upload files directly to Kreatli or sync existing files from your cloud storage. This integration means you don't have to abandon your existing file storage solutions. You can continue using Google Drive or Dropbox for general file storage while leveraging Kreatli's specialized features for video collaboration, video review, and approval workflows. The platform also supports direct file uploads, so you can work entirely within Kreatli if preferred. Whether you're syncing from cloud storage or uploading directly, all files benefit from Kreatli's organization, review, and collaboration features that are specifically designed for video collaboration workflows.",
  },
  {
    question: 'How does Kreatli compare to using Frame.io, Slack, or email for creative review?',
    answer:
      'Kreatli combines the best aspects of specialized review tools like Frame.io with project management and collaboration features that tools like Slack provide, all in one integrated platform. Unlike Frame.io, which focuses solely on video review, Kreatli includes comprehensive project management, file organization, and team collaboration features. Compared to using Slack or email for creative review, Kreatli provides frame-accurate commenting, asset-linked conversations, and structured approval workflows that keep feedback organized and actionable. Email chains and Slack threads can lose context, but Kreatli ensures all feedback is permanently linked to the specific asset and frame being discussed. The key advantage is that Kreatli eliminates tool-switching. Instead of using Frame.io for review, Slack for communication, and separate tools for project management, everything is integrated in one Video Collaboration & Review Platform. This reduces context switching, improves workflow efficiency, and ensures nothing falls through the cracks in your video review and approval process.',
  },
  {
    question: 'What types of creative projects and workflows is Kreatli best suited for?',
    answer:
      "Kreatli is designed for any video workflow that involves video review, approval processes, and team collaboration. It's particularly well-suited for video production teams who need frame-accurate feedback, video agencies managing client approvals, and content creators coordinating with editors and collaborators. The platform excels in workflows that require structured review and approval processes, such as client video projects, video asset creation, marketing campaign video production, and any video work where multiple stakeholders need to provide feedback and give approvals. The integrated video collaboration features make it ideal for teams that need to track deliverables, manage project timelines, and coordinate between internal team members and external clients. Kreatli is also valuable for teams currently juggling multiple tools - if you're using separate platforms for file storage, video review, project management, and team communication, Kreatli can consolidate these into one streamlined Video Collaboration & Review Platform with integrated video review and approval workflows.",
  },
  {
    question: "How do real-time notifications work in Kreatli's video production platform?",
    answer:
      "Kreatli provides real-time notifications for important events in your video collaboration workflow, including new comments, approval requests, project updates, and file uploads. These notifications help team members stay in sync without constantly checking the platform. Notifications are contextual and linked to specific assets and projects, so you can quickly understand what needs your attention. When someone adds a comment on a video you're working on, requests approval for a design, or uploads a new version, you'll be notified immediately. The notification system is integrated with the video review and approval workflow, ensuring that approvals and feedback requests don't get missed. This keeps your video collaboration process moving forward efficiently, as team members and clients are promptly notified when their input is needed in the video review and approval process.",
  },
];

export default function PlatformPage() {
  useSession();

  return (
    <>
      <Head>
        <title>Kreatli | Video Collaboration & Review Platform</title>
        <meta
          name="description"
          content="Video Collaboration & Review Platform for video teams. Frame-accurate video review, asset-linked conversations, and video collaboration workflows. Built for video production teams."
        />
        <link rel="canonical" href="https://kreatli.com/platform" />
        <meta property="og:url" content="https://kreatli.com/platform" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Kreatli | Video Collaboration & Review Platform" />
        <meta
          property="og:description"
          content="Built for video collaboration workflows with frame-accurate video review, asset-linked conversations, and end-to-end video collaboration in a single platform."
        />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:secure_url" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:alt" content="Kreatli | Video Collaboration & Review Platform" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kreatli | Video Collaboration & Review Platform" />
        <meta
          name="twitter:description"
          content="Built for video collaboration workflows with frame-accurate video review, asset-linked conversations, and end-to-end video collaboration in a single platform."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
      </Head>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Platform', url: '/platform' },
        ]}
      />
      <FAQStructuredData faqs={faqs} />
      <Header />
      <Decorations />
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto max-w-6xl text-center">
          <h1 className="mx-auto max-w-lg font-sans text-3xl font-bold sm:text-4xl">
            Video Collaboration & Review Platform
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-foreground-500">
            Get frame-accurate video review, asset-linked conversations, and video collaboration workflows all in one
            place. Built specifically for video teams.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
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
        </div>
      </section>
      {/* Platform Features Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Platform Features</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Explore our core platform features designed for video collaboration and creative production workflows.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PLATFORM_PAGES.map((page) => {
              // Map each page to an appropriate icon
              const iconMap: Record<string, IconType> = {
                'The Creative Workspace': 'slides',
                'Review & Approval': 'compare',
                'Project Orchestration': 'folder',
                'Video Annotation': 'monitorPlay',
                'Add Drawing To Video': 'paint',
                'Free Video Link Generator': 'link',
                'Share Video': 'share',
                'Embed Video': 'monitorPlay',
                'Secure Asset Storage': 'shield',
                Integrations: 'link',
              };
              const pageIcon = iconMap[page.label] || 'infoCircle';

              return (
                <Card
                  key={page.href}
                  as={NextLink}
                  href={page.href}
                  isPressable
                  className="group h-full border border-foreground-200 bg-content1 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-xl hover:shadow-primary/20"
                >
                  <CardBody className="flex h-full flex-col gap-4 p-6">
                    <div className="mb-2 flex items-start gap-4">
                      <div className="flex-shrink-0 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 p-3 transition-all duration-300 group-hover:scale-110 group-hover:from-primary/30 group-hover:to-primary/20">
                        <Icon icon={pageIcon} size={24} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="mb-1 font-sans text-lg font-semibold leading-tight transition-colors duration-200 group-hover:text-primary">
                          {page.label}
                        </h3>
                        <p className="text-sm leading-relaxed text-foreground-500">{page.description}</p>
                      </div>
                      <div className="flex-shrink-0 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                        <Icon icon="arrowRight" size={20} className="text-primary" />
                      </div>
                    </div>
                    <div className="mt-auto flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span>Learn more</span>
                    </div>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-6 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">
              Everything you need for video collaboration
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Powerful features designed specifically for video collaboration workflows, video review and approval, and
              team collaboration.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {additionalFeatures.map((feature, index) => (
              <Card
                key={index}
                className="group h-full border border-foreground-200 bg-content1 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-xl hover:shadow-primary/20"
              >
                <CardBody className="flex h-full flex-col gap-4 p-6">
                  <div className="mb-2 flex items-start gap-4">
                    <div className="flex-shrink-0 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 p-3 transition-all duration-300 group-hover:scale-110 group-hover:from-primary/30 group-hover:to-primary/20">
                      <Icon icon={feature.icon as IconType} size={24} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-1 font-sans text-lg font-semibold leading-tight transition-colors duration-200 group-hover:text-primary">
                        {feature.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-foreground-500">{feature.description}</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button as={NextLink} href="/sign-up" size="lg" className="bg-foreground text-content1">
              Start for Free{' '}
            </Button>
            <Button
              as="a"
              href="https://calendar.app.google/NXbAeTAUwaBGh5x49"
              target="_blank"
              size="lg"
              variant="bordered"
            >
              Book a Demo
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="flex flex-col gap-16 px-6 py-16 backdrop-blur-lg lg:py-32">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
          <div className="text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Get detailed answers about how Kreatli's features work and how they can improve your video collaboration
              workflow.
            </p>
          </div>
          <Accordion variant="splitted">
            <AccordionItem
              key="frame-accurate"
              title={
                <span className="text-base font-semibold">
                  How does frame-accurate video review and approval work in Kreatli?
                </span>
              }
            >
              <div className="space-y-3 text-foreground-500">
                <p>
                  Kreatli's frame-accurate review feature allows you to pin comments, annotations, and feedback to exact
                  frames and timestamps in video files. When reviewing a video, you can click on any specific frame to
                  add a comment that's permanently linked to that moment in the timeline. This eliminates confusion
                  about which clip or scene you're referring to.
                </p>
                <p>
                  The system supports frame-accurate revisions for video files, meaning reviewers can provide precise
                  feedback like "change the color at 00:02:15" or "add transition between frames 1,234-1,236." This
                  level of precision is essential for video production teams who need to communicate exact edit points
                  without ambiguity.
                </p>
                <p>
                  All frame-accurate comments are integrated into your video review and approval workflow, allowing
                  editors to see exactly where changes are needed and mark revisions as complete once addressed. This
                  streamlines the video collaboration process by reducing back-and-forth communication.
                </p>
              </div>
            </AccordionItem>

            <AccordionItem
              key="review-workflow"
              title={
                <span className="text-base font-semibold">
                  What is a video review and approval workflow, and how does Kreatli handle it?
                </span>
              }
            >
              <div className="space-y-3 text-foreground-500">
                <p>
                  A video review and approval workflow is the process video teams use to review, provide feedback, and
                  get final approval on video assets and related media. Kreatli streamlines this entire process in one
                  platform.
                </p>
                <p>
                  In Kreatli, the review workflow works like this: First, you upload your media files to a project.
                  Then, you can invite team members, clients, or stakeholders to review the files. Reviewers can add
                  comments, annotations, and feedback directly on the media. The system tracks all feedback and allows
                  project managers to see the approval status of each asset.
                </p>
                <p>
                  The platform supports both internal team reviews and client approval processes. You can set up guest
                  review links that don't require signups, making it easy for clients to participate in the approval
                  workflow. All comments and approvals are tracked, so you always know the status of each deliverable in
                  your video collaboration pipeline.
                </p>
              </div>
            </AccordionItem>

            <AccordionItem
              key="creative-proofing"
              title={
                <span className="text-base font-semibold">
                  How does creative proofing work in Kreatli compared to other tools?
                </span>
              }
            >
              <div className="space-y-3 text-foreground-500">
                <p>
                  Creative proofing in Kreatli combines visual annotation tools with version comparison capabilities.
                  When proofing designs, images, or videos, you can add precise annotations, comments, and markup
                  directly on the media. The platform's side-by-side comparison feature lets you compare different
                  versions of files to spot changes instantly.
                </p>
                <p>
                  Unlike generic proofing tools, Kreatli's video proofing is integrated with your entire video
                  collaboration workflow. All proofing feedback is linked to specific assets and projects, making it
                  easy to track what needs to be changed and ensuring nothing gets lost in translation.
                </p>
                <p>
                  The system supports both frame-accurate proofing for videos (where you can mark specific frames) and
                  pixel-accurate proofing for images and designs. This level of precision is crucial for video teams who
                  need to communicate exact changes to editors, designers, or other team members.
                </p>
              </div>
            </AccordionItem>

            <AccordionItem
              key="file-organization"
              title={
                <span className="text-base font-semibold">
                  How does Kreatli organize and manage creative files and assets?
                </span>
              }
            >
              <div className="space-y-3 text-foreground-500">
                <p>
                  Kreatli provides smart file organization that's specifically designed for video collaboration
                  workflows. Files can be organized by project, status, file type, size, and custom tags. The platform
                  supports filtering and search functionality to help you quickly find any asset, even in large projects
                  with hundreds of files.
                </p>
                <p>
                  The system maintains comprehensive version history for all files, so you can track changes over time
                  and revert to previous versions if needed. Files are automatically organized within project folders,
                  and you can create custom folder structures that match your team's workflow.
                </p>
                <p>
                  Unlike basic file storage solutions, Kreatli's file organization is integrated with video review
                  workflows, project management, and collaboration features. This means files are always connected to
                  their associated projects, conversations, and approval status, making it easy to see the full context
                  of any asset in your video collaboration system.
                </p>
              </div>
            </AccordionItem>

            <AccordionItem
              key="collaboration"
              title={
                <span className="text-base font-semibold">
                  How does team collaboration work in Kreatli's video production platform?
                </span>
              }
            >
              <div className="space-y-3 text-foreground-500">
                <p>
                  Kreatli enables collaboration through multiple integrated features. Project-tied chats keep all
                  conversations organized by project, so team discussions stay with the relevant work. Asset-linked
                  comments ensure feedback is always connected to the specific file being discussed, eliminating
                  confusion about which asset a comment refers to.
                </p>
                <p>
                  The platform supports real-time collaboration where multiple team members can review and comment on
                  the same file simultaneously. Guest review links allow clients and external collaborators to
                  participate in the video review and approval process without requiring accounts, making it easy to
                  include stakeholders in your video collaboration workflow.
                </p>
                <p>
                  All collaboration happens within the context of your video collaboration system, so conversations,
                  feedback, and approvals are all tracked and visible to the team. This reduces tool-switching and keeps
                  everything in one place, from initial planning through final delivery.
                </p>
              </div>
            </AccordionItem>

            <AccordionItem
              key="guest-reviews"
              title={
                <span className="text-base font-semibold">
                  Can clients and external reviewers use Kreatli without creating an account?
                </span>
              }
            >
              <div className="space-y-3 text-foreground-500">
                <p>
                  Yes, Kreatli supports no-signup guest reviews through secure shareable links. You can generate a
                  review link for any file or project and share it with clients, stakeholders, or external
                  collaborators. They can access the review interface, add comments, and participate in the approval
                  workflow without needing to create an account.
                </p>
                <p>
                  Guest review links can be password-protected for additional security, and you can set expiration dates
                  and access controls. This makes it easy to include clients in your video review and approval process
                  while maintaining control over who can access your video assets.
                </p>
                <p>
                  External reviewers see a clean, branded interface focused on reviewing and providing feedback. They
                  can add comments, annotations, and approvals just like team members, but without the complexity of
                  project management features they don't need. This streamlined experience improves client participation
                  in your video collaboration workflow.
                </p>
              </div>
            </AccordionItem>

            <AccordionItem
              key="version-comparison"
              title={
                <span className="text-base font-semibold">
                  How does the side-by-side version comparison feature work?
                </span>
              }
            >
              <div className="space-y-3 text-foreground-500">
                <p>
                  Kreatli's version comparison feature allows you to view different versions of the same file
                  side-by-side in a split-screen interface. This is particularly useful for creative proofing, as you
                  can instantly spot changes between versions and provide precise feedback on what's different.
                </p>
                <p>
                  The comparison tool works for videos, images, and design files. For videos, you can compare different
                  cuts or edits frame-by-frame. For images and designs, you can see pixel-level differences between
                  versions. This helps reviewers quickly identify what changed and provide accurate feedback in your
                  review workflow.
                </p>
                <p>
                  When comparing versions, you can add comments that reference specific differences, making it clear to
                  creators what needs to be adjusted. This feature is integrated with the approval workflow, so you can
                  approve or request changes directly from the comparison view, streamlining your video collaboration
                  process.
                </p>
              </div>
            </AccordionItem>

            <AccordionItem
              key="security"
              title={
                <span className="text-base font-semibold">
                  What security features does Kreatli offer for video files?
                </span>
              }
            >
              <div className="space-y-3 text-foreground-500">
                <p>
                  Kreatli provides enterprise-level security features designed for sensitive video work. All files are
                  encrypted both in transit and at rest, ensuring your video assets are protected. The platform supports
                  secure file sharing with password-protected links and access controls.
                </p>
                <p>
                  You can set granular permissions for team members, controlling who can view, comment, approve, or
                  download files. Guest review links can be configured with expiration dates and access restrictions,
                  giving you control over external collaboration while maintaining security.
                </p>
                <p>
                  The platform is compliance-ready and designed to meet security standards required for handling
                  confidential video work, client materials, and proprietary content. This makes it suitable for
                  agencies and production companies that need to protect sensitive video assets throughout the video
                  review and approval process.
                </p>
              </div>
            </AccordionItem>

            <AccordionItem
              key="integrations"
              title={
                <span className="text-base font-semibold">
                  What cloud storage and integration options does Kreatli support?
                </span>
              }
            >
              <div className="space-y-3 text-foreground-500">
                <p>
                  Kreatli integrates with popular cloud storage services including Google Drive and Dropbox. You can
                  connect your existing cloud storage accounts and either upload files directly to Kreatli or sync
                  existing files from your cloud storage.
                </p>
                <p>
                  This integration means you don't have to abandon your existing file storage solutions. You can
                  continue using Google Drive or Dropbox for general file storage while leveraging Kreatli's specialized
                  features for video collaboration, video review, and approval workflows.
                </p>
                <p>
                  The platform also supports direct file uploads, so you can work entirely within Kreatli if preferred.
                  Whether you're syncing from cloud storage or uploading directly, all files benefit from Kreatli's
                  organization, review, and collaboration features that are specifically designed for video
                  collaboration workflows.
                </p>
              </div>
            </AccordionItem>

            <AccordionItem
              key="vs-alternatives"
              title={
                <span className="text-base font-semibold">
                  How does Kreatli compare to using Frame.io, Slack, or email for creative review?
                </span>
              }
            >
              <div className="space-y-3 text-foreground-500">
                <p>
                  Kreatli combines the best aspects of specialized review tools like Frame.io with project management
                  and collaboration features that tools like Slack provide, all in one integrated platform. Unlike
                  Frame.io, which focuses solely on video review, Kreatli includes comprehensive project management,
                  file organization, and team collaboration features.
                </p>
                <p>
                  Compared to using Slack or email for creative review, Kreatli provides frame-accurate commenting,
                  asset-linked conversations, and structured approval workflows that keep feedback organized and
                  actionable. Email chains and Slack threads can lose context, but Kreatli ensures all feedback is
                  permanently linked to the specific asset and frame being discussed.
                </p>
                <p>
                  The key advantage is that Kreatli eliminates tool-switching. Instead of using Frame.io for review,
                  Slack for communication, and separate tools for project management, everything is integrated in one
                  Video Collaboration & Review Platform. This reduces context switching, improves workflow efficiency,
                  and ensures nothing falls through the cracks in your video review and approval process.
                </p>
              </div>
            </AccordionItem>

            <AccordionItem
              key="use-cases"
              title={
                <span className="text-base font-semibold">
                  What types of creative projects and workflows is Kreatli best suited for?
                </span>
              }
            >
              <div className="space-y-3 text-foreground-500">
                <p>
                  Kreatli is designed for any video workflow that involves video review, approval processes, and team
                  collaboration. It's particularly well-suited for video production teams who need frame-accurate
                  feedback, video agencies managing client approvals, and content creators coordinating with editors and
                  collaborators.
                </p>
                <p>
                  The platform excels in workflows that require structured review and approval processes, such as client
                  video projects, video asset creation, marketing campaign video production, and any video work where
                  multiple stakeholders need to provide feedback and give approvals. The integrated video collaboration
                  features make it ideal for teams that need to track deliverables, manage project timelines, and
                  coordinate between internal team members and external clients.
                </p>
                <p>
                  Kreatli is also valuable for teams currently juggling multiple tools - if you're using separate
                  platforms for file storage, video review, project management, and team communication, Kreatli can
                  consolidate these into one streamlined Video Collaboration & Review Platform with integrated video
                  review and approval workflows.
                </p>
              </div>
            </AccordionItem>

            <AccordionItem
              key="notifications"
              title={
                <span className="text-base font-semibold">
                  How do real-time notifications work in Kreatli's video production platform?
                </span>
              }
            >
              <div className="space-y-3 text-foreground-500">
                <p>
                  Kreatli provides real-time notifications for important events in your video collaboration workflow,
                  including new comments, approval requests, project updates, and file uploads. These notifications help
                  team members stay in sync without constantly checking the platform.
                </p>
                <p>
                  Notifications are contextual and linked to specific assets and projects, so you can quickly understand
                  what needs your attention. When someone adds a comment on a video you're working on, requests approval
                  for a design, or uploads a new version, you'll be notified immediately.
                </p>
                <p>
                  The notification system is integrated with the video review and approval workflow, ensuring that
                  approvals and feedback requests don't get missed. This keeps your video collaboration process moving
                  forward efficiently, as team members and clients are promptly notified when their input is needed in
                  the video review and approval process.
                </p>
              </div>
            </AccordionItem>
          </Accordion>
          <div className="mx-auto mt-8 flex max-w-3xl flex-col items-center gap-4 text-center">
            <h3 className="font-sans text-xl font-bold">Still Have Questions About Features?</h3>
            <p className="text-foreground-500">
              If you didn't find the answer you were looking for, feel free to contact our support team at{' '}
              <a href="mailto:support@kreatli.com" className="text-primary underline underline-offset-2">
                support@kreatli.com
              </a>{' '}
              for more detailed answers about Kreatli's features and capabilities.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="overflow-hidden bg-foreground-50 px-6 py-16 lg:py-24">
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col gap-6 text-center">
          <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">
            Ready to streamline your video collaboration workflow?
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-foreground-500">
            Start using Kreatli today and experience the difference of a platform built specifically for video teams.
          </p>
          <div className="mt-4 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button as={NextLink} href="/sign-up" size="lg" className="bg-foreground text-content1">
              Get Started for Free
            </Button>
            <Button
              as="a"
              href="https://calendar.app.google/NXbAeTAUwaBGh5x49"
              target="_blank"
              size="lg"
              variant="bordered"
            >
              Book a Demo
            </Button>
          </div>
        </div>
      </section>
      <FooterSection hideCta={true} />
      <SignUpModal />
    </>
  );
}
