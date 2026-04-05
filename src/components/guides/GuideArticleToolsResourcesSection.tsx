import { cn } from '@heroui/react';
import NextLink from 'next/link';

import { FreeTool } from '../../data/free-tools';
import { RelatedResource } from '../../data/related-resources';
import { ArticleCard } from '../../types/articles';
import wysiwygStyles from '../layout/Storyblok/Wysiwyg/Wysiwyg.module.scss';

function articleHref(article: ArticleCard) {
  return article.full_slug.startsWith('/') ? article.full_slug : `/${article.full_slug}`;
}

interface Props {
  /** DOM id for TOC scroll (no `#`). */
  tocHeadingId: string;
  /** Visible H2 text (should match TOC label). */
  tocHeadingLabel: string;
  /** Short lead-in under the H2. */
  sectionIntro: string;
  toolsTitle: string;
  toolsDescription: string;
  tools: FreeTool[];
  articlesTitle: string;
  articlesDescription: string;
  articles: ArticleCard[];
  articlesMax?: number;
  resourcesTitle: string;
  resourcesDescription: string;
  resources: RelatedResource[];
}

/** Article-style block: tools, guides, and platform links (replaces card grids on long-form guides). */
export function GuideArticleToolsResourcesSection({
  tocHeadingId,
  tocHeadingLabel,
  sectionIntro,
  toolsTitle,
  toolsDescription,
  tools,
  articlesTitle,
  articlesDescription,
  articles,
  articlesMax = 3,
  resourcesTitle,
  resourcesDescription,
  resources,
}: Props) {
  const toolsSlice = tools.slice(0, 4);
  const articlesSlice = articles.slice(0, articlesMax);

  if (toolsSlice.length === 0 && articlesSlice.length === 0 && resources.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        wysiwygStyles.wysiwyg,
        '[&>h2:first-child]:!mt-0',
      )}
    >
      <h2 id={tocHeadingId}>{tocHeadingLabel}</h2>
      <p>{sectionIntro}</p>

      {toolsSlice.length > 0 ? (
        <>
          <h3>{toolsTitle}</h3>
          <p>{toolsDescription}</p>
          <ul>
            {toolsSlice.map((tool) => (
              <li key={tool.href}>
                <p>
                  <NextLink href={tool.href}>{tool.title}</NextLink>
                  {' — '}
                  {tool.description}
                </p>
              </li>
            ))}
          </ul>
          <p>
            <NextLink href="/free-tools">Browse all free tools</NextLink>.
          </p>
        </>
      ) : null}

      {articlesSlice.length > 0 ? (
        <>
          <h3>{articlesTitle}</h3>
          <p>{articlesDescription}</p>
          <ul>
            {articlesSlice.map((article) => {
              const title = article.content.metaFields?.title ?? article.name ?? 'Guide';
              return (
                <li key={String(article.id)}>
                  <p>
                    <NextLink href={articleHref(article)}>{title}</NextLink>
                  </p>
                </li>
              );
            })}
          </ul>
        </>
      ) : null}

      {resources.length > 0 ? (
        <>
          <h3>{resourcesTitle}</h3>
          <p>{resourcesDescription}</p>
          <ul>
            {resources.map((resource) => (
              <li key={resource.href}>
                <p>
                  <NextLink href={resource.href}>{resource.title}</NextLink>
                  {' — '}
                  {resource.description}
                </p>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
}
