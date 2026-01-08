import { QueryClient, QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';

import { RequestError, SwaggerResponse } from './config';
import { getProjectIdAssets } from './services';
import { ProjectAssetsResponseDto } from './types';

type SwaggerTypescriptUseQueryOptions<TData> = Omit<
  UseQueryOptions<SwaggerResponse<TData>, RequestError | Error>,
  'queryKey'
>;

export const useGetProjectIdAssets = (
  id: string,
  options?: SwaggerTypescriptUseQueryOptions<ProjectAssetsResponseDto>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetProjectIdAssets.info(
    id,

    configOverride,
  );
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetProjectIdAssets.info = (id: string, configOverride?: AxiosRequestConfig) => {
  return {
    key: [getProjectIdAssets.key, id, configOverride?.params] as QueryKey,
    fun: () =>
      getProjectIdAssets(
        id,

        configOverride,
      ),
  };
};
useGetProjectIdAssets.prefetch = (
  client: QueryClient,
  id: string,
  options?: SwaggerTypescriptUseQueryOptions<ProjectAssetsResponseDto>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetProjectIdAssets.info(
    id,

    configOverride,
  );

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};
