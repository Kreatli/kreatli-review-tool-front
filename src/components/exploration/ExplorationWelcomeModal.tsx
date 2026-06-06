import { Button, Modal, ModalBody, ModalContent } from '@heroui/react';
import NextLink from 'next/link';
import React from 'react';

import { usePlansModalVisibility } from '../../hooks/usePlansModalVisibility';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useSession } from '../../hooks/useSession';
import { Icon } from '../various/Icon';

const LIMITS = [
  { label: 'Projects', max: 1 },
  { label: 'Files', max: 2 },
  { label: 'Collaborators', max: 3 },
  { label: 'Storage', max: '300 MB' },
];

export const ExplorationWelcomeModal = () => {
  const { isSignedIn, user } = useSession();
  const setIsPlansModalVisible = usePlansModalVisibility((state) => state.setIsVisible);

  const [hasShown, setHasShown] = useLocalStorage<boolean>({
    key: 'explorationWelcomeShown',
    defaultValue: false,
    asJson: true,
  });

  const isExploreMode =
    isSignedIn &&
    user &&
    !user.subscription.isActive &&
    !user.subscription.hasUsedTrial &&
    !user.subscription.isAppSumo;

  const isOpen = !!isExploreMode && !hasShown;

  const handleClose = () => {
    setHasShown(true);
  };

  const handleStartTrial = () => {
    setHasShown(true);
    setIsPlansModalVisible(true, 'explore_welcome_modal');
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="lg"
      scrollBehavior="inside"
      aria-label="Welcome to Exploration Mode"
    >
      <ModalContent>
        <ModalBody className="gap-5 py-6 md:gap-6 md:py-8">
          <div>
            <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-primary">
              Exploration Mode
            </div>
            <h2 className="font-sans text-2xl font-bold leading-tight">
              Welcome to Kreatli — you're in free.
            </h2>
            <p className="mt-2 text-base text-foreground-500">
              Your account is active with limited access. No credit card needed to explore. Start a
              7-day free trial whenever you're ready for full access.
            </p>
          </div>

          {/* Limits grid */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {LIMITS.map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center gap-1 rounded-xl border border-foreground-100 bg-foreground-50 px-3 py-4 text-center"
              >
                <span className="font-sans text-2xl font-bold text-foreground">{item.max}</span>
                <span className="text-xs text-foreground-500">{item.label}</span>
              </div>
            ))}
          </div>

          {/* What you can do */}
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold text-foreground">What you can do right now:</p>
            <ul className="space-y-1.5">
              {[
                'Create 1 project and upload up to 2 files',
                'Invite up to 3 collaborators',
                'Leave frame-accurate comments and annotations',
                'Share review links — no account needed for recipients',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-foreground-600">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Icon icon="check" size={10} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              as={NextLink}
              href="/"
              size="lg"
              className="bg-foreground text-content1"
              onPress={handleClose}
            >
              Create my first project
              <Icon icon="arrowRight" size={16} />
            </Button>
            <Button size="lg" variant="bordered" onPress={handleStartTrial}>
              Start 7-day free trial
            </Button>
          </div>

          <p className="text-center text-xs text-foreground-400">
            Free trial requires a payment method at checkout · $0 until trial ends · Cancel anytime
          </p>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
