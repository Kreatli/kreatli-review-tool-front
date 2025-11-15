import Link from 'next/link';
import { FolderDto } from '../../../services/types';
import { Icon } from '../../various/Icon';

interface Props {
  projectId: string;
  folder: FolderDto;
}

export const DashboardFolder = ({ projectId, folder }: Props) => {
  return (
    <div className="bg-foreground-100 border border-foreground-200 transition-all p-2 px-3 rounded-medium flex items-center gap-2 relative hover:border-foreground-400">
      <Icon icon="folder" size={20} className="text-foreground-500" />
      <Link
        href={`/project/${projectId}/assets/folder/${folder.id}`}
        className="text-small after:absolute after:inset-0"
      >
        {folder.name}
      </Link>
    </div>
  );
};
