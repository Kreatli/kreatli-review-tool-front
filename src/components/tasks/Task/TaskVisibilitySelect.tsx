import { Select, SelectItem } from '@heroui/react';
import { useController } from 'react-hook-form';

import { useSession } from '../../../hooks/useSession';

export const TaskVisibilitySelect = () => {
  const { user } = useSession();

  const { field } = useController({ name: 'visibleTo' });

  return (
    <Select
      label="Visibility"
      size="sm"
      maxListboxHeight={256}
      defaultSelectedKeys={['visible']}
      onChange={(e) => {
        if (e.target.value === 'visible') {
          field.onChange([]);
        } else {
          field.onChange([user?.id]);
        }
      }}
    >
      <SelectItem key="visible">Visible to everyone in the project</SelectItem>
      <SelectItem key="hidden">Hidden from everyone</SelectItem>
    </Select>
  );
};
