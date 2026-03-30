import { Button } from '@heroui/react';
import { useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { AssetFileDto } from '../../../services/types';
import { AssetPicker } from '../../asset/AssetPicker';
import { Icon } from '../../various/Icon';
import { TaskAsset } from './TaskAsset';

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
      <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-2">
        {selectedAssets.map((asset) => (
          <TaskAsset key={asset.id} projectId={projectId} asset={asset} asLink={false}>
            <Button
              size="sm"
              variant="faded"
              className="z-10"
              color="danger"
              radius="full"
              isIconOnly
              onClick={() => handleRemoveAsset(asset.id)}
            >
              <Icon icon="trash" size={16} />
            </Button>
          </TaskAsset>
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
