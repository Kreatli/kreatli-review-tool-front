import Head from 'next/head';
import React from 'react';

import { Header } from '../components/layout/Header';
import { Projects } from '../components/project/Projects';
import { useProtectedPage } from '../hooks/useProtectedPage';

export default function ProjectsPage() {
  const { isSignedIn } = useProtectedPage();

  if (!isSignedIn) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Projects | Kreatli</title>
        <meta name="description" content="Kreatli" />
      </Head>
      <Header />
      <Projects />
    </>
  );
}
