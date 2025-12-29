import { PropsWithChildren, useRef, useEffect, useState } from 'react';
import { Icon, IconType } from '../../various/Icon';
import { cn } from '@heroui/react';

interface Props {
  icon: IconType;
  title: string;
  description: string;
  isReversed?: boolean;
}

export const Feature = ({ icon, title, description, children, isReversed = false }: PropsWithChildren<Props>) => {
  const featureRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={featureRef} className="flex items-center">
      <div
        className={cn(
          'grid w-full grid-cols-1 items-start gap-8 lg:grid-cols-[350px_1fr]',
          isReversed && 'lg:grid-cols-[1fr_350px]',
        )}
      >
        <div className={cn('sticky top-24 flex flex-col items-start gap-4', isReversed && 'lg:order-2')}>
          <div className="rounded-full border border-foreground-300 p-2">
            <Icon icon={icon} className="text-foreground-500" />
          </div>
          <h3 className="font-sans text-2xl font-bold">{title}</h3>
          <p className="text-md text-foreground-500">{description}</p>
        </div>
        <div className={cn(isReversed && 'lg:order-1')}>{children}</div>
      </div>
    </div>
  );
};
