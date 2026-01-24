/* eslint-disable max-len */
import { Accordion, AccordionItem } from '@heroui/react';
import NextLink from 'next/link';

export default function FAQSection() {
  return (
    <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
          <p className="mx-auto max-w-2xl text-lg text-foreground-500">
            Common questions about data transfer times, internet speeds, and file management for creative teams.
          </p>
        </div>

        <Accordion variant="splitted">
          <AccordionItem
            key="upload-100gb"
            title={<span className="text-base font-semibold">How long does it take to upload 100GB?</span>}
          >
            <div className="space-y-3 text-base text-foreground-500">
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
            <div className="space-y-3 text-base text-foreground-500">
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
            <div className="space-y-3 text-base text-foreground-500">
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
            <div className="space-y-3 text-base text-foreground-500">
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
                workflows accordingly.
              </p>
            </div>
          </AccordionItem>

          <AccordionItem
            key="calculate-transfer-time"
            title={<span className="text-base font-semibold">How do I calculate file transfer time?</span>}
          >
            <div className="space-y-3 text-base text-foreground-500">
              <p>
                To calculate file transfer time, you need to know the file size and your internet connection speed. The
                formula accounts for the difference between bits (used for internet speeds) and bytes (used for file
                sizes): <strong>1 byte = 8 bits</strong>. So 1 MB/s = 8 Mbps.
              </p>
              <p>
                Real-world transfer speeds are slower than theoretical maximums due to network overhead (protocol
                headers, TCP/IP overhead, network congestion). Our calculator accounts for approximately{' '}
                <strong>85% efficiency</strong>, which is a realistic estimate for most internet connections.
              </p>
              <p>
                For example, if you have a 100 Mbps connection and want to upload a 10GB file: 10GB = 10,240 MB. At 100
                Mbps (12.5 MB/s with 85% efficiency ≈ 10.6 MB/s), the transfer would take approximately 16-17 minutes.
                Use our calculator above to get precise estimates for your specific file sizes and connection speeds.
              </p>
            </div>
          </AccordionItem>

          <AccordionItem
            key="mbps-vs-mbs"
            title={<span className="text-base font-semibold">What is the difference between Mbps and MB/s?</span>}
          >
            <div className="space-y-3 text-base text-foreground-500">
              <p>
                Internet speeds are typically measured in <strong>Mbps</strong> (megabits per second), while file sizes
                are measured in <strong>MB</strong> (megabytes) or <strong>GB</strong> (gigabytes). There is an important
                distinction: <strong>1 byte = 8 bits</strong>, so <strong>1 MB/s = 8 Mbps</strong>.
              </p>
              <p>
                This means a 100 Mbps connection can transfer approximately 12.5 MB per second (100 ÷ 8 = 12.5). A 1 Gbps
                (1000 Mbps) connection can transfer approximately 125 MB per second. Understanding this difference is
                crucial for accurately calculating file transfer times.
              </p>
              <p>
                Many people confuse these units, which leads to incorrect time estimates. When using our calculator,
                make sure you're entering your internet speed in Mbps (as shown on your internet plan) and your file
                size in MB or GB (as shown in your file manager). The calculator automatically handles the conversion.
              </p>
            </div>
          </AccordionItem>

          <AccordionItem
            key="upload-10gb-video"
            title={<span className="text-base font-semibold">How long does it take to upload a 10GB video file?</span>}
          >
            <div className="space-y-3 text-base text-foreground-500">
              <p>
                Upload time for a 10GB video file depends on your upload speed. On a <strong>100 Mbps connection</strong>
                , uploading 10GB takes approximately <strong>17 minutes</strong>, accounting for network overhead. On
                a <strong>50 Mbps connection</strong> (common for many broadband plans), it would take about{' '}
                <strong>34 minutes</strong>.
              </p>
              <p>
                On a faster <strong>1 Gbps connection</strong>, the same 10GB file would take about{' '}
                <strong>1.7 minutes</strong>. This is why understanding your actual upload speed is crucial for planning
                file transfers in video production workflows.
              </p>
              <p>
                For video production teams working with multiple files or larger projects, these transfer times can
                add up quickly. Consider using optimized file transfer solutions or{' '}
                <NextLink href="/platform/secure-asset-storage" className="text-primary underline underline-offset-2">
                  professional asset management platforms
                </NextLink>{' '}
                designed to handle large media files efficiently.
              </p>
            </div>
          </AccordionItem>

          <AccordionItem
            key="multiple-files"
            title={<span className="text-base font-semibold">Can I use this calculator for multiple files?</span>}
          >
            <div className="space-y-3 text-base text-foreground-500">
              <p>
                Yes, our data transfer calculator supports <strong>multiple files</strong>. You can add multiple files
                of different sizes and calculate the total transfer time for all files combined.
              </p>
              <p>
                This is useful for video production teams who need to transfer entire project folders, multiple video
                exports, or batches of media assets. The calculator will show you the total file size and estimated
                transfer time for all files together.
              </p>
              <p>
                For example, if you need to upload three files: a 5GB video, a 2GB audio file, and a 1GB project file,
                the calculator will show the total (8GB) and calculate the transfer time for the combined size. This
                helps you plan batch uploads and understand total transfer times for complex projects.
              </p>
            </div>
          </AccordionItem>
        </Accordion>

        <div className="mx-auto mt-8 flex max-w-3xl flex-col items-center gap-4 text-center">
          <h3 className="font-sans text-xl font-bold">Still Have Questions About File Transfers?</h3>
          <p className="text-base text-foreground-500">
            If you didn't find the answer you were looking for, feel free to contact our support team at{' '}
            <a
              href="mailto:support@kreatli.com"
              className="text-primary underline underline-offset-2"
              aria-label="Contact support via email at support@kreatli.com"
            >
              support@kreatli.com
            </a>{' '}
            for personalized recommendations for your workflow.
          </p>
        </div>
      </div>
    </section>
  );
}
