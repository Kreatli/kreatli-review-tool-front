import Head from 'next/head';
import React from 'react';

import { Header } from '../../../components/layout/Header';
import { FooterSection } from '../../../components/home/Footer/FooterSection';
import { useSession } from '../../../hooks/useSession';
import { Decorations } from '../../../components/layout/Storyblok/Decorations';
import { Card, CardBody, Button, Chip, Accordion, AccordionItem } from '@heroui/react';
import NextLink from 'next/link';
import { Icon } from '../../../components/various/Icon';
import { ReviewToolPreview } from '../../../components/home/Features/ReviewToolPreview';
import { CompareFeaturePreview } from '../../../components/home/Features/CompareFeaturePreview';
import { ProjectFeaturePreview } from '../../../components/home/Features/ProjectFeaturePreview';

const data = {
  title: 'Video Production & Animation Studios',
  description:
    'Frame-accurate feedback, version control, and collaboration for video production teams. Ship more content with less chaos.',
  painPoints: [
    'Feedback scattered across email, messages, and comments',
    'Version confusion causing rework',
    'Sharing large video files is slow and unreliable',
    'Coordinating with editors and team members',
    'Managing complex multi-phase production projects',
    'Coordinating feedback from directors, producers, and clients',
  ],
  benefits: [
    'Frame-accurate feedback directly on your videos',
    '50% faster approvals via no-signup links',
    'Organize all projects in one central workspace',
    'Share secure review links without signups',
    'Track all revisions and feedback history',
    'Advanced version control and comparison tools',
    'Professional approval workflows',
  ],
  workflowExamples: [
    {
      title: 'Post-Production Video Review Workflow',
      scenario: 'Managing final cut review for a 30-minute documentary with director, producer, and client feedback',
      steps: [
        {
          step: '1. Upload',
          action: 'Upload final cut (15GB video file)',
          result: 'Large file uploaded securely',
          feature: 'Large File Support',
        },
        {
          step: '2. Review',
          action: 'Director adds frame-accurate comment: "Add transition at 00:12:30"',
          result: 'Editor sees exact timestamp',
          feature: 'Frame-Accurate Review',
        },
        {
          step: '3. Client Approval',
          action: 'Share no-signup review link with client',
          result: 'Client approves in 2 hours instead of 3 days',
          feature: 'No-Signup Links',
        },
        {
          step: '4. Version Control',
          action: 'Client requests revert to v2',
          result: 'Compare and revert instantly',
          feature: 'Version History',
        },
        {
          step: '5. Final Delivery',
          action: 'Share password-protected delivery link',
          result: 'Secure delivery with access logs',
          feature: 'Security',
        },
      ],
      outcome: 'Documentary approved and delivered 5 days faster with zero version confusion',
    },
    {
      title: 'Animation Production Pipeline',
      scenario: 'Coordinating 50+ animation scenes across 3 animators for a 5-minute animated short',
      steps: [
        {
          step: '1. Organization',
          action: 'Create project: "Animated Short - Episode 1"',
          result: 'All scenes organized by sequence',
          feature: 'Project Organization',
        },
        {
          step: '2. Collaboration',
          action: 'Animators upload scene files with asset-linked comments',
          result: 'All feedback stays with files',
          feature: 'Asset-Linked Feedback',
        },
        {
          step: '3. Review',
          action: 'Director reviews via frame-accurate comments',
          result: 'Precise timing feedback: "Extend frame 1,234-1,236"',
          feature: 'Frame-Accurate Review',
        },
        {
          step: '4. Version Tracking',
          action: 'Compare scene versions side-by-side',
          result: 'Spot changes instantly between revisions',
          feature: 'Version Comparison',
        },
        {
          step: '5. Approval',
          action: 'Mark scenes as approved/needs revision',
          result: 'Dashboard shows what needs attention',
          feature: 'Dashboard',
        },
      ],
      outcome: '50+ scenes reviewed and approved in 3 days instead of 2 weeks',
    },
    {
      title: 'Client Video Production Workflow',
      scenario: 'Managing video production for a corporate client with multiple stakeholders and revision cycles',
      steps: [
        {
          step: '1. Setup',
          action: 'Create project: "Client Q4 Campaign Video"',
          result: 'All assets organized in one place',
          feature: 'Campaign Management',
        },
        {
          step: '2. Review',
          action: 'Client reviews via no-signup link',
          result: 'Frame-accurate comment: "Make logo larger at 00:12:30"',
          feature: 'Frame-Accurate Review',
        },
        {
          step: '3. Approval',
          action: 'CD → Producer → Client approval chain',
          result: 'All approvals tracked',
          feature: 'Approval Workflows',
        },
        {
          step: '4. Version Control',
          action: 'Client requests revert to v2',
          result: 'Compare and revert instantly',
          feature: 'Version History',
        },
        {
          step: '5. Delivery',
          action: 'Share password-protected link',
          result: 'Secure delivery with access logs',
          feature: 'Security',
        },
      ],
      outcome: 'Campaign video launched 4 days faster with zero version confusion',
    },
  ],
  useCases: [
    'Post-production houses managing film/TV projects',
    'Video production companies handling client work',
    'Animation studios coordinating complex projects',
    'Client approval workflows for sponsored content',
    'Collaboration with freelance video editors',
    'Organizing multiple YouTube series or channels',
  ],
  keyFeatures: [
    {
      icon: 'paint',
      title: 'Frame-Accurate Video Review',
      description:
        'Pin comments to exact frames and timestamps. Example: "Change at 00:12:30"—editor knows exactly where. Reduces revision cycles by 50%.',
    },
    {
      icon: 'compare',
      title: 'Version Comparison',
      description:
        'Compare different video versions side-by-side to spot changes instantly. See exactly what changed between revisions and provide precise feedback.',
    },
    {
      icon: 'upload',
      title: 'Large Video File Support',
      description:
        'Upload and share large video files securely without file size limitations. No more WeTransfer or compressed previews—share full-quality videos directly.',
    },
  ],
  metaDescription:
    'Video project management platform for production and animation studios. Frame-accurate video review, version control, large file sharing, and collaboration tools for video production teams. Streamline post-production workflows, client approvals, and multi-stakeholder collaboration. Replace Frame.io, WeTransfer, and email threads with one unified platform.',
  faqs: [
    {
      question: 'How does frame-accurate video review work in Kreatli?',
      answer:
        'Frame-accurate review allows reviewers to click on any specific frame in a video to add comments that are permanently linked to that moment in the timeline. When a reviewer says "change the color at 00:02:15" or "add transition between frames 1,234-1,236," creators know exactly where to make changes. This precision reduces revision cycles by 50% because feedback is clear and actionable from the start.',
    },
    {
      question: 'Can I share large video files with clients and collaborators?',
      answer:
        'Yes! Kreatli supports large video file uploads and sharing without file size limitations. You can share full-quality videos directly with clients and collaborators through secure review links. No need for WeTransfer, compressed previews, or external file sharing services. All files are stored securely and accessible through the platform.',
    },
    {
      question: 'How does Kreatli help coordinate feedback from multiple stakeholders?',
      answer:
        'Kreatli centralizes all feedback in one place, organized by asset and project. Directors, producers, editors, and clients can all provide feedback through the same platform, and all comments are tracked and visible to the team. Asset-linked conversations ensure feedback stays with files, eliminating lost comments in email threads or messaging apps. You can see at a glance what needs attention and ensure nothing gets missed.',
    },
    {
      question: 'Can I compare different versions of videos side-by-side?',
      answer:
        "Yes! Kreatli's version comparison feature allows you to view different video versions side-by-side to spot changes instantly. This makes it easy to see what changed between revisions and provide precise feedback on adjustments. Complete version history is maintained, so you can always revert to previous versions when needed.",
    },
    {
      question: 'How does Kreatli help animation studios manage complex projects?',
      answer:
        "Kreatli provides project organization that keeps all animation assets, storyboards, reference materials, and video files organized in one workspace. You can organize projects by episode, scene, or client, making it easy to track what's in production, what needs review, and what's been approved. Frame-accurate feedback is particularly valuable for animation where precise timing and visual details are critical.",
    },
  ],
};

export default function VideoProductionAnimationStudiosPage() {
  useSession();

  return (
    <>
      <Head>
        <title>Kreatli for {data.title} | Creative Production Platform for Video Production & Animation</title>
        <meta name="description" content={data.metaDescription} />
        <meta
          name="keywords"
          content="video production software, animation studio tools, video review platform, frame-accurate feedback, video collaboration platform, post-production workflow, video project management, animation production pipeline"
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
              How Kreatli Improves Video Production Workflows
            </h2>
            <p className="text-xl text-foreground-600 max-w-2xl mx-auto font-medium">
              Streamline video production and client collaboration.
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
                  <strong>Example:</strong> Documentary approved in 2 hours
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/10 rounded-full p-3">
                    <Icon icon="paint" size={24} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold font-sans">Frame-Accurate Feedback</h3>
                </div>
                <p className="text-foreground-600 text-base mb-3">
                  Pin comments to exact timestamps. Reduce revision cycles by 50%.
                </p>
                <div className="text-sm text-foreground-500">
                  <strong>Example:</strong> "Change at 00:12:30" - editor knows exactly where
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-warning/10 rounded-full p-3">
                    <Icon icon="upload" size={24} className="text-warning" />
                  </div>
                  <h3 className="text-lg font-semibold font-sans">Large File Support</h3>
                </div>
                <p className="text-foreground-600 text-base mb-3">
                  Upload and share large video files without size limitations.
                </p>
                <div className="text-sm text-foreground-500">
                  <strong>Example:</strong> 15GB video files uploaded securely
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
                How Kreatli powers video production workflows.
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

          {/* Frame-Accurate Video Review */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold font-sans mb-3">Frame-Accurate Video Review</h3>
              <p className="text-lg text-foreground-600 max-w-2xl mx-auto">
                Pin comments to exact frames and timestamps. Example: "Change at 00:12:30"—editor knows precisely where.
                Reduces revision cycles by 50%.
              </p>
            </div>
            <ReviewToolPreview />
          </div>

          {/* Version History & Comparison */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold font-sans mb-3">Version History & Comparison</h3>
              <p className="text-lg text-foreground-600 max-w-2xl mx-auto">
                Compare different video versions side-by-side to spot changes instantly. Complete version history with
                one-click revert.
              </p>
            </div>
            <CompareFeaturePreview />
          </div>

          {/* Large Video File Support */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold font-sans mb-3">Large Video File Support</h3>
              <p className="text-lg text-foreground-600 max-w-2xl mx-auto">
                Upload and share large video files securely without file size limitations. No more WeTransfer or
                compressed previews—share full-quality videos directly.
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
