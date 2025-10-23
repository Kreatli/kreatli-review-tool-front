//@ts-nocheck
/**
 * AUTO_GENERATED Do not change this file directly, use config.ts file instead
 *
 * @version 6
 */

import { AxiosRequestConfig } from 'axios';
import {
  UseQueryOptions,
  useQuery,
  useMutation,
  UseMutationOptions,
  QueryClient,
  QueryKey,
} from '@tanstack/react-query';
import { RequestError, SwaggerResponse } from './config';

import type {
  AddonBodyDto,
  AssetCommentBodyDto,
  AssetCommentDto,
  AssetCommentEditDto,
  AssetCommentsResponse,
  AssetMoveBodyDto,
  AssetRemoveBodyDto,
  AssetsDto,
  ChatBodyDto,
  ChatDto,
  ChatEditBodyDto,
  ChatMessagesDto,
  CreateShareableLinkDto,
  FileDto,
  FileEditBodyDto,
  FolderBodyDto,
  FolderDto,
  FolderEditBodyDto,
  GetAssetFileIdCommentsQueryParams,
  GetAssetFileIdDownloadQueryParams,
  GetAssetsQueryParams,
  GetConversationIdMessagesQueryParams,
  GetNotificationsQueryParams,
  GetProjectIdLogsQueryParams,
  GetProjectsQueryParams,
  InvoiceDto,
  MarkAsReadBodyDto,
  MultipartPresignedUrlBodyDto,
  MultipartPresignedUrlDto,
  MultipartUploadCompleteBodyDto,
  MultipartUploadCompleteDto,
  MultipartUploadStartBodyDto,
  MultipartUploadStartDto,
  NewPasswordBodyDto,
  NotificationDto,
  NotificationsDto,
  PresignedUrlBodyDto,
  PresignedUrlDto,
  ProjectArchivedAssetsDto,
  ProjectAssetEditDto,
  ProjectAssetsResponseDto,
  ProjectBodyDto,
  ProjectCoverDto,
  ProjectDto,
  ProjectEditBodyDto,
  ProjectFileBodyDto,
  ProjectInvitationDto,
  ProjectLogsDto,
  ProjectMemberBodyDto,
  ProjectPathDto,
  ProjectStatusBodyDto,
  ProjectsResponseDto,
  ResetPasswordBodyDto,
  ShareableAssetDto,
  ShareableLinkBody,
  ShareableLinkSendEmailBodyDto,
  SignInBodyDto,
  SignInResultDto,
  SignUpBodyDto,
  SignUpResultDto,
  SignUpWithTokenBodyDto,
  SubscriptionBodyDto,
  SubscriptionResponseDto,
  TokenBodyDto,
  UpdateProjectMemberDto,
  UpdateUserDto,
  UserDto,
} from './types';
import {
  deleteAssetFileIdCommentCommentId,
  deleteProjectId,
  deleteProjectIdAssets,
  deleteProjectIdMember,
  deleteProjectIdMemberMemberId,
  deleteUserAddonId,
  deleteUserSubscription,
  get,
  getAssetFileId,
  getAssetFileIdComments,
  getAssetFileIdDownload,
  getAssetFolderId,
  getAssets,
  getConversationIdMessages,
  getNotifications,
  getProject,
  getProjectId,
  getProjectIdAssets,
  getProjectIdAssetsArchived,
  getProjectIdChats,
  getProjectIdLogs,
  getProjectIdPaths,
  getProjects,
  getShareableLinkAssetId,
  getUser,
  getUserBillingHistory,
  getUserId,
  patchAssetFileIdCommentCommentId,
  postAssetFileIdComment,
  postAssetsMultipartComplete,
  postAssetsMultipartStart,
  postAssetsMultipartUrl,
  postAssetsUrl,
  postAuthNewPassword,
  postAuthResetPassword,
  postAuthSignIn,
  postAuthSignUp,
  postAuthSignUpInvitation,
  postAuthSsoGoogle,
  postAuthVerifyEmail,
  postProject,
  postProjectIdAssetsArchive,
  postProjectIdAssetsMove,
  postProjectIdAssetsRestore,
  postProjectIdChat,
  postProjectIdCover,
  postProjectIdFile,
  postProjectIdFolder,
  postProjectIdMember,
  postShareableLink,
  postShareableLinkSendEmail,
  postStripeWebhook,
  postUserAddon,
  postUserSubscription,
  putConversationId,
  putNotificationId,
  putNotificationsMarkAllAsRead,
  putProjectId,
  putProjectIdFileFileId,
  putProjectIdFolderFolderId,
  putProjectIdMember,
  putProjectIdStatus,
  putUser,
  putUserAddonId,
} from './services';

export type SwaggerTypescriptMutationDefaultParams<TExtra> = {
  _extraVariables?: TExtra;
  configOverride?: AxiosRequestConfig;
};
type SwaggerTypescriptUseQueryOptions<TData> = Omit<
  UseQueryOptions<SwaggerResponse<TData>, RequestError | Error>,
  'queryKey'
>;

type SwaggerTypescriptUseMutationOptions<TData, TRequest, TExtra> = UseMutationOptions<
  SwaggerResponse<TData>,
  RequestError | Error,
  TRequest & SwaggerTypescriptMutationDefaultParams<TExtra>
>;

type SwaggerTypescriptUseMutationOptionsVoid<TData, TExtra> = UseMutationOptions<
  SwaggerResponse<TData>,
  RequestError | Error,
  SwaggerTypescriptMutationDefaultParams<TExtra> | void
>;

export const useDeleteAssetFileIdCommentCommentId = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<AssetCommentDto, { id: string; commentId: string }, TExtra>,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        id,
        commentId,

        configOverride,
      } = _o || {};

      return deleteAssetFileIdCommentCommentId(
        id,
        commentId,

        configOverride,
      );
    },
    ...options,
  });
};

export const useDeleteProjectId = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<ProjectDto, { id: string }, TExtra>,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        id,

        configOverride,
      } = _o || {};

      return deleteProjectId(
        id,

        configOverride,
      );
    },
    ...options,
  });
};

export const useDeleteProjectIdAssets = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<ProjectDto, { id: string; requestBody: AssetRemoveBodyDto }, TExtra>,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        id,
        requestBody,

        configOverride,
      } = _o || {};

      return deleteProjectIdAssets(
        id,
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const useDeleteProjectIdMember = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<ProjectDto, { id: string }, TExtra>,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        id,

        configOverride,
      } = _o || {};

      return deleteProjectIdMember(
        id,

        configOverride,
      );
    },
    ...options,
  });
};

export const useDeleteProjectIdMemberMemberId = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<ProjectDto, { id: string; memberId: string }, TExtra>,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        id,
        memberId,

        configOverride,
      } = _o || {};

      return deleteProjectIdMemberMemberId(
        id,
        memberId,

        configOverride,
      );
    },
    ...options,
  });
};

export const useDeleteUserAddonId = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<UserDto, { id: string }, TExtra>,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        id,

        configOverride,
      } = _o || {};

      return deleteUserAddonId(
        id,

        configOverride,
      );
    },
    ...options,
  });
};

export const useDeleteUserSubscription = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptionsVoid<UserDto, TExtra>,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const { configOverride } = _o || {};

      return deleteUserSubscription(configOverride);
    },
    ...options,
  });
};

export const useGet = (options?: SwaggerTypescriptUseQueryOptions<any>, configOverride?: AxiosRequestConfig) => {
  const { key, fun } = useGet.info(configOverride);
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGet.info = (configOverride?: AxiosRequestConfig) => {
  return {
    key: [get.key] as QueryKey,
    fun: () => get(configOverride),
  };
};
useGet.prefetch = (
  client: QueryClient,
  options?: SwaggerTypescriptUseQueryOptions<any>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGet.info(configOverride);

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};
export const useGetAssetFileId = (
  id: string,
  options?: SwaggerTypescriptUseQueryOptions<FileDto>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetAssetFileId.info(
    id,

    configOverride,
  );
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetAssetFileId.info = (id: string, configOverride?: AxiosRequestConfig) => {
  return {
    key: [getAssetFileId.key, id] as QueryKey,
    fun: () =>
      getAssetFileId(
        id,

        configOverride,
      ),
  };
};
useGetAssetFileId.prefetch = (
  client: QueryClient,
  id: string,
  options?: SwaggerTypescriptUseQueryOptions<FileDto>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetAssetFileId.info(
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
export const useGetAssetFileIdComments = (
  id: string,
  queryParams: GetAssetFileIdCommentsQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<AssetCommentsResponse>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetAssetFileIdComments.info(
    id,

    queryParams,
    configOverride,
  );
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetAssetFileIdComments.info = (
  id: string,
  queryParams: GetAssetFileIdCommentsQueryParams,
  configOverride?: AxiosRequestConfig,
) => {
  return {
    key: [getAssetFileIdComments.key, id, queryParams] as QueryKey,
    fun: () =>
      getAssetFileIdComments(
        id,

        queryParams,

        configOverride,
      ),
  };
};
useGetAssetFileIdComments.prefetch = (
  client: QueryClient,
  id: string,
  queryParams: GetAssetFileIdCommentsQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<AssetCommentsResponse>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetAssetFileIdComments.info(
    id,

    queryParams,
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
export const useGetAssetFileIdDownload = (
  id: string,
  queryParams: GetAssetFileIdDownloadQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<string>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetAssetFileIdDownload.info(
    id,

    queryParams,
    configOverride,
  );
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetAssetFileIdDownload.info = (
  id: string,
  queryParams: GetAssetFileIdDownloadQueryParams,
  configOverride?: AxiosRequestConfig,
) => {
  return {
    key: [getAssetFileIdDownload.key, id, queryParams] as QueryKey,
    fun: () =>
      getAssetFileIdDownload(
        id,

        queryParams,

        configOverride,
      ),
  };
};
useGetAssetFileIdDownload.prefetch = (
  client: QueryClient,
  id: string,
  queryParams: GetAssetFileIdDownloadQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<string>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetAssetFileIdDownload.info(
    id,

    queryParams,
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
export const useGetAssetFolderId = (
  id: string,
  options?: SwaggerTypescriptUseQueryOptions<FolderDto>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetAssetFolderId.info(
    id,

    configOverride,
  );
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetAssetFolderId.info = (id: string, configOverride?: AxiosRequestConfig) => {
  return {
    key: [getAssetFolderId.key, id] as QueryKey,
    fun: () =>
      getAssetFolderId(
        id,

        configOverride,
      ),
  };
};
useGetAssetFolderId.prefetch = (
  client: QueryClient,
  id: string,
  options?: SwaggerTypescriptUseQueryOptions<FolderDto>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetAssetFolderId.info(
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
export const useGetAssets = (
  queryParams: GetAssetsQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<AssetsDto>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetAssets.info(queryParams, configOverride);
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetAssets.info = (queryParams: GetAssetsQueryParams, configOverride?: AxiosRequestConfig) => {
  return {
    key: [getAssets.key, queryParams] as QueryKey,
    fun: () =>
      getAssets(
        queryParams,

        configOverride,
      ),
  };
};
useGetAssets.prefetch = (
  client: QueryClient,
  queryParams: GetAssetsQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<AssetsDto>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetAssets.info(queryParams, configOverride);

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};
export const useGetConversationIdMessages = (
  id: string,
  queryParams: GetConversationIdMessagesQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<ChatMessagesDto>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetConversationIdMessages.info(
    id,

    queryParams,
    configOverride,
  );
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetConversationIdMessages.info = (
  id: string,
  queryParams: GetConversationIdMessagesQueryParams,
  configOverride?: AxiosRequestConfig,
) => {
  return {
    key: [getConversationIdMessages.key, id, queryParams] as QueryKey,
    fun: () =>
      getConversationIdMessages(
        id,

        queryParams,

        configOverride,
      ),
  };
};
useGetConversationIdMessages.prefetch = (
  client: QueryClient,
  id: string,
  queryParams: GetConversationIdMessagesQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<ChatMessagesDto>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetConversationIdMessages.info(
    id,

    queryParams,
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
export const useGetNotifications = (
  queryParams: GetNotificationsQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<NotificationsDto>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetNotifications.info(queryParams, configOverride);
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetNotifications.info = (queryParams: GetNotificationsQueryParams, configOverride?: AxiosRequestConfig) => {
  return {
    key: [getNotifications.key, queryParams] as QueryKey,
    fun: () =>
      getNotifications(
        queryParams,

        configOverride,
      ),
  };
};
useGetNotifications.prefetch = (
  client: QueryClient,
  queryParams: GetNotificationsQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<NotificationsDto>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetNotifications.info(queryParams, configOverride);

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};
export const useGetProject = (
  options?: SwaggerTypescriptUseQueryOptions<ProjectInvitationDto>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetProject.info(configOverride);
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetProject.info = (configOverride?: AxiosRequestConfig) => {
  return {
    key: [getProject.key] as QueryKey,
    fun: () => getProject(configOverride),
  };
};
useGetProject.prefetch = (
  client: QueryClient,
  options?: SwaggerTypescriptUseQueryOptions<ProjectInvitationDto>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetProject.info(configOverride);

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};
export const useGetProjectId = (
  id: string,
  options?: SwaggerTypescriptUseQueryOptions<ProjectDto>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetProjectId.info(
    id,

    configOverride,
  );
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetProjectId.info = (id: string, configOverride?: AxiosRequestConfig) => {
  return {
    key: [getProjectId.key, id] as QueryKey,
    fun: () =>
      getProjectId(
        id,

        configOverride,
      ),
  };
};
useGetProjectId.prefetch = (
  client: QueryClient,
  id: string,
  options?: SwaggerTypescriptUseQueryOptions<ProjectDto>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetProjectId.info(
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
    key: [getProjectIdAssets.key, id] as QueryKey,
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
export const useGetProjectIdAssetsArchived = (
  id: string,
  options?: SwaggerTypescriptUseQueryOptions<ProjectArchivedAssetsDto>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetProjectIdAssetsArchived.info(
    id,

    configOverride,
  );
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetProjectIdAssetsArchived.info = (id: string, configOverride?: AxiosRequestConfig) => {
  return {
    key: [getProjectIdAssetsArchived.key, id] as QueryKey,
    fun: () =>
      getProjectIdAssetsArchived(
        id,

        configOverride,
      ),
  };
};
useGetProjectIdAssetsArchived.prefetch = (
  client: QueryClient,
  id: string,
  options?: SwaggerTypescriptUseQueryOptions<ProjectArchivedAssetsDto>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetProjectIdAssetsArchived.info(
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
export const useGetProjectIdChats = (
  id: string,
  options?: SwaggerTypescriptUseQueryOptions<ChatDto[]>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetProjectIdChats.info(
    id,

    configOverride,
  );
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetProjectIdChats.info = (id: string, configOverride?: AxiosRequestConfig) => {
  return {
    key: [getProjectIdChats.key, id] as QueryKey,
    fun: () =>
      getProjectIdChats(
        id,

        configOverride,
      ),
  };
};
useGetProjectIdChats.prefetch = (
  client: QueryClient,
  id: string,
  options?: SwaggerTypescriptUseQueryOptions<ChatDto[]>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetProjectIdChats.info(
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
export const useGetProjectIdLogs = (
  id: string,
  queryParams?: GetProjectIdLogsQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<ProjectLogsDto>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetProjectIdLogs.info(
    id,

    queryParams,
    configOverride,
  );
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetProjectIdLogs.info = (
  id: string,
  queryParams?: GetProjectIdLogsQueryParams,
  configOverride?: AxiosRequestConfig,
) => {
  return {
    key: [getProjectIdLogs.key, id, queryParams] as QueryKey,
    fun: () =>
      getProjectIdLogs(
        id,

        queryParams,

        configOverride,
      ),
  };
};
useGetProjectIdLogs.prefetch = (
  client: QueryClient,
  id: string,
  queryParams?: GetProjectIdLogsQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<ProjectLogsDto>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetProjectIdLogs.info(
    id,

    queryParams,
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
export const useGetProjectIdPaths = (
  id: string,
  options?: SwaggerTypescriptUseQueryOptions<ProjectPathDto[]>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetProjectIdPaths.info(
    id,

    configOverride,
  );
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetProjectIdPaths.info = (id: string, configOverride?: AxiosRequestConfig) => {
  return {
    key: [getProjectIdPaths.key, id] as QueryKey,
    fun: () =>
      getProjectIdPaths(
        id,

        configOverride,
      ),
  };
};
useGetProjectIdPaths.prefetch = (
  client: QueryClient,
  id: string,
  options?: SwaggerTypescriptUseQueryOptions<ProjectPathDto[]>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetProjectIdPaths.info(
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
export const useGetProjects = (
  queryParams?: GetProjectsQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<ProjectsResponseDto>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetProjects.info(queryParams, configOverride);
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetProjects.info = (queryParams?: GetProjectsQueryParams, configOverride?: AxiosRequestConfig) => {
  return {
    key: [getProjects.key, queryParams] as QueryKey,
    fun: () =>
      getProjects(
        queryParams,

        configOverride,
      ),
  };
};
useGetProjects.prefetch = (
  client: QueryClient,
  queryParams?: GetProjectsQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<ProjectsResponseDto>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetProjects.info(queryParams, configOverride);

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};
export const useGetShareableLinkAssetId = (
  id: string,
  options?: SwaggerTypescriptUseQueryOptions<ShareableAssetDto>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetShareableLinkAssetId.info(
    id,

    configOverride,
  );
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetShareableLinkAssetId.info = (id: string, configOverride?: AxiosRequestConfig) => {
  return {
    key: [getShareableLinkAssetId.key, id] as QueryKey,
    fun: () =>
      getShareableLinkAssetId(
        id,

        configOverride,
      ),
  };
};
useGetShareableLinkAssetId.prefetch = (
  client: QueryClient,
  id: string,
  options?: SwaggerTypescriptUseQueryOptions<ShareableAssetDto>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetShareableLinkAssetId.info(
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
export const useGetUser = (
  options?: SwaggerTypescriptUseQueryOptions<UserDto>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetUser.info(configOverride);
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetUser.info = (configOverride?: AxiosRequestConfig) => {
  return {
    key: [getUser.key] as QueryKey,
    fun: () => getUser(configOverride),
  };
};
useGetUser.prefetch = (
  client: QueryClient,
  options?: SwaggerTypescriptUseQueryOptions<UserDto>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetUser.info(configOverride);

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};
export const useGetUserBillingHistory = (
  options?: SwaggerTypescriptUseQueryOptions<InvoiceDto[]>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetUserBillingHistory.info(configOverride);
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetUserBillingHistory.info = (configOverride?: AxiosRequestConfig) => {
  return {
    key: [getUserBillingHistory.key] as QueryKey,
    fun: () => getUserBillingHistory(configOverride),
  };
};
useGetUserBillingHistory.prefetch = (
  client: QueryClient,
  options?: SwaggerTypescriptUseQueryOptions<InvoiceDto[]>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetUserBillingHistory.info(configOverride);

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};
export const useGetUserId = (
  id: string,
  options?: SwaggerTypescriptUseQueryOptions<UserDto>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetUserId.info(
    id,

    configOverride,
  );
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetUserId.info = (id: string, configOverride?: AxiosRequestConfig) => {
  return {
    key: [getUserId.key, id] as QueryKey,
    fun: () =>
      getUserId(
        id,

        configOverride,
      ),
  };
};
useGetUserId.prefetch = (
  client: QueryClient,
  id: string,
  options?: SwaggerTypescriptUseQueryOptions<UserDto>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetUserId.info(
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
export const usePatchAssetFileIdCommentCommentId = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    AssetCommentDto,
    { id: string; commentId: string; requestBody: AssetCommentEditDto },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        id,
        commentId,
        requestBody,

        configOverride,
      } = _o || {};

      return patchAssetFileIdCommentCommentId(
        id,
        commentId,
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePostAssetFileIdComment = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    AssetCommentDto,
    { id: string; requestBody: AssetCommentBodyDto },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        id,
        requestBody,

        configOverride,
      } = _o || {};

      return postAssetFileIdComment(
        id,
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePostAssetsMultipartComplete = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    MultipartUploadCompleteDto,
    { requestBody: MultipartUploadCompleteBodyDto },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postAssetsMultipartComplete(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePostAssetsMultipartStart = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    MultipartUploadStartDto,
    { requestBody: MultipartUploadStartBodyDto },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postAssetsMultipartStart(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePostAssetsMultipartUrl = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    MultipartPresignedUrlDto,
    { requestBody: MultipartPresignedUrlBodyDto },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postAssetsMultipartUrl(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePostAssetsUrl = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<PresignedUrlDto, { requestBody: PresignedUrlBodyDto }, TExtra>,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postAssetsUrl(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePostAuthNewPassword = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<SignInResultDto, { requestBody: NewPasswordBodyDto }, TExtra>,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postAuthNewPassword(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePostAuthResetPassword = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<SignInResultDto, { requestBody: ResetPasswordBodyDto }, TExtra>,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postAuthResetPassword(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePostAuthSignIn = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<SignInResultDto, { requestBody: SignInBodyDto }, TExtra>,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postAuthSignIn(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePostAuthSignUp = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<SignUpResultDto, { requestBody: SignUpBodyDto }, TExtra>,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postAuthSignUp(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePostAuthSignUpInvitation = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<SignInResultDto, { requestBody: SignUpWithTokenBodyDto }, TExtra>,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postAuthSignUpInvitation(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePostAuthSsoGoogle = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<SignInResultDto, { requestBody: TokenBodyDto }, TExtra>,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postAuthSsoGoogle(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePostAuthVerifyEmail = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<SignInResultDto, { requestBody: TokenBodyDto }, TExtra>,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postAuthVerifyEmail(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePostProject = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<ProjectDto, { requestBody: ProjectBodyDto }, TExtra>,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postProject(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePostProjectIdAssetsArchive = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    ProjectAssetEditDto,
    { id: string; requestBody: AssetRemoveBodyDto },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        id,
        requestBody,

        configOverride,
      } = _o || {};

      return postProjectIdAssetsArchive(
        id,
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePostProjectIdAssetsMove = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<ProjectDto, { id: string; requestBody: AssetMoveBodyDto }, TExtra>,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        id,
        requestBody,

        configOverride,
      } = _o || {};

      return postProjectIdAssetsMove(
        id,
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePostProjectIdAssetsRestore = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<ProjectDto, { id: string; requestBody: AssetRemoveBodyDto }, TExtra>,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        id,
        requestBody,

        configOverride,
      } = _o || {};

      return postProjectIdAssetsRestore(
        id,
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePostProjectIdChat = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<any, { id: string; requestBody: ChatBodyDto }, TExtra>,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        id,
        requestBody,

        configOverride,
      } = _o || {};

      return postProjectIdChat(
        id,
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePostProjectIdCover = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<ProjectDto, { id: string; requestBody: ProjectCoverDto }, TExtra>,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        id,
        requestBody,

        configOverride,
      } = _o || {};

      return postProjectIdCover(
        id,
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePostProjectIdFile = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    ProjectAssetEditDto,
    { id: string; requestBody: ProjectFileBodyDto },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        id,
        requestBody,

        configOverride,
      } = _o || {};

      return postProjectIdFile(
        id,
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePostProjectIdFolder = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    ProjectAssetEditDto,
    { id: string; requestBody: FolderBodyDto },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        id,
        requestBody,

        configOverride,
      } = _o || {};

      return postProjectIdFolder(
        id,
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePostProjectIdMember = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<ProjectDto, { id: string; requestBody: ProjectMemberBodyDto }, TExtra>,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        id,
        requestBody,

        configOverride,
      } = _o || {};

      return postProjectIdMember(
        id,
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePostShareableLink = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<CreateShareableLinkDto, { requestBody: ShareableLinkBody }, TExtra>,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postShareableLink(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePostShareableLinkSendEmail = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    { [x in string | number]: any },
    { requestBody: ShareableLinkSendEmailBodyDto },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postShareableLinkSendEmail(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePostStripeWebhook = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<any, { headerParams?: { 'stripe-signature': string } }, TExtra>,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const { headerParams, configOverride } = _o || {};

      return postStripeWebhook(headerParams, configOverride);
    },
    ...options,
  });
};

export const usePostUserAddon = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<UserDto, { requestBody: AddonBodyDto }, TExtra>,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postUserAddon(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePostUserSubscription = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<SubscriptionResponseDto, { requestBody: SubscriptionBodyDto }, TExtra>,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postUserSubscription(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePutConversationId = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<ChatDto, { id: string; requestBody: ChatEditBodyDto }, TExtra>,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        id,
        requestBody,

        configOverride,
      } = _o || {};

      return putConversationId(
        id,
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePutNotificationId = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    NotificationDto,
    { id: string; requestBody: MarkAsReadBodyDto },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        id,
        requestBody,

        configOverride,
      } = _o || {};

      return putNotificationId(
        id,
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePutNotificationsMarkAllAsRead = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptionsVoid<NotificationsDto, TExtra>,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const { configOverride } = _o || {};

      return putNotificationsMarkAllAsRead(configOverride);
    },
    ...options,
  });
};

export const usePutProjectId = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<ProjectDto, { id: string; requestBody: ProjectEditBodyDto }, TExtra>,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        id,
        requestBody,

        configOverride,
      } = _o || {};

      return putProjectId(
        id,
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePutProjectIdFileFileId = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    ProjectAssetEditDto,
    { id: string; fileId: string; requestBody: FileEditBodyDto },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        id,
        fileId,
        requestBody,

        configOverride,
      } = _o || {};

      return putProjectIdFileFileId(
        id,
        fileId,
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePutProjectIdFolderFolderId = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    ProjectAssetEditDto,
    { id: string; folderId: string; requestBody: FolderEditBodyDto },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        id,
        folderId,
        requestBody,

        configOverride,
      } = _o || {};

      return putProjectIdFolderFolderId(
        id,
        folderId,
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePutProjectIdMember = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    ProjectDto,
    { id: string; requestBody: UpdateProjectMemberDto },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        id,
        requestBody,

        configOverride,
      } = _o || {};

      return putProjectIdMember(
        id,
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePutProjectIdStatus = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<ProjectDto, { id: string; requestBody: ProjectStatusBodyDto }, TExtra>,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        id,
        requestBody,

        configOverride,
      } = _o || {};

      return putProjectIdStatus(
        id,
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePutUser = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<UserDto, { requestBody: UpdateUserDto }, TExtra>,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return putUser(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePutUserAddonId = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<UserDto, { id: string; requestBody: AddonBodyDto }, TExtra>,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        id,
        requestBody,

        configOverride,
      } = _o || {};

      return putUserAddonId(
        id,
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};
