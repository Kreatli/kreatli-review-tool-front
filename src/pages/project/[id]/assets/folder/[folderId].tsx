import Head from 'next/head';
import { useRouter } from 'next/router';

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
ProjectAssetsPage.getLayout = (page: any) => <ProjectLayout>{page}</ProjectLayout>;
