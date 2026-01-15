import { Button } from '@heroui/react';

/**
 * Speed preset configuration for data transfer calculator
 */
export interface SpeedPreset {
  label: string;
  speed: number;
  speedUnit: 'Mbps' | 'Gbps';
  description?: string;
}

const SPEED_PRESETS: SpeedPreset[] = [
  { label: '50 Mbps', speed: 50, speedUnit: 'Mbps', description: 'Basic broadband' },
  { label: '100 Mbps', speed: 100, speedUnit: 'Mbps', description: 'Standard home' },
  { label: '250 Mbps', speed: 250, speedUnit: 'Mbps', description: 'Fast home' },
  { label: '500 Mbps', speed: 500, speedUnit: 'Mbps', description: 'High-speed' },
  { label: '1 Gbps', speed: 1, speedUnit: 'Gbps', description: 'Gigabit' },
];

interface SpeedPresetsProps {
  onPresetSelect: (preset: SpeedPreset) => void;
}

export const SpeedPresets = ({ onPresetSelect }: SpeedPresetsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {SPEED_PRESETS.map((preset) => (
        <Button
          key={preset.label}
          variant="flat"
          size="sm"
          onPress={() => onPresetSelect(preset)}
          className="h-8 text-xs font-medium"
          aria-label={`Select speed preset: ${preset.label}`}
        >
          {preset.label}
        </Button>
      ))}
    </div>
  );
};

