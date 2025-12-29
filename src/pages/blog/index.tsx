import Head from 'next/head';
import { useSession } from '../../hooks/useSession';
import { Header } from '../../components/layout/Header';
import { Decorations } from '../../components/layout/Storyblok/Decorations';
import { getStoryblokApi } from '../../lib/storyblok';
import { GetStaticProps } from 'next';
import { ISbStoryData } from '@storyblok/react';
import { PageStoryblok } from '../../typings/storyblok';
import { BlogArticles } from '../../components/blog/Blog';
import { FooterSection } from '../../components/home/Footer/FooterSection';

const DRAFT_REVALIDATE_TIME = 60;
const PUBLISHED_REVALIDATE_TIME = 3600;

interface Props {
  stories: ISbStoryData<PageStoryblok>[];
}

export default function Blog({ stories }: Props) {
  useSession();

  return (
    <>
      <Head>
        <title>Kreatli | Blog</title>
        <meta property="og:title" content="Kreatli | Blog" />
      </Head>
      <Header />
      <Decorations />
      <div className="w-full px-6 py-8">
        <div className="flex flex-col gap-6 py-8">
          <h2 className="text-center font-sans text-4xl font-bold">Kreatli Blog</h2>
          <p className="mx-auto max-w-2xl text-center text-large text-foreground-500">
            Insights, tips, best practices and news for creative teams. Discover strategies to streamline your workflow
            and improve collaboration.
          </p>
        </div>
        <div className="backdrop-blur-lg">
          <div className="mx-auto max-w-6xl pt-6">
            <BlogArticles articles={stories} />
          </div>
        </div>
      </div>
      <FooterSection />
    </>
  );
}

export const getStaticProps = (async () => {
  try {
    const storiesData = await getStoryblokApi().getStories({
      starts_with: 'blog/',
      excluding_fields: 'body',
      version: (process.env.STORYBLOK_STATUS ?? 'published') as 'draft' | 'published',
      sort_by: 'content.publishDate:desc',
      per_page: 100,
    });

    if (!storiesData?.data?.stories) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        stories: storiesData.data.stories,
      },
      revalidate: process.env.STORYBLOK_STATUS === 'draft' ? DRAFT_REVALIDATE_TIME : PUBLISHED_REVALIDATE_TIME,
    };
  } catch {
    return {
      notFound: true,
    };
  }
}) satisfies GetStaticProps<{}>;
