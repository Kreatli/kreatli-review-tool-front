import { addToast, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';

import { trackEvent } from '../../../lib/amplitude';
import { useDeleteUserSubscription } from '../../../services/hooks';
import { getUser } from '../../../services/services';
import { UserDto } from '../../../services/types';
import { getErrorMessage } from '../../../utils/getErrorMessage';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user: UserDto;
}

export const CancelSubscriptionModal = ({ isOpen, onClose, user }: Props) => {
  const queryClient = useQueryClient();
  const { mutate: cancelSubscription, isPending } = useDeleteUserSubscription();

  const handleCancelSubscription = () => {
    cancelSubscription(undefined, {
      onSuccess: (updatedUser: UserDto) => {
        trackEvent('subscription_cancelled', {
          plan_key: user.subscription.plan ?? '',
          plan_name: user.subscription.planName ?? '',
          price_usd: user.subscription.price,
        });
        addToast({ title: 'Subscription cancelled', color: 'success', variant: 'flat' });
        onClose();
        queryClient.setQueryData([getUser.key], updatedUser);
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
            <span>Cancel subscription</span>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
