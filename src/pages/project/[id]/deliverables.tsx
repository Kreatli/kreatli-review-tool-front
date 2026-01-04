import Head from 'next/head';
import React from 'react';

import { DeliverablesList } from '../../../components/project/Deliverables';
import { ProjectLayout } from '../../../components/project/Project';

export default function ProjectDeliverables() {
  return (
    <>
      <Head>
        <title>Kreatli | Deliverables</title>
      </Head>
      <ProjectLayout>
        <DeliverablesList />
      </ProjectLayout>
    </>
  );
}
