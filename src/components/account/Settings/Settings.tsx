import { Button, Skeleton } from '@heroui/react';

import { useGetUserSettings } from '../../../services/hooks';
import { EmptyState } from '../../various/EmptyState';
import { Icon } from '../../various/Icon';
import { SettingsForm } from './SettingsForm';

export const Settings = () => {
  const { data: settings, isPending, isError, refetch } = useGetUserSettings();

  return (
    <div className="rounded-medium border-foreground-300 p-4 px-5 shadow-small dark:border">
      <div className="text-xl font-semibold">Settings</div>
      <div className="text-foreground-500">Update your settings here.</div>
      {isPending ? (
        <div>
          <Skeleton className="h-56 rounded-medium" />
        </div>
      ) : isError ? (
        <EmptyState
          size="sm"
          title="Something went wrong"
          icon="error"
          text="An unexpected error occurred. Please try loading the data again."
        >
          <Button size="sm" className="mt-4" variant="flat" onClick={refetch}>
            <Icon icon="update" size={16} />
            Reload
          </Button>
        </EmptyState>
      ) : (
        <SettingsForm settings={settings} />
      )}
    </div>
  );
};
