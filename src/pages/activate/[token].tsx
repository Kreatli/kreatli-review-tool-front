import { addToast } from '@heroui/react';
import { useRouter } from 'next/router';
import React from 'react';

import { usePostAuthVerifyEmail } from '../../services/hooks';
import { getErrorMessage } from '../../utils/getErrorMessage';
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
          onSuccess: ({ redirectToProjectId }) => {
            addToast({ title: 'Your account was activated', color: 'success', variant: 'flat' });
            if (redirectToProjectId) {
              router.replace(`/sign-in?redirectToProjectId=${redirectToProjectId}`);
            } else {
              router.replace('/sign-in');
            }
          },
          onError: (error) => {
            addToast({ title: getErrorMessage(error), color: 'danger', variant: 'flat' });
            router.push('/sign-in');
          },
        },
      );
    }
  }, [router]);

  return null;
}
