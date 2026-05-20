import { Button, Tab, Tabs } from '@heroui/react';
import Head from 'next/head';
import { useParams } from 'next/navigation';
import { useState } from 'react';

import { NewDeliverableModal } from '../../../components/deliverables/Deliverable/NewDeliverableModal';
import { Deliverables } from '../../../components/deliverables/Deliverables/Deliverables';
import {
  DeliverablesFilters,
  DeliverablesFiltersType,
} from '../../../components/deliverables/Deliverables/DeliverablesFilter';
import { DeliverablesSkeleton } from '../../../components/deliverables/Deliverables/DeliverablesSkeleton';
import { DeliverablesStatusesModal } from '../../../components/deliverables/Deliverables/DeliverablesStatusesModal';
import { DeliverablesTimeline } from '../../../components/deliverables/DeliverablesTimeline/DeliverablesTimeline';
import { ProjectLayout } from '../../../components/project/Project';
import { useIsBreakpoint } from '../../../components/tiptap/hooks/use-is-breakpoint';
import { usePlansModalVisibility } from '../../../hooks/usePlansModalVisibility';
import { useSession } from '../../../hooks/useSession';
import { Icon } from '../../../components/various/Icon';
import { useGetProjectIdDeliverables } from '../../../services/hooks';

export default function DeliverablesPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useSession();
  const setIsPlansModalVisible = usePlansModalVisibility((state) => state.setIsVisible);
  const [filters, setFilters] = useState<DeliverablesFiltersType>({});
  const [isColumnsModalVisible, setIsStatusesModalVisible] = useState(false);
  const [isNewDeliverableModalVisible, setIsNewDeliverableModalVisible] = useState(false);

  const isExploreMode = user && !user.subscription.isActive;

  const isMobile = useIsBreakpoint('max', 768);

  const {
    data: deliverablesData,
    isPending,
    isError,
    refetch,
  } = useGetProjectIdDeliverables(id, {
    status: filters.status,
    owner: filters.owner,
  });

  const hasFilters = Object.keys(filters).length > 0;

  if (isError) {
    return (
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="text-center">
          <p className="font-semibold text-foreground">Something went wrong</p>
          <p className="mt-1 text-foreground-500">An unexpected error occurred. Please try loading the data again.</p>
          <Button size="sm" className="mt-4" variant="flat" onClick={refetch}>
            <Icon icon="update" size={16} />
            Reload
          </Button>
        </div>
      </div>
    );
  }

  const noResultsFound = (
    <div className="flex flex-1 items-center justify-center py-16 text-center">
      <div>
        <p className="font-semibold text-foreground">No deliverables found</p>
        <p className="mt-1 text-foreground-500">Try changing or resetting your filters</p>
        <Button className="mt-4 bg-foreground text-content1" onClick={() => setFilters({})}>
          Reset filters
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <Head>
        <title>Kreatli | Deliverables</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="relative flex flex-1 flex-col gap-1">
        {/* Page content — blurred and non-interactive in explore mode */}
        <div className={isExploreMode ? 'pointer-events-none select-none' : ''}>
          <div className="flex items-center justify-between gap-2 p-3 px-3 pb-0 sm:px-4">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-semibold">Deliverables</h2>
              <Button size="sm" variant="flat" radius="full" isIconOnly={isMobile}>
                <Icon icon="plus" size={14} />
                {!isMobile && 'New'}
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <DeliverablesFilters projectId={id} defaultFilters={filters} onFiltersChange={setFilters} />
              <Button
                className="bg-foreground text-content1"
                startContent={<Icon icon="gear" size={16} />}
              >
                Manage statuses
              </Button>
            </div>
          </div>
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
                ) : hasFilters && deliverablesData?.deliverables.length === 0 ? (
                  noResultsFound
                ) : (
                  <Deliverables key={id} projectId={id} deliverables={deliverablesData?.deliverables ?? []} />
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
              ) : hasFilters && deliverablesData?.deliverables.length === 0 ? (
                noResultsFound
              ) : (
                <DeliverablesTimeline key={id} projectId={id} deliverables={deliverablesData?.deliverables ?? []} />
              )}
            </Tab>
          </Tabs>
        </div>

        {/* Frosted-glass upgrade overlay for explore-mode users */}
        {isExploreMode && (
          <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm">
            <div className="mx-4 flex max-w-sm flex-col items-center gap-3 rounded-2xl border border-foreground-200 bg-content1/90 p-8 text-center shadow-lg">
              <div className="flex size-12 items-center justify-center rounded-full bg-foreground-100">
                <Icon icon="slides" size={22} />
              </div>
              <div>
                <p className="text-lg font-semibold text-foreground">Available on paid plans</p>
                <p className="mt-1 text-sm text-foreground-500">
                  Deliverables is available during your free trial and on all paid plans. Track outputs, set deadlines,
                  and manage project deliverables.
                </p>
              </div>
              <Button
                className="bg-foreground text-content1"
                onClick={() => setIsPlansModalVisible(true, 'explore_mode_deliverables')}
              >
                {user?.subscription.hasUsedTrial ? 'Upgrade to a plan' : 'Start free trial'}
              </Button>
            </div>
          </div>
        )}
      </div>

      {!isExploreMode && (
        <>
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
      )}
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
DeliverablesPage.getLayout = (page: any) => <ProjectLayout>{page}</ProjectLayout>;
