import Head from 'next/head';
import React from 'react';

import { Header } from '../components/layout/Header';
import { PricingSection } from '../components/home/PricingSection';
import { FooterSection } from '../components/home/Footer/FooterSection';
import { useSession } from '../hooks/useSession';
import { getStoryblokApi } from '../lib/storyblok';
import { GetStaticProps } from 'next';
import { Decorations } from '../components/layout/Storyblok/Decorations';
import { Card, CardBody, Chip, Tooltip, Button } from '@heroui/react';
import NextLink from 'next/link';
import { Icon } from '../components/various/Icon';

interface Props {
  footerLinks?: {
    label: string;
    url: string;
  }[];
}

export default function PricingPage({ footerLinks }: Props) {
  useSession();

  return (
    <>
      <Head>
        <title>Kreatli | Pricing</title>
        <meta
          name="description"
          content="Choose the perfect plan for your creative journey. Flexible pricing options to support your growth - Free, Pro, and Advanced plans available."
        />
      </Head>
      <Header />
      <Decorations />
      <div className="backdrop-blur-lg">
        <div className="border-t border-foreground-200">
          {/* Main Pricing Section */}
          <PricingSection />

          {/* Additional Pricing Details Section */}
          <section className="py-16 px-6 bg-background">
            <div className="max-w-6xl mx-auto">
              <div className="mb-12 text-center">
                <h2 className="text-2xl sm:text-4xl font-bold font-sans mb-4">
                  Everything you need to collaborate effectively
                </h2>
                <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
                  All plans include core features designed to streamline your creative workflow and improve team
                  collaboration.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                <Card className="border border-foreground-300">
                  <CardBody className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Icon icon="checkCircle" size={24} className="text-primary" />
                      <h3 className="text-lg font-bold font-sans">Unlimited Storage*</h3>
                    </div>
                    <p className="text-foreground-500 text-sm">
                      Upload and store all your creative assets without worrying about running out of space. *Storage
                      limits vary by plan.
                    </p>
                  </CardBody>
                </Card>

                <Card className="border border-foreground-300">
                  <CardBody className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Icon icon="checkCircle" size={24} className="text-primary" />
                      <h3 className="text-lg font-bold font-sans">Real-time Collaboration</h3>
                    </div>
                    <p className="text-foreground-500 text-sm">
                      Work together seamlessly with real-time comments, annotations, and feedback on all your creative
                      assets.
                    </p>
                  </CardBody>
                </Card>

                <Card className="border border-foreground-300">
                  <CardBody className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Icon icon="checkCircle" size={24} className="text-primary" />
                      <h3 className="text-lg font-bold font-sans">Secure File Sharing</h3>
                    </div>
                    <p className="text-foreground-500 text-sm">
                      Share projects securely with team members and clients using password-protected links and access
                      controls.
                    </p>
                  </CardBody>
                </Card>

                <Card className="border border-foreground-300">
                  <CardBody className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Icon icon="checkCircle" size={24} className="text-primary" />
                      <h3 className="text-lg font-bold font-sans">Version History</h3>
                    </div>
                    <p className="text-foreground-500 text-sm">
                      Keep track of all changes with comprehensive version history. Never lose your work again.
                    </p>
                  </CardBody>
                </Card>

                <Card className="border border-foreground-300">
                  <CardBody className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Icon icon="checkCircle" size={24} className="text-primary" />
                      <h3 className="text-lg font-bold font-sans">Advanced Review Tools</h3>
                    </div>
                    <p className="text-foreground-500 text-sm">
                      Powerful annotation tools for precise feedback on images, videos, and documents. Perfect for
                      design reviews.
                    </p>
                  </CardBody>
                </Card>

                <Card className="border border-foreground-300">
                  <CardBody className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Icon icon="checkCircle" size={24} className="text-primary" />
                      <h3 className="text-lg font-bold font-sans">24/7 Support</h3>
                    </div>
                    <p className="text-foreground-500 text-sm">
                      Get help when you need it with our responsive support team. All plans include email support.
                    </p>
                  </CardBody>
                </Card>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-16 px-6 bg-foreground-50">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl sm:text-4xl font-bold font-sans text-center mb-12">Frequently Asked Questions</h2>

              <div className="flex flex-col gap-6">
                <Card className="border border-foreground-300">
                  <CardBody className="p-6">
                    <h3 className="text-lg font-bold font-sans mb-2">Can I change plans later?</h3>
                    <p className="text-foreground-500">
                      Yes! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next
                      billing cycle.
                    </p>
                  </CardBody>
                </Card>

                <Card className="border border-foreground-300">
                  <CardBody className="p-6">
                    <h3 className="text-lg font-bold font-sans mb-2">What payment methods do you accept?</h3>
                    <p className="text-foreground-500">
                      We accept all major credit cards including Visa, Mastercard, American Express, and Discover. All
                      payments are processed securely through Stripe.
                    </p>
                  </CardBody>
                </Card>

                <Card className="border border-foreground-300">
                  <CardBody className="p-6">
                    <h3 className="text-lg font-bold font-sans mb-2">Is there a free trial?</h3>
                    <p className="text-foreground-500">
                      Our Free plan is available forever with no credit card required. You can start using Kreatli
                      immediately and upgrade when you're ready.
                    </p>
                  </CardBody>
                </Card>

                <Card className="border border-foreground-300">
                  <CardBody className="p-6">
                    <h3 className="text-lg font-bold font-sans mb-2">What happens to my data if I cancel?</h3>
                    <p className="text-foreground-500">
                      Your data remains accessible for 30 days after cancellation. You can export all your files and
                      projects during this period.
                    </p>
                  </CardBody>
                </Card>

                <Card className="border border-foreground-300">
                  <CardBody className="p-6">
                    <h3 className="text-lg font-bold font-sans mb-2">Do you offer enterprise plans?</h3>
                    <p className="text-foreground-500">
                      Yes! For teams with specific needs, we offer custom enterprise plans with dedicated support,
                      custom integrations, and advanced features. Contact us to learn more.
                    </p>
                  </CardBody>
                </Card>
              </div>

              <div className="mt-12 text-center">
                <Button
                  as="a"
                  href="https://calendar.app.google/NXbAeTAUwaBGh5x49"
                  target="_blank"
                  size="lg"
                  variant="bordered"
                >
                  Schedule a Demo
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
      <FooterSection links={footerLinks} />
    </>
  );
}

export const getStaticProps = (async () => {
  try {
    const { data } = await getStoryblokApi().get('cdn/links', {
      version: process.env.STORYBLOK_STATUS as 'draft' | 'published',
    });

    return {
      props: {
        footerLinks: Object.values(data.links ?? {}).map((link) => ({ label: link.name, url: link.slug })),
      },
    };
  } catch {
    return {
      props: {
        footerLinks: [],
      },
    };
  }
}) satisfies GetStaticProps<{}>;
