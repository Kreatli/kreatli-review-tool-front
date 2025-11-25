import Head from 'next/head';
import React from 'react';

import { Header } from '../components/layout/Header';
import { PricingSection } from '../components/home/PricingSection';
import { FooterSection } from '../components/home/Footer/FooterSection';
import { useSession } from '../hooks/useSession';
import { Decorations } from '../components/layout/Storyblok/Decorations';
import { Card, CardBody, Button, Accordion, AccordionItem } from '@heroui/react';
import NextLink from 'next/link';
import { Icon } from '../components/various/Icon';

export default function PricingPage() {
  useSession();

  return (
    <>
      <Head>
        <title>Kreatli | Pricing - Simple, Transparent Plans for Creative Teams</title>
        <meta
          name="description"
          content="Choose the perfect plan for your creative journey. Flexible pricing options to support your growth - Free, Pro, and Advanced plans available. No hidden fees, cancel anytime."
        />
        <meta property="og:title" content="Kreatli | Pricing - Simple, Transparent Plans for Creative Teams" />
        <meta
          property="og:description"
          content="Flexible pricing options for creative teams of all sizes. Free plan available forever. Upgrade when you're ready. No credit card required to start."
        />
        <meta property="og:type" content="website" />
      </Head>
      <Header />
      {/* Hero Section */}
      <section className="relative py-16 px-6 overflow-hidden">
        <Decorations />
        <div className="max-w-6xl mx-auto text-center flex flex-col gap-6 relative z-10">
          <h1 className="text-2xl sm:text-4xl font-bold font-sans max-w-lg mx-auto">
            Simple, Transparent Pricing for Creative Teams
          </h1>
          <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
            Choose the plan that fits your team size and needs. Start free forever, upgrade when you're ready. No credit
            card required.
          </p>
          <div className="flex flex-wrap gap-6 justify-center mt-4">
            <div className="flex flex-col items-center">
              <div className="text-2xl sm:text-3xl font-bold font-sans">3 Plans</div>
              <div className="text-sm sm:text-md text-foreground-500">Free, Pro & Advanced</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl sm:text-3xl font-bold font-sans">Cancel Anytime</div>
              <div className="text-sm sm:text-md text-foreground-500">No Long-Term Contracts</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl sm:text-3xl font-bold font-sans">Free Forever</div>
              <div className="text-sm sm:text-md text-foreground-500">No Credit Card Required</div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6">
            <Button as={NextLink} href="/sign-up" size="lg" className="bg-foreground text-content1">
              Start Free Forever
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

      {/* Main Pricing Section */}
      <PricingSection titleClassName="text-2xl sm:text-4xl font-bold font-sans text-center" />

      {/* Benefits/Why Section */}
      <section className="relative py-16 px-6 backdrop-blur-lg overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-4">
            <h2 className="text-2xl sm:text-4xl font-bold font-sans mb-6">Why Kreatli's Pricing Works for You</h2>
            <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
              Transparent pricing designed to grow with your team. No surprises, no hidden fees, just straightforward
              plans that make sense.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-foreground-100 rounded-full p-2">
                    <Icon icon="dollar" size={20} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold font-sans">Transparent Pricing</h3>
                </div>
                <p className="text-foreground-500 text-sm">
                  Simple per-user pricing with no hidden fees or surprise charges. You know exactly what you're paying
                  for.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-foreground-100 rounded-full p-2">
                    <Icon icon="shield" size={20} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold font-sans">No Hidden Fees</h3>
                </div>
                <p className="text-foreground-500 text-sm">
                  What you see is what you pay. No setup fees, no per-project charges, no bandwidth limits that cost
                  extra.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-foreground-100 rounded-full p-2">
                    <Icon icon="update" size={20} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold font-sans">Flexible Plans</h3>
                </div>
                <p className="text-foreground-500 text-sm">
                  Upgrade or downgrade anytime. Your plan changes with your team size, not the other way around.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-foreground-100 rounded-full p-2">
                    <Icon icon="crossCircle" size={20} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold font-sans">Cancel Anytime</h3>
                </div>
                <p className="text-foreground-500 text-sm">
                  No long-term contracts or commitments. Cancel your subscription whenever you need to, no questions
                  asked.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-foreground-100 rounded-full p-2">
                    <Icon icon="checkCircle" size={20} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold font-sans">Free Forever Plan</h3>
                </div>
                <p className="text-foreground-500 text-sm">
                  Start with our free plan and use it forever. No credit card required. Upgrade only when you need more
                  features.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-foreground-100 rounded-full p-2">
                    <Icon icon="group" size={20} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold font-sans">Pay Per User</h3>
                </div>
                <p className="text-foreground-500 text-sm">
                  Only pay for active team members. Add or remove users as your team grows or changes, with immediate
                  effect.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Additional Pricing Details Section */}
      {/* Section removed as per request */}

      {/* FAQ Section */}
      <section className="relative py-16 px-6 backdrop-blur-lg overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-2xl sm:text-4xl font-bold font-sans text-center mb-12">Frequently Asked Questions</h2>

          <Accordion variant="splitted">
            <AccordionItem key="change-plans" title={<span className="font-semibold">Can I change plans later?</span>}>
              <span className="text-foreground-500">
                Yes! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing
                cycle.
              </span>
            </AccordionItem>

            <AccordionItem
              key="payment-methods"
              title={<span className="font-semibold">What payment methods do you accept?</span>}
            >
              <span className="text-foreground-500">
                We accept all major credit cards including Visa, Mastercard, American Express, and Discover. All
                payments are processed securely through Stripe.
              </span>
            </AccordionItem>

            <AccordionItem key="free-trial" title={<span className="font-semibold">Is there a free trial?</span>}>
              <span className="text-foreground-500">
                Our Free plan is available forever with no credit card required. You can start using Kreatli immediately
                and upgrade when you're ready.
              </span>
            </AccordionItem>

            <AccordionItem
              key="cancel-data"
              title={<span className="font-semibold">What happens to my data if I cancel?</span>}
            >
              <span className="text-foreground-500">
                Your data remains accessible for 30 days after cancellation. You can export all your files and projects
                during this period.
              </span>
            </AccordionItem>

            <AccordionItem
              key="enterprise-plans"
              title={<span className="font-semibold">Do you offer enterprise plans?</span>}
            >
              <span className="text-foreground-500">
                Yes! For teams with specific needs, we offer custom enterprise plans with dedicated support, custom
                integrations, and advanced features. Contact us to learn more.
              </span>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-foreground-50 lg:py-24 py-16 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center flex flex-col gap-6 relative z-10">
          <h2 className="text-2xl sm:text-4xl font-bold font-sans">Ready to Get Started?</h2>
          <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
            Join creative teams who have simplified their collaboration process. Start free forever or book a demo to
            see how Kreatli works for your team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-4">
            <Button as={NextLink} href="/sign-up" size="lg" className="bg-foreground text-content1">
              Start Free Forever
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
