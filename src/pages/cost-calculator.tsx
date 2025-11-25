import Head from 'next/head';
import React from 'react';

import { Header } from '../components/layout/Header';
import { CostCalculatorSection } from '../components/home/CostCalculator';
import { FooterSection } from '../components/home/Footer/FooterSection';
import { useSession } from '../hooks/useSession';
import { Decorations } from '../components/layout/Storyblok/Decorations';
import { Card, CardBody, Button, Alert, Accordion, AccordionItem } from '@heroui/react';
import NextLink from 'next/link';
import { Icon } from '../components/various/Icon';

export default function CostCalculatorPage() {
  useSession();

  return (
    <>
      <Head>
        <title>Kreatli | Cost Calculator - Calculate Your Software Savings</title>
        <meta
          name="description"
          content="Discover how much you're overpaying for multiple tools. Use our free cost calculator to compare your current software stack with Kreatli's all-in-one solution. See potential savings instantly."
        />
        <meta property="og:title" content="Kreatli | Cost Calculator - Calculate Your Software Savings" />
        <meta
          property="og:description"
          content="Compare your current tool stack costs with Kreatli. See how much you can save by consolidating multiple tools into one platform."
        />
        <meta property="og:type" content="website" />
      </Head>
      <Header />
      <Decorations />
      {/* Hero Section */}
      <section className="relative py-16 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center flex flex-col gap-6 relative z-10">
          <h1 className="text-2xl sm:text-4xl font-bold font-sans mb-4 max-w-2xl mx-auto">
            How Much Are You Really Spending on Software Tools?
          </h1>
          <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
            Creative teams often use 5+ different tools for file sharing, project management, and review workflows. See
            how much you could save by consolidating with Kreatli's all-in-one platform.
          </p>
          <div className="flex flex-wrap gap-6 justify-center mt-4">
            <div className="flex flex-col items-center">
              <div className="text-2xl sm:text-4xl font-bold font-sans">60%+</div>
              <div className="text-sm sm:text-md text-foreground-500 max-w-32 mx-auto">Average Savings</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl sm:text-4xl font-bold font-sans">$10K+</div>
              <div className="text-sm sm:text-md text-foreground-500 max-w-32 mx-auto">Annual Savings Potential</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl sm:text-4xl font-bold font-sans">1 Tool</div>
              <div className="text-sm sm:text-md text-foreground-500 max-w-32 mx-auto">Instead of 5+</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative py-16 px-6 backdrop-blur-lg overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-4">
            <h2 className="text-2xl sm:text-4xl font-bold font-sans mb-4">Why Calculate Your Software Costs?</h2>
            <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
              Hidden costs add up quickly. Understanding your true software spend helps you make smarter decisions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-foreground-100 rounded-full p-2">
                    <Icon icon="dollar" size={20} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold font-sans">Hidden Costs Add Up</h3>
                </div>
                <p className="text-foreground-500 text-sm">
                  Per-user pricing across multiple tools can cost thousands annually. Many teams don't realize their
                  total software spend until they calculate it.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-foreground-100 rounded-full p-2">
                    <Icon icon="compare" size={20} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold font-sans">Consolidation Saves Money</h3>
                </div>
                <p className="text-foreground-500 text-sm">
                  Using one platform instead of multiple tools reduces costs, simplifies billing, and eliminates
                  redundant features you're paying for twice.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-foreground-100 rounded-full p-2">
                    <Icon icon="time" size={20} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold font-sans">Time is Money</h3>
                </div>
                <p className="text-foreground-500 text-sm">
                  Switching between tools wastes time. A unified platform improves productivity and reduces context
                  switching, saving hours every week.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-foreground-100 rounded-full p-2">
                    <Icon icon="shield" size={20} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold font-sans">Better Security</h3>
                </div>
                <p className="text-foreground-500 text-sm">
                  Fewer tools mean fewer security risks. One platform with enterprise-grade security is easier to manage
                  and audit than multiple vendors.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-foreground-100 rounded-full p-2">
                    <Icon icon="group" size={20} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold font-sans">Simplified Onboarding</h3>
                </div>
                <p className="text-foreground-500 text-sm">
                  New team members learn one tool instead of five. Faster onboarding means your team is productive
                  sooner.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-foreground-100 rounded-full p-2">
                    <Icon icon="suitcase" size={20} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold font-sans">Better ROI</h3>
                </div>
                <p className="text-foreground-500 text-sm">
                  Get more value from a single platform designed for creative workflows than piecing together multiple
                  generic tools.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Real-World Scenarios Section */}
      <section className="relative py-16 px-6 backdrop-blur-lg overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-4xl font-bold font-sans mb-4">Real-World Cost Examples</h2>
            <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
              See how typical tool combinations compare to Kreatli across different team sizes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Icon icon="user" size={24} className="text-primary" />
                  <h3 className="text-lg font-bold font-sans">Small Team (5 members)</h3>
                </div>
                <div className="flex flex-col gap-3">
                  <div>
                    <p className="text-base mb-1">Typical Stack:</p>
                    <ul className="text-base text-foreground-500 space-y-1">
                      <li>• Google Drive ($75/mo)</li>
                      <li>• Frame.io ($125/mo)</li>
                      <li>• WeTransfer ($100/mo)</li>
                    </ul>
                    <div className="hidden md:block">
                      <br />
                      <br />
                    </div>
                  </div>
                  <div className="border-t border-foreground-200 pt-3">
                    <p className="text-base mb-1">Total Cost:</p>
                    <p className="text-2xl font-bold font-sans">$300/month</p>
                    <p className="text-base text-foreground-500">$3,600/year</p>
                  </div>
                  <div className="border-t border-foreground-200 pt-3">
                    <p className="text-base mb-1">With Kreatli:</p>
                    <p className="text-2xl font-bold font-sans">$75/month</p>
                    <p className="text-base text-foreground-500">$900/year</p>
                  </div>
                  <Alert className="mt-2" color="success" icon={<Icon icon="dollar" />}>
                    <span>
                      Save <span className="font-bold">$225</span>/month ($2,700/year)
                    </span>
                  </Alert>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Icon icon="group" size={24} className="text-primary" />
                  <h3 className="text-lg font-bold font-sans">Medium Team (15 members)</h3>
                </div>
                <div className="flex flex-col gap-3">
                  <div>
                    <p className="text-base mb-1">Typical Stack:</p>
                    <ul className="text-base text-foreground-500 space-y-1">
                      <li>• Dropbox ($345/mo)</li>
                      <li>• Google Workspace ($225/mo)</li>
                      <li>• Monday.com ($405/mo)</li>
                      <li>• Filestage ($295/mo)</li>
                    </ul>
                    <div className="hidden md:block">
                      <br />
                    </div>
                  </div>
                  <div className="border-t border-foreground-200 pt-3">
                    <p className="text-base mb-1">Total Cost:</p>
                    <p className="text-2xl font-bold font-sans">$1,270/month</p>
                    <p className="text-base text-foreground-500">$15,240/year</p>
                  </div>
                  <div className="border-t border-foreground-200 pt-3">
                    <p className="text-base mb-1">With Kreatli:</p>
                    <p className="text-2xl font-bold font-sans">$300/month</p>
                    <p className="text-base">$3,600/year</p>
                  </div>
                  <Alert className="mt-2" color="success" icon={<Icon icon="dollar" />}>
                    <span>
                      Save <span className="font-bold">$970</span>/month ($11,640/year)
                    </span>
                  </Alert>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Icon icon="building" size={24} className="text-primary" />
                  <h3 className="text-lg font-bold font-sans">Large Team (50 members)</h3>
                </div>
                <div className="flex flex-col gap-3">
                  <div>
                    <p className="text-base mb-1">Typical Stack:</p>
                    <ul className="text-base text-foreground-500 space-y-1">
                      <li>• Dropbox ($1,150/mo)</li>
                      <li>• Google Workspace ($750/mo)</li>
                      <li>• Asana ($1,600/mo)</li>
                      <li>• Frame.io ($2,500/mo)</li>
                      <li>• Monday.com ($1,350/mo)</li>
                    </ul>
                  </div>
                  <div className="border-t border-foreground-200 pt-3">
                    <p className="text-base mb-1">Total Cost:</p>
                    <p className="text-2xl font-bold font-sans">$7,350/month</p>
                    <p className="text-base text-foreground-500">$88,200/year</p>
                  </div>
                  <div className="border-t border-foreground-200 pt-3">
                    <p className="text-base mb-1">With Kreatli:</p>
                    <p className="text-2xl font-bold font-sans">$1,000/month</p>
                    <p className="text-base">$12,000/year</p>
                  </div>
                  <Alert className="mt-2 whitespace-nowrap" color="success" icon={<Icon icon="dollar" />}>
                    <span>
                      Save <span className="font-bold">$6,350</span>/month ($76,200/year)
                    </span>
                  </Alert>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Calculator Section with Instructions */}
      <section className="relative overflow-hidden">
        <div className="relative z-10">
          <CostCalculatorSection titleClassName="text-2xl sm:text-4xl font-bold font-sans text-center" />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-16 px-6 backdrop-blur-lg overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-2xl sm:text-4xl font-bold font-sans text-center mb-8">Frequently Asked Questions</h2>

          <Accordion variant="splitted">
            <AccordionItem
              key="accuracy"
              title={<span className="font-semibold">How accurate is the cost calculator?</span>}
            >
              <span className="text-foreground-500">
                The calculator uses current list pricing for each tool. Your actual costs may vary based on discounts,
                annual contracts, or custom pricing. However, the calculator provides a good estimate of potential
                savings.
              </span>
            </AccordionItem>

            <AccordionItem
              key="replace-tools"
              title={<span className="font-semibold">Does Kreatli really replace all these tools?</span>}
            >
              <span className="text-foreground-500">
                Depending on your current needs, Kreatli can become an end-to-end production management platform for
                you! Kreatli combines file storage, project management, and media review/approval into one platform. You
                get frame-accurate video comments, asset-linked conversations, project organization, and secure file
                sharing—all in one place.
              </span>
            </AccordionItem>

            <AccordionItem
              key="specific-features"
              title={<span className="font-semibold">What if I need features from specific tools?</span>}
            >
              <span className="text-foreground-500">
                Kreatli is designed specifically for creative workflows. If you need specialized features, you can still
                use other tools alongside Kreatli. Many teams use Kreatli as their primary platform and keep one or two
                specialized tools for specific needs, still saving significantly.
              </span>
            </AccordionItem>

            <AccordionItem key="pricing" title={<span className="font-semibold">How does Kreatli pricing work?</span>}>
              <span className="text-foreground-500">
                Kreatli uses simple per-user pricing: $15/user/month for teams up to 5 members, and $20/user/month for
                larger teams. There are no hidden fees - pay only for what you are using!
              </span>
            </AccordionItem>

            <AccordionItem
              key="try-before-switching"
              title={<span className="font-semibold">Can I try Kreatli before switching?</span>}
            >
              <span className="text-foreground-500">
                Absolutely! We offer a free plan and a trial period for our paid plans so you can test Kreatli with your
                team. You can also book a demo to see how it would work for your specific workflow. We'll help you
                migrate your projects and ensure a smooth transition.
              </span>
            </AccordionItem>

            <AccordionItem
              key="data-migration"
              title={<span className="font-semibold">What about data migration?</span>}
            >
              <span className="text-foreground-500">
                We provide migration assistance to help you move your files and projects to Kreatli. Our team can help
                with bulk uploads, project organization, and ensuring nothing gets lost in the transition.
              </span>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-foreground-50 lg:py-24 py-16 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center flex flex-col gap-3 relative z-10">
          <h2 className="text-2xl sm:text-4xl font-bold font-sans max-w-xl mx-auto">
            Ready to Start Saving on Software Costs?
          </h2>
          <p className="text-lg text-foreground-500 max-w-xl mx-auto">
            Join teams that have consolidated their tools and reduced costs by 60% or more. Get started with Kreatli
            today.
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
