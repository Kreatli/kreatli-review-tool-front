import { Button, Card, CardBody } from '@heroui/react';
import NextLink from 'next/link';
import { ReactNode } from 'react';

import { FreeToolsInactiveGateProvider } from '../../contexts/FreeToolsInactiveGateContext';
import { useFreeToolsEntitlementGate } from '../../hooks/useFreeToolsEntitlementGate';

const DEFAULT_LOCKED_DESCRIPTION =
  "You're signed in without an active trial or plan. Start a trial or choose a plan to use this tool here, or go to your workspace.";

export function FreeToolsEntitlementSection(props: {
  children: ReactNode;
  lockedTitle?: string;
  lockedDescription?: string;
}) {
  const { children, lockedTitle, lockedDescription } = props;
  const gate = useFreeToolsEntitlementGate();

  if (gate.isLocked) {
    return (
      <FreeToolsInactiveGateProvider isInactiveLocked>
        <div className="space-y-3">
          <Card className="border border-foreground-200 bg-content1/70 shadow-sm">
            <CardBody className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-foreground-600">
                {lockedTitle ? <p className="mb-1 font-medium text-foreground">{lockedTitle}</p> : null}
                <p>{lockedDescription ?? DEFAULT_LOCKED_DESCRIPTION}</p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:shrink-0">
                {gate.upgradeCta ? (
                  <Button as={NextLink} href={gate.upgradeCta.href} size="sm" className="bg-foreground text-content1">
                    {gate.upgradeCta.label}
                  </Button>
                ) : null}
                {gate.continueCta ? (
                  <Button as={NextLink} href={gate.continueCta.href} size="sm" variant="bordered">
                    {gate.continueCta.label}
                  </Button>
                ) : null}
              </div>
            </CardBody>
          </Card>
          {children}
        </div>
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
            <div className="flex flex-col gap-2 sm:flex-row sm:shrink-0">
              <Button as={NextLink} href={gate.continueCta.href} size="sm" className="bg-foreground text-content1">
                {gate.continueCta.label}
              </Button>
              {gate.upgradeCta ? (
                <Button as={NextLink} href={gate.upgradeCta.href} size="sm" variant="bordered">
                  {gate.upgradeCta.label}
                </Button>
              ) : null}
            </div>
          </CardBody>
        </Card>
      )}
      {children}
    </div>
  );
}
