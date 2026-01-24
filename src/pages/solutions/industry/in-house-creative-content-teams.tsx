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
  title: 'In-House Creative & Content Teams',
  description:
    'Streamline brand asset management, campaign production, and stakeholder approvals. Collaborate with external agencies while maintaining brand consistency.',
  painPoints: [
    'Brand assets scattered across platforms',
    'Feedback lost in email threads and Slack',
    'Difficulty coordinating with external agencies',
    'Stakeholder approval delays',
    'Managing multiple brand campaigns simultaneously',
    'Version confusion causing rework',
  ],
  benefits: [
    '50% faster approvals via no-signup links',
    'Save 6+ hours weekly—one platform',
    'Centralized brand asset management',
    'Zero lost feedback—all comments linked to assets',
    'Frame-accurate video feedback',
    'Streamlined stakeholder approvals',
  ],
  useCases: [
    'Brand marketing teams managing campaign assets',
    'In-house video teams coordinating with agencies',
    'Marketing operations managing multiple campaigns',
    'Content teams producing brand content at scale',
    'Brand asset management and distribution',
  ],
  workflowSteps: [
    {
      step: 1,
      title: 'Brand Asset Organization',
      icon: 'folder',
      description:
        'Set up brand asset libraries and campaign workspaces. Organize assets by brand, product line, or campaign in one centralized platform.',
      timeToComplete: '2-5 minutes',
      saves: '2+ hours per campaign',
      processBreakdown: [
        'Create brand asset library or campaign project',
        'Upload brand assets or connect cloud storage',
        'Organize by brand, product line, or campaign phase',
      ],
      challengesAddressed: [
        'Brand assets scattered across platforms',
        'Version confusion',
        'Time wasted searching for approved assets',
      ],
      realWorldExample: {
        scenario:
          'Instead of managing brand assets in Google Drive, campaign materials in Dropbox, and briefs in email, create one Kreatli project per brand. Your team and external partners access the same organized workspace.',
        tags: ['Brand Guidelines', 'Campaign Assets', 'Product Line Organization', 'Multi-Brand Management'],
      },
    },
    {
      step: 2,
      title: 'External Partner Collaboration',
      icon: 'userPlus',
      description:
        'Invite external agencies and freelancers with no-signup review links. They can access projects, provide feedback, and share deliverables without creating accounts.',
      timeToComplete: '1-3 minutes',
      saves: '30+ minutes per external partner',
      processBreakdown: [
        'Add team members with permissions',
        'Generate secure review links for external partners',
        'Share links—partners start collaborating immediately',
      ],
      challengesAddressed: [
        'External partner signup delays',
        'Managing permissions across tools',
        'Security concerns with unsecured links',
      ],
      realWorldExample: {
        scenario:
          'Generate one password-protected review link for your external agency. Share via email—they click and start uploading deliverables immediately. All their work stays organized in your project.',
        tags: ['No-Signup Partner Links', 'External Agency Collaboration', 'Secure Sharing', 'Freelancer Access'],
      },
    },
    {
      step: 3,
      title: 'Stakeholder Review & Approval',
      icon: 'chat',
      description:
        'Collect precise feedback from internal stakeholders with frame-accurate comments. All feedback stays linked to the exact asset, maintaining complete approval records.',
      timeToComplete: 'Ongoing',
      saves: '50% fewer revision cycles',
      processBreakdown: [
        'Stakeholders review via no-signup links',
        'Frame-accurate comments on videos and graphics',
        'Track approval status for each stakeholder',
      ],
      challengesAddressed: [
        '"Which asset?" confusion',
        'Feedback lost in email',
        'Multiple revisions for simple changes',
        'Unclear approval status',
      ],
      realWorldExample: {
        scenario:
          'Marketing Director clicks frame 2:34: "Logo needs to be 20% larger." Brand Manager sees exactly which frame with feedback linked. Approval chain tracked—CMO approves final version with complete history.',
        tags: ['Frame-Accurate Comments', 'Asset-Linked Feedback', 'Stakeholder Approval Chain', 'Approval Tracking'],
      },
    },
    {
      step: 4,
      title: 'Campaign Delivery & Archive',
      icon: 'checkCircle',
      description:
        'Deliver approved brand assets and campaign materials with complete documentation. Maintain version history and archive campaigns for future reference.',
      timeToComplete: '5-10 minutes',
      saves: 'Hours of campaign wrap-up time',
      processBreakdown: [
        'Verify approvals and export final assets',
        'Generate delivery report with approval history',
        'Archive campaign with complete brand asset library',
      ],
      challengesAddressed: [
        'Confusion about final vs. draft versions',
        'Missing brand asset documentation',
        'Hours to locate "previous campaign assets"',
      ],
      realWorldExample: {
        scenario:
          'Export final brand assets and campaign materials, generate delivery report. Marketing team asks for "Q3 campaign logo variations" months later—find them instantly in archived campaign, deliver in minutes.',
        tags: ['Final Brand Assets', 'Delivery Reports', 'Version History', 'Campaign Archive'],
      },
    },
  ],
  keyFeatures: [
    {
      icon: 'folder',
      title: 'Brand Asset Management',
      description:
        'Centralize brand assets, campaign materials, and creative files. Maintain brand consistency across all projects.',
    },
    {
      icon: 'link',
      title: 'External Partner Collaboration',
      description:
        'Share review links with external agencies and freelancers. They collaborate without creating accounts—reduces delays from days to hours.',
    },
    {
      icon: 'chat',
      title: 'Asset-Linked Feedback',
      description: 'Comments stay with files. Example: Stakeholder comments on brand asset—team sees it immediately.',
    },
  ],
  metaDescription:
    'Video Collaboration & Review Platform for in-house video and content teams. Manage brand assets, campaign production, and video collaboration workflows. Collaborate with agencies, streamline approvals, and maintain brand consistency. Replace Google Drive, Frame.io, and Slack with one unified platform.',
  faqs: [
    {
      question: 'How does Kreatli help in-house teams maintain brand consistency?',
      answer:
        'Kreatli provides centralized brand asset management, allowing teams to organize approved brand assets, guidelines, and campaign materials in one place. All team members and external partners have access to the same brand assets, ensuring consistency across projects. You can organize projects by brand or campaign, making it easy to see what assets are being used and maintain brand standards throughout all creative work. Version history tracks all asset updates, so you always know which version is approved.',
    },
    {
      question: 'Can we collaborate with external agencies and freelancers?',
      answer:
        'Yes! Kreatli makes it easy to collaborate with external agencies and freelancers through secure guest review links. They can access projects, provide feedback, and share deliverables without creating accounts. Simply generate a password-protected review link and share it via email or Slack. External partners click the link and immediately start collaborating—no downloads, no signups, no delays. All their work and feedback is organized in your project, keeping everything centralized while allowing external partners to participate seamlessly in your creative workflow.',
    },
    {
      question: 'How does Kreatli streamline approval workflows for internal stakeholders?',
      answer:
        "Kreatli provides streamlined approval workflows that allow internal stakeholders to review and approve creative work efficiently. Share one no-signup review link with all stakeholders—the Marketing Director, Brand Manager, and CMO can all review the same campaign assets simultaneously. Each person's feedback is tracked separately, and you can see approval status for each stakeholder in the campaign dashboard. All approvals are linked to specific assets, making it easy to see what's been approved and what still needs attention. This reduces approval delays from 3-5 days to hours.",
    },
    {
      question: 'Can we organize projects by campaign or brand?',
      answer:
        'Yes! Kreatli allows you to organize projects by campaign, brand, product line, or any other structure that makes sense for your team. You can see at a glance which campaigns are in production, which need review, and which are complete. This organization helps teams manage multiple campaigns simultaneously while maintaining clear visibility into project status and deliverables. Each project maintains its own brand assets, creative briefs, and feedback history, so nothing gets mixed up between brands or campaigns.',
    },
    {
      question: 'How does Kreatli help teams manage multiple brand campaigns?',
      answer:
        "Kreatli provides dedicated project spaces for each campaign, allowing teams to organize files, conversations, and approvals separately while maintaining a centralized view of all campaigns. You can organize by brand, campaign type, or product line, making it easy to track what's in production, what needs review, and what's been approved. The dashboard shows all campaigns, their status, and what needs attention. Filter by brand, campaign phase, or status. This organization is essential for teams managing multiple campaigns simultaneously while maintaining brand consistency.",
    },
    {
      question: 'What security features does Kreatli offer for brand assets?',
      answer:
        'Kreatli provides enterprise-grade security for sensitive brand assets. Password-protected links with customizable expiration dates ensure external partner access is time-limited. Access controls let you set permissions by role—internal team members get full access, external partners get review-only access. Complete audit trails track who viewed what and when. All data is encrypted and meets enterprise security requirements, so you can confidently share brand assets with external agencies and stakeholders.',
    },
    {
      question: 'How does Kreatli compare to using multiple tools like Google Drive, Frame.io, and Slack?',
      answer:
        'Kreatli replaces Google Drive (file storage), Frame.io (video review), Slack (feedback), and project management tools in one platform. Instead of switching between 4-5 tools, everything happens in Kreatli. This reduces costs by 40-70% compared to multiple tool subscriptions and saves 6+ hours weekly by eliminating tool-switching and context loss. All brand assets, feedback, and approvals stay in one place, making it easier to track campaign progress, maintain brand consistency, and deliver on time.',
    },
    {
      question: 'How does frame-accurate commenting work for brand video reviews?',
      answer:
        'Frame-accurate commenting lets stakeholders click directly on specific video frames to add feedback. When a stakeholder clicks frame 2:34 and comments "Make the logo 20% larger," your creative team sees exactly which frame needs changes—no guessing, no back-and-forth emails. Comments automatically link to the exact timestamp and asset, so feedback never gets lost. This precision reduces revision cycles by 50% because everyone knows exactly what needs to change, maintaining brand consistency throughout the review process.',
    },
    {
      question: 'Can I connect existing Google Drive or Dropbox folders to Kreatli projects?',
      answer:
        "Yes! Kreatli integrates with Google Drive and Dropbox, so you can connect existing brand asset folders without re-uploading files. Connect a brand asset library or campaign folder, and all files sync to your Kreatli project. Your team can continue using familiar cloud storage while leveraging Kreatli's review, approval, and collaboration features. This makes onboarding new campaigns faster since you don't need to migrate existing file structures.",
    },
    {
      question: 'How long does it take to set up a new brand campaign in Kreatli?',
      answer:
        'Setting up a new brand campaign takes 2-5 minutes. Create the campaign project, upload brand assets or connect cloud storage, organize files by campaign phase, and set permissions. Your team and external partners can start collaborating immediately. Most in-house teams find they save 2+ hours per campaign compared to setting up projects across multiple tools, since everything happens in one place with clear organization from day one.',
    },
    {
      question: 'What happens to brand assets after a campaign is completed?',
      answer:
        'Completed campaigns are archived with complete history preserved. All versions, feedback, approvals, and final assets remain accessible. When a team member asks for "version 3 of the Q4 brand video" or "approved logo variations from last year" months later, you can find them instantly in the archived campaign with all their approval history. Export final assets, generate delivery reports, and maintain a complete archive—no more searching through old emails or file folders to find previous campaign assets.',
    },
  ],
};

export default function InHouseCreativeContentTeamsPage() {
  useSession();

  return (
    <>
      <Head>
        <title>Kreatli for {data.title} | Video Production Platform for In-House Teams</title>
        <meta name="description" content={data.metaDescription} />
        <meta
          name="keywords"
          content="in-house video teams, content production platform, brand asset management, video collaboration software, internal video teams, brand management platform, video collaboration tools"
        />
        <link rel="canonical" href="https://kreatli.com/solutions/industry/in-house-creative-content-teams" />
        <meta property="og:url" content="https://kreatli.com/solutions/industry/in-house-creative-content-teams" />
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
          <p className="mx-auto line-clamp-2 max-w-2xl text-lg text-foreground-500">{data.description}</p>
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
              <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Brand Campaign Workflow</h2>
              <p className="mx-auto line-clamp-2 max-w-2xl text-lg text-foreground-500">
                From brand asset organization to campaign delivery—see how Kreatli streamlines your in-house team
                workflow. Organize brand assets, collaborate with external partners, collect stakeholder feedback, and
                deliver campaigns faster.
              </p>
            </div>

            {/* Workflow Progress Indicator */}
            <div className="sticky top-20 z-10 mb-12 flex justify-center">
              <div className="flex items-center gap-4 rounded-full bg-background px-6 py-3 shadow-large">
                <div className="group flex cursor-pointer items-center gap-2">
                  <div className="size-2 rounded-full bg-primary transition-transform duration-200"></div>
                  <a
                    href="#organize"
                    className="text-sm font-medium transition-colors duration-200 group-hover:text-primary"
                  >
                    Organize
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
                  1: 'organize',
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
                            <p className="line-clamp-2 text-base text-foreground-500 lg:text-lg">{step.description}</p>
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
                                  <p className="mb-3 line-clamp-2 text-base text-foreground-600">
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

          {/* Brand Asset Management */}
          <div className="mb-16">
            <div className="mb-8 text-center">
              <h3 className="mb-3 font-sans text-2xl font-bold">Brand Asset Management</h3>
              <p className="mx-auto line-clamp-2 max-w-2xl text-lg text-foreground-500">
                Centralize brand assets, campaign materials, and creative files. Maintain brand consistency across all
                projects.
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

          {/* External Partner Collaboration */}
          <div className="mb-16">
            <div className="mb-8 text-center">
              <h3 className="mb-3 font-sans text-2xl font-bold">External Partner Collaboration</h3>
              <p className="mx-auto line-clamp-2 max-w-2xl text-lg text-foreground-500">
                Share review links with external agencies and freelancers. They collaborate without creating
                accounts—reduces delays from days to hours.
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
              <p className="mx-auto line-clamp-2 max-w-2xl text-lg text-foreground-500">
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
            <p className="mx-auto line-clamp-2 max-w-2xl text-lg text-foreground-500">
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
            <p className="line-clamp-2 text-base text-foreground-600">
              If you didn't find the answer you were looking for, feel free to contact our support team at{' '}
              <a href="mailto:support@kreatli.com" className="font-semibold text-primary underline underline-offset-2">
                support@kreatli.com
              </a>{' '}
              to learn how Kreatli can help your specific workflow.
            </p>
          </div>
        </div>
      </section>

      {/* Related Platform Pages Section */}
      <RelatedResourcesSection
        resources={getRelatedResources(['creativeWorkspace', 'projectOrchestration', 'secureAssetStorage'])}
        title="Platform Features for In-House Teams"
        description="Explore the Kreatli platform features that help in-house teams organize workspaces and manage projects."
      />

      {/* More Resources Section */}
      <RelatedResourcesSection
        resources={getRelatedResources(['advertisingMarketingAgencies', 'videoProductionAnimationStudios', 'creativeProductionManagement'])}
        title="More Resources"
        description="Explore other Kreatli solutions to streamline your video collaboration workflow."
      />

      {/* CTA Section */}
      <section className="overflow-hidden bg-foreground-50 px-6 py-16 lg:py-24">
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col gap-6 text-center">
          <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Ready to Streamline Your Workflow?</h2>
          <p className="mx-auto line-clamp-2 max-w-2xl text-lg text-foreground-500">
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
