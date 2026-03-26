import { isSortable } from '@dnd-kit/dom/sortable';
import { move } from '@dnd-kit/helpers';
import { DragDropProvider } from '@dnd-kit/react';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';

import { usePostTaskIdMove, usePutProjectId } from '../../../services/hooks';
import { getProjectId, getProjectIdTasksBoard } from '../../../services/services';
import { ProjectDto, TaskInfoDto, TasksColumn } from '../../../services/types';
import { BoardColumn } from './BoardColumn';
import { BoardTask } from './BoardTask';
import { BoardTaskRemoveModal } from './BoardTaskRemoveModal';
import { BoardTaskRenameModal } from './BoardTaskRenameModal';

interface Props {
  projectId: string;
  columns: TasksColumn[];
}

export const Board = ({ projectId, columns }: Props) => {
  const queryClient = useQueryClient();

  const [selectedTaskId, setSelectedTaskId] = useState<string | undefined>(undefined);
  const [isTaskRenameModalVisible, setIsTaskRenameModalVisible] = useState(false);
  const [isTaskRemoveModalVisible, setIsTaskRemoveModalVisible] = useState(false);

  const { mutate: updateProject } = usePutProjectId();
  const { mutate: moveTask } = usePostTaskIdMove();

  const [items, setItems] = useState(() =>
    columns.reduce(
      (acc, column) => {
        acc[column.value] = column.tasks.map((task) => task.id);
        return acc;
      },
      {} as Record<string, string[]>,
    ),
  );

  const [columnOrder, setColumnOrder] = useState(() => columns.map((column) => column.value));

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setColumnOrder(columns.map((column) => column.value));
    setItems(() =>
      columns.reduce(
        (acc, column) => {
          acc[column.value] = column.tasks.map((task) => task.id);
          return acc;
        },
        {} as Record<string, string[]>,
      ),
    );
  }, [columns]);

  const columnLabels = useMemo(() => {
    return columns.reduce(
      (acc, column) => {
        acc[column.value] = column.name;
        return acc;
      },
      {} as Record<string, string>,
    );
  }, [columns]);

  const tasks = useMemo(() => {
    return columns
      .flatMap((column) => column.tasks)
      .reduce(
        (acc, task) => {
          acc[task.id] = task;
          return acc;
        },
        {} as Record<string, TaskInfoDto>,
      );
  }, [columns]);

  const updateColumnOrder = (columnOrder: string[]) => {
    const project = queryClient.getQueryData<ProjectDto>([getProjectId.key, projectId]);

    if (!project) {
      return;
    }

    const reorderedStatuses = [...project.taskStatuses].sort(
      (a, b) => columnOrder.indexOf(a.value) - columnOrder.indexOf(b.value),
    );

    setColumnOrder(columnOrder);

    queryClient.setQueryData([getProjectId.key, projectId], { ...project, taskStatuses: reorderedStatuses });

    updateProject(
      { id: projectId, requestBody: { taskStatuses: reorderedStatuses } },
      {
        onSuccess: (data) => {
          queryClient.setQueryData([getProjectId.key, projectId], data);
        },
      },
    );
  };

  const updateTaskOrder = (taskId: string, status: string, index: number) => {
    const prevTaskId = items[status][index - 1] ?? null;
    const nextTaskId = items[status][index + 1] ?? null;

    moveTask(
      { id: taskId, requestBody: { status: status === 'unplaced' ? undefined : status, prevTaskId, nextTaskId } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [getProjectIdTasksBoard.key, projectId] });
        },
      },
    );
  };

  return (
    <>
      <DragDropProvider
        onDragOver={(event) => {
          const { source } = event.operation;

          if (source?.type === 'column') return;

          setItems((items) => move(items, event));
        }}
        onDragEnd={(event) => {
          const { source, target } = event.operation;

          if (event.canceled) return;

          if (source?.type !== 'column' && isSortable(target)) {
            console.log({ target });
            updateTaskOrder(source?.id as string, (target.group ?? target.id) as string, target.index);

            return;
          }

          const newColumnOrder = move(columnOrder, event);

          updateColumnOrder(newColumnOrder);
        }}
      >
        <div className="flex flex-1 gap-4 overflow-x-auto p-3 px-3 pt-0 sm:px-4">
          {columnOrder.map((column, columnIndex) => (
            <BoardColumn
              key={column}
              projectId={projectId}
              isDisabled={columnIndex === 0}
              id={column}
              counter={items[column].length}
              index={columnIndex}
              name={columnLabels[column]}
            >
              {items[column].map((id, index) =>
                tasks[id] ? (
                  <BoardTask
                    key={id}
                    id={id}
                    index={index}
                    column={column}
                    task={tasks[id]}
                    onRemove={() => setIsTaskRemoveModalVisible(true)}
                    onRename={() => setIsTaskRenameModalVisible(true)}
                    onClick={() => setSelectedTaskId(id)}
                  />
                ) : null,
              )}
            </BoardColumn>
          ))}
        </div>
      </DragDropProvider>
      <BoardTaskRemoveModal
        projectId={projectId}
        taskId={selectedTaskId}
        isVisible={isTaskRemoveModalVisible}
        onClose={() => {
          setIsTaskRemoveModalVisible(false);
        }}
      />
      <BoardTaskRenameModal
        projectId={projectId}
        taskId={selectedTaskId}
        name={tasks[selectedTaskId as string]?.name}
        isVisible={isTaskRenameModalVisible}
        onClose={() => {
          setIsTaskRenameModalVisible(false);
        }}
      />
    </>
  );
};
