import { Avatar, Card, CardBody, CardFooter, CardHeader } from '@heroui/react';

import { ProjectLogsDto } from '../../../services/types';
import { formatFullDate } from '../../../utils/dates';
import { ProjectActivityLog } from './ProjectActivityLog';

interface Props {
  log: ProjectLogsDto['logs'][number];
}

export const ProjectActivityCard = ({ log }: Props) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Avatar
            src={log.user.avatar?.url ?? ''}
            size="sm"
            radius="full"
            fallback={<div className="select-none text-lg text-foreground-500">{log.user.name[0].toUpperCase()}</div>}
          />
          <div className="text-sm font-semibold">{log.user.name}</div>
        </div>
      </CardHeader>
      <CardBody className="py-0">
        <div className="text-sm">
          <ProjectActivityLog log={log} />
        </div>
      </CardBody>
      <CardFooter>
        <div className="text-sm text-foreground-500">{formatFullDate(log.createdAt)}</div>
      </CardFooter>
    </Card>
  );
};
