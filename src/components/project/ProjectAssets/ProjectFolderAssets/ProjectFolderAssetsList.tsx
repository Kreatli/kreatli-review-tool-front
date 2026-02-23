import { isSortable } from '@dnd-kit/dom/sortable';
import { DragDropProvider, DragOverlay } from '@dnd-kit/react';
import { addToast, Button, Checkbox, cn, Skeleton } from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React from 'react';

import { AssetContextProvider } from '../../../../contexts/Asset';
import { useProjectContext } from '../../../../contexts/Project';
import { useGetProjectIdAssets } from '../../../../services/custom-hooks';
import { usePostProjectIdAssetsMove, usePutProjectIdFolderFolderId } from '../../../../services/hooks';
import {
  getAssetFolderId,
  getProjectIdAssets,
  postProjectIdAssetsMove,
  putProjectIdFolderFolderId,
} from '../../../../services/services';
import { FolderDto, ProjectDto } from '../../../../services/types';
import { getErrorMessage } from '../../../../utils/getErrorMessage';
import { EmptyState } from '../../../various/EmptyState';
import { Icon } from '../../../various/Icon';
import { ArchiveAssetsModal } from '../ProjectAssetsBulkEdit/ArchiveAssetsModal';
import { MoveToAssetsModal } from '../ProjectAssetsBulkEdit/MoveToAssetsModal';
import { ProjectFile } from '../ProjectFile';
import { ProjectFileCover } from '../ProjectFile/ProjectFileCover';
import { ProjectFolder } from '../ProjectFolder';
import { ProjectStack } from '../ProjectStack';

interface Props {
  project: ProjectDto;
  folder: FolderDto;
}

export const ProjectFolderAssetsList = ({ project, folder }: Props) => {
  const { search, filters } = useProjectContext();

  const { data: assetsData, isPending: isLoadingAssets } = useGetProjectIdAssets(project.id, undefined, {
    params: {
      parentId: folder.id,
      ...filters,
    },
  });

  const router = useRouter();

  const files = React.useMemo(() => {
    return assetsData?.files ?? [];
  }, [assetsData]);

  const folders = React.useMemo(() => {
    return assetsData?.folders ?? [];
  }, [assetsData]);

  const assets = React.useMemo(() => {
    return [...files, ...folders];
  }, [files, folders]);

  const [draggedId, setDraggedId] = React.useState<string | null>(null);
  const [overId, setOverId] = React.useState<string | null>(null);
  const [selectedAssetId, setSelectedAssetId] = React.useState<string | null>(null);
  const [filesOrder, setFilesOrder] = React.useState<string[]>(files.map((file) => file.id));

  const [isMoveToAssetsModalOpen, setIsMoveToAssetsModalOpen] = React.useState(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = React.useState(false);
  const [selectedAssetIds, setSelectedAssetIds] = React.useState<Set<string>>(new Set([]));

  React.useEffect(() => {
    setFilesOrder(files.map((asset) => asset.id));
  }, [files]);

  const queryClient = useQueryClient();
  const { mutateAsync: updateFolder } = usePutProjectIdFolderFolderId({
    mutationKey: [postProjectIdAssetsMove.key, project.id],
  });
  const { mutateAsync: moveAssets } = usePostProjectIdAssetsMove({
    mutationKey: [postProjectIdAssetsMove.key, project.id],
  });

  const selectedAsset = React.useMemo(() => {
    return [...files, ...folders].find((asset) => asset.id === selectedAssetId);
  }, [files, folders, selectedAssetId]);

  const draggedAsset = React.useMemo(() => {
    return files.find((asset) => asset.id === draggedId);
  }, [draggedId, files]);

  const sortedAssets = React.useMemo(() => {
    return filesOrder
      .map((id) => files.find((file) => file.id === id)!)
      .filter((file) => file && file.name.toLowerCase().includes(search.toLowerCase()));
  }, [filesOrder, files, search]);

  const hasSelectedAssets = React.useMemo(() => {
    return selectedAssetIds.size > 0;
  }, [selectedAssetIds]);

  const shouldShowCompareButton = React.useMemo(() => {
    return (
      selectedAssetIds.size === 2 &&
      Array.from(selectedAssetIds.values()).every((id: string) => files.find((asset) => asset.id === id))
    );
  }, [selectedAssetIds, files]);

  if (isLoadingAssets) {
    return (
      <div className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4 gap-y-6 overflow-hidden">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="flex flex-col gap-2">
            <Skeleton className="aspect-video rounded-lg" />
            <Skeleton className="h-6 w-1/2 rounded" />
            <Skeleton className="size-10 rounded-full" />
          </div>
        ))}
      </div>
    );
  }

  if (assets.length === 0 && !search && Object.keys(filters).length === 0) {
    return <EmptyState title="No files" text="This folder is empty. Go ahead and upload files here" />;
  }

  const handleDragEnd = async (targetIndex: number, targetId: string | undefined) => {
    setDraggedId(null);
    setOverId(null);

    const oldIndex = filesOrder.indexOf(draggedId as string);
    const newIndex = targetIndex;

    const isOverFolder = (targetId as string).includes('folder');
    const overFolderId = (targetId as string).replace('folder-', '');

    if (oldIndex === newIndex && !overFolderId) {
      return;
    }

    const newFilesOrder = [...filesOrder];
    newFilesOrder.splice(oldIndex, 1);
    newFilesOrder.splice(newIndex, 0, ...(isOverFolder ? [] : [draggedId as string]));

    setFilesOrder(newFilesOrder);

    if (isOverFolder) {
      try {
        const { from: updatedFolder } = await moveAssets({
          id: project.id,
          requestBody: {
            assetIds: [draggedId as string],
            fromId: folder.id,
            toId: overFolderId,
          },
        });

        queryClient.setQueryData([getAssetFolderId.key, folder.id], updatedFolder);

        if (!queryClient.isMutating({ mutationKey: [postProjectIdAssetsMove.key, project.id] })) {
          queryClient.invalidateQueries({ queryKey: [getProjectIdAssets.key, project.id] });
        }
      } catch (error) {
        addToast({
          title: 'Failed to move folder',
          description: getErrorMessage(error),
          color: 'danger',
          variant: 'flat',
        });
      }

      return;
    }

    try {
      const { folder: updatedFolder } = await updateFolder({
        id: project.id,
        folderId: folder.id,
        requestBody: { children: newFilesOrder },
      });

      queryClient.setQueryData([getAssetFolderId.key, folder.id], updatedFolder);

      if (!queryClient.isMutating({ mutationKey: [putProjectIdFolderFolderId.key, project.id] })) {
        queryClient.invalidateQueries({ queryKey: [getProjectIdAssets.key, project.id] });
      }
    } catch (error) {
      addToast({
        title: 'Failed to update assets order',
        description: getErrorMessage(error),
        color: 'danger',
        variant: 'flat',
      });
    }
  };

  const handleSelectionChange = (assetId: string) => {
    setSelectedAssetIds((prev) => {
      const newSelectedAssetIds = new Set(prev);
      if (newSelectedAssetIds.has(assetId)) {
        newSelectedAssetIds.delete(assetId);
      } else {
        newSelectedAssetIds.add(assetId);
      }
      return newSelectedAssetIds;
    });
  };

  const handleSelectAllChange = () => {
    if (selectedAssetIds.size === assets.length) {
      setSelectedAssetIds(new Set());
    } else {
      setSelectedAssetIds(new Set(assets.map((asset) => asset.id)));
    }
  };

  const handleCompareSelectedAssets = () => {
    const [assetId, assetToCompareId] = Array.from(selectedAssetIds);

    const [asset, assetToCompare] = [
      files.find((asset) => asset.id === assetId),
      files.find((asset) => asset.id === assetToCompareId),
    ];

    if (!asset || !assetToCompare) {
      return;
    }

    if (asset.type === 'stack') {
      const fileToCompareId = assetToCompare.type === 'stack' ? assetToCompare.active?.id : assetToCompare.id;

      router.push(`/project/${project.id}/assets/stack/${asset.id}?compareFileId=${fileToCompareId}`);

      return;
    }

    const fileToCompareId = assetToCompare.type === 'stack' ? assetToCompare.active?.id : assetToCompare.id;

    router.push(`/project/${project.id}/assets/${assetId}?compareFileId=${fileToCompareId}`);
  };

  return (
    <div className="flex flex-col">
      <div
        className={cn('sticky top-16 z-20 h-4 overflow-hidden bg-background opacity-0 transition-[height,opacity]', {
          'h-12 opacity-100': hasSelectedAssets,
        })}
      >
        <div className="flex items-center gap-4 py-2 pl-2">
          <Checkbox
            isDisabled={!hasSelectedAssets}
            isSelected={selectedAssetIds.size === assets.length}
            isIndeterminate={selectedAssetIds.size > 0 && selectedAssetIds.size < assets.length}
            color="primary"
            onChange={handleSelectAllChange}
          />
          <div className="-ml-2 text-foreground-500">
            {selectedAssetIds.size} item{selectedAssetIds.size === 1 ? '' : 's'} selected
          </div>
          <Button
            variant="light"
            size="sm"
            isDisabled={!hasSelectedAssets}
            onClick={() => setIsMoveToAssetsModalOpen(true)}
          >
            <Icon icon="arrowRight" size={14} />
            Move to
          </Button>
          <Button
            variant="light"
            size="sm"
            color="danger"
            isDisabled={!hasSelectedAssets}
            onClick={() => setIsArchiveModalOpen(true)}
          >
            <Icon icon="trash" size={14} />
            Delete
          </Button>
          {shouldShowCompareButton && (
            <Button
              size="sm"
              variant="flat"
              color="primary"
              className="hidden md:flex"
              onClick={handleCompareSelectedAssets}
            >
              <Icon icon="compare" size={16} />
              Compare
            </Button>
          )}
        </div>
      </div>
      {(search || Object.keys(filters).length > 0) && sortedAssets.length === 0 && (
        <EmptyState
          title="No results found"
          text="Try adjusting your search or filters to find what you're looking for"
        />
      )}
      <AssetContextProvider
        projectId={project.id}
        selectedAsset={selectedAsset}
        setSelectedAssetId={setSelectedAssetId}
        project={project}
      >
        <DragDropProvider
          onDragStart={({ operation }) => {
            setDraggedId(operation.source?.id as string);
          }}
          onDragOver={({ operation }) => {
            setOverId((operation.target?.id ?? null) as string | null);
          }}
          onDragEnd={({ operation }) => {
            handleDragEnd(
              isSortable(operation.target) ? operation.target.index : 0,
              operation.target?.id as string | undefined,
            );
          }}
        >
          <div className="mb-6 grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4 gap-y-2 empty:mb-0">
            {folders.map((folder) => (
              <ProjectFolder
                key={folder.id}
                folder={folder}
                isReadonly={project.status !== 'active'}
                isSelected={hasSelectedAssets ? selectedAssetIds.has(folder.id) : undefined}
                onSelectionChange={() => handleSelectionChange(folder.id)}
              />
            ))}
          </div>
          <div className="-m-3 grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4 gap-y-6 overflow-hidden p-3">
            {sortedAssets.map((asset, index) =>
              asset.type === 'file' ? (
                <ProjectFile
                  key={asset.id}
                  file={asset}
                  isReadonly={project.status !== 'active'}
                  index={index}
                  isSelected={selectedAssetIds.has(asset.id)}
                  onSelectionChange={() => handleSelectionChange(asset.id)}
                />
              ) : (
                <ProjectStack
                  key={asset.id}
                  stack={asset}
                  index={index}
                  isReadonly={project.status !== 'active'}
                  isSelected={selectedAssetIds.has(asset.id)}
                  onSelectionChange={() => handleSelectionChange(asset.id)}
                />
              ),
            )}
          </div>
          <DragOverlay>
            {() =>
              draggedAsset && (
                <div
                  className={cn('rounded-2xl bg-background transition-transform', {
                    'scale-80': overId?.includes('folder') && !overId.endsWith(draggedAsset.id),
                  })}
                >
                  {draggedAsset.type === 'stack' ? (
                    <ProjectFileCover key={draggedAsset.id} file={draggedAsset.active!} />
                  ) : (
                    <ProjectFileCover key={draggedAsset.id} file={draggedAsset} />
                  )}
                </div>
              )
            }
          </DragOverlay>
        </DragDropProvider>
      </AssetContextProvider>
      <MoveToAssetsModal
        project={project}
        assetIds={Array.from(selectedAssetIds)}
        currentParentId={folder.id}
        isOpen={isMoveToAssetsModalOpen}
        onClose={() => setIsMoveToAssetsModalOpen(false)}
        onSuccess={() => {
          setSelectedAssetIds(new Set());
        }}
      />
      <ArchiveAssetsModal
        isOpen={isArchiveModalOpen}
        projectId={project.id}
        assetIds={Array.from(selectedAssetIds)}
        onClose={() => setIsArchiveModalOpen(false)}
        onSuccess={() => {
          setSelectedAssetIds(new Set());
        }}
      />
    </div>
  );
};
