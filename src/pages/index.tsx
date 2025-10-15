import Head from 'next/head';
import React from 'react';

import { Home } from '../components/home/Home';
import { Header } from '../components/layout/Header';
import { Projects } from '../components/project/Projects';
import { useSession } from '../hooks/useSession';
import { getStoryblokApi } from '../lib/storyblok';

interface Props {
  footerLinks?: {
    label: string;
    url: string;
  }[];
}

export default function HomePage({ footerLinks }: Props) {
  const { isSignedIn } = useSession();

  const title = `Kreatli | ${isSignedIn ? 'Projects' : 'Ultimate Workspace for Creators & Content Teams'}`;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      {isSignedIn ? <Projects /> : <Home footerLinks={footerLinks} />}
    </>
  );
}

HomePage.getInitialProps = async () => {
  const { data } = await getStoryblokApi().get('cdn/links', {
    version: process.env.STORYBLOK_STATUS as 'draft' | 'published',
  });

  return {
    footerLinks: Object.values(data.links ?? {}).map((link) => ({ label: link.name, url: link.slug })),
  };
};
