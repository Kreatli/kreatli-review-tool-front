import { Button, Card, CardBody } from '@heroui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import { FreeToolsInactiveGateProvider, useFreeToolsInactiveGate } from '../../contexts/FreeToolsInactiveGateContext';
import {
  FreeToolSurface,
  getFreeToolSurface,
  isAvailableInKreatliPlatform,
} from '../../data/free-tool-surface';
import { useFreeToolsEntitlementGate } from '../../hooks/useFreeToolsEntitlementGate';

const DEFAULT_PLATFORM_LOCKED_DESCRIPTION =
  "You're signed in without an active trial or plan. Start a trial or choose a plan to use this tool here, or go to your workspace.";

const DEFAULT_BROWSER_LOCKED_DESCRIPTION =
  "Your trial or plan isn't active. Start a trial or choose a plan to use this tool on this page.";

function getLockedBannerCopy(
  pathname: string,
  lockedTitle?: string,
  lockedDescription?: string,
): { title?: string; description: string } {
  if (isAvailableInKreatliPlatform(pathname)) {
    return {
      title: lockedTitle,
      description: lockedDescription ?? DEFAULT_PLATFORM_LOCKED_DESCRIPTION,
    };
  }

  // Browser-only tools: drop misleading "inside Kreatli" headlines from page props.
  const title =
    lockedTitle && !/available inside Kreatli/i.test(lockedTitle) ? lockedTitle : undefined;
  const description =
    lockedDescription && !/in Kreatli/i.test(lockedDescription)
      ? lockedDescription
      : DEFAULT_BROWSER_LOCKED_DESCRIPTION;

  return { title, description };
}

/**
 * Soft non-blocking strip for browser marketing tools.
 * Shown above the tool UI; the tool itself remains fully interactive.
 * Needs to be inside FreeToolsInactiveGateProvider for openInactivePlanModal access.
 */
function BrowserToolSoftBanner() {
  const { openInactivePlanModal } = useFreeToolsInactiveGate();
  return (
    <Card className="border border-foreground-200 bg-content1/70 shadow-sm">
      <CardBody className="flex flex-col gap-2 p-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-foreground-600">
          Start a trial or choose a plan to save your exports from this page.
        </p>
        <Button
          size="sm"
          className="shrink-0 bg-foreground text-content1"
          onPress={() => openInactivePlanModal({ force: true })}
        >
          Start trial / choose plan
        </Button>
      </CardBody>
    </Card>
  );
}

/**
 * Renders the upgrade CTA inside the hard locked banner (platform previews).
 * Must be inside FreeToolsInactiveGateProvider.
 */
function LockedBannerUpgradeCta({
  label,
  surface,
  href,
}: {
  label: string;
  surface: FreeToolSurface | null;
  href: string;
}) {
  const { openInactivePlanModal } = useFreeToolsInactiveGate();

  if (surface === 'browser_marketing') {
    return (
      <Button size="sm" className="bg-foreground text-content1" onPress={() => openInactivePlanModal({ force: true })}>
        {label}
      </Button>
    );
  }

  return (
    <Button as={NextLink} href={href} size="sm" className="bg-foreground text-content1">
      {label}
    </Button>
  );
}

export function FreeToolsEntitlementSection(props: {
  children: ReactNode;
  lockedTitle?: string;
  lockedDescription?: string;
}) {
  const { children, lockedTitle, lockedDescription } = props;
  const gate = useFreeToolsEntitlementGate();
  const { pathname } = useRouter();
  const surface = getFreeToolSurface(pathname);

  if (gate.isLocked) {
    // Browser marketing tools: soft non-blocking strip — tool is fully interactive.
    if (surface === 'browser_marketing') {
      return (
        <FreeToolsInactiveGateProvider isInactiveLocked surface={surface}>
          <div className="space-y-3">
            <BrowserToolSoftBanner />
            {children}
          </div>
        </FreeToolsInactiveGateProvider>
      );
    }

    // Platform previews + others: hard locked banner (existing behaviour).
    const lockedCopy = getLockedBannerCopy(pathname, lockedTitle, lockedDescription);
    return (
      <FreeToolsInactiveGateProvider isInactiveLocked surface={surface}>
        <div className="space-y-3">
          <Card className="border border-foreground-200 bg-content1/70 shadow-sm">
            <CardBody className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-foreground-600">
                {lockedCopy.title ? (
                  <p className="mb-1 font-medium text-foreground">{lockedCopy.title}</p>
                ) : null}
                <p>{lockedCopy.description}</p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:shrink-0">
                {gate.upgradeCta ? (
                  <LockedBannerUpgradeCta label={gate.upgradeCta.label} surface={surface} href={gate.upgradeCta.href} />
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
              {surface === 'browser_marketing'
                ? 'Need review & feedback on your work? Upload it to Kreatli for frame-accurate comments, approvals, and team collaboration.'
                : "You're signed in. Keep using this tool here, or continue in your Kreatli workspace."}
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
