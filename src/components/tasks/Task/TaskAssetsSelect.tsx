import { Button } from '@heroui/react';
import { useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { AssetFileDto } from '../../../services/types';
import { AssetPicker } from '../../asset/AssetPicker';
import { AssetPreview } from '../../asset/AssetPicker/AssetPreview';
import { Icon } from '../../various/Icon';

interface Props {
  projectId: string;
}

export const TaskAssetsSelect = ({ projectId }: Props) => {
  const [selectedAssets, setSelectedAssets] = useState<AssetFileDto[]>([]);

  const { control } = useFormContext();
  const { field } = useController({ control, name: 'assets' });

  const handleSelectAsset = (asset: AssetFileDto) => {
    field.onChange([...field.value, asset.id]);
    setSelectedAssets([...selectedAssets, asset]);
  };

  const handleRemoveAsset = (assetId: string) => {
    field.onChange(field.value.filter((id: string) => id !== assetId));
    setSelectedAssets(selectedAssets.filter((asset) => asset.id !== assetId));
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <div className="flex w-full flex-col gap-2">
        {selectedAssets.map((asset) => (
          <div key={asset.id} className="flex items-center justify-between gap-2 rounded-md p-1 pl-3 shadow-medium">
            <div className="flex items-center gap-2 overflow-hidden">
              <AssetPreview asset={asset} width={24} height={24} />
              <div className="truncate text-sm font-semibold">{asset.name}</div>
            </div>
            <Button
              size="sm"
              variant="light"
              color="danger"
              radius="full"
              isIconOnly
              onClick={() => handleRemoveAsset(asset.id)}
            >
              <Icon icon="trash" size={16} />
            </Button>
          </div>
        ))}
      </div>
      <AssetPicker projectId={projectId} skipIds={field.value} onSelect={handleSelectAsset}>
        <Button variant="light" size="sm">
          <Icon icon="plus" size={16} />
          Link media
        </Button>
      </AssetPicker>
    </div>
  );
};
