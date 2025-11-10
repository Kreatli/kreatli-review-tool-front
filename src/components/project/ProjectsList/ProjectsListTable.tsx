import { useRouter } from 'next/router';
import { GetProjectsQueryParams, ProjectDto } from '../../../services/types';
import React from 'react';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/react';
import { Icon } from '../../various/Icon';
import Link from 'next/link';
import { formatBytes } from '../../../utils/formatBytes';
import { ProjectMembersThumbnails } from '../ProjectMembers';
import { ProjectStatus } from '../Project/ProjectStatus';
import { formatFullDate } from '../../../utils/dates';
import { useProjectContext } from '../../../contexts/Project';
import { useProjectEmptyState } from '../../../hooks/useProjectEmptyState';

interface Props {
  status: GetProjectsQueryParams['status'];
  search: string;
  projects: ProjectDto[];
  isLoading: boolean;
  onSelectProjectId?: (projectId: string) => void;
  onCreateProject?: () => void;
}

export const ProjectsListTable = ({
  projects,
  search,
  isLoading,
  status,
  onSelectProjectId,
  onCreateProject,
}: Props) => {
  const router = useRouter();
  const { getProjectActions, setIsMembersModalOpen } = useProjectContext();
  const { title, text } = useProjectEmptyState({ search, status });

  const handleRowClick = (project: ProjectDto) => {
    router.push(`/project/${project.id}`);
  };

  const getFilteredProjectActions = (project: ProjectDto) =>
    getProjectActions(project).filter((action) => !action.hideInCard);

  return (
    <Table isStriped={projects.length > 3}>
      <TableHeader>
        <TableColumn>Project Name</TableColumn>
        <TableColumn>Members</TableColumn>
        <TableColumn>Status</TableColumn>
        <TableColumn>Last Modified At</TableColumn>
        <TableColumn>Created At</TableColumn>
        <TableColumn align="end"> </TableColumn>
      </TableHeader>
      <TableBody
        isLoading={isLoading}
        loadingContent={<Spinner color="default" />}
        emptyContent={
          <div>
            <div className="text-foreground font-semibold">{title}</div>
            <div className="text-foreground-500">{text}</div>
            {!search && (status === 'active' || status === 'all') && (
              <Button className="bg-foreground text-content1 mt-4" size="sm" onClick={onCreateProject}>
                <Icon icon="plus" size={14} />
                Create project
              </Button>
            )}
          </div>
        }
      >
        {projects.map((project) => (
          <TableRow
            key={project.id}
            className="group/row hover:opacity-70 hover:cursor-pointer"
            onClick={() => handleRowClick(project)}
          >
            <TableCell>
              <div className="flex items-center gap-3">
                <div>
                  {project.cover?.url ? (
                    <Image
                      src={project.cover?.url}
                      width={48}
                      height={48}
                      radius="full"
                      className="object-cover pointer-events-none"
                    />
                  ) : (
                    <div className="size-12 bg-foreground-100 text-foreground-500 rounded-full flex items-center justify-center">
                      <Icon icon="slides" size={18} />
                    </div>
                  )}
                </div>
                <div className="max-w-96">
                  <Link
                    href={`/project/${project.id}`}
                    className="text-medium line-clamp-2 group-hover/row:underline underline-offset-2 font-semibold"
                  >
                    {project.name}
                  </Link>
                  <div className="text-foreground-500 text-md">
                    {project.fileCount} items, {formatBytes(project.totalFileSize)}
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <button
                type="button"
                aria-label="Project members"
                disabled={project.status !== 'active'}
                className="outline-offset-4 rounded-full"
                onClick={(event) => {
                  event.stopPropagation();
                  onSelectProjectId?.(project.id);
                  setIsMembersModalOpen(true);
                }}
              >
                <ProjectMembersThumbnails members={project.members} max={5} />
              </button>
            </TableCell>
            <TableCell>
              <ProjectStatus status={project.status} variant="light" size="md" />
            </TableCell>
            <TableCell>{formatFullDate(project.updatedAt ?? project.createdAt)}</TableCell>
            <TableCell>{formatFullDate(project.createdAt)}</TableCell>
            <TableCell>
              {getFilteredProjectActions(project).length > 0 && (
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      isIconOnly
                      aria-label={`Open project ${project.name} options`}
                      radius="full"
                      variant="light"
                    >
                      <Icon icon="dots" size={22} className="rotate-90" />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu variant="flat">
                    {getFilteredProjectActions(project).map((action) => (
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
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
