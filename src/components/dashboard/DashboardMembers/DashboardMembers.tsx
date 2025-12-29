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
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 bg-content1 pb-2 pt-3">
          <button className="flex items-center gap-1" tabIndex={-1} onClick={openMembersModal}>
            <span className="text-lg font-semibold">Members</span>
            <span className="text-medium text-foreground-500">({project.members.length})</span>
          </button>
          <Button color="primary" variant="flat" size="sm" onClick={openMembersModal}>
            <Icon icon="edit" size={16} />
            Manage
          </Button>
        </div>
        <div className="flex flex-col">
          {project.members.map((member, index) => (
            <div key={member.id} className={cn({ 'mt-2 border-t border-foreground-200 pt-2': index !== 0 })}>
              <div className="relative flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 overflow-hidden">
                  <Avatar
                    src={member.user?.avatar?.url}
                    size="md"
                    className="shrink-0 border border-foreground-200"
                    fallback={
                      <div className="select-none text-lg text-foreground-500">{getProjectMemberLetter(member)}</div>
                    }
                  />
                  <button
                    tabIndex={-1}
                    className="flex flex-col overflow-hidden text-start after:absolute after:inset-0"
                    onClick={openMembersModal}
                  >
                    {member.user?.name && <div className="text-md truncate font-medium">{member.user.name}</div>}
                    <div className="truncate text-sm text-foreground-500">{member.email}</div>
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
