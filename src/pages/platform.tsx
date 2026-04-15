/* eslint-disable max-len */
import { Accordion, AccordionItem, Button, Card, CardBody } from '@heroui/react';
import NextLink from 'next/link';
import { useMemo, useState } from 'react';

import { SignUpModal } from '../components/auth/SignUpForm/SignUpModal';
import { FooterSection } from '../components/home/Footer/FooterSection';
import { Header } from '../components/layout/Header';
import { Decorations } from '../components/layout/Storyblok/Decorations';
import { BreadcrumbStructuredData } from '../components/shared/BreadcrumbStructuredData';
import { FAQStructuredData } from '../components/shared/FAQStructuredData';
import { HubPageIntro } from '../components/shared/HubPageIntro';
import { SeoHead } from '../components/shared/SeoHead';
import { TrustBar } from '../components/shared/TrustBar';
import { Icon, IconType } from '../components/various/Icon';
import {
  PLATFORM_FILTER_DESCRIPTIONS,
  PLATFORM_FILTER_OPTIONS,
  PLATFORM_PAGES,
  type PlatformFilterTag,
} from '../data/platform-pages';
import { useSession } from '../hooks/useSession';

const additionalFeatures = [
  {
    icon: 'board',
    title: 'Tasks & Boards',
    description:
      'Board-driven tasks where each column is a project stage. Move tasks between columns to track progress — no separate status system needed.',
  },
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
      'Pin comments to exact frames and timestamps so editors know precisely which moment you mean. Click any frame during playback to drop a note — it stays linked to that timecode permanently. Reviewers can add text, draw shapes, or mark frames as approved. The timeline shows all feedback at a glance so editors can jump between notes without scrubbing.',
  },
  {
    question: 'What is a video review and approval workflow, and how does Kreatli handle it?',
    answer:
      "A review workflow is the process of collecting feedback and sign-offs on creative assets. In Kreatli, you upload files to a project, invite reviewers, and they comment directly on the media. The system tracks every note and approval status so you always know where a deliverable stands. Guest review links let clients participate without creating an account.",
  },
  {
    question: 'How does creative proofing work in Kreatli compared to other tools?',
    answer:
      'Kreatli combines visual annotation with side-by-side version comparison. You can mark up videos frame-by-frame or annotate images pixel-by-pixel, then compare versions to spot changes instantly. Unlike generic proofing tools, all feedback stays linked to the asset and project — nothing gets lost in separate threads or email chains.',
  },
  {
    question: 'How does Kreatli organize and manage creative files and assets?',
    answer:
      'Files are organized by project with filtering by status, type, size, and tags. Every file keeps a full version history so you can track changes and revert when needed. Unlike basic cloud storage, files stay connected to their review comments, conversations, and approval status — giving you full context without leaving the workspace.',
  },
  {
    question: "How does team collaboration work in Kreatli's video production platform?",
    answer:
      'Collaboration happens through project-tied chats, asset-linked comments, and board-driven tasks. Each project stage is a column on your board — move tasks between columns to track progress. Guest review links let clients join without accounts. All conversations, feedback, and approvals stay connected to the relevant files and project.',
  },
  {
    question: 'Can clients and external reviewers use Kreatli without creating an account?',
    answer:
      "Yes. Generate a secure review link and share it with anyone. Recipients can view files, leave comments, and submit approvals without signing up. Links can be password-protected with expiration dates. External reviewers see a clean interface focused on feedback — no project management complexity they don't need.",
  },
  {
    question: 'How does the side-by-side version comparison feature work?',
    answer:
      'Open any two versions of the same file in a split-screen view to spot changes instantly. For videos, compare cuts frame-by-frame. For images, see pixel-level differences. You can add comments that reference specific differences and approve or request changes directly from the comparison view.',
  },
  {
    question: 'What security features does Kreatli offer for video files?',
    answer:
      'All files are encrypted in transit and at rest. Share links can be password-protected with expiration dates and access restrictions. Granular permissions control who can view, comment, approve, or download files. The platform is compliance-ready for agencies handling confidential client materials.',
  },
  {
    question: 'What cloud storage and integration options does Kreatli support?',
    answer:
      "Kreatli integrates with Google Drive and Dropbox. Connect your existing accounts to import or sync files — you don't have to abandon current storage. Whether you upload directly or sync from the cloud, all files get the same review, versioning, and collaboration features.",
  },
  {
    question: 'How does Kreatli compare to using Frame.io, Slack, or email for creative review?',
    answer:
      'Kreatli replaces the combination of Frame.io (review), Slack (communication), and Google Drive (storage) with one integrated platform. Frame-accurate comments, project-tied chats, and structured approvals keep feedback organized and actionable — no more context lost across separate tools and email threads.',
  },
  {
    question: 'What types of creative projects and workflows is Kreatli best suited for?',
    answer:
      "Any workflow involving video review, team feedback, and client approvals. It's especially effective for video agencies managing client projects, production teams coordinating with editors, and marketing teams running multi-asset campaigns. If you currently juggle multiple tools for storage, review, PM, and communication, Kreatli consolidates them.",
  },
  {
    question: "How do real-time notifications work in Kreatli's video production platform?",
    answer:
      'You get instant alerts for new comments, approval requests, project updates, and file uploads. Every notification links to the specific asset and project so you can jump straight to what needs attention. This keeps approvals and feedback requests from getting missed.',
  },
];

export default function PlatformPage() {
  useSession();
  const [selectedFilter, setSelectedFilter] = useState<'All' | PlatformFilterTag>('All');

  const filteredPages = useMemo(() => {
    const list =
      selectedFilter === 'All' ? PLATFORM_PAGES : PLATFORM_PAGES.filter((page) => page.tags?.includes(selectedFilter));
    return [...list].sort((a, b) => a.order - b.order);
  }, [selectedFilter]);

  return (
    <>
      <SeoHead
        title="Kreatli | Video Collaboration & Review Platform Features"
        description="Explore Kreatli platform features: frame-accurate video review, asset-linked conversations, project orchestration, deliverables tracking, and secure storage. Built for video production teams."
        canonicalPath="/platform"
      />
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
              Start 7-day trial
            </Button>
            <Button
              as="a"
              href="https://calendar.app.google/NXbAeTAUwaBGh5x49"
              target="_blank"
              rel="noopener noreferrer nofollow"
              size="lg"
              variant="bordered"
            >
              Book a Demo
            </Button>
          </div>
        </div>
      </section>
      <TrustBar />
      {/* Platform Features Section — intro is part of the catalog, not a separate text island */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl space-y-10">
          <div className="text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Platform Features</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Browse everything Kreatli does in one place, then filter by the part of production you care about.
            </p>
          </div>

          <HubPageIntro
            eyebrow="Platform overview"
            title="One workspace from upload to approval"
            icon="monitorPlay"
            aside={
              <>
                <p className="text-xs font-semibold uppercase tracking-wide text-foreground-500">Deep dives</p>
                <ul className="mt-3 space-y-2">
                  {[
                    { href: '/platform/video-annotation', label: 'Video annotation' },
                    { href: '/platform/review-approval', label: 'Review & approval' },
                    { href: '/platform/secure-asset-storage', label: 'Secure storage' },
                    { href: '/platform/project-orchestration', label: 'Project orchestration' },
                  ].map((item) => (
                    <li key={item.href}>
                      <NextLink
                        href={item.href}
                        className="group flex items-center justify-between gap-2 rounded-lg py-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                      >
                        <span>{item.label}</span>
                        <Icon
                          icon="arrowRight"
                          size={14}
                          className="flex-shrink-0 text-primary/60 transition-transform group-hover:translate-x-0.5"
                        />
                      </NextLink>
                    </li>
                  ))}
                </ul>
              </>
            }
          >
            <p>
              Kreatli replaces scattered storage, review, chat, and task tools with a single flow built for video and
              rich media: upload to a project, invite collaborators, pin feedback to exact frames or coordinates, and
              track deliverables through stages your team already uses.
            </p>
            <p>
              Guest links let clients review without signing up; permissions and encryption keep sensitive work
              contained. Use the category chips below to narrow the grid—each card opens a focused feature page with
              workflow detail. New here?{' '}
              <NextLink href="/sign-up" className="font-medium text-primary underline-offset-2 hover:underline">
                Start a 7-day trial
              </NextLink>{' '}
              or compare{' '}
              <NextLink href="/pricing" className="font-medium text-primary underline-offset-2 hover:underline">
                plans and pricing
              </NextLink>
              .
            </p>
          </HubPageIntro>

          <div className="flex justify-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-foreground-200 bg-content1/60 px-4 py-3 shadow-sm backdrop-blur-sm">
              <button
                type="button"
                onClick={() => setSelectedFilter('All')}
                aria-pressed={selectedFilter === 'All'}
                aria-label="Show all features"
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  selectedFilter === 'All'
                    ? 'border border-primary bg-gradient-to-br from-primary/20 to-primary/10 text-primary shadow-sm'
                    : 'border border-transparent text-foreground-600 hover:border-primary/40 hover:bg-primary/5 hover:text-primary'
                }`}
              >
                All
              </button>
              {PLATFORM_FILTER_OPTIONS.map((option) => {
                const isSelected = selectedFilter === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setSelectedFilter(option.id)}
                    aria-pressed={isSelected}
                    aria-label={`Filter features by ${option.label}`}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                      isSelected
                        ? 'border border-primary bg-gradient-to-br from-primary/20 to-primary/10 text-primary shadow-sm'
                        : 'border border-transparent text-foreground-600 hover:border-primary/40 hover:bg-primary/5 hover:text-primary'
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          {selectedFilter !== 'All' && (
            <p className="mx-auto max-w-3xl px-2 text-center text-sm leading-relaxed text-foreground-600 sm:text-base">
              {PLATFORM_FILTER_DESCRIPTIONS[selectedFilter]}
            </p>
          )}

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPages.length === 0 ? (
              <p className="col-span-full text-center text-foreground-500">No features match this filter.</p>
            ) : (
              filteredPages.map((page) => (
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
                        <Icon icon={page.icon} size={24} className="text-primary" />
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
              ))
            )}
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
              Start 7-day trial{' '}
            </Button>
            <Button
              as="a"
              href="https://calendar.app.google/NXbAeTAUwaBGh5x49"
              target="_blank"
              rel="noopener noreferrer nofollow"
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
                  Pin comments to exact frames and timestamps so editors know precisely which moment you mean. Click any
                  frame during playback to drop a note — it stays linked to that timecode permanently.
                </p>
                <p>
                  Reviewers can add text, draw shapes, or mark frames as approved. The timeline shows all feedback at a
                  glance so editors can jump between notes without scrubbing.
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
                  A review workflow is the process of collecting feedback and sign-offs on creative assets. In Kreatli,
                  you upload files to a project, invite reviewers, and they comment directly on the media.
                </p>
                <p>
                  The system tracks every note and approval status so you always know where a deliverable stands. Guest
                  review links let clients participate without creating an account.
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
                  Kreatli combines visual annotation with side-by-side version comparison. You can mark up videos
                  frame-by-frame or annotate images pixel-by-pixel, then compare versions to spot changes instantly.
                </p>
                <p>
                  Unlike generic proofing tools, all feedback stays linked to the asset and project — nothing gets lost
                  in separate threads or email chains.
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
                  Files are organized by project with filtering by status, type, size, and tags. Every file keeps a
                  full version history so you can track changes and revert when needed.
                </p>
                <p>
                  Unlike basic cloud storage, files stay connected to their review comments, conversations, and
                  approval status — giving you full context without leaving the workspace.
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
                  Collaboration happens through project-tied chats, asset-linked comments, and board-driven tasks. Each
                  project stage is a column on your board — move tasks between columns to track progress.
                </p>
                <p>
                  Guest review links let clients join without accounts. All conversations, feedback, and approvals stay
                  connected to the relevant files and project.
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
                  Yes. Generate a secure review link and share it with anyone. Recipients can view files, leave
                  comments, and submit approvals without signing up.
                </p>
                <p>
                  Links can be password-protected with expiration dates. External reviewers see a clean interface
                  focused on feedback — no project management complexity they don't need.
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
                  Open any two versions of the same file in a split-screen view to spot changes instantly. For videos,
                  compare cuts frame-by-frame. For images, see pixel-level differences.
                </p>
                <p>
                  You can add comments that reference specific differences and approve or request changes directly from
                  the comparison view.
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
                  All files are encrypted in transit and at rest. Share links can be password-protected with expiration
                  dates and access restrictions.
                </p>
                <p>
                  Granular permissions control who can view, comment, approve, or download files. The platform is
                  compliance-ready for agencies handling confidential client materials.
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
                  Kreatli integrates with Google Drive and Dropbox. Connect your existing accounts to import or sync
                  files — you don't have to abandon current storage.
                </p>
                <p>
                  Whether you upload directly or sync from the cloud, all files get the same review, versioning, and
                  collaboration features.
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
                  Kreatli replaces the combination of Frame.io (review), Slack (communication), and Google Drive
                  (storage) with one integrated platform.
                </p>
                <p>
                  Frame-accurate comments, project-tied chats, and structured approvals keep feedback organized and
                  actionable — no more context lost across separate tools and email threads.
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
                  Any workflow involving video review, team feedback, and client approvals. It's especially effective
                  for video agencies managing client projects, production teams coordinating with editors, and marketing
                  teams running multi-asset campaigns.
                </p>
                <p>
                  If you currently juggle multiple tools for storage, review, PM, and communication, Kreatli
                  consolidates them.
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
                  You get instant alerts for new comments, approval requests, project updates, and file uploads. Every
                  notification links to the specific asset and project so you can jump straight to what needs attention.
                </p>
                <p>
                  This keeps approvals and feedback requests from getting missed.
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
            Start your 7-day trial and experience the difference of a platform built specifically for video teams. Add a
            payment method at checkout; no charge during the trial period.
          </p>
          <div className="mt-4 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button as={NextLink} href="/sign-up" size="lg" className="bg-foreground text-content1">
              Start 7-day trial
            </Button>
            <Button
              as="a"
              href="https://calendar.app.google/NXbAeTAUwaBGh5x49"
              target="_blank"
              rel="noopener noreferrer nofollow"
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
