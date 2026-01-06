import { AnimatePresence, motion } from 'framer-motion';
import html2canvas from 'html2canvas';

import InstagramOverlay from '../../../assets/images/safe-zone-overlays/instagram-reels-overlay.png';
import TiktokOverlay from '../../../assets/images/safe-zone-overlays/tiktok-overlay.png';
import YoutubeOverlay from '../../../assets/images/safe-zone-overlays/youtube-shorts-overlay.png';

import InstagramSafeZoneOverlay from '../../../assets/images/safe-zone-overlays/instagram-reels-safe-zone-overlay.png';
import TiktokSafeZoneOverlay from '../../../assets/images/safe-zone-overlays/tiktok-safe-zone-overlay.png';
import YoutubeSafeZoneOverlay from '../../../assets/images/safe-zone-overlays/youtube-shorts-safe-zone-overlay.png';
import { useEffect, useMemo, useRef, useState } from 'react';
import { cn, Radio, RadioGroup, Tooltip } from '@heroui/react';
import { SafeZoneScreenEmptyState } from './SafeZoneScreenEmptyState';
import { SafeZoneScreenImage } from './SafeZoneScreenImage';
import { SafeZoneScreenVideo } from './SafeZoneScreenVideo';
import { Icon } from '../../various/Icon';
import { useDropzone } from 'react-dropzone';
import { useSignUpModalVisibility } from '../../../hooks/useSignUpModalVisibility';
import { useSession } from '../../../hooks/useSession';

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
  const previousOverlayRef = useRef<keyof typeof OVERLAYS>('instagram');
  const platformSwitchCountRef = useRef(0);

  const [file, setFile] = useState<File | null>(null);
  const [activeOverlay, setActiveOverlay] = useState<keyof typeof OVERLAYS>('instagram');
  const [shouldShowSafeZone, setShouldShowSafeZone] = useState(false);

  const { openSignUpModal } = useSignUpModalVisibility();
  const { isSignedIn } = useSession();

  const activeOverlayData = (shouldShowSafeZone ? SAFE_ZONE_OVERLAYS : OVERLAYS)[activeOverlay];

  useEffect(() => {
    // Only count switches if the overlay actually changed and it's one of the three platforms
    // Don't show modal if user is already signed in
    if (activeOverlay !== previousOverlayRef.current && !isSignedIn) {
      platformSwitchCountRef.current += 1;

      // Show sign up modal every 3 switches (at 3, 6, 9, 12, etc.)
      if (platformSwitchCountRef.current % 3 === 0 && platformSwitchCountRef.current > 0) {
        openSignUpModal();
      }
      
      previousOverlayRef.current = activeOverlay;
    } else if (activeOverlay !== previousOverlayRef.current) {
      // Update previous overlay even if user is signed in (but don't count switches)
      previousOverlayRef.current = activeOverlay;
    }
  }, [activeOverlay, openSignUpModal, isSignedIn]);

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

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
      'video/*': [],
    },
    onDrop: (files) => {
      setFile(files[0]);
    },
    multiple: false,
  });

  return (
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
      <div className="relative w-full max-w-80">
        <div className="z-1 absolute left-6 right-6 top-0 z-10 flex h-8 justify-between">
          <button type="button" className="text-white" {...getRootProps()}>
            <input {...getInputProps()} />
            <Icon icon="upload" size={16} />
          </button>
          <button
            type="button"
            className="flex items-center gap-2 text-xs text-white"
            onClick={() => setShouldShowSafeZone(!shouldShowSafeZone)}
          >
            <Icon icon={shouldShowSafeZone ? 'eyeCrossed' : 'eye'} size={12} />
            {shouldShowSafeZone ? 'Hide' : 'Show'} safe zone
          </button>
          <Tooltip content="Download" isDisabled={!filePreviewUrl}>
            <button
              type="button"
              className={cn('text-white', { 'cursor-not-allowed opacity-50': !filePreviewUrl })}
              disabled={!filePreviewUrl}
              onClick={handleDownload}
            >
              <Icon icon="download" size={16} />
            </button>
          </Tooltip>
        </div>
        <div ref={captureRef} className="relative w-full border border-foreground-300">
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
  );
};
