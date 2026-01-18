import { BreadcrumbItem, Breadcrumbs, ScrollShadow } from '@heroui/react';
import { ISbStoryData, StoryblokComponent, useStoryblokState } from '@storyblok/react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { TableOfContent } from '../../components/blog/TableOfContent/TableOfContent';
import { Header } from '../../components/layout/Header';
import { Decorations } from '../../components/layout/Storyblok/Decorations';
import { Icon } from '../../components/various/Icon';
import { useSession } from '../../hooks/useSession';
import { getStoryblokApi } from '../../lib/storyblok';
import { PageStoryblok } from '../../typings/storyblok';
import { formatDate } from '../../utils/dates';
import { getTableOfContentLinks } from '../../utils/storyblok';

const DRAFT_REVALIDATE_TIME = 60;
const PUBLISHED_REVALIDATE_TIME = 3600;

interface Props {
  story: ISbStoryData<PageStoryblok>;
  slug: string;
}

export default function Page({ story, slug }: Props) {
  useSession();

  const [fetchedStory, setFetchedStory] = useState(story);

  const storyState = useStoryblokState(fetchedStory);

  useEffect(() => {
    if (process.env.STORYBLOK_STATUS !== 'draft' || !slug) {
      return;
    }

    const fetchStory = async () => {
      const data = await getStoryblokApi().getStory(slug, {
        version: (process.env.STORYBLOK_STATUS ?? 'published') as 'draft' | 'published',
      });

      setFetchedStory(data.data.story as ISbStoryData<PageStoryblok>);
    };

    fetchStory();
  }, [slug]);

  const title = storyState?.content.metaFields?.title
    ? `Kreatli | ${storyState?.content.metaFields?.title}`
    : 'Kreatli | Video Collaboration & Review Platform';
  const description =
    storyState?.content.metaFields?.description ||
    'Kreatli helps content teams and creators streamline creative production. Upload media, manage projects, get precise feedback, chat, and share - in one place.';

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
      <Header />
      <Decorations />
      <div className="backdrop-blur-lg">
        <div className="mx-auto grid w-full max-w-7xl items-start px-6 py-8 md:grid-cols-[175px,1fr] lg:grid-cols-[200px,1fr] xl:grid-cols-[200px,1fr,200px]">
          <ScrollShadow className="sticky top-24 hidden h-[calc(100vh-8rem)] md:block" hideScrollBar>
            <TableOfContent links={getTableOfContentLinks(storyState?.content.body)} />
          </ScrollShadow>
          <div className="w-full overflow-hidden md:pl-8 md:pr-2 lg:pl-16 lg:pr-14">
            <Breadcrumbs className="mb-4">
              <BreadcrumbItem>
                <Link href="/">Home</Link>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <Link href="/blog">Blog</Link>
              </BreadcrumbItem>
              <BreadcrumbItem classNames={{ base: 'overflow-hidden', item: 'truncate block' }}>
                {storyState?.content.metaFields?.title}
              </BreadcrumbItem>
            </Breadcrumbs>
            <div className="flex items-center gap-3">
              {storyState?.content.publishDate && (
                <div className="mb-1 flex items-center gap-1 font-medium text-primary">
                  <Icon icon="calendar" size={18} />
                  {formatDate(storyState.content.publishDate)}
                </div>
              )}
              {storyState?.content.readTime && (
                <div className="mb-1 flex items-center gap-1 font-medium text-foreground-500">
                  <Icon icon="time" size={18} />
                  {storyState.content.readTime} minutes read
                </div>
              )}
            </div>
            <div className="flex w-full flex-col gap-8">
              {storyState?.content.body?.map((blok) => (
                <StoryblokComponent key={blok._uid} blok={blok} />
              ))}
            </div>
          </div>
          <div />
        </div>
      </div>
    </>
  );
}

export const getStaticProps = (async ({ params }) => {
  const slugString = [params?.slug ?? []].flat().join('/');
  const slug = `/blog/${slugString}`;

  try {
    const data = await getStoryblokApi().getStory(slug, {
      version: (process.env.STORYBLOK_STATUS ?? 'published') as 'draft' | 'published',
    });

    if (!data.data.story) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        story: data.data.story,
        slug,
      },
      revalidate: process.env.STORYBLOK_STATUS === 'draft' ? DRAFT_REVALIDATE_TIME : PUBLISHED_REVALIDATE_TIME,
    };
  } catch {
    return {
      notFound: true,
    };
  }
}) satisfies GetStaticProps<object>;

export const getStaticPaths = (async () => {
  const { data } = await getStoryblokApi().get('cdn/links', {
    version: (process.env.STORYBLOK_STATUS ?? 'published') as 'draft' | 'published',
    starts_with: 'blog/',
    per_page: 100,
  });

  return {
    paths: Object.values(data.links ?? {}).map((link) => ({ params: { slug: link.slug?.replace('blog/', '') } })),
    fallback: process.env.STORYBLOK_STATUS === 'draft',
  };
}) satisfies GetStaticPaths;
