import { Button,Card, CardBody } from '@heroui/react';
import Head from 'next/head';
import NextLink from 'next/link';
import React from 'react';

import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';
import { ChatFeaturePreview } from '../../components/home/Features/ChatFeaturePreview';
import { HomeDashboardFeaturePreview } from '../../components/home/Features/HomeDashboardFeaturePreview';
import { StorageFeaturePreview } from '../../components/home/Features/StorageFeaturePreview';
import { FooterSection } from '../../components/home/Footer/FooterSection';
import { Header } from '../../components/layout/Header';
import { Decorations } from '../../components/layout/Storyblok/Decorations';
import { Icon } from '../../components/various/Icon';
import { useSession } from '../../hooks/useSession';

export default function CreativeWorkspacePage() {
  useSession();

  return (
    <>
      <Head>
        <title>Kreatli | The Creative Workspace – Unified Video Production Platform</title>
        <meta
          name="description"
          content="The Creative Workspace in Kreatli provides a unified platform for creative production management. Project-tied conversations, asset-linked comments, and centralized dashboards streamline your entire creative workflow in one place."
        />
        <link rel="canonical" href="https://kreatli.com/platform/creative-workspace" />
        <meta property="og:url" content="https://kreatli.com/platform/creative-workspace" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Kreatli | The Creative Workspace – Unified Video Production Platform" />
        <meta
          property="og:description"
          content="Experience a unified creative workspace with project-tied chats, asset-linked conversations, and centralized project dashboards. Everything you need for creative production management in one place."
        />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:secure_url" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:alt" content="Kreatli | The Creative Workspace – Unified Video Production Platform" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kreatli | The Creative Workspace – Unified Video Production Platform" />
        <meta
          name="twitter:description"
          content="Experience a unified creative workspace with project-tied chats, asset-linked conversations, and centralized project dashboards. Everything you need for creative production management in one place."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
      </Head>
      <Header />
      <Decorations />
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 text-center">
          <h1 className="mx-auto max-w-lg font-sans text-2xl font-bold sm:text-4xl">One Place to Rule Them All</h1>
          <p className="mx-auto max-w-2xl text-lg text-foreground-500">
            A unified workspace for creative production teams. Project-tied conversations and asset-linked comments keep
            your workflow organized.
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

      {/* Centralized Dashboard Section */}
      <section className="relative overflow-hidden px-6 py-16">
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

      {/* Project-Tied Conversations Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-4xl">Project-Tied Conversations</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Project-tied chats and asset-linked comments streamline your approval workflow—keep feedback with the
              asset.
            </p>
          </div>
          <ChatFeaturePreview />
        </div>
      </section>

      {/* Storage Upload Section */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-4xl">Secure File Storage & Upload</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Upload and manage creative assets with drag & drop support, progress tracking, and encrypted storage.
            </p>
          </div>
          <StorageFeaturePreview />
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-4xl">Key Workspace Features</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Built specifically for creative production workflows, not adapted from generic project management tools.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="chat" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Asset-Linked Feedback</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Comments and conversations stay with your files. No more searching through email threads.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="slides" size={20} className="text-primary" />
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
                    <Icon icon="folder" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Unified Workspace</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  All your projects, files, conversations, and activity in one centralized dashboard. No more
                  tool-switching.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="link" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Context-Rich Communication</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Project-tied chats ensure all conversations stay with the relevant work, eliminating context loss.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="bell" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Real-Time Updates</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Stay in sync with real-time notifications for comments, approvals, and project updates.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="group" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Team Collaboration</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Collaborate seamlessly with team members, clients, and external collaborators in one unified
                  workspace.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="overflow-hidden bg-foreground-50 px-6 py-16 lg:py-24">
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col gap-6 text-center">
          <h2 className="font-sans text-2xl font-bold sm:text-4xl">Ready to Unify Your Creative Workspace?</h2>
          <p className="mx-auto max-w-2xl text-lg text-foreground-500">
            Experience a platform built specifically for creative teams. Streamline your entire creative production
            workflow.
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
