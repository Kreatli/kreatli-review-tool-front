import { Button, Select, SelectItem } from '@heroui/react';
import { Gantt, IApi, Willow } from '@svar-ui/react-gantt';
import { useQueryClient } from '@tanstack/react-query';
import { useRef, useState } from 'react';

import { useDeliverableModalVisibility } from '../../../hooks/useDeliverableModalVisibility';
import { usePatchDeliverableId } from '../../../services/hooks';
import { getProjectIdDeliverables } from '../../../services/services';
import { DeliverableInfoDto, DeliverablesDto } from '../../../services/types';
import { EmptyState } from '../../various/EmptyState';
import { Icon } from '../../various/Icon';
import { NewDeliverableModal } from '../Deliverable/NewDeliverableModal';
import { DeliverableCell } from './DeliverableCell';

const zoomConfig = {
  level: 1,
  levels: [
    {
      minCellWidth: 75,
      maxCellWidth: 400,
      scales: [{ unit: 'month', step: 1, format: '%M %Y' }],
    },
    {
      minCellWidth: 50,
      maxCellWidth: 150,
      scales: [{ unit: 'day', step: 1, format: '%j %M' }],
    },
  ],
};

interface Props {
  projectId: string;
  deliverables: DeliverableInfoDto[];
}

export const DeliverablesTimeline = ({ projectId, deliverables }: Props) => {
  const ganttRef = useRef<IApi>(null);
  const [isNewDeliverableModalVisible, setIsNewDeliverableModalVisible] = useState(false);
  const [unit, setUnit] = useState<'month' | 'day'>('day');
  const { openDeliverableModal } = useDeliverableModalVisibility();

  const queryClient = useQueryClient();
  const { mutate } = usePatchDeliverableId();

  const tasks = [
    ...deliverables.map((deliverable) => ({
      id: deliverable.id,
      name: 'deliverable.name',
      details: deliverable.name,
      start: new Date(deliverable.startDate),
      end: new Date(deliverable.endDate),
      text: deliverable.name,
    })),
    {
      id: 'empty-row',
    },
  ];

  const init = (api: IApi) => {
    api.on('select-task', (ev) => {
      if (!ev.focus) {
        openDeliverableModal(ev.id.toString());
      }
    });

    api.on('zoom-scale', () => {
      const zoomLevel = api.getState().zoom?.level ?? 0;
      setUnit(zoomLevel === 0 ? 'month' : 'day');
    });

    api.on('update-task', (ev) => {
      if (!ev.task.start || !ev.task.end) {
        return;
      }

      queryClient.setQueriesData<DeliverablesDto>({ queryKey: [getProjectIdDeliverables.key, projectId] }, (data) => {
        if (!data) {
          return data;
        }

        return {
          ...data,
          deliverables:
            data?.deliverables.map((deliverable) => {
              if (deliverable.id === ev.id) {
                return {
                  ...deliverable,
                  startDate: ev.task.start?.toISOString() ?? deliverable.startDate,
                  endDate: ev.task.end?.toISOString() ?? deliverable.endDate,
                };
              }
              return deliverable;
            }) ?? [],
        };
      });

      mutate({
        id: ev.id as string,
        requestBody: { startDate: ev.task.start.toISOString(), endDate: ev.task.end.toISOString() },
      });
    });
  };

  const handleUnitChange = (unit: 'month' | 'day') => {
    setUnit(unit);
  };

  const handlePrev = () => {
    const state = ganttRef.current?.getState();
    // eslint-disable-next-line no-underscore-dangle
    ganttRef.current?.exec('scroll-chart', { left: (state?.scrollLeft ?? 0) - (state?._chartWidth ?? 0) });
  };

  const handleNext = () => {
    const state = ganttRef.current?.getState();
    // eslint-disable-next-line no-underscore-dangle
    ganttRef.current?.exec('scroll-chart', { left: (state?.scrollLeft ?? 0) + (state?._chartWidth ?? 0) });
  };

  return (
    <>
      {deliverables.length > 0 ? (
        <Willow fonts={false}>
          <div className="deliverables-timeline">
            <div className="flex items-center justify-between gap-2 border-b p-1.5">
              <Select
                selectedKeys={new Set([unit])}
                size="sm"
                variant="faded"
                startContent={<Icon icon="calendar" className="text-foreground-500" size={24} />}
                className="w-28"
                selectionMode="single"
                disallowEmptySelection
                onChange={(e) => handleUnitChange(e.target.value as 'month' | 'day')}
              >
                <SelectItem key="day">Day</SelectItem>
                <SelectItem key="month">Month</SelectItem>
              </Select>
              <div className="flex items-center gap-1">
                <Button isIconOnly size="sm" radius="full" variant="faded" onClick={handlePrev}>
                  <Icon icon="chevronDown" size={16} className="rotate-90" />
                </Button>
                <Button isIconOnly size="sm" radius="full" variant="faded" onClick={handleNext}>
                  <Icon icon="chevronDown" size={16} className="-rotate-90" />
                </Button>
              </div>
            </div>
            <Gantt
              ref={ganttRef}
              tasks={tasks}
              cellHeight={40}
              zoom={{
                ...zoomConfig,
                level: unit === 'month' ? 0 : 1,
              }}
              columns={[
                {
                  id: 'text',
                  header: 'Title',
                  width: 250,
                  sort: false,
                  resize: false,
                  cell: ({ row }) => <DeliverableCell deliverables={deliverables} row={row as { id: string }} />,
                },
              ]}
              init={init}
            />
          </div>
        </Willow>
      ) : (
        <EmptyState
          title="No deliverables yet"
          text="You don't have any deliverables yet. Go ahead and create first one."
        >
          <Button className="mt-3 bg-foreground text-content1" onClick={() => setIsNewDeliverableModalVisible(true)}>
            <Icon icon="plus" size={16} />
            Create deliverable
          </Button>
        </EmptyState>
      )}
      <NewDeliverableModal
        projectId={projectId}
        isVisible={isNewDeliverableModalVisible}
        onClose={() => setIsNewDeliverableModalVisible(false)}
      />
    </>
  );
};
