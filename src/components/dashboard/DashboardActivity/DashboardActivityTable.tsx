import { Avatar, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';
import { ProjectLogsDto } from '../../../services/types';
import { ProjectActivityLog } from '../../project/ProjectActivity/ProjectActivityLog';

interface Props {
  logs: ProjectLogsDto['logs'];
}

export const DashboardActivityTable = ({ logs }: Props) => {
  return (
    <Table isCompact removeWrapper>
      <TableHeader>
        <TableColumn>Name</TableColumn>
        <TableColumn>Activity</TableColumn>
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
                    <div className="text-lg text-foreground-500 select-none">{log.user.name[0].toUpperCase()}</div>
                  }
                />
                <div className="line-clamp-2">{log.user.name}</div>
              </div>
            </TableCell>
            <TableCell>
              <ProjectActivityLog log={log} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
