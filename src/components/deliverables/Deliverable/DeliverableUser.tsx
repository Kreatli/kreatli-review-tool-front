import { Avatar } from '@heroui/react';

import { UserDto } from '../../../services/types';

interface Props {
  user: UserDto;
}

export const DeliverableUser = ({ user }: Props) => {
  return (
    <div className="flex w-full items-center gap-2 rounded-medium bg-foreground-100 p-2">
      <Avatar src={user.avatar?.url} size="sm" name={user.name} getInitials={(name) => name.charAt(0).toUpperCase()} />
      <div>
        <div className="text-small font-semibold">{user.name}</div>
        <div className="text-tiny text-foreground-500">{user.email}</div>
      </div>
    </div>
  );
};
