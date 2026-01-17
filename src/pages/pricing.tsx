/* eslint-disable max-len */
import { Accordion, AccordionItem, Button, Card, CardBody } from '@heroui/react';
import Head from 'next/head';
import NextLink from 'next/link';

import { FooterSection } from '../components/home/Footer/FooterSection';
import { PricingSection } from '../components/home/PricingSection';
import { Header } from '../components/layout/Header';
import { Decorations } from '../components/layout/Storyblok/Decorations';
import { Icon } from '../components/various/Icon';
import { useSession } from '../hooks/useSession';

export default function PricingPage() {
  useSession();

  return (
    <>
      <Head>
        <title>Kreatli | Pricing – Video Collaboration & Review Platform</title>
        <meta
          name="description"
          content="Choose the perfect plan for your video collaboration and review workflows. Flexible pricing for video collaboration, video review and approval, and team collaboration. No hidden fees, cancel anytime."
        />
        <link rel="canonical" href="https://kreatli.com/pricing" />
        <meta property="og:url" content="https://kreatli.com/pricing" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Kreatli | Pricing – Video Collaboration & Review Platform" />
        <meta
          property="og:description"
          content="Flexible pricing for video teams of all sizes. Plans for video collaboration, video review and approval, and team collaboration. 7-day free trial on all plans. No credit card required to start."
        />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:secure_url" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:alt" content="Kreatli | Pricing – Video Collaboration & Review Platform" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kreatli | Pricing – Video Collaboration & Review Platform" />
        <meta
          name="twitter:description"
          content="Flexible pricing for video teams of all sizes. Plans for video collaboration, video review and approval, and team collaboration. Free plan available forever. No credit card required to start."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
      </Head>
      <Header />
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-16">
        <Decorations />
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 text-center">
          <h1 className="mx-auto max-w-lg font-sans text-2xl font-bold sm:text-4xl">
            Simple, Transparent Pricing for Video Teams
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-foreground-500">
            Choose a plan and start your 7-day free trial. No credit card required. After the trial, select a paid plan
            to continue.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-6">
            <div className="flex flex-col items-center">
              <div className="font-sans text-2xl font-bold sm:text-3xl">3 Plans</div>
              <div className="sm:text-md text-sm text-foreground-500">Creator, Team & Enterprise</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="font-sans text-2xl font-bold sm:text-3xl">Cancel Anytime</div>
              <div className="sm:text-md text-sm text-foreground-500">No Long-Term Contracts</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="font-sans text-2xl font-bold sm:text-3xl">7-Day Free Trial</div>
              <div className="sm:text-md text-sm text-foreground-500">No Credit Card Required</div>
            </div>
          </div>
          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button as={NextLink} href="/sign-up" size="lg" className="bg-foreground text-content1">
              Start Free Trial
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
      <PricingSection
        titleClassName="text-2xl sm:text-4xl font-bold font-sans text-center"
        showDetailedFeatures={true}
      />

      {/* Benefits/Why Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-4 text-center">
            <h2 className="mb-6 font-sans text-2xl font-bold sm:text-4xl">Why Kreatli's Pricing Works for You</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Transparent pricing designed to grow with your team. No surprises, no hidden fees, just straightforward
              plans that make sense.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="dollar" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Transparent Pricing</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Simple per-user pricing with no hidden fees or surprise charges. You know exactly what you're paying
                  for.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="shield" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">No Hidden Fees</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  What you see is what you pay. No setup fees, no per-project charges, no bandwidth limits that cost
                  extra.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="update" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Flexible Plans</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Upgrade or downgrade anytime. Your plan changes with your team size, not the other way around.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="crossCircle" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Cancel Anytime</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  No long-term contracts or commitments. Cancel your subscription whenever you need to, no questions
                  asked.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="checkCircle" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">7-Day Free Trial</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  All plans include a 7-day free trial. No credit card required. After the trial, select a paid plan to
                  continue using the platform.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="group" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Pay Per User</h3>
                </div>
                <p className="text-sm text-foreground-500">
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
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-4xl">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Get detailed answers about Kreatli's pricing plans, billing, plan changes, and how to choose the right
              plan for your team.
            </p>
          </div>

          <Accordion variant="splitted">
            <AccordionItem
              key="change-plans"
              title={
                <span className="text-base font-semibold">
                  Can I change plans later, and how does billing work when I upgrade or downgrade?
                </span>
              }
            >
              <div className="space-y-3 text-foreground-500">
                <p>
                  Yes! You can upgrade or downgrade your plan at any time to match your evolving needs. If you need more
                  projects, users, or features, you can upgrade your plan immediately and gain access to the additional
                  capabilities right away. If you find you're not using all the features of your current plan, you can
                  downgrade to a more cost-effective option.
                </p>
                <p>
                  When you upgrade, you'll be charged a prorated amount for the remainder of your current billing cycle,
                  and then the new plan price will apply going forward. When you downgrade, the changes will take effect
                  at the start of your next billing cycle, giving you time to adjust your usage. This flexibility
                  ensures you're only paying for what you need while having the option to scale up when your video
                  collaboration requirements grow.
                </p>
                <p>
                  All plan changes are handled through your account settings, and you'll receive email confirmation of
                  any changes. There are no fees for changing plans, and you can switch as often as needed. This makes
                  it easy to adapt your Kreatli subscription to match your team's current size and needs without being
                  locked into a plan that doesn't fit.
                </p>
              </div>
            </AccordionItem>

            <AccordionItem
              key="pricing-structure"
              title={
                <span className="text-base font-semibold">
                  How does Kreatli's per-user pricing work, and are there any hidden fees?
                </span>
              }
            >
              <div className="space-y-3 text-foreground-500">
                <p>
                  Kreatli uses simple, transparent per-user pricing with no hidden fees. The Creator plan is $7 per user
                  per month for teams up to 3 members. The Team plan is $19 per user per month for teams up to 10
                  members. Enterprise plans have custom pricing based on your organization's needs. All plans include
                  all core features: unlimited projects, file storage, frame-accurate video review, video review and
                  approval workflows, project management, team collaboration, guest review links, and cloud storage
                  integrations.
                </p>
                <p>
                  Unlike many tools that charge extra for storage, advanced features, or add-ons, Kreatli includes
                  everything in the base price. There are no per-project fees, no storage overage charges, no premium
                  feature tiers, and no setup fees. You pay only for active users, making it easy to scale up or down
                  based on your team size. This transparent pricing model means you can accurately calculate your costs
                  without worrying about surprise fees.
                </p>
                <p>
                  The per-user pricing model is straightforward: you're charged based on the number of active team
                  members in your account. If you add a team member, you'll be charged for them in your next billing
                  cycle. If you remove a team member, you'll see the cost reduction in your next billing cycle. This
                  simplicity contrasts with complex pricing models that vary based on features, storage, or usage,
                  making it difficult to predict total costs for your video collaboration needs.
                </p>
              </div>
            </AccordionItem>

            <AccordionItem
              key="payment-methods"
              title={
                <span className="text-base font-semibold">
                  What payment methods do you accept, and how secure is the payment process?
                </span>
              }
            >
              <div className="space-y-3 text-foreground-500">
                <p>
                  We accept all major credit cards including Visa, Mastercard, American Express, and Discover. All
                  payments are processed securely through Stripe, a leading payment processor that handles billions of
                  dollars in transactions annually. Stripe is PCI DSS Level 1 certified, which is the highest level of
                  security certification for payment processors.
                </p>
                <p>
                  Your payment information is never stored on Kreatli's servers. All payment data is handled directly by
                  Stripe, which uses industry-standard encryption and security measures to protect your financial
                  information. This means your credit card details are secure and you don't need to worry about payment
                  data breaches or unauthorized access to your financial information.
                </p>
                <p>
                  Billing is handled automatically on a monthly or annual basis, depending on your plan preference.
                  You'll receive email receipts for all payments, and you can view your billing history and manage
                  payment methods through your account settings. If you prefer annual billing, we offer discounts that
                  can save you money compared to monthly billing, making it more cost-effective for teams committed to
                  using Kreatli for their video collaboration.
                </p>
              </div>
            </AccordionItem>

            <AccordionItem
              key="free-trial"
              title={<span className="text-base font-semibold">How does the 7-day free trial work?</span>}
            >
              <div className="space-y-3 text-foreground-500">
                <p>
                  When you sign up for Kreatli, you'll choose a plan (Creator, Team, or Enterprise) and immediately
                  start a 7-day free trial of that plan. No credit card is required to start your trial. During the
                  trial, you'll have full access to all features and limits of your chosen plan, allowing you to test
                  the platform with real projects and see how it improves your video collaboration.
                </p>
                <p>
                  All plans include all core features during the trial: frame-accurate video review, video review and
                  approval workflows, file organization, team collaboration, guest review links, cloud storage
                  integrations, and project management. This means you can fully evaluate how Kreatli compares to your
                  current tool stack before making any financial commitment. You get the complete experience, not a
                  watered-down version.
                </p>
                <p>
                  After your 7-day trial ends, you'll need to select a paid plan to continue using the platform. If you
                  don't select a plan, you'll lose access to your projects and data. This ensures you can try Kreatli
                  risk-free while making it clear that continued use requires a paid subscription. Many teams use the
                  trial period to onboard their team, run a pilot project, and see the value in consolidating their
                  video collaboration tools.
                </p>
              </div>
            </AccordionItem>

            <AccordionItem
              key="plan-selection"
              title={
                <span className="text-base font-semibold">
                  How do I choose the right plan for my team size and needs?
                </span>
              }
            >
              <div className="space-y-3 text-foreground-500">
                <p>
                  Choosing the right plan depends on your team size and storage needs. All plans include a 7-day free
                  trial, so you can test any plan before committing. The Creator plan ($7/user/month, up to 3 members,
                  500GB storage) is perfect for solo creators and teams who want to organize projects, review work, and
                  create faster.
                </p>
                <p>
                  The Team plan ($19/user/month, up to 10 members, 2TB storage) is ideal for established teams running
                  multiple projects with shared assets, structured reviews, and consistent workflows. This plan works
                  well for micro-teams, freelance teams, and small agencies that need more capacity and collaboration
                  features.
                </p>
                <p>
                  The Enterprise plan (custom pricing) provides custom members, custom storage, Single Sign-On (SSO), a
                  dedicated account manager, and custom integrations & features. This plan is tailored for enterprise
                  organizations that need advanced controls, custom workflows, and dedicated support. If you're unsure
                  which plan is right for your team, start with a 7-day trial and our support team can help you evaluate
                  which plan best fits your video collaboration requirements.
                </p>
              </div>
            </AccordionItem>

            <AccordionItem
              key="cancel-data"
              title={
                <span className="text-base font-semibold">What happens to my data if I cancel my subscription?</span>
              }
            >
              <div className="space-y-3 text-foreground-500">
                <p>
                  If you cancel your paid plan, your data remains accessible for 30 days after cancellation. During this
                  period, you can continue to access all your projects, files, and data. This gives you time to export
                  your files, download projects, and ensure you have everything you need before your access ends.
                </p>
                <p>
                  You can export all your files and projects during the 30-day grace period. Kreatli provides tools to
                  help you download files in bulk, export project data, and save your work. If you decide to return to
                  Kreatli within 30 days, you can reactivate your account and all your data will still be there -
                  nothing is deleted immediately upon cancellation.
                </p>
                <p>
                  After 30 days, if you don't reactivate your account, your data may be archived. Since there's no free
                  plan available, you'll need to select a paid plan to continue accessing your projects. We recommend
                  exporting your important files and projects before canceling to ensure you have backups of your
                  creative work. Our support team can help you with the export process if needed.
                </p>
              </div>
            </AccordionItem>

            <AccordionItem
              key="enterprise-plans"
              title={
                <span className="text-base font-semibold">
                  Do you offer enterprise plans, and what's included in custom enterprise solutions?
                </span>
              }
            >
              <div className="space-y-3 text-foreground-500">
                <p>
                  Yes! For teams with specific needs, we offer custom enterprise plans with dedicated support, custom
                  integrations, advanced features, and tailored pricing. Enterprise plans are designed for large
                  agencies, post-production houses, and organizations that need specialized features or support beyond
                  what's available in standard plans.
                </p>
                <p>
                  Enterprise plans typically include dedicated account management, priority support, custom integrations
                  with your existing tools, advanced security features, custom storage limits, and specialized training
                  for your team.                   We work with enterprise clients to understand their specific video collaboration
                  needs and tailor the solution accordingly.
                </p>
                <p>
                  Enterprise plans also often include features like single sign-on (SSO), advanced analytics and
                  reporting, custom branding options, and service level agreements (SLAs) for uptime and support
                  response times. If you're interested in an enterprise plan, contact our sales team to discuss your
                  requirements and get a customized proposal that fits your organization's needs and budget.
                </p>
              </div>
            </AccordionItem>

            <AccordionItem
              key="annual-billing"
              title={
                <span className="text-base font-semibold">
                  Do you offer annual billing, and are there discounts for annual plans?
                </span>
              }
            >
              <div className="space-y-3 text-foreground-500">
                <p>
                  Yes, Kreatli offers annual billing options with discounts compared to monthly billing. Annual plans
                  provide cost savings (typically 10-20% off monthly pricing) and simplify budgeting by requiring one
                  payment per year instead of 12 monthly payments.                   This makes annual billing attractive for teams
                  committed to using Kreatli for their video collaboration.
                </p>
                <p>
                  When you choose annual billing, you're charged upfront for the entire year, and your subscription
                  automatically renews annually unless you cancel. The discount on annual plans reflects the commitment
                  and reduces administrative overhead for both you and Kreatli. You can switch between monthly and
                  annual billing at any time, though the discount only applies when you're on an annual plan.
                </p>
                <p>
                  Annual billing is available for all paid plans (Creator, Team, and Enterprise), and you can upgrade or
                  downgrade even when on an annual plan. If you upgrade mid-year, you'll be charged a prorated amount
                  for the remainder of your annual billing cycle. This flexibility ensures annual billing works for
                  teams that want to save money while maintaining the ability to adjust their plan as needed.
                </p>
              </div>
            </AccordionItem>

            <AccordionItem
              key="team-changes"
              title={
                <span className="text-base font-semibold">
                  How does pricing work when I add or remove team members?
                </span>
              }
            >
              <div className="space-y-3 text-foreground-500">
                <p>
                  Kreatli's per-user pricing means your cost scales directly with your team size. When you add a team
                  member, you'll be charged for them starting in your next billing cycle. If you're on monthly billing,
                  you'll see the additional cost in your next monthly invoice. If you're on annual billing, you'll be
                  charged a prorated amount for the remainder of your annual cycle.
                </p>
                <p>
                  When you remove a team member, the cost reduction will be reflected in your next billing cycle. This
                  means you only pay for active team members, making it easy to adjust costs as your team grows or
                  changes. There are no penalties for adding or removing users, and you can make these changes as often
                  as needed through your account settings.
                </p>
                <p>
                  The pricing structure is straightforward: Creator plan is $7/user/month for teams up to 3 members, and
                  Team plan is $19/user/month for teams up to 10 members. If your team grows beyond 10 members, you'll
                  need to contact us for Enterprise pricing. This ensures pricing is fair and predictable based on your
                  team size and needs.
                </p>
              </div>
            </AccordionItem>

            <AccordionItem
              key="refunds"
              title={
                <span className="text-base font-semibold">
                  What is your refund policy, and can I get a refund if I'm not satisfied?
                </span>
              }
            >
              <div className="space-y-3 text-foreground-500">
                <p>
                  Kreatli offers a satisfaction guarantee for new paid subscriptions. If you're not satisfied with
                  Kreatli within the first 30 days of your paid plan, you can request a full refund. This gives you time
                  to evaluate the platform with your full team and see how it improves your video collaboration workflow.
                </p>
                <p>
                  After the initial 30-day period, refunds are handled on a case-by-case basis. Since Kreatli uses
                  monthly or annual billing, you can cancel at any time and won't be charged for future billing cycles.
                  If you cancel mid-cycle, you'll retain access until the end of your current billing period, so you're
                  not paying for time you're not using.
                </p>
                <p>
                  For annual plans, if you cancel mid-year, you'll retain access until the end of your annual billing
                  period. Refunds for unused portions of annual plans are evaluated on a case-by-case basis, typically
                  considering how much of the year has passed and the specific circumstances. Our support team can help
                  you understand your options if you need to cancel an annual plan early.
                </p>
              </div>
            </AccordionItem>
          </Accordion>

          <div className="mx-auto mt-8 flex max-w-3xl flex-col items-center gap-4 text-center">
            <h3 className="font-sans text-xl font-bold">Still Have Questions About Pricing?</h3>
            <p className="text-foreground-500">
              If you didn't find the answer you were looking for, feel free to contact our support team at{' '}
              <a href="mailto:support@kreatli.com" className="text-primary underline underline-offset-2">
                support@kreatli.com
              </a>{' '}
              for personalized pricing recommendations and plan selection guidance.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="overflow-hidden bg-foreground-50 px-6 py-16 lg:py-24">
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col gap-6 text-center">
          <h2 className="font-sans text-2xl font-bold sm:text-4xl">Ready to Get Started?</h2>
          <p className="mx-auto max-w-2xl text-lg text-foreground-500">
            Join video teams who have simplified their collaboration process. Start your 7-day free trial or book a
            demo to see how Kreatli works for your team.
          </p>
          <div className="mt-4 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button as={NextLink} href="/sign-up" size="lg" className="bg-foreground text-content1">
              Start Free Trial
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
