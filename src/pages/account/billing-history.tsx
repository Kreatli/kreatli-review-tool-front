import Head from 'next/head';

import { AccountLayout } from '../../components/account/Account';
import { BillingHistory } from '../../components/account/BillingHistory';
import { useSession } from '../../hooks/useSession';

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
BillingHistoryPage.getLayout = (page: any) => <AccountLayout>{page}</AccountLayout>;
