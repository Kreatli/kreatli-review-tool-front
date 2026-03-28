import { Button, Tab, Tabs } from '@heroui/react';
import Head from 'next/head';
import { useParams } from 'next/navigation';
import { useState } from 'react';

import { NewDeliverableModal } from '../../../components/deliverables/Deliverable/NewDeliverableModal';
import { Deliverables } from '../../../components/deliverables/Deliverables/Deliverables';
import { DeliverablesSkeleton } from '../../../components/deliverables/Deliverables/DeliverablesSkeleton';
import { DeliverablesStatusesModal } from '../../../components/deliverables/Deliverables/DeliverablesStatusesModal';
import { DeliverablesTimeline } from '../../../components/deliverables/DeliverablesTimeline/DeliverablesTimeline';
import { ProjectLayout } from '../../../components/project/Project';
import { useIsBreakpoint } from '../../../components/tiptap/hooks/use-is-breakpoint';
import { EmptyState } from '../../../components/various/EmptyState';
import { Icon } from '../../../components/various/Icon';
import { useGetProjectIdDeliverables } from '../../../services/hooks';

export default function DeliverablesPage() {
  const { id } = useParams<{ id: string }>();
  const [isColumnsModalVisible, setIsStatusesModalVisible] = useState(false);
  const [isNewDeliverableModalVisible, setIsNewDeliverableModalVisible] = useState(false);

  const isMobile = useIsBreakpoint('max', 768);

  const { data: tasksData, isPending, isError, refetch } = useGetProjectIdDeliverables(id);

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
        <title>Kreatli | Deliverables</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex items-center justify-between gap-2 p-3 px-3 pb-0 sm:px-4">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold">Deliverables</h2>
            <Button
              size="sm"
              variant="flat"
              radius="full"
              isIconOnly={isMobile}
              onClick={() => setIsNewDeliverableModalVisible(true)}
            >
              <Icon icon="plus" size={14} />
              {!isMobile && 'New'}
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button
              className="bg-foreground text-content1"
              startContent={<Icon icon="gear" size={16} />}
              onClick={() => setIsStatusesModalVisible(true)}
            >
              Manage statuses
            </Button>
          </div>
        </div>
        {localStorage.getItem('showGantt') ? (
          <Tabs size="sm" classNames={{ tab: 'p-1.5', panel: 'p-0 max-w-full', tabList: 'mx-3 sm:mx-4 mb-2' }}>
            <Tab
              key="list"
              title={
                <div className="flex items-center gap-1">
                  <Icon icon="list" size={16} />
                  List
                </div>
              }
            >
              <div className="p-3 pt-0 sm:px-4">
                {isPending ? (
                  <DeliverablesSkeleton />
                ) : (
                  <Deliverables key={id} projectId={id} deliverables={tasksData?.deliverables ?? []} />
                )}
              </div>
            </Tab>
            <Tab
              key="timeline"
              title={
                <div className="flex items-center gap-1">
                  <Icon icon="calendar" size={16} />
                  Timeline
                </div>
              }
            >
              {isPending ? (
                <DeliverablesSkeleton />
              ) : (
                <DeliverablesTimeline key={id} projectId={id} deliverables={tasksData?.deliverables ?? []} />
              )}
            </Tab>
          </Tabs>
        ) : (
          <div className="p-3 pt-0 sm:px-4">
            {isPending ? (
              <DeliverablesSkeleton />
            ) : (
              <Deliverables key={id} projectId={id} deliverables={tasksData?.deliverables ?? []} />
            )}
          </div>
        )}
      </div>
      <NewDeliverableModal
        projectId={id}
        isVisible={isNewDeliverableModalVisible}
        onClose={() => setIsNewDeliverableModalVisible(false)}
      />
      <DeliverablesStatusesModal
        projectId={id}
        isOpen={isColumnsModalVisible}
        onClose={() => setIsStatusesModalVisible(false)}
      />
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
DeliverablesPage.getLayout = (page: any) => <ProjectLayout>{page}</ProjectLayout>;
