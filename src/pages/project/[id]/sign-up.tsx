import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import { InvitationSignUpForm } from '../../../components/auth/SignUpForm/InvitationSignUpForm';
import { StartPageLayout } from '../../../components/layout/StartPageLayout';
import { useAppLoader } from '../../../hooks/useAppLoader';
import { useGetProject, useGetUser } from '../../../services/hooks';
import { getHasToken } from '../../../utils/token';

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

  const handleSignUpSuccess = () => {
    router.push(`/project/${data?.projectId}`);
  };

  const title = `Kreatli | Join "${data?.projectName}"`;

  if (isLoading || !data || !token) {
    return null;
  }

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
        <p className="mb-4 text-foreground-500">Please create an account to join the project.</p>
        <InvitationSignUpForm email={data?.email} token={token} onSuccess={handleSignUpSuccess} />
      </StartPageLayout>
    </>
  );
}
