import { Select, SelectItem } from '@heroui/react';
import { useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { useGetProjectId } from '../../../services/hooks';

interface Props {
  projectId: string;
  size?: 'sm' | 'md' | 'lg';
  autoFocus?: boolean;
  label?: string;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

export const DeliverableStatusSelect = ({
  projectId,
  size = 'sm',
  autoFocus = false,
  label = 'Status',
  isOpen,
  onOpenChange,
}: Props) => {
  const { data: project } = useGetProjectId(projectId, { refetchOnMount: false });

  const { register } = useFormContext();

  const selectedStatus = useWatch({ name: 'status' });

  const selectedStatusColor = useMemo(() => {
    return project?.deliverableStatuses.find((status) => status.value === selectedStatus)?.color;
  }, [selectedStatus, project]);

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
      startContent={
        <span className="h-2 w-2 rounded-full bg-current" style={{ color: selectedStatusColor ?? '#A1A1AA' }} />
      }
      autoFocus={autoFocus}
      placeholder="Select status"
      {...register('status')}
    >
      {project.deliverableStatuses.map((status) => (
        <SelectItem
          key={status.value}
          startContent={<span className="h-2 w-2 rounded-full bg-current" style={{ color: status.color }} />}
        >
          {status.label}
        </SelectItem>
      ))}
    </Select>
  );
};
