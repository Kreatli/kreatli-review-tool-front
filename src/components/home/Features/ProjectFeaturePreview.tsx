import { Avatar, AvatarGroup, Button, Card, CardBody, Input, Tab, Tabs } from '@heroui/react';
import { Icon } from '../../various/Icon';
import { ProjectFeatureFolder } from './ProjectFeatureFolder';
import { ProjectFeatureFile } from './ProjectFeatureFile';
import { useSignUpModalVisibility } from '../../../hooks/useSignUpModalVisibility';
import { useState } from 'react';
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

export const ProjectFeaturePreview = () => {
  const { openSignUpModal } = useSignUpModalVisibility();
  const { isSignedIn } = useSession();

  const isTouchScreen = useIsTouchScreen();

  const [shouldHide, setShouldHide] = useState(false);

  const handleClick = () => {
    if (!isSignedIn) {
      openSignUpModal();
    }
    setShouldHide(true);
  };

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
          <Tabs selectedKey="media" onSelectionChange={handleClick}>
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
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {initialFolders.map((folder, index) => (
              <div key={folder.id} className={index >= 2 ? 'hidden sm:block' : ''}>
                <ProjectFeatureFolder
                  title={folder.title}
                  items={folder.items}
                  size={folder.size}
                  onClick={handleClick}
                />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {initialFiles.map((file, index) => (
              <div key={file.id} className={index >= 3 ? 'hidden md:block' : ''}>
                <ProjectFeatureFile
                  title={file.title}
                  size={file.size}
                  assignee={file.assignee}
                  comments={file.comments}
                  status={file.status}
                  onClick={() => {
                    setShouldHide(true);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
