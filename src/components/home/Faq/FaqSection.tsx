import { Accordion, AccordionItem } from '@heroui/react';

const faq = [
  {
    question: 'What exactly is Kreatli?',
    answer:
      'Kreatli is an end-to-end creative production management platform designed specifically for creative teams, content creators, and digital agencies. It combines project management, media review and approval workflows, file organization, and team collaboration into one unified platform.\n\n' +
      'Unlike juggling multiple tools like Google Drive for storage, Frame.io for video review, Slack for communication, and separate project management software, Kreatli brings everything into one organized space. The platform helps you manage your entire creative workflow with features like intuitive file organization, frame-accurate media review and approval, live collaboration tools, and powerful storage solutions.\n\n' +
      "Kreatli is purpose-built for creative production workflows, meaning every feature is designed with the needs of video producers, designers, agencies, and content teams in mind. Whether you're managing video production, design projects, or marketing campaigns, Kreatli streamlines the process from initial planning through final delivery and client approval.",
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
      'Yes, there are limits to how many projects you can manage with Kreatli, depending on the pricing plan you choose. The Free Plan allows you to manage 2 projects with up to 2 users, making it perfect for individuals or very small teams getting started with creative production management.\n\n' +
      'The Pro Plan allows you to manage up to 10 projects and supports up to 5 users, which is ideal for small to medium creative teams. The Advanced Plan provides unlimited projects and users, making it suitable for larger agencies and production companies that need to manage multiple client projects simultaneously.\n\n' +
      'For teams or organizations with specific needs, a Custom Plan is available, which allows for tailored project management capabilities, custom storage limits, and enterprise features. You can upgrade or downgrade your plan at any time based on your evolving needs, and changes will be reflected in your next billing cycle.',
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
      'Yes! Kreatli offers a Free Plan that gives you full access to all features, so you can experience how it simplifies your workflow and collaboration. The Free Plan includes 2 projects with up to 2 users, allowing you to test the platform with real projects and see how it improves your creative production management.\n\n' +
      'The free tier includes all core features like frame-accurate video review, media review and approval workflows, file organization, team collaboration, and guest review links. This means you can fully evaluate how Kreatli compares to your current tool stack before making any financial commitment.\n\n' +
      "There's no credit card required to start, and you can use the Free Plan indefinitely. If you find that Kreatli improves your creative workflow, you can upgrade to a paid plan when you need more projects, users, or storage. Many teams start with the Free Plan to onboard their team and then upgrade as they see the value in consolidating their creative production tools.",
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
