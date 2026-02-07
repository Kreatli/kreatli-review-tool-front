import { Button, Chip, Popover, PopoverContent, PopoverTrigger, Tooltip } from '@heroui/react';
import { useMemo, useState } from 'react';

import { useAssetContext } from '../../../contexts/Asset';
import { FileDto, StackDto } from '../../../services/types';
import { Icon } from '../../various/Icon';
import { ReviewToolHeaderVersion } from './ReviewToolHeaderVersion';

interface Props {
  file: FileDto;
  stack: StackDto;
  size?: 'sm' | 'md';
  isCompareMode?: boolean;
  onSwitchFile?: (file: FileDto) => void;
}

export const ReviewToolHeaderVersions = ({ file, stack, size = 'md', isCompareMode = false, onSwitchFile }: Props) => {
  const { getAssetActions } = useAssetContext();

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const actions = useMemo(() => getAssetActions(stack), [stack, getAssetActions]);

  const manageVersionAction = actions.find((action) => action.key === 'manageVersions');

  const handleManageVersionsClick = () => {
    manageVersionAction?.onClick();
    setIsPopoverOpen(false);
  };

  if (isCompareMode) {
    return (
      <Tooltip content="You can't switch versions while comparing files" delay={0} closeDelay={0}>
        <Chip size={size} variant="flat">
          v{file.stackVersion}
        </Chip>
      </Tooltip>
    );
  }

  return (
    <Popover isOpen={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger>
        <Chip size={size} className="cursor-pointer bg-foreground text-content1">
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
