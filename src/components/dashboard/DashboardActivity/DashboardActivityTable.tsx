import { Avatar, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';

import { ProjectLogsDto } from '../../../services/types';
import { formatFullDate } from '../../../utils/dates';
import { ProjectActivityCard } from '../../project/ProjectActivity/ProjectActivityCard';
import { ProjectActivityLog } from '../../project/ProjectActivity/ProjectActivityLog';
import { useIsBreakpoint } from '../../tiptap/hooks/use-is-breakpoint';

interface Props {
  logs: ProjectLogsDto['logs'];
}

export const DashboardActivityTable = ({ logs }: Props) => {
  const isMobile = useIsBreakpoint('max', 768);

  if (isMobile) {
    return (
      <div className="flex flex-col gap-2">
        {logs.map((log) => (
          <ProjectActivityCard key={log.id} log={log} />
        ))}
      </div>
    );
  }

  return (
    <Table isCompact removeWrapper>
      <TableHeader>
        <TableColumn>Name</TableColumn>
        <TableColumn>Activity</TableColumn>
        <TableColumn width={200}>Date</TableColumn>
      </TableHeader>
      <TableBody>
        {logs.map((log) => (
          <TableRow key={log.id}>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar
                  src={log.user.avatar?.url ?? ''}
                  size="sm"
                  radius="full"
                  className="shrink-0"
                  fallback={
                    <div className="select-none text-lg text-foreground-500">{log.user.name[0].toUpperCase()}</div>
                  }
                />
                <div className="line-clamp-2">{log.user.name}</div>
              </div>
            </TableCell>
            <TableCell>
              <ProjectActivityLog log={log} />
            </TableCell>
            <TableCell>{formatFullDate(log.createdAt)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
