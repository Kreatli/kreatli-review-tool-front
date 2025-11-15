import Head from 'next/head';
import React from 'react';
import { ProjectLayout } from '../../../components/project/Project';
import { Dashboard } from '../../../components/dashboard/Dashboard';

export default function ProjectDashboard() {
  return (
    <>
      <Head>
        <title>Kreatli | Home</title>
      </Head>
      <Dashboard />
    </>
  );
}

ProjectDashboard.getLayout = (page: any) => <ProjectLayout>{page}</ProjectLayout>;
