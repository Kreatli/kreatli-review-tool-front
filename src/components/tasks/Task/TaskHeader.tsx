import { Button } from '@heroui/react';
import { useState } from 'react';

import { TaskDto } from '../../../services/types';
import { Icon } from '../../various/Icon';
import { TaskUnhideModal } from './TaskUnhideModal';

interface Props {
  projectId: string;
  task: TaskDto;
}

export const TaskHeader = ({ projectId, task }: Props) => {
  const [isTaskUnhideModalVisible, setIsTaskUnhideModalVisible] = useState(false);

  const handleUnhide = () => {
    setIsTaskUnhideModalVisible(true);
  };

  const handleUnhideCancel = () => {
    setIsTaskUnhideModalVisible(false);
  };

  return (
    <>
      {task.isHidden && (
        <div>
          <Button
            size="sm"
            variant="flat"
            color="primary"
            startContent={<Icon icon="eye" size={14} />}
            onClick={handleUnhide}
          >
            Unhide
          </Button>
        </div>
      )}
      <TaskUnhideModal
        projectId={projectId}
        taskId={task.id}
        isVisible={isTaskUnhideModalVisible}
        onClose={handleUnhideCancel}
      />
    </>
  );
};
