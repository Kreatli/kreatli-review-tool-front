import { Avatar, Chip, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';

import { ProjectMemberDto } from '../../../../services/types';
import { formatFullDate } from '../../../../utils/dates';
import { useIsBreakpoint } from '../../../tiptap/hooks/use-is-breakpoint';
import { ProjectMemberActions } from './ProjectMemberActions';
import { ProjectMemberCard } from './ProjectMemberCard';

interface Props {
  members: ProjectMemberDto[];
  isLoading?: boolean;
  isEditable?: boolean;
  onRemove: (member: ProjectMemberDto) => void;
  onResendInvite: (member: ProjectMemberDto) => void;
}

const STATUS_COLORS = {
  invited: 'warning',
  joined: 'success',
  left: 'danger',
  removed: 'danger',
} as const;

export const ProjectMembersTable = ({ members, isLoading, isEditable = false, onRemove, onResendInvite }: Props) => {
  const isMobile = useIsBreakpoint('max', 768);

  if (isMobile) {
    return (
      <div className="flex flex-col gap-2">
        {members.map((member) => (
          <ProjectMemberCard
            key={member.id}
            member={member}
            isEditable={isEditable}
            isDisabled={isLoading}
            onRemove={onRemove}
            onResendInvite={onResendInvite}
          />
        ))}
      </div>
    );
  }

  return (
    <Table removeWrapper>
      <TableHeader>
        <TableColumn>Name</TableColumn>
        <TableColumn>Invitation date</TableColumn>
        <TableColumn>Status</TableColumn>
        <TableColumn align="end" width="1">
          {isLoading && <Spinner size="sm" color="current" />}
        </TableColumn>
      </TableHeader>
      <TableBody>
        {members.map((member) => (
          <TableRow key={member.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar
                  src={member.user?.avatar?.url}
                  getInitials={(name) => name.charAt(0).toUpperCase()}
                  name={member.user?.name ?? member.email}
                />
                <div className="flex flex-col">
                  <div className="text-medium font-semibold">{member.user?.name}</div>
                  <div className="text-foreground-500">{member.email}</div>
                </div>
              </div>
            </TableCell>
            <TableCell>{formatFullDate(member.invitedAt)}</TableCell>
            <TableCell>
              <Chip color={STATUS_COLORS[member.status]} variant="flat">
                {member.status}
              </Chip>
            </TableCell>
            <TableCell>
              {isEditable && (
                <ProjectMemberActions
                  member={member}
                  isDisabled={isLoading}
                  onResendInvite={() => onResendInvite(member)}
                  onRemove={() => onRemove(member)}
                />
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
