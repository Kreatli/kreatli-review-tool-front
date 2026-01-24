import { Card, CardBody, Chip, Image } from '@heroui/react';
import Link from 'next/link';

import { ArticleCard } from '../../../types/articles';
import { formatDate } from '../../../utils/dates';
import { Icon } from '../../various/Icon';

interface Props {
  article: ArticleCard;
}

export const BlogArticle = ({ article }: Props) => {
  const href = article.full_slug.startsWith('/') ? article.full_slug : `/${article.full_slug}`;
  const title = article.content.metaFields?.title ?? article.name;

  return (
    <Card isPressable className="relative">
      <CardBody className="flex flex-col gap-3 p-4">
        {article.content.tags?.value?.length ? (
          <div className="flex gap-2">
            {article.content.tags.value.map((tag: string) => (
              <Chip key={tag} size="sm" variant="flat">
                {tag}
              </Chip>
            ))}
          </div>
        ) : null}
        <div className="flex flex-col gap-2">
          <Link
            href={href}
            className="line-clamp-2 font-sans text-large font-bold after:absolute after:inset-0"
          >
            {title}
          </Link>
          {article.content.image && (
            <div className="pointer-events-none -mx-4">
              <Image removeWrapper src={article.content.image.filename} radius="none" width="800" height="300" />
            </div>
          )}
          <div className="line-clamp-3">{article.content.metaFields?.description}</div>
        </div>
        <div className="flex items-center gap-3 text-small">
          {article.content.publishDate && (
            <div className="flex items-center gap-1.5 font-medium text-primary">
              <Icon icon="calendar" size={18} />
              {formatDate(article.content.publishDate)}
            </div>
          )}
          <div className="flex items-center gap-1.5 font-medium text-foreground-500">
            <Icon icon="time" size={18} />
            {article.content.readTime} minutes
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
