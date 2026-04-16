import Head from 'next/head';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import React from 'react';

import { SignInForm } from '../components/auth/SignInForm';
import { StartPageLayout } from '../components/layout/StartPageLayout';
import { useSession } from '../hooks/useSession';
import { UserDto } from '../services/types';
import { getSafeReturnToParam, getStandaloneToolPostAuthReplaceUrl } from '../utils/standaloneMarketingToolAuth';

export default function SignIn() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isSignedIn, user } = useSession();

  const returnToRaw = searchParams.get('returnTo');
  const safeReturnTo = returnToRaw ? getSafeReturnToParam(returnToRaw) : null;
  const signUpHref =
    safeReturnTo !== null ? `/sign-up?returnTo=${encodeURIComponent(safeReturnTo)}` : '/sign-up';

  React.useEffect(() => {
    if (!isSignedIn || !user) return;

    if (safeReturnTo) {
      const pathname = safeReturnTo.split('?')[0].split('#')[0];
      const url = getStandaloneToolPostAuthReplaceUrl(pathname, safeReturnTo, user.subscription.isActive);
      if (url !== null) {
        router.replace(url);

        return;
      }
    }

    router.replace('/');
  }, [isSignedIn, user, router, safeReturnTo]);

  const handleSuccess = (signedInUser: UserDto) => {
    const redirectToProjectId = searchParams.get('redirectToProjectId');

    if (redirectToProjectId) {
      router.push(`/project/${redirectToProjectId}/assets`);

      return;
    }

    if (safeReturnTo) {
      const pathname = safeReturnTo.split('?')[0].split('#')[0];
      const url = getStandaloneToolPostAuthReplaceUrl(pathname, safeReturnTo, signedInUser.subscription.isActive);
      if (url !== null) {
        router.push(url);

        return;
      }
    }

    router.push('/');
  };

  if (isSignedIn) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Kreatli | Sign in</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <StartPageLayout title="Sign in to get started." backgroundType="light">
        <SignInForm onSuccess={handleSuccess} signUpHref={signUpHref} />
      </StartPageLayout>
    </>
  );
}
