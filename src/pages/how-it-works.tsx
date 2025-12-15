import Head from 'next/head';
import React from 'react';

import { Header } from '../components/layout/Header';
import { FooterSection } from '../components/home/Footer/FooterSection';
import { useSession } from '../hooks/useSession';
import { Decorations } from '../components/layout/Storyblok/Decorations';
import { Card, CardBody, Button, Chip, Accordion, AccordionItem } from '@heroui/react';
import NextLink from 'next/link';
import { Icon } from '../components/various/Icon';

export default function HowItWorksPage() {
  useSession();

  return (
    <>
      <Head>
        <title>Kreatli | How It Works – Creative Production & Media Review in 4 Steps</title>
        <meta
          name="description"
          content="Learn how Kreatli simplifies creative production management. Get started in 4 simple steps: set up projects, invite collaborators, run media review and approval workflows, and deliver final assets."
        />
        <meta property="og:title" content="Kreatli | How It Works – Creative Production & Media Review in 4 Steps" />
        <meta
          property="og:description"
          content="Discover how Kreatli streamlines creative production, media review and approval, and collaboration in a simple 4-step workflow for creative teams."
        />
        <meta property="og:type" content="website" />
      </Head>
      <Header />
      <Decorations />
      {/* Hero Section */}
      <section className="relative py-16 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center flex flex-col gap-6 relative z-10">
          <h1 className="text-2xl sm:text-4xl font-bold font-sans max-w-lg mx-auto">
            Get Started with Kreatli in 4 Simple Steps
          </h1>
          <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
            Streamline your creative workflow from project creation to final delivery. Kreatli makes collaboration
            simple, organized, and efficient for creative teams of all sizes.
          </p>
          <div className="flex flex-wrap gap-6 justify-center mt-4">
            <div className="flex flex-col items-center">
              <div className="text-2xl sm:text-3xl font-bold font-sans">4 Steps</div>
              <div className="text-sm sm:text-md text-foreground-500">To Get Started</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl sm:text-3xl font-bold font-sans">5 Minutes</div>
              <div className="text-sm sm:text-md text-foreground-500">Setup Time</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl sm:text-3xl font-bold font-sans">Zero</div>
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

      {/* Visual Workflow Section */}
      <section className="relative py-16 px-6 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-bold font-sans mb-4">
              Your Complete Creative Production Workflow
            </h2>
            <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
              See how all the pieces fit together to create a seamless creative collaboration experience that saves time
              and eliminates confusion.
            </p>
          </div>

          {/* Workflow Progress Indicator */}
          <div className="flex justify-center mb-12 sticky top-20 z-10">
            <div className="flex items-center gap-4 bg-background rounded-full px-6 py-3 shadow-large">
              <div className="flex items-center gap-2 group cursor-pointer">
                <div className="size-2 bg-primary rounded-full transition-transform duration-200"></div>
                <a
                  href="#setup"
                  className="text-sm font-medium group-hover:text-primary transition-colors duration-200"
                >
                  Setup
                </a>
              </div>
              <div className="w-8 hidden md:block h-px bg-gradient-to-r from-primary to-foreground-300"></div>
              <div className="flex items-center gap-2 group cursor-pointer">
                <div className="size-2 bg-primary rounded-full transition-transform duration-200"></div>
                <a
                  href="#collaborate"
                  className="text-sm font-medium group-hover:text-primary transition-colors duration-200"
                >
                  Collaborate
                </a>
              </div>
              <div className="w-8 hidden md:block h-px bg-gradient-to-r from-primary to-foreground-300"></div>
              <div className="flex items-center gap-2 group cursor-pointer">
                <div className="size-2 bg-primary rounded-full transition-transform duration-200"></div>
                <a
                  href="#review"
                  className="text-sm font-medium group-hover:text-primary transition-colors duration-200"
                >
                  Review
                </a>
              </div>
              <div className="w-8 hidden md:block h-px bg-gradient-to-r from-primary to-foreground-300"></div>
              <div className="flex items-center gap-2 group cursor-pointer">
                <div className="size-2 bg-primary rounded-full transition-transform duration-200"></div>
                <a
                  href="#deliver"
                  className="text-sm font-medium group-hover:text-primary transition-colors duration-200"
                >
                  Deliver
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-12">
            {/* Step 1: Project Setup */}
            <Card id="setup" className="scroll-mt-36">
              <CardBody className="p-5 sm:p-8 lg:p-12">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                  <div className="flex flex-col gap-6 lg:w-1/3">
                    <div className="flex items-center gap-4">
                      <div className="shrink-0 size-14 md:size-20 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon icon="folder" size={32} className="text-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-primary mb-1">Step 1</div>
                        <h3 className="text-2xl lg:text-3xl font-bold font-sans">Project Setup</h3>
                      </div>
                    </div>
                    <p className="text-foreground-500 text-base lg:text-lg">
                      Create your project workspace and establish the foundation for seamless collaboration. Upload
                      files, connect cloud storage, and organize everything for your team.
                    </p>
                    <div className="flex flex-col gap-2">
                      <div>⏱️ Time to complete: 2-5 minutes</div>
                      <div>💰 Saves: 2+ hours per project</div>
                    </div>
                  </div>

                  <div className="lg:w-2/3 lg:pl-8 lg:border-l border-foreground-200 flex flex-col gap-8">
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-xl font-bold font-sans mb-4 flex items-center gap-2">
                          <Icon icon="list" size={24} className="text-primary" />
                          Process Breakdown
                        </h4>
                        <ul className="flex flex-col gap-3">
                          <li className="flex items-start gap-3 text-base text-foreground-500">
                            <div className="size-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-xs font-bold text-primary">1</span>
                            </div>
                            <span>Create project and set basic information</span>
                          </li>
                          <li className="flex items-start gap-3 text-base text-foreground-500">
                            <div className="size-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-xs font-bold text-primary">2</span>
                            </div>
                            <span>Upload files or connect cloud storage</span>
                          </li>
                          <li className="flex items-start gap-3 text-base text-foreground-500">
                            <div className="size-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-xs font-bold text-primary">3</span>
                            </div>
                            <span>Organize files by folders and categories</span>
                          </li>
                          <li className="flex items-start gap-3 text-base text-foreground-500">
                            <div className="size-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-xs font-bold text-primary">4</span>
                            </div>
                            <span>Configure project settings and permissions</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-xl font-bold font-sans mb-4 flex items-center gap-2">
                          <Icon icon="warning" size={24} className="text-warning" />
                          Challenges Addressed
                        </h4>
                        <ul className="flex flex-col gap-3">
                          <li className="flex items-start gap-2 text-base text-foreground-500">
                            <Icon icon="cross" size={18} className="text-warning mt-0.5 flex-shrink-0" />
                            <span>Files scattered across multiple platforms</span>
                          </li>
                          <li className="flex items-start gap-2 text-base text-foreground-500">
                            <Icon icon="cross" size={18} className="text-warning mt-0.5 flex-shrink-0" />
                            <span>Version confusion and lost files</span>
                          </li>
                          <li className="flex items-start gap-2 text-base text-foreground-500">
                            <Icon icon="cross" size={18} className="text-warning mt-0.5 flex-shrink-0" />
                            <span>Time wasted searching for assets</span>
                          </li>
                          <li className="flex items-start gap-2 text-base text-foreground-500">
                            <Icon icon="cross" size={18} className="text-warning mt-0.5 flex-shrink-0" />
                            <span>Inconsistent project organization</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold font-sans mb-4 flex items-center gap-2">
                        <Icon icon="slides" size={24} className="text-success" />
                        Real-World Example
                      </h4>
                      <Card className="bg-success/5">
                        <CardBody className="p-6">
                          <p className="text-base text-foreground-600 mb-3">
                            <strong>Marketing Agency Scenario:</strong> You're starting a new campaign for a client.
                            Instead of creating folders in Google Drive, sharing Dropbox links, and managing files
                            across email, you create one Kreatli project. Upload the brand assets, connect the client's
                            existing Google Drive folder, and organize everything by campaign phase. Your entire team
                            now has access to the same organized workspace.
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <Chip size="sm" variant="flat" color="success">
                              Brand Assets
                            </Chip>
                            <Chip size="sm" variant="flat" color="success">
                              Campaign Materials
                            </Chip>
                            <Chip size="sm" variant="flat" color="success">
                              Client Resources
                            </Chip>
                            <Chip size="sm" variant="flat" color="success">
                              Final Deliverables
                            </Chip>
                          </div>
                        </CardBody>
                      </Card>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Enhanced Flow Arrow */}
            <div className="flex justify-center items-center">
              <div className="flex flex-col items-center gap-2">
                <div className="w-px h-8 bg-gradient-to-b from-primary/50 to-primary"></div>
                <div className="size-8 bg-primary/10 rounded-full flex items-center justify-center border-2 border-primary/30">
                  <Icon icon="chevronDown" size={20} className="text-primary" />
                </div>
                <div className="w-px h-8 bg-gradient-to-b from-primary to-primary/50"></div>
              </div>
            </div>

            {/* Step 2: Team Collaboration */}
            <Card id="collaborate" className="scroll-mt-36">
              <CardBody className="p-5 sm:p-8 lg:p-12">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                  <div className="flex flex-col gap-6 lg:w-1/3">
                    <div className="flex items-center gap-4">
                      <div className="shrink-0 size-14 md:size-20 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon icon="userPlus" size={32} className="text-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-primary mb-1">Step 2</div>
                        <h3 className="text-2xl lg:text-3xl font-bold font-sans">Team Collaboration</h3>
                      </div>
                    </div>
                    <p className="text-foreground-500 text-base lg:text-lg">
                      Bring your team and clients into the project with seamless access controls. No friction, no
                      barriers - just smooth collaboration from day one.
                    </p>
                    <div className="flex flex-col gap-2">
                      <div>⏱️ Time to complete: 1-3 minutes</div>
                      <div>💰 Saves: 30+ minutes per stakeholder</div>
                    </div>
                  </div>

                  <div className="lg:w-2/3 lg:pl-8 lg:border-l border-foreground-200 flex flex-col gap-8">
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-xl font-bold font-sans mb-4 flex items-center gap-2">
                          <Icon icon="list" size={24} className="text-primary" />
                          Process Breakdown
                        </h4>
                        <ul className="flex flex-col gap-3">
                          <li className="flex items-start gap-3 text-base text-foreground-500">
                            <div className="size-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-xs font-bold text-primary">1</span>
                            </div>
                            <span>Add team members with specific roles</span>
                          </li>
                          <li className="flex items-start gap-3 text-base text-foreground-500">
                            <div className="size-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-xs font-bold text-primary">2</span>
                            </div>
                            <span>Generate secure guest links for clients</span>
                          </li>
                          <li className="flex items-start gap-3 text-base text-foreground-500">
                            <div className="size-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-xs font-bold text-primary">3</span>
                            </div>
                            <span>Set permissions and access levels</span>
                          </li>
                          <li className="flex items-start gap-3 text-base text-foreground-500">
                            <div className="size-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-xs font-bold text-primary">4</span>
                            </div>
                            <span>Send invitations and onboard collaborators</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-xl font-bold font-sans mb-4 flex items-center gap-2">
                          <Icon icon="warning" size={24} className="text-warning" />
                          Challenges Addressed
                        </h4>
                        <ul className="flex flex-col gap-3">
                          <li className="flex items-start gap-2 text-base text-foreground-500">
                            <Icon icon="cross" size={18} className="text-warning mt-0.5 flex-shrink-0" />
                            <span>Client onboarding friction and delays</span>
                          </li>
                          <li className="flex items-start gap-2 text-base text-foreground-500">
                            <Icon icon="cross" size={18} className="text-warning mt-0.5 flex-shrink-0" />
                            <span>Managing multiple tool access permissions</span>
                          </li>
                          <li className="flex items-start gap-2 text-base text-foreground-500">
                            <Icon icon="cross" size={18} className="text-warning mt-0.5 flex-shrink-0" />
                            <span>Email chains for access requests</span>
                          </li>
                          <li className="flex items-start gap-2 text-base text-foreground-500">
                            <Icon icon="cross" size={18} className="text-warning mt-0.5 flex-shrink-0" />
                            <span>Security concerns with file sharing</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold font-sans mb-4 flex items-center gap-2">
                        <Icon icon="slides" size={24} className="text-success" />
                        Real-World Example
                      </h4>
                      <Card className="bg-success/5">
                        <CardBody className="p-6">
                          <p className="text-base text-foreground-600 mb-3">
                            <strong>Video Production Scenario:</strong> You need feedback from the client, the brand
                            manager, and two internal stakeholders. Instead of setting up accounts in multiple tools,
                            you generate one secure link with password protection. Share it via email or Slack. Everyone
                            clicks the link and can immediately start reviewing - no signups, no downloads, no friction.
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <Chip size="sm" variant="flat" color="success">
                              Client Access
                            </Chip>
                            <Chip size="sm" variant="flat" color="success">
                              Team Members
                            </Chip>
                            <Chip size="sm" variant="flat" color="success">
                              External Stakeholders
                            </Chip>
                            <Chip size="sm" variant="flat" color="success">
                              Guest Reviewers
                            </Chip>
                          </div>
                        </CardBody>
                      </Card>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Enhanced Flow Arrow */}
            <div className="flex justify-center items-center">
              <div className="flex flex-col items-center gap-2">
                <div className="w-px h-8 bg-gradient-to-b from-primary/50 to-primary"></div>
                <div className="size-8 bg-primary/10 rounded-full flex items-center justify-center border-2 border-primary/30">
                  <Icon icon="chevronDown" size={20} className="text-primary" />
                </div>
                <div className="w-px h-8 bg-gradient-to-b from-primary to-primary/50"></div>
              </div>
            </div>

            {/* Step 3: Review & Feedback */}
            <Card id="review" className="scroll-mt-36">
              <CardBody className="p-5 sm:p-8 lg:p-12">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                  <div className="flex flex-col gap-6 lg:w-1/3">
                    <div className="flex items-center gap-4">
                      <div className="shrink-0 size-14 md:size-20 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon icon="chat" size={32} className="text-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-primary mb-1">Step 3</div>
                        <h3 className="text-2xl lg:text-3xl font-bold font-sans">Review & Feedback</h3>
                      </div>
                    </div>
                    <p className="text-foreground-500 text-base lg:text-lg">
                      Collect precise, actionable feedback that's impossible to misunderstand. Frame-accurate comments
                      and asset-linked conversations eliminate confusion and speed up revisions.
                    </p>
                    <div className="flex flex-col gap-2">
                      <div>⏱️ Time to complete: Ongoing</div>
                      <div>💰 Saves: 50% fewer revision cycles</div>
                    </div>
                  </div>

                  <div className="lg:w-2/3 lg:pl-8 lg:border-l border-foreground-200 flex flex-col gap-8">
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-xl font-bold font-sans mb-4 flex items-center gap-2">
                          <Icon icon="list" size={24} className="text-primary" />
                          Process Breakdown
                        </h4>
                        <ul className="flex flex-col gap-3">
                          <li className="flex items-start gap-3 text-base text-foreground-500">
                            <div className="size-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-xs font-bold text-primary">1</span>
                            </div>
                            <span>Reviewers click on exact frames or image areas</span>
                          </li>
                          <li className="flex items-start gap-3 text-base text-foreground-500">
                            <div className="size-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-xs font-bold text-primary">2</span>
                            </div>
                            <span>Add detailed comments with context</span>
                          </li>
                          <li className="flex items-start gap-3 text-base text-foreground-500">
                            <div className="size-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-xs font-bold text-primary">3</span>
                            </div>
                            <span>Assign tasks to specific team members</span>
                          </li>
                          <li className="flex items-start gap-3 text-base text-foreground-500">
                            <div className="size-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-xs font-bold text-primary">4</span>
                            </div>
                            <span>Track progress and mark items complete</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-xl font-bold font-sans mb-4 flex items-center gap-2">
                          <Icon icon="warning" size={24} className="text-warning" />
                          Challenges Addressed
                        </h4>
                        <ul className="flex flex-col gap-3">
                          <li className="flex items-start gap-2 text-base text-foreground-500">
                            <Icon icon="cross" size={18} className="text-warning mt-0.5 flex-shrink-0" />
                            <span>"Which frame?" or "what timestamp?" confusion</span>
                          </li>
                          <li className="flex items-start gap-2 text-base text-foreground-500">
                            <Icon icon="cross" size={18} className="text-warning mt-0.5 flex-shrink-0" />
                            <span>Feedback lost in email threads</span>
                          </li>
                          <li className="flex items-start gap-2 text-base text-foreground-500">
                            <Icon icon="cross" size={18} className="text-warning mt-0.5 flex-shrink-0" />
                            <span>Unclear or vague feedback</span>
                          </li>
                          <li className="flex items-start gap-2 text-base text-foreground-500">
                            <Icon icon="cross" size={18} className="text-warning mt-0.5 flex-shrink-0" />
                            <span>Multiple revision rounds for simple changes</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold font-sans mb-4 flex items-center gap-2">
                        <Icon icon="slides" size={24} className="text-success" />
                        Real-World Example
                      </h4>
                      <Card className="bg-success/5">
                        <CardBody className="p-6">
                          <p className="text-base text-foreground-600 mb-3">
                            <strong>Design Review Scenario:</strong> A client reviews a promotional video and clicks on
                            frame 2:34 to comment "The logo needs to be 20% larger here." The designer sees exactly
                            which frame, at what timestamp, with the specific feedback. No guessing, no back-and-forth
                            emails asking for clarification. The task is assigned, completed, and marked as resolved in
                            the same thread.
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <Chip size="sm" variant="flat" color="success">
                              Frame-Accurate
                            </Chip>
                            <Chip size="sm" variant="flat" color="success">
                              Clear Context
                            </Chip>
                            <Chip size="sm" variant="flat" color="success">
                              Task Assignment
                            </Chip>
                            <Chip size="sm" variant="flat" color="success">
                              Progress Tracking
                            </Chip>
                          </div>
                        </CardBody>
                      </Card>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Enhanced Flow Arrow */}
            <div className="flex justify-center items-center">
              <div className="flex flex-col items-center gap-2">
                <div className="w-px h-8 bg-gradient-to-b from-primary/50 to-primary"></div>
                <div className="size-8 bg-primary/10 rounded-full flex items-center justify-center border-2 border-primary/30">
                  <Icon icon="chevronDown" size={20} className="text-primary" />
                </div>
                <div className="w-px h-8 bg-gradient-to-b from-primary to-primary/50"></div>
              </div>
            </div>

            {/* Step 4: Delivery & Completion */}
            <Card id="deliver" className="scroll-mt-36">
              <CardBody className="p-5 sm:p-8 lg:p-12">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                  <div className="flex flex-col gap-6 lg:w-1/3">
                    <div className="flex items-center gap-4">
                      <div className="shrink-0 size-14 md:size-20 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon icon="checkCircle" size={32} className="text-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-primary mb-1">Step 4</div>
                        <h3 className="text-2xl lg:text-3xl font-bold font-sans">Delivery & Completion</h3>
                      </div>
                    </div>
                    <p className="text-foreground-500 text-base lg:text-lg">
                      Deliver projects with confidence and complete documentation. Track every deliverable, maintain
                      version history, and provide clients with exactly what they approved.
                    </p>
                    <div className="flex flex-col gap-2">
                      <div>⏱️ Time to complete: 5-10 minutes</div>
                      <div>💰 Saves: Hours of project wrap-up time</div>
                    </div>
                  </div>

                  <div className="lg:w-2/3 lg:pl-8 lg:border-l border-foreground-200 flex flex-col gap-8">
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-xl font-bold font-sans mb-4 flex items-center gap-2">
                          <Icon icon="list" size={24} className="text-primary" />
                          Process Breakdown
                        </h4>
                        <ul className="flex flex-col gap-3">
                          <li className="flex items-start gap-3 text-base text-foreground-500">
                            <div className="size-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-xs font-bold text-primary">1</span>
                            </div>
                            <span>Review project status and completion</span>
                          </li>
                          <li className="flex items-start gap-3 text-base text-foreground-500">
                            <div className="size-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-xs font-bold text-primary">2</span>
                            </div>
                            <span>Export approved final versions</span>
                          </li>
                          <li className="flex items-start gap-3 text-base text-foreground-500">
                            <div className="size-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-xs font-bold text-primary">3</span>
                            </div>
                            <span>Generate delivery reports and documentation</span>
                          </li>
                          <li className="flex items-start gap-3 text-base text-foreground-500">
                            <div className="size-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-xs font-bold text-primary">4</span>
                            </div>
                            <span>Archive project with complete history</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-xl font-bold font-sans mb-4 flex items-center gap-2">
                          <Icon icon="warning" size={24} className="text-warning" />
                          Challenges Addressed
                        </h4>
                        <ul className="flex flex-col gap-3">
                          <li className="flex items-start gap-2 text-base text-foreground-500">
                            <Icon icon="cross" size={18} className="text-warning mt-0.5 flex-shrink-0" />
                            <span>Confusion about final vs. draft versions</span>
                          </li>
                          <li className="flex items-start gap-2 text-base text-foreground-500">
                            <Icon icon="cross" size={18} className="text-warning mt-0.5 flex-shrink-0" />
                            <span>Missing deliverables or incomplete projects</span>
                          </li>
                          <li className="flex items-start gap-2 text-base text-foreground-500">
                            <Icon icon="cross" size={18} className="text-warning mt-0.5 flex-shrink-0" />
                            <span>Lack of project completion documentation</span>
                          </li>
                          <li className="flex items-start gap-2 text-base text-foreground-500">
                            <Icon icon="cross" size={18} className="text-warning mt-0.5 flex-shrink-0" />
                            <span>Client requests for "previous versions"</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold font-sans mb-4 flex items-center gap-2">
                        <Icon icon="slides" size={24} className="text-success" />
                        Real-World Example
                      </h4>
                      <Card className="bg-success/5">
                        <CardBody className="p-6">
                          <p className="text-base text-foreground-600 mb-3">
                            <strong>Campaign Completion Scenario:</strong> Your marketing campaign is approved and ready
                            to launch. You export the final video files, download the approved graphics, and generate a
                            delivery report showing all completed tasks and approvals. Six months later, the client asks
                            to "go back to version 3 of the hero video" - you know exactly which version they mean and
                            can deliver it instantly.
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <Chip size="sm" variant="flat" color="success">
                              Final Assets
                            </Chip>
                            <Chip size="sm" variant="flat" color="success">
                              Delivery Report
                            </Chip>
                            <Chip size="sm" variant="flat" color="success">
                              Version History
                            </Chip>
                            <Chip size="sm" variant="flat" color="success">
                              Project Archive
                            </Chip>
                          </div>
                        </CardBody>
                      </Card>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative py-16 px-6 backdrop-blur-lg overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-4">
            <h2 className="text-2xl sm:text-4xl font-bold font-sans mb-4">Why This Process Works</h2>
            <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
              Our simple 4-step workflow eliminates complexity and saves you time at every stage of your creative
              process.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-foreground-100 rounded-full p-2">
                    <Icon icon="time" size={20} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold font-sans">Saves Time</h3>
                </div>
                <p className="text-foreground-500 text-sm">
                  No more switching between multiple tools. Everything you need is in one place, reducing context
                  switching and saving hours every week.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-foreground-100 rounded-full p-2">
                    <Icon icon="checkCircle" size={20} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold font-sans">Reduces Errors</h3>
                </div>
                <p className="text-foreground-500 text-sm">
                  Frame-accurate comments and asset-linked conversations ensure feedback is never lost or misunderstood.
                  Everyone knows exactly what needs to be changed.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-foreground-100 rounded-full p-2">
                    <Icon icon="group" size={20} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold font-sans">Improves Collaboration</h3>
                </div>
                <p className="text-foreground-500 text-sm">
                  Clients and team members can collaborate seamlessly without signups or complex onboarding. Everyone
                  stays in sync automatically.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-foreground-100 rounded-full p-2">
                    <Icon icon="folder" size={20} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold font-sans">Stays Organized</h3>
                </div>
                <p className="text-foreground-500 text-sm">
                  All files, conversations, and project history are organized in one place. Find what you need instantly
                  with powerful search and filtering.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-foreground-100 rounded-full p-2">
                    <Icon icon="shield" size={20} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold font-sans">Secure & Private</h3>
                </div>
                <p className="text-foreground-500 text-sm">
                  Enterprise-grade security with password protection and access controls. Your creative work stays
                  private and secure.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-foreground-100 rounded-full p-2">
                    <Icon icon="update" size={20} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold font-sans">Version Control</h3>
                </div>
                <p className="text-foreground-500 text-sm">
                  Complete version history for all your files. Never lose work and easily revert to previous versions
                  when needed.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-16 px-6 backdrop-blur-lg overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-4xl font-bold font-sans mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
              Get detailed answers about the 4-step workflow, setup process, and how Kreatli streamlines your creative
              collaboration.
            </p>
          </div>

          <Accordion variant="splitted">
            <AccordionItem
              key="get-started"
              title={
                <span className="font-semibold text-base">
                  How long does it take to get started with Kreatli's 4-step workflow?
                </span>
              }
            >
              <div className="text-foreground-500 space-y-3">
                <p>
                  You can be up and running with Kreatli in under 5 minutes. The process is straightforward: create an
                  account (takes 30 seconds), create your first project (1 minute), and start uploading files or
                  connecting cloud storage (2-3 minutes). No complex setup, configuration, or technical knowledge
                  required.
                </p>
                <p>
                  The 4-step workflow (Project Setup, Team Collaboration, Review & Feedback, Delivery & Completion) is
                  designed to be intuitive and sequential. You don't need to complete all steps at once - you can set up
                  a project, add files, and invite collaborators as needed. The platform guides you through each step,
                  making it easy to get started even if you're new to creative production management tools.
                </p>
                <p>
                  Most teams find they can complete their first project setup in 5 minutes and start collaborating
                  immediately. The learning curve is minimal because Kreatli is built specifically for creative
                  workflows, so the interface and processes feel natural to video creators, designers, and creative
                  professionals. You can be productive from day one without extensive training or onboarding.
                </p>
              </div>
            </AccordionItem>

            <AccordionItem
              key="client-accounts"
              title={
                <span className="font-semibold text-base">
                  Do clients and external collaborators need to create accounts to use Kreatli?
                </span>
              }
            >
              <div className="text-foreground-500 space-y-3">
                <p>
                  No! One of Kreatli's key features is no-signup guest review links. You can share secure review links
                  with clients, stakeholders, and external collaborators, and they can review files, add comments, and
                  participate in the approval workflow without creating accounts or signing up for anything.
                </p>
                <p>
                  Guest review links can be password-protected for additional security, and you can set expiration dates
                  and access controls. This eliminates the friction that often delays client feedback - clients simply
                  click the link, enter a password if required, and immediately start reviewing. They see a clean,
                  focused interface designed for reviewing and providing feedback, without the complexity of project
                  management features they don't need.
                </p>
                <p>
                  This no-signup approach speeds up the review and approval process significantly. Instead of waiting
                  for clients to create accounts, learn new software, or navigate complex interfaces, they can provide
                  feedback immediately. All their comments and approvals are automatically tracked and organized in your
                  project, keeping your creative production management workflow smooth and efficient.
                </p>
              </div>
            </AccordionItem>

            <AccordionItem
              key="project-setup"
              title={
                <span className="font-semibold text-base">
                  What's involved in the Project Setup step, and how does it save time?
                </span>
              }
            >
              <div className="text-foreground-500 space-y-3">
                <p>
                  The Project Setup step involves creating your project workspace, uploading files or connecting cloud
                  storage, organizing files by folders and categories, and configuring project settings and permissions.
                  This foundational step establishes the structure for all subsequent collaboration and review work.
                </p>
                <p>
                  Kreatli saves time in project setup by consolidating what would typically require multiple tools.
                  Instead of creating folders in Google Drive, setting up a project in a project management tool, and
                  configuring access in separate platforms, everything happens in one place. You can connect existing
                  Google Drive or Dropbox folders, so you don't have to re-upload files you already have stored
                  elsewhere.
                </p>
                <p>
                  The platform's smart organization features help you set up projects quickly. Files can be organized by
                  project, status, type, and custom tags, making it easy to find assets later. Project settings and
                  permissions can be configured once and applied consistently, reducing setup time for subsequent
                  projects. This organized foundation saves 2+ hours per project compared to managing files and projects
                  across multiple disconnected tools.
                </p>
              </div>
            </AccordionItem>

            <AccordionItem
              key="cloud-storage"
              title={
                <span className="font-semibold text-base">
                  Can I connect my existing cloud storage, and how does that work?
                </span>
              }
            >
              <div className="text-foreground-500 space-y-3">
                <p>
                  Yes! Kreatli integrates with Google Drive and Dropbox, allowing you to connect your existing file
                  storage and sync files between platforms. You can continue using your preferred cloud storage while
                  leveraging Kreatli's specialized features for creative production management, media review, and
                  collaboration.
                </p>
                <p>
                  When you connect cloud storage, you can either sync existing files from your Google Drive or Dropbox
                  folders into Kreatli projects, or upload files directly to Kreatli. All files benefit from Kreatli's
                  organization, review, and collaboration features regardless of their source. This means you don't have
                  to abandon your existing file storage solutions - you can use them alongside Kreatli's specialized
                  creative workflow features.
                </p>
                <p>
                  The integration keeps your files organized in one central workspace while maintaining the flexibility
                  to use cloud storage for general file management. This is particularly valuable for teams that have
                  existing file organization systems but want to add Kreatli's review and approval workflows, project
                  management, and collaboration features to their creative production management process.
                </p>
              </div>
            </AccordionItem>

            <AccordionItem
              key="frame-accurate"
              title={
                <span className="font-semibold text-base">
                  How does frame-accurate commenting work in the Review & Feedback step?
                </span>
              }
            >
              <div className="text-foreground-500 space-y-3">
                <p>
                  Frame-accurate commenting allows reviewers to pin comments to exact frames and timestamps in video
                  files. When reviewing a video, you can click on any specific frame to add a comment that's permanently
                  linked to that moment in the timeline. This eliminates the "which clip?" or "what timestamp?"
                  confusion that plagues video production workflows.
                </p>
                <p>
                  Comments are timestamped and linked to specific frames, so when a reviewer says "change the color at
                  00:02:15" or "add transition between frames 1,234-1,236," creators know exactly where to make changes.
                  This precision reduces revision cycles by 50% because feedback is clear and actionable from the start.
                  No more back-and-forth emails asking for clarification about which part of the video needs changes.
                </p>
                <p>
                  The frame-accurate review feature is integrated into Kreatli's review and approval workflow, so all
                  comments are tracked, organized, and visible to the team. Creators can see exactly where changes are
                  needed, mark revisions as complete once addressed, and maintain a complete history of all feedback.
                  This makes the Review & Feedback step much more efficient than managing feedback through email,
                  messaging apps, or generic review tools that don't support frame-accurate commenting.
                </p>
              </div>
            </AccordionItem>

            <AccordionItem
              key="team-collaboration"
              title={
                <span className="font-semibold text-base">
                  How does the Team Collaboration step work, and what makes it efficient?
                </span>
              }
            >
              <div className="text-foreground-500 space-y-3">
                <p>
                  The Team Collaboration step involves adding team members with specific roles, generating secure guest
                  links for clients, setting permissions and access levels, and sending invitations to onboard
                  collaborators. This step brings everyone into the project with appropriate access levels, typically
                  taking just 1-3 minutes to complete.
                </p>
                <p>
                  What makes this step efficient is the elimination of friction in client onboarding. Instead of
                  requiring clients to create accounts, learn new software, or navigate complex interfaces, you generate
                  one secure link that gives them immediate access to review and provide feedback. This saves 30+
                  minutes per stakeholder compared to traditional onboarding processes that involve account creation,
                  email verification, and tool training.
                </p>
                <p>
                  The platform's access control system allows you to set granular permissions for different team members
                  and clients. Internal team members can have full access to projects, files, and collaboration
                  features, while clients can have review-only access through guest links. This ensures everyone has the
                  right level of access without overwhelming clients with features they don't need, making the
                  collaboration process smooth and efficient for all parties involved in your creative production
                  management workflow.
                </p>
              </div>
            </AccordionItem>

            <AccordionItem
              key="delivery"
              title={
                <span className="font-semibold text-base">
                  What happens in the Delivery & Completion step, and how does it help with project closure?
                </span>
              }
            >
              <div className="text-foreground-500 space-y-3">
                <p>
                  The Delivery & Completion step involves reviewing project status and completion, exporting approved
                  final versions, generating delivery reports and documentation, and archiving projects with complete
                  history. This final step ensures projects are properly closed with all deliverables documented and
                  accessible for future reference.
                </p>
                <p>
                  Kreatli helps with project closure by maintaining complete version history and project documentation.
                  When a client asks to "go back to version 3" months later, you know exactly which version they mean
                  and can deliver it instantly. All approved final versions are clearly marked, and delivery reports
                  show what was completed, when it was approved, and by whom. This eliminates confusion about final vs.
                  draft versions and ensures nothing gets lost.
                </p>
                <p>
                  The platform saves hours of project wrap-up time by automatically maintaining project history,
                  organizing all files and conversations, and providing clear documentation of the entire creative
                  production process. Instead of manually compiling project documentation or searching through multiple
                  tools to find final versions, everything is organized and accessible in one place. This makes project
                  closure efficient and ensures you have complete records for future reference or similar projects.
                </p>
              </div>
            </AccordionItem>

            <AccordionItem
              key="learning-curve"
              title={
                <span className="font-semibold text-base">
                  Is there a learning curve, and how quickly can teams become productive?
                </span>
              }
            >
              <div className="text-foreground-500 space-y-3">
                <p>
                  Kreatli is designed to be intuitive with minimal learning curve. The 4-step process is straightforward
                  and sequential, making it easy to understand how the platform works. The interface is built
                  specifically for creative professionals, so it feels natural to video creators, designers, and
                  creative teams who are already familiar with creative production workflows.
                </p>
                <p>
                  Most teams are productive within minutes of starting. The platform doesn't require extensive training
                  or onboarding because the workflow mirrors how creative teams naturally work: set up projects,
                  collaborate with team members and clients, collect feedback, and deliver final work. Unlike generic
                  project management tools that require learning complex systems, Kreatli's features are purpose-built
                  for creative workflows.
                </p>
                <p>
                  For team members, the learning curve is minimal because they're working within familiar creative
                  production concepts. For clients using guest review links, there's virtually no learning curve - they
                  simply click a link and start reviewing. This ease of use means teams can adopt Kreatli quickly
                  without disrupting their existing workflows, and the platform becomes more valuable as teams use it
                  more frequently in their creative production management process.
                </p>
              </div>
            </AccordionItem>

            <AccordionItem
              key="workflow-benefits"
              title={
                <span className="font-semibold text-base">
                  What are the main benefits of following Kreatli's 4-step workflow?
                </span>
              }
            >
              <div className="text-foreground-500 space-y-3">
                <p>
                  The 4-step workflow (Project Setup, Team Collaboration, Review & Feedback, Delivery & Completion)
                  provides structure and efficiency to creative production management. By following this process, teams
                  save time at every stage: 2+ hours per project in setup, 30+ minutes per stakeholder in collaboration,
                  50% fewer revision cycles in review, and hours of project wrap-up time in delivery.
                </p>
                <p>
                  The workflow eliminates tool-switching and context loss by keeping everything in one platform. Instead
                  of jumping between Google Drive, Frame.io, Slack, and project management software, all project work
                  happens in Kreatli. This reduces the time spent searching for files, tracking down feedback, and
                  managing multiple platforms. Frame-accurate comments and asset-linked conversations ensure feedback is
                  never lost or misunderstood, reducing errors and revision cycles.
                </p>
                <p>
                  The structured approach also improves organization and project visibility. All files, conversations,
                  and project history are organized in one place, making it easy to see project status, track
                  deliverables, and maintain complete documentation. This organization benefits both internal teams and
                  clients, who can see clear project progress and provide feedback efficiently. The workflow creates a
                  seamless creative collaboration experience that saves time and eliminates confusion throughout the
                  entire creative production process.
                </p>
              </div>
            </AccordionItem>

            <AccordionItem
              key="try-before-committing"
              title={
                <span className="font-semibold text-base">
                  Can I try Kreatli's workflow before committing to a paid plan?
                </span>
              }
            >
              <div className="text-foreground-500 space-y-3">
                <p>
                  Absolutely! Kreatli offers a Free Plan with full access to all features (2 projects, 2 users),
                  allowing you to test the complete 4-step workflow with real projects before committing. There's no
                  credit card required, so you can evaluate how Kreatli fits into your creative production management
                  process risk-free.
                </p>
                <p>
                  The Free Plan includes all core features: project setup, team collaboration, frame-accurate review,
                  media review and approval workflows, guest review links, file organization, and delivery features.
                  This means you can fully test the workflow with actual projects and see how it compares to your
                  current tool stack. Many teams use the Free Plan to onboard their team and run a pilot project before
                  upgrading to a paid plan.
                </p>
                <p>
                  For teams ready to commit, we offer trial periods for paid plans so you can test with your full team
                  before making a long-term commitment. You can also book a personalized demo to see how the 4-step
                  workflow would work for your specific creative process. We provide migration assistance to help move
                  files and projects, and our team can help set up your workflows to ensure a smooth transition to
                  Kreatli's creative production management platform.
                </p>
              </div>
            </AccordionItem>
          </Accordion>

          <div className="max-w-3xl mx-auto flex flex-col gap-4 text-center items-center mt-8">
            <h3 className="text-xl font-sans font-bold">Still Have Questions About How Kreatli Works?</h3>
            <p className="text-foreground-500">
              If you didn't find the answer you were looking for, feel free to contact our support team at{' '}
              <a href="mailto:support@kreatli.com" className="underline underline-offset-2 text-primary">
                support@kreatli.com
              </a>{' '}
              to learn more about the 4-step workflow and how it can streamline your creative collaboration.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-foreground-50 lg:py-24 py-16 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center flex flex-col gap-6 relative z-10">
          <h2 className="text-2xl sm:text-4xl font-bold font-sans max-w-lg mx-auto">
            Ready to Streamline Your Workflow?
          </h2>
          <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
            Join creative teams who have simplified their collaboration process. Get started in 4 simple steps and see
            the difference immediately.
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
          </div>
        </div>
      </section>
      <FooterSection hideCta={true} />
    </>
  );
}
