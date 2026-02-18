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
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useProjectContext } from '../../../contexts/Project';
import { useProjectEmptyState } from '../../../hooks/useProjectEmptyState';
import { GetProjectsQueryParams, ProjectDto } from '../../../services/types';
import { formatFullDate } from '../../../utils/dates';
import { formatBytes } from '../../../utils/formatBytes';
import { Icon } from '../../various/Icon';
import { ProjectStatus } from '../Project/ProjectStatus';
import { ProjectMembersThumbnails } from '../ProjectMembers';

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
  const { getProjectActions } = useProjectContext();
  const { title, text } = useProjectEmptyState({ search, status });

  const handleRowClick = (project: ProjectDto) => {
    router.push(`/project/${project.id}`);
  };

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
            <div className="font-semibold text-foreground">{title}</div>
            <div className="text-foreground-500">{text}</div>
            {!search && (status === 'active' || status === 'all') && (
              <Button className="mt-4 bg-foreground text-content1" size="sm" onClick={onCreateProject}>
                <Icon icon="plus" size={14} />
                <span>Create project</span>
              </Button>
            )}
          </div>
        }
      >
        {projects.map((project) => (
          <TableRow
            key={project.id}
            className="group/row hover:cursor-pointer hover:opacity-70"
            onClick={() => handleRowClick(project)}
          >
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="size-12 shrink-0">
                  {project.cover?.url ? (
                    <Image
                      src={project.cover?.url}
                      width={48}
                      height={48}
                      alt={project.name}
                      radius="full"
                      className="pointer-events-none object-cover"
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center rounded-full bg-foreground-100 text-foreground-500">
                      <Icon icon="slides" size={18} />
                    </div>
                  )}
                </div>
                <div className="max-w-96">
                  <Link
                    href={`/project/${project.id}`}
                    className="line-clamp-2 text-medium font-semibold underline-offset-2 group-hover/row:underline"
                  >
                    {project.name}
                  </Link>
                  <div className="text-md whitespace-nowrap text-foreground-500">
                    {project.fileCount} items, {formatBytes(project.totalFileSize)}
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <ProjectMembersThumbnails members={project.members} max={5} />
            </TableCell>
            <TableCell>
              <ProjectStatus status={project.status} variant="light" size="md" />
            </TableCell>
            <TableCell className="whitespace-nowrap">
              {formatFullDate(project.updatedAt ?? project.createdAt)}
            </TableCell>
            <TableCell className="whitespace-nowrap">{formatFullDate(project.createdAt)}</TableCell>
            <TableCell>
              {getProjectActions(project).length > 0 && (
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      isIconOnly
                      aria-label={`Open project ${project.name} options`}
                      radius="full"
                      isDisabled={!project.createdBy?.subscription.isActive}
                      variant="light"
                      onClick={() => {
                        onSelectProjectId?.(project.id);
                      }}
                    >
                      <Icon icon="dots" size={22} className="rotate-90" />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu variant="flat">
                    {getProjectActions(project).map((action) => (
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
