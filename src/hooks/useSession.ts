import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React from 'react';

import { getAxiosInstance } from '../services/config';
import { useGetUser } from '../services/hooks';
import { getUser } from '../services/services';
import { getHasToken } from '../utils/token';
import { useAppLoader } from './useAppLoader';
import { useProjectUploads } from './useProjectUploads';

export const useSession = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const hasToken = getHasToken();

  const setIsLoading = useAppLoader((state) => state.setIsLoading);
  const resetProjectUploads = useProjectUploads((state) => state.reset);

  const { data, isLoading, isError } = useGetUser({
    enabled: hasToken,
    refetchOnMount: false,
  });

  React.useEffect(() => {
    if (!hasToken) {
      setIsLoading(false);
    }
  }, [hasToken, setIsLoading]);

  React.useEffect(() => {
    if (data && !isLoading) {
      setIsLoading(false);
    }
  }, [data, isLoading, setIsLoading]);

  React.useEffect(() => {
    if (isError) {
      localStorage.removeItem('token');
      setIsLoading(false);
    }
  }, [isError, setIsLoading]);

  const signOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('failedFileUploads');
    getAxiosInstance(undefined).defaults.headers.Authorization = null;
    queryClient.resetQueries({ queryKey: [getUser.key] });
    resetProjectUploads();
    router.push('/');
  };

  return {
    isSignedIn: !!data,
    isLoading,
    signOut,
    user: data,
  };
};
