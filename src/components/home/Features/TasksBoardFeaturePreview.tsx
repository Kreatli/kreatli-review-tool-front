import { Avatar, Card, CardBody, Chip } from '@heroui/react';

import { useRef, useState } from 'react';

import { useSession } from '../../../hooks/useSession';
import { useSignUpModalVisibility } from '../../../hooks/useSignUpModalVisibility';
import { Icon } from '../../various/Icon';

interface TaskCard {
  id: string;
  title: string;
  responsible: string;
  avatarUrl: string;
  hasMedia: boolean;
  contributorCount: number;
}

interface StageColumn {
  id: string;
  label: string;
  tasks: TaskCard[];
}

const columns: StageColumn[] = [
  {
    id: 'briefing',
    label: 'Briefing',
    tasks: [
      {
        id: 't1',
        title: 'Write campaign brief',
        responsible: 'Alex',
        avatarUrl: 'https://i.pravatar.cc/150?u=taskboard-alex',
        hasMedia: true,
        contributorCount: 2,
      },
      {
        id: 't2',
        title: 'Collect brand assets',
        responsible: 'Sam',
        avatarUrl: 'https://i.pravatar.cc/150?u=taskboard-sam',
        hasMedia: true,
        contributorCount: 1,
      },
    ],
  },
  {
    id: 'production',
    label: 'Production',
    tasks: [
      {
        id: 't3',
        title: 'Edit hero video v3',
        responsible: 'Jordan',
        avatarUrl: 'https://i.pravatar.cc/150?u=taskboard-jordan',
        hasMedia: true,
        contributorCount: 3,
      },
    ],
  },
  {
    id: 'review',
    label: 'Client Review',
    tasks: [
      {
        id: 't4',
        title: 'Final cut sign-off',
        responsible: 'Taylor',
        avatarUrl: 'https://i.pravatar.cc/150?u=taskboard-taylor',
        hasMedia: false,
        contributorCount: 1,
      },
      {
        id: 't5',
        title: 'Social media cutdowns',
        responsible: 'Casey',
        avatarUrl: 'https://i.pravatar.cc/150?u=taskboard-casey',
        hasMedia: true,
        contributorCount: 2,
      },
    ],
  },
  {
    id: 'delivered',
    label: 'Delivered',
    tasks: [
      {
        id: 't6',
        title: 'Teaser trailer v2',
        responsible: 'Morgan',
        avatarUrl: 'https://i.pravatar.cc/150?u=taskboard-morgan',
        hasMedia: true,
        contributorCount: 2,
      },
    ],
  },
];

export const TasksBoardFeaturePreview = () => {
  const { openSignUpModal } = useSignUpModalVisibility();
  const { isSignedIn } = useSession();

  // Keep a local copy so drag-and-drop works visually even when signed out.
  const [board, setBoard] = useState<StageColumn[]>(() => columns.map((c) => ({ ...c, tasks: [...c.tasks] })));
  const [draggingTaskId, setDraggingTaskId] = useState<string | null>(null);
  const isDraggingRef = useRef(false);

  const moveTaskToColumn = (taskId: string, toColumnId: string) => {
    setBoard((prev) => {
      const fromColumnIndex = prev.findIndex((c) => c.tasks.some((t) => t.id === taskId));
      if (fromColumnIndex === -1) return prev;

      const fromColumn = prev[fromColumnIndex];
      const task = fromColumn.tasks.find((t) => t.id === taskId);
      if (!task) return prev;

      return prev.map((c) => {
        if (c.id === fromColumn.id) return { ...c, tasks: c.tasks.filter((t) => t.id !== taskId) };
        if (c.id === toColumnId) return { ...c, tasks: [...c.tasks, task] };
        return c;
      });
    });
  };

  return (
    <Card className="relative">
      <CardBody className="flex min-h-[420px] flex-col gap-4 overflow-x-auto p-4">
        <div className="flex items-center justify-between border-b border-foreground-200 pb-3">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-foreground-100 p-2">
              <Icon icon="board" size={22} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold">Spring Campaign</span>
              <span className="text-xs text-foreground-400">Tasks board &middot; 4 stages</span>
            </div>
          </div>
          <Chip size="sm" variant="flat" className="hidden sm:flex">
            Drag between stages to advance work
          </Chip>
        </div>

        <div className="grid min-w-[680px] flex-1 grid-cols-4 gap-3">
          {board.map((col) => (
            <div
              key={col.id}
              className="flex flex-col gap-2"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (!draggingTaskId) return;
                moveTaskToColumn(draggingTaskId, col.id);
                setDraggingTaskId(null);
                isDraggingRef.current = false;
              }}
            >
              <div className="flex items-center justify-between rounded-lg bg-foreground-50 px-3 py-2 dark:bg-foreground-100/30">
                <span className="text-xs font-semibold uppercase tracking-wider text-foreground-500">
                  {col.label}
                </span>
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-foreground-200/60 text-[10px] font-bold text-foreground-600">
                  {col.tasks.length}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                {col.tasks.map((task) => (
                  <button
                    key={task.id}
                    type="button"
                    draggable
                    onDragStart={(e) => {
                      isDraggingRef.current = true;
                      setDraggingTaskId(task.id);
                      e.dataTransfer.effectAllowed = 'move';
                    }}
                    onDragEnd={() => {
                      isDraggingRef.current = false;
                      setDraggingTaskId(null);
                    }}
                    onClick={() => {
                      // Do not sign-up gate drag interactions; only gate explicit clicks.
                      if (!isSignedIn && !isDraggingRef.current) openSignUpModal();
                    }}
                    className="rounded-lg border border-foreground-200 bg-content1 p-3 text-left shadow-sm transition-all hover:border-primary/50 hover:shadow-md"
                  >
                    <p className="text-sm font-medium leading-snug">{task.title}</p>

                    <div className="mt-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Avatar size="sm" src={task.avatarUrl} className="h-5 w-5" />
                        <span className="text-[11px] text-foreground-400">{task.responsible}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {task.hasMedia && (
                          <span className="flex items-center gap-0.5 text-foreground-400">
                            <Icon icon="images" size={12} />
                          </span>
                        )}
                        {task.contributorCount > 0 && (
                          <span className="flex items-center gap-0.5 text-foreground-400">
                            <Icon icon="group" size={12} />
                            <span className="text-[10px]">{task.contributorCount}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};
