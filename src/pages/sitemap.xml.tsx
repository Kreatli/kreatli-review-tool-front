import { ISbStoryData } from '@storyblok/react';
import { GetServerSideProps } from 'next';

import { getPlatformPagesForSitemap } from '../data/platform-pages';
import { getStoryblokApi } from '../lib/storyblok';
import { PageStoryblok } from '../typings/storyblok';

const BASE_URL = 'https://kreatli.com';
const DRAFT_REVALIDATE_TIME = 60;
const PUBLISHED_REVALIDATE_TIME = 3600;

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
}

interface StaticPage {
  path: string;
  priority: string;
  changefreq: string;
}

// Static public pages configuration
const STATIC_PAGES: StaticPage[] = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/pricing', priority: '0.9', changefreq: 'monthly' },
  { path: '/platform', priority: '0.9', changefreq: 'monthly' },
  { path: '/help', priority: '0.7', changefreq: 'monthly' },
  // Free tools hub + tool pages
  { path: '/free-tools', priority: '0.8', changefreq: 'weekly' },
  { path: '/free-tools/video-feedback-tool', priority: '0.8', changefreq: 'weekly' },
  { path: '/free-tools/video-reviewer', priority: '0.8', changefreq: 'weekly' },
  { path: '/free-tools/video-frame-extractor', priority: '0.8', changefreq: 'weekly' },
  { path: '/free-tools/pdf-reviewer', priority: '0.8', changefreq: 'weekly' },
  { path: '/free-tools/image-reviewer', priority: '0.8', changefreq: 'weekly' },
  { path: '/free-tools/data-transfer-calculator', priority: '0.7', changefreq: 'monthly' },
  { path: '/free-tools/cost-calculator', priority: '0.7', changefreq: 'monthly' },
  { path: '/free-tools/youtube-banner-resizer', priority: '0.7', changefreq: 'monthly' },
  // Platform pages are now added dynamically from platform-pages registry
  { path: '/solutions/industry/advertising-marketing-agencies', priority: '0.8', changefreq: 'monthly' },
  { path: '/solutions/industry/in-house-creative-content-teams', priority: '0.8', changefreq: 'monthly' },
  { path: '/solutions/industry/video-production-animation-studios', priority: '0.8', changefreq: 'monthly' },
  { path: '/solutions/use-case/client-approvals', priority: '0.8', changefreq: 'monthly' },
  { path: '/solutions/use-case/creative-production-management', priority: '0.8', changefreq: 'monthly' },
  { path: '/solutions/use-case/creative-proofing', priority: '0.8', changefreq: 'monthly' },
  { path: '/social-media-safe-zone-checker', priority: '0.7', changefreq: 'monthly' },
  { path: '/social-media-safe-zone-checker/instagram-safe-zone-checker', priority: '0.7', changefreq: 'monthly' },
  { path: '/social-media-safe-zone-checker/tiktok-safe-zone-checker', priority: '0.7', changefreq: 'monthly' },
  { path: '/social-media-safe-zone-checker/youtube-safe-zone-checker', priority: '0.7', changefreq: 'monthly' },
  { path: '/privacy-policy', priority: '0.5', changefreq: 'yearly' },
  { path: '/terms-and-conditions', priority: '0.5', changefreq: 'yearly' },
  { path: '/cookie-policy', priority: '0.5', changefreq: 'yearly' },
  { path: '/sign-in', priority: '0.6', changefreq: 'monthly' },
  { path: '/sign-up', priority: '0.6', changefreq: 'monthly' },
  { path: '/reset-password', priority: '0.5', changefreq: 'yearly' },
  { path: '/guides', priority: '0.8', changefreq: 'weekly' },
  { path: '/blog', priority: '0.8', changefreq: 'weekly' },
  { path: '/comparisons', priority: '0.8', changefreq: 'weekly' },
];

/**
 * Fetch all stories from Storyblok for a given content type
 * Handles pagination automatically
 */
async function fetchAllStories(
  startsWith: string,
  version: 'draft' | 'published',
): Promise<ISbStoryData<PageStoryblok>[]> {
  const allStories: ISbStoryData<PageStoryblok>[] = [];
  let page = 1;
  const perPage = 100;
  let hasMore = true;

  while (hasMore) {
    try {
      const response = await getStoryblokApi().getStories({
        starts_with: startsWith,
        excluding_fields: 'body',
        version,
        sort_by: 'content.publishDate:desc',
        per_page: perPage,
        page,
      });

      if (response?.data?.stories && response.data.stories.length > 0) {
        allStories.push(...(response.data.stories as ISbStoryData<PageStoryblok>[]));
        // Check if there are more pages
        hasMore = response.data.stories.length === perPage;
        page++;
      } else {
        hasMore = false;
      }
    } catch (error) {
      // Log error in development, fail silently in production to prevent sitemap generation failure
      if (process.env.NODE_ENV === 'development') {
        console.error(`Error fetching ${startsWith} stories:`, error);
      }
      // TODO: Add Sentry error reporting when available
      hasMore = false;
    }
  }

  return allStories;
}

/**
 * Format date for sitemap (ISO 8601 format)
 */
function formatDateForSitemap(date: string | null | undefined): string | undefined {
  if (!date) return undefined;
  try {
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) return undefined;
    return dateObj.toISOString().split('T')[0];
  } catch {
    return undefined;
  }
}

/**
 * Convert Storyblok story to sitemap URL
 */
function storyToSitemapUrl(
  story: ISbStoryData<PageStoryblok>,
  changefreq: string = 'weekly',
  priority: string = '0.8',
): SitemapUrl {
  // Prefer full_slug as it includes the complete path (e.g., /guides/some-guide)
  const slug = story.full_slug || story.slug || '';
  const url = `${BASE_URL}${slug.startsWith('/') ? slug : `/${slug}`}`;

  // Use published_at or updated_at from story, fallback to content.publishDate
  const lastmod =
    formatDateForSitemap(story.published_at ?? undefined) ||
    formatDateForSitemap(story.updated_at ?? undefined) ||
    formatDateForSitemap(story.content?.publishDate);

  return {
    loc: url,
    lastmod,
    changefreq,
    priority,
  };
}

/**
 * Generate XML sitemap from URLs
 */
function generateSitemapXml(urls: SitemapUrl[]): string {
  const urlEntries = urls
    .map((url) => {
      let entry = `    <url>\n      <loc>${escapeXml(url.loc)}</loc>`;
      if (url.lastmod) {
        entry += `\n      <lastmod>${escapeXml(url.lastmod)}</lastmod>`;
      }
      if (url.changefreq) {
        entry += `\n      <changefreq>${escapeXml(url.changefreq)}</changefreq>`;
      }
      if (url.priority) {
        entry += `\n      <priority>${escapeXml(url.priority)}</priority>`;
      }
      entry += `\n    </url>`;
      return entry;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

/**
 * Escape XML special characters
 */
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export default function Sitemap() {
  // This component should never render
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const version = (process.env.STORYBLOK_STATUS ?? 'published') as 'draft' | 'published';
  const urls: SitemapUrl[] = [];

  try {
    // Add static pages
    STATIC_PAGES.forEach((page) => {
      urls.push({
        loc: `${BASE_URL}${page.path}`,
        changefreq: page.changefreq,
        priority: page.priority,
      });
    });

    // Add platform pages from registry
    const platformPages = getPlatformPagesForSitemap();
    platformPages.forEach((page) => {
      urls.push({
        loc: `${BASE_URL}${page.path}`,
        changefreq: page.changefreq,
        priority: page.priority,
      });
    });

    // Fetch all Storyblok content
    const [guides, blogs, comparisons] = await Promise.allSettled([
      fetchAllStories('guides/', version),
      fetchAllStories('blog/', version),
      fetchAllStories('comparisons/', version),
    ]);

    // Add guides
    if (guides.status === 'fulfilled') {
      guides.value.forEach((story) => {
        urls.push(storyToSitemapUrl(story, 'weekly', '0.8'));
      });
    } else {
      // Log error in development, continue with partial sitemap in production
      if (process.env.NODE_ENV === 'development') {
        console.error('Error fetching guides:', guides.reason);
      }
      // TODO: Add Sentry error reporting when available
    }

    // Add blogs
    if (blogs.status === 'fulfilled') {
      blogs.value.forEach((story) => {
        urls.push(storyToSitemapUrl(story, 'weekly', '0.8'));
      });
    } else {
      // Log error in development, continue with partial sitemap in production
      if (process.env.NODE_ENV === 'development') {
        console.error('Error fetching blogs:', blogs.reason);
      }
      // TODO: Add Sentry error reporting when available
    }

    // Add comparisons
    if (comparisons.status === 'fulfilled') {
      comparisons.value.forEach((story) => {
        urls.push(storyToSitemapUrl(story, 'monthly', '0.8'));
      });
    } else {
      // Log error in development, continue with partial sitemap in production
      if (process.env.NODE_ENV === 'development') {
        console.error('Error fetching comparisons:', comparisons.reason);
      }
      // TODO: Add Sentry error reporting when available
    }

    // Generate XML
    const sitemap = generateSitemapXml(urls);

    // Set cache headers
    const revalidateTime = version === 'draft' ? DRAFT_REVALIDATE_TIME : PUBLISHED_REVALIDATE_TIME;
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', `public, s-maxage=${revalidateTime}, stale-while-revalidate=${revalidateTime * 2}`);

    res.write(sitemap);
    res.end();

    return {
      props: {},
    };
  } catch (error) {
    // Log error in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error generating sitemap:', error);
    }
    // TODO: Add Sentry error reporting when available
    // Return a minimal sitemap with just static pages and platform pages if Storyblok fails
    const minimalPages = [
      ...STATIC_PAGES.map((page) => ({
        loc: `${BASE_URL}${page.path}`,
        changefreq: page.changefreq,
        priority: page.priority,
      })),
      ...getPlatformPagesForSitemap().map((page) => ({
        loc: `${BASE_URL}${page.path}`,
        changefreq: page.changefreq,
        priority: page.priority,
      })),
    ];
    const minimalSitemap = generateSitemapXml(minimalPages);

    res.setHeader('Content-Type', 'application/xml');
    res.write(minimalSitemap);
    res.end();

    return {
      props: {},
    };
  }
};
