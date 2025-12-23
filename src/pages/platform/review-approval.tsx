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
      <section className="relative py-16 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center flex flex-col gap-6 relative z-10">
          <h1 className="text-2xl sm:text-4xl font-bold font-sans max-w-lg mx-auto">Frame-Accurate Media Review</h1>
          <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
            Pin comments to exact frames and timestamps. Compare versions side-by-side and share files securely.
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

      {/* Frame-Accurate Revisions Section */}
      <section className="relative py-16 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-4xl font-bold font-sans mb-4">Frame-Accurate Revisions</h2>
            <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
              Pin comments to exact frames and timestamps—no more "which clip?" or lost feedback.
            </p>
          </div>
          <ReviewToolPreview />
        </div>
      </section>

      {/* Compare Versions Section */}
      <section className="relative py-16 px-6 backdrop-blur-lg overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-4xl font-bold font-sans mb-4">Compare Versions Side-by-Side</h2>
            <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
              Compare different versions side-by-side for creative proofing—spot changes instantly.
            </p>
          </div>
          <CompareFeaturePreview />
        </div>
      </section>

      {/* Share Files Section */}
      <section className="relative py-16 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-4xl font-bold font-sans mb-4">Share Files with Anyone</h2>
            <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
              Generate secure shareable links or send files via email—no account required for reviewers.
            </p>
          </div>
          <ShareFeaturePreview />
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative py-16 px-6 backdrop-blur-lg overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-4xl font-bold font-sans mb-4">Complete Review & Approval Workflow</h2>
            <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
              Everything you need for professional media review and approval workflows in one platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-foreground-100 rounded-full p-2">
                    <Icon icon="paint" size={20} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold font-sans">Frame-Accurate Comments</h3>
                </div>
                <p className="text-foreground-500 text-sm">
                  Pin comments to exact frames in videos or specific areas in images. Eliminate "which clip?" confusion
                  forever.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-foreground-100 rounded-full p-2">
                    <Icon icon="compare" size={20} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold font-sans">Version Comparison</h3>
                </div>
                <p className="text-foreground-500 text-sm">
                  Compare different versions side-by-side to spot changes instantly and provide precise feedback.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-foreground-100 rounded-full p-2">
                    <Icon icon="link" size={20} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold font-sans">No-Signup Guest Links</h3>
                </div>
                <p className="text-foreground-500 text-sm">
                  Share review links with clients and collaborators instantly. They can review and comment without
                  creating accounts.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-foreground-100 rounded-full p-2">
                    <Icon icon="share" size={20} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold font-sans">Secure File Sharing</h3>
                </div>
                <p className="text-foreground-500 text-sm">
                  Generate password-protected links, set expiration dates, and control access with enterprise-grade security.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-foreground-100 rounded-full p-2">
                    <Icon icon="checkCircle" size={20} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold font-sans">Approval Workflows</h3>
                </div>
                <p className="text-foreground-500 text-sm">
                  Track approval status for each asset, see who approved what, and maintain complete history.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-foreground-100 rounded-full p-2">
                    <Icon icon="bell" size={20} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold font-sans">Real-Time Notifications</h3>
                </div>
                <p className="text-foreground-500 text-sm">
                  Get instant alerts for new comments, approval requests, and feedback. Stay in sync.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-foreground-50 lg:py-24 py-16 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center flex flex-col gap-6 relative z-10">
          <h2 className="text-2xl sm:text-4xl font-bold font-sans">Ready to Streamline Your Review Process?</h2>
          <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
            Experience frame-accurate review and approval workflows designed for creative production teams.
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
