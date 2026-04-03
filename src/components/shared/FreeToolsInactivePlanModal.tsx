import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react';
import NextLink from 'next/link';

import { useFreeToolsEntitlementGate } from '../../hooks/useFreeToolsEntitlementGate';
import { useFreeToolsInactivePlanModalVisibility } from '../../hooks/useFreeToolsInactivePlanModalVisibility';

const DEFAULT_TITLE = 'This tool is available inside Kreatli';
const DEFAULT_DESCRIPTION =
  'Your trial or plan isn’t active. Start a trial or choose a plan to use this tool in Kreatli.';

export function FreeToolsInactivePlanModal({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
}: {
  title?: string;
  description?: string;
}) {
  const { isOpen, closeInactivePlanModal } = useFreeToolsInactivePlanModalVisibility();
  const gate = useFreeToolsEntitlementGate();

  if (!gate.isLocked) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={(open) => !open && closeInactivePlanModal()} aria-label={title}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 text-start">
          <span className="text-lg font-semibold">{title}</span>
        </ModalHeader>
        <ModalBody>
          <p className="text-sm text-foreground-500">{description}</p>
        </ModalBody>
        <ModalFooter className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          {gate.upgradeCta && (
            <Button as={NextLink} href={gate.upgradeCta.href} className="w-full bg-foreground text-content1 sm:w-auto">
              {gate.upgradeCta.label}
            </Button>
          )}
          {gate.continueCta && (
            <Button as={NextLink} href={gate.continueCta.href} variant="bordered" className="w-full sm:w-auto">
              {gate.continueCta.label}
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
