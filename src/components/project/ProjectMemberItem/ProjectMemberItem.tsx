import { Avatar } from '@heroui/react';
import { getProjectMemberLetter } from '../../../utils/shortNames';
import { ProjectMemberDto } from '../../../services/types';

interface Props {
  member: ProjectMemberDto;
}

export const ProjectMemberItem = ({ member }: Props) => {
  return (
    <div className="flex items-center gap-3">
      <Avatar
        size="sm"
        src={member.user?.avatar?.url ?? ''}
        fallback={<div className="text-lg text-foreground-500 select-none">{getProjectMemberLetter(member)}</div>}
      />
      <div>
        <div className="text-small">{member.user?.name}</div>
        <div className="text-foreground-500 text-tiny">{member.user?.email}</div>
      </div>
    </div>
  );
};
