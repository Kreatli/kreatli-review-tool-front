import Head from 'next/head';
import React from 'react';

import { Header } from '../../../components/layout/Header';
import { FooterSection } from '../../../components/home/Footer/FooterSection';
import { useSession } from '../../../hooks/useSession';
import { Decorations } from '../../../components/layout/Storyblok/Decorations';
import { Card, CardBody, Button, Chip, Accordion, AccordionItem } from '@heroui/react';
import NextLink from 'next/link';
import { Icon } from '../../../components/various/Icon';
import { HomeDashboardFeaturePreview } from '../../../components/home/Features/HomeDashboardFeaturePreview';
import { ChatFeaturePreview } from '../../../components/home/Features/ChatFeaturePreview';
import { ShareFeaturePreview } from '../../../components/home/Features/ShareFeaturePreview';

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
    'Creative production platform for advertising and marketing agencies. Streamline campaign workflows, client approvals, and multi-stakeholder collaboration. Asset-linked feedback and no-signup client links accelerate campaign launches. Replace Google Drive, Frame.io, and Slack with one unified platform.',
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
        <title>Kreatli for {data.title} | Creative Production Platform for Marketing Agencies</title>
        <meta name="description" content={data.metaDescription} />
        <meta
          name="keywords"
          content="advertising agency software, marketing agency tools, campaign management platform, creative production software, video review platform, client approval workflow, marketing campaign collaboration"
        />
        <meta property="og:title" content={`Kreatli for ${data.title} | Creative Production Platform`} />
        <meta property="og:description" content={data.metaDescription} />
        <meta property="og:type" content="website" />
      </Head>
      <Header />
      <Decorations />
      {/* Hero Section */}
      <section className="relative py-16 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center flex flex-col gap-6 relative z-10">
          <h1 className="text-2xl sm:text-4xl font-bold font-sans max-w-lg mx-auto">Solutions for {data.title}</h1>
          <p className="text-lg text-foreground-500 max-w-2xl mx-auto">{data.description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-4">
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
        <section className="relative py-16 px-6 backdrop-blur-lg">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-4xl font-bold font-sans mb-4">Campaign Production Workflow</h2>
              <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
                From campaign setup to client delivery—see how Kreatli streamlines your agency workflow.
              </p>
            </div>

            {/* Workflow Progress Indicator */}
            <div className="flex justify-center mb-12 sticky top-20 z-10">
              <div className="flex items-center gap-4 bg-background rounded-full px-6 py-3 shadow-large">
                <div className="flex items-center gap-2 group cursor-pointer">
                  <div className="size-2 bg-primary rounded-full transition-transform duration-200"></div>
                  <a
                    href="#setup"
                    className="text-sm font-medium group-hover:text-primary transition-colors duration-200"
                  >
                    Setup
                  </a>
                </div>
                <div className="w-8 hidden md:block h-px bg-gradient-to-r from-primary to-foreground-300"></div>
                <div className="flex items-center gap-2 group cursor-pointer">
                  <div className="size-2 bg-primary rounded-full transition-transform duration-200"></div>
                  <a
                    href="#collaborate"
                    className="text-sm font-medium group-hover:text-primary transition-colors duration-200"
                  >
                    Collaborate
                  </a>
                </div>
                <div className="w-8 hidden md:block h-px bg-gradient-to-r from-primary to-foreground-300"></div>
                <div className="flex items-center gap-2 group cursor-pointer">
                  <div className="size-2 bg-primary rounded-full transition-transform duration-200"></div>
                  <a
                    href="#review"
                    className="text-sm font-medium group-hover:text-primary transition-colors duration-200"
                  >
                    Review
                  </a>
                </div>
                <div className="w-8 hidden md:block h-px bg-gradient-to-r from-primary to-foreground-300"></div>
                <div className="flex items-center gap-2 group cursor-pointer">
                  <div className="size-2 bg-primary rounded-full transition-transform duration-200"></div>
                  <a
                    href="#deliver"
                    className="text-sm font-medium group-hover:text-primary transition-colors duration-200"
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
                        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                          <div className="flex flex-col gap-6 lg:w-1/3">
                            <div className="flex items-center gap-4">
                              <div className="shrink-0 size-14 md:size-20 bg-primary/10 rounded-full flex items-center justify-center">
                                <Icon icon={step.icon as any} size={32} className="text-primary" />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-primary mb-1">Step {step.step}</div>
                                <h3 className="text-2xl lg:text-3xl font-bold font-sans">{step.title}</h3>
                              </div>
                            </div>
                            <p className="text-foreground-500 text-base lg:text-lg">{step.description}</p>
                            <div className="flex flex-col gap-2">
                              <div>⏱️ Time to complete: {step.timeToComplete}</div>
                              <div>💰 Saves: {step.saves}</div>
                            </div>
                          </div>

                          <div className="lg:w-2/3 lg:pl-8 lg:border-l border-foreground-200 flex flex-col gap-8">
                            <div className="grid sm:grid-cols-2 gap-8">
                              <div>
                                <h4 className="text-xl font-bold font-sans mb-4 flex items-center gap-2">
                                  <Icon icon="list" size={24} className="text-primary" />
                                  Process Breakdown
                                </h4>
                                <ul className="flex flex-col gap-3">
                                  {step.processBreakdown.map((item, itemIndex) => (
                                    <li
                                      key={itemIndex}
                                      className="flex items-start gap-3 text-base text-foreground-500"
                                    >
                                      <div className="size-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-xs font-bold text-primary">{itemIndex + 1}</span>
                                      </div>
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div>
                                <h4 className="text-xl font-bold font-sans mb-4 flex items-center gap-2">
                                  <Icon icon="warning" size={24} className="text-warning" />
                                  Challenges Addressed
                                </h4>
                                <ul className="flex flex-col gap-3">
                                  {step.challengesAddressed.map((challenge, challengeIndex) => (
                                    <li
                                      key={challengeIndex}
                                      className="flex items-start gap-2 text-base text-foreground-500"
                                    >
                                      <Icon icon="cross" size={18} className="text-warning mt-0.5 flex-shrink-0" />
                                      <span>{challenge}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            <div>
                              <h4 className="text-xl font-bold font-sans mb-4 flex items-center gap-2">
                                <Icon icon="slides" size={24} className="text-success" />
                                Real-World Example
                              </h4>
                              <Card className="bg-success/5">
                                <CardBody className="p-6">
                                  <p className="text-base text-foreground-600 mb-3">
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
                      <div className="flex justify-center items-center">
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-px h-8 bg-gradient-to-b from-primary/50 to-primary"></div>
                          <div className="size-8 bg-primary/10 rounded-full flex items-center justify-center border-2 border-primary/30">
                            <Icon icon="chevronDown" size={20} className="text-primary" />
                          </div>
                          <div className="w-px h-8 bg-gradient-to-b from-primary to-primary/50"></div>
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
      <section className="relative py-16 px-6 backdrop-blur-lg overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-bold font-sans mb-4">Key Features for {data.title}</h2>
          </div>

          {/* Multi-Client Campaign Management */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold font-sans mb-3">Multi-Client Campaign Management</h3>
              <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
                Organize 15+ client campaigns in dedicated spaces. See all campaigns and status in one dashboard.
              </p>
            </div>
            <HomeDashboardFeaturePreview />
          </div>

          {/* No-Signup Client Review Links */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold font-sans mb-3">No-Signup Client Review Links</h3>
              <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
                Share password-protected review links. Clients review and approve—no account required.
              </p>
            </div>
            <ShareFeaturePreview />
          </div>

          {/* Asset-Linked Feedback */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold font-sans mb-3">Asset-Linked Feedback</h3>
              <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
                Comments stay permanently linked to specific files. No lost feedback in email threads or Slack.
              </p>
            </div>
            <ChatFeaturePreview />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-16 px-6 backdrop-blur-lg overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-4xl font-bold font-sans mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
              Common questions about Kreatli for {data.title.toLowerCase()}.
            </p>
          </div>
          <Accordion variant="splitted">
            {data.faqs.map((faq, index) => (
              <AccordionItem key={index} title={<span className="font-semibold text-lg">{faq.question}</span>}>
                <div className="text-foreground-500 text-base space-y-3 leading-relaxed">{faq.answer}</div>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="max-w-3xl mx-auto flex flex-col gap-4 text-center items-center mt-8">
            <h3 className="text-xl font-sans font-bold">Still Have Questions?</h3>
            <p className="text-foreground-600 text-base">
              If you didn't find the answer you were looking for, contact our support team at{' '}
              <a href="mailto:support@kreatli.com" className="underline underline-offset-2 text-primary font-semibold">
                support@kreatli.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-foreground-50 lg:py-24 py-16 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center flex flex-col gap-6 relative z-10">
          <h2 className="text-2xl sm:text-4xl font-bold font-sans">Ready to Streamline Your Workflow?</h2>
          <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
            Join {data.title.toLowerCase()} using Kreatli.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-4">
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
