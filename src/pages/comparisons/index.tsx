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

export default function ComparisonsPage({ stories }: Props) {
  useSession();

  return (
    <>
      <SeoHead
        title="Kreatli | Comparisons – Video Production Platform Comparisons"
        description="Compare Kreatli with other creative production and media review platforms. See how Kreatli stacks up against Frame.io, Vimeo, and other alternatives."
        canonicalPath="/comparisons"
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Comparisons', url: '/comparisons' },
        ]}
      />
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
        <div className="mx-auto max-w-3xl space-y-4 py-8 text-base leading-relaxed text-foreground-500">
          <p>
            Choosing the right platform for video review, creative collaboration, and production management is easier
            when you see the features side by side. Each comparison below breaks down how Kreatli stacks up against
            popular alternatives like Frame.io, Vimeo, and other review tools — covering pricing, feature sets,
            collaboration workflows, and where each platform fits best. If you are evaluating options for your team,
            start here.
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
