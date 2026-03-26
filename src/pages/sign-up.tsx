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
        <title>Kreatli | Sign up</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <StartPageLayout title="Create an account to get started!">
        <p className="mb-4 text-sm text-foreground-500">
          To start your 7-day trial, you will add a payment method during secure checkout. You won't be
          charged until the trial ends if you continue.
        </p>
        <SignUpForm />
      </StartPageLayout>
    </>
  );
}
