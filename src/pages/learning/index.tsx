import Head from 'next/head';
import React from 'react';

import { Header } from '../../components/layout/Header';
import { FooterSection } from '../../components/home/Footer/FooterSection';
import { useSession } from '../../hooks/useSession';
import { Decorations } from '../../components/layout/Storyblok/Decorations';
import { Card, CardBody, Button } from '@heroui/react';
import NextLink from 'next/link';
import { Icon } from '../../components/various/Icon';

export default function LearningPage() {
  useSession();

  return (
    <>
      <Head>
        <title>Kreatli | Learning – Guides, Tutorials & Resources</title>
        <meta
          name="description"
          content="Learn how to use Kreatli's creative production platform with guides, tutorials, and resources. Access the blog for latest articles and updates."
        />
        <meta property="og:title" content="Kreatli | Learning – Guides, Tutorials & Resources" />
        <meta
          property="og:description"
          content="Access learning resources, guides, tutorials, and blog articles to master Kreatli's creative production management platform."
        />
      </Head>
      <Header />
      <Decorations />
      {/* Hero Section */}
      <section className="relative py-16 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center flex flex-col gap-6 relative z-10">
          <h1 className="text-2xl sm:text-4xl font-bold font-sans max-w-lg mx-auto">Learning Resources</h1>
          <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
            Learn how to use Kreatli's creative production platform with guides, tutorials, and resources.
          </p>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="relative py-16 px-6 backdrop-blur-lg overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardBody className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-foreground-100 rounded-lg p-4">
                    <Icon icon="book" size={32} className="text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold font-sans">Guides</h2>
                    <p className="text-foreground-500">Step-by-step tutorials and guides</p>
                  </div>
                </div>
                <p className="text-foreground-500 mb-6">
                  Access comprehensive guides and tutorials to help you master Kreatli's creative production management
                  features. Learn how to set up projects, manage files, collaborate with your team, and streamline your
                  creative workflow.
                </p>
                <Button as={NextLink} href="/learning/guides" className="w-full bg-foreground text-content1">
                  View Guides
                </Button>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-foreground-100 rounded-lg p-4">
                    <Icon icon="chat" size={32} className="text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold font-sans">Blog</h2>
                    <p className="text-foreground-500">Latest articles and updates</p>
                  </div>
                </div>
                <p className="text-foreground-500 mb-6">
                  Read the latest articles, tips, and updates about creative production management, media review and
                  approval workflows, and best practices for creative teams. Stay informed about new features and
                  industry insights.
                </p>
                <Button as={NextLink} href="/blog" className="w-full bg-foreground text-content1">
                  Visit Blog
                </Button>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-foreground-50 lg:py-24 py-16 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center flex flex-col gap-6 relative z-10">
          <h2 className="text-2xl sm:text-4xl font-bold font-sans">Ready to Get Started?</h2>
          <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
            Start using Kreatli today and experience the difference of a platform built specifically for creative teams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-4">
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
      <FooterSection hideCta={true} />
    </>
  );
}

