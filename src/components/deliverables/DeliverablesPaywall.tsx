import { Button, Card } from '@heroui/react';

import { usePlansModalVisibility } from '../../hooks/usePlansModalVisibility';
import { useSession } from '../../hooks/useSession';
import { UserDto } from '../../services/types';
import { Icon } from '../various/Icon';

interface Props {
  projectOwner: UserDto | undefined;
}

export const DeliverablesPaywall = ({ projectOwner }: Props) => {
  const { user } = useSession();

  const setIsPlansModalVisible = usePlansModalVisibility((state) => state.setIsVisible);

  const isProjectOwner = user && projectOwner?.id === user?.id;

  if (!isProjectOwner) {
    return (
      <div className="absolute inset-0 z-10 bg-background/50 backdrop-blur-sm">
        <div className="flex h-full flex-col items-center justify-center px-3">
          <Card className="flex w-full max-w-md flex-col items-center justify-center gap-2 p-6 text-center">
            <div className="rounded-full bg-foreground-100 p-3">
              <Icon icon="box" size={20} />
            </div>
            <div className="font-sans text-xl font-semibold">Contact project owner</div>
            <div className="text-sm text-foreground-500">
              This feature requires an active plan or a free trial. Please contact the project owner to upgrade their
              plan.
            </div>
            <Button className="bg-foreground text-content1" as="a" href={`mailto:${projectOwner?.email}`}>
              Contact owner
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-10 bg-background/50 backdrop-blur-sm">
      <div className="flex h-full flex-col items-center justify-center px-3">
        <Card className="flex w-full max-w-md flex-col items-center justify-center gap-2 p-6 text-center">
          <div className="rounded-full bg-foreground-100 p-3">
            <Icon icon="box" size={20} />
          </div>
          <div className="font-sans text-xl font-semibold">Available on paid plans</div>
          <div className="text-sm text-foreground-500">
            Deliverables is available during your free trial and on all paid plans. Track outputs, set deadlines, and
            manage project deliverables.
          </div>
          <Button
            className="bg-foreground text-content1"
            onClick={() => setIsPlansModalVisible(true, 'explore_mode_chat')}
          >
            {user?.subscription.hasUsedTrial ? 'Upgrade to a plan' : 'Start free trial'}
          </Button>
        </Card>
      </div>
    </div>
  );
};
