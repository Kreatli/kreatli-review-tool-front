import { Button, Popover, PopoverContent, PopoverTrigger, Tooltip } from '@heroui/react';
import React from 'react';

import { ProjectMemberDto } from '../../../../services/types';
import { Icon } from '../../../various/Icon';

interface Props {
  onRemove: () => void;
  onResendInvite: () => void;
  layout?: 'table' | 'card';
  isDisabled?: boolean;
  member: ProjectMemberDto;
}

export const ProjectMemberActions = ({ onRemove, onResendInvite, layout = 'table', isDisabled, member }: Props) => {
  const [isRemovePopoverOpen, setIsRemovePopoverOpen] = React.useState(false);

  return (
    <div className="flex justify-end gap-2">
      {member.status !== 'joined' && (
        <Tooltip content="Resend invitation" isDisabled={layout === 'card'}>
          <Button
            isIconOnly={layout === 'table'}
            size="sm"
            variant={layout === 'table' ? 'light' : 'flat'}
            radius={layout === 'table' ? 'full' : 'sm'}
            isDisabled={isDisabled}
            onClick={onResendInvite}
          >
            <Icon icon="update" size={18} />
            {layout === 'card' && 'Resend invitation'}
          </Button>
        </Tooltip>
      )}
      {member.role === 'contributor' && member.status !== 'removed' && member.status !== 'left' && (
        <Popover
          placement="bottom-end"
          backdrop="opaque"
          isOpen={isRemovePopoverOpen}
          onOpenChange={setIsRemovePopoverOpen}
        >
          <PopoverTrigger>
            <Button
              isIconOnly={layout === 'table'}
              size="sm"
              variant={layout === 'table' ? 'light' : 'flat'}
              radius={layout === 'table' ? 'full' : 'sm'}
              className={layout === 'table' ? 'text-foreground hover:text-danger' : ''}
              color="danger"
              isDisabled={isDisabled}
            >
              <Icon icon="trash" size={18} />
              {layout === 'card' && 'Remove'}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex flex-col gap-4 p-2">
              <div className="max-w-80 text-medium font-medium">
                Are you sure you want to remove {member.user?.name ?? member.email} from the project?
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="light" onClick={() => setIsRemovePopoverOpen(false)}>
                  Cancel
                </Button>
                <Button
                  color="danger"
                  variant="flat"
                  onClick={() => {
                    onRemove();
                    setIsRemovePopoverOpen(false);
                  }}
                >
                  Remove
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};
