import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import { useSession } from '../hooks/useSession';
import { getAxiosInstance } from '../services/config';
import { queryClient } from '../lib/queryClient';
import { getUser } from '../services/services';

export default function SignOut() {
  const router = useRouter();
  const { isSignedIn } = useSession();

  React.useEffect(() => {
    getAxiosInstance(undefined).defaults.headers.Authorization = null;
    queryClient.resetQueries({ queryKey: [getUser.key] });
    localStorage.removeItem('token');
    localStorage.removeItem('uploads');
    router.replace('/');
  }, []);

  if (!isSignedIn) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Kreatli | Sign out</title>
      </Head>
    </>
  );
}
