import Head from 'next/head';
import React from 'react';
import { useSession } from '../../hooks/useSession';
import { AccountLayout } from '../../components/account/Account';
import { GeneralInformation } from '../../components/account/GeneralInformation';

export default function GeneralInformationPage() {
  const { isSignedIn, user } = useSession();

  if (!isSignedIn || !user) {
    return null;
  }

  const title = `Kreatli | ${user.name}`;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <GeneralInformation user={user} />
    </>
  );
}

GeneralInformationPage.getLayout = (page: any) => <AccountLayout>{page}</AccountLayout>;
