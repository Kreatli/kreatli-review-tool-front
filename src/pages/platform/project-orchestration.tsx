/* eslint-disable simple-import-sort/imports */
import { Accordion, AccordionItem, Button, Card, CardBody } from '@heroui/react';
import Head from 'next/head';
import NextLink from 'next/link';

import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';
import { HomeDashboardFeaturePreview } from '../../components/home/Features/HomeDashboardFeaturePreview';
import { TasksBoardFeaturePreview } from '../../components/home/Features/TasksBoardFeaturePreview';
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
    question: 'What are tasks and boards in Kreatli?',
    answer:
      'Tasks are individual units of work inside a project. Each task has a name, one responsible person (accountable), and one or more contributors (executing). It can also carry a description and link to media assets. The board is not a separate product — it is a visual layer over your project stages. Each column on the board represents a stage you define and order. A task\'s progress is determined entirely by which stage column it sits in; there is no second "task status" field.',
  },
  {
    question: 'How do project stages work as board columns?',
    answer:
      'Every project in Kreatli has ordered, fully customizable stages — for example Briefing, Production, Review, Delivered. These stages appear as columns on the board. Moving a task from one column to another updates its project stage and represents progress. Reordering tasks within the same column only changes their position, not their stage. Stages are the single source of truth for where any task stands.',
  },
  {
    question: 'How do I create tasks?',
    answer:
      'Tasks can be created from three places: from the board (stage is pre-selected), from a media view (media is automatically linked to the task), or from the task modal (no stage yet — the task stays off the board as a draft). Tasks without a stage are not visible on the board until you place them in a column.',
  },
  {
    question: 'How do tasks connect to media and review?',
    answer:
      'Tasks can link to one or multiple media assets. You can also create a task directly from the media view, which pre-links the asset. This bridges review and execution: feedback on a file becomes a task, the task appears on the board, and moving it between stages tracks progress — all while staying connected to the original media.',
  },
  {
    question: 'What are hidden tasks?',
    answer:
      'When you mark a task as hidden, it is visible only to you — the creator. Other project members cannot see it, search for it, or receive notifications about it. No activity logs are created while it is hidden. When you unhide a task, it becomes visible to all project members and is treated as newly introduced: notifications fire and an activity entry is created at that point.',
  },
  {
    question: 'When do notifications fire for tasks?',
    answer:
      'Notifications are triggered when a visible task is created, when a task moves between stages, when the responsible person or contributors change, and when a hidden task is unhidden. Notifications are NOT triggered when a task is hidden, or when a hidden task is edited — the team only learns about it when you choose to unhide it.',
  },
  {
    question: 'What is the difference between task stages and file approval status?',
    answer:
      'They serve different purposes. File approval status (e.g. approved, changes requested) tracks what happened on a specific asset version during review. Task stages track execution progress through your production pipeline. A task can link to a file that is under review while the task itself sits in a "Production" stage. Together they give you visibility into both the creative outcome and the work that produced it.',
  },
  {
    question: 'Can I manage multiple projects with boards simultaneously?',
    answer:
      'Yes. Every project has its own set of customizable stages and its own board. The centralized dashboard surfaces activity across all projects, so you can manage multiple campaigns, clients, or productions from one place without losing context.',
  },
  {
    question: 'How does Kreatli differ from generic project management tools?',
    answer:
      'Kreatli is built for creative and video workflows: frame-accurate review, versioned media, guest approval links, and storage for heavy files. Tasks and boards sit on top of that creative context — stages match how production actually flows, and tasks link directly to the media people are reviewing. Generic PM tools rarely tie execution this tightly to creative assets.',
  },
  {
    question: 'Who are "responsible" and "contributors" on a task?',
    answer:
      'Every task has exactly one responsible person — the accountable owner. It also has one or more contributors — the people executing the work. This separation makes ownership clear: one person is on the hook for delivery, while multiple people can collaborate on getting it done.',
  },
];

export default function ProjectOrchestrationPage() {
  useSession();
  const articles = getPlatformArticles('/platform/project-orchestration');

  return (
    <>
      <Head>
        <title>Kreatli | Project Orchestration — Tasks, Boards & Media Collaboration</title>
        <meta
          name="description"
          content="Orchestrate creative projects with board-driven tasks. Customizable project stages as columns, media-linked work items, responsible owners and contributors — all inside your video collaboration workspace."
        />
        <link rel="canonical" href="https://kreatli.com/platform/project-orchestration" />
        <meta property="og:url" content="https://kreatli.com/platform/project-orchestration" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Kreatli | Project Orchestration — Tasks, Boards & Media Collaboration" />
        <meta
          property="og:description"
          content="Board-driven tasks on customizable project stages. Link work to media, assign owners and contributors, and track progress by moving tasks between columns."
        />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:secure_url" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:alt" content="Kreatli | Project Orchestration — Tasks, Boards & Media Collaboration" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kreatli | Project Orchestration — Tasks, Boards & Media Collaboration" />
        <meta
          name="twitter:description"
          content="Board-driven tasks on customizable project stages. Link work to media, assign owners and contributors, and track progress by moving tasks between columns."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
      </Head>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Platform', url: '/platform' },
          { name: 'Project Orchestration', url: '/platform/project-orchestration' },
        ]}
      />
      <FAQStructuredData faqs={faqs} />
      <Header />
      <Decorations />

      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 text-center">
          <h1 className="mx-auto max-w-2xl font-sans text-3xl font-bold sm:text-4xl">
            Project Orchestration — Tasks, Boards & Media in One Workspace
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-foreground-500">
            Run board-driven tasks on customizable project stages. Link work to media assets, assign clear owners and
            contributors, and track progress.
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

      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Tasks & Boards</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Each column is a project stage you customize. Drag tasks between columns to update progress.
            </p>
          </div>
          <TasksBoardFeaturePreview />
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Centralized Project Dashboard</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Project overview, media files, team chat, and activity — all in one place so nothing lives in a silo.
            </p>
          </div>
          <HomeDashboardFeaturePreview />
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Orchestration Capabilities</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Built for creative and video production workflows — stages as truth, media-linked execution, and clear
              accountability.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="board" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Stages as Progress</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Define ordered project stages that become board columns. Moving a task between columns is how you
                  represent progress — no secondary status system.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="images" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Media-Linked Tasks</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Link tasks to one or multiple assets. Create tasks from media view to bridge review feedback directly
                  into tracked execution on the board.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="userPlus" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Responsible & Contributors</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Every task has one accountable owner and one or more contributors. Roles are explicit so nothing falls
                  through the cracks.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="hide" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Hidden Tasks</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Keep draft work private. Hidden tasks are visible only to you — no notifications, no activity logs.
                  Unhide when you are ready for the team to see it.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="bell" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Notifications When It Matters</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Notifications fire for visible creates, stage moves, ownership changes, and unhides. Hidden edits stay
                  silent — the team only learns when you choose.
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
                  See all projects, tasks, media, conversations, and activity from one dashboard. Manage multiple
                  campaigns without losing context.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      <MoreFreeToolsSection
        title="Free Tools & Resources"
        description="Access our free calculators and tools to optimize your creative workflow."
        tools={getFreeToolsForPlatform('/platform/project-orchestration')}
      />

      <ResourcesArticlesPreviewSection
        articles={articles}
        title="See How This Works in Practice"
        description="Explore real-world workflows and guides that demonstrate these features in action."
      />

      <PricingSection />

      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Everything you need to know about tasks, boards, stages, and project orchestration in Kreatli.
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
              Contact our support team at{' '}
              <a href="mailto:support@kreatli.com" className="font-medium text-primary underline underline-offset-2">
                support@kreatli.com
              </a>{' '}
              to learn how tasks, boards, and project orchestration can fit your workflow.
            </p>
          </div>
        </div>
      </section>

      <RelatedResourcesSection
        resources={getRelatedResources(['secureAssetStorage', 'creativeWorkspace', 'reviewApproval'])}
        title="More Resources"
        description="Explore other Kreatli platform features to streamline your video collaboration workflow."
      />

      <CTASection
        title="Ready to Orchestrate Your Projects?"
        description="Board-driven tasks, media-linked execution, and creative review in one workspace. Start your 7-day trial."
      />
      <FooterSection hideCta={true} />
      <SignUpModal />
    </>
  );
}
