import { addToast, Spinner } from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import { AppSumoSignUpForm } from '../components/auth/AppSumoSignUpForm';
import { StartPageLayout } from '../components/layout/StartPageLayout';
import { useSession } from '../hooks/useSession';
import { getAxiosInstance } from '../services/config';
import { usePostAppSummoOauth } from '../services/hooks';
import { getUser } from '../services/services';
import { UserDto } from '../services/types';

export default function AppSumoAuth() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { isSignedIn } = useSession();
  const sendCodeToApi = useRef(false);

  const [appSumoLicenseKey, setAppSumoLicenseKey] = useState<string | undefined>();

  const { mutate } = usePostAppSummoOauth();

  useEffect(() => {
    if (isSignedIn) {
      router.push('/');

      return;
    }

    const { code } = router.query;

    if (!code || sendCodeToApi.current) {
      return;
    }

    sendCodeToApi.current = true;

    mutate(
      { queryParams: { code: code as string } },
      {
        onSuccess: ({ user, token, license }) => {
          if (token) {
            localStorage.setItem('token', token);
            getAxiosInstance(undefined).defaults.headers.Authorization = `Bearer ${token}`;
            queryClient.setQueryData([getUser.key], user);
            router.push('/');

            return;
          }

          if (license) {
            setAppSumoLicenseKey(license);

            return;
          }

          router.push('/');
          addToast({ title: 'Something went wrong. Please try again later.', color: 'danger', variant: 'flat' });
        },
        onError: () => {
          router.push('/');
          addToast({ title: 'Something went wrong. Please try again later.', color: 'danger', variant: 'flat' });
        },
      },
    );
  }, [router, isSignedIn, mutate]);

  const handleSuccess = ({ token, user }: { token: string; user: UserDto }) => {
    localStorage.setItem('token', token);
    getAxiosInstance(undefined).defaults.headers.Authorization = `Bearer ${token}`;
    queryClient.setQueryData([getUser.key], user);
    router.push('/');
  };

  return (
    <>
      <Head>
        <title>Kreatli | AppSumo Auth</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      {appSumoLicenseKey && (
        <StartPageLayout title="Activate your account by entering credentials." showAppSumoLogo>
          <div className="flex flex-col gap-4">
            <p>Provide your email address and password you will use.</p>
            <AppSumoSignUpForm appSumoLicenseKey={appSumoLicenseKey} onSuccess={handleSuccess} />
          </div>
        </StartPageLayout>
      )}
      {!appSumoLicenseKey && (
        <div className="flex h-[calc(100dvh-100px)] items-center justify-center">
          <Spinner size="lg" color="current" />
        </div>
      )}
    </>
  );
}
