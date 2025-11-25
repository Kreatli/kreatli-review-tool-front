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
            <h2 className="text-2xl sm:text-4xl font-bold font-sans mb-4">Your Complete Workflow</h2>
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
          <h2 className="text-2xl sm:text-4xl font-bold font-sans text-center mb-8">Frequently Asked Questions</h2>

          <Accordion variant="splitted">
            <AccordionItem
              key="get-started"
              title={<span className="font-semibold">How long does it take to get started?</span>}
            >
              <span className="text-foreground-500">
                You can be up and running in under 5 minutes. Simply create an account, create your first project, and
                start uploading files. No complex setup or configuration required.
              </span>
            </AccordionItem>

            <AccordionItem
              key="client-accounts"
              title={<span className="font-semibold">Do clients need to create accounts?</span>}
            >
              <span className="text-foreground-500">
                No! You can share guest links with clients. They can review, comment, and download without creating an
                account or signing up for anything.
              </span>
            </AccordionItem>

            <AccordionItem
              key="cloud-storage"
              title={<span className="font-semibold">Can I connect my existing cloud storage?</span>}
            >
              <span className="text-foreground-500">
                Yes! Kreatli integrates with Google Drive and Dropbox. You can sync existing files or upload directly.
                Your files stay organized in one central workspace.
              </span>
            </AccordionItem>

            <AccordionItem
              key="frame-accurate"
              title={<span className="font-semibold">How does frame-accurate commenting work?</span>}
            >
              <span className="text-foreground-500">
                When reviewing videos, you can pin comments to exact frames. This eliminates confusion about which part
                of the video needs changes. Comments are timestamped and linked to specific frames.
              </span>
            </AccordionItem>

            <AccordionItem
              key="learning-curve"
              title={<span className="font-semibold">Is there a learning curve?</span>}
            >
              <span className="text-foreground-500">
                Kreatli is designed to be intuitive. The 4-step process is straightforward, and the interface is built
                for creative professionals. Most teams are productive within minutes of starting.
              </span>
            </AccordionItem>

            <AccordionItem
              key="try-before-committing"
              title={<span className="font-semibold">Can I try it before committing?</span>}
            >
              <span className="text-foreground-500">
                Absolutely! We offer a free plan and a trial period for our paid plans so you can test Kreatli with your
                team. You can also book a demo to see how it works for your specific workflow. We'll help you migrate
                your projects and ensure a smooth transition.
              </span>
            </AccordionItem>
          </Accordion>
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
