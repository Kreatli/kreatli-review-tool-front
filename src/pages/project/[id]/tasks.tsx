import { Button } from '@heroui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import { ProjectLayout } from '../../../components/project/Project';
import { EmptyState } from '../../../components/various/EmptyState';
import { Icon } from '../../../components/various/Icon';

export default function TasksPage() {
  const router = useRouter();

  const isError = false;

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
          // onClick={refetch}
        >
          Reload
        </Button>
      </EmptyState>
    );
  }

  return (
    <>
      <Head>
        <title>Kreatli | Tasks</title>
      </Head>
      <div className="flex flex-col gap-3 p-3 px-3 sm:px-4">
        <h2 className="text-2xl font-semibold">Tasks</h2>
        tasks
      </div>
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
TasksPage.getLayout = (page: any) => <ProjectLayout>{page}</ProjectLayout>;
