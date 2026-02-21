import { Button } from '@heroui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import { ProjectLayout } from '../../../components/project/Project';
import { ProjectActivity } from '../../../components/project/ProjectActivity/ProjectActivity';
import { ProjectActivitySkeleton } from '../../../components/project/ProjectActivity/ProjectActivitySkeleton';
import { EmptyState } from '../../../components/various/EmptyState';
import { Icon } from '../../../components/various/Icon';
import { useGetProjectIdLogs } from '../../../services/hooks';

export default function ProjectActivityPage() {
  const router = useRouter();

  const [currentPage, setCurrentPage] = React.useState(1);

  const { data, isPending, isError, refetch } = useGetProjectIdLogs(router.query.id as string, {
    limit: 20,
    offset: (currentPage - 1) * 20,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isError) {
    return (
      <EmptyState
        title="Something went wrong"
        icon="error"
        text="An unexpected error occurred. Please try loading the data again."
      >
        <Button
          className="mt-4 bg-foreground text-content1"
          startContent={<Icon icon="update" size={16} />}
          onClick={refetch}
        >
          Reload
        </Button>
      </EmptyState>
    );
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
