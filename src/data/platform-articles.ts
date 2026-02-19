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
  '/platform/add-drawing-to-video': [
    makeArticleCard({
      id: 'platform-add-drawing-to-video-guide-1',
      full_slug: '/guides/how-to-draw-on-a-video',
      title: 'How to Draw on a Video: A Complete Guide for Creative Teams',
      description:
        'Learn how to draw on a video for clearer feedback, faster reviews, and fewer revisions. A complete guide for creative teams and agencies.',
      tags: ['Video Annotation', 'Creative Teams'],
      publishDate: '2026-01-29 00:00',
      readTime: '10',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/a6c9b7bf88/how-to-draw-on-a-video-a-complete-guide-for-creative-teams.png',
    }),
    makeArticleCard({
      id: 'platform-add-drawing-to-video-guide-2',
      full_slug: '/guides/how-to-annotate-video',
      title: 'How to Annotate Video: A Complete Guide for Creative Teams',
      description:
        'Learn how to annotate video effectively to speed up feedback, reduce revisions, and improve collaboration for modern creative teams.',
      tags: ['Video Annotation', 'Creative Teams'],
      publishDate: '2026-01-25 00:00',
      readTime: '11',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/8e5704aa7c/how-to-annotate-video-a-complete-guide-for-creative-teams.png',
    }),
    makeArticleCard({
      id: 'platform-add-drawing-to-video-guide-3',
      full_slug: '/guides/video-frame-extractor-guide',
      title: 'Video Frame Extractor: How to Capture Frames (2026)',
      description:
        'Learn how to use the free Video Frame Extractor tool to capture specific frames from video files for thumbnails, proofs, or edits effortlessly. No signup required.',
      tags: ['Free Tools', 'Video'],
      publishDate: '2026-01-22 00:00',
      readTime: '12',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/7ce89e0197/video-frame-extractor-guide-capture-perfect-frames-from-video-free-tool.png',
    }),
  ],

  '/platform/comment-on-video': [
    makeArticleCard({
      id: 'platform-comment-on-video-guide-1',
      full_slug: '/guides/how-to-annotate-video',
      title: 'How to Annotate Video: A Complete Guide for Creative Teams',
      description:
        'Learn how to annotate video effectively to speed up feedback, reduce revisions, and improve collaboration for modern creative teams.',
      tags: ['Video Annotation', 'Creative Teams'],
      publishDate: '2026-01-25 00:00',
      readTime: '11',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/8e5704aa7c/how-to-annotate-video-a-complete-guide-for-creative-teams.png',
    }),
    makeArticleCard({
      id: 'platform-comment-on-video-guide-2',
      full_slug: '/guides/video-frame-extractor-guide',
      title: 'Video Frame Extractor: How to Capture Frames (2026)',
      description:
        'Learn how to use the free Video Frame Extractor tool to capture specific frames from video files for thumbnails, proofs, or edits effortlessly. No signup required.',
      tags: ['Free Tools', 'Video'],
      publishDate: '2026-01-22 00:00',
      readTime: '12',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/7ce89e0197/video-frame-extractor-guide-capture-perfect-frames-from-video-free-tool.png',
    }),
    makeArticleCard({
      id: 'platform-comment-on-video-guide-3',
      full_slug: '/comparisons/best-video-review-platforms-2026',
      title: 'Best Video Review Platforms for Creative Teams in 2026',
      description:
        'Compare the best video review platforms in 2026. See features, limitations, and why Kreatli offers a fundamentally different approach to video collaboration.',
      tags: ['Video Review', 'Creative Teams'],
      publishDate: '2026-01-17 00:00',
      readTime: '11',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/8d83a78aaf/best-video-review-platforms-for-creative-teams-in-2026.png',
    }),
  ],

  '/platform/video-versioning': [
    makeArticleCard({
      id: 'platform-video-versioning-guide-1',
      full_slug: '/guides/how-to-draw-on-a-video',
      title: 'How to Draw on a Video: A Complete Guide for Creative Teams',
      description:
        'Learn how to draw on a video for clearer feedback, faster reviews, and fewer revisions. A complete guide for creative teams and agencies.',
      tags: ['Video Annotation', 'Creative Teams'],
      publishDate: '2026-01-29 00:00',
      readTime: '10',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/a6c9b7bf88/how-to-draw-on-a-video-a-complete-guide-for-creative-teams.png',
    }),
    makeArticleCard({
      id: 'platform-video-versioning-guide-2',
      full_slug: '/guides/video-frame-extractor-guide',
      title: 'Video Frame Extractor: How to Capture Frames (2026)',
      description:
        'Learn how to use the free Video Frame Extractor tool to capture specific frames from video files for thumbnails, proofs, or edits effortlessly. No signup required.',
      tags: ['Free Tools', 'Video'],
      publishDate: '2026-01-22 00:00',
      readTime: '12',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/7ce89e0197/video-frame-extractor-guide-capture-perfect-frames-from-video-free-tool.png',
    }),
    makeArticleCard({
      id: 'platform-video-versioning-guide-3',
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
  ],

  '/platform/video-feedback': [
    makeArticleCard({
      id: 'platform-video-feedback-guide-1',
      full_slug: '/guides/how-to-annotate-video',
      title: 'How to Annotate Video: A Complete Guide for Creative Teams',
      description:
        'Learn how to annotate video effectively to speed up feedback, reduce revisions, and improve collaboration for modern creative teams.',
      tags: ['Video Annotation', 'Creative Teams'],
      publishDate: '2026-01-25 00:00',
      readTime: '11',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/8e5704aa7c/how-to-annotate-video-a-complete-guide-for-creative-teams.png',
    }),
    makeArticleCard({
      id: 'platform-video-feedback-guide-2',
      full_slug: '/guides/how-to-draw-on-a-video',
      title: 'How to Draw on a Video: A Complete Guide for Creative Teams',
      description:
        'Learn how to draw on a video for clearer feedback, faster reviews, and fewer revisions. A complete guide for creative teams and agencies.',
      tags: ['Video Annotation', 'Creative Teams'],
      publishDate: '2026-01-29 00:00',
      readTime: '10',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/a6c9b7bf88/how-to-draw-on-a-video-a-complete-guide-for-creative-teams.png',
    }),
    makeArticleCard({
      id: 'platform-video-feedback-guide-3',
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

  '/platform/draw-on-a-video': [
    makeArticleCard({
      id: 'platform-draw-on-a-video-guide-1',
      full_slug: '/guides/video-frame-extractor-guide',
      title: 'Video Frame Extractor: How to Capture Frames (2026)',
      description:
        'Learn how to use the free Video Frame Extractor tool to capture specific frames from video files for thumbnails, proofs, or edits effortlessly. No signup required.',
      tags: ['Free Tools', 'Video'],
      publishDate: '2026-01-22 00:00',
      readTime: '12',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/7ce89e0197/video-frame-extractor-guide-capture-perfect-frames-from-video-free-tool.png',
    }),
    makeArticleCard({
      id: 'platform-draw-on-a-video-guide-2',
      full_slug: '/guides/how-to-draw-on-a-video',
      title: 'How to Draw on a Video: A Complete Guide for Creative Teams',
      description:
        'Learn how to draw on a video for clearer feedback, faster reviews, and fewer revisions. A complete guide for creative teams and agencies.',
      tags: ['Video Annotation', 'Creative Teams'],
      publishDate: '2026-01-29 00:00',
      readTime: '10',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/a6c9b7bf88/how-to-draw-on-a-video-a-complete-guide-for-creative-teams.png',
    }),
    makeArticleCard({
      id: 'platform-draw-on-a-video-guide-3',
      full_slug: '/comparisons/frameio-alternatives-2026',
      title: 'The Best Frame.io Alternatives for Video Review & Approval (2026)',
      description:
        'Compare the best Frame.io alternatives in 2026. See which tools handle video review, approvals, and full production workflows at scale.',
      tags: ['Frame.io', 'Video Review'],
      publishDate: '2026-01-05 00:00',
      readTime: '14',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/7b1d4796a1/kreatli-vs-frame-io-2026-the-freshest-most-practical-comparison-for-creative-teams.png',
    }),
  ],

  '/platform/resize-youtube-banner': [
    makeArticleCard({
      id: 'platform-resize-youtube-banner-guide-1',
      full_slug: '/guides/youtube-banner-resizer',
      title: 'YouTube Banner Resizer Guide: Best Practices (2026)',
      description:
        'Learn how to resize your YouTube channel banner to the correct dimensions (2560×1440px) and use the safe zone so channel art looks great on mobile, desktop, tablet, and TV.',
      tags: ['YouTube', 'Channel Art', 'Free Tools'],
      publishDate: '2026-01-15 00:00',
      readTime: '8',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/f7d6f8ad99/youtube-banner-resizer-guide-dimensions-safe-zones-best-practices-2026.png',
    }),
    makeArticleCard({
      id: 'platform-resize-youtube-banner-guide-2',
      full_slug: '/guides/youtube-shorts-safe-zone',
      title: 'YouTube Shorts Safe Zone Guide (2026)',
      description:
        'Learn YouTube Shorts safe zones, UI overlays, and text placement best practices to protect visibility and scale short-form video workflows.',
      tags: ['YouTube Shorts', 'Safe Zone', 'Short-Form Video'],
      publishDate: '2026-01-13 00:00',
      readTime: '10',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/1410b38e54/youtube-shorts-safe-zone-guide-2026.png',
    }),
    makeArticleCard({
      id: 'platform-resize-youtube-banner-guide-3',
      full_slug: '/guides/instagram-reels-safe-zone',
      title: 'Instagram Reels Safe Zone Guide (2026)',
      description:
        'Learn Instagram Reels safe zones, text overlay rules, and best practices to avoid UI overlap and produce scalable, high-performing short-form video.',
      tags: ['Instagram Reels', 'Safe Zone', 'Short-Form Video'],
      publishDate: '2026-01-12 00:00',
      readTime: '9',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/762b429275/instagram-reels-safe-zone-guide-2026.png',
    }),
  ],

  '/platform/youtube-shorts-safe-zone': [
    makeArticleCard({
      id: 'platform-youtube-shorts-safe-zone-guide-1',
      full_slug: '/guides/youtube-shorts-safe-zone',
      title: 'YouTube Shorts Safe Zone Guide (2026)',
      description:
        'Learn YouTube Shorts safe zones, UI overlays, and text placement best practices to protect visibility and scale short-form video workflows.',
      tags: ['YouTube Shorts', 'Safe Zone', 'Short-Form Video'],
      publishDate: '2026-01-13 00:00',
      readTime: '10',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/1410b38e54/youtube-shorts-safe-zone-guide-2026.png',
    }),
    makeArticleCard({
      id: 'platform-youtube-shorts-safe-zone-guide-2',
      full_slug: '/guides/tiktok-safe-zone',
      title: 'TikTok Safe Zone Guide (2026)',
      description:
        'Learn TikTok safe zones, text placement rules, and best practices to avoid UI overlap and scale high-performing short-form video production.',
      tags: ['TikTok', 'Safe Zone', 'Short-Form Video'],
      publishDate: '2026-01-12 00:00',
      readTime: '10',
      imageFilename: 'https://a.storyblok.com/f/287637539865613/2250x750/625aaca538/tiktok-safe-zone-guide-2026.png',
    }),
    makeArticleCard({
      id: 'platform-youtube-shorts-safe-zone-guide-3',
      full_slug: '/guides/instagram-reels-safe-zone',
      title: 'Instagram Reels Safe Zone Guide (2026)',
      description:
        'Learn Instagram Reels safe zones, text overlay rules, and best practices to avoid UI overlap and produce scalable, high-performing short-form video.',
      tags: ['Instagram Reels', 'Safe Zone', 'Short-Form Video'],
      publishDate: '2026-01-12 00:00',
      readTime: '9',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/762b429275/instagram-reels-safe-zone-guide-2026.png',
    }),
  ],

  '/platform/tiktok-safe-zone': [
    makeArticleCard({
      id: 'platform-tiktok-safe-zone-guide-1',
      full_slug: '/guides/tiktok-safe-zone',
      title: 'TikTok Safe Zone Guide (2026)',
      description:
        'Learn TikTok safe zones, text placement rules, and best practices to avoid UI overlap and scale high-performing short-form video production.',
      tags: ['TikTok', 'Safe Zone', 'Short-Form Video'],
      publishDate: '2026-01-12 00:00',
      readTime: '10',
      imageFilename: 'https://a.storyblok.com/f/287637539865613/2250x750/625aaca538/tiktok-safe-zone-guide-2026.png',
    }),
    makeArticleCard({
      id: 'platform-tiktok-safe-zone-guide-2',
      full_slug: '/guides/instagram-reels-safe-zone',
      title: 'Instagram Reels Safe Zone Guide (2026)',
      description:
        'Learn Instagram Reels safe zones, text overlay rules, and best practices to avoid UI overlap and produce scalable, high-performing short-form video.',
      tags: ['Instagram Reels', 'Safe Zone', 'Short-Form Video'],
      publishDate: '2026-01-12 00:00',
      readTime: '9',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/762b429275/instagram-reels-safe-zone-guide-2026.png',
    }),
    makeArticleCard({
      id: 'platform-tiktok-safe-zone-guide-3',
      full_slug: '/guides/youtube-shorts-safe-zone',
      title: 'YouTube Shorts Safe Zone Guide (2026)',
      description:
        'Learn YouTube Shorts safe zones, UI overlays, and text placement best practices to protect visibility and scale short-form video workflows.',
      tags: ['YouTube Shorts', 'Safe Zone', 'Short-Form Video'],
      publishDate: '2026-01-13 00:00',
      readTime: '10',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/1410b38e54/youtube-shorts-safe-zone-guide-2026.png',
    }),
  ],

  '/platform/instagram-reels-safe-zone': [
    makeArticleCard({
      id: 'platform-instagram-reels-safe-zone-guide-1',
      full_slug: '/guides/instagram-reels-safe-zone',
      title: 'Instagram Reels Safe Zone Guide (2026)',
      description:
        'Learn Instagram Reels safe zones, text overlay rules, and best practices to avoid UI overlap and produce scalable, high-performing short-form video.',
      tags: ['Instagram Reels', 'Safe Zone', 'Short-Form Video'],
      publishDate: '2026-01-12 00:00',
      readTime: '9',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/762b429275/instagram-reels-safe-zone-guide-2026.png',
    }),
    makeArticleCard({
      id: 'platform-instagram-reels-safe-zone-guide-2',
      full_slug: '/guides/tiktok-safe-zone',
      title: 'TikTok Safe Zone Guide (2026)',
      description:
        'Learn TikTok safe zones, text placement rules, and best practices to avoid UI overlap and scale high-performing short-form video production.',
      tags: ['TikTok', 'Safe Zone', 'Short-Form Video'],
      publishDate: '2026-01-12 00:00',
      readTime: '10',
      imageFilename: 'https://a.storyblok.com/f/287637539865613/2250x750/625aaca538/tiktok-safe-zone-guide-2026.png',
    }),
    makeArticleCard({
      id: 'platform-instagram-reels-safe-zone-guide-3',
      full_slug: '/guides/youtube-shorts-safe-zone',
      title: 'YouTube Shorts Safe Zone Guide (2026)',
      description:
        'Learn YouTube Shorts safe zones, UI overlays, and text placement best practices to protect visibility and scale short-form video workflows.',
      tags: ['YouTube Shorts', 'Safe Zone', 'Short-Form Video'],
      publishDate: '2026-01-13 00:00',
      readTime: '10',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/1410b38e54/youtube-shorts-safe-zone-guide-2026.png',
    }),
  ],

  '/platform/extract-frames-from-video': [
    makeArticleCard({
      id: 'platform-extract-frames-from-video-guide-1',
      full_slug: '/guides/video-frame-extractor-guide',
      title: 'Video Frame Extractor: How to Capture Frames (2026)',
      description:
        'Learn how to use the free Video Frame Extractor tool to capture specific frames from video files for thumbnails, proofs, or edits effortlessly. No signup required.',
      tags: ['Free Tools', 'Video'],
      publishDate: '2026-01-22 00:00',
      readTime: '12',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/7ce89e0197/video-frame-extractor-guide-capture-perfect-frames-from-video-free-tool.png',
    }),
    makeArticleCard({
      id: 'platform-extract-frames-from-video-guide-2',
      full_slug: '/guides/how-to-annotate-video',
      title: 'How to Annotate Video: A Complete Guide for Creative Teams',
      description:
        'Learn how to annotate video effectively to speed up feedback, reduce revisions, and improve collaboration for modern creative teams.',
      tags: ['Video Annotation', 'Creative Teams'],
      publishDate: '2026-01-25 00:00',
      readTime: '11',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/8e5704aa7c/how-to-annotate-video-a-complete-guide-for-creative-teams.png',
    }),
    makeArticleCard({
      id: 'platform-extract-frames-from-video-guide-3',
      full_slug: '/guides/how-to-draw-on-a-video',
      title: 'How to Draw on a Video: A Complete Guide for Creative Teams',
      description:
        'Learn how to draw on a video for clearer feedback, faster reviews, and fewer revisions. A complete guide for creative teams and agencies.',
      tags: ['Video Annotation', 'Creative Teams'],
      publishDate: '2026-01-29 00:00',
      readTime: '10',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/a6c9b7bf88/how-to-draw-on-a-video-a-complete-guide-for-creative-teams.png',
    }),
  ],

  '/platform/free-video-link-generator': [
    makeArticleCard({
      id: 'platform-free-video-link-generator-guide-1',
      full_slug: '/guides/how-to-send-video-via-email',
      title: "How to Send a Video via Email (And When You Shouldn't)",
      description:
        'Learn how to send a video through email, understand file size limits, and discover better ways to share videos for review and approval.',
      tags: ['Send Video', 'Video Review'],
      publishDate: '2026-01-25 00:00',
      readTime: '10',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/30cdcaf2d6/how-to-send-a-video-via-email-and-when-you-shouldn-t.png',
    }),
    makeArticleCard({
      id: 'platform-free-video-link-generator-guide-2',
      full_slug: '/guides/share-large-video-files',
      title: '7 Ways to Share Large Video Files with Clients for Review and Approval',
      description:
        'Need reliable, secure ways to send large video files to clients? This practical guide compares seven methods, lists pros and cons, and gives a step-by-step workflow.',
      tags: ['Share Video', 'Client Approvals'],
      publishDate: '2025-12-01 00:00',
      readTime: '9',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/4a0a44cd65/7-ways-to-share-large-video-files-with-clients-for-review-and-approval.png',
    }),
    makeArticleCard({
      id: 'platform-free-video-link-generator-guide-3',
      full_slug: '/guides/large-file-tools',
      title: 'Send Large Files to Clients: 7 Tools That Let You Send 20GB+ Free',
      description:
        'We compare 7 practical options (cloud and peer-to-peer), show exactly how to use each one, list security caveats, and explain how to record delivery receipts.',
      tags: ['Large Files', 'Free Tools'],
      publishDate: '2025-11-18 00:00',
      readTime: '7',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/6b3b121e09/send-large-files-to-clients-7-tools-that-let-you-send-20gb-free.png',
    }),
  ],

  '/platform/send-large-video-files': [
    makeArticleCard({
      id: 'platform-send-large-video-files-guide-1',
      full_slug: '/guides/share-large-video-files',
      title: '7 Ways to Share Large Video Files with Clients for Review and Approval',
      description:
        'Need reliable, secure ways to send large video files to clients? This practical guide compares seven methods, lists pros and cons, and gives a step-by-step workflow.',
      tags: ['Share Video', 'Client Approvals'],
      publishDate: '2025-12-01 00:00',
      readTime: '9',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/4a0a44cd65/7-ways-to-share-large-video-files-with-clients-for-review-and-approval.png',
    }),
    makeArticleCard({
      id: 'platform-send-large-video-files-guide-2',
      full_slug: '/guides/how-to-send-video-via-email',
      title: "How to Send a Video via Email (And When You Shouldn't)",
      description:
        'Learn how to send a video through email, understand file size limits, and discover better ways to share videos for review and approval.',
      tags: ['Send Video', 'Video Review'],
      publishDate: '2026-01-25 00:00',
      readTime: '10',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/30cdcaf2d6/how-to-send-a-video-via-email-and-when-you-shouldn-t.png',
    }),
    makeArticleCard({
      id: 'platform-send-large-video-files-guide-3',
      full_slug: '/guides/large-file-tools',
      title: 'Send Large Files to Clients: 7 Tools That Let You Send 20GB+ Free',
      description:
        'We compare 7 practical options (cloud and peer-to-peer), show exactly how to use each one, list security caveats, and explain how to record delivery receipts.',
      tags: ['Large Files', 'Free Tools'],
      publishDate: '2025-11-18 00:00',
      readTime: '7',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/6b3b121e09/send-large-files-to-clients-7-tools-that-let-you-send-20gb-free.png',
    }),
  ],

  '/platform/send-video': [
    makeArticleCard({
      id: 'platform-send-video-guide-1',
      full_slug: '/guides/how-to-send-video-via-email',
      title: "How to Send a Video via Email (And When You Shouldn't)",
      description:
        'Learn how to send a video through email, understand file size limits, and discover better ways to share videos for review and approval.',
      tags: ['Send Video', 'Video Review'],
      publishDate: '2026-01-25 00:00',
      readTime: '10',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/30cdcaf2d6/how-to-send-a-video-via-email-and-when-you-shouldn-t.png',
    }),
    makeArticleCard({
      id: 'platform-send-video-guide-2',
      full_slug: '/guides/share-large-video-files',
      title: '7 Ways to Share Large Video Files with Clients for Review and Approval',
      description:
        'Need reliable, secure ways to send large video files to clients? This practical guide compares seven methods, lists pros and cons, and gives a step-by-step workflow.',
      tags: ['Share Video', 'Client Approvals'],
      publishDate: '2025-12-01 00:00',
      readTime: '9',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/4a0a44cd65/7-ways-to-share-large-video-files-with-clients-for-review-and-approval.png',
    }),
    makeArticleCard({
      id: 'platform-send-video-guide-3',
      full_slug: '/guides/large-file-tools',
      title: 'Send Large Files to Clients: 7 Tools That Let You Send 20GB+ Free',
      description:
        'We compare 7 practical options (cloud and peer-to-peer), show exactly how to use each one, list security caveats, and explain how to record delivery receipts.',
      tags: ['Large Files', 'Free Tools'],
      publishDate: '2025-11-18 00:00',
      readTime: '7',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/6b3b121e09/send-large-files-to-clients-7-tools-that-let-you-send-20gb-free.png',
    }),
  ],

  '/platform/video-annotation': [
    makeArticleCard({
      id: 'platform-video-annotation-guide-1',
      full_slug: '/guides/how-to-draw-on-a-video',
      title: 'How to Draw on a Video: A Complete Guide for Creative Teams',
      description:
        'Learn how to draw on a video for clearer feedback, faster reviews, and fewer revisions. A complete guide for creative teams and agencies.',
      tags: ['Video Annotation', 'Creative Teams'],
      publishDate: '2026-01-29 00:00',
      readTime: '10',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/a6c9b7bf88/how-to-draw-on-a-video-a-complete-guide-for-creative-teams.png',
    }),
    makeArticleCard({
      id: 'platform-video-annotation-guide-2',
      full_slug: '/guides/how-to-annotate-video',
      title: 'How to Annotate Video: A Complete Guide for Creative Teams',
      description:
        'Learn how to annotate video effectively to speed up feedback, reduce revisions, and improve collaboration for modern creative teams.',
      tags: ['Video Annotation', 'Creative Teams'],
      publishDate: '2026-01-25 00:00',
      readTime: '11',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/8e5704aa7c/how-to-annotate-video-a-complete-guide-for-creative-teams.png',
    }),
    makeArticleCard({
      id: 'platform-video-annotation-guide-3',
      full_slug: '/guides/video-frame-extractor-guide',
      title: 'Video Frame Extractor: How to Capture Frames (2026)',
      description:
        'Learn how to use the free Video Frame Extractor tool to capture specific frames from video files for thumbnails, proofs, or edits effortlessly. No signup required.',
      tags: ['Free Tools', 'Video'],
      publishDate: '2026-01-22 00:00',
      readTime: '12',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/7ce89e0197/video-frame-extractor-guide-capture-perfect-frames-from-video-free-tool.png',
    }),
  ],

  '/platform/annotate-pdf': [
    makeArticleCard({
      id: 'platform-annotate-pdf-guide-1',
      full_slug: '/guides/what-is-proofing-software',
      title: 'What Is Proofing Software? A Modern Guide for Creative Teams',
      description:
        'Learn what proofing software is, how online proofing tools work, and why modern creative teams are moving beyond traditional proofing workflows.',
      tags: ['Proofing', 'Creative Teams'],
      publishDate: '2026-01-19 00:00',
      readTime: '10',
      imageFilename: 'https://a.storyblok.com/f/287637539865613/2250x750/6fd6e95b81/what-is-proofing-software.png',
    }),
    makeArticleCard({
      id: 'platform-annotate-pdf-guide-2',
      full_slug: '/comparisons/proofing-software',
      title: 'Proofing Software vs Production Management: Key Differences and the Best Choice for Creative Teams',
      description:
        'Proofing tools accelerate review and approvals, production management platforms orchestrate the entire workflow. Learn the key differences, best-fit use cases, success metrics, and how to combine both effectively.',
      tags: ['Proofing', 'Production Management'],
      publishDate: '2025-12-05 00:00',
      readTime: '10',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/61be205673/proofing-software-vs-production-management-key-differences-and-the-best-choice-for-creative-teams.png',
    }),
    makeArticleCard({
      id: 'platform-annotate-pdf-guide-3',
      full_slug: '/guides/pdf-annotation-tools',
      title: 'PDF Annotation Tools: The Complete Guide for Creative Teams',
      description:
        'Discover the best PDF annotation tools for creative review workflows. Learn how to add comments, highlights, and drawings to PDFs for faster approvals.',
      tags: ['PDF Annotation', 'Creative Teams'],
      publishDate: '2026-01-25 00:00',
      readTime: '9',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/6fd6e95b81/what-is-proofing-software.png',
    }),
  ],

  '/platform/highlight-pdf': [
    makeArticleCard({
      id: 'platform-highlight-pdf-guide-1',
      full_slug: '/guides/what-is-proofing-software',
      title: 'What Is Proofing Software? A Modern Guide for Creative Teams',
      description:
        'Learn what proofing software is, how online proofing tools work, and why modern creative teams are moving beyond traditional proofing workflows.',
      tags: ['Proofing', 'Creative Teams'],
      publishDate: '2026-01-19 00:00',
      readTime: '10',
      imageFilename: 'https://a.storyblok.com/f/287637539865613/2250x750/6fd6e95b81/what-is-proofing-software.png',
    }),
    makeArticleCard({
      id: 'platform-highlight-pdf-guide-2',
      full_slug: '/comparisons/proofing-software',
      title: 'Proofing Software vs Production Management: Key Differences and the Best Choice for Creative Teams',
      description:
        'Proofing tools accelerate review and approvals, production management platforms orchestrate the entire workflow. Learn the key differences, best-fit use cases, success metrics, and how to combine both effectively.',
      tags: ['Proofing', 'Production Management'],
      publishDate: '2025-12-05 00:00',
      readTime: '10',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/61be205673/proofing-software-vs-production-management-key-differences-and-the-best-choice-for-creative-teams.png',
    }),
    makeArticleCard({
      id: 'platform-highlight-pdf-guide-3',
      full_slug: '/guides/how-to-draw-on-a-video',
      title: 'How to Draw on a Video: A Complete Guide for Creative Teams',
      description:
        'Learn how to draw on a video for clearer feedback, faster reviews, and fewer revisions. A complete guide for creative teams and agencies.',
      tags: ['Video Annotation', 'Creative Teams'],
      publishDate: '2026-01-29 00:00',
      readTime: '10',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/a6c9b7bf88/how-to-draw-on-a-video-a-complete-guide-for-creative-teams.png',
    }),
  ],

  '/platform/draw-on-documents': [
    makeArticleCard({
      id: 'platform-draw-on-documents-guide-1',
      full_slug: '/guides/what-is-proofing-software',
      title: 'What Is Proofing Software? A Modern Guide for Creative Teams',
      description:
        'Learn what proofing software is, how online proofing tools work, and why modern creative teams are moving beyond traditional proofing workflows.',
      tags: ['Proofing', 'Creative Teams'],
      publishDate: '2026-01-19 00:00',
      readTime: '10',
      imageFilename: 'https://a.storyblok.com/f/287637539865613/2250x750/6fd6e95b81/what-is-proofing-software.png',
    }),
    makeArticleCard({
      id: 'platform-draw-on-documents-guide-2',
      full_slug: '/comparisons/proofing-software',
      title: 'Proofing Software vs Production Management: Key Differences and the Best Choice for Creative Teams',
      description:
        'Proofing tools accelerate review and approvals, production management platforms orchestrate the entire workflow. Learn the key differences, best-fit use cases, success metrics, and how to combine both effectively.',
      tags: ['Proofing', 'Production Management'],
      publishDate: '2025-12-05 00:00',
      readTime: '10',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/61be205673/proofing-software-vs-production-management-key-differences-and-the-best-choice-for-creative-teams.png',
    }),
    makeArticleCard({
      id: 'platform-draw-on-documents-guide-3',
      full_slug: '/guides/pdf-annotation-tools',
      title: 'PDF Annotation Tools: The Complete Guide for Creative Teams',
      description:
        'Discover the best PDF annotation tools for creative review workflows. Learn how to add comments, highlights, and drawings to PDFs for faster approvals.',
      tags: ['PDF Annotation', 'Creative Teams'],
      publishDate: '2026-01-25 00:00',
      readTime: '9',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/6fd6e95b81/what-is-proofing-software.png',
    }),
  ],

  '/platform/draw-on-image': [
    makeArticleCard({
      id: 'platform-draw-on-image-guide-1',
      full_slug: '/guides/what-is-proofing-software',
      title: 'What Is Proofing Software? A Modern Guide for Creative Teams',
      description:
        'Learn what proofing software is, how online proofing tools work, and why modern creative teams are moving beyond traditional proofing workflows.',
      tags: ['Proofing', 'Creative Teams'],
      publishDate: '2026-01-19 00:00',
      readTime: '10',
      imageFilename: 'https://a.storyblok.com/f/287637539865613/2250x750/6fd6e95b81/what-is-proofing-software.png',
    }),
    makeArticleCard({
      id: 'platform-draw-on-image-guide-2',
      full_slug: '/comparisons/proofing-software',
      title: 'Proofing Software vs Production Management: Key Differences and the Best Choice for Creative Teams',
      description:
        'Proofing tools accelerate review and approvals, production management platforms orchestrate the entire workflow. Learn the key differences, best-fit use cases, success metrics, and how to combine both effectively.',
      tags: ['Proofing', 'Production Management'],
      publishDate: '2025-12-05 00:00',
      readTime: '10',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/61be205673/proofing-software-vs-production-management-key-differences-and-the-best-choice-for-creative-teams.png',
    }),
    makeArticleCard({
      id: 'platform-draw-on-image-guide-3',
      full_slug: '/guides/how-to-draw-on-a-video',
      title: 'How to Draw on a Video: A Complete Guide for Creative Teams',
      description:
        'Learn how to draw on a video for clearer feedback, faster reviews, and fewer revisions. A complete guide for creative teams and agencies.',
      tags: ['Video Annotation', 'Creative Teams'],
      publishDate: '2026-01-29 00:00',
      readTime: '10',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/a6c9b7bf88/how-to-draw-on-a-video-a-complete-guide-for-creative-teams.png',
    }),
  ],

  '/platform/annotate-document': [
    makeArticleCard({
      id: 'platform-annotate-document-guide-1',
      full_slug: '/guides/what-is-proofing-software',
      title: 'What Is Proofing Software? A Modern Guide for Creative Teams',
      description:
        'Learn what proofing software is, how online proofing tools work, and why modern creative teams are moving beyond traditional proofing workflows.',
      tags: ['Proofing', 'Creative Teams'],
      publishDate: '2026-01-19 00:00',
      readTime: '10',
      imageFilename: 'https://a.storyblok.com/f/287637539865613/2250x750/6fd6e95b81/what-is-proofing-software.png',
    }),
    makeArticleCard({
      id: 'platform-annotate-document-guide-2',
      full_slug: '/comparisons/proofing-software',
      title: 'Proofing Software vs Production Management: Key Differences and the Best Choice for Creative Teams',
      description:
        'Proofing tools accelerate review and approvals, production management platforms orchestrate the entire workflow. Learn the key differences, best-fit use cases, success metrics, and how to combine both effectively.',
      tags: ['Proofing', 'Production Management'],
      publishDate: '2025-12-05 00:00',
      readTime: '10',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/61be205673/proofing-software-vs-production-management-key-differences-and-the-best-choice-for-creative-teams.png',
    }),
    makeArticleCard({
      id: 'platform-annotate-document-guide-3',
      full_slug: '/guides/how-to-annotate-video',
      title: 'How to Annotate Video: A Complete Guide for Creative Teams',
      description:
        'Learn how to annotate video effectively to speed up feedback, reduce revisions, and improve collaboration for modern creative teams.',
      tags: ['Video Annotation', 'Creative Teams'],
      publishDate: '2026-01-25 00:00',
      readTime: '11',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/8e5704aa7c/how-to-annotate-video-a-complete-guide-for-creative-teams.png',
    }),
  ],

  '/platform/annotate-image': [
    makeArticleCard({
      id: 'platform-annotate-image-guide-1',
      full_slug: '/guides/what-is-proofing-software',
      title: 'What Is Proofing Software? A Modern Guide for Creative Teams',
      description:
        'Learn what proofing software is, how online proofing tools work, and why modern creative teams are moving beyond traditional proofing workflows.',
      tags: ['Proofing', 'Creative Teams'],
      publishDate: '2026-01-19 00:00',
      readTime: '10',
      imageFilename: 'https://a.storyblok.com/f/287637539865613/2250x750/6fd6e95b81/what-is-proofing-software.png',
    }),
    makeArticleCard({
      id: 'platform-annotate-image-guide-2',
      full_slug: '/comparisons/proofing-software',
      title: 'Proofing Software vs Production Management: Key Differences and the Best Choice for Creative Teams',
      description:
        'Proofing tools accelerate review and approvals, production management platforms orchestrate the entire workflow. Learn the key differences, best-fit use cases, success metrics, and how to combine both effectively.',
      tags: ['Proofing', 'Production Management'],
      publishDate: '2025-12-05 00:00',
      readTime: '10',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/61be205673/proofing-software-vs-production-management-key-differences-and-the-best-choice-for-creative-teams.png',
    }),
    makeArticleCard({
      id: 'platform-annotate-image-guide-3',
      full_slug: '/guides/how-to-annotate-video',
      title: 'How to Annotate Video: A Complete Guide for Creative Teams',
      description:
        'Learn how to annotate video effectively to speed up feedback, reduce revisions, and improve collaboration for modern creative teams.',
      tags: ['Video Annotation', 'Creative Teams'],
      publishDate: '2026-01-25 00:00',
      readTime: '11',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/8e5704aa7c/how-to-annotate-video-a-complete-guide-for-creative-teams.png',
    }),
  ],

  '/platform/add-comments-to-pdf': [
    makeArticleCard({
      id: 'platform-add-comments-to-pdf-guide-1',
      full_slug: '/guides/what-is-proofing-software',
      title: 'What Is Proofing Software? A Modern Guide for Creative Teams',
      description:
        'Learn what proofing software is, how online proofing tools work, and why modern creative teams are moving beyond traditional proofing workflows.',
      tags: ['Proofing', 'Creative Teams'],
      publishDate: '2026-01-19 00:00',
      readTime: '10',
      imageFilename: 'https://a.storyblok.com/f/287637539865613/2250x750/6fd6e95b81/what-is-proofing-software.png',
    }),
    makeArticleCard({
      id: 'platform-add-comments-to-pdf-guide-2',
      full_slug: '/comparisons/proofing-software',
      title: 'Proofing Software vs Production Management: Key Differences and the Best Choice for Creative Teams',
      description:
        'Proofing tools accelerate review and approvals, production management platforms orchestrate the entire workflow. Learn the key differences, best-fit use cases, success metrics, and how to combine both effectively.',
      tags: ['Proofing', 'Production Management'],
      publishDate: '2025-12-05 00:00',
      readTime: '10',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/61be205673/proofing-software-vs-production-management-key-differences-and-the-best-choice-for-creative-teams.png',
    }),
    makeArticleCard({
      id: 'platform-add-comments-to-pdf-guide-3',
      full_slug: '/guides/how-to-annotate-video',
      title: 'How to Annotate Video: A Complete Guide for Creative Teams',
      description:
        'Learn how to annotate video effectively to speed up feedback, reduce revisions, and improve collaboration for modern creative teams.',
      tags: ['Video Annotation', 'Creative Teams'],
      publishDate: '2026-01-25 00:00',
      readTime: '11',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/8e5704aa7c/how-to-annotate-video-a-complete-guide-for-creative-teams.png',
    }),
  ],

  '/platform/draw-on-pdf-document': [
    makeArticleCard({
      id: 'platform-draw-on-pdf-document-guide-1',
      full_slug: '/guides/what-is-proofing-software',
      title: 'What Is Proofing Software? A Modern Guide for Creative Teams',
      description:
        'Learn what proofing software is, how online proofing tools work, and why modern creative teams are moving beyond traditional proofing workflows.',
      tags: ['Proofing', 'Creative Teams'],
      publishDate: '2026-01-19 00:00',
      readTime: '10',
      imageFilename: 'https://a.storyblok.com/f/287637539865613/2250x750/6fd6e95b81/what-is-proofing-software.png',
    }),
    makeArticleCard({
      id: 'platform-draw-on-pdf-document-guide-2',
      full_slug: '/comparisons/proofing-software',
      title: 'Proofing Software vs Production Management: Key Differences and the Best Choice for Creative Teams',
      description:
        'Proofing tools accelerate review and approvals, production management platforms orchestrate the entire workflow. Learn the key differences, best-fit use cases, success metrics, and how to combine both effectively.',
      tags: ['Proofing', 'Production Management'],
      publishDate: '2025-12-05 00:00',
      readTime: '10',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/61be205673/proofing-software-vs-production-management-key-differences-and-the-best-choice-for-creative-teams.png',
    }),
    makeArticleCard({
      id: 'platform-draw-on-pdf-document-guide-3',
      full_slug: '/guides/pdf-annotation-tools',
      title: 'PDF Annotation Tools: The Complete Guide for Creative Teams',
      description:
        'Discover the best PDF annotation tools for creative review workflows. Learn how to add comments, highlights, and drawings to PDFs for faster approvals.',
      tags: ['PDF Annotation', 'Creative Teams'],
      publishDate: '2026-01-25 00:00',
      readTime: '9',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/6fd6e95b81/what-is-proofing-software.png',
    }),
  ],

  '/platform/pdf-version-control': [
    makeArticleCard({
      id: 'platform-pdf-version-control-guide-1',
      full_slug: '/guides/what-is-proofing-software',
      title: 'What Is Proofing Software? A Modern Guide for Creative Teams',
      description:
        'Learn what proofing software is, how online proofing tools work, and why modern creative teams are moving beyond traditional proofing workflows.',
      tags: ['Proofing', 'Creative Teams'],
      publishDate: '2026-01-19 00:00',
      readTime: '10',
      imageFilename: 'https://a.storyblok.com/f/287637539865613/2250x750/6fd6e95b81/what-is-proofing-software.png',
    }),
    makeArticleCard({
      id: 'platform-pdf-version-control-guide-2',
      full_slug: '/comparisons/proofing-software',
      title: 'Proofing Software vs Production Management: Key Differences and the Best Choice for Creative Teams',
      description:
        'Proofing tools accelerate review and approvals, production management platforms orchestrate the entire workflow. Learn the key differences, best-fit use cases, success metrics, and how to combine both effectively.',
      tags: ['Proofing', 'Production Management'],
      publishDate: '2025-12-05 00:00',
      readTime: '10',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/61be205673/proofing-software-vs-production-management-key-differences-and-the-best-choice-for-creative-teams.png',
    }),
    makeArticleCard({
      id: 'platform-pdf-version-control-guide-3',
      full_slug: '/guides/pdf-annotation-tools',
      title: 'PDF Annotation Tools: The Complete Guide for Creative Teams',
      description:
        'Discover the best PDF annotation tools for creative review workflows. Learn how to add comments, highlights, and drawings to PDFs for faster approvals.',
      tags: ['PDF Annotation', 'Creative Teams'],
      publishDate: '2026-01-25 00:00',
      readTime: '9',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/6fd6e95b81/what-is-proofing-software.png',
    }),
  ],

  '/platform/document-version-control': [
    makeArticleCard({
      id: 'platform-document-version-control-guide-1',
      full_slug: '/guides/what-is-proofing-software',
      title: 'What Is Proofing Software? A Modern Guide for Creative Teams',
      description:
        'Learn what proofing software is, how online proofing tools work, and why modern creative teams are moving beyond traditional proofing workflows.',
      tags: ['Proofing', 'Creative Teams'],
      publishDate: '2026-01-19 00:00',
      readTime: '10',
      imageFilename: 'https://a.storyblok.com/f/287637539865613/2250x750/6fd6e95b81/what-is-proofing-software.png',
    }),
    makeArticleCard({
      id: 'platform-document-version-control-guide-2',
      full_slug: '/comparisons/proofing-software',
      title: 'Proofing Software vs Production Management: Key Differences and the Best Choice for Creative Teams',
      description:
        'Proofing tools accelerate review and approvals, production management platforms orchestrate the entire workflow. Learn the key differences, best-fit use cases, success metrics, and how to combine both effectively.',
      tags: ['Proofing', 'Production Management'],
      publishDate: '2025-12-05 00:00',
      readTime: '10',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/61be205673/proofing-software-vs-production-management-key-differences-and-the-best-choice-for-creative-teams.png',
    }),
    makeArticleCard({
      id: 'platform-document-version-control-guide-3',
      full_slug: '/guides/how-to-annotate-video',
      title: 'How to Annotate Video: A Complete Guide for Creative Teams',
      description:
        'Learn how to annotate video effectively to speed up feedback, reduce revisions, and improve collaboration for modern creative teams.',
      tags: ['Video Annotation', 'Creative Teams'],
      publishDate: '2026-01-25 00:00',
      readTime: '11',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/8e5704aa7c/how-to-annotate-video-a-complete-guide-for-creative-teams.png',
    }),
  ],

  '/platform/pdf-to-link': [
    makeArticleCard({
      id: 'platform-pdf-to-link-guide-1',
      full_slug: '/guides/what-is-proofing-software',
      title: 'What Is Proofing Software? A Modern Guide for Creative Teams',
      description:
        'Learn what proofing software is, how online proofing tools work, and why modern creative teams are moving beyond traditional proofing workflows.',
      tags: ['Proofing', 'Creative Teams'],
      publishDate: '2026-01-19 00:00',
      readTime: '10',
      imageFilename: 'https://a.storyblok.com/f/287637539865613/2250x750/6fd6e95b81/what-is-proofing-software.png',
    }),
    makeArticleCard({
      id: 'platform-pdf-to-link-guide-2',
      full_slug: '/comparisons/proofing-software',
      title: 'Proofing Software vs Production Management: Key Differences and the Best Choice for Creative Teams',
      description:
        'Proofing tools accelerate review and approvals, production management platforms orchestrate the entire workflow. Learn the key differences, best-fit use cases, success metrics, and how to combine both effectively.',
      tags: ['Proofing', 'Production Management'],
      publishDate: '2025-12-05 00:00',
      readTime: '10',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/61be205673/proofing-software-vs-production-management-key-differences-and-the-best-choice-for-creative-teams.png',
    }),
    makeArticleCard({
      id: 'platform-pdf-to-link-guide-3',
      full_slug: '/guides/how-to-annotate-video',
      title: 'How to Annotate Video: A Complete Guide for Creative Teams',
      description:
        'Learn how to annotate video effectively to speed up feedback, reduce revisions, and improve collaboration for modern creative teams.',
      tags: ['Video Annotation', 'Creative Teams'],
      publishDate: '2026-01-25 00:00',
      readTime: '11',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/8e5704aa7c/how-to-annotate-video-a-complete-guide-for-creative-teams.png',
    }),
  ],

  '/platform/image-to-link': [
    makeArticleCard({
      id: 'platform-image-to-link-guide-1',
      full_slug: '/guides/what-is-proofing-software',
      title: 'What Is Proofing Software? A Modern Guide for Creative Teams',
      description:
        'Learn what proofing software is, how online proofing tools work, and why modern creative teams are moving beyond traditional proofing workflows.',
      tags: ['Proofing', 'Creative Teams'],
      publishDate: '2026-01-19 00:00',
      readTime: '10',
      imageFilename: 'https://a.storyblok.com/f/287637539865613/2250x750/6fd6e95b81/what-is-proofing-software.png',
    }),
    makeArticleCard({
      id: 'platform-image-to-link-guide-2',
      full_slug: '/comparisons/proofing-software',
      title: 'Proofing Software vs Production Management: Key Differences and the Best Choice for Creative Teams',
      description:
        'Proofing tools accelerate review and approvals, production management platforms orchestrate the entire workflow. Learn the key differences, best-fit use cases, success metrics, and how to combine both effectively.',
      tags: ['Proofing', 'Production Management'],
      publishDate: '2025-12-05 00:00',
      readTime: '10',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/61be205673/proofing-software-vs-production-management-key-differences-and-the-best-choice-for-creative-teams.png',
    }),
    makeArticleCard({
      id: 'platform-image-to-link-guide-3',
      full_slug: '/guides/how-to-annotate-video',
      title: 'How to Annotate Video: A Complete Guide for Creative Teams',
      description:
        'Learn how to annotate video effectively to speed up feedback, reduce revisions, and improve collaboration for modern creative teams.',
      tags: ['Video Annotation', 'Creative Teams'],
      publishDate: '2026-01-25 00:00',
      readTime: '11',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/8e5704aa7c/how-to-annotate-video-a-complete-guide-for-creative-teams.png',
    }),
  ],

  '/platform/picture-into-url': [
    makeArticleCard({
      id: 'platform-picture-into-url-guide-1',
      full_slug: '/guides/what-is-proofing-software',
      title: 'What Is Proofing Software? A Modern Guide for Creative Teams',
      description:
        'Learn what proofing software is, how online proofing tools work, and why modern creative teams are moving beyond traditional proofing workflows.',
      tags: ['Proofing', 'Creative Teams'],
      publishDate: '2026-01-19 00:00',
      readTime: '10',
      imageFilename: 'https://a.storyblok.com/f/287637539865613/2250x750/6fd6e95b81/what-is-proofing-software.png',
    }),
    makeArticleCard({
      id: 'platform-picture-into-url-guide-2',
      full_slug: '/comparisons/proofing-software',
      title: 'Proofing Software vs Production Management: Key Differences and the Best Choice for Creative Teams',
      description:
        'Proofing tools accelerate review and approvals, production management platforms orchestrate the entire workflow. Learn the key differences, best-fit use cases, success metrics, and how to combine both effectively.',
      tags: ['Proofing', 'Production Management'],
      publishDate: '2025-12-05 00:00',
      readTime: '10',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/61be205673/proofing-software-vs-production-management-key-differences-and-the-best-choice-for-creative-teams.png',
    }),
    makeArticleCard({
      id: 'platform-picture-into-url-guide-3',
      full_slug: '/guides/how-to-annotate-video',
      title: 'How to Annotate Video: A Complete Guide for Creative Teams',
      description:
        'Learn how to annotate video effectively to speed up feedback, reduce revisions, and improve collaboration for modern creative teams.',
      tags: ['Video Annotation', 'Creative Teams'],
      publishDate: '2026-01-25 00:00',
      readTime: '11',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/8e5704aa7c/how-to-annotate-video-a-complete-guide-for-creative-teams.png',
    }),
  ],

  '/platform/review-pdf': [
    makeArticleCard({
      id: 'platform-review-pdf-guide-1',
      full_slug: '/guides/what-is-proofing-software',
      title: 'What Is Proofing Software? A Modern Guide for Creative Teams',
      description:
        'Learn what proofing software is, how online proofing tools work, and why modern creative teams are moving beyond traditional proofing workflows.',
      tags: ['Proofing', 'Creative Teams'],
      publishDate: '2026-01-19 00:00',
      readTime: '10',
      imageFilename: 'https://a.storyblok.com/f/287637539865613/2250x750/6fd6e95b81/what-is-proofing-software.png',
    }),
    makeArticleCard({
      id: 'platform-review-pdf-guide-2',
      full_slug: '/comparisons/proofing-software',
      title: 'Proofing Software vs Production Management: Key Differences and the Best Choice for Creative Teams',
      description:
        'Proofing tools accelerate review and approvals, production management platforms orchestrate the entire workflow. Learn the key differences, best-fit use cases, success metrics, and how to combine both effectively.',
      tags: ['Proofing', 'Production Management'],
      publishDate: '2025-12-05 00:00',
      readTime: '10',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/61be205673/proofing-software-vs-production-management-key-differences-and-the-best-choice-for-creative-teams.png',
    }),
    makeArticleCard({
      id: 'platform-review-pdf-guide-3',
      full_slug: '/guides/pdf-annotation-tools',
      title: 'PDF Annotation Tools: The Complete Guide for Creative Teams',
      description:
        'Discover the best PDF annotation tools for creative review workflows. Learn how to add comments, highlights, and drawings to PDFs for faster approvals.',
      tags: ['PDF Annotation', 'Creative Teams'],
      publishDate: '2026-01-25 00:00',
      readTime: '9',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/6fd6e95b81/what-is-proofing-software.png',
    }),
  ],

  '/platform/compare-pdf-files': [
    makeArticleCard({
      id: 'platform-compare-pdf-guide-1',
      full_slug: '/guides/what-is-proofing-software',
      title: 'What Is Proofing Software? A Modern Guide for Creative Teams',
      description:
        'Learn what proofing software is, how online proofing tools work, and why modern creative teams are moving beyond traditional proofing workflows.',
      tags: ['Proofing', 'Creative Teams'],
      publishDate: '2026-01-19 00:00',
      readTime: '10',
      imageFilename: 'https://a.storyblok.com/f/287637539865613/2250x750/6fd6e95b81/what-is-proofing-software.png',
    }),
    makeArticleCard({
      id: 'platform-compare-pdf-guide-2',
      full_slug: '/comparisons/proofing-software',
      title: 'Proofing Software vs Production Management: Key Differences and the Best Choice for Creative Teams',
      description:
        'Proofing tools accelerate review and approvals, production management platforms orchestrate the entire workflow. Learn the key differences, best-fit use cases, success metrics, and how to combine both effectively.',
      tags: ['Proofing', 'Production Management'],
      publishDate: '2025-12-05 00:00',
      readTime: '10',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/61be205673/proofing-software-vs-production-management-key-differences-and-the-best-choice-for-creative-teams.png',
    }),
    makeArticleCard({
      id: 'platform-compare-pdf-guide-3',
      full_slug: '/guides/how-to-draw-on-a-video',
      title: 'How to Draw on a Video: A Complete Guide for Creative Teams',
      description:
        'Learn how to draw on a video for clearer feedback, faster reviews, and fewer revisions. A complete guide for creative teams and agencies.',
      tags: ['Video Annotation', 'Creative Teams'],
      publishDate: '2026-01-29 00:00',
      readTime: '10',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/a6c9b7bf88/how-to-draw-on-a-video-a-complete-guide-for-creative-teams.png',
    }),
  ],

  '/platform/compare-videos': [
    makeArticleCard({
      id: 'platform-compare-videos-guide-1',
      full_slug: '/comparisons/best-video-review-platforms-2026',
      title: 'Best Video Review Platforms for Creative Teams in 2026',
      description:
        'Compare the best video review platforms in 2026. See features, limitations, and why Kreatli offers a fundamentally different approach to video collaboration.',
      tags: ['Video Review', 'Creative Teams'],
      publishDate: '2026-01-17 00:00',
      readTime: '11',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/8d83a78aaf/best-video-review-platforms-for-creative-teams-in-2026.png',
    }),
    makeArticleCard({
      id: 'platform-compare-videos-guide-2',
      full_slug: '/comparisons/frameio-alternatives-2026',
      title: 'The Best Frame.io Alternatives for Video Review & Approval (2026)',
      description:
        'Compare the best Frame.io alternatives in 2026. See which tools handle video review, approvals, and full production workflows at scale.',
      tags: ['Frame.io', 'Video Review'],
      publishDate: '2026-01-05 00:00',
      readTime: '14',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/7b1d4796a1/kreatli-vs-frame-io-2026-the-freshest-most-practical-comparison-for-creative-teams.png',
    }),
    makeArticleCard({
      id: 'platform-compare-videos-guide-3',
      full_slug: '/comparisons/proofing-software',
      title: 'Proofing Software vs Production Management: Key Differences and the Best Choice for Creative Teams',
      description:
        'Proofing tools accelerate review and approvals, production management platforms orchestrate the entire workflow. Learn the key differences, best-fit use cases, success metrics, and how to combine both effectively.',
      tags: ['Proofing', 'Production Management'],
      publishDate: '2025-12-05 00:00',
      readTime: '10',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/61be205673/proofing-software-vs-production-management-key-differences-and-the-best-choice-for-creative-teams.png',
    }),
  ],

  '/platform/compare-documents-online': [
    makeArticleCard({
      id: 'platform-compare-docs-guide-1',
      full_slug: '/guides/what-is-proofing-software',
      title: 'What Is Proofing Software? A Modern Guide for Creative Teams',
      description:
        'Learn what proofing software is, how online proofing tools work, and why modern creative teams are moving beyond traditional proofing workflows.',
      tags: ['Proofing', 'Creative Teams'],
      publishDate: '2026-01-19 00:00',
      readTime: '10',
      imageFilename: 'https://a.storyblok.com/f/287637539865613/2250x750/6fd6e95b81/what-is-proofing-software.png',
    }),
    makeArticleCard({
      id: 'platform-compare-docs-guide-2',
      full_slug: '/comparisons/proofing-software',
      title: 'Proofing Software vs Production Management: Key Differences and the Best Choice for Creative Teams',
      description:
        'Proofing tools accelerate review and approvals, production management platforms orchestrate the entire workflow. Learn the key differences, best-fit use cases, success metrics, and how to combine both effectively.',
      tags: ['Proofing', 'Production Management'],
      publishDate: '2025-12-05 00:00',
      readTime: '10',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/61be205673/proofing-software-vs-production-management-key-differences-and-the-best-choice-for-creative-teams.png',
    }),
    makeArticleCard({
      id: 'platform-compare-docs-guide-3',
      full_slug: '/guides/pdf-annotation-tools',
      title: 'PDF Annotation Tools: The Complete Guide for Creative Teams',
      description:
        'Discover the best PDF annotation tools for creative review workflows. Learn how to add comments, highlights, and drawings to PDFs for faster approvals.',
      tags: ['PDF Annotation', 'Creative Teams'],
      publishDate: '2026-01-25 00:00',
      readTime: '9',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/6fd6e95b81/what-is-proofing-software.png',
    }),
  ],

  '/platform/share-mp4': [
    makeArticleCard({
      id: 'platform-share-mp4-guide-1',
      full_slug: '/guides/how-to-send-video-via-email',
      title: "How to Send a Video via Email (And When You Shouldn't)",
      description:
        'Learn how to send a video through email, understand file size limits, and discover better ways to share videos for review and approval.',
      tags: ['Send Video', 'Video Review'],
      publishDate: '2026-01-25 00:00',
      readTime: '10',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/30cdcaf2d6/how-to-send-a-video-via-email-and-when-you-shouldn-t.png',
    }),
    makeArticleCard({
      id: 'platform-share-mp4-guide-2',
      full_slug: '/guides/share-large-video-files',
      title: '7 Ways to Share Large Video Files with Clients for Review and Approval',
      description:
        'Need reliable, secure ways to send large video files to clients? This practical guide compares seven methods, lists pros and cons, and gives a step-by-step workflow.',
      tags: ['Share Video', 'Client Approvals'],
      publishDate: '2025-12-01 00:00',
      readTime: '9',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/4a0a44cd65/7-ways-to-share-large-video-files-with-clients-for-review-and-approval.png',
    }),
    makeArticleCard({
      id: 'platform-share-mp4-guide-3',
      full_slug: '/guides/large-file-tools',
      title: 'Send Large Files to Clients: 7 Tools That Let You Send 20GB+ Free',
      description:
        'We compare 7 practical options (cloud and peer-to-peer), show exactly how to use each one, list security caveats, and explain how to record delivery receipts.',
      tags: ['Large Files', 'Free Tools'],
      publishDate: '2025-11-18 00:00',
      readTime: '7',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/6b3b121e09/send-large-files-to-clients-7-tools-that-let-you-send-20gb-free.png',
    }),
  ],

  '/platform/share-video': [
    makeArticleCard({
      id: 'platform-share-video-guide-1',
      full_slug: '/guides/how-to-send-video-via-email',
      title: "How to Send a Video via Email (And When You Shouldn't)",
      description:
        'Learn how to send a video through email, understand file size limits, and discover better ways to share videos for review and approval.',
      tags: ['Send Video', 'Video Review'],
      publishDate: '2026-01-25 00:00',
      readTime: '10',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/30cdcaf2d6/how-to-send-a-video-via-email-and-when-you-shouldn-t.png',
    }),
    makeArticleCard({
      id: 'platform-share-video-guide-2',
      full_slug: '/guides/share-large-video-files',
      title: '7 Ways to Share Large Video Files with Clients for Review and Approval',
      description:
        'Need reliable, secure ways to send large video files to clients? This practical guide compares seven methods, lists pros and cons, and gives a step-by-step workflow.',
      tags: ['Share Video', 'Client Approvals'],
      publishDate: '2025-12-01 00:00',
      readTime: '9',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/4a0a44cd65/7-ways-to-share-large-video-files-with-clients-for-review-and-approval.png',
    }),
    makeArticleCard({
      id: 'platform-share-video-guide-3',
      full_slug: '/guides/large-file-tools',
      title: 'Send Large Files to Clients: 7 Tools That Let You Send 20GB+ Free',
      description:
        'We compare 7 practical options (cloud and peer-to-peer), show exactly how to use each one, list security caveats, and explain how to record delivery receipts.',
      tags: ['Large Files', 'Free Tools'],
      publishDate: '2025-11-18 00:00',
      readTime: '7',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/6b3b121e09/send-large-files-to-clients-7-tools-that-let-you-send-20gb-free.png',
    }),
  ],

  '/platform/proof-pdf': [
    makeArticleCard({
      id: 'platform-proof-pdf-guide-1',
      full_slug: '/guides/what-is-proofing-software',
      title: 'What Is Proofing Software? A Modern Guide for Creative Teams',
      description:
        'Learn what proofing software is, how online proofing tools work, and why modern creative teams are moving beyond traditional proofing workflows.',
      tags: ['Proofing', 'Creative Teams'],
      publishDate: '2026-01-19 00:00',
      readTime: '10',
      imageFilename: 'https://a.storyblok.com/f/287637539865613/2250x750/6fd6e95b81/what-is-proofing-software.png',
    }),
    makeArticleCard({
      id: 'platform-proof-pdf-guide-2',
      full_slug: '/comparisons/proofing-software',
      title: 'Proofing Software vs Production Management: Key Differences and the Best Choice for Creative Teams',
      description:
        'Proofing tools accelerate review and approvals, production management platforms orchestrate the entire workflow. Learn the key differences, best-fit use cases, success metrics, and how to combine both effectively.',
      tags: ['Proofing', 'Production Management'],
      publishDate: '2025-12-05 00:00',
      readTime: '10',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/61be205673/proofing-software-vs-production-management-key-differences-and-the-best-choice-for-creative-teams.png',
    }),
    makeArticleCard({
      id: 'platform-proof-pdf-guide-3',
      full_slug: '/guides/pdf-annotation-tools',
      title: 'PDF Annotation Tools: The Complete Guide for Creative Teams',
      description:
        'Discover the best PDF annotation tools for creative review workflows. Learn how to add comments, highlights, and drawings to PDFs for faster approvals.',
      tags: ['PDF Annotation', 'Creative Teams'],
      publishDate: '2026-01-25 00:00',
      readTime: '9',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/6fd6e95b81/what-is-proofing-software.png',
    }),
  ],

  '/platform/review-video': [
    makeArticleCard({
      id: 'platform-review-video-guide-1',
      full_slug: '/guides/how-to-annotate-video',
      title: 'How to Annotate Video: A Complete Guide for Creative Teams',
      description:
        'Learn how to annotate video effectively to speed up feedback, reduce revisions, and improve collaboration for modern creative teams.',
      tags: ['Video Annotation', 'Creative Teams'],
      publishDate: '2026-01-25 00:00',
      readTime: '11',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/8e5704aa7c/how-to-annotate-video-a-complete-guide-for-creative-teams.png',
    }),
    makeArticleCard({
      id: 'platform-review-video-guide-2',
      full_slug: '/comparisons/kreatli-vs-frameio-2026',
      title: 'Kreatli vs Frame.io (2026): Most Practical Comparison Guide',
      description:
        'A practical 2026 guide comparing Kreatli and Frame.io for creative teams who need better production workflows.',
      tags: ['Creative Teams', 'Production Management'],
      publishDate: '2025-12-12 00:00',
      readTime: '12',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/2a38a6fcee/kreatli-vs-frame-io-2025-the-real-differences-and-when-to-pick-each.png',
    }),
    makeArticleCard({
      id: 'platform-review-video-guide-3',
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
  ],

  '/platform/video-proofing': [
    makeArticleCard({
      id: 'platform-video-proofing-guide-1',
      full_slug: '/guides/how-to-annotate-video',
      title: 'How to Annotate Video: A Complete Guide for Creative Teams',
      description:
        'Learn how to annotate video effectively to speed up feedback, reduce revisions, and improve collaboration for modern creative teams.',
      tags: ['Video Annotation', 'Creative Teams'],
      publishDate: '2026-01-25 00:00',
      readTime: '11',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/8e5704aa7c/how-to-annotate-video-a-complete-guide-for-creative-teams.png',
    }),
    makeArticleCard({
      id: 'platform-video-proofing-guide-2',
      full_slug: '/guides/what-is-proofing-software',
      title: 'What Is Proofing Software? A Modern Guide for Creative Teams',
      description:
        'Learn what proofing software is, how online proofing tools work, and why modern creative teams are moving beyond traditional proofing workflows.',
      tags: ['Proofing', 'Creative Teams'],
      publishDate: '2026-01-19 00:00',
      readTime: '10',
      imageFilename: 'https://a.storyblok.com/f/287637539865613/2250x750/6fd6e95b81/what-is-proofing-software.png',
    }),
    makeArticleCard({
      id: 'platform-video-proofing-guide-3',
      full_slug: '/comparisons/kreatli-vs-frameio-2026',
      title: 'Kreatli vs Frame.io (2026): Most Practical Comparison Guide',
      description:
        'A practical 2026 guide comparing Kreatli and Frame.io for creative teams who need better production workflows.',
      tags: ['Creative Teams', 'Production Management'],
      publishDate: '2025-12-12 00:00',
      readTime: '12',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/2a38a6fcee/kreatli-vs-frame-io-2025-the-real-differences-and-when-to-pick-each.png',
    }),
  ],

  '/platform/manage-videos': [
    makeArticleCard({
      id: 'platform-manage-videos-guide-1',
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
      id: 'platform-manage-videos-guide-2',
      full_slug: '/guides/how-to-annotate-video',
      title: 'How to Annotate Video: A Complete Guide for Creative Teams',
      description:
        'Learn how to annotate video effectively to speed up feedback, reduce revisions, and improve collaboration for modern creative teams.',
      tags: ['Video Annotation', 'Creative Teams'],
      publishDate: '2026-01-25 00:00',
      readTime: '11',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/8e5704aa7c/how-to-annotate-video-a-complete-guide-for-creative-teams.png',
    }),
    makeArticleCard({
      id: 'platform-manage-videos-guide-3',
      full_slug: '/comparisons/kreatli-vs-frameio-2026',
      title: 'Kreatli vs Frame.io (2026): Most Practical Comparison Guide',
      description:
        'A practical 2026 guide comparing Kreatli and Frame.io for creative teams who need better production workflows.',
      tags: ['Creative Teams', 'Production Management'],
      publishDate: '2025-12-12 00:00',
      readTime: '12',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/2a38a6fcee/kreatli-vs-frame-io-2025-the-real-differences-and-when-to-pick-each.png',
    }),
  ],
};

export function getPlatformArticles(path: string): ArticleCard[] {
  return PLATFORM_ARTICLES_BY_PATH[path] ?? [];
}
