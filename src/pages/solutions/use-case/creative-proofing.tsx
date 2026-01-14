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
  title: 'Creative Proofing',
  intro:
    'Review creative work and turn feedback into trackable work. Every upload creates a new version for easy comparison.',
  metaDescription:
    'Creative proofing platform for design, video, and marketing teams. Comment directly on files, compare versions, and turn feedback into trackable work. Every upload creates a new version with complete history.',
  howItWorks: {
    title: 'How Proofing Works',
    description:
      'Creative proofing follows the natural flow of review cycles, from upload through feedback to the next version.',
    steps: [
      {
        number: 1,
        icon: 'upload',
        title: 'Upload',
        description:
          'Upload your creative work. Every upload creates a new version instead of overwriting files, preserving complete history.',
      },
      {
        number: 2,
        icon: 'eye',
        title: 'Review',
        description:
          'Reviewers comment directly on files, marking specific frames or areas. Comments are tied to the version being reviewed.',
      },
      {
        number: 3,
        icon: 'edit',
        title: 'Changes',
        description:
          "Feedback becomes trackable work with ownership. Teams see what needs addressing, who's responsible, and what's resolved.",
      },
      {
        number: 4,
        icon: 'compare',
        title: 'Next Version',
        description:
          'Create the next version with changes. Compare versions side-by-side to see what changed. Previous versions remain accessible.',
      },
    ],
  },
  problemsSolved: {
    title: 'Problems This Solves',
    items: [
      {
        icon: 'warning',
        title: 'Version Confusion',
        description:
          'Every upload creates a new version instead of overwriting files. Compare versions side-by-side and access any previous version.',
      },
      {
        icon: 'warning',
        title: 'Lost Feedback',
        description:
          'Feedback becomes trackable work with ownership. Unresolved comments are visible and tied to the right people.',
      },
      {
        icon: 'warning',
        title: 'Isolated Comments',
        description:
          'Comments become actionable work with ownership. All feedback stays connected to specific files and versions.',
      },
      {
        icon: 'warning',
        title: 'No Version Comparison',
        description:
          'Compare any two versions side-by-side to see exactly what changed. Verify changes were made and ensure nothing was missed.',
      },
    ],
  },
  whoThisIsFor: {
    title: 'Who This Is For',
    description:
      'Built for teams that produce iterative work and need to manage feedback across multiple review rounds.',
    audiences: [
      {
        icon: 'paint',
        title: 'Design Teams',
        description:
          'Design teams creating multiple iterations of visuals and graphics. Track feedback across versions and compare designs.',
        href: '/solutions/industry/advertising-marketing-agencies',
      },
      {
        icon: 'monitorPlay',
        title: 'Video Teams',
        description:
          'Video production teams managing frame-accurate feedback across cuts and revisions. Comment on specific frames and compare versions.',
        href: '/solutions/industry/video-production-animation-studios',
      },
      {
        icon: 'suitcase',
        title: 'In-House Teams',
        description:
          'Creative and content teams producing content at scale with multiple stakeholders. Manage review rounds efficiently and track approvals.',
        href: '/solutions/industry/in-house-creative-content-teams',
      },
    ],
  },
  faqs: [
    {
      question: 'What is creative proofing?',
      answer:
        'Creative proofing is reviewing creative work and collecting feedback that turns into trackable work. Every upload creates a new version instead of overwriting files, so teams can compare versions and ensure feedback becomes actionable.',
    },
    {
      question: 'How do I manage feedback across multiple versions?',
      answer:
        'In Kreatli, every upload creates a new version, and comments are tied to specific versions. You can compare versions side-by-side to see what changed. Feedback becomes trackable work with ownership, so unresolved comments are visible and tied to the right people.',
    },
    {
      question: 'Can reviewers comment directly on videos and images?',
      answer:
        'Yes! Reviewers can comment directly on files—videos, images, and documents. For videos, comments are tied to specific frames. For images, comments mark specific areas. All comments are tied to the version being reviewed, keeping feedback in context.',
    },
    {
      question: 'How does version comparison work?',
      answer:
        'Kreatli allows you to compare any two versions side-by-side to see exactly what changed. This helps teams understand revisions and verify that requested changes were made. Previous versions remain accessible, so you can always reference earlier iterations or revert if needed.',
    },
    {
      question: 'How does feedback become trackable work?',
      answer:
        'In Kreatli, feedback becomes actionable work with ownership. Comments can be assigned to team members, marked as resolved or unresolved, and tracked through the workflow. Unresolved feedback stays visible and tied to the right people, ensuring every comment gets addressed.',
    },
    {
      question: 'What happens when I upload a new version?',
      answer:
        "When you upload a new version in Kreatli, it doesn't overwrite the previous file—it creates a new version in the history. All previous versions remain accessible, so you can compare versions, reference earlier iterations, or revert if needed. Comments from previous versions stay connected.",
    },
  ],
};

export default function CreativeProofingPage() {
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
        <link rel="canonical" href="https://kreatli.com/solutions/use-case/creative-proofing" />
        <meta property="og:url" content="https://kreatli.com/solutions/use-case/creative-proofing" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`Kreatli | ${data.title} – Creative Production Solution`} />
        <meta property="og:description" content={data.metaDescription} />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:secure_url" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:alt" content={`Kreatli | ${data.title} – Creative Production Solution`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Kreatli | ${data.title} – Creative Production Solution`} />
        <meta name="twitter:description" content={data.metaDescription} />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
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
              Creative proofing solves the common challenges teams face when managing feedback across multiple review
              rounds.
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
              Get detailed answers about creative proofing for creative teams.
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
          <h2 className="font-sans text-2xl font-bold sm:text-4xl">Ready to Turn Feedback Into Trackable Work?</h2>
          <p className="mx-auto max-w-2xl text-lg text-foreground-500">
            Experience how Kreatli enables creative proofing across versions and formats. Start using Kreatli today.
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
