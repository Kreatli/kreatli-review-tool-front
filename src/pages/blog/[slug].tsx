import { GetStaticPaths, GetStaticProps } from 'next';
import { useSession } from '../../hooks/useSession';
import { getStoryblokApi } from '../../lib/storyblok';
import { ISbStoryData, StoryblokComponent, useStoryblokState } from '@storyblok/react';
import { PageStoryblok } from '../../typings/storyblok';
import { Header } from '../../components/layout/Header';
import { Icon } from '../../components/various/Icon';
import { useEffect, useState } from 'react';
import { Decorations } from '../../components/layout/Storyblok/Decorations';
import Head from 'next/head';
import { BreadcrumbItem, Breadcrumbs } from '@heroui/react';
import Link from 'next/link';

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
    : 'Ultimate Workspace for Creators & Content Teams';
  const description =
    storyState?.content.metaFields?.description ||
    'We help Creative Teams streamline post production processes and optimize workflows. No more juggling between Slack, Discord, GSheets, Docs, WeTransfer, etc.';

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
        <div className="max-w-4xl mx-auto px-6 w-full py-8">
          <Breadcrumbs className="mb-4">
            <BreadcrumbItem as="div">
              {/* TODO: link in link issue + truncate issue */}
              <Link href="/">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem as="div">
              <Link href="/blog">Blog</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>{storyState?.content.metaFields?.title}</BreadcrumbItem>
          </Breadcrumbs>
          {storyState?.content.readTime && (
            <div className="flex gap-1 text-primary items-center mb-1">
              <Icon icon="time" size={18} />
              {storyState.content.readTime} minutes read
            </div>
          )}
          <div className="flex w-full flex-col gap-8">
            {storyState?.content.body?.map((blok) => <StoryblokComponent key={blok._uid} blok={blok} />)}
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticProps = (async ({ params }) => {
  const slugString = [params?.slug ?? []].flat().join('/');

  try {
    const data = await getStoryblokApi().getStory(slugString, {
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
        slug: slugString,
      },
      revalidate: process.env.STORYBLOK_STATUS === 'draft' ? DRAFT_REVALIDATE_TIME : PUBLISHED_REVALIDATE_TIME,
    };
  } catch {
    return {
      notFound: true,
    };
  }
}) satisfies GetStaticProps<{}>;

export const getStaticPaths = (async () => {
  const { data } = await getStoryblokApi().get('cdn/links', {});

  return {
    paths: Object.values(data.links ?? {}).map((link) => ({ params: { slug: link.slug } })),
    fallback: process.env.STORYBLOK_STATUS === 'draft',
  };
}) satisfies GetStaticPaths;
