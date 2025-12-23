import Head from 'next/head';
import React from 'react';

import { Header } from '../../components/layout/Header';
import { FooterSection } from '../../components/home/Footer/FooterSection';
import { useSession } from '../../hooks/useSession';
import { Decorations } from '../../components/layout/Storyblok/Decorations';
import { Card, CardBody, Button } from '@heroui/react';
import NextLink from 'next/link';
import { Icon } from '../../components/various/Icon';
import { HomeDashboardFeaturePreview } from '../../components/home/Features/HomeDashboardFeaturePreview';
import { ChatFeaturePreview } from '../../components/home/Features/ChatFeaturePreview';
import { StorageFeaturePreview } from '../../components/home/Features/StorageFeaturePreview';
import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';

export default function CreativeWorkspacePage() {
  useSession();

  return (
    <>
      <Head>
        <title>Kreatli | The Creative Workspace – Unified Creative Production Platform</title>
        <meta
          name="description"
          content="The Creative Workspace in Kreatli provides a unified platform for creative production management. Project-tied conversations, asset-linked comments, and centralized dashboards streamline your entire creative workflow in one place."
        />
        <meta property="og:title" content="Kreatli | The Creative Workspace – Unified Creative Production Platform" />
        <meta
          property="og:description"
          content="Experience a unified creative workspace with project-tied chats, asset-linked conversations, and centralized project dashboards. Everything you need for creative production management in one place."
        />
      </Head>
      <Header />
      <Decorations />
      {/* Hero Section */}
      <section className="relative py-16 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center flex flex-col gap-6 relative z-10">
          <h1 className="text-2xl sm:text-4xl font-bold font-sans max-w-lg mx-auto">One Place to Rule Them All</h1>
          <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
            A unified workspace for creative production teams. Project-tied conversations and asset-linked comments keep your workflow organized.
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

      {/* Centralized Dashboard Section */}
      <section className="relative py-16 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-4xl font-bold font-sans mb-4">Centralized Project Dashboard</h2>
            <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
              Everything you need in one place—project overview, media files, team chat, and activity tracking.
            </p>
          </div>
          <HomeDashboardFeaturePreview />
        </div>
      </section>

      {/* Project-Tied Conversations Section */}
      <section className="relative py-16 px-6 backdrop-blur-lg overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-4xl font-bold font-sans mb-4">Project-Tied Conversations</h2>
            <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
              Project-tied chats and asset-linked comments streamline your approval workflow—keep feedback with the asset.
            </p>
          </div>
          <ChatFeaturePreview />
        </div>
      </section>

      {/* Storage Upload Section */}
      <section className="relative py-16 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-4xl font-bold font-sans mb-4">Secure File Storage & Upload</h2>
            <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
              Upload and manage creative assets with drag & drop support, progress tracking, and encrypted storage.
            </p>
          </div>
          <StorageFeaturePreview />
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative py-16 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-4xl font-bold font-sans mb-4">Key Workspace Features</h2>
            <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
              Built specifically for creative production workflows, not adapted from generic project management tools.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-foreground-100 rounded-full p-2">
                    <Icon icon="chat" size={20} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold font-sans">Asset-Linked Feedback</h3>
                </div>
                <p className="text-foreground-500 text-sm">
                  Comments and conversations stay with your files. No more searching through email threads.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-foreground-100 rounded-full p-2">
                    <Icon icon="slides" size={20} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold font-sans">Project Organization</h3>
                </div>
                <p className="text-foreground-500 text-sm">
                  Organize files by project, status, type, and more. Find what you need instantly with powerful filtering.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-foreground-100 rounded-full p-2">
                    <Icon icon="folder" size={20} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold font-sans">Unified Workspace</h3>
                </div>
                <p className="text-foreground-500 text-sm">
                  All your projects, files, conversations, and activity in one centralized dashboard. No more tool-switching.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-foreground-100 rounded-full p-2">
                    <Icon icon="link" size={20} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold font-sans">Context-Rich Communication</h3>
                </div>
                <p className="text-foreground-500 text-sm">
                  Project-tied chats ensure all conversations stay with the relevant work, eliminating context loss.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-foreground-100 rounded-full p-2">
                    <Icon icon="bell" size={20} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold font-sans">Real-Time Updates</h3>
                </div>
                <p className="text-foreground-500 text-sm">
                  Stay in sync with real-time notifications for comments, approvals, and project updates.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-foreground-100 rounded-full p-2">
                    <Icon icon="group" size={20} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold font-sans">Team Collaboration</h3>
                </div>
                <p className="text-foreground-500 text-sm">
                  Collaborate seamlessly with team members, clients, and external collaborators in one unified workspace.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-foreground-50 lg:py-24 py-16 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center flex flex-col gap-6 relative z-10">
          <h2 className="text-2xl sm:text-4xl font-bold font-sans">Ready to Unify Your Creative Workspace?</h2>
          <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
            Experience a platform built specifically for creative teams. Streamline your entire creative production workflow.
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
      <SignUpModal />
    </>
  );
}
