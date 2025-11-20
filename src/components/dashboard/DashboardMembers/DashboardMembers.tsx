import { Avatar, Button, Card, CardBody, Chip, cn } from '@heroui/react';
import { ProjectDto } from '../../../services/types';
import { Icon } from '../../various/Icon';
import { getProjectMemberLetter } from '../../../utils/shortNames';
import { useProjectContext } from '../../../contexts/Project';

const STATUS_COLORS = {
  invited: 'warning',
  joined: 'success',
  left: 'danger',
  removed: 'danger',
} as const;

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
            <div key={member.id} className={cn({ 'border-t pt-2 mt-2 border-foreground-200': index !== 0 })}>
              <div className="flex items-center gap-2 relative justify-between">
                <div className="flex items-center gap-2 overflow-hidden">
                  <Avatar
                    src={member.user?.avatar?.url}
                    size="md"
                    className="border border-foreground-200 shrink-0"
                    fallback={
                      <div className="text-lg text-foreground-500 select-none">{getProjectMemberLetter(member)}</div>
                    }
                  />
                  <button
                    tabIndex={-1}
                    className="flex flex-col after:absolute after:inset-0 text-start overflow-hidden"
                    onClick={openMembersModal}
                  >
                    {member.user?.name && <div className="text-md font-medium truncate">{member.user.name}</div>}
                    <div className="text-sm text-foreground-500 truncate">{member.email}</div>
                  </button>
                </div>
                <div>
                  <Chip color={STATUS_COLORS[member.status]} size="sm" variant="flat" className="pointer-events-none">
                    {member.status}
                  </Chip>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};
