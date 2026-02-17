import { Avatar, Button, Chip, cn } from '@heroui/react';
import NextLink from 'next/link';

import { ProjectDto } from '../../../services/types';
import { getProjectMemberLetter } from '../../../utils/shortNames';
import { Icon } from '../../various/Icon';

const STATUS_COLORS = {
  invited: 'warning',
  joined: 'success',
  left: 'danger',
  removed: 'danger',
} as const;

interface Props {
  project: ProjectDto;
}

export const DashboardMembers = ({ project }: Props) => {
  return (
    <div className="px-4 pb-4">
      <div className="sticky top-0 z-10 flex items-center justify-between gap-3 bg-background py-3 pb-2">
        <NextLink href={`/project/${project.id}/members`} className="flex items-center gap-1">
          <span className="text-lg font-semibold">Members</span>
          <span className="text-medium text-foreground-500">({project.members.length})</span>
        </NextLink>
        <Button color="primary" variant="flat" size="sm" as={NextLink} href={`/project/${project.id}/members`}>
          Go to Members
          <Icon icon="arrowRight" size={16} />
        </Button>
      </div>
      <div className="flex flex-col">
        {project.members.map((member, index) => (
          <div key={member.id} className={cn({ 'mt-2 border-t border-foreground-200 pt-2': index !== 0 })}>
            <div className="relative flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 overflow-hidden">
                <Avatar
                  src={member.user?.avatar?.url}
                  size="md"
                  className="shrink-0 border border-foreground-200"
                  fallback={
                    <div className="select-none text-lg text-foreground-500">{getProjectMemberLetter(member)}</div>
                  }
                />
                <div className="flex flex-col overflow-hidden">
                  {member.user?.name && <div className="text-md truncate font-medium">{member.user.name}</div>}
                  <div className="truncate text-sm text-foreground-500">{member.email}</div>
                </div>
              </div>
              <div>
                <Chip color={STATUS_COLORS[member.status]} size="sm" variant="flat" className="pointer-events-none">
                  {member.status}
                </Chip>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
