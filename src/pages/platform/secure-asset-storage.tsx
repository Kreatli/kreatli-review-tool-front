import Head from 'next/head';
import React from 'react';

import { Header } from '../../components/layout/Header';
import { FooterSection } from '../../components/home/Footer/FooterSection';
import { useSession } from '../../hooks/useSession';
import { Decorations } from '../../components/layout/Storyblok/Decorations';
import { Card, CardBody, Button } from '@heroui/react';
import NextLink from 'next/link';
import { Icon } from '../../components/various/Icon';
import { StorageFeaturePreview } from '../../components/home/Features/StorageFeaturePreview';
import { ProjectFeaturePreview } from '../../components/home/Features/ProjectFeaturePreview';
import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';

export default function SecureAssetStoragePage() {
  useSession();

  return (
    <>
      <Head>
        <title>Kreatli | Secure Asset Storage – Reliable Media Storage for Creative Teams</title>
        <meta
          name="description"
          content="Kreatli provides secure, reliable media storage with enterprise-grade security, smart file organization, and version control for creative production teams. Protect your creative assets."
        />
        <meta
          property="og:title"
          content="Kreatli | Secure Asset Storage – Reliable Media Storage for Creative Teams"
        />
        <meta
          property="og:description"
          content="Secure your creative assets with enterprise-grade storage, smart file organization, and version control. Built for creative production teams."
        />
      </Head>
      <Header />
      <Decorations />
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 text-center">
          <h1 className="mx-auto max-w-lg font-sans text-2xl font-bold sm:text-4xl">
            Reliable Media Storage for Creative Teams
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-foreground-500">
            Assign files, track deliverables, and share heavy media securely with enterprise-grade security.
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

      {/* Secure Storage Preview Section */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-4xl">Secure File Upload and Encrypted Storage</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Upload large media files with real-time progress tracking. All files encrypted at rest with
              enterprise-grade security.
            </p>
          </div>
          <StorageFeaturePreview />
        </div>
      </section>

      {/* Project Management Preview Section */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-4xl">
              Project Management Meets Reliable Media Storage
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Organize files by project, assign team members, track status, and manage deliverables in one workspace.
            </p>
          </div>
          <ProjectFeaturePreview />
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-4xl">Secure Asset Storage Features</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Enterprise-grade security and smart organization for your creative assets.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="shield" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Enterprise Security</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Enterprise-level encryption, secure file sharing, and compliance-ready security for sensitive creative
                  work.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="folder" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Smart File Organization</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Organize files by project, status, type, and more. Powerful filtering and search help you find what
                  you need.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="link" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Version History</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Track all changes with comprehensive version history. Never lose your work and easily revert to
                  previous versions.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="upload" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Heavy Media Support</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Upload and share large video files, images, and creative assets. No more WeTransfer or cloud storage
                  juggling.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="eyeCrossed" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Access Controls</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Set granular permissions for team members, controlling who can view, comment, approve, or download
                  files.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="folder" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Reliable Storage</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Dependable media storage infrastructure designed for creative production workflows. Your assets are
                  safe.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="overflow-hidden bg-foreground-50 px-6 py-16 lg:py-24">
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col gap-6 text-center">
          <h2 className="font-sans text-2xl font-bold sm:text-4xl">Ready to Secure Your Creative Assets?</h2>
          <p className="mx-auto max-w-2xl text-lg text-foreground-500">
            Experience enterprise-grade secure asset storage designed for creative production teams.
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
