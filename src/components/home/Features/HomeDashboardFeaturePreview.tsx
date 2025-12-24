import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardBody,
  Checkbox,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Selection,
  Tab,
  Tabs,
  cn,
} from '@heroui/react';
import { Icon } from '../../various/Icon';
import { useSignUpModalVisibility } from '../../../hooks/useSignUpModalVisibility';
import { useState, useEffect, useRef } from 'react';
import { useSession } from '../../../hooks/useSession';
import { useIsTouchScreen } from '../../../hooks/useIsTouchScreen';

export const HomeDashboardFeaturePreview = () => {
  const { openSignUpModal } = useSignUpModalVisibility();
  const { isSignedIn } = useSession();
  const isTouchScreen = useIsTouchScreen();
  const [shouldHide, setShouldHide] = useState(false);
  const [selectedTab, setSelectedTab] = useState('home');
  const [checklistItems, setChecklistItems] = useState({
    inviteGreg: true,
    uploadMedia: false,
    makeAdjustments: false,
  });
  const [mediaItems, setMediaItems] = useState([
    { status: 'Approved', color: 'success', image: 'random=1', user: 'a042581f4e29026024d' },
    { status: 'Changes required', color: 'danger', image: 'random=2', user: 'a042581f4e29026024d' },
    { status: 'No status', color: 'default', image: 'random=3', user: null },
  ]);

  // Animation state
  const [isAnimating, setIsAnimating] = useState(true);
  const isAnimatingRef = useRef(true);
  const animationStepRef = useRef(0);
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  // Keep ref in sync with state
  useEffect(() => {
    isAnimatingRef.current = isAnimating;
  }, [isAnimating]);

  const handleChecklistChange = (key: keyof typeof checklistItems) => {
    setIsAnimating(false);
    setChecklistItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleStatusChange = (idx: number, keys: Selection) => {
    setIsAnimating(false);
    if (keys !== 'all') {
      const newStatus = keys.values().next().value as string;
      setMediaItems((prev) => {
        const updated = [...prev];
        const statusMap: Record<string, { label: string; color: string }> = {
          'Changes required': { label: 'Changes required', color: 'danger' },
          Approved: { label: 'Approved', color: 'success' },
          'No status': { label: 'No status', color: 'default' },
        };
        updated[idx] = {
          ...updated[idx],
          status: statusMap[newStatus]?.label || updated[idx].status,
          color: statusMap[newStatus]?.color || updated[idx].color,
        };
        return updated;
      });
    }
  };

  const handleAssigneeChange = (idx: number, keys: Selection) => {
    setIsAnimating(false);
    if (keys !== 'all') {
      const newUser = keys.values().next().value ?? null;
      setMediaItems((prev) => {
        const updated = [...prev];
        updated[idx] = { ...updated[idx], user: newUser as string | null };
        return updated;
      });
    }
  };

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
      setSelectedTab('home');
      setChecklistItems({
        inviteGreg: true,
        uploadMedia: false,
        makeAdjustments: false,
      });
      setMediaItems([
        { status: 'Approved', color: 'success', image: 'random=1', user: 'a042581f4e29026024d' },
        { status: 'Changes required', color: 'danger', image: 'random=2', user: 'a042581f4e29026024d' },
        { status: 'No status', color: 'default', image: 'random=3', user: null },
      ]);
    };

    const runAnimationSequence = () => {
      // Start with initial state
      resetToInitialState();
      animationStepRef.current = 0;

      // Step 1: Switch to Media tab (after 1s)
      scheduleAction(() => {
        setSelectedTab('media');
        animationStepRef.current = 1;
      }, 1000);

      // Step 2: Switch to Chat tab (after 2.5s)
      scheduleAction(() => {
        setSelectedTab('chat');
        animationStepRef.current = 2;
      }, 2500);

      // Step 3: Switch back to Home tab (after 4s)
      scheduleAction(() => {
        setSelectedTab('home');
        animationStepRef.current = 3;
      }, 4000);

      // Step 4: Toggle "Upload Media" checkbox (after 5.5s)
      scheduleAction(() => {
        setChecklistItems((prev) => ({ ...prev, uploadMedia: !prev.uploadMedia }));
        animationStepRef.current = 4;
      }, 5500);

      // Step 5: Toggle "Make Adjustments" checkbox (after 7s)
      scheduleAction(() => {
        setChecklistItems((prev) => ({ ...prev, makeAdjustments: !prev.makeAdjustments }));
        animationStepRef.current = 5;
      }, 7000);

      // Step 6: Change status of first media item to "Changes required" (after 8.5s)
      scheduleAction(() => {
        setMediaItems((prev) => {
          const updated = [...prev];
          updated[0] = {
            ...updated[0],
            status: 'Changes required',
            color: 'danger',
          };
          return updated;
        });
        animationStepRef.current = 6;
      }, 8500);

      // Step 7: Change status of second media item to "Approved" (after 10s)
      scheduleAction(() => {
        setMediaItems((prev) => {
          const updated = [...prev];
          updated[1] = {
            ...updated[1],
            status: 'Approved',
            color: 'success',
          };
          return updated;
        });
        animationStepRef.current = 7;
      }, 10000);

      // Step 8: Change assignee of first media item (after 11.5s)
      scheduleAction(() => {
        setMediaItems((prev) => {
          const updated = [...prev];
          updated[0] = {
            ...updated[0],
            user: 'a042581f4e29026024f', // Martin D.
          };
          return updated;
        });
        animationStepRef.current = 8;
      }, 11500);

      // Step 9: Add assignee to third media item (after 13s)
      scheduleAction(() => {
        setMediaItems((prev) => {
          const updated = [...prev];
          updated[2] = {
            ...updated[2],
            user: 'a042581f4e29026024e', // George M.
          };
          return updated;
        });
        animationStepRef.current = 9;
      }, 13000);

      // Step 10: Change status of third media item to "Approved" (after 14.5s)
      scheduleAction(() => {
        setMediaItems((prev) => {
          const updated = [...prev];
          updated[2] = {
            ...updated[2],
            status: 'Approved',
            color: 'success',
          };
          return updated;
        });
        animationStepRef.current = 10;
      }, 14500);

      // Step 11: Toggle "Invite Greg" checkbox (after 16s)
      scheduleAction(() => {
        setChecklistItems((prev) => ({ ...prev, inviteGreg: !prev.inviteGreg }));
        animationStepRef.current = 11;
      }, 16000);

      // Step 12: Switch to Activity tab (after 17.5s)
      scheduleAction(() => {
        setSelectedTab('activity');
        animationStepRef.current = 12;
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
      <CardBody
        className="flex flex-col gap-3 p-4 relative"
        onClick={() => {
          setIsAnimating(false);
          setShouldHide(true);
        }}
      >
        <div
          className={`opacity-0 transition-opacity duration-300 pointer-events-none absolute inset-0 bg-black/30 dark:bg-black/60 z-10 ${
            shouldHide || isTouchScreen ? '' : 'group-hover:opacity-100'
          }`}
        />
        {/* Header */}
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
            <div className="relative z-20">
              <AvatarGroup size="sm" max={2} total={6} isBordered>
                <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024f" />
              </AvatarGroup>
            </div>
            <div className="hidden sm:block">
              <Button className="text-content1 bg-foreground" onClick={handleClick}>
                <Icon icon="plus" size={16} />
                New
                <Icon icon="chevronDown" size={16} />
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex">
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
        </div>

        {/* Main Content - Three Panel Layout */}
        <div className="flex flex-col gap-3 flex-1 overflow-hidden">
          {/* Top Row: Project Overview (left) + Chat (right) */}
          <div className="grid grid-cols-1 xl:grid-cols-[3fr_2fr] gap-3 flex-shrink-0">
            {/* Project Overview */}
            <div className="rounded-large p-3 flex flex-col gap-1 border border-foreground-200">
              <div className="flex items-center justify-between">
                <div className="font-semibold text-sm">Example - Project overview</div>
                <Button
                  isIconOnly
                  size="sm"
                  variant="flat"
                  radius="full"
                  color="primary"
                  onClick={handleClick}
                  className="relative z-30"
                >
                  <Icon icon="edit" size={18} />
                </Button>
              </div>
              <div className="text-sm text-foreground-500">
                Keep everything important for this project in one place.
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-sm">
                  <Icon icon="checkCircle" size={16} className="text-foreground-500" />
                  <span>Requirements - briefs, specs, success criteria, etc.</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Icon icon="bell" size={16} className="text-foreground-500" />
                  <span>Ideas - concepts, experiments, references, etc.</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Icon icon="link" size={16} className="text-foreground-500" />
                  <span>Links</span>
                </div>
              </div>
              <div className="flex flex-col gap-1.5 pt-2 border-t border-foreground-200 checkbox-black-override relative z-20">
                <Checkbox
                  isSelected={checklistItems.inviteGreg}
                  onValueChange={() => handleChecklistChange('inviteGreg')}
                  size="sm"
                  color="default"
                >
                  <span className={cn(checklistItems.inviteGreg && 'line-through text-foreground-400')}>
                    Invite Greg to the Project
                  </span>
                </Checkbox>
                <Checkbox
                  isSelected={checklistItems.uploadMedia}
                  onValueChange={() => handleChecklistChange('uploadMedia')}
                  size="sm"
                  color="default"
                >
                  <span className={cn(checklistItems.uploadMedia && 'line-through text-foreground-400')}>
                    Upload Media
                  </span>
                </Checkbox>
                <Checkbox
                  isSelected={checklistItems.makeAdjustments}
                  onValueChange={() => handleChecklistChange('makeAdjustments')}
                  size="sm"
                  color="default"
                >
                  <span className={cn(checklistItems.makeAdjustments && 'line-through text-foreground-400')}>
                    Make Adjustments to the Landing Page
                  </span>
                </Checkbox>
              </div>
            </div>

            {/* Chat Panel */}
            <div className="rounded-large p-3 flex flex-col gap-2.5 border border-foreground-200">
              <div className="flex items-center justify-between flex-shrink-0">
                <div className="text-sm text-foreground">
                  <span className="font-bold">Chat</span> <span className="font-normal">(2 conversations)</span>
                </div>
                <Button size="sm" variant="flat" color="primary" onClick={handleClick} className="relative z-30">
                  Go to Chat
                  <Icon icon="arrowRight" size={12} />
                </Button>
              </div>
              <div className="flex flex-col gap-2 flex-1 overflow-hidden">
                <div
                  className="flex items-start gap-2.5 p-2 rounded-lg bg-foreground-50 border border-foreground-200 hover:bg-background cursor-pointer transition-colors flex-shrink-0"
                  onClick={handleClick}
                >
                  <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                      <div className="font-semibold text-xs text-foreground">George</div>
                      <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                      <div className="text-xs text-foreground font-normal">unread messages</div>
                    </div>
                    <div className="text-xs text-foreground truncate">Kreatli_Logo_v1.png</div>
                  </div>
                  <div className="text-xs text-foreground-500 flex-shrink-0 ml-2">4 days ago</div>
                </div>
                <div
                  className="flex items-start gap-2.5 p-2 rounded-lg bg-foreground-50 border border-foreground-200 hover:bg-background cursor-pointer transition-colors flex-shrink-0"
                  onClick={handleClick}
                >
                  <div className="bg-foreground-100 p-1.5 rounded flex-shrink-0">
                    <Icon icon="slides" size={14} className="text-foreground-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-xs text-foreground mb-0.5">Team Chat (Vision review)</div>
                    <div className="text-xs text-foreground">No messages</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row: Media Panel - Full Width */}
          <div className="bg-foreground-50 rounded-large p-3 flex flex-col gap-2.5 border border-foreground-200 flex-1">
            <div className="flex items-center justify-between flex-shrink-0">
              <div className="font-semibold text-sm">Media (3 files)</div>
              <Button size="sm" variant="flat" color="primary" onClick={handleClick} className="relative z-30">
                Go to Media
                <Icon icon="arrowRight" size={12} />
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 flex-1">
              {mediaItems.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-lg overflow-hidden relative border border-foreground-200 cursor-pointer aspect-video"
                  onClick={handleClick}
                >
                  <img
                    src={`https://picsum.photos/600/300?${item.image}`}
                    alt={`Media ${idx + 1}`}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 right-2 z-20">
                    <div className="flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
                      <Dropdown placement="bottom-start">
                        <DropdownTrigger>
                          <Chip
                            size="sm"
                            variant="dot"
                            color={item.color as any}
                            className="cursor-pointer bg-foreground-50 relative z-20"
                          >
                            {item.status}
                          </Chip>
                        </DropdownTrigger>
                        <DropdownMenu
                          selectedKeys={[item.status]}
                          selectionMode="single"
                          disallowEmptySelection
                          onSelectionChange={(keys) => handleStatusChange(idx, keys)}
                        >
                          <DropdownItem key="Changes required">Changes required</DropdownItem>
                          <DropdownItem key="Approved">Approved</DropdownItem>
                          <DropdownItem key="No status">No status</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                      {item.user && (
                        <Dropdown placement="bottom-end">
                          <DropdownTrigger>
                            <Avatar
                              size="sm"
                              src={`https://i.pravatar.cc/150?u=${item.user}`}
                              className="cursor-pointer relative z-20"
                              isBordered
                            />
                          </DropdownTrigger>
                          <DropdownMenu
                            selectionMode="single"
                            disallowEmptySelection
                            selectedKeys={[item.user]}
                            onSelectionChange={(keys) => handleAssigneeChange(idx, keys)}
                          >
                            <DropdownItem key="a042581f4e29026024d">Peter R.</DropdownItem>
                            <DropdownItem key="a042581f4e29026024f">Martin D.</DropdownItem>
                            <DropdownItem key="a042581f4e29026024e">George M.</DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
