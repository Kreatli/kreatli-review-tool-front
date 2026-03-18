import { Select, SelectItem } from '@heroui/react';
import { useFormContext } from 'react-hook-form';

import { useGetProjectId } from '../../../services/hooks';

interface Props {
  projectId: string;
  size?: 'sm' | 'md' | 'lg';
  autoFocus?: boolean;
  label?: string;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

export const TaskStageSelect = ({
  projectId,
  size = 'sm',
  autoFocus = false,
  label = 'Stage',
  isOpen,
  onOpenChange,
}: Props) => {
  const { data: project } = useGetProjectId(projectId, { refetchOnMount: false });

  const { register } = useFormContext();

  if (!project) {
    return null;
  }

  return (
    <Select
      maxListboxHeight={256}
      label={label}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size={size}
      autoFocus={autoFocus}
      placeholder="Select stage"
      {...register('status')}
    >
      {project.taskStatuses.map((status) => (
        <SelectItem key={status.value}>{status.label}</SelectItem>
      ))}
    </Select>
  );
};
