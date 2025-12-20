import Head from 'next/head';
import React from 'react';
import { useRouter } from 'next/router';

import { Header } from '../../../components/layout/Header';
import { FooterSection } from '../../../components/home/Footer/FooterSection';
import { useSession } from '../../../hooks/useSession';
import { Decorations } from '../../../components/layout/Storyblok/Decorations';
import { Card, CardBody, Button } from '@heroui/react';
import NextLink from 'next/link';
import { Icon } from '../../../components/various/Icon';

const useCaseData: Record<
  string,
  {
    title: string;
    problem: string;
    solution: string;
    features: Array<{ icon: string; title: string; description: string }>;
    metaDescription: string;
  }
> = {
  'creative-production-management': {
    title: 'Creative Production Management',
    problem:
      'Creative teams struggle with managing projects across multiple tools - file storage in one place, project management in another, review tools somewhere else. This leads to context loss, tool-switching, and inefficient workflows.',
    solution:
      'Kreatli provides end-to-end creative production management in one unified platform. Manage projects, organize files, track deliverables, and collaborate with your team - all in one place designed specifically for creative workflows.',
    features: [
      {
        icon: 'folder',
        title: 'Project Organization',
        description: 'Organize files by project, status, type, and more. Find what you need instantly with powerful filtering and search.',
      },
      {
        icon: 'user',
        title: 'File Assignment',
        description: 'Assign files to team members, track who\'s working on what, and see the status of all deliverables at a glance.',
      },
      {
        icon: 'checkCircle',
        title: 'Status Tracking',
        description: 'Track project status and progress with custom statuses. See what\'s in review, what\'s approved, and what needs attention.',
      },
      {
        icon: 'slides',
        title: 'Centralized Dashboard',
        description: 'View all your projects, files, conversations, and activity from one centralized dashboard. No more switching between tools.',
      },
    ],
    metaDescription:
      'Kreatli provides end-to-end creative production management in one unified platform. Manage projects, organize files, track deliverables, and collaborate - all in one place.',
  },
  'remote-video-collaboration': {
    title: 'Remote Video Collaboration',
    problem:
      'Video production teams working remotely struggle with sharing large video files, coordinating feedback, and keeping everyone aligned. Email chains, file transfer services, and generic collaboration tools don\'t support frame-accurate feedback.',
    solution:
      'Kreatli enables seamless remote video collaboration with frame-accurate review, secure file sharing, and real-time collaboration. Team members and clients can provide precise feedback on exact frames, compare versions side-by-side, and stay aligned throughout the production process.',
    features: [
      {
        icon: 'paint',
        title: 'Frame-Accurate Review',
        description: 'Pin comments to exact frames and timestamps in videos. Eliminate "which clip?" confusion with precise feedback.',
      },
      {
        icon: 'compare',
        title: 'Version Comparison',
        description: 'Compare different versions side-by-side to spot changes instantly and provide precise feedback on what needs adjustment.',
      },
      {
        icon: 'upload',
        title: 'Large File Support',
        description: 'Upload and share large video files securely. No more WeTransfer or file size limitations.',
      },
      {
        icon: 'link',
        title: 'Guest Review Links',
        description: 'Share review links with clients and collaborators instantly. They can review and comment without creating accounts.',
      },
    ],
    metaDescription:
      'Kreatli enables seamless remote video collaboration with frame-accurate review, secure file sharing, and real-time collaboration for video production teams.',
  },
  'centralized-feedback-annotations': {
    title: 'Centralized Feedback & Annotations',
    problem:
      'Feedback gets scattered across email threads, messaging apps, and multiple platforms. Comments lose context, annotations are hard to track, and it\'s difficult to see the full picture of what needs to be changed.',
    solution:
      'Kreatli centralizes all feedback and annotations in one place. Asset-linked comments ensure feedback stays with files, frame-accurate annotations provide precise feedback, and all comments are organized and trackable in your review workflow.',
    features: [
      {
        icon: 'chat',
        title: 'Asset-Linked Comments',
        description: 'Comments and conversations stay with your files. No more searching through email threads or messaging apps to find feedback.',
      },
      {
        icon: 'paint',
        title: 'Precise Annotations',
        description: 'Add annotations directly on images and videos. Pin comments to exact frames or specific areas for precise feedback.',
      },
      {
        icon: 'slides',
        title: 'Organized Feedback',
        description: 'All feedback is organized by asset and project, making it easy to track what needs attention and ensuring nothing gets missed.',
      },
      {
        icon: 'checkCircle',
        title: 'Approval Tracking',
        description: 'Track approval status for each asset, see who approved what, and maintain a complete history of all feedback and approvals.',
      },
    ],
    metaDescription:
      'Kreatli centralizes all feedback and annotations in one place. Asset-linked comments, frame-accurate annotations, and organized feedback workflows for creative teams.',
  },
  'secure-client-delivery': {
    title: 'Secure Client Delivery',
    problem:
      'Creative teams need to share large media files with clients securely, but email attachments are too small, file transfer services lack security and organization, and cloud storage doesn\'t provide review and approval workflows.',
    solution:
      'Kreatli provides secure client delivery with password-protected links, access controls, and integrated review workflows. Share files securely, get client feedback, and track approvals - all in one platform designed for client collaboration.',
    features: [
      {
        icon: 'link',
        title: 'Secure Shareable Links',
        description: 'Generate password-protected links, set expiration dates, and control access to your creative assets with enterprise-grade security.',
      },
      {
        icon: 'share',
        title: 'No-Signup Guest Access',
        description: 'Share review links with clients and collaborators instantly. They can review and comment without creating accounts.',
      },
      {
        icon: 'shield',
        title: 'Access Controls',
        description: 'Set granular permissions for team members and clients, controlling who can view, comment, approve, or download files.',
      },
      {
        icon: 'checkCircle',
        title: 'Approval Workflows',
        description: 'Track approval status for each asset, see who approved what, and maintain a complete history of all approvals and feedback.',
      },
    ],
    metaDescription:
      'Kreatli provides secure client delivery with password-protected links, access controls, and integrated review workflows for creative teams sharing files with clients.',
  },
};

export default function UseCaseSolutionPage() {
  useSession();
  const router = useRouter();
  const { useCase } = router.query;

  const useCaseKey = typeof useCase === 'string' ? useCase : '';
  const data = useCaseData[useCaseKey];

  if (!data) {
    return (
      <>
        <Head>
          <title>Kreatli | Solutions</title>
        </Head>
        <Header />
        <div className="py-16 px-6 text-center">
          <h1 className="text-2xl font-bold mb-4">Use Case Solution Not Found</h1>
          <Button as={NextLink} href="/solutions">
            Back to Solutions
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Kreatli | {data.title} – Creative Production Solution</title>
        <meta name="description" content={data.metaDescription} />
        <meta property="og:title" content={`Kreatli | ${data.title} – Creative Production Solution`} />
        <meta property="og:description" content={data.metaDescription} />
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

