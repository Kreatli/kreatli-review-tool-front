import { Accordion, AccordionItem } from '@heroui/react';
import NextLink from 'next/link';

export default function FAQSection() {
  return (
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
                transfer solutions can significantly reduce wait times and improve workflow efficiency. Learn more about{' '}
                <NextLink href="/platform/secure-asset-storage" className="text-primary underline underline-offset-2">
                  secure file storage and transfer solutions
                </NextLink>{' '}
                designed for creative teams.
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
                send files to clients and fast downloads to receive feedback and revisions quickly. Explore{' '}
                <NextLink href="/platform/review-approval" className="text-primary underline underline-offset-2">
                  review and approval workflows
                </NextLink>{' '}
                optimized for large media files.
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
                large media files. Additionally, using a{' '}
                <NextLink href="/platform/secure-asset-storage" className="text-primary underline underline-offset-2">
                  professional asset management platform
                </NextLink>{' '}
                can help optimize your file transfer processes.
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
                , our production management platform designed for teams working with large media files. Explore{' '}
                <NextLink href="/features" className="text-primary underline underline-offset-2">
                  all of Kreatli's features
                </NextLink>{' '}
                or read our{' '}
                <NextLink href="/blog" className="text-primary underline underline-offset-2">
                  blog articles
                </NextLink>{' '}
                for more tips on optimizing creative workflows.
              </p>
            </div>
          </AccordionItem>
        </Accordion>

        <div className="mx-auto mt-8 flex max-w-3xl flex-col items-center gap-4 text-center">
          <h3 className="font-sans text-xl font-bold">Still Have Questions About File Transfers?</h3>
          <p className="text-foreground-500">
            If you didn't find the answer you were looking for, feel free to contact our support team at{' '}
            <a
              href="mailto:support@kreatli.com"
              className="text-primary underline underline-offset-2"
              aria-label="Contact support via email at support@kreatli.com"
            >
              support@kreatli.com
            </a>{' '}
            for personalized recommendations for your workflow. You can also explore our{' '}
            <NextLink href="/help" className="text-primary underline underline-offset-2">
              help center
            </NextLink>{' '}
            or check out{' '}
            <NextLink href="/guides" className="text-primary underline underline-offset-2">
              helpful guides
            </NextLink>{' '}
            for creative teams.
          </p>
        </div>
      </div>
    </section>
  );
}
