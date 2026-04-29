import { Alert, Modal, ModalBody, ModalContent } from '@heroui/react';

import { UserDto } from '../../../services/types';
import { PlansForm } from './PlansForm';

interface Props {
  user: UserDto;
  isOpen: boolean;
  onClose: () => void;
}

export const PlansModal = ({ user, isOpen, onClose }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="5xl" scrollBehavior="inside" aria-label="Plans and pricing">
      <ModalContent>
        <ModalBody className="gap-3 py-4 md:gap-4 md:py-6">
          <h2 className="font-sans text-xl font-bold leading-tight md:text-2xl">
            {user.subscription.hasUsedTrial ? 'Select a plan' : 'Start your free trial to get started.'}
          </h2>
          {!user.subscription.hasUsedTrial && (
            <Alert
              color="primary"
              variant="flat"
              className="text-left"
              title={
                <span className="text-pretty font-sans text-sm font-semibold leading-snug md:text-lg">
                  You are NOT paying anything right now.
                </span>
              }
            >
              <p className="text-pretty text-sm leading-relaxed md:text-base">
                Your 7-day free trial starts now. You will not be charged during the trial period, and you can cancel
                anytime before day 7 to avoid any billing.
              </p>
            </Alert>
          )}
          <PlansForm user={user} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
