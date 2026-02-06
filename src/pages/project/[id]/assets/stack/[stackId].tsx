import Head from 'next/head';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Stack } from '../../../../../components/asset/Stack/Stack';
import { useProtectedPage } from '../../../../../hooks/useProtectedPage';
import { trackEvent } from '../../../../../lib/amplitude';

export default function ProjectAssetsStackPage() {
  const { isSignedIn } = useProtectedPage();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    trackEvent('open_asset_view');
  }, []);

  if (!isSignedIn || !router.query.stackId || !router.query.id) {
    return null;
  }

  const stackId = router.query.stackId.toString();
  const projectId = router.query.id.toString();
  const compareFileId = searchParams.get('compareFileId');

  return (
    <>
      <Head>
        <title>Kreatli | Media</title>
      </Head>
      <Stack stackId={stackId} projectId={projectId} compareFileId={compareFileId} />
    </>
  );
}

ProjectAssetsStackPage.appLayout = false;
