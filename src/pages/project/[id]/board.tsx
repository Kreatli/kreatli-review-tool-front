import Head from 'next/head';
import React from 'react';

import { Board } from '../../../components/project/Board';
import { ProjectLayout } from '../../../components/project/Project';

export default function ProjectBoard() {
  return (
    <>
      <Head>
        <title>Kreatli | Board</title>
      </Head>
      <ProjectLayout>
        <Board />
      </ProjectLayout>
    </>
  );
}
