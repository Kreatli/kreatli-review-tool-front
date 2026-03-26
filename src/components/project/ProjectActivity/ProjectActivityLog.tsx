import { Link } from '@heroui/react';
import NextLink from 'next/link';
import React from 'react';

import { useProjectContext } from '../../../contexts/Project';
import { useDeliverableModalVisibility } from '../../../hooks/useDeliverableModalVisibility';
import { useTaskModalVisibility } from '../../../hooks/useTaskModalVisibility';
import {
  AssetsArchivedLogDto,
  AssetsRemovedLogDto,
  AssetsRestoredLogDto,
  AssetUpdatedLogDto,
  AssetUploadedLogDto,
  DeliverableCreatedLogDto,
  DeliverableRemovedLogDto,
  DeliverableTaskAddedLogDto,
  DeliverableTaskRemovedLogDto,
  DeliverableUpdatedLogDto,
  FolderCreatedLogDto,
  ProjectLogsDto,
  ProjectMemberInvitedLogDto,
  ProjectMemberLeftLogDto,
  ProjectMemberRemovedLogDto,
  ProjectUpdatedLogDto,
  TaskAssetAddedLogDto,
  TaskAssetRemovedLogDto,
  TaskCommentAddedLogDto,
  TaskCommentRemovedLogDto,
  TaskCreatedLogDto,
  TaskRemovedLogDto,
  TaskUpdatedLogDto,
} from '../../../services/types';

interface Props {
  log: ProjectLogsDto['logs'][number];
}

const AssetUploadedLog = ({ log }: { log: AssetUploadedLogDto }) => {
  const { project } = useProjectContext();
  const { id, name, stackId } = log.details.asset;

  return (
    <div>
      Uploaded{' '}
      <Link
        as={NextLink}
        className="inline cursor-pointer"
        href={
          stackId
            ? `/project/${project.id}/assets/stack/${stackId}?selectedFileId=${id}`
            : `/project/${project.id}/assets/${id}`
        }
        size="sm"
        underline="hover"
      >
        {name}
      </Link>
    </div>
  );
};

const AssetUpdatedLog = ({ log }: { log: AssetUpdatedLogDto }) => {
  const { project } = useProjectContext();
  const {
    asset: { id, name, parent, type, statusLabel, assignee },
    updatedFields,
  } = log.details;

  const href = type === 'file' ? `/project/${project.id}/assets/${id}` : `/project/${project.id}/assets/folder/${id}`;
  const link = (
    <Link as={NextLink} href={href} className="inline cursor-pointer" size="sm" underline="hover">
      {updatedFields?.name ?? name}
    </Link>
  );

  if (!updatedFields) {
    // TODO[sentry]: report error

    return <>Updated {link}</>;
  }

  if ('parent' in updatedFields) {
    if (updatedFields.parent) {
      return (
        <>
          Moved {link} to &quot;{updatedFields.parent.name}&quot; folder
        </>
      );
    }

    return (
      <>
        Moved {link} up from &quot;{parent?.name}&quot; folder
      </>
    );
  }

  if (updatedFields.name) {
    return (
      <>
        Renamed {link} {type}
      </>
    );
  }

  if ('statusLabel' in updatedFields) {
    return (
      <>
        Changed {link} status from &quot;{statusLabel ?? 'None'}&quot; to &quot;
        {updatedFields.statusLabel ?? 'None'}&quot;
      </>
    );
  }

  if ('status' in updatedFields) {
    return <>Updated {link} status</>;
  }

  if ('assignee' in updatedFields) {
    if (!updatedFields.assignee) {
      return (
        <>
          Unassigned {assignee?.name} from {link}
        </>
      );
    }

    return (
      <>
        Assigned {updatedFields.assignee?.name} to {link}
      </>
    );
  }

  return <>Updated {link}</>;
};

const FolderCreatedLog = ({ log }: { log: FolderCreatedLogDto }) => {
  const { project } = useProjectContext();
  const { id, name } = log.details.folder;

  return (
    <div>
      Created{' '}
      <Link
        as={NextLink}
        className="inline cursor-pointer"
        href={`/project/${project.id}/assets/folder/${id}`}
        size="sm"
        underline="hover"
      >
        {name}
      </Link>{' '}
      folder
    </div>
  );
};

const AssetsArchivedLog = ({ log }: { log: AssetsArchivedLogDto }) => {
  const { project } = useProjectContext();
  const { assets } = log.details;

  if (assets.length === 1) {
    const assetType = assets[0].type;
    const assetId = assets[0].id;

    const href =
      assetType === 'stack'
        ? `/project/${project.id}/assets/stack/${assetId}`
        : assetType === 'folder'
          ? `/project/${project.id}/assets/folder/${assetId}`
          : `/project/${project.id}/assets/${assetId}`;

    return (
      <>
        Deleted {assetType === 'stack' ? 'version stack' : assetType}{' '}
        <Link as={NextLink} className="inline cursor-pointer" href={href} size="sm" underline="hover">
          {assets[0].name}
        </Link>{' '}
      </>
    );
  }

  return <>Deleted {assets.length} assets</>;
};

const AssetsRestoredLog = ({ log }: { log: AssetsRestoredLogDto }) => {
  const { project } = useProjectContext();
  const { assets } = log.details;

  const [isExpanded, setIsExpanded] = React.useState(false);

  if (assets.length === 1) {
    const [asset] = assets;
    const href =
      asset.type === 'file'
        ? `/project/${project.id}/assets/${asset.id}`
        : asset.type === 'folder'
          ? `/project/${project.id}/assets/folder/${asset.id}`
          : `/project/${project.id}/assets/stack/${asset.id}`;

    return (
      <>
        Restored {asset.type === 'stack' ? 'version stack' : asset.type}{' '}
        <Link as={NextLink} className="inline cursor-pointer" href={href} size="sm" underline="hover">
          {asset.name}
        </Link>
      </>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div>
        Restored {assets.length} assets.{' '}
        <Link
          as="button"
          type="button"
          size="sm"
          underline="hover"
          onClick={() => setIsExpanded((expanded) => !expanded)}
        >
          {isExpanded ? 'Hide' : 'See'} items
        </Link>
      </div>
      {isExpanded && (
        <ul className="flex list-disc flex-col gap-2 pl-4">
          {assets.map((asset) => {
            const assetHref =
              asset.type === 'file'
                ? `/project/${project.id}/assets/${asset.id}`
                : asset.type === 'folder'
                  ? `/project/${project.id}/assets/folder/${asset.id}`
                  : `/project/${project.id}/assets/stack/${asset.id}`;

            return (
              <li key={asset.id}>
                <Link key={asset.id} as={NextLink} href={assetHref} size="sm" underline="hover">
                  {asset.name}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

const AssetsRemovedLog = ({ log }: { log: AssetsRemovedLogDto }) => {
  const { assets } = log.details;

  const [isExpanded, setIsExpanded] = React.useState(false);

  if (assets.length === 1) {
    const [asset] = assets;

    return (
      <>
        Deleted forever {asset.type === 'stack' ? 'version stack' : asset.type} &quot;{asset.name}&quot;
      </>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div>
        Deleted forever {assets.length} items.
        <Link
          as="span"
          className="inline cursor-pointer"
          size="sm"
          underline="hover"
          onClick={() => setIsExpanded((expanded) => !expanded)}
        >
          See items
        </Link>
      </div>
      {isExpanded && (
        <ul className="flex list-disc flex-col gap-2 pl-4">
          {assets.map((asset) => (
            <li key={asset.id}>
              &quot;{asset.name}&quot; {asset.type}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const ProjectUpdatedLog = ({ log }: { log: ProjectUpdatedLogDto }) => {
  const {
    name,
    description,
    isCoverChanged,
    isAssetsOrderChanged,
    status,
    isAssetStatusesChanged,
    isTaskStatusesChanged,
    isContentChanged,
  } = log.details;

  if (name) {
    return `Renamed project to "${name}"`;
  }

  if (description) {
    return `Updated project description: "${description}"`;
  }

  if (isCoverChanged) {
    return 'Updated project cover image';
  }

  if (isAssetsOrderChanged) {
    return 'Reordered assets in the project structure';
  }

  if (isAssetStatusesChanged) {
    return 'Updated project media statuses';
  }

  if (isTaskStatusesChanged) {
    return 'Updated project task statuses';
  }

  if (isContentChanged) {
    return 'Updated project content';
  }

  if (status === 'archived') {
    return 'Archived project';
  }

  if (status === 'active') {
    return 'Reactivated project';
  }

  if (status === 'completed') {
    return 'Completed project';
  }

  return 'Project updated';
};

export const ProjectMemberInvitedLog = ({ log }: { log: ProjectMemberInvitedLogDto }) => {
  return (
    <>
      Invited{' '}
      <Link href={`mailto:${log.details.user.email}`} className="inline cursor-pointer" size="sm" underline="hover">
        {log.details.user.email}
      </Link>{' '}
      to join the project
    </>
  );
};

export const ProjectMemberJoinedLog = () => {
  return <>Joined the project</>;
};

export const ProjectMemberRemovedLog = ({ log }: { log: ProjectMemberRemovedLogDto }) => {
  return <>Removed {log.details.user.name} from the project</>;
};

export const ProjectMemberLeftLog = ({ log }: { log: ProjectMemberLeftLogDto }) => {
  return <>{log.user.name} left the project</>;
};

export const TaskCreatedLog = ({ log }: { log: TaskCreatedLogDto }) => {
  const { openTaskModal } = useTaskModalVisibility();

  const task = (
    <Link
      as="span"
      className="inline cursor-pointer"
      onClick={() => openTaskModal(log.details.id)}
      size="sm"
      underline="hover"
    >
      {log.details.name}
    </Link>
  );

  return <>Created task {task}</>;
};

export const TaskUpdatedLog = ({ log }: { log: TaskUpdatedLogDto }) => {
  const { id, contributors, isContentChanged, name, owner, statusLabel } = log.details;
  const { openTaskModal } = useTaskModalVisibility();

  const task = (
    <Link as="span" className="inline cursor-pointer" onClick={() => openTaskModal(id)} size="sm" underline="hover">
      {name}
    </Link>
  );

  if (isContentChanged) {
    return <>Updated {task} task description</>;
  }

  if (owner) {
    return (
      <>
        Updated {task} task owner to {owner.name}
      </>
    );
  }

  if ('statusLabel' in log.details) {
    return (
      <>
        Updated {task} task stage to "{statusLabel ?? 'Unplaced'}"
      </>
    );
  }

  if (contributors) {
    if (contributors.length === 0) {
      return <>Removed all contributors from {task} task</>;
    }

    return (
      <>
        Updated {task} task contributors to {contributors.map((contributor) => contributor.name).join(', ')}
      </>
    );
  }

  return <>Renamed {task} task</>;
};

export const TaskRemovedLog = ({ log }: { log: TaskRemovedLogDto }) => {
  return <>Removed task "{log.details.name}"</>;
};

export const TaskAssetAddedLog = ({ log }: { log: TaskAssetAddedLogDto }) => {
  const { project } = useProjectContext();
  const { openTaskModal } = useTaskModalVisibility();

  const file = (
    <Link
      as={NextLink}
      className="inline cursor-pointer"
      href={`/project/${project.id}/assets/${log.details.asset.id}`}
      size="sm"
      underline="hover"
    >
      {log.details.asset.name}
    </Link>
  );

  const task = (
    <Link
      as="span"
      className="inline cursor-pointer"
      onClick={() => openTaskModal(log.details.id)}
      size="sm"
      underline="hover"
    >
      {log.details.name}
    </Link>
  );

  return (
    <>
      Attached file {file} to the task {task}
    </>
  );
};

export const TaskAssetRemovedLog = ({ log }: { log: TaskAssetRemovedLogDto }) => {
  const { project } = useProjectContext();
  const { openTaskModal } = useTaskModalVisibility();

  const file = (
    <Link
      as={NextLink}
      className="inline cursor-pointer"
      href={`/project/${project.id}/assets/${log.details.asset.id}`}
      size="sm"
      underline="hover"
    >
      {log.details.asset.name}
    </Link>
  );

  const task = (
    <Link
      as="span"
      className="inline cursor-pointer"
      onClick={() => openTaskModal(log.details.id)}
      size="sm"
      underline="hover"
    >
      {log.details.name}
    </Link>
  );

  return (
    <>
      Removed file {file} from the task {task}
    </>
  );
};

export const TaskCommentAddedLog = ({ log }: { log: TaskCommentAddedLogDto }) => {
  const { openTaskModal } = useTaskModalVisibility();

  const task = (
    <Link
      as="span"
      className="inline cursor-pointer"
      type="button"
      onClick={() => openTaskModal(log.details.id)}
      size="sm"
      underline="hover"
    >
      {log.details.name}
    </Link>
  );

  const comment = (
    <Link
      as="span"
      className="inline cursor-pointer"
      onClick={() => openTaskModal(log.details.id, log.details.comment.id)}
      size="sm"
      underline="hover"
    >
      comment
    </Link>
  );

  return (
    <>
      Added {comment} to the task {task}
    </>
  );
};

export const TaskCommentRemovedLog = ({ log }: { log: TaskCommentRemovedLogDto }) => {
  const { openTaskModal } = useTaskModalVisibility();

  const task = (
    <Link
      as="span"
      className="inline cursor-pointer"
      onClick={() => openTaskModal(log.details.id)}
      size="sm"
      underline="hover"
    >
      {log.details.name}
    </Link>
  );

  return <>Removed comment from the task {task}</>;
};

export const DeliverableCreatedLog = ({ log }: { log: DeliverableCreatedLogDto }) => {
  const { openDeliverableModal } = useDeliverableModalVisibility();

  const deliverable = (
    <Link
      as="span"
      className="inline cursor-pointer"
      onClick={() => openDeliverableModal(log.details.id)}
      size="sm"
      underline="hover"
    >
      {log.details.name}
    </Link>
  );

  return <>Created deliverable {deliverable}</>;
};

export const DeliverableUpdatedLog = ({ log }: { log: DeliverableUpdatedLogDto }) => {
  const { id, isContentChanged, name, owner, statusLabel, isDurationChanged } = log.details;
  const { openDeliverableModal } = useDeliverableModalVisibility();

  const deliverable = (
    <Link
      as="span"
      className="inline cursor-pointer"
      onClick={() => openDeliverableModal(id)}
      size="sm"
      underline="hover"
    >
      {name}
    </Link>
  );

  if (isContentChanged) {
    return <>Updated {deliverable} deliverable description</>;
  }

  if (owner) {
    return (
      <>
        Updated {deliverable} deliverable owner to {owner.name}
      </>
    );
  }

  if (isDurationChanged) {
    return <>Updated {deliverable} deliverable duration</>;
  }

  if ('statusLabel' in log.details) {
    return (
      <>
        Updated {deliverable} deliverable status to "{statusLabel ?? 'No status'}"
      </>
    );
  }

  if ('isCompleted' in log.details) {
    return (
      <>
        Marked deliverable {deliverable} as {log.details.isCompleted ? 'completed' : 'not completed'}
      </>
    );
  }

  return <>Renamed {deliverable} deliverable</>;
};

export const DeliverableRemovedLog = ({ log }: { log: DeliverableRemovedLogDto }) => {
  return <>Removed deliverable "{log.details.name}"</>;
};

export const DeliverableTaskAddedLog = ({ log }: { log: DeliverableTaskAddedLogDto }) => {
  const { openTaskModal } = useTaskModalVisibility();
  const { openDeliverableModal } = useDeliverableModalVisibility();

  const task = (
    <Link
      as="span"
      className="inline cursor-pointer"
      onClick={() => openTaskModal(log.details.task.id)}
      size="sm"
      underline="hover"
    >
      {log.details.task.name}
    </Link>
  );

  const deliverable = (
    <Link
      as="span"
      className="inline cursor-pointer"
      onClick={() => openDeliverableModal(log.details.id)}
      size="sm"
      underline="hover"
    >
      {log.details.name}
    </Link>
  );

  return (
    <>
      Linked task {task} to the deliverable {deliverable}
    </>
  );
};

export const DeliverableTaskRemovedLog = ({ log }: { log: DeliverableTaskRemovedLogDto }) => {
  const { openTaskModal } = useTaskModalVisibility();
  const { openDeliverableModal } = useDeliverableModalVisibility();

  const task = (
    <Link
      as="span"
      className="inline cursor-pointer"
      onClick={() => openTaskModal(log.details.task.id)}
      size="sm"
      underline="hover"
    >
      {log.details.task.name}
    </Link>
  );

  const deliverable = (
    <Link
      as="span"
      className="inline cursor-pointer"
      onClick={() => openDeliverableModal(log.details.id)}
      size="sm"
      underline="hover"
    >
      {log.details.name}
    </Link>
  );

  return (
    <>
      Unlinked task {task} from the deliverable {deliverable}
    </>
  );
};

export const ProjectActivityLog = ({ log }: Props) => {
  if (log.type === 'ASSET_UPLOADED') {
    return <AssetUploadedLog log={log} />;
  }

  if (log.type === 'ASSET_UPDATED') {
    return <AssetUpdatedLog log={log} />;
  }

  if (log.type === 'FOLDER_CREATED') {
    return <FolderCreatedLog log={log} />;
  }

  if (log.type === 'ASSETS_ARCHIVED') {
    return <AssetsArchivedLog log={log} />;
  }

  if (log.type === 'ASSETS_RESTORED') {
    return <AssetsRestoredLog log={log} />;
  }

  if (log.type === 'ASSETS_REMOVED') {
    return <AssetsRemovedLog log={log} />;
  }

  if (log.type === 'PROJECT_UPDATED') {
    return <ProjectUpdatedLog log={log} />;
  }

  if (log.type === 'PROJECT_REMOVED') {
    return 'Deleted project';
  }

  if (log.type === 'PROJECT_CREATED') {
    return 'Created project';
  }

  if (log.type === 'PROJECT_MEMBER_INVITED') {
    return <ProjectMemberInvitedLog log={log} />;
  }

  if (log.type === 'PROJECT_MEMBER_JOINED') {
    return <ProjectMemberJoinedLog />;
  }

  if (log.type === 'PROJECT_MEMBER_REMOVED') {
    return <ProjectMemberRemovedLog log={log} />;
  }

  if (log.type === 'PROJECT_MEMBER_LEFT') {
    return <ProjectMemberLeftLog log={log} />;
  }

  if (log.type === 'TASK_CREATED') {
    return <TaskCreatedLog log={log} />;
  }

  if (log.type === 'TASK_UPDATED') {
    return <TaskUpdatedLog log={log} />;
  }

  if (log.type === 'TASK_REMOVED') {
    return <TaskRemovedLog log={log} />;
  }

  if (log.type === 'TASK_ASSET_ADDED') {
    return <TaskAssetAddedLog log={log} />;
  }

  if (log.type === 'TASK_ASSET_REMOVED') {
    return <TaskAssetRemovedLog log={log} />;
  }

  if (log.type === 'TASK_COMMENT_ADDED') {
    return <TaskCommentAddedLog log={log} />;
  }

  if (log.type === 'TASK_COMMENT_REMOVED') {
    return <TaskCommentRemovedLog log={log} />;
  }

  if (log.type === 'DELIVERABLE_CREATED') {
    return <DeliverableCreatedLog log={log} />;
  }

  if (log.type === 'DELIVERABLE_UPDATED') {
    return <DeliverableUpdatedLog log={log} />;
  }

  if (log.type === 'DELIVERABLE_REMOVED') {
    return <DeliverableRemovedLog log={log} />;
  }

  if (log.type === 'DELIVERABLE_TASK_ADDED') {
    return <DeliverableTaskAddedLog log={log} />;
  }

  if (log.type === 'DELIVERABLE_TASK_REMOVED') {
    return <DeliverableTaskRemovedLog log={log} />;
  }

  return <div>{log.type}</div>;
};
