import { ComponentType } from 'react';

import { IconType } from '../../various/Icon';
import { MiniActivityFeed } from './mini-previews/MiniActivityFeed';
import { MiniChat } from './mini-previews/MiniChat';
import { MiniDeliverables } from './mini-previews/MiniDeliverables';
import { MiniFileStorage } from './mini-previews/MiniFileStorage';
import { MiniMediaLibrary } from './mini-previews/MiniMediaLibrary';
import { MiniReviewTool } from './mini-previews/MiniReviewTool';
import { MiniSafeZoneChecker } from './mini-previews/MiniSafeZoneChecker';
import { MiniShareLinks } from './mini-previews/MiniShareLinks';
import { MiniTasksBoard } from './mini-previews/MiniTasksBoard';
import { MiniTextEditor } from './mini-previews/MiniTextEditor';
import { MiniVersioning } from './mini-previews/MiniVersioning';

export interface WorkspaceFeature {
  key: string;
  icon: IconType;
  label: string;
  shortLabel: string;
  component: ComponentType;
  defaultActive: boolean;
}

export const WORKSPACE_FEATURES: WorkspaceFeature[] = [
  {
    key: 'tasksBoards',
    icon: 'board',
    label: 'Production Tasks & Kanban Boards',
    shortLabel: 'Tasks & Boards',
    component: MiniTasksBoard,
    defaultActive: true,
  },
  {
    key: 'review',
    icon: 'paint',
    label: 'Frame-Accurate Review & Annotations',
    shortLabel: 'Review',
    component: MiniReviewTool,
    defaultActive: true,
  },
  {
    key: 'teamChat',
    icon: 'chat',
    label: 'Project Chat & Feedback Threads',
    shortLabel: 'Chat',
    component: MiniChat,
    defaultActive: false,
  },
  {
    key: 'cloudStorage',
    icon: 'folder',
    label: 'Secure Cloud Storage for Large Files',
    shortLabel: 'Cloud Storage',
    component: MiniFileStorage,
    defaultActive: false,
  },
  {
    key: 'deliverables',
    icon: 'calendar',
    label: 'Deliverables, Deadlines & Approvals',
    shortLabel: 'Deliverables',
    component: MiniDeliverables,
    defaultActive: false,
  },
  {
    key: 'mediaLibrary',
    icon: 'images',
    label: 'Media Asset Library (MAM/DAM)',
    shortLabel: 'Media Library',
    component: MiniMediaLibrary,
    defaultActive: true,
  },
  {
    key: 'versioning',
    icon: 'compare',
    label: 'Version Control & Side-by-Side Compare',
    shortLabel: 'Versioning',
    component: MiniVersioning,
    defaultActive: true,
  },
  {
    key: 'textEditor',
    icon: 'edit',
    label: 'Rich Text Briefs & Notes',
    shortLabel: 'Text Editor',
    component: MiniTextEditor,
    defaultActive: false,
  },
  {
    key: 'shareLinks',
    icon: 'share',
    label: 'Shareable Review Links for Clients',
    shortLabel: 'Share Links',
    component: MiniShareLinks,
    defaultActive: false,
  },
  {
    key: 'safeZoneChecker',
    icon: 'monitorPlay',
    label: 'Social Media Safe-Zone & Aspect Ratio Checker',
    shortLabel: 'Safe Zones',
    component: MiniSafeZoneChecker,
    defaultActive: false,
  },
  {
    key: 'activityFeed',
    icon: 'time',
    label: 'Project Activity Feed & Audit Trail',
    shortLabel: 'Activity',
    component: MiniActivityFeed,
    defaultActive: false,
  },
];
