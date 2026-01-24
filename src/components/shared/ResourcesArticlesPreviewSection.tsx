import { Button } from '@heroui/react';
import NextLink from 'next/link';

import { ArticleCard } from '../../types/articles';
import { BlogArticle } from '../blog/BlogArticle/BlogArticle';

interface Props {
  articles?: ArticleCard[];
  title?: string;
  description?: string;
  viewAllHref?: string;
  viewAllButtonText?: string;
  maxArticles?: number;
}

/**
 * Matches the “Helpful Guides & Tutorials” preview styling from the home Resources section.
 */
export function ResourcesArticlesPreviewSection({
  articles = [],
  title = 'Helpful Guides & Tutorials',
  description = 'Compare Kreatli with other platforms and discover the best solution for your team.',
  viewAllHref = '/comparisons',
  viewAllButtonText = 'View All Comparisons',
  maxArticles = 3,
}: Props) {
  const recentArticles = articles.slice(0, maxArticles);

  if (recentArticles.length === 0) {
    return null;
  }

  return (
    <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">{title}</h2>
          {description ? <p className="mx-auto max-w-2xl text-lg text-foreground-500">{description}</p> : null}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recentArticles.map((article) => (
            <BlogArticle key={article.id} article={article} />
          ))}
        </div>

        {viewAllHref ? (
          <div className="mt-10 flex justify-center">
            <Button as={NextLink} href={viewAllHref} size="lg" variant="bordered">
              {viewAllButtonText}
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}

