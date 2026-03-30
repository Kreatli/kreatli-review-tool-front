import { useProjectContext } from '../../contexts/Project';
import { DashboardActivity } from './DashboardActivity';
import { DashboardAssets } from './DashboardAssets';
import { DashboardChat } from './DashboardChat';
import { DashboardDescription } from './DashboardDescription';
import { DashboardTasks } from './DashboardTasks';

export const Dashboard = () => {
  const { project } = useProjectContext();

  return (
    <div className="flex flex-col">
      <div className="grid border-b border-foreground-200 lg:grid-cols-2">
        <DashboardDescription project={project} />
        <DashboardTasks project={project} />
      </div>
      <DashboardAssets project={project} />
      <div className="grid lg:grid-cols-[400px,1fr]">
        <DashboardChat project={project} />
        <DashboardActivity project={project} />
      </div>
    </div>
  );
};
