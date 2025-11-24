import Head from 'next/head';
import React from 'react';

import { Header } from '../components/layout/Header';
import { CostCalculatorSection } from '../components/home/CostCalculator';
import { FooterSection } from '../components/home/Footer/FooterSection';
import { useSession } from '../hooks/useSession';
import { getStoryblokApi } from '../lib/storyblok';
import { GetStaticProps } from 'next';
import { Decorations } from '../components/layout/Storyblok/Decorations';

interface Props {
  footerLinks?: {
    label: string;
    url: string;
  }[];
}

export default function CostCalculatorPage({ footerLinks }: Props) {
  useSession();

  return (
    <>
      <Head>
        <title>Kreatli | Cost Calculator</title>
        <meta
          name="description"
          content="Estimate monthly and annual software spend based on team size and tools. Compare your current tool stack costs with Kreatli."
        />
      </Head>
      <Header />
      <Decorations />
      <div className="backdrop-blur-lg">
        <div className="border-t border-foreground-200">
          <CostCalculatorSection />
        </div>
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
