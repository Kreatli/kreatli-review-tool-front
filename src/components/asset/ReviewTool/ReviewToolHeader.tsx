import { Button, Chip, cn, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';

import { useAssetContext } from '../../../contexts/Asset';
import { AssetDto, FileDto, ProjectDto, StackDto } from '../../../services/types';
import { formatBytes } from '../../../utils/formatBytes';
import { ProjectFileAssignee } from '../../project/ProjectAssets/ProjectFile/ProjectFileAssignee';
import { ProjectFileStatus } from '../../project/ProjectAssets/ProjectFile/ProjectFileStatus';
import { Icon } from '../../various/Icon';
import { AssetPicker } from '../AssetPicker';
import { ReviewToolHeaderVersions } from './ReviewToolHeaderVersions';
import { ReviewToolSafeZonesModal } from './ReviewToolSafeZonesModal';

interface Props {
  file: FileDto;
  project: ProjectDto;
  stack?: StackDto;
  isActive?: boolean;
  isCompareMode?: boolean;
  onClick?: () => void;
  onClose?: () => void;
  onSwitchFile?: (file: FileDto) => void;
}

export const ReviewToolHeader = ({
  file,
  project,
  stack,
  isActive,
  isCompareMode,
  onClick,
  onClose,
  onSwitchFile,
}: Props) => {
  const { getAssetActions } = useAssetContext();
  const router = useRouter();
  const actions = useMemo(() => getAssetActions(stack ?? file), [file, stack, getAssetActions]);

  const [isSafeZonesModalOpen, setIsSafeZonesModalOpen] = useState(false);

  const handleBack = () => {
    if (window.history.length <= 1) {
      router.push(`/project/${project.id}/assets`);

      return;
    }

    router.back();
  };

  const openSafeZoneCheckerModal = () => {
    setIsSafeZonesModalOpen(true);
  };

  const path = useMemo(() => {
    return [project.name, ...file.path.map((folder) => folder.name)];
  }, [file.path, project.name]);

  const handleCompareSelect = (asset: AssetDto) => {
    const params = new URLSearchParams(location.search);

    params.set('compareFileId', asset.id);

    router.replace(`${location.pathname}?${params.toString()}`);
  };

  return (
    <div
      className={cn('flex flex-1 items-center gap-4 overflow-hidden bg-foreground-50 p-3 transition-colors', {
        'bg-primary-50': isActive,
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
        {stack && (
          <ReviewToolHeaderVersions
            file={file}
            isCompareMode={isCompareMode}
            stack={stack}
            onSwitchFile={onSwitchFile}
          />
        )}
        {!stack && file.stackVersion && file.stackVersion >= 0 && <Chip variant="flat">v{file.stackVersion}</Chip>}
      </div>
      {!isCompareMode && (
        <Button size="sm" variant="flat" onClick={openSafeZoneCheckerModal}>
          <Icon icon="mobile" size={18} />
          Safe Zones
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
              {actions.map((action) => (
                <DropdownItem
                  key={action.key}
                  showDivider={action.showDivider}
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
      <ReviewToolSafeZonesModal
        isOpen={isSafeZonesModalOpen}
        onClose={() => setIsSafeZonesModalOpen(false)}
        file={file}
      />
    </div>
  );
};
