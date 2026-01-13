import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react';
import NextLink from 'next/link';

import { useSession } from '../../../hooks/useSession';

interface UpgradeModalProps {
  type: 'storage' | 'projects';
  isOpen: boolean;
  onClose: () => void;
}

const DESCRIPTION = {
  storage: "You don't have enough storage space. Please upgrade to a higher plan to continue.",
  projects: 'You have reached the projects limit of your current plan. Please upgrade to a higher plan to continue.',
};

export const UpgradeModal = ({ type, isOpen, onClose }: UpgradeModalProps) => {
  const { user } = useSession();

  if (user?.subscription.plan === 'team' && type === 'storage') {
    return (
      <Modal isOpen={isOpen} onOpenChange={onClose}>
        <ModalContent>
          <ModalHeader className="pb-0">Add more storage</ModalHeader>
          <ModalBody>
            <div className="text-sm text-foreground-500">
              You don't have enough storage space. You can add more by purchasing a storage add-on.
            </div>
          </ModalBody>
          <ModalFooter>
            <Button className="bg-foreground text-content1" onClick={onClose}>
              Subscription details
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader className="pb-0">Upgrade plan</ModalHeader>
        <ModalBody>
          <div className="text-sm text-foreground-500">{DESCRIPTION[type]}</div>
        </ModalBody>
        <ModalFooter>
          <Button className="bg-foreground text-content1" as={NextLink} href="/account/subscription">
            Subscription details
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
