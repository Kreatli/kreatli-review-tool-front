import { ISbStoryData } from '@storyblok/react';
import { GetStaticProps } from 'next';
import NextLink from 'next/link';

import { BlogArticles } from '../../components/blog/Blog';
import { FooterSection } from '../../components/home/Footer/FooterSection';
import { Header } from '../../components/layout/Header';
import { Decorations } from '../../components/layout/Storyblok/Decorations';
import { BreadcrumbStructuredData } from '../../components/shared/BreadcrumbStructuredData';
import { HubPageIntro } from '../../components/shared/HubPageIntro';
import { SeoHead } from '../../components/shared/SeoHead';
import { Icon } from '../../components/various/Icon';
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
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 text-center">
          <h1 className="mx-auto max-w-lg font-sans text-3xl font-bold sm:text-4xl">Comparisons</h1>
          <p className="mx-auto max-w-2xl text-lg text-foreground-500">
            Side-by-side context for video review and creative collaboration platforms.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden px-6 pb-16">
        <div className="relative z-10 mx-auto max-w-6xl space-y-10 backdrop-blur-lg">
          <HubPageIntro
            eyebrow="Evaluation hub"
            title="Read a comparison, then try the workflow"
            icon="compare"
            aside={
              <>
                <p className="text-xs font-semibold uppercase tracking-wide text-foreground-500">Next steps</p>
                <ul className="mt-3 space-y-2">
                  {[
                    { href: '/pricing', label: 'Plans & pricing' },
                    { href: '/platform', label: 'Platform tour' },
                    { href: '/sign-up', label: 'Start a free trial' },
                  ].map((item) => (
                    <li key={item.href}>
                      <NextLink
                        href={item.href}
                        className="group flex items-center justify-between gap-2 rounded-lg py-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                      >
                        <span>{item.label}</span>
                        <Icon
                          icon="arrowRight"
                          size={14}
                          className="flex-shrink-0 text-primary/60 transition-transform group-hover:translate-x-0.5"
                        />
                      </NextLink>
                    </li>
                  ))}
                </ul>
              </>
            }
          >
            <p>
              Each article maps how Kreatli lines up on the details buyers care about: review precision, collaboration
              model, storage and delivery, security, and total cost of ownership—not a feature checklist in isolation.
            </p>
            <p>
              Open the comparison that matches the tool you are replacing, then validate the workflow with a{' '}
              <NextLink href="/sign-up" className="font-medium text-primary underline-offset-2 hover:underline">
                trial
              </NextLink>{' '}
              or walk through{' '}
              <NextLink href="/platform" className="font-medium text-primary underline-offset-2 hover:underline">
                live platform pages
              </NextLink>{' '}
              for the areas you need most.
            </p>
          </HubPageIntro>

          <BlogArticles articles={stories} />
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
