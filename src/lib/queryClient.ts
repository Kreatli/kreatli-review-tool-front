import { Query, QueryCache } from '@tanstack/react-query';
import { addToast } from '@heroui/react';

import { QueryClient } from '@tanstack/react-query';
import { getErrorMessage } from '../utils/getErrorMessage';

interface QueryErrorMeta {
  showErrorNotification?: boolean;
  errorMessage?: string;
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      retry: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error, meta: Query<any, any, any> & QueryErrorMeta) => {
      if (!meta.showErrorNotification && !meta.errorMessage) {
        return;
      }

      addToast({
        title: meta.errorMessage || getErrorMessage(error),
        color: 'danger',
        variant: 'flat',
      });
    },
  }),
});
