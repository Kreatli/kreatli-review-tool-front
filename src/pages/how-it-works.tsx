import Head from 'next/head';
import React from 'react';

import { Header } from '../components/layout/Header';
import { HowItWorksSection } from '../components/home/HowItWorks';
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

export default function HowItWorksPage({ footerLinks }: Props) {
  useSession();

  return (
    <>
      <Head>
        <title>Kreatli | How It Works - Get Started in 4 Simple Steps</title>
        <meta
          name="description"
          content="Learn how Kreatli simplifies your creative workflow. Get started in 4 simple steps: create projects, invite collaborators, review & assign, and deliver. Streamline your creative process today."
        />
        <meta property="og:title" content="Kreatli | How It Works - Get Started in 4 Simple Steps" />
        <meta
          property="og:description"
          content="Discover how Kreatli streamlines creative collaboration. Simple 4-step process to manage projects, collaborate with teams, and deliver creative work efficiently."
        />
        <meta property="og:type" content="website" />
      </Head>
      <Header />
      <Decorations />
      <div className="backdrop-blur-lg">
        <div className="border-t border-foreground-200">
          {/* Hero Section */}
          <section className="relative py-16 px-6 bg-background overflow-hidden">
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
            <div className="max-w-6xl mx-auto text-center flex flex-col gap-6 relative z-10">
              <h1 className="text-3xl sm:text-5xl font-bold font-sans">Get Started with Kreatli in 4 Simple Steps</h1>
              <p className="text-lg sm:text-xl text-foreground-500 max-w-3xl mx-auto">
                Streamline your creative workflow from project creation to final delivery. Kreatli makes collaboration
                simple, organized, and efficient for creative teams of all sizes.
              </p>
              <div className="flex flex-wrap gap-6 justify-center mt-4">
                <div className="flex flex-col items-center">
                  <div className="text-3xl sm:text-4xl font-bold font-sans text-primary">4 Steps</div>
                  <div className="text-sm sm:text-md text-foreground-500">To Get Started</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-3xl sm:text-4xl font-bold font-sans text-primary">5 Minutes</div>
                  <div className="text-sm sm:text-md text-foreground-500">Setup Time</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-3xl sm:text-4xl font-bold font-sans text-primary">Zero</div>
                  <div className="text-sm sm:text-md text-foreground-500">Learning Curve</div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6">
                <Button as={NextLink} href="/sign-up" size="lg" className="bg-foreground text-content1">
                  Start Now for Free
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

          {/* Enhanced Steps Section */}
          <section className="relative py-16 px-6 bg-foreground-50 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div
                className={`absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-br from-green-300/30 to-blue-300/30 rounded-full ${styles.animateFloatFast}`}
              />
              <div
                className={`absolute top-1/3 left-1/4 w-16 h-16 bg-gradient-to-br from-yellow-300/25 to-orange-300/25 rounded-full ${styles.animateFloatMedium}`}
              />
              <div
                className={`absolute top-1/2 left-1/3 w-4 h-4 bg-pink-400/50 rounded-full ${styles.animateFloatSlow}`}
              />
              <div
                className={`absolute bottom-24 left-1/4 w-2 h-2 bg-orange-400/50 rounded-full ${styles.animateFloatMedium}`}
              />
            </div>
            <div className="max-w-6xl mx-auto relative z-10">
              <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-4xl font-bold font-sans mb-4">How Does Kreatli Work?</h2>
                <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
                  Follow these four simple steps to transform your creative workflow and start collaborating more
                  effectively.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border border-foreground-300">
                  <CardBody className="p-6 flex flex-col gap-4 items-center text-center">
                    <div className="size-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <div className="size-12 text-primary font-bold font-sans text-xl bg-primary/20 rounded-full flex items-center justify-center">
                        1
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-center gap-2">
                        <Icon icon="folder" size={24} className="text-primary" />
                        <h3 className="text-lg font-bold font-sans">Create a Project</h3>
                      </div>
                      <p className="text-foreground-500 text-sm">
                        Start by creating a new project. Upload your files directly or connect Google Drive/Dropbox to
                        sync existing files. Organize everything in one central workspace.
                      </p>
                      <ul className="flex flex-col gap-1 text-xs text-foreground-500 mt-2">
                        <li className="flex items-start gap-2">
                          <Icon icon="check" size={12} className="text-success mt-0.5 flex-shrink-0" />
                          <span>Upload files or connect cloud storage</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Icon icon="check" size={12} className="text-success mt-0.5 flex-shrink-0" />
                          <span>Organize by project, client, or type</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Icon icon="check" size={12} className="text-success mt-0.5 flex-shrink-0" />
                          <span>Set project settings and permissions</span>
                        </li>
                      </ul>
                    </div>
                  </CardBody>
                </Card>

                <Card className="border border-foreground-300">
                  <CardBody className="p-6 flex flex-col gap-4 items-center text-center">
                    <div className="size-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <div className="size-12 text-primary font-bold font-sans text-xl bg-primary/20 rounded-full flex items-center justify-center">
                        2
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-center gap-2">
                        <Icon icon="userPlus" size={24} className="text-primary" />
                        <h3 className="text-lg font-bold font-sans">Invite Collaborators</h3>
                      </div>
                      <p className="text-foreground-500 text-sm">
                        Invite team members to collaborate or send no-signup guest links to clients. Everyone can review
                        and comment without creating accounts.
                      </p>
                      <ul className="flex flex-col gap-1 text-xs text-foreground-500 mt-2">
                        <li className="flex items-start gap-2">
                          <Icon icon="check" size={12} className="text-success mt-0.5 flex-shrink-0" />
                          <span>Invite team members with roles</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Icon icon="check" size={12} className="text-success mt-0.5 flex-shrink-0" />
                          <span>Share password-protected guest links</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Icon icon="check" size={12} className="text-success mt-0.5 flex-shrink-0" />
                          <span>Control access and permissions</span>
                        </li>
                      </ul>
                    </div>
                  </CardBody>
                </Card>

                <Card className="border border-foreground-300">
                  <CardBody className="p-6 flex flex-col gap-4 items-center text-center">
                    <div className="size-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <div className="size-12 text-primary font-bold font-sans text-xl bg-primary/20 rounded-full flex items-center justify-center">
                        3
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-center gap-2">
                        <Icon icon="chat" size={24} className="text-primary" />
                        <h3 className="text-lg font-bold font-sans">Review & Assign</h3>
                      </div>
                      <p className="text-foreground-500 text-sm">
                        Get frame-accurate feedback on videos and precise annotations on images. Assign tasks, track
                        progress, and keep all conversations tied to specific assets.
                      </p>
                      <ul className="flex flex-col gap-1 text-xs text-foreground-500 mt-2">
                        <li className="flex items-start gap-2">
                          <Icon icon="check" size={12} className="text-success mt-0.5 flex-shrink-0" />
                          <span>Frame-accurate video comments</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Icon icon="check" size={12} className="text-success mt-0.5 flex-shrink-0" />
                          <span>Precise image annotations</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Icon icon="check" size={12} className="text-success mt-0.5 flex-shrink-0" />
                          <span>Task assignment and tracking</span>
                        </li>
                      </ul>
                    </div>
                  </CardBody>
                </Card>

                <Card className="border border-foreground-300">
                  <CardBody className="p-6 flex flex-col gap-4 items-center text-center">
                    <div className="size-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <div className="size-12 text-primary font-bold font-sans text-xl bg-primary/20 rounded-full flex items-center justify-center">
                        4
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-center gap-2">
                        <Icon icon="checkCircle" size={24} className="text-primary" />
                        <h3 className="text-lg font-bold font-sans">Deliver</h3>
                      </div>
                      <p className="text-foreground-500 text-sm">
                        Track your deliverables, export approved media, and maintain a complete history of all changes.
                        Deliver projects on time with full visibility.
                      </p>
                      <ul className="flex flex-col gap-1 text-xs text-foreground-500 mt-2">
                        <li className="flex items-start gap-2">
                          <Icon icon="check" size={12} className="text-success mt-0.5 flex-shrink-0" />
                          <span>Track project status and progress</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Icon icon="check" size={12} className="text-success mt-0.5 flex-shrink-0" />
                          <span>Export approved final versions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Icon icon="check" size={12} className="text-success mt-0.5 flex-shrink-0" />
                          <span>Maintain complete version history</span>
                        </li>
                      </ul>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="relative py-16 px-6 bg-background overflow-hidden">
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
            <div className="max-w-6xl mx-auto relative z-10">
              <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-4xl font-bold font-sans mb-4">Why This Process Works</h2>
                <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
                  Our simple 4-step workflow eliminates complexity and saves you time at every stage of your creative
                  process.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="border border-foreground-300">
                  <CardBody className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-foreground-100 rounded-full p-2">
                        <Icon icon="time" size={24} className="text-primary" />
                      </div>
                      <h3 className="text-lg font-bold font-sans">Saves Time</h3>
                    </div>
                    <p className="text-foreground-500 text-sm">
                      No more switching between multiple tools. Everything you need is in one place, reducing context
                      switching and saving hours every week.
                    </p>
                  </CardBody>
                </Card>

                <Card className="border border-foreground-300">
                  <CardBody className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-foreground-100 rounded-full p-2">
                        <Icon icon="checkCircle" size={24} className="text-primary" />
                      </div>
                      <h3 className="text-lg font-bold font-sans">Reduces Errors</h3>
                    </div>
                    <p className="text-foreground-500 text-sm">
                      Frame-accurate comments and asset-linked conversations ensure feedback is never lost or
                      misunderstood. Everyone knows exactly what needs to be changed.
                    </p>
                  </CardBody>
                </Card>

                <Card className="border border-foreground-300">
                  <CardBody className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-foreground-100 rounded-full p-2">
                        <Icon icon="group" size={24} className="text-primary" />
                      </div>
                      <h3 className="text-lg font-bold font-sans">Improves Collaboration</h3>
                    </div>
                    <p className="text-foreground-500 text-sm">
                      Clients and team members can collaborate seamlessly without signups or complex onboarding.
                      Everyone stays in sync automatically.
                    </p>
                  </CardBody>
                </Card>

                <Card className="border border-foreground-300">
                  <CardBody className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-foreground-100 rounded-full p-2">
                        <Icon icon="folder" size={24} className="text-primary" />
                      </div>
                      <h3 className="text-lg font-bold font-sans">Stays Organized</h3>
                    </div>
                    <p className="text-foreground-500 text-sm">
                      All files, conversations, and project history are organized in one place. Find what you need
                      instantly with powerful search and filtering.
                    </p>
                  </CardBody>
                </Card>

                <Card className="border border-foreground-300">
                  <CardBody className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-foreground-100 rounded-full p-2">
                        <Icon icon="checkShield" size={24} className="text-primary" />
                      </div>
                      <h3 className="text-lg font-bold font-sans">Secure & Private</h3>
                    </div>
                    <p className="text-foreground-500 text-sm">
                      Enterprise-grade security with password protection and access controls. Your creative work stays
                      private and secure.
                    </p>
                  </CardBody>
                </Card>

                <Card className="border border-foreground-300">
                  <CardBody className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-foreground-100 rounded-full p-2">
                        <Icon icon="update" size={24} className="text-primary" />
                      </div>
                      <h3 className="text-lg font-bold font-sans">Version Control</h3>
                    </div>
                    <p className="text-foreground-500 text-sm">
                      Complete version history for all your files. Never lose work and easily revert to previous
                      versions when needed.
                    </p>
                  </CardBody>
                </Card>
              </div>
            </div>
          </section>

          {/* Visual Workflow Section */}
          <section className="relative py-16 px-6 bg-foreground-50 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div
                className={`absolute top-20 right-1/4 w-28 h-28 bg-gradient-to-br from-purple-300/30 to-pink-300/30 rounded-full ${styles.animateFloatSlow}`}
              />
              <div
                className={`absolute bottom-20 left-1/3 w-24 h-24 bg-gradient-to-br from-orange-300/30 to-yellow-300/30 rounded-full ${styles.animateFloatMedium}`}
              />
              <div
                className={`absolute bottom-16 left-1/2 w-2 h-2 bg-yellow-400/50 rounded-full ${styles.animateFloatFast}`}
              />
              <div
                className={`absolute bottom-28 right-1 left-10 w-4 h-4 bg-indigo-400/50 rounded-full ${styles.animateFloatMedium}`}
              />
            </div>
            <div className="max-w-6xl mx-auto relative z-10">
              <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-4xl font-bold font-sans mb-4">Your Complete Workflow</h2>
                <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
                  See how all the pieces fit together to create a seamless creative collaboration experience.
                </p>
              </div>

              <div className="flex flex-col gap-8">
                <Card className="border border-foreground-300">
                  <CardBody className="p-6">
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                      <div className="flex-shrink-0">
                        <div className="size-20 bg-primary/10 rounded-full flex items-center justify-center">
                          <Icon icon="folder" size={40} className="text-primary" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold font-sans mb-2">Step 1: Project Setup</h3>
                        <p className="text-foreground-500 mb-4">
                          Create your project workspace and upload files. Connect cloud storage for seamless file
                          management. Set up project structure that matches your workflow.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Chip size="sm" variant="faded">
                            File Upload
                          </Chip>
                          <Chip size="sm" variant="faded">
                            Cloud Integration
                          </Chip>
                          <Chip size="sm" variant="faded">
                            Project Organization
                          </Chip>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>

                <div className="flex justify-center">
                  <Icon icon="chevronDown" size={32} className="text-foreground-300" />
                </div>

                <Card className="border border-foreground-300">
                  <CardBody className="p-6">
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                      <div className="flex-shrink-0">
                        <div className="size-20 bg-primary/10 rounded-full flex items-center justify-center">
                          <Icon icon="userPlus" size={40} className="text-primary" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold font-sans mb-2">Step 2: Team Collaboration</h3>
                        <p className="text-foreground-500 mb-4">
                          Invite team members and share with clients. Use guest links for seamless client access without
                          signups. Set permissions and access controls.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Chip size="sm" variant="faded">
                            Team Invites
                          </Chip>
                          <Chip size="sm" variant="faded">
                            Guest Links
                          </Chip>
                          <Chip size="sm" variant="faded">
                            Access Control
                          </Chip>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>

                <div className="flex justify-center">
                  <Icon icon="chevronDown" size={32} className="text-foreground-300" />
                </div>

                <Card className="border border-foreground-300">
                  <CardBody className="p-6">
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                      <div className="flex-shrink-0">
                        <div className="size-20 bg-primary/10 rounded-full flex items-center justify-center">
                          <Icon icon="chat" size={40} className="text-primary" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold font-sans mb-2">Step 3: Review & Feedback</h3>
                        <p className="text-foreground-500 mb-4">
                          Get precise feedback with frame-accurate video comments and image annotations. Assign tasks,
                          track progress, and keep all conversations organized.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Chip size="sm" variant="faded">
                            Frame-Accurate Comments
                          </Chip>
                          <Chip size="sm" variant="faded">
                            Image Annotations
                          </Chip>
                          <Chip size="sm" variant="faded">
                            Task Management
                          </Chip>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>

                <div className="flex justify-center">
                  <Icon icon="chevronDown" size={32} className="text-foreground-300" />
                </div>

                <Card className="border border-foreground-300">
                  <CardBody className="p-6">
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                      <div className="flex-shrink-0">
                        <div className="size-20 bg-primary/10 rounded-full flex items-center justify-center">
                          <Icon icon="checkCircle" size={40} className="text-primary" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold font-sans mb-2">Step 4: Delivery & Completion</h3>
                        <p className="text-foreground-500 mb-4">
                          Track deliverables, export approved versions, and maintain complete project history. Deliver
                          on time with full visibility into project status.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Chip size="sm" variant="faded">
                            Status Tracking
                          </Chip>
                          <Chip size="sm" variant="faded">
                            Export & Download
                          </Chip>
                          <Chip size="sm" variant="faded">
                            Version History
                          </Chip>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="relative py-16 px-6 bg-background overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div
                className={`absolute top-40 left-20 w-24 h-24 bg-gradient-to-br from-pink-300/30 to-orange-300/30 rounded-full ${styles.animateFloatMedium}`}
              />
              <div
                className={`absolute bottom-32 right-1/4 w-20 h-20 bg-gradient-to-br from-green-300/30 to-blue-300/30 rounded-full ${styles.animateFloatFast}`}
              />
              <div
                className={`absolute top-16 left-1/3 w-3 h-3 bg-blue-400/50 rounded-full ${styles.animateFloatFast}`}
              />
              <div
                className={`absolute bottom-24 right-1/4 w-2 h-2 bg-purple-400/50 rounded-full ${styles.animateFloatMedium}`}
              />
            </div>
            <div className="max-w-4xl mx-auto relative z-10">
              <h2 className="text-2xl sm:text-4xl font-bold font-sans text-center mb-12">Frequently Asked Questions</h2>

              <div className="flex flex-col gap-6">
                <Card className="border border-foreground-300">
                  <CardBody className="p-6">
                    <h3 className="text-lg font-bold font-sans mb-2">How long does it take to get started?</h3>
                    <p className="text-foreground-500">
                      You can be up and running in under 5 minutes. Simply create an account, create your first project,
                      and start uploading files. No complex setup or configuration required.
                    </p>
                  </CardBody>
                </Card>

                <Card className="border border-foreground-300">
                  <CardBody className="p-6">
                    <h3 className="text-lg font-bold font-sans mb-2">Do clients need to create accounts?</h3>
                    <p className="text-foreground-500">
                      No! You can share password-protected guest links with clients. They can review, comment, and
                      provide feedback without creating an account or signing up for anything.
                    </p>
                  </CardBody>
                </Card>

                <Card className="border border-foreground-300">
                  <CardBody className="p-6">
                    <h3 className="text-lg font-bold font-sans mb-2">Can I connect my existing cloud storage?</h3>
                    <p className="text-foreground-500">
                      Yes! Kreatli integrates with Google Drive and Dropbox. You can sync existing files or upload
                      directly. Your files stay organized in one central workspace.
                    </p>
                  </CardBody>
                </Card>

                <Card className="border border-foreground-300">
                  <CardBody className="p-6">
                    <h3 className="text-lg font-bold font-sans mb-2">How does frame-accurate commenting work?</h3>
                    <p className="text-foreground-500">
                      When reviewing videos, you can pin comments to exact frames. This eliminates confusion about which
                      part of the video needs changes. Comments are timestamped and linked to specific frames.
                    </p>
                  </CardBody>
                </Card>

                <Card className="border border-foreground-300">
                  <CardBody className="p-6">
                    <h3 className="text-lg font-bold font-sans mb-2">Is there a learning curve?</h3>
                    <p className="text-foreground-500">
                      Kreatli is designed to be intuitive. The 4-step process is straightforward, and the interface is
                      built for creative professionals. Most teams are productive within minutes of starting.
                    </p>
                  </CardBody>
                </Card>

                <Card className="border border-foreground-300">
                  <CardBody className="p-6">
                    <h3 className="text-lg font-bold font-sans mb-2">Can I try it before committing?</h3>
                    <p className="text-foreground-500">
                      Absolutely! We offer a free plan so you can test Kreatli with your team. You can also book a demo
                      to see how it works for your specific workflow before making any commitment.
                    </p>
                  </CardBody>
                </Card>
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
              <h2 className="text-2xl sm:text-4xl font-bold font-sans">Ready to Streamline Your Workflow?</h2>
              <p className="text-lg text-foreground-500">
                Join creative teams who have simplified their collaboration process. Get started in 4 simple steps and
                see the difference immediately.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-4">
                <Button as={NextLink} href="/sign-up" size="lg" className="bg-foreground text-content1">
                  Start Now for Free
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
