import { cn } from '@heroui/react';

import { Icon } from '../../../various/Icon';

const toolbarItems: Array<{ icon: 'bold' | 'italic' | 'underline' | 'list' | 'link'; label: string }> = [
  { icon: 'bold', label: 'Bold' },
  { icon: 'italic', label: 'Italic' },
  { icon: 'underline', label: 'Underline' },
  { icon: 'list', label: 'List' },
  { icon: 'link', label: 'Link' },
];

export const MiniTextEditor = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1.5">
        <Icon icon="edit" size={14} className="text-foreground-500" />
        <span className="text-xs font-semibold">Text Editor</span>
      </div>
      <div className="overflow-hidden rounded border border-foreground-200">
        <div className="flex items-center gap-0.5 border-b border-foreground-200 bg-foreground-50 px-2 py-1">
          <div className="mr-1 rounded bg-foreground-100 px-1.5 py-0.5 text-[9px] font-medium text-foreground-600">
            Heading
          </div>
          <div className="mx-1 h-3 w-px bg-foreground-200" />
          {toolbarItems.map((t) => (
            <button
              key={t.icon}
              type="button"
              className={cn(
                'flex h-5 w-5 items-center justify-center rounded text-foreground-500 hover:bg-foreground-100',
                t.icon === 'bold' && 'bg-foreground-100 text-foreground-800',
              )}
              aria-label={t.label}
            >
              <Icon icon={t.icon} size={11} />
            </button>
          ))}
        </div>
        <div className="bg-content1 p-2">
          <p className="text-[11px] font-semibold leading-relaxed">Campaign Brief — Spring Launch</p>
          <p className="mt-1 text-[10px] leading-relaxed text-foreground-600">
            Deliver a 60-second hero cut and three social cutdowns for the spring product launch.
            <span className="font-semibold"> Key message:</span> fresh, bold, energetic.
          </p>
        </div>
      </div>
    </div>
  );
};
