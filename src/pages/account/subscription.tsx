import Head from 'next/head';

import { AccountLayout } from '../../components/account/Account';
import { Subscription } from '../../components/account/Subscription';
import { useSession } from '../../hooks/useSession';

export default function SubscriptionPage() {
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
      <Subscription user={user} />
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
SubscriptionPage.getLayout = (page: any) => <AccountLayout>{page}</AccountLayout>;
