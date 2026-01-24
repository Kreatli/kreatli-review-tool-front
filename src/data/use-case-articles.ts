import { ArticleCard } from '../types/articles';

function makeArticleCard(input: {
  id: string;
  full_slug: string;
  title: string;
  description: string;
  tags: string[];
  publishDate: string;
  readTime: string;
  imageFilename: string;
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
        filename: input.imageFilename,
      },
      publishDate: input.publishDate,
      readTime: input.readTime,
      tags: { value: input.tags },
    },
  };
}

export const USE_CASE_ARTICLES_BY_PATH: Record<string, ArticleCard[]> = {
  '/solutions/use-case/creative-proofing': [
    makeArticleCard({
      id: 'use-case-creative-proofing-guide',
      full_slug: '/guides/what-is-proofing-software',
      title: 'What Is Proofing Software? A Modern Guide for Creative Teams',
      description:
        'Learn what proofing software is, how online proofing tools work, and why modern creative teams are moving beyond traditional proofing workflows.',
      tags: ['Proofing Software', 'Creative Teams'],
      publishDate: '2026-01-19 00:00',
      readTime: '10',
      imageFilename: 'https://a.storyblok.com/f/287637539865613/2250x750/6fd6e95b81/what-is-proofing-software.png',
    }),
    makeArticleCard({
      id: 'use-case-creative-proofing-comparison',
      full_slug: '/comparisons/proofing-software',
      title: "Proofing vs Production Management: What's Best for Creative Teams",
      description:
        "Proofing tools accelerate review and approvals, production management platforms orchestrate the entire workflow. Learn the key differences, best-fit use cases.",
      tags: ['Production Management', 'Proofing Software'],
      publishDate: '2025-12-05 00:00',
      readTime: '10',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/61be205673/proofing-software-vs-production-management-key-differences-and-the-best-choice-for-creative-teams.png',
    }),
    makeArticleCard({
      id: 'use-case-creative-proofing-blog',
      full_slug: '/blog/creative-collaboration-platforms',
      title: 'Essential Features of Creative Collaboration Platforms',
      description:
        'Confused which collaboration platform to pick? Learn the 12 essential features creative teams need - frame-accurate review, versioning, MAM, security, automation, etc.',
      tags: ['Collaboration Tools', 'Productivity', 'Feature Breakdown'],
      publishDate: '2025-10-27 00:00',
      readTime: '11',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/854413b91f/essential-features-of-creative-collaboration-platforms.png',
    }),
  ],

  '/solutions/use-case/client-approvals': [
    makeArticleCard({
      id: 'use-case-client-approvals-guide',
      full_slug: '/guides/remote-video-collaboration',
      title: 'Remote Collaboration for Video Editing Teams',
      description:
        'Learn how remote video editing teams collaborate effectively using structured workflows, centralized feedback, and production management tools.',
      tags: ['Remote Collaboration', 'Video Editing'],
      publishDate: '2026-01-05 00:00',
      readTime: '11',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/959a8dc8fc/remote-collaboration-for-video-editing-teams-best-practices-2026.png',
    }),
    makeArticleCard({
      id: 'use-case-client-approvals-comparison',
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
      id: 'use-case-client-approvals-blog',
      full_slug: '/blog/cloud-file-sharing',
      title: 'How Cloud File Sharing Changes Freelance Collaboration',
      description:
        'Cloud file sharing transforms how freelancers work with studios and agencies - faster handoffs, simpler guest access, proxy review, and new pricing/rights patterns.',
      tags: ['Cloud Storage', 'File Sharing', 'Collaboration'],
      publishDate: '2025-11-07 00:00',
      readTime: '11',
      imageFilename:
        'https://a.storyblok.com/f/287637539865613/2250x750/c8f6f35dbf/how-cloud-file-sharing-changes-freelance-collaboration.png',
    }),
  ],
};

export function getUseCaseArticles(path: string): ArticleCard[] {
  return USE_CASE_ARTICLES_BY_PATH[path] ?? [];
}

