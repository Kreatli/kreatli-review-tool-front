import { Button, Chip, Popover, PopoverContent, PopoverTrigger } from '@heroui/react';
import { useMemo, useState } from 'react';

import { useAssetContext } from '../../../contexts/Asset';
import { FileDto, StackDto } from '../../../services/types';
import { Icon } from '../../various/Icon';
import { ReviewToolHeaderVersion } from './ReviewToolHeaderVersion';

interface Props {
  file: FileDto;
  stack: StackDto;
  onSwitchFile?: (file: FileDto) => void;
}

export const ReviewToolHeaderVersions = ({ file, stack, onSwitchFile }: Props) => {
  const { getAssetActions } = useAssetContext();

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const actions = useMemo(() => getAssetActions(stack), [stack, getAssetActions]);

  const manageVersionAction = actions.find((action) => action.key === 'manageVersions');

  const version = useMemo(() => {
    return stack.files.findIndex((f) => f.id === file.id) + 1;
  }, [file.id, stack.files]);

  const handleManageVersionsClick = () => {
    manageVersionAction?.onClick();
    setIsPopoverOpen(false);
  };

  return (
    <Popover isOpen={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger>
        <Chip className="cursor-pointer bg-foreground text-content1">v{version}</Chip>
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
            {[...stack.files].reverse().map((stackFile, index) => (
              <ReviewToolHeaderVersion
                key={stackFile.id}
                isActive={stackFile.id === stack.active?.id}
                isSelected={stackFile.id === file.id}
                file={stackFile}
                version={stack.files.length - index}
                onClick={() => onSwitchFile?.(stackFile)}
              />
            ))}
          </div>
          {/* <div className="p-2 px-0 pt-4">
            <Button size="sm" variant="flat" onClick={handleManageVersionsClick}>
              <Icon icon="versions" size={16} />
              Manage versions
            </Button>
          </div> */}
        </div>
      </PopoverContent>
    </Popover>
  );
};
