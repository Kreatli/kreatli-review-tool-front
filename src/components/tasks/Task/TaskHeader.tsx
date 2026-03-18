import { Button } from '@heroui/react';
import { useState } from 'react';

import { TaskDto } from '../../../services/types';
import { Icon } from '../../various/Icon';
import { TaskUnhideModal } from './TaskUnhideModal';

interface Props {
  projectId: string;
  task: TaskDto;
  onAttach: () => void;
}

export const TaskHeader = ({ projectId, task, onAttach }: Props) => {
  const [isTaskUnhideModalVisible, setIsTaskUnhideModalVisible] = useState(false);

  const handleUnhide = () => {
    setIsTaskUnhideModalVisible(true);
  };

  const handleUnhideCancel = () => {
    setIsTaskUnhideModalVisible(false);
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="flat"
          color="primary"
          startContent={<Icon icon="paperclip" size={16} />}
          onClick={onAttach}
        >
          Attach
        </Button>
        {task.isHidden && (
          <Button size="sm" variant="flat" startContent={<Icon icon="eye" size={14} />} onClick={handleUnhide}>
            Unhide
          </Button>
        )}
      </div>
      <TaskUnhideModal
        projectId={projectId}
        taskId={task.id}
        isVisible={isTaskUnhideModalVisible}
        onClose={handleUnhideCancel}
      />
    </>
  );
};
