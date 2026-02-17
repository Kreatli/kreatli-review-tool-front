import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { useProjectContext } from '../../../contexts/Project';
import { ProjectDto } from '../../../services/types';
import { formatRelativeTime } from '../../../utils/dates';
import { formatBytes } from '../../../utils/formatBytes';
import { Icon } from '../../various/Icon';
import { ProjectStatus } from '../Project/ProjectStatus';
import { ProjectMembersThumbnails } from '../ProjectMembers';
import { ProjectCardImage } from './ProjectCardImage';

interface Props {
  project: ProjectDto;
  onSelectProjectId?: (projectId: string) => void;
}

export const ProjectCard = ({ project, onSelectProjectId }: Props) => {
  const router = useRouter();
  const { getProjectActions } = useProjectContext();

  const handleClick = () => {
    router.push(`/project/${project.id}`);
  };

  const projectActions = useMemo(() => getProjectActions(project), [getProjectActions, project]);

  return (
    <div className="group/card relative flex flex-col">
      <button
        type="button"
        aria-label={`Open project ${project.name}`}
        className="absolute-cursor rounded-2xl border border-foreground-300 p-px outline-offset-2 outline-focus transition-all group-hover/card:border-foreground-500 group-hover/card:opacity-70"
        onClick={handleClick}
      >
        <ProjectCardImage image={project.cover} alt={`${project.name} project cover`} />
      </button>
      <div className="pointer-events-none absolute left-2 right-2 top-1 flex items-center justify-between gap-2">
        <ProjectStatus status={project.status} />
        {projectActions.length > 0 && (
          <Dropdown>
            <DropdownTrigger>
              <Button
                type="button"
                size="sm"
                isIconOnly
                radius="full"
                isDisabled={!project.createdBy?.subscription.isActive}
                className="pointer-events-auto mt-1"
                variant="faded"
                aria-label={`Open project ${project.name} options`}
                onClick={() => {
                  onSelectProjectId?.(project.id);
                }}
              >
                <Icon icon="dots" size={20} />
              </Button>
            </DropdownTrigger>
            <DropdownMenu variant="flat">
              {projectActions.map((action) => (
                <DropdownItem
                  key={action.label}
                  color={action.color}
                  showDivider={action.showDivider}
                  startContent={<Icon icon={action.icon} size={16} />}
                  onPress={action.onClick}
                >
                  {action.label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        )}
      </div>
      <div className="mt-4 flex justify-between gap-4 px-2">
        <div className="select-none overflow-hidden">
          <h3 className="line-clamp-2 text-lg font-semibold underline-offset-2 group-hover/card:underline">
            {project.name}
          </h3>
          <div>
            {project.fileCount} items, {formatBytes(project.totalFileSize)}
          </div>
          <div className="text-sm text-foreground-500">
            Last modified {formatRelativeTime(project.updatedAt ?? project.createdAt)}
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="pointer-events-none p-1">
            <ProjectMembersThumbnails members={project.members} />
          </div>
        </div>
      </div>
    </div>
  );
};
