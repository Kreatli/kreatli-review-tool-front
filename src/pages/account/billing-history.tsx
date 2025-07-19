import Head from 'next/head';
import React from 'react';
import { useSession } from '../../hooks/useSession';
import { AccountLayout } from '../../components/account/Account';
import { BillingHistory } from '../../components/account/BillingHistory';

export default function BillingHistoryPage() {
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
      <BillingHistory />
    </>
  );
}

BillingHistoryPage.getLayout = (page: any) => <AccountLayout>{page}</AccountLayout>;
