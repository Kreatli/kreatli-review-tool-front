import { Button, Card, CardBody } from '@heroui/react';
import Head from 'next/head';
import NextLink from 'next/link';

import { SignUpModal } from '../../components/auth/SignUpForm/SignUpModal';
import { FooterSection } from '../../components/home/Footer/FooterSection';
import { Header } from '../../components/layout/Header';
import { Decorations } from '../../components/layout/Storyblok/Decorations';
import { SafeZoneScreen } from '../../components/safe-zone-checker/SafeZoneScreen/SafeZoneScreen';
import { SafeZoneScreenGuide } from '../../components/safe-zone-checker/SafeZoneScreenGuide';
import { Icon } from '../../components/various/Icon';
import { useSession } from '../../hooks/useSession';

export default function YouTubeSafeZoneCheckerPage() {
  useSession();

  return (
    <>
      <Head>
        <title>YouTube Shorts Safe Zone Checker - Free Tool to Preview UI Overlays | Kreatli</title>
        <meta
          name="description"
          content="Test your YouTube Shorts video layout before publishing. Our free safe zone checker shows exactly where YouTube's UI overlays appear - channel name, subscribe button, like button, comments, share button, and video controls. Perfect your Shorts content and ensure text, logos, and key visuals stay visible. No more hidden content or blocked elements in your YouTube Shorts videos."
        />
        <meta
          property="og:title"
          content="YouTube Shorts Safe Zone Checker - Free Tool to Preview UI Overlays | Kreatli"
        />
        <meta
          property="og:description"
          content="Test your YouTube Shorts video layout before publishing. Our free safe zone checker shows exactly where YouTube's UI overlays appear - channel name, subscribe button, like button, comments, share button, and video controls. Perfect your Shorts content and ensure text, logos, and key visuals stay visible. No more hidden content or blocked elements in your YouTube Shorts videos."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="YouTube Shorts Safe Zone Checker - Free Tool to Preview UI Overlays | Kreatli"
        />
        <meta
          name="twitter:description"
          content="Test your YouTube Shorts video layout before publishing. Our free safe zone checker shows exactly where YouTube's UI overlays appear - channel name, subscribe button, like button, comments, share button, and video controls. Perfect your Shorts content and ensure text, logos, and key visuals stay visible. No more hidden content or blocked elements in your YouTube Shorts videos."
        />
        <link rel="canonical" href="https://kreatli.com/social-media-safe-zone-checker/youtube-safe-zone-checker" />
      </Head>
      <Header />
      <Decorations />
      <div className="p-6 pb-12">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col gap-4 pb-4 pt-8">
            <h1 className="text-center font-sans text-2xl font-bold sm:text-4xl">YouTube Shorts Safe Zone Checker</h1>
            <p className="mx-auto max-w-2xl text-center text-large text-foreground-500">
              Upload your YouTube Shorts video to preview where channel name, subscribe button, like button, comments,
              share button, and video controls appear.
            </p>
          </div>
          <SafeZoneScreen defaultPlatform="youtube" />
        </div>
      </div>
      <SafeZoneScreenGuide platform="youtube" />

      {/* Related Resources Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-4xl">Related Resources</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Learn more about creative production workflows, asset management, and team collaboration.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <NextLink href="/platform/review-approval" className="h-full group">
              <Card className="h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-lg border-foreground-200 hover:border-primary/20">
                <CardBody className="flex flex-col gap-4 p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 p-3 group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                      <Icon icon="paint" size={24} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-2 font-sans text-lg font-semibold group-hover:text-primary transition-colors duration-200">
                        Review & Approval
                      </h3>
                      <p className="text-sm leading-relaxed text-foreground-500">
                        Frame-accurate revisions and approvals for video content. Streamline your feedback workflow.
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="light"
                    size="sm"
                    className="mt-auto w-fit group-hover:bg-primary/10 transition-all duration-200"
                    endContent={
                      <Icon
                        icon="arrowRight"
                        size={16}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    }
                  >
                    Learn More
                  </Button>
                </CardBody>
              </Card>
            </NextLink>

            <NextLink href="/platform/creative-workspace" className="h-full group">
              <Card className="h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-lg border-foreground-200 hover:border-primary/20">
                <CardBody className="flex flex-col gap-4 p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 p-3 group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                      <Icon icon="folder" size={24} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-2 font-sans text-lg font-semibold group-hover:text-primary transition-colors duration-200">
                        Creative Workspace
                      </h3>
                      <p className="text-sm leading-relaxed text-foreground-500">
                        Unified workspace for creative production. Organize assets, manage projects, and collaborate with
                        your team.
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="light"
                    size="sm"
                    className="mt-auto w-fit group-hover:bg-primary/10 transition-all duration-200"
                    endContent={
                      <Icon
                        icon="arrowRight"
                        size={16}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    }
                  >
                    Learn More
                  </Button>
                </CardBody>
              </Card>
            </NextLink>

            <NextLink href="/blog" className="h-full group">
              <Card className="h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-lg border-foreground-200 hover:border-primary/20">
                <CardBody className="flex flex-col gap-4 p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 p-3 group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                      <Icon icon="file" size={24} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-2 font-sans text-lg font-semibold group-hover:text-primary transition-colors duration-200">
                        Kreatli Blog
                      </h3>
                      <p className="text-sm leading-relaxed text-foreground-500">
                        Insights, tips, and best practices for creative teams. Discover strategies to streamline your
                        workflow.
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="light"
                    size="sm"
                    className="mt-auto w-fit group-hover:bg-primary/10 transition-all duration-200"
                    endContent={
                      <Icon
                        icon="arrowRight"
                        size={16}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    }
                  >
                    Read Articles
                  </Button>
                </CardBody>
              </Card>
            </NextLink>
          </div>
        </div>
      </section>
      <FooterSection hideCta />
      <SignUpModal />
    </>
  );
}
