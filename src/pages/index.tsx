import Head from 'next/head';
import React from 'react';

import { Home } from '../components/home/Home';
import { Header } from '../components/layout/Header';
import { Projects } from '../components/project/Projects';
import { useSession } from '../hooks/useSession';

export default function HomePage() {
  const { isSignedIn } = useSession();

  const title = `${isSignedIn ? 'Projects' : 'Review Hub'} | Kreatli`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Kreatli" />
      </Head>
      <Header />
      {isSignedIn ? <Projects /> : <Home />}
    </>
  );
}
