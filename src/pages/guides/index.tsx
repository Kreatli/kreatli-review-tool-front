import Head from 'next/head';
import React from 'react';

import { Header } from '../../components/layout/Header';
import { FooterSection } from '../../components/home/Footer/FooterSection';
import { useSession } from '../../hooks/useSession';
import { Decorations } from '../../components/layout/Storyblok/Decorations';
import { getStoryblokApi } from '../../lib/storyblok';
import { GetStaticProps } from 'next';
import { PageStoryblok } from '../../typings/storyblok';
import { ISbStoryData } from '@storyblok/react';
import { BlogArticles } from '../../components/blog/Blog';

const DRAFT_REVALIDATE_TIME = 60;
const PUBLISHED_REVALIDATE_TIME = 3600;

interface Props {
  stories: ISbStoryData<PageStoryblok>[];
}

export default function GuidesPage({ stories }: Props) {
  useSession();

  return (
    <>
      <Head>
        <title>Kreatli | Guides – Tutorials and How-To Guides</title>
        <meta
          name="description"
          content="Access step-by-step guides and tutorials to help you master Kreatli's creative production management platform."
        />
        <meta property="og:title" content="Kreatli | Guides – Tutorials and How-To Guides" />
        <meta
          property="og:description"
          content="Learn how to use Kreatli with comprehensive guides and tutorials for creative production management."
        />
      </Head>
      <Header />
      <Decorations />
      {/* Hero Section */}
      <section className="relative py-16 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center flex flex-col gap-6 relative z-10">
          <h1 className="text-2xl sm:text-4xl font-bold font-sans max-w-lg mx-auto">Guides & Tutorials</h1>
          <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
            Step-by-step guides and tutorials to help you master Kreatli's creative production management platform.
          </p>
        </div>
        <div className="backdrop-blur-lg">
          <div className="max-w-6xl mx-auto pt-6">
            <BlogArticles articles={stories} />
          </div>
        </div>
      </section>

      <FooterSection />
    </>
  );
}

export const getStaticProps = (async () => {
  try {
    const storiesData = await getStoryblokApi().getStories({
      starts_with: 'guides/',
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
