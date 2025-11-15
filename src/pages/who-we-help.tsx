import Head from 'next/head';
import React, { useState } from 'react';

import { Header } from '../components/layout/Header';
import { FooterSection } from '../components/home/Footer/FooterSection';
import { useSession } from '../hooks/useSession';
import { getStoryblokApi } from '../lib/storyblok';
import { GetStaticProps } from 'next';
import { Card, CardBody, Button, Chip } from '@heroui/react';
import NextLink from 'next/link';
import { Icon } from '../components/various/Icon';

interface Props {
  footerLinks?: {
    label: string;
    url: string;
  }[];
}

interface AudienceType {
  id: string;
  icon: string;
  title: string;
  description: string;
  painPoints: string[];
  benefits: string[];
  useCases: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

const audiences: AudienceType[] = [
  {
    id: 'video-creators',
    icon: 'addVideo',
    title: 'Independent video creators & YouTubers',
    description:
      'Streamline your content creation workflow from planning to publishing. Manage multiple projects, collaborate with editors, and get client feedback all in one place.',
    painPoints: [
      'Managing feedback across email, messages, and comments',
      'Tracking versions of video edits across multiple tools',
      'Sharing large video files with clients and collaborators',
      'Coordinating with editors and team members',
    ],
    benefits: [
      'Frame-accurate feedback directly on your videos',
      'Organize all projects in one central workspace',
      'Share secure review links without signups',
      'Track all revisions and feedback history',
    ],
    useCases: [
      'Client approval workflows for sponsored content',
      'Collaboration with freelance video editors',
      'Organizing multiple YouTube series or channels',
      'Review and approval cycles for brand partnerships',
    ],
    testimonial: {
      quote:
        "Kreatli eliminated the endless email chains. Now I share a link, clients comment directly on the video, and I know exactly which frame they're referring to.",
      author: 'Sarah M.',
      role: 'YouTube Creator',
    },
  },
  {
    id: 'micro-teams',
    icon: 'user',
    title: 'Micro-teams working with external clients',
    description:
      'Perfect for small creative teams managing multiple client projects. Keep everything organized, streamline client communications, and deliver projects on time.',
    painPoints: [
      'Juggling multiple client projects across different platforms',
      'Lost feedback in email threads and messaging apps',
      'Difficulty tracking project status and deliverables',
      'Managing client access without overwhelming them',
    ],
    benefits: [
      'Dedicated project spaces for each client',
      "Client review links that don't require signups",
      'Centralized communication tied to specific assets',
      'Clear project status tracking and deliverables',
    ],
    useCases: [
      'Design agencies managing multiple client brands',
      'Video production teams handling client projects',
      'Marketing agencies coordinating with clients',
      'Freelance teams working with various stakeholders',
    ],
    testimonial: {
      quote:
        'We manage 15+ client projects simultaneously. Kreatli keeps everything organized and our clients love how easy it is to give feedback.',
      author: 'Mike T.',
      role: 'Creative Director',
    },
  },
  {
    id: 'agencies',
    icon: 'building',
    title: 'Creative agencies and post-production boutiques',
    description:
      'Scale your operations with powerful collaboration tools built for professional creative teams. Manage complex projects, multiple stakeholders, and high-volume deliverables efficiently.',
    painPoints: [
      'Coordinating feedback from multiple stakeholders',
      'Version control for large-scale projects',
      'Secure sharing of high-value creative assets',
      'Tracking project timelines and resource allocation',
    ],
    benefits: [
      'Unlimited projects and team members at scale',
      'Advanced review tools for professional workflows',
      'Enterprise-grade security and access controls',
      'Comprehensive project analytics and reporting',
    ],
    useCases: [
      'Post-production houses managing film/TV projects',
      'Advertising agencies coordinating campaign assets',
      'Brand agencies managing multiple client portfolios',
      'Production companies handling complex multi-phase projects',
    ],
    testimonial: {
      quote:
        'As we grew, managing projects became chaotic. Kreatli gave us the structure we needed without sacrificing the creative flexibility our teams require.',
      author: 'Jennifer K.',
      role: 'Agency Owner',
    },
  },
];

export default function WhoWeHelpPage({ footerLinks }: Props) {
  useSession();
  const [selectedAudience, setSelectedAudience] = useState<string | null>(null);

  return (
    <>
      <Head>
        <title>Kreatli | Who We Help</title>
        <meta
          name="description"
          content="Whether you're a content creator, creative team or digital agency, Kreatli covers all your needs. Join independent video creators, micro-teams, and creative agencies."
        />
        <meta property="og:title" content="Kreatli | Who We Help" />
        <meta
          property="og:description"
          content="Perfect for video creators, micro-teams, and creative agencies. Streamline your workflow and collaborate effectively."
        />
      </Head>
      <Header />
      <div className="border-t border-foreground-200">
        {/* Hero Section */}
        <section className="bg-foreground-50 lg:py-24 py-16 px-6">
          <div className="max-w-4xl mx-auto text-center flex flex-col gap-6">
            <h1 className="text-3xl sm:text-5xl font-bold font-sans">Who is Kreatli for?</h1>
            <p className="text-lg sm:text-xl text-foreground-500 max-w-2xl mx-auto">
              Whether you're a content creator, creative team or digital agency, Kreatli covers all your needs. Discover
              how different creative professionals use Kreatli to streamline their workflows.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-4">
              <Button as={NextLink} href="/sign-up" size="lg" className="bg-foreground text-content1">
                Get Started for Free
              </Button>
              <Button as={NextLink} href="/how-it-works" size="lg" variant="bordered">
                See How It Works
              </Button>
            </div>
          </div>
        </section>

        {/* Audience Cards Section */}
        <section className="backdrop-blur-lg lg:py-32 py-16 px-6">
          <div className="max-w-7xl mx-auto flex flex-col gap-12">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {audiences.map((audience) => {
                const isExpanded = selectedAudience === audience.id;

                return (
                  <Card
                    key={audience.id}
                    isHoverable
                    isPressable
                    onPress={() => setSelectedAudience(isExpanded ? null : audience.id)}
                    className={`dark:border border-foreground-300 transition-all duration-300 ${
                      isExpanded ? 'lg:col-span-3 lg:row-span-1' : ''
                    }`}
                  >
                    <CardBody className={`p-6 lg:p-8 flex flex-col gap-6 ${isExpanded ? 'lg:flex-row' : ''}`}>
                      <div className={`flex flex-col gap-4 ${isExpanded ? 'lg:w-1/3' : 'items-center text-center'}`}>
                        <div className="bg-foreground-100 rounded-full size-16 flex items-center justify-center mx-auto">
                          <Icon
                            icon={audience.icon as any}
                            className="text-foreground-400 dark:text-foreground-600"
                            size={32}
                          />
                        </div>
                        <h3 className="text-xl lg:text-2xl font-semibold font-sans">{audience.title}</h3>
                        <p className="text-foreground-500 text-sm lg:text-base">{audience.description}</p>
                        {!isExpanded && (
                          <Button
                            size="sm"
                            variant="light"
                            endContent={<Icon icon="arrowRight" size={16} />}
                            className="mt-2"
                          >
                            Learn More
                          </Button>
                        )}
                      </div>

                      {isExpanded && (
                        <div className="lg:w-2/3 lg:pl-8 lg:border-l border-foreground-200 flex flex-col gap-6">
                          <div className="grid sm:grid-cols-2 gap-6">
                            <div>
                              <h4 className="text-lg font-bold font-sans mb-3 flex items-center gap-2">
                                <Icon icon="warning" size={20} className="text-warning" />
                                Common Challenges
                              </h4>
                              <ul className="flex flex-col gap-2">
                                {audience.painPoints.map((point, index) => (
                                  <li key={index} className="flex items-start gap-2 text-sm text-foreground-500">
                                    <Icon icon="minus" size={16} className="text-foreground-400 mt-0.5 flex-shrink-0" />
                                    <span>{point}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h4 className="text-lg font-bold font-sans mb-3 flex items-center gap-2">
                                <Icon icon="checkCircle" size={20} className="text-success" />
                                How Kreatli Helps
                              </h4>
                              <ul className="flex flex-col gap-2">
                                {audience.benefits.map((benefit, index) => (
                                  <li key={index} className="flex items-start gap-2 text-sm text-foreground-500">
                                    <Icon icon="check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                                    <span>{benefit}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          <div>
                            <h4 className="text-lg font-bold font-sans mb-3 flex items-center gap-2">
                              <Icon icon="slides" size={20} className="text-primary" />
                              Popular Use Cases
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {audience.useCases.map((useCase, index) => (
                                <Chip key={index} size="sm" variant="faded">
                                  {useCase}
                                </Chip>
                              ))}
                            </div>
                          </div>

                          {audience.testimonial && (
                            <Card className="bg-foreground-50 border border-foreground-200">
                              <CardBody className="p-4">
                                <div className="flex items-start gap-2 mb-2">
                                  <Icon icon="checkCircle" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                                  <p className="text-sm italic text-foreground-600">{audience.testimonial.quote}</p>
                                </div>
                                <div className="text-xs text-foreground-500 ml-7">
                                  — {audience.testimonial.author}, {audience.testimonial.role}
                                </div>
                              </CardBody>
                            </Card>
                          )}
                        </div>
                      )}
                    </CardBody>
                  </Card>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button as={NextLink} href="/sign-up" size="lg" className="bg-foreground text-content1">
                Join Kreatli
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

        {/* Why Kreatli Fits Section */}
        <section className="py-16 px-6 bg-background">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-4xl font-bold font-sans mb-4">Why creative teams choose Kreatli</h2>
              <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
                Built specifically for creative workflows, not adapted from project management or file storage tools.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border border-foreground-300">
                <CardBody className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon icon="chat" size={24} className="text-primary" />
                    <h3 className="text-lg font-bold font-sans">Asset-Linked Feedback</h3>
                  </div>
                  <p className="text-foreground-500 text-sm">
                    Comments and conversations stay with your files. No more searching through email threads or
                    messaging apps to find feedback.
                  </p>
                </CardBody>
              </Card>

              <Card className="border border-foreground-300">
                <CardBody className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon icon="paint" size={24} className="text-primary" />
                    <h3 className="text-lg font-bold font-sans">Frame-Accurate Reviews</h3>
                  </div>
                  <p className="text-foreground-500 text-sm">
                    Pin comments to exact frames in videos or specific areas in images. Eliminate "which clip?"
                    confusion forever.
                  </p>
                </CardBody>
              </Card>

              <Card className="border border-foreground-300">
                <CardBody className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon icon="link" size={24} className="text-primary" />
                    <h3 className="text-lg font-bold font-sans">No-Signup Guest Links</h3>
                  </div>
                  <p className="text-foreground-500 text-sm">
                    Share review links with clients and collaborators instantly. They can review and comment without
                    creating accounts.
                  </p>
                </CardBody>
              </Card>

              <Card className="border border-foreground-300">
                <CardBody className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon icon="folder" size={24} className="text-primary" />
                    <h3 className="text-lg font-bold font-sans">Project Organization</h3>
                  </div>
                  <p className="text-foreground-500 text-sm">
                    Organize files by project, status, type, and more. Find what you need instantly with powerful
                    filtering and search.
                  </p>
                </CardBody>
              </Card>

              <Card className="border border-foreground-300">
                <CardBody className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon icon="upload" size={24} className="text-primary" />
                    <h3 className="text-lg font-bold font-sans">Heavy Media Support</h3>
                  </div>
                  <p className="text-foreground-500 text-sm">
                    Upload and share large video files, images, and creative assets. No more WeTransfer or cloud storage
                    juggling.
                  </p>
                </CardBody>
              </Card>

              <Card className="border border-foreground-300">
                <CardBody className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon icon="checkShield" size={24} className="text-primary" />
                    <h3 className="text-lg font-bold font-sans">Secure & Private</h3>
                  </div>
                  <p className="text-foreground-500 text-sm">
                    Enterprise-grade security with password protection, access controls, and secure file sharing for
                    sensitive creative work.
                  </p>
                </CardBody>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-foreground-50 lg:py-24 py-16 px-6">
          <div className="max-w-4xl mx-auto text-center flex flex-col gap-6">
            <h2 className="text-2xl sm:text-4xl font-bold font-sans">Ready to streamline your creative workflow?</h2>
            <p className="text-lg text-foreground-500">
              Join thousands of creative professionals who have simplified their collaboration process with Kreatli.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-4">
              <Button as={NextLink} href="/sign-up" size="lg" className="bg-foreground text-content1">
                Start Free Trial
              </Button>
              <Button as={NextLink} href="/pricing" size="lg" variant="bordered">
                View Pricing
              </Button>
            </div>
          </div>
        </section>
      </div>
      <FooterSection links={footerLinks} />
    </>
  );
}

export const getStaticProps = (async () => {
  try {
    const { data } = await getStoryblokApi().get('cdn/links', {
      version: process.env.STORYBLOK_STATUS as 'draft' | 'published',
    });

    return {
      props: {
        footerLinks: Object.values(data.links ?? {}).map((link) => ({ label: link.name, url: link.slug })),
      },
    };
  } catch {
    return {
      props: {
        footerLinks: [],
      },
    };
  }
}) satisfies GetStaticProps<{}>;
