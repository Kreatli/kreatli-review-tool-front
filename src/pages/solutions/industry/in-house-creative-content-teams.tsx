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
import { ProjectFeaturePreview } from '../../../components/home/Features/ProjectFeaturePreview';

const data = {
  title: 'In-House Creative & Content Teams',
  description:
    'Ideal for 2–10 person studios and pods juggling multiple client projects. Give clients a simple review experience while your team gets one organized home for files, feedback, and approvals.',
  detailedDescription:
    'In-house creative and content teams face unique challenges managing brand assets, coordinating with external agencies and freelancers, and maintaining brand consistency across multiple campaigns. Kreatli provides a centralized platform for brand asset management, campaign production, and creative workflows. Teams can organize projects by campaign, brand, or client, collaborate seamlessly with external partners, and streamline approval workflows for internal stakeholders. The platform gives clients a simple review experience while providing teams with powerful organization and collaboration tools.',
  painPoints: [
    'Juggling multiple client projects across different platforms',
    'Lost feedback in email threads and messaging apps',
    'Difficulty tracking project status and deliverables',
    'Managing client access without overwhelming them',
    'Managing multiple brand campaigns simultaneously',
    'Coordinating with external agencies and freelancers',
  ],
  benefits: [
    '50% faster approvals via no-signup links',
    'Save 6+ hours weekly—one platform',
    'Centralized brand asset management',
    'Zero lost feedback—all comments linked to assets',
    'Frame-accurate video feedback',
    'Streamlined stakeholder approvals',
    'Easy external partner collaboration',
  ],
  workflowExamples: [
    {
      title: 'Brand Campaign Production',
      scenario: 'Managing a multi-channel brand campaign with internal stakeholders and external agency partners',
      steps: [
        {
          step: '1. Setup',
          action: 'Create project: "Q4 Brand Campaign"',
          result: 'All campaign assets organized in one place',
          feature: 'Campaign Organization',
        },
        {
          step: '2. Collaboration',
          action: 'Share secure link with external agency',
          result: 'Agency uploads deliverables without signup',
          feature: 'External Partner Collaboration',
        },
        {
          step: '3. Review',
          action: 'Internal stakeholders review via no-signup link',
          result: 'Frame-accurate comments: "Adjust logo at 00:05:15"',
          feature: 'Frame-Accurate Review',
        },
        {
          step: '4. Approval',
          action: 'Marketing Director → Brand Manager → CMO approval chain',
          result: 'All approvals tracked and recorded',
          feature: 'Stakeholder Approval Workflows',
        },
        {
          step: '5. Brand Consistency',
          action: 'Reference approved brand assets from library',
          result: 'Maintain brand standards across all deliverables',
          feature: 'Brand Asset Management',
        },
      ],
      outcome: 'Campaign launched 2 days faster with complete brand consistency',
    },
    {
      title: 'Multi-Brand Asset Management',
      scenario: 'Managing brand assets for 5+ product lines with multiple stakeholders and external freelancers',
      steps: [
        {
          step: '1. Organization',
          action: 'Create brand asset folders by product line',
          result: 'All brand assets organized and accessible',
          feature: 'Brand Asset Management',
        },
        {
          step: '2. Collaboration',
          action: 'Share brand library with external freelancers',
          result: 'Freelancers access approved assets without signup',
          feature: 'External Partner Collaboration',
        },
        {
          step: '3. Feedback',
          action: 'Team adds asset-linked usage guidelines',
          result: 'Clear brand usage rules for all stakeholders',
          feature: 'Asset-Linked Feedback',
        },
        {
          step: '4. Version Control',
          action: 'Track logo variations and updates',
          result: 'Complete version history with comparison',
          feature: 'Version History',
        },
      ],
      outcome: 'Brand asset requests reduced by 50% with centralized, organized library',
    },
    {
      title: 'External Agency Coordination',
      scenario: 'Coordinating with 3 external agencies on a product launch campaign',
      steps: [
        {
          step: '1. Setup',
          action: 'Create project: "Product Launch Campaign"',
          result: 'Centralized hub for all agency deliverables',
          feature: 'Campaign Organization',
        },
        {
          step: '2. Collaboration',
          action: 'Share secure review links with each agency',
          result: 'Agencies upload and review without signup',
          feature: 'External Partner Collaboration',
        },
        {
          step: '3. Review',
          action: 'Internal team reviews all agency work in one place',
          result: 'Asset-linked feedback keeps everything organized',
          feature: 'Asset-Linked Feedback',
        },
        {
          step: '4. Approval',
          action: 'Stakeholder approval workflow',
          result: 'All approvals tracked across agencies',
          feature: 'Stakeholder Approval Workflows',
        },
        {
          step: '5. Delivery',
          action: 'Share password-protected final assets',
          result: 'Secure delivery with access logs',
          feature: 'Security',
        },
      ],
      outcome: 'Coordinated 3 agencies seamlessly with zero communication gaps',
    },
  ],
  useCases: [
    'Brand marketing teams managing campaign assets',
    'In-house creative teams coordinating with agencies',
    'Marketing operations managing multiple campaigns',
    'Content teams producing brand content at scale',
    'Design agencies managing multiple client brands',
    'Freelance teams working with various stakeholders',
  ],
  keyFeatures: [
    {
      icon: 'folder',
      title: 'Brand Asset Management',
      description:
        'Centralize brand assets, campaign materials, and creative files in organized project spaces. Maintain brand consistency across all projects with easy access to approved assets.',
    },
    {
      icon: 'user',
      title: 'External Partner Collaboration',
      description:
        'Collaborate seamlessly with external agencies and freelancers through secure guest links. They can access projects, provide feedback, and share deliverables without creating accounts.',
    },
    {
      icon: 'checkCircle',
      title: 'Stakeholder Approval Workflows',
      description:
        'Streamline approval processes for internal stakeholders. Track who approved what, when, and maintain complete records for campaign deliverables and brand assets.',
    },
    {
      icon: 'slides',
      title: 'Campaign Organization',
      description:
        'Organize projects by campaign, brand, or client. See at a glance which campaigns are in production, which need review, and which are complete.',
    },
  ],
  metaDescription:
    'Creative production platform for in-house creative and content teams. Manage brand assets, campaign production, and creative workflows. Collaborate with agencies, streamline approvals, and maintain brand consistency.',
  faqs: [
    {
      question: 'How does Kreatli help in-house teams maintain brand consistency?',
      answer:
        'Kreatli provides centralized brand asset management, allowing teams to organize approved brand assets, guidelines, and campaign materials in one place. All team members have access to the same brand assets, ensuring consistency across projects. You can organize projects by brand or campaign, making it easy to see what assets are being used and maintain brand standards throughout all creative work.',
    },
    {
      question: 'Can we collaborate with external agencies and freelancers?',
      answer:
        'Yes! Kreatli makes it easy to collaborate with external agencies and freelancers through secure guest review links. They can access projects, provide feedback, and share deliverables without creating accounts. All their work and feedback is organized in your project, keeping everything centralized while allowing external partners to participate seamlessly in your creative workflow.',
    },
    {
      question: 'How does Kreatli streamline approval workflows for internal stakeholders?',
      answer:
        "Kreatli provides streamlined approval workflows that allow internal stakeholders to review and approve creative work efficiently. You can set up custom approval processes, track who approved what and when, and maintain complete records for all campaign deliverables. All approvals are linked to specific assets, making it easy to see what's been approved and what still needs attention.",
    },
    {
      question: 'Can we organize projects by campaign or brand?',
      answer:
        'Yes! Kreatli allows you to organize projects by campaign, brand, client, or any other structure that makes sense for your team. You can see at a glance which campaigns are in production, which need review, and which are complete. This organization helps teams manage multiple campaigns simultaneously while maintaining clear visibility into project status and deliverables.',
    },
    {
      question: 'How does Kreatli help teams manage multiple brand campaigns?',
      answer:
        "Kreatli provides dedicated project spaces for each campaign, allowing teams to organize files, conversations, and approvals separately while maintaining a centralized view of all campaigns. You can organize by brand, campaign type, or client, making it easy to track what's in production, what needs review, and what's been approved. This organization is essential for teams managing multiple campaigns simultaneously.",
    },
  ],
};

export default function InHouseCreativeContentTeamsPage() {
  useSession();

  return (
    <>
      <Head>
        <title>Kreatli for {data.title} | Creative Production Platform for In-House Teams</title>
        <meta name="description" content={data.metaDescription} />
        <meta
          name="keywords"
          content="in-house creative teams, content production platform, brand asset management, creative workflow software, internal creative teams, brand management platform, creative collaboration tools"
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
            <h2 className="text-2xl sm:text-4xl font-bold font-sans mb-4">
              How Kreatli Improves In-House Team Workflows
            </h2>
            <p className="text-xl text-foreground-600 max-w-2xl mx-auto font-medium">
              Streamline brand asset management and stakeholder collaboration.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
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
                  <strong>Example:</strong> Brand campaign approved in 2 hours
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/10 rounded-full p-3">
                    <Icon icon="folder" size={24} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold font-sans">Centralized Brand Assets</h3>
                </div>
                <p className="text-foreground-600 text-base mb-3">
                  All brand assets in one place. Maintain consistency across all projects.
                </p>
                <div className="text-sm text-foreground-500">
                  <strong>Example:</strong> Brand asset requests reduced by 50%
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-warning/10 rounded-full p-3">
                    <Icon icon="user" size={24} className="text-warning" />
                  </div>
                  <h3 className="text-lg font-semibold font-sans">6+ Hours Saved Weekly</h3>
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
                How Kreatli powers in-house creative team workflows.
              </p>
            </div>
            <div className="flex flex-col gap-8">
              {data.workflowExamples.map((example, exampleIndex) => (
                <Card key={exampleIndex} className="dark:border border-foreground-300">
                  <CardBody className="p-8">
                    <div className="mb-6">
                      <Chip size="lg" variant="flat" color="primary" className="mb-3">
                        {example.title}
                      </Chip>
                      <h3 className="text-2xl font-bold font-sans mb-3 text-foreground-700">{example.scenario}</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      {example.steps.map((step, stepIndex) => (
                        <div key={stepIndex} className="flex flex-col gap-2">
                          <div className="flex items-start gap-3">
                            <div className="bg-primary/10 text-primary rounded-full size-6 flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">
                              {stepIndex + 1}
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-base mb-2">{step.step}</div>
                              <div className="text-foreground-600 text-base mb-2">{step.action}</div>
                              <div className="text-foreground-500 text-sm italic mb-2">→ {step.result}</div>
                              <Chip size="md" variant="flat" className="text-sm">
                                {step.feature}
                              </Chip>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                      <div className="flex items-start gap-2">
                        <Icon icon="checkCircle" size={20} className="text-success flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold text-base text-success mb-2">Workflow Outcome</div>
                          <div className="text-foreground-700 text-base font-medium">{example.outcome}</div>
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

          {/* Brand Asset Management */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold font-sans mb-3">Brand Asset Management</h3>
              <p className="text-lg text-foreground-600 max-w-2xl mx-auto">
                Centralize brand assets, campaign materials, and creative files in organized project spaces. Maintain
                brand consistency across all projects with easy access to approved assets.
              </p>
            </div>
            <HomeDashboardFeaturePreview />
          </div>

          {/* External Partner Collaboration */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold font-sans mb-3">External Partner Collaboration</h3>
              <p className="text-lg text-foreground-600 max-w-2xl mx-auto">
                Collaborate seamlessly with external agencies and freelancers through secure guest links. They can
                access projects, provide feedback, and share deliverables without creating accounts.
              </p>
            </div>
            <ShareFeaturePreview />
          </div>

          {/* Stakeholder Approval Workflows */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold font-sans mb-3">Stakeholder Approval Workflows</h3>
              <p className="text-lg text-foreground-600 max-w-2xl mx-auto">
                Streamline approval processes for internal stakeholders. Track who approved what, when, and maintain
                complete records for campaign deliverables and brand assets. All feedback stays linked to specific
                assets.
              </p>
            </div>
            <ChatFeaturePreview />
          </div>

          {/* Campaign Organization */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold font-sans mb-3">Campaign Organization</h3>
              <p className="text-lg text-foreground-600 max-w-2xl mx-auto">
                Organize projects by campaign, brand, or client. See at a glance which campaigns are in production,
                which need review, and which are complete.
              </p>
            </div>
            <ProjectFeaturePreview />
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
