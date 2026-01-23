import { Accordion, AccordionItem, Button, Card, CardBody } from '@heroui/react';
import { ISbStoryData } from '@storyblok/react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';
import React from 'react';

import { FooterSection } from '../../../components/home/Footer/FooterSection';
import { Header } from '../../../components/layout/Header';
import { Decorations } from '../../../components/layout/Storyblok/Decorations';
import { ArticlesSection } from '../../../components/shared/ArticlesSection';
import { RelatedResourcesSection } from '../../../components/shared/RelatedResourcesSection';
import { Icon, IconType } from '../../../components/various/Icon';
import { getRelatedResources } from '../../../data/related-resources';
import { useSession } from '../../../hooks/useSession';
import { getStoryblokApi } from '../../../lib/storyblok';
import { PageStoryblok } from '../../../typings/storyblok';

const data = {
  title: 'Client Approvals',
  intro:
    'Client approvals tied to exact file versions, not links or emails. See status at a glance and maintain a complete audit trail that protects both parties.',
  metaDescription:
    'Client approval system that ties approvals to exact file versions. Enforce required approvers, track approval history, and eliminate approval confusion. Built for agencies and production teams working with external clients.',
  howItWorks: {
    title: 'How It Works',
    description:
      'Client approvals in Kreatli follow the natural flow of review and approval, from upload through final sign-off.',
    steps: [
      {
        number: 1,
        icon: 'upload',
        title: 'Upload Version',
        description:
          'Upload a file version for client review. Each version is tracked separately, so approvals are always tied to the exact file the client reviewed.',
      },
      {
        number: 2,
        icon: 'eye',
        title: 'Client Reviews',
        description:
          'Clients access files through secure review links. They can review, comment, request changes, or approve—all in one place. No account required.',
      },
      {
        number: 3,
        icon: 'group',
        title: 'Required Approvers',
        description:
          'Set required approvers and enforce approval order. The system tracks who has approved and who is still pending, giving producers clear visibility into blockers.',
      },
      {
        number: 4,
        icon: 'checkCircle',
        title: 'Approval Recorded',
        description:
          'When a client approves, the approval is permanently recorded with timestamp and user information. The approved version is clearly marked and locked.',
      },
      {
        number: 5,
        icon: 'time',
        title: 'Approval History',
        description:
          'Complete approval history is saved for every version. See who approved what, when, and which exact version was approved. This audit trail protects both parties.',
      },
    ],
  },
  problemsSolved: {
    title: 'Problems This Solves',
    items: [
      {
        icon: 'warning',
        title: 'Email Approval Confusion',
        description:
          'Stop wondering which version was approved. "Looks good!" in an email doesn\'t specify the version. Kreatli ties every approval to the exact file version reviewed.',
      },
      {
        icon: 'warning',
        title: 'Status Chasing',
        description:
          'See approval status at a glance. Know immediately which files are approved, pending, or blocked. No more asking "did you approve this?" or searching through email threads.',
      },
      {
        icon: 'warning',
        title: 'No Approval Record',
        description:
          'Every approval is permanently recorded with timestamp and user information. If disputes arise, you have a clear record of what was approved, when, and by whom.',
      },
      {
        icon: 'warning',
        title: 'Version Confusion',
        description:
          'Approvals are tied to exact file versions, not links or emails. See which version was approved and maintain complete approval history for every version.',
      },
    ],
  },
  whoThisIsFor: {
    title: 'Who This Is For',
    description:
      'Built for agencies and production teams working with external clients who need clear approvals and accountability.',
    audiences: [
      {
        icon: 'group',
        title: 'Agencies',
        description:
          'Agency producers managing client approvals across multiple projects. Track approvals, enforce required sign-offs, and maintain clear records for every client.',
        href: '/solutions/industry/advertising-marketing-agencies',
      },
      {
        icon: 'monitorPlay',
        title: 'Production Teams',
        description:
          'Video and animation production teams working with external clients. Streamline approval workflows, reduce chasing, and protect approved versions.',
        href: '/solutions/industry/video-production-animation-studios',
      },
      {
        icon: 'suitcase',
        title: 'In-House Content Teams',
        description:
          'In-house creative and content teams working with external stakeholders. Manage approvals efficiently, track sign-offs, and maintain accountability across campaigns.',
        href: '/solutions/industry/in-house-creative-content-teams',
      },
    ],
  },
  faqs: [
    {
      question: 'How do I track client approvals in Kreatli?',
      answer:
        'Client approvals in Kreatli are tracked automatically. Every file version shows its approval status—approved, pending, or blocked. You can see which approvers have signed off and which are still pending. All approval activity is visible in the project view, giving you complete visibility into approval status across all files and projects without needing to check email threads or ask clients for updates.',
    },
    {
      question: 'How can I prove a client approved a specific version?',
      answer:
        'Every approval in Kreatli is permanently recorded with the exact file version, timestamp, and user information. The approval history shows who approved what, when, and which exact version was approved. This creates an audit trail that protects both agencies and clients. If disputes arise, you have clear documentation showing which version was approved, when it was approved, and by whom. This eliminates "he said, she said" situations and provides legal protection for both parties.',
    },
    {
      question: 'What happens after a client approves a version?',
      answer:
        'When a client approves a version in Kreatli, the approved version is clearly marked and locked to prevent accidental changes, the production status updates to show the file is approved, and the approval is permanently recorded in the approval history. Producers see the approval immediately through real-time notifications, and the project dashboard reflects the updated status. This ensures everyone on the team knows the file has been approved and can proceed with next steps.',
    },
    {
      question: 'Can I require multiple approvers or set approval order?',
      answer:
        'Yes. In Kreatli, you can set required approvers for files or projects. The system tracks which approvers have approved and which are still pending, giving you clear visibility into blockers. You can also enforce approval order if multiple people need to approve in sequence (e.g., creative director must approve before client). This is essential for complex approval workflows where multiple stakeholders need to sign off in a specific order.',
    },
    {
      question: 'How do client approvals differ from email or chat approvals?',
      answer:
        'Client approvals in Kreatli are tied to exact file versions, not links or email threads. When a client approves in Kreatli, that approval is permanently connected to the specific version they reviewed. Every approval is version-specific, timestamped, and recorded with user information. Unlike email approvals where "Looks good!" doesn\'t specify which version, Kreatli ensures approvals are always linked to the exact file version. This eliminates confusion and provides clear accountability.',
    },
    {
      question: 'Do clients need to create an account to approve files?',
      answer:
        'No. Clients can approve files in Kreatli without creating an account. You generate secure, no-signup guest review links and send them to clients. They can access the review interface, view files, add comments, and approve versions—all without signing up. This eliminates approval delays caused by account creation barriers and makes the approval process seamless for clients. The no-signup approach reduces friction and speeds up approval cycles from days to hours.',
    },
    {
      question: 'Can I see approval status across multiple projects?',
      answer:
        "Yes. Kreatli's centralized dashboard provides visibility into approval status across all your projects. You can see which files are pending approval, which have been approved, and which are blocked across multiple client projects in one view. This is essential for agencies managing multiple client accounts simultaneously. You can filter by project, status, client, or assignee to quickly find what needs attention, making it easy to stay on top of approvals across your entire client portfolio.",
    },
    {
      question: 'What if a client needs to change their approval?',
      answer:
        "If a client needs to change their approval or request revisions after approving, they can do so in Kreatli. When a new version is uploaded, the approval status resets, and clients can review and approve the new version. The previous approval remains in the approval history, so you have a complete record of all approvals. This ensures clients only approve versions they've actually reviewed, and you maintain a clear audit trail of the approval process.",
    },
    {
      question: 'How does Kreatli prevent approval confusion with multiple versions?',
      answer:
        'Kreatli prevents approval confusion by tying every approval to the exact file version. Each version is tracked separately, so when a client approves "Version 3," that approval is permanently linked to Version 3 specifically. If Version 4 is uploaded later, the approval status resets, ensuring clients only approve versions they\'ve reviewed. The version history shows all versions and their approval status, making it clear which version is approved and which versions are pending or need review.',
    },
    {
      question: 'Is there a limit to how many approvers I can require?',
      answer:
        'No. Kreatli supports multiple required approvers for files and projects. You can set as many approvers as needed for your workflow. The system tracks which approvers have approved and which are still pending, giving you clear visibility into blockers. This is perfect for complex approval workflows where multiple stakeholders (creative director, account manager, client, legal, etc.) all need to sign off. You can see at a glance who has approved and who still needs to provide approval.',
    },
    {
      question: 'How do I know when a client has approved a file?',
      answer:
        "Kreatli provides real-time notifications when clients approve files. You'll receive immediate alerts through the platform, and the approval appears in your project dashboard right away. The approved file is clearly marked with approval status, and you can see who approved it and when. This eliminates the need to check email or ask clients for status updates. Real-time notifications ensure you never miss an approval and can proceed with production immediately.",
    },
    {
      question: 'Can I export approval history for record-keeping?',
      answer:
        'Yes. Kreatli maintains complete approval history that you can reference at any time. The approval history shows all approvals for every version, including who approved what, when, and which exact version was approved. This creates a permanent audit trail that you can reference for record-keeping, legal protection, or client reporting. The approval history is stored permanently with the project, so you always have documentation of what was approved and when.',
    },
  ],
};

const DRAFT_REVALIDATE_TIME = 60;
const PUBLISHED_REVALIDATE_TIME = 3600;

interface Props {
  articles?: ISbStoryData<PageStoryblok>[];
}

export default function ClientApprovalsPage({ articles = [] }: Props) {
  useSession();

  return (
    <>
      <Head>
        <title>Kreatli | {data.title} – Video Collaboration Solution</title>
        <meta name="description" content={data.metaDescription} />
        <link rel="canonical" href="https://kreatli.com/solutions/use-case/client-approvals" />
        <meta property="og:url" content="https://kreatli.com/solutions/use-case/client-approvals" />
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
              Client approvals solve the common challenges agencies and production teams face when managing approvals
              through email and chat.
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
              Get detailed answers about client approvals for agencies and production teams.
            </p>
          </div>
          <Accordion variant="splitted" className="gap-2">
            {data.faqs.map((faq, index) => (
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
              to learn how Kreatli can help your specific workflow.
            </p>
          </div>
        </div>
      </section>

      {/* Related Platform Pages Section */}
      <RelatedResourcesSection
        resources={getRelatedResources(['reviewApproval', 'secureAssetStorage', 'projectOrchestration'])}
        title="Platform Features for Client Approvals"
        description="Explore the Kreatli platform features that help teams manage client approvals with version-specific tracking."
      />

      {/* Guides Section */}
      <ArticlesSection
        articles={articles}
        title="See How This Works in Practice"
        description="Explore real-world workflows and guides that demonstrate client approval workflows in action."
        viewAllHref="/guides"
        viewAllButtonText="View All Guides"
      />

      {/* More Resources Section */}
      <RelatedResourcesSection
        resources={getRelatedResources(['creativeProductionManagement', 'creativeProofing', 'advertisingMarketingAgencies'])}
        title="More Resources"
        description="Explore other Kreatli solutions to streamline your video collaboration workflow."
      />

      {/* CTA Section */}
      <section className="overflow-hidden bg-foreground-50 px-6 py-16 lg:py-24">
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col gap-6 text-center">
          <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Ready to Streamline Client Approvals?</h2>
          <p className="mx-auto max-w-2xl text-lg text-foreground-500">
            Experience how Kreatli handles client approvals with version-specific tracking and clear accountability.
            Start using Kreatli today.
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

export const getStaticProps = (async () => {
  try {
    // Fetch articles from guides, comparisons, and blog
    const [guidesData, comparisonsData, blogData] = await Promise.all([
      getStoryblokApi().getStories({
        starts_with: 'guides/',
        excluding_fields: 'body',
        version: (process.env.STORYBLOK_STATUS ?? 'published') as 'draft' | 'published',
        sort_by: 'content.publishDate:desc',
        per_page: 10,
      }),
      getStoryblokApi().getStories({
        starts_with: 'comparisons/',
        excluding_fields: 'body',
        version: (process.env.STORYBLOK_STATUS ?? 'published') as 'draft' | 'published',
        sort_by: 'content.publishDate:desc',
        per_page: 10,
      }),
      getStoryblokApi().getStories({
        starts_with: 'blog/',
        excluding_fields: 'body',
        version: (process.env.STORYBLOK_STATUS ?? 'published') as 'draft' | 'published',
        sort_by: 'content.publishDate:desc',
        per_page: 10,
      }),
    ]);

    // Combine all articles and sort by publish date
    const allArticles = [
      ...(guidesData?.data?.stories || []),
      ...(comparisonsData?.data?.stories || []),
      ...(blogData?.data?.stories || []),
    ].sort((a, b) => {
      const dateA = a.content.publishDate ? new Date(a.content.publishDate).getTime() : 0;
      const dateB = b.content.publishDate ? new Date(b.content.publishDate).getTime() : 0;
      return dateB - dateA;
    });

    // Take the 3 most recent articles
    const articles = allArticles.slice(0, 3) as ISbStoryData<PageStoryblok>[];

    return {
      props: {
        articles: articles || [],
      },
      revalidate: process.env.STORYBLOK_STATUS === 'draft' ? DRAFT_REVALIDATE_TIME : PUBLISHED_REVALIDATE_TIME,
    };
  } catch {
    return {
      props: {
        articles: [],
      },
      revalidate: PUBLISHED_REVALIDATE_TIME,
    };
  }
}) satisfies GetStaticProps<Props>;
