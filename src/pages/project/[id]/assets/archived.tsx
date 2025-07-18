import Head from 'next/head';
import React from 'react';

import { ProjectLayout } from '../../../../components/project/Project';
import { ProjectArchivedAssets } from '../../../../components/project/ProjectAssets';

export default function ProjectAssetsPage() {
  return (
    <>
      <Head>
        <title>Archived media | Kreatli</title>
      </Head>
      <ProjectArchivedAssets />
    </>
  );
}

ProjectAssetsPage.getLayout = (page: any) => <ProjectLayout hideHeader>{page}</ProjectLayout>;
