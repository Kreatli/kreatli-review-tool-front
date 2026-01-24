/* eslint-disable simple-import-sort/imports */
import { Accordion, AccordionItem, Button, Card, CardBody } from '@heroui/react';
import Head from 'next/head';
import NextLink from 'next/link';

import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';
import { ProjectFeaturePreview } from '../../components/home/Features/ProjectFeaturePreview';
import { StorageFeaturePreview } from '../../components/home/Features/StorageFeaturePreview';
import { FooterSection } from '../../components/home/Footer/FooterSection';
import { Header } from '../../components/layout/Header';
import { Decorations } from '../../components/layout/Storyblok/Decorations';
import { BreadcrumbStructuredData } from '../../components/shared/BreadcrumbStructuredData';
import { CTASection } from '../../components/shared/CTASection';
import { FAQStructuredData } from '../../components/shared/FAQStructuredData';
import { MoreFreeToolsSection } from '../../components/shared/MoreFreeToolsSection';
import { RelatedResourcesSection } from '../../components/shared/RelatedResourcesSection';
import { ResourcesArticlesPreviewSection } from '../../components/shared/ResourcesArticlesPreviewSection';
import { Icon } from '../../components/various/Icon';
import { getPlatformArticles } from '../../data/platform-articles';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';

const faqs = [
  {
    question: "How secure is Kreatli's asset storage?",
    answer:
      'Kreatli provides enterprise-grade security for asset storage. All files are encrypted at rest and in transit using industry-standard encryption protocols. The platform includes secure file sharing with password protection, access controls, and expiration dates for shareable links. Enterprise-level security features ensure your video assets are protected from unauthorized access. Kreatli is designed to meet compliance requirements for handling sensitive video work, making it suitable for agencies and production studios working with confidential client materials.',
  },
  {
    question: 'What file sizes can I upload to Kreatli?',
    answer:
      'Kreatli supports large file uploads without size limitations. You can upload and share full-quality videos (4K, 8K, 15GB+ files), high-resolution images, and other large video assets. The platform handles heavy video files seamlessly, eliminating the need for WeTransfer, compressed previews, or external file sharing services. Real-time progress tracking shows upload status, and files are stored securely with no compression or quality loss. This makes Kreatli ideal for video production, animation, and other workflows requiring large file storage.',
  },
  {
    question: 'How does version history work in Kreatli?',
    answer:
      'Kreatli maintains comprehensive version history for all files. Every time you upload a new version of a file, the previous version is preserved. You can see the complete version history, compare versions side-by-side, and revert to any previous version if needed. Version history includes timestamps, user information, and file metadata. This ensures you never lose your work and can track changes over time. Version history is particularly valuable for video collaboration workflows where multiple iterations are common and you may need to reference or restore previous versions.',
  },
  {
    question: 'How do I organize files in Kreatli?',
    answer:
      'Kreatli provides smart file organization with multiple organizational methods. Files are organized within projects, and you can further organize them using folders, status tags (in production, pending review, approved), file types, and custom tags. Powerful filtering and search capabilities help you find files quickly. Unlike generic cloud storage, files in Kreatli are connected to conversations, approvals, and project context, making organization more meaningful for video collaboration workflows. You can organize by client, campaign, production type, or any structure that fits your workflow.',
  },
  {
    question: 'Can I control who has access to my files?',
    answer:
      'Yes. Kreatli provides granular access controls for file permissions. You can set permissions for team members, controlling who can view, comment, approve, or download files. Project-level permissions allow you to control access at the project level, while file-level permissions provide even more granular control. Shareable links can be password-protected and set with expiration dates. Access controls ensure that sensitive creative work is only accessible to authorized team members and clients, maintaining security while enabling collaboration.',
  },
  {
    question: 'How does Kreatli compare to Google Drive or Dropbox for creative asset storage?',
    answer:
      "Kreatli is built specifically for video collaboration workflows, while Google Drive and Dropbox are generic file storage solutions. Kreatli connects files to conversations, approvals, and project context—files aren't just stored, they're integrated into your video collaboration workflow. The platform includes frame-accurate video review, version comparison, and approval workflows that generic storage can't provide. Kreatli also offers better organization for video teams with project-based structure, status tracking, and asset-linked feedback. While you can integrate Google Drive and Dropbox with Kreatli, the platform provides a more specialized solution for video collaboration.",
  },
  {
    question: 'Is my data backed up in Kreatli?',
    answer:
      "Yes. Kreatli uses reliable storage infrastructure designed for video collaboration workflows. Files are stored with redundancy and backup systems to ensure your assets are safe. The platform is built on enterprise-grade infrastructure that provides high availability and data protection. Your video assets are stored securely with multiple layers of protection against data loss. This reliability is essential for video teams who can't afford to lose work or client deliverables.",
  },
  {
    question: 'Can I share large video files with clients through Kreatli?',
    answer:
      'Yes. Kreatli is designed for sharing large video files with clients. You can upload full-quality videos (no compression, no quality loss) and share them through secure, no-signup guest review links. Clients can review videos in their browser without downloading anything, and you can track who viewed what and when. This eliminates the need for WeTransfer, compressed previews, or external file sharing services. Large video files are handled seamlessly, making Kreatli ideal for video production, animation, and post-production workflows.',
  },
  {
    question: 'How does file encryption work in Kreatli?',
    answer:
      'Kreatli uses industry-standard encryption to protect your files. Files are encrypted at rest (when stored) and in transit (when uploaded or downloaded). This means your video assets are protected from unauthorized access at every stage. The encryption is enterprise-grade, meeting security standards required for handling sensitive video work. Even if someone were to gain access to the storage infrastructure, encrypted files would remain protected. This level of security is essential for agencies and production studios working with confidential client materials.',
  },
  {
    question: 'Can I integrate Kreatli with my existing cloud storage?',
    answer:
      "Yes. Kreatli integrates with Google Drive and Dropbox, allowing you to connect existing file storage and sync files between platforms. You can continue using your preferred cloud storage while leveraging Kreatli's specialized features for video collaboration, video review, and collaboration. However, Kreatli also provides its own secure storage that's optimized for video collaboration workflows, with features like version history, asset-linked conversations, and approval workflows that work seamlessly with the platform's other capabilities.",
  },
];

export default function SecureAssetStoragePage() {
  useSession();
  const articles = getPlatformArticles('/platform/secure-asset-storage');

  return (
    <>
      <Head>
        <title>Kreatli | Secure Asset Storage – Reliable Video Storage for Video Teams</title>
        <meta
          name="description"
          content="Kreatli provides secure, reliable video storage with enterprise-grade security, smart file organization, and version control for video teams. Protect your video assets."
        />
        <link rel="canonical" href="https://kreatli.com/platform/secure-asset-storage" />
        <meta property="og:url" content="https://kreatli.com/platform/secure-asset-storage" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Kreatli | Secure Asset Storage – Reliable Video Storage for Video Teams" />
        <meta
          property="og:description"
          content="Secure your video assets with enterprise-grade storage, smart file organization, and version control. Built for video teams."
        />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:secure_url" content="https://kreatli.com/og-image.png" />
        <meta
          property="og:image:alt"
          content="Kreatli | Secure Asset Storage – Reliable Video Storage for Video Teams"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kreatli | Secure Asset Storage – Reliable Video Storage for Video Teams" />
        <meta
          name="twitter:description"
          content="Secure your video assets with enterprise-grade storage, smart file organization, and version control. Built for video teams."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
      </Head>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Platform', url: '/platform' },
          { name: 'Secure Asset Storage', url: '/platform/secure-asset-storage' },
        ]}
      />
      <FAQStructuredData faqs={faqs} />
      <Header />
      <Decorations />
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 text-center">
          <h1 className="mx-auto max-w-lg font-sans text-3xl font-bold sm:text-4xl">
            Secure Asset Storage for Video Teams
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-foreground-500">
            Assign files, track deliverables, and share heavy video files securely with enterprise-grade security.
          </p>
          <div className="mt-4 flex flex-col items-center justify-center gap-4 sm:flex-row">
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
      </section>

      {/* Secure Storage Preview Section */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Secure File Upload and Encrypted Storage</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Upload large media files with real-time progress tracking. All files encrypted at rest with
              enterprise-grade security.
            </p>
          </div>
          <StorageFeaturePreview />
        </div>
      </section>

      {/* Project Management Preview Section */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">
              Project Management Meets Reliable Video Storage
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Organize files by project, assign team members, track status, and manage deliverables in one workspace.
            </p>
          </div>
          <ProjectFeaturePreview />
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Secure Asset Storage Features</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Enterprise-grade security and smart organization for your video assets.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="shield" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Enterprise Security</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Enterprise-level encryption, secure file sharing, and compliance-ready security for sensitive video
                  work.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="folder" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Smart File Organization</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Organize files by project, status, type, and more. Powerful filtering and search help you find what
                  you need.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="link" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Version History</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Track all changes with comprehensive version history. Never lose your work and easily revert to
                  previous versions.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="upload" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Heavy Media Support</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Upload and share large video files, images, and video assets. No more WeTransfer or cloud storage
                  juggling.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="eyeCrossed" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Access Controls</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Set granular permissions for team members, controlling who can view, comment, approve, or download
                  files.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="folder" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Reliable Storage</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Dependable video storage infrastructure designed for video collaboration workflows. Your assets are
                  safe.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Free Tools Section */}
      <MoreFreeToolsSection
        title="Free Tools & Resources"
        description="Access our free calculators and tools to optimize your creative workflow."
      />

      {/* See How It Works Section */}
      <ResourcesArticlesPreviewSection
        articles={articles}
        title="See How This Works in Practice"
        description="Explore real-world workflows and guides that demonstrate these features in action."
      />

      {/* FAQ Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Get detailed answers about Kreatli's secure asset storage and enterprise-grade video storage for video
              teams.
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
              If you didn't find the answer you were looking for, feel free to contact our support team at{' '}
              <a href="mailto:support@kreatli.com" className="font-medium text-primary underline underline-offset-2">
                support@kreatli.com
              </a>{' '}
              to learn how Kreatli's secure asset storage can help protect your video assets.
            </p>
          </div>
        </div>
      </section>

      {/* More Resources Section */}
      <RelatedResourcesSection
        resources={getRelatedResources(['projectOrchestration', 'creativeWorkspace', 'reviewApproval'])}
        title="More Resources"
        description="Explore other Kreatli platform features to streamline your video collaboration workflow."
      />

      {/* CTA Section */}
      <CTASection
        title="Ready to Secure Your Video Assets?"
        description="Experience enterprise-grade secure asset storage designed for video teams."
      />
      <FooterSection hideCta={true} />
      <SignUpModal />
    </>
  );
}
