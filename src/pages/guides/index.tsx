import { Accordion, AccordionItem } from '@heroui/react';
import { ISbStoryData } from '@storyblok/react';
import { GetStaticProps } from 'next';
import NextLink from 'next/link';

import { BlogArticles } from '../../components/blog/Blog';
import { FooterSection } from '../../components/home/Footer/FooterSection';
import { Header } from '../../components/layout/Header';
import { Decorations } from '../../components/layout/Storyblok/Decorations';
import { BreadcrumbStructuredData } from '../../components/shared/BreadcrumbStructuredData';
import { FAQStructuredData, FAQItem } from '../../components/shared/FAQStructuredData';
import { SeoHead } from '../../components/shared/SeoHead';
import { mergeGuidesForIndex } from '../../data/local-guides';
import { useSession } from '../../hooks/useSession';
import { getStoryblokApi } from '../../lib/storyblok';
import { ArticleCard } from '../../types/articles';
import { PageStoryblok } from '../../typings/storyblok';

const guidesFaqs: FAQItem[] = [
  {
    question: 'Who are these guides for?',
    answer:
      'Video editors, producers, agency teams, and freelancers who review, annotate, or share creative files. Each guide covers a specific workflow — from annotating PDFs to sharing large video files — with step-by-step instructions anyone can follow.',
  },
  {
    question: 'Do I need a Kreatli account to follow the guides?',
    answer:
      'No. The guides explain general workflows first, then show how Kreatli fits in. You can apply the techniques with any toolset. If you want to try the Kreatli-specific steps, every plan includes a 7-day free trial.',
  },
  {
    question: 'How often are new guides published?',
    answer:
      'We publish 2-3 new guides per week covering video review, PDF annotation, file sharing, creative production workflows, and platform tips. Bookmark this page or check back regularly for the latest content.',
  },
  {
    question: 'Can I suggest a guide topic?',
    answer:
      'Yes. Email support@kreatli.com with your topic idea and we will consider it for an upcoming guide. We prioritize topics requested by multiple users.',
  },
];

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
      <FAQStructuredData faqs={guidesFaqs} />
      <Header />
      <Decorations />
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 text-center">
          <h1 className="mx-auto max-w-lg font-sans text-3xl font-bold sm:text-4xl">Guides & Tutorials</h1>
          <p className="mx-auto max-w-2xl text-lg text-foreground-500">
            Step-by-step guides and tutorials to help you master Kreatli&apos;s creative production management platform.
          </p>
        </div>
      </section>

      {/* Editorial intro */}
      <section className="px-6 pb-4">
        <div className="mx-auto max-w-3xl space-y-4 text-base leading-relaxed text-foreground-500">
          <p>
            These guides cover the workflows creative teams deal with every day: reviewing video with frame-accurate
            feedback, annotating PDFs and images, sharing large files with clients, and organizing assets across
            projects. Each guide walks through the process step by step, explains best practices, and shows where
            Kreatli fits in.
          </p>
          <p>
            Start with a workflow you already run — like{' '}
            <NextLink href="/guides/how-to-review-a-video" className="font-medium text-primary underline-offset-2 hover:underline">
              reviewing a video
            </NextLink>
            ,{' '}
            <NextLink href="/guides/how-to-annotate-a-pdf-online" className="font-medium text-primary underline-offset-2 hover:underline">
              annotating a PDF
            </NextLink>
            , or{' '}
            <NextLink href="/guides/how-to-share-video" className="font-medium text-primary underline-offset-2 hover:underline">
              sharing video with clients
            </NextLink>{' '}
            — and use the category filters below to narrow by file type.
          </p>
        </div>
      </section>

      {/* Guide articles */}
      <section className="px-6 pb-8">
        <div className="mx-auto max-w-6xl backdrop-blur-lg">
          <BlogArticles articles={stories} />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
          </div>
          <Accordion variant="splitted" aria-label="Guides FAQs" className="gap-2">
            {guidesFaqs.map((faq) => (
              <AccordionItem
                key={faq.question}
                title={<span className="text-base font-semibold sm:text-lg">{faq.question}</span>}
                className="py-2"
              >
                <div className="text-sm leading-relaxed text-foreground-500 sm:text-base">{faq.answer}</div>
              </AccordionItem>
            ))}
          </Accordion>
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
