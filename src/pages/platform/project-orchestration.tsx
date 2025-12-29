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
import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';

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
        <meta
          property="og:title"
          content="Kreatli | Project Orchestration – Centralized Creative Production Management"
        />
        <meta
          property="og:description"
          content="Orchestrate your creative projects with centralized project management, status tracking, and team coordination. Everything in one place for streamlined creative production."
        />
      </Head>
      <Header />
      <Decorations />
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 text-center">
          <h1 className="mx-auto max-w-lg font-sans text-2xl font-bold sm:text-4xl">
            Centralized Creative Production Management
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-foreground-500">
            Assign files, track deliverables, and share heavy media securely. Everything you need to orchestrate your
            creative projects in one place.
          </p>
          <div className="mt-4 flex flex-col items-center justify-center gap-4 sm:flex-row">
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
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-4xl">
              Project Management Meets Reliable Media Storage
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Assign files, track deliverables, and share heavy media securely in one workspace.
            </p>
          </div>
          <ProjectFeaturePreview />
        </div>
      </section>

      {/* Centralized Dashboard Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-4xl">Centralized Project Dashboard</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Everything you need in one place—project overview, media files, team chat, and activity tracking.
            </p>
          </div>
          <HomeDashboardFeaturePreview />
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-4xl">Project Orchestration Features</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Built specifically for creative production workflows with powerful project management capabilities.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="folder" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Project Organization</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Organize files by project, status, type, and more. Find what you need instantly with powerful
                  filtering.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="user" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">File Assignment</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Assign files to team members, track who's working on what, and see the status of all deliverables.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="checkCircle" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Status Tracking</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Track project status and progress with custom statuses. See what's in review, approved, and needs
                  attention.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="slides" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Centralized Dashboard</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  View all your projects, files, conversations, and activity from one centralized dashboard.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="group" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Team Coordination</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Coordinate with your team through project-tied chats, asset-linked comments, and real-time
                  collaboration.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="bell" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Activity Tracking</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  See all project activity in one place—file uploads, comments, approvals, and status changes.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="overflow-hidden bg-foreground-50 px-6 py-16 lg:py-24">
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col gap-6 text-center">
          <h2 className="font-sans text-2xl font-bold sm:text-4xl">Ready to Orchestrate Your Projects?</h2>
          <p className="mx-auto max-w-2xl text-lg text-foreground-500">
            Experience centralized project management designed for creative production teams. Streamline your workflow.
          </p>
          <div className="mt-4 flex flex-col items-center justify-center gap-4 sm:flex-row">
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
      <SignUpModal />
    </>
  );
}
