import { Autocomplete, AutocompleteItem, Avatar, Chip } from '@heroui/react';
import { useFieldArray } from 'react-hook-form';

import { useGetProjectId } from '../../../services/hooks';
import { ProjectMemberItem } from '../../project/ProjectMemberItem';

interface FormValues {
  contributors: {
    userId: string;
    name: string;
    avatar: string;
  }[];
}

interface Props {
  projectId: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  autoFocus?: boolean;
}

export const TaskContributorsSelect = ({ projectId, size = 'sm', label = 'Contributors', autoFocus }: Props) => {
  const { data: project } = useGetProjectId(projectId, { refetchOnMount: false });

  const { fields, append, remove } = useFieldArray<FormValues, 'contributors', 'id'>({ name: 'contributors' });

  if (!project) {
    return null;
  }

  const members = project.members
    .filter((member) => member.user && !fields.find((field) => field.userId === member.user?.id))
    .filter((member) => member.status === 'joined');

  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-wrap gap-1">
        {fields.map((field, index) => (
          <Chip
            key={field.userId}
            variant="flat"
            avatar={<Avatar src={field.avatar} name={field.name} getInitials={(name) => name.charAt(0)} />}
            isCloseable
            onClose={() => {
              remove(index);
            }}
          >
            {field.name}
          </Chip>
        ))}
      </div>
      <Autocomplete
        defaultItems={members}
        maxListboxHeight={256}
        value={fields.map((field) => field.userId)}
        size={size}
        autoFocus={autoFocus}
        label={label}
        placeholder="Select contributors"
        selectedKey=""
        onSelectionChange={(userId) => {
          if (fields.find((field) => field.userId === (userId as string))) {
            return;
          }
          append({
            userId: userId as string,
            name: members.find((member) => member.user?.id === userId)?.user?.name ?? '',
            avatar: members.find((member) => member.user?.id === userId)?.user?.avatar?.url ?? '',
          });
        }}
      >
        {(member) => (
          <AutocompleteItem key={member.user?.id} textValue={member.user?.name ?? member.email}>
            <ProjectMemberItem member={member} />
          </AutocompleteItem>
        )}
      </Autocomplete>
    </div>
  );
};
