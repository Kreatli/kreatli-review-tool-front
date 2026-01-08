import { addToast, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';

import { useSession } from '../../../hooks/useSession';
import { useDeleteUserSubscription } from '../../../services/hooks';
import { getUser } from '../../../services/services';
import { UserDto } from '../../../services/types';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { Icon } from '../../various/Icon';

const MAX_USERS_ON_FREE_PLAN = 2;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const CancelSubscriptionModal = ({ isOpen, onClose }: Props) => {
  const queryClient = useQueryClient();
  const { mutate: cancelSubscription, isPending } = useDeleteUserSubscription();

  const { user } = useSession();

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

  if (user?.subscription.limits.usersCount.used && user.subscription.limits.usersCount.used > MAX_USERS_ON_FREE_PLAN) {
    return (
      <Modal isOpen={isOpen} onOpenChange={onClose}>
        <ModalContent>
          <ModalHeader className="flex items-center gap-2 pb-0">
            <Icon icon="warning" size={24} className="text-warning" />
            Before you cancel your subscription
          </ModalHeader>
          <ModalBody>
            <p>
              You have {user.subscription.limits.usersCount.used} users invited to your projects. You can only have{' '}
              {MAX_USERS_ON_FREE_PLAN} users on the free plan. Remove them from your projects before canceling
              subscription.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button className="bg-foreground text-content1" onClick={onClose}>
              Got it
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader className="pb-0">Cancel subscription</ModalHeader>
        <ModalBody>
          <p>
            Are you sure you want to cancel your subscription? You won't be able to use currently available resources.
          </p>
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
