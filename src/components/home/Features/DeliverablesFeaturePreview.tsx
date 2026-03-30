import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardBody,
  Chip,
  ChipProps,
  cn,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Selection,
} from '@heroui/react';
import { useMemo, useState } from 'react';

import { useIsTouchScreen } from '../../../hooks/useIsTouchScreen';
import { useSession } from '../../../hooks/useSession';
import { useSignUpModalVisibility } from '../../../hooks/useSignUpModalVisibility';
import { Icon } from '../../various/Icon';

type DeliverableStatus = 'Draft' | 'In review' | 'Approved' | 'Changes required';
type ViewMode = 'list' | 'timeline';

interface DeliverableRow {
  id: string;
  title: string;
  dueLabel: string;
  status: DeliverableStatus;
  statusColor: ChipProps['color'];
  assignees: string[];
}

const initialDeliverables: DeliverableRow[] = [
  {
    id: 'd1',
    title: 'Hero cut (16:9) — v4',
    dueLabel: 'Due Tue',
    status: 'In review',
    statusColor: 'primary',
    assignees: ['deliverables-alex', 'deliverables-sam', 'deliverables-jordan'],
  },
  {
    id: 'd2',
    title: 'Social cutdowns (9:16)',
    dueLabel: 'Due Thu',
    status: 'Draft',
    statusColor: 'default',
    assignees: ['deliverables-morgan'],
  },
  {
    id: 'd3',
    title: 'Client delivery pack (ZIP)',
    dueLabel: 'Due Fri',
    status: 'Approved',
    statusColor: 'success',
    assignees: ['deliverables-taylor', 'deliverables-casey'],
  },
];

const STATUS_OPTIONS: Array<{ key: DeliverableStatus; color: ChipProps['color'] }> = [
  { key: 'Draft', color: 'default' },
  { key: 'In review', color: 'primary' },
  { key: 'Approved', color: 'success' },
  { key: 'Changes required', color: 'danger' },
];

export const DeliverablesFeaturePreview = () => {
  const { openSignUpModal } = useSignUpModalVisibility();
  const { isSignedIn } = useSession();
  const isTouchScreen = useIsTouchScreen();

  const [shouldHide, setShouldHide] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [rows, setRows] = useState<DeliverableRow[]>(initialDeliverables);

  const statusByKey = useMemo(() => new Map(STATUS_OPTIONS.map((s) => [s.key, s])), []);

  const handleClick = () => {
    if (!isSignedIn) {
      openSignUpModal();
    }
    setShouldHide(true);
  };

  const handleStatusChange = (id: string, keys: Selection) => {
    setShouldHide(true);
    if (keys === 'all') return;
    const nextKey = keys.values().next().value as DeliverableStatus;
    const cfg = statusByKey.get(nextKey);
    if (!cfg) return;

    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status: cfg.key, statusColor: cfg.color } : r)));
  };

  const renderListView = () => {
    return (
      <div className="flex flex-col overflow-hidden rounded-large border border-foreground-200">
        <div className="grid grid-cols-[1.4fr_0.7fr_0.7fr_0.6fr_0.6fr_32px] gap-3 bg-foreground-50 px-3 py-2 text-xs font-semibold text-foreground-500">
          <div className="truncate">Title</div>
          <div className="truncate">Owner</div>
          <div className="truncate">Status</div>
          <div className="truncate">Start date</div>
          <div className="truncate">Due date</div>
          <div />
        </div>

        <div className="divide-y divide-foreground-200 bg-content1">
          {rows.map((d) => (
            <div
              key={d.id}
              className="grid grid-cols-[1.4fr_0.7fr_0.7fr_0.6fr_0.6fr_32px] items-center gap-3 px-3 py-3 text-sm transition-colors hover:bg-foreground-50"
              role="button"
              tabIndex={0}
              onClick={handleClick}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleClick();
              }}
            >
              <div className="min-w-0">
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-foreground-100">
                    <Icon icon="checkCircle" size={16} className="text-foreground-600" />
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold">{d.title}</div>
                    <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-foreground-500">
                      <span className="flex items-center gap-1">
                        <Icon icon="time" size={12} />
                        {d.dueLabel}
                      </span>
                      <span className="text-foreground-300">•</span>
                      <span className="flex items-center gap-1">
                        <Icon icon="group" size={12} />
                        {d.assignees.length} assigned
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <AvatarGroup size="sm" max={2} isBordered>
                  {d.assignees.map((seed) => (
                    <Avatar key={seed} src={`https://i.pravatar.cc/150?u=${seed}`} />
                  ))}
                </AvatarGroup>
              </div>

              <div className="flex items-center">
                <Dropdown placement="bottom-start">
                  <DropdownTrigger>
                    <Chip
                      size="sm"
                      variant="flat"
                      color={d.statusColor}
                      className="cursor-pointer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {d.status}
                    </Chip>
                  </DropdownTrigger>
                  <DropdownMenu
                    selectionMode="single"
                    disallowEmptySelection
                    selectedKeys={[d.status]}
                    onSelectionChange={(keys) => handleStatusChange(d.id, keys)}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <DropdownItem key={s.key}>{s.key}</DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </div>

              <div className="text-xs text-foreground-400">—</div>
              <div className="text-xs font-medium text-foreground-600">{d.dueLabel}</div>

              <div className="flex items-center justify-end">
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  radius="full"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClick();
                  }}
                >
                  <Icon icon="dots" size={16} className="text-foreground-500" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderTimelineView = () => {
    return (
      <div className="overflow-hidden rounded-large border border-foreground-200 bg-content1">
        <div className="grid grid-cols-[220px_1fr] border-b border-foreground-200 bg-foreground-50">
          <div className="px-3 py-2 text-xs font-semibold text-foreground-500">Deliverable</div>
          <div className="px-3 py-2 text-xs font-semibold text-foreground-500"> </div>
        </div>
        <div className="grid grid-cols-[220px_1fr]">
          <div className="divide-y divide-foreground-200 border-r border-foreground-200">
            {rows.map((d) => (
              <div key={d.id} className="flex items-center gap-2 px-3 py-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-foreground-100">
                  <Icon icon="checkCircle" size={16} className="text-foreground-600" />
                </div>
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold">{d.title}</div>
                  <div className="mt-0.5 text-xs text-foreground-500">{d.dueLabel}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="relative">
            <div className="absolute inset-0 grid grid-cols-10">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className={cn('border-l border-foreground-200/70', i === 0 && 'border-l-0')} />
              ))}
            </div>
            <div className="relative divide-y divide-foreground-200">
              {rows.map((d) => (
                <div
                  key={d.id}
                  className="flex h-[64px] items-center px-3"
                  role="button"
                  tabIndex={0}
                  onClick={handleClick}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') handleClick();
                  }}
                >
                  <div
                    className={cn('h-8 w-full max-w-[90%] rounded-large px-3 py-1.5 text-xs font-semibold', {
                      'bg-foreground-100 text-foreground-600': d.status === 'Draft',
                      'bg-primary/20 text-primary-700 dark:text-primary-400': d.status === 'In review',
                      'bg-success/20 text-success-700 dark:text-success-400': d.status === 'Approved',
                      'bg-danger/20 text-danger-700 dark:text-danger-400': d.status === 'Changes required',
                    })}
                    style={{
                      width:
                        d.status === 'Draft'
                          ? '35%'
                          : d.status === 'In review'
                            ? '70%'
                            : d.status === 'Approved'
                              ? '85%'
                              : '60%',
                    }}
                  >
                    <div className="truncate">{d.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card className="group relative">
      <div
        className={cn(
          'pointer-events-none absolute inset-0 z-10 bg-black/30 opacity-0 transition-opacity duration-300 dark:bg-black/60',
          {
            'group-hover:opacity-100': !shouldHide && !isTouchScreen,
          },
        )}
      />
      <CardBody
        className="relative flex min-h-96 flex-col gap-4 p-4"
        onClick={() => {
          setShouldHide(true);
        }}
      >
        <div className="flex items-center justify-between border-b border-foreground-200 pb-4">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-foreground-100 p-2.5">
              <Icon icon="calendar" />
            </div>
            <div className="flex flex-col">
              <div className="font-semibold">Spring Campaign</div>
              <div className="text-sm text-foreground-500">Deliverables · 3 upcoming</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <AvatarGroup size="sm" max={2} total={5} isBordered>
                <Avatar src="https://i.pravatar.cc/150?u=deliverables-a" />
                <Avatar src="https://i.pravatar.cc/150?u=deliverables-b" />
              </AvatarGroup>
            </div>
            <Button className="bg-foreground text-content1" size="sm" onClick={handleClick}>
              <Icon icon="plus" size={16} />
              New
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 rounded-large border border-foreground-200 bg-content1 p-1">
            <Button
              size="sm"
              variant={viewMode === 'list' ? 'solid' : 'light'}
              className={cn(viewMode === 'list' && 'bg-foreground text-content1')}
              onClick={(e) => {
                e.stopPropagation();
                setShouldHide(true);
                setViewMode('list');
              }}
              startContent={<Icon icon="list" size={16} />}
            >
              List
            </Button>
            <Button
              size="sm"
              variant={viewMode === 'timeline' ? 'solid' : 'light'}
              className={cn(viewMode === 'timeline' && 'bg-foreground text-content1')}
              onClick={(e) => {
                e.stopPropagation();
                setShouldHide(true);
                setViewMode('timeline');
              }}
              startContent={<Icon icon="time" size={16} />}
            >
              Timeline
            </Button>
          </div>

          <Button
            size="sm"
            variant="bordered"
            className="hidden sm:flex"
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
            startContent={<Icon icon="gear" size={16} />}
          >
            Manage statuses
          </Button>
        </div>

        {viewMode === 'list' ? renderListView() : renderTimelineView()}
      </CardBody>
    </Card>
  );
};
