import { ArticleCard } from '../types/articles';

function makeArticleCard(input: {
  id: string;
  full_slug: string;
  title: string;
  description: string;
  tags: string[];
  publishDate: string;
  readTime: string;
  imageFilename?: string;
}): ArticleCard {
  return {
    id: input.id,
    name: input.title,
    full_slug: input.full_slug,
    content: {
      metaFields: {
        title: input.title,
        description: input.description,
      },
      image: {
        filename: input.imageFilename ?? '/og-image.png',
      },
      publishDate: input.publishDate,
      readTime: input.readTime,
      tags: { value: input.tags },
    },
  };
}

/**
 * Curated “article cards” shown on platform feature pages.
 *
 * These are intentionally static to avoid Storyblok calls for non-resource pages.
 * The links point to the relevant section hubs (guides/comparisons/blog) so they
 * never depend on a specific Storyblok slug existing.
 */
export const PLATFORM_ARTICLES_BY_PATH: Record<string, ArticleCard[]> = {
  '/platform/creative-workspace': [
    makeArticleCard({
      id: 'platform-creative-workspace-guide',
      full_slug: '/guides/marketing-production-management',
      title: 'How Marketing Teams Use Kreatli to Manage Content Production',
      description:
        'Discover how marketing teams use Kreatli to plan, produce, review, and launch campaigns in one production management platform, without juggling multiple tools.',
      tags: ['Production Management', 'Marketing Teams'],
      publishDate: '2025-12-14 00:00',
      readTime: '9',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/7fb2ff9485/how-marketing-teams-use-kreatli-to-manage-production-from-brief-to-launch.png',
    }),
    makeArticleCard({
      id: 'platform-creative-workspace-comparisons',
      full_slug: '/comparisons/kreatli-vs-asana',
      title: 'Kreatli vs Asana - Production Teams Need More Than a PM Tool',
      description:
        'We compare Asana and Kreatli for creative production. Learn the differences in intake, review, approvals, asset handling, integrations, and a 30-day pilot.',
      tags: ['Tools Comparison', 'Cloud MAM'],
      publishDate: '2025-11-26 00:00',
      readTime: '10',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/739cc0edfe/kreatli-vs-asana-why-production-teams-need-more-than-a-generic-pm-tool.png',
    }),
    makeArticleCard({
      id: 'platform-creative-workspace-blog',
      full_slug: '/blog/production-platform-for-creative-teams',
      title: 'Why Creative Teams Are Moving Toward Unified Production Platforms',
      description:
        'Creative production is changing. Learn why teams are moving away from tool sprawl and legacy systems toward unified platforms like Kreatli.',
      tags: ['Production Management', 'Creative Teams'],
      publishDate: '2025-12-10 00:00',
      readTime: '10',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/7122ce61fe/why-creative-teams-are-moving-toward-unified-production-platforms.png',
    }),
  ],

  '/platform/review-approval': [
    makeArticleCard({
      id: 'platform-review-approval-guide',
      full_slug: '/guides/kreatli-for-video-production-companies',
      title: 'How Video Production Companies Manage Projects With Kreatli',
      description:
        'Learn how video production companies use Kreatli to manage projects, collaborate with clients, and streamline approvals from pre-production to delivery.',
      tags: ['Project Management', 'Video Production'],
      publishDate: '2025-12-25 00:00',
      readTime: '11',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/c12565cbe2/how-video-production-companies-manage-projects-with-kreatli.png',
    }),
    makeArticleCard({
      id: 'platform-review-approval-comparisons',
      full_slug: '/comparisons/kreatli-vs-frameio-2026',
      title: 'Kreatli vs Frame.io (2026): Most Practical Comparison Guide',
      description:
        'A practical 2026 guide comparing Kreatli and Frame.io for creative teams who need better production workflows.',
      tags: ['Creative Teams', 'Production Management'],
      publishDate: '2025-12-12 00:00',
      readTime: '12',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/7b1d4796a1/kreatli-vs-frame-io-2026-the-freshest-most-practical-comparison-for-creative-teams.png',
    }),
    makeArticleCard({
      id: 'platform-review-approval-blog',
      full_slug: '/blog/video-post-production',
      title: 'Post-Production Video Editing: How Collaboration Tools Improve Cuts',
      description:
        'Collaboration tools change how editors work - fewer context switches, frame-accurate feedback, faster turnarounds, and better reuse.',
      tags: ['Post-Production', 'Collaboration'],
      publishDate: '2025-11-12 00:00',
      readTime: '8',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/73fd78df64/post-production-video-editing-how-collaboration-tools-improve-cuts.png',
    }),
  ],

  '/platform/project-orchestration': [
    makeArticleCard({
      id: 'platform-project-orchestration-guide',
      full_slug: '/guides/marketing-production-management',
      title: 'How Marketing Teams Use Kreatli to Manage Content Production',
      description:
        'Discover how marketing teams use Kreatli to plan, produce, review, and launch campaigns in one production management platform, without juggling multiple tools.',
      tags: ['Production Management', 'Marketing Teams'],
      publishDate: '2025-12-14 00:00',
      readTime: '9',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/7fb2ff9485/how-marketing-teams-use-kreatli-to-manage-production-from-brief-to-launch.png',
    }),
    makeArticleCard({
      id: 'platform-project-orchestration-comparisons',
      full_slug: '/comparisons/kreatli-vs-asana',
      title: 'Kreatli vs Asana - Production Teams Need More Than a PM Tool',
      description:
        'We compare Asana and Kreatli for creative production. Learn the differences in intake, review, approvals, asset handling, integrations, and a 30-day pilot.',
      tags: ['Tools Comparison', 'Cloud MAM'],
      publishDate: '2025-11-26 00:00',
      readTime: '10',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/739cc0edfe/kreatli-vs-asana-why-production-teams-need-more-than-a-generic-pm-tool.png',
    }),
    makeArticleCard({
      id: 'platform-project-orchestration-blog',
      full_slug: '/blog/production-platform-for-creative-teams',
      title: 'Why Creative Teams Are Moving Toward Unified Production Platforms',
      description:
        'Creative production is changing. Learn why teams are moving away from tool sprawl and legacy systems toward unified platforms like Kreatli.',
      tags: ['Production Management', 'Creative Teams'],
      publishDate: '2025-12-10 00:00',
      readTime: '10',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/7122ce61fe/why-creative-teams-are-moving-toward-unified-production-platforms.png',
    }),
  ],

  '/platform/secure-asset-storage': [
    makeArticleCard({
      id: 'platform-secure-asset-storage-guide',
      full_slug: '/guides/kreatli-for-in-house-creative-teams',
      title: 'How In-House Creative Teams Manage Production With Kreatli',
      description:
        'See how in-house creative teams manage briefs, assets, feedback, and approvals in one place with Kreatli production management software.',
      tags: ['Production Management', 'Creative Teams'],
      publishDate: '2025-12-27 00:00',
      readTime: '11',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/f2144fa166/how-in-house-teams-run-creative-production-in-kreatli.png',
    }),
    makeArticleCard({
      id: 'platform-secure-asset-storage-comparisons',
      full_slug: '/comparisons/kreatli-vs-dropbox',
      title: 'Kreatli vs Dropbox & Google Drive',
      description:
        'File storage is essential, but creative production requires orchestration. See why Kreatli is the better choice for video, animation, and content teams.',
      tags: ['Tools Comparison', 'File Storage'],
      publishDate: '2025-11-27 00:00',
      readTime: '7',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/efe3e3b3a9/google-drive-file-storage-vs-production-management.png',
    }),
    makeArticleCard({
      id: 'platform-secure-asset-storage-blog',
      full_slug: '/blog/production-platform-for-creative-teams',
      title: 'Why Creative Teams Are Moving Toward Unified Production Platforms',
      description:
        'Creative production is changing. Learn why teams are moving away from tool sprawl and legacy systems toward unified platforms like Kreatli.',
      tags: ['Production Management', 'Creative Teams'],
      publishDate: '2025-12-10 00:00',
      readTime: '10',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/7122ce61fe/why-creative-teams-are-moving-toward-unified-production-platforms.png',
    }),
  ],

  '/platform/integrations': [
    makeArticleCard({
      id: 'platform-integrations-guide',
      full_slug: '/guides/kreatli-for-video-production-companies',
      title: 'How Video Production Companies Manage Projects With Kreatli',
      description:
        'Learn how video production companies use Kreatli to manage projects, collaborate with clients, and streamline approvals from pre-production to delivery.',
      tags: ['Project Management', 'Video Production'],
      publishDate: '2025-12-25 00:00',
      readTime: '11',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/c12565cbe2/how-video-production-companies-manage-projects-with-kreatli.png',
    }),
    makeArticleCard({
      id: 'platform-integrations-comparisons',
      full_slug: '/comparisons/kreatli-vs-dropbox',
      title: 'Kreatli vs Dropbox & Google Drive',
      description:
        'File storage is essential, but creative production requires orchestration. See why Kreatli is the better choice for video, animation, and content teams.',
      tags: ['Tools Comparison', 'File Storage'],
      publishDate: '2025-11-27 00:00',
      readTime: '7',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/efe3e3b3a9/google-drive-file-storage-vs-production-management.png',
    }),
    makeArticleCard({
      id: 'platform-integrations-blog',
      full_slug: '/blog/production-platform-for-creative-teams',
      title: 'Why Creative Teams Are Moving Toward Unified Production Platforms',
      description:
        'Creative production is changing. Learn why teams are moving away from tool sprawl and legacy systems toward unified platforms like Kreatli.',
      tags: ['Production Management', 'Creative Teams'],
      publishDate: '2025-12-10 00:00',
      readTime: '10',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/7122ce61fe/why-creative-teams-are-moving-toward-unified-production-platforms.png',
    }),
  ],
  '/platform/add-drawing-to-video': [
    makeArticleCard({
      id: 'platform-add-drawing-to-video-guide',
      full_slug: '/guides/kreatli-for-video-production-companies',
      title: 'How Video Teams Use Drawing Tools for Frame-Accurate Feedback',
      description:
        'See how video teams use drawing tools in Kreatli to add arrows, boxes, and markup directly on video frames for clear, frame-accurate feedback.',
      tags: ['Video Annotation', 'Creative Proofing'],
      publishDate: '2025-12-25 00:00',
      readTime: '9',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/c12565cbe2/how-video-production-companies-manage-projects-with-kreatli.png',
    }),
    makeArticleCard({
      id: 'platform-add-drawing-to-video-comparisons',
      full_slug: '/comparisons/kreatli-vs-frameio-2026',
      title: 'Kreatli vs Frame.io (2026): Drawing & Annotation for Video Teams',
      description:
        'Compare drawing and annotation workflows in Kreatli and Frame.io so video teams can choose the right platform for visual feedback on video frames.',
      tags: ['Creative Teams', 'Tools Comparison'],
      publishDate: '2025-12-12 00:00',
      readTime: '10',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/7b1d4796a1/kreatli-vs-frame-io-2026-the-freshest-most-practical-comparison-for-creative-teams.png',
    }),
    makeArticleCard({
      id: 'platform-add-drawing-to-video-blog',
      full_slug: '/blog/video-post-production',
      title: 'Why Drawing Directly on Video Frames Improves Post-Production',
      description:
        'Learn how drawing directly on video frames speeds up cuts, reduces revision cycles, and makes feedback clearer for editors and producers.',
      tags: ['Post-Production', 'Video Annotation'],
      publishDate: '2025-11-12 00:00',
      readTime: '8',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/73fd78df64/post-production-video-editing-how-collaboration-tools-improve-cuts.png',
    }),
  ],

  '/platform/free-video-link-generator': [
    makeArticleCard({
      id: 'platform-free-video-link-generator-guide',
      full_slug: '/guides/kreatli-for-video-production-companies',
      title: 'How Video Teams Use Shareable Links for Fast Approvals',
      description:
        'See how video teams replace heavy attachments and scattered WeTransfer links with secure, shareable review links that keep feedback and versions in one place.',
      tags: ['Video Review', 'Client Approvals'],
      publishDate: '2025-12-20 00:00',
      readTime: '8',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/73fd78df64/post-production-video-editing-how-collaboration-tools-improve-cuts.png',
    }),
    makeArticleCard({
      id: 'platform-free-video-link-generator-comparisons',
      full_slug: '/comparisons/kreatli-vs-frameio-2026',
      title: 'Kreatli vs Frame.io (2026): Sharing Links for Video Review',
      description:
        'Compare how Kreatli and Frame.io handle secure shareable links, guest access, and frame-accurate feedback for modern video review workflows.',
      tags: ['Tools Comparison', 'Video Review'],
      publishDate: '2025-12-18 00:00',
      readTime: '9',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/7b1d4796a1/kreatli-vs-frame-io-2026-the-freshest-most-practical-comparison-for-creative-teams.png',
    }),
    makeArticleCard({
      id: 'platform-free-video-link-generator-blog',
      full_slug: '/blog/video-post-production',
      title: 'Why Shareable Review Links Speed Up Post-Production',
      description:
        'Learn how moving approvals into a shared review space with secure links reduces delays, clarifies feedback, and shortens post-production cycles.',
      tags: ['Post-Production', 'Client Collaboration'],
      publishDate: '2025-11-18 00:00',
      readTime: '7',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/73fd78df64/post-production-video-editing-how-collaboration-tools-improve-cuts.png',
    }),
  ],

  '/platform/send-video': [
    makeArticleCard({
      id: 'platform-send-video-guide',
      full_slug: '/guides/kreatli-for-video-production-companies',
      title: 'How Video Teams Send Video for Fast Client Approvals',
      description:
        'See how video teams send video to clients via secure links instead of heavy attachments. Keep feedback and versions in one place when you send video for review.',
      tags: ['Send Video', 'Client Approvals'],
      publishDate: '2025-12-20 00:00',
      readTime: '8',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/73fd78df64/post-production-video-editing-how-collaboration-tools-improve-cuts.png',
    }),
    makeArticleCard({
      id: 'platform-send-video-comparisons',
      full_slug: '/comparisons/kreatli-vs-frameio-2026',
      title: 'Kreatli vs Frame.io (2026): Sending Video for Review',
      description:
        'Compare how Kreatli and Frame.io handle sending video via secure links, guest access, and frame-accurate feedback for modern video review workflows.',
      tags: ['Tools Comparison', 'Video Review'],
      publishDate: '2025-12-18 00:00',
      readTime: '9',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/7b1d4796a1/kreatli-vs-frame-io-2026-the-freshest-most-practical-comparison-for-creative-teams.png',
    }),
    makeArticleCard({
      id: 'platform-send-video-blog',
      full_slug: '/blog/video-post-production',
      title: 'Why Sending Video via Link Speeds Up Post-Production',
      description:
        'Learn how sending video through secure links instead of attachments reduces delays, clarifies feedback, and shortens post-production cycles.',
      tags: ['Post-Production', 'Client Collaboration'],
      publishDate: '2025-11-18 00:00',
      readTime: '7',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/73fd78df64/post-production-video-editing-how-collaboration-tools-improve-cuts.png',
    }),
  ],

  '/platform/video-annotation': [
    makeArticleCard({
      id: 'platform-video-annotation-guide',
      full_slug: '/guides/kreatli-for-video-production-companies',
      title: 'How Video Teams Use Frame-Accurate Annotation in Production',
      description:
        'See how video teams use frame-accurate annotations in Kreatli to capture precise feedback on cuts, motion, and graphics throughout post-production.',
      tags: ['Video Annotation', 'Post-Production'],
      publishDate: '2025-12-22 00:00',
      readTime: '9',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/73fd78df64/post-production-video-editing-how-collaboration-tools-improve-cuts.png',
    }),
    makeArticleCard({
      id: 'platform-video-annotation-comparisons',
      full_slug: '/comparisons/kreatli-vs-frameio-2026',
      title: 'Kreatli vs Frame.io (2026): Annotation & Review for Video Teams',
      description:
        'Compare how Kreatli and Frame.io approach frame-accurate annotation, multi-reviewer feedback, and version-aware review workflows.',
      tags: ['Tools Comparison', 'Video Review'],
      publishDate: '2025-12-19 00:00',
      readTime: '10',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/7b1d4796a1/kreatli-vs-frame-io-2026-the-freshest-most-practical-comparison-for-creative-teams.png',
    }),
    makeArticleCard({
      id: 'platform-video-annotation-blog',
      full_slug: '/blog/video-post-production',
      title: 'Why Frame-Accurate Annotation Speeds Up Post-Production',
      description:
        'Learn how tying feedback to exact frames with drawings and comments reduces miscommunication and shortens revision cycles for editors and producers.',
      tags: ['Post-Production', 'Client Collaboration'],
      publishDate: '2025-11-20 00:00',
      readTime: '8',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/73fd78df64/post-production-video-editing-how-collaboration-tools-improve-cuts.png',
    }),
  ],
};

export function getPlatformArticles(path: string): ArticleCard[] {
  return PLATFORM_ARTICLES_BY_PATH[path] ?? [];
}
