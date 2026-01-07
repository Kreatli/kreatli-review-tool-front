/* eslint-disable @typescript-eslint/indent */
import { addToast, MenuItemProps } from '@heroui/react';
import React from 'react';

import { ArchiveAssetModal } from '../../components/asset/AssetModals/ArchiveAssetModal';
import { DeleteAssetModal } from '../../components/asset/AssetModals/DeleteAssetModal';
import { MoveToModal } from '../../components/asset/AssetModals/MoveToModal';
import { RenameAssetModal } from '../../components/asset/AssetModals/RenameAssetModal';
import { RestoreAssetModal } from '../../components/asset/AssetModals/RestoreAssetModal';
import { IconType } from '../../components/various/Icon';
import { ProjectDto, ProjectFileDto, ProjectFolderDto } from '../../services/types';
import { downloadFromUrl } from '../../utils/download';
import { getAssetFileIdDownload } from '../../services/services';
import { ShareAssetModal } from '../../components/asset/AssetModals/ShareAssetModal';

interface Context {
  getAssetActions: (asset: ProjectFileDto | ProjectFolderDto) => {
    label: string;
    icon: IconType;
    showDivider?: boolean;
    color?: MenuItemProps['color'];
    onClick: () => void;
  }[];
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
  const [isShareModalOpen, setIsShareModalOpen] = React.useState(false);

  const getAssetActions = (asset: ProjectFolderDto | ProjectFileDto) => {
    const shareAction = {
      label: 'Share',
      icon: 'share' as const,
      onClick: async () => {
        setSelectedAssetId?.(asset.id);
        setIsShareModalOpen(true);
      },
    };

    const moveToAction = {
      label: 'Move to...',
      icon: 'arrowRight' as const,
      onClick: () => {
        setSelectedAssetId?.(asset.id);
        setIsMoveToModalOpen(true);
      },
    };

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
                label: 'Delete forever',
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
                label: 'Delete forever',
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
      ...(asset.type === 'file' ? [shareAction] : []),
      moveToAction,
      ...(asset.type === 'folder'
        ? [
            {
              label: 'Delete folder',
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
              onClick: async () => {
                try {
                  const assetUrl = await getAssetFileIdDownload(asset.id, { shareableLinkId: '' });

                  downloadFromUrl(assetUrl, asset.name);
                } catch {
                  addToast({
                    title: 'Failed to download file. Please try again later.',
                    variant: 'flat',
                    color: 'danger',
                  });
                }
              },
            },
            {
              label: 'Delete file',
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
    <AssetContext.Provider value={{ getAssetActions }}>
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
      <ShareAssetModal asset={selectedAsset} isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} />
    </AssetContext.Provider>
  );
};
