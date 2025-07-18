import Head from 'next/head';
import React from 'react';
import { useSession } from '../../hooks/useSession';
import { AccountLayout } from '../../components/account/Account';
import { Subscription } from '../../components/account/Subscription';

export default function SubscriptionPage() {
  const { isSignedIn, user } = useSession();

  if (!isSignedIn || !user) {
    return null;
  }

  const title = `${user.name} | Kreatli`;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Subscription user={user} />
    </>
  );
}

SubscriptionPage.getLayout = (page: any) => <AccountLayout>{page}</AccountLayout>;
