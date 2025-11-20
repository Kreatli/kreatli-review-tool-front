import { useProjectContext } from '../../contexts/Project';
import { DashboardActivity } from './DashboardActivity';
import { DashboardAssets } from './DashboardAssets';
import { DashboardChat } from './DashboardChat';
import { DashboardDescription } from './DashboardDescription';
import { DashboardMembers } from './DashboardMembers';

export const Dashboard = () => {
  const { project } = useProjectContext();

  return (
    <div className="flex flex-col gap-5">
      <div className="grid lg:grid-cols-2 gap-5">
        <DashboardDescription project={project} />
        <DashboardChat project={project} />
      </div>
      <DashboardAssets project={project} />
      <div className="grid lg:grid-cols-[400px,1fr] gap-5">
        <DashboardMembers project={project} />
        <DashboardActivity project={project} />
      </div>
    </div>
  );
};
