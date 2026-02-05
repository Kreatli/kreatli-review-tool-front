import { addToast, Button } from '@heroui/react';
import { useState } from 'react';

import { useFileStateContext } from '../../../contexts/File';
import { ReviewToolContextProvider } from '../../../contexts/ReviewTool';
import { ReviewToolCanvasShapesContextProvider } from '../../../contexts/ReviewTool/ReviewToolCanvasShapes';
import { trackEvent } from '../../../lib/amplitude';
import { getAssetFileIdDownload } from '../../../services/services';
import { FileDto } from '../../../services/types';
import { downloadFromUrl } from '../../../utils/download';
import { formatBytes } from '../../../utils/formatBytes';
import { Icon } from '../../various/Icon';
import { AssetComments } from '../AssetComments';
import { ReviewToolCanvas } from '../ReviewTool/ReviewToolCanvas';
import { ReviewToolFooter } from '../ReviewTool/ReviewToolFooter';
import { ReviewToolSafeZonesModal } from '../ReviewTool/ReviewToolSafeZonesModal';

interface Props {
  file: FileDto;
  shareableLinkId: string;
}

export const ShareableAsset = ({ file, shareableLinkId }: Props) => {
  const { commentsRef } = useFileStateContext();

  const [isSafeZonesModalOpen, setIsSafeZonesModalOpen] = useState(false);

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

  const openSafeZoneCheckerModal = () => {
    trackEvent('check_safe_zones_click');
    setIsSafeZonesModalOpen(true);
  };

  return (
    <div className="border-t border-foreground-300">
      <div className="flex items-center gap-2 border-b border-foreground-300 px-6 py-1">
        <div className="text-md truncate font-semibold">{file.name}</div>
        <div className="whitespace-nowrap text-sm text-foreground-500">{formatBytes(file.fileSize)}</div>
        <Button size="sm" variant="flat" color="primary" onClick={handleDownload}>
          <Icon icon="download" size={16} />
          <span className="font-medium">Download</span>
        </Button>
        <Button size="sm" variant="flat" onClick={openSafeZoneCheckerModal}>
          <Icon icon="mobile" size={18} />
          Safe Zones
        </Button>
      </div>
      <div className="grid-cols-[1fr,350px] md:grid md:h-[calc(100vh-106px)]">
        <div className="flex flex-col overflow-hidden">
          <ReviewToolContextProvider>
            <ReviewToolCanvasShapesContextProvider>
              <ReviewToolCanvas file={file} shareableLinkId={shareableLinkId} />
              <ReviewToolFooter shareableLinkId={shareableLinkId} />
            </ReviewToolCanvasShapesContextProvider>
          </ReviewToolContextProvider>
        </div>
        <div ref={commentsRef} className="overflow-auto border-l border-foreground-300 pt-3">
          <AssetComments shareableLinkId={shareableLinkId} fileId={file.id} />
        </div>
      </div>
      <ReviewToolSafeZonesModal
        isOpen={isSafeZonesModalOpen}
        onClose={() => setIsSafeZonesModalOpen(false)}
        file={file}
      />
    </div>
  );
};
