import Head from 'next/head';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Asset } from '../../../../components/asset/Asset/Asset';
import { useProtectedPage } from '../../../../hooks/useProtectedPage';
import { trackEvent } from '../../../../lib/amplitude';

export default function ProjectAssetsFilePage() {
  const { isSignedIn } = useProtectedPage();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    trackEvent('open_asset_view');
  }, []);

  if (!isSignedIn || !router.query.fileId || !router.query.id) {
    return null;
  }

  const fileId = router.query.fileId.toString();
  const projectId = router.query.id.toString();
  const compareFileId = searchParams.get('compareFileId');

  return (
    <>
      <Head>
        <title>Kreatli | Media</title>
      </Head>
      <Asset fileId={fileId} projectId={projectId} compareFileId={compareFileId} />
    </>
  );
}

ProjectAssetsFilePage.appLayout = false;
