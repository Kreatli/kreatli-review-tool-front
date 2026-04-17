import { addToast } from '@heroui/react';
import { useRouter } from 'next/router';
import React from 'react';

import { queryClient } from '../../lib/queryClient';
import { getAxiosInstance } from '../../services/config';
import { usePostAuthVerifyEmail } from '../../services/hooks';
import { getUser } from '../../services/services';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { getStandaloneToolPostAuthReplaceUrl } from '../../utils/standaloneMarketingToolAuth';
import { getHasToken } from '../../utils/token';

export default function Activate() {
  const router = useRouter();
  const { mutate } = usePostAuthVerifyEmail();

  React.useEffect(() => {
    if (getHasToken()) {
      router.replace('/');

      return;
    }

    const { token } = router.query;

    if (token) {
      mutate(
        { requestBody: { token: token as string } },
        {
          onSuccess: ({ token: authToken, user, redirectToProjectId, redirectAfterActivation }) => {
            addToast({ title: 'Your account was activated', color: 'success', variant: 'flat' });

            localStorage.setItem('token', authToken);
            getAxiosInstance(undefined).defaults.headers.Authorization = `Bearer ${authToken}`;
            queryClient.setQueryData([getUser.key], user);

            if (redirectAfterActivation) {
              const pathname = redirectAfterActivation.split('?')[0].split('#')[0];
              const url = getStandaloneToolPostAuthReplaceUrl(
                pathname,
                redirectAfterActivation,
                user.subscription.isActive,
              );
              if (url) {
                router.replace(url);

                return;
              }
            }

            if (redirectToProjectId) {
              router.replace(`/project/${redirectToProjectId}/assets`);

              return;
            }

            router.replace('/');
          },
          onError: (error) => {
            addToast({ title: getErrorMessage(error), color: 'danger', variant: 'flat' });
            router.push('/sign-in');
          },
        },
      );
    }
  }, [router, mutate]);

  return null;
}
