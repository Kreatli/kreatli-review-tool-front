import { Accordion, AccordionItem, Button, Card, CardBody } from '@heroui/react';
import { ISbStoryData } from '@storyblok/react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';
import React from 'react';

import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';
import { FooterSection } from '../../components/home/Footer/FooterSection';
import { Header } from '../../components/layout/Header';
import { Decorations } from '../../components/layout/Storyblok/Decorations';
import { ArticlesSection } from '../../components/shared/ArticlesSection';
import { CTASection } from '../../components/shared/CTASection';
import { MoreFreeToolsSection } from '../../components/shared/MoreFreeToolsSection';
import { RelatedResourcesSection } from '../../components/shared/RelatedResourcesSection';
import { Icon } from '../../components/various/Icon';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';
import { getStoryblokApi } from '../../lib/storyblok';
import { PageStoryblok } from '../../typings/storyblok';

const DRAFT_REVALIDATE_TIME = 60;
const PUBLISHED_REVALIDATE_TIME = 3600;

interface Props {
  articles?: ISbStoryData<PageStoryblok>[];
}

const faqs = [
  {
    question: 'How do I connect Google Drive to Kreatli?',
    answer:
      'To connect Google Drive, go to your Kreatli account settings and navigate to the Integrations section. Click "Connect Google Drive" and authorize Kreatli to access your Google Drive. Once connected, you can import files directly from Google Drive into your Kreatli projects. All imported files will benefit from Kreatli\'s video collaboration features, including frame-accurate review, approval workflows, and asset-linked conversations.',
  },
  {
    question: 'How do I connect Dropbox to Kreatli?',
    answer:
      'To connect Dropbox, go to your Kreatli account settings and navigate to the Integrations section. Click "Connect Dropbox" and authorize Kreatli to access your Dropbox. Once connected, you can import files directly from Dropbox into your Kreatli projects. All imported files will have access to Kreatli\'s specialized video collaboration features while remaining accessible in your Dropbox.',
  },
  {
    question: 'Do I need to migrate my files from Google Drive or Dropbox?',
    answer:
      'No, you don\'t need to migrate your files. Kreatli integrates with Google Drive and Dropbox, allowing you to import files directly from your existing cloud storage. You can continue using your preferred cloud storage while leveraging Kreatli\'s features for video collaboration, review, and approval. Files can remain in your cloud storage and be accessed through Kreatli when needed.',
  },
  {
    question: 'What happens to files imported from cloud storage?',
    answer:
      'When you import files from Google Drive or Dropbox into Kreatli, the files remain in your original cloud storage. Kreatli creates references to these files, allowing you to use Kreatli\'s video collaboration features (frame-accurate review, approvals, conversations) while the files stay in your cloud storage. You can access and manage these files through Kreatli\'s interface, and they\'ll also remain accessible in your Google Drive or Dropbox.',
  },
  {
    question: 'Can I use Kreatli without connecting cloud storage?',
    answer:
      'Yes. Kreatli provides its own secure storage that\'s optimized for video collaboration workflows. You can upload files directly to Kreatli without connecting any cloud storage services. Kreatli\'s native storage includes features like version history, asset-linked conversations, and approval workflows that work seamlessly with the platform\'s other capabilities. You can choose to use Kreatli\'s storage, integrate with cloud storage, or use both.',
  },
  {
    question: 'Are there any file size limitations when importing from cloud storage?',
    answer:
      'Kreatli supports large file imports from Google Drive and Dropbox, just like direct uploads. You can import large video files (4K, 8K, 15GB+ files) from your cloud storage without size limitations. The platform handles heavy video files seamlessly, making it easy to work with large video assets regardless of whether they\'re uploaded directly or imported from cloud storage.',
  },
  {
    question: 'Can I disconnect cloud storage integrations?',
    answer:
      'Yes. You can disconnect Google Drive or Dropbox integrations at any time through your Kreatli account settings. Disconnecting an integration will remove the connection, but files that were already imported will remain accessible in Kreatli. You can reconnect integrations later if needed. This gives you flexibility to manage your integrations based on your workflow needs.',
  },
  {
    question: 'Do cloud storage integrations sync files automatically?',
    answer:
      'Kreatli integrations allow you to import files from Google Drive and Dropbox when needed. Files are imported on-demand rather than automatically syncing. This gives you control over which files are brought into Kreatli projects and when. You can import specific files or folders as needed for your video collaboration workflows.',
  },
  {
    question: 'Can I request integrations with other cloud storage services?',
    answer:
      'Yes. If you need integrations with other cloud storage services beyond Google Drive and Dropbox, you can request a custom integration. Contact our team through the "Request Custom Integration" option, and we can discuss building a custom integration tailored to your workflow needs. Custom integrations help ensure Kreatli works seamlessly with your existing tools and processes.',
  },
  {
    question: 'Will my cloud storage files be secure when integrated with Kreatli?',
    answer:
      'Yes. Kreatli maintains enterprise-grade security standards for all integrations. When you connect Google Drive or Dropbox, Kreatli uses secure OAuth authentication and only accesses the files you explicitly import. Your cloud storage credentials are never stored by Kreatli, and all file access follows the same security protocols as direct uploads. Files remain encrypted and secure throughout the integration process.',
  },
];

export default function IntegrationsPage({ articles = [] }: Props) {
  useSession();

  return (
    <>
      <Head>
        <title>Kreatli | Integrations – Google Drive & Dropbox for Video Collaboration</title>
        <meta
          name="description"
          content="Kreatli integrates with Google Drive and Dropbox, allowing you to connect your existing cloud storage and import files directly. Seamless integration for video collaboration workflows."
        />
        <link rel="canonical" href="https://kreatli.com/platform/integrations" />
        <meta property="og:url" content="https://kreatli.com/platform/integrations" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Kreatli | Integrations – Google Drive & Dropbox for Video Collaboration" />
        <meta
          property="og:description"
          content="Connect Google Drive and Dropbox to Kreatli. Import files directly from your cloud storage while using Kreatli's specialized video collaboration features."
        />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:secure_url" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:alt" content="Kreatli | Integrations – Google Drive & Dropbox for Video Collaboration" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kreatli | Integrations – Google Drive & Dropbox for Video Collaboration" />
        <meta
          name="twitter:description"
          content="Connect Google Drive and Dropbox to Kreatli. Import files directly from your cloud storage while using Kreatli's specialized video collaboration features."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
      </Head>
      <Header />
      <Decorations />
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 text-center">
          <h1 className="mx-auto max-w-lg font-sans text-3xl font-bold sm:text-4xl">
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
              rel="noopener noreferrer"
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
            <h2 className="mb-4 font-sans text-3xl font-bold sm:text-4xl">Available Integrations</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Connect your existing cloud storage and continue using your preferred tools while benefiting from
              Kreatli's features.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Google Drive Integration */}
            <Card className="group h-full border border-foreground-200 bg-content1 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-xl hover:shadow-primary/20">
              <CardBody className="p-8">
                <div className="mb-6 flex items-center gap-4">
                  <div className="rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 p-4 transition-all duration-300 group-hover:scale-110 group-hover:from-primary/30 group-hover:to-primary/20">
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
                    <h3 className="font-sans text-lg font-semibold transition-colors duration-200 group-hover:text-primary">
                      Google Drive
                    </h3>
                    <p className="text-foreground-500">Cloud storage integration</p>
                  </div>
                </div>
                <p className="mb-6 leading-relaxed text-foreground-500">
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
            <Card className="group h-full border border-foreground-200 bg-content1 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-xl hover:shadow-primary/20">
              <CardBody className="p-8">
                <div className="mb-6 flex items-center gap-4">
                  <div className="rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 p-4 transition-all duration-300 group-hover:scale-110 group-hover:from-primary/30 group-hover:to-primary/20">
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
                    <h3 className="font-sans text-lg font-semibold transition-colors duration-200 group-hover:text-primary">
                      Dropbox
                    </h3>
                    <p className="text-foreground-500">Cloud storage integration</p>
                  </div>
                </div>
                <p className="mb-6 leading-relaxed text-foreground-500">
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
                  <h3 className="font-sans text-lg font-semibold">Need a Custom Integration?</h3>
                </div>
                <p className="mx-auto mb-6 max-w-2xl text-foreground-500">
                  Don't see your preferred cloud storage? We can build a custom integration tailored to your workflow.
                </p>
                <Button
                  as="a"
                  href="https://calendar.app.google/NXbAeTAUwaBGh5x49"
                  target="_blank"
                  rel="noopener noreferrer"
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
            <h2 className="mb-4 font-sans text-3xl font-bold sm:text-4xl">Why Integrate Cloud Storage</h2>
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
                  video collaboration.
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

      {/* Free Tools Section */}
      <MoreFreeToolsSection
        title="Free Tools & Resources"
        description="Access our free calculators and tools to optimize your creative workflow."
      />

      {/* See How It Works Section */}
      <ArticlesSection
        articles={articles}
        title="See How This Works in Practice"
        description="Explore real-world workflows and guides that demonstrate these features in action."
        viewAllHref="/guides"
        viewAllButtonText="View All Guides"
      />

      {/* FAQ Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-3xl font-bold sm:text-4xl">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Get detailed answers about Kreatli's cloud storage integrations and how they work with your video
              collaboration workflow.
            </p>
          </div>
          <Accordion variant="splitted" className="gap-2">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={`faq-${index}-${faq.question.slice(0, 20)}`}
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
              to learn how Kreatli's integrations can help your specific workflow.
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
        title="Ready to Connect Your Cloud Storage?"
        description="Integrate Google Drive or Dropbox with Kreatli and experience seamless video collaboration."
      />
      <FooterSection hideCta={true} />
      <SignUpModal />
    </>
  );
}

export const getStaticProps = (async () => {
  try {
    // Fetch articles from guides, comparisons, and blog
    const [guidesData, comparisonsData, blogData] = await Promise.all([
      getStoryblokApi().getStories({
        starts_with: 'guides/',
        excluding_fields: 'body',
        version: (process.env.STORYBLOK_STATUS ?? 'published') as 'draft' | 'published',
        sort_by: 'content.publishDate:desc',
        per_page: 10,
      }),
      getStoryblokApi().getStories({
        starts_with: 'comparisons/',
        excluding_fields: 'body',
        version: (process.env.STORYBLOK_STATUS ?? 'published') as 'draft' | 'published',
        sort_by: 'content.publishDate:desc',
        per_page: 10,
      }),
      getStoryblokApi().getStories({
        starts_with: 'blog/',
        excluding_fields: 'body',
        version: (process.env.STORYBLOK_STATUS ?? 'published') as 'draft' | 'published',
        sort_by: 'content.publishDate:desc',
        per_page: 10,
      }),
    ]);

    // Combine all articles and sort by publish date
    const allArticles = [
      ...(guidesData?.data?.stories || []),
      ...(comparisonsData?.data?.stories || []),
      ...(blogData?.data?.stories || []),
    ].sort((a, b) => {
      const dateA = a.content.publishDate ? new Date(a.content.publishDate).getTime() : 0;
      const dateB = b.content.publishDate ? new Date(b.content.publishDate).getTime() : 0;
      return dateB - dateA;
    });

    // Take the 3 most recent articles
    const articles = allArticles.slice(0, 3) as ISbStoryData<PageStoryblok>[];

    return {
      props: {
        articles: articles || [],
      },
      revalidate: process.env.STORYBLOK_STATUS === 'draft' ? DRAFT_REVALIDATE_TIME : PUBLISHED_REVALIDATE_TIME,
    };
  } catch {
    return {
      props: {
        articles: [],
      },
      revalidate: PUBLISHED_REVALIDATE_TIME,
    };
  }
}) satisfies GetStaticProps<Props>;
