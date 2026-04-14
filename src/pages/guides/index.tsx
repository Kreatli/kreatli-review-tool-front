import { ISbStoryData } from '@storyblok/react';
import { GetStaticProps } from 'next';

import { BlogArticles } from '../../components/blog/Blog';
import { FooterSection } from '../../components/home/Footer/FooterSection';
import { Header } from '../../components/layout/Header';
import { Decorations } from '../../components/layout/Storyblok/Decorations';
import { BreadcrumbStructuredData } from '../../components/shared/BreadcrumbStructuredData';
import { SeoHead } from '../../components/shared/SeoHead';
import { mergeGuidesForIndex } from '../../data/local-guides';
import { useSession } from '../../hooks/useSession';
import { getStoryblokApi } from '../../lib/storyblok';
import { ArticleCard } from '../../types/articles';
import { PageStoryblok } from '../../typings/storyblok';

const DRAFT_REVALIDATE_TIME = 60;
const PUBLISHED_REVALIDATE_TIME = 3600;

interface Props {
  stories: ArticleCard[];
}

export default function GuidesPage({ stories }: Props) {
  useSession();

  return (
    <>
      <SeoHead
        title="Kreatli | Guides – Tutorials and How-To Guides"
        description="Step-by-step guides and tutorials for video review, PDF annotation, file sharing, and creative production workflows. Learn how to streamline feedback and approvals."
        canonicalPath="/guides"
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Guides', url: '/guides' },
        ]}
      />
      <Header />
      <Decorations />
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 text-center">
          <h1 className="mx-auto max-w-lg font-sans text-3xl font-bold sm:text-4xl">Guides & Tutorials</h1>
          <p className="mx-auto max-w-2xl text-lg text-foreground-500">
            Step-by-step guides and tutorials to help you master Kreatli's creative production management platform.
          </p>
        </div>
        <div className="backdrop-blur-lg">
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
        stories: mergeGuidesForIndex(storiesData.data.stories as ISbStoryData<PageStoryblok>[]),
      },
      revalidate: process.env.STORYBLOK_STATUS === 'draft' ? DRAFT_REVALIDATE_TIME : PUBLISHED_REVALIDATE_TIME,
    };
  } catch {
    return {
      notFound: true,
    };
  }
}) satisfies GetStaticProps<object>;
