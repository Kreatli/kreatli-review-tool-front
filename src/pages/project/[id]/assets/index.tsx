import Head from 'next/head';
import React from 'react';

import { ProjectLayout } from '../../../../components/project/Project';
import { ProjectAssets } from '../../../../components/project/ProjectAssets';
import { ProjectAssetsFilters } from '../../../../components/project/ProjectAssets/ProjectAssetsSearch';

export default function ProjectAssetsPage() {
  return (
    <>
      <Head>
        <meta name="description" content="Kreatli" />
      </Head>
      <ProjectAssets />
    </>
  );
}

ProjectAssetsPage.getLayout = (page: any) => <ProjectLayout actions={<ProjectAssetsFilters />}>{page}</ProjectLayout>;
