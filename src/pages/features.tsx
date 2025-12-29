import Head from 'next/head';
import React from 'react';

import { Header } from '../components/layout/Header';
import { FeaturesSection } from '../components/home/Features';
import { FooterSection } from '../components/home/Footer/FooterSection';
import { useSession } from '../hooks/useSession';
import { Decorations } from '../components/layout/Storyblok/Decorations';
import {
  Card,
  CardBody,
  Button,
  Chip,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Accordion,
  AccordionItem,
} from '@heroui/react';
import NextLink from 'next/link';
import { Icon } from '../components/various/Icon';
import { SignUpModal } from '../components/auth/SignUpForm/SignUpModal';

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

const comparisonData = [
  {
    feature: 'Frame-accurate video comments',
    kreatli: true,
    frameIo: true,
    slack: false,
    email: false,
  },
  {
    feature: 'Asset-linked conversations',
    kreatli: true,
    frameIo: false,
    slack: true,
    email: true,
  },
  {
    feature: 'No-signup guest reviews',
    kreatli: true,
    frameIo: true,
    slack: false,
    email: false,
  },
  {
    feature: 'Project management',
    kreatli: true,
    frameIo: false,
    slack: true,
    email: false,
  },
  {
    feature: 'File organization',
    kreatli: true,
    frameIo: true,
    slack: false,
    email: false,
  },
  {
    feature: 'All-in-one platform',
    kreatli: true,
    frameIo: false,
    slack: false,
    email: false,
  },
];

export default function FeaturesPage() {
  useSession();

  return (
    <>
      <Head>
        <title>Kreatli | Creative Production & Media Review Platform</title>
        <meta
          name="description"
          content="Kreatli is a creative production management and media review platform for modern teams. Get frame-accurate revisions, asset-linked conversations, and production management workflows all in one place."
        />
        <meta property="og:title" content="Kreatli | Creative Production & Media Review Platform" />
        <meta
          property="og:description"
          content="Built for creative production workflows with frame-accurate video review, asset-linked conversations, and end-to-end production management in a single platform."
        />
      </Head>
      <Header />
      <Decorations />
      {/* Additional Features Grid */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-6 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-4xl">
              Everything you need for creative production
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Powerful features designed specifically for creative production workflows, media review and approval, and
              collaboration.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {additionalFeatures.map((feature, index) => (
              <Card key={index}>
                <CardBody className="p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-full bg-foreground-100 p-2">
                      <Icon icon={feature.icon as any} size={20} className="text-primary" />
                    </div>
                    <h3 className="font-sans text-lg font-semibold">{feature.title}</h3>
                  </div>
                  <p className="text-sm text-foreground-500">{feature.description}</p>
                </CardBody>
              </Card>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button as={NextLink} href="/sign-up" size="lg" className="bg-foreground text-content1">
              Join Kreatli
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

      {/* Main Features Section */}
      <section className="relative overflow-hidden">
        <div className="relative z-10">
          <FeaturesSection />
        </div>
      </section>

      {/* Comparison Section */}
      <section className="overflow-hidden bg-foreground-50 px-6 py-16">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-4 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-4xl">Kreatli vs. The Alternatives</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              See how Kreatli compares to using multiple tools or platforms for your creative workflow.
            </p>
          </div>

          <Table aria-label="Feature comparison table">
            <TableHeader>
              <TableColumn className="text-base">Feature</TableColumn>
              <TableColumn className="text-base">Kreatli</TableColumn>
              <TableColumn className="text-base">Frame.io</TableColumn>
              <TableColumn className="text-base">Slack + PM Tools</TableColumn>
              <TableColumn className="text-base">Email</TableColumn>
            </TableHeader>
            <TableBody>
              {comparisonData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell className="text-base font-medium">{row.feature}</TableCell>
                  <TableCell className="text-base">
                    {row.kreatli ? (
                      <Icon icon="checkCircle" size={20} className="text-success" />
                    ) : (
                      <Icon icon="cross" size={20} className="text-foreground-300" />
                    )}
                  </TableCell>
                  <TableCell className="text-base">
                    {row.frameIo ? (
                      <Icon icon="checkCircle" size={20} className="text-success" />
                    ) : (
                      <Icon icon="cross" size={20} className="text-foreground-300" />
                    )}
                  </TableCell>
                  <TableCell className="text-base">
                    {row.slack ? (
                      <Icon icon="checkCircle" size={20} className="text-success" />
                    ) : (
                      <Icon icon="cross" size={20} className="text-foreground-300" />
                    )}
                  </TableCell>
                  <TableCell className="text-base">
                    {row.email ? (
                      <Icon icon="checkCircle" size={20} className="text-success" />
                    ) : (
                      <Icon icon="cross" size={20} className="text-foreground-300" />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-8 text-center">
            <p className="mb-4 text-sm text-foreground-500">
              Why juggle multiple tools when you can have everything in one place?
            </p>
            <Button as={NextLink} href="/cost-calculator" size="lg" variant="bordered">
              Calculate Your Savings
            </Button>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-4 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-4xl">
              Perfect for any creative production workflow
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Whether you're reviewing videos, managing design assets, or coordinating production, Kreatli adapts to
              your process as an all-in-one creative production and media review platform.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <Icon icon="addVideo" size={20} className="text-primary" />
                  <h3 className="font-sans text-lg font-semibold">Video Production</h3>
                </div>
                <ul className="flex flex-col gap-2 text-sm text-foreground-500">
                  <li className="flex items-start gap-2">
                    <Icon icon="check" size={16} className="mt-0.5 flex-shrink-0 text-success" />
                    <span>Frame-accurate feedback on edits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="check" size={16} className="mt-0.5 flex-shrink-0 text-success" />
                    <span>Client approval workflows</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="check" size={16} className="mt-0.5 flex-shrink-0 text-success" />
                    <span>Collaboration with editors</span>
                  </li>
                </ul>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <Icon icon="paint" size={20} className="text-primary" />
                  <h3 className="font-sans text-lg font-semibold">Design Review</h3>
                </div>
                <ul className="flex flex-col gap-2 text-sm text-foreground-500">
                  <li className="flex items-start gap-2">
                    <Icon icon="check" size={16} className="mt-0.5 flex-shrink-0 text-success" />
                    <span>Precise annotation on images</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="check" size={16} className="mt-0.5 flex-shrink-0 text-success" />
                    <span>Version control for designs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="check" size={16} className="mt-0.5 flex-shrink-0 text-success" />
                    <span>Client feedback collection</span>
                  </li>
                </ul>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <Icon icon="folder" size={20} className="text-primary" />
                  <h3 className="font-sans text-lg font-semibold">Project Management</h3>
                </div>
                <ul className="flex flex-col gap-2 text-sm text-foreground-500">
                  <li className="flex items-start gap-2">
                    <Icon icon="check" size={16} className="mt-0.5 flex-shrink-0 text-success" />
                    <span>Organize deliverables by project</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="check" size={16} className="mt-0.5 flex-shrink-0 text-success" />
                    <span>Track project status and progress</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="check" size={16} className="mt-0.5 flex-shrink-0 text-success" />
                    <span>Team collaboration tools</span>
                  </li>
                </ul>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <Icon icon="upload" size={20} className="text-primary" />
                  <h3 className="font-sans text-lg font-semibold">File Sharing</h3>
                </div>
                <ul className="flex flex-col gap-2 text-sm text-foreground-500">
                  <li className="flex items-start gap-2">
                    <Icon icon="check" size={16} className="mt-0.5 flex-shrink-0 text-success" />
                    <span>Share large media files securely</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="check" size={16} className="mt-0.5 flex-shrink-0 text-success" />
                    <span>Password-protected links</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="check" size={16} className="mt-0.5 flex-shrink-0 text-success" />
                    <span>Cloud storage integration</span>
                  </li>
                </ul>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <Icon icon="chat" size={20} className="text-primary" />
                  <h3 className="font-sans text-lg font-semibold">Team Communication</h3>
                </div>
                <ul className="flex flex-col gap-2 text-sm text-foreground-500">
                  <li className="flex items-start gap-2">
                    <Icon icon="check" size={16} className="mt-0.5 flex-shrink-0 text-success" />
                    <span>Asset-linked conversations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="check" size={16} className="mt-0.5 flex-shrink-0 text-success" />
                    <span>Project-tied chats</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="check" size={16} className="mt-0.5 flex-shrink-0 text-success" />
                    <span>Guest review participation</span>
                  </li>
                </ul>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <Icon icon="shield" size={20} className="text-primary" />
                  <h3 className="font-sans text-lg font-semibold">Client Collaboration</h3>
                </div>
                <ul className="flex flex-col gap-2 text-sm text-foreground-500">
                  <li className="flex items-start gap-2">
                    <Icon icon="check" size={16} className="mt-0.5 flex-shrink-0 text-success" />
                    <span>No-signup review links</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="check" size={16} className="mt-0.5 flex-shrink-0 text-success" />
                    <span>Access control and permissions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="check" size={16} className="mt-0.5 flex-shrink-0 text-success" />
                    <span>Branded client experience</span>
                  </li>
                </ul>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="flex flex-col gap-16 px-6 py-16 backdrop-blur-lg lg:py-32">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
          <div className="text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-4xl">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Get detailed answers about how Kreatli's features work and how they can improve your creative workflow.
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
                  All frame-accurate comments are integrated into your review and approval workflow, allowing editors to
                  see exactly where changes are needed and mark revisions as complete once addressed. This streamlines
                  the creative production management process by reducing back-and-forth communication.
                </p>
              </div>
            </AccordionItem>

            <AccordionItem
              key="review-workflow"
              title={
                <span className="text-base font-semibold">
                  What is a media review and approval workflow, and how does Kreatli handle it?
                </span>
              }
            >
              <div className="space-y-3 text-foreground-500">
                <p>
                  A media review and approval workflow is the process creative teams use to review, provide feedback,
                  and get final approval on creative assets like videos, images, and designs. Kreatli streamlines this
                  entire process in one platform.
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
                  your creative production management pipeline.
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
                  Unlike generic proofing tools, Kreatli's creative proofing is integrated with your entire creative
                  production management workflow. All proofing feedback is linked to specific assets and projects,
                  making it easy to track what needs to be changed and ensuring nothing gets lost in translation.
                </p>
                <p>
                  The system supports both frame-accurate proofing for videos (where you can mark specific frames) and
                  pixel-accurate proofing for images and designs. This level of precision is crucial for creative teams
                  who need to communicate exact changes to designers, editors, or other team members.
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
                  Kreatli provides smart file organization that's specifically designed for creative production
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
                  Unlike basic file storage solutions, Kreatli's file organization is integrated with review workflows,
                  project management, and collaboration features. This means files are always connected to their
                  associated projects, conversations, and approval status, making it easy to see the full context of any
                  asset in your creative production management system.
                </p>
              </div>
            </AccordionItem>

            <AccordionItem
              key="collaboration"
              title={
                <span className="text-base font-semibold">
                  How does team collaboration work in Kreatli's creative production platform?
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
                  participate in the review and approval process without requiring accounts, making it easy to include
                  stakeholders in your creative workflow.
                </p>
                <p>
                  All collaboration happens within the context of your creative production management system, so
                  conversations, feedback, and approvals are all tracked and visible to the team. This reduces
                  tool-switching and keeps everything in one place, from initial planning through final delivery.
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
                  and access controls. This makes it easy to include clients in your media review and approval process
                  while maintaining control over who can access your creative assets.
                </p>
                <p>
                  External reviewers see a clean, branded interface focused on reviewing and providing feedback. They
                  can add comments, annotations, and approvals just like team members, but without the complexity of
                  project management features they don't need. This streamlined experience improves client participation
                  in your creative production workflow.
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
                  approve or request changes directly from the comparison view, streamlining your creative production
                  management process.
                </p>
              </div>
            </AccordionItem>

            <AccordionItem
              key="security"
              title={
                <span className="text-base font-semibold">
                  What security features does Kreatli offer for creative production files?
                </span>
              }
            >
              <div className="space-y-3 text-foreground-500">
                <p>
                  Kreatli provides enterprise-level security features designed for sensitive creative work. All files
                  are encrypted both in transit and at rest, ensuring your creative assets are protected. The platform
                  supports secure file sharing with password-protected links and access controls.
                </p>
                <p>
                  You can set granular permissions for team members, controlling who can view, comment, approve, or
                  download files. Guest review links can be configured with expiration dates and access restrictions,
                  giving you control over external collaboration while maintaining security.
                </p>
                <p>
                  The platform is compliance-ready and designed to meet security standards required for handling
                  confidential creative work, client materials, and proprietary content. This makes it suitable for
                  agencies and production companies that need to protect sensitive creative assets throughout the media
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
                  features for creative production management, media review, and approval workflows.
                </p>
                <p>
                  The platform also supports direct file uploads, so you can work entirely within Kreatli if preferred.
                  Whether you're syncing from cloud storage or uploading directly, all files benefit from Kreatli's
                  organization, review, and collaboration features that are specifically designed for creative
                  workflows.
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
                  creative production management platform. This reduces context switching, improves workflow efficiency,
                  and ensures nothing falls through the cracks in your media review and approval process.
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
                  Kreatli is designed for any creative workflow that involves media review, approval processes, and team
                  collaboration. It's particularly well-suited for video production teams who need frame-accurate
                  feedback, design agencies managing client approvals, and content creators coordinating with editors
                  and collaborators.
                </p>
                <p>
                  The platform excels in workflows that require structured review and approval processes, such as client
                  video projects, brand asset creation, marketing campaign production, and any creative work where
                  multiple stakeholders need to provide feedback and give approvals. The integrated creative production
                  management features make it ideal for teams that need to track deliverables, manage project timelines,
                  and coordinate between internal team members and external clients.
                </p>
                <p>
                  Kreatli is also valuable for teams currently juggling multiple tools - if you're using separate
                  platforms for file storage, video review, project management, and team communication, Kreatli can
                  consolidate these into one streamlined creative production platform with integrated media review and
                  approval workflows.
                </p>
              </div>
            </AccordionItem>

            <AccordionItem
              key="notifications"
              title={
                <span className="text-base font-semibold">
                  How do real-time notifications work in Kreatli's creative production platform?
                </span>
              }
            >
              <div className="space-y-3 text-foreground-500">
                <p>
                  Kreatli provides real-time notifications for important events in your creative workflow, including new
                  comments, approval requests, project updates, and file uploads. These notifications help team members
                  stay in sync without constantly checking the platform.
                </p>
                <p>
                  Notifications are contextual and linked to specific assets and projects, so you can quickly understand
                  what needs your attention. When someone adds a comment on a video you're working on, requests approval
                  for a design, or uploads a new version, you'll be notified immediately.
                </p>
                <p>
                  The notification system is integrated with the review and approval workflow, ensuring that approvals
                  and feedback requests don't get missed. This keeps your creative production management process moving
                  forward efficiently, as team members and clients are promptly notified when their input is needed in
                  the media review and approval process.
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
          <h2 className="mx-auto max-w-lg font-sans text-2xl font-bold sm:text-4xl">
            Ready to streamline your creative workflow?
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-foreground-500">
            Start using Kreatli today and experience the difference of a platform built specifically for creative teams.
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
