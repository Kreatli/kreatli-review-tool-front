import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import { StartPageLayout } from '../components/layout/StartPageLayout';
import { useSession } from '../hooks/useSession';
import { ResetPasswordForm } from '../components/auth/ResetPasswordForm';

export default function ResetPassword() {
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
        <title>Kreatli | Reset password</title>
      </Head>
      <StartPageLayout title="Reset your password." backgroundType="light">
        <ResetPasswordForm />
      </StartPageLayout>
    </>
  );
}
