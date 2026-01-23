import { ISbStoryData } from '@storyblok/react';
import { GetStaticProps } from 'next';

import { PageStoryblok } from '../../typings/storyblok';
import { getStoryblokApi } from '../storyblok';
import { DRAFT_REVALIDATE_TIME, PUBLISHED_REVALIDATE_TIME } from './constants';

export interface PlatformPageProps {
  articles?: ISbStoryData<PageStoryblok>[];
}

/**
 * Type guard to check if a story is a valid PageStoryblok story
 */
function isValidPageStory(story: unknown): story is ISbStoryData<PageStoryblok> {
  return (
    typeof story === 'object' &&
    story !== null &&
    'content' in story &&
    typeof (story as { content?: unknown }).content === 'object' &&
    (story as { content?: { publishDate?: unknown } }).content !== null
  );
}

/**
 * Extract and validate stories from Storyblok response
 */
function extractStories(response: unknown): ISbStoryData<PageStoryblok>[] {
  if (!response || typeof response !== 'object' || !('data' in response)) {
    return [];
  }

  const data = (response as { data?: { stories?: unknown[] } }).data;
  if (!data || !Array.isArray(data.stories)) {
    return [];
  }

  return data.stories.filter(isValidPageStory);
}

/**
 * Sort articles by publish date (most recent first)
 */
function sortArticlesByDate(articles: ISbStoryData<PageStoryblok>[]): ISbStoryData<PageStoryblok>[] {
  return [...articles].sort((a, b) => {
    const dateA = a.content.publishDate ? new Date(a.content.publishDate).getTime() : 0;
    const dateB = b.content.publishDate ? new Date(b.content.publishDate).getTime() : 0;
    return dateB - dateA;
  });
}

/**
 * Shared getStaticProps function for platform pages
 * Fetches articles from guides, comparisons, and blog, then returns the 3 most recent
 * 
 * Performance notes:
 * - Uses Promise.all for parallel API calls
 * - Storyblok API has memory caching configured (see lib/storyblok.ts)
 * - Next.js ISR (Incremental Static Regeneration) is used for revalidation
 * - Type guards ensure type safety without unsafe type assertions
 */
export const getPlatformPageProps = (async (): Promise<{
  props: PlatformPageProps;
  revalidate: number;
}> => {
  try {
    // Fetch articles from guides, comparisons, and blog in parallel
    // Storyblok API has memory caching configured, so duplicate requests during build are cached
    const [guidesData, comparisonsData, blogData] = await Promise.all([
      getStoryblokApi().getStories({
        starts_with: 'guides/',
        excluding_fields: 'body',
        version: (process.env.STORYBLOK_STATUS ?? 'published') as 'draft' | 'published',
        sort_by: 'content.publishDate:desc',
        per_page: 10,
      }),
      getStoryblokApi().getStories({
        starts_with: 'comparisons/',
        excluding_fields: 'body',
        version: (process.env.STORYBLOK_STATUS ?? 'published') as 'draft' | 'published',
        sort_by: 'content.publishDate:desc',
        per_page: 10,
      }),
      getStoryblokApi().getStories({
        starts_with: 'blog/',
        excluding_fields: 'body',
        version: (process.env.STORYBLOK_STATUS ?? 'published') as 'draft' | 'published',
        sort_by: 'content.publishDate:desc',
        per_page: 10,
      }),
    ]);

    // Extract and validate stories using type guards
    const allArticles = [
      ...extractStories(guidesData),
      ...extractStories(comparisonsData),
      ...extractStories(blogData),
    ];

    // Sort by publish date and take the 3 most recent
    const sortedArticles = sortArticlesByDate(allArticles);
    const articles = sortedArticles.slice(0, 3);

    return {
      props: {
        articles,
      },
      revalidate: process.env.STORYBLOK_STATUS === 'draft' ? DRAFT_REVALIDATE_TIME : PUBLISHED_REVALIDATE_TIME,
    };
  } catch (error) {
    // Log error in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching Storyblok articles for platform page:', error);
    }
    // TODO: Add Sentry error reporting here
    // Sentry.captureException(error, { tags: { context: 'getPlatformPageProps' } });

    return {
      props: {
        articles: [],
      },
      revalidate: PUBLISHED_REVALIDATE_TIME,
    };
  }
}) satisfies GetStaticProps<PlatformPageProps>;
