import { Button, Chip, cn, Popover, PopoverContent, PopoverTrigger } from '@heroui/react';
import { useMemo, useState } from 'react';

import { useAssetContext } from '../../../contexts/Asset';
import { FileDto, StackDto } from '../../../services/types';
import { Icon } from '../../various/Icon';
import { ReviewToolHeaderVersion } from './ReviewToolHeaderVersion';

interface Props {
  file: FileDto;
  stack: StackDto;
  isCompareMode?: boolean;
  onSwitchFile?: (file: FileDto) => void;
}

export const ReviewToolHeaderVersions = ({ file, stack, isCompareMode = false, onSwitchFile }: Props) => {
  const { getAssetActions } = useAssetContext();

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const actions = useMemo(() => getAssetActions(stack), [stack, getAssetActions]);

  const manageVersionAction = actions.find((action) => action.key === 'manageVersions');

  const handleManageVersionsClick = () => {
    manageVersionAction?.onClick();
    setIsPopoverOpen(false);
  };

  return (
    <Popover isOpen={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger>
        <Chip
          variant={isCompareMode ? 'flat' : 'solid'}
          className={cn('cursor-pointer', {
            'bg-foreground text-content1': !isCompareMode,
            'pointer-events-none': isCompareMode,
          })}
        >
          v{file.stackVersion}
        </Chip>
      </PopoverTrigger>
      <PopoverContent className="w-full max-w-[90vw] pb-3 sm:min-w-96 sm:max-w-md">
        <div className="w-full">
          <div className="flex items-center justify-between p-2 pr-0">
            <div className="text-medium font-semibold">Versions</div>
            <Button size="sm" variant="flat" onClick={handleManageVersionsClick}>
              <Icon icon="versions" size={16} />
              Manage
            </Button>
          </div>
          <div className="w-full">
            {[...stack.files].reverse().map((stackFile) => (
              <ReviewToolHeaderVersion
                key={stackFile.id}
                isActive={stackFile.id === stack.active?.id}
                isSelected={stackFile.id === file.id}
                file={stackFile}
                onClick={() => onSwitchFile?.(stackFile)}
              />
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
