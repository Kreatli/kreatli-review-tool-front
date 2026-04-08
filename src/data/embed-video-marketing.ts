import type { FAQItem } from '../components/shared/FAQStructuredData';
import type { IconType } from '../components/various/Icon/Icon';

export interface EmbedVideoFeatureCard {
  icon: IconType;
  title: string;
  description: string;
}

/** FAQs shown on /platform/embed-video and merged into the how-to-embed guide. */
export const EMBED_VIDEO_PLATFORM_FAQS: FAQItem[] = [
  {
    question: 'What does a video embedder do in Kreatli?',
    answer:
      'In Kreatli, a video embedder lets you turn any review-ready video into an embeddable experience you can drop into portals, intranets, LMS platforms, and shared pages. Instead of uploading the same file to multiple tools, you generate an embed-style link that opens Kreatli’s player with frame-accurate comments, approvals, and version history built in. Viewers see a clean, embedded video experience, while your team keeps all feedback and assets centralized in Kreatli.',
  },
  {
    question: 'Can I embed videos on my website or client portal with Kreatli?',
    answer:
      'Yes. You can use Kreatli to embed video review experiences anywhere you share content with stakeholders—client portals, internal dashboards, documentation hubs, and more. You share an embed-style link or dedicated review page, and stakeholders can watch the video, leave feedback, and approve cuts without leaving the environment they already use. This makes embedded video review feel like a native part of your existing workflows instead of another tool to log into.',
  },
  {
    question: 'Do embedded videos still support frame-accurate comments and approvals?',
    answer:
      'Yes. Every embedded video experience powered by Kreatli keeps full support for frame-accurate comments, drawings, and approvals. When a viewer watches your embedded video, they can pause on any frame to leave precise feedback that is pinned to that exact timestamp. All of that feedback is stored in Kreatli alongside versions and approvals, so your editors never lose context—even when reviews happen through embeds.',
  },
  {
    question: 'Is there a free way to embed video with Kreatli?',
    answer:
      'Kreatli offers a free way to get started with embedding videos for client and stakeholder review. You can upload videos, generate review-ready links, and share embedded experiences so people can watch and comment without downloading files. As you grow, paid plans unlock higher limits, advanced permissions, and additional collaboration features while keeping your core embed workflows the same.',
  },
  {
    question: 'Are embedded videos secure and private?',
    answer:
      'Yes. All videos you embed through Kreatli are protected by secure infrastructure and access controls. Underlying files are encrypted at rest and in transit, and you can decide who is allowed to view, comment on, or approve each embedded video experience. This gives you the convenience of shareable embeds with the security and control required for agency, in‑house, and studio work.',
  },
  {
    question: 'Can non-technical clients use embedded videos to review content?',
    answer:
      'Absolutely. Embedded video review experiences in Kreatli are designed to be frictionless for non-technical stakeholders. Clients simply open the embedded video, press play, and leave comments or approvals using intuitive controls—no software to install and no editing terminology required. This makes it easy to bring busy executives, subject-matter experts, and brand teams into the review process without slowing projects down.',
  },
];

/** General “how to embed” FAQs for guides and SEO (non–product-specific). */
export const EMBED_VIDEO_GUIDE_GENERAL_FAQS: FAQItem[] = [
  {
    question: 'Is an embed the same as a share link?',
    answer:
      'Not exactly. A share link opens the video on the host’s site or in a review app. An embed places the player inside your own page. Many video and review tools offer both.',
  },
  {
    question: 'Do clients need accounts to review an embedded video?',
    answer:
      'It depends on the platform. Kreatli supports guest-friendly review links so clients can watch and comment without signing up, while your team keeps versions and approvals in one workspace.',
  },
  {
    question: 'What is the safest way to embed video on a marketing page?',
    answer:
      'Use your CMS video or embed block with a URL from a reputable host, serve the page over HTTPS, avoid autoplay with sound unless you have a good reason, and test on mobile networks.',
  },
];

export const EMBED_VIDEO_DESTINATION_CARDS: EmbedVideoFeatureCard[] = [
  {
    icon: 'link',
    title: 'Simple Embed Links',
    description:
      'Turn any Kreatli video into an embed-style link you can drop into websites, client portals, LMS platforms, project hubs, or documentation. Embed video once and keep feedback centralized.',
  },
  {
    icon: 'monitorPlay',
    title: 'Responsive, Device-Friendly Embeds',
    description:
      'Give viewers an embedded video experience that looks great on desktop, tablet, and mobile. Kreatli handles playback so your team does not have to manage multiple video players or file formats.',
  },
  {
    icon: 'time',
    title: 'Embed Once, Keep Versions in Sync',
    description:
      'Upload each new cut into Kreatli and keep using the same embedded experience. Behind the scenes, version history tracks which edit clients approved while stakeholders always see the latest review version.',
  },
  {
    icon: 'group',
    title: 'Guest Access & Permissions',
    description:
      'Control who can view, comment on, or approve each embedded video. Give clients frictionless guest access while keeping internal review rules, approvals, and permissions in your hands.',
  },
  {
    icon: 'folder',
    title: 'Embed Video Across Projects',
    description:
      'Use embedded videos across campaigns, training programs, and product launches while keeping every file organized in Kreatli projects. Your teams embed once and reuse content wherever it is needed.',
  },
  {
    icon: 'shield',
    title: 'Secure Embedded Experiences',
    description:
      'Keep embeds private to the audiences you choose while your source files stay protected in Kreatli. Share the convenience of embedded review without sacrificing security or control.',
  },
];

export const EMBED_VIDEO_WHY_CARDS: EmbedVideoFeatureCard[] = [
  {
    icon: 'eye',
    title: 'Centralized Feedback on Embedded Videos',
    description:
      'Even when people review your work through an embedded video, every comment, drawing, and approval is stored in Kreatli. Editors always know which cut was approved and what still needs work, no matter where the review happened.',
  },
  {
    icon: 'slides',
    title: 'Faster Approvals Where Stakeholders Already Work',
    description:
      'Let stakeholders review embedded videos inside tools they already use—portals, knowledge bases, or project spaces—so they can approve in minutes instead of waiting for attachments or new accounts.',
  },
  {
    icon: 'upload',
    title: 'No More Juggling Files or Links',
    description:
      'Stop uploading the same video to drives, file-transfer tools, and different portals just to get feedback. Embed once from Kreatli and keep one source of truth for every file, comment, and approval.',
  },
  {
    icon: 'checkCircle',
    title: 'Clarity on Who Watched and Responded',
    description:
      'Keep a clear record of who left feedback or approved each embedded video. While viewers enjoy a simple, embedded experience, your team sees the full context of participation inside Kreatli.',
  },
];
