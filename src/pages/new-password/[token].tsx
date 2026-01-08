import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import { NewPasswordForm } from '../../components/auth/NewPasswordForm';
import { StartPageLayout } from '../../components/layout/StartPageLayout';
import { useSession } from '../../hooks/useSession';

export default function NewPassword() {
  const router = useRouter();
  const { isSignedIn } = useSession();

  React.useEffect(() => {
    if (isSignedIn) {
      router.replace('/');
    }
  }, [isSignedIn, router]);

  const handleSuccess = () => {
    router.push('/');
  };

  if (isSignedIn) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Kreatli | New password</title>
      </Head>
      <StartPageLayout title="Set new password." backgroundType="light">
        <NewPasswordForm token={router.query.token as string} onSuccess={handleSuccess} />
      </StartPageLayout>
    </>
  );
}
