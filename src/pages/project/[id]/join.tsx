import { addToast, Button } from '@heroui/react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { SignInForm } from '../../../components/auth/SignInForm';
import { StartPageLayout } from '../../../components/layout/StartPageLayout';
import { useAppLoader } from '../../../hooks/useAppLoader';
import { useGetProject, useGetUser, usePutProjectIdMember } from '../../../services/hooks';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { getHasToken } from '../../../utils/token';
import { AxiosError } from 'axios';

export default function JoinProject() {
  const hasUserToken = getHasToken();
  const router = useRouter();
  const token = router.query.token as string | undefined;

  const { data: user } = useGetUser({
    enabled: hasUserToken,
    refetchOnMount: false,
  });

  const isSignedIn = !!user;

  const isLoading = useAppLoader((state) => state.isLoading);
  const setIsLoading = useAppLoader((state) => state.setIsLoading);
  const { data } = useGetProject({ enabled: !!token }, { headers: { Authorization: token } });
  const { mutate, isPending: isJoining } = usePutProjectIdMember();

  React.useEffect(() => {
    if (data && (user || !hasUserToken)) {
      setIsLoading(false);
    }
  }, [data, hasUserToken, setIsLoading, user]);

  React.useEffect(() => {
    if (isSignedIn && data && user?.email !== data?.email) {
      router.replace('/');
    }
  }, [router, user, isSignedIn, data]);

  const handleSignInSuccess = () => {
    router.reload();
  };

  const joinProject = () => {
    if (!data || !token) {
      return;
    }

    mutate(
      { id: data.projectId, requestBody: { token } },
      {
        onSuccess: () => {
          router.push(`/project/${data.projectId}`);
        },
        onError: (error) => {
          const errorMessage =
            'response' in error && error.response?.data?.isLinkExpired
              ? 'The link has expired. Please contact the project owner to get a new link.'
              : getErrorMessage(error);

          addToast({ title: errorMessage, color: 'danger', variant: 'flat' });
        },
      },
    );
  };

  if (isLoading) {
    return null;
  }

  const title = `Kreatli | Join "${data?.projectName}"`;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <StartPageLayout
        title={`You were invited to join "${data?.projectName}" project`}
        backgroundUrl={data?.projectCover?.url}
        backgroundType="light"
      >
        {isSignedIn ? (
          <div className="flex flex-col gap-4">
            <p className="mb-4 text-foreground-500">To join the project click the button below.</p>
            <Button className="bg-foreground text-content1" isLoading={isJoining} onClick={joinProject}>
              Join project
            </Button>
            <Button as={NextLink} href="/" variant="light">
              Back to my projects
            </Button>
          </div>
        ) : (
          <div>
            <p className="mb-4 text-foreground-500">Please log in to join the project.</p>
            <SignInForm email={data?.email} showLinks={false} onSuccess={handleSignInSuccess} />
          </div>
        )}
      </StartPageLayout>
    </>
  );
}
