import { Button, Modal, ModalBody, ModalContent, Skeleton } from '@heroui/react';
import { useRouter } from 'next/router';

import { ProjectDto, UserDto } from '../../../services/types';
import { PlansForm } from '../../account/PlansModal/PlansForm';
import { Header } from '../../layout/Header';
import { ProjectSidebar } from './ProjectSidebar';

interface Props {
  project: ProjectDto;
  user: UserDto;
}

export const ProjectPaywall = ({ user, project }: Props) => {
  const router = useRouter();

  const isUserOwner = project.createdBy?.id === user.id;

  const handleTrialSuccess = () => {
    router.reload();
  };

  return (
    <>
      <Header />
      <div className="grid flex-1 grid-cols-[auto_1fr] border-t border-foreground-200 md:grid-cols-[200px_1fr]">
        <ProjectSidebar project={project} />
        <Skeleton className="h-full w-full flex-1" />
      </div>
      {isUserOwner ? (
        <Modal isOpen size="5xl" scrollBehavior="outside" hideCloseButton>
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
    </>
  );
};
