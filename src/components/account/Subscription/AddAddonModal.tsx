import { addToast, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, NumberInput } from '@heroui/react';
import { Icon } from '../../various/Icon';
import { AddonDto, UserDto } from '../../../services/types';
import { useEffect, useState } from 'react';
import { usePostUserAddon, usePutUserAddonId } from '../../../services/hooks';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { getUser } from '../../../services/services';
import { useQueryClient } from '@tanstack/react-query';
import { formatBytes } from '../../../utils/formatBytes';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AddAddonModal = ({ isOpen, onClose }: Props) => {
  const queryClient = useQueryClient();
  const [count, setCount] = useState(1);

  useEffect(() => {
    setCount(1);
  }, [isOpen]);

  const { mutate: addAddon, isPending } = usePostUserAddon();

  const handleAdd = () => {
    addAddon(
      {
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
        <ModalHeader>Buy storage add-on</ModalHeader>
        <ModalBody>
          <div className="mx-auto flex w-fit items-center gap-2">
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
          <div className="text-center text-sm text-foreground-500">
            {count} x 100GB for ${5 * count} monthly
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-foreground text-content1" onClick={handleAdd} isLoading={isPending}>
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
