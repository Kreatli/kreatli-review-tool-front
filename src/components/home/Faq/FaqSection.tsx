import { Accordion, AccordionItem } from '@heroui/react';

import { FAQItem } from '../../shared/FAQStructuredData';

export const homeFaqs: FAQItem[] = [
  {
    question: 'What exactly is Kreatli?',
    answer:
      'Kreatli is a Video Collaboration & Review Platform that combines video review, project management, file storage, and team communication in one workspace. It replaces the need to juggle Google Drive, Frame.io, Slack, and separate PM tools. Features include frame-accurate video review, board-driven tasks, media approval workflows, and secure cloud storage — all purpose-built for video teams, agencies, and content creators.',
  },
  {
    question: 'How does Kreatli organize my files?',
    answer:
      'Files are organized by project with filtering by status, type, size, and tags. Every file keeps a full version history so you can track changes and revert if needed. Unlike basic storage, files stay linked to their project conversations, review comments, and approval status — so you always see the full context without digging through folders.',
  },
  {
    question: 'What is the File Review Tool, and how does it work?',
    answer:
      'The File Review Tool lets you pin comments to exact frames in a video or exact spots on images and PDFs. Reviewers click where the change is needed, leave a note, and the creator sees precisely what to fix. Guest review links let clients participate without creating an account. All feedback is tracked in one place, eliminating email back-and-forth.',
  },
  {
    question: 'Is there a limit to how many projects I can manage with Kreatli?',
    answer:
      'No — all plans include unlimited projects. Limits apply only to team members and storage: Creator ($7/user/month) supports up to 3 members with 500 GB, Team ($19/user/month) supports up to 10 members with 2 TB, and Enterprise offers custom limits. Every plan includes a 7-day free trial.',
  },
  {
    question: 'Can multiple team members work on the same project in Kreatli?',
    answer:
      'Yes. Invite team members, clients, and contractors to the same project with role-based access controls. Multiple people can review and comment on the same file at the same time. Project-tied chats and asset-linked comments keep conversations organized, and guest review links let external stakeholders join without creating accounts.',
  },
  {
    question: 'Can I upgrade or downgrade my plan at any time?',
    answer:
      'Yes. Upgrade instantly to get more capacity; downgrades take effect at the next billing cycle. All changes are managed in your account settings — no long-term contracts or cancellation fees. Contact support if you need help choosing the right plan.',
  },
  {
    question: "What happens if I exceed my plan's limits?",
    answer:
      "You'll receive alerts as you approach your limits. If you exceed them, your access isn't immediately restricted — you can upgrade, add resources, or archive older projects to free space. The goal is to keep your workflow running without surprise interruptions.",
  },
  {
    question: 'Can I try Kreatli for free?',
    answer:
      'Yes. Every plan includes a 7-day free trial with full access to all features. Choose a plan and add a payment method at checkout — you won\'t be charged during the trial. Cancel anytime before it ends to avoid billing.',
  },
  {
    question: 'How long is the Kreatli free trial?',
    answer:
      'The trial lasts 7 days with unrestricted access to every feature in your chosen plan. That gives you enough time to create projects, invite your team, test review workflows, and decide if Kreatli fits your production process.',
  },
  {
    question: 'Do I need a credit card for the Kreatli free trial?',
    answer:
      "Yes. A payment method is required at checkout, but you pay $0 during the trial. Cancel before the 7 days end and you won't be charged.",
  },
  {
    question: 'What happens after the Kreatli free trial ends?',
    answer:
      "Your subscription converts to paid billing for the plan you selected — unless you cancel before the trial ends. If you cancel, you won't be charged and access stops when the trial period expires. Email reminders are sent before the trial ends.",
  },
  {
    question: 'What features are included in the Kreatli free trial?',
    answer:
      'Every feature in your chosen plan: unlimited projects, frame-accurate video review, file organization, team collaboration, guest review links, cloud storage integrations, and project management. Creator includes up to 3 members / 500 GB; Team includes up to 10 members / 2 TB. No features are restricted during the trial.',
  },
  {
    question: 'Can I cancel during the free trial?',
    answer:
      "Yes. Cancel anytime during the 7-day trial to avoid charges. After the trial, you can still cancel at any time through account settings — you'll keep access until the end of your current billing period with no cancellation fees.",
  },
  {
    question: 'Is the Kreatli free trial really free?',
    answer:
      "Yes. You pay $0 in subscription fees during the 7-day trial. A payment method is added at checkout for verification, but no charge is made until the trial ends. Cancel before then and you're never billed.",
  },
  {
    question: "What's the difference between Kreatli and other project management tools?",
    answer:
      'Kreatli is built specifically for creative production, not general project management. Unlike Asana, Monday, or ClickUp, it includes frame-accurate video review, visual proofing, asset-linked comments, and structured project stages — all native to the platform. Instead of stitching together a PM tool, storage, review software, and chat, everything lives in one workspace.',
  },
  {
    question: 'How does Kreatli compare to Frame.io for video review?',
    answer:
      'Both offer frame-accurate video review and guest review links. The difference is scope: Frame.io focuses on review only, while Kreatli adds project management, file organization, team chat, and cloud storage in one platform. If you currently pair Frame.io with separate tools for PM, storage, and communication, Kreatli consolidates them.',
  },
  {
    question: 'What file types does Kreatli support for review and approval?',
    answer:
      'Video (MP4, MOV, AVI and more), images (JPG, PNG, GIF, PSD, AI), and documents (PDF, Word). All file types share the same review features: version history, side-by-side comparison, annotations, guest review links, and approval workflows.',
  },
  {
    question: 'How secure is Kreatli for storing and sharing creative assets?',
    answer:
      'All files are encrypted in transit and at rest. Share links can be password-protected with expiration dates, and granular permissions control who can view, comment, approve, or download. The platform is compliance-ready for agencies handling confidential client materials.',
  },
  {
    question: 'Can I integrate Kreatli with my existing tools and workflows?',
    answer:
      'Yes. Kreatli integrates with Google Drive and Dropbox so you can import or sync files from existing storage. Upload directly or connect your cloud accounts — either way, files get the same review, versioning, and collaboration features. The platform works alongside your existing tools while reducing the need to switch between them.',
  },
];

export const FaqSection = () => {
  return (
    <section id="faq" className="flex flex-col gap-16 px-6 py-16 backdrop-blur-lg lg:mt-8 lg:py-24">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
        <h2 className="text-center font-sans text-3xl font-bold sm:text-4xl">Frequently Asked Questions</h2>
        <Accordion variant="splitted" aria-label="Frequently asked questions">
          {homeFaqs.map((item) => (
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
