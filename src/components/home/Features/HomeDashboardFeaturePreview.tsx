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
import { useState } from 'react';
import { useSession } from '../../../hooks/useSession';
import { useIsTouchScreen } from '../../../hooks/useIsTouchScreen';

export const HomeDashboardFeaturePreview = () => {
  const { openSignUpModal } = useSignUpModalVisibility();
  const { isSignedIn } = useSession();
  const isTouchScreen = useIsTouchScreen();
  const [shouldHide, setShouldHide] = useState(false);
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

  const handleChecklistChange = (key: keyof typeof checklistItems) => {
    setChecklistItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleStatusChange = (idx: number, keys: Selection) => {
    setShouldHide(true);

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
    setShouldHide(true);

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
    if (!isSignedIn) {
      openSignUpModal();
    }
    setShouldHide(true);
  };

  return (
    <Card className="group relative">
      <CardBody
        className="relative flex flex-col gap-3 p-4"
        onClick={() => {
          setShouldHide(true);
        }}
      >
        <div
          className={`pointer-events-none absolute inset-0 z-10 bg-black/30 opacity-0 transition-opacity duration-300 dark:bg-black/60 ${
            shouldHide || isTouchScreen ? '' : 'group-hover:opacity-100'
          }`}
        />
        {/* Header */}
        <div className="flex items-center justify-between border-b border-foreground-200 pb-4">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-foreground-100 p-2.5">
              <Icon icon="slides" />
            </div>
            <div className="flex flex-col">
              <div className="font-semibold">Vision review</div>
              <div className="text-sm text-foreground-500">27 items, 2.45GB</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <AvatarGroup size="sm" max={2} total={6} isBordered>
                <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024f" />
              </AvatarGroup>
            </div>
            <div className="hidden sm:block">
              <Button className="bg-foreground text-content1" onClick={handleClick}>
                <Icon icon="plus" size={16} />
                New
                <Icon icon="chevronDown" size={16} />
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex">
          <Tabs selectedKey="home" onSelectionChange={handleClick}>
            <Tab key="home" title="Home" />
            <Tab key="media" title="Media" />
            <Tab key="chat" title="Chat" />
            <Tab key="activity" title="Activity" />
          </Tabs>
        </div>

        {/* Main Content - Three Panel Layout */}
        <div className="flex flex-1 flex-col gap-3 overflow-hidden">
          {/* Top Row: Project Overview (left) + Chat (right) */}
          <div className="grid flex-shrink-0 grid-cols-1 gap-3 xl:grid-cols-[3fr_2fr]">
            {/* Project Overview */}
            <div className="flex flex-col gap-1 rounded-large border border-foreground-200 p-3">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">Example - Project overview</div>
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
              <div className="checkbox-black-override relative flex flex-col gap-1.5 border-t border-foreground-200 pt-2">
                <Checkbox
                  isSelected={checklistItems.inviteGreg}
                  className="z-20"
                  onValueChange={() => {
                    handleChecklistChange('inviteGreg');
                    setShouldHide(true);
                  }}
                  size="sm"
                  color="default"
                >
                  <span className={cn(checklistItems.inviteGreg && 'text-foreground-400 line-through')}>
                    Invite Greg to the Project
                  </span>
                </Checkbox>
                <Checkbox
                  isSelected={checklistItems.uploadMedia}
                  onValueChange={() => {
                    handleChecklistChange('uploadMedia');
                    setShouldHide(true);
                  }}
                  className="z-20"
                  size="sm"
                  color="default"
                >
                  <span className={cn(checklistItems.uploadMedia && 'text-foreground-400 line-through')}>
                    Upload Media
                  </span>
                </Checkbox>
                <Checkbox
                  isSelected={checklistItems.makeAdjustments}
                  onValueChange={() => {
                    handleChecklistChange('makeAdjustments');
                    setShouldHide(true);
                  }}
                  className="z-20"
                  size="sm"
                  color="default"
                >
                  <span className={cn(checklistItems.makeAdjustments && 'text-foreground-400 line-through')}>
                    Make Adjustments to the Landing Page
                  </span>
                </Checkbox>
              </div>
            </div>

            {/* Chat Panel */}
            <div className="flex flex-col gap-2.5 rounded-large border border-foreground-200 p-3">
              <div className="flex flex-shrink-0 items-center justify-between">
                <div className="text-sm text-foreground">
                  <span className="font-bold">Chat</span> <span className="font-normal">(2 conversations)</span>
                </div>
                <Button size="sm" variant="flat" color="primary" onClick={handleClick} className="relative z-30">
                  Go to Chat
                  <Icon icon="arrowRight" size={12} />
                </Button>
              </div>
              <div className="flex flex-1 flex-col gap-2 overflow-hidden">
                <div
                  className="flex flex-shrink-0 cursor-pointer items-start gap-2.5 rounded-lg border border-foreground-200 bg-foreground-50 p-2 transition-colors hover:bg-background"
                  onClick={handleClick}
                >
                  <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" size="sm" />
                  <div className="min-w-0 flex-1">
                    <div className="mb-0.5 flex flex-wrap items-center gap-1.5">
                      <div className="text-xs font-semibold text-foreground">George</div>
                      <div className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                      <div className="text-xs font-normal text-foreground">unread messages</div>
                    </div>
                    <div className="truncate text-xs text-foreground">Kreatli_Logo_v1.png</div>
                  </div>
                  <div className="ml-2 flex-shrink-0 text-xs text-foreground-500">4 days ago</div>
                </div>
                <div
                  className="flex flex-shrink-0 cursor-pointer items-start gap-2.5 rounded-lg border border-foreground-200 bg-foreground-50 p-2 transition-colors hover:bg-background"
                  onClick={handleClick}
                >
                  <div className="flex-shrink-0 rounded bg-foreground-100 p-1.5">
                    <Icon icon="slides" size={14} className="text-foreground-500" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-0.5 text-xs font-semibold text-foreground">Team Chat (Vision review)</div>
                    <div className="text-xs text-foreground">No messages</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row: Media Panel - Full Width */}
          <div className="flex flex-1 flex-col gap-2.5 rounded-large border border-foreground-200 bg-foreground-50 p-3">
            <div className="flex flex-shrink-0 items-center justify-between">
              <div className="text-sm font-semibold">Media (3 files)</div>
              <Button size="sm" variant="flat" color="primary" onClick={handleClick} className="relative z-30">
                Go to Media
                <Icon icon="arrowRight" size={12} />
              </Button>
            </div>
            <div className="grid flex-1 grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
              {mediaItems.map((item, idx) => (
                <div
                  key={idx}
                  className="relative aspect-video cursor-pointer overflow-hidden rounded-lg border border-foreground-200"
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
                            className="relative z-20 cursor-pointer bg-foreground-50"
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
                              className="relative z-20 cursor-pointer"
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
