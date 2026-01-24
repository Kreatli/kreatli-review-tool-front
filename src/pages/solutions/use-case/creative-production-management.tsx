import { Accordion, AccordionItem, Button, Card, CardBody } from '@heroui/react';
import Head from 'next/head';
import NextLink from 'next/link';
import React from 'react';

import { FooterSection } from '../../../components/home/Footer/FooterSection';
import { Header } from '../../../components/layout/Header';
import { Decorations } from '../../../components/layout/Storyblok/Decorations';
import { RelatedResourcesSection } from '../../../components/shared/RelatedResourcesSection';
import { Icon, IconType } from '../../../components/various/Icon';
import { getRelatedResources } from '../../../data/related-resources';
import { useSession } from '../../../hooks/useSession';

const data = {
  title: 'Video Collaboration & Review',
  intro:
    'Manage video work around the files themselves. Every file, version, comment, and approval connects directly to collaboration status.',
  metaDescription:
    'Video collaboration for video teams that manages work around files, not abstract tasks. Track status, ownership, and approvals directly on video assets.',
  howItWorks: {
    title: 'How It Works',
    description: 'Video collaboration follows the natural flow of video work, from upload through delivery.',
    steps: [
      {
        number: 1,
        icon: 'upload',
        title: 'Upload',
        description: 'Upload files and assign ownership. Files become the foundation of your production workflow.',
      },
      {
        number: 2,
        icon: 'eye',
        title: 'Review',
        description: 'Team members and clients review files directly. Comments attach to specific files and versions.',
      },
      {
        number: 3,
        icon: 'edit',
        title: 'Changes',
        description:
          'Create new versions when changes are needed. Tasks automatically link to the files they reference.',
      },
      {
        number: 4,
        icon: 'checkCircle',
        title: 'Approval',
        description: 'Approvals move work forward automatically. Status updates across the project in real time.',
      },
      {
        number: 5,
        icon: 'send',
        title: 'Delivery',
        description: 'Deliver approved files to clients. Complete project history stays connected to every file.',
      },
    ],
  },
  problemsSolved: {
    title: 'Problems This Solves',
    items: [
      {
        icon: 'warning',
        title: 'Tool Sprawl',
        description:
          'Stop juggling review tools and project management separately. Kreatli combines both in one system.',
      },
      {
        icon: 'warning',
        title: 'Status Chasing',
        description:
          'See production status at a glance. Every file shows its current state, owner, and approval status.',
      },
      {
        icon: 'warning',
        title: 'Disconnected Tasks',
        description: 'Tasks link directly to files and versions. You always know what work relates to which asset.',
      },
      {
        icon: 'warning',
        title: 'Version Confusion',
        description: 'Track all versions with their status, comments, and approvals in one place. No more confusion.',
      },
    ],
  },
  whoThisIsFor: {
    title: 'Who This Is For',
    description: 'Built for teams that manage video work around files and deliverables.',
    audiences: [
      {
        icon: 'group',
        title: 'Agencies',
        description:
          'Agency producers managing multiple client projects. Track deliverables, approvals, and revisions across campaigns.',
        href: '/solutions/industry/advertising-marketing-agencies',
      },
      {
        icon: 'monitorPlay',
        title: 'Production Teams',
        description:
          'Video and animation teams managing assets through review cycles. Link tasks to specific files and versions.',
        href: '/solutions/industry/video-production-animation-studios',
      },
      {
        icon: 'suitcase',
        title: 'In-House Content Teams',
        description:
          'In-house creative and content teams producing brand assets at scale. Manage campaigns and track asset status in one place.',
        href: '/solutions/industry/in-house-creative-content-teams',
      },
    ],
  },
  faqs: [
    {
      question: 'What is video collaboration for video teams?',
      answer:
        "Video collaboration means managing work around the actual video files—videos, images, and related assets. Unlike generic project management that focuses on abstract tasks, video collaboration tracks status, ownership, and approvals directly on files and versions. Producers see what's in progress, blocked, or approved at any time.",
    },
    {
      question: 'How does production management differ from project management?',
      answer:
        'Video collaboration in Kreatli is file-centric, not task-centric. Instead of managing abstract tasks, you manage work around the actual video files. Every file, version, comment, and approval connects to collaboration status. Tasks link directly to files and versions, and approvals automatically move work forward.',
    },
    {
      question: 'What is video collaboration software?',
      answer:
        'Video collaboration software is a platform designed specifically for managing video work around files and assets. Kreatli combines file organization, version control, review workflows, approval tracking, and team collaboration in one system. Unlike generic project management tools, it tracks status and ownership directly on video files.',
    },
    {
      question: 'How do approvals work in Kreatli video collaboration?',
      answer:
        'When a file or version is approved, the collaboration status updates automatically. Producers see approvals in real time, and approved work moves forward in the workflow. All approvals are connected to specific files and versions, providing complete history of what was approved, when, and by whom.',
    },
    {
      question: 'Can I track tasks and ownership in Kreatli?',
      answer:
        "Yes. Tasks in Kreatli link directly to files and versions, so you always know what work relates to which asset. Assign ownership to team members and see who's responsible for each file. Collaboration status shows what's in progress, blocked, or approved.",
    },
    {
      question: 'How does Kreatli prevent tool sprawl for production teams?',
      answer:
        'Kreatli combines video review and video collaboration in one system. Instead of using Frame.io for review and Asana for project management, everything is in Kreatli. Files, versions, comments, approvals, and status are all connected in one place, eliminating tool-switching and context loss.',
    },
    {
      question: 'What types of files can I manage with production management?',
      answer:
        'Kreatli supports all video file types including videos, images, designs, documents, and more. You can upload, organize, review, and track approval status for any video asset. Version control works across all file types, keeping your video collaboration workflow organized regardless of the media format.',
    },
    {
      question: 'How does version control work in video collaboration?',
      answer:
        'Version control in Kreatli tracks all versions of your video files with their status, comments, and approvals in one place. When changes are needed, create new versions that automatically link to tasks and maintain complete history. You can see which version is current, approved, or in review at any time.',
    },
    {
      question: 'Can clients access the video collaboration system?',
      answer:
        'Yes. Kreatli allows you to generate secure guest review links that clients can access without creating accounts. Clients can review files, leave comments, and approve work directly in the system. All client feedback stays connected to specific files and versions.',
    },
    {
      question: 'How do I see collaboration status at a glance?',
      answer:
        'Kreatli provides a centralized dashboard where you can see all collaboration status in one place. Every file shows its current state, owner, and approval status. Filter by project, status, or file type to quickly find what you need. No more asking "where are we on this?"—the answer is always visible.',
    },
    {
      question: 'Does Kreatli integrate with other tools?',
      answer:
        "Yes. Kreatli integrates with Google Drive and Dropbox, allowing you to connect existing file storage and sync files between platforms. You can continue using your preferred cloud storage while leveraging Kreatli's specialized features for video collaboration, video review, and collaboration.",
    },
    {
      question: 'How is video collaboration different from project management?',
      answer:
        "Video collaboration focuses on managing work around actual video files and assets, while project management typically focuses on abstract tasks and timelines. Kreatli's video collaboration tracks status, ownership, and approvals directly on files and versions, ensuring every task and approval is connected to the actual video work.",
    },
  ],
};

export default function CreativeProductionManagementPage() {
  useSession();

  return (
    <>
      <Head>
        <title>Kreatli | {data.title} – Video Collaboration Solution</title>
        <meta name="description" content={data.metaDescription} />
        <link rel="canonical" href="https://kreatli.com/solutions/use-case/creative-production-management" />
        <meta property="og:url" content="https://kreatli.com/solutions/use-case/creative-production-management" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`Kreatli | ${data.title} – Video Collaboration Solution`} />
        <meta property="og:description" content={data.metaDescription} />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:secure_url" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:alt" content={`Kreatli | ${data.title} – Video Collaboration Solution`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Kreatli | ${data.title} – Video Collaboration Solution`} />
        <meta name="twitter:description" content={data.metaDescription} />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
      </Head>
      <Header />
      <Decorations />
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 text-center">
          <h1 className="mx-auto max-w-lg font-sans text-3xl font-bold sm:text-4xl">{data.title}</h1>
          <p className="mx-auto max-w-2xl text-lg text-foreground-500">{data.intro}</p>
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

      {/* How It Works Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">{data.howItWorks.title}</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">{data.howItWorks.description}</p>
          </div>

          {/* Steps Flow - Vertical Layout */}
          <div className="relative mx-auto max-w-2xl">
            <div className="flex flex-col items-center gap-6">
              {data.howItWorks.steps.map((step, index) => (
                <React.Fragment key={index}>
                  <Card className="group w-full">
                    <CardBody className="flex flex-col items-center gap-6 p-6 sm:flex-row sm:items-start sm:p-8">
                      <div className="relative flex-shrink-0">
                        <div className="flex size-16 items-center justify-center rounded-full bg-foreground-100 transition-all duration-300 group-hover:scale-105 group-hover:bg-primary/10">
                          <Icon
                            icon={step.icon as IconType}
                            size={28}
                            className="text-primary transition-colors duration-300"
                          />
                        </div>
                        <div className="absolute -right-2 -top-2 flex size-7 items-center justify-center rounded-full bg-foreground font-sans text-sm font-bold text-content1 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-md">
                          {step.number}
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col items-center gap-3 text-center sm:items-start sm:text-left">
                        <h3 className="font-sans text-lg font-semibold">{step.title}</h3>
                        <p className="text-base leading-relaxed text-foreground-500">{step.description}</p>
                      </div>
                    </CardBody>
                  </Card>

                  {/* Arrow Connector - Downward */}
                  {index < data.howItWorks.steps.length - 1 && (
                    <div className="flex flex-shrink-0 items-center justify-center py-2">
                      <div className="flex flex-col items-center gap-1">
                        <div className="h-4 w-0.5 bg-gradient-to-b from-transparent to-primary/50" />
                        <Icon icon="arrowRight" size={18} className="rotate-90 text-primary" />
                        <div className="h-4 w-0.5 bg-gradient-to-b from-primary/50 to-transparent" />
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Problems This Solves Section */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">{data.problemsSolved.title}</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Video collaboration solves the common challenges video teams face when managing work across multiple
              tools.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {data.problemsSolved.items.map((problem, index) => (
              <Card key={index}>
                <CardBody className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 rounded-full bg-warning-50 p-2">
                      <Icon icon={problem.icon as IconType} size={20} className="text-warning" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-2 font-sans text-lg font-semibold">{problem.title}</h3>
                      <p className="text-sm leading-relaxed text-foreground-500">{problem.description}</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Who This Is For Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">{data.whoThisIsFor.title}</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">{data.whoThisIsFor.description}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {data.whoThisIsFor.audiences.map((audience, index) => (
              <Card
                key={index}
                as={NextLink}
                href={audience.href}
                isPressable
                className="group h-full border border-foreground-200 bg-content1 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-xl hover:shadow-primary/20"
              >
                <CardBody className="flex h-full flex-col gap-4 p-6">
                  <div className="mb-2 flex items-start gap-4">
                    <div className="flex-shrink-0 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 p-3 transition-all duration-300 group-hover:scale-110 group-hover:from-primary/30 group-hover:to-primary/20">
                      <Icon
                        icon={audience.icon as IconType}
                        size={20}
                        className="text-primary transition-colors duration-300"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-1 font-sans text-lg font-semibold leading-tight transition-colors duration-200 group-hover:text-primary">
                        {audience.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-foreground-500">{audience.description}</p>
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
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Get detailed answers about video collaboration for video teams.
            </p>
          </div>
          <Accordion variant="splitted">
            {data.faqs.map((faq, index) => (
              <AccordionItem key={index} title={<span className="text-lg font-semibold">{faq.question}</span>}>
                <div className="space-y-3 text-base leading-relaxed text-foreground-500">{faq.answer}</div>
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
              to learn how Kreatli can help your specific workflow.
            </p>
          </div>
        </div>
      </section>

      {/* Related Platform Pages Section */}
      <RelatedResourcesSection
        resources={getRelatedResources(['projectOrchestration', 'creativeWorkspace', 'reviewApproval'])}
        title="Platform Features for Production Management"
        description="Explore the Kreatli platform features that help teams manage creative work around files and track production status."
      />

      {/* More Resources Section */}
      <RelatedResourcesSection
        resources={getRelatedResources(['clientApprovals', 'creativeProofing', 'inHouseCreativeContentTeams'])}
        title="More Resources"
        description="Explore other Kreatli solutions to streamline your video collaboration workflow."
      />

      {/* CTA Section */}
      <section className="overflow-hidden bg-foreground-50 px-6 py-16 lg:py-24">
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col gap-6 text-center">
          <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Ready to Manage Video Collaboration Around Your Files?</h2>
          <p className="mx-auto max-w-2xl text-lg text-foreground-500">
            Experience how Kreatli combines video review and video collaboration in one system. Start using Kreatli
            today.
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
    </>
  );
}
