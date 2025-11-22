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
  footerLinks?: {
    label: string;
    url: string;
  }[];
}

export default function Blog({ stories, footerLinks }: Props) {
  useSession();

  return (
    <>
      <Head>
        <title>Kreatli | Blog</title>
        <meta property="og:title" content="Kreatli | Blog" />
      </Head>
      <Header />
      <Decorations />
      <div className="px-6 w-full py-8">
        <div className="py-8 flex flex-col gap-6">
          <h2 className="text-4xl font-bold font-sans text-center">Kreatli Blog</h2>
          <p className="text-foreground-500 text-center text-large max-w-2xl mx-auto">
            Insights, tips, best practices and news for creative teams. Discover strategies to streamline your workflow
            and improve collaboration.
          </p>
        </div>
        <div className="backdrop-blur-lg">
          <div className="max-w-6xl mx-auto pt-6">
            <BlogArticles articles={stories} />
          </div>
        </div>
      </div>
      <FooterSection links={footerLinks} />
    </>
  );
}

export const getStaticProps = (async () => {
  try {
    const storiesData = await getStoryblokApi().getStories({
      starts_with: 'blog/',
      excluding_fields: 'body',
      version: (process.env.STORYBLOK_STATUS ?? 'published') as 'draft' | 'published',
    });

    const linksData = await getStoryblokApi().get('cdn/links', {
      version: process.env.STORYBLOK_STATUS as 'draft' | 'published',
      per_page: 7,
      starts_with: 'blog/',
    });

    if (!storiesData?.data?.stories) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        stories: storiesData.data.stories,
        footerLinks:
          Object.values(linksData?.data?.links ?? {}).map((link) => ({ label: link.name, url: link.slug })) ?? [],
      },
      revalidate: process.env.STORYBLOK_STATUS === 'draft' ? DRAFT_REVALIDATE_TIME : PUBLISHED_REVALIDATE_TIME,
    };
  } catch {
    return {
      notFound: true,
    };
  }
}) satisfies GetStaticProps<{}>;
