import { Avatar, AvatarGroup, Button, Card, CardBody, Checkbox, Chip, Tab, Tabs, cn } from '@heroui/react';
import { Icon } from '../../various/Icon';
import { useSignUpModalVisibility } from '../../../hooks/useSignUpModalVisibility';
import { useState } from 'react';

export const HomeDashboardFeaturePreview = () => {
  const { openSignUpModal } = useSignUpModalVisibility();
  const [selectedTab, setSelectedTab] = useState('home');
  const [checklistItems, setChecklistItems] = useState({
    inviteGreg: true,
    uploadMedia: false,
    makeAdjustments: false,
  });

  const handleChecklistChange = (key: keyof typeof checklistItems) => {
    setChecklistItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <Card>
      <CardBody className="flex flex-col gap-3 p-4 min-h-96 max-h-[600px]">
        {/* Header */}
        <div className="flex justify-between items-center pb-3 border-b border-foreground-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black rounded flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">K</span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="font-semibold text-base">Kreatli Walkthrough</div>
              <div className="text-xs text-foreground-500">6 files, 43.41 MB</div>
            </div>
            <div className="flex items-center gap-1.5 ml-2">
              <Button
                isIconOnly
                size="sm"
                variant="light"
                radius="full"
                className="min-w-6 w-6 h-6"
                onClick={openSignUpModal}
              >
                <Icon icon="helpCircle" size={14} className="text-foreground-500" />
              </Button>
              <Button
                isIconOnly
                size="sm"
                variant="light"
                radius="full"
                className="min-w-6 w-6 h-6"
                onClick={openSignUpModal}
              >
                <Icon icon="dots" size={14} className="text-foreground-500" />
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <AvatarGroup size="sm" max={2} total={6} isBordered>
              <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
              <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024f" />
            </AvatarGroup>
            <Button size="sm" className="bg-black text-white" onClick={openSignUpModal}>
              <Icon icon="plus" size={14} />
              New
              <Icon icon="chevronDown" size={14} />
            </Button>
            <Button isIconOnly size="sm" variant="light" className="min-w-6 w-6 h-6" onClick={openSignUpModal}>
              <Icon icon="chevronDown" size={14} className="text-foreground-500" />
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex">
          <Tabs
            selectedKey={selectedTab}
            onSelectionChange={(key) => setSelectedTab(key as string)}
            classNames={{
              tabList: 'gap-0',
              tab: 'px-4 py-2 min-w-0',
              tabContent: 'text-sm',
            }}
          >
            <Tab key="home" title="Home" />
            <Tab key="media" title="Media" />
            <Tab key="chat" title="Chat" />
            <Tab key="activity" title="Activity" />
          </Tabs>
        </div>

        {/* Main Content - Three Panel Layout */}
        <div className="flex flex-col gap-3 flex-1 min-h-0 overflow-hidden">
          {/* Top Row: Project Overview (left) + Chat (right) */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-3 flex-shrink-0">
            {/* Project Overview */}
            <div className="bg-foreground-50 rounded-large p-3 flex flex-col gap-2.5 border border-foreground-200">
              <div className="flex items-center justify-between">
                <div className="font-semibold text-sm">Example - Project overview</div>
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  radius="full"
                  onClick={openSignUpModal}
                  className="min-w-0 w-5 h-5"
                >
                  <Icon icon="edit" size={14} className="text-primary" />
                </Button>
              </div>
              <div className="text-xs text-foreground-500">
                Keep everything important for this project in one place.
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-xs">
                  <Icon icon="building" size={14} className="text-foreground-400" />
                  <span>Requirements - briefs, specs, success criteria, etc.</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Icon icon="star" size={14} className="text-foreground-400" />
                  <span>Ideas - concepts, experiments, references, etc.</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Icon icon="link" size={14} className="text-foreground-400" />
                  <span>Links</span>
                </div>
              </div>
              <div className="flex flex-col gap-1.5 pt-2 border-t border-foreground-200 checkbox-black-override">
                <Checkbox
                  isSelected={checklistItems.inviteGreg}
                  onValueChange={() => handleChecklistChange('inviteGreg')}
                  size="sm"
                  color="default"
                  classNames={{
                    label: 'text-xs',
                    wrapper: cn(
                      'checkbox-black',
                      '!bg-transparent',
                      '!border-foreground-300',
                      'data-[selected=true]:!bg-black',
                      'data-[selected=true]:!border-black',
                      'data-[selected=true]:hover:!bg-black',
                      'data-[selected=true]:hover:!border-black',
                      'data-[selected=true]:focus:!bg-black',
                      'data-[selected=true]:focus:!border-black',
                      '[&[data-selected=true]]:!bg-black',
                      '[&[data-selected=true]]:!border-black',
                    ),
                    icon: 'text-white',
                  }}
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
                  classNames={{
                    label: 'text-xs',
                    wrapper: cn(
                      'checkbox-black',
                      '!bg-transparent',
                      '!border-foreground-300',
                      'data-[selected=true]:!bg-black',
                      'data-[selected=true]:!border-black',
                      'data-[selected=true]:hover:!bg-black',
                      'data-[selected=true]:hover:!border-black',
                      'data-[selected=true]:focus:!bg-black',
                      'data-[selected=true]:focus:!border-black',
                      '[&[data-selected=true]]:!bg-black',
                      '[&[data-selected=true]]:!border-black',
                    ),
                    icon: 'text-white',
                  }}
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
                  classNames={{
                    label: 'text-xs',
                    wrapper: cn(
                      'checkbox-black',
                      '!bg-transparent',
                      '!border-foreground-300',
                      'data-[selected=true]:!bg-black',
                      'data-[selected=true]:!border-black',
                      'data-[selected=true]:hover:!bg-black',
                      'data-[selected=true]:hover:!border-black',
                      'data-[selected=true]:focus:!bg-black',
                      'data-[selected=true]:focus:!border-black',
                      '[&[data-selected=true]]:!bg-black',
                      '[&[data-selected=true]]:!border-black',
                    ),
                    icon: 'text-white',
                  }}
                >
                  <span className={cn(checklistItems.makeAdjustments && 'line-through text-foreground-400')}>
                    Make Adjustments to the Landing Page
                  </span>
                </Checkbox>
              </div>
            </div>

            {/* Chat Panel */}
            <div className="bg-background rounded-large p-3 flex flex-col gap-2.5 border border-foreground-200">
              <div className="flex items-center justify-between flex-shrink-0">
                <div className="text-sm text-foreground">
                  <span className="font-bold">Chat</span> <span className="font-normal">(2 conversations)</span>
                </div>
                <Button
                  size="sm"
                  className="bg-[#E0EBF7] text-[#325ABF] text-xs px-3 h-7 min-w-0 rounded-full border-0 shadow-none"
                  onClick={openSignUpModal}
                >
                  Go to Chat
                  <Icon icon="arrowRight" size={12} className="text-[#325ABF]" />
                </Button>
              </div>
              <div className="flex flex-col gap-2 flex-1 min-h-0 overflow-hidden">
                <div
                  className="flex items-start gap-2.5 p-2 rounded-lg bg-foreground-50 border border-foreground-200 hover:bg-background cursor-pointer transition-colors flex-shrink-0"
                  onClick={openSignUpModal}
                >
                  <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                      <div className="font-semibold text-xs text-foreground">George</div>
                      <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                      <div className="text-xs text-foreground font-normal">You have unread messages</div>
                    </div>
                    <div className="text-xs text-foreground truncate">Kreatli_Logo_v1.png</div>
                  </div>
                  <div className="text-xs text-foreground-500 flex-shrink-0 ml-2">4 days ago</div>
                </div>
                <div
                  className="flex items-start gap-2.5 p-2 rounded-lg bg-foreground-50 border border-foreground-200 hover:bg-background cursor-pointer transition-colors flex-shrink-0"
                  onClick={openSignUpModal}
                >
                  <div className="bg-foreground-200 p-1.5 rounded flex-shrink-0">
                    <Icon icon="slides" size={14} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-xs text-foreground mb-0.5">Team Chat (Kreatli Walkthrough)</div>
                    <div className="text-xs text-foreground">No messages</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row: Media Panel - Full Width */}
          <div className="bg-foreground-50 rounded-large p-3 flex flex-col gap-2.5 border border-foreground-200 flex-1 min-h-0">
            <div className="flex items-center justify-between flex-shrink-0">
              <div className="font-semibold text-sm">Media (3 files)</div>
              <Button
                size="sm"
                className="bg-[#E0EBF7] text-[#325ABF] text-xs px-3 h-7 min-w-0 rounded-full border-0 shadow-none"
                onClick={openSignUpModal}
              >
                Go to Media
                <Icon icon="arrowRight" size={12} className="text-[#325ABF]" />
              </Button>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Button size="sm" variant="flat" className="h-7 text-xs" onClick={openSignUpModal}>
                <Icon icon="folder" size={14} />
                Folder 2
              </Button>
              <Button size="sm" variant="flat" className="h-7 text-xs" onClick={openSignUpModal}>
                <Icon icon="folder" size={14} />
                Foler 1
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-2 flex-1 min-h-0">
              {[
                { status: 'approved', color: 'success', image: 'random=1' },
                { status: 'changes-required', color: 'danger', image: 'random=2' },
                { status: 'no-status', color: 'default', image: 'random=3' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-lg overflow-hidden relative border border-foreground-200 cursor-pointer min-h-0 h-full"
                  onClick={openSignUpModal}
                >
                  <img
                    src={`https://picsum.photos/200/150?${item.image}`}
                    alt={`Media ${idx + 1}`}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-1 left-1 right-1 flex items-center justify-between">
                    <div
                      className={cn(
                        'w-2 h-2 rounded-full',
                        item.color === 'success' && 'bg-success',
                        item.color === 'danger' && 'bg-danger',
                        item.color === 'default' && 'bg-foreground-300',
                      )}
                    />
                    <div className="w-5 h-5 bg-black rounded flex items-center justify-center">
                      <span className="text-white font-bold text-[8px]">K</span>
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
