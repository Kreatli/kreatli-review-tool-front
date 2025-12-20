import Head from 'next/head';
import React from 'react';

import { Header } from '../../components/layout/Header';
import { FooterSection } from '../../components/home/Footer/FooterSection';
import { useSession } from '../../hooks/useSession';
import { Decorations } from '../../components/layout/Storyblok/Decorations';
import { Card, CardBody, Button } from '@heroui/react';
import NextLink from 'next/link';
import { Icon } from '../../components/various/Icon';
import { ProjectFeaturePreview } from '../../components/home/Features/ProjectFeaturePreview';
import { HomeDashboardFeaturePreview } from '../../components/home/Features/HomeDashboardFeaturePreview';

export default function ProjectOrchestrationPage() {
  useSession();

  return (
    <>
      <Head>
        <title>Kreatli | Project Orchestration – Centralized Creative Production Management</title>
        <meta
          name="description"
          content="Kreatli's Project Orchestration provides centralized project management, status tracking, and team coordination for creative production workflows. Manage all your projects from one dashboard."
        />
        <meta property="og:title" content="Kreatli | Project Orchestration – Centralized Creative Production Management" />
        <meta
          property="og:description"
          content="Orchestrate your creative projects with centralized project management, status tracking, and team coordination. Everything in one place for streamlined creative production."
        />
      </Head>
      <Header />
      <Decorations />
      {/* Hero Section */}
      <section className="relative py-16 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center flex flex-col gap-6 relative z-10">
          <h1 className="text-2xl sm:text-4xl font-bold font-sans max-w-lg mx-auto">
            Project Orchestration: Centralized Creative Production Management
          </h1>
          <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
            Assign files, track deliverables and share heavy media securely - creative production management within the
            same workspace. Everything you need to orchestrate your creative projects in one place.
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

      {/* Project Management Section */}
      <section className="relative py-16 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-4xl font-bold font-sans mb-4">
              Project Management Meets Reliable Media Storage
            </h2>
            <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
              Assign files, track deliverables and share heavy media securely - creative production management within
              the same workspace.
            </p>
          </div>
          <ProjectFeaturePreview />
        </div>
      </section>

      {/* Centralized Dashboard Section */}
      <section className="relative py-16 px-6 backdrop-blur-lg overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-4xl font-bold font-sans mb-4">Centralized Project Dashboard</h2>
            <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
              Everything you need in one place - project overview, media files, team chat, and activity tracking for
              streamlined creative production management, all accessible from a single dashboard.
            </p>
          </div>
          <HomeDashboardFeaturePreview />
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative py-16 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-4xl font-bold font-sans mb-4">Project Orchestration Features</h2>
            <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
              Built specifically for creative production workflows with powerful project management capabilities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-foreground-100 rounded-full p-2">
                    <Icon icon="folder" size={20} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold font-sans">Project Organization</h3>
                </div>
                <p className="text-foreground-500 text-sm">
                  Organize files by project, status, type, and more. Find what you need instantly with powerful
                  filtering and search.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-foreground-100 rounded-full p-2">
                    <Icon icon="user" size={20} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold font-sans">File Assignment</h3>
                </div>
                <p className="text-foreground-500 text-sm">
                  Assign files to team members, track who's working on what, and see the status of all deliverables at a
                  glance.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-foreground-100 rounded-full p-2">
                    <Icon icon="checkCircle" size={20} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold font-sans">Status Tracking</h3>
                </div>
                <p className="text-foreground-500 text-sm">
                  Track project status and progress with custom statuses. See what's in review, what's approved, and
                  what needs attention.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-foreground-100 rounded-full p-2">
                    <Icon icon="slides" size={20} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold font-sans">Centralized Dashboard</h3>
                </div>
                <p className="text-foreground-500 text-sm">
                  View all your projects, files, conversations, and activity from one centralized dashboard. No more
                  switching between tools.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-foreground-100 rounded-full p-2">
                    <Icon icon="group" size={20} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold font-sans">Team Coordination</h3>
                </div>
                <p className="text-foreground-500 text-sm">
                  Coordinate with your team through project-tied chats, asset-linked comments, and real-time
                  collaboration features.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-foreground-100 rounded-full p-2">
                    <Icon icon="bell" size={20} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold font-sans">Activity Tracking</h3>
                </div>
                <p className="text-foreground-500 text-sm">
                  See all project activity in one place - file uploads, comments, approvals, and status changes. Stay
                  informed about everything happening in your projects.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-foreground-50 lg:py-24 py-16 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center flex flex-col gap-6 relative z-10">
          <h2 className="text-2xl sm:text-4xl font-bold font-sans">Ready to Orchestrate Your Projects?</h2>
          <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
            Experience centralized project management designed for creative production teams. Start using Kreatli today
            and streamline your workflow.
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

