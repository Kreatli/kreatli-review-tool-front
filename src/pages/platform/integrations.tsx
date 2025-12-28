import Head from 'next/head';
import React from 'react';

import { Header } from '../../components/layout/Header';
import { FooterSection } from '../../components/home/Footer/FooterSection';
import { useSession } from '../../hooks/useSession';
import { Decorations } from '../../components/layout/Storyblok/Decorations';
import { Card, CardBody, Button } from '@heroui/react';
import NextLink from 'next/link';
import { Icon } from '../../components/various/Icon';
import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';

export default function IntegrationsPage() {
  useSession();

  return (
    <>
      <Head>
        <title>Kreatli | Integrations – Google Drive & Dropbox for Creative Production</title>
        <meta
          name="description"
          content="Kreatli integrates with Google Drive and Dropbox, allowing you to connect your existing cloud storage and import files directly. Seamless integration for creative production workflows."
        />
        <meta property="og:title" content="Kreatli | Integrations – Google Drive & Dropbox for Creative Production" />
        <meta
          property="og:description"
          content="Connect Google Drive and Dropbox to Kreatli. Import files directly from your cloud storage while using Kreatli's specialized creative production features."
        />
      </Head>
      <Header />
      <Decorations />
      {/* Hero Section */}
      <section className="relative py-16 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center flex flex-col gap-6 relative z-10">
          <h1 className="text-2xl sm:text-4xl font-bold font-sans max-w-lg mx-auto">
            Connect Your Existing Cloud Storage
          </h1>
          <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
            Connect Google Drive and Dropbox to Kreatli. Import files directly from your cloud storage.
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

      {/* Integration Cards Section */}
      <section className="relative py-16 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-bold font-sans mb-4">Available Integrations</h2>
            <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
              Connect your existing cloud storage and continue using your preferred tools while benefiting from Kreatli's features.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Google Drive Integration */}
            <Card>
              <CardBody className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-foreground-100 rounded-lg p-4">
                    <img
                      src="/logos/google-drive.svg"
                      alt="Google Drive"
                      className="w-12 h-12"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-sans">Google Drive</h3>
                    <p className="text-foreground-500">Cloud storage integration</p>
                  </div>
                </div>
                <p className="text-foreground-500 mb-6">
                  Import files directly from Google Drive to Kreatli. All files benefit from Kreatli's review and collaboration features.
                </p>
                <ul className="flex flex-col gap-3 mb-6">
                  <li className="flex items-start gap-2">
                    <Icon icon="check" size={18} className="text-success mt-0.5 flex-shrink-0" />
                    <span className="text-foreground-500">Import files directly from Google Drive</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="check" size={18} className="text-success mt-0.5 flex-shrink-0" />
                    <span className="text-foreground-500">Access files within Kreatli projects</span>
                  </li>
                </ul>
                <Button as={NextLink} href="/sign-up" className="w-full bg-foreground text-content1">
                  Connect Google Drive
                </Button>
              </CardBody>
            </Card>

            {/* Dropbox Integration */}
            <Card>
              <CardBody className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-foreground-100 rounded-lg p-4">
                    <img
                      src="/logos/dropbox.svg"
                      alt="Dropbox"
                      className="w-12 h-12"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-sans">Dropbox</h3>
                    <p className="text-foreground-500">Cloud storage integration</p>
                  </div>
                </div>
                <p className="text-foreground-500 mb-6">
                  Import files directly from Dropbox to Kreatli. All files benefit from Kreatli's review and collaboration features.
                </p>
                <ul className="flex flex-col gap-3 mb-6">
                  <li className="flex items-start gap-2">
                    <Icon icon="check" size={18} className="text-success mt-0.5 flex-shrink-0" />
                    <span className="text-foreground-500">Import files directly from Dropbox</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="check" size={18} className="text-success mt-0.5 flex-shrink-0" />
                    <span className="text-foreground-500">Access files within Kreatli projects</span>
                  </li>
                </ul>
                <Button as={NextLink} href="/sign-up" className="w-full bg-foreground text-content1">
                  Connect Dropbox
                </Button>
              </CardBody>
            </Card>
          </div>

          {/* Custom Integration Section */}
          <div className="mt-12">
            <Card className="border-2 border-dashed">
              <CardBody className="p-8 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="bg-foreground-100 rounded-full p-3">
                    <Icon icon="link" size={24} className="text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold font-sans">Need a Custom Integration?</h3>
                </div>
                <p className="text-foreground-500 mb-6 max-w-2xl mx-auto">
                  Don't see your preferred cloud storage? We can build a custom integration tailored to your workflow.
                </p>
                <Button
                  as="a"
                  href="https://calendar.app.google/NXbAeTAUwaBGh5x49"
                  target="_blank"
                  size="lg"
                  variant="bordered"
                  className="mx-auto"
                >
                  Request Custom Integration
                </Button>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative py-16 px-6 backdrop-blur-lg overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-4xl font-bold font-sans mb-4">Why Integrate Cloud Storage</h2>
            <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
              Kreatli works alongside your existing tools rather than requiring you to abandon your current workflow.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-foreground-100 rounded-full p-2">
                    <Icon icon="link" size={20} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold font-sans">Seamless Workflow</h3>
                </div>
                <p className="text-foreground-500 text-sm">
                  Continue using your preferred cloud storage while leveraging Kreatli's specialized features for creative production.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-foreground-100 rounded-full p-2">
                    <Icon icon="upload" size={20} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold font-sans">Flexible File Sources</h3>
                </div>
                <p className="text-foreground-500 text-sm">
                  Upload files directly to Kreatli or import from cloud storage. All files benefit from Kreatli's features.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-foreground-100 rounded-full p-2">
                    <Icon icon="folder" size={20} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold font-sans">No Migration Required</h3>
                </div>
                <p className="text-foreground-500 text-sm">
                  You don't have to abandon your existing file storage solutions. Use Kreatli's features while keeping your current setup.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-foreground-50 lg:py-24 py-16 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center flex flex-col gap-6 relative z-10">
          <h2 className="text-2xl sm:text-4xl font-bold font-sans">Ready to Connect Your Cloud Storage?</h2>
          <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
            Integrate Google Drive or Dropbox with Kreatli and experience seamless creative production management.
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
