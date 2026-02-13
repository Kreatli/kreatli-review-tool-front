import { Accordion, AccordionItem, Button, Card, CardBody } from '@heroui/react';
import Head from 'next/head';
import NextLink from 'next/link';

import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';
import { ProjectFeaturePreview } from '../../components/home/Features/ProjectFeaturePreview';
import { FooterSection } from '../../components/home/Footer/FooterSection';
import { PricingSection } from '../../components/home/PricingSection/PricingSection';
import { Header } from '../../components/layout/Header';
import { Decorations } from '../../components/layout/Storyblok/Decorations';
import { BreadcrumbStructuredData } from '../../components/shared/BreadcrumbStructuredData';
import { CTASection } from '../../components/shared/CTASection';
import { FAQStructuredData } from '../../components/shared/FAQStructuredData';
import { MoreFreeToolsSection } from '../../components/shared/MoreFreeToolsSection';
import { MANAGE_VIDEOS_STEPS, PlatformStepGuide } from '../../components/shared/PlatformStepGuide';
import { RelatedResourcesSection } from '../../components/shared/RelatedResourcesSection';
import { ResourcesArticlesPreviewSection } from '../../components/shared/ResourcesArticlesPreviewSection';
import { Icon } from '../../components/various/Icon';
import { getPlatformArticles } from '../../data/platform-articles';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';

const faqs = [
  {
    question: 'What does it mean to manage videos in Kreatli?',
    answer:
      'Managing videos in Kreatli means organizing, storing, versioning, and tracking all your video assets in one place. You can upload videos, organize them into projects, track versions, collect feedback, and manage approvals—all without switching between multiple tools. This gives your team a single source of truth for every video in production.',
  },
  {
    question: 'How do I organize videos in Kreatli?',
    answer:
      'Upload videos to Kreatli projects and organize them with folders, tags, or project structure. Each video shows version history, feedback status, and approval state. You can search, filter, and browse videos across projects to find what you need quickly.',
  },
  {
    question: 'Can I manage multiple video versions in Kreatli?',
    answer:
      'Yes. Kreatli has built-in version control for videos. Upload new versions to the same asset and switch between them from a dropdown. Compare versions side by side, track feedback per version, and see who approved which cut. No more file naming conventions or lost versions.',
  },
  {
    question: 'How does Kreatli help manage video feedback?',
    answer:
      'All feedback on a video is stored in one thread with the asset. Comments are pinned to exact frames, tracked as resolved or unresolved, and visible across versions. You can filter by reviewer, jump to any comment, and see what still needs attention—no digging through email or chat.',
  },
  {
    question: 'Can clients access videos without signing up?',
    answer:
      'Yes. Generate secure review links for any video and share them with clients. They can watch, comment, and approve without creating an account. You control access and can revoke links anytime.',
  },
  {
    question: 'How do I track video approvals in Kreatli?',
    answer:
      'Each video shows its approval status—pending, approved, or changes requested. See who approved which version and when. Resolution tracking keeps feedback organized so you know what is done and what is pending before final delivery.',
  },
  {
    question: 'Why manage videos in Kreatli instead of file storage or email?',
    answer:
      'File storage tools like Dropbox or Google Drive do not track versions, feedback, or approvals. Email threads get lost and lack context. Kreatli gives you version control, frame-accurate feedback, approval tracking, and client-friendly review links in one place—designed for video production workflows.',
  },
  {
    question: 'How does managing videos in Kreatli help video teams?',
    answer:
      'Managing videos in Kreatli reduces tool-switching, keeps feedback organized, and speeds up approvals. Teams spend less time searching for files, clarifying feedback, or tracking versions manually. Everything lives in one project with a clear timeline from first upload to final approval.',
  },
];

export default function ManageVideosPage() {
  useSession();
  const articles = getPlatformArticles('/platform/manage-videos');

  return (
    <>
      <Head>
        <title>Manage Videos | Kreatli</title>
        <meta
          name="description"
          content="Manage videos with secure storage, project management, and team collaboration. Organize, assign, track, and deliver video projects in one workspace."
        />
        <link rel="canonical" href="https://kreatli.com/platform/manage-videos" />
        <meta property="og:url" content="https://kreatli.com/platform/manage-videos" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Manage Videos | Kreatli" />
        <meta
          property="og:description"
          content="Manage videos with secure storage, project management, and team collaboration. Organize and deliver video projects in one workspace."
        />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:secure_url" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:alt" content="Manage Videos | Kreatli" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Manage Videos | Kreatli" />
        <meta
          name="twitter:description"
          content="Manage videos with secure storage, project management, and team collaboration. Organize and deliver video projects in one workspace."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
      </Head>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Platform', url: '/platform' },
          { name: 'Manage Videos', url: '/platform/manage-videos' },
        ]}
      />
      <FAQStructuredData faqs={faqs} />
      <Header />
      <Decorations />

      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 pt-16 pb-8">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h1 className="mx-auto max-w-lg font-sans text-3xl font-bold leading-tight sm:text-4xl sm:leading-tight">
              Manage Videos
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground-500">
              Organize, store, and track all your video assets in one secure workspace. Assign files, manage
              deliverables, and share heavy media with your team and clients.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button as={NextLink} href="/sign-up" size="lg" className="bg-foreground text-content1">
                Get Started for Free
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
          </div>
        </div>
      </section>

      {/* Project Management Section */}
      <section className="relative overflow-hidden px-6 pb-16">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">
              Project Management Meets Reliable Media Storage
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Assign files, track deliverables, and share heavy media securely in one workspace.
            </p>
          </div>
          <ProjectFeaturePreview />
        </div>
      </section>

      <PlatformStepGuide
        stepsSectionTitle="How to manage videos in Kreatli"
        stepsIntro="Follow these steps to store, organize, and track your video assets and deliverables in one secure workspace."
        steps={MANAGE_VIDEOS_STEPS}
        completeGuide={{
          href: '/guides/kreatli-for-video-production-companies',
          description:
            'Learn how video production companies manage projects, collaborate with clients, and streamline approvals in Kreatli.',
        }}
      />

      {/* Management Features Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">How Video Management Works</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Store, organize, and track all your video assets in one secure workspace with built-in project management.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="upload" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Secure Media Storage</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Upload videos of any size to secure cloud storage. No file size limits, no compression—your media is
                  stored reliably and accessible from anywhere.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="folder" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Folders & Organization</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Structure your video library with folders, subfolders, and tags. Keep raw footage, edits, and exports
                  organized so your team can find assets fast.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="group" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Assign & Track Tasks</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Assign videos to team members, set due dates, and track progress. Everyone sees their tasks in one
                  dashboard—no more status meetings or lost handoffs.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="share" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Secure Sharing</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Share videos and entire projects with secure links. Control access, set expirations, and revoke links
                  anytime. Clients view without signing up.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="time" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Version History</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Upload new versions to the same asset. Switch between versions, compare side by side, and never lose
                  previous cuts—version history is automatic.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="shield" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Access Control</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Control who can view, edit, or download each video. Set permissions at the project or file level and
                  audit who accessed what and when.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mx-auto w-fit max-w-full rounded-2xl border border-foreground-200 bg-content1/60 px-6 py-8 shadow-sm backdrop-blur-sm">
            <h2 className="text-center font-sans text-lg font-semibold text-foreground-700">Related video features</h2>
            <p className="mx-auto mt-2 max-w-xl text-center text-sm text-foreground-500">
              Review videos, track versions, or compare cuts. Explore these options:
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button
                as={NextLink}
                href="/platform/review-video"
                size="md"
                className="bg-foreground font-medium text-content1 hover:opacity-90"
                endContent={<Icon icon="arrowRight" size={16} />}
              >
                Review Video
              </Button>
              <Button
                as={NextLink}
                href="/platform/video-versioning"
                size="md"
                className="bg-foreground font-medium text-content1 hover:opacity-90"
                endContent={<Icon icon="arrowRight" size={16} />}
              >
                Video Versioning
              </Button>
              <Button
                as={NextLink}
                href="/platform/compare-videos"
                size="md"
                className="bg-foreground font-medium text-content1 hover:opacity-90"
                endContent={<Icon icon="arrowRight" size={16} />}
              >
                Compare Videos
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Why Manage Videos in Kreatli</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Combine reliable media storage with project management so your team can organize, track, and deliver video
              projects without switching tools.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="folder" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Storage + Project Management</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Stop juggling Dropbox for files, Asana for tasks, and email for updates. Kreatli combines secure media
                  storage with project tracking in one workspace.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="upload" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">No File Size Limits</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Upload 4K, 8K, and uncompressed video files without worrying about size limits or compression. Your
                  media is stored at full quality and streams instantly.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="group" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Team Visibility</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  See who is working on what, track deliverable status, and know what is pending or approved. Everyone
                  on the team has visibility into project progress.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="shield" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Enterprise-Grade Security</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Your videos are encrypted at rest and in transit. Control access at the project or file level, audit
                  who accessed what, and revoke links instantly.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Free Tools Section */}
      <MoreFreeToolsSection
        title="Free Tools for Video Teams"
        description="Explore our collection of free tools designed to help video professionals work more efficiently."
        useBannerResizerInsteadOfCostCalculator
      />

      {/* See How This Works Section */}
      <ResourcesArticlesPreviewSection
        articles={articles}
        title="See How This Works in Practice"
        description="Explore guides and comparisons that show how teams manage video projects and approvals in Kreatli."
      />

      <PricingSection />

      {/* FAQ Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Get detailed answers about managing videos and video workflows in Kreatli.
            </p>
          </div>
          <Accordion variant="splitted" className="gap-2">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.question}
                title={<span className="text-base font-semibold sm:text-lg">{faq.question}</span>}
                className="py-2"
              >
                <div className="text-sm leading-relaxed text-foreground-500 sm:text-base">{faq.answer}</div>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="mx-auto mt-12 flex max-w-3xl flex-col items-center gap-4 text-center">
            <h3 className="font-sans text-xl font-bold">Still Have Questions?</h3>
            <p className="text-foreground-500">
              If you did not find the answer you were looking for, contact our support team at{' '}
              <a href="mailto:support@kreatli.com" className="font-medium text-primary underline underline-offset-2">
                support@kreatli.com
              </a>{' '}
              to learn how Kreatli can help you manage videos and streamline your production workflow.
            </p>
          </div>
        </div>
      </section>

      {/* More Resources Section */}
      <RelatedResourcesSection
        resources={getRelatedResources(['reviewApproval', 'creativeProofing', 'videoAnnotation', 'secureAssetStorage'])}
        title="More Resources"
        description="Explore other Kreatli platform features to streamline your video management and collaboration workflow."
      />

      {/* CTA Section */}
      <CTASection
        title="Ready to Manage Videos with Your Team?"
        description="Combine reliable media storage with project management. Organize, track, and deliver video projects in one secure workspace."
      />
      <FooterSection hideCta={true} />
      <SignUpModal />
    </>
  );
}
