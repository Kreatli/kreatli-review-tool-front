import { Button, cn } from '@heroui/react';
import NextLink from 'next/link';
import { ReactNode } from 'react';

import { useSession } from '../../hooks/useSession';

const DEMO_HREF = 'https://calendar.app.google/NXbAeTAUwaBGh5x49';

function WorkspaceButton({
  variant,
  onExploreClick,
}: {
  variant: 'solid' | 'bordered';
  onExploreClick?: () => void;
}) {
  const { isSignedIn, user } = useSession();
  const isSolid = variant === 'solid';

  if (isSignedIn) {
    const isActive = user?.subscription.isActive;
    const isExploreMode = !isActive && !user?.subscription.hasUsedTrial;

    return (
      <Button
        as={NextLink}
        href="/"
        size="lg"
        variant={isSolid ? undefined : 'bordered'}
        className={isSolid ? 'bg-foreground text-content1' : undefined}
      >
        {isActive ? 'Open in Kreatli' : isExploreMode ? 'Continue in workspace' : 'Upgrade to restore access'}
      </Button>
    );
  }

  return (
    <Button
      as={NextLink}
      href="/sign-up"
      size="lg"
      variant={isSolid ? undefined : 'bordered'}
      className={isSolid ? 'bg-foreground text-content1' : undefined}
      onPress={onExploreClick}
    >
      Explore free — no card required
    </Button>
  );
}

export function HeroCtaButtons({
  className,
  leading,
  trailing,
  onExploreClick,
}: {
  className?: string;
  /** Optional first button (e.g. link to a free tool). Auth CTA renders as bordered when set. */
  leading?: ReactNode;
  /** Optional second button after auth CTA (e.g. link to a related free tool). */
  trailing?: ReactNode;
  onExploreClick?: () => void;
}) {
  const { isSignedIn, user } = useSession();
  const isExpired = isSignedIn && !user?.subscription.isActive && !!user?.subscription.hasUsedTrial;
  const authVariant = leading ? 'bordered' : 'solid';

  return (
    <div className={cn('mt-4 flex flex-col items-center justify-center gap-4 sm:flex-row', className)}>
      {leading}
      <WorkspaceButton variant={authVariant} onExploreClick={onExploreClick} />
      {trailing}
      {!leading && !trailing && !isSignedIn && (
        <Button
          as="a"
          href={DEMO_HREF}
          target="_blank"
          rel="noopener noreferrer nofollow"
          size="lg"
          variant="bordered"
        >
          Book a Demo
        </Button>
      )}
      {!leading && !trailing && isExpired && (
        <Button
          as="a"
          href={DEMO_HREF}
          target="_blank"
          rel="noopener noreferrer nofollow"
          size="lg"
          variant="bordered"
        >
          Book a Demo
        </Button>
      )}
    </div>
  );
}
