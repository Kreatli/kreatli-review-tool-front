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
  title: 'Creative Production Management',
  problem:
    'Creative teams struggle with managing projects across multiple tools - file storage in one place, project management in another, review tools somewhere else. This leads to context loss, tool-switching, and inefficient workflows. Files scattered across multiple platforms, version confusion, and time wasted searching for assets.',
  solution:
    'Kreatli provides end-to-end creative production management in one unified platform. Manage projects, organize files, track deliverables, and collaborate with your team - all in one place designed specifically for creative workflows. Consolidate multiple tools into one integrated platform that eliminates tool-switching and context loss.',
  detailedDescription:
    'Creative production management requires coordinating multiple aspects of creative work: project organization, file management, team collaboration, client review, and approval workflows. Kreatli consolidates all these functions into one unified platform, eliminating the need to switch between Google Drive, Frame.io, Slack, and project management tools. This integrated approach saves time, reduces costs, improves organization, and ensures nothing falls through the cracks. Teams can manage projects from initial setup through final delivery, with all files, conversations, and approvals organized in one place.',
  features: [
    {
      icon: 'folder',
      title: 'Project Organization',
      description: 'Organize files by project, status, type, and more. Find what you need instantly with powerful filtering and search. Create project workspaces and establish the foundation for seamless collaboration.',
    },
    {
      icon: 'user',
      title: 'Team Collaboration',
      description: 'Add team members with specific roles, generate secure guest links for clients, and set permissions. Bring your team and clients into the project with seamless access controls.',
    },
    {
      icon: 'checkCircle',
      title: 'Status Tracking',
      description: 'Track project status and progress with custom statuses. See what\'s in review, what\'s approved, and what needs attention. Maintain complete project documentation.',
    },
    {
      icon: 'slides',
      title: 'Centralized Dashboard',
      description: 'View all your projects, files, conversations, and activity from one centralized dashboard. No more switching between tools - everything you need is in one place.',
    },
  ],
  benefits: [
    'Consolidate multiple tools into one platform, reducing costs by 40-70%',
    'Eliminate tool-switching and context loss, saving hours every week',
    'Organize all project files, conversations, and approvals in one place',
    'Track project status and deliverables with complete visibility',
    'Streamline team collaboration and client review processes',
    'Maintain complete project history and documentation',
  ],
  metaDescription:
    'Creative production management platform that consolidates project management, file organization, team collaboration, and client review into one unified platform. End-to-end creative workflow management.',
  faqs: [
    {
      question: 'How does Kreatli consolidate multiple tools into one platform?',
      answer:
        'Kreatli combines file storage, project management, media review, and team collaboration into one integrated platform. Instead of using Google Drive for files, Frame.io for video review, Slack for communication, and project management tools separately, everything is in Kreatli. This eliminates tool-switching, reduces costs (typically 40-70% savings), and ensures all project information is in one place.',
    },
    {
      question: 'What are the main benefits of using one platform for creative production management?',
      answer:
        'Using one platform eliminates tool-switching and context loss, saving hours every week. All files, conversations, and approvals are organized in one place, making it easy to find what you need and track project status. Teams save money by consolidating multiple tool subscriptions, simplify onboarding by learning one platform instead of five, and improve security by managing fewer vendor relationships.',
    },
    {
      question: 'Can I connect my existing cloud storage to Kreatli?',
      answer:
        'Yes! Kreatli integrates with Google Drive and Dropbox, allowing you to connect your existing file storage and sync files between platforms. You can continue using your preferred cloud storage while leveraging Kreatli\'s specialized features for creative production management, media review, and collaboration.',
    },
    {
      question: 'How does Kreatli help track project status and deliverables?',
      answer:
        'Kreatli provides custom statuses and project organization features that allow you to track what\'s in production, what\'s in review, what\'s approved, and what\'s complete. You can see project status at a glance, track deliverables, and maintain complete project documentation. All files, conversations, and approvals are linked to projects, making it easy to see the full context of any project.',
    },
    {
      question: 'How does Kreatli improve team collaboration?',
      answer:
        'Kreatli centralizes all team collaboration in one platform. Team members can communicate about specific assets, assign tasks, track progress, and see all project activity in one place. Client collaboration is streamlined through no-signup guest review links, and all feedback is organized and trackable. This eliminates lost comments in email threads and ensures everyone stays aligned.',
    },
  ],
};

export default function CreativeProductionManagementPage() {
  useSession();

  return (
    <>
      <Head>
        <title>Kreatli | {data.title} – Creative Production Solution</title>
        <meta name="description" content={data.metaDescription} />
        <meta property="og:title" content={`Kreatli | ${data.title} – Creative Production Solution`} />
        <meta property="og:description" content={data.metaDescription} />
        <meta property="og:type" content="website" />
      </Head>
      <Header />
      <Decorations />
      {/* Hero Section */}
      <section className="relative py-16 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center flex flex-col gap-6 relative z-10">
          <h1 className="text-2xl sm:text-4xl font-bold font-sans max-w-lg mx-auto">{data.title}</h1>
          <p className="text-lg text-foreground-500 max-w-2xl mx-auto">{data.solution}</p>
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

      {/* Problem/Solution Section */}
      <section className="relative py-16 px-6 backdrop-blur-lg overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardBody className="p-8">
                <h2 className="text-2xl font-bold font-sans mb-4 flex items-center gap-2">
                  <Icon icon="warning" size={24} className="text-warning" />
                  The Problem
                </h2>
                <p className="text-foreground-500">{data.problem}</p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-8">
                <h2 className="text-2xl font-bold font-sans mb-4 flex items-center gap-2">
                  <Icon icon="checkCircle" size={24} className="text-success" />
                  The Solution
                </h2>
                <p className="text-foreground-500">{data.solution}</p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Detailed Description Section */}
      <section className="relative py-16 px-6 backdrop-blur-lg overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-4xl font-bold font-sans mb-4">Why Choose Kreatli for {data.title}</h2>
          </div>
          <Card>
            <CardBody className="p-8">
              <p className="text-foreground-600 text-lg leading-relaxed">{data.detailedDescription}</p>
            </CardBody>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-16 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-4xl font-bold font-sans mb-4">Key Features</h2>
            <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
              Everything you need to solve your creative production challenges.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.features.map((feature, index) => (
              <Card key={index}>
                <CardBody className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-foreground-100 rounded-full p-2">
                      <Icon icon={feature.icon as any} size={20} className="text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold font-sans">{feature.title}</h3>
                  </div>
                  <p className="text-foreground-500 text-sm">{feature.description}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative py-16 px-6 backdrop-blur-lg overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-4xl font-bold font-sans mb-4">Key Benefits</h2>
            <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
              Discover how {data.title.toLowerCase()} improves your creative workflow.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {data.benefits.map((benefit, index) => (
              <Card key={index}>
                <CardBody className="p-6">
                  <div className="flex items-start gap-3">
                    <Icon icon="checkCircle" size={24} className="text-success flex-shrink-0 mt-0.5" />
                    <p className="text-foreground-600">{benefit}</p>
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
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-4xl font-bold font-sans mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
              Get detailed answers about how Kreatli addresses {data.title.toLowerCase()} for creative teams.
            </p>
          </div>
          <Accordion variant="splitted">
            {data.faqs.map((faq, index) => (
              <AccordionItem key={index} title={<span className="font-semibold text-base">{faq.question}</span>}>
                <div className="text-foreground-500 space-y-3">{faq.answer}</div>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="max-w-3xl mx-auto flex flex-col gap-4 text-center items-center mt-8">
            <h3 className="text-xl font-sans font-bold">Still Have Questions?</h3>
            <p className="text-foreground-500">
              If you didn't find the answer you were looking for, feel free to contact our support team at{' '}
              <a href="mailto:support@kreatli.com" className="underline underline-offset-2 text-primary">
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
          <h2 className="text-2xl sm:text-4xl font-bold font-sans">Ready to Solve Your Creative Production Challenges?</h2>
          <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
            Experience how Kreatli addresses {data.title.toLowerCase()} for creative teams. Start using Kreatli today.
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

