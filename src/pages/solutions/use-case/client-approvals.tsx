import Head from 'next/head';
import React from 'react';

import { Header } from '../../../components/layout/Header';
import { FooterSection } from '../../../components/home/Footer/FooterSection';
import { useSession } from '../../../hooks/useSession';
import { Decorations } from '../../../components/layout/Storyblok/Decorations';
import { Card, CardBody, Button, Accordion, AccordionItem } from '@heroui/react';
import NextLink from 'next/link';
import { Icon } from '../../../components/various/Icon';

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
        'Client approvals in Kreatli are tracked automatically. Every file version shows its approval status—approved, pending, or blocked. You can see which approvers have signed off and which are still pending. All approval activity is visible in the project view.',
    },
    {
      question: 'How can I prove a client approved a specific version?',
      answer:
        'Every approval in Kreatli is permanently recorded with the exact file version, timestamp, and user information. The approval history shows who approved what, when, and which exact version was approved. This creates an audit trail that protects both agencies and clients.',
    },
    {
      question: 'What happens after a client approves a version?',
      answer:
        'When a client approves a version in Kreatli, the approved version is clearly marked and locked to prevent accidental changes, the production status updates to show the file is approved, and the approval is permanently recorded in the approval history. Producers see the approval immediately.',
    },
    {
      question: 'Can I require multiple approvers or set approval order?',
      answer:
        'Yes. In Kreatli, you can set required approvers for files or projects. The system tracks which approvers have approved and which are still pending, giving you clear visibility into blockers. You can also enforce approval order if multiple people need to approve in sequence.',
    },
    {
      question: 'How do client approvals differ from email or chat approvals?',
      answer:
        'Client approvals in Kreatli are tied to exact file versions, not links or email threads. When a client approves in Kreatli, that approval is permanently connected to the specific version they reviewed. Every approval is version-specific, timestamped, and recorded with user information.',
    },
  ],
};

export default function ClientApprovalsPage() {
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
      <section className="relative py-16 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center flex flex-col gap-6 relative z-10">
          <h1 className="text-2xl sm:text-4xl font-bold font-sans max-w-lg mx-auto">{data.title}</h1>
          <p className="text-lg text-foreground-500 max-w-2xl mx-auto">{data.intro}</p>
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

      {/* How It Works Section */}
      <section className="relative py-16 px-6 backdrop-blur-lg overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-bold font-sans mb-4">{data.howItWorks.title}</h2>
            <p className="text-lg text-foreground-500 max-w-2xl mx-auto">{data.howItWorks.description}</p>
          </div>

          {/* Steps Flow - Vertical Layout */}
          <div className="relative max-w-2xl mx-auto">
            <div className="flex flex-col items-center gap-6">
              {data.howItWorks.steps.map((step, index) => (
                <React.Fragment key={index}>
                  <Card className="group w-full">
                    <CardBody className="flex flex-col sm:flex-row gap-6 items-center sm:items-start p-6 sm:p-8">
                      <div className="relative flex-shrink-0">
                        <div className="bg-foreground-100 rounded-full size-16 flex items-center justify-center transition-all duration-300 group-hover:bg-primary/10 group-hover:scale-105">
                          <Icon
                            icon={step.icon as any}
                            size={28}
                            className="text-primary transition-colors duration-300"
                          />
                        </div>
                        <div className="absolute -top-2 -right-2 bg-foreground text-content1 font-bold font-sans text-sm rounded-full size-7 flex items-center justify-center shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-md">
                          {step.number}
                        </div>
                      </div>
                      <div className="flex flex-col gap-3 items-center sm:items-start text-center sm:text-left flex-1">
                        <h3 className="text-lg font-semibold font-sans">{step.title}</h3>
                        <p className="text-foreground-500 text-base leading-relaxed">{step.description}</p>
                      </div>
                    </CardBody>
                  </Card>

                  {/* Arrow Connector - Downward */}
                  {index < data.howItWorks.steps.length - 1 && (
                    <div className="flex items-center justify-center py-2 flex-shrink-0">
                      <div className="flex flex-col items-center gap-1">
                        <div className="h-4 w-0.5 bg-gradient-to-b from-transparent to-primary/50" />
                        <Icon icon="arrowRight" size={18} className="text-primary rotate-90" />
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
      <section className="relative py-16 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-bold font-sans mb-4">{data.problemsSolved.title}</h2>
            <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
              Client approvals solve the common challenges agencies and production teams face when managing approvals
              through email and chat.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {data.problemsSolved.items.map((problem, index) => (
              <Card key={index}>
                <CardBody className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-warning-50 rounded-full p-2 flex-shrink-0">
                      <Icon icon={problem.icon as any} size={20} className="text-warning" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold font-sans mb-2">{problem.title}</h3>
                      <p className="text-foreground-500 text-sm leading-relaxed">{problem.description}</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Who This Is For Section */}
      <section className="relative py-16 px-6 backdrop-blur-lg overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-bold font-sans mb-4">{data.whoThisIsFor.title}</h2>
            <p className="text-lg text-foreground-500 max-w-2xl mx-auto">{data.whoThisIsFor.description}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {data.whoThisIsFor.audiences.map((audience, index) => (
              <Card key={index} as={NextLink} href={audience.href} isPressable className="group h-full">
                <CardBody className="p-6 flex flex-col gap-4 h-full">
                  <div className="flex items-center gap-3">
                    <div className="bg-foreground-100 rounded-full p-2.5 transition-all duration-300 group-hover:bg-primary-50 group-hover:scale-105">
                      <Icon
                        icon={audience.icon as any}
                        size={20}
                        className="text-primary transition-colors duration-300"
                      />
                    </div>
                    <h3 className="text-lg font-semibold font-sans">{audience.title}</h3>
                  </div>
                  <p className="text-foreground-500 text-sm leading-relaxed flex-1">{audience.description}</p>
                  <div className="flex items-center gap-1 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
      <section className="relative py-16 px-6 backdrop-blur-lg overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-bold font-sans mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
              Get detailed answers about client approvals for agencies and production teams.
            </p>
          </div>
          <Accordion variant="splitted" className="gap-2">
            {data.faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                title={<span className="font-semibold text-base sm:text-lg">{faq.question}</span>}
                className="py-2"
              >
                <div className="text-foreground-500 leading-relaxed text-sm sm:text-base">{faq.answer}</div>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="max-w-3xl mx-auto flex flex-col gap-4 text-center items-center mt-12">
            <h3 className="text-xl font-sans font-bold">Still Have Questions?</h3>
            <p className="text-foreground-500">
              If you didn't find the answer you were looking for, feel free to contact our support team at{' '}
              <a href="mailto:support@kreatli.com" className="underline underline-offset-2 text-primary font-medium">
                support@kreatli.com
              </a>{' '}
              to learn how Kreatli can help your specific workflow.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-foreground-50 lg:py-24 py-16 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center flex flex-col gap-6 relative z-10">
          <h2 className="text-2xl sm:text-4xl font-bold font-sans">Ready to Streamline Client Approvals?</h2>
          <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
            Experience how Kreatli handles client approvals with version-specific tracking and clear accountability.
            Start using Kreatli today.
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
