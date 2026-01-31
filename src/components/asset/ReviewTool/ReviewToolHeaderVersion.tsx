import { Chip, cn } from '@heroui/react';

import { FileDto } from '../../../services/types';
import { formatBytes } from '../../../utils/formatBytes';
import { ManageVersionsItemPlaceholder } from '../AssetModals/ManageVersionsModal/ManageVersionsItemPlaceholder';

interface Props {
  file: FileDto;
  isActive: boolean;
  isSelected: boolean;
  onClick: () => void;
}

export const ReviewToolHeaderVersion = ({ file, isActive, isSelected, onClick }: Props) => {
  return (
    <div
      className={cn('relative flex items-center gap-2 rounded-medium p-1 px-2 hover:bg-foreground-50', {
        'border border-foreground-200 bg-foreground-100 hover:bg-foreground-100': isSelected,
      })}
    >
      <div>
        <Chip size="sm" className="bg-foreground text-content1">
          v{file.stackVersion}
        </Chip>
      </div>
      <div>
        <ManageVersionsItemPlaceholder file={file} />
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="overflow-hidden text-ellipsis whitespace-nowrap font-semibold">{file.name}</div>
        <div className="text-xs text-foreground-500">{formatBytes(file.fileSize)}</div>
      </div>
      {isActive && (
        <Chip size="sm" variant="flat">
          Active
        </Chip>
      )}
      <button type="button" className="h-0 w-0 opacity-0 after:absolute after:inset-0" onClick={onClick}>
        View
      </button>
    </div>
  );
};
