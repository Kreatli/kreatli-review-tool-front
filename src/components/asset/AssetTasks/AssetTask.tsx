import { Avatar, Chip } from '@heroui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { TaskInfoDto } from '../../../services/types';
import { Icon } from '../../various/Icon';

interface Props {
  projectId: string;
  task: TaskInfoDto;
}

export const AssetTask = ({ task }: Props) => {
  const router = useRouter();
  const [pathname, query] = router.asPath.split('?');
  const params = new URLSearchParams(query || '');
  params.set('taskId', task.id);
  const href = `${pathname}?${params.toString()}`;

  return (
    <div className="relative flex flex-col gap-2 rounded-small bg-foreground-50 p-2.5 shadow-small">
      <div className="-m-1 flex items-center gap-1">
        <Chip size="sm" variant="flat" className="h-auto p-0.5">
          {task.statusLabel || 'Unplaced'}
        </Chip>
        {task.isHidden ||
          (true && (
            <Chip
              size="sm"
              variant="flat"
              className="h-auto p-0.5"
              startContent={<Icon icon="eyeCrossed" size={12} className="mx-1" />}
            >
              Only visible to you
            </Chip>
          ))}
      </div>
      <Link href={href} replace className="z-10 text-small font-semibold after:absolute after:inset-0">
        {task.name}
      </Link>
      <div className="flex items-center justify-between gap-1 overflow-hidden text-foreground">
        {task.owner && (
          <div className="flex items-center gap-1.5 truncate text-xs">
            <Avatar
              src={task.owner.avatar?.url}
              className="size-5 shrink-0"
              name={task.owner.name}
              getInitials={(name) => name.charAt(0)}
            />
            {task.owner.name}
          </div>
        )}
        {task.commentCount > 0 && (
          <div className="flex items-center gap-1 text-xs text-foreground-500">
            <Icon icon="chat" size={16} />
            {task.commentCount}
          </div>
        )}
      </div>
    </div>
  );
};
