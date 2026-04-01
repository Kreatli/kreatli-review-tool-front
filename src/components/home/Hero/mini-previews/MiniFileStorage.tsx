import { Progress } from '@heroui/react';

import { Icon } from '../../../various/Icon';

const files = [
  { name: 'product_launch_v2.mp4', size: '2.4 GB', progress: 72, done: false },
  { name: 'hero_image_final.jpg', size: '5.2 MB', progress: 100, done: true },
];

export const MiniFileStorage = () => {
  return (
    <div className="flex h-full min-h-0 flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Icon icon="folder" size={14} className="text-foreground-500" />
          <span className="text-xs font-semibold">Cloud Storage</span>
        </div>
        <span className="text-[9px] text-foreground-400">45.2 GB used</span>
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-2">
        <div className="flex flex-col gap-1.5 rounded border border-dashed border-foreground-300 bg-foreground-50 p-2 dark:bg-foreground-100/30">
          <div className="flex items-center justify-center gap-1 text-[10px] text-foreground-400">
            <Icon icon="upload" size={12} />
            <span>Drag & drop or browse</span>
          </div>
        </div>
        <div className="flex min-h-0 flex-1 flex-col gap-2">
          {files.map((f) => (
            <div key={f.name} className="flex items-center gap-2 rounded border border-foreground-200 bg-content1 p-1.5">
              <Icon
                icon={f.done ? 'check' : 'file'}
                size={12}
                className={f.done ? 'text-success' : 'text-foreground-400'}
              />
              <div className="min-w-0 flex-1">
                <div className="truncate text-[10px] font-medium">{f.name}</div>
                <div className="flex items-center gap-2">
                  <Progress
                    size="sm"
                    value={f.progress}
                    color={f.done ? 'success' : 'primary'}
                    className="max-w-full"
                  />
                  <span className="flex-shrink-0 text-[8px] text-foreground-400">{f.size}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
