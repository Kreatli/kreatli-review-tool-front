import { Button, cn, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import NextLink from 'next/link';
import React, { useMemo } from 'react';

import { useAssetContext } from '../../../contexts/Asset';
import { useSession } from '../../../hooks/useSession';
import { AssetDto, FileDto, ProjectDto } from '../../../services/types';
import { formatBytes } from '../../../utils/formatBytes';
import { Icon } from '../../various/Icon';
import { ProjectFileAssignee } from '../../project/ProjectAssets/ProjectFile/ProjectFileAssignee';
import { ProjectFileStatus } from '../../project/ProjectAssets/ProjectFile/ProjectFileStatus';
import { AssetPicker } from '../AssetPicker';
import { useFileContext } from '../../../contexts/File';
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
  const { user } = useSession();
  const router = useRouter();
  const actions = useMemo(() => getAssetActions(file), [file, getAssetActions]);

  const parentPath = useMemo(() => {
    if (!file.parent) {
      return `/project/${project.id}`;
    }

    return `/project/${project.id}/assets/folder/${file.parent.id}`;
  }, [file.parent, project.id]);

  const path = useMemo(() => {
    return [project.name, ...file.path.map((folder) => folder.name)];
  }, [file.path, project.name]);

  const memberRole = useMemo(() => {
    return project.members.find((member) => member.user?.id === user?.id)?.role;
  }, [project.members, user?.id]);

  const handleCompareSelect = (asset: AssetDto) => {
    router.push(`${location.pathname}?compareFileId=${asset.id}`);
  };

  return (
    <div
      className={cn('flex flex-1 items-center gap-4 transition-colors bg-foreground-50 p-3 overflow-hidden', {
        'bg-primary-100': isActive,
        'cursor-pointer': !!onClick,
      })}
      onClick={onClick}
    >
      <div className="flex-1 flex items-center gap-2 pl-1 overflow-hidden">
        {!isCompareMode && (
          <Button
            as={NextLink}
            href={parentPath}
            size="sm"
            variant="light"
            radius="full"
            startContent={<Icon icon="chevronDown" className="rotate-90" size={20} />}
            isIconOnly
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
            <span className={cn('font-semibold truncate transition-colors', { 'text-primary': isActive })}>
              {file.name}
            </span>
            <span className={cn('text-sm text-foreground-500 whitespace-nowrap', { 'text-foreground-600': isActive })}>
              {formatBytes(file.fileSize)}
            </span>
          </div>
          <div className="flex items-center text-foreground-400">
            {path.map((pathName, index) => (
              <div key={index} className="flex items-center text-xs">
                {index !== 0 && <Icon icon="chevronDown" className="rotate-90" size={14} />}
                <div>{pathName}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
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
        file={file}
        memberRole={memberRole}
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
