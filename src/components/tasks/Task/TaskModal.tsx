import { Button, Chip, Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useTaskModalVisibility } from '../../../hooks/useTaskModalVisibility';
import { useGetTaskId } from '../../../services/hooks';
import { EmptyState } from '../../various/EmptyState';
import { Icon } from '../../various/Icon';
import { TaskContent } from './TaskContent';
import { TaskSkeleton } from './TaskSkeleton';
import { TaskTitle } from './TaskTitle';

interface Props {
  projectId: string;
}

export const TaskModal = ({ projectId }: Props) => {
  const { closeTaskModal } = useTaskModalVisibility();
  const searchParams = useSearchParams();

  const taskId = searchParams.get('taskId');

  const [isVisible, setIsVisible] = useState(false);

  const {
    data: task,
    isPending: isTaskLoading,
    isError,
    refetch,
  } = useGetTaskId(taskId ?? '', {
    enabled: !!taskId,
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsVisible(!!searchParams.get('taskId'));
  }, [searchParams]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => closeTaskModal(), 150);
  };

  return (
    <Modal size="5xl" placement="top" scrollBehavior="inside" isOpen={isVisible} onClose={handleClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-2 pb-2 text-2xl">
          {task?.isHidden && (
            <Chip size="sm" variant="flat" startContent={<Icon icon="eyeCrossed" size={12} className="mx-1" />}>
              Only visible to you
            </Chip>
          )}
          <TaskTitle projectId={projectId} taskId={taskId} name={task?.name} isLoading={isTaskLoading} />
        </ModalHeader>
        <ModalBody className="px-3 py-0 pb-6 sm:px-6">
          {isTaskLoading ? (
            <TaskSkeleton />
          ) : isError ? (
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
          ) : (
            <TaskContent projectId={projectId} task={task} />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
