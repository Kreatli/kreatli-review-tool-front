import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import { SignUpForm } from '../components/auth/SignUpForm';
import { StartPageLayout } from '../components/layout/StartPageLayout';
import { useSession } from '../hooks/useSession';
import { getSafeReturnToParam, getStandaloneToolPostAuthReplaceUrl } from '../utils/standaloneMarketingToolAuth';

export default function SignUp() {
  const router = useRouter();
  const { isSignedIn, user } = useSession();

  React.useEffect(() => {
    if (!isSignedIn || !user || !router.isReady) return;

    const returnToRaw = typeof router.query.returnTo === 'string' ? router.query.returnTo : null;
    const safeReturn = returnToRaw ? getSafeReturnToParam(returnToRaw) : null;

    if (safeReturn) {
      const pathname = safeReturn.split('?')[0].split('#')[0];
      const url = getStandaloneToolPostAuthReplaceUrl(pathname, safeReturn, user.subscription.isActive);
      if (url !== null) {
        router.replace(url);

        return;
      }
    }

    router.replace('/');
  }, [isSignedIn, user, router.isReady, router.query.returnTo, router]);

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
        <SignUpForm />
      </StartPageLayout>
    </>
  );
}
