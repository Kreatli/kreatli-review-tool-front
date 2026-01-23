import { ISbStoryData } from '@storyblok/react';
import { GetStaticProps } from 'next';
import Head from 'next/head';

import { BlogArticles } from '../../components/blog/Blog';
import { FooterSection } from '../../components/home/Footer/FooterSection';
import { Header } from '../../components/layout/Header';
import { Decorations } from '../../components/layout/Storyblok/Decorations';
import { useSession } from '../../hooks/useSession';
import { getStoryblokApi } from '../../lib/storyblok';
import { PageStoryblok } from '../../typings/storyblok';

const DRAFT_REVALIDATE_TIME = 60;
const PUBLISHED_REVALIDATE_TIME = 3600;

interface Props {
  stories: ISbStoryData<PageStoryblok>[];
}

export default function ComparisonsPage({ stories }: Props) {
  useSession();

  return (
    <>
      <Head>
        <title>Kreatli | Comparisons – Video Production Platform Comparisons</title>
        <meta
          name="description"
          content="Compare Kreatli with other creative production and media review platforms. See how Kreatli stacks up against alternatives."
        />
        <link rel="canonical" href="https://kreatli.com/comparisons" />
        <meta property="og:url" content="https://kreatli.com/comparisons" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Kreatli | Comparisons – Video Production Platform Comparisons" />
        <meta
          property="og:description"
          content="Compare Kreatli with other creative production and media review platforms to find the best solution for your team."
        />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:secure_url" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:alt" content="Kreatli | Comparisons – Video Production Platform Comparisons" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kreatli | Comparisons – Video Production Platform Comparisons" />
        <meta
          name="twitter:description"
          content="Compare Kreatli with other creative production and media review platforms to find the best solution for your team."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
      </Head>
      <Header />
      <Decorations />
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 pt-16">
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 text-center">
          <h1 className="mx-auto max-w-lg font-sans text-3xl font-bold sm:text-4xl">Comparisons</h1>
          <p className="mx-auto max-w-2xl text-lg text-foreground-500">
            Compare Kreatli with other creative production and media review platforms.
          </p>
        </div>
        <div className="pb-16 backdrop-blur-lg">
          <div className="mx-auto max-w-6xl pt-6">
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
      starts_with: 'comparisons/',
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
