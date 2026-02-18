import { Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/react';

import { ProjectDto } from '../../../services/types';
import { InviteProjectMemberForm } from './InviteProjectMemberForm';

interface Props {
  project: ProjectDto;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectMembersModal = ({ project, isOpen, onClose }: Props) => {
  return (
    <Modal size="lg" isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
      <ModalContent>
        <ModalHeader>Invite a new member</ModalHeader>
        <ModalBody className="pb-6">
          <InviteProjectMemberForm project={project} onSuccess={onClose} onCancel={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
