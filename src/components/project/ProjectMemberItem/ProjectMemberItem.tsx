import { Avatar } from '@heroui/react';

import { ProjectMemberDto } from '../../../services/types';
import { getProjectMemberLetter } from '../../../utils/shortNames';

interface Props {
  member: ProjectMemberDto;
}

export const ProjectMemberItem = ({ member }: Props) => {
  return (
    <div className="flex items-center gap-3">
      <Avatar
        size="sm"
        src={member.user?.avatar?.url ?? ''}
        fallback={<div className="select-none text-lg text-foreground-500">{getProjectMemberLetter(member)}</div>}
      />
      <div>
        <div className="text-small">{member.user?.name}</div>
        <div className="text-tiny text-foreground-500">{member.user?.email}</div>
      </div>
    </div>
  );
};
