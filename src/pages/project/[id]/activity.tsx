import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import { ProjectLayout } from '../../../components/project/Project';
import { ProjectActivity } from '../../../components/project/ProjectActivity/ProjectActivity';
import { ProjectActivitySkeleton } from '../../../components/project/ProjectActivity/ProjectActivitySkeleton';
import { useGetProjectIdLogs } from '../../../services/hooks';

export default function ProjectActivityPage() {
  const router = useRouter();

  const [currentPage, setCurrentPage] = React.useState(1);

  const { data, isPending, isError } = useGetProjectIdLogs(router.query.id as string, {
    limit: 20,
    offset: (currentPage - 1) * 20,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isError) {
    return <div>Error loading activity</div>;
  }

  return (
    <>
      <Head>
        <meta name="description" content="Kreatli" />
      </Head>
      {isPending ? (
        <ProjectActivitySkeleton />
      ) : (
        <ProjectActivity
          logs={data.logs}
          logsCount={data.logsCount}
          page={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
}

ProjectActivityPage.getLayout = (page: any) => <ProjectLayout>{page}</ProjectLayout>;
