import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';

import { useProjectContext } from '../../../contexts/Project';
import { ProjectDto } from '../../../services/types';
import { formatRelativeTime } from '../../../utils/dates';
import { formatBytes } from '../../../utils/formatBytes';
import { Icon } from '../../various/Icon';
import { ProjectMembersThumbnails } from '../ProjectMembers';
import { ProjectCardImage } from './ProjectCardImage';
import { ProjectStatus } from '../Project/ProjectStatus';

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

  const projectActions = useMemo(
    () => getProjectActions(project).filter((action) => !action.hideInCard),
    [getProjectActions, project],
  );

  return (
    <div className="group/card relative flex flex-col">
      <button
        type="button"
        aria-label={`Open project ${project.name}`}
        className="absolute-cursor group-hover/card:opacity-70 group-hover/card:border-foreground-500 transition-all border border-foreground-300 p-px rounded-2xl outline-focus outline-offset-2"
        onClick={handleClick}
      >
        <ProjectCardImage image={project.cover} />
      </button>
      <div className="absolute top-1 left-2 right-2 flex pointer-events-none justify-between items-center gap-2">
        <ProjectStatus status={project.status} />
        {projectActions.length > 0 && (
          <Dropdown>
            <DropdownTrigger>
              <Button
                type="button"
                size="sm"
                isIconOnly
                radius="full"
                className="mt-1 pointer-events-auto"
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
      <div className="flex justify-between gap-4 px-2 mt-4">
        <div className="select-none overflow-hidden">
          <h3 className="text-lg font-semibold group-hover/card:underline underline-offset-2 line-clamp-2">
            {project.name}
          </h3>
          <div>
            {project.fileCount} items, {formatBytes(project.totalFileSize)}
          </div>
          <div className="text-foreground-500 text-sm">
            Last modified {formatRelativeTime(project.updatedAt ?? project.createdAt)}
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="p-1 pointer-events-none">
            <ProjectMembersThumbnails members={project.members} />
          </div>
        </div>
      </div>
    </div>
  );
};
