import { cn } from '@heroui/react';

import { Icon } from '../../various/Icon';
import { WorkspaceFeature } from './workspaceFeatures';

interface Props {
  features: WorkspaceFeature[];
  activeKeys: Set<string>;
  onToggle: (key: string) => void;
}

export const FeatureSelector = ({ features, activeKeys, onToggle }: Props) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-foreground-500">
          Pick your features
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-widest text-foreground-300">&middot;</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {features.map((f) => {
          const isActive = activeKeys.has(f.key);
          return (
            <button
              key={f.key}
              type="button"
              aria-pressed={isActive}
              onClick={() => onToggle(f.key)}
              className={cn(
                'relative inline-flex items-center justify-center gap-1.5 rounded-full border-2 px-3 py-1.5 text-xs font-medium transition-all',
                isActive
                  ? 'dark:bg-primary-950/30 border-primary bg-primary-50/80 text-foreground shadow-sm'
                  : 'border-dashed border-foreground-300 text-foreground-500 hover:border-foreground-400 hover:text-foreground-600 dark:border-foreground-400/50',
              )}
            >
              {isActive ? (
                <span className="pointer-events-none absolute right-0 top-0 inline-flex h-4 w-4 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-primary text-content1 shadow-sm">
                  <Icon icon="check" size={10} />
                </span>
              ) : null}
              <Icon
                icon={f.icon}
                size={14}
                className={cn('flex-shrink-0', isActive ? 'text-foreground-700' : 'text-foreground-400')}
              />
              <span className="whitespace-nowrap">{f.shortLabel}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
