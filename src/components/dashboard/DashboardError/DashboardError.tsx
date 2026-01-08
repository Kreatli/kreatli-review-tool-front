import { Button } from '@heroui/react';

import { EmptyState } from '../../various/EmptyState';
import { Icon } from '../../various/Icon';

interface Props {
  onReload: () => void;
}

export const DashboardError = ({ onReload }: Props) => {
  return (
    <EmptyState
      size="sm"
      title="Something went wrong"
      icon="error"
      text="An unexpected error occurred. Please try loading the data again."
    >
      <Button size="sm" className="mt-4" variant="flat" onClick={onReload}>
        <Icon icon="update" size={16} />
        Reload
      </Button>
    </EmptyState>
  );
};
