// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Image, Selection, Spinner } from '@heroui/react';
import { useRouter } from 'next/router';

import { useGetProjects } from '../../../services/hooks';
import { ProjectDto } from '../../../services/types';
import { Icon } from '../../various/Icon';

interface Props {
  selectedProject: ProjectDto;
}

export const ProjectSelect = ({ selectedProject }: Props) => {
  const router = useRouter();

  const coverUrl = selectedProject.cover?.url;

  const { data, isLoading } = useGetProjects({ status: 'active' });

  const handleSelectionChange = (keys: Selection) => {
    if (keys === 'all') {
      return;
    }

    const key = keys.values().next().value;
    const activeTab = router.pathname.split('/')[3];
    router.replace(`/project/${key}/${activeTab}`);
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <button
          type="button"
          disabled={isLoading}
          className="flex w-full items-center gap-1.5 overflow-hidden rounded-large transition-colors md:hover:bg-foreground-100"
        >
          <div className="mx-auto shrink-0">
            {coverUrl ? (
              <Image
                src={coverUrl}
                width={32}
                height={32}
                radius="full"
                className="border border-foreground-200 object-cover"
                alt={selectedProject.name}
              />
            ) : (
              <div className="flex size-8 items-center justify-center rounded-full bg-foreground-100 text-foreground-500">
                <Icon icon="slides" size={16} />
              </div>
            )}
          </div>
          <div className="hidden flex-1 truncate text-start text-sm font-semibold md:block">{selectedProject.name}</div>
          <div className="-ml-1 mr-1 hidden md:flex">
            {isLoading ? (
              <Spinner size="sm" color="default" />
            ) : (
              <Icon icon="chevronDown" size={18} className="shrink-0 text-foreground-400" />
            )}
          </div>
        </button>
      </DropdownTrigger>
      <DropdownMenu
        variant="flat"
        selectionMode="single"
        className="max-h-64 max-w-xs overflow-auto"
        disallowEmptySelection
        selectedKeys={[selectedProject.id]}
        onSelectionChange={handleSelectionChange}
      >
        {data?.projects.map((project) => (
          <DropdownItem
            key={project.id}
            startContent={
              project.cover?.url ? (
                <Image
                  src={project.cover.url}
                  width={24}
                  height={24}
                  radius="full"
                  className="border border-foreground-200 object-cover"
                  alt={selectedProject.name}
                />
              ) : (
                <div className="flex size-6 items-center justify-center rounded-full bg-foreground-100">
                  <Icon icon="slides" size={16} className="text-foreground-400" />
                </div>
              )
            }
          >
            {project.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};
