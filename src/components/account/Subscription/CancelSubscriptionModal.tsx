import { addToast, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';

import { useDeleteUserSubscription } from '../../../services/hooks';
import { getUser } from '../../../services/services';
import { UserDto } from '../../../services/types';
import { getErrorMessage } from '../../../utils/getErrorMessage';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const CancelSubscriptionModal = ({ isOpen, onClose }: Props) => {
  const queryClient = useQueryClient();
  const { mutate: cancelSubscription, isPending } = useDeleteUserSubscription();

  const handleCancelSubscription = () => {
    cancelSubscription(undefined, {
      onSuccess: (user: UserDto) => {
        addToast({ title: 'Subscription cancelled', color: 'success', variant: 'flat' });
        onClose();
        queryClient.setQueryData([getUser.key], user);
      },
      onError: (error) => {
        addToast({ title: getErrorMessage(error), color: 'danger', variant: 'flat' });
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader className="pb-0">Cancel subscription</ModalHeader>
        <ModalBody>
          <p>Are you sure you want to cancel your subscription? You won't be able to access your projects.</p>
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onClick={onClose}>
            Stay on current plan
          </Button>
          <Button color="danger" onClick={handleCancelSubscription} isLoading={isPending}>
            Cancel subscription
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
