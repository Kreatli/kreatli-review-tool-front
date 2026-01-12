import { Accordion, AccordionItem, Button, Card, CardBody } from '@heroui/react';
import Head from 'next/head';
import NextLink from 'next/link';

import { SignUpModal } from '../components/auth/SignUpForm/SignUpModal';
import { DataTransferCalculator } from '../components/data-transfer-calculator/DataTransferCalculator';
import { FooterSection } from '../components/home/Footer/FooterSection';
import { Header } from '../components/layout/Header';
import { Decorations } from '../components/layout/Storyblok/Decorations';
import { Icon } from '../components/various/Icon';
import { useSession } from '../hooks/useSession';

export default function DataTransferCalculatorPage() {
  useSession();

  return (
    <>
      <Head>
        <title>Data Transfer Calculator (Upload & Download Time) | Kreatli</title>
        <meta
          name="description"
          content="Calculate how long it takes to upload or download large files. Free data transfer calculator for video, media, and creative teams."
        />
        <meta property="og:title" content="Data Transfer Calculator (Upload & Download Time) | Kreatli" />
        <meta
          property="og:description"
          content="Calculate how long it takes to upload or download large files. Free data transfer calculator for video, media, and creative teams."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Data Transfer Calculator (Upload & Download Time) | Kreatli" />
        <meta
          name="twitter:description"
          content="Calculate how long it takes to upload or download large files. Free data transfer calculator for video, media, and creative teams."
        />
        <link rel="canonical" href="https://kreatli.com/data-transfer-calculator" />
      </Head>
      <Header />
      <Decorations />

      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 text-center">
          <h1 className="mx-auto mb-4 max-w-2xl font-sans text-2xl font-bold sm:text-4xl">Data Transfer Calculator</h1>
          <p className="mx-auto max-w-2xl text-lg text-foreground-500">
            Calculate how long it takes to upload or download large files. Perfect for video editors, post-production
            teams, and creative professionals working with heavy media files.
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="relative overflow-hidden px-6 py-8">
        <div className="relative z-10 mx-auto max-w-6xl">
          <DataTransferCalculator />
        </div>
      </section>

      {/* CTA Section - Below Calculator */}
      <section className="relative overflow-hidden px-6 py-12">
        <div className="relative z-10 mx-auto max-w-4xl">
          <Card className="border-foreground-300 bg-foreground-50 dark:border">
            <CardBody className="flex flex-col gap-4 p-6 sm:p-8">
              <p className="text-center text-base text-foreground-600 sm:text-lg">
                Large files shouldn't slow down approvals, reviews, or collaboration. Kreatli is a production management
                platform designed for creative teams working with heavy media.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button as={NextLink} href="/sign-up" size="lg" className="bg-foreground text-content1">
                  Manage Media Better with Kreatli
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
            </CardBody>
          </Card>
        </div>
      </section>

      {/* How Data Transfer Time Is Calculated Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-4xl">How Data Transfer Time Is Calculated</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Understanding the math behind file transfer calculations helps you plan better for your creative
              workflows.
            </p>
          </div>

          <div className="space-y-6 text-foreground-600">
            <div>
              <h3 className="mb-2 font-sans text-lg font-semibold">Mbps vs MB/s: Understanding the Difference</h3>
              <p>
                Internet speeds are typically measured in <strong>Mbps</strong> (megabits per second), while file sizes
                are measured in <strong>MB</strong> (megabytes) or <strong>GB</strong> (gigabytes). There's an important
                distinction: 1 byte = 8 bits, so 1 MB/s = 8 Mbps. This means a 100 Mbps connection can transfer
                approximately 12.5 MB per second (100 ÷ 8 = 12.5).
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-sans text-lg font-semibold">Network Overhead and Efficiency</h3>
              <p>
                Real-world transfer speeds are slower than theoretical maximums due to network overhead. Protocol
                headers, TCP/IP overhead, and network congestion reduce efficiency. Our calculator accounts for
                approximately <strong>85% efficiency</strong>, which is a realistic estimate for most internet
                connections. This means if your connection is rated at 100 Mbps, you'll effectively get about 85 Mbps of
                usable throughput for file transfers.
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-sans text-lg font-semibold">Common Creative Scenarios</h3>
              <ul className="ml-6 list-disc space-y-2">
                <li>
                  <strong>10GB Social Video Export:</strong> A typical export for Instagram Reels or TikTok might take
                  15-20 minutes on a 100 Mbps connection.
                </li>
                <li>
                  <strong>50GB YouTube Project:</strong> A full project with source files and exports could take 1-2
                  hours depending on your upload speed.
                </li>
                <li>
                  <strong>100GB Commercial Shoot:</strong> Raw footage from a commercial production might require 2-4
                  hours to upload, impacting same-day delivery timelines.
                </li>
                <li>
                  <strong>1TB Production Archive:</strong> Large archives can take 20+ hours to transfer, making cloud
                  backups a multi-day process.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Large Media Files Slow Down Creative Workflows Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-4xl">
              Why Large Media Files Slow Down Creative Workflows
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Understanding the real-world impact of file transfer times on creative production.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="time" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Approval Delays</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  When clients wait hours for files to upload before they can review, approval cycles stretch from days
                  to weeks. A 2-hour upload delay can push a same-day approval request into the next business day.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="group" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Remote Collaboration Bottlenecks</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Distributed teams can't collaborate effectively when file transfers take hours. Editors wait for
                  footage, designers wait for assets, and project timelines slip as files slowly make their way between
                  team members.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="suitcase" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Version Control Challenges</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Multiple revision rounds mean multiple uploads. If each round takes 2-3 hours, a project with 5
                  revision cycles loses 10-15 hours just to file transfers, not counting actual work time.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="dollar" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Deadline Pressure</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Tight deadlines become impossible when file transfers consume hours. Teams working on tight
                  turnarounds need reliable, fast file management to meet client expectations and avoid costly rush fees
                  or missed deadlines.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-4xl">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Common questions about data transfer times, internet speeds, and file management for creative teams.
            </p>
          </div>

          <Accordion variant="splitted">
            <AccordionItem
              key="upload-100gb"
              title={<span className="text-base font-semibold">How long does it take to upload 100GB?</span>}
            >
              <div className="space-y-3 text-foreground-500">
                <p>
                  Upload time for 100GB depends on your internet connection speed. On a typical 100 Mbps connection,
                  uploading 100GB takes approximately <strong>2 hours and 50 minutes</strong>, accounting for network
                  overhead. On a faster 1 Gbps connection, the same file would take about <strong>17 minutes</strong>.
                </p>
                <p>
                  However, most home and office connections have slower upload speeds than download speeds. If your
                  upload speed is 50 Mbps (common for many broadband plans), uploading 100GB would take approximately{' '}
                  <strong>5 hours and 40 minutes</strong>. This is why understanding your actual upload speed is crucial
                  for planning file transfers.
                </p>
                <p>
                  For video production teams working with large files regularly, faster upload speeds or dedicated file
                  transfer solutions can significantly reduce wait times and improve workflow efficiency.
                </p>
              </div>
            </AccordionItem>

            <AccordionItem
              key="internet-speed-video"
              title={<span className="text-base font-semibold">What internet speed do I need for video work?</span>}
            >
              <div className="space-y-3 text-foreground-500">
                <p>
                  For professional video work, especially with remote collaboration, you'll want at least{' '}
                  <strong>100 Mbps upload speed</strong> for efficient workflows. This allows you to upload a 10GB file
                  in about 17 minutes, which is reasonable for most production timelines.
                </p>
                <p>
                  For teams working with larger files (50GB+ projects) or requiring faster turnarounds,{' '}
                  <strong>500 Mbps to 1 Gbps upload speeds</strong> are recommended. These speeds enable same-day
                  delivery of large projects and support real-time collaboration without significant transfer delays.
                </p>
                <p>
                  Keep in mind that download speeds are typically faster than upload speeds on most internet plans. For
                  video review and approval workflows, both upload and download speeds matter - you need fast uploads to
                  send files to clients and fast downloads to receive feedback and revisions quickly.
                </p>
              </div>
            </AccordionItem>

            <AccordionItem
              key="upload-slower-download"
              title={<span className="text-base font-semibold">Why is my upload slower than my download?</span>}
            >
              <div className="space-y-3 text-foreground-500">
                <p>
                  Most internet service providers offer <strong>asymmetric connections</strong>, where download speeds
                  are significantly faster than upload speeds. This is because typical internet usage (browsing,
                  streaming, downloading) requires more download bandwidth than upload bandwidth.
                </p>
                <p>
                  For example, a common broadband plan might offer 500 Mbps download but only 50 Mbps upload - a 10:1
                  ratio. This asymmetry works fine for most users but creates challenges for creative professionals who
                  regularly upload large video files, project archives, and media assets.
                </p>
                <p>
                  If you're working with large files frequently, consider upgrading to a plan with faster upload speeds
                  or a symmetric connection (equal upload and download speeds). Business-grade internet plans often
                  offer better upload speeds, which can dramatically improve your workflow efficiency when transferring
                  large media files.
                </p>
              </div>
            </AccordionItem>

            <AccordionItem
              key="calculator-free"
              title={<span className="text-base font-semibold">Is this data transfer calculator free?</span>}
            >
              <div className="space-y-3 text-foreground-500">
                <p>
                  Yes, this data transfer calculator is completely <strong>free to use</strong>. There's no sign-up
                  required, no account needed, and no hidden fees. You can use it as often as you need to calculate
                  transfer times for any file size and internet speed combination.
                </p>
                <p>
                  The calculator runs entirely in your browser - no data is sent to our servers, and all calculations
                  happen locally on your device. This ensures your privacy and makes the tool fast and responsive.
                </p>
                <p>
                  We created this tool to help creative teams better understand file transfer times and plan their
                  workflows accordingly. If you find it useful, consider checking out{' '}
                  <NextLink href="/sign-up" className="text-primary underline underline-offset-2">
                    Kreatli
                  </NextLink>
                  , our production management platform designed for teams working with large media files.
                </p>
              </div>
            </AccordionItem>
          </Accordion>

          <div className="mx-auto mt-8 flex max-w-3xl flex-col items-center gap-4 text-center">
            <h3 className="font-sans text-xl font-bold">Still Have Questions About File Transfers?</h3>
            <p className="text-foreground-500">
              If you didn't find the answer you were looking for, feel free to contact our support team at{' '}
              <a href="mailto:support@kreatli.com" className="text-primary underline underline-offset-2">
                support@kreatli.com
              </a>{' '}
              for personalized recommendations for your workflow.
            </p>
          </div>
        </div>
      </section>

      {/* Internal Links Section */}
      <section className="relative overflow-hidden px-6 py-12 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-6 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-4xl">More Free Tools for Creative Teams</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Explore our other free tools designed to help creative professionals work more efficiently.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card isPressable as={NextLink} href="/cost-calculator" className="h-full">
              <CardBody className="p-6">
                <h3 className="mb-2 font-sans text-lg font-semibold">Software Cost Calculator</h3>
                <p className="text-sm text-foreground-500">
                  Calculate how much you're spending on multiple creative tools and see how much you could save by
                  consolidating with Kreatli.
                </p>
              </CardBody>
            </Card>

            <Card isPressable as={NextLink} href="/social-media-safe-zone-checker" className="h-full">
              <CardBody className="p-6">
                <h3 className="mb-2 font-sans text-lg font-semibold">Social Media Safe Zone Checker</h3>
                <p className="text-sm text-foreground-500">
                  Preview where UI overlays appear on your Instagram Reels, TikTok videos, and YouTube Shorts to ensure
                  your content stays visible.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="overflow-hidden bg-foreground-50 px-6 py-16 lg:py-24">
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col gap-3 text-center">
          <h2 className="mx-auto max-w-xl font-sans text-2xl font-bold sm:text-4xl">
            Ready to Streamline Your Media Workflows?
          </h2>
          <p className="mx-auto max-w-xl text-lg text-foreground-500">
            Kreatli helps creative teams manage large files, streamline approvals, and collaborate more efficiently. Get
            started today.
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

      <FooterSection hideCta />
      <SignUpModal />
    </>
  );
}
