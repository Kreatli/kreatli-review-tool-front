import Head from 'next/head';

import { Header } from '../components/layout/Header';
import { useSession } from '../hooks/useSession';

export default function AppSummoAuth() {
  const { isSignedIn } = useSession();

  return (
    <>
      <Head>
        <title>Kreatli | AppSummo Auth</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <Header />
      <div className="container mx-auto max-w-screen-lg px-3 text-center xs:px-6">Test {isSignedIn}</div>
    </>
  );
}
