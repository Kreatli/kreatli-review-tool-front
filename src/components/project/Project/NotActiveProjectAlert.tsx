import { Button } from '@heroui/react';
import { Alert } from '@heroui/react';

import { useProjectContext } from '../../../contexts/Project';

export const NotActiveProjectAlert = () => {
  const { project, restoreProject } = useProjectContext();

  return (
    <Alert
      color="primary"
      title={
        project.status === 'archived'
          ? 'This project is archived, restore it to make changes.'
          : 'This project is completed, reactivate it to make changes.'
      }
      endContent={
        <Button variant="flat" color="primary" onClick={() => restoreProject(project)}>
          {project.status === 'archived' ? 'Restore' : 'Reactivate'}
        </Button>
      }
    />
  );
};
