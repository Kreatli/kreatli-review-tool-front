import { Button } from '@heroui/react';
import Head from 'next/head';
import { useParams } from 'next/navigation';
import { useState } from 'react';

import { ProjectLayout } from '../../../components/project/Project';
import { Board } from '../../../components/tasks/Board';
import { BoardColumnsModal } from '../../../components/tasks/Board/BoardColumnsModal';
import { BoardFilters, BoardFiltersType } from '../../../components/tasks/Board/BoardFilters';
import { BoardSkeleton } from '../../../components/tasks/Board/BoardSkeleton';
import { EmptyState } from '../../../components/various/EmptyState';
import { Icon } from '../../../components/various/Icon';
import { useGetProjectIdTasks } from '../../../services/hooks';

export default function TasksPage() {
  const { id } = useParams<{ id: string }>();
  const [isColumnsModalVisible, setIsColumnsModalVisible] = useState(false);

  const [filters, setFilters] = useState<BoardFiltersType>({});

  const {
    data: tasksData,
    isPending,
    isError,
    refetch,
  } = useGetProjectIdTasks(id, {
    contributor: filters.contributor,
    owner: filters.owner,
  });

  if (isError) {
    return (
      <EmptyState
        title="Something went wrong"
        icon="error"
        text="An unexpected error occurred. Please try loading the data again."
      >
        <Button size="sm" className="mt-4" variant="flat" onClick={refetch}>
          <Icon icon="update" size={16} />
          Reload
        </Button>
      </EmptyState>
    );
  }

  return (
    <>
      <Head>
        <title>Kreatli | Tasks</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="flex max-h-[calc(100vh-64px)] flex-1 flex-col gap-3 overflow-hidden">
        <div className="flex items-center justify-between gap-2 p-3 px-3 pb-0 sm:px-4">
          <h2 className="text-2xl font-semibold">Tasks</h2>
          <div className="flex items-center gap-2">
            <BoardFilters projectId={id} defaultFilters={filters} onFiltersChange={setFilters} />
            <Button
              className="bg-foreground text-content1"
              startContent={<Icon icon="gear" size={16} />}
              onClick={() => setIsColumnsModalVisible(true)}
            >
              Manage columns
            </Button>
          </div>
        </div>
        {isPending ? <BoardSkeleton /> : <Board key={id} projectId={id} columns={tasksData?.columns ?? []} />}
      </div>
      <BoardColumnsModal
        projectId={id}
        isOpen={isColumnsModalVisible}
        onClose={() => setIsColumnsModalVisible(false)}
      />
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
TasksPage.getLayout = (page: any) => <ProjectLayout>{page}</ProjectLayout>;
