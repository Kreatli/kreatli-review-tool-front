import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

import { useFileStateContext } from '../../../contexts/File';
import { useGetAssetFileIdComments } from '../../../services/hooks';
import { getAssetFileIdComments } from '../../../services/services';
import { AssetCommentsResponse, ProjectDto } from '../../../services/types';
import { Icon } from '../../various/Icon';
import { AssetComment } from './AssetComment';
import { AssetCommentsEmptyState } from './AssetCommentsEmptyState';
import { AssetCommentsLoading } from './AssetCommentsLoading';

type CommentsStatus = 'all' | 'unresolved' | 'resolved';

interface Props {
  fileId: string;
  project?: ProjectDto;
  shareableLinkId?: string;
}

export const AssetComments = ({ fileId, project, shareableLinkId }: Props) => {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const { setActiveComment } = useFileStateContext();
  const { data, isPending, isError } = useGetAssetFileIdComments(fileId, { shareableLinkId: shareableLinkId ?? '' });
  const [commentsStatus, setCommentsStatus] = useState<CommentsStatus>('unresolved');

  const commentIdFromUrl = searchParams.get('commentId');
  const { comments = [] } = data ?? {};

  const commentsToShow = React.useMemo(() => {
    if (commentsStatus === 'all') {
      return comments;
    }

    if (commentsStatus === 'resolved') {
      return comments.filter(({ isResolved }) => isResolved);
    }

    return comments.filter(({ isResolved }) => !isResolved);
  }, [commentsStatus, comments]);

  React.useEffect(() => {
    if (commentIdFromUrl) {
      const comment = comments.find((comment) => comment.id === commentIdFromUrl);

      if (comment) {
        setCommentsStatus(comment.isResolved ? 'resolved' : 'unresolved');
        setActiveComment(comment);
      }
    }
  }, [commentIdFromUrl, comments]);

  if (isPending) {
    return <AssetCommentsLoading />;
  }

  if (isError) {
    return 'Something went wrong';
  }

  const unresolvedCommentsCount = comments.reduce((acc, comment) => acc + (comment.isResolved ? 0 : 1), 0);

  const handleRemove = (commentId: string) => () => {
    queryClient.setQueriesData<AssetCommentsResponse>(
      { queryKey: [getAssetFileIdComments.key, fileId] },
      (cacheData) => ({
        comments: (cacheData?.comments ?? []).filter((comment) => comment.id !== commentId),
      }),
    );

    queryClient.invalidateQueries({ queryKey: [getAssetFileIdComments.key, fileId] });
  };

  const handleUpdate = () => {
    queryClient.invalidateQueries({ queryKey: [getAssetFileIdComments.key, fileId] });
  };

  return (
    <div className="flex flex-col gap-2 p-3 pb-9 pt-0">
      <div className="flex items-center justify-between gap-2">
        <div className="text-medium font-semibold">
          {comments.length} comment{comments.length === 1 ? '' : 's'}
        </div>
        <Dropdown>
          <DropdownTrigger>
            <Button size="sm" className="w-fit" variant="light" endContent={<Icon icon="chevronDown" size={16} />}>
              {commentsStatus === 'all' && <>{`All (${comments.length})`}</>}
              {commentsStatus === 'unresolved' && <>{`Unresolved (${unresolvedCommentsCount})`}</>}
              {commentsStatus === 'resolved' && <>{`Resolved (${comments.length - unresolvedCommentsCount})`}</>}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            variant="flat"
            selectionMode="single"
            disallowEmptySelection
            selectedKeys={[commentsStatus]}
            onSelectionChange={(keys) => setCommentsStatus(keys.currentKey as CommentsStatus)}
          >
            <DropdownItem key="all" title="All" description={`${comments.length} comments`}></DropdownItem>
            <DropdownItem
              key="unresolved"
              title="Unresolved"
              description={`${unresolvedCommentsCount} comments`}
            ></DropdownItem>
            <DropdownItem
              key="resolved"
              title="Resolved"
              description={`${comments.length - unresolvedCommentsCount} comments`}
            ></DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className="flex flex-col gap-2">
        {commentsToShow.length === 0 && <AssetCommentsEmptyState />}
        {commentsToShow.map((comment) => (
          <div key={comment.id}>
            <AssetComment
              project={project}
              fileId={fileId}
              comment={comment}
              onUpdate={handleUpdate}
              onRemove={handleRemove(comment.id)}
            />
            {comment.replies.length > 0 && (
              <div className="flex flex-col gap-2 pl-6 pt-2">
                {comment.replies.map((reply) => (
                  <AssetComment
                    key={reply.id}
                    fileId={fileId}
                    project={project}
                    comment={reply}
                    isResolvable={false}
                    isResolved={comment.isResolved}
                    onUpdate={handleUpdate}
                    onRemove={handleRemove(reply.id)}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
