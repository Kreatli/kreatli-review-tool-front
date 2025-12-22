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
  title: 'Video Project Management & Collaboration',
  problem:
    'Video production teams struggle with sharing large video files, coordinating feedback, and keeping everyone aligned. Email chains, file transfer services, and generic collaboration tools don\'t support frame-accurate feedback. Managing feedback across email, messages, and comments leads to confusion about which clip or timestamp needs changes.',
  solution:
    'Kreatli enables seamless video project management and collaboration with frame-accurate review, secure file sharing, and real-time collaboration. Team members and clients can provide precise feedback on exact frames, compare versions side-by-side, and stay aligned throughout the production process. Centralize edits, feedback, and approvals so you can ship more content, with less chaos.',
  detailedDescription:
    'Video project management requires specialized tools for frame-accurate feedback, large file handling, and collaboration on video content. Kreatli provides a comprehensive video collaboration platform that eliminates the "which clip?" confusion with frame-accurate commenting, supports large video file uploads and sharing, and streamlines collaboration between directors, producers, editors, and clients. Whether you\'re managing film and TV projects, client video work, or content creation, Kreatli centralizes all video assets, feedback, and approvals in one organized workspace.',
  features: [
    {
      icon: 'paint',
      title: 'Frame-Accurate Review',
      description: 'Pin comments to exact frames and timestamps in videos. Eliminate "which clip?" confusion with precise feedback. Collect actionable feedback that\'s impossible to misunderstand.',
    },
    {
      icon: 'chat',
      title: 'Asset-Linked Conversations',
      description: 'Comments and conversations stay with your files. No more searching through email threads or messaging apps to find feedback. All feedback is organized and trackable.',
    },
    {
      icon: 'upload',
      title: 'Large File Support',
      description: 'Upload and share large video files securely. No more WeTransfer or file size limitations. Heavy media support for video production workflows.',
    },
    {
      icon: 'link',
      title: 'No-Signup Guest Links',
      description: 'Share review links with clients and collaborators instantly. They can review and comment without creating accounts. Reduce friction in the approval process.',
    },
  ],
  benefits: [
    'Frame-accurate feedback reduces revision cycles by 50%',
    'Eliminate "which clip?" confusion with precise timestamp comments',
    'Share large video files securely without file size limitations',
    'Centralize all video feedback and approvals in one place',
    'Compare video versions side-by-side to spot changes instantly',
    'Streamline collaboration between directors, producers, editors, and clients',
  ],
  metaDescription:
    'Video project management and collaboration platform with frame-accurate review, large file sharing, and real-time collaboration. Streamline video production workflows for teams and clients.',
  faqs: [
    {
      question: 'How does frame-accurate video review work?',
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
        'Kreatli centralizes all feedback in one place, organized by asset and project. Directors, producers, editors, and clients can all provide feedback through the same platform, and all comments are tracked and visible to the team. Asset-linked conversations ensure feedback stays with files, eliminating lost comments in email threads or messaging apps.',
    },
    {
      question: 'Can I compare different versions of videos side-by-side?',
      answer:
        'Yes! Kreatli\'s version comparison feature allows you to view different video versions side-by-side to spot changes instantly. This makes it easy to see what changed between revisions and provide precise feedback on adjustments. Complete version history is maintained, so you can always revert to previous versions when needed.',
    },
    {
      question: 'How does Kreatli improve video production workflows?',
      answer:
        'Kreatli improves video production workflows by eliminating the "which clip?" confusion with frame-accurate feedback, centralizing all project assets and feedback in one place, and streamlining collaboration between team members and clients. The platform reduces revision cycles, saves time searching for files and feedback, and ensures everyone stays aligned throughout the production process.',
    },
  ],
};

export default function VideoProjectManagementCollaborationPage() {
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

