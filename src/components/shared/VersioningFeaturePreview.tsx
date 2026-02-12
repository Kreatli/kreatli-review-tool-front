'use client';

// eslint-disable-next-line simple-import-sort/imports
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Button, Card, CardBody, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Image } from '@heroui/react';
import { useState } from 'react';

import { Icon } from '../various/Icon';

interface MockVersion {
  id: string;
  label: string;
  filename: string;
  size: string;
  isActive: boolean;
  thumbnailUrl: string;
}

const VIDEO_INITIAL_VERSIONS: MockVersion[] = [
  {
    id: 'v3',
    label: 'v3',
    filename: 'Interview_Final.mp4',
    size: '115 MB',
    isActive: true,
    thumbnailUrl: 'https://picsum.photos/84/56?random=version3',
  },
  {
    id: 'v2',
    label: 'v2',
    filename: 'Interview_Fine_Cut.mp4',
    size: '118 MB',
    isActive: false,
    thumbnailUrl: 'https://picsum.photos/84/56?random=version2',
  },
  {
    id: 'v1',
    label: 'v1',
    filename: 'Interview_Rough_Cut.mp4',
    size: '124 MB',
    isActive: false,
    thumbnailUrl: 'https://picsum.photos/84/56?random=version1',
  },
];

const PDF_INITIAL_VERSIONS: MockVersion[] = [
  {
    id: 'v3',
    label: 'v3',
    filename: 'Pitch_Deck_Final.pdf',
    size: '2.8 MB',
    isActive: true,
    thumbnailUrl: 'https://picsum.photos/84/56?random=pdf3',
  },
  {
    id: 'v2',
    label: 'v2',
    filename: 'Paid v3.pdf',
    size: '2.34 MB',
    isActive: false,
    thumbnailUrl: 'https://picsum.photos/84/56?random=pdf2',
  },
  {
    id: 'v1',
    label: 'v1',
    filename: 'Kreatli Pitch Deck.pdf',
    size: '6.92 MB',
    isActive: false,
    thumbnailUrl: 'https://picsum.photos/84/56?random=pdf1',
  },
];

function reorder<T>(list: T[], fromIndex: number, toIndex: number): T[] {
  const result = [...list];
  const [removed] = result.splice(fromIndex, 1);
  result.splice(toIndex, 0, removed);
  return result;
}

function VersionRow({
  version,
  isMenuOpen,
  onMenuOpenChange,
  variant = 'video',
}: {
  version: MockVersion;
  isMenuOpen: boolean;
  onMenuOpenChange: (open: boolean) => void;
  variant?: 'video' | 'pdf';
}) {
  const [thumbnailError, setThumbnailError] = useState(false);
  const isPdf = variant === 'pdf';
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: version.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 rounded-lg border border-foreground-200 bg-content1 p-3 transition-colors hover:bg-foreground-50"
    >
      {/* Version badge */}
      <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-foreground text-sm font-semibold text-content1">
        {version.label}
      </div>

      {/* Drag handle */}
      <div
        className="flex shrink-0 cursor-grab items-center text-foreground-400 active:cursor-grabbing"
        {...attributes}
        {...listeners}
      >
        <Icon icon="dotsSix" size={16} />
      </div>

      {/* Thumbnail - PDF shows stock pic when thumbnailUrl set, else document icon; video shows image or play fallback */}
      <div className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-md border border-foreground-200 bg-foreground-100">
        {isPdf && (thumbnailError || !version.thumbnailUrl) ? (
          <div className="flex size-full items-center justify-center">
            <Icon icon="filePdf" size={28} className="text-foreground-600" />
          </div>
        ) : isPdf && version.thumbnailUrl ? (
          <Image
            src={version.thumbnailUrl}
            alt={version.filename}
            className="h-full w-full object-cover"
            removeWrapper
            radius="none"
            draggable={false}
            onError={() => setThumbnailError(true)}
          />
        ) : !isPdf && (thumbnailError || !version.thumbnailUrl) ? (
          <>
            <div className="absolute inset-0 flex items-center justify-center bg-foreground-200/80">
              <Icon icon="play" size={20} className="text-foreground-600" />
            </div>
            <div className="h-full w-full bg-gradient-to-b from-foreground-300 to-foreground-400" />
          </>
        ) : (
          <Image
            src={version.thumbnailUrl}
            alt={version.filename}
            className="h-full w-full object-cover"
            removeWrapper
            radius="none"
            draggable={false}
            onError={() => setThumbnailError(true)}
          />
        )}
      </div>

      {/* Filename & size */}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="truncate text-sm font-medium text-foreground-800">{version.filename}</span>
          {version.isActive && (
            <span className="shrink-0 rounded-full bg-foreground-200 px-2.5 py-0.5 text-xs font-medium text-foreground-600">
              Active
            </span>
          )}
        </div>
        <div className="mt-0.5 text-xs text-foreground-500">{version.size}</div>
      </div>

      {/* More options dropdown */}
      <Dropdown isOpen={isMenuOpen} onOpenChange={onMenuOpenChange} placement="bottom-end">
        <DropdownTrigger>
          <button
            type="button"
            className="flex size-8 shrink-0 items-center justify-center rounded-full text-foreground-500 transition-colors hover:bg-foreground-100 hover:text-foreground-700"
            aria-label="Version options"
          >
            <Icon icon="dots" size={18} />
          </button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Version actions" className="min-w-[180px]">
          <DropdownItem key="active" startContent={<Icon icon="check" size={16} />}>
            Mark as Active
          </DropdownItem>
          <DropdownItem
            key="remove"
            className="text-danger"
            color="danger"
            startContent={<Icon icon="trash" size={16} />}
          >
            Remove from stack
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

/**
 * Preview of the "Manage versions" modal for the versioning platform pages.
 * Draggable version list; use variant="video" for video filenames, variant="pdf" for PDF filenames and document icon.
 */
export function VersioningFeaturePreview({ variant = 'video' }: { variant?: 'video' | 'pdf' }) {
  const [versions, setVersions] = useState<MockVersion[]>(
    variant === 'pdf' ? PDF_INITIAL_VERSIONS : VIDEO_INITIAL_VERSIONS,
  );
  const [menuOpen, setMenuOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = versions.findIndex((v) => v.id === active.id);
      const newIndex = versions.findIndex((v) => v.id === over.id);
      if (oldIndex !== -1 && newIndex !== -1) {
        setVersions(reorder(versions, oldIndex, newIndex));
      }
    }
  };

  return (
    <Card className="overflow-hidden border border-foreground-200 shadow-lg">
      <CardBody className="p-0">
        {/* Modal-style header */}
        <div className="border-b border-foreground-200 bg-content1 px-5 py-4">
          <h3 className="text-lg font-semibold text-foreground-700">Manage versions</h3>
        </div>

        {/* Version list */}
        <div className="bg-content1 px-5 py-4">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={versions.map((v) => v.id)} strategy={verticalListSortingStrategy}>
              <div className="flex flex-col gap-2">
                {versions.map((version) => (
                  <VersionRow
                    key={version.id}
                    version={version}
                    isMenuOpen={menuOpen}
                    onMenuOpenChange={setMenuOpen}
                    variant={variant}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-end gap-2 border-t border-foreground-200 bg-content1 px-5 py-4">
          <Button variant="bordered" size="md">
            Cancel
          </Button>
          <Button className="bg-foreground text-content1" size="md">
            Save changes
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
