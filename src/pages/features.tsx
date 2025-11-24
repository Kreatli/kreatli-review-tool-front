import Head from 'next/head';
import React from 'react';

import { Header } from '../components/layout/Header';
import { FeaturesSection } from '../components/home/Features';
import { FooterSection } from '../components/home/Footer/FooterSection';
import { useSession } from '../hooks/useSession';
import { getStoryblokApi } from '../lib/storyblok';
import { GetStaticProps } from 'next';
import { Decorations } from '../components/layout/Storyblok/Decorations';
import {
  Card,
  CardBody,
  Button,
  Chip,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@heroui/react';
import NextLink from 'next/link';
import { Icon } from '../components/various/Icon';

interface Props {
  footerLinks?: {
    label: string;
    url: string;
  }[];
}

const additionalFeatures = [
  {
    icon: 'folder',
    title: 'Smart File Organization',
    description:
      'Organize files by project, status, type, and more. Powerful filtering and search help you find what you need instantly.',
  },
  {
    icon: 'link',
    title: 'Secure Guest Links',
    description:
      'Share review links with clients and collaborators without requiring signups. Password protection and access controls included.',
  },
  {
    icon: 'share',
    title: 'Version History',
    description:
      'Track all changes with comprehensive version history. Never lose your work and easily revert to previous versions.',
  },
  {
    icon: 'checkShield',
    title: 'Enterprise Security',
    description:
      'Enterprise-level encryption, secure file sharing, and compliance-ready security features for sensitive creative work.',
  },
  {
    icon: 'upload',
    title: 'Cloud Storage Integration',
    description: 'Connect Google Drive and Dropbox. Upload directly or sync existing files from your cloud storage.',
  },
  {
    icon: 'bell',
    title: 'Real-time Notifications',
    description:
      'Get instant alerts for comments, approvals, and project updates. Stay in sync without constant checking.',
  },
];

const comparisonData = [
  {
    feature: 'Frame-accurate video comments',
    kreatli: true,
    frameIo: true,
    slack: false,
    email: false,
  },
  {
    feature: 'Asset-linked conversations',
    kreatli: true,
    frameIo: false,
    slack: true,
    email: true,
  },
  {
    feature: 'No-signup guest reviews',
    kreatli: true,
    frameIo: true,
    slack: false,
    email: false,
  },
  {
    feature: 'Project management',
    kreatli: true,
    frameIo: false,
    slack: true,
    email: false,
  },
  {
    feature: 'File organization',
    kreatli: true,
    frameIo: true,
    slack: false,
    email: false,
  },
  {
    feature: 'All-in-one platform',
    kreatli: true,
    frameIo: false,
    slack: false,
    email: false,
  },
];

export default function FeaturesPage({ footerLinks }: Props) {
  useSession();

  return (
    <>
      <Head>
        <title>Kreatli | Features</title>
        <meta
          name="description"
          content="Kreatli offers functionality creative teams actually need. Frame-accurate revisions, conversations tied to assets, and project management all in one place."
        />
        <meta property="og:title" content="Kreatli | Features" />
        <meta
          property="og:description"
          content="Built for creative workflows with frame-accurate revisions, asset-linked conversations, and comprehensive project management."
        />
      </Head>
      <Header />
      <Decorations />
      <div className="backdrop-blur-lg">
        <div className="border-t border-foreground-200">
          {/* Additional Features Grid */}
          <section className="py-16 px-6 bg-background">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-4xl font-bold font-sans mb-4">Everything you need to collaborate</h2>
                <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
                  Powerful features designed specifically for creative workflows and collaboration.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {additionalFeatures.map((feature, index) => (
                  <Card key={index} className="border border-foreground-300">
                    <CardBody className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-foreground-100 rounded-full p-2">
                          <Icon icon={feature.icon as any} size={24} className="text-primary" />
                        </div>
                        <h3 className="text-lg font-bold font-sans">{feature.title}</h3>
                      </div>
                      <p className="text-foreground-500 text-sm">{feature.description}</p>
                    </CardBody>
                  </Card>
                ))}
              </div>

              <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
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

          {/* Main Features Section */}
          <FeaturesSection />

          {/* Comparison Section */}
          <section className="py-16 px-6 bg-foreground-50">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-4xl font-bold font-sans mb-4">Kreatli vs. The Alternatives</h2>
                <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
                  See how Kreatli compares to using multiple tools or platforms for your creative workflow.
                </p>
              </div>

              <Card className="border border-foreground-300">
                <CardBody className="p-0 overflow-x-auto">
                  <Table aria-label="Feature comparison table" removeWrapper>
                    <TableHeader>
                      <TableColumn className="text-base">Feature</TableColumn>
                      <TableColumn className="text-base">
                        <div className="flex items-center gap-2">
                          <span>Kreatli</span>
                          <Chip size="sm" variant="flat" color="primary">
                            All-in-One
                          </Chip>
                        </div>
                      </TableColumn>
                      <TableColumn className="text-base">Frame.io</TableColumn>
                      <TableColumn className="text-base">Slack + PM Tools</TableColumn>
                      <TableColumn className="text-base">Email</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {comparisonData.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium text-base">{row.feature}</TableCell>
                          <TableCell className="text-base">
                            {row.kreatli ? (
                              <Icon icon="checkCircle" size={20} className="text-success" />
                            ) : (
                              <Icon icon="cross" size={20} className="text-foreground-300" />
                            )}
                          </TableCell>
                          <TableCell className="text-base">
                            {row.frameIo ? (
                              <Icon icon="checkCircle" size={20} className="text-success" />
                            ) : (
                              <Icon icon="cross" size={20} className="text-foreground-300" />
                            )}
                          </TableCell>
                          <TableCell className="text-base">
                            {row.slack ? (
                              <Icon icon="checkCircle" size={20} className="text-success" />
                            ) : (
                              <Icon icon="cross" size={20} className="text-foreground-300" />
                            )}
                          </TableCell>
                          <TableCell className="text-base">
                            {row.email ? (
                              <Icon icon="checkCircle" size={20} className="text-success" />
                            ) : (
                              <Icon icon="cross" size={20} className="text-foreground-300" />
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardBody>
              </Card>

              <div className="mt-8 text-center">
                <p className="text-sm text-foreground-500 mb-4">
                  Why juggle multiple tools when you can have everything in one place?
                </p>
                <Button as={NextLink} href="/cost-calculator" size="lg" variant="bordered">
                  Calculate Your Savings
                </Button>
              </div>
            </div>
          </section>

          {/* Use Cases Section */}
          <section className="py-16 px-6 bg-background">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-4xl font-bold font-sans mb-4">Perfect for any creative workflow</h2>
                <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
                  Whether you're reviewing videos, managing design assets, or coordinating production, Kreatli adapts to
                  your process.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="border border-foreground-300">
                  <CardBody className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Icon icon="addVideo" size={24} className="text-primary" />
                      <h3 className="text-lg font-bold font-sans">Video Production</h3>
                    </div>
                    <ul className="flex flex-col gap-2 text-sm text-foreground-500">
                      <li className="flex items-start gap-2">
                        <Icon icon="check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                        <span>Frame-accurate feedback on edits</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon icon="check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                        <span>Client approval workflows</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon icon="check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                        <span>Collaboration with editors</span>
                      </li>
                    </ul>
                  </CardBody>
                </Card>

                <Card className="border border-foreground-300">
                  <CardBody className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Icon icon="paint" size={24} className="text-primary" />
                      <h3 className="text-lg font-bold font-sans">Design Review</h3>
                    </div>
                    <ul className="flex flex-col gap-2 text-sm text-foreground-500">
                      <li className="flex items-start gap-2">
                        <Icon icon="check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                        <span>Precise annotation on images</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon icon="check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                        <span>Version control for designs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon icon="check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                        <span>Client feedback collection</span>
                      </li>
                    </ul>
                  </CardBody>
                </Card>

                <Card className="border border-foreground-300">
                  <CardBody className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Icon icon="folder" size={24} className="text-primary" />
                      <h3 className="text-lg font-bold font-sans">Project Management</h3>
                    </div>
                    <ul className="flex flex-col gap-2 text-sm text-foreground-500">
                      <li className="flex items-start gap-2">
                        <Icon icon="check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                        <span>Organize deliverables by project</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon icon="check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                        <span>Track project status and progress</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon icon="check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                        <span>Team collaboration tools</span>
                      </li>
                    </ul>
                  </CardBody>
                </Card>

                <Card className="border border-foreground-300">
                  <CardBody className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Icon icon="upload" size={24} className="text-primary" />
                      <h3 className="text-lg font-bold font-sans">File Sharing</h3>
                    </div>
                    <ul className="flex flex-col gap-2 text-sm text-foreground-500">
                      <li className="flex items-start gap-2">
                        <Icon icon="check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                        <span>Share large media files securely</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon icon="check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                        <span>Password-protected links</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon icon="check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                        <span>Cloud storage integration</span>
                      </li>
                    </ul>
                  </CardBody>
                </Card>

                <Card className="border border-foreground-300">
                  <CardBody className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Icon icon="chat" size={24} className="text-primary" />
                      <h3 className="text-lg font-bold font-sans">Team Communication</h3>
                    </div>
                    <ul className="flex flex-col gap-2 text-sm text-foreground-500">
                      <li className="flex items-start gap-2">
                        <Icon icon="check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                        <span>Asset-linked conversations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon icon="check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                        <span>Project-tied chats</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon icon="check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                        <span>Guest review participation</span>
                      </li>
                    </ul>
                  </CardBody>
                </Card>

                <Card className="border border-foreground-300">
                  <CardBody className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Icon icon="checkShield" size={24} className="text-primary" />
                      <h3 className="text-lg font-bold font-sans">Client Collaboration</h3>
                    </div>
                    <ul className="flex flex-col gap-2 text-sm text-foreground-500">
                      <li className="flex items-start gap-2">
                        <Icon icon="check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                        <span>No-signup review links</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon icon="check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                        <span>Access control and permissions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon icon="check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                        <span>Branded client experience</span>
                      </li>
                    </ul>
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
                Start using Kreatli today and experience the difference of a platform built specifically for creative
                teams.
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
