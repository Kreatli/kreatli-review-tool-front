import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react';
import { cn, Radio, RadioGroup, Tooltip } from '@heroui/react';
import { AnimatePresence, motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import { useEffect, useRef, useState } from 'react';

import InstagramOverlay from '../../../assets/images/safe-zone-overlays/instagram-reels-overlay.png';
import InstagramSafeZoneOverlay from '../../../assets/images/safe-zone-overlays/instagram-reels-safe-zone-overlay.png';
import TiktokOverlay from '../../../assets/images/safe-zone-overlays/tiktok-overlay.png';
import TiktokSafeZoneOverlay from '../../../assets/images/safe-zone-overlays/tiktok-safe-zone-overlay.png';
import YoutubeOverlay from '../../../assets/images/safe-zone-overlays/youtube-shorts-overlay.png';
import YoutubeSafeZoneOverlay from '../../../assets/images/safe-zone-overlays/youtube-shorts-safe-zone-overlay.png';
import { FileDto } from '../../../services/types';
import { SafeZoneScreenImage } from '../../safe-zone-checker/SafeZoneScreen/SafeZoneScreenImage';
import { SafeZoneScreenVideo } from '../../safe-zone-checker/SafeZoneScreen/SafeZoneScreenVideo';
import { Icon } from '../../various/Icon';

const OVERLAYS = {
  instagram: InstagramOverlay,
  tiktok: TiktokOverlay,
  youtube: YoutubeOverlay,
};

const SAFE_ZONE_OVERLAYS = {
  instagram: InstagramSafeZoneOverlay,
  tiktok: TiktokSafeZoneOverlay,
  youtube: YoutubeSafeZoneOverlay,
};

interface Props {
  isOpen: boolean;
  file: FileDto;
  onClose: () => void;
}

export const ReviewToolSafeZonesModal = ({ file, isOpen, onClose }: Props) => {
  const captureRef = useRef(null);

  const [activeOverlay, setActiveOverlay] = useState<keyof typeof OVERLAYS>('instagram');
  const [shouldShowSafeZone, setShouldShowSafeZone] = useState(false);

  const activeOverlayData = (shouldShowSafeZone ? SAFE_ZONE_OVERLAYS : OVERLAYS)[activeOverlay];

  const filePreviewUrl = file.fileType.includes('pdf') ? file.metadata.thumbnailUrl : file.url;

  useEffect(() => {
    return () => {
      if (filePreviewUrl) URL.revokeObjectURL(filePreviewUrl);
    };
  }, [filePreviewUrl]);

  const isImageFile = file.fileType.startsWith('image') || file.fileType.includes('pdf');
  const isVideoFile = file.fileType.startsWith('video/');

  const handleDownload = async () => {
    const element = captureRef.current;

    if (!element) {
      return;
    }

    const canvas = await html2canvas(element, { useCORS: true, allowTaint: true });

    const imageURL = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = imageURL;
    link.download = `${file?.name ?? 'capture'}.png`;
    link.click();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="outside">
      <ModalContent>
        <ModalHeader>Social Media Safe Zone Checker</ModalHeader>
        <ModalBody>
          <div className="flex flex-col items-center gap-3">
            <RadioGroup
              value={activeOverlay}
              orientation="horizontal"
              onValueChange={(value) => setActiveOverlay(value as keyof typeof OVERLAYS)}
            >
              <Radio value="instagram">Instagram</Radio>
              <Radio value="tiktok">TikTok</Radio>
              <Radio value="youtube">YouTube</Radio>
            </RadioGroup>
            <div className="w-full max-w-64">
              {filePreviewUrl && (
                <div className="flex w-full justify-between gap-2 p-2">
                  <button
                    type="button"
                    className="flex items-center gap-1 text-xs text-foreground"
                    onClick={() => setShouldShowSafeZone(!shouldShowSafeZone)}
                  >
                    <Icon icon={shouldShowSafeZone ? 'eyeCrossed' : 'eye'} size={12} />
                    {shouldShowSafeZone ? 'Hide' : 'Show'} safe zone
                  </button>
                  <div className="flex gap-3">
                    <Tooltip content="Download" isDisabled={!filePreviewUrl}>
                      <button
                        type="button"
                        className={cn('text-foreground', { 'cursor-not-allowed opacity-50': !filePreviewUrl })}
                        disabled={!filePreviewUrl}
                        onClick={handleDownload}
                      >
                        <Icon icon="download" size={16} />
                      </button>
                    </Tooltip>
                  </div>
                </div>
              )}
              <div className="relative w-full">
                <div ref={captureRef} className="relative w-full border border-foreground-300">
                  <div className="aspect-[9/16] w-full">
                    {filePreviewUrl && isImageFile && <SafeZoneScreenImage src={filePreviewUrl} />}
                    {filePreviewUrl && isVideoFile && (
                      <SafeZoneScreenVideo src={filePreviewUrl} activeOverlay={activeOverlay} />
                    )}
                  </div>
                  <AnimatePresence>
                    <motion.img
                      src={activeOverlayData.src}
                      className={cn('pointer-events-none absolute inset-0 w-full rounded-none')}
                      exit={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      initial={{ opacity: 0 }}
                      key={activeOverlayData.src}
                      alt="Instagram Overlay"
                    />
                  </AnimatePresence>
                  <div className="flex h-14 w-full items-center justify-center bg-black text-white">
                    <Icon icon={activeOverlay} size={28} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};
