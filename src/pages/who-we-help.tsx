import { Accordion, AccordionItem, Button, Card, CardBody, Chip } from '@heroui/react';
import Head from 'next/head';
import NextLink from 'next/link';

import { FooterSection } from '../components/home/Footer/FooterSection';
import { Header } from '../components/layout/Header';
import { Decorations } from '../components/layout/Storyblok/Decorations';
import { Icon, IconType } from '../components/various/Icon';
import { useSession } from '../hooks/useSession';

interface AudienceType {
  id: string;
  icon: string;
  title: string;
  description: string;
  painPoints: string[];
  benefits: string[];
  useCases: string[];
}

const audiences: AudienceType[] = [
  {
    id: 'agencies',
    icon: 'building',
    title: 'Creative agencies & production houses',
    description:
      'Our core fit for established creative teams running high-volume client work. Keep every stakeholder aligned, every version under control, and every delivery on time—without duct-taping together five different tools.',
    painPoints: [
      'Coordinating feedback from multiple stakeholders',
      'Version control for large-scale projects',
      'Secure sharing of high-value creative assets',
      'Tracking project timelines and resource allocation',
    ],
    benefits: [
      'Unlimited projects and team members at scale',
      'Advanced review tools for professional workflows',
      'Enterprise-grade security and access controls',
      'Comprehensive project analytics and reporting',
    ],
    useCases: [
      'Post-production houses managing film/TV projects',
      'Advertising agencies coordinating campaign assets',
      'Brand agencies managing multiple client portfolios',
      'Production companies handling complex multi-phase projects',
    ],
  },
  {
    id: 'micro-teams',
    icon: 'user',
    title: 'Micro creative teams working with external clients',
    description:
      'Ideal for 2–10 person studios and pods juggling multiple client projects. Give clients a simple review experience while your team gets one organized home for files, feedback, and approvals.',
    painPoints: [
      'Juggling multiple client projects across different platforms',
      'Lost feedback in email threads and messaging apps',
      'Difficulty tracking project status and deliverables',
      'Managing client access without overwhelming them',
    ],
    benefits: [
      'Dedicated project spaces for each client',
      "Client review links that don't require signups",
      'Centralized communication tied to specific assets',
      'Clear project status tracking and deliverables',
    ],
    useCases: [
      'Design agencies managing multiple client brands',
      'Video production teams handling client projects',
      'Marketing agencies coordinating with clients',
      'Freelance teams working with various stakeholders',
    ],
  },
  {
    id: 'video-creators',
    icon: 'addVideo',
    title: 'Independent video creators & YouTube teams',
    description:
      'Built for serious creators treating content like a business—whether you’re solo or running a small production team. Centralize edits, feedback, and approvals so you can ship more content, with less chaos.',
    painPoints: [
      'Managing feedback across email, messages, and comments',
      'Tracking versions of video edits across multiple tools',
      'Sharing large video files with clients and collaborators',
      'Coordinating with editors and team members',
    ],
    benefits: [
      'Frame-accurate feedback directly on your videos',
      'Organize all projects in one central workspace',
      'Share secure review links without signups',
      'Track all revisions and feedback history',
    ],
    useCases: [
      'Client approval workflows for sponsored content',
      'Collaboration with freelance video editors',
      'Organizing multiple YouTube series or channels',
      'Review and approval cycles for brand partnerships',
    ],
  },
];

export default function WhoWeHelpPage() {
  useSession();

  return (
    <>
      <Head>
        <title>Kreatli | Who We Help – Creative Production Teams & Agencies</title>
        <meta
          name="description"
          content="Whether you're a content creator, creative team or digital agency, Kreatli is the creative production and media review platform that covers your workflow. Join independent video creators, micro-teams, and creative agencies."
        />
        <meta property="og:title" content="Kreatli | Who We Help – Creative Production Teams & Agencies" />
        <meta
          property="og:description"
          content="Perfect for video creators, micro-teams, and creative agencies that need creative production management and media review and approval workflows. Streamline your workflow and collaborate effectively."
        />
      </Head>
      <Header />
      <Decorations />
      {/* Why Kreatli Fits Section - Moved to top */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-4 text-center">
            <h2 className="mb-6 font-sans text-2xl font-bold sm:text-4xl">Why creative teams choose Kreatli</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Built specifically for creative workflows, not adapted from project management or file storage tools.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <Icon icon="chat" size={20} className="text-primary" />
                  <h3 className="font-sans text-lg font-semibold">Asset-Linked Feedback</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Comments and conversations stay with your files. No more searching through email threads or messaging
                  apps to find feedback.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <Icon icon="paint" size={20} className="text-primary" />
                  <h3 className="font-sans text-lg font-semibold">Frame-Accurate Reviews</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Pin comments to exact frames in videos or specific areas in images. Eliminate "which clip?" confusion
                  forever.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <Icon icon="link" size={20} className="text-primary" />
                  <h3 className="font-sans text-lg font-semibold">No-Signup Guest Links</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Share review links with clients and collaborators instantly. They can review and comment without
                  creating accounts.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <Icon icon="folder" size={20} className="text-primary" />
                  <h3 className="font-sans text-lg font-semibold">Project Organization</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Organize files by project, status, type, and more. Find what you need instantly with powerful
                  filtering and search.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <Icon icon="upload" size={20} className="text-primary" />
                  <h3 className="font-sans text-lg font-semibold">Heavy Media Support</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Upload and share large video files, images, and creative assets. No more WeTransfer or cloud storage
                  juggling.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <Icon icon="shield" size={20} className="text-primary" />
                  <h3 className="font-sans text-lg font-semibold">Secure & Private</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Enterprise-grade security with password protection, access controls, and secure file sharing for
                  sensitive creative work.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg lg:py-24">
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col gap-6 text-center">
          <h1 className="mb-4 font-sans text-2xl font-bold sm:text-4xl">
            Who is Kreatli’s Creative Production Platform For?
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-foreground-500 sm:text-xl">
            Whether you're a content creator, creative team or digital agency, Kreatli covers all your needs. Discover
            how different creative professionals use Kreatli to streamline their workflows.
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

      {/* Audience Cards Section */}
      <section className="relative overflow-hidden px-6 py-8 backdrop-blur-lg lg:py-16">
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-12">
          <div className="grid gap-8">
            {audiences.map((audience) => (
              <Card key={audience.id} className="border-foreground-300 dark:border">
                <CardBody className="flex flex-col gap-8 p-8 lg:flex-row lg:gap-12 lg:p-12">
                  <div className="flex flex-col gap-6 lg:w-1/3">
                    <div className="flex size-16 items-center justify-center rounded-full bg-foreground-100 lg:size-20">
                      <Icon
                        icon={audience.icon as IconType}
                        className="text-foreground-400 dark:text-foreground-600"
                        size={32}
                      />
                    </div>
                    <h3 className="font-sans text-2xl font-semibold lg:text-3xl">{audience.title}</h3>
                    <p className="text-base text-foreground-500 lg:text-lg">{audience.description}</p>
                  </div>

                  <div className="flex flex-col gap-8 border-foreground-200 lg:w-2/3 lg:border-l lg:pl-8">
                    <div className="grid gap-8 sm:grid-cols-2">
                      <div>
                        <h4 className="mb-4 flex items-center gap-2 font-sans text-xl font-bold">
                          <Icon icon="warning" size={24} className="text-warning" />
                          Common Challenges
                        </h4>
                        <ul className="flex flex-col gap-3">
                          {audience.painPoints.map((point, index) => (
                            <li key={index} className="flex items-start gap-2 text-base text-foreground-500">
                              <Icon icon="minus" size={18} className="mt-0.5 flex-shrink-0 text-foreground-400" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="mb-4 flex items-center gap-2 font-sans text-xl font-bold">
                          <Icon icon="checkCircle" size={24} className="text-success" />
                          How Kreatli Helps
                        </h4>
                        <ul className="flex flex-col gap-3">
                          {audience.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start gap-2 text-base text-foreground-500">
                              <Icon icon="check" size={18} className="mt-0.5 flex-shrink-0 text-success" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h4 className="mb-4 flex items-center gap-2 font-sans text-xl font-bold">
                        <Icon icon="slides" size={24} className="text-primary" />
                        Popular Use Cases
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {audience.useCases.map((useCase, index) => (
                          <Chip key={index} size="md" variant="flat">
                            {useCase}
                          </Chip>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-4xl">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Learn how different types of creative professionals use Kreatli to improve their workflows and
              collaboration.
            </p>
          </div>

          <Accordion variant="splitted">
            <AccordionItem
              key="video-creators"
              title={
                <span className="text-base font-semibold">
                  How does Kreatli help independent video creators and YouTubers?
                </span>
              }
            >
              <div className="space-y-3 text-foreground-500">
                <p>
                  Kreatli is designed specifically for video creators who need to manage multiple projects, collaborate
                  with editors, and get client feedback efficiently. The platform's frame-accurate review feature allows
                  you to pin comments to exact frames and timestamps in your videos, eliminating the "which clip?"
                  confusion that plagues video production workflows.
                </p>
                <p>
                  For YouTubers managing multiple series or channels, Kreatli provides project organization that keeps
                  everything in one place. You can organize videos by series, client, or project type, making it easy to
                  track what's in production, what needs review, and what's been approved. The platform's media review
                  and approval workflows streamline client feedback for sponsored content and brand partnerships.
                </p>
                <p>
                  Collaboration with freelance video editors becomes seamless with Kreatli's asset-linked conversations
                  and guest review links. Editors can access projects, add frame-accurate feedback, and share revisions
                  without needing accounts. This eliminates the back-and-forth email chains and file sharing headaches
                  that slow down video production workflows, making your creative production management much more
                  efficient.
                </p>
              </div>
            </AccordionItem>

            <AccordionItem
              key="micro-teams"
              title={
                <span className="text-base font-semibold">
                  What makes Kreatli ideal for micro-teams working with external clients?
                </span>
              }
            >
              <div className="space-y-3 text-foreground-500">
                <p>
                  Micro-teams (typically 2-10 people) working with external clients face unique challenges: managing
                  multiple client projects simultaneously, keeping client communications organized, and tracking
                  deliverables without overwhelming clients with complex tools. Kreatli addresses these challenges with
                  dedicated project spaces for each client and streamlined client collaboration features.
                </p>
                <p>
                  The platform's no-signup guest review links are perfect for client collaboration. Clients can review
                  files, add comments, and approve deliverables without creating accounts or learning new software. This
                  reduces friction in the review and approval process while keeping all feedback organized in one place.
                  Project-tied conversations ensure all client communications stay with the relevant project,
                  eliminating lost feedback in email threads.
                </p>
                <p>
                  Kreatli's project organization features help micro-teams track status and deliverables across multiple
                  client projects. You can see at a glance which projects are in review, which need attention, and which
                  are complete. This visibility is crucial for small teams juggling multiple clients and ensures nothing
                  falls through the cracks in your creative production management workflow.
                </p>
              </div>
            </AccordionItem>

            <AccordionItem
              key="agencies"
              title={
                <span className="text-base font-semibold">
                  How do creative agencies and post-production boutiques benefit from Kreatli?
                </span>
              }
            >
              <div className="space-y-3 text-foreground-500">
                <p>
                  Creative agencies and post-production boutiques need to scale their operations while maintaining
                  quality and managing complex projects with multiple stakeholders. Kreatli provides unlimited projects
                  and team members at scale, making it suitable for agencies handling dozens of client projects
                  simultaneously. The platform's advanced review tools support professional workflows with
                  frame-accurate feedback, version control, and comprehensive approval processes.
                </p>
                <p>
                  For agencies coordinating feedback from multiple stakeholders (clients, account managers, creative
                  directors, producers), Kreatli's media review and approval workflows keep everyone aligned. All
                  feedback is organized by asset and project, making it easy to track what needs attention and ensuring
                  nothing gets missed. Enterprise-grade security and access controls protect high-value creative assets
                  while allowing appropriate access for different team members and clients.
                </p>
                <p>
                  Post-production houses managing film and TV projects benefit from Kreatli's version control and
                  project organization features. The platform handles large-scale projects with hundreds of files,
                  multiple versions, and complex approval chains. Comprehensive project analytics and reporting help
                  agencies track timelines, resource allocation, and project health across their entire portfolio,
                  improving their creative production management at scale.
                </p>
              </div>
            </AccordionItem>

            <AccordionItem
              key="team-size"
              title={
                <span className="text-base font-semibold">
                  What team sizes is Kreatli best suited for, and does it scale?
                </span>
              }
            >
              <div className="space-y-3 text-foreground-500">
                <p>
                  Kreatli works well for teams of all sizes, from solo creators to large agencies. Solo video creators
                  and freelancers benefit from the platform's organization and client collaboration features. Small
                  teams (2-10 people) find value in consolidating multiple tools into one platform for creative
                  production management. Medium teams (10-50 people) appreciate the scalability and collaboration
                  features.
                </p>
                <p>
                  For large teams and agencies (50+ people), Kreatli provides unlimited projects and team members,
                  enterprise-grade security, advanced access controls, and comprehensive project analytics. The platform
                  scales from managing a few projects to hundreds of simultaneous projects across multiple clients and
                  departments.
                </p>
                <p>
                  The key advantage is that Kreatli's features work consistently regardless of team size. A solo creator
                  gets the same frame-accurate review capabilities as a large agency, and a small team gets the same
                  project organization features as enterprise clients. This means teams can start small and scale
                  without outgrowing the platform or needing to migrate to different tools as they grow.
                </p>
              </div>
            </AccordionItem>

            <AccordionItem
              key="use-cases"
              title={
                <span className="text-base font-semibold">
                  What are the most common use cases for Kreatli across different creative professionals?
                </span>
              }
            >
              <div className="space-y-3 text-foreground-500">
                <p>
                  Video creators commonly use Kreatli for client approval workflows on sponsored content, collaboration
                  with freelance editors, organizing multiple YouTube series or channels, and managing review and
                  approval cycles for brand partnerships. The frame-accurate review feature is particularly valuable for
                  video workflows where precise feedback is essential.
                </p>
                <p>
                  Design agencies and micro-teams use Kreatli for managing multiple client brands, coordinating design
                  reviews with clients, tracking project deliverables and status, and organizing creative assets by
                  project. The platform's creative proofing capabilities help teams get precise feedback on designs and
                  images, while project organization keeps multiple client projects manageable.
                </p>
                <p>
                  Post-production houses and large agencies use Kreatli for managing film and TV projects with complex
                  approval chains, coordinating campaign assets across multiple stakeholders, managing multiple client
                  portfolios simultaneously, and handling complex multi-phase production projects. The platform's
                  enterprise features support these high-volume, high-stakes workflows while maintaining organization
                  and security throughout the creative production management process.
                </p>
              </div>
            </AccordionItem>

            <AccordionItem
              key="client-collaboration"
              title={
                <span className="text-base font-semibold">
                  How does Kreatli handle client collaboration for teams working with external clients?
                </span>
              }
            >
              <div className="space-y-3 text-foreground-500">
                <p>
                  Kreatli is designed specifically for teams that need to collaborate with external clients and
                  stakeholders. The platform's no-signup guest review links allow clients to access review interfaces
                  without creating accounts, reducing friction in the approval process. Clients can add comments,
                  annotations, and approvals directly on files, and all feedback is automatically organized and tracked.
                </p>
                <p>
                  Guest review links can be password-protected for security, and you can set expiration dates and access
                  controls. This gives you control over who can access your creative assets while making it easy for
                  clients to participate in the review and approval workflow. Clients see a clean, focused interface
                  designed for reviewing and providing feedback, without the complexity of project management features
                  they don't need.
                </p>
                <p>
                  All client feedback is integrated into your creative production management workflow. Comments and
                  approvals are linked to specific assets and projects, making it easy to track what clients have
                  approved and what still needs attention. This eliminates the confusion of managing feedback across
                  email, messaging apps, and multiple platforms, keeping everything organized in one place for efficient
                  client collaboration.
                </p>
              </div>
            </AccordionItem>

            <AccordionItem
              key="workflow-improvement"
              title={
                <span className="text-base font-semibold">
                  How does Kreatli improve workflows compared to using multiple separate tools?
                </span>
              }
            >
              <div className="space-y-3 text-foreground-500">
                <p>
                  Kreatli consolidates multiple tools (file storage, project management, video review, team
                  communication) into one integrated platform, eliminating tool-switching and context loss. Instead of
                  jumping between Google Drive, Frame.io, Slack, and project management software, everything is in one
                  place. This reduces the time spent searching for files, tracking down feedback, and managing multiple
                  platforms.
                </p>
                <p>
                  The platform's asset-linked conversations ensure feedback stays with files, eliminating lost comments
                  in email threads or messaging apps. Frame-accurate review capabilities provide precise feedback on
                  videos without confusion about which clip or scene is being discussed. Project organization keeps all
                  related files, conversations, and approvals together, making it easy to see the full context of any
                  project.
                </p>
                <p>
                  By consolidating tools, Kreatli also reduces costs (typically 40-70% savings compared to multiple
                  tools), simplifies onboarding (one platform to learn instead of five), and improves security (fewer
                  vendor relationships to manage). The integrated approach means your creative production management
                  workflow is more efficient, organized, and cost-effective than using multiple separate tools.
                </p>
              </div>
            </AccordionItem>

            <AccordionItem
              key="getting-started"
              title={
                <span className="text-base font-semibold">
                  How do different types of creative professionals get started with Kreatli?
                </span>
              }
            >
              <div className="space-y-3 text-foreground-500">
                <p>
                  Getting started with Kreatli is straightforward for all types of creative professionals. The platform
                  offers a Free Plan with full access to all features (2 projects, 2 users), allowing you to test the
                  platform with real projects before committing. There's no credit card required, so you can evaluate
                  how Kreatli fits into your workflow risk-free.
                </p>
                <p>
                  For video creators, getting started typically involves uploading a few video projects, setting up
                  guest review links for clients, and inviting editors to collaborate. The frame-accurate review
                  features work immediately, and you can start organizing projects right away. Micro-teams usually begin
                  by creating projects for their current clients and migrating files from existing storage solutions.
                </p>
                <p>
                  Agencies and larger teams often start with a demo to see how Kreatli would work for their specific
                  workflow, then run a pilot project with one client or team before rolling out more broadly. We provide
                  migration assistance to help move files and projects, and our team can help set up your team structure
                  and workflows. Training resources and support ensure your team gets up to speed quickly, minimizing
                  disruption to your creative production management process.
                </p>
              </div>
            </AccordionItem>

            <AccordionItem
              key="specific-needs"
              title={
                <span className="text-base font-semibold">
                  Can Kreatli handle the specific needs of different creative industries?
                </span>
              }
            >
              <div className="space-y-3 text-foreground-500">
                <p>
                  Kreatli is designed for creative workflows across industries, including video production, design
                  agencies, marketing agencies, post-production houses, and content creation. The platform's core
                  features - frame-accurate review, media review and approval workflows, project organization, and team
                  collaboration - are valuable across all creative industries.
                </p>
                <p>
                  For video production, the frame-accurate review capabilities are essential for precise feedback on
                  edits. Design agencies benefit from creative proofing features for images and designs. Marketing
                  agencies use the platform for coordinating campaign assets and managing client approvals.
                  Post-production houses leverage the version control and project organization for complex, multi-phase
                  projects.
                </p>
                <p>
                  While Kreatli may not replace every specialized tool in your industry (like video editing software or
                  design tools), it consolidates the common functions most creative teams need: file management, project
                  tracking, review and approval, and team collaboration. This makes it valuable across creative
                  industries while allowing you to keep specialized tools for specific workflows. The platform's
                  flexibility means it adapts to different industry needs while providing consistent value through
                  improved creative production management.
                </p>
              </div>
            </AccordionItem>
          </Accordion>

          <div className="mx-auto mt-8 flex max-w-3xl flex-col items-center gap-4 text-center">
            <h3 className="font-sans text-xl font-bold">Still Have Questions About Who Kreatli Is For?</h3>
            <p className="text-foreground-500">
              If you didn't find the answer you were looking for, feel free to contact our support team at{' '}
              <a href="mailto:support@kreatli.com" className="text-primary underline underline-offset-2">
                support@kreatli.com
              </a>{' '}
              to learn how Kreatli can help your specific creative workflow.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="overflow-hidden bg-foreground-50 px-6 py-16 lg:py-24">
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col gap-3 text-center">
          <h2 className="mx-auto max-w-lg font-sans text-2xl font-bold sm:text-4xl">
            Ready to streamline your creative workflow?
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-foreground-500">
            Join thousands of creative professionals who have simplified their collaboration process with Kreatli.
          </p>
          <div className="mt-4 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button as={NextLink} href="/sign-up" size="lg" className="bg-foreground text-content1">
              Start Free Trial
            </Button>
            <Button as={NextLink} href="/pricing" size="lg" variant="bordered">
              View Pricing
            </Button>
          </div>
        </div>
      </section>
      <FooterSection hideCta={true} />
    </>
  );
}
