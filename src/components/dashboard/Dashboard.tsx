import { useProjectContext } from '../../contexts/Project';
import { DashboardActivity } from './DashboardActivity';
import { DashboardAssets } from './DashboardAssets';
import { DashboardChat } from './DashboardChat';
import { DashboardDescription } from './DashboardDescription';
import { DashboardMembers } from './DashboardMembers';

export const Dashboard = () => {
  const { project } = useProjectContext();

  return (
    <div className="flex flex-col">
      <div className="grid border-b border-foreground-200 lg:grid-cols-2">
        <DashboardDescription project={project} />
        <DashboardChat project={project} />
      </div>
      <DashboardAssets project={project} />
      <div className="grid lg:grid-cols-[400px,1fr]">
        <DashboardMembers project={project} />
        <DashboardActivity project={project} />
      </div>
    </div>
  );
};
