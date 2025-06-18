import { addToast, Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react';
import { ChatDto } from '../../../services/types';
import { useForm } from 'react-hook-form';
import { VALIDATION_RULES } from '../../../constants/validationRules';
import { useEffect } from 'react';
import { usePutConversationId } from '../../../services/hooks';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { useQueryClient } from '@tanstack/react-query';
import { getProjectIdChats } from '../../../services/services';
import { useChatContext } from '../../../contexts/Chat';

interface FormData {
  name: string;
}

interface Props {
  isVisible: boolean;
  chat: ChatDto;
  onClose: () => void;
}

export const ChatConversationRenameModal = ({ chat, isVisible, onClose }: Props) => {
  const { project } = useChatContext();
  const { setSelectedConversation } = useChatContext();
  const queryClient = useQueryClient();

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      name: chat.name,
    },
  });

  const { mutate: updateChat, isPending } = usePutConversationId();

  useEffect(() => {
    if (isVisible) {
      reset({ name: chat.name });
    }
  }, [isVisible]);

  const onSubmit = (data: FormData) => {
    updateChat(
      { id: chat.id, requestBody: { name: data.name } },
      {
        onSuccess: (data) => {
          setSelectedConversation(data);
          queryClient.invalidateQueries({ queryKey: [getProjectIdChats.key, project.id] });
          addToast({
            title: 'Chat name updated',
            color: 'success',
            variant: 'flat',
          });
          onClose();
        },
        onError: (error) => {
          addToast({
            title: getErrorMessage(error),
            color: 'danger',
            variant: 'flat',
          });
        },
      },
    );
  };

  return (
    <Modal isOpen={isVisible} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Rename project chat</ModalHeader>
        <ModalBody>
          <form id="rename-chat-form" noValidate onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Project chat name"
              placeholder="Name"
              variant="faded"
              isInvalid={!!errors.name}
              errorMessage={errors.name?.message}
              {...register('name', VALIDATION_RULES.VERY_SHORT_TEXT)}
            />
          </form>
        </ModalBody>
        <ModalFooter>
          <Button variant="light" isDisabled={isPending} onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isPending} form="rename-chat-form" className="bg-foreground text-content1">
            Save changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
