import { Avatar } from '@heroui/react';

import { ProjectMemberDto } from '../../../services/types';

interface Props {
  member: ProjectMemberDto;
}

export const ProjectMemberItem = ({ member }: Props) => {
  return (
    <div className="flex items-center gap-3">
      <Avatar
        size="sm"
        name={member.user?.name ?? member.email}
        getInitials={(name) => name.charAt(0).toUpperCase()}
        src={member.user?.avatar?.url ?? ''}
      />
      <div>
        <div className="text-small">{member.user?.name}</div>
        <div className="text-tiny text-foreground-500">{member.user?.email}</div>
      </div>
    </div>
  );
};
