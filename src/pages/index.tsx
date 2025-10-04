import Head from 'next/head';
import React from 'react';

import { Home } from '../components/home/Home';
import { Header } from '../components/layout/Header';
import { Projects } from '../components/project/Projects';
import { useSession } from '../hooks/useSession';

export default function HomePage() {
  const { isSignedIn } = useSession();

  const title = `Kreatli | ${isSignedIn ? 'Projects' : 'Ultimate Workspace for Creators & Content Teams'}`;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      {isSignedIn ? <Projects /> : <Home />}
    </>
  );
}
