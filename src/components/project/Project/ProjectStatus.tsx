import { Chip, cn } from '@heroui/react';
import { ProjectDto } from '../../../services/types';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'primary';
    case 'completed':
      return 'success';
    case 'archived':
      return 'default';
    default:
      return 'default';
  }
};

interface Props {
  status: ProjectDto['status'];
  variant?: 'light';
  size?: 'sm' | 'md' | 'lg';
}

export const ProjectStatus = ({ status, variant, size = 'sm' }: Props) => {
  return (
    <Chip
      size={size}
      variant="dot"
      color={getStatusColor(status)}
      className={cn('bg-default-100  z-10', {
        'bg-transparent border-none': variant === 'light',
      })}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Chip>
  );
};
