import Head from 'next/head';
import React from 'react';

import { Header } from '../components/layout/Header';
import { FooterSection } from '../components/home/Footer/FooterSection';
import { useSession } from '../hooks/useSession';
import { getStoryblokApi } from '../lib/storyblok';
import { GetStaticProps } from 'next';
import { Decorations } from '../components/layout/Storyblok/Decorations';
import { Card, CardBody, Button, Chip } from '@heroui/react';
import NextLink from 'next/link';
import { Icon } from '../components/various/Icon';
import styles from '../components/layout/Storyblok/Decorations/Decorations.module.scss';

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
      <Decorations />
      <div className="backdrop-blur-lg">
        <div className="border-t border-foreground-200">
          {/* Why Kreatli Fits Section - Moved to top */}
          <section className="relative py-16 px-6 bg-background overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div
                className={`absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-br from-green-300/30 to-blue-300/30 rounded-full ${styles.animateFloatFast}`}
              />
              <div
                className={`absolute top-1/3 right-1/4 w-16 h-16 bg-gradient-to-br from-yellow-300/25 to-orange-300/25 rounded-full ${styles.animateFloatMedium}`}
              />
              <div
                className={`absolute top-1/2 left-1/3 w-4 h-4 bg-pink-400/50 rounded-full ${styles.animateFloatSlow}`}
              />
              <div
                className={`absolute bottom-24 left-1/4 w-2 h-2 bg-orange-400/50 rounded-full ${styles.animateFloatMedium}`}
              />
            </div>
            <div className="max-w-6xl mx-auto relative z-10">
              <div className="text-center mb-4">
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
                      Upload and share large video files, images, and creative assets. No more WeTransfer or cloud
                      storage juggling.
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

          {/* Hero Section */}
          <section className="relative bg-foreground-50 lg:py-24 py-16 px-6 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div
                className={`absolute top-20 left-24 w-32 h-32 bg-gradient-to-br from-blue-300/30 to-purple-300/30 rounded-full ${styles.animateFloatSlow}`}
              />
              <div
                className={`absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-pink-300/30 to-orange-300/30 rounded-full ${styles.animateFloatMedium}`}
              />
              <div
                className={`absolute top-16 left-1/3 w-3 h-3 bg-blue-400/50 rounded-full ${styles.animateFloatFast}`}
              />
              <div
                className={`absolute top-24 right-1/4 w-2 h-2 bg-purple-400/50 rounded-full ${styles.animateFloatMedium}`}
              />
            </div>
            <div className="max-w-4xl mx-auto text-center flex flex-col gap-6 relative z-10">
              <h1 className="text-2xl sm:text-4xl font-bold font-sans mb-4">Who is Kreatli for?</h1>
              <p className="text-lg sm:text-xl text-foreground-500 max-w-2xl mx-auto">
                Whether you're a content creator, creative team or digital agency, Kreatli covers all your needs.
                Discover how different creative professionals use Kreatli to streamline their workflows.
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

          {/* Audience Cards Section */}
          <section className="relative backdrop-blur-lg lg:py-32 py-16 px-6 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div
                className={`absolute top-1/2 right-1 left-12 w-12 h-12 bg-gradient-to-br from-cyan-300/25 to-blue-300/25 rounded-full ${styles.animateFloatFast}`}
              />
              <div
                className={`absolute bottom-1/3 left-1/2 w-14 h-14 bg-gradient-to-br from-pink-300/25 to-purple-300/25 rounded-full ${styles.animateFloatSlow}`}
              />
              <div
                className={`absolute top-2/3 right-16 w-3 h-3 bg-green-400/50 rounded-full ${styles.animateFloatFast}`}
              />
              <div
                className={`absolute bottom-32 right-24 w-3 h-3 bg-cyan-400/50 rounded-full ${styles.animateFloatSlow}`}
              />
            </div>
            <div className="max-w-7xl mx-auto flex flex-col gap-12 relative z-10">
              <div className="grid gap-8">
                {audiences.map((audience) => (
                  <Card key={audience.id} className="dark:border border-foreground-300">
                    <CardBody className="p-8 lg:p-12 flex flex-col lg:flex-row gap-8 lg:gap-12">
                      <div className="flex flex-col gap-6 lg:w-1/3">
                        <div className="bg-foreground-100 rounded-full size-20 lg:size-24 flex items-center justify-center">
                          <Icon
                            icon={audience.icon as any}
                            className="text-foreground-400 dark:text-foreground-600"
                            size={40}
                          />
                        </div>
                        <h3 className="text-2xl lg:text-3xl font-semibold font-sans">{audience.title}</h3>
                        <p className="text-foreground-500 text-base lg:text-lg">{audience.description}</p>
                      </div>

                      <div className="lg:w-2/3 lg:pl-8 lg:border-l border-foreground-200 flex flex-col gap-8">
                        <div className="grid sm:grid-cols-2 gap-8">
                          <div>
                            <h4 className="text-xl font-bold font-sans mb-4 flex items-center gap-2">
                              <Icon icon="warning" size={24} className="text-warning" />
                              Common Challenges
                            </h4>
                            <ul className="flex flex-col gap-3">
                              {audience.painPoints.map((point, index) => (
                                <li key={index} className="flex items-start gap-2 text-base text-foreground-500">
                                  <Icon icon="minus" size={18} className="text-foreground-400 mt-0.5 flex-shrink-0" />
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-xl font-bold font-sans mb-4 flex items-center gap-2">
                              <Icon icon="checkCircle" size={24} className="text-success" />
                              How Kreatli Helps
                            </h4>
                            <ul className="flex flex-col gap-3">
                              {audience.benefits.map((benefit, index) => (
                                <li key={index} className="flex items-start gap-2 text-base text-foreground-500">
                                  <Icon icon="check" size={18} className="text-success mt-0.5 flex-shrink-0" />
                                  <span>{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-xl font-bold font-sans mb-4 flex items-center gap-2">
                            <Icon icon="slides" size={24} className="text-primary" />
                            Popular Use Cases
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {audience.useCases.map((useCase, index) => (
                              <Chip key={index} size="md" variant="faded">
                                {useCase}
                              </Chip>
                            ))}
                          </div>
                        </div>

                        {audience.testimonial && (
                          <Card className="bg-foreground-50 border border-foreground-200">
                            <CardBody className="p-6">
                              <div className="flex items-start gap-3 mb-3">
                                <Icon icon="checkCircle" size={24} className="text-primary flex-shrink-0 mt-0.5" />
                                <p className="text-base italic text-foreground-600">{audience.testimonial.quote}</p>
                              </div>
                              <div className="text-sm text-foreground-500 ml-9">
                                — {audience.testimonial.author}, {audience.testimonial.role}
                              </div>
                            </CardBody>
                          </Card>
                        )}
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="relative bg-foreground-50 lg:py-24 py-16 px-6 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div
                className={`absolute top-20 left-24 w-32 h-32 bg-gradient-to-br from-blue-300/30 to-purple-300/30 rounded-full ${styles.animateFloatSlow}`}
              />
              <div
                className={`absolute bottom-20 right-1/4 w-28 h-28 bg-gradient-to-br from-purple-300/30 to-pink-300/30 rounded-full ${styles.animateFloatSlow}`}
              />
              <div
                className={`absolute top-1/3 right-1/4 w-16 h-16 bg-gradient-to-br from-yellow-300/25 to-orange-300/25 rounded-full ${styles.animateFloatMedium}`}
              />
              <div
                className={`absolute top-1/2 left-1/3 w-4 h-4 bg-pink-400/50 rounded-full ${styles.animateFloatSlow}`}
              />
              <div
                className={`absolute bottom-28 right-1 left-10 w-4 h-4 bg-indigo-400/50 rounded-full ${styles.animateFloatMedium}`}
              />
            </div>
            <div className="max-w-4xl mx-auto text-center flex flex-col gap-6 relative z-10">
              <h2 className="text-2xl sm:text-4xl font-bold font-sans mb-4">
                Ready to streamline your creative workflow?
              </h2>
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
      </div>
      <FooterSection links={footerLinks} hideCta={true} />
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
