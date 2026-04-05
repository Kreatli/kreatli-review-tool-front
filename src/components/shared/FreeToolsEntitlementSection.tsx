import { Button, Card, CardBody } from '@heroui/react';
import NextLink from 'next/link';
import { ReactNode } from 'react';

import { FreeToolsInactiveGateProvider } from '../../contexts/FreeToolsInactiveGateContext';
import { useFreeToolsEntitlementGate } from '../../hooks/useFreeToolsEntitlementGate';

export function FreeToolsEntitlementSection(props: {
  children: ReactNode;
  lockedTitle?: string;
  lockedDescription?: string;
}) {
  const { children } = props;
  const gate = useFreeToolsEntitlementGate();

  if (gate.isLocked) {
    return (
      <FreeToolsInactiveGateProvider isInactiveLocked>
        <div className="space-y-3">{children}</div>
      </FreeToolsInactiveGateProvider>
    );
  }

  return (
    <div className="space-y-3">
      {gate.continueCta && (
        <Card className="border border-foreground-200 bg-content1/70 shadow-sm">
          <CardBody className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-foreground-600">
              You’re signed in. Keep using this tool here, or continue in your Kreatli workspace.
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button as={NextLink} href={gate.continueCta.href} size="sm" className="bg-foreground text-content1">
                {gate.continueCta.label}
              </Button>
            </div>
          </CardBody>
        </Card>
      )}
      {children}
    </div>
  );
}

