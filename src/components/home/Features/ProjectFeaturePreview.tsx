import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  closestCenter,
  useDroppable,
} from '@dnd-kit/core';
import { SortableContext, arrayMove, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Avatar, AvatarGroup, Button, Card, CardBody, Input, Tab, Tabs } from '@heroui/react';
import { Icon } from '../../various/Icon';
import { ProjectFeatureFolder } from './ProjectFeatureFolder';
import { ProjectFeatureFile } from './ProjectFeatureFile';
import { useSignUpModalVisibility } from '../../../hooks/useSignUpModalVisibility';
import { useState, useEffect, useRef } from 'react';
import { getIsTouchScreen } from '../../../utils/getIsTouchScreen';
import { useIsTouchScreen } from '../../../hooks/useIsTouchScreen';
import { useSession } from '../../../hooks/useSession';

interface FileData {
  id: string;
  title: string;
  size: number; // size in bytes
  assignee?: string;
  comments: number;
  status: 'in-progress' | 'review-needed' | 'approved' | 'changes-required' | 'no-status';
}

interface FolderData {
  id: string;
  title: string;
  items: number;
  size: number; // size in bytes
}

const initialFolders: FolderData[] = [
  {
    id: 'folder-1',
    title: 'Branding',
    items: 2,
    size: 54.78 * 1024, // 54.78 KB in bytes
  },
  {
    id: 'folder-2',
    title: 'Fundraising',
    items: 2,
    size: 7.06 * 1024 * 1024, // 7.06 MB in bytes
  },
];

const initialFiles: FileData[] = [
  {
    id: 'file-1',
    title: 'Comparative Analysis.pdf',
    size: 231.33 * 1024, // 231.33 KB in bytes
    comments: 0,
    status: 'changes-required',
  },
  {
    id: 'file-2',
    title: 'Kreatli Walkthrough.mp4',
    size: 13.64 * 1024 * 1024, // 13.64 MB in bytes
    comments: 0,
    status: 'no-status',
  },
  {
    id: 'file-3',
    title: 'LandingPage_v2.mov',
    size: 12.71 * 1024 * 1024, // 12.71 MB in bytes
    comments: 3,
    status: 'changes-required',
  },
  {
    id: 'file-4',
    title: 'Brand_Logo_Final.png',
    size: 2.45 * 1024 * 1024, // 2.45 MB in bytes
    comments: 1,
    status: 'approved',
  },
  {
    id: 'file-5',
    title: 'Hero_Image.jpg',
    size: 4.82 * 1024 * 1024, // 4.82 MB in bytes
    comments: 0,
    status: 'review-needed',
  },
  {
    id: 'file-6',
    title: 'Product_Specs.docx',
    size: 856.42 * 1024, // 856.42 KB in bytes
    comments: 2,
    status: 'in-progress',
  },
];

// Sortable File Component
const SortableFile = ({ file, onClick }: { file: FileData; onClick?: () => void }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: file.id,
    disabled: false,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <ProjectFeatureFile
        title={file.title}
        size={file.size}
        assignee={file.assignee}
        comments={file.comments}
        status={file.status}
        onClick={onClick}
      />
    </div>
  );
};

// Droppable Folder Component
const DroppableFolder = ({ folder, isOver }: { folder: FolderData; isOver: boolean }) => {
  const { setNodeRef } = useDroppable({
    id: folder.id,
  });

  return (
    <div
      ref={setNodeRef}
      className={isOver ? 'ring-2 ring-primary ring-offset-2 rounded-2xl' : ''}
    >
      <ProjectFeatureFolder title={folder.title} items={folder.items} size={folder.size} />
    </div>
  );
};

export const ProjectFeaturePreview = () => {
  const { openSignUpModal } = useSignUpModalVisibility();
  const { isSignedIn } = useSession();

  const isTouchScreen = useIsTouchScreen();

  const [shouldHide, setShouldHide] = useState(false);
  const [selectedTab, setSelectedTab] = useState('media');
  const [folders, setFolders] = useState<FolderData[]>(initialFolders);
  const [files, setFiles] = useState<FileData[]>(initialFiles);
  const [filesOrder, setFilesOrder] = useState<string[]>(initialFiles.map((f) => f.id));

  // Drag and drop state
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Animation state
  const [isAnimating, setIsAnimating] = useState(true);
  const isAnimatingRef = useRef(true);
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 3 } }),
    useSensor(TouchSensor, { activationConstraint: { distance: 3 } }),
  );

  // Sort files by order
  const sortedFiles = filesOrder.map((id) => files.find((f) => f.id === id)!).filter(Boolean);

  // Keep ref in sync with state
  useEffect(() => {
    isAnimatingRef.current = isAnimating;
  }, [isAnimating]);

  const handleClick = () => {
    // Stop animation on any click
    setIsAnimating(false);
    if (!isSignedIn) {
      openSignUpModal();
    }
    setShouldHide(true);
  };

  // Animation sequence
  useEffect(() => {
    if (!isAnimating || isTouchScreen) return;

    const clearAllTimeouts = () => {
      timeoutRefs.current.forEach((timeout) => clearTimeout(timeout));
      timeoutRefs.current = [];
    };

    const scheduleAction = (callback: () => void, delay: number) => {
      const timeout = setTimeout(() => {
        if (isAnimatingRef.current) {
          callback();
        }
      }, delay);
      timeoutRefs.current.push(timeout);
    };

    const resetToInitialState = () => {
      setSelectedTab('media');
      setFiles([...initialFiles]);
      setFolders([...initialFolders]);
      setFilesOrder(initialFiles.map((f) => f.id));
      setActiveId(null);
      setOverId(null);
      setIsDragging(false);
    };

    const runAnimationSequence = () => {
      // Start with initial state
      resetToInitialState();

      // Step 1: Switch to Home tab (after 1s)
      scheduleAction(() => {
        setSelectedTab('home');
      }, 1000);

      // Step 2: Switch back to Media tab (after 2.5s)
      scheduleAction(() => {
        setSelectedTab('media');
      }, 2500);

      // Step 3: Change first file status to "review-needed" (after 4s)
      scheduleAction(() => {
        setFiles((prev) => {
          const updated = [...prev];
          updated[0] = { ...updated[0], status: 'review-needed' };
          return updated;
        });
      }, 4000);

      // Step 4: Add assignee to first file (after 5.5s)
      scheduleAction(() => {
        setFiles((prev) => {
          const updated = [...prev];
          updated[0] = { ...updated[0], assignee: 'a042581f4e29026024f', comments: 5 };
          return updated;
        });
      }, 5500);

      // Step 5: Change second file status to "approved" (after 7s)
      scheduleAction(() => {
        setFiles((prev) => {
          const updated = [...prev];
          updated[1] = { ...updated[1], status: 'approved', comments: 15 };
          return updated;
        });
      }, 7000);

      // Step 6: Change assignee of second file (after 8.5s)
      scheduleAction(() => {
        setFiles((prev) => {
          const updated = [...prev];
          updated[1] = { ...updated[1], assignee: 'a042581f4e29026024e' };
          return updated;
        });
      }, 8500);

      // Step 7: Change third file status to "review-needed" (after 10s)
      scheduleAction(() => {
        setFiles((prev) => {
          const updated = [...prev];
          updated[2] = { ...updated[2], status: 'review-needed', comments: 6 };
          return updated;
        });
      }, 10000);

      // Step 8: Change first file status to "approved" (after 11.5s)
      scheduleAction(() => {
        setFiles((prev) => {
          const updated = [...prev];
          updated[0] = { ...updated[0], status: 'approved', comments: 8 };
          return updated;
        });
      }, 11500);

      // Step 9: Switch to Chat tab (after 13s)
      scheduleAction(() => {
        setSelectedTab('chat');
      }, 13000);

      // Step 10: Switch back to Media tab (after 14.5s)
      scheduleAction(() => {
        setSelectedTab('media');
      }, 14500);

      // Step 11: Change third file status to "approved" (after 16s)
      scheduleAction(() => {
        setFiles((prev) => {
          const updated = [...prev];
          updated[2] = { ...updated[2], status: 'approved', comments: 9 };
          return updated;
        });
      }, 16000);

      // Step 12: Remove assignee from first file (after 17.5s)
      scheduleAction(() => {
        setFiles((prev) => {
          const updated = [...prev];
          updated[0] = { ...updated[0], assignee: undefined };
          return updated;
        });
      }, 17500);

      // Step 13: Drag file into folder - start (after 19s)
      scheduleAction(() => {
        setIsDragging(true);
        setActiveId('file-4');
      }, 19000);

      // Step 14: Show file over folder (after 19.5s)
      scheduleAction(() => {
        setOverId('folder-1');
      }, 19500);

      // Step 15: Complete drag into folder (after 20.5s)
      scheduleAction(() => {
        // Move file into folder (remove from files, update folder)
        setFiles((prev) => {
          const fileToMove = prev.find((f) => f.id === 'file-4');
          if (fileToMove) {
            setFolders((prevFolders) => {
              const updated = [...prevFolders];
              const folderIndex = updated.findIndex((f) => f.id === 'folder-1');
              if (folderIndex !== -1) {
                updated[folderIndex] = {
                  ...updated[folderIndex],
                  items: updated[folderIndex].items + 1,
                  size: updated[folderIndex].size + fileToMove.size,
                };
              }
              return updated;
            });
            setFilesOrder((prevOrder) => prevOrder.filter((id) => id !== 'file-4'));
          }
          return prev.filter((f) => f.id !== 'file-4');
        });
        setActiveId(null);
        setOverId(null);
        setIsDragging(false);
      }, 20500);

      // Step 16: Reorder files - start drag (after 22s)
      scheduleAction(() => {
        setIsDragging(true);
        setActiveId('file-2');
      }, 22000);

      // Step 17: Move file to new position (after 23s)
      scheduleAction(() => {
        setFilesOrder((prev) => {
          const oldIndex = prev.indexOf('file-2');
          const newIndex = prev.indexOf('file-5');
          if (oldIndex !== -1 && newIndex !== -1) {
            return arrayMove(prev, oldIndex, newIndex);
          }
          return prev;
        });
        setActiveId(null);
        setIsDragging(false);
      }, 23000);

      // Step 18: Loop back - reset and restart (after 25s)
      scheduleAction(() => {
        if (isAnimatingRef.current) {
          runAnimationSequence();
        }
      }, 25000);
    };

    // Start animation after a short delay
    const initialTimeout = setTimeout(() => {
      if (isAnimatingRef.current) {
        runAnimationSequence();
      }
    }, 500);
    timeoutRefs.current.push(initialTimeout);

    return () => {
      clearAllTimeouts();
      clearTimeout(initialTimeout);
    };
  }, [isAnimating, isTouchScreen]);

  const handleDragStart = (event: DragStartEvent) => {
    if (!isAnimating) {
      setActiveId(event.active.id as string);
      setIsDragging(true);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    if (!isAnimating) {
      setOverId((event.over?.id ?? null) as string | null);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    setOverId(null);
    setIsDragging(false);

    if (!over || active.id === over.id || isAnimating) {
      return;
    }

    const isOverFolder = (over.id as string).startsWith('folder-');
    const overFolderId = over.id as string;

    if (isOverFolder) {
      // Move file into folder
      const fileToMove = files.find((f) => f.id === active.id);
      if (fileToMove) {
        setFiles((prev) => prev.filter((f) => f.id !== active.id));
        setFolders((prev) => {
          const updated = [...prev];
          const folderIndex = updated.findIndex((f) => f.id === overFolderId);
          if (folderIndex !== -1) {
            updated[folderIndex] = {
              ...updated[folderIndex],
              items: updated[folderIndex].items + 1,
              size: updated[folderIndex].size + fileToMove.size,
            };
          }
          return updated;
        });
        setFilesOrder((prev) => prev.filter((id) => id !== active.id));
      }
    } else {
      // Reorder files
      const oldIndex = filesOrder.indexOf(active.id as string);
      const newIndex = filesOrder.indexOf(over.id as string);

      if (oldIndex !== -1 && newIndex !== -1) {
        setFilesOrder(arrayMove(filesOrder, oldIndex, newIndex));
      }
    }
  };

  const activeFile = activeId ? sortedFiles.find((f) => f.id === activeId) : null;

  return (
    <Card className="relative group">
      <div
        className={`opacity-0 transition-opacity duration-300 pointer-events-none absolute inset-0 bg-black/30 dark:bg-black/60 z-10 ${
          shouldHide || isTouchScreen ? '' : 'group-hover:opacity-100'
        }`}
      />
      <CardBody
        className="min-h-96 flex flex-col gap-4 p-4"
        onClick={() => {
          setIsAnimating(false);
          setShouldHide(true);
        }}
      >
        <div className="flex justify-between items-center border-b border-foreground-200 pb-4">
          <div className="flex items-center gap-2">
            <div className="bg-foreground-100 p-2.5 rounded-lg">
              <Icon icon="slides" />
            </div>
            <div className="flex flex-col">
              <div className="font-semibold">Vision review</div>
              <div className="text-sm text-foreground-500">27 items, 2.45GB</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <AvatarGroup size="sm" max={2} total={6} isBordered>
              <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
              <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024f" />
            </AvatarGroup>
            <div className="hidden sm:block">
              <Button className="text-content1 bg-foreground" onClick={handleClick}>
                <Icon icon="plus" size={16} />
                New
                <Icon icon="chevronDown" size={16} />
              </Button>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center gap-4">
          <Tabs
            selectedKey={selectedTab}
            onSelectionChange={(key) => {
              setIsAnimating(false);
              setSelectedTab(key as string);
              handleClick();
            }}
          >
            <Tab key="home" title="Home" />
            <Tab key="media" title="Media" />
            <Tab key="chat" title="Chat" />
            <Tab key="activity" title="Activity" />
          </Tabs>
          <div className="items-center gap-2 hidden sm:flex">
            <Button size="sm" variant="faded" onClick={handleClick}>
              Filters
            </Button>
            <Input
              size="sm"
              placeholder="Search"
              startContent={<Icon icon="search" size={16} className="text-foreground-500" />}
            />
          </div>
        </div>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {folders.map((folder, index) => (
                <div key={folder.id} className={index >= 2 ? 'hidden sm:block' : ''}>
                  <DroppableFolder
                    folder={folder}
                    isOver={overId === folder.id && activeId?.startsWith('file-')}
                  />
                </div>
              ))}
            </div>
            <SortableContext items={filesOrder} strategy={undefined}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {sortedFiles.map((file, index) => (
                  <div key={file.id} className={index >= 3 ? 'hidden md:block' : ''}>
                    <SortableFile
                      file={file}
                      onClick={() => {
                        setIsAnimating(false);
                        setShouldHide(true);
                      }}
                    />
                  </div>
                ))}
              </div>
            </SortableContext>
          </div>
          <DragOverlay>
            {activeFile ? (
              <div className="opacity-80 rotate-2 scale-105">
                <ProjectFeatureFile
                  title={activeFile.title}
                  size={activeFile.size}
                  assignee={activeFile.assignee}
                  comments={activeFile.comments}
                  status={activeFile.status}
                />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </CardBody>
    </Card>
  );
};
