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
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 text-center">
          <h1 className="mx-auto max-w-lg font-sans text-3xl font-bold sm:text-4xl">Kreatli Blog</h1>
          <p className="mx-auto max-w-2xl text-lg text-foreground-500">
            Ideas for creative leads, producers, and operations—practical, not promotional.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden px-6 pb-16">
        <div className="relative z-10 mx-auto max-w-6xl space-y-10 backdrop-blur-lg">
          <HubPageIntro
            eyebrow="Editorial"
            title="Strategy, workflows, and lessons from the field"
            icon="newsletter"
            aside={
              <>
                <p className="text-xs font-semibold uppercase tracking-wide text-foreground-500">On the site</p>
                <ul className="mt-3 space-y-2">
                  {[
                    { href: '/guides', label: 'How-to guides' },
                    { href: '/platform', label: 'Platform features' },
                    { href: '/free-tools', label: 'Free tools' },
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
              We publish long-form pieces when they help teams ship: clearer handoffs between editorial and post,
              tighter client review loops, and operations patterns that scale without burying creatives in process.
            </p>
            <p>
              Read an article, then put it next to the{' '}
              <NextLink href="/guides" className="font-medium text-primary underline-offset-2 hover:underline">
                step-by-step guides
              </NextLink>{' '}
              or{' '}
              <NextLink href="/platform" className="font-medium text-primary underline-offset-2 hover:underline">
                product deep dives
              </NextLink>{' '}
              when you want to execute the same workflow inside Kreatli.
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
