import Head from 'next/head';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import React from 'react';

import { Asset } from '../../../../components/asset/Asset/Asset';
import { useProtectedPage } from '../../../../hooks/useProtectedPage';

export default function ProjectAssetsPage() {
  const { isSignedIn } = useProtectedPage();
  const router = useRouter();
  const searchParams = useSearchParams();

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

ProjectAssetsPage.appLayout = false;
