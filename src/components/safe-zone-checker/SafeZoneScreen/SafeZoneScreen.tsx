import { AnimatePresence, motion } from 'framer-motion';
import html2canvas from 'html2canvas';

import InstagramOverlay from '../../../assets/images/safe-zone-overlays/instagram-reels-overlay.png';
import TiktokOverlay from '../../../assets/images/safe-zone-overlays/tiktok-overlay.png';
import YoutubeOverlay from '../../../assets/images/safe-zone-overlays/youtube-shorts-overlay.png';

import InstagramSafeZoneOverlay from '../../../assets/images/safe-zone-overlays/instagram-reels-safe-zone-overlay.png';
import TiktokSafeZoneOverlay from '../../../assets/images/safe-zone-overlays/tiktok-safe-zone-overlay.png';
import YoutubeSafeZoneOverlay from '../../../assets/images/safe-zone-overlays/youtube-shorts-safe-zone-overlay.png';
import { useMemo, useRef, useState } from 'react';
import { cn, Radio, RadioGroup, Tooltip } from '@heroui/react';
import { SafeZoneScreenEmptyState } from './SafeZoneScreenEmptyState';
import { SafeZoneScreenImage } from './SafeZoneScreenImage';
import { SafeZoneScreenVideo } from './SafeZoneScreenVideo';
import { Icon } from '../../various/Icon';
import { useDropzone } from 'react-dropzone';

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

export const SafeZoneScreen = () => {
  const captureRef = useRef(null);

  const [file, setFile] = useState<File | null>(null);
  const [activeOverlay, setActiveOverlay] = useState<keyof typeof OVERLAYS>('instagram');
  const [shouldShowSafeZone, setShouldShowSafeZone] = useState(false);

  const activeOverlayData = (shouldShowSafeZone ? SAFE_ZONE_OVERLAYS : OVERLAYS)[activeOverlay];

  const isImageFile = file?.type.startsWith('image/');
  const isVideoFile = file?.type.startsWith('video/');

  const filePreviewUrl = useMemo(() => {
    return file ? URL.createObjectURL(file) : null;
  }, [file]);

  const handleDownload = async () => {
    const element = captureRef.current;

    if (!element) {
      return;
    }

    const canvas = await html2canvas(element, { useCORS: true });

    const imageURL = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = imageURL;
    link.download = `${file?.name ?? 'capture'}.png`;
    link.click();
  };

  const { open, getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
      'video/*': [],
    },
    onDrop: (files) => {
      setFile(files[0]);
    },
    multiple: false,
    noClick: true,
  });

  return (
    <div className="flex flex-col gap-3 items-center">
      <RadioGroup
        value={activeOverlay}
        orientation="horizontal"
        onValueChange={(value) => setActiveOverlay(value as keyof typeof OVERLAYS)}
      >
        <Radio value="instagram">Instagram</Radio>
        <Radio value="tiktok">TikTok</Radio>
        <Radio value="youtube">YouTube</Radio>
      </RadioGroup>
      <div className="relative max-w-80 w-full">
        <div className="absolute top-0 left-6 right-6 h-8 z-1 flex justify-between z-10">
          <button type="button" className="text-white" {...getRootProps()} onClick={open}>
            <input type="file" className="sr-only" {...getInputProps()} />
            <Icon icon="upload" size={16} />
          </button>
          <button
            type="button"
            className="text-white flex items-center gap-2 text-xs"
            onClick={() => setShouldShowSafeZone(!shouldShowSafeZone)}
          >
            <Icon icon={shouldShowSafeZone ? 'eyeCrossed' : 'eye'} size={12} />
            {shouldShowSafeZone ? 'Hide' : 'Show'} safe zone
          </button>
          <Tooltip content="Download" isDisabled={!filePreviewUrl}>
            <button
              type="button"
              className={cn('text-white', { 'opacity-50 cursor-not-allowed': !filePreviewUrl })}
              disabled={!filePreviewUrl}
              onClick={handleDownload}
            >
              <Icon icon="download" size={16} />
            </button>
          </Tooltip>
        </div>
        <div ref={captureRef} className="w-full relative border border-foreground-300">
          <div className="aspect-[9/16] w-full">
            {filePreviewUrl && isImageFile && <SafeZoneScreenImage src={filePreviewUrl} />}
            {filePreviewUrl && isVideoFile && (
              <SafeZoneScreenVideo src={filePreviewUrl} activeOverlay={activeOverlay} />
            )}
            {!filePreviewUrl && <SafeZoneScreenEmptyState onUploadFile={setFile} />}
          </div>
          <AnimatePresence>
            <motion.img
              src={activeOverlayData.src}
              className={cn('w-full absolute inset-0 rounded-none pointer-events-none')}
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              initial={{ opacity: 0 }}
              key={activeOverlayData.src}
              alt="Instagram Overlay"
            />
          </AnimatePresence>
          <div className="w-full h-14 bg-black text-white flex items-center justify-center">
            <Icon icon={activeOverlay} size={28} />
          </div>
        </div>
      </div>
    </div>
  );
};
