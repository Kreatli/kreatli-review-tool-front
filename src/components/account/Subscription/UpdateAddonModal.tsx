import { addToast, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, NumberInput } from '@heroui/react';
import { Icon } from '../../various/Icon';
import { AddonDto, UserDto } from '../../../services/types';
import { useEffect, useState } from 'react';
import { usePutUserAddonId } from '../../../services/hooks';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { getUser } from '../../../services/services';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
  addon: AddonDto | null;
  isOpen: boolean;
  onClose: () => void;
}

export const UpdateAddonModal = ({ addon, isOpen, onClose }: Props) => {
  const queryClient = useQueryClient();
  const [count, setCount] = useState(addon?.count ?? 1);

  useEffect(() => {
    setCount(addon?.count ?? 1);
  }, [isOpen]);

  const { mutate: updateAddon, isPending } = usePutUserAddonId();

  const handleUpdate = () => {
    if (!addon?.id) return;

    updateAddon(
      {
        id: addon.id,
        requestBody: {
          count,
        },
      },
      {
        onSuccess: (user: UserDto) => {
          addToast({ title: 'Add-on updated', color: 'success', variant: 'flat' });
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
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Update storage add-on</ModalHeader>
        <ModalBody>
          <div className="flex items-center w-fit mx-auto gap-2">
            <Button
              isIconOnly
              radius="full"
              isDisabled={count === 1}
              variant="faded"
              onClick={() => setCount(count - 1)}
            >
              <Icon icon="minus" size={18} />
            </Button>
            <NumberInput
              hideStepper
              size="sm"
              minValue={1}
              classNames={{ input: 'text-center' }}
              className="w-16"
              value={count}
              onValueChange={(value) => setCount(value || 1)}
            />
            <Button isIconOnly radius="full" variant="faded" onClick={() => setCount(count + 1)}>
              <Icon icon="plus" size={18} />
            </Button>
          </div>
          <div className="text-foreground-500 text-sm text-center">
            {count} x 100GB for ${(addon?.price ?? 0) * count} monthly
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-foreground text-content1" onClick={handleUpdate} isLoading={isPending}>
            Update
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
