import { addToast, Avatar, cn, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Selection } from '@heroui/react';
import React from 'react';

import { trackEvent } from '../../../../lib/amplitude';
import { usePutProjectIdFileFileId } from '../../../../services/hooks';
import { AssetDto, ProjectFileDto, ProjectMemberDto } from '../../../../services/types';
import { updateProjectFile } from '../../../../services/utils';
import { getErrorMessage } from '../../../../utils/getErrorMessage';
import { getProjectMemberLetter } from '../../../../utils/shortNames';
import { Icon } from '../../../various/Icon';
import { ProjectMemberItem } from '../../ProjectMemberItem';

interface Props {
  projectId: string;
  file: ProjectFileDto | AssetDto;
  members: ProjectMemberDto[];
  isDisabled?: boolean;
  className?: string;
  size?: 'sm' | 'xs';
}

export const ProjectFileAssignee = ({ projectId, file, members, isDisabled, className, size = 'sm' }: Props) => {
  const [assigneeId, setAssigneeId] = React.useState<string | null>(file.assignee?.id ?? null);

  const { assignee } = file;

  const { mutate } = usePutProjectIdFileFileId();

  React.useEffect(() => {
    setAssigneeId(assignee?.id ?? null);
  }, [assignee]);

  const handleSelectionChange = (keys: Selection) => {
    if (keys !== 'all') {
      const newAssigneeId = keys.values().next().value ?? null;

      trackEvent('assign_member_click');

      setAssigneeId(newAssigneeId as string | null);
      mutate(
        {
          id: projectId,
          fileId: file.id,
          requestBody: { assigneeId: newAssigneeId as string | undefined },
        },
        {
          onSuccess: ({ file: updatedFile }) => {
            if (updatedFile) {
              updateProjectFile(projectId, updatedFile);
            }

            trackEvent('assign_member_success');
          },
          onError: (error) => {
            addToast({ title: getErrorMessage(error), color: 'danger', variant: 'flat' });
            trackEvent('assign_member_failure');
          },
        },
      );
    }
  };

  const selectedMember = members.find((member) => member.user?.id === assigneeId);

  return (
    <Dropdown placement="bottom-start" offset={10}>
      <DropdownTrigger>
        <Avatar
          as="button"
          src={selectedMember?.user?.avatar?.url ?? ''}
          size="sm"
          isBordered={size !== 'xs'}
          isDisabled={isDisabled}
          className={cn('shrink-0', { 'size-7 border border-foreground-300': size === 'xs' }, className)}
          fallback={
            selectedMember ? (
              <div className={cn('select-none text-lg text-foreground-500', { 'text-md': size === 'xs' })}>
                {getProjectMemberLetter(selectedMember)}
              </div>
            ) : (
              <Icon icon="user" size={size === 'xs' ? 14 : 16} />
            )
          }
        />
      </DropdownTrigger>
      <DropdownMenu
        variant="flat"
        className="max-h-64 overflow-y-scroll"
        selectionMode="single"
        selectedKeys={assigneeId ? [assigneeId] : []}
        onSelectionChange={handleSelectionChange}
      >
        {members
          .filter((member) => member.user)
          .filter((member) => member.status === 'joined')
          .map((member) => (
            <DropdownItem key={member.user?.id ?? member.id}>
              <ProjectMemberItem member={member} />
            </DropdownItem>
          ))}
      </DropdownMenu>
    </Dropdown>
  );
};
