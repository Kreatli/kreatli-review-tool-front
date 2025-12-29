import Link from 'next/link';
import { FolderDto } from '../../../services/types';
import { Icon } from '../../various/Icon';

interface Props {
  projectId: string;
  folder: FolderDto;
}

export const DashboardFolder = ({ projectId, folder }: Props) => {
  return (
    <div className="relative flex items-center gap-2 rounded-medium border border-foreground-200 bg-foreground-100 p-2 px-3 transition-all hover:border-foreground-400">
      <Icon icon="folder" size={20} className="shrink-0 text-foreground-500" />
      <Link
        href={`/project/${projectId}/assets/folder/${folder.id}`}
        className="truncate text-small font-semibold after:absolute after:inset-0"
      >
        {folder.name}
      </Link>
    </div>
  );
};
