import { Accordion, AccordionItem } from '@heroui/react';

const faq = [
  {
    question: 'What exactly is Kreatli?',
    answer:
      'Kreatli is a Video Collaboration & Review Platform designed specifically for creative teams, content creators, and digital agencies. It combines video review and collaboration, project management, media approval workflows, file organization, and team communication into one unified platform.\n\n' +
      'Unlike juggling multiple tools like Google Drive for storage, Frame.io for video review, Slack for communication, and separate project management software, Kreatli brings everything into one organized space. The platform helps you manage your entire video production workflow with features like frame-accurate video review and approval, intuitive file organization, live collaboration tools, and powerful storage solutions.\n\n' +
      "Kreatli is purpose-built for video collaboration and creative production workflows, meaning every feature is designed with the needs of video producers, designers, agencies, and content teams in mind. Whether you're managing video production, design projects, or marketing campaigns, Kreatli streamlines the process from initial planning through final delivery and client approval.",
  },
  {
    question: 'How does Kreatli organize my files?',
    answer:
      'Kreatli provides smart file organization specifically designed for creative production workflows. Files can be organized by project, status, size, file type (videos, images, documents, etc.), and custom tags. The platform supports powerful filtering and search functionality to help you quickly find any asset, even in large projects with hundreds of files.\n\n' +
      "The system maintains comprehensive version history for all files, so you can track changes over time and revert to previous versions if needed. Files are automatically organized within project folders, and you can create custom folder structures that match your team's workflow. This makes it easy to manage deliverables, track project progress, and keep everything organized throughout your creative production management process.\n\n" +
      "Unlike basic file storage solutions, Kreatli's file organization is integrated with review workflows, project management, and collaboration features. This means files are always connected to their associated projects, conversations, and approval status, making it easy to see the full context of any asset in your creative production system.",
  },
  {
    question: 'What is the File Review Tool, and how does it work?',
    answer:
      "Kreatli's File Review Tool is a real-time media review and approval feature that allows you to provide feedback, add comments, and make revisions on files like videos, images, and documents through a streamlined review workflow. The tool supports frame-accurate commenting for videos, where you can pin comments to exact frames and timestamps, eliminating confusion about which clip or scene you're referring to.\n\n" +
      'For videos, the review tool enables frame-accurate revisions, meaning reviewers can provide precise feedback like "change the color at 00:02:15" or "add transition between frames 1,234-1,236." For images and designs, you can add precise annotations and markup directly on the media. All comments are integrated into your review and approval workflow, allowing creators to see exactly where changes are needed and mark revisions as complete once addressed.\n\n' +
      "Users can collaborate without the need for back-and-forth email exchanges or external tools. The platform supports both internal team reviews and client approval processes through guest review links that don't require signups. Your team stays in sync, speeding up the review and approval process and making collaboration seamless throughout your creative production management workflow.",
  },
  {
    question: 'Is there a limit to how many projects I can manage with Kreatli?',
    answer:
      "All plans include unlimited projects, so you can manage as many projects as you need. The limits vary by plan for team members and storage. The Creator plan ($7/user/month) supports up to 3 members with 500GB storage. The Team plan ($19/user/month) supports up to 10 members with 2TB storage. The Enterprise plan offers custom members and custom storage based on your organization's needs.\n\n" +
      'All plans include a 7-day free trial, so you can test any plan before committing. You can upgrade or downgrade your plan at any time based on your evolving needs, and changes will be reflected in your next billing cycle. For teams or organizations with specific needs, the Enterprise plan provides tailored capabilities, custom storage limits, and enterprise features like SSO and dedicated account management.',
  },
  {
    question: 'Can multiple team members work on the same project in Kreatli?',
    answer:
      'Yes, Kreatli is built for collaborative workspaces. You can invite team members, clients, and contractors to work on the same project. Each person has access to the same tools depending on their access levels - files, chat, review and approval tools, and project activities - so everyone stays on the same page throughout the creative production management process.\n\n' +
      'The platform supports real-time collaboration where multiple team members can review and comment on the same file simultaneously. Project-tied chats keep all conversations organized by project, and asset-linked comments ensure feedback is always connected to the specific file being discussed. This eliminates confusion and keeps all project-related communication in context.\n\n' +
      'Guest review links allow clients and external collaborators to participate in the review and approval process without requiring accounts, making it easy to include stakeholders in your creative workflow. Access controls let you manage who can view, comment, approve, or download files, ensuring the right people have the right level of access to your creative production projects.',
  },
  {
    question: 'Can I upgrade or downgrade my plan at any time?',
    answer:
      "Yes, you can change your plan at any time to match your evolving needs. If you need more projects, users, or storage, you can upgrade your plan immediately. If you find you're not using all the features of your current plan, you can downgrade to a more cost-effective option.\n\n" +
      "When you upgrade, you'll gain immediate access to the additional features and limits of the new plan. When you downgrade, the changes will take effect at the start of your next billing cycle, giving you time to adjust your usage. This flexibility ensures you're only paying for what you need while having the option to scale up when your creative production management requirements grow.\n\n" +
      "All plan changes are handled through your account settings, and you'll receive email confirmation of any changes. If you have questions about which plan is right for your team's creative workflow, you can contact support for personalized recommendations.",
  },
  {
    question: "What happens if I exceed my plan's limits?",
    answer:
      "Kreatli proactively notifies you when you're approaching your plan's limits, giving you time to decide how to proceed. You'll receive email notifications and in-app alerts when you're getting close to your project, user, or storage limits, so you can plan ahead.\n\n" +
      "If you exceed your plan's limits, you have options: you can upgrade your plan to get more capacity, purchase additional resources as add-ons, or archive older projects to free up space. The platform won't immediately restrict your access, giving you flexibility to manage your creative production workflow without interruption.\n\n" +
      'For teams that frequently approach limits, we recommend considering an upgrade to a plan that better matches your usage patterns. This ensures smooth operation of your media review and approval workflows without constant limit management.',
  },
  {
    question: 'Can I try Kreatli for free?',
    answer:
      "Yes! All Kreatli plans include a 7-day free trial with full access to all features. When you sign up, you'll choose a plan (Creator, Team, or Enterprise) and immediately start your 7-day trial with complete access to all features and limits of that plan. There's no credit card required to start your trial, making it completely risk-free.\n\n" +
      "During the 7-day free trial, you'll have access to all core features including frame-accurate video review, media review and approval workflows, unlimited projects, file organization, team collaboration, guest review links, cloud storage integrations, and project management tools. This means you can fully evaluate how Kreatli compares to your current tool stack before making any financial commitment.\n\n" +
      "After your 7-day trial ends, you'll need to select a paid plan to continue using the platform. If you don't select a plan, you'll lose access to your projects and data. Many teams use the trial period to onboard their team, run a pilot project, and see the value in consolidating their creative production tools before committing to a paid plan.",
  },
  {
    question: 'How long is the Kreatli free trial?',
    answer:
      'The Kreatli free trial lasts for 7 days. During this period, you have full access to all features of your chosen plan (Creator, Team, or Enterprise) without any restrictions. The trial starts immediately when you sign up and create your account.\n\n' +
      "You'll receive email notifications as your trial progresses, including reminders before it ends so you can decide whether to continue with a paid plan. The 7-day duration gives you enough time to set up projects, invite team members, upload files, test the review and approval workflows, and evaluate how Kreatli fits into your creative production process.\n\n" +
      "If you need more time to evaluate, you can contact our support team to discuss your needs. However, the standard 7-day trial is designed to give you a comprehensive experience of the platform's capabilities without requiring a long-term commitment.",
  },
  {
    question: 'Do I need a credit card for the Kreatli free trial?',
    answer:
      "No, you do not need a credit card to start your Kreatli free trial. The trial is completely free and requires no payment information upfront. This makes it truly risk-free to try Kreatli and see if it's the right fit for your creative production workflow.\n\n" +
      "When you sign up, you simply choose which plan you'd like to trial (Creator, Team, or Enterprise) and your 7-day trial begins immediately. You'll have full access to all features during the trial period without any payment obligations.\n\n" +
      "After your 7-day trial ends, you'll need to select a paid plan to continue using the platform. At that point, you'll provide payment information if you decide to continue. If you choose not to continue, you can simply let the trial expire - there are no charges, no commitments, and no hidden fees.",
  },
  {
    question: 'What happens after the Kreatli free trial ends?',
    answer:
      "After your 7-day free trial ends, you have two options: select a paid plan to continue using Kreatli, or let your trial expire. If you choose to continue, you'll select either the Creator plan ($7/user/month), Team plan ($19/user/month), or Enterprise plan (custom pricing) and provide payment information to activate your subscription.\n\n" +
      "If you don't select a paid plan after the trial ends, your account access will be restricted. You'll lose access to your projects, files, and data. We recommend exporting any important files or projects before your trial ends if you're unsure about continuing.\n\n" +
      "You'll receive email notifications before your trial ends to remind you of the upcoming expiration. If you need more time to decide, you can contact our support team. Once you select a paid plan, billing begins immediately and you'll have full access to continue your work without interruption.",
  },
  {
    question: 'What features are included in the Kreatli free trial?',
    answer:
      'The Kreatli free trial includes full access to all features of your chosen plan. This means you get the complete experience, not a limited or watered-down version. All plans include unlimited projects, frame-accurate video review, media review and approval workflows, file organization, team collaboration, guest review links, cloud storage integrations, and project management tools.\n\n' +
      "The Creator plan trial includes up to 3 team members and 500GB storage. The Team plan trial includes up to 10 team members and 2TB storage. The Enterprise plan trial includes custom limits based on your organization's needs. All features work exactly as they would in a paid plan, giving you a true representation of what Kreatli offers.\n\n" +
      'You can create real projects, upload files, invite team members, set up review workflows, test collaboration features, and use all the tools your team needs for creative production management. There are no feature restrictions during the trial period - you get the full platform experience.',
  },
  {
    question: 'Can I cancel during the free trial?',
    answer:
      "Yes, you can stop using Kreatli at any time during or after the free trial without any charges or cancellation fees. Since no credit card is required to start the trial, there's nothing to cancel during the trial period itself.\n\n" +
      "If you decide Kreatli isn't the right fit during your 7-day trial, you can simply stop using the platform. Your trial will expire automatically after 7 days, and you won't be charged anything. There's no need to contact support or go through a cancellation process during the trial.\n\n" +
      "If you've selected a paid plan after your trial ends and then decide to cancel, you can do so at any time through your account settings. You'll retain access until the end of your current billing period, and there are no cancellation fees or long-term commitments.",
  },
  {
    question: 'Is the Kreatli free trial really free?',
    answer:
      'Yes, the Kreatli free trial is completely free with no hidden costs, no credit card required, and no automatic charges. You can sign up, use the platform for 7 days with full access to all features, and evaluate whether Kreatli meets your creative production needs - all without spending any money.\n\n' +
      "There are no setup fees, no trial fees, and no charges of any kind during the 7-day period. The trial gives you access to the same features and capabilities you'd get with a paid subscription, allowing you to make an informed decision about whether Kreatli is right for your team.\n\n" +
      "The only requirement to continue using Kreatli after the trial is to select a paid plan. If you choose not to continue, you simply let the trial expire - no charges, no commitments, and no obligations. This makes it a truly risk-free way to experience Kreatli's creative production management platform.",
  },
  {
    question: "What's the difference between Kreatli and other project management tools?",
    answer:
      'Kreatli is purpose-built for content creators, creative teams, and digital agencies, unlike generic project management tools that try to serve all industries. While tools like Asana, Monday, or ClickUp are great for general project management, they lack the specialized features needed for creative production workflows.\n\n' +
      'Kreatli includes integrated media review and approval workflows, creative proofing capabilities with frame-accurate commenting, real-time commenting tied to specific assets, and structured project folders tailored for creative production management. These features are built into the platform, not added as afterthoughts or third-party integrations.\n\n' +
      'The key difference is that Kreatli reduces tool-switching by combining project management, file storage, video review, team communication, and client collaboration into one platform. Instead of using Frame.io for review, Slack for communication, Google Drive for storage, and a separate PM tool, everything is integrated. This streamlines the creative process from planning to final delivery and eliminates the context loss that happens when switching between multiple tools.',
  },
  {
    question: 'How does Kreatli compare to Frame.io for video review?',
    answer:
      'Kreatli offers similar frame-accurate video review capabilities to Frame.io, but goes beyond video review to provide a complete creative production management platform. Like Frame.io, Kreatli supports frame-accurate comments, side-by-side version comparison, and guest review links for clients.\n\n' +
      "However, Kreatli includes comprehensive project management, file organization, team collaboration, and cloud storage integration that Frame.io doesn't provide. While Frame.io focuses solely on video review, Kreatli integrates review workflows with project tracking, team communication, and file management in one platform.\n\n" +
      "If you're currently using Frame.io for video review but also need project management, file storage, and team collaboration tools, Kreatli can replace multiple tools with one integrated solution. This reduces costs, eliminates tool-switching, and keeps all your creative production work in one organized space with seamless media review and approval workflows.",
  },
  {
    question: 'What file types does Kreatli support for review and approval?',
    answer:
      'Kreatli supports a wide range of file types commonly used in creative production workflows. For video review, the platform supports popular video formats including MP4, MOV, AVI, and other standard video file types. The frame-accurate review feature works with all supported video formats, allowing precise feedback on any video content.\n\n' +
      'For images and design files, Kreatli supports formats like JPG, PNG, GIF, PSD, AI, and other common image formats. You can add annotations, comments, and markup directly on images for creative proofing. The platform also supports document files like PDFs, Word documents, and other text-based files for review and approval workflows.\n\n' +
      'All supported file types benefit from the same review and approval features, including version history, side-by-side comparison, guest review links, and integrated collaboration tools. This makes Kreatli suitable for diverse creative production workflows, from video production to design projects to document review.',
  },
  {
    question: 'How secure is Kreatli for storing and sharing creative assets?',
    answer:
      'Kreatli provides enterprise-level security features designed for sensitive creative work. All files are encrypted both in transit and at rest, ensuring your creative assets are protected throughout the entire creative production management process. The platform uses industry-standard encryption protocols to safeguard your data.\n\n' +
      'The platform supports secure file sharing with password-protected links and granular access controls. You can set permissions for team members, controlling who can view, comment, approve, or download files. Guest review links can be configured with expiration dates and access restrictions, giving you control over external collaboration while maintaining security.\n\n' +
      'Kreatli is compliance-ready and designed to meet security standards required for handling confidential creative work, client materials, and proprietary content. This makes it suitable for agencies and production companies that need to protect sensitive creative assets throughout the media review and approval process. Regular security audits and updates ensure your data remains protected.',
  },
  {
    question: 'Can I integrate Kreatli with my existing tools and workflows?',
    answer:
      "Kreatli integrates with popular cloud storage services including Google Drive and Dropbox, allowing you to connect your existing file storage and sync files between platforms. You can continue using your preferred cloud storage while leveraging Kreatli's specialized features for creative production management and media review.\n\n" +
      "The platform is designed to work alongside your existing creative tools rather than requiring you to abandon your current workflow entirely. You can upload files directly to Kreatli or sync from cloud storage, and all files benefit from Kreatli's organization, review, and collaboration features regardless of their source.\n\n" +
      "While Kreatli aims to reduce tool-switching by consolidating multiple functions into one platform, it's flexible enough to integrate with tools you can't replace. The goal is to streamline your creative production workflow by bringing together the functions that are currently scattered across multiple platforms, while still allowing you to use specialized tools when needed.",
  },
];

export const FaqSection = () => {
  return (
    <section id="faq" className="flex flex-col gap-16 px-6 py-16 backdrop-blur-lg lg:py-32">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
        <h2 className="text-center font-sans text-3xl font-bold sm:text-5xl">Frequently Asked Questions</h2>
        <Accordion variant="splitted">
          {faq.map((item) => (
            <AccordionItem key={item.question} title={<span className="text-base font-semibold">{item.question}</span>}>
              <div className="space-y-3 whitespace-pre-wrap text-foreground-500">{item.answer}</div>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
        <h3 className="font-sans text-xl font-bold">Still Have Questions?</h3>
        <p>
          If you didn't find the answer you were looking for, feel free to contact our support team at{' '}
          <a href="mailto:support@kreatli.com" className="underline underline-offset-2">
            support@kreatli.com
          </a>{' '}
          for more detailed answers.
        </p>
      </div>
    </section>
  );
};
