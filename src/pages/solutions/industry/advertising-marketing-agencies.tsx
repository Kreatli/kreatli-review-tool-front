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
  workflowExamples: [
    {
      title: 'Campaign Launch Workflow',
      scenario: 'Launching a multi-channel campaign for a Fortune 500 client',
      steps: [
        {
          step: '1. Setup',
          action: 'Create project: "Client Q4 Launch"',
          result: 'All assets organized in one place',
          feature: 'Campaign Management',
        },
        {
          step: '2. Review',
          action: 'Client reviews via no-signup link',
          result: 'Client adds comment: "Make logo larger"',
          feature: 'No-Signup Links',
        },
        {
          step: '3. Approval',
          action: 'CD → AM → Client approval chain',
          result: 'All approvals tracked in one place',
          feature: 'Campaign Management',
        },
        {
          step: '4. Feedback',
          action: 'Team adds asset-linked comments',
          result: 'All feedback stays with files',
          feature: 'Asset-Linked Feedback',
        },
        {
          step: '5. Delivery',
          action: 'Share password-protected link',
          result: 'Secure delivery with access logs',
          feature: 'No-Signup Links',
        },
      ],
      outcome: 'Campaign launched 3 days faster with zero version confusion',
    },
    {
      title: 'Social Media Campaign Production',
      scenario: 'Managing 50+ social media assets across 3 platforms for a retail client',
      steps: [
        {
          step: '1. Organization',
          action: 'Upload 50+ assets',
          result: 'Organized by platform',
          feature: 'Campaign Management',
        },
        {
          step: '2. Collaboration',
          action: 'Team adds asset-linked comments',
          result: 'No lost feedback',
          feature: 'Asset-Linked Feedback',
        },
        {
          step: '3. Review',
          action: 'Share single review link',
          result: 'Client approves all in one session',
          feature: 'No-Signup Links',
        },
        {
          step: '4. Tracking',
          action: 'Mark status: Approved/Needs Revision',
          result: 'Dashboard shows what needs attention',
          feature: 'Campaign Management',
        },
      ],
      outcome: '50+ assets reviewed and approved in 2 hours instead of 3 days',
    },
    {
      title: 'Brand Asset Management',
      scenario: 'Managing brand assets for 10+ clients with multiple logo variations and guidelines',
      steps: [
        {
          step: '1. Setup',
          action: 'Create brand asset folders',
          result: 'All assets organized by client',
          feature: 'Campaign Management',
        },
        {
          step: '2. Organization',
          action: 'Upload logo variations',
          result: 'All assets organized by client',
          feature: 'Campaign Management',
        },
        {
          step: '3. Access',
          action: 'Share password-protected library',
          result: 'Client access without signup',
          feature: 'No-Signup Links',
        },
        {
          step: '4. Collaboration',
          action: 'Team adds usage guidelines',
          result: 'Clear usage rules',
          feature: 'Asset-Linked Feedback',
        },
      ],
      outcome: 'Brand asset requests reduced by 60% with centralized, organized library',
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
      question: 'How does Kreatli help manage multiple client campaigns?',
      answer:
        'Dedicated project spaces for each campaign with centralized dashboard. See all 15+ campaigns, status, and approvals in one view. Unlimited projects and team members.',
    },
    {
      question: 'Can clients review without creating accounts?',
      answer:
        'Yes! Share password-protected review links. Clients review, add comments, and approve—no account required. Reduces delays from 3-5 days to hours.',
    },
    {
      question: 'What security features are available?',
      answer:
        'Password-protected links with expiration dates, access controls, and audit trails. Meets enterprise security requirements.',
    },
    {
      question: 'How does Kreatli compare to multiple tools?',
      answer:
        'One platform replaces Google Drive, Frame.io, Slack, and Asana. Reduces costs 40-70% and saves 8+ hours weekly.',
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
          <p className="text-xl text-foreground-600 max-w-2xl mx-auto font-medium">{data.description}</p>
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

      {/* Workflow Improvements Section */}
      <section className="relative py-16 px-6 backdrop-blur-lg overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-bold font-sans mb-4">How Kreatli Improves Agency Workflows</h2>
            <p className="text-xl text-foreground-600 max-w-2xl mx-auto font-medium">
              Streamline campaign production and client collaboration.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-success/10 rounded-full p-3">
                    <Icon icon="checkCircle" size={24} className="text-success" />
                  </div>
                  <h3 className="text-lg font-semibold font-sans">50% Faster Approvals</h3>
                </div>
                <p className="text-foreground-600 text-base mb-3">
                  No-signup links reduce approval delays from days to hours.
                </p>
                <div className="text-sm text-foreground-500">
                  <strong>Example:</strong> Campaign assets approved in 2 hours
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-warning/10 rounded-full p-3">
                    <Icon icon="folder" size={24} className="text-warning" />
                  </div>
                  <h3 className="text-lg font-semibold font-sans">8+ Hours Saved Weekly</h3>
                </div>
                <p className="text-foreground-600 text-base mb-3">
                  One platform replaces multiple tools. No tool-switching.
                </p>
                <div className="text-sm text-foreground-500">
                  <strong>Example:</strong> All campaigns in one dashboard
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Workflow Examples Section */}
      {data.workflowExamples && (
        <section className="relative py-16 px-6 overflow-hidden">
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-4xl font-bold font-sans mb-4">Real Workflow Examples</h2>
              <p className="text-xl text-foreground-600 max-w-2xl mx-auto font-medium">
                How Kreatli powers agency workflows.
              </p>
            </div>
            <div className="flex flex-col gap-12">
              {data.workflowExamples.map((example, exampleIndex) => (
                <Card key={exampleIndex} className="dark:border border-foreground-300 shadow-lg">
                  <CardBody className="p-8 lg:p-10">
                    {/* Header */}
                    <div className="mb-8 pb-6 border-b border-foreground-200">
                      <div className="flex items-center gap-3 mb-4">
                        <Chip size="lg" variant="flat" color="primary" className="font-semibold">
                          {example.title}
                        </Chip>
                        <div className="h-px flex-1 bg-foreground-200" />
                      </div>
                      <h3 className="text-2xl lg:text-3xl font-bold font-sans text-foreground-800">
                        {example.scenario}
                      </h3>
                    </div>

                    {/* Steps */}
                    <div className="mb-8">
                      <div className="grid md:grid-cols-2 gap-6">
                        {example.steps.map((step, stepIndex) => (
                          <div
                            key={stepIndex}
                            className="relative bg-foreground-50 dark:bg-foreground-100 rounded-xl p-5 border border-foreground-200 hover:border-primary/30 transition-colors"
                          >
                            {/* Step Number Badge */}
                            <div className="absolute -top-3 -left-3">
                              <div className="bg-primary text-content1 rounded-full size-8 flex items-center justify-center text-sm font-bold shadow-md">
                                {stepIndex + 1}
                              </div>
                            </div>

                            <div className="flex flex-col gap-3 mt-2">
                              {/* Step Title */}
                              <div className="font-bold text-lg text-foreground-800">{step.step}</div>

                              {/* Action */}
                              <div className="text-foreground-700 text-base leading-relaxed">{step.action}</div>

                              {/* Result */}
                              <div className="flex items-start gap-2 pt-2 border-t border-foreground-200">
                                <Icon icon="arrowRight" size={16} className="text-primary mt-1 flex-shrink-0" />
                                <div className="text-foreground-600 text-sm italic flex-1">{step.result}</div>
                              </div>

                              {/* Feature Tag */}
                              <div className="pt-2">
                                <Chip size="sm" variant="flat" color="primary" className="text-xs font-medium">
                                  {step.feature}
                                </Chip>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Outcome */}
                    <div className="bg-gradient-to-r from-success/10 to-success/5 border-2 border-success/20 rounded-xl p-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-success/20 rounded-full p-3 flex-shrink-0">
                          <Icon icon="checkCircle" size={24} className="text-success" />
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-lg text-success mb-2">Workflow Outcome</div>
                          <div className="text-foreground-800 text-lg font-semibold leading-relaxed">
                            {example.outcome}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
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
              <p className="text-lg text-foreground-600 max-w-2xl mx-auto">
                Organize 15+ client campaigns in dedicated project spaces. See all campaigns and their status in one
                dashboard.
              </p>
            </div>
            <HomeDashboardFeaturePreview />
          </div>

          {/* No-Signup Client Review Links */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold font-sans mb-3">No-Signup Client Review Links</h3>
              <p className="text-lg text-foreground-600 max-w-2xl mx-auto">
                Share password-protected review links. Clients review and approve—no account required. Reduces delays
                from 3-5 days to hours.
              </p>
            </div>
            <ShareFeaturePreview />
          </div>

          {/* Asset-Linked Feedback */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold font-sans mb-3">Asset-Linked Feedback</h3>
              <p className="text-lg text-foreground-600 max-w-2xl mx-auto">
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
            <p className="text-xl text-foreground-600 max-w-2xl mx-auto font-medium">
              Common questions about Kreatli for {data.title.toLowerCase()}.
            </p>
          </div>
          <Accordion variant="splitted">
            {data.faqs.map((faq, index) => (
              <AccordionItem key={index} title={<span className="font-semibold text-lg">{faq.question}</span>}>
                <div className="text-foreground-600 text-base space-y-3 leading-relaxed">{faq.answer}</div>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="max-w-3xl mx-auto flex flex-col gap-4 text-center items-center mt-8">
            <h3 className="text-xl font-sans font-bold">Still Have Questions?</h3>
            <p className="text-foreground-600 text-base">
              If you didn't find the answer you were looking for, feel free to contact our support team at{' '}
              <a href="mailto:support@kreatli.com" className="underline underline-offset-2 text-primary font-semibold">
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
          <h2 className="text-2xl sm:text-4xl font-bold font-sans">Ready to Streamline Your Workflow?</h2>
          <p className="text-xl text-foreground-600 max-w-2xl mx-auto font-medium">
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
