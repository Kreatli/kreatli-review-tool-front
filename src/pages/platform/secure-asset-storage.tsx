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
        <meta property="og:title" content="Kreatli | Secure Asset Storage – Reliable Media Storage for Creative Teams" />
        <meta
          property="og:description"
          content="Secure your creative assets with enterprise-grade storage, smart file organization, and version control. Built for creative production teams."
        />
      </Head>
      <Header />
      <Decorations />
      {/* Hero Section */}
      <section className="relative py-16 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center flex flex-col gap-6 relative z-10">
          <h1 className="text-2xl sm:text-4xl font-bold font-sans max-w-lg mx-auto">
            Secure Asset Storage: Reliable Media Storage for Creative Teams
          </h1>
          <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
            Project Management Meets Reliable Media Storage. Assign files, track deliverables and share heavy media
            securely - creative production management within the same workspace with enterprise-grade security.
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

      {/* Storage Preview Section */}
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

      {/* Features Grid */}
      <section className="relative py-16 px-6 backdrop-blur-lg overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-4xl font-bold font-sans mb-4">Secure Asset Storage Features</h2>
            <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
              Enterprise-grade security and smart organization for your creative assets.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-foreground-100 rounded-full p-2">
                    <Icon icon="shield" size={20} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold font-sans">Enterprise Security</h3>
                </div>
                <p className="text-foreground-500 text-sm">
                  Enterprise-level encryption, secure file sharing, and compliance-ready security features for sensitive
                  creative work.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-foreground-100 rounded-full p-2">
                    <Icon icon="folder" size={20} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold font-sans">Smart File Organization</h3>
                </div>
                <p className="text-foreground-500 text-sm">
                  Organize files by project, status, type, and more. Powerful filtering and search help you find what
                  you need instantly.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-foreground-100 rounded-full p-2">
                    <Icon icon="link" size={20} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold font-sans">Version History</h3>
                </div>
                <p className="text-foreground-500 text-sm">
                  Track all changes with comprehensive version history. Never lose your work and easily revert to
                  previous versions.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-foreground-100 rounded-full p-2">
                    <Icon icon="upload" size={20} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold font-sans">Heavy Media Support</h3>
                </div>
                <p className="text-foreground-500 text-sm">
                  Upload and share large video files, images, and creative assets. No more WeTransfer or cloud storage
                  juggling.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-foreground-100 rounded-full p-2">
                    <Icon icon="eyeCrossed" size={20} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold font-sans">Access Controls</h3>
                </div>
                <p className="text-foreground-500 text-sm">
                  Set granular permissions for team members, controlling who can view, comment, approve, or download
                  files.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-foreground-100 rounded-full p-2">
                    <Icon icon="folder" size={20} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold font-sans">Reliable Storage</h3>
                </div>
                <p className="text-foreground-500 text-sm">
                  Dependable media storage infrastructure designed for creative production workflows. Your assets are safe
                  and accessible.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-foreground-50 lg:py-24 py-16 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center flex flex-col gap-6 relative z-10">
          <h2 className="text-2xl sm:text-4xl font-bold font-sans">Ready to Secure Your Creative Assets?</h2>
          <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
            Experience enterprise-grade secure asset storage designed for creative production teams. Start using Kreatli
            today.
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

