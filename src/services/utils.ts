import { queryClient } from '../lib/queryClient';
import { getAssetFileId, getProjectIdAssets } from './services';
import { FileDto, ProjectAssetsResponseDto, ProjectFileDto } from './types';

export const updateProjectFile = (projectId: string, file: ProjectFileDto) => {
  queryClient.setQueriesData<ProjectAssetsResponseDto>({ queryKey: [getProjectIdAssets.key, projectId] }, (data) => {
    if (!data) {
      return data;
    }

    return {
      ...data,
      assets: data.assets.map((asset) => {
        if (asset.id === file.id) {
          return file;
        }

        return asset;
      }),
    };
  });

  queryClient.setQueryData<FileDto>([getAssetFileId.key, file.id], (data) => {
    if (!data) {
      return data;
    }

    return {
      ...data,
      assignee: file.assignee,
      status: file.status,
      description: file.description,
      name: file.name,
      commentsCount: file.commentsCount,
      id: file.id,
      type: file.type,
    };
  });
};
