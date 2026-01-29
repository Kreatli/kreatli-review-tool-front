import { queryClient } from '../lib/queryClient';
import { getAssetFileId, getProjectIdAssets, getProjects } from './services';
import { FileDto, ProjectAssetsResponseDto, ProjectDto, ProjectFileDto, ProjectsResponseDto } from './types';

export const updateProjectFile = (projectId: string, file: ProjectFileDto) => {
  queryClient.setQueriesData<ProjectAssetsResponseDto>({ queryKey: [getProjectIdAssets.key, projectId] }, (data) => {
    if (!data) {
      return data;
    }

    return {
      ...data,
      files: data.files.map((asset) => {
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

export const updateProjectData = (project: ProjectDto) => {
  queryClient.setQueriesData<ProjectsResponseDto>({ queryKey: [getProjects.key] }, (data) => {
    if (!data) {
      return data;
    }

    return {
      ...data,
      projects: data.projects.map((p) => {
        if (p.id === project.id) {
          return project;
        }

        return p;
      }),
    };
  });
};
