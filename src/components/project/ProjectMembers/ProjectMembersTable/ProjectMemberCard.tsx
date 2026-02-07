import { Avatar, Card, CardBody, CardFooter, CardHeader, Chip } from '@heroui/react';

import { ProjectMemberDto } from '../../../../services/types';
import { formatFullDate } from '../../../../utils/dates';
import { getProjectMemberLetter } from '../../../../utils/shortNames';
import { ProjectMemberActions } from './ProjectMemberActions';

const STATUS_COLORS = {
  invited: 'warning',
  joined: 'success',
  left: 'danger',
  removed: 'danger',
} as const;

interface Props {
  member: ProjectMemberDto;
  isDisabled?: boolean;
  isEditable?: boolean;
  onRemove: (member: ProjectMemberDto) => void;
  onResendInvite: (member: ProjectMemberDto) => void;
}

export const ProjectMemberCard = ({ member, isDisabled, isEditable, onRemove, onResendInvite }: Props) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Avatar
            src={member.user?.avatar?.url}
            size="sm"
            isBordered
            fallback={<div className="select-none text-lg text-foreground-500">{getProjectMemberLetter(member)}</div>}
          />
          <div>
            <div className="text-sm font-semibold">{member.user?.name}</div>
            <div className="text-sm text-foreground-500">{member.email}</div>
          </div>
        </div>
      </CardHeader>
      <CardBody className="py-0">
        <div className="text-sm">
          Invitation date: <span className="text-foreground-500">{formatFullDate(member.invitedAt)}</span>
        </div>
        <div className="text-sm">
          Status:{' '}
          <Chip color={STATUS_COLORS[member.status]} size="sm" variant="flat">
            {member.status}
          </Chip>
        </div>
      </CardBody>
      {isEditable && (
        <CardFooter>
          <ProjectMemberActions
            member={member}
            isDisabled={isDisabled}
            onRemove={() => onRemove(member)}
            onResendInvite={() => onResendInvite(member)}
            layout="card"
          />
        </CardFooter>
      )}
    </Card>
  );
};
