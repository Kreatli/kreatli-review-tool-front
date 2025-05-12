import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import { AssetPanel } from '../../../../components/asset/AssetPanel';
import { ReviewTool } from '../../../../components/asset/ReviewTool';
import { FileContextProvider } from '../../../../contexts/File';
import { useProtectedPage } from '../../../../hooks/useProtectedPage';

export default function ProjectAssetsPage() {
  const { isSignedIn } = useProtectedPage();
  const router = useRouter();

  if (!isSignedIn || !router.query.fileId || !router.query.id) {
    return null;
  }

  return (
    <>
      <Head>
        <meta name="description" content="Kreatli" />
      </Head>
      <FileContextProvider fileId={router.query.fileId.toString()} projectId={router.query.id.toString()}>
        <div className="grid grid-cols-[1fr,350px] h-screen">
          <ReviewTool />
          <AssetPanel />
        </div>
      </FileContextProvider>
    </>
  );
}

ProjectAssetsPage.appLayout = false;
