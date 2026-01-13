import { Button } from '@heroui/react';

export interface Preset {
  label: string;
  fileSize: number;
  fileSizeUnit: 'MB' | 'GB' | 'TB';
}

const PRESETS: Preset[] = [
  { label: '10GB Social Video Export', fileSize: 10, fileSizeUnit: 'GB' },
  { label: '50GB YouTube Project', fileSize: 50, fileSizeUnit: 'GB' },
  { label: '100GB Commercial Shoot', fileSize: 100, fileSizeUnit: 'GB' },
  { label: '1TB Production Archive', fileSize: 1, fileSizeUnit: 'TB' },
];

interface DataTransferPresetsProps {
  onPresetSelect: (preset: Preset) => void;
}

export const DataTransferPresets = ({ onPresetSelect }: DataTransferPresetsProps) => {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-sans text-lg font-semibold text-foreground-700">Quick Presets</h3>
      <div className="flex flex-col gap-2 lg:min-w-[200px]">
        {PRESETS.map((preset) => (
          <Button
            key={preset.label}
            variant="bordered"
            size="sm"
            onPress={() => onPresetSelect(preset)}
            className="w-full justify-start text-left text-sm"
            aria-label={`Select preset: ${preset.label}`}
          >
            {preset.label}
          </Button>
        ))}
      </div>
    </div>
  );
};
