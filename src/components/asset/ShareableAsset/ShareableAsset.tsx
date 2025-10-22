import { useFileStateContext } from '../../../contexts/File';
import { ReviewToolContextProvider } from '../../../contexts/ReviewTool';
import { ReviewToolCanvasShapesContextProvider } from '../../../contexts/ReviewTool/ReviewToolCanvasShapes';
import { FileDto } from '../../../services/types';
import { AssetComments } from '../AssetComments';
import { ReviewToolCanvas } from '../ReviewTool/ReviewToolCanvas';
import { ReviewToolFooter } from '../ReviewTool/ReviewToolFooter';
import { formatBytes } from '../../../utils/formatBytes';
import { addToast, Button, Tooltip } from '@heroui/react';
import { Icon } from '../../various/Icon';
import { getAssetFileIdDownload } from '../../../services/services';
import { downloadFromUrl } from '../../../utils/download';

interface Props {
  file: FileDto;
  shareableLinkId: string;
}

export const ShareableAsset = ({ file, shareableLinkId }: Props) => {
  const { commentsRef } = useFileStateContext();

  const handleDownload = async () => {
    try {
      const assetUrl = await getAssetFileIdDownload(file.id, { shareableLinkId });

      downloadFromUrl(assetUrl, file.name);
    } catch {
      addToast({
        title: 'Failed to download file. Please try again later.',
        variant: 'flat',
        color: 'danger',
      });
    }
  };

  return (
    <div className="border-t border-foreground-300">
      <div className="px-6 py-1 flex gap-2 items-center">
        <div className="text-md font-semibold truncate">{file.name}</div>
        <div className="text-sm text-foreground-500 whitespace-nowrap">{formatBytes(file.fileSize)}</div>
        <Tooltip content="Download" placement="bottom">
          <Button size="sm" isIconOnly variant="light" radius="full" onClick={handleDownload}>
            <Icon icon="download" size={16} />
          </Button>
        </Tooltip>
      </div>
      <div className="md:grid grid-cols-[1fr,350px] md:h-[calc(100vh-106px)]">
        <div className="flex flex-col overflow-hidden">
          <ReviewToolContextProvider>
            <ReviewToolCanvasShapesContextProvider>
              <ReviewToolCanvas file={file} shareableLinkId={shareableLinkId} />
              <ReviewToolFooter shareableLinkId={shareableLinkId} />
            </ReviewToolCanvasShapesContextProvider>
          </ReviewToolContextProvider>
        </div>
        <div ref={commentsRef} className="overflow-auto">
          <AssetComments shareableLinkId={shareableLinkId} fileId={file.id} />
        </div>
      </div>
    </div>
  );
};
