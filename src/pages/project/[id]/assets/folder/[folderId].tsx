import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import { ProjectLayout } from '../../../../../components/project/Project';
import { ProjectFolderAssets } from '../../../../../components/project/ProjectAssets/ProjectFolderAssets';

export default function ProjectAssetsPage() {
  const router = useRouter();

  if (!router.query.folderId) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Kreatli | Folder</title>
      </Head>
      <ProjectFolderAssets folderId={router.query.folderId as string} />
    </>
  );
}

ProjectAssetsPage.getLayout = (page: any) => <ProjectLayout hideHeader>{page}</ProjectLayout>;
