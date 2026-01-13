import { Card, CardBody } from '@heroui/react';
import NextLink from 'next/link';

import { Icon } from '../various/Icon';

export default function InfoSection() {
  return (
    <>
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
                usable throughput for file transfers. For teams dealing with these challenges regularly,{' '}
                <NextLink href="/platform/secure-asset-storage" className="text-primary underline underline-offset-2">
                  secure asset storage solutions
                </NextLink>{' '}
                can help optimize your file transfer workflows.
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-sans text-lg font-semibold">Common Creative Scenarios</h3>
              <ul className="ml-6 list-disc space-y-2">
                <li>
                  <strong>10GB Social Video Export:</strong> A typical export for Instagram Reels or TikTok might take
                  15-20 minutes on a 100 Mbps connection. Use our{' '}
                  <NextLink href="/social-media-safe-zone-checker" className="text-primary underline underline-offset-2">
                    Social Media Safe Zone Checker
                  </NextLink>{' '}
                  to ensure your content stays visible.
                </li>
                <li>
                  <strong>50GB YouTube Project:</strong> A full project with source files and exports could take 1-2
                  hours depending on your upload speed. Learn how{' '}
                  <NextLink href="/solutions/industry/video-production-animation-studios" className="text-primary underline underline-offset-2">
                    video production teams
                  </NextLink>{' '}
                  manage these workflows.
                </li>
                <li>
                  <strong>100GB Commercial Shoot:</strong> Raw footage from a commercial production might require 2-4
                  hours to upload, impacting same-day delivery timelines. Explore{' '}
                  <NextLink href="/solutions/use-case/client-approvals" className="text-primary underline underline-offset-2">
                    client approval solutions
                  </NextLink>{' '}
                  to streamline this process.
                </li>
                <li>
                  <strong>1TB Production Archive:</strong> Large archives can take 20+ hours to transfer, making cloud
                  backups a multi-day process. Consider{' '}
                  <NextLink href="/platform/secure-asset-storage" className="text-primary underline underline-offset-2">
                    secure asset storage solutions
                  </NextLink>{' '}
                  designed for large media files.
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
                  to weeks. A 2-hour upload delay can push a same-day approval request into the next business day.{' '}
                  <NextLink href="/solutions/use-case/client-approvals" className="text-primary underline underline-offset-2">
                    Streamline client approvals
                  </NextLink>{' '}
                  with faster file sharing and review workflows.
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
                  team members. Learn how{' '}
                  <NextLink href="/platform/creative-workspace" className="text-primary underline underline-offset-2">
                    creative workspace solutions
                  </NextLink>{' '}
                  can improve remote collaboration.
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
                  revision cycles loses 10-15 hours just to file transfers, not counting actual work time.{' '}
                  <NextLink href="/platform/project-orchestration" className="text-primary underline underline-offset-2">
                    Project orchestration tools
                  </NextLink>{' '}
                  help manage version control and reduce redundant transfers.
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
                  or missed deadlines. Explore{' '}
                  <NextLink href="/solutions/use-case/creative-production-management" className="text-primary underline underline-offset-2">
                    creative production management solutions
                  </NextLink>{' '}
                  designed for fast-paced workflows.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Internal Links Section */}
      <section className="relative overflow-hidden px-6 py-12 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-6 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-4xl">More Free Tools for Creative Teams</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Explore our other free tools designed to help creative professionals work more efficiently. Visit our{' '}
              <NextLink href="/free-tools" className="text-primary underline underline-offset-2">
                complete free tools directory
              </NextLink>{' '}
              for more resources.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card isPressable as={NextLink} href="/free-tools/cost-calculator" className="h-full transition-transform hover:scale-[1.02]">
              <CardBody className="p-6">
                <h3 className="mb-2 font-sans text-lg font-semibold">Software Cost Calculator</h3>
                <p className="text-sm text-foreground-500">
                  Calculate how much you're spending on multiple creative tools and see how much you could save by
                  consolidating with Kreatli.
                </p>
              </CardBody>
            </Card>

            <Card isPressable as={NextLink} href="/social-media-safe-zone-checker" className="h-full transition-transform hover:scale-[1.02]">
              <CardBody className="p-6">
                <h3 className="mb-2 font-sans text-lg font-semibold">Social Media Safe Zone Checker</h3>
                <p className="text-sm text-foreground-500">
                  Preview where UI overlays appear on your Instagram Reels, TikTok videos, and YouTube Shorts to ensure
                  your content stays visible.
                </p>
              </CardBody>
            </Card>

            <Card isPressable as={NextLink} href="/free-tools/youtube-banner-resizer" className="h-full transition-transform hover:scale-[1.02]">
              <CardBody className="p-6">
                <h3 className="mb-2 font-sans text-lg font-semibold">YouTube Banner Resizer</h3>
                <p className="text-sm text-foreground-500">
                  Resize your YouTube banner online for free. Preview safe areas for mobile, desktop, and TV. Export perfectly sized channel art.
                </p>
              </CardBody>
            </Card>

            <Card isPressable as={NextLink} href="/free-tools" className="h-full transition-transform hover:scale-[1.02]">
              <CardBody className="p-6">
                <h3 className="mb-2 font-sans text-lg font-semibold">View All Free Tools</h3>
                <p className="text-sm text-foreground-500">
                  Discover all of Kreatli's free tools designed to help creative professionals work more efficiently and save time.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
