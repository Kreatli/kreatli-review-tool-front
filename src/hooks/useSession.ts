import React from 'react';

import { useGetUser } from '../services/hooks';
import { getHasToken } from '../utils/token';
import { useAppLoader } from './useAppLoader';

export const useSession = () => {
  const hasToken = getHasToken();

  const setIsLoading = useAppLoader((state) => state.setIsLoading);

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
    window.location.href = '/sign-out';
  };

  return {
    isSignedIn: !!data,
    isLoading,
    signOut,
    user: data,
  };
};
