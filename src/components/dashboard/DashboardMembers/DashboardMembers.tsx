import { Avatar, Button, Card, CardBody, cn } from '@heroui/react';
import { ProjectDto } from '../../../services/types';
import { Icon } from '../../various/Icon';
import { getProjectMemberLetter } from '../../../utils/shortNames';
import { useProjectContext } from '../../../contexts/Project';

interface Props {
  project: ProjectDto;
}

export const DashboardMembers = ({ project }: Props) => {
  const { setIsMembersModalOpen } = useProjectContext();

  const openMembersModal = () => {
    setIsMembersModalOpen(true);
  };

  return (
    <Card className="max-h-96">
      <CardBody className="p-3 px-4 pt-0">
        <div className="flex items-center justify-between gap-3 pb-2 pt-3 sticky top-0 bg-content1 z-10">
          <button className="flex items-center gap-1" tabIndex={-1} onClick={openMembersModal}>
            <span className="text-lg font-semibold">Members</span>
            <span className="text-foreground-500 text-medium">({project.members.length})</span>
          </button>
          <Button color="primary" variant="flat" size="sm" onClick={openMembersModal}>
            <Icon icon="edit" size={16} />
            Manage
          </Button>
        </div>
        <div className="flex flex-col">
          {project.members.map((member, index) => (
            <div key={member.id} className={cn({ 'border-t pt-1.5 mt-1.5 border-foreground-200': index !== 0 })}>
              <div className="flex items-center gap-2 relative">
                <Avatar
                  src={member.user?.avatar?.url}
                  size="md"
                  className="border border-foreground-200"
                  fallback={
                    <div className="text-lg text-foreground-500 select-none">{getProjectMemberLetter(member)}</div>
                  }
                />
                <button
                  tabIndex={-1}
                  className="flex flex-col after:absolute after:inset-0 text-start"
                  onClick={openMembersModal}
                >
                  {member.user?.name && <div className="text-md font-medium">{member.user.name}</div>}
                  <div className="text-sm text-foreground-500">{member.email}</div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};
