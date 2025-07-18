import { PropsWithChildren, useRef, useEffect, useState } from 'react';
import { Icon, IconType } from '../../various/Icon';

interface Props {
  icon: IconType;
  title: string;
  description: string;
}

export const Feature = ({ icon, title, description, children }: PropsWithChildren<Props>) => {
  const featureRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={featureRef} className="flex items-center">
      <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] w-full items-start gap-8">
        <div className="flex flex-col items-start gap-4 sticky top-24">
          <div className="border border-foreground-300 rounded-full p-2">
            <Icon icon={icon} className="text-foreground-500" />
          </div>
          <h3 className="text-2xl font-bold font-sans">{title}</h3>
          <p className="text-md text-foreground-500">{description}</p>
        </div>
        {children}
      </div>
    </div>
  );
};
