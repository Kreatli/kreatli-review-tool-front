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
                  <Card className="group w-full border border-foreground-200 hover:border-primary transition-all duration-300 hover:shadow-lg">
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
              Creative proofing solves the common challenges teams face when managing feedback across multiple review
              rounds.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {data.problemsSolved.items.map((problem, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
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
              <Card
                key={index}
                as={NextLink}
                href={audience.href}
                isPressable
                className="group h-full border border-foreground-200 hover:border-foreground-300 transition-all duration-300 hover:shadow-md"
              >
                <CardBody className="p-6 flex flex-col gap-4 h-full">
                  <div className="flex items-center gap-3">
                    <div className="bg-foreground-100 rounded-full p-2.5 transition-all duration-300 group-hover:bg-foreground-200 group-hover:scale-105">
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
              Get detailed answers about creative proofing for creative teams.
            </p>
          </div>
          <Accordion variant="splitted">
            {data.faqs.map((faq, index) => (
              <AccordionItem key={index} title={<span className="font-semibold text-lg">{faq.question}</span>}>
                <div className="text-foreground-500 text-base space-y-3 leading-relaxed">{faq.answer}</div>
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
          <h2 className="text-2xl sm:text-4xl font-bold font-sans">Ready to Turn Feedback Into Trackable Work?</h2>
          <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
            Experience how Kreatli enables creative proofing across versions and formats. Start using Kreatli today.
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
