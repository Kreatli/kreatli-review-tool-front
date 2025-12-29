import Head from 'next/head';
import React from 'react';

import { Header } from '../../components/layout/Header';
import { FooterSection } from '../../components/home/Footer/FooterSection';
import { useSession } from '../../hooks/useSession';
import { Decorations } from '../../components/layout/Storyblok/Decorations';
import { Card, CardBody, Button } from '@heroui/react';
import NextLink from 'next/link';
import { Icon } from '../../components/various/Icon';
import { ReviewToolPreview } from '../../components/home/Features/ReviewToolPreview';
import { CompareFeaturePreview } from '../../components/home/Features/CompareFeaturePreview';
import { ShareFeaturePreview } from '../../components/home/Features/ShareFeaturePreview';
import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';

export default function ReviewApprovalPage() {
  useSession();

  return (
    <>
      <Head>
        <title>Kreatli | Review & Approval – Frame-Accurate Media Review Platform</title>
        <meta
          name="description"
          content="Kreatli's Review & Approval features provide frame-accurate revisions, side-by-side version comparison, and secure file sharing for media review and approval workflows. Perfect for creative production teams."
        />
        <meta property="og:title" content="Kreatli | Review & Approval – Frame-Accurate Media Review Platform" />
        <meta
          property="og:description"
          content="Streamline your media review and approval workflow with frame-accurate comments, version comparison, and secure file sharing. Built for creative production teams."
        />
      </Head>
      <Header />
      <Decorations />
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 text-center">
          <h1 className="mx-auto max-w-lg font-sans text-2xl font-bold sm:text-4xl">Frame-Accurate Media Review</h1>
          <p className="mx-auto max-w-2xl text-lg text-foreground-500">
            Pin comments to exact frames and timestamps. Compare versions side-by-side and share files securely.
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

      {/* Frame-Accurate Revisions Section */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-4xl">Frame-Accurate Revisions</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Pin comments to exact frames and timestamps—no more "which clip?" or lost feedback.
            </p>
          </div>
          <ReviewToolPreview />
        </div>
      </section>

      {/* Compare Versions Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-4xl">Compare Versions Side-by-Side</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Compare different versions side-by-side for creative proofing—spot changes instantly.
            </p>
          </div>
          <CompareFeaturePreview />
        </div>
      </section>

      {/* Share Files Section */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-4xl">Share Files with Anyone</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Generate secure shareable links or send files via email—no account required for reviewers.
            </p>
          </div>
          <ShareFeaturePreview />
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-4xl">Complete Review & Approval Workflow</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Everything you need for professional media review and approval workflows in one platform.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="paint" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Frame-Accurate Comments</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Pin comments to exact frames in videos or specific areas in images. Eliminate "which clip?" confusion
                  forever.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="compare" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Version Comparison</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Compare different versions side-by-side to spot changes instantly and provide precise feedback.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="link" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">No-Signup Guest Links</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Share review links with clients and collaborators instantly. They can review and comment without
                  creating accounts.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="share" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Secure File Sharing</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Generate password-protected links, set expiration dates, and control access with enterprise-grade
                  security.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="checkCircle" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Approval Workflows</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Track approval status for each asset, see who approved what, and maintain complete history.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="bell" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Real-Time Notifications</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Get instant alerts for new comments, approval requests, and feedback. Stay in sync.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="overflow-hidden bg-foreground-50 px-6 py-16 lg:py-24">
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col gap-6 text-center">
          <h2 className="font-sans text-2xl font-bold sm:text-4xl">Ready to Streamline Your Review Process?</h2>
          <p className="mx-auto max-w-2xl text-lg text-foreground-500">
            Experience frame-accurate review and approval workflows designed for creative production teams.
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
