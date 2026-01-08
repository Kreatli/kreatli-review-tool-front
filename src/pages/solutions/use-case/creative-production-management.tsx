import { Accordion, AccordionItem, Button, Card, CardBody } from '@heroui/react';
import Head from 'next/head';
import NextLink from 'next/link';
import React from 'react';

import { FooterSection } from '../../../components/home/Footer/FooterSection';
import { Header } from '../../../components/layout/Header';
import { Decorations } from '../../../components/layout/Storyblok/Decorations';
import { Icon, IconType } from '../../../components/various/Icon';
import { useSession } from '../../../hooks/useSession';

const data = {
  title: 'Creative Production Management',
  intro:
    'Manage creative work around the files themselves. Every file, version, comment, and approval connects directly to production status.',
  metaDescription:
    'Production management for creative teams that manages work around files, not abstract tasks. Track status, ownership, and approvals directly on creative assets.',
  howItWorks: {
    title: 'How It Works',
    description: 'Production management follows the natural flow of creative work, from upload through delivery.',
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
    description: 'Built for teams that manage creative work around files and deliverables.',
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
      question: 'What is production management for creatives?',
      answer:
        "Production management for creatives means managing work around the actual creative files—videos, images, designs, and other assets. Unlike generic project management that focuses on abstract tasks, creative production management tracks status, ownership, and approvals directly on files and versions. Producers see what's in progress, blocked, or approved at any time.",
    },
    {
      question: 'How does production management differ from project management?',
      answer:
        'Production management in Kreatli is file-centric, not task-centric. Instead of managing abstract tasks, you manage work around the actual creative files. Every file, version, comment, and approval connects to production status. Tasks link directly to files and versions, and approvals automatically move work forward.',
    },
    {
      question: 'What is creative production management software?',
      answer:
        'Creative production management software is a platform designed specifically for managing creative work around files and assets. Kreatli combines file organization, version control, review workflows, approval tracking, and team collaboration in one system. Unlike generic project management tools, it tracks status and ownership directly on creative files.',
    },
    {
      question: 'How do approvals work in Kreatli production management?',
      answer:
        'When a file or version is approved, the production status updates automatically. Producers see approvals in real time, and approved work moves forward in the workflow. All approvals are connected to specific files and versions, providing complete history of what was approved, when, and by whom.',
    },
    {
      question: 'Can I track tasks and ownership in Kreatli?',
      answer:
        "Yes. Tasks in Kreatli link directly to files and versions, so you always know what work relates to which asset. Assign ownership to team members and see who's responsible for each file. Production status shows what's in progress, blocked, or approved.",
    },
    {
      question: 'How does Kreatli prevent tool sprawl for production teams?',
      answer:
        'Kreatli combines media review and production management in one system. Instead of using Frame.io for review and Asana for project management, everything is in Kreatli. Files, versions, comments, approvals, and status are all connected in one place, eliminating tool-switching and context loss.',
    },
    {
      question: 'What types of files can I manage with production management?',
      answer:
        'Kreatli supports all creative file types including videos, images, designs, documents, and more. You can upload, organize, review, and track approval status for any creative asset. Version control works across all file types, keeping your production workflow organized regardless of the media format.',
    },
    {
      question: 'How does version control work in creative production management?',
      answer:
        'Version control in Kreatli tracks all versions of your creative files with their status, comments, and approvals in one place. When changes are needed, create new versions that automatically link to tasks and maintain complete history. You can see which version is current, approved, or in review at any time.',
    },
    {
      question: 'Can clients access the production management system?',
      answer:
        'Yes. Kreatli allows you to generate secure guest review links that clients can access without creating accounts. Clients can review files, leave comments, and approve work directly in the system. All client feedback stays connected to specific files and versions.',
    },
    {
      question: 'How do I see production status at a glance?',
      answer:
        'Kreatli provides a centralized dashboard where you can see all production status in one place. Every file shows its current state, owner, and approval status. Filter by project, status, or file type to quickly find what you need. No more asking "where are we on this?"—the answer is always visible.',
    },
    {
      question: 'Does Kreatli integrate with other tools?',
      answer:
        "Yes. Kreatli integrates with Google Drive and Dropbox, allowing you to connect existing file storage and sync files between platforms. You can continue using your preferred cloud storage while leveraging Kreatli's specialized features for production management, media review, and collaboration.",
    },
    {
      question: 'How is production management different from creative project management?',
      answer:
        "Production management focuses on managing work around actual creative files and assets, while creative project management typically focuses on abstract tasks and timelines. Kreatli's production management tracks status, ownership, and approvals directly on files and versions, ensuring every task and approval is connected to the actual creative work.",
    },
  ],
};

export default function CreativeProductionManagementPage() {
  useSession();

  // Generate FAQ structured data for SEO
  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faqs.map((faq) => ({
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
        <title>Kreatli | {data.title} – Creative Production Solution</title>
        <meta name="description" content={data.metaDescription} />
        <meta property="og:title" content={`Kreatli | ${data.title} – Creative Production Solution`} />
        <meta property="og:description" content={data.metaDescription} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      </Head>
      <Header />
      <Decorations />
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 text-center">
          <h1 className="mx-auto max-w-lg font-sans text-2xl font-bold sm:text-4xl">{data.title}</h1>
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
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-4xl">{data.howItWorks.title}</h2>
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
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-4xl">{data.problemsSolved.title}</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Production management solves the common challenges creative teams face when managing work across multiple
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
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-4xl">{data.whoThisIsFor.title}</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">{data.whoThisIsFor.description}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {data.whoThisIsFor.audiences.map((audience, index) => (
              <Card key={index} as={NextLink} href={audience.href} isPressable className="group h-full">
                <CardBody className="flex h-full flex-col gap-4 p-6">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-foreground-100 p-2.5 transition-all duration-300 group-hover:scale-105 group-hover:bg-primary-50">
                      <Icon
                        icon={audience.icon as IconType}
                        size={20}
                        className="text-primary transition-colors duration-300"
                      />
                    </div>
                    <h3 className="font-sans text-lg font-semibold">{audience.title}</h3>
                  </div>
                  <p className="flex-1 text-sm leading-relaxed text-foreground-500">{audience.description}</p>
                  <div className="flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span>Learn more</span>
                    <Icon icon="arrowRight" size={16} />
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
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-4xl">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Get detailed answers about production management for creative teams.
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

      {/* CTA Section */}
      <section className="overflow-hidden bg-foreground-50 px-6 py-16 lg:py-24">
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col gap-6 text-center">
          <h2 className="font-sans text-2xl font-bold sm:text-4xl">Ready to Manage Production Around Your Files?</h2>
          <p className="mx-auto max-w-2xl text-lg text-foreground-500">
            Experience how Kreatli combines media review and production management in one system. Start using Kreatli
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
