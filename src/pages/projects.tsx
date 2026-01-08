import Head from 'next/head';

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
        <title>Kreatli | Projects</title>
      </Head>
      <Header />
      <Projects />
    </>
  );
}
