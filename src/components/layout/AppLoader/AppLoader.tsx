import { cn, Spinner } from '@heroui/react';
import React, { useEffect } from 'react';

import LogoIcon from '../../../assets/images/logo.svg';
import { useAppLoader } from '../../../hooks/useAppLoader';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { FileUpload, useProjectUploads } from '../../../hooks/useProjectUploads';
import { Layout } from '../../../typings/layout';

interface Props {
  children: React.ReactNode;
}

export const AppLoader = ({ children }: Props) => {
  const isLoading = useAppLoader((state) => state.isLoading);
  const isUploading = useProjectUploads((state) =>
    state.uploads.some((fileUpload) => fileUpload.progress < 100 && !fileUpload.isError),
  );

  const [theme] = useLocalStorage<Layout.Theme>({ key: 'theme', defaultValue: 'light' });

  const setFileUploads = useProjectUploads((state) => state.setFileUploads);

  useEffect(() => {
    const uploadsFromLocalStorage = JSON.parse(localStorage.getItem('uploads') ?? '[]') as FileUpload[];

    setFileUploads(uploadsFromLocalStorage.map((upload) => ({ ...upload, progress: 100, isError: true })));
  }, []);

  React.useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');

      return;
    }

    document.documentElement.classList.remove('dark');
  }, [theme]);

  React.useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isUploading) {
        event.preventDefault();
        // For most browsers, you must set returnValue
        event.returnValue = 'You have an upload in progress. Are you sure you want to leave?';
        return event.returnValue;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isUploading]);

  return (
    <>
      {children}
      <div
        className={cn(
          'fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-background delay-200 transition-transform-opacity',
          {
            'pointer-events-none scale-125 opacity-0': !isLoading,
          },
        )}
        aria-hidden={!isLoading}
      >
        <LogoIcon className="pointer-events-none h-auto w-40" viewBox="0 0 90 22" />
        <Spinner size="lg" color="current" className="text-foreground" />
      </div>
    </>
  );
};
