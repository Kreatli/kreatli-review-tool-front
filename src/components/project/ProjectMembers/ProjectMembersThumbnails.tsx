import { Avatar, AvatarGroup, Tooltip } from '@heroui/react';
import React from 'react';

import { ProjectMemberDto } from '../../../services/types';
import { getProjectMemberLetter } from '../../../utils/shortNames';

interface Props {
  members: ProjectMemberDto[];
  max?: number;
}

export const ProjectMembersThumbnails = ({ members, max = 3 }: Props) => {
  return (
    <AvatarGroup max={max}>
      {members
        .filter((member) => member.user)
        .filter((member) => member.status === 'joined')
        .map((member) => (
          <Tooltip
            key={member.id}
            content={
              <div>
                <div className="font-semibold">{member.user?.name}</div>
                <div>{member.user?.email}</div>
              </div>
            }
            offset={10}
          >
            <Avatar
              src={member.user?.avatar?.url ?? ''}
              size="sm"
              isBordered
              className="data-[hover=true]:-translate-x-0"
              fallback={<div className="select-none text-lg text-foreground-500">{getProjectMemberLetter(member)}</div>}
            />
          </Tooltip>
        ))}
    </AvatarGroup>
  );
};
