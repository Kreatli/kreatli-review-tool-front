import { Accordion, AccordionItem, Button, Card, CardBody, Chip, Input, Tab, Tabs } from '@heroui/react';
import Head from 'next/head';
import { useMemo, useState } from 'react';

import { FooterSection } from '../components/home/Footer/FooterSection';
import { Header } from '../components/layout/Header';
import { Decorations } from '../components/layout/Storyblok/Decorations';
import { Icon, IconType } from '../components/various/Icon';
import { useSession } from '../hooks/useSession';

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
      'Kreatli\'s frame-accurate review feature allows you to pin comments, annotations, and feedback to exact frames and timestamps in video files. When reviewing a video, you can click on any specific frame to add a comment that\'s permanently linked to that moment in the timeline. This eliminates confusion about which clip or scene you\'re referring to.\n\nThe system supports frame-accurate revisions for video files, meaning reviewers can provide precise feedback like "change the color at 00:02:15" or "add transition between frames 1,234-1,236." This level of precision is essential for video production teams who need to communicate exact edit points without ambiguity.\n\nAll frame-accurate comments are integrated into your video review and approval workflow, allowing editors to see exactly where changes are needed and mark revisions as complete once addressed. This streamlines the video collaboration process by reducing back-and-forth communication.',
  },
  {
    key: 'review-workflow',
    category: 'Features',
    question: 'What is a video review and approval workflow, and how does Kreatli handle it?',
    answer:
      "A video review and approval workflow is the process video teams use to review, provide feedback, and get final approval on video assets and related media. Kreatli streamlines this entire process in one platform.\n\nIn Kreatli, the review workflow works like this: First, you upload your video files to a project. Then, you can invite team members, clients, or stakeholders to review the files. Reviewers can add comments, annotations, and feedback directly on the media. The system tracks all feedback and allows project managers to see the approval status of each asset.\n\nThe platform supports both internal team reviews and client approval processes. You can set up guest review links that don't require signups, making it easy for clients to participate in the approval workflow. All comments and approvals are tracked, so you always know the status of each deliverable in your video collaboration pipeline.",
  },
  {
    key: 'version-comparison',
    category: 'Features',
    question: 'How does the side-by-side version comparison feature work?',
    answer:
      "Kreatli's version comparison feature allows you to view different versions of the same file side-by-side in a split-screen interface. This is particularly useful for video proofing, as you can instantly spot changes between versions and provide precise feedback on what's different.\n\nThe comparison tool works for videos, images, and design files. For videos, you can compare different cuts or edits frame-by-frame. For images and designs, you can see pixel-level differences between versions. This helps reviewers quickly identify what changed and provide accurate feedback in your video review workflow.\n\nWhen comparing versions, you can add comments that reference specific differences, making it clear to creators what needs to be adjusted. This feature is integrated with the approval workflow, so you can approve or request changes directly from the comparison view, streamlining your video collaboration process.",
  },
  {
    key: 'file-organization',
    category: 'Features',
    question: 'How does Kreatli organize and manage creative files and assets?',
    answer:
      "Kreatli provides smart file organization that's specifically designed for video collaboration workflows. Files can be organized by project, status, file type, size, and custom tags. The platform supports filtering and search functionality to help you quickly find any asset, even in large projects with hundreds of files.\n\nThe system maintains comprehensive version history for all files, so you can track changes over time and revert to previous versions if needed. Files are automatically organized within project folders, and you can create custom folder structures that match your team's workflow.\n\nUnlike basic file storage solutions, Kreatli's file organization is integrated with video review workflows, project management, and collaboration features. This means files are always connected to their associated projects, conversations, and approval status, making it easy to see the full context of any asset in your video collaboration system.",
  },
  {
    key: 'collaboration',
    category: 'Features',
    question: "How does team collaboration work in Kreatli's video production platform?",
    answer:
      'Kreatli enables collaboration through multiple integrated features. Project-tied chats keep all conversations organized by project, so team discussions stay with the relevant work. Asset-linked comments ensure feedback is always connected to the specific file being discussed, eliminating confusion about which asset a comment refers to.\n\nThe platform supports real-time collaboration where multiple team members can review and comment on the same file simultaneously. Guest review links allow clients and external collaborators to participate in the video review and approval process without requiring accounts, making it easy to include stakeholders in your video collaboration workflow.\n\nAll collaboration happens within the context of your video collaboration system, so conversations, feedback, and approvals are all tracked and visible to the team. This reduces tool-switching and keeps everything in one place, from initial planning through final delivery.',
  },
  {
    key: 'guest-reviews',
    category: 'Features',
    question: 'Can clients and external reviewers use Kreatli without creating an account?',
    answer:
      "Yes, Kreatli supports no-signup guest reviews through secure shareable links. You can generate a review link for any file or project and share it with clients, stakeholders, or external collaborators. They can access the review interface, add comments, and participate in the approval workflow without needing to create an account.\n\nGuest review links can be password-protected for additional security, and you can set expiration dates and access controls. This makes it easy to include clients in your video review and approval process while maintaining control over who can access your video assets.\n\nExternal reviewers see a clean, branded interface focused on reviewing and providing feedback. They can add comments, annotations, and approvals just like team members, but without the complexity of project management features they don't need. This streamlined experience improves client participation in your video collaboration workflow.",
  },
  {
    key: 'notifications',
    category: 'Features',
    question: "How do real-time notifications work in Kreatli's video production platform?",
    answer:
      "Kreatli provides real-time notifications for important events in your video collaboration workflow, including new comments, approval requests, project updates, and file uploads. These notifications help team members stay in sync without constantly checking the platform.\n\nNotifications are contextual and linked to specific assets and projects, so you can quickly understand what needs your attention. When someone adds a comment on a video you're working on, requests approval for a design, or uploads a new version, you'll be notified immediately.\n\nThe notification system is integrated with the video review and approval workflow, ensuring that approvals and feedback requests don't get missed. This keeps your video collaboration process moving forward efficiently, as team members and clients are promptly notified when their input is needed in the video review and approval process.",
  },
  {
    key: 'vs-basic-pm-tools',
    category: 'Features',
    question: 'What can Kreatli help my creative team accomplish that basic project management tools cannot?',
    answer:
      'Kreatli is built specifically for video collaboration, not generic task tracking. It combines asset review, visual feedback, safe zone validation, approvals, and collaboration into a single Video Collaboration & Review Platform. Unlike traditional project management tools, Kreatli is designed around how video teams actually produce, review, and deliver content.',
  },
  {
    key: 'vs-competitors',
    category: 'Features',
    question: 'How is Kreatli different from tools like Frame.io, Asana, or Notion?',
    answer:
      'Kreatli focuses on end‑to‑end production workflows. Unlike review‑only tools, it covers planning, collaboration, review, and delivery. Unlike general PM tools, it understands creative assets, visual context, and platform constraints such as social media safe zones.',
  },
  {
    key: 'replace-multiple-tools',
    category: 'Features',
    question: 'Can Kreatli replace multiple tools in my creative workflow?',
    answer:
      'Yes. Many teams use Kreatli to reduce reliance on separate tools for task management, file sharing, review, feedback, and approval. This simplifies workflows and reduces context switching.',
  },
  {
    key: 'approval-workflow-recommended',
    category: 'Features',
    question: 'Is there a recommended workflow for approvals?',
    answer:
      'Yes. Most teams define clear stages such as draft, review, revision, and approved. Kreatli supports this structured approach to reduce ambiguity and rework.',
  },
  {
    key: 'leave-feedback',
    category: 'Features',
    question: 'How do I leave feedback on videos or images?',
    answer:
      'Kreatli allows reviewers to leave contextual comments directly on assets. This keeps feedback clear, visual, and actionable.',
  },
  {
    key: 'version-history-tracking',
    category: 'Features',
    question: 'Can I track version history and resolved feedback?',
    answer:
      'Yes. Kreatli maintains version history and lets teams resolve comments so everyone knows what has been addressed.',
  },
  {
    key: 'share-external-stakeholders',
    category: 'Features',
    question: 'Can I share content with external stakeholders?',
    answer:
      'Yes. You can share assets for review without forcing external clients or stakeholders into complex onboarding flows.',
  },
  // Pricing Category
  {
    key: 'pricing-structure',
    category: 'Pricing',
    question: "How does Kreatli's per-user pricing work, and are there any hidden fees?",
    answer:
      "Kreatli uses simple, transparent per-user pricing with no hidden fees. The Creator plan is $7 per user per month for teams up to 3 members. The Team plan is $19 per user per month for teams up to 10 members. Enterprise plans have custom pricing based on your organization's needs. All plans include all core features: unlimited projects, file storage, frame-accurate video review, video review and approval workflows, project management, team collaboration, guest review links, and cloud storage integrations.\n\nUnlike many tools that charge extra for storage, advanced features, or add-ons, Kreatli includes everything in the base price. There are no per-project fees, no storage overage charges, no premium feature tiers, and no setup fees. You pay only for active users, making it easy to scale up or down based on your team size. This transparent pricing model means you can accurately calculate your costs without worrying about surprise fees.\n\nThe per-user pricing model is straightforward: you're charged based on the number of active team members in your account. If you add a team member, you'll be charged for them in your next billing cycle. If you remove a team member, you'll see the cost reduction in your next billing cycle. This simplicity contrasts with complex pricing models that vary based on features, storage, or usage, making it difficult to predict total costs for your video collaboration needs.",
  },
  {
    key: 'change-plans',
    category: 'Pricing',
    question: 'Can I change plans later, and how does billing work when I upgrade or downgrade?',
    answer:
      "Yes! You can upgrade or downgrade your plan at any time to match your evolving needs. If you need more projects, users, or features, you can upgrade your plan immediately and gain access to the additional capabilities right away. If you find you're not using all the features of your current plan, you can downgrade to a more cost-effective option.\n\nWhen you upgrade, you'll be charged a prorated amount for the remainder of your current billing cycle, and then the new plan price will apply going forward. When you downgrade, the changes will take effect at the start of your next billing cycle, giving you time to adjust your usage. This flexibility ensures you're only paying for what you need while having the option to scale up when your video collaboration requirements grow.\n\nAll plan changes are handled through your account settings, and you'll receive email confirmation of any changes. There are no fees for changing plans, and you can switch as often as needed. This makes it easy to adapt your Kreatli subscription to match your team's current size and needs without being locked into a plan that doesn't fit.",
  },
  {
    key: 'free-trial',
    category: 'Pricing',
    question: 'How does the 7-day free trial work?',
    answer:
      "When you sign up for Kreatli, you'll choose a plan (Creator, Team, or Enterprise) and immediately start a 7-day free trial of that plan. No credit card is required to start your trial. During the trial, you'll have full access to all features and limits of your chosen plan, allowing you to test the platform with real projects and see how it improves your video collaboration.\n\nAll plans include all core features during the trial: frame-accurate video review, video review and approval workflows, file organization, team collaboration, guest review links, cloud storage integrations, and project management. This means you can fully evaluate how Kreatli compares to your current tool stack before making any financial commitment. You get the complete experience, not a watered-down version.\n\nAfter your 7-day trial ends, you'll need to select a paid plan to continue using the platform. If you don't select a plan, you'll lose access to your projects and data. Many teams use the trial period to onboard their team, run a pilot project, and see the value in consolidating their creative production tools before committing to a paid plan.",
  },
  {
    key: 'plan-selection',
    category: 'Pricing',
    question: 'How do I choose the right plan for my team size and needs?',
    answer:
      "Choosing the right plan depends on your team size and storage needs. All plans include unlimited projects and a 7-day free trial, so you can test any plan before committing. The Creator plan ($7/user/month, up to 3 members, 500GB storage) is perfect for solo creators and small teams who want unlimited projects and need basic collaboration features.\n\nThe Team plan ($19/user/month, up to 10 members, 2TB storage) is ideal for established teams running multiple projects with shared assets, structured reviews, and consistent workflows. This plan works well for micro-teams, freelance teams, and small agencies that need more capacity and collaboration features.\n\nThe Enterprise plan (custom pricing) provides custom members, custom storage, Single Sign-On (SSO), a dedicated account manager, and custom integrations. This plan is suitable for larger agencies, post-production houses, and organizations that need advanced controls and dedicated support. If you're unsure which plan is right for your team, start with a 7-day trial and our support team can help you evaluate which plan best fits your video collaboration requirements.",
  },
  {
    key: 'change-cancel-plan',
    category: 'Pricing',
    question: 'Can I change or cancel my plan?',
    answer:
      'Yes. Plans can be adjusted or canceled according to your subscription terms. Your data remains accessible during the billing period.',
  },
  {
    key: 'pricing-team-size',
    category: 'Pricing',
    question: 'Is pricing based on team size?',
    answer:
      'Pricing is typically structured around usage and team collaboration needs, making it suitable for small teams and growing organizations.',
  },
  // Who We Help Category
  {
    key: 'video-creators',
    category: 'Who We Help',
    question: 'How does Kreatli help independent video creators and YouTubers?',
    answer:
      "Kreatli is designed specifically for video creators who need to manage multiple projects, collaborate with editors, and get client feedback efficiently. The platform's frame-accurate review feature allows you to pin comments to exact frames and timestamps in your videos, eliminating the \"which clip?\" confusion that plagues video production workflows.\n\nFor YouTubers managing multiple series or channels, Kreatli provides project organization that keeps everything in one place. You can organize videos by series, client, or project type, making it easy to track what's in production, what needs review, and what's been approved. The platform's video review and approval workflows streamline client feedback for sponsored content and brand partnerships.\n\nCollaboration with freelance video editors becomes seamless with Kreatli's asset-linked conversations and guest review links. Editors can access projects, add frame-accurate feedback, and share revisions without needing accounts. This eliminates the back-and-forth email chains and file sharing headaches that slow down video production workflows, making your video collaboration much more efficient.",
  },
  {
    key: 'micro-teams',
    category: 'Who We Help',
    question: 'What makes Kreatli ideal for micro-teams working with external clients?',
    answer:
      "Micro-teams (typically 2-10 people) working with external clients face unique challenges: managing multiple client projects simultaneously, keeping client communications organized, and tracking deliverables without overwhelming clients with complex tools. Kreatli addresses these challenges with dedicated project spaces for each client and streamlined client collaboration features.\n\nThe platform's no-signup guest review links are perfect for client collaboration. Clients can review files, add comments, and approve deliverables without creating accounts or learning new software. This reduces friction in the review and approval process while keeping all feedback organized in one place. Project-tied conversations ensure all client communications stay with the relevant project, eliminating lost feedback in email threads.\n\nKreatli's project organization features help micro-teams track status and deliverables across multiple client projects. You can see at a glance which projects are in review, which need attention, and which are complete. This visibility is crucial for small teams juggling multiple clients and ensures nothing falls through the cracks in your video collaboration workflow.",
  },
  {
    key: 'agencies',
    category: 'Who We Help',
    question: 'How do creative agencies and post-production boutiques benefit from Kreatli?',
    answer:
      "Video agencies and post-production boutiques need to scale their operations while maintaining quality and managing complex projects with multiple stakeholders. Kreatli provides unlimited projects and team members at scale, making it suitable for agencies handling dozens of client projects simultaneously. The platform's advanced review tools support professional workflows with frame-accurate feedback, version control, and comprehensive approval processes.\n\nFor agencies coordinating feedback from multiple stakeholders (clients, account managers, creative directors, producers), Kreatli's video review and approval workflows keep everyone aligned. All feedback is organized by asset and project, making it easy to track what needs attention and ensuring nothing gets missed. Enterprise-grade security and access controls protect high-value video assets while allowing appropriate access for different team members and clients.\n\nPost-production houses managing film and TV projects benefit from Kreatli's version control and project organization features. The platform handles large-scale projects with hundreds of files, multiple versions, and complex approval chains. Comprehensive project analytics and reporting help agencies track timelines, resource allocation, and project health across their entire portfolio, improving their video collaboration at scale.",
  },
  {
    key: 'team-types',
    category: 'Who We Help',
    question: 'What types of teams benefit most from Kreatli?',
    answer:
      'Kreatli is ideal for in‑house video teams, social media teams, agencies, video editors, and content producers managing recurring video collaboration workflows and multiple stakeholders.',
  },
  {
    key: 'large-teams-multiple-brands',
    category: 'Who We Help',
    question: 'Can Kreatli support large teams or multiple brands?',
    answer:
      'Yes. Kreatli supports structured workflows suitable for agencies and organizations managing multiple brands or content streams.',
  },
  // Getting Started Category
  {
    key: 'getting-started',
    category: 'Getting Started',
    question: 'How do different types of creative professionals get started with Kreatli?',
    answer:
      "Getting started with Kreatli is straightforward for all types of video professionals. When you sign up, you'll choose a plan (Creator, Team, or Enterprise) and immediately start a 7-day free trial with full access to all features of that plan. There's no credit card required, so you can evaluate how Kreatli fits into your workflow risk-free.\n\nFor video creators, getting started typically involves uploading a few video projects, setting up guest review links for clients, and inviting editors to collaborate. The frame-accurate review features work immediately, and you can start organizing projects right away. Micro-teams usually begin by creating projects for their current clients and migrating files from existing storage solutions.\n\nAgencies and larger teams often start with a demo to see how Kreatli would work for their specific workflow, then run a pilot project with one client or team before rolling out more broadly. We provide migration assistance to help move files and projects, and our team can help set up your team structure and workflows. Training resources and support ensure your team gets up to speed quickly, minimizing disruption to your video collaboration process.",
  },
  {
    key: 'team-size',
    category: 'Getting Started',
    question: 'What team sizes is Kreatli best suited for, and does it scale?',
    answer:
      "Kreatli works well for teams of all sizes, from solo creators to large agencies. Solo video creators and freelancers benefit from the platform's organization and client collaboration features. Small teams (2-10 people) find value in consolidating multiple tools into one platform for video collaboration. Medium teams (10-50 people) appreciate the scalability and collaboration features.\n\nFor large teams and agencies (50+ people), Kreatli provides unlimited projects and team members, enterprise-grade security, advanced access controls, and comprehensive project analytics. The platform scales from managing a few projects to hundreds of simultaneous projects across multiple clients and departments.\n\nThe key advantage is that Kreatli's features work consistently regardless of team size. A solo creator gets the same frame-accurate review capabilities as a large agency, and a small team gets the same project organization features as enterprise clients. This means teams can start small and scale without outgrowing the platform or needing to migrate to different tools as they grow.",
  },
  {
    key: 'first-steps',
    category: 'Getting Started',
    question: 'What should I do first after signing up for Kreatli?',
    answer:
      'Start by creating a workspace, inviting your team, and setting up your first project. Upload a sample asset and run it through review to understand how collaboration and feedback work inside Kreatli.',
  },
  {
    key: 'invite-team-members',
    category: 'Getting Started',
    question: 'How do I invite team members and assign roles?',
    answer:
      'You can invite team members directly via email and control access through roles and permissions. This ensures the right people can view, comment, or approve content.',
  },
  {
    key: 'international-use',
    category: 'Getting Started',
    question: 'Can Kreatli be used internationally?',
    answer: 'Yes. Kreatli is used by teams globally and supports distributed collaboration across regions.',
  },
  // Integrations Category
  {
    key: 'integrations',
    category: 'Integrations',
    question: 'What cloud storage and integration options does Kreatli support?',
    answer:
      "Kreatli integrates with popular cloud storage services including Google Drive and Dropbox. You can connect your existing cloud storage accounts and either upload files directly to Kreatli or sync existing files from your cloud storage.\n\nThis integration means you don't have to abandon your existing file storage solutions. You can continue using Google Drive or Dropbox for general file storage while leveraging Kreatli's specialized features for video collaboration, video review, and approval workflows.\n\nThe platform also supports direct file uploads, so you can work entirely within Kreatli if preferred. Whether you're syncing from cloud storage or uploading directly, all files benefit from Kreatli's organization, review, and collaboration features that are specifically designed for video collaboration workflows.",
  },
  {
    key: 'integrations-other-tools',
    category: 'Integrations',
    question: 'Does Kreatli integrate with other tools?',
    answer:
      'Kreatli is designed to fit into existing workflows and supports common creative file formats. Integration options continue to expand based on user needs.',
  },
  {
    key: 'editing-software',
    category: 'Integrations',
    question: 'Can I use Kreatli alongside my editing software?',
    answer:
      'Yes. Kreatli complements editing tools like Premiere Pro, Final Cut Pro, and CapCut by handling review and collaboration, not editing itself.',
  },
  // Security Category
  {
    key: 'security',
    category: 'Security',
    question: 'What security features does Kreatli offer for video files?',
    answer:
      'Kreatli provides enterprise-level security features designed for sensitive video work. All files are encrypted both in transit and at rest, ensuring your video assets are protected. The platform supports secure file sharing with password-protected links and access controls.\n\nYou can set granular permissions for team members, controlling who can view, comment, approve, or download files. Guest review links can be configured with expiration dates and access restrictions, giving you control over external collaboration while maintaining security.\n\nThe platform is compliance-ready and designed to meet security standards required for handling confidential video work, client materials, and proprietary content. This makes it suitable for agencies and production companies that need to protect sensitive video assets throughout the video review and approval process.',
  },
  {
    key: 'content-security',
    category: 'Security',
    question: 'Is my content secure on Kreatli?',
    answer:
      'Yes. Kreatli is designed with security and privacy in mind. Uploaded content is not shared publicly unless you choose to share it.',
  },
  {
    key: 'project-visibility',
    category: 'Security',
    question: 'Can I control who sees each project?',
    answer: 'Yes. Permissions allow you to restrict access to specific projects or assets.',
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
          content="Find answers to frequently asked questions about Kreatli's video production platform, features, pricing, integrations, and more. Get help with your creative workflow."
        />
        <link rel="canonical" href="https://kreatli.com/help" />
        <meta property="og:url" content="https://kreatli.com/help" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Kreatli | Help Center – FAQs and Support Resources" />
        <meta
          property="og:description"
          content="Comprehensive help center with FAQs about Kreatli's features, pricing, integrations, and Video Collaboration & Review Platform."
        />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:secure_url" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:alt" content="Kreatli Help Center – FAQs and Support Resources" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kreatli | Help Center – FAQs and Support Resources" />
        <meta
          name="twitter:description"
          content="Comprehensive help center with FAQs about Kreatli's features, pricing, integrations, and Video Collaboration & Review Platform."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
      </Head>
      <Header />
      <Decorations />
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 text-center">
          <h1 className="mx-auto max-w-lg font-sans text-2xl font-bold sm:text-4xl">Help Center</h1>
          <p className="mx-auto max-w-2xl text-lg text-foreground-500">
            Find answers to frequently asked questions about Kreatli's video production platform, features, pricing, and
            more.
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
                        <Icon icon={config.icon as IconType} size={18} />
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
                            <Icon icon={config.icon as IconType} size={20} className="text-primary" />
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
                            <Icon icon={displayedCategory.config.icon as IconType} size={20} className="text-primary" />
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
