import { useMemo } from 'react';

import { GetProjectsQueryParams } from '../services/types';

interface Props {
  search: string;
  status: GetProjectsQueryParams['status'];
}

export const useProjectEmptyState = ({ search, status }: Props) => {
  const title = useMemo(() => {
    if (search) {
      return `No projects found for "${search}"`;
    }

    switch (status) {
      case 'active':
        return 'No active projects';
      case 'completed':
        return 'No completed projects';
      case 'archived':
        return 'No archived projects';
      default:
        return 'No projects';
    }
  }, [search, status]);

  const text = useMemo(() => {
    if (search) {
      return 'Try to change your search query.';
    }

    switch (status) {
      case 'active':
        return "You don't have any active projects yet. Go ahead and create one.";
      case 'completed':
        return "You don't have any completed projects yet.";
      case 'archived':
        return "You don't have any archived projects yet.";
      default:
        return "You don't have any projects yet. Go ahead and create one.";
    }
  }, [search, status]);

  return {
    title,
    text,
  };
};
