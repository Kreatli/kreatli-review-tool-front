import { Accordion, AccordionItem, Alert, Button, Card, CardBody } from '@heroui/react';
import Head from 'next/head';
import NextLink from 'next/link';

import { CostCalculatorSection } from '../components/home/CostCalculator';
import { FooterSection } from '../components/home/Footer/FooterSection';
import { Header } from '../components/layout/Header';
import { Decorations } from '../components/layout/Storyblok/Decorations';
import { Icon } from '../components/various/Icon';
import { useSession } from '../hooks/useSession';

export default function CostCalculatorPage() {
  useSession();

  return (
    <>
      <Head>
        <title>Kreatli | Cost Calculator – Creative Production Software Savings</title>
        <meta
          name="description"
          content="Discover how much you're overpaying for separate tools for creative production, media review and approval, and project management. Use our free cost calculator to compare your current stack with Kreatli's all-in-one platform."
        />
        <meta property="og:title" content="Kreatli | Cost Calculator – Creative Production Software Savings" />
        <meta
          property="og:description"
          content="Compare your current creative production and media review tool costs with Kreatli. See how much you can save by consolidating multiple tools into one platform."
        />
        <meta property="og:type" content="website" />
      </Head>
      <Header />
      <Decorations />
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 text-center">
          <h1 className="mx-auto mb-4 max-w-2xl font-sans text-2xl font-bold sm:text-4xl">
            How Much Are You Really Spending on Software?
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-foreground-500">
            Creative teams often use 5+ different tools for file sharing, production management, and media review and
            approval workflows. See how much you could save by consolidating with Kreatli's all-in-one creative
            production platform.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-6">
            <div className="flex flex-col items-center">
              <div className="font-sans text-2xl font-bold sm:text-4xl">60%+</div>
              <div className="sm:text-md mx-auto max-w-32 text-sm text-foreground-500">Average Savings</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="font-sans text-2xl font-bold sm:text-4xl">$10K+</div>
              <div className="sm:text-md mx-auto max-w-32 text-sm text-foreground-500">Annual Savings Potential</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="font-sans text-2xl font-bold sm:text-4xl">1 Tool</div>
              <div className="sm:text-md mx-auto max-w-32 text-sm text-foreground-500">Instead of 5+</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-4 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-4xl">Why Calculate Your Software Costs?</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Hidden costs add up quickly. Understanding your true software spend helps you make smarter decisions.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="dollar" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Hidden Costs Add Up</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Per-user pricing across multiple tools can cost thousands annually. Many teams don't realize their
                  total software spend until they calculate it.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="compare" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Consolidation Saves Money</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Using one platform instead of multiple tools reduces costs, simplifies billing, and eliminates
                  redundant features you're paying for twice.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="time" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Time is Money</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Switching between tools wastes time. A unified platform improves productivity and reduces context
                  switching, saving hours every week.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="shield" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Better Security</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Fewer tools mean fewer security risks. One platform with enterprise-grade security is easier to manage
                  and audit than multiple vendors.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="group" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Simplified Onboarding</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  New team members learn one tool instead of five. Faster onboarding means your team is productive
                  sooner.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-foreground-100 p-2">
                    <Icon icon="suitcase" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-semibold">Better ROI</h3>
                </div>
                <p className="text-sm text-foreground-500">
                  Get more value from a single platform designed for creative workflows than piecing together multiple
                  generic tools.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Real-World Scenarios Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-6 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-4xl">Real-World Cost Examples</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              See how typical tool combinations compare to Kreatli across different team sizes.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <Icon icon="user" size={24} className="text-primary" />
                  <h3 className="font-sans text-lg font-bold">Small Team (5 members)</h3>
                </div>
                <div className="flex flex-col gap-3">
                  <div>
                    <p className="mb-1 text-base">Typical Stack:</p>
                    <ul className="space-y-1 text-base text-foreground-500">
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
                    <p className="mb-1 text-base">Total Cost:</p>
                    <p className="font-sans text-2xl font-bold">$300/month</p>
                    <p className="text-base text-foreground-500">$3,600/year</p>
                  </div>
                  <div className="border-t border-foreground-200 pt-3">
                    <p className="mb-1 text-base">With Kreatli:</p>
                    <p className="font-sans text-2xl font-bold">$95/month</p>
                    <p className="text-base text-foreground-500">$1,140/year</p>
                    <p className="text-xs text-foreground-400">Team plan ($19/user)</p>
                  </div>
                  <Alert className="mt-2" color="success" icon={<Icon icon="dollar" />}>
                    <span>
                      Save <span className="font-bold">$205</span>/month ($2,460/year)
                    </span>
                  </Alert>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <Icon icon="group" size={24} className="text-primary" />
                  <h3 className="font-sans text-lg font-bold">Medium Team (15 members)</h3>
                </div>
                <div className="flex flex-col gap-3">
                  <div>
                    <p className="mb-1 text-base">Typical Stack:</p>
                    <ul className="space-y-1 text-base text-foreground-500">
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
                    <p className="mb-1 text-base">Total Cost:</p>
                    <p className="font-sans text-2xl font-bold">$1,270/month</p>
                    <p className="text-base text-foreground-500">$15,240/year</p>
                  </div>
                  <div className="border-t border-foreground-200 pt-3">
                    <p className="mb-1 text-base">With Kreatli:</p>
                    <p className="font-sans text-2xl font-bold">$285/month</p>
                    <p className="text-base">$3,420/year</p>
                    <p className="text-xs text-foreground-400">Team plan ($19/user)</p>
                  </div>
                  <Alert className="mt-2" color="success" icon={<Icon icon="dollar" />}>
                    <span>
                      Save <span className="font-bold">$985</span>/month ($11,820/year)
                    </span>
                  </Alert>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <Icon icon="building" size={24} className="text-primary" />
                  <h3 className="font-sans text-lg font-bold">Large Team (50 members)</h3>
                </div>
                <div className="flex flex-col gap-3">
                  <div>
                    <p className="mb-1 text-base">Typical Stack:</p>
                    <ul className="space-y-1 text-base text-foreground-500">
                      <li>• Dropbox ($1,150/mo)</li>
                      <li>• Google Workspace ($750/mo)</li>
                      <li>• Asana ($1,600/mo)</li>
                      <li>• Frame.io ($2,500/mo)</li>
                      <li>• Monday.com ($1,350/mo)</li>
                    </ul>
                  </div>
                  <div className="border-t border-foreground-200 pt-3">
                    <p className="mb-1 text-base">Total Cost:</p>
                    <p className="font-sans text-2xl font-bold">$7,350/month</p>
                    <p className="text-base text-foreground-500">$88,200/year</p>
                  </div>
                  <div className="border-t border-foreground-200 pt-3">
                    <p className="mb-1 text-base">With Kreatli:</p>
                    <p className="font-sans text-2xl font-bold">$1,000/month</p>
                    <p className="text-base">$12,000/year</p>
                    <p className="text-xs text-foreground-400">
                      Enterprise plan (estimate - contact for custom pricing)
                    </p>
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
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-4xl">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              Get detailed answers about calculating software costs, tool consolidation, and how Kreatli can reduce your
              expenses.
            </p>
          </div>

          <Accordion variant="splitted">
            <AccordionItem
              key="accuracy"
              title={
                <span className="text-base font-semibold">
                  How accurate is the cost calculator, and what factors affect the results?
                </span>
              }
            >
              <div className="space-y-3 text-foreground-500">
                <p>
                  The cost calculator uses current list pricing for each tool based on publicly available pricing
                  information. The calculations are based on standard per-user pricing models and typical team sizes,
                  which provides a solid baseline for understanding potential software costs.
                </p>
                <p>
                  Your actual costs may vary based on several factors: discounts from annual contracts (typically 10-20%
                  off), volume discounts for large teams, custom enterprise pricing, or special promotional rates. Some
                  tools also charge additional fees for storage, advanced features, or add-ons that aren't included in
                  base pricing.
                </p>
                <p>
                  However, the calculator provides a realistic estimate of potential savings by showing the true cost of
                  using multiple tools versus consolidating with Kreatli. Even if you have some discounts, the savings
                  from tool consolidation are typically substantial because you're eliminating redundant features and
                  reducing the number of vendor relationships to manage. The calculator helps you understand the
                  magnitude of potential savings in your creative production management workflow.
                </p>
              </div>
            </AccordionItem>

            <AccordionItem
              key="replace-tools"
              title={
                <span className="text-base font-semibold">
                  Does Kreatli really replace all these tools, and what features does it include?
                </span>
              }
            >
              <div className="space-y-3 text-foreground-500">
                <p>
                  Depending on your current needs, Kreatli can serve as an end-to-end creative production management
                  platform that replaces multiple tools. Kreatli combines file storage (like Google Drive or Dropbox),
                  project management (like Asana or Monday.com), and media review and approval workflows (like Frame.io
                  or Filestage) into one unified platform.
                </p>
                <p>
                  You get frame-accurate video comments for precise feedback, asset-linked conversations that keep
                  discussions tied to specific files, comprehensive project organization with folders and status
                  tracking, and secure file sharing with guest review links. The platform also includes real-time
                  collaboration, version history, side-by-side file comparison for creative proofing, and cloud storage
                  integrations with Google Drive and Dropbox.
                </p>
                <p>
                  While Kreatli may not replace every specialized tool in your stack, it covers the core functions that
                  most creative teams need: file management, project tracking, media review and approval, and team
                  collaboration. This consolidation eliminates the need for 3-5 separate tools, significantly reducing
                  costs while improving workflow efficiency in your creative production management process.
                </p>
              </div>
            </AccordionItem>

            <AccordionItem
              key="hidden-costs"
              title={
                <span className="text-base font-semibold">
                  What hidden costs should I consider when calculating software expenses?
                </span>
              }
            >
              <div className="space-y-3 text-foreground-500">
                <p>
                  Beyond the base subscription costs shown in calculators, there are several hidden expenses that add up
                  quickly. Per-user pricing means costs scale linearly with team growth - adding just 5 team members can
                  increase costs by $500-1,000 per month across multiple tools. Storage overage fees are common when
                  projects exceed included limits, and these can add hundreds of dollars monthly for teams working with
                  large video files or high-resolution images.
                </p>
                <p>
                  Additional costs include add-on features and premium tiers needed for advanced functionality, training
                  time for team members to learn multiple tools, integration costs to connect disparate platforms, and
                  the productivity loss from context switching between tools. Support and maintenance overhead increases
                  with each additional vendor relationship you manage.
                </p>
                <p>
                  When consolidating with Kreatli, you eliminate many of these hidden costs. The platform includes
                  generous storage limits, all core features in base pricing, and integrated workflows that reduce
                  training needs. By using one platform for creative production management instead of multiple tools,
                  you also reduce administrative overhead and simplify vendor management, which saves both time and
                  money beyond just subscription costs.
                </p>
              </div>
            </AccordionItem>

            <AccordionItem
              key="specific-features"
              title={
                <span className="text-base font-semibold">
                  What if I need specific features that aren't in Kreatli?
                </span>
              }
            >
              <div className="space-y-3 text-foreground-500">
                <p>
                  Kreatli is designed specifically for creative workflows and includes the features most teams need for
                  creative production management, media review and approval, and team collaboration. However, if you
                  have specialized requirements for specific tools, you can still use those tools alongside Kreatli
                  while consolidating the majority of your software stack.
                </p>
                <p>
                  Many teams use Kreatli as their primary platform for file management, project tracking, and review
                  workflows, while keeping one or two specialized tools for very specific needs. For example, you might
                  keep a specialized video editing tool or a niche design software while using Kreatli for everything
                  else. This hybrid approach still provides significant cost savings - you're reducing from 5-7 tools
                  down to 2-3 tools instead of one.
                </p>
                <p>
                  The key is identifying which tools are truly essential for specialized workflows versus which are
                  duplicating functionality you can get from Kreatli. Most creative teams find that 60-80% of their tool
                  stack can be replaced by Kreatli, resulting in substantial savings even if they keep a few specialized
                  tools. Our team can help you evaluate which tools are truly necessary and which can be consolidated.
                </p>
              </div>
            </AccordionItem>

            <AccordionItem
              key="pricing"
              title={
                <span className="text-base font-semibold">
                  How does Kreatli pricing work, and are there any hidden fees?
                </span>
              }
            >
              <div className="space-y-3 text-foreground-500">
                <p>
                  Kreatli uses simple, transparent per-user pricing with no hidden fees. The Creator plan is $7 per user
                  per month for teams up to 3 members. The Team plan is $19 per user per month for teams up to 10
                  members. Enterprise plans have custom pricing based on your organization's needs. All plans include
                  all core features: unlimited projects, file storage, frame-accurate video review, media review and
                  approval workflows, project management, team collaboration, guest review links, and cloud storage
                  integrations.
                </p>
                <p>
                  Unlike many tools that charge extra for storage, advanced features, or add-ons, Kreatli includes
                  everything in the base price. There are no per-project fees, no storage overage charges, no premium
                  feature tiers, and no setup fees. You pay only for active users, making it easy to scale up or down
                  based on your team size.
                </p>
                <p>
                  The transparent pricing model means you can accurately calculate your costs without worrying about
                  surprise fees. Annual billing is available with a discount, and you can upgrade or downgrade your plan
                  at any time. This simplicity contrasts with managing multiple tools where pricing can vary
                  significantly based on features, storage, and user counts, making it difficult to predict total costs
                  for your creative production management needs.
                </p>
              </div>
            </AccordionItem>

            <AccordionItem
              key="roi"
              title={
                <span className="text-base font-semibold">
                  What's the return on investment (ROI) of consolidating tools with Kreatli?
                </span>
              }
            >
              <div className="space-y-3 text-foreground-500">
                <p>
                  The ROI of consolidating tools with Kreatli comes from both direct cost savings and productivity
                  improvements. Direct savings typically range from 40-70% compared to using multiple tools, depending
                  on your current stack. For a team of 15 people, savings often exceed $10,000 annually just from
                  subscription cost reductions.
                </p>
                <p>
                  Beyond subscription savings, productivity gains contribute significantly to ROI. Teams save 5-10 hours
                  per week by eliminating tool-switching and context loss. Faster onboarding for new team members (one
                  tool instead of five), reduced time searching for files across platforms, and streamlined review and
                  approval workflows all improve efficiency. These time savings translate to thousands of dollars in
                  additional value annually.
                </p>
                <p>
                  Additional ROI factors include reduced training costs (one platform to learn), lower administrative
                  overhead (fewer vendor relationships), improved collaboration (everything in one place), and better
                  project visibility (unified dashboard). Most teams see a positive ROI within 2-3 months of switching
                  to Kreatli, with ongoing benefits that compound over time as your team becomes more efficient with the
                  unified creative production management platform.
                </p>
              </div>
            </AccordionItem>

            <AccordionItem
              key="try-before-switching"
              title={
                <span className="text-base font-semibold">
                  Can I try Kreatli before switching, and what support is available during transition?
                </span>
              }
            >
              <div className="space-y-3 text-foreground-500">
                <p>
                  Absolutely! All Kreatli plans include a 7-day free trial, giving you full access to all features of
                  your chosen plan. When you sign up, you'll choose a plan (Creator, Team, or Enterprise) and
                  immediately start your trial. The Creator plan includes unlimited projects, up to 3 members, and 500GB
                  storage. There's no credit card required, allowing you to test the platform with real projects and see
                  how it improves your creative production management.
                </p>
                <p>
                  After your 7-day trial ends, you'll need to select a paid plan to continue using the platform. You can
                  also book a personalized demo to see how Kreatli would work for your specific workflow, review your
                  current tool usage, and get recommendations on consolidation strategies.
                </p>
                <p>
                  During the transition, our team provides migration assistance to help you move files and projects to
                  Kreatli. We help with bulk uploads, project organization, setting up your team structure, and ensuring
                  nothing gets lost in the transition. We also provide training resources and support to help your team
                  get up to speed quickly, minimizing disruption to your creative production workflow during the switch.
                </p>
              </div>
            </AccordionItem>

            <AccordionItem
              key="data-migration"
              title={
                <span className="text-base font-semibold">
                  What about data migration, and how long does it take to switch to Kreatli?
                </span>
              }
            >
              <div className="space-y-3 text-foreground-500">
                <p>
                  We provide comprehensive migration assistance to help you move your files, projects, and team
                  structure to Kreatli. Our team can help with bulk file uploads from your existing storage solutions,
                  organizing projects and folders to match your current structure, and setting up your team with
                  appropriate access levels. We ensure nothing gets lost in the transition.
                </p>
                <p>
                  Migration time varies based on the size of your team and volume of files, but most teams can complete
                  the transition within 1-2 weeks. The process typically involves: exporting files from current tools,
                  uploading to Kreatli (we can help with bulk operations), organizing into projects and folders,
                  inviting team members and setting permissions, and training your team on Kreatli's features. We
                  provide step-by-step guidance throughout the process.
                </p>
                <p>
                  You can run Kreatli alongside your existing tools during the transition period, allowing your team to
                  gradually migrate projects and get comfortable with the platform. This parallel approach minimizes
                  disruption to your creative production workflow. Once you're confident in Kreatli, you can cancel
                  subscriptions to old tools. We also provide ongoing support to help optimize your workflow and ensure
                  you're getting maximum value from the platform.
                </p>
              </div>
            </AccordionItem>

            <AccordionItem
              key="scaling"
              title={
                <span className="text-base font-semibold">
                  How does Kreatli pricing scale as my team grows, compared to multiple tools?
                </span>
              }
            >
              <div className="space-y-3 text-foreground-500">
                <p>
                  Kreatli's pricing scales predictably with your team size. The Creator plan is $7 per user per month
                  for teams up to 3 members. The Team plan is $19 per user per month for teams up to 10 members. For
                  larger teams, Enterprise plans offer custom pricing. This simple model means you can easily calculate
                  costs as you grow, and there are no surprise fees when adding team members.
                </p>
                <p>
                  In contrast, multiple tools often have complex pricing that scales unpredictably. Some tools charge
                  per user, others have tiered pricing with feature limitations, and many add storage or usage fees as
                  you grow. When you're using 5+ tools, each with different pricing models, costs can spiral out of
                  control as your team expands. A team of 10 might pay $500/month across tools, but growing to 20
                  members could cost $1,500+/month due to per-user pricing across multiple platforms.
                </p>
                <p>
                  With Kreatli, you can choose the plan that fits your team size. The Team plan at $19/user/month for up
                  to 10 members provides predictable costs. For larger teams, Enterprise plans offer custom pricing
                  tailored to your needs. You also get all features at every scale, so there's no need to upgrade to
                  premium tiers or add expensive add-ons as you grow. This predictable scaling makes budgeting easier
                  and ensures your creative production management costs remain manageable as your team expands.
                </p>
              </div>
            </AccordionItem>

            <AccordionItem
              key="comparison"
              title={
                <span className="text-base font-semibold">
                  How do the real-world cost examples in the calculator compare to actual team scenarios?
                </span>
              }
            >
              <div className="space-y-3 text-foreground-500">
                <p>
                  The real-world cost examples shown in the calculator are based on typical tool combinations we see
                  from creative teams. The small team example (5 members) using Google Drive, Frame.io, and WeTransfer
                  is a common stack for video production teams. The medium team example (15 members) with Dropbox,
                  Google Workspace, Monday.com, and Filestage represents typical agency setups. The large team example
                  (50 members) shows enterprise-level tool combinations.
                </p>
                <p>
                  These examples use standard list pricing, so your actual costs may vary if you have discounts or
                  custom pricing. However, the examples accurately represent the cost structure most teams face:
                  per-user pricing that multiplies across team size, multiple subscriptions adding up quickly, and the
                  reality that most teams need 4-6 different tools to cover all their creative production management
                  needs.
                </p>
                <p>
                  The savings shown are realistic because Kreatli consolidates multiple tool functions into one platform
                  at a lower total cost. Even if you have some discounts on current tools, consolidating to Kreatli
                  typically saves 40-70% because you're eliminating redundant features, reducing vendor relationships,
                  and getting better value from an integrated platform designed specifically for creative workflows. The
                  examples help illustrate that tool consolidation isn't just about convenience - it's a significant
                  cost savings opportunity.
                </p>
              </div>
            </AccordionItem>
          </Accordion>

          <div className="mx-auto mt-8 flex max-w-3xl flex-col items-center gap-4 text-center">
            <h3 className="font-sans text-xl font-bold">Still Have Questions About Costs?</h3>
            <p className="text-foreground-500">
              If you didn't find the answer you were looking for, feel free to contact our support team at{' '}
              <a href="mailto:support@kreatli.com" className="text-primary underline underline-offset-2">
                support@kreatli.com
              </a>{' '}
              for personalized cost analysis and recommendations for your team.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="overflow-hidden bg-foreground-50 px-6 py-16 lg:py-24">
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col gap-3 text-center">
          <h2 className="mx-auto max-w-xl font-sans text-2xl font-bold sm:text-4xl">
            Ready to Start Saving on Software Costs?
          </h2>
          <p className="mx-auto max-w-xl text-lg text-foreground-500">
            Join teams that have consolidated their tools and reduced costs by 60% or more. Get started with Kreatli
            today.
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
