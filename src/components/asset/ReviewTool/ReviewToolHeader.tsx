import { Button, cn, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import NextLink from 'next/link';
import React, { useMemo } from 'react';

import { useAssetContext } from '../../../contexts/Asset';
import { AssetDto, FileDto, ProjectDto } from '../../../services/types';
import { formatBytes } from '../../../utils/formatBytes';
import { Icon } from '../../various/Icon';
import { ProjectFileAssignee } from '../../project/ProjectAssets/ProjectFile/ProjectFileAssignee';
import { ProjectFileStatus } from '../../project/ProjectAssets/ProjectFile/ProjectFileStatus';
import { AssetPicker } from '../AssetPicker';
import { useRouter } from 'next/router';

interface Props {
  file: FileDto;
  project: ProjectDto;
  isActive?: boolean;
  isCompareMode?: boolean;
  onClick?: () => void;
  onClose?: () => void;
}

export const ReviewToolHeader = ({ file, project, isActive, isCompareMode, onClick, onClose }: Props) => {
  const { getAssetActions } = useAssetContext();
  const router = useRouter();
  const actions = useMemo(() => getAssetActions(file), [file, getAssetActions]);

  const handleBack = () => {
    router.back();
  };

  const path = useMemo(() => {
    return [project.name, ...file.path.map((folder) => folder.name)];
  }, [file.path, project.name]);

  const handleCompareSelect = (asset: AssetDto) => {
    router.replace(`${location.pathname}?compareFileId=${asset.id}`);
  };

  const shareAction = useMemo(() => {
    return actions.find((action) => action.icon === 'share');
  }, [actions]);

  return (
    <div
      className={cn('flex flex-1 items-center gap-4 overflow-hidden bg-foreground-50 p-3 transition-colors', {
        'bg-primary-100': isActive,
        'cursor-pointer': isCompareMode,
      })}
      onClick={onClick}
    >
      <div className="flex flex-1 items-center gap-2 overflow-hidden pl-1">
        {!isCompareMode && (
          <Button
            size="sm"
            variant="light"
            radius="full"
            startContent={<Icon icon="chevronDown" className="rotate-90" size={20} />}
            isIconOnly
            onClick={handleBack}
          />
        )}
        <ProjectFileAssignee
          isDisabled={project.status !== 'active'}
          projectId={project.id}
          file={file}
          members={project.members}
        />
        <div className="ml-2 overflow-hidden">
          <div className="flex items-center gap-2">
            <span className={cn('truncate font-semibold transition-colors', { 'text-primary': isActive })}>
              {file.name}
            </span>
            <span className={cn('whitespace-nowrap text-sm text-foreground-500', { 'text-foreground-600': isActive })}>
              {formatBytes(file.fileSize)}
            </span>
          </div>
          <div className="flex items-center text-foreground-400">
            {path.map((pathName, index) => (
              <div
                key={index}
                className={cn('flex items-center text-xs', { 'overflow-hidden': index !== path.length - 1 })}
              >
                {index !== 0 && <Icon icon="chevronDown" className="shrink-0 rotate-90" size={14} />}
                <div className={cn({ truncate: index !== path.length - 1 })}>{pathName}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {!isCompareMode && (
        <Button size="sm" variant="flat" onClick={shareAction?.onClick}>
          <Icon icon="share" size={18} />
          {shareAction?.label}
        </Button>
      )}
      {!isCompareMode && (
        <AssetPicker projectId={project.id} skipIds={[file.id]} onSelect={handleCompareSelect}>
          <Button size="sm" variant="flat" color="primary">
            <Icon icon="compare" size={18} />
            Compare
          </Button>
        </AssetPicker>
      )}
      <ProjectFileStatus
        isDisabled={project.status !== 'active'}
        projectId={project.id}
        statuses={project.assetStatuses}
        file={file}
      />
      {isCompareMode ? (
        <Button
          size="sm"
          variant="flat"
          radius="full"
          startContent={<Icon icon="cross" size={20} />}
          isIconOnly
          onClick={onClose}
        />
      ) : (
        <div>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button
                startContent={<Icon icon="dots" />}
                isDisabled={project.status !== 'active'}
                radius="full"
                isIconOnly
                variant="flat"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="File actions" variant="flat">
              {actions.map((action, index) => (
                <DropdownItem
                  key={index}
                  startContent={<Icon icon={action.icon} size={16} />}
                  color={action.color}
                  onPress={action.onClick}
                >
                  {action.label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      )}
    </div>
  );
};
