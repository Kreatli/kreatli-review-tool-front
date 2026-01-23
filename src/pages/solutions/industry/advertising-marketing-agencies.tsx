import { Accordion, AccordionItem, Button, Card, CardBody, Chip } from '@heroui/react';
import Head from 'next/head';
import NextLink from 'next/link';
import React from 'react';

import { ChatFeaturePreview } from '../../../components/home/Features/ChatFeaturePreview';
import { HomeDashboardFeaturePreview } from '../../../components/home/Features/HomeDashboardFeaturePreview';
import { ShareFeaturePreview } from '../../../components/home/Features/ShareFeaturePreview';
import { FooterSection } from '../../../components/home/Footer/FooterSection';
import { Header } from '../../../components/layout/Header';
import { Decorations } from '../../../components/layout/Storyblok/Decorations';
import { RelatedResourcesSection } from '../../../components/shared/RelatedResourcesSection';
import { Icon, IconType } from '../../../components/various/Icon';
import { getRelatedResources } from '../../../data/related-resources';
import { useSession } from '../../../hooks/useSession';

const data = {
  title: 'Advertising & Marketing Agencies',
  description:
    'Streamline campaign production with frame-accurate video review, asset-linked feedback, and no-signup client links.',
  painPoints: [
    'Feedback scattered across email, Slack, Frame.io',
    'Version confusion causing rework',
    'Client signups slow approvals by 2-3 days',
    'Tool-switching wastes 8+ hours weekly',
    "Can't see all campaigns at a glance",
    'Unsecured links for sensitive assets',
  ],
  benefits: [
    '50% faster approvals via no-signup links',
    'Save 8+ hours weekly—one platform',
    'Cut costs 40-70%',
    'Zero version confusion',
    'Enterprise security',
    'See all campaigns in one dashboard',
  ],
  useCases: [
    'Campaign asset coordination',
    'Multi-stakeholder approvals',
    'Brand asset management',
    'Video production workflows',
    'Client onboarding',
  ],
  workflowSteps: [
    {
      step: 1,
      title: 'Campaign Setup',
      icon: 'folder',
      description: 'Set up campaign workspace in minutes. Organize brand assets and campaign materials in one place.',
      timeToComplete: '2-5 minutes',
      saves: '2+ hours per campaign',
      processBreakdown: [
        'Create campaign project',
        'Upload assets or connect cloud storage',
        'Organize by campaign phase',
      ],
      challengesAddressed: ['Assets scattered across platforms', 'Version confusion', 'Time wasted searching'],
      realWorldExample: {
        scenario:
          'Instead of managing assets across multiple platforms, create one Kreatli project. Your team and clients access the same workspace.',
        tags: ['Brand Guidelines', 'Campaign Assets', 'Creative Briefs', 'Multi-Channel Campaigns'],
      },
    },
    {
      step: 2,
      title: 'Client & Team Collaboration',
      icon: 'userPlus',
      description: 'Invite team and clients with no-signup review links. Clients review without creating accounts.',
      timeToComplete: '1-3 minutes',
      saves: '30+ minutes per client stakeholder',
      processBreakdown: [
        'Add team members with permissions',
        'Generate secure review links for clients',
        'Share links—clients start reviewing immediately',
      ],
      challengesAddressed: [
        'Client signup delays slowing approvals',
        'Managing permissions across tools',
        'Security concerns with unsecured links',
      ],
      realWorldExample: {
        scenario:
          'Generate one password-protected review link. Share via email—everyone clicks and reviews immediately.',
        tags: ['No-Signup Client Links', 'Role-Based Access', 'Secure Sharing', 'Multi-Stakeholder Approval'],
      },
    },
    {
      step: 3,
      title: 'Campaign Review & Client Feedback',
      icon: 'chat',
      description:
        'Collect precise feedback with frame-accurate comments. All feedback stays linked to the exact asset.',
      timeToComplete: 'Ongoing',
      saves: '50% fewer revision cycles',
      processBreakdown: [
        'Clients click on frames or graphics to comment',
        'Comments link to asset and timestamp',
        'Assign tasks and track status',
      ],
      challengesAddressed: [
        '"Which frame?" confusion',
        'Feedback lost in email',
        'Multiple revisions for simple changes',
      ],
      realWorldExample: {
        scenario:
          'Client clicks frame 2:34: "Logo needs to be 20% larger." Editor sees exactly which frame with feedback linked.',
        tags: ['Frame-Accurate Comments', 'Asset-Linked Feedback', 'Task Assignment', 'Revision Tracking'],
      },
    },
    {
      step: 4,
      title: 'Campaign Delivery & Asset Handoff',
      icon: 'checkCircle',
      description:
        'Deliver approved assets with complete documentation. Export final files and maintain version history.',
      timeToComplete: '5-10 minutes',
      saves: 'Hours of campaign wrap-up time',
      processBreakdown: [
        'Verify approvals and export final assets',
        'Generate delivery report',
        'Archive campaign with complete history',
      ],
      challengesAddressed: [
        'Confusion about final vs. draft versions',
        'Missing deliverables',
        'Hours to locate "previous versions"',
      ],
      realWorldExample: {
        scenario:
          'Export final videos and graphics, generate delivery report. Find previous versions instantly in archived campaigns.',
        tags: ['Final Campaign Assets', 'Delivery Reports', 'Version History', 'Campaign Archive'],
      },
    },
  ],
  keyFeatures: [
    {
      icon: 'folder',
      title: 'Multi-Client Campaign Management',
      description: 'Organize 15+ campaigns in dedicated spaces. See all campaigns and status in one dashboard.',
    },
    {
      icon: 'link',
      title: 'No-Signup Client Review Links',
      description:
        'Share review links. Clients review and approve—no account required. Reduces delays from days to hours.',
    },
    {
      icon: 'chat',
      title: 'Asset-Linked Feedback',
      description: 'Comments stay with files. Example: Client comments on video—team sees it immediately.',
    },
  ],
  metaDescription:
    'Video production platform for advertising and marketing agencies. Streamline campaign workflows, client approvals, and multi-stakeholder collaboration. Asset-linked feedback and no-signup client links accelerate campaign launches. Replace Google Drive, Frame.io, and Slack with one unified platform.',
  faqs: [
    {
      question: 'How does Kreatli help advertising agencies manage multiple client campaigns?',
      answer:
        'Kreatli provides dedicated project spaces for each client campaign with a centralized dashboard. See all 15+ campaigns, their status, and approvals in one view. Unlimited projects and team members scale with your agency.',
    },
    {
      question: 'Can clients review campaign assets without creating accounts?',
      answer:
        "Yes! Kreatli's no-signup review links let clients review assets, add comments, and approve without creating accounts. Generate a password-protected link and share via email—clients start reviewing immediately. This reduces approval delays from 3-5 days to hours.",
    },
    {
      question: 'What security features does Kreatli offer for marketing agencies?',
      answer:
        'Kreatli provides enterprise-grade security with password-protected links, customizable expiration dates, and role-based access controls. Complete audit trails track all activity. All data is encrypted and meets enterprise security requirements.',
    },
    {
      question: 'How does Kreatli compare to using multiple tools like Google Drive, Frame.io, and Slack?',
      answer:
        'Kreatli replaces Google Drive, Frame.io, Slack, and project management tools in one platform. This reduces costs by 40-70% and saves 8+ hours weekly. All campaign assets, feedback, and approvals stay in one place.',
    },
    {
      question: 'How does frame-accurate commenting work for campaign video reviews?',
      answer:
        'Frame-accurate commenting lets clients click directly on specific video frames to add feedback. Comments automatically link to the exact timestamp and asset, so feedback never gets lost. This precision reduces revision cycles by 50%.',
    },
    {
      question: 'Can I connect existing Google Drive or Dropbox folders to Kreatli campaigns?',
      answer:
        "Yes! Kreatli integrates with Google Drive and Dropbox. Connect existing client asset folders without re-uploading files—all files sync to your Kreatli project. Your team can continue using familiar cloud storage while leveraging Kreatli's features.",
    },
    {
      question: 'How long does it take to set up a new campaign in Kreatli?',
      answer:
        'Setting up a new campaign takes 2-5 minutes. Create the project, upload assets or connect cloud storage, organize by phase, and set permissions. Your team and clients can start collaborating immediately. Most agencies save 2+ hours per campaign.',
    },
    {
      question: 'What happens to campaign assets after a campaign is completed?',
      answer:
        'Completed campaigns are archived with complete history preserved. All versions, feedback, approvals, and final assets remain accessible. Find previous versions instantly—no more searching through old emails or file folders.',
    },
    {
      question: 'How does Kreatli handle multi-stakeholder campaign approvals?',
      answer:
        "Kreatli streamlines multi-stakeholder approvals by letting you share one review link with all stakeholders. Everyone can review the same campaign assets simultaneously. Each person's feedback is tracked separately, and you can see approval status for each stakeholder in the dashboard.",
    },
    {
      question: 'Can I track campaign progress and see what needs attention?',
      answer:
        "Yes! Kreatli's campaign dashboard shows all campaigns, their status, and what needs attention. Filter by client, campaign phase, or status. Task assignment and tracking let you see which revisions are in progress and which are complete.",
    },
  ],
};

export default function AdvertisingMarketingAgenciesPage() {
  useSession();

  return (
    <>
      <Head>
        <title>Kreatli for {data.title} | Video Production Platform for Marketing Agencies</title>
        <meta name="description" content={data.metaDescription} />
        <meta
          name="keywords"
          content="advertising agency software, marketing agency tools, campaign management platform, video collaboration software, video review platform, client approval workflow, marketing campaign collaboration"
        />
        <link rel="canonical" href="https://kreatli.com/solutions/industry/advertising-marketing-agencies" />
        <meta property="og:url" content="https://kreatli.com/solutions/industry/advertising-marketing-agencies" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`Kreatli for ${data.title} | Video Production Platform`} />
        <meta property="og:description" content={data.metaDescription} />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:secure_url" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:alt" content={`Kreatli for ${data.title} | Video Production Platform`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Kreatli for ${data.title} | Video Production Platform`} />
        <meta name="twitter:description" content={data.metaDescription} />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
      </Head>
      <Header />
      <Decorations />
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 text-center">
          <h1 className="mx-auto max-w-lg font-sans text-3xl font-bold sm:text-4xl">Solutions for {data.title}</h1>
          <p className="mx-auto max-w-2xl text-lg text-foreground-500">{data.description}</p>
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

      {/* Visual Workflow Section */}
      {data.workflowSteps && (
        <section className="relative px-6 py-16 backdrop-blur-lg">
          <div className="relative z-10 mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Campaign Production Workflow</h2>
              <p className="mx-auto max-w-2xl text-lg text-foreground-500">
                From campaign setup to client delivery—see how Kreatli streamlines your agency workflow.
              </p>
            </div>

            {/* Workflow Progress Indicator */}
            <div className="sticky top-20 z-10 mb-12 flex justify-center">
              <div className="flex items-center gap-4 rounded-full bg-background px-6 py-3 shadow-large">
                <div className="group flex cursor-pointer items-center gap-2">
                  <div className="size-2 rounded-full bg-primary transition-transform duration-200"></div>
                  <a
                    href="#setup"
                    className="text-sm font-medium transition-colors duration-200 group-hover:text-primary"
                  >
                    Setup
                  </a>
                </div>
                <div className="hidden h-px w-8 bg-gradient-to-r from-primary to-foreground-300 md:block"></div>
                <div className="group flex cursor-pointer items-center gap-2">
                  <div className="size-2 rounded-full bg-primary transition-transform duration-200"></div>
                  <a
                    href="#collaborate"
                    className="text-sm font-medium transition-colors duration-200 group-hover:text-primary"
                  >
                    Collaborate
                  </a>
                </div>
                <div className="hidden h-px w-8 bg-gradient-to-r from-primary to-foreground-300 md:block"></div>
                <div className="group flex cursor-pointer items-center gap-2">
                  <div className="size-2 rounded-full bg-primary transition-transform duration-200"></div>
                  <a
                    href="#review"
                    className="text-sm font-medium transition-colors duration-200 group-hover:text-primary"
                  >
                    Review
                  </a>
                </div>
                <div className="hidden h-px w-8 bg-gradient-to-r from-primary to-foreground-300 md:block"></div>
                <div className="group flex cursor-pointer items-center gap-2">
                  <div className="size-2 rounded-full bg-primary transition-transform duration-200"></div>
                  <a
                    href="#deliver"
                    className="text-sm font-medium transition-colors duration-200 group-hover:text-primary"
                  >
                    Deliver
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-12">
              {data.workflowSteps.map((step, index) => {
                const stepIdMap: { [key: number]: string } = {
                  1: 'setup',
                  2: 'collaborate',
                  3: 'review',
                  4: 'deliver',
                };
                const stepId = stepIdMap[step.step] || step.title.toLowerCase().replace(/\s+/g, '-');
                const isLast = index === data.workflowSteps.length - 1;

                return (
                  <React.Fragment key={index}>
                    <Card id={stepId} className="scroll-mt-36">
                      <CardBody className="p-5 sm:p-8 lg:p-12">
                        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
                          <div className="flex flex-col gap-6 lg:w-1/3">
                            <div className="flex items-center gap-4">
                              <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary/10 md:size-20">
                                <Icon icon={step.icon as IconType} size={32} className="text-primary" />
                              </div>
                              <div>
                                <div className="mb-1 text-sm font-medium text-primary">Step {step.step}</div>
                                <h3 className="font-sans text-2xl font-bold lg:text-3xl">{step.title}</h3>
                              </div>
                            </div>
                            <p className="text-base text-foreground-500 lg:text-lg">{step.description}</p>
                            <div className="flex flex-col gap-2">
                              <div>⏱️ Time to complete: {step.timeToComplete}</div>
                              <div>💰 Saves: {step.saves}</div>
                            </div>
                          </div>

                          <div className="flex flex-col gap-8 border-foreground-200 lg:w-2/3 lg:border-l lg:pl-8">
                            <div className="grid gap-8 sm:grid-cols-2">
                              <div>
                                <h4 className="mb-4 flex items-center gap-2 font-sans text-xl font-bold">
                                  <Icon icon="list" size={24} className="text-primary" />
                                  Process Breakdown
                                </h4>
                                <ul className="flex flex-col gap-3">
                                  {step.processBreakdown.map((item, itemIndex) => (
                                    <li
                                      key={itemIndex}
                                      className="flex items-start gap-3 text-base text-foreground-500"
                                    >
                                      <div className="mt-0.5 flex size-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/20">
                                        <span className="text-xs font-bold text-primary">{itemIndex + 1}</span>
                                      </div>
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div>
                                <h4 className="mb-4 flex items-center gap-2 font-sans text-xl font-bold">
                                  <Icon icon="warning" size={24} className="text-warning" />
                                  Challenges Addressed
                                </h4>
                                <ul className="flex flex-col gap-3">
                                  {step.challengesAddressed.map((challenge, challengeIndex) => (
                                    <li
                                      key={challengeIndex}
                                      className="flex items-start gap-2 text-base text-foreground-500"
                                    >
                                      <Icon icon="cross" size={18} className="mt-0.5 flex-shrink-0 text-warning" />
                                      <span>{challenge}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            <div>
                              <h4 className="mb-4 flex items-center gap-2 font-sans text-xl font-bold">
                                <Icon icon="slides" size={24} className="text-success" />
                                Real-World Example
                              </h4>
                              <Card className="bg-success/5">
                                <CardBody className="p-6">
                                  <p className="mb-3 text-base text-foreground-600">
                                    {step.realWorldExample.scenario.includes(':') ? (
                                      <>
                                        <strong>{step.realWorldExample.scenario.split(':')[0]}:</strong>{' '}
                                        {step.realWorldExample.scenario.split(':').slice(1).join(':').trim()}
                                      </>
                                    ) : (
                                      step.realWorldExample.scenario
                                    )}
                                  </p>
                                  <div className="flex flex-wrap gap-2">
                                    {step.realWorldExample.tags.map((tag, tagIndex) => (
                                      <Chip key={tagIndex} size="sm" variant="flat" color="success">
                                        {tag}
                                      </Chip>
                                    ))}
                                  </div>
                                </CardBody>
                              </Card>
                            </div>
                          </div>
                        </div>
                      </CardBody>
                    </Card>

                    {!isLast && (
                      <div className="flex items-center justify-center">
                        <div className="flex flex-col items-center gap-2">
                          <div className="h-8 w-px bg-gradient-to-b from-primary/50 to-primary"></div>
                          <div className="flex size-8 items-center justify-center rounded-full border-2 border-primary/30 bg-primary/10">
                            <Icon icon="chevronDown" size={20} className="text-primary" />
                          </div>
                          <div className="h-8 w-px bg-gradient-to-b from-primary to-primary/50"></div>
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Key Features Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Key Features for {data.title}</h2>
          </div>

          {/* Multi-Client Campaign Management */}
          <div className="mb-16">
            <div className="mb-8 text-center">
              <h3 className="mb-3 font-sans text-2xl font-bold">Multi-Client Campaign Management</h3>
              <p className="mx-auto max-w-2xl text-lg text-foreground-500">
                Organize 15+ client campaigns in dedicated spaces. See all campaigns and status in one dashboard.
              </p>
              <NextLink
                href="/platform/project-orchestration"
                className="group mx-auto mt-4 flex w-fit items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary-600"
              >
                <span>Discover Project Orchestration</span>
                <Icon icon="arrowRight" size={16} className="transition-transform group-hover:translate-x-1" />
              </NextLink>
            </div>
            <HomeDashboardFeaturePreview />
          </div>

          {/* No-Signup Client Review Links */}
          <div className="mb-16">
            <div className="mb-8 text-center">
              <h3 className="mb-3 font-sans text-2xl font-bold">No-Signup Client Review Links</h3>
              <p className="mx-auto max-w-2xl text-lg text-foreground-500">
                Share password-protected review links. Clients review and approve—no account required.
              </p>
              <NextLink
                href="/platform/review-approval"
                className="group mx-auto mt-4 flex w-fit items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary-600"
              >
                <span>Learn about Sharing</span>
                <Icon icon="arrowRight" size={16} className="transition-transform group-hover:translate-x-1" />
              </NextLink>
            </div>
            <ShareFeaturePreview />
          </div>

          {/* Asset-Linked Feedback */}
          <div className="mb-16">
            <div className="mb-8 text-center">
              <h3 className="mb-3 font-sans text-2xl font-bold">Asset-Linked Feedback</h3>
              <p className="mx-auto max-w-2xl text-lg text-foreground-500">
                Comments stay permanently linked to specific files. No lost feedback in email threads or Slack.
              </p>
              <NextLink
                href="/platform/creative-workspace"
                className="group mx-auto mt-4 flex w-fit items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary-600"
              >
                <span>Explore Creative Workspace</span>
                <Icon icon="arrowRight" size={16} className="transition-transform group-hover:translate-x-1" />
              </NextLink>
            </div>
            <ChatFeaturePreview />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Common questions about Kreatli for {data.title.toLowerCase()}.
            </p>
          </div>
          <Accordion variant="splitted">
            {data.faqs.map((faq, index) => (
              <AccordionItem key={index} title={<span className="text-lg font-semibold">{faq.question}</span>}>
                <div className="space-y-3 text-base leading-relaxed text-foreground-500">{faq.answer}</div>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="mx-auto mt-8 flex max-w-3xl flex-col items-center gap-4 text-center">
            <h3 className="font-sans text-xl font-bold">Still Have Questions?</h3>
            <p className="text-base text-foreground-600">
              If you didn't find the answer you were looking for, contact our support team at{' '}
              <a href="mailto:support@kreatli.com" className="font-semibold text-primary underline underline-offset-2">
                support@kreatli.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Related Platform Pages Section */}
      <RelatedResourcesSection
        resources={getRelatedResources(['projectOrchestration', 'reviewApproval', 'secureAssetStorage'])}
        title="Platform Features for Agencies"
        description="Explore the Kreatli platform features that help agencies manage campaigns and client approvals."
      />

      {/* More Resources Section */}
      <RelatedResourcesSection
        resources={getRelatedResources(['inHouseCreativeContentTeams', 'videoProductionAnimationStudios', 'clientApprovals'])}
        title="More Resources"
        description="Explore other Kreatli solutions to streamline your video collaboration workflow."
      />

      {/* CTA Section */}
      <section className="overflow-hidden bg-foreground-50 px-6 py-16 lg:py-24">
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col gap-6 text-center">
          <h2 className="font-sans text-2xl font-bold sm:text-3xl">Ready to Streamline Your Workflow?</h2>
          <p className="mx-auto max-w-2xl text-lg text-foreground-500">
            Join {data.title.toLowerCase()} using Kreatli.
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
