import { Button, Card, CardBody, Image } from '@heroui/react';
import NextLink from 'next/link';

import { Icon, IconType } from '../various/Icon';

export default function InfoSection() {
  const workflowSteps = [
    {
      step: 1,
      title: 'Enter Your File Size',
      description:
        'In the File Size field, input the total size of the assets you want to transfer. You can enter file size in GB (gigabytes), MB (megabytes), or TB (terabytes) depending on your needs. This might represent a single large video or a combined batch of production assets.',
      icon: 'file',
      image: '/data-transfer-guide/enter-file-size.png',
      altText:
        'Data transfer calculator showing file size input field for calculating upload and download times for large files',
    },
    {
      step: 2,
      title: 'Select the File Size Unit',
      description:
        'Choose the appropriate unit: MB, GB, or TB. Using the correct unit ensures accurate estimates for your file transfer calculations.',
      icon: 'list',
      image: '/data-transfer-guide/select-unit.png',
      altText:
        'Data transfer calculator file size unit selector showing MB, GB, and TB options for accurate transfer time calculations',
    },
    {
      step: 3,
      title: 'Enter Your Transfer Speed',
      description:
        'Input your upload or download speed, typically measured in Mbps. This is especially important for uploads, which are often much slower than downloads.',
      icon: 'upload',
      image: '/data-transfer-guide/enter-speed.png',
      altText:
        'Data transfer calculator showing internet speed input field in Mbps for calculating file upload and download duration',
    },
    {
      step: 4,
      title: 'Review the Result',
      description:
        'You instantly see the estimated transfer duration, expressed in hours, minutes, or seconds. This allows you to schedule uploads intelligently, set realistic delivery expectations, and avoid deadline surprises.',
      icon: 'checkCircle',
      image: null, // No screenshot needed for this step
    },
  ];

  return (
    <>
      {/* How to Use Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <h2 className="mx-auto mb-3 max-w-xl text-center font-sans text-2xl font-bold sm:text-4xl">
              How to Use the Free Data Transfer Calculator
            </h2>
            <p className="mx-auto max-w-2xl text-base text-foreground-500">
              Follow this step-by-step process to estimate upload and download times for large files accurately.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {workflowSteps.map((item) => (
              <Card key={item.step} className="scroll-mt-36">
                <CardBody className="p-6 lg:p-8">
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                      <div className="flex items-start gap-4 lg:w-80 lg:shrink-0">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <Icon icon={item.icon as IconType} size={24} className="text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="mb-1.5 text-sm font-medium text-primary">Step {item.step}</div>
                          <h3 className="font-sans text-xl font-bold leading-tight">{item.title}</h3>
                        </div>
                      </div>
                      <div className="flex-1 border-foreground-200 lg:border-l lg:pl-8">
                        <p className="text-base leading-relaxed text-foreground-500">{item.description}</p>
                      </div>
                    </div>
                    {item.image && (
                      <div className="mt-6 flex justify-center lg:mt-8">
                        <div className="relative max-w-full">
                          <Image
                            src={item.image}
                            alt={item.altText || `${item.title} - Data transfer calculator tool screenshot`}
                            loading="lazy"
                            removeWrapper
                            className="h-auto w-full rounded-lg border border-foreground-200 shadow-lg"
                          />
                        </div>
                      </div>
                    )}
                    {item.step === 4 && (
                      <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Button as={NextLink} href="/sign-up" size="lg" className="bg-foreground text-content1">
                          Start for Free
                        </Button>
                        <Button
                          as="a"
                          href="https://calendar.app.google/NXbAeTAUwaBGh5x49"
                          target="_blank"
                          rel="noopener noreferrer"
                          size="lg"
                          variant="bordered"
                        >
                          Book a Demo
                        </Button>
                      </div>
                    )}
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
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

          <div className="space-y-6 text-base">
            <div>
              <h3 className="mb-3 font-sans text-xl font-semibold">Mbps vs MB/s: Understanding the Difference</h3>
              <p className="text-foreground-500">
                Internet speeds are typically measured in <strong>Mbps</strong> (megabits per second), while file sizes
                are measured in <strong>MB</strong> (megabytes) or <strong>GB</strong> (gigabytes). There's an important
                distinction: 1 byte = 8 bits, so 1 MB/s = 8 Mbps. This means a 100 Mbps connection can transfer
                approximately 12.5 MB per second (100 ÷ 8 = 12.5). Understanding this difference is crucial for
                accurately calculating file transfer times and planning your creative workflows.
              </p>
            </div>

            <div>
              <h3 className="mb-3 font-sans text-xl font-semibold">Network Overhead and Efficiency</h3>
              <p className="text-foreground-500">
                Real-world transfer speeds are slower than theoretical maximums due to network overhead. Protocol
                headers, TCP/IP overhead, and network congestion reduce efficiency. Our calculator accounts for
                approximately <strong>85% efficiency</strong>, which is a realistic estimate for most internet
                connections. This means if your connection is rated at 100 Mbps, you'll effectively get about 85 Mbps of
                usable throughput for file transfers.
              </p>
            </div>

            <div>
              <h3 className="mb-3 font-sans text-xl font-semibold">Common Creative Scenarios</h3>
              <ul className="ml-6 list-disc space-y-3 text-foreground-500">
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
                  <div className="rounded-full bg-foreground-100 p-2" aria-label="Time icon">
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
                  <div className="rounded-full bg-foreground-100 p-2" aria-label="Group collaboration icon">
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
                  <div className="rounded-full bg-foreground-100 p-2" aria-label="Version control icon">
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
                  <div className="rounded-full bg-foreground-100 p-2" aria-label="Deadline pressure icon">
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
    </>
  );
}
