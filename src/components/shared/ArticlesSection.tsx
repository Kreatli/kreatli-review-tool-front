import { Button } from '@heroui/react';
import { ISbStoryData } from '@storyblok/react';
import NextLink from 'next/link';
import React from 'react';

import { PageStoryblok } from '../../typings/storyblok';
import { BlogArticle } from '../blog/BlogArticle/BlogArticle';

interface ArticlesSectionProps {
  /** Array of articles from Storyblok */
  articles?: ISbStoryData<PageStoryblok>[];
  /** Custom title for the section */
  title?: string;
  /** Custom description/intro text */
  description?: string;
  /** Link to view all articles */
  viewAllHref?: string;
  /** Text for the view all button */
  viewAllButtonText?: string;
  /** Maximum number of articles to display */
  maxArticles?: number;
}

/**
 * Component for displaying articles (guides, comparisons, blog posts) in a grid
 * Matches the design from the home page "Helpful Guides & Tutorials" section
 */
export function ArticlesSection({
  articles,
  title = 'See How This Works in Practice',
  description = 'Explore real-world workflows and guides that demonstrate these features in action.',
  viewAllHref,
  viewAllButtonText = 'View All Articles',
  maxArticles = 3,
}: ArticlesSectionProps) {
  if (!articles || articles.length === 0) {
    return null;
  }

  const displayArticles = articles.slice(0, maxArticles);

  return (
    <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">{title}</h2>
          {description && <p className="mx-auto max-w-2xl text-lg text-foreground-500">{description}</p>}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayArticles.map((article) => (
            <BlogArticle key={article.id} article={article} />
          ))}
        </div>

        {viewAllHref && (
          <div className="mt-10 flex justify-center">
            <Button as={NextLink} href={viewAllHref} size="lg" variant="bordered">
              {viewAllButtonText}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
