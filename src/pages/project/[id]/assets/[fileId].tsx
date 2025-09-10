import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import { AssetPanel } from '../../../../components/asset/AssetPanel';
import { ReviewTool } from '../../../../components/asset/ReviewTool';
import { FileContextProvider } from '../../../../contexts/File';
import { useProtectedPage } from '../../../../hooks/useProtectedPage';
import { useSearchParams } from 'next/navigation';

export default function ProjectAssetsPage() {
  const { isSignedIn } = useProtectedPage();
  const router = useRouter();
  const searchParams = useSearchParams();

  if (!isSignedIn || !router.query.fileId || !router.query.id) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Kreatli | Media</title>
      </Head>
      <FileContextProvider
        fileId={router.query.fileId.toString()}
        projectId={router.query.id.toString()}
        compareFileId={searchParams.get('compareFileId')}
      >
        <div className="md:grid grid-cols-[1fr,350px] md:h-screen">
          <ReviewTool />
          <AssetPanel />
        </div>
      </FileContextProvider>
    </>
  );
}

ProjectAssetsPage.appLayout = false;
