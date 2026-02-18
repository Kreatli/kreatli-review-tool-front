import { addToast, Button } from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';
import Head from 'next/head';
import React from 'react';

import { ProjectLayout } from '../../../components/project/Project';
import { ProjectMembersModal } from '../../../components/project/ProjectMembers';
import { ProjectMembersTable } from '../../../components/project/ProjectMembers/ProjectMembersTable';
import { Icon } from '../../../components/various/Icon';
import { useProjectContext } from '../../../contexts/Project';
import { useSession } from '../../../hooks/useSession';
import { useDeleteProjectIdMemberMemberId, usePostProjectIdMember } from '../../../services/hooks';
import { getProjectId, getProjects, getUser } from '../../../services/services';
import { ProjectMemberDto } from '../../../services/types';
import { getErrorMessage } from '../../../utils/getErrorMessage';

export default function Members() {
  const { user } = useSession();

  const [isMembersModalOpen, setIsMembersModalOpen] = React.useState(false);

  const { project } = useProjectContext();
  const { mutate: deleteProjectMember, isPending: isRemoving } = useDeleteProjectIdMemberMemberId();
  const { mutate: resendInvitation, isPending: isResendingInvitation } = usePostProjectIdMember();
  const queryClient = useQueryClient();

  const isProjectOwner = project?.createdBy?.id === user?.id;

  const openMembersModal = () => {
    setIsMembersModalOpen(true);
  };

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
          queryClient.invalidateQueries({ queryKey: [getUser.key] });
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
    <>
      <Head>
        <title>Kreatli | Project members</title>
      </Head>
      <div className="flex flex-col gap-2 p-3 xs:px-4">
        <div className="flex items-start justify-between gap-2">
          <h2 className="text-2xl font-semibold">Members ({project.members.length})</h2>
          {isProjectOwner && (
            <Button
              size="md"
              className="bg-foreground text-content1"
              startContent={<Icon icon="userPlus" size={16} />}
              onClick={openMembersModal}
            >
              Invite member
            </Button>
          )}
        </div>
        <ProjectMembersTable
          members={project.members}
          isEditable={isProjectOwner}
          isLoading={isRemoving || isResendingInvitation}
          onRemove={handleRemove}
          onResendInvite={handleResetInvite}
        />
        <ProjectMembersModal
          project={project}
          isOpen={isMembersModalOpen}
          onClose={() => setIsMembersModalOpen(false)}
        />
      </div>
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
Members.getLayout = (page: any) => <ProjectLayout>{page}</ProjectLayout>;
