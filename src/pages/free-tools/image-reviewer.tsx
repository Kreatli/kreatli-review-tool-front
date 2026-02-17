/* eslint-disable max-len */
import Head from 'next/head';

import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';
import { FooterSection } from '../../components/home/Footer/FooterSection';
import { Header } from '../../components/layout/Header';
import { Decorations } from '../../components/layout/Storyblok/Decorations';
import { BreadcrumbStructuredData } from '../../components/shared/BreadcrumbStructuredData';
import { CTASection } from '../../components/shared/CTASection';
import { FAQStructuredData } from '../../components/shared/FAQStructuredData';
import { InteractiveReviewToolPreview } from '../../components/shared/InteractiveReviewToolPreview';
import { MoreFreeToolsSection } from '../../components/shared/MoreFreeToolsSection';
import { RelatedResourcesSection } from '../../components/shared/RelatedResourcesSection';
import { ImageReviewerFAQ, imageReviewerFaqs } from '../../components/image-reviewer/ImageReviewerFAQ';
import { ImageReviewerGuide } from '../../components/image-reviewer/ImageReviewerGuide';
import { getRelatedResources } from '../../data/related-resources';
import { useSession } from '../../hooks/useSession';

export default function ImageReviewerPage() {
  useSession();

  return (
    <>
      <Head>
        <title>Image Reviewer - Free Online Tool | Kreatli</title>
        <meta
          name="description"
          content="Free online image reviewer for creative teams. Review images with location-pinned comments, annotations, and approvals. Share with clients—no sign-up required."
        />
        <meta
          name="keywords"
          content="image reviewer, online image review, image review tool, review image online, image approval software, image collaboration, comment on image, annotate image"
        />
        <meta property="og:title" content="Image Reviewer - Free Online Tool | Kreatli" />
        <meta
          property="og:description"
          content="Free online image reviewer for creative teams. Review images with location-pinned comments, annotations, and approvals. Share with clients—no sign-up required."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kreatli.com/free-tools/image-reviewer" />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Image Reviewer - Free Online Tool | Kreatli" />
        <meta
          name="twitter:description"
          content="Free online image reviewer for creative teams. Review images with location-pinned comments, annotations, and approvals. Share with clients—no sign-up required."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
        <link rel="canonical" href="https://kreatli.com/free-tools/image-reviewer" />
      </Head>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Free Tools', url: '/free-tools' },
          { name: 'Image Reviewer', url: '/free-tools/image-reviewer' },
        ]}
      />
      <FAQStructuredData faqs={imageReviewerFaqs} />
      <Header />
      <Decorations />

      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        Skip to main content
      </a>

      <main id="main-content">
        {/* Hero */}
        <section className="relative overflow-hidden px-6 pb-4 pt-16">
          <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 text-center">
            <h1 className="mx-auto max-w-lg font-sans text-3xl font-bold sm:text-4xl">Image Reviewer</h1>
            <p className="mx-auto max-w-3xl text-lg text-foreground-500">
              Review images online with location-pinned comments, visual annotations, and approval workflows. Collect
              feedback from your team and clients in one place—no software installation required.
            </p>
          </div>
        </section>

        {/* Interactive Tool Preview */}
        <section className="relative overflow-hidden px-6 pb-12">
          <div className="relative z-10 mx-auto max-w-6xl">
            <InteractiveReviewToolPreview variant="image" />
          </div>
        </section>

        <ImageReviewerGuide />

        {/* Related tools */}
        <MoreFreeToolsSection excludeHref="/free-tools/image-reviewer" title="More Tools for Video Teams" />

        <ImageReviewerFAQ />

        {/* Related resources */}
        <RelatedResourcesSection
          resources={getRelatedResources(['annotateImage', 'drawOnImage', 'reviewApproval', 'clientApprovals'])}
          title="More Resources"
          description="Learn more about image review workflows, annotations, and team collaboration."
        />

        {/* CTA Section */}
        <CTASection
          title="Ready to streamline image reviews?"
          description="Kreatli is a Video Collaboration & Review Platform for creative teams. Review images, collect location-pinned feedback, manage approvals, and deliver projects faster."
          primaryButtonText="Start for Free"
        />
      </main>

      <FooterSection hideCta />
      <SignUpModal />
    </>
  );
};
