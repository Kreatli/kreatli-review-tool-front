import { addToast, Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';

import { useSession } from '../../../hooks/useSession';
import { useDeleteProjectIdMemberMemberId, usePostProjectIdMember } from '../../../services/hooks';
import { getProjectId, getProjects } from '../../../services/services';
import { ProjectDto, ProjectMemberDto } from '../../../services/types';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { InviteProjectMemberForm } from './InviteProjectMemberForm';
import { ProjectMembersTable } from './ProjectMembersTable';

interface Props {
  project?: ProjectDto;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectMembersModal = ({ project, isOpen, onClose }: Props) => {
  const { mutate: deleteProjectMember, isPending: isRemoving } = useDeleteProjectIdMemberMemberId();
  const { mutate: resendInvitation, isPending: isResendingInvitation } = usePostProjectIdMember();

  const { user } = useSession();
  const isProjectOwner = project?.createdBy?.id === user?.id;
  const queryClient = useQueryClient();

  const handleRemove = (member: ProjectMemberDto) => {
    if (!project) {
      return;
    }

    deleteProjectMember(
      { id: project.id, memberId: member.id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [getProjects.key] });
          queryClient.invalidateQueries({ queryKey: [getProjectId.key, project.id] });
          addToast({ title: 'The member was removed', color: 'success', variant: 'flat' });
        },
        onError: (error) => {
          addToast({ title: getErrorMessage(error), color: 'danger', variant: 'flat' });
        },
      },
    );
  };

  const handleResetInvite = (member: ProjectMemberDto) => {
    if (!project) {
      return;
    }

    resendInvitation(
      { id: project.id, requestBody: { email: member.email, role: 'contributor' } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [getProjects.key] });
          queryClient.invalidateQueries({ queryKey: [getProjectId.key, project.id] });
          addToast({ title: 'The invitation was resent', color: 'success', variant: 'flat' });
        },
        onError: (error) => {
          addToast({ title: getErrorMessage(error), color: 'danger', variant: 'flat' });
        },
      },
    );
  };

  return (
    <Modal size="4xl" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Project members</ModalHeader>
        <ModalBody className="pb-6">
          {project && (
            <div className="flex flex-col gap-8">
              <ProjectMembersTable
                members={project.members}
                isEditable={isProjectOwner}
                isLoading={isRemoving || isResendingInvitation}
                onRemove={handleRemove}
                onResendInvite={handleResetInvite}
              />
              {isProjectOwner && <InviteProjectMemberForm project={project} onCancel={onClose} />}
            </div>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
