import Head from 'next/head';

import { AccountLayout } from '../../components/account/Account';
import { Settings } from '../../components/account/Settings';
import { useSession } from '../../hooks/useSession';

export default function SettingsPage() {
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
      <Settings />
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
SettingsPage.getLayout = (page: any) => <AccountLayout>{page}</AccountLayout>;
