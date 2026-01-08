import { addToast, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';

import { useDeleteUserAddonId } from '../../../services/hooks';
import { getUser } from '../../../services/services';
import { AddonDto, UserDto } from '../../../services/types';
import { getErrorMessage } from '../../../utils/getErrorMessage';

interface Props {
  addon: AddonDto | null; // TODO: remove null
  isOpen: boolean;
  onClose: () => void;
}

export const CancelAddonModal = ({ addon, isOpen, onClose }: Props) => {
  const queryClient = useQueryClient();
  const { mutate: cancelAddon, isPending } = useDeleteUserAddonId();

  const handleCancelAddon = () => {
    if (!addon) return;

    cancelAddon(
      { id: addon.id },
      {
        onSuccess: (user: UserDto) => {
          addToast({ title: 'Add-on cancelled', color: 'success', variant: 'flat' });
          onClose();
          queryClient.setQueryData([getUser.key], user);
        },
        onError: (error) => {
          addToast({ title: getErrorMessage(error), color: 'danger', variant: 'flat' });
        },
      },
    );
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader className="pb-0">Cancel add-on</ModalHeader>
        <ModalBody>
          <p>Are you sure you want to cancel this add-on? You will have less storage after this change.</p>
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onClick={onClose}>
            Cancel
          </Button>
          <Button color="danger" onClick={handleCancelAddon} isLoading={isPending}>
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
