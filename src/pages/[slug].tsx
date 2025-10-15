import { GetStaticPaths, GetStaticProps } from 'next';
import { useSession } from '../hooks/useSession';
import { getStoryblokApi } from '../lib/storyblok';
import { ISbStoryData, StoryblokComponent, useStoryblokState } from '@storyblok/react';
import { PageStoryblok } from '../typings/storyblok';
import { Header } from '../components/layout/Header';
import { Icon } from '../components/various/Icon';
import { useEffect, useState } from 'react';
import { Decorations } from '../components/layout/Storyblok/Decorations';
import Head from 'next/head';

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

  return (
    <>
      <Head>
        {story.content.metaFields?.title && <title>Kreatli | {story.content.metaFields.title}</title>}
        {story.content.metaFields?.description && (
          <meta name="description" content={story.content.metaFields.description} />
        )}
      </Head>
      <Header />
      <Decorations />
      <div className="backdrop-blur-lg">
        <div className="max-w-4xl mx-auto px-6 w-full py-8">
          {storyState?.content.readTime && (
            <div className="flex gap-1 text-primary items-center mb-1">
              <Icon icon="newsletter" size={20} />
              {storyState.content.readTime} minutes read
            </div>
          )}
          <div className="flex w-full flex-col gap-8">
            {storyState?.content.body?.map((blok) => <StoryblokComponent key={blok.uuid} blok={blok} />)}
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticProps = (async ({ params }) => {
  const slugString = [params?.slug ?? []].flat().join('/');
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
}) satisfies GetStaticProps<{}>;

export const getStaticPaths = (async () => {
  const { data } = await getStoryblokApi().get('cdn/links', {});

  return {
    paths: Object.values(data.links ?? {}).map((link) => ({ params: { slug: link.slug } })),
    fallback: true,
  };
}) satisfies GetStaticPaths;
