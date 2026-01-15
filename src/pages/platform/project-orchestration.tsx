import { Accordion, AccordionItem, Button, Card, CardBody } from '@heroui/react';
import Head from 'next/head';
import NextLink from 'next/link';
import React from 'react';

import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';
import { HomeDashboardFeaturePreview } from '../../components/home/Features/HomeDashboardFeaturePreview';
import { ProjectFeaturePreview } from '../../components/home/Features/ProjectFeaturePreview';
import { FooterSection } from '../../components/home/Footer/FooterSection';
import { Header } from '../../components/layout/Header';
import { Decorations } from '../../components/layout/Storyblok/Decorations';
import { CTASection } from '../../components/shared/CTASection';
import { Icon } from '../../components/various/Icon';
import { useSession } from '../../hooks/useSession';

const faqs = [
  {
    question: 'What is project orchestration in creative production?',
    answer:
      'Project orchestration is the centralized management and coordination of all aspects of creative production projects. In Kreatli, project orchestration combines project organization, file assignment, status tracking, team coordination, and media storage in one platform. Instead of managing projects across multiple tools (project management software, file storage, communication apps), everything is orchestrated from one centralized dashboard. This ensures all team members, files, conversations, and approvals stay organized within each project context.',
  },
  {
    question: 'How do I assign files to team members in Kreatli?',
    answer:
      'In Kreatli, you can assign files directly to team members within each project. When you assign a file, the assigned team member receives a notification and can see all files assigned to them in their dashboard. You can track who\'s working on what, see the status of all deliverables, and reassign files as needed. File assignments are visible to the entire team, so everyone knows who\'s responsible for each deliverable. This eliminates confusion about ownership and ensures nothing falls through the cracks.',
  },
  {
    question: 'How does status tracking work for creative projects?',
    answer:
      'Kreatli\'s status tracking lets you set custom statuses for files and projects (e.g., in production, pending review, approved, blocked). You can see the status of all deliverables at a glance in the project dashboard. Status changes are tracked with timestamps and user information, creating a clear audit trail. You can filter files by status to quickly see what needs attention, what\'s in review, and what\'s been approved. This gives you complete visibility into project progress without switching between multiple tools.',
  },
  {
    question: 'Can I manage multiple projects simultaneously in Kreatli?',
    answer:
      'Yes. Kreatli is designed to handle multiple projects simultaneously. Each project has its own workspace with files, conversations, team members, and activity tracking. The centralized dashboard shows an overview of all your projects, making it easy to see the status of each one. You can organize projects by client, campaign, production type, or any other structure that fits your workflow. This is essential for creative teams managing multiple client projects or campaigns at the same time.',
  },
  {
    question: 'How does project orchestration differ from generic project management tools?',
    answer:
      'Kreatli\'s project orchestration is built specifically for creative production workflows, not adapted from generic project management tools. It tracks status and ownership directly on creative files, not just tasks. Asset-linked conversations ensure feedback stays with files. The platform understands creative workflows like version control, frame-accurate video review, and multi-stakeholder approvals. Unlike project management tools that treat creative files as attachments, Kreatli treats files as the primary focus, with project organization, conversations, and approvals built around them.',
  },
  {
    question: 'How do I track deliverables across multiple projects?',
    answer:
      'Kreatli\'s centralized dashboard provides visibility across all your projects. You can see which deliverables are pending, in review, or approved across all projects in one view. The dashboard shows project status, recent activity, pending approvals, and file updates. You can filter by project, status, assignee, or file type to quickly find what you need. This eliminates the need to check multiple platforms or spreadsheets to understand the status of deliverables across different projects.',
  },
  {
    question: 'Can I organize projects by client or campaign?',
    answer:
      'Yes. Kreatli\'s project organization is flexible and allows you to structure projects however fits your workflow. You can create projects for different clients, campaigns, productions, or any other organizational structure. Each project contains all related files, conversations, team members, and activity. You can organize projects by client (e.g., "Client A - Q4 Campaign"), by campaign type (e.g., "Social Media Campaign - Spring"), or by production (e.g., "Video Series - Episode 1"). This flexibility makes Kreatli suitable for agencies, in-house teams, and production studios with different organizational needs.',
  },
  {
    question: 'How does team coordination work in project orchestration?',
    answer:
      'Team coordination in Kreatli happens through project-tied conversations, asset-linked comments, file assignments, and real-time collaboration. All team communication stays within the project context, ensuring everyone has access to relevant discussions. File assignments make it clear who\'s responsible for what. Status tracking shows the progress of all deliverables. Real-time notifications keep team members updated on comments, approvals, and status changes. This eliminates the confusion of managing coordination across multiple tools and ensures everyone stays in sync.',
  },
  {
    question: 'Is project orchestration suitable for large-scale productions?',
    answer:
      'Yes. Kreatli\'s project orchestration handles large-scale productions with hundreds of files, multiple team members, and complex approval workflows. The platform supports organizing files by folders, status, type, and custom tags within each project. You can track the status of every deliverable, assign files to specific team members, and maintain complete version history. The centralized dashboard provides visibility into large projects without overwhelming the interface. Many production studios use Kreatli to orchestrate series with 50+ episodes, campaigns with hundreds of assets, and multi-phase productions.',
  },
  {
    question: 'How does project orchestration help with client deliverables?',
    answer:
      'Project orchestration in Kreatli helps you track and deliver client work efficiently. You can organize all client deliverables within dedicated projects, track their status (in production, pending review, approved), and see what\'s ready for delivery. File assignments ensure team members know what they\'re responsible for. Status tracking shows which deliverables are complete and which need attention. The centralized dashboard gives you a clear view of all client work, making it easy to provide status updates and ensure nothing is missed. Client review links allow clients to review and approve deliverables directly in the platform.',
  },
];

export default function ProjectOrchestrationPage() {
  useSession();

  // Generate FAQ structured data for SEO/AEO
  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <Head>
        <title>Kreatli | Project Orchestration – Centralized Creative Production Management</title>
        <meta
          name="description"
          content="Kreatli's Project Orchestration provides centralized project management, status tracking, and team coordination for creative production workflows. Manage all your projects from one dashboard."
        />
        <link rel="canonical" href="https://kreatli.com/platform/project-orchestration" />
        <meta property="og:url" content="https://kreatli.com/platform/project-orchestration" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Kreatli | Project Orchestration – Centralized Creative Production Management"
        />
        <meta
          property="og:description"
          content="Orchestrate your creative projects with centralized project management, status tracking, and team coordination. Everything in one place for streamlined creative production."
        />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:secure_url" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:alt" content="Kreatli | Project Orchestration – Centralized Creative Production Management" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kreatli | Project Orchestration – Centralized Creative Production Management" />
        <meta
          name="twitter:description"
          content="Orchestrate your creative projects with centralized project management, status tracking, and team coordination. Everything in one place for streamlined creative production."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      </Head>
      <Header />
      <Decorations />
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 text-center">
          <h1 className="mx-auto max-w-lg font-sans text-2xl font-bold sm:text-4xl">
            Centralized Creative Production Management
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-foreground-500">
            Assign files, track deliverables, and share heavy media securely. Everything you need to orchestrate your
            creative projects in one place.
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

      {/* Project Management Section */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-4xl">
              Project Management Meets Reliable Media Storage
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Assign files, track deliverables, and share heavy media securely in one workspace.
            </p>
          </div>
          <ProjectFeaturePreview />
        </div>
      </section>

      {/* Centralized Dashboard Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-4xl">Centralized Project Dashboard</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Everything you need in one place—project overview, media files, team chat, and activity tracking.
            </p>
          </div>
          <HomeDashboardFeaturePreview />
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-4xl">Project Orchestration Features</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Built specifically for creative production workflows with powerful project management capabilities.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="folder" size={20} className="text-primary" />
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
                    <Icon icon="user" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">File Assignment</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Assign files to team members, track who's working on what, and see the status of all deliverables.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="checkCircle" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Status Tracking</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Track project status and progress with custom statuses. See what's in review, approved, and needs
                  attention.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="slides" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Centralized Dashboard</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  View all your projects, files, conversations, and activity from one centralized dashboard.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="group" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Team Coordination</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Coordinate with your team through project-tied chats, asset-linked comments, and real-time
                  collaboration.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="bell" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Activity Tracking</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  See all project activity in one place—file uploads, comments, approvals, and status changes.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-4xl">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Get detailed answers about Kreatli's project orchestration and centralized creative production management.
            </p>
          </div>
          <Accordion variant="splitted" className="gap-2">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
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
              to learn how Kreatli's project orchestration can help your specific workflow.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Orchestrate Your Projects?"
        description="Experience centralized project management designed for creative production teams. Streamline your workflow."
      />
      <FooterSection hideCta={true} />
      <SignUpModal />
    </>
  );
}
