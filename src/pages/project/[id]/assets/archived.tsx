import Head from 'next/head';

import { ProjectLayout } from '../../../../components/project/Project';
import { ProjectArchivedAssets } from '../../../../components/project/ProjectAssets';

export default function ProjectAssetsPage() {
  return (
    <>
      <Head>
        <title>Kreatli | Recently deleted</title>
      </Head>
      <ProjectArchivedAssets />
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
ProjectAssetsPage.getLayout = (page: any) => <ProjectLayout hideHeader>{page}</ProjectLayout>;
