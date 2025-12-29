import { ISbStoryData } from '@storyblok/react';
import { PageStoryblok } from '../../../typings/storyblok';
import { Card, CardBody, Chip, Image } from '@heroui/react';
import { Icon } from '../../various/Icon';
import { formatDate } from '../../../utils/dates';
import Link from 'next/link';

interface Props {
  article: ISbStoryData<PageStoryblok>;
}

export const BlogArticle = ({ article }: Props) => {
  return (
    <Card isPressable className="relative">
      <CardBody className="flex flex-col gap-3 p-4">
        {'tags' in article.content && 'value' in article.content.tags && (
          <div className="flex gap-2">
            {article.content.tags.value.map((tag: string) => (
              <Chip key={tag} size="sm" variant="flat">
                {tag}
              </Chip>
            ))}
          </div>
        )}
        <div className="flex flex-col gap-2">
          <Link
            href={article.full_slug}
            className="line-clamp-2 font-sans text-large font-bold after:absolute after:inset-0"
          >
            {article.content.metaFields?.title}
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
