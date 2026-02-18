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
        <title>Kreatli | Activity</title>
      </Head>
      <div className="flex flex-col gap-3 p-3 px-3 sm:px-4">
        <h2 className="text-2xl font-semibold">Activity {data ? `(${data?.logsCount ?? 0})` : ''}</h2>
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
      </div>
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
ProjectActivityPage.getLayout = (page: any) => <ProjectLayout>{page}</ProjectLayout>;
