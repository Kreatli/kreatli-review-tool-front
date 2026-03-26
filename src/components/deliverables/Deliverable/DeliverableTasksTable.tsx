import { Avatar, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';

import { useTaskModalVisibility } from '../../../hooks/useTaskModalVisibility';
import { TaskInfoDto } from '../../../services/types';
import { DeliverableTasksActions } from './DeliverableTasksActions';

interface Props {
  tasks: TaskInfoDto[];
  deliverableId: string;
}

export const DeliverableTasksTable = ({ tasks, deliverableId }: Props) => {
  const { openTaskModal } = useTaskModalVisibility();

  const handleClick = (task: TaskInfoDto) => {
    openTaskModal(task.id, undefined, 'push');
  };

  return (
    <Table isCompact removeWrapper>
      <TableHeader>
        <TableColumn>Name</TableColumn>
        <TableColumn>Owner</TableColumn>
        <TableColumn>Status</TableColumn>
        <TableColumn width={40}> </TableColumn>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow
            key={task.id}
            className="group/row hover:cursor-pointer hover:opacity-70"
            onClick={() => handleClick(task)}
          >
            <TableCell>
              <div className="line-clamp-2 font-semibold">{task.name}</div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2 truncate text-xs">
                <Avatar
                  className="size-5 shrink-0"
                  name={task.owner.name}
                  getInitials={(name) => name.charAt(0).toUpperCase()}
                  src={task.owner.avatar?.url}
                />
                {task.owner.name}
              </div>
            </TableCell>
            <TableCell>
              <div className="text-xs">{task.statusLabel || 'Unplaced'}</div>
            </TableCell>
            <TableCell>
              <DeliverableTasksActions deliverableId={deliverableId} task={task} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
