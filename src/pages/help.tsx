import Head from 'next/head';
import React, { useState, useMemo } from 'react';

import { Header } from '../components/layout/Header';
import { FooterSection } from '../components/home/Footer/FooterSection';
import { useSession } from '../hooks/useSession';
import { Decorations } from '../components/layout/Storyblok/Decorations';
import { Accordion, AccordionItem, Input, Card, CardBody, Tabs, Tab, Chip, Button } from '@heroui/react';
import { Icon } from '../components/various/Icon';

interface FAQItem {
  key: string;
  question: string;
  answer: string;
  category: string;
}

interface CategoryConfig {
  name: string;
  icon: string;
  color: string;
}

const faqs: FAQItem[] = [
  // Features Category
  {
    key: 'frame-accurate',
    category: 'Features',
    question: 'How does frame-accurate video review and approval work in Kreatli?',
    answer:
      'Kreatli\'s frame-accurate review feature allows you to pin comments, annotations, and feedback to exact frames and timestamps in video files. When reviewing a video, you can click on any specific frame to add a comment that\'s permanently linked to that moment in the timeline. This eliminates confusion about which clip or scene you\'re referring to.\n\nThe system supports frame-accurate revisions for video files, meaning reviewers can provide precise feedback like "change the color at 00:02:15" or "add transition between frames 1,234-1,236." This level of precision is essential for video production teams who need to communicate exact edit points without ambiguity.\n\nAll frame-accurate comments are integrated into your review and approval workflow, allowing editors to see exactly where changes are needed and mark revisions as complete once addressed. This streamlines the creative production management process by reducing back-and-forth communication.',
  },
  {
    key: 'review-workflow',
    category: 'Features',
    question: 'What is a media review and approval workflow, and how does Kreatli handle it?',
    answer:
      "A media review and approval workflow is the process creative teams use to review, provide feedback, and get final approval on creative assets like videos, images, and designs. Kreatli streamlines this entire process in one platform.\n\nIn Kreatli, the review workflow works like this: First, you upload your media files to a project. Then, you can invite team members, clients, or stakeholders to review the files. Reviewers can add comments, annotations, and feedback directly on the media. The system tracks all feedback and allows project managers to see the approval status of each asset.\n\nThe platform supports both internal team reviews and client approval processes. You can set up guest review links that don't require signups, making it easy for clients to participate in the approval workflow. All comments and approvals are tracked, so you always know the status of each deliverable in your creative production management pipeline.",
  },
  {
    key: 'version-comparison',
    category: 'Features',
    question: 'How does the side-by-side version comparison feature work?',
    answer:
      "Kreatli's version comparison feature allows you to view different versions of the same file side-by-side in a split-screen interface. This is particularly useful for creative proofing, as you can instantly spot changes between versions and provide precise feedback on what's different.\n\nThe comparison tool works for videos, images, and design files. For videos, you can compare different cuts or edits frame-by-frame. For images and designs, you can see pixel-level differences between versions. This helps reviewers quickly identify what changed and provide accurate feedback in your review workflow.\n\nWhen comparing versions, you can add comments that reference specific differences, making it clear to creators what needs to be adjusted. This feature is integrated with the approval workflow, so you can approve or request changes directly from the comparison view, streamlining your creative production management process.",
  },
  {
    key: 'file-organization',
    category: 'Features',
    question: 'How does Kreatli organize and manage creative files and assets?',
    answer:
      "Kreatli provides smart file organization that's specifically designed for creative production workflows. Files can be organized by project, status, file type, size, and custom tags. The platform supports filtering and search functionality to help you quickly find any asset, even in large projects with hundreds of files.\n\nThe system maintains comprehensive version history for all files, so you can track changes over time and revert to previous versions if needed. Files are automatically organized within project folders, and you can create custom folder structures that match your team's workflow.\n\nUnlike basic file storage solutions, Kreatli's file organization is integrated with review workflows, project management, and collaboration features. This means files are always connected to their associated projects, conversations, and approval status, making it easy to see the full context of any asset in your creative production management system.",
  },
  {
    key: 'collaboration',
    category: 'Features',
    question: "How does team collaboration work in Kreatli's creative production platform?",
    answer:
      'Kreatli enables collaboration through multiple integrated features. Project-tied chats keep all conversations organized by project, so team discussions stay with the relevant work. Asset-linked comments ensure feedback is always connected to the specific file being discussed, eliminating confusion about which asset a comment refers to.\n\nThe platform supports real-time collaboration where multiple team members can review and comment on the same file simultaneously. Guest review links allow clients and external collaborators to participate in the review and approval process without requiring accounts, making it easy to include stakeholders in your creative workflow.\n\nAll collaboration happens within the context of your creative production management system, so conversations, feedback, and approvals are all tracked and visible to the team. This reduces tool-switching and keeps everything in one place, from initial planning through final delivery.',
  },
  {
    key: 'guest-reviews',
    category: 'Features',
    question: 'Can clients and external reviewers use Kreatli without creating an account?',
    answer:
      "Yes, Kreatli supports no-signup guest reviews through secure shareable links. You can generate a review link for any file or project and share it with clients, stakeholders, or external collaborators. They can access the review interface, add comments, and participate in the approval workflow without needing to create an account.\n\nGuest review links can be password-protected for additional security, and you can set expiration dates and access controls. This makes it easy to include clients in your media review and approval process while maintaining control over who can access your creative assets.\n\nExternal reviewers see a clean, branded interface focused on reviewing and providing feedback. They can add comments, annotations, and approvals just like team members, but without the complexity of project management features they don't need. This streamlined experience improves client participation in your creative production workflow.",
  },
  {
    key: 'notifications',
    category: 'Features',
    question: "How do real-time notifications work in Kreatli's creative production platform?",
    answer:
      "Kreatli provides real-time notifications for important events in your creative workflow, including new comments, approval requests, project updates, and file uploads. These notifications help team members stay in sync without constantly checking the platform.\n\nNotifications are contextual and linked to specific assets and projects, so you can quickly understand what needs your attention. When someone adds a comment on a video you're working on, requests approval for a design, or uploads a new version, you'll be notified immediately.\n\nThe notification system is integrated with the review and approval workflow, ensuring that approvals and feedback requests don't get missed. This keeps your creative production management process moving forward efficiently, as team members and clients are promptly notified when their input is needed in the media review and approval process.",
  },
  // Pricing Category
  {
    key: 'pricing-structure',
    category: 'Pricing',
    question: "How does Kreatli's per-user pricing work, and are there any hidden fees?",
    answer:
      "Kreatli uses simple, transparent per-user pricing with no hidden fees. For teams up to 5 members, the cost is $15 per user per month. For larger teams (6+ members), the pricing is $20 per user per month. This pricing includes all core features: unlimited projects, file storage, frame-accurate video review, media review and approval workflows, project management, team collaboration, guest review links, and cloud storage integrations.\n\nUnlike many tools that charge extra for storage, advanced features, or add-ons, Kreatli includes everything in the base price. There are no per-project fees, no storage overage charges, no premium feature tiers, and no setup fees. You pay only for active users, making it easy to scale up or down based on your team size. This transparent pricing model means you can accurately calculate your costs without worrying about surprise fees.\n\nThe per-user pricing model is straightforward: you're charged based on the number of active team members in your account. If you add a team member, you'll be charged for them in your next billing cycle. If you remove a team member, you'll see the cost reduction in your next billing cycle. This simplicity contrasts with complex pricing models that vary based on features, storage, or usage, making it difficult to predict total costs for your creative production management needs.",
  },
  {
    key: 'change-plans',
    category: 'Pricing',
    question: 'Can I change plans later, and how does billing work when I upgrade or downgrade?',
    answer:
      "Yes! You can upgrade or downgrade your plan at any time to match your evolving needs. If you need more projects, users, or features, you can upgrade your plan immediately and gain access to the additional capabilities right away. If you find you're not using all the features of your current plan, you can downgrade to a more cost-effective option.\n\nWhen you upgrade, you'll be charged a prorated amount for the remainder of your current billing cycle, and then the new plan price will apply going forward. When you downgrade, the changes will take effect at the start of your next billing cycle, giving you time to adjust your usage. This flexibility ensures you're only paying for what you need while having the option to scale up when your creative production management requirements grow.\n\nAll plan changes are handled through your account settings, and you'll receive email confirmation of any changes. There are no fees for changing plans, and you can switch as often as needed. This makes it easy to adapt your Kreatli subscription to match your team's current size and needs without being locked into a plan that doesn't fit.",
  },
  {
    key: 'free-trial',
    category: 'Pricing',
    question: "Is there a free trial, and what's included in the Free plan?",
    answer:
      "Kreatli offers a Free Plan that's available forever with no credit card required. This isn't a limited trial - it's a full-featured plan that you can use indefinitely. The Free Plan includes 2 projects with up to 2 users, giving you the opportunity to test the platform with real projects and see how it improves your creative production management.\n\nThe Free Plan includes all core features: frame-accurate video review, media review and approval workflows, file organization, team collaboration, guest review links, cloud storage integrations, and project management. This means you can fully evaluate how Kreatli compares to your current tool stack before making any financial commitment. You get the complete experience, not a watered-down version designed to push you toward paid plans.\n\nMany teams start with the Free Plan to onboard their team, run a pilot project, and see the value in consolidating their creative production tools. When you're ready for more projects, users, or storage, you can upgrade to a paid plan. There's no pressure to upgrade - you can use the Free Plan as long as it meets your needs, making it a risk-free way to experience Kreatli's creative production management platform.",
  },
  {
    key: 'plan-selection',
    category: 'Pricing',
    question: 'How do I choose the right plan for my team size and needs?',
    answer:
      "Choosing the right plan depends on your team size and the number of projects you need to manage. The Free Plan is perfect for individuals or very small teams getting started - it includes 2 projects with up to 2 users, making it ideal for testing the platform or managing a couple of small projects.\n\nThe Pro Plan ($15/user/month for teams up to 5 members) is ideal for small to medium creative teams that need to manage up to 10 projects with up to 5 users. This plan works well for micro-teams, freelance teams, and small agencies that need more capacity than the Free Plan but don't require unlimited projects or users.\n\nThe Advanced Plan ($20/user/month for teams of 6+ members) provides unlimited projects and users, making it suitable for larger agencies, post-production houses, and creative teams that need to manage multiple client projects simultaneously. If you're unsure which plan is right for your team, you can start with the Free Plan and upgrade as your needs grow. Our support team can also help you evaluate which plan best fits your creative production management requirements.",
  },
  // Who We Help Category
  {
    key: 'video-creators',
    category: 'Who We Help',
    question: 'How does Kreatli help independent video creators and YouTubers?',
    answer:
      "Kreatli is designed specifically for video creators who need to manage multiple projects, collaborate with editors, and get client feedback efficiently. The platform's frame-accurate review feature allows you to pin comments to exact frames and timestamps in your videos, eliminating the \"which clip?\" confusion that plagues video production workflows.\n\nFor YouTubers managing multiple series or channels, Kreatli provides project organization that keeps everything in one place. You can organize videos by series, client, or project type, making it easy to track what's in production, what needs review, and what's been approved. The platform's media review and approval workflows streamline client feedback for sponsored content and brand partnerships.\n\nCollaboration with freelance video editors becomes seamless with Kreatli's asset-linked conversations and guest review links. Editors can access projects, add frame-accurate feedback, and share revisions without needing accounts. This eliminates the back-and-forth email chains and file sharing headaches that slow down video production workflows, making your creative production management much more efficient.",
  },
  {
    key: 'micro-teams',
    category: 'Who We Help',
    question: 'What makes Kreatli ideal for micro-teams working with external clients?',
    answer:
      "Micro-teams (typically 2-10 people) working with external clients face unique challenges: managing multiple client projects simultaneously, keeping client communications organized, and tracking deliverables without overwhelming clients with complex tools. Kreatli addresses these challenges with dedicated project spaces for each client and streamlined client collaboration features.\n\nThe platform's no-signup guest review links are perfect for client collaboration. Clients can review files, add comments, and approve deliverables without creating accounts or learning new software. This reduces friction in the review and approval process while keeping all feedback organized in one place. Project-tied conversations ensure all client communications stay with the relevant project, eliminating lost feedback in email threads.\n\nKreatli's project organization features help micro-teams track status and deliverables across multiple client projects. You can see at a glance which projects are in review, which need attention, and which are complete. This visibility is crucial for small teams juggling multiple clients and ensures nothing falls through the cracks in your creative production management workflow.",
  },
  {
    key: 'agencies',
    category: 'Who We Help',
    question: 'How do creative agencies and post-production boutiques benefit from Kreatli?',
    answer:
      "Creative agencies and post-production boutiques need to scale their operations while maintaining quality and managing complex projects with multiple stakeholders. Kreatli provides unlimited projects and team members at scale, making it suitable for agencies handling dozens of client projects simultaneously. The platform's advanced review tools support professional workflows with frame-accurate feedback, version control, and comprehensive approval processes.\n\nFor agencies coordinating feedback from multiple stakeholders (clients, account managers, creative directors, producers), Kreatli's media review and approval workflows keep everyone aligned. All feedback is organized by asset and project, making it easy to track what needs attention and ensuring nothing gets missed. Enterprise-grade security and access controls protect high-value creative assets while allowing appropriate access for different team members and clients.\n\nPost-production houses managing film and TV projects benefit from Kreatli's version control and project organization features. The platform handles large-scale projects with hundreds of files, multiple versions, and complex approval chains. Comprehensive project analytics and reporting help agencies track timelines, resource allocation, and project health across their entire portfolio, improving their creative production management at scale.",
  },
  // Getting Started Category
  {
    key: 'getting-started',
    category: 'Getting Started',
    question: 'How do different types of creative professionals get started with Kreatli?',
    answer:
      "Getting started with Kreatli is straightforward for all types of creative professionals. The platform offers a Free Plan with full access to all features (2 projects, 2 users), allowing you to test the platform with real projects before committing. There's no credit card required, so you can evaluate how Kreatli fits into your workflow risk-free.\n\nFor video creators, getting started typically involves uploading a few video projects, setting up guest review links for clients, and inviting editors to collaborate. The frame-accurate review features work immediately, and you can start organizing projects right away. Micro-teams usually begin by creating projects for their current clients and migrating files from existing storage solutions.\n\nAgencies and larger teams often start with a demo to see how Kreatli would work for their specific workflow, then run a pilot project with one client or team before rolling out more broadly. We provide migration assistance to help move files and projects, and our team can help set up your team structure and workflows. Training resources and support ensure your team gets up to speed quickly, minimizing disruption to your creative production management process.",
  },
  {
    key: 'team-size',
    category: 'Getting Started',
    question: 'What team sizes is Kreatli best suited for, and does it scale?',
    answer:
      "Kreatli works well for teams of all sizes, from solo creators to large agencies. Solo video creators and freelancers benefit from the platform's organization and client collaboration features. Small teams (2-10 people) find value in consolidating multiple tools into one platform for creative production management. Medium teams (10-50 people) appreciate the scalability and collaboration features.\n\nFor large teams and agencies (50+ people), Kreatli provides unlimited projects and team members, enterprise-grade security, advanced access controls, and comprehensive project analytics. The platform scales from managing a few projects to hundreds of simultaneous projects across multiple clients and departments.\n\nThe key advantage is that Kreatli's features work consistently regardless of team size. A solo creator gets the same frame-accurate review capabilities as a large agency, and a small team gets the same project organization features as enterprise clients. This means teams can start small and scale without outgrowing the platform or needing to migrate to different tools as they grow.",
  },
  // Integrations Category
  {
    key: 'integrations',
    category: 'Integrations',
    question: 'What cloud storage and integration options does Kreatli support?',
    answer:
      "Kreatli integrates with popular cloud storage services including Google Drive and Dropbox. You can connect your existing cloud storage accounts and either upload files directly to Kreatli or sync existing files from your cloud storage.\n\nThis integration means you don't have to abandon your existing file storage solutions. You can continue using Google Drive or Dropbox for general file storage while leveraging Kreatli's specialized features for creative production management, media review, and approval workflows.\n\nThe platform also supports direct file uploads, so you can work entirely within Kreatli if preferred. Whether you're syncing from cloud storage or uploading directly, all files benefit from Kreatli's organization, review, and collaboration features that are specifically designed for creative workflows.",
  },
  // Security Category
  {
    key: 'security',
    category: 'Security',
    question: 'What security features does Kreatli offer for creative production files?',
    answer:
      'Kreatli provides enterprise-level security features designed for sensitive creative work. All files are encrypted both in transit and at rest, ensuring your creative assets are protected. The platform supports secure file sharing with password-protected links and access controls.\n\nYou can set granular permissions for team members, controlling who can view, comment, approve, or download files. Guest review links can be configured with expiration dates and access restrictions, giving you control over external collaboration while maintaining security.\n\nThe platform is compliance-ready and designed to meet security standards required for handling confidential creative work, client materials, and proprietary content. This makes it suitable for agencies and production companies that need to protect sensitive creative assets throughout the media review and approval process.',
  },
];

const categories = ['Features', 'Pricing', 'Who We Help', 'Getting Started', 'Integrations', 'Security'];

const categoryConfig: Record<string, CategoryConfig> = {
  Features: { name: 'Features', icon: 'star', color: 'primary' },
  Pricing: { name: 'Pricing', icon: 'dollar', color: 'success' },
  'Who We Help': { name: 'Who We Help', icon: 'group', color: 'warning' },
  'Getting Started': { name: 'Getting Started', icon: 'play', color: 'primary' },
  Integrations: { name: 'Integrations', icon: 'link', color: 'secondary' },
  Security: { name: 'Security', icon: 'shield', color: 'danger' },
};

// Popular/featured FAQs for quick access
const popularFaqKeys = ['getting-started', 'free-trial', 'pricing-structure', 'frame-accurate', 'review-workflow'];

export default function HelpPage() {
  useSession();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query) ||
        faq.category.toLowerCase().includes(query)
      );
    });
  }, [searchQuery]);

  const faqsByCategory = useMemo(() => {
    const categoryMap = categories.map((category) => ({
      category,
      faqs: filteredFaqs.filter((faq) => faq.category === category),
      config: categoryConfig[category],
    }));

    // Add "All" category
    return [
      {
        category: 'all',
        faqs: filteredFaqs,
        config: { name: 'All', icon: 'list', color: 'default' },
      },
      ...categoryMap,
    ];
  }, [filteredFaqs]);

  const displayedCategory = faqsByCategory.find((cat) => cat.category === selectedCategory) || faqsByCategory[0];
  const popularFaqs = filteredFaqs.filter((faq) => popularFaqKeys.includes(faq.key));

  return (
    <>
      <Head>
        <title>Kreatli | Help Center – FAQs and Support Resources</title>
        <meta
          name="description"
          content="Find answers to frequently asked questions about Kreatli's creative production platform, features, pricing, integrations, and more. Get help with your creative workflow."
        />
        <meta property="og:title" content="Kreatli | Help Center – FAQs and Support Resources" />
        <meta
          property="og:description"
          content="Comprehensive help center with FAQs about Kreatli's features, pricing, integrations, and creative production management platform."
        />
      </Head>
      <Header />
      <Decorations />
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 text-center">
          <h1 className="mx-auto max-w-lg font-sans text-2xl font-bold sm:text-4xl">Help Center</h1>
          <p className="mx-auto max-w-2xl text-lg text-foreground-500">
            Find answers to frequently asked questions about Kreatli's creative production platform, features, pricing,
            and more.
          </p>
          <div className="mx-auto mt-6 w-full max-w-2xl">
            <Input
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              startContent={<Icon icon="search" size={20} className="text-foreground-500" />}
              size="lg"
              variant="bordered"
              classNames={{
                input: 'text-base',
                inputWrapper:
                  'bg-content1 border-foreground-300 shadow-sm hover:border-foreground-400 focus-within:border-primary',
              }}
            />
            {searchQuery && (
              <div className="mt-2 text-sm text-foreground-500">
                Found {filteredFaqs.length} {filteredFaqs.length === 1 ? 'result' : 'results'}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Popular Questions Section */}
      {!searchQuery && popularFaqs.length > 0 && (
        <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
          <div className="relative z-10 mx-auto max-w-6xl">
            <div className="mb-8 text-center">
              <h2 className="mb-4 font-sans text-2xl font-bold sm:text-4xl">Popular Questions</h2>
              <p className="mx-auto max-w-2xl text-lg text-foreground-500">
                Quick answers to the most common questions
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {popularFaqs.slice(0, 4).map((faq) => (
                <Card
                  key={faq.key}
                  isPressable
                  isHoverable
                  onPress={() => {
                    setSelectedCategory(faq.category);
                    setSearchQuery('');
                    const element = document.getElementById('browse-by-category');
                    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  <CardBody className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 rounded-full bg-foreground-100 p-2">
                        <Icon icon="helpCircle" size={20} className="text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-semibold leading-relaxed">{faq.question}</h3>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Category Navigation & FAQ Sections */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          {/* Category Tabs */}
          <div className="mb-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 id="browse-by-category" className="scroll-mt-24 font-sans text-2xl font-bold sm:text-4xl">
                Browse by Category
              </h2>
              {selectedCategory !== 'all' && (
                <Button
                  size="sm"
                  variant="light"
                  onPress={() => setSelectedCategory('all')}
                  startContent={<Icon icon="cross" size={16} />}
                >
                  Clear filter
                </Button>
              )}
            </div>
            <Tabs
              selectedKey={selectedCategory}
              onSelectionChange={(key) => setSelectedCategory(key as string)}
              classNames={{
                tabList: 'gap-2 overflow-x-auto',
                tab: 'min-w-fit',
              }}
            >
              {faqsByCategory.map(({ category, config, faqs: categoryFaqs }) => {
                if (category === 'all' && searchQuery) return null; // Hide "All" when searching
                return (
                  <Tab
                    key={category}
                    title={
                      <div className="flex items-center gap-2">
                        <Icon icon={config.icon as any} size={18} />
                        <span>{config.name}</span>
                        {category !== 'all' && (
                          <Chip size="sm" variant="flat" className="ml-1">
                            {categoryFaqs.length}
                          </Chip>
                        )}
                      </div>
                    }
                  />
                );
              })}
            </Tabs>
          </div>

          {/* FAQ Content */}
          {displayedCategory.faqs.length > 0 ? (
            <div>
              {selectedCategory === 'all' && !searchQuery ? (
                // Show all categories when "All" is selected
                faqsByCategory
                  .filter((cat) => cat.category !== 'all' && cat.faqs.length > 0)
                  .map(({ category, faqs: categoryFaqs, config }) => {
                    return (
                      <div key={category} id={`category-${category}`} className="mb-12 scroll-mt-24">
                        <div className="mb-6 flex items-center gap-3">
                          <div className="rounded-full bg-foreground-100 p-2">
                            <Icon icon={config.icon as any} size={20} className="text-primary" />
                          </div>
                          <h3 className="font-sans text-xl font-bold sm:text-2xl">{config.name}</h3>
                          <Chip size="sm" variant="flat">
                            {categoryFaqs.length}
                          </Chip>
                        </div>
                        <Accordion
                          variant="splitted"
                          className="gap-3"
                          itemClasses={{
                            base: 'px-5 py-1',
                          }}
                        >
                          {categoryFaqs.map((faq) => (
                            <AccordionItem
                              key={faq.key}
                              id={`faq-${faq.key}`}
                              title={<span className="text-base font-semibold">{faq.question}</span>}
                            >
                              <div className="space-y-3 whitespace-pre-wrap leading-relaxed text-foreground-500">
                                {faq.answer}
                              </div>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </div>
                    );
                  })
              ) : (
                // Show filtered results
                <div>
                  {selectedCategory !== 'all' &&
                    (() => {
                      return (
                        <div className="mb-6 flex items-center gap-3">
                          <div className="rounded-full bg-foreground-100 p-2">
                            <Icon icon={displayedCategory.config.icon as any} size={20} className="text-primary" />
                          </div>
                          <h3 className="font-sans text-xl font-bold sm:text-2xl">{displayedCategory.config.name}</h3>
                          <Chip size="sm" variant="flat" className="ml-2">
                            {displayedCategory.faqs.length}
                          </Chip>
                        </div>
                      );
                    })()}
                  <Accordion
                    variant="splitted"
                    className="gap-3"
                    itemClasses={{
                      base: 'px-5 py-1',
                    }}
                  >
                    {displayedCategory.faqs.map((faq) => (
                      <AccordionItem
                        key={faq.key}
                        id={`faq-${faq.key}`}
                        title={<span className="text-base font-semibold">{faq.question}</span>}
                      >
                        <div className="space-y-3 whitespace-pre-wrap leading-relaxed text-foreground-500">
                          {faq.answer}
                        </div>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )}
            </div>
          ) : (
            <Card>
              <CardBody className="items-center p-12 text-center">
                <div className="mx-auto mb-4 w-fit rounded-full bg-foreground-100 p-4">
                  <Icon icon="search" size={28} className="text-foreground-400" />
                </div>
                <h3 className="mb-2 font-sans text-xl font-bold">No results found</h3>
                <p className="mb-6 max-w-md">
                  {searchQuery
                    ? "We couldn't find any FAQs matching your search. Try different keywords or browse by category."
                    : `No FAQs available in the ${displayedCategory.config.name} category.`}
                </p>
                {searchQuery && (
                  <Button
                    variant="flat"
                    onPress={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                  >
                    Clear search and show all
                  </Button>
                )}
              </CardBody>
            </Card>
          )}
        </div>
      </section>

      {/* Contact Support Section */}
      <section className="overflow-hidden bg-foreground-50 px-6 py-16 lg:py-24">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="flex flex-col gap-6 text-center">
            <h2 className="font-sans text-2xl font-bold sm:text-4xl">Still Have Questions?</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground-500">
              If you didn't find the answer you were looking for, our support team is here to help. Reach out to us and
              we'll get back to you as soon as possible.
            </p>
            <div className="mt-4 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                as="a"
                href="mailto:support@kreatli.com"
                size="lg"
                className="bg-foreground text-content1"
                startContent={<Icon icon="mail" size={20} />}
              >
                Email Support
              </Button>
              <Button
                as="a"
                href="https://calendar.app.google/NXbAeTAUwaBGh5x49"
                target="_blank"
                size="lg"
                variant="bordered"
                startContent={<Icon icon="calendar" size={20} />}
              >
                Book a Demo
              </Button>
            </div>
          </div>
        </div>
      </section>
      <FooterSection hideCta={true} />
    </>
  );
}
