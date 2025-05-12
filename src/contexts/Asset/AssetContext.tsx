/* eslint-disable @typescript-eslint/indent */
import { MenuItemProps } from '@heroui/react';
import React from 'react';

import { ArchiveAssetModal } from '../../components/asset/AssetModals/ArchiveAssetModal';
import { DeleteAssetModal } from '../../components/asset/AssetModals/DeleteAssetModal';
import { MoveToModal } from '../../components/asset/AssetModals/MoveToModal';
import { RenameAssetModal } from '../../components/asset/AssetModals/RenameAssetModal';
import { RestoreAssetModal } from '../../components/asset/AssetModals/RestoreAssetModal';
import { IconType } from '../../components/various/Icon';
import { useSession } from '../../hooks/useSession';
import { ProjectDto, ProjectFileDto, ProjectFolderDto } from '../../services/types';
import { downloadFromUrl } from '../../utils/download';

interface Context {
  getAssetActions: (asset: ProjectFileDto | ProjectFolderDto) => {
    label: string;
    icon: IconType;
    showDivider?: boolean;
    color?: MenuItemProps['color'];
    onClick: () => void;
  }[];
  isProjectOwner: boolean;
  asset: ProjectFileDto | ProjectFolderDto;
}

export const AssetContext = React.createContext<Context | null>(null);

export const useAssetContext = () => {
  const context = React.useContext(AssetContext);

  if (!context) {
    throw new Error('useAssetContext must be used within a AssetContextProvider');
  }

  return context;
};

interface Props {
  isArchived?: boolean;
  projectId: string;
  selectedAsset: ProjectFileDto | ProjectFolderDto | undefined;
  setSelectedAssetId?: (id: string) => void;
  project: ProjectDto;
}

export const AssetContextProvider = ({
  children,
  isArchived = false,
  projectId,
  selectedAsset,
  setSelectedAssetId,
  project,
}: React.PropsWithChildren<Props>) => {
  const [isRenameModalOpen, setIsRenameModalOpen] = React.useState(false);
  const [isMoveToModalOpen, setIsMoveToModalOpen] = React.useState(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [isRestoreModalOpen, setIsRestoreModalOpen] = React.useState(false);

  const { user } = useSession();
  const isProjectOwner = project.createdBy?.id === user?.id;

  const getAssetActions = (asset: ProjectFolderDto | ProjectFileDto) => {
    if (!isProjectOwner && user?.id !== asset?.createdBy?.id) {
      if (asset?.type === 'file') {
        return [
          {
            label: 'Download',
            icon: 'download' as const,
            onClick: () => {
              downloadFromUrl(asset.url, asset.name);
            },
          },
        ];
      }

      return [];
    }

    if (isArchived) {
      return [
        ...(asset.type === 'folder'
          ? [
              {
                label: 'Restore folder',
                icon: 'update' as const,
                onClick: () => {
                  setSelectedAssetId?.(asset.id);
                  setIsRestoreModalOpen(true);
                },
              },
              {
                label: 'Delete folder',
                icon: 'trash' as const,
                color: 'danger' as const,
                onClick: () => {
                  setSelectedAssetId?.(asset.id);
                  setIsDeleteModalOpen(true);
                },
              },
            ]
          : [
              {
                label: 'Restore file',
                icon: 'update' as const,
                onClick: () => {
                  setSelectedAssetId?.(asset.id);
                  setIsRestoreModalOpen(true);
                },
              },
              {
                label: 'Delete file',
                icon: 'trash' as const,
                color: 'danger' as const,
                onClick: () => {
                  setSelectedAssetId?.(asset.id);
                  setIsDeleteModalOpen(true);
                },
              },
            ]),
      ];
    }

    return [
      {
        label: 'Rename',
        icon: 'edit' as const,
        onClick: () => {
          setSelectedAssetId?.(asset.id);
          setIsRenameModalOpen(true);
        },
      },
      {
        label: 'Move to...',
        icon: 'arrowRight' as const,
        onClick: () => {
          setSelectedAssetId?.(asset.id);
          setIsMoveToModalOpen(true);
        },
      },
      ...(asset.type === 'folder'
        ? [
            {
              label: 'Archive folder',
              icon: 'trash' as const,
              color: 'danger' as const,
              onClick: () => {
                setSelectedAssetId?.(asset.id);
                setIsArchiveModalOpen(true);
              },
            },
          ]
        : [
            {
              label: 'Download',
              icon: 'download' as const,
              onClick: () => {
                downloadFromUrl(asset.url, asset.name);
              },
            },
            {
              label: 'Archive file',
              icon: 'trash' as const,
              color: 'danger' as const,
              onClick: () => {
                setSelectedAssetId?.(asset.id);
                setIsArchiveModalOpen(true);
              },
            },
          ]),
    ];
  };

  return (
    <AssetContext.Provider
      value={{ getAssetActions, asset: selectedAsset as ProjectFolderDto | ProjectFileDto, isProjectOwner }}
    >
      {children}
      <RenameAssetModal
        projectId={projectId}
        asset={selectedAsset}
        isOpen={isRenameModalOpen}
        onClose={() => setIsRenameModalOpen(false)}
      />
      <ArchiveAssetModal
        projectId={projectId}
        asset={selectedAsset}
        isOpen={isArchiveModalOpen}
        onClose={() => setIsArchiveModalOpen(false)}
      />
      <MoveToModal
        asset={selectedAsset}
        project={project}
        isOpen={isMoveToModalOpen}
        onClose={() => setIsMoveToModalOpen(false)}
      />
      <DeleteAssetModal
        projectId={projectId}
        asset={selectedAsset}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
      <RestoreAssetModal
        projectId={projectId}
        asset={selectedAsset}
        isOpen={isRestoreModalOpen}
        onClose={() => setIsRestoreModalOpen(false)}
      />
    </AssetContext.Provider>
  );
};
