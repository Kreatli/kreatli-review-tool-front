import { addToast, MenuItemProps } from '@heroui/react';
import React from 'react';

import { ArchiveAssetModal } from '../../components/asset/AssetModals/ArchiveAssetModal';
import { DeleteAssetModal } from '../../components/asset/AssetModals/DeleteAssetModal';
import { ManageVersionsModal } from '../../components/asset/AssetModals/ManageVersionsModal/ManageVersionsModal';
import { MoveToModal } from '../../components/asset/AssetModals/MoveToModal';
import { RenameAssetModal } from '../../components/asset/AssetModals/RenameAssetModal';
import { RestoreAssetModal } from '../../components/asset/AssetModals/RestoreAssetModal';
import { ShareAssetModal } from '../../components/asset/AssetModals/ShareAssetModal';
import { IconType } from '../../components/various/Icon';
import { getAssetFileIdDownload } from '../../services/services';
import { ProjectDto, ProjectFileDto, ProjectFolderDto, ProjectStackDto } from '../../services/types';
import { downloadFromUrl } from '../../utils/download';
import { useProjectUploadContext } from '../Project/ProjectUploadContext';

interface Context {
  getAssetActions: (asset: ProjectFileDto | ProjectFolderDto | ProjectStackDto) => {
    key: string;
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
  selectedAsset: ProjectFileDto | ProjectFolderDto | ProjectStackDto | undefined;
  stackSelectedFile?: ProjectFileDto;
  setSelectedAssetId?: (id: string) => void;
  project: ProjectDto;
}

export const AssetContextProvider = ({
  children,
  isArchived = false,
  projectId,
  selectedAsset,
  stackSelectedFile,
  setSelectedAssetId,
  project,
}: React.PropsWithChildren<Props>) => {
  const [isRenameModalOpen, setIsRenameModalOpen] = React.useState(false);
  const [isMoveToModalOpen, setIsMoveToModalOpen] = React.useState(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [isRestoreModalOpen, setIsRestoreModalOpen] = React.useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = React.useState(false);
  const [isManageVersionsModalOpen, setIsManageVersionsModalOpen] = React.useState(false);

  const { openFileDialog, setStackId, setStackWithFileId } = useProjectUploadContext();

  const getAssetActions = (asset: ProjectFolderDto | ProjectFileDto | ProjectStackDto) => {
    const shareAction = {
      key: 'share',
      label: 'Share',
      icon: 'share' as const,
      onClick: async () => {
        setSelectedAssetId?.(asset.id);
        setIsShareModalOpen(true);
      },
    };

    const moveToAction = {
      key: 'moveTo',
      label: 'Move to...',
      icon: 'arrowRight' as const,
      onClick: () => {
        setSelectedAssetId?.(asset.id);
        setIsMoveToModalOpen(true);
      },
    };

    const renameAction = {
      key: 'rename',
      label: 'Rename',
      icon: 'edit' as const,
      onClick: () => {
        setSelectedAssetId?.(asset.id);
        setIsRenameModalOpen(true);
      },
    };

    const downloadAction = {
      key: 'download',
      label: 'Download',
      icon: 'download' as const,
      onClick: async () => {
        try {
          const assetUrl = await getAssetFileIdDownload(
            asset.type === 'stack' ? (stackSelectedFile?.id ?? asset.active?.id ?? asset.id) : asset.id,
            { shareableLinkId: '' },
          );

          downloadFromUrl(assetUrl, asset.name);
        } catch {
          addToast({
            title: 'Failed to download file. Please try again later.',
            variant: 'flat',
            color: 'danger',
          });
        }
      },
    };

    if (isArchived) {
      return [
        {
          key: 'restore',
          label: 'Restore',
          icon: 'update' as const,
          onClick: () => {
            setSelectedAssetId?.(asset.id);
            setIsRestoreModalOpen(true);
          },
        },
        {
          key: 'deleteForever',
          label: 'Delete forever',
          icon: 'trash' as const,
          color: 'danger' as const,
          onClick: () => {
            setSelectedAssetId?.(asset.id);
            setIsDeleteModalOpen(true);
          },
        },
      ];
    }

    const uploadNewVersionAction = {
      key: 'uploadNewVersion',
      label: 'Upload new version',
      icon: 'upload' as const,
      showDivider: asset.type === 'stack',
      onClick: () => {
        if (asset.type === 'stack') {
          setStackId(asset.id);
        } else {
          setStackWithFileId(asset.id);
        }

        openFileDialog();
      },
    };

    const manageVersionAction = {
      key: 'manageVersions',
      label: 'Manage versions',
      icon: 'versions' as const,
      onClick: () => {
        setSelectedAssetId?.(asset.id);
        setIsManageVersionsModalOpen(true);
      },
    };

    return [
      renameAction,
      ...(asset.type !== 'folder' ? [shareAction, downloadAction, uploadNewVersionAction] : []),
      ...(asset.type === 'stack' ? [manageVersionAction] : []),
      moveToAction,
      {
        key: 'delete',
        label: 'Delete',
        icon: 'trash' as const,
        color: 'danger' as const,
        onClick: () => {
          setSelectedAssetId?.(asset.id);
          setIsArchiveModalOpen(true);
        },
      },
    ];
  };

  return (
    <AssetContext.Provider value={{ getAssetActions }}>
      {children}
      <RenameAssetModal
        projectId={projectId}
        asset={selectedAsset?.type === 'stack' ? (stackSelectedFile ?? selectedAsset.active) : selectedAsset}
        stackId={selectedAsset?.type === 'stack' ? selectedAsset.id : undefined}
        isOpen={isRenameModalOpen}
        onClose={() => setIsRenameModalOpen(false)}
      />
      <ShareAssetModal
        asset={selectedAsset?.type === 'stack' ? (stackSelectedFile ?? selectedAsset.active) : selectedAsset}
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
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
      <ManageVersionsModal
        projectId={projectId}
        stack={selectedAsset?.type === 'stack' ? selectedAsset : undefined}
        isOpen={isManageVersionsModalOpen}
        onClose={() => setIsManageVersionsModalOpen(false)}
      />
    </AssetContext.Provider>
  );
};
