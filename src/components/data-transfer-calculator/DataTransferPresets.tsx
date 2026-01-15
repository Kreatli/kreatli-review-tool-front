import { Button, Card, CardBody } from '@heroui/react';

import { Icon, IconType } from '../various/Icon';

export interface Preset {
  label: string;
  fileSize: number;
  fileSizeUnit: 'MB' | 'GB' | 'TB';
  description?: string;
  icon?: IconType;
}

const PRESETS: Preset[] = [
  {
    label: '10GB Social Video Export',
    fileSize: 10,
    fileSizeUnit: 'GB',
    description: 'Instagram, TikTok, YouTube Shorts',
    icon: 'addVideo',
  },
  {
    label: '50GB YouTube Project',
    fileSize: 50,
    fileSizeUnit: 'GB',
    description: 'Full project with source files',
    icon: 'youtube',
  },
  {
    label: '100GB Commercial Shoot',
    fileSize: 100,
    fileSizeUnit: 'GB',
    description: 'Raw footage from production',
    icon: 'addImage',
  },
  {
    label: '1TB Production Archive',
    fileSize: 1,
    fileSizeUnit: 'TB',
    description: 'Large archives and backups',
    icon: 'suitcase',
  },
];

interface DataTransferPresetsProps {
  onPresetSelect: (preset: Preset) => void;
}

export const DataTransferPresets = ({ onPresetSelect }: DataTransferPresetsProps) => {
  return (
    <Card className="w-full">
      <CardBody className="p-5">
        <div className="mb-4 flex items-center gap-2">
          <div className="rounded-lg bg-primary/10 p-1.5">
            <Icon icon="star" size={18} className="text-primary" />
          </div>
          <h3 className="font-sans text-lg font-bold text-foreground-900">Quick Presets</h3>
        </div>
        <p className="mb-4 text-xs text-foreground-500">Common file sizes for creative projects</p>
        <div className="flex flex-col gap-2.5">
          {PRESETS.map((preset) => (
            <Button
              key={preset.label}
              variant="flat"
              size="md"
              onPress={() => onPresetSelect(preset)}
              className="h-auto w-full justify-start px-4 py-3 text-left transition-colors hover:bg-foreground-100"
              aria-label={`Select preset: ${preset.label}`}
            >
              <div className="flex w-full items-center gap-3">
                {preset.icon && (
                  <div className="mt-0.5 flex-shrink-0 rounded-md p-1.5">
                    <Icon icon={preset.icon} size={20} className="text-foreground-600" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="mb-0.5 text-sm font-semibold text-foreground-900">{preset.label}</div>
                  {preset.description && <div className="text-xs text-foreground-500">{preset.description}</div>}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};
