import { Button, Card, CardBody } from '@heroui/react';
import Head from 'next/head';
import NextLink from 'next/link';
import React from 'react';

import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';
import { FooterSection } from '../../components/home/Footer/FooterSection';
import { Header } from '../../components/layout/Header';
import { Decorations } from '../../components/layout/Storyblok/Decorations';
import { Icon } from '../../components/various/Icon';
import { useSession } from '../../hooks/useSession';

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
        <link rel="canonical" href="https://kreatli.com/platform/integrations" />
        <meta property="og:url" content="https://kreatli.com/platform/integrations" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Kreatli | Integrations – Google Drive & Dropbox for Creative Production" />
        <meta
          property="og:description"
          content="Connect Google Drive and Dropbox to Kreatli. Import files directly from your cloud storage while using Kreatli's specialized creative production features."
        />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:secure_url" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:alt" content="Kreatli | Integrations – Google Drive & Dropbox for Creative Production" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kreatli | Integrations – Google Drive & Dropbox for Creative Production" />
        <meta
          name="twitter:description"
          content="Connect Google Drive and Dropbox to Kreatli. Import files directly from your cloud storage while using Kreatli's specialized creative production features."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
      </Head>
      <Header />
      <Decorations />
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 text-center">
          <h1 className="mx-auto max-w-lg font-sans text-2xl font-bold sm:text-4xl">
            Connect Your Existing Cloud Storage
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-foreground-500">
            Connect Google Drive and Dropbox to Kreatli. Import files directly from your cloud storage.
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

      {/* Integration Cards Section */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-4xl">Available Integrations</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Connect your existing cloud storage and continue using your preferred tools while benefiting from
              Kreatli's features.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Google Drive Integration */}
            <Card>
              <CardBody className="p-8">
                <div className="mb-6 flex items-center gap-4">
                  <div className="rounded-lg bg-foreground-100 p-4">
                    <img
                      src="/logos/google-drive.svg"
                      alt="Google Drive"
                      className="h-12 w-12"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="font-sans text-2xl font-bold">Google Drive</h3>
                    <p className="text-foreground-500">Cloud storage integration</p>
                  </div>
                </div>
                <p className="mb-6 text-foreground-500">
                  Import files directly from Google Drive to Kreatli. All files benefit from Kreatli's review and
                  collaboration features.
                </p>
                <ul className="mb-6 flex flex-col gap-3">
                  <li className="flex items-start gap-2">
                    <Icon icon="check" size={18} className="mt-0.5 flex-shrink-0 text-success" />
                    <span className="text-foreground-500">Import files directly from Google Drive</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="check" size={18} className="mt-0.5 flex-shrink-0 text-success" />
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
                <div className="mb-6 flex items-center gap-4">
                  <div className="rounded-lg bg-foreground-100 p-4">
                    <img
                      src="/logos/dropbox.svg"
                      alt="Dropbox"
                      className="h-12 w-12"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="font-sans text-2xl font-bold">Dropbox</h3>
                    <p className="text-foreground-500">Cloud storage integration</p>
                  </div>
                </div>
                <p className="mb-6 text-foreground-500">
                  Import files directly from Dropbox to Kreatli. All files benefit from Kreatli's review and
                  collaboration features.
                </p>
                <ul className="mb-6 flex flex-col gap-3">
                  <li className="flex items-start gap-2">
                    <Icon icon="check" size={18} className="mt-0.5 flex-shrink-0 text-success" />
                    <span className="text-foreground-500">Import files directly from Dropbox</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon icon="check" size={18} className="mt-0.5 flex-shrink-0 text-success" />
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
                <div className="mb-4 flex items-center justify-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-3">
                    <Icon icon="link" size={24} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-2xl font-bold">Need a Custom Integration?</h3>
                </div>
                <p className="mx-auto mb-6 max-w-2xl text-foreground-500">
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
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-4xl">Why Integrate Cloud Storage</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Kreatli works alongside your existing tools rather than requiring you to abandon your current workflow.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="link" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Seamless Workflow</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Continue using your preferred cloud storage while leveraging Kreatli's specialized features for
                  creative production.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="upload" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Flexible File Sources</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Upload files directly to Kreatli or import from cloud storage. All files benefit from Kreatli's
                  features.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="folder" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">No Migration Required</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  You don't have to abandon your existing file storage solutions. Use Kreatli's features while keeping
                  your current setup.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="overflow-hidden bg-foreground-50 px-6 py-16 lg:py-24">
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col gap-6 text-center">
          <h2 className="font-sans text-2xl font-bold sm:text-4xl">Ready to Connect Your Cloud Storage?</h2>
          <p className="mx-auto max-w-2xl text-lg text-foreground-500">
            Integrate Google Drive or Dropbox with Kreatli and experience seamless creative production management.
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
