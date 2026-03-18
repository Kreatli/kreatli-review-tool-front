import { useGetAssetIdTasks } from '../../../services/hooks';
import { EmptyState } from '../../various/EmptyState';
import { AssetCommentsEmptyState } from '../AssetComments/AssetCommentsEmptyState';
import { AssetTask } from './AssetTask';
import { AssetTasksLoading } from './AssetTasksLoading';

interface Props {
  assetId: string;
  projectId: string;
}

export const AssetTasks = ({ assetId, projectId }: Props) => {
  const { data: tasksData, isPending, isError } = useGetAssetIdTasks(assetId);

  const tasks = tasksData?.tasks ?? [];

  if (isPending) {
    return <AssetTasksLoading />;
  }

  if (isError) {
    return (
      <EmptyState
        size="sm"
        title="Something went wrong"
        icon="error"
        text="An unexpected error occurred. Please try loading the data again."
      />
    );
  }

  return (
    <div className="flex flex-col gap-2 p-3 pb-9 pt-0">
      <div className="flex h-8 items-center text-medium font-semibold">
        {tasks.length} task{tasks.length === 1 ? '' : 's'}
      </div>
      <div className="flex flex-col gap-2">
        {tasks.length === 0 && <AssetCommentsEmptyState />}
        {tasks.map((task) => (
          <AssetTask key={task.id} task={task} projectId={projectId} />
        ))}
      </div>
    </div>
  );
};
