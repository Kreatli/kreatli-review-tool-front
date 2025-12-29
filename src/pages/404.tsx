import { Button, Chip } from '@heroui/react';
import Head from 'next/head';
import NextLink from 'next/link';
import React from 'react';

import { Header } from '../components/layout/Header';
import { useSession } from '../hooks/useSession';

const NotFound = () => {
  const { isSignedIn } = useSession();

  return (
    <>
      <Head>
        <title>Kreatli | Page not found</title>
      </Head>
      <Header />
      <div className="container mx-auto max-w-screen-lg px-6 text-center">
        <Chip variant="flat" color="default" classNames={{ content: 'font-semibold' }}>
          404
        </Chip>
        <h2 className="my-2 text-4xl font-semibold">Page not found</h2>
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
