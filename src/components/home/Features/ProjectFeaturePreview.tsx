import { Avatar, AvatarGroup, Button, Card, CardBody, Input, Tab, Tabs } from '@heroui/react';
import { Icon } from '../../various/Icon';
import { ProjectFeatureFolder } from './ProjectFeatureFolder';
import { ProjectFeatureFile } from './ProjectFeatureFile';
import { useSignUpModalVisibility } from '../../../hooks/useSignUpModalVisibility';
import { useState } from 'react';
import { getIsTouchScreen } from '../../../utils/getIsTouchScreen';
import { useIsTouchScreen } from '../../../hooks/useIsTouchScreen';

export const ProjectFeaturePreview = () => {
  const { openSignUpModal } = useSignUpModalVisibility();

  const isTouchScreen = useIsTouchScreen();

  const [shouldHide, setShouldHide] = useState(false);

  const handleClick = () => {
    openSignUpModal();
    setShouldHide(true);
  };

  return (
    <Card className="relative group">
      <div
        className={`opacity-0 transition-opacity duration-300 pointer-events-none absolute inset-0 bg-black/30 dark:bg-black/60 z-10 ${
          shouldHide || isTouchScreen ? '' : 'group-hover:opacity-100'
        }`}
      />
      <CardBody className="min-h-96 flex flex-col gap-4 p-4" onClick={() => setShouldHide(true)}>
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
          <Tabs selectedKey="media" onSelectionChange={handleClick}>
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
          <ProjectFeatureFile
            title="launch_teaser_v1.mp4"
            size={278}
            comments={2}
            status="approved"
            onClick={() => setShouldHide(true)}
          />
          <ProjectFeatureFile
            title="walkthrough_v3.mp4"
            size={278}
            assignee="a042581f4e29026024d"
            comments={12}
            status="review-needed"
            onClick={() => setShouldHide(true)}
          />
          <ProjectFeatureFile
            title="promo_banner_final.png"
            size={4}
            assignee="a042581f4e29026024f"
            comments={3}
            status="in-progress"
            onClick={() => setShouldHide(true)}
          />
        </div>
      </CardBody>
    </Card>
  );
};
