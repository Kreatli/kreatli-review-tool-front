import Head from 'next/head';

import { Dashboard } from '../../../components/dashboard/Dashboard';
import { ProjectLayout } from '../../../components/project/Project';

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
ProjectDashboard.getLayout = (page: any) => <ProjectLayout>{page}</ProjectLayout>;
