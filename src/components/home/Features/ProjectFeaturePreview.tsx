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
  title: string;
  size: number;
  assignee?: string;
  comments: number;
  status: 'in-progress' | 'review-needed' | 'approved';
}

const initialFiles: FileData[] = [
  {
    title: 'launch_teaser_v1.mp4',
    size: 278,
    comments: 2,
    status: 'approved',
  },
  {
    title: 'walkthrough_v3.mp4',
    size: 278,
    assignee: 'a042581f4e29026024d',
    comments: 12,
    status: 'review-needed',
  },
  {
    title: 'promo_banner_final.png',
    size: 4,
    assignee: 'a042581f4e29026024f',
    comments: 3,
    status: 'in-progress',
  },
];

export const ProjectFeaturePreview = () => {
  const { openSignUpModal } = useSignUpModalVisibility();
  const { isSignedIn } = useSession();

  const isTouchScreen = useIsTouchScreen();

  const [shouldHide, setShouldHide] = useState(false);
  const [selectedTab, setSelectedTab] = useState('media');
  const [files, setFiles] = useState<FileData[]>(initialFiles);

  // Animation state
  const [isAnimating, setIsAnimating] = useState(true);
  const isAnimatingRef = useRef(true);
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

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

      // Step 13: Loop back - reset and restart (after 19s)
      scheduleAction(() => {
        if (isAnimatingRef.current) {
          runAnimationSequence();
        }
      }, 19000);
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <ProjectFeatureFolder title="Product Launch Assets" items={9} size={2.5} />
          <ProjectFeatureFolder title="Product Launch Assets" items={4} size={1.12} />
          {files.map((file, index) => (
            <ProjectFeatureFile
              key={index}
              title={file.title}
              size={file.size}
              assignee={file.assignee}
              comments={file.comments}
              status={file.status}
              onClick={() => {
                setIsAnimating(false);
                setShouldHide(true);
              }}
            />
          ))}
        </div>
      </CardBody>
    </Card>
  );
};
