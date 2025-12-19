import { AssetDto, FolderDto, ProjectDto, ProjectMemberDto } from '../../../services/types';
import { DashboardAsset } from './DashboardAsset';
import { DashboardFolder } from './DashboardFolder';

interface Props {
  project: ProjectDto;
  files: AssetDto[];
  folders: FolderDto[];
  members: ProjectMemberDto[];
}

export const DashboardAssetsList = ({ project, files, folders, members }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      {folders.length > 0 && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 gap-y-2">
          {folders.map((folder) => (
            <DashboardFolder key={folder.id} folder={folder} projectId={project.id} />
          ))}
        </div>
      )}
      <div className="grid grid-rows-1 auto-rows-[0] overflow-hidden grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-x-4">
        {files.map((file) => (
          <DashboardAsset key={file.id} project={project} file={file} members={members} />
        ))}
      </div>
    </div>
  );
};
