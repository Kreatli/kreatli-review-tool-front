import { Gantt, IApi, Willow } from '@svar-ui/react-gantt';

import { useDeliverableModalVisibility } from '../../../hooks/useDeliverableModalVisibility';
import { DeliverableInfoDto } from '../../../services/types';
import { DeliverableCell } from './DeliverableCell';

interface Props {
  projectId: string;
  deliverables: DeliverableInfoDto[];
}

export const DeliverablesTimeline = ({ deliverables }: Props) => {
  const { openDeliverableModal } = useDeliverableModalVisibility();

  const tasks = deliverables.map((deliverable) => ({
    id: deliverable.id,
    name: 'deliverable.name',
    details: deliverable.name,
    start: new Date(deliverable.startDate),
    end: new Date(deliverable.endDate),
    text: deliverable.name,
  }));

  const init = (api: IApi) => {
    api.on('select-task', (ev) => {
      if (!ev.focus) {
        openDeliverableModal(ev.id.toString());
      }
    });
  };

  return (
    <Willow fonts={false}>
      <div className="deliverables-timeline">
        <Gantt
          tasks={tasks}
          readonly
          columns={[
            {
              id: 'text',
              header: 'Deliverable',
              width: 250,
              sort: false,
              resize: false,
              cell: ({ row }) => <DeliverableCell deliverables={deliverables} row={row as { id: string }} />,
            },
          ]}
          zoom
          init={init}
        />
      </div>
    </Willow>
  );
};
