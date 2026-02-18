import Head from 'next/head';

import { ProjectLayout } from '../../../../components/project/Project';
import { ProjectAssets } from '../../../../components/project/ProjectAssets';

export default function ProjectAssetsPage() {
  return (
    <>
      <Head>
        <title>Kreatli | Media</title>
      </Head>
      <ProjectAssets />
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
ProjectAssetsPage.getLayout = (page: any) => <ProjectLayout>{page}</ProjectLayout>;
