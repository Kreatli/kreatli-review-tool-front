import Head from 'next/head';
import React from 'react';

import { Header } from '../components/layout/Header';
import { HowItWorksSection } from '../components/home/HowItWorks';
import { FooterSection } from '../components/home/Footer/FooterSection';
import { useSession } from '../hooks/useSession';
import { getStoryblokApi } from '../lib/storyblok';
import { GetStaticProps } from 'next';

interface Props {
  footerLinks?: {
    label: string;
    url: string;
  }[];
}

export default function HowItWorksPage({ footerLinks }: Props) {
  useSession();

  return (
    <>
      <Head>
        <title>Kreatli | How It Works</title>
        <meta
          name="description"
          content="Get started with Kreatli in 4 simple steps. Create projects, invite collaborators, review and assign, and deliver your creative work."
        />
      </Head>
      <Header />
      <div className="border-t border-foreground-200">
        <HowItWorksSection />
      </div>
      <FooterSection links={footerLinks} />
    </>
  );
}

export const getStaticProps = (async () => {
  try {
    const { data } = await getStoryblokApi().get('cdn/links', {
      version: process.env.STORYBLOK_STATUS as 'draft' | 'published',
    });

    return {
      props: {
        footerLinks: Object.values(data.links ?? {}).map((link) => ({ label: link.name, url: link.slug })),
      },
    };
  } catch {
    return {
      props: {
        footerLinks: [],
      },
    };
  }
}) satisfies GetStaticProps<{}>;

