import Head from 'next/head';

import { AccountLayout } from '../../components/account/Account';
import { GeneralInformation } from '../../components/account/GeneralInformation';
import { useSession } from '../../hooks/useSession';

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
GeneralInformationPage.getLayout = (page: any) => <AccountLayout>{page}</AccountLayout>;
