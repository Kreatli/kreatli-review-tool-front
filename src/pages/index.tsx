import { ISbStoryData } from '@storyblok/react';
import { GetStaticProps } from 'next';
import Head from 'next/head';

import { homeFaqs } from '../components/home/Faq';
import { Home } from '../components/home/Home';
import { Header } from '../components/layout/Header';
import { Decorations } from '../components/layout/Storyblok/Decorations';
import { Projects } from '../components/project/Projects';
import { BreadcrumbStructuredData } from '../components/shared/BreadcrumbStructuredData';
import { FAQStructuredData } from '../components/shared/FAQStructuredData';
import { SeoHead } from '../components/shared/SeoHead';
import { useSession } from '../hooks/useSession';
import { getStoryblokApi } from '../lib/storyblok';
import { PageStoryblok } from '../typings/storyblok';

const DRAFT_REVALIDATE_TIME = 60;
const PUBLISHED_REVALIDATE_TIME = 3600;

const MARKETING_TITLE = 'Kreatli | Video Collaboration & Review Platform';
const META_DESCRIPTION =
  'Kreatli is a Video Collaboration & Review Platform that helps video teams streamline video production workflows. Get frame-accurate feedback, manage projects, collaborate in real-time, and deliver faster—all in one place.';

interface Props {
  comparisons: ISbStoryData<PageStoryblok>[];
}

export default function HomePage({ comparisons }: Props) {
  const { isSignedIn } = useSession();

  return (
    <>
      <SeoHead
        title={MARKETING_TITLE}
        description={META_DESCRIPTION}
        canonicalPath="/"
      />
      {isSignedIn && (
        <Head>
          <title key="title">Kreatli | Projects</title>
        </Head>
      )}
      <BreadcrumbStructuredData items={[{ name: 'Home', url: '/' }]} />
      <FAQStructuredData faqs={homeFaqs} />
      <Header />
      {!isSignedIn && <Decorations />}
      {isSignedIn ? <Projects /> : <Home comparisons={comparisons} />}
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
      per_page: 3, // Only fetch the 3 most recent
    });

    return {
      props: {
        comparisons: (storiesData?.data?.stories || []) as ISbStoryData<PageStoryblok>[],
      },
      revalidate: process.env.STORYBLOK_STATUS === 'draft' ? DRAFT_REVALIDATE_TIME : PUBLISHED_REVALIDATE_TIME,
    };
  } catch {
    return {
      props: {
        comparisons: [],
      },
      revalidate: PUBLISHED_REVALIDATE_TIME,
    };
  }
}) satisfies GetStaticProps<Props>;
