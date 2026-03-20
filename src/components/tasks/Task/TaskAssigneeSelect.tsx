import { Autocomplete, AutocompleteItem } from '@heroui/react';
import { useController } from 'react-hook-form';

import { useGetProjectId } from '../../../services/hooks';
import { ProjectMemberItem } from '../../project/ProjectMemberItem';

interface Props {
  projectId: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  autoFocus?: boolean;
}

export const TaskAssigneeSelect = ({ projectId, size = 'sm', label = 'Owner', autoFocus = false }: Props) => {
  const { data: project } = useGetProjectId(projectId, { refetchOnMount: false });

  const { field, fieldState } = useController({ name: 'owner', rules: { required: true } });

  if (!project) {
    return null;
  }

  const members = project.members.filter((member) => member.user).filter((member) => member.status === 'joined');

  return (
    <Autocomplete
      defaultItems={members}
      maxListboxHeight={256}
      label={label}
      size={size}
      autoFocus={autoFocus}
      placeholder="Select owner"
      isInvalid={!!fieldState.error}
      defaultSelectedKey={field.value}
      selectedKey={field.value}
      onSelectionChange={(userId) => field.onChange(userId)}
    >
      {(member) => (
        <AutocompleteItem key={member.user?.id} textValue={member.user?.name ?? member.email}>
          <ProjectMemberItem member={member} />
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
};
