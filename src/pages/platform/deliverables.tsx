import { Accordion, AccordionItem, Button, Card, CardBody } from '@heroui/react';
import Head from 'next/head';
import NextLink from 'next/link';

import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';
import { DeliverablesFeaturePreview } from '../../components/home/Features/DeliverablesFeaturePreview';
import { FooterSection } from '../../components/home/Footer/FooterSection';
import { PricingSection } from '../../components/home/PricingSection/PricingSection';
import { Header } from '../../components/layout/Header';
import { Decorations } from '../../components/layout/Storyblok/Decorations';
import { BreadcrumbStructuredData } from '../../components/shared/BreadcrumbStructuredData';
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
    question: 'What are deliverables in Kreatli?',
    answer:
      'Deliverables are the outputs you need to ship for a project—final exports, cutdowns, files for client delivery, or any milestone your team must produce. In Kreatli, deliverables are organized inside the project so everyone knows what needs to go out, when it is due, and what status it is in.',
  },
  {
    question: 'How do deliverables help creative teams hit deadlines?',
    answer:
      'Deliverables make deadlines visible and actionable. Instead of tracking what is due in spreadsheets or chat threads, your team can see upcoming deliverables, assign owners, and keep review status up-to-date. This reduces missed items and last-minute surprises right before client delivery.',
  },
  {
    question: 'Can deliverables be tied to review and approvals?',
    answer:
      'Yes. Deliverables work best when connected to your review workflow—so each deliverable has an owner, a due date, and a clear status that reflects whether it is still being drafted, in review, or approved. This keeps delivery aligned with approvals and reduces rework.',
  },
  {
    question: 'Do deliverables replace tasks and boards?',
    answer:
      'No—deliverables and tasks are complementary. Tasks track the work to be done. Deliverables track the outcomes you must ship. Teams often use tasks to execute work and deliverables to ensure the right outputs are produced and approved on time.',
  },
  {
    question: 'Who should manage deliverables—producers or creators?',
    answer:
      'Both. Producers typically define what must ship and when. Creators keep deliverables updated as work progresses and reviews happen. With deliverables in the project, everyone shares the same source of truth instead of scattered notes.',
  },
];

export default function DeliverablesPlatformPage() {
  useSession();
  const articles = getPlatformArticles('/platform/deliverables');

  return (
    <>
      <Head>
        <title>Kreatli | Deliverables — Track Deadlines, Owners & Approvals</title>
        <meta
          name="description"
          content="Track deliverables with clear due dates, ownership, and approval status. Keep creative outputs organized and make shipping predictable for video teams."
        />
        <link rel="canonical" href="https://kreatli.com/platform/deliverables" />
        <meta property="og:url" content="https://kreatli.com/platform/deliverables" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Kreatli | Deliverables — Track Deadlines, Owners & Approvals" />
        <meta
          property="og:description"
          content="Track what needs to ship, when it is due, and where it stands. Deliverables keep ownership and approvals clear across your projects."
        />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:secure_url" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:alt" content="Kreatli | Deliverables — Track Deadlines, Owners & Approvals" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kreatli | Deliverables — Track Deadlines, Owners & Approvals" />
        <meta
          name="twitter:description"
          content="Track deliverables with due dates, owners, and review status so your team ships on time with fewer surprises."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
      </Head>

      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Platform', url: '/platform' },
          { name: 'Deliverables', url: '/platform/deliverables' },
        ]}
      />
      <FAQStructuredData faqs={faqs} />
      <Header />
      <Decorations />

      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 text-center">
          <h1 className="mx-auto max-w-2xl font-sans text-3xl font-bold sm:text-4xl">
            Deliverables — Deadlines, Owners & Approvals
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-foreground-500">
            Track what needs to ship, when it is due, and where it stands. Keep deliverables organized so production
            stays predictable.
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
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">A Clear View of What Must Be Done</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Keep deliverables visible with due dates, status, and ownership—so your team always knows what is next.
            </p>
          </div>
          <DeliverablesFeaturePreview />
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Deliverables Capabilities</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Built for production teams shipping multiple formats, versions, and approvals across campaigns.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="calendar" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Due Dates & Deadlines</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Make delivery dates obvious. See upcoming work at a glance so handoffs and client deliveries stop
                  being last-minute.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="userPlus" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Clear Ownership</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Assign responsibility so everyone knows who is driving each deliverable across drafts, reviews, and
                  final output.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="checkCircle" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Approval Visibility</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Track whether a deliverable is still in draft, in review, approved, or needs changes—so nothing ships
                  accidentally.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="board" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Works With Tasks & Stages</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Use tasks to execute work and deliverables to track outcomes. Keep production flow and shipping
                  outcomes aligned.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="share" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Client-Ready Output</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Deliverables keep final outputs organized for delivery—whether that is one file, a set of cutdowns, or
                  a delivery pack.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="bell" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Fewer Surprises</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  When deliverables are explicit, teams miss fewer items. Shipping becomes a checklist, not a scramble.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      <MoreFreeToolsSection
        title="Free Tools & Resources"
        description="Access our free calculators and tools to optimize your creative workflow."
        tools={getFreeToolsForPlatform('/platform/deliverables')}
      />

      <ResourcesArticlesPreviewSection
        articles={articles}
        title="See How This Works in Practice"
        description="Explore real-world workflows and guides that demonstrate deliverables, approvals, and shipping in action."
      />

      <PricingSection />

      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Everything you need to know about deliverables, deadlines, and approvals in Kreatli.
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
        </div>
      </section>

      <RelatedResourcesSection
        resources={getRelatedResources(['projectOrchestration', 'creativeWorkspace', 'reviewApproval'])}
        title="More Resources"
        description="Explore other Kreatli platform features to streamline your video collaboration workflow."
      />

      <CTASection
        title="Ready to Ship Deliverables with Confidence?"
        description="Keep due dates, ownership, and approvals visible in one workspace. Start your 7-day trial."
      />
      <FooterSection hideCta={true} />
      <SignUpModal />
    </>
  );
}
