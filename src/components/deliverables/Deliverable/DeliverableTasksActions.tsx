import { addToast, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';

import { useDeleteDeliverableIdTaskTaskId } from '../../../services/hooks';
import { getDeliverableIdTasks } from '../../../services/services';
import { TaskInfoDto } from '../../../services/types';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { Icon } from '../../various/Icon';

interface Props {
  deliverableId: string;
  task: TaskInfoDto;
}

export const DeliverableTasksActions = ({ deliverableId, task }: Props) => {
  const { mutate: deleteTask } = useDeleteDeliverableIdTaskTaskId();
  const queryClient = useQueryClient();

  const handleDelete = (task: TaskInfoDto) => {
    deleteTask(
      { id: deliverableId, taskId: task.id },
      {
        onSuccess: ({ tasks }) => {
          queryClient.setQueryData([getDeliverableIdTasks.key, deliverableId], { tasks });
        },
        onError: (error) => {
          addToast({ title: getErrorMessage(error), color: 'danger', variant: 'flat' });
        },
      },
    );
  };

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Button isIconOnly radius="full" size="sm" variant="light">
          <Icon icon="dots" size={16} className="rotate-90" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant="flat">
        <DropdownItem
          key="remove"
          startContent={<Icon icon="trash" size={16} />}
          color="danger"
          onClick={() => handleDelete(task)}
        >
          Delete
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
