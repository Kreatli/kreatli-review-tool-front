import { cn, Spinner } from '@heroui/react';
import React from 'react';

import LogoIcon from '../../../assets/images/logo.svg';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { useAppLoader } from '../../../hooks/useAppLoader';
import { Layout } from '../../../typings/layout';

interface Props {
  children: React.ReactNode;
}

export const AppLoader = ({ children }: Props) => {
  const isLoading = useAppLoader((state) => state.isLoading);

  const [theme] = useLocalStorage<Layout.Theme>({ key: 'theme', defaultValue: 'light' });

  React.useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');

      return;
    }

    document.documentElement.classList.remove('dark');
  }, [theme]);

  return (
    <>
      {children}
      <div
        className={cn(
          'fixed inset-0 transition-transform-opacity delay-200 bg-background z-50 flex items-center justify-center gap-4 flex-col',
          {
            'opacity-0 scale-125 pointer-events-none': !isLoading,
          },
        )}
        aria-hidden={!isLoading}
      >
        <LogoIcon className="w-40 h-auto pointer-events-none" viewBox="0 0 90 22" />
        <Spinner size="lg" color="secondary" className="" />
      </div>
    </>
  );
};
