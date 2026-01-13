import { Button, ButtonGroup, Modal, ModalBody, ModalContent, Skeleton } from '@heroui/react';
import { useRouter } from 'next/router';

import { ProjectDto, UserDto } from '../../../services/types';
import { PlansForm } from '../../account/PlansModal/PlansForm';
import { Header } from '../../layout/Header';
import { Icon } from '../../various/Icon';
import { ProjectBreadcrumbs } from './ProjectBreadcrumbs';

interface Props {
  project: ProjectDto;
  user: UserDto;
}

export const ProjectPaywall = ({ user, project }: Props) => {
  const router = useRouter();

  const coverUrl = project.cover?.url;
  const isUserOwner = project.createdBy?.id === user.id;

  const handleTrialSuccess = () => {
    router.reload();
  };

  return (
    <>
      <Header />
      <div className="border-t border-foreground-200 p-6">
        <div className="flex items-center justify-between gap-2">
          <ProjectBreadcrumbs
            fileCount={project.fileCount}
            coverUrl={coverUrl}
            totalFileSize={project.totalFileSize}
            path={[{ name: project.name, url: '#' }]}
          />
          <ButtonGroup>
            <Button className="bg-foreground pr-1 text-content1">
              <Icon icon="upload" size={16} />
              Upload
            </Button>
            <Button isIconOnly className="bg-foreground text-content1">
              <Icon icon="chevronDown" size={20} />
            </Button>
          </ButtonGroup>
        </div>
        <div className="mt-6">
          <div className="flex gap-2">
            <Skeleton className="h-9 w-16 rounded-lg" />
            <Skeleton className="h-9 w-16 rounded-lg" />
            <Skeleton className="h-9 w-16 rounded-lg" />
            <Skeleton className="h-9 w-16 rounded-lg" />
          </div>
          <div className="mt-4 flex h-96 flex-1 flex-col">
            <Skeleton className="h-full w-full flex-1 rounded-lg" />
          </div>
        </div>
        {isUserOwner ? (
          <Modal isOpen size="5xl" hideCloseButton>
            <ModalContent>
              <ModalBody className="py-6">
                <h2 className="font-sans text-2xl font-bold">Your access to this project is currently paused.</h2>
                <p className="mb-3 text-foreground-500">
                  Your access to this project is currently paused. Upgrade your plan to restore access and keep
                  collaborating.
                </p>
                <PlansForm user={user} onTrialSuccess={handleTrialSuccess} />
              </ModalBody>
            </ModalContent>
          </Modal>
        ) : (
          <Modal isOpen size="lg" hideCloseButton>
            <ModalContent>
              <ModalBody className="py-6">
                <h2 className="font-sans text-2xl font-bold">This project is no longer accessible</h2>
                <p className="text-foreground-500">
                  This project is currently paused. You no longer have access to this project unless the owner upgrades
                  their plan.
                </p>
                <div className="mt-3 flex items-center justify-end gap-2">
                  <Button variant="light" onClick={() => router.back()}>
                    Go back
                  </Button>
                  <Button as="a" href={`mailto:${project.createdBy?.email}`} className="bg-foreground text-content1">
                    Contact owner
                  </Button>
                </div>
              </ModalBody>
            </ModalContent>
          </Modal>
        )}
      </div>
    </>
  );
};
