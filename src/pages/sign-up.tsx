import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import { SignUpForm } from '../components/auth/SignUpForm';
import { StartPageLayout } from '../components/layout/StartPageLayout';
import { useSession } from '../hooks/useSession';

export default function SignUp() {
  const router = useRouter();
  const { isSignedIn } = useSession();

  React.useEffect(() => {
    if (isSignedIn) {
      router.replace('/');
    }
  }, [isSignedIn, router]);

  if (isSignedIn) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Sign up | Kreatli</title>
        <meta name="description" content="Kreatli" />
      </Head>
      <StartPageLayout title="Create an account to get started!">
        <SignUpForm />
      </StartPageLayout>
    </>
  );
}
