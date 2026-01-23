import { Button, Chip } from '@heroui/react';
import Head from 'next/head';
import NextLink from 'next/link';

import { Header } from '../components/layout/Header';
import { useSession } from '../hooks/useSession';

const NotFound = () => {
  const { isSignedIn } = useSession();

  return (
    <>
      <Head>
        <title>Kreatli | Page not found</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <Header />
      <div className="container mx-auto max-w-screen-lg px-6 text-center">
        <Chip variant="flat" color="default" classNames={{ content: 'font-semibold' }}>
          404
        </Chip>
        <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Page not found</h2>
        <p className="mb-8 text-large text-foreground-500">
          Sorry, but the page you were looking for could not be found 😢
        </p>
        <Button as={NextLink} href="/" className="bg-foreground text-content1">
          Go to {isSignedIn ? 'my projects' : 'home page'}
        </Button>
      </div>
    </>
  );
};

export default NotFound;
