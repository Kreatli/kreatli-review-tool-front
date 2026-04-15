import { Button, cn } from '@heroui/react';
import NextLink from 'next/link';
import { useCallback, useState } from 'react';

import { Icon } from '../../various/Icon';
import { FeatureSelector } from './FeatureSelector';
import styles from './HeroSection.module.css';
import { WORKSPACE_FEATURES } from './workspaceFeatures';
import { WorkspacePreview } from './WorkspacePreview';

const VALUE_BULLETS: { lead: string; rest: string }[] = [
  {
    lead: 'One workspace, zero sprawl.',
    rest: 'Tasks, files, reviews, and conversations in one project.',
  },
  {
    lead: 'Feedback that actually sticks.',
    rest: 'Comments pinned to the exact frame with clear ownership.',
  },
  {
    lead: 'Built for production teams.',
    rest: 'Versioning, approvals, and delivery. Full video production cycle.',
  },
];

export const HeroSection = () => {
  const [activeKeys, setActiveKeys] = useState<Set<string>>(
    () => new Set(WORKSPACE_FEATURES.filter((f) => f.defaultActive).map((f) => f.key)),
  );
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleToggle = useCallback((key: string) => {
    setHasInteracted(true);
    setActiveKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }, []);

  return (
    <section className="relative -mt-16 flex min-h-dvh w-full flex-col overflow-hidden pt-16">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.16),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(236,72,153,0.14),_transparent_55%)]" />

      <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(340px,0.9fr)_minmax(0,1.1fr)] lg:gap-12 xl:grid-cols-[minmax(380px,0.85fr)_minmax(0,1.15fr)] xl:gap-16">
          {/* Left: copy, CTA, feature pills */}
          <div className="flex max-w-xl flex-col gap-6 lg:max-w-none lg:pt-2">
            <h1 className="font-sans text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl sm:leading-tight lg:text-[2.75rem] lg:leading-[1.1]">
              Brief to delivery. One platform.{' '}
              <span
                className={cn(
                  'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent',
                  styles.animateGradient,
                )}
              >
                Zero Chaos.
              </span>
            </h1>
            <p className="max-w-xl text-base font-medium leading-relaxed text-foreground-600 sm:text-lg">
              Video collaboration and review platform for creative teams
            </p>

            <ul className="flex flex-col gap-3.5">
              {VALUE_BULLETS.map((item) => (
                <li key={item.lead} className="flex gap-3 text-sm leading-relaxed text-foreground-600 sm:text-base">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Icon icon="check" size={12} />
                  </span>
                  <span suppressHydrationWarning>
                    <strong className="font-semibold text-foreground">{item.lead}</strong> {item.rest}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
                <Button
                  as={NextLink}
                  href="/sign-up"
                  size="lg"
                  className="h-12 min-w-[200px] bg-foreground px-6 text-base text-content1"
                >
                  Try free for 7 days
                  <Icon icon="arrowRight" size={20} />
                </Button>
                <Button
                  as="a"
                  href="https://calendar.app.google/NXbAeTAUwaBGh5x49"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  size="lg"
                  variant="bordered"
                  className="h-12 min-w-[200px] px-6 text-base"
                >
                  <Icon icon="calendar" size={18} />
                  See Kreatli in action
                </Button>
              </div>
            </div>
            <FeatureSelector features={WORKSPACE_FEATURES} activeKeys={activeKeys} onToggle={handleToggle} />
            {hasInteracted ? (
              <div className="pt-2">
                <Button
                  as={NextLink}
                  href="/sign-up"
                  size="sm"
                  className={cn(
                    'rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-4 text-content1',
                    'transition-transform hover:scale-[1.02] active:scale-[0.98]',
                  )}
                >
                  Continue with your setup
                  <Icon icon="arrowRight" size={14} />
                </Button>
              </div>
            ) : null}
          </div>

          {/* Right: workspace mockup */}
          <div className="relative min-h-0 w-full lg:sticky lg:top-20 lg:self-start">
            <WorkspacePreview features={WORKSPACE_FEATURES} activeKeys={activeKeys} />
          </div>
        </div>
      </div>
    </section>
  );
};
