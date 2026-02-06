import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';

import { useChatContext } from '../../../contexts/Chat';
import { useProjectContext } from '../../../contexts/Project';
import { useSession } from '../../../hooks/useSession';
import { usePostProjectIdChat } from '../../../services/hooks';
import { getProjectIdChats } from '../../../services/services';
import { ProjectMemberDto } from '../../../services/types';
import { ProjectMemberItem } from '../../project/ProjectMemberItem';
import { Icon } from '../../various/Icon';

interface Props {
  isDisabled?: boolean;
}

export const ChatConversationCreateButton = ({ isDisabled = false }: Props) => {
  const { user } = useSession();
  const { project } = useProjectContext();
  const queryClient = useQueryClient();
  const { mutate: createConversation } = usePostProjectIdChat();
  const router = useRouter();
  const { setSelectedConversationId } = useChatContext();

  const [isLoading, setIsLoading] = useState(false);

  const handleCreateConversation = (member: ProjectMemberDto) => () => {
    if (!member.user?.id || !user?.id) {
      return;
    }

    setIsLoading(true);

    createConversation(
      { id: project.id, requestBody: { members: [user.id, member.user.id] } },
      {
        onSuccess: async (data) => {
          await queryClient.invalidateQueries({ queryKey: [getProjectIdChats.key, project.id] });
          router.push(`/project/${project.id}/chat?conversationId=${data.id}`);
          setSelectedConversationId(data.id);
        },
        onSettled: () => {
          setIsLoading(false);
        },
      },
    );
  };

  const projectMembers = useMemo(() => {
    return project.members.filter((member) => member.user && member.status === 'joined' && member.user.id !== user?.id);
  }, [project.members, user]);

  return (
    <Dropdown placement="right-end">
      <DropdownTrigger>
        <Button
          className="absolute bottom-2 right-1 bg-foreground text-content1 md:right-2"
          isIconOnly
          isDisabled={isDisabled || projectMembers.length === 0}
          radius="full"
          isLoading={isLoading}
        >
          <Icon icon="edit" size={20} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant="flat" className="max-h-64 overflow-y-scroll">
        {projectMembers.map((member) => (
          <DropdownItem key={member.user?.id ?? member.id} onClick={handleCreateConversation(member)}>
            <ProjectMemberItem member={member} />
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};
