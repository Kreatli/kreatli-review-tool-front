import { Button, Modal, ModalBody, ModalContent } from '@heroui/react';
import React, { useEffect, useRef } from 'react';

import { usePlansModalVisibility } from '../../../hooks/usePlansModalVisibility';
import { trackEvent } from '../../../lib/amplitude';
import { UserDto } from '../../../services/types';
import { PlansForm } from './PlansForm';
import { TrialReassuranceAlert } from './TrialReassuranceAlert';

interface Props {
  user: UserDto;
  isOpen: boolean;
  onClose: () => void;
}

export const PlansModal = ({ user, isOpen, onClose }: Props) => {
  const plansModalEntry = usePlansModalVisibility((state) => state.plansModalEntry);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (isOpen && !wasOpenRef.current) {
      trackEvent('plans_modal_viewed', { entry: plansModalEntry });
    }
    wasOpenRef.current = isOpen;
  }, [isOpen, plansModalEntry]);

  if (user.subscription.plan === 'enterprise') {
    return (
      <Modal isOpen={isOpen} onClose={onClose} size="lg" scrollBehavior="inside" aria-label="Plans and pricing">
        <ModalContent>
          <ModalBody className="gap-3 py-4 md:gap-4 md:py-6">
            <h2 className="font-sans text-xl font-bold leading-tight md:text-2xl">You trial has ended.</h2>
            <p>Your trial has ended. Contact support team to continue using Kreatli.</p>
            <div className="mt-3 flex items-center justify-end gap-2">
              <Button variant="light" onClick={onClose}>
                Cancel
              </Button>
              <Button as="a" href="mailto:support@kreatli.com" className="bg-foreground text-content1">
                Contact support
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="5xl" scrollBehavior="inside" aria-label="Plans and pricing">
      <ModalContent>
        <ModalBody className="gap-3 py-4 md:gap-4 md:py-6">
          <h2 className="font-sans text-xl font-bold leading-tight md:text-2xl">
            {user.subscription.hasUsedTrial ? 'Select a plan' : 'Start your free trial — unlock everything.'}
          </h2>
          <TrialReassuranceAlert hasUsedTrial={user.subscription.hasUsedTrial} />
          <PlansForm user={user} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
