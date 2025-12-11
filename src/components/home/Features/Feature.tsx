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
          'grid grid-cols-1 lg:grid-cols-[350px_1fr] w-full items-start gap-8',
          isReversed && 'lg:grid-cols-[1fr_350px]',
        )}
      >
        <div className={cn('flex flex-col items-start gap-4 sticky top-24', isReversed && 'lg:order-2')}>
          <div className="border border-foreground-300 rounded-full p-2">
            <Icon icon={icon} className="text-foreground-500" />
          </div>
          <h3 className="text-2xl font-bold font-sans">{title}</h3>
          <p className="text-md text-foreground-500">{description}</p>
        </div>
        <div className={cn(isReversed && 'lg:order-1')}>{children}</div>
      </div>
    </div>
  );
};
