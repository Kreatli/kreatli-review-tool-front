import { ISbStoryData } from '@storyblok/react';
import { GetStaticProps } from 'next';

import { BlogArticles } from '../../components/blog/Blog';
import { FooterSection } from '../../components/home/Footer/FooterSection';
import { Header } from '../../components/layout/Header';
import { Decorations } from '../../components/layout/Storyblok/Decorations';
import { BreadcrumbStructuredData } from '../../components/shared/BreadcrumbStructuredData';
import { SeoHead } from '../../components/shared/SeoHead';
import { useSession } from '../../hooks/useSession';
import { getStoryblokApi } from '../../lib/storyblok';
import { PageStoryblok } from '../../typings/storyblok';

const DRAFT_REVALIDATE_TIME = 60;
const PUBLISHED_REVALIDATE_TIME = 3600;

interface Props {
  stories: ISbStoryData<PageStoryblok>[];
}

export default function Blog({ stories }: Props) {
  useSession();

  return (
    <>
      <SeoHead
        title="Kreatli | Blog – Insights for Creative Teams"
        description="Insights, tips, best practices and news for creative teams. Discover strategies to streamline your video production workflow and improve collaboration."
        canonicalPath="/blog"
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blog' },
        ]}
      />
      <Header />
      <Decorations />
      <div className="w-full px-6 py-8">
        <div className="flex flex-col gap-6 py-8">
          <h1 className="mx-auto max-w-lg font-sans text-3xl font-bold sm:text-4xl">Kreatli Blog</h1>
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
}) satisfies GetStaticProps<object>;
