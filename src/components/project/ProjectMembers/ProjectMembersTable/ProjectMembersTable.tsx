import { Avatar, Chip, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';

import { ProjectMemberDto } from '../../../../services/types';
import { formatFullDate } from '../../../../utils/dates';
import { getProjectMemberLetter } from '../../../../utils/shortNames';
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
        <TableColumn width="1"> </TableColumn>
        <TableColumn>NAME</TableColumn>
        <TableColumn>INVITATION DATE</TableColumn>
        <TableColumn>STATUS</TableColumn>
        <TableColumn align="end" width="1">
          {isLoading && <Spinner size="sm" color="current" />}
        </TableColumn>
      </TableHeader>
      <TableBody>
        {members.map((member) => (
          <TableRow key={member.id}>
            <TableCell>
              <Avatar
                src={member.user?.avatar?.url}
                size="sm"
                isBordered
                fallback={
                  <div className="select-none text-lg text-foreground-500">{getProjectMemberLetter(member)}</div>
                }
              />
            </TableCell>
            <TableCell>
              <div className="text-medium font-semibold">{member.user?.name}</div>
              <div className="text-foreground-500">{member.email}</div>
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
